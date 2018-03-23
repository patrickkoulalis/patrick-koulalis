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
	{ name: "WebMediaFX", logo: "webmediafx.png" },
	// { name: "Visible", logo: "visible.png" }
  // { name: "Rydu", logo: "rydu.png" },
  // { name: "Blanco EMS", logo: "blanco-ems.png" }
];

exports.products = {
  WP1: {
    name: "Wood",
    price: 75000,
    on_sale: true,
    discount: 10,
    callout_text: "On Sale",
    features: [
      "Wordpress CMS",
      "Basic Theme Customization",
      "Page setup (up to 5 pages)",
      "14 days of Basic Support",
      "2 Plugins",
      "Plugin Customization",
      "No Domain",
      "No Web Hosting"
    ],
    product_id: "WP1",
    category: "Website Packages"
  },
  WP2: {
    name: "Stone",
    price: 120000,
    on_sale: true,
    discount: 15,
    callout_text: "Best Seller",
    features: [
      "Wordpress CMS",
      "Basic Theme Customization",
      "Page setup (up to 10 pages)",
      "30 days of Basic Support",
      "5 Plugins",
      "Plugin Customization",
      "No Domain",
      "No Web Hosting"
    ],
    product_id: "WP2",
    category: "Website Packages"
  },
  WP3: {
    name: "Metal",
    price: 500000,
    on_sale: true,
    discount: 35,
    callout_text: "On Sale",
    features: [
      "Wordpress CMS",
      "Full Theme Customization",
      "Page setup (up to 40)",
      "10+ Plugins",
      "Plugin Customization",
      "1 Domain",
      "Basic Web Hosting",
      "30 days of Basic Support"
    ],
    product_id: "WP3",
    category: "Website Packages"
  },
  SP1: {
    name: "Wood",
    price: 15000,
    on_sale: true,
    discount: 10,
    callout_text: "On Sale",
    features: [
      "1 Wordpress Install",
      "1 Theme",
      "Page setup (up to 5 pages)",
      "14 days of Basic Support",
      "No Domain",
      "No Web Hosting"
    ],
    product_id: "SP1",
    category: "Support Plans"
  },
  SP2: {
    name: "Stone",
    price: 35000,
    on_sale: true,
    discount: 15,
    calloutText: "Best Seller",
    features: [
      "1 Wordpress Install",
      "1 Theme",
      "Page setup (up to 10 pages)",
      "30 days of Basic Support",
      "No Domain",
      "No Web Hosting"
    ],
    product_id: "SP2",
    category: "Support Plans"
  },
  SP3: {
    name: "Metal",
    price: 50000,
    on_sale: true,
    discount: 35,
    callout_text: "On Sale",
    features: [
      "1 Wordpress Install",
      "1 Theme",
      "Page setup (up to 20 pages)",
      "30 days of Basic Support",
      "1 Domain",
      "Basic Web Hosting"
    ],
    product_id: "SP3",
    category: "Support Plans"
  }
};

exports.supportPlans = {};

exports.faqs = {
  website_packages: [{ question: "what is this?", answer: "this is a thing" }]
};
