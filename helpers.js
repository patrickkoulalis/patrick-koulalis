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
    name: "Starter Site",
    price: 45000,
    discount: 0,
    callout_text: "",
    features: [
      { title: "Number of Pages", value: "Up to 5" },
      { title: "Additional Pages", value: "$75" },
      {
        title: "Homepage Image or Video Slider",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      { title: "Premium Stock Images", value: "5" },
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
    name: "Semi-Custom",
    price: 82500,
    discount: 0,
    callout_text: "",
    features: [
      { title: "Number of Pages", value: "Up to 10" },
			{ title: "Additional Pages", value: "$75" },
      {
        title: "Homepage Image or Video Slider",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      { title: "Premium Stock Images", value: "10" },
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
    name: "Custom WordPress",
    price: 120000,
    discount: 0,
    callout_text: "",
    features: [
      { title: "Number of Pages", value: "Up to 15" },
			{ title: "Additional Pages", value: "$75" },
      {
        title: "Homepage Image or Video Slider",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      { title: "Premium Stock Images", value: "20" },
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
    price: 17500,
    discount: 0,
    callout_text: "",
    features: [
      {
        title: "Daily Site Backups",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Sucuri Security Check",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Website Updates",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Uptime Monitoring",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Performance Audit",
        value: "",
        icon: "/images/icons/times-red.svg"
      },
      {
        title: "SEO Ranking",
        value: "",
        icon: "/images/icons/times-red.svg"
      },
      {
        title: "Website Report",
        value: "Monthly ",
        icon: ""
      },
      {
        title: "Dedicated Development/Design",
        value: "4 Hours",
        icon: ""
      },
      {
        title: "Additional Hours Discount",
        value: "15% Off",
        icon: ""
      }
    ],
    product_id: "SP1",
    plan_id: "SP1",
    category: "Maintenance Plans"
  },
  SP2: {
    name: "Small Business",
    price: 35000,
    discount: 0,
    callout_text: "",
    features: [
      {
        title: "Daily Site Backups",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Sucuri Security Check",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Website Updates",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Uptime Monitoring",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Performance Audit",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "SEO Ranking",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Website Report",
        value: "Monthly",
        icon: ""
      },
      {
        title: "Dedicated Development/Design",
        value: "8 Hours",
        icon: ""
      },
      {
        title: "Additional Hours Discount",
        value: "25% Off",
        icon: ""
      }
    ],
    product_id: "SP2",
    plan_id: "SP2",
    category: "Maintenance Plans"
  },
  SP3: {
    name: "Enterprise",
    price: 75000,
    discount: 0,
    callout_text: "",
    features: [
      {
        title: "Daily Site Backups",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Sucuri Security Check",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Website Updates",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Uptime Monitoring",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Performance Audit",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "SEO Ranking",
        value: "",
        icon: "/images/icons/check-green.svg"
      },
      {
        title: "Website Report",
        value: "Weekly",
        icon: ""
      },
      {
        title: "Dedicated Development/Design",
        value: "16 Hours",
        icon: ""
      },
      {
        title: "Additional Hours Discount",
        value: "35% Off",
        icon: ""
      }
    ],
    product_id: "SP3",
    plan_id: "SP3",
    category: "Maintenance Plans"
  }
};

exports.social = {
  twitter: "twitter.com/patrickkoulalis"
};

exports.flashes = {
  error: `An error has occurred. Please try again, and if the problem persists, contact the customer success team.`,
  success: ""
};
