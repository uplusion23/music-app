var disGlobals = {
  username: require("os").userInfo().username
}

$('body').on('click', '.menuToggle', function() {
  $('body').addClass("sidemenuActive");
});

$('body').on('click', '.shadow', function() {
  $('body').removeClass("sidemenuActive");
});

$(document).ready(function() {
  $('.sidemenu > .header').text(disGlobals.username)
});
