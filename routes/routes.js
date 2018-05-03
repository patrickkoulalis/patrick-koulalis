const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const stripeController = require("../controllers/stripeController.js");
const accountController = require("../controllers/accountController.js");
const authController = require("../controllers/authController.js");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.get("/info", (req, res) => {
  res.json({ user: req.user, Session: req.session, Cookies: req.cookies });
});

router.get("/customers", async (req, res) => {
  const customer = await stripe.customers.retrieve(req.user.customer_id);
  res.json(customer);
});

router.get("/flash", (req, res) => {
  req.flash("error", "Error 1");
  req.flash("error", "Error 2");
  req.flash("error", "Error 3");
  req.flash("success", "Success 1");
  req.flash("success", "Success 2");
  req.flash("success", "Success 3");
  res.redirect("back");
});

// Homepage
router.get("/", (req, res) => {
  res.render("index.pug", {
    pageTitle: "Patrick Koulalis - Boston Web Design & Development",
    canonical: "",
    pageClass: "home"
  });
});

// Stripe Test Page
router.get("/stripe-test", stripeController.stripePage);
router.post("/stripe-test", stripeController.stripeCharge);

// Contact Routes
router.get("/contact", contactController.contactPage);
router.post(
  "/contact",
  contactController.handleMail,
  contactController.contactPost
);

// Work Routes
router.get("/work", (req, res) => {
  res.render("work.pug", {
    pageTitle: "Web Design & Development Work | Patrick Koulalis",
    canonical: "work/"
  });
});

// About Routes
router.get("/about", (req, res) => {
  res.render("about.pug", {
    pageTitle: "About | Patrick Koulalis",
    canonical: "about/"
  });
});

// Solutions Routes
router.get("/solutions", (req, res) => {
  res.render("solutions.pug", {
    pageTitle: "Web Design & Development Services | Patrick Koulalis",
    canonical: "services/"
  });
});

//checkout
router.post(
  "/checkout",
  stripeController.checkAccount,
  stripeController.addPaymentMethod,
  stripeController.stripeCharge
);

// Support Plans Routes
router.get("/support-plans", async (req, res) => {
  if (!req.user) {
    return res.render("supportPlans.pug");
  }
  try {
    const customer = await stripe.customers.listCards(req.user.customer_id);
    res.render("supportPlans.pug", { customer: customer });
  } catch (err) {
    console.log(err);
    req.flash("error", "An error has occurred please try again.");
    res.redirect("back");
  }
});
router.post(
  "/subscribe",
  stripeController.checkAccount,
  stripeController.addPaymentMethod,
  stripeController.stripeSubscription
);

// Web Development Packages Routes
router.get("/web-site-packages", async (req, res) => {
  if (!req.user) {
    return res.render("websitePackages.pug");
  }
  try {
    const customer = await stripe.customers.listCards(req.user.customer_id);
    console.log(customer);
    res.render("websitePackages.pug", { customer: customer });
  } catch (err) {
    console.log(err);
    req.flash("error", "An error has occurred please try again.");
    res.redirect("back");
  }
});

// Esitmates
router.get("/estimates", (req, res) => {
  res.render("estimates.pug");
});

// Account Routes
router.get("/account/signup", accountController.signupPage);
router.post(
  "/account/signup",
  accountController.validateSignup,
  accountController.registerUser,
  authController.login
);
router.get("/account/login", accountController.loginPage);
router.post("/account/login", authController.login);
router.get("/account/logout", authController.logout);
router.get("/account/forgot", accountController.forgotPasswordPage);
router.post("/account/forgot", authController.forgotPassword);
router.get("/account/reset/:token", authController.reset);
router.post(
  "/account/reset/:token",
  authController.checkPasswords,
  authController.updatePasswords
);
router.get(
  "/account/cancel-subscription",
  accountController.cancelSubscription
);
router.get(
  "/account",
  authController.isLoggedIn,
  accountController.getAccountOverviewData,
  accountController.accountPage
);
router.get(
  "/account/payments",
  accountController.getPaymentHistory,
  accountController.displayPaymentHistory
);
router.get(
  "/account/billing",
  accountController.getBilling,
  accountController.displayBilling
);

// Catch all 404 Routes
router.get("*", (req, res) => {
  res.render("404.pug", { pageTitle: `404` });
});

module.exports = router;
