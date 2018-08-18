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

        if (bridge.mediaControls.playing === true) {
          $('[data-action="playpause"]').children('i').removeClass('ion-md-play');
          $('[data-action="playpause"]').children('i').addClass('ion-md-pause');
        } else {
          $('[data-action="playpause"]').children('i').removeClass('ion-md-pause');
          $('[data-action="playpause"]').children('i').addClass('ion-md-play');
        }
      }, 900);
    },
    setSeek: function(percent) {
      $('.controls > .seekBar > .progress').attr('style', 'width: ' + percent + '%');
      var num = bridge.utils.reversePercentage(percent, bridge.player.getDuration());
      bridge.player.seekTo(num);
    },
    setVolume: function(val) {
      bridge.player.setVolume(val);
    }
  },
  ui: {
    addResult: function(data) {
      for (var i = 0; i < data.items.length; i++) {
        var item = data.items[i];
        $('.searchResults > .card').append('\
        <div class="result_youtube">\
          <div class="thumbnail" style="background-image: url(' + item.snippet.thumbnails.medium.url + ')"></div>\
          <div class="info">\
            <span>' + item.snippet.title + '</span>\
            <span class="description">' + item.snippet.description + '</span>\
          </div>\
        </div>\
        ');
      }
    }
  },
  player: null
}
bridge.mediaControls.updateInfo('gJTQryWbzM8');

$.ajax({
  type: 'GET',
  url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=Hippie+Sabotage&key=" + key + "&maxResults=25",
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
    bridge.ui.addResult(data);
  },
  error: function(error) {
  }
});
