const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const stripeController = require('../controllers/stripeController.js');

var stripe = require("stripe")(
	"sk_test_QpHol8S3EiOFOHMRmipwiqVD"
);


// Homepage
router.get('/', (req, res) => {
	res.render('index.pug', { pageTitle: 'Patrick Koulalis - Boston Web Design & Development', canonical: '', page: 'home'});
})

// Stripe Test Page
router.get('/stripe-test', stripeController.stripePage);
router.post('/stripe-test', stripeController.stripePay);

router.get('/contact', contactController.contactPage);

// Contact Form Post Routes
router.post('/contact', contactController.contactPost); //This contact form posts to contact


router.get('/work', (req, res) => {
	res.render('work.pug', { pageTitle: 'Web Design & Development Work | Patrick Koulalis', canonical: 'work/'});
});

router.get('/about', (req, res) => {
	res.render('about.pug', { pageTitle: 'About | Patrick Koulalis', canonical: 'about/'});
});

router.get('/solutions', (req, res) => {
	res.render('solutions.pug', { pageTitle: 'Web Design & Development Services | Patrick Koulalis', canonical: 'services/'});
});

router.get('/support-plans', (req, res) => {
	res.render('support.pug')
});

router.get('/t', (req, res) => {
	res.send('Tags');
});

router.get('*', (req, res) => {
	res.render('404.pug', { pageTitle: `404`});
});

module.exports = router;