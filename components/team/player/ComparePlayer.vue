<template>
  <section class>
    <div
      :class="{
        modalCIesWrap: activeIframeModal && !isSafari,
        modalCIesWrapSafari: activeIframeModal && isSafari,
      }"
    >
      <div
        :class="{
          modalCIes: activeIframeModal && !isSafari,
          modalCIesSafari: activeIframeModal && isSafari,
        }"
      >
        <iframe
          loading="lazy"
          ref="iframe"
          class="invertOk"
          :class="{ displayNone: !activeIframeModal }"
          @load="frameloadModal()"
          scrolling="no"
          :src="ciesSrc"
        ></iframe>
      </div>
    </div>
    <b-loading
      class="height20"
      :is-full-page="false"
      :active.sync="loadingCiesModal"
      :canCancel="false"
    ></b-loading>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeIframeModal: true,
      loadingCiesModal: true,
    };
  },
  computed: {
    isSafari() {
      return this.$store.state.var.isSafari;
    },
  },
  props: {
    url: "",
  },
  watch: {
    url: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.url && this.isSafari) {
          this.ciesSrc = this.url;
          this.ciesSrc = "";
          this.ciesSrc = this.url;
        } else {
          this.ciesSrc = this.url;
        }
      },
    },
  },
  methods: {
    frameloadModal() {
      if (this.isSafari) {
        setTimeout(() => {
          this.ciesSrc = this.url;
          this.ciesSrc = "";
          this.ciesSrc = this.url;
          this.loadingCiesModal = false;
          this.activeIframeModal = true;
        }, 10);
      } else {
        setTimeout(() => {
          this.loadingCiesModal = false;
          this.activeIframeModal = true;
        }, 10);
      }
    },
  },
  mounted() {
    if (this.isSafari) {
      setTimeout(() => {
        this.ciesSrc = this.url;
        this.ciesSrc = "";
        this.ciesSrc = this.url;
        this.loadingCiesModal = false;
      }, 10);
    } else {
      setTimeout(() => {
        this.loadingCiesModal = false;
      }, 10);
    }
  },
  destroyed() {
    this.loadingCiesModal = true;
    this.activeIframeModal = true;
  },
};
</script>
<style scoped>
.height20 {
  height: 100px;
}
.displayNone {
  display: none !important;
}
@media (orientation: landscape) {
  .modalCIesSafari {
    display: none !important;
  }
}
</style>