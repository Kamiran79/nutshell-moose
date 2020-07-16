import utils from '../../helpers/utils';
import './navbar.scss';

const activeNavLink = (e) => {
  e.preventDefault();

  const allMenuItems = $('.nav-item');
  allMenuItems.removeClass('active');

  const menuItem = $(`#${e.target.closest('li').id}`);

  menuItem.addClass('active');
};

const buildNavbar = () => {
  const domString = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand">Le Baguette. <i class="fas fa-bread-slice"></i></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
        <div class="nav-group">
          <ul class="navbar-nav">
            <li class="nav-item" id="menu-link">
              <a class="nav-link">Menu</a>
            </li>
            <li class="nav-item" id="staff-link">
              <a class="nav-link">Staff</a>
            </li>
            <li class="nav-item" id="ingredient-link">
              <a class="nav-link">Ingredients</a>
            </li>
            <li class="nav-item" id="reservations-link">
              <a class="nav-link">Reservations</a>
            </li>
            <li class="nav-item" id="seating-link">
              <a class="nav-link">Seating</a>
            </li>
          </ul>
        </div>
      </div>
      <button class="btn btn-primary" id="sign-in-button">Sign In</button>
      <button class="btn btn-primary hide" id="sign-out-button">Sign Out</button>
    </nav>
  `;

  // these click events are temporary. plan to add the `activeNavLink()` function to each build function for the dashboard items

  $('body').on('click', '#menu-link', activeNavLink);
  $('body').on('click', '#staff-link', activeNavLink);
  $('body').on('click', '#ingredient-link', activeNavLink);
  $('body').on('click', '#reservations-link', activeNavLink);
  $('body').on('click', '#seating-link', activeNavLink);

  utils.printToDom('#navbar', domString);
};

export default { buildNavbar };