const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', (req, res) => {
	res.render('index.pug', {page: 'Patrick Koulalis - Home'});
})

// Contact Form Post Routes
router.post('/', contactController.contactPost); //This contact form posts to contact


router.get('*', (req, res) => {
	res.render('404.pug', {page: '404'});
});

module.exports = router;