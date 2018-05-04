const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const stripeController = require("../controllers/stripeController.js");
const accountController = require("../controllers/accountController.js");
const authController = require("../controllers/authController.js");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const h = require("../helpers");

// Homepage
router.get("/", (req, res) => {
  res.render("index.pug", {
    pageTitle: "Patrick Koulalis - Boston Web Design & Development",
    canonical: "",
    pageClass: "home"
  });
});

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
router.get("/website-packages", async (req, res) => {
  try {
		if (!req.user) {
    	return res.render("websitePackages.pug");
  	}
    const customer = await stripe.customers.listCards(req.user.customer_id);
    res.render("websitePackages.pug", { customer: customer });
  } catch (err) {
		console.log(err);
		req.flash('error', h.flashes.error);
		req.redirect('back');
  }
});

// Esitmates
router.get("/estimates", (req, res) => {
  res.render("estimates.pug");
});

//checkout
router.post(
  "/checkout",
  stripeController.checkAccount,
  stripeController.addPaymentMethod,
  stripeController.stripeCharge
);
// _ATT _@EVERYONE _@PATRICK
// SPEED IMPORVMENTS FOR DASHBOARD
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
router.get("/account/logout", authController.isLoggedIn, authController.logout);
router.get("/account/forgot", accountController.forgotPasswordPage);
router.post("/account/forgot", authController.forgotPassword);
router.get("/account/update-password", authController.isLoggedIn, accountController.updatePassword);
router.post("/account/update-password", authController.isLoggedIn, authController.checkPasswords, authController.updatePassword);
router.get("/account/reset/:token", authController.reset);
router.post(
  "/account/reset/:token",
  authController.checkPasswords,
  authController.resetPassword
);
router.get(
  "/account",
  authController.isLoggedIn,
  accountController.getAccountOverviewData,
  accountController.accountPage
);
router.get(
  "/account/payments",
  authController.isLoggedIn,
  accountController.getPaymentHistory,
  accountController.displayPaymentHistory
);
router.get(
  "/account/billing",
  authController.isLoggedIn,
  accountController.getBilling,
  accountController.displayBilling
);
router.post(
  "/account/billing",
  authController.isLoggedIn,
  accountController.addCard
);
// _ATT _@EVERYONE _@PATRICK
// MAKE SURE THAT PEOPLE ARE ASSOCIATED WITH THE SUB BEFORE IT CANCELS
router.get(
  "/account/cancel-subscription",
  authController.isLoggedIn,
  accountController.cancelSubscription
);
router.get(
  "/account/update-payment-method",
  authController.isLoggedIn,
  accountController.updatePaymentMethod
);
router.get(
  "/account/remove-payment-method",
  authController.isLoggedIn,
  accountController.removePaymentMethod
);

// Utility Routes
router.get("/info", (req, res) => {
  res.json({ user: req.user, Session: req.session, Cookies: req.cookies });
});

router.get("/customers", async (req, res) => {
  const customer = await stripe.customers.retrieve(req.user.customer_id);
  res.json(customer);
});

router.get("/flash", (req, res) => {
  req.flash('error', h.flashes.error);
  req.flash("error", "Error 2");
  req.flash("error", "Error 3");
  req.flash("success", "Success 1");
  req.flash("success", "Success 2");
  req.flash("success", "Success 3");
  res.redirect("back");
});

//Stripe Test Page
router.get("/stripe-test", stripeController.stripePage);
router.post("/stripe-test", stripeController.stripeCharge);

// Catch all 404 Routes
router.get("*", (req, res) => {
  res.render("404.pug", { pageTitle: `404` });
});

module.exports = router;
