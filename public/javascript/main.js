import "../sass/main.scss";
import "../javascript/checkout";
const axios = require("axios");

getStartedScroll();
loadImages();
topNavToggle();

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

// Replaced with AXIOS. DELETE ME!
function getImage(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.responseType = "blob";
    request.onload = () => {
      if (request.status === 200) {
        resolve(request.response);
      } else {
        reject(
          Error(
            "Image didn't load successfully; error code:" + request.statusText
          )
        );
      }
    };
    request.onerror = () => {
      reject(Error("There was a network error."));
    };
    request.send();
  });
}

// If <img> has a data-image-src attrabuite
// load blurry image first, and grab final image as a promise.
async function loadImages() {
  const images = document.querySelectorAll("img");
  for (let image of images) {
    if (image.dataset.imageSrc && image.dataset.imageSrc != undefined) {
      try {
        const imageBlob = await axios(image.dataset.imageSrc, {
          responseType: "blob"
        });
        const imageURL = imageBlob.request.responseURL;
        image.src = imageURL;
      } catch (err) {
        throw Error(err);
      }
    }
  }
}

const packageButtons = document.querySelectorAll(".package-card button");
const paymentPopup = document.querySelector(".payment-popup");
const closePopup = document.querySelector(".payment-popup__close");
const productIdInput = document.querySelector("#product-id");
const buttonPrice = document.querySelector("#payment-form-submit .amount");
for (let button of packageButtons) {
  console.log(button.dataset);
  button.addEventListener("click", () => {
    paymentPopup.classList.add("payment-popup--active");
    productIdInput.setAttribute("value", button.dataset.productId);
    buttonPrice.textContent = button.dataset.price;
  });
  closePopup.addEventListener("click", () => {
    paymentPopup.classList.remove("payment-popup--active");
  });
}
