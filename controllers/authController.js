const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require("crypto");
const { promisify } = require("es6-promisify");
const mail = require("../mail");
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
    next();
    return;
  }
  req.flash("info", "Please login to access your account");
  res.redirect("/account/login/");
};

exports.forgotPassword = async (req, res, next) => {
  // Check to see if user exsists
  const user = await User.findOne({ email: req.body.email });

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

  const mailOptions = {
    to: req.body.email,
    from: "no-reply@patrickkoulalis.com",
    html: resetURL
  };
  mail.send(mailOptions);

  req.flash(
    "success",
    `A password reset link has been sent to ${
      req.body.email
    }. Click on the link provided to reset your password.`
  );

  res.redirect("/account/login/");
};

exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    req.flash("error", "Reset link has expired!");
    res.redirect("/account/login/");
  }
  res.render("resetPassword");
};

exports.checkPasswords = (req, res, next) => {
  if (req.body.password === req.body.confirmPassword) {
    next();
    return;
  }
  req.flash("error", "Passwords did not match, please try agian.");
  res.redirect("back");
};

exports.updatePasswords = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    req.flash("error", `Password reset link has expired`);
    return res.redirect("/account/login/");
  }
  const setPassword = promisify(user.setPassword.bind(user));
  await setPassword(req.body.password);
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
};
