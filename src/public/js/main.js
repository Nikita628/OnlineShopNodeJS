const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');
const html = document.querySelector('html');
const themeToggler = document.querySelector('.theme-toggler');

function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

backdrop.addEventListener('click', backdropClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);
themeToggler.addEventListener('click', toggleTheme);

function toggleTheme() {
  if (html) {
      html.toggleAttribute('dark');
  }
}