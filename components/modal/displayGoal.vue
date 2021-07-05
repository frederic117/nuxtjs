<template>
  <div class="mainWrap">
    <div v-if="goalTodisplay.toLowerCase().includes('oms')" class="video-wrap">
      <vue-plyr :ref="goal.id">
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            :src="
              goalTodisplay.includes('.mp4')
                ? goalTodisplay.replace('.mp4', '')
                : goalTodisplay
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
      v-else-if="goalTodisplay.toLowerCase().includes('videos.sh')"
      class="video-wrap"
    >
      <vue-plyr>
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            :src="
              goalTodisplay.includes('.mp4')
                ? goalTodisplay.replace('.mp4', '')
                : goalTodisplay
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
      v-else-if="goalTodisplay.toLowerCase().includes('dood')"
      class="video-wrap"
    >
      <vue-plyr>
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            :src="
              goalTodisplay.includes('.mp4')
                ? goalTodisplay.replace('.mp4', '')
                : goalTodisplay
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
      v-else-if="goalTodisplay.toLowerCase().includes('streamable')"
      class="video-wrap"
    >
      <vue-plyr :ref="goal.id">
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            :src="
              goalTodisplay.includes('.mp4')
                ? goalTodisplay.replace('.mp4', '')
                : goalTodisplay
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
      v-else-if="goalTodisplay.toLowerCase().includes('viditnow')"
      class="iframeWrap"
    >
      <vue-plyr :ref="goal.id">
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            :src="
              goalTodisplay.includes('.mp4')
                ? goalTodisplay
                    .replace('.mp4', '')
                    .replace('player/html', 'embed')
                    .replace('yfl.viditnow.com', 'player.videolen.com')
                : goalTodisplay
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
      v-else-if="goalTodisplay.toLowerCase().includes('embed00')"
      class="video-wrap"
    >
      <vue-plyr :ref="goal.id">
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            :src="
              goalTodisplay.includes('.mp4')
                ? goalTodisplay.replace('.mp4', '')
                : goalTodisplay
            "
            controls
            crossorigin
            allowfullscreen
            allowtransparency
          ></iframe>
        </div>
      </vue-plyr>
    </div>
    <vue-plyr
      :ref="goal.id"
      v-else-if="goalTodisplay.toLowerCase().includes('youtu')"
    >
      <div class="plyr__video-embed">
        <iframe
          loading="lazy"
          :src="
            goalTodisplay +
            '?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1'
          "
          controls
          crossorigin
          allowfullscreen
          allowtransparency
        ></iframe>
      </div>
    </vue-plyr>
    <vue-plyr
      :ref="goal.id"
      v-else-if="goalTodisplay.toLowerCase().includes('.mp4.mp4')"
    >
      <video>
        <source
          :src="goalTodisplay.replace('.mp4.mp4', '.mp4')"
          type="video/mp4"
        />
      </video>
    </vue-plyr>
    <vue-plyr
      :ref="goal.id"
      v-else-if="goalTodisplay.toLowerCase().includes('.mp4')"
    >
      <video>
        <source :src="goalTodisplay" type="video/mp4" />
      </video>
    </vue-plyr>
    <vue-plyr
      :ref="goal.id"
      v-else-if="goalTodisplay.toLowerCase().includes('.ogg')"
    >
      <video>
        <source :src="goalTodisplay" type="video/ogg" />
      </video>
    </vue-plyr>
    <vue-plyr
      :ref="goal.id"
      v-else-if="goalTodisplay.toLowerCase().includes('.webm')"
    >
      <video>
        <source :src="goalTodisplay" type="video/webm" />
      </video>
    </vue-plyr>

    <div
      v-else-if="
        !goalTodisplay.includes('sporttube') &&
        (goalTodisplay.toLowerCase().includes('embed') ||
          goalTodisplay.toLowerCase().includes('player'))
      "
      class="video-wrap"
    >
      <vue-plyr :ref="goal.id">
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            :src="
              goalTodisplay.toLowerCase().includes('player')
                ? goalTodisplay
                    .replace('player/html', 'embed')
                    .replace('autoplay=true', 'autoplay=false')
                    .replace('autoplay-mute=1', 'autoplay-mute=0')
                : goalTodisplay
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
    <vue-plyr
      :ref="goal.id"
      v-else-if="goalTodisplay.toLowerCase().includes('mpd')"
    >
      <video :srcVideo="goalTodisplay"></video>
    </vue-plyr>
    <div v-else class="video-wrap">
      <vue-plyr>
        <div class="plyr__video-embed">
          <iframe
            loading="lazy"
            :src="
              goalTodisplay.includes('.mp4')
                ? goalTodisplay.replace('.mp4', '')
                : goalTodisplay
            "
            controls
            crossorigin
            allowfullscreen
            allowtransparency
          ></iframe>
        </div>
      </vue-plyr>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return { goalTodisplay: "" };
  },
  props: { goal: "" },
  methods: {
    moment: function (time) {
      return moment(time);
    },
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
  },
  watch: {
    goal: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.goal) {
          this.goalTodisplay = "";
          setTimeout(() => {
            this.goalTodisplay = this.goal.url;
          }, 1);
        }
      },
    },
  },
};
</script>

<style scoped>
.mainWrap {
  width: 100%;

  width: stretch; /* Mozilla-based browsers will ignore this. */
}
iframe {
  width: 100%;

  width: stretch; /* Mozilla-based browsers will ignore this. */

  height: 185px !important;
}
@media (max-width: 1047px) {
  iframe {
    height: 210px !important;
  }
}
</style>
