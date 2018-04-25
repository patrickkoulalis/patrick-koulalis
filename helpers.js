exports.dateFns = require("date-fns");

exports.siteTitle = "Patrick Koulalis - Boston Web Design & Development";

exports.formatPrice = cents => {
  return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

exports.menu = [
  { name: "Home", slug: "/" },
  { name: "Work", slug: "/work/" },
  { name: "About", slug: "/about/" },
  { name: "Solutions", slug: "/solutions/" },
  { name: "Blog", slug: "/blog/" },
  { name: "Contact", slug: "/contact/" }
];

exports.clients = [
  { name: "FireRock Marketing", logo: "firerock.png" },
  { name: "Red Spot Interactive", logo: "rsi.png" },
  { name: "LogicalJack SEO", logo: "LogicalJack.png" },
  { name: "Kwintessential", logo: "kwintessential.png" },
  { name: "iuvo Technologies", logo: "iuvo-tech.png" },
  { name: "WebMediaFX", logo: "webmediafx.png" }
  // { name: "Visible", logo: "visible.png" }
  // { name: "Rydu", logo: "rydu.png" },
  // { name: "Blanco EMS", logo: "blanco-ems.png" }
];

exports.products = {
  WP1: {
    name: "Basic",
    price: 75000,
    discount: 15,
    callout_text: "",
    features: [
      { title: "Number of Pages", value: "Up to 5" },
      { title: "Additional Pages", value: "$175" },
      {
        title: "Homepage Image or Video Slider",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      { title: "Included Stock Images", value: "3" },
      {
        title: "Integrated Contact Forms w/ Captcha",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Photo Gallery",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Embed Video",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Social Media Buttons",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Google Analytics",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Responsive Design",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Website Hosting (Fast, Secure, Reliable)",
        value: "$95/month (optional)"
      },
      { title: "Site Backup & Security", value: "Included with Web Hosting" },
      { title: "Website Training", value: "Up to 2 Hours" },
      { title: "Support", value: "14 days of Basic Support" }
    ],
    product_id: "WP1",
    category: "Website Packages"
  },
  WP2: {
    name: "Mid-Level",
    price: 250000,
    discount: 15,
    callout_text: "",
    features: [
      { title: "Number of Pages", value: "Up to 10" },
      { title: "Additional Pages", value: "$175" },
      {
        title: "Homepage Image or Video Slider",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      { title: "Included Stock Images", value: "5" },
      {
        title: "Integrated Contact Forms w/ Captcha",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Photo Gallery",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Embed Video",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Social Media Buttons",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Google Analytics",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Responsive Design",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Website Hosting (Fast, Secure, Reliable)",
        value: "$95/month (optional)"
      },
      { title: "Site Backup & Security", value: "Included with Web Hosting" },
      { title: "Website Training", value: "Up to 3 Hours" },
      { title: "Support", value: "30 days of Basic Support" }
    ],
    product_id: "WP2",
    category: "Website Packages"
  },
  WP3: {
    name: "Full Customization",
    price: 450000,
    discount: 15,
    callout_text: "",
    features: [
      { title: "Number of Pages", value: "Up to 15" },
      { title: "Additional Pages", value: "$175" },
      {
        title: "Homepage Image or Video Slider",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      { title: "Included Stock Images", value: "10" },
      {
        title: "Integrated Contact Forms w/ Captcha",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Photo Gallery",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Embed Video",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Social Media Buttons",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Google Analytics",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Responsive Design",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Website Hosting (Fast, Secure, Reliable)",
        value: "$95/month (optional)"
      },
      { title: "Site Backup & Security", value: "Included with Web Hosting" },
      { title: "Website Training", value: "Up to 5 Hours" },
      { title: "Support", value: "30 days of Basic Support" }
    ],
    product_id: "WP3",
    category: "Website Packages"
  },
  SP1: {
    name: "Start Up",
    price: 15000,
    discount: 0,
    callout_text: "",
    features: [
      "1 Extra Hour for Design",
      "2 hours of support",
      "10% off Additonal Hours"
    ],
    product_id: "SP1",
    plan_id: "plan_CbmAUDZFD3podO",
    category: "Support Plans"
  },
  SP2: {
    name: "Small Business",
    price: 35000,
    discount: 0,
    calloutText: "Best Seller",
    features: [
      "1 Extra Hour for Design",
      "2 hours of support",
      "10% off Additonal Hours"
    ],
    product_id: "SP2",
    category: "Support Plans"
  },
  SP3: {
    name: "Enterprise",
    price: 50000,
    discount: 0,
    callout_text: "",
    features: [
      "1 Extra Hour for Design",
      "2 hours of support",
      "10% off Additonal Hours"
    ],
    product_id: "SP3",
    category: "Support Plans"
  }
};

exports.faqs = {
  website_packages: [{ question: "what is this?", answer: "this is a thing" }]
};

exports.social = {
	twitter: 'twitter.com/patrickkoulalis',
}