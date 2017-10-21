import '../sass/main.scss';

function topNavToggle() {
  const toggleButton = document.querySelector('.menu-button');
  const navMenu = document.querySelector('.nav__menu');
  toggleButton.addEventListener('click', function() {
    navMenu.classList.toggle('nav__menu--active');
  });
}

topNavToggle();