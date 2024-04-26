const express = require("express");

const subscriptionController = require("../controller/subscription");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/createCustomer", subscriptionController.createCustomer);

router.post("/createCheckoutLink", subscriptionController.createCheckoutLink);

router.patch(
  "/updateUserSubscription",
  isAuth,
  subscriptionController.updateUserSubscription
);

router.post(
  "/changeSubscription",
  isAuth,
  subscriptionController.changeSubscription
);

router.post(
  "/cancelSubscription",
  isAuth,
  subscriptionController.cancelSubscription
);

router.post(
  "/changePaymentMethod",
  isAuth,
  subscriptionController.changePaymentMethod
);

router.post("/test", subscriptionController.test);

router.post(
  "/createUserSubscription",
  subscriptionController.createUserSubscription
);

module.exports = router;
