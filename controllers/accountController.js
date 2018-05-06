const Raven = require("raven");
const mongoose = require("mongoose");
const { promisify } = require("es6-promisify");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = mongoose.model("User");
const h = require("../helpers.js");

exports.loginPage = (req, res) => {
  res.render("accountLogin.pug");
};

exports.loginPost = (req, res) => {};

exports.signupPage = (req, res) => {
  res.render("accountSignup.pug");
};

// Add User to the database
exports.registerUser = async (req, res, next) => {
  try {
    const customer = await stripe.customers.create({ email: req.body.email });
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      customer_id: customer.id
    });
    const register = await User.register(user, req.body.password);
    next();
  } catch (err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
    res.redirect("back");
  }
};

// Validate user signup info
exports.validateSignup = async (req, res, next) => {
  // check to see if the email address is already in use
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    req.flash(
      "error",
      'An account with that email address already exsists, please <a href="/account/login/">log in</a> and try again or <a href="/account/signup/">signup</a> for a new account.'
    );
    return res.redirect("back");
  }

  req.sanitizeBody("name");
  req.checkBody("name", "Name cannot be blank!").notEmpty();
  req.checkBody("email", "Invalid Email!").isEmail();
  req.sanitizeBody("email").normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody("password", "The password can not be blank!").notEmpty();
  req
    .checkBody("confirmPassword", "Confirm password can not be blank!")
    .notEmpty();
  req
    .checkBody("confirmPassword", "Your passwords do not match!")
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    console.log(errors.map(err => err.msg));
    return res.render("accountSignup.pug", { body: req.body });
  }
  next();
};

exports.accountPage = (req, res) => {
  res.render("account.pug", {
    charges: req.charges,
    subs: req.subs
  });
};

exports.cancelSubscription = async (req, res) => {
  try {
    await stripe.subscriptions.del(req.query.sub, {
      at_period_end: true
    });
    res.redirect("back");
  } catch (err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
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
    const [charges, subs, cards, defaultCard] = await Promise.all([
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

exports.forgotPasswordPage = (req, res) => {
  res.render("forgotPassword");
};

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

exports.getBilling = async (req, res, next) => {
  try {
    // Get customer object for current user
    const customer = await stripe.customers.retrieve(req.user.customer_id);
    req.customer = customer;
    // Get the customers default card ID
    const defaultCardId = customer.default_source;
    // Get the default card object if there is one
    if (defaultCardId) {
      const defaultCard = await stripe.customers.retrieveCard(
        customer.id,
        defaultCardId
      );
      req.defaultCard = defaultCard;
    }

    const cards = await stripe.customers.listCards(customer.id);
    req.cards = cards;

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
    cards: req.cards,
    customer: req.customer
  });
};

exports.addCard = async (req, res, next) => {
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

exports.updatePassword = (req, res) => {
  res.render("update-password.pug");
};
