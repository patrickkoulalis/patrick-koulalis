import '../sass/main.scss';

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

topNavToggle();