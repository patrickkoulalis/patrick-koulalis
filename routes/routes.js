const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Secure traffic only
router.all('*', function (req, res, next) {
	if (req.secure) {
		return next();
	};
	res.redirect(`https://localhost:${process.env.HTTPS_PORT}${req.url}`);
	// res.redirect('https://’+req.hostname+”:”+app.get(‘port_https’)+req.url');
});

router.get('/', (req, res) => {
	res.render('index.pug', {page: 'Patrick Koulalis - Home'});
})

// Contact Form Post Routes
router.post('/', contactController.contactPost); //This contact form posts to contact


router.get('*', (req, res) => {
	res.render('404.pug', {page: '404'});
});


module.exports = router;