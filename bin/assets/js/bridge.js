var bridge = {
  mediaControls: {
    playing: false,
    togglePlay: function() {
      if (this.playing === false) {
        bridge.player.playVideo();
        bridge.mediaControls.updateInfo(bridge.player.getVideoData().video_id);
        this.playing = true;
      } else {
        bridge.player.pauseVideo();
        this.playing = false;
      }
    },
    getVideoInfo: function(id, callback) {
      $.ajax({
        type: 'GET',
        url: "https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=" + id + "&key=AIzaSyCKd--Y4CLdXIIs575jNGO0RfBPkvGuHDo",
        contentType: 'application/json',
        dataType: 'jsonp',
        responseType:'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          'Access-Control-Allow-Credentials' : true,
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'GET',
          'Access-Control-Allow-Headers':'application/json',
        },
        success: function(data) {
          callback(data);
        },
        error: function(error) {
          callback(error);
        }
      });
    },
    updateInfo: function(id) {
      bridge.mediaControls.getVideoInfo(id, function(data) {
        console.log(data)
        $('[data-info="albumart"]').each(function() {
          $(this).css("background-image", "url(" + data.items[0].snippet.thumbnails.medium.url + ")");
        });
        $('[data-info="title"]').each(function() {
          $(this).text(data.items[0].snippet.title)
        });
        $('[data-info="author"]').each(function() {
          $(this).text(data.items[0].snippet.channelTitle)
        });
      });
    }
  },
  player: null
}
bridge.mediaControls.updateInfo('NP1u3Q5zswg');
