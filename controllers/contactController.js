const nodemailer = require('nodemailer');

exports.contactPage = (req, res) => {
	res.render('contact.pug', { pageTitle: 'Contact | Patrick Koulalis', canonical: 'contact/'});
}

exports.contactPost = (req, res) => {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
		}
	});
	// setup email data with unicode symbols
	let mailOptions = {
			from: 'noreply@patrickkoulalis.com', // sender address
	    to: 'hello@patrickkoulalis.com', // list of receivers
			subject: `✅ patrickkoulalis.com | ${req.body.contactName} | ${req.body.contactEmail}`, // Subject line
			text: req.body.contactMsg, // plain text body
			html:
				`<p>Name: ${req.body.contactName}</p>` +
				`<p>Email: ${req.body.contactEmail}</p>` +
				`<p>Budget: ${req.body.contactBudget}</p>` +
				`<p>Company Name: ${req.body.contactCompanyName}</p>` +
				`<p>Website URL: ${req.body.contactWebsiteUrl}</p>` +
				`<p>Phone Number: ${req.body.contactPhoneNumber}</p>` +
				`<p>${req.body.contactMsg}</p>`
	};

	transporter.sendMail(mailOptions, (error) => {
		if(error) {
			res.render('contact.pug', {contact_err: true, contact_status_msg: "Message failed to send please try again.", page: 'contact'});
			return console.log(error);
		} else {
			res.redirect('/');
		}
	});
}