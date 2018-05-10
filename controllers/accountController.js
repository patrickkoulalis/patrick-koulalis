const Raven = require("raven");
const mongoose = require("mongoose");
const { promisify } = require("es6-promisify");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = mongoose.model("User");
const h = require("../helpers.js");

exports.loginPage = (req, res) => {
  res.render("accountLogin.pug");
};

exports.signupPage = (req, res) => {
  res.render("accountSignup.pug");
};

// Password Management
exports.forgotPasswordPage = (req, res) => {
  res.render("forgotPassword");
};
exports.updatePassword = (req, res) => {
  res.render("update-password.pug");
};

// Account Page
exports.getAccountOverviewData = async (req, res, next) => {
  try {
    if (!req.user.customer_id) {
      next();
    }
    const chargesPromise = stripe.charges.list({
      customer: req.user.customer_id,
      limit: "3"
    });
    const subsPromise = stripe.subscriptions.list({
      customer: req.user.customer_id,
      status: "all"
    });
    const [charges, subs] = await Promise.all([
      chargesPromise,
      subsPromise
    ]);
    req.charges = charges;
    req.subs = subs;
  } catch (err) {
    Raven.captureException(err);
    req.flash(
      "error",
      "There was an error retriving your account. Please try again, and if the problem persists, contact the customer success team."
    );
    return res.redirect("back");
  }
  next();
};
exports.accountPage = (req, res) => {
  res.render("account.pug", {
    charges: req.charges,
    subs: req.subs
  });
};

// Account Payment History
exports.getPaymentHistory = async (req, res, next) => {
  try {
    const charges = await stripe.charges.list({
      customer: req.user.customer_id,
      limit: "50"
    });
    req.charges = charges;
    next();
  } catch (err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
    res.redirect("back");
  }
};
exports.displayPaymentHistory = async (req, res, next) => {
  res.render("paymentHistory.pug", { charges: req.charges });
};

// Account Billing Page
exports.getBilling = async (req, res, next) => {
  try {
    // Get customer object for current user
    const { id, sources: { data: cards }, default_source } = await stripe.customers.retrieve(req.user.customer_id);
		req.cards = cards;
		// If the customer has a default source
    if (default_source) {
      const defaultCard = await stripe.customers.retrieveCard(
        id,
        default_source
      );
      req.defaultCard = defaultCard;
    }
    next();
  } catch (err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
    res.redirect("back");
  }
};

exports.displayBilling = async (req, res, next) => {
  res.render("accountBilling.pug", {
    defaultCard: req.defaultCard,
    cards: req.cards
  });
};

// Payment Methods
exports.addPaymentMethod = async (req, res, next) => {
  try {
    // Create the new card source
    const newCard = await stripe.customers.createSource(req.user.customer_id, {
      source: req.body.stripeToken
    });
    // If Set as default is selected set card as default
    if (req.body.setDefault) {
      await stripe.customers.update(req.user.customer_id, {
        default_source: newCard.id
      });
    }
    res.redirect("back");
  } catch (err) {
    Raven.captureException(err);
    req.flash(
      "error",
      "There was a problem adding your card. Please try again, and if the problem persists, contact the customer success team."
    );
    res.redirect("back");
  }
};

exports.updatePaymentMethod = async (req, res) => {
  try {
    stripe.customers.update(req.user.customer_id, {
      default_source: req.query.c
    });
    req.flash("success", "Your card has been updated.");
    res.redirect("back");
  } catch (err) {
    Raven.captureException(err);
    req.flash(
      "error",
      "There was a problem updating your card. Please try again, and if the problem persists, contact the customer success team."
    );
    res.redirect("back");
  }
};

exports.removePaymentMethod = async (req, res) => {
  try {
    stripe.customers.deleteCard(req.user.customer_id, req.query.c);
    req.flash("success", "Your card has been removed.");
    res.redirect("back");
  } catch (err) {
    Raven.captureException(err);
    req.flash(
      "error",
      "There was a problem removing your card. Please try again, and if the problem persists, contact the customer success team."
    );
    res.redirect("back");
  }
};
// Subscription Management
exports.checkSubscriptionOwner = async (req, res, next) => {
  try {
    const sub = await stripe.subscriptions.retrieve(req.query.sub);
    if (sub.customer != req.user.customer_id) {
      req.flash("error", h.flashes.error);
      return res.redirect("back");
    }
    next();
  } catch (err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
    res.redirect("back");
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    await stripe.subscriptions.del(req.query.sub, {
      at_period_end: true
    });
    req.flash("success", "Subscription has been successfully cancelled.");
    res.redirect("back");
  } catch (err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
    res.redirect("back");
  }
};
