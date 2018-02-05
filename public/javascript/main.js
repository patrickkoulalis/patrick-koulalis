import '../sass/main.scss';
import '../javascript/checkout';

function topNavToggle() {
  const siteWrap = document.querySelector('.site-wrap');
  const toggleButton = document.querySelector('.nav-button');
  const nav = document.querySelector('.nav');
  const navMenu = document.querySelector('.nav__menu');
  toggleButton.addEventListener('click', function() {
    toggleButton.classList.toggle('nav-button--active');
    navMenu.classList.toggle('nav__menu--active');
    siteWrap.classList.toggle('site-wrap--active');
    nav.classList.toggle('nav--active');
  });
}

function getStartedScroll() {
  const mainContent = document.querySelector('main');
  const getStartedButton = document.querySelector('.masthead__cta');
  const nav = document.querySelector('.nav');
  let mainContentHeight = mainContent.offsetTop - nav.offsetHeight;
  console.log(mainContentHeight);
  getStartedButton.addEventListener('click', () => {
    window.scrollTo({
      top: mainContentHeight,
      behavior: 'smooth'
    });
  });

}


topNavToggle();
if (window.location.pathname === '/') {
  getStartedScroll();
}