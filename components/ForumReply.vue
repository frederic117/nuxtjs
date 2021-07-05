<template>
  <div id="app">
    <b-loading
      :is-full-page="false"
      :active.sync="loading"
      :canCancel="false"
    ></b-loading>
    <div class="primordial">
      <div class="sct1">
        <side-current-insight
          v-if="$auth.user && $auth.user._id"
          class="sci"
          @changeWatchlist="updateWatchList($event)"
        ></side-current-insight>
        <side-current-insight-unconnect
          v-else
          @signup="SignupModal()"
          class="sci"
        ></side-current-insight-unconnect>
        <div class="babblesField column is-6">
          <forum-reply-stream
            :watchItem="watchItem"
            @signup="SignupModal()"
            @changeWatchlist="updateWatchList($event)"
            @changeBabbles="updateTimelineBabble($event)"
            :forum="forum"
          ></forum-reply-stream>
        </div>
        <div class="column is-3 sci">
          <client-only>
            <match-inplay
              v-if="matches && matches.length > 0"
              @ligue="ligue($event)"
              class="column is-12 inPlayMatch"
            ></match-inplay>
            <side-next-affiche
              class="column is-12 sidect1"
              @ligue="ligue($event)"
            ></side-next-affiche>
          </client-only>
          <!--<side-recent-activity  class="column is-12 sidect1 " :recentPositions ="recentPositions"></side-recent-activity>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecentPosition, getAForum } from "@/server/api";
export default {
  auth: false,
  async asyncData({ params }) {
    let [forum] = await Promise.all([getAForum(params.forum_id)]);
    return {
      forum: forum,
    };
  },
  props: {},
  data() {
    return {
      loading: false,
      watchItem: "",
      recentPositions: "",
    };
  },
  mounted() {},
  components: {
    SideNextAffiche: () =>
      import("@/components/side-component/SideNextAffiche"),
    SideCurrentInsight: () =>
      import("@/components/side-component/SideCurrentInsight"),
    SideCurrentInsightUnconnect: () =>
      import("@/components/side-component/SideCurrentInsightUnconnect"),
    ForumReplyStream: () => import("@/components/ForumReplyStream"),
    SideRecentActivity: () =>
      import("@/components/side-component/SideRecentActivity"),
    MatchInplay: () => import("@/components/side-component/MatchInplay"),
  },
  computed: {
    matches() {
      return this.$store.state.var.matches;
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
  methods: {
    ligue(ligue) {
      this.$store.commit("var/setNewValue", ligue);
    },
    fetchData() {
      this.loading = true;
      getAForum(this.$route.params.forum_id).then((forum) => {
        this.forum = forum;
        this.loading = false;
      });
    },
    SignupModal() {
      this.$router.push("/signup");
    },
    LoginModal(autenticate) {
      this.$router.push("/login");
    },

    updateWatchList() {
      this.fetchData();
    },
    updateTimelineBabble() {
      this.fetchData();
    },
  },
  head() {
    return {
      title: this.forum
        ? this.forum.title.substring(0, 70)
        : "Pour l'amour du foot",
      meta: [
        {
          hid: `description`,
          name: "description",
          content: this.forum
            ? this.forum.title.substring(0, 200)
            : "Pour l'amour du foot",
        },
        {
          hid: `keywords`,
          name: "keywords",
          keywords: "News, vidéos, pronostics: Tout pour le football",
        },
        {
          hid: `og:title`,
          property: "og:title",
          content: this.forum ? this.forum.title : "Pour l'amour du football",
        },
        {
          hid: `og:url`,
          property: "og:url",
          content: "https://www.footfoot.co" + this.$route.fullPath,
        },
        {
          hid: `og:description`,
          property: "og:description",
          content: this.forum ? this.forum.title : "Pour l'amour du foot",
        },
        {
          hid: `og:image`,
          property: "og:image",
          content: "/icon.png",
        },
        {
          hid: `twitter:card`,
          name: `twitter:card`,
          property: "twitter:card",
          content: "summary",
        },
        {
          hid: `twitter:site`,
          name: `twitter:site`,
          property: "twitter:site",
          content: "@footfoot.co",
        },
        {
          hid: `twitter:creator`,
          name: `twitter:creator`,
          property: "twitter:creator",
          content: "@InsidersFoot",
        },
        {
          hid: `twitter:title`,
          name: `twitter:title`,
          property: "twitter:title",
          content: this.forum ? this.forum.title : "Pour l'amour du foot",
        },
        {
          hid: `twitter:description`,
          name: `twitter:description`,
          property: "twitter:description",
          content: this.forum ? this.forum.title : "Pour l'amour du foot",
        },
        {
          hid: `twitter:image`,
          name: `twitter:image`,
          property: "twitter:image",
          content: "/icon.png",
        },
      ],
    };
  },
  jsonld() {
    return {
      "@context": "http://schema.org/",
      "@type": "NewsArticle",
      headline: this.forum ? this.forum.title : "Pour l'amour du foot",
      datePublished: this.forum ? this.forum.created_at : new Date(),
      description: this.forum ? this.forum.title : "Pour l'amour du foot",
      image: {
        "@type": "ImageObject",

        url: "/icon.png",
      },
      author: this.forum ? this.forum.username : "footfoot",
      publisher: {
        "@type": "Organization",
        logo: {
          "@type": "ImageObject",
          url: "/icon.png",
        },
        name: "footfoot",
      },
      articleBody: this.forum ? this.forum.title : "Pour l'amour du foot",
    };
  },
};
</script>
<style scoped>
div {
  font-size: 1.2rem !important;
}
.is-sticky {
  position: sticky;
}

.primordial {
  width: 100%;
  justify-content: center;
  display: flex;
}
.babblesField {
  width: 50%;
  margin-right: 0.5%;
  margin-left: 0.5%;
}
.sct1 {
  width: 100%;
  justify-content: center;
  display: flex;
  max-width: 99%;
}
@media (max-width: 1047px) {
  .primordial {
    margin-top: 0.5rem !important;
  }

  .sct1 {
    max-width: 100%;
    flex-direction: column;
  }
  .columns {
    margin-left: 0px !important;
    margin-right: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .column {
    margin-left: 0px !important;
    margin-right: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .sci {
    display: none;
  }
}
</style>
