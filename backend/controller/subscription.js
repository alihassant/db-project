const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Post = require("../models/postData");
const User = require("../models/user");
const Database = require("../models/database");
const Notification = require("../models/notification");
const plans = require("../config/stripe");

const io = require("../socket");

const generalPromiseError = (err) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
};

const errorMessageStatus = (errorMessage, errorStatusCode) => {
  const error = new Error(errorMessage);
  error.statusCode = errorStatusCode;
  throw error;
};

exports.createCustomer = async (req, res, next) => {
  const { email, name, userId } = req.body;
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });
    const user = await User.findById(userId);
    user.customerId = customer.id;
    await user.save();
    res.status(201).json({
      success: true,
      customer,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.createCheckoutLink = async (req, res, next) => {
  const { priceId, userId } = req.body;
  try {
    const user = await User.findById(userId);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      billing_address_collection: "auto",
      mode: "subscription",
      success_url: `http://localhost:3000/dashboard?success=true`,
      cancel_url: `http://localhost:3000/dashboard?success=false`,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer: user.customerId,
      metadata: {
        userId,
      },
    });

    user.subscription.subscriptionId = session.id;

    await user.save();

    res.status(201).json({
      success: true,
      session,
      url: session?.url,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.updateUserSubscription = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    const cusId = user.customerId;

    const paymentMethod = await stripe.paymentMethods.list({
      customer: cusId,
      type: "card",
    });

    if (paymentMethod.data.length === 0) {
      user.payments.paymentMethod.methodId = "";
      user.payments.paymentMethod.fullName = "";
      user.payments.paymentMethod.card = "";
      user.payments.paymentMethod.hasCard = false;
      await user.save();
      errorMessageStatus("No payment method found.", 404);
    }

    const paymentId = paymentMethod.data[0].id;

    await stripe.customers.update(cusId, {
      invoice_settings: { default_payment_method: paymentId },
    });

    user.payments.paymentMethod.methodId = paymentId;
    user.payments.paymentMethod.fullName =
      paymentMethod.data[0].billing_details.name;
    user.payments.paymentMethod.card = paymentMethod.data[0].card;
    if (paymentMethod) {
      user.payments.paymentMethod.hasCard = true;
    }

    const customerSub = await stripe.customers.retrieve(cusId, {
      expand: ["subscriptions"],
    });

    const subscriptionId = customerSub.subscriptions.data[0]?.id;

    if (!subscriptionId) {
      await user.save();
      errorMessageStatus("No subscription found.", 404);
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const plan = plans.find(
      (p) => p.price.priceIds.test === subscription.plan.id
    );

    user.currentPlan = plan.slug;

    user.payments.subscription.subscriptionId = subscriptionId;
    user.payments.subscription.validTill = subscription.current_period_end;
    user.payments.subscription.startedOn = subscription.current_period_start;
    user.payments.subscription.productId = subscription.plan.product;
    user.payments.subscription.priceId = subscription.plan.id;
    user.payments.subscription.status = subscription.status;

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.cancelSubscription = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    const subId = user.payments.subscription.subscriptionId;

    const subCancel = await stripe.subscriptions.cancel(subId);

    user.payments.subscription.status = subCancel.status;
    await user.save();

    const notification = Notification.create({
      userId,
      message: "Subscription cancelled successfully.",
    });

    io.emitToUser(userId, "notification", {
      action: "cancelSubscription",
      message: "Subscription cancelled successfully.",
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.changeSubscription = async (req, res, next) => {
  const { userId, priceId } = req.body;
  console.log(priceId);
  try {
    const user = await User.findById(userId);
    const cusId = user.customerId;
    const subId = user.payments.subscription.subscriptionId;

    if (
      user.payments.subscription.status === "active" &&
      user.currentPlan !== "free"
    ) {
      await stripe.subscriptions.cancel(subId);
      console.log("Subscription cancelled.");
    }

    const subscription = await stripe.subscriptions.create({
      customer: cusId,
      items: [{ price: priceId }],
    });

    user.payments.subscription.subscriptionId = subscription.id;
    user.payments.subscription.validTill = subscription.current_period_end;
    user.payments.subscription.startedOn = subscription.current_period_start;
    user.payments.subscription.productId = subscription.plan.product;
    user.payments.subscription.priceId = subscription.plan.id;
    user.payments.subscription.status = subscription.status;
    user.currentPlan = plans.find(
      (p) => p.price.priceIds.test === priceId
    ).slug;

    await user.save();

    const notification = Notification.create({
      userId,
      message: "Subscription changed successfully.",
    });

    io.emitToUser(userId, "notification", {
      action: "changeSubscription",
      message: "Subscription changed successfully.",
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.changePaymentMethod = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    const cusId = user.customerId;

    const session = await stripe.billingPortal.sessions.create({
      customer: cusId,
      return_url: "http://localhost:3000/dashboard?success=true",
    });

    res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.test = async (req, res, next) => {
  // const retrieve = await stripe.checkout.sessions.retrieve(
  //   "cs_test_a1lo7LZ4HpI3D6azsPt2FbLXIrglYSbRfOpkyw98szThde4twxEj72MPRB"
  // );

  const cusId = "cus_Pp9zAWOeiF4bTs";

  const subs = await stripe.paymentMethods.list({
    customer: cusId,
    type: "card",
  });

  const paymentId = subs.data[0].id;

  const cus = await stripe.customers.retrieve(cusId, {
    expand: ["subscriptions"],
  });

  const subscription = await stripe.subscriptions.retrieve(
    "sub_1OzRZtJVXn0g3Wb2w6N1beHO"
  );

  // const customer = await stripe.customers.update("cus_PoODPi72aizLhM", {
  //   invoice_settings: { default_payment_method: paymentId },
  // });

  // const subCancel = await stripe.subscriptions.cancel(
  //   "sub_1OzRZtJVXn0g3Wb2w6N1beHO"
  // );

  // res.status(201).json({
  //   success: true,
  //   subCancel,
  // });

  /*
  const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };

  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  */

  // try {
  //   const { priceId, userEmail } = req.body; // Get price ID and user email from request

  //   const customer = await stripe.customers.create({
  //     email: userEmail,
  //   });

  //   const subscription = await stripe.subscriptions.create({
  //     customer: customer.id,
  //     items: [{ price: priceId }],
  //     payment_behavior: "default_incomplete", // Ensure setup intent for payment confirmation
  //   });

  //   res.status(200).json({ clientSecret: subscription.client_secret });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Error creating subscription" });
  // }
  // const session = await stripe.billingPortal.sessions.create({
  //   customer: "cus_Pp9hBc1T6pE4AY",
  //   return_url: "http://localhost:3000/",
  // });

  res.status(200).json({ subs: subs.data[0], cus: cus.subscriptions.data[0] });
};

exports.createUserSubscription = async (req, res, next) => {
  const { userId, priceId, cardName, cardNumber, expiryDate, cvv } = req.body;
  try {
    // const expiryDateArray = expiryDate.split("/");
    // const expiryMonth = expiryDateArray[0];
    // const expiryYear = expiryDateArray[1];
    // const user = await User.findById(userId);

    // creating stripe card token
    // const token = await stripe.tokens.create({
    //   card: {
    //     number: cardNumber,
    //     exp_month: expiryMonth,
    //     exp_year: expiryYear,
    //     cvc: cvv,
    //   },
    // });

    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: "4242424242424242",
        exp_month: "07",
        exp_year: "24",
        cvc: "242",
      },
    });

    res.status(201).json({
      success: true,
      paymentMethod,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};
