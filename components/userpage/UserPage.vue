<template>
  <section class>
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :canCancel="false"
    ></b-loading>
    <client-only>
      <div v-if="babbleTodisplay">
        <b-modal id="babbleActivModal" :active.sync="babbleTodisplayActive">
          <displaybabble-modal
            @changeBabbles="updateTimelineBabble($event)"
            class="page-enter-active"
            :babbleTodisplay="babbleTodisplay"
          ></displaybabble-modal>
        </b-modal>
      </div>
    </client-only>
    <client-only>
      <user-profile
        :footCoins="footCoins"
        :profileInfo="profileInfo"
        :filterBy="filterBy"
        @updateInsiderProfile="updateInsiderProfile"
        @seePost="sortbabbles('all')"
        @seeProno="pronos"
        @cagnotte="cagnotte"
        @abonnement="abonnement"
        @abonne="abonne"
        @signup="signup"
      ></user-profile>
    </client-only>
    <div v-if="postWriting === false" class="primordial">
      <div class="sct1">
        <client-only v-if="!mobile">
          <div class="column is-3 sci">
            <side-current-insight
              v-if="$auth.user && $auth.user._id"
              @ligue="ligue($event)"
              class="column is-12 sidect1"
              @changeWatchlist="updateWatchList($event)"
            ></side-current-insight>

            <side-current-insight-unconnect
              v-else
              @signup="signup()"
              class="column is-12 sidect1"
            ></side-current-insight-unconnect>
          </div>
        </client-only>
        <div class="babblesField column is-6">
          <client-only v-if="filterBy == 'abonnement' || filterBy == 'abonne'">
            <user-abo
              :filterBy="filterBy"
              :abonnementList="abonnementList"
              :abonneList="abonneList"
            ></user-abo>
          </client-only>
          <user-timeline
            v-else
            @abonne="abonne"
            @abonnement="abonnement"
            @getWalletInfo="getWalletInfo"
            :footCoins="footCoins"
            :transactions="transactions"
            @cagnotte="cagnotte"
            :matchList="matchList"
            :pastInsights="pastInsights"
            :profileInfo="profileInfo"
            @loadMore="loadMore($event)"
            @ligue="ligue($event)"
            :forums="forums"
            :babbles="babbles"
            :filterBy="filterBy"
            @sortbabbles="sortbabbles($event)"
            @pronos="pronos"
            @results="results"
            @changeBabbles="updateTimelineBabble($event)"
          ></user-timeline>
          <div
            id="loader-container"
            v-if="loadMoreIsActive && isLoading == false"
          >
            <slot name="loading">
              <div class="spinner"></div>
            </slot>
          </div>
        </div>
        <div v-if="!mobile" class="column is-3 sci sidect1">
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
  </section>
</template>

<script>
import { getuserfootCoins, getTransactionsByUser } from "@/server/apiContest";
import {
  getAbo,
  getAllForums,
  getClapBabbles,
  getRecentPosition,
  getBabbles,
  getPodcastByUser,
} from "@/server/api";
import {
  getInsiderProfileInfo,
  getInsiderCurrentInsights,
  getInsiderPastInsights,
} from "@/server/apiDashboard";
import moment from "moment";
export default {
  auth: false,
  scrollToTop: true,
  async asyncData({ params, store }) {
    let userId =
      store.state.auth && store.state.auth.user && store.state.auth.user._id
        ? store.state.auth.user._id
        : "";
    let [babbles, profileInfo, filterBy] = await Promise.all([
      getBabbles(params.id, 1),
      getInsiderProfileInfo(params.id),
    ]);
    return {
      babbles: babbles && babbles.length > 0 ? babbles : ["empty"],
      profileInfo: profileInfo,
      filterBy: userId === params.id ? "cagnotte" : "all",
    };
  },

  components: {
    DisplaybabbleModal: () =>
      import("@/components/side-component/DisplaybabbleModal"),
    userAbo: () => import("@/components/userpage/userAbo"),
    UserProfile: () => import("@/components/userpage/UserProfile"),
    SideNextAffiche: () =>
      import("@/components/side-component/SideNextAffiche"),
    SideCurrentInsight: () =>
      import("@/components/side-component/SideCurrentInsight"),
    SideCurrentInsightUnconnect: () =>
      import("@/components/side-component/SideCurrentInsightUnconnect"),
    UserTimeline: () => import("@/components/userpage/UserTimeline"),
    SideRecentActivity: () =>
      import("@/components/side-component/SideRecentActivity"),
    MatchInplay: () => import("@/components/side-component/MatchInplay"),
  },

  mounted() {
    this.page = 1;
    this.isLoading = false;

    let user =
      this.$store.state.auth.user && this.$store.state.auth.user._id
        ? this.$store.state.auth.user._id
        : "";
    let insiderId = this.$route.params.id;

    this.filterBy =
      user && insiderId === user
        ? "cagnotte"
        : this.babbles &&
          this.babbles.length > 0 &&
          this.babbles[0] != ["empty"]
        ? "all"
        : "pronos";
    ////		this.profileInfo = "";
    if (
      this.$store.state.auth.user &&
      this.$store.state.auth.user._id == insiderId
    ) {
      this.isLoading = true;
      this.profileInfo = this.$store.state.auth.user;
      getuserfootCoins(this.$store.state.auth.user._id).then((footCoins) => {
        this.footCoins = footCoins;
      });
      getTransactionsByUser(this.$store.state.auth.user._id).then(
        (transactions) => {
          this.transactions = transactions.length > 0 ? transactions : [];
          this.isLoading = false;
        }
      );
    }
    // else {
    //  getInsiderProfileInfo(insiderId).then((profileInfo) => {
    //   if (!profileInfo) {
    //     this.$router.push("/notFound");
    //   } else {
    //     this.profileInfo = profileInfo;
    //     this.isLoading = false;
    //   }
    // });
    // }
    //    getBabbles(this.$route.params.id, this.page).then((babbles) => {
    //    this.isLoading = false;
    //  if (babbles && babbles.length > 0) {
    //     this.babbles = babbles;
    //    } else {
    //      this.babbles = ["empty"];
    //     this.filterBy = user && insiderId === user ? "cagnotte" : "pronos";
    //      this.isLoading = false;
    //    }
    //   });

    if (this.$auth.user && this.$auth.user._id != this.$route.params.id) {
      let query = {
        $and: [
          { cave: false },
          { status: { $in: ["active"] } },
          { user: this.$route.params.id },
        ],
      };
      getInsiderCurrentInsights(query).then((matchList) => {
        if (matchList && matchList.length > 0) {
          this.matchList = matchList.filter(
            (m) =>
              m.match &&
              m.match.status.toUpperCase() != "POSTP" &&
              m.match.status.toUpperCase() != "CANCL" &&
              m.match.status.toUpperCase() != "FT" &&
              m.match.status.toUpperCase() != "AET" &&
              m.match.status.toUpperCase() != "FT_PEN"
          );
        }
      });
    }
    ////    let queryPast = {
    ////    $and: [
    ////    { cave: false },
    ////  { status: { $in: ["won", "lost"] } },
    ////        { user: this.$route.params.id },
    ////    ],
    ////};
    ////   getInsiderPastInsights(queryPast).then((pastInsights) => {
    ////   if (pastInsights) {
    ////   this.pastInsights = pastInsights;
    ////}
    //// });
    ////}
    getAbo(this.$route.params.id).then((abo) => {
      if (abo.abonnements && abo.abonnements.length > 0) {
        this.abonnementList = abo.abonnements.sort((a, b) =>
          a.username.localeCompare(b.username)
        );
      }
      if (abo.abonnements && abo.abonnes.length > 0) {
        this.abonneList = abo.abonnes.sort((a, b) =>
          a.username.localeCompare(b.username)
        );
      }
    });

    this.$store.commit("var/setNewValue", "NextMatch");
    this.$store.commit("var/contestInscription", "");
  },
  watch: {
    filterBy: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (process.client) {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 1);
        }
      },
    },
    babbleTodisplay: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.babbleTodisplay) {
          this.babbleTodisplayActive = true;
          this.$nuxt.$emit("firstBetmodal");
        } else {
          this.babbleTodisplayActive = false;
        }
      },
    },
    profileInfo: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.profileInfo) {
          this.profileInfo.isOnline = true
            ? this.usersOnlinelist.filter(
                (l) =>
                  l.user == this.profileInfo._id &&
                  moment().add(-0.5, "minutes").format() <
                    moment(l.time).format()
              ).length > 0
            : false;
        }
      },
    },
    usersOnlinelist: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.usersOnlinelist) {
          this.profileInfo.isOnline = true
            ? this.usersOnlinelist.filter(
                (l) =>
                  l.user == this.profileInfo._id &&
                  moment().add(-0.5, "minutes").format() <
                    moment(l.time).format()
              ).length > 0
            : false;
        }
      },
    },
    $route() {
      let user =
        this.$store.state.auth.user && this.$store.state.auth.user._id
          ? this.$store.state.auth.user._id
          : "";
      let insiderId = this.$route.params.id;
      this.filterBy =
        user && insiderId === user
          ? "cagnotte"
          : this.babbles &&
            this.babbles.length > 0 &&
            this.babbles[0] != ["empty"]
          ? "all"
          : "pronos";
      this.loadMoreIsActive = false;
      this.page = 0;
      this.babbles = [];
      this.matchList = [];
      this.pastInsights = [];

      this.profileInfo = "";
      if (
        this.$store.state.auth.user &&
        this.$store.state.auth.user._id == insiderId
      ) {
        this.profileInfo = this.$store.state.auth.user;
        getuserfootCoins(this.$store.state.auth.user._id).then((footCoins) => {
          this.footCoins = footCoins;
        });
        getTransactionsByUser(this.$store.state.auth.user._id).then(
          (transactions) => {
            this.transactions = transactions.length > 0 ? transactions : [];
            this.isLoading = false;
          }
        );
      } else {
        this.isLoading = true;

        getInsiderProfileInfo(insiderId).then((profileInfo) => {
          if (!profileInfo) {
            this.$router.push("/notFound");
          } else {
            this.profileInfo = profileInfo;
            this.isLoading = false;
          }
        });
      }
      if (this.filterBy === "pronos") {
        this.babbles = [];
        this.forums = [];
      } else if (this.filterBy === "resultats") {
        this.babbles = [];
        this.forums = [];
      } else if (this.filterBy === "clap") {
        this.isLoading = true;
        getClapBabbles(this.$route.params.id, this.page).then((babbles) => {
          if (babbles.length > 0) {
            this.babbles = babbles;
          } else {
            this.babbles = ["empty"];
          }
          this.isLoading = false;
        });
      } else {
        this.isLoading = true;
        this.filterBy = "all";
        let user =
          this.$store.state.auth.user && this.$store.state.auth.user._id
            ? this.$store.state.auth.user._id
            : "";
        getBabbles(this.$route.params.id, this.page).then((babbles) => {
          this.isLoading = false;
          if (babbles && babbles.length > 0) {
            this.babbles = babbles;
          } else {
            this.babbles = ["empty"];
            this.isLoading = false;
          }
        });
      }

      if (this.$auth.user && this.$auth.user._id != this.$route.params.id) {
        let query = {
          $and: [
            { cave: false },
            { status: { $in: ["active"] } },
            { user: this.$route.params.id },
          ],
        };
        getInsiderCurrentInsights(query).then((matchList) => {
          if (matchList && matchList.length > 0) {
            this.matchList = matchList.filter(
              (m) =>
                m.match &&
                m.match.status.toUpperCase() != "POSTP" &&
                m.match.status.toUpperCase() != "CANCL" &&
                m.match.status.toUpperCase() != "FT" &&
                m.match.status.toUpperCase() != "AET" &&
                m.match.status.toUpperCase() != "FT_PEN"
            );
          }
        });
      }
      //// let queryPast = {
      ////   $and: [
      ////     { cave: false },
      ////   { status: { $in: ["won", "lost"] } },
      //// { user: this.$route.params.id },
      ////   ],
      ////  };
      ////getInsiderPastInsights(queryPast).then((pastInsights) => {
      ////    if (pastInsights) {
      ////    this.pastInsights = pastInsights;
      ////     }
      //// });
      getAbo(this.$route.params.id).then((abo) => {
        if (abo.abonnements && abo.abonnements.length > 0) {
          this.abonnementList = abo.abonnements.sort((a, b) =>
            a.username.localeCompare(b.username)
          );
        }
        if (abo.abonnements && abo.abonnes.length > 0) {
          this.abonneList = abo.abonnes.sort((a, b) =>
            a.username.localeCompare(b.username)
          );
        }
      });

      this.$store.commit("var/setNewValue", "NextMatch");
      this.$store.commit("var/contestInscription", "");
    },
  },
  head() {
    return {
      script: [
        this.$store.state.auth.user &&
        this.$store.state.auth.user._id &&
        this.$route.params.id == this.$store.state.auth.user._id
          ? { src: "https://js.stripe.com/v3/" }
          : "",
      ],
      title:
        "Retrouve les pronos, les articles et les news des meilleurs pronostiqueurs sur footfoot.co",
      meta: [
        {
          hid: `description`,
          name: "description",
          content:
            "News, vidéos, pronos, classement, résultats, matchs : Pour l'amour du foot",
        },
        {
          hid: `keywords`,
          name: "keywords",
          keywords:
            this.profileInfo && this.profileInfo.username
              ? this.profileInfo.username +
                " : retrouve ses infos, ses articles et ses pronos"
              : "News, vidéos, pronos, classement, résultats, matchs : Tout pour le football",
        },
        {
          hid: `og:title`,
          property: "og:title",
          content:
            this.profileInfo && this.profileInfo.username
              ? this.profileInfo.username +
                " : retrouve ses infos, ses articles et ses pronos"
              : "News, vidéos, pronos, classement, résultats, matchs : Tout pour le football",
        },
        {
          hid: `og:url`,
          property: "og:url",
          content: "https://www.footfoot.co" + this.$route.fullPath,
        },
        {
          hid: `og:image`,
          property: "og:image",
          content:
            this.profileInfo && this.profileInfo.picProfile
              ? this.profileInfo.picProfile
              : "/icon.png",
        },

        {
          hid: `og:description`,
          property: "og:description",
          content:
            "News, vidéos, pronos, classement, résultats, matchs : Pour l'amour du foot",
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
          content:
            this.profileInfo && this.profileInfo.username
              ? this.profileInfo.username +
                " : retrouve ses infos, ses articles et ses pronos"
              : "News, vidéos, pronos, classement, résultats, matchs : Tout pour le football",
        },
        {
          hid: `twitter:description`,
          property: "twitter:description",
          content:
            this.profileInfo && this.profileInfo.username
              ? this.profileInfo.username +
                " : retrouve ses infos, ses articles et ses pronos"
              : "News, vidéos, pronos, classement, résultats, matchs : Tout pour le football",
        },
        {
          hid: `twitter:image`,
          name: `twitter:image`,
          property: "twitter:image",
          content:
            this.profileInfo && this.profileInfo.picProfile
              ? this.profileInfo.picProfile
              : "/icon.png",
        },
      ],
    };
  },
  data() {
    return {
      profileInfo: "",
      filterBy: "all",
      babbles: [],
      mobile: this.$mobileDetect.mobile(),
      babbleTodisplayActive: false,
      footCoins: "",
      transactions: [],
      loadMoreIsActive: false,
      pastInsights: [],
      isLoading: false,
      postWriting: false,
      page: 1,
      forums: [],
      abonnementList: "",
      abonneList: "",
      matchList: [],
    };
  },
  props: {},
  computed: {
    matches() {
      return this.$store.state.var.matches;
    },
    babbleTodisplay() {
      return this.$store.state.var.babbleTodisplay;
    },
    usersOnlinelist() {
      return this.$store.state.var.usersOnlinelist;
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    moment: function (time) {
      return moment(time);
    },
    getWalletInfo() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        this.isLoading = true;
        getuserfootCoins(this.$store.state.auth.user._id).then((footCoins) => {
          this.footCoins = footCoins;
        });
        getTransactionsByUser(this.$store.state.auth.user._id).then(
          (transactions) => {
            this.transactions = transactions.length > 0 ? transactions : [];
            this.isLoading = false;
          }
        );
      } else {
        this.$router.push("/");
      }
    },
    updateInsiderProfile() {
      let insiderId = this.$route.params.id;
      getInsiderProfileInfo(insiderId).then((profileInfo) => {
        if (!profileInfo) {
          this.$router.push("/notFound");
        } else {
          this.profileInfo = profileInfo;
          this.isLoading = false;
        }
      });
    },

    abonnement() {
      this.babbles = [];
      this.forums = [];
      this.filterBy = "abonnement";
    },
    abonne() {
      this.babbles = [];
      this.forums = [];
      this.filterBy = "abonne";
    },
    signup() {
      this.$router.push("/signup");
    },
    loadMore(event) {
      if (!this.$nuxt.isOffline) {
        if (this.loadMoreIsActive == false) {
          this.page++;
          //this.isLoading = true;
          this.loadMoreIsActive = true;
          if (this.filterBy === "pronos") {
            this.filterBy = "pronos";
            this.babbles = [];
            this.forums = [];
            this.loadMoreIsActive = false;
          } else if (this.filterBy === "resultats") {
            this.filterBy = "resultats";
            this.babbles = [];
            this.forums = [];
            this.loadMoreIsActive = false;
          } else if (this.filterBy === "clap") {
            this.loadMoreIsActive = true;
            if (this.babbles[0] != "empty") {
              getClapBabbles(this.$route.params.id, this.page).then(
                (babbles) => {
                  if (babbles.length > 0) {
                    this.babbles = babbles;
                  }
                  this.loadMoreIsActive = false;
                }
              );
            } else {
              this.loadMoreIsActive = false;
            }
          } else {
            this.loadMoreIsActive = true;
            let user =
              this.$store.state.auth.user && this.$store.state.auth.user._id
                ? this.$store.state.auth.user._id
                : "";
            if (this.babbles[0] != "empty") {
              getBabbles(this.$route.params.id, this.page).then((babbles) => {
                if (babbles && babbles.length > 0) {
                  this.babbles = babbles;
                  this.loadMoreIsActive = false;
                } else {
                  this.babbles = ["empty"];
                  this.loadMoreIsActive = false;
                }
              });
            } else {
              this.loadMoreIsActive = false;
            }
          }
        }
      }
    },
    sortByDate(a, b) {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },
    openPost() {
      this.postWriting = !this.postWriting;
    },
    contest() {
      this.$router.push("/contest");
    },
    ligue(ligue) {
      this.$store.commit("var/setNewValue", ligue);
    },
    updateWatchList() {
      this.fetchData();
    },
    updateTimelineBabble() {
      this.babbles = [];
      this.forums = [];
      this.fetchData();
      this.postWriting = false;
    },
    podcast() {
      this.filterBy = "podcast";
      this.forums = [];
      this.babbles = [];
      this.isLoading = true;
      getPodcastByUser(this.$route.params.id, this.page).then((podcasts) => {
        if (podcasts.length > 0) {
          this.babbles = podcasts;
          this.isLoading = false;
        } else {
          this.babbles = ["empty"];
          this.isLoading = false;
        }
      });
    },
    forum() {
      this.filterBy = "forum";
      this.babbles = [];
      this.isLoading = true;
      getAllForums(this.page, "").then((forums) => {
        if (forums.length > 0) {
          this.forums = forums;
          this.isLoading = false;
        } else {
          this.forums = ["empty"];
          this.isLoading = false;
        }
      });
    },

    sortbabbles(event) {
      this.filterBy = event;
      this.page = 1;
      this.fetchData();
    },
    cagnotte() {
      this.filterBy = "cagnotte";
      this.fetchData();
    },
    pronos() {
      this.filterBy = "pronos";
      this.fetchData();
    },
    results() {
      this.filterBy = "resultats";
      this.fetchData();
    },
    fetchData() {
      if (this.filterBy === "pronos") {
      } else if (this.filterBy === "resultats") {
      } else if (this.filterBy === "cagnotte") {
      } else if (this.filterBy === "clap") {
        this.isLoading = true;
        getClapBabbles(this.$route.params.id, this.page).then((babbles) => {
          if (babbles.length > 0) {
            this.babbles = "";
            this.babbles = babbles;
            this.isLoading = false;
          } else {
            this.babbles = ["empty"];
            this.isLoading = false;
          }
        });
      } else {
        this.isLoading = true;
        this.filterBy = "all";
        let user =
          this.$store.state.auth.user && this.$store.state.auth.user._id
            ? this.$store.state.auth.user._id
            : "";
        getBabbles(this.$route.params.id, 1).then((babbles) => {
          this.isLoading = false;
          if (babbles && babbles.length > 0) {
            this.babbles = babbles;
            this.isLoading = false;
          } else {
            this.babbles = ["empty"];
            this.isLoading = false;
          }
        });
      }
      if (this.$auth.user && this.$auth.user._id != this.$route.params.id) {
        let query = {
          $and: [
            { cave: false },
            { status: { $in: ["active"] } },
            { user: this.$route.params.id },
          ],
        };
        getInsiderCurrentInsights(query).then((matchList) => {
          if (matchList && matchList.length > 0) {
            this.matchList = matchList.filter(
              (m) =>
                m.match &&
                m.match.status.toUpperCase() != "POSTP" &&
                m.match.status.toUpperCase() != "CANCL" &&
                m.match.status.toUpperCase() != "FT" &&
                m.match.status.toUpperCase() != "AET" &&
                m.match.status.toUpperCase() != "FT_PEN"
            );
          }
        });
      }
      ////     let queryPast = {
      ////   $and: [
      ////      { cave: false },
      ////       { status: { $in: ["won", "lost"] } },
      ////   { user: this.$route.params.id },
      ////    ],
      ////  };
      ////    getInsiderPastInsights(queryPast).then((pastInsights) => {
      ////  if (pastInsights) {
      ////      this.pastInsights = pastInsights;
      ////    }
      //// });
      getAbo(this.$route.params.id).then((abo) => {
        if (abo.abonnements && abo.abonnements.length > 0) {
          this.abonnementList = abo.abonnements.sort((a, b) =>
            a.username.localeCompare(b.username)
          );
        }
        if (abo.abonnements && abo.abonnes.length > 0) {
          this.abonneList = abo.abonnes.sort((a, b) =>
            a.username.localeCompare(b.username)
          );
        }
      });
    },
    signup() {
      this.$router.push("/signup");
    },
    LoginModal(autenticate) {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
a:hover {
  color: #eef1f7;
}
.sidect2 {
  display: none;
}
.asideLeft {
  display: flex;
  flex-direction: column;
  width: 25%;
}
div {
  font-size: 1.2rem !important;
}
.navcontest {
  position: static;
}
.section.main {
  background-color: #eef1f7;
}
.is-3 {
  padding: 0rem;
}
.is-12 {
  padding-top: 0rem !important;
  padding-bottom: 0rem !important;
}
.primordial {
  padding-top: 0.25rem;
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
  padding: 0px 0.5rem;
}
strong {
  color: #fff !important;
}
.is-info > .media > .media-left > .icon > .mdi {
  color: #fff !important;
}
.is-info > .media {
  justify-content: center;
  align-items: center !important;
}

.notification {
  margin-bottom: 0rem;
  padding: 0.25rem;
}
.delete {
  position: absolute;
  right: 2em !important;
  top: 0em !important;
}
.timer {
  display: flex;
  justify-content: center;
}
.media {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.navProno {
  margin-bottom: 1rem;
}

@media (max-width: 1047px) {
  .asideLeft {
    width: 100%;
  }
  .sidect2 {
    display: inline;
  }
  .sci {
    padding: 0rem;
    width: 100% !important;
  }
  .inPlayMatch {
    margin-bottom: 0.75rem;
  }
  .sidect1 {
    display: none;
  }
  .is-sticky {
    margin-bottom: 0.2rem !important;
  }
  .navProno {
    margin-bottom: 0rem;
  }
  .has-text-centered,
  div {
    font-size: 0.8rem !important;
  }
  .timer {
    display: flex;
    justify-content: flex-start;
  }
  .main {
    background-color: #eef1f7;
    padding-top: 0.5rem !important;
    margin-left: 0px !important;
    margin-right: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }

  .section {
    padding: 5px !important;
    padding-top: 0.1rem !important;
  }
  .sct1 {
    padding: 0px;
    margin-left: 0px;
    margin-right: 0px;
    max-width: 100%;
    flex-direction: column-reverse !important;
  }
  .columns {
    margin-left: 0px !important;
    margin-right: 0px !important;
    padding: 0px !important;
  }
  .column {
    margin-left: 0px !important;
    margin-right: 0px !important;
    padding: 0px !important;
  }
  .babblesField {
    padding-top: 0rem !important;
  }
}
</style>
