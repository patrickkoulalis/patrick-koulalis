const stripe = require("stripe")(
	"sk_test_QpHol8S3EiOFOHMRmipwiqVD"
);

// Display Stripe test page
exports.stripePage = (req, res) => {
	res.render('stripe.pug', { pageTitle: 'Stripe Testing' });
}

// Stripe Checkout
exports.stripePay = (req, res) => {
	// Create a unique idempotency key
	// Change this to use uuid in case two people try to checkout at the same time(unlikly but could happen)
	let idemKey = Date.now();
	// Charge to Stripe
	stripe.charges.create({
		amount: 100,
		currency: "usd",
		source: "tok_visa", // obtained with Stripe.js
		description: "Charge for mason.jackson@example.com"
	},
	{
		idempotency_key: idemKey
	},
	function (err, charge) {
		console.log(charge);
		res.redirect('/stripe-test');
	});
}