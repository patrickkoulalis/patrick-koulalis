const stripe = require("stripe")(process.env.STRIPE_KEY);
const uuid = require("uuid-v4");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require("crypto");
const h = require("../helpers");
const mail = require("../mail");
// Display Stripe test page
exports.stripePage = (req, res) => {
  res.render("stripe.pug", { pageTitle: "Stripe Testing" });
};

// Stripe Checkout One Time Payment
exports.stripePay = async (req, res) => {
  try {
    let customer;
    let idemKey = uuid();

    // if there is no current user logged in
    if (!req.user) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        req.flash(
          "error",
          'An account with that email address already exsists, please <a href="/account/login/">log in</a> and try again or <a href="/account/signup/">signup</a> for a new account.'
        );
        return res.redirect("back");
      }
      // If there is no user with the checkout email create and new user in the database
      customer = await stripe.customers.create({
        source: req.body.stripeToken,
        email: req.body.email
      });
      // Also create a new stripe user
      const tempPassword = crypto.randomBytes(20).toString("hex");
      const tempPasswordExpires = Date.now() + 3600000;
      const newUser = new User({
        name: req.body.full_name,
        email: req.body.email,
        customer_id: customer.id,
        tempPassword,
        tempPasswordExpires
      });
      // Save the new user to the database
      await newUser.save();
      const loginUrl = `http://${req.headers.host}/account/login/${
        user.tempPassword
      }`;
      mail.send({
        from: "noreply@patrickkoulalis.com",
        to: req.body.email,
        subject: "Here is your temporary password",
        html: loginUrl,
        text: loginUrl,
        filename: "temp-password"
      });
    }

    // if the current user does not have a customer id create one
    if (!req.user.customer_id) {
      customer = await stripe.customers.create({
        source: req.body.stripeToken,
        email: req.body.email
      });
      const updatedCurrentUser = await User.findOneAndUpdate(
        { email: req.user.email },
        { customer_id: customer.id }
      );
      await updatedCurrentUser.save();
    }
    // if user has a customer id grab it
    customer = await stripe.customers.retrieve(req.user.customer_id);

    // Get the product id from the request
    const productId = await req.body.product_id;
    console.log(productId);
    // console.log(h.products);
    console.log(h.products[productId]);
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
          "Charge for " +
          h.products[productId].name +
          " " +
          h.products[productId].product_id,
        metadata: {
          address: req.body.address,
          country: req.body.country,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode,
          notes: req.body.notes,
          discount_amount: h.products[productId].discount,
          on_sale: h.products[productId].on_sale,
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
  } catch (err) {
    console.log("error:" + err);
  }
  //if no errors redirect the user after completion
  res.redirect("/account");
};

// Stripe Checkout Subscription
exports.stripeSubscription = async (req, res) => {
  try {
    let customer;
    let idemKey = uuid();
    // if there is no current user logged in
    if (!req.user) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        req.flash(
          "error",
          'An account with that email address already exsists, please <a href="/account/login/">log in</a> and try again or <a href="/account/signup/">signup</a> for a new account.'
        );
        return res.redirect("back");
      }
      // If there is no user with the checkout email create and new user in the database
      customer = await stripe.customers.create({
        source: req.body.stripeToken,
        email: req.body.email
      });
      // Also create a new stripe user
      const tempPassword = crypto.randomBytes(20).toString("hex");
      const tempPasswordExpires = Date.now() + 3600000;
      const newUser = new User({
        name: req.body.full_name,
        email: req.body.email,
        customer_id: customer.id,
        tempPassword,
        tempPasswordExpires
      });
      // Save the new user to the database
      await newUser.save();
      const loginUrl = `http://${req.headers.host}/account/login/${
        user.tempPassword
      }`;
      mail.send({
        from: "noreply@patrickkoulalis.com",
        to: req.body.email,
        subject: "Here is your temporary password",
        html: loginUrl,
        text: loginUrl,
        filename: "temp-password"
      });
    }

    // if the current user does not have a customer id create one
    if (!req.user.customer_id) {
      customer = await stripe.customers.create({
        source: req.body.stripeToken,
        email: req.body.email
      });
      const updatedCurrentUser = await User.findOneAndUpdate(
        { email: req.user.email },
        { customer_id: customer.id }
      );
      await updatedCurrentUser.save();
    }
    // if user has a customer id grab it
    customer = await stripe.customers.retrieve(req.user.customer_id);

    // Get the product id from the request
    const productId = await req.body.product_id;
    console.log(productId);
    // console.log(h.products);
    console.log(h.products[productId]);
    // Get and calculate product price
    const productPrice =
      h.products[productId].price -
      h.products[productId].discount / 100 * h.products[productId].price;

    // Charge to Stripe
    const charge = await stripe.subscriptions.create(
      {
        customer: customer.id,
        items: [{ plan: h.products[productId].plan_id }],
        metadata: {
          address: req.body.address,
          country: req.body.country,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode,
          notes: req.body.notes,
          product_name: h.products[productId].name,
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
  } catch (err) {
    console.log("error:" + err);
  }
  //if no errors redirect the user after completion
  res.redirect("/account");
};
