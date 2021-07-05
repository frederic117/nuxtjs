<template>
  <div v-html="oembedHtml">
    <!--
    <blockquote class="twitter-tweet" data-lang="en">
      <p lang="en" dir="ltr">just setting up my twttr</p>&mdash; Jack (@jack) <a href="https://twitter.com/jack/status/20">March 21, 2006</a>
    </blockquote>
     -->
  </div>
</template>

<script>
////https://publish.twitter.com/oembed?url=https://twitter.com/jack/status/20&omit_script=1

export default {
  props: {
    oembedHtml: "",
    tweetId: "",
  },

  mounted() {
    if (this.tweetId) {
      twttr.widgets.createTweet(this.tweetId, this.$el);
    } else {
      twttr.widgets.load(this.$el);
    }
  },
};
</script>