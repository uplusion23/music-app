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

$('body').on('mousemove change', '.volume input[type="range"]', function() {
  bridge.mediaControls.setVolume($(this).val());
});

$('.volume').on('wheel', function(event) {
  event.preventDefault();
  var $slider = $('.volume input[type="range"]');
  var current = parseInt($slider.val());
  if (event.originalEvent.deltaY < 0) {
    if (current < 100) {
      $slider.val(current + 5);
    }
  } else {
    if (current > 0) {
      $slider.val(current - 5);
    }
  }

  $slider.trigger('change');
});

$('body').on('keydown', '.search > input', function(e) {
  if (e.keyCode == 13) { // Enter pressed
    bridge.youtube.search(encodeURI($(this).val()), 25, 'fff', function(data) {
      bridge.ui.addResult(data);
    });
  }
});
