const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', (req, res) => {
	res.render('index.pug', { pageTitle: 'Patrick Koulalis - Boston Web Design & Development', canonical: '', page: 'home'});
})

router.get('/contact', contactController.contactPage);

// Contact Form Post Routes
router.post('/contact', contactController.contactPost); //This contact form posts to contact


router.get('/work', (req, res) => {
	res.render('work.pug', { pageTitle: 'Web Design & Development Work | Patrick Koulalis', canonical: 'work/'});
});

router.get('/about', (req, res) => {
	res.render('about.pug', { pageTitle: 'About | Patrick Koulalis', canonical: 'about/'});
});

router.get('/services', (req, res) => {
	res.render('services.pug', { pageTitle: 'Web Design & Development Services | Patrick Koulalis', canonical: 'services/'});
});

router.get('/services/web-design/', (req, res) => {
	res.render('web-design.pug', { pageTitle: 'Web Design | Patrick Koulalis', canonical: 'web-design/'});
});

router.get('/services/web-development/', (req, res) => {
	res.render('web-development.pug', { pageTitle: 'Web Development | Patrick Koulalis', canonical: 'web-development/' });
});

router.get('/t', (req, res) => {
	res.send('Tags');
});

router.get('*', (req, res) => {
	res.render('404.pug', { pageTitle: `404`});
});

module.exports = router;