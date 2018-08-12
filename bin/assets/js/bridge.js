var bridge = {
  mediaControls: {
    playing: false,
    togglePlay: function() {
      if (this.playing === false) {
        bridge.player.playVideo();
        bridge.mediaControls.updateInfo();
        this.playing = true;
      } else {
        bridge.player.pauseVideo();
        this.playing = false;
      }
    },
    updateInfo: function() {
      $('[data-info="title"]').each(function() {
        $(this).text(bridge.player.getVideoData().title)
      });
    }
  },
  player: null
}
