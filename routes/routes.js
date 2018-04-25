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

// Homepage
router.get("/", (req, res) => {
  res.render("index.pug", {
    pageTitle: "Patrick Koulalis - Boston Web Design & Development",
    canonical: "",
    page: "home"
  });
});

// Stripe Test Page
router.get("/stripe-test", stripeController.stripePage);
router.post("/stripe-test", stripeController.stripePay);

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

// Support Plans Routes
router.get("/support-plans", (req, res) => {
  res.render("supportPlans.pug");
});
router.post("/support-plans", stripeController.stripeSubscription);

// Web Development Packages Routes
router.get("/web-site-packages", (req, res) => {
  res.render("webSitePackages.pug");
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
router.get(
  "/account/cancel-subscription",
  accountController.cancelSubscription
);
router.get(
  "/account",
  authController.isLoggedIn,
  accountController.getPaymentHistory,
  accountController.accountPage
);
// router.get("/account/payment-history", accountController.paymentHistory);
// Catch all 404 Routes
router.get("*", (req, res) => {
  res.render("404.pug", { pageTitle: `404` });
});

module.exports = router;
