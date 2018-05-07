const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require("crypto");
const { promisify } = require("es6-promisify");
const Raven = require("raven");
const mail = require("../handlers/mail");
const h = require("../helpers.js");

exports.login = passport.authenticate("local", {
  successRedirect: "/account/",
  successFlash: true,
  failureRedirect: "/account/login/",
  failureFlash: true
});

exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "You have been logged out successfully.");
  res.redirect("/account/login/");
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("info", "Please login to access your account");
  res.redirect("/account/login/");
};

exports.forgotPassword = async (req, res, next) => {
  try {
    // Check to see if user exsists
    const user = await User.findOne({ email: req.body.email });

    // If No user send fake flash
    if (!user) {
      req.flash(
        "success",
        `A password reset link has been sent to ${
          req.body.email
        }. Click on the link provided to reset your password.`
      );
      return res.redirect("/account/login/");
    }

    user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetURL = `http://${req.headers.host}/account/reset/${
      user.resetPasswordToken
    }`;
    const siteURL = req.headers.host;

    await mail.send({
      user,
      subject: "Password reset link",
      resetURL,
      siteURL,
      filename: "passwordReset"
    });

    req.flash(
      "success",
      `A password reset link has been sent to ${
        req.body.email
      }. Click on the link provided to reset your password.`
    );

    res.redirect("/account/login/");
  } catch (err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
    res.redirect("back");
  }
};

exports.reset = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      req.flash("error", "Reset link has expired!");
      return res.redirect("/account/login/");
    }
    res.render("resetPassword");
  } catch (err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
    res.redirect("back");
  }
};

exports.checkPasswords = (req, res, next) => {
  if (req.body.password === req.body.confirmPassword) {
    next();
    return;
  }
  req.flash("error", "Passwords did not match, please try agian.");
  res.redirect("back");
};

// Reset forgotten password
exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      req.flash("error", `Password reset link has expired`);
      return res.redirect("/account/login/");
    }

    await user.setPassword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    const updatedUser = await user.save();
    const login = promisify(req.login.bind(req));
    await login(updatedUser);
    req.flash(
      "success",
      "Congratulations! Your password has been reset and you have been logged into your account."
    );
    res.redirect("/account/");
  } catch (err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
    res.redirect("back");
  }
};

// Updates User Password
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user.id
    });
    if (!user) {
      req.flash("error", `Password reset link has expired`);
      return res.redirect("/account/login/");
    }

    await user.setPassword(req.body.password);
    const updatedUser = await user.save();
    const login = promisify(req.login.bind(req));
    await login(updatedUser);
    req.flash(
      "success",
      "Congratulations! Your password has been reset and you have been logged into your account."
    );
    res.redirect("/account/");
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
