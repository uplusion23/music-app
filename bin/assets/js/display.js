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
  $('.sidemenu > .header').text(disGlobals.username);
});

$('body').on('click', '[data-action="playpause"]', function() {
  bridge.mediaControls.togglePlay();
  if (bridge.mediaControls.playing) {
    $(this).children('i').removeClass('ion-md-play');
    $(this).children('i').addClass('ion-md-pause');
  } else {
    $(this).children('i').removeClass('ion-md-pause');
    $(this).children('i').addClass('ion-md-play');
  }
});

$('body').on('click', '.controls > .seekBar', function(event) {
  var percentage = (event.clientX-this.offsetLeft) / this.offsetWidth * 100;
  bridge.mediaControls.setSeek(percentage);
  //console.log("Video Value should be set to: " + bridge.utils.reversePercentage(percentage, bridge.player.getDuration()))
});

$('body').on('mousemove', '.volume input[type="range"]', function() {
  bridge.mediaControls.setVolume($(this).val());
});
