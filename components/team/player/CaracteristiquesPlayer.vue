<template>
  <div v-if="player && player.ciesId" class="box">
    <div :class="{ playerDataCWrapper: activeIframe }">
      <div :class="{ playerDataC: activeIframe }">
        <iframe
          loading="lazy"
          class="invertOk"
          width="100%"
          frameborder="0"
          ref="iframe"
          :class="{ displayNone: !activeIframe }"
          @load="frameload($event)"
          scrolling="no"
          :src="`https://football-observatory.com/-profil-${player.ciesId}-_none#content`"
        ></iframe>
      </div>
    </div>
    <div class="compare">
      <b-loading
        class="playerDataC"
        :is-full-page="false"
        :active.sync="loadNotcomplete"
        :canCancel="false"
      ></b-loading>
      <span @click="comparePlayer()" class="pointer is-ci is-italic">
        <figure class="versusFigure1">
          <img
            loading="lazy"
            class="vs"
            src="~assets/images/versus.png"
            alt="versus"
          />
        </figure>
        (data from CIES)
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIframe: true,
      loadingCies: false,
      loadNotcomplete: true,
    };
  },
  computed: {
    isSafari() {
      return this.$store.state.var.isSafari;
    },
  },
  props: { player: "" },
  methods: {
    comparePlayer() {
      this.$emit("compare");
    },
    message(event) {},
    frameload(event) {
      this.loadNotcomplete = false;
      if (this.isSafari) {
        setTimeout(() => {
          this.loadingCies = false;
          this.activeIframe = true;
        }, 10);
      } else {
        setTimeout(() => {
          this.loadingCies = false;
          this.activeIframe = true;
        }, 10);
      }
    },
  },
  mounted() {},
  destroyed() {
    this.loadingCies = false;
    this.activeIframe = true;
  },
};
</script>
<style scoped>
.displayNone {
  display: none !important;
}
.is-ci {
  color: #023d7d;
  font-size: 1rem;
  align-items: center;
}
.compare {
  width: 100%;
  display: flex;
  justify-content: center;
}
.compare > span {
  display: flex;
}
.versusFigure1 {
  display: flex;
  align-items: center;
}
.versusFigure1 > img {
  height: 20px;
}
.playerDataCWrapper {
  display: FLEX;
  justify-content: CENTER;
  padding: 0px !important;
  width: 100% !important;
  height: 430px !important;
}
.playerDataC {
  display: block;
  margin: auto;
  height: 540px !important;
  max-width: 330px;
  width: 320px;
  position: absolute;
  top: -115px;
}
@media (max-width: 645px) {
  .playerDataC {
    width: calc(100vw - 0.5rem) !important;
    max-width: 320px;
  }
}
@media (max-width: 361px) {
  .playerDataC {
    width: 100vw !important;
    max-width: 320px;
  }
  .box {
    padding: 0 !important;
  }
  .compare {
    padding-bottom: 0.25rem;
  }
}
</style> 