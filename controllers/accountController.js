const mongoose = require("mongoose");
const { promisify } = require("es6-promisify");
const stripe = require("stripe")("sk_test_QpHol8S3EiOFOHMRmipwiqVD");
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

exports.getPaymentHistory = async (req, res, next) => {
	try{
		if(req.user) {
			const charges = await stripe.charges.list({ customer: req.user.customer_id });
			req.charges = charges;
		}
	} catch(err) {
		console.log(err);
	}
  next();
};
