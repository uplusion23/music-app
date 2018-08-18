var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
  bridge.player = new YT.Player('player', {
    height: '450',
    width: '800',
    videoId: 'gJTQryWbzM8',
    playerVars: {
      'controls' : 0,
      'modestbranding' : 1,
      'rel' : 0,
      'showinfo' : 0
    },
    events: {
      'onReady': function() {
      },
      'onStateChange': function(event) {
        //console.log(event);
        if (event.data == YT.PlayerState.PLAYING) {
          bridge.mediaControls.playing = true;
          bridge.mediaControls.updateSeek();
          bridge.mediaControls.updateInfo();
        } else {
          clearInterval(bridge.mediaControls._updateSeek);
        }
      }
    }
  });
}

bridge.playlist = [
  'gJTQryWbzM8',
  'J_yvaxEE5cQ'
];
