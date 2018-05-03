const mongoose = require("mongoose");
const { promisify } = require("es6-promisify");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = mongoose.model("User");

exports.loginPage = (req, res) => {
  res.render("accountLogin.pug");
};

exports.loginPost = (req, res) => {};

exports.signupPage = (req, res) => {
  res.render("accountSignup.pug");
};

// Add User to the database
exports.registerUser = async (req, res, next) => {
  const customer = await stripe.customers.create({ email: req.body.email });
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    customer_id: customer.id
  });
  const register = await User.register(user, req.body.password).catch(err => {
    console.log(err);
  });
  next();
};

// Validate user signup info
exports.validateSignup = (req, res, next) => {
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
    res.render("accountSignup.pug", { body: req.body });
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
    await stripe.subscriptions.del(req.query.sub);
    res.redirect("back");
  } catch (err) {
    console.log(err);
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
    console.log(err);
    req.flash(
      "error",
      "There was an error retriving your account. Please try again."
    );
    return res.redirect("back");
  }
  next();
};

exports.forgotPasswordPage = (req, res) => {
  res.render("forgotPassword");
};

exports.getPaymentHistory = async (req, res, next) => {
  const charges = await stripe.charges.list({
    customer: req.user.customer_id,
    limit: "50"
  });
  req.charges = charges;
  next();
};
exports.displayPaymentHistory = async (req, res, next) => {
  res.render("paymentHistory.pug", { charges: req.charges });
};

exports.getBilling = async (req, res, next) => {
  // Get customer object for current user
  const customer = await stripe.customers.retrieve(req.user.customer_id);
  // Get the customers default card ID
  const defaultCardId = customer.default_source;
  // Get the default card object
  const defaultCard = await stripe.customers.retrieveCard(
    customer.id,
    defaultCardId
	);
	console.log(defaultCard);
  const charges = await stripe.charges.list({
    customer: req.user.customer_id,
    limit: "50"
  });
  req.charges = charges;
  next();
};
exports.displayBilling = async (req, res, next) => {
  res.render("accountBilling.pug", { charges: req.charges });
};
