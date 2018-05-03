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
    discount: 0,
    callout_text: "",
    features: [
      { title: "Number of Pages", value: "Up to 5" },
      { title: "Additional Pages", value: "$150" },
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
      { title: "Website Training", value: "Up to 2 Hours" }
    ],
    product_id: "WP1",
    category: "Website Packages"
  },
  WP2: {
    name: "Enhanced",
    price: 150000,
    discount: 0,
    callout_text: "",
    features: [
      { title: "Number of Pages", value: "Up to 10" },
      { title: "Additional Pages", value: "$150" },
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
      { title: "Website Training", value: "Up to 3 Hours" }
    ],
    product_id: "WP2",
    category: "Website Packages"
  },
  WP3: {
    name: "Ultimate",
    price: 300000,
    discount: 0,
    callout_text: "",
    features: [
      { title: "Number of Pages", value: "Up to 15" },
      { title: "Additional Pages", value: "$150" },
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
      { title: "Website Training", value: "Up to 5 Hours" }
    ],
    product_id: "WP3",
    category: "Website Packages"
  },
  SP1: {
    name: "Start Up",
    price: 25000,
    discount: 0,
    callout_text: "",
    features: [
      "3 hours of support",
      "Monthly Site Backups",
      "Performance Audit",
      "Monthly Website Report",
      "15% off Additonal Hours"
    ],
    product_id: "SP1",
    plan_id: "BSP",
    category: "Support Plans"
  },
  SP2: {
    name: "Small Business",
    price: 75000,
    discount: 0,
    callout_text: "",
    features: [
      "10 hours of support",
      "Weekly Site Backups",
      "Performance Audit",
      "Monthly Website Report",
      "25% off Additonal Hours"
    ],
    product_id: "SP2",
    plan_id: "BSP",
    category: "Support Plans"
  },
  SP3: {
    name: "Enterprise",
    price: 250000,
    discount: 0,
    callout_text: "",
    features: [
      "20 hours of support",
      "Daily Site Backups",
      "Performance Audit",
      "Weekly Website Report",
      "35% off Additonal Hours"
    ],
    product_id: "SP3",
    plan_id: "BSP",
    category: "Support Plans"
  }
};

exports.social = {
  twitter: "twitter.com/patrickkoulalis"
};
