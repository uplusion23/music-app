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
        url: "https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=" + id + "&key=" + key,
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
        console.log(data);
        $('[data-info="albumart"]').each(function() {
          $(this).css("background-image", "url(" + data.items[0].snippet.thumbnails.medium.url + ")");
        });
        $('.videoCard > .thumbnail').each(function() {
          $(this).css("background-image", "url(" + data.items[0].snippet.thumbnails.maxres.url + ")");
        });
        $('.videoCard > .thumbnail_blur').each(function() {
          $(this).css("background-image", "url(" + data.items[0].snippet.thumbnails.maxres.url + ")");
        });
        $('[data-info="title"]').each(function() {
          $(this).text(data.items[0].snippet.title)
        });
        $('[data-info="author"]').each(function() {
          $(this).text(data.items[0].snippet.channelTitle)
        });
      });
    },
    updateSeek: function(event) {
      var seekUpdate;
      if (event.data == YT.PlayerState.PLAYING) {
        var totalTime = bridge.player.getDuration();
        seekUpdate = setInterval(function() {
          var currentTime = bridge.player.getCurrentTime();
          var percentage = (currentTime / totalTime) * 100;
          $('.controls > .seekBar > .progress').attr('style', 'width: ' + percentage + '%');
        }, 900);
      } else {
        if (seekUpdate != undefined) {
          clearTimeout(seekUpdate);
        }
      }
    }
  },
  player: null
}
bridge.mediaControls.updateInfo('NP1u3Q5zswg');
