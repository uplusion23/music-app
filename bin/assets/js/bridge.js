var bridge = {
  utils: {
    getPercentage: function(num1, num2) {
      return (num1 / num2) * 100;
    },
    reversePercentage: function(percent, total) {
      return (percent / 100) * total;
    }
  },
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
    _updateSeek: null,
    updateSeek: function() {
      bridge.mediaControls._updateSeek = setInterval(function() {
        var totalTime = bridge.player.getDuration();
        var currentTime = bridge.player.getCurrentTime();
        var percentage = bridge.utils.getPercentage(currentTime, totalTime);
        $('.controls > .seekBar > .progress').attr('style', 'width: ' + percentage + '%');
      }, 900);
    },
    setSeek: function(percent) {
      $('.controls > .seekBar > .progress').attr('style', 'width: ' + percent + '%');
      var num = bridge.utils.reversePercentage(percent, bridge.player.getDuration());
      bridge.player.seekTo(num)
    }
  },
  player: null
}
bridge.mediaControls.updateInfo('NP1u3Q5zswg');
