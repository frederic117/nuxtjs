import Vue from "vue";
import router from "vue-router";
import VeeValidate from "vee-validate";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
import Clipboard from "v-clipboard";
import TextareaAutosize from "vue-textarea-autosize";
import NuxtJsonld from "nuxt-jsonld";
import VueObserveVisibility from "vue-observe-visibility";

Vue.use(VueObserveVisibility);
Vue.use(NuxtJsonld);
Vue.use(TextareaAutosize);
Vue.use(Clipboard);
Vue.use(VeeValidate);
Vue.config.productionTip = false;
Vue.use(Croppa);
////Vue.use(VueYouTubeEmbed);
////import VueYouTubeEmbed from "vue-youtube-embed";
////import iFrameResize from 'iframe-resizer/js/iframeResizer'

////Vue.directive('resize', {
////   bind: function (el, {
////value = {}
//// }) {
////   el.addEventListener('load', () => iFrameResize(value, el)),
////      el.addEventListener('message', () => iFrameResize(value, el))
////}
////})
