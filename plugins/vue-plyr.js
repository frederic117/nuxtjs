import Vue from "vue";
import VuePlyr from "vue-plyr/dist/vue-plyr.ssr.js";

////The second argument is optional and sets the default config values for every player.
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: {
      enabled: true,
      fallback: true,
      iosNative: true,
    },
    pip: {
      enabled: true,
    },
  },
  emit: ["ended"],
});
