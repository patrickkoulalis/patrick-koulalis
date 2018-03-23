const passport = require("passport");

exports.login = passport.authenticate("local", {
  successRedirect: "/account/",
  successFlash: true,
  failureRedirect: "/account/login",
  failureFlash: true
});

exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "You have been logged out successfully.");
  res.redirect("/account/login");
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
		next();
		return;
	}
	req.flash('error', 'Please login to do that!');
	res.redirect('/account/login');
};
