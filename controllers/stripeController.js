const stripe = require("stripe")("sk_test_QpHol8S3EiOFOHMRmipwiqVD");
const uuid = require("uuid-v4");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const h = require("../helpers");

// Display Stripe test page
exports.stripePage = (req, res) => {
  res.render("stripe.pug", { pageTitle: "Stripe Testing" });
};

// Stripe Checkout
exports.stripePay = async (req, res) => {
  try {
    let customer;
    let idemKey = uuid();
    console.log(req.user);

		// if there is a user logged in
    if (req.user) {
      // if user has a customer id grab it
      if (req.user.customer_id) {
        customer = await stripe.customers.retrieve(req.user.customer_id);
      } else {
        // if current user does not have a customer id create one.....
        customer = await stripe.customers.create({
          source: req.body.stripeToken,
          email: req.body.email
        });
        // .....then save customer id in the database
        const updatedCurrentUser = await User.findOneAndUpdate(
          { email: req.user.email },
          { customer_id: customer.id }
        );
        await updatedCurrentUser.save();
      }
    } else {
      // If there is no user with the checkout email create and new user in the database
      customer = await stripe.customers.create({
        source: req.body.stripeToken,
        email: req.user.email
      });
      // Also create a new stripe user
      const newUser = new User({
        full_name: req.body.full_name,
        email: req.body.email,
        customer_id: customer.id
      });
      // Save the new user to the database
      await newUser.save();
    }

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
