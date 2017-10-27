const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', (req, res) => {
	res.render('index.pug', {page: 'Home'});
})


router.get('/contact', contactController.contactPage);

// Contact Form Post Routes
router.post('/contact', contactController.contactPost); //This contact form posts to contact


router.get('/work', (req, res) => {
	res.render('work.pug', { page: 'Work'});
});

router.get('/about', (req, res) => {
	res.render('about.pug', { page: `About`});
});

router.get('/services', (req, res) => {
	res.render('services.pug', { page: `Services`});
});

router.get('/services/web-design/', (req, res) => {
	res.render('web-design.pug', { page: `Web Design`});
});

router.get('/services/web-development/', (req, res) => {
	res.render('web-development.pug', { page: `Web Development` });
});

router.get('/t', (req, res) => {
	res.send('Tags');
});

router.get('*', (req, res) => {
	res.render('404.pug', {page: `404`});
});

module.exports = router;