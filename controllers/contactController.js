const nodemailer = require("nodemailer");
const Raven = require("raven");
const h = require("../helpers.js");

exports.contactPage = (req, res) => {
  res.render("contact.pug", {
    pageTitle: "Contact | Patrick Koulalis",
    canonical: "contact/"
  });
};

exports.contactPost = (req, res) => {
  if (req.err) {
    Raven.captureException(err);
    req.flash("error", h.flashes.error);
    res.redirect("back");
  }
  req.flash(
    "success",
    "Thanks for reaching out! We will get back to you shortly."
  );
  res.redirect("back");
};

exports.handleMail = (req, res, next) => {
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
    from: "noreply@patrickkoulalis.com", // sender address
    to: "patrick@patrickkoulalis.com", // list of receivers
    subject: `✅ patrickkoulalis.com | ${req.body.contactName} | ${
      req.body.contactEmail
    }`, // Subject line
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
  transporter.sendMail(mailOptions, err => {
    if (err) {
      req.err = err;
    }
    next();
  });
};
