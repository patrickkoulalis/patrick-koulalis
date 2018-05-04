// import Raven from 'raven-js';
import "../sass/main.scss";
import "../javascript/checkout";
const axios = require("axios");

// Error Capturing for the browser
// Raven
//     .config('https://ee413322e1944efbb5ced428eda8b006@sentry.io/301174')
// 		.install();

getStartedScroll();
topNavToggle();
flashClose();
paymentPopup();


function flashClose() {
	const flashClose = Array.from(document.querySelectorAll(".flash-close"));
	for (close of flashClose) {
		close.addEventListener("click", function() {
			this.parentNode.remove();
		});
	}
}

function topNavToggle() {
	const siteWrap = document.querySelector(".site-wrap");
	const toggleButton = document.querySelector(".nav-button");
	const nav = document.querySelector(".nav");
	const navMenu = document.querySelector(".nav__menu");
	toggleButton.addEventListener("click", function() {
		toggleButton.classList.toggle("nav-button--active");
		navMenu.classList.toggle("nav__menu--active");
		siteWrap.classList.toggle("site-wrap--active");
		nav.classList.toggle("nav--active");
	});
}

function getStartedScroll() {
	if (window.location.pathname === "/") {
		const mainContent = document.querySelector("main");
		const getStartedButton = document.querySelector(".masthead__cta");
		const nav = document.querySelector(".nav");
		let mainContentHeight = mainContent.offsetTop - nav.offsetHeight;
		getStartedButton.addEventListener("click", () => {
			window.scrollTo({
				top: mainContentHeight,
				behavior: "smooth"
			});
		});
	}
}

function paymentPopup() {
	const productButtons = document.querySelectorAll(".product-card button");
	const paymentPopup = document.querySelector(".payment-popup");
	const closePopup = document.querySelector(".payment-popup__close");
	const productIdInput = document.querySelector("#product-id");
	const buttonPrice = document.querySelector("#payment-form-submit .amount");
	for (let button of productButtons) {
		button.addEventListener("click", () => {
			paymentPopup.classList.add("payment-popup--active");
			productIdInput.setAttribute("value", button.dataset.productId);
			buttonPrice.textContent = button.dataset.price;
		});
		closePopup.addEventListener("click", () => {
			paymentPopup.classList.remove("payment-popup--active");
		});
	}
}