<template>
  <div v-if="pdfToLoad">
    <client-only>
      <pdf @loaded="pdfReady()" id="imageToUpload" :src="pdfToLoad" />
    </client-only>
  </div>
</template>
<script>
import pdf from "vue-pdf";
export default {
  components: {
    pdf,
  },
  props: {
    pdfToLoad: "",
    pdfToLoadComplete: "",
  },
  methods: {
    pdfReady() {
      setTimeout(() => {
        let canvas = document.getElementsByTagName("canvas");
        this.$emit("imgReady", canvas);
      }, 1500);
    },
  },
};
</script>
<style scoped></style>
