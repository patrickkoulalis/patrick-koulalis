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
  const user = new User({ email: req.body.email, name: req.body.name });
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
    subs: req.subs,
    plans: req.plans
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

exports.getPaymentHistory = async (req, res, next) => {
  try {
    if (req.user) {
      const chargesPromise = stripe.charges.list({
        limit: 3,
        customer: req.user.customer_id
      });
      const subsPromise = stripe.subscriptions.list({
        customer: req.user.customer_id,
        status: "all"
      });
      const plansPromise = stripe.plans.list();
      const [charges, subs, plans] = await Promise.all([
        chargesPromise,
        subsPromise,
        plansPromise
      ]);
      req.charges = charges;
      req.subs = subs;
      req.plans = plans;
      console.log(subs);
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

exports.forgotPasswordPage = (req, res) => {
  res.render("forgotPassword");
};
