import Vue from "vue";
import VueGtag from "vue-gtag";

export default ({ app }) => {
  Vue.use(
    VueGtag,
    {
      config: { id: "G-PQ1M3Z2TB3" },
      appName: "footfoot",
      pageTrackerScreenviewEnabled: true,
    },
    app.router
  );
};
