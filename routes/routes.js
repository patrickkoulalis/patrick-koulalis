const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', (req, res) => {
	res.render('index.pug', {page: 'Patrick Koulalis - Home'});
})


router.get('/contact', contactController.contactPage);

// Contact Form Post Routes
router.post('/contact', contactController.contactPost); //This contact form posts to contact


router.get('/work', (req, res) => {
	res.render('work.pug', {page: 'Patrick Koulalis - Work'});
});

router.get('/about', (req, res) => {
	res.render('about.pug', {page: 'Patrick Koulalis - About'});
});

router.get('/services', (req, res) => {
	res.render('services.pug', {page: 'Patrick Koulalis - Services'});
});

router.get('/web-design', (req, res) => {
	res.render('web-design.pug', {page: 'Patrick Koulalis - Web Design'});
});

router.get('/web-development', (req, res) => {
	res.render('web-development.pug', {page: 'Patrick Kouilalis - Web Development'});
});

router.get('/t', (req, res) => {
	res.send('Tags');
});

router.get('*', (req, res) => {
	res.render('404.pug', {page: '404'});
});

module.exports = router;