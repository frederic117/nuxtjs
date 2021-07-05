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
          <song-reply-stream
            :team="team"
            :watchItem="watchItem"
            @signup="SignupModal()"
            @changeWatchlist="updateWatchList($event)"
            @changeBabbles="updateTimelineBabble($event)"
            :babble="babble"
          ></song-reply-stream>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTeam, getRecentPosition, getASong } from "@/server/api";
export default {
  auth: false,
  async asyncData({ params }) {
    let [team, babble] = await Promise.all([
      getTeam(params.shortName),
      getASong(params.song_id),
    ]);
    return {
      team: team,
      babble: babble,
    };
  },
  props: {},
  data() {
    return {
      loading: false,
      watchItem: "",
      recentPositions: "",
      //	team: "",
      //	babble: "",
    };
  },
  mounted() {
    //getTeam(this.$route.params.shortName).then((team) => {
    //	if (!team.name) {
    //		this.$router.push("/notFound");
    //	}
    //	this.team = team;
    //});
  },
  components: {
    SideNextAffiche: () =>
      import("@/components/side-component/SideNextAffiche"),
    SideCurrentInsight: () =>
      import("@/components/side-component/SideCurrentInsight"),
    SideCurrentInsightUnconnect: () =>
      import("@/components/side-component/SideCurrentInsightUnconnect"),
    SideRecentActivity: () =>
      import("@/components/side-component/SideRecentActivity"),
    MatchInplay: () => import("@/components/side-component/MatchInplay"),
    SongReplyStream: () => import("@/components/SongReplyStream"),
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
      getTeam(this.$route.params.shortName).then((team) => {
        if (!team.name) {
          this.$router.push("/notFound");
        }
        this.team = team;
      });
    },
  },
  methods: {
    ligue(ligue) {
      this.$store.commit("var/setNewValue", ligue);
    },
    fetchData() {
      this.loading = true;
      getASong(this.$route.params.song_id).then((babble) => {
        if (!babble) {
          this.$router.push("/notFound");
        }
        this.babble = babble;
        this.loading = false;
        if (this.babble && this.babble.babbleVideo) {
          setTimeout(() => {
            this.babble.babbleVideo = "";
            getASong(this.$route.params.song_id).then((babble) => {
              this.babble = babble;
            });
          }, 1);
        }
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
      title:
        this.team && this.team.name
          ? this.team.name + ": Tous les chants de ton équipe"
          : this.$route.params.shortName + ": Tous les chants de ton équipe",
      meta: [
        {
          hid: `description`,
          name: "description",
          content: this.babble
            ? this.babble.babble.substring(0, 200)
            : "Retrouvez toute l'actualité de la Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league et de vos équipes préférées - Pour l'amour du foot",
        },
        {
          hid: `keywords`,
          name: "keywords",
          keywords:
            this.team && this.team.name
              ? this.team.name + ": Tous les chants de ton équipe"
              : "Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Pour l'amour du foot",
        },
        {
          hid: `og:title`,
          property: "og:title",
          content:
            this.team && this.team.name
              ? this.team.name + ": Tous les chants de ton équipe"
              : "Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Tout pour le football",
        },
        {
          hid: `og:url`,
          property: "og:url",
          content: "https://www.footfoot.co/",
        },
        {
          hid: this.babble && this.babble.babbleVideo ? `og:video` : ``,
          property: this.babble && this.babble.babbleVideo ? `og:video` : ``,
          content:
            this.babble && this.babble.babbleVideo
              ? this.babble.babbleVideo
              : "",
        },
        {
          hid: `og:image`,
          property: `og:image`,
          content:
            this.team && this.team.name
              ? this.team.teamImg === ""
                ? "/icon.png"
                : this.team.teamImg
              : "/icon.png",
        },
        {
          hid: `og:description`,
          property: "og:description",
          content: this.babble
            ? this.babble.babble.substring(0, 200)
            : "Retrouvez toute l'actualité de la Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league et de vos équipes préférées - Pour l'amour du foot",
        },
        {
          hid: `twitter:card`,
          name: `twitter:card`,
          property: "twitter:card",
          content: this.babble
            ? this.babble.babbleVideo != ""
              ? "player"
              : this.babble.babbleImg === ""
              ? "summary"
              : "summary_large_image"
            : "summary",
        },
        {
          hid: this.babble && this.babble.babbleVideo ? `twitter:player` : "",
          name: this.babble && this.babble.babbleVideo ? `twitter:player` : "",
          property:
            this.babble && this.babble.babbleVideo ? "twitter:player" : "",
          content: this.babble
            ? this.babble.babbleVideo
              ? this.babble.babbleVideo
              : ""
            : "",
        },
        {
          hid:
            this.babble && this.babble.babbleVideo
              ? `twitter:player:width`
              : "",
          name:
            this.babble && this.babble.babbleVideo
              ? `twitter:player:width`
              : "",
          property:
            this.babble && this.babble.babbleVideo
              ? "twitter:player:width"
              : "",
          content: this.babble && this.babble.babbleVideo ? "480" : "",
        },
        {
          hid:
            this.babble && this.babble.babbleVideo
              ? `twitter:player:height`
              : "",
          name:
            this.babble && this.babble.babbleVideo
              ? `twitter:player:height`
              : "",
          property:
            this.babble && this.babble.babbleVideo
              ? "twitter:player:height"
              : "",
          content: this.babble && this.babble.babbleVideo ? "480" : "",
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
          content:
            this.team && this.team.name
              ? this.team.name + ": Tous les chants de ton équipe"
              : "Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Tout pour le football",
        },
        {
          hid: `twitter:description`,
          name: `twitter:description`,
          property: "twitter:description",
          content: this.babble
            ? this.babble.babble.substring(0, 200)
            : "Retrouvez toute l'actualité de la Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league et de vos équipes préférées - Pour l'amour du foot",
        },
        {
          hid: `twitter:image`,
          name: `twitter:image`,
          property: "twitter:image",
          content:
            this.team && this.team.name
              ? this.team.teamImg === ""
                ? "/icon.png"
                : this.team.teamImg
              : "/icon.png",
        },
      ],
    };
  },
  jsonld() {
    return {
      "@context": "http://schema.org/",
      "@type": "NewsArticle",
      headline: this.babble
        ? this.babble.babble.substring(0, 200)
        : "Tous les chants de ton club - footfoot : Pour l'amour du foot",
      datePublished: this.babble ? this.babble.created_at : new Date(),
      description: this.babble
        ? this.babble.babble.substring(0, 200)
        : "Tous les chants de ton club - footfoot : Pour l'amour du foot",
      image: {
        "@type": "ImageObject",

        url:
          this.team && this.team.teamImg
            ? this.team.teamImg === ""
              ? "/icon.png"
              : this.team.teamImg
            : "/icon.png",
      },
      author: this.babble ? this.babble.username : "footfoot",
      publisher: {
        "@type": "Organization",
        logo: {
          "@type": "ImageObject",
          url: "/icon.png",
        },
        name: "footfoot",
      },
      articleBody: this.babble
        ? this.babble.babble
        : "Tous les chants de ton club - footfoot : Pour l'amour du foot",
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
    margin-top: 0.5rem;
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
