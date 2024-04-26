export const PLANS = [
  {
    name: "Free",
    slug: "free",
    dbs: 3,
    users: 5,
    price: {
      amount: 0,
      currency: "usd",
      priceIds: {
        test: "free",
        production: "",
      },
    },
  },
  {
    name: "Basic",
    slug: "basic",
    dbs: 10,
    users: 15,
    features: ["PDF Generation"],
    price: {
      amount: 20,
      currency: "usd",
      priceIds: {
        test: "price_1OyKBDJVXn0g3Wb2R1QKRN0N",
        production: "",
      },
    },
  },
  {
    name: "Pro",
    slug: "pro",
    dbs: 100,
    users: 30,
    features: ["PDF Generation", "Real Time Notifications and Emails"],
    price: {
      amount: 50,
      currency: "usd",
      priceIds: {
        test: "price_1OyKBlJVXn0g3Wb2Z82CyBqq",
        production: "",
      },
    },
  },
];
