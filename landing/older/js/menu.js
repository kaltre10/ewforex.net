// selector
var menu = document.querySelector('.hamburger');

// method
function toggleMenu (event) {
  this.classList.toggle('is-active');
  document.querySelector( ".nav-items" ).classList.toggle("nav-items-active");
  event.preventDefault();
}

// event
menu.addEventListener('click', toggleMenu, false);