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
    videoId: 'NP1u3Q5zswg',
    events: {
    //  'onReady': bridge.mediaControls.playerReady()
    //  'onStateChange': onPlayerStateChange
    }
  });
}
