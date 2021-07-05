<template>
  <div v-if="videoTodisplay">
    <div
      v-if="
        isSafari &&
        mobile &&
        (videoTodisplay.toLowerCase().includes('allfoot.') ||
          videoTodisplay.toLowerCase().includes('stream'))&&
        !videoTodisplay.toLowerCase().includes('ninjastream')
      "
      class="safariStream"
    >
      <a target="_blank" :href="videoTodisplay">
        <i aria-hidden="true" class="fa fa-play-circle-o"></i>
      </a>
    </div>

    <div
      v-else-if="videoTodisplay.toLowerCase().includes('.mp3')"
      class="lecteur-audio-songs"
    >
      <vue-plyr>
        <audio>
          <source :src="videoTodisplay" />
          Your browser does not support the audio element.
        </audio>
      </vue-plyr>
    </div>
    <div
      v-else-if="videoTodisplay.toLowerCase().includes('videos.sh')"
      class="video-wrap"
    >
      <vue-plyr>
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            :src="
              videoTodisplay.includes('.mp4')
                ? videoTodisplay.replace('.mp4', '')
                : videoTodisplay
            "
            controls
            crossorigin
            allowfullscreen
            allowtransparency
          ></iframe>
        </div>
      </vue-plyr>
    </div>
    <div
      v-else-if="videoTodisplay.toLowerCase().includes('dood')"
      class="video-wrap"
    >
      <vue-plyr>
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            :src="
              videoTodisplay.includes('.mp4')
                ? videoTodisplay.replace('.mp4', '')
                : videoTodisplay
            "
            controls
            crossorigin
            allowfullscreen
            allowtransparency
          ></iframe>
        </div>
      </vue-plyr>
    </div>
    <div
      v-else-if="videoTodisplay.toLowerCase().includes('oms')"
      class="video-wrap"
    >
      <vue-plyr>
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            :src="
              videoTodisplay.includes('.mp4')
                ? videoTodisplay.replace('.mp4', '')
                : videoTodisplay
            "
            controls
            crossorigin
            allowfullscreen
            allowtransparency
          ></iframe>
        </div>
      </vue-plyr>
    </div>
    <div
      v-else-if="videoTodisplay.toLowerCase().includes('streamable')"
      class="video-wrap"
    >
      <vue-plyr>
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            :src="
              videoTodisplay.includes('.mp4')
                ? videoTodisplay.replace('.mp4', '')
                : videoTodisplay
            "
            controls
            crossorigin
            allowfullscreen
            allowtransparency
          ></iframe>
        </div>
      </vue-plyr>
    </div>
    <div
      v-else-if="videoTodisplay.toLowerCase().includes('viditnow')"
      class="video-wrap"
    >
      <vue-plyr>
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            :src="
              videoTodisplay.includes('.mp4')
                ? videoTodisplay
                    .replace('.mp4', '')
                    .replace('player/html', 'embed')
                    .replace('yfl.viditnow.com', 'player.videolen.com')
                : videoTodisplay
                    .replace('player/html', 'embed')
                    .replace('yfl.viditnow.com', 'player.videolen.com')
            "
            controls
            crossorigin
            allowfullscreen
            allowtransparency
          ></iframe>
        </div>
      </vue-plyr>
    </div>
    <div
      v-else-if="videoTodisplay.toLowerCase().includes('embed00')"
      class="video-wrap"
    >
      <vue-plyr>
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            :src="
              videoTodisplay.includes('.mp4')
                ? videoTodisplay.replace('.mp4', '')
                : videoTodisplay
            "
            controls
            crossorigin
            allowfullscreen
            allowtransparency
          ></iframe>
        </div>
      </vue-plyr>
    </div>

    <vue-plyr v-else-if="videoTodisplay.toLowerCase().includes('youtu')">
      <div class="plyr__video-embed">
        <iframe
          loading="lazy"
          :src="
            videoTodisplay +
            '?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1'
          "
          controls
          crossorigin
          allowfullscreen
          allowtransparency
        ></iframe>
      </div>
    </vue-plyr>

    <vue-plyr v-else-if="videoTodisplay.toLowerCase().includes('.mp4')">
      <video>
        <source :src="videoTodisplay" type="video/mp4" />
      </video>
    </vue-plyr>
    <vue-plyr v-else-if="videoTodisplay.toLowerCase().includes('.ogg')">
      <video>
        <source :src="videoTodisplay" type="video/ogg" />
      </video>
    </vue-plyr>
    <vue-plyr v-else-if="videoTodisplay.toLowerCase().includes('.webm')">
      <video>
        <source :src="videoTodisplay" type="video/webm" />
      </video>
    </vue-plyr>

    <!-- <videoLiveComp
			v-else-if="videoTodisplay.toLowerCase().includes('m3u')"
			:videoIndex="'videoIndex'+index"
			:srcVideo="videoTodisplay"
		></videoLiveComp>-->
    <div
      v-else-if="
        !videoTodisplay.includes('sporttube') &&
        (videoTodisplay.toLowerCase().includes('embed') ||
          videoTodisplay.toLowerCase().includes('player'))
      "
      class="video-wrap"
    >
      <vue-plyr>
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            class="plyr__video-embed"
            :src="
              videoTodisplay.toLowerCase().includes('player')
                ? videoTodisplay
                    .replace('player/html', 'embed')
                    .replace('autoplay=true', 'autoplay=false')
                    .replace('autoplay-mute=1', 'autoplay-mute=0')
                : videoTodisplay
                    .replace('autoplay=true', 'autoplay=false')
                    .replace('autoplay-mute=1', 'autoplay-mute=0')
            "
            controls
            crossorigin
            allowfullscreen
            allowtransparency
          ></iframe>
        </div>
      </vue-plyr>
    </div>
    <vue-plyr v-else-if="videoTodisplay.toLowerCase().includes('mpd')">
      <video :srcVideo="videoTodisplay"></video>
    </vue-plyr>
    <div v-else class="video-wrap">
      <vue-plyr>
        <div class="plyr__video-embed">
          <iframe
            crossorigin="anonymous"
            loading="lazy"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allow="autoplay"
            allowfullscreen="true"
            scrolling="no"
            frameborder="0"
            allowtransparency="true"
            :data-src="
              videoTodisplay.includes('.mp4')
                ? videoTodisplay.replace('.mp4', '')
                : videoTodisplay
            "
            :src="
              videoTodisplay.includes('.mp4')
                ? videoTodisplay.replace('.mp4', '')
                : videoTodisplay
            "
          ></iframe>
        </div>
      </vue-plyr>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  components: {
    videoLiveComp: () =>
      import("@/components/contest/ContestMain/videoLiveComp"),
  },
  data() {
    return { mobile: this.$mobileDetect.mobile(), videoTodisplay: "" };
  },
  props: { video: "" },

  methods: {
    moment: function (time) {
      return moment(time);
    },
  },

  computed: {
    isSafari() {
      return this.$store.state.var.isSafari;
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
  },
  watch: {
    video: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.video) {
          this.videoTodisplay = "";
          setTimeout(() => {
            this.videoTodisplay = this.video;
          }, 1);
        }
      },
    },
  },
};
</script>

<style scoped>
.fa-play-circle-o {
  font-size: 100px;
  color: #ff7d00;
}
.safariStream {
  display: flex;
  justify-content: center;
  margin: 10px;
}
.mainWrap {
  width: 100%;
  width: stretch; /* Mozilla-based browsers will ignore this. */
}
iframe {
  width: 100%;

  width: stretch; /* Mozilla-based browsers will ignore this. */

  height: 185px;
}
@media (max-width: 1047px) {
  iframe {
    height: 210px;
  }
}
</style>
