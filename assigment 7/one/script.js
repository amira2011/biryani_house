$(document).ready(function() {
  $("#sidebar").click(function() {
    $(this).toggleClass("active");
  });

  // Dropdown functionality
  $(".dropdown-toggle").click(function(event) {
    event.preventDefault(); // Prevent default link action
    $(this).next(".dropdown-menu").slideToggle();
  });
});