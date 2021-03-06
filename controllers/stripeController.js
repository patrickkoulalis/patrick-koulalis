const stripe = require("stripe")(process.env.STRIPE_KEY);
const uuid = require("uuid-v4");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require("crypto");
const passport = require("passport");
const Raven = require("raven");
const h = require("../helpers");
const mail = require("../handlers/mail");
// Display Stripe test page
exports.stripePage = (req, res) => {
  res.render("stripe.pug", { pageTitle: "Stripe Testing" });
};

// Stripe Checkout One Time Payment
exports.stripeCharge = async (req, res) => {
  let idemKey = uuid();
  let productName;
  const user = req.currentUser;
  const customer = req.customer;

  try {
    // Get the product id from the request
    const productId = req.body.product_id;
    productName = h.products[productId].name;
    // Get and calculate product price
    const productPrice =
      h.products[productId].price -
      h.products[productId].discount / 100 * h.products[productId].price;
    // Charge to Stripe
    const charge = await stripe.charges.create(
      {
        amount: productPrice,
        currency: "usd",
        customer: customer.id,
        description:
          "Charge for " + productName + " " + h.products[productId].product_id,
        metadata: {
          address: req.body.address,
          country: req.body.country,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode,
          notes: req.body.notes,
          discount_amount: h.products[productId].discount,
          coupon_code: req.body.coupon_code
        }
      },
      {
        idempotency_key: idemKey
      }
    );

    // Update users payment array in the database
    updatedUser = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $push: {
          payments: {
            payment_id: charge.id,
            payment_date: Date.now()
          }
        }
      }
    );
    //if no errors redirect the user after completion
    const loginURL = `http://${req.headers.host}/account/login/`;
    const siteURL = `http://${req.headers.host}`;
    mail.send({
      user,
      subject: `${productName} Website Package`,
      filename: "thank-you-website-package",
      siteURL,
      loginURL,
      productName
    });
    res.redirect("/account");
  } catch (err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
    res.redirect("back");
  }
};

// Stripe Checkout Subscription
exports.stripeSubscription = async (req, res) => {
  let idemKey = uuid();
  let productName;
  const user = req.currentUser;
  const customer = req.customer;

  try {
    // Get the product id from the request
    const productId = req.body.product_id;
    productName = h.products[productId].name;

    //Check for coupon code
    const coupon = req.body.coupon_code;

    // Get and calculate product price
    const productPrice =
      h.products[productId].price -
      h.products[productId].discount / 100 * h.products[productId].price;

    // Charge to Stripe
    const charge = await stripe.subscriptions.create(
      {
        customer: customer.id,
				items: [{ plan: productId }],
				coupon: coupon,
        metadata: {
          address: req.body.address,
          country: req.body.country,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode,
          notes: req.body.notes,
          product_name: h.products[productId].name,
          discount_amount: h.products[productId].discount,
          coupon
        }
      },
      {
        idempotency_key: idemKey
      }
    );

    // Update users payment array in the database
    updatedUser = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $push: {
          payments: {
            payment_id: charge.id,
            payment_date: Date.now()
          }
        }
      }
    );
    const loginURL = `http://${req.headers.host}/account/login/`;
    const siteURL = `http://${req.headers.host}`;
    mail.send({
      user,
      subject: `Welcome to the ${productName} Maintenance Plan`,
      filename: "thank-you-maintenance-plan",
      siteURL,
      loginURL,
      productName
    });
    res.redirect("/account");
  } catch (err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
    res.redirect("back");
  }
};

// Checks to see if there is a user logged in
// If none exsits one will be created.
exports.checkAccount = async (req, res, next) => {
  try {
    // if there is a user logged in do this
    // ====================================
    if (req.user) {
      // Grab the current users customer id
      const customer = await stripe.customers.retrieve(req.user.customer_id);
      // Send user and customer object to the next thing
      req.currentUser = req.user;
      req.customer = customer;
      return next();
    }
    // if there is no user logged in do this
    // ====================================
    // check to see if the email address is already in use
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      req.flash(
        "error",
        'An account with that email address already exsists, please <a href="/account/login/">log in</a> and try again or <a href="/account/signup/">signup</a> for a new account.'
      );
      return res.redirect("back");
    }

    // Create a new stripe customer
    const customer = await stripe.customers.create({
      source: req.body.stripeToken,
      email: req.body.email
    });

    // Add new user to the database
    const user = new User({
      name: req.body.full_name,
      email: req.body.email,
      customer_id: customer.id
    });
    const tempPassword = crypto.randomBytes(5).toString("hex");
    await user.setPassword(tempPassword);
    await user.save();

    // Send temp password to the new user
    const loginURL = `http://${req.headers.host}/account/login/`;
    const siteURL = `http://${req.headers.host}`;
    mail.send({
      user,
      subject: "Here is your temporary password",
      filename: "tempPassword",
      tempPassword,
      siteURL,
      loginURL
    });

    // send user and customer object to the next thing
    req.currentUser = user;
    req.customer = customer;
    next();
  } catch (err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
    res.redirect("back");
  }
};

// Check if a payment method exsists
exports.checkPaymentMethod = async (req, res, next) => {
  try {
    // if there is NO user logged in move on
    // ====================================
    if (!req.user) {
      return next();
    }
    // if there is a user logged in do this
    // ====================================
    // Get a list of the customers cards on file
    const customerCards = await stripe.customers.listCards(req.customer.id);
    req.cutomerCards = customerCards;
    // If there are no cards listed add credit card to account
    if (customerCards.data.length <= 0) {
      await stripe.customers.createSource(req.currentUser.customer_id, {
        source: req.body.stripeToken
      });
      return next();
    }
    next(); // If there are cards on the account just move on
  } catch (err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
    res.redirect("back");
  }
};

exports.updatePaymentMethod = async (req, res, next) => {
  try {
    const cards = await stripe.customers.listCards(req.customer.id); // get list of customers cards
    if (!req.user || cards.data.length <= 1) {
      // if there is NO user logged in move on
      // OR
      // if there is less than 2 cards on the account don't do anything
      return next();
    }

    const defaultCardId = req.customer.default_source; // Get the customers default card ID
    // if selected card is different from the default card update it.
    if (req.body.creditCard != defaultCardId) {
      await stripe.customers.update(req.customer.id, {
        default_source: req.body.creditCard
      });
    }
    return next();
  } catch (err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
    res.redirect("back");
  }
};
