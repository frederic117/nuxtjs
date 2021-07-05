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
    <div v-if="postWriting === false" class="primordial">
      <div class="sct1">
        <div v-if="!mobile" class="column is-3 sci">
          <client-only>
            <my-profile
              v-if="$auth.user && $auth.user.username"
              class="column is-12 sidect1"
            ></my-profile>
          </client-only>
          <client-only>
            <side-current-insight
              v-if="$auth.user && $auth.user._id"
              @ligue="ligue($event)"
              class="column is-12 sidect1"
            ></side-current-insight>
            <side-current-insight-unconnect
              v-else
              @signup="signup()"
              class="column is-12 sidect1"
            ></side-current-insight-unconnect>
          </client-only>
        </div>
        <div class="babblesField column is-6">
          <my-timeline
            @abonnement="abo()"
            :abonnementList="abonnementList"
            @loadMore="loadMore($event)"
            @ligue="ligue($event)"
            :forums="forums"
            :babbles="babbles"
            :babblesFavoris="babblesFavoris"
            :babblesPodcast="babblesPodcast"
            :filterBy="filterBy"
            @forum="forum()"
            @podCast="podcast()"
            @sort="changeSort($event)"
            @refresh="refresh()"
            @changeBabbles="updateTimelineBabble($event)"
          ></my-timeline>
          <div
            id="loader-container"
            v-if="loadMoreIsActive && isLoading == false"
          >
            <slot name="loading">
              <div class="spinner"></div>
            </slot>
          </div>
        </div>
        <div class="column is-3 sci">
          <client-only>
            <match-inplay
              v-if="matches && matches.length > 0"
              @ligue="ligue($event)"
              class="column is-12 inPlayMatch"
            ></match-inplay>
          </client-only>
          <client-only v-if="!mobile">
            <side-next-affiche
              class="column is-12 sidect1"
              @ligue="ligue($event)"
            ></side-next-affiche>
          </client-only>
          <!--<side-recent-activity  class="column is-12 sidect1 " :recentPositions ="recentPositions"></side-recent-activity>-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  getVideo,
  getAllForums,
  getAbo,
  getWatchInsight,
  getAllBabbles,
  getClapBabbles,
  getPodcast,
} from "@/server/api";

export default {
  name: "mypage",
  ////  middleware({ route, store, redirect }) {
  ////if (
  ////      route.fullPath === "/" &&
  ////  store.state.auth.user &&
  ////     store.state.auth.user._id
  ////   ) {
  ////      return redirect("/contest");
  ////   }
  //// },
  auth: false,
  scrollToTop: true,
  async asyncData({ params, store, query }) {
    let babbleLanding =
      store.state.datapage &&
      store.state.datapage.babbleLanding &&
      store.state.datapage.babbleLanding.page
        ? store.state.datapage.babbleLanding
        : "";
    let userId =
      store.state.auth && store.state.auth.user && store.state.auth.user._id
        ? store.state.auth.user._id
        : "";
    let watchInsight = userId
      ? store.state.var &&
        store.state.var.watchInsight &&
        store.state.var.watchInsight[0]
        ? store.state.var.watchInsight.filter((w) => !w.userBet).length > 0
          ? true
          : false
        : false
      : false;

    let lang =
      store.state.var && store.state.var.langSelected
        ? store.state.var.langSelected
        : query.lang == "en"
        ? "EN"
        : query.lang == "fr"
        ? "FR"
        : "";

    if (lang) {
      store.commit("var/setNewLang", lang);
    }
    let [babbles, babblesPodcast, babblesFavoris, forums, filterBy] =
      await Promise.all([
        babbleLanding
          ? babbleLanding.babbles
          : (params.path && params.path == "all") || !params.path
          ? getAllBabbles("all", 1, userId)
          : "",
        params.path && params.path == "podcast" ? getPodcast(false, 1) : "",
        params.path && params.path == "clap" && userId
          ? getClapBabbles(userId, 1)
          : "",
        params.path && params.path == "forum" ? getAllForums(1, "") : "",
        watchInsight
          ? "pronos"
            ? params.path
              ? params.path
              : "all"
            : "all"
          : params.path
          ? params.path
          : "all",
      ]);

    return {
      babbles: userId
        ? babbles
        : lang
        ? babbles.filter((b) => !b.lang || b.lang == lang)
        : babbles,
      babblesPodcast: babblesPodcast,
      babblesFavoris: babblesFavoris,
      forums: forums,
      filterBy: filterBy,
    };
  },

  head() {
    return {
      htmlAttrs: {
        lang: this.langSelected ? this.langSelected.toLowerCase() : "fr",
      },
      title:
        this.langSelected == "EN"
          ? "footfoot - For the love of football"
          : "footfoot - Pour l'amour du football",
      meta: [
        {
          hid: `description`,
          name: "description",
          content:
            this.langSelected == "EN"
              ? "The football live on footfoot. News, controversies, players, stats, results and rankings. Live, images and videos to watch and share"
              : "Le foot en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager",
        },
        {
          hid: `keywords`,
          name: "keywords",
          keywords:
            this.langSelected == "EN"
              ? "foot, live match, mercato, football, players, predictions, polemics, stats,soccer, results and rankings"
              : "foot, match en direct, mercato, football, joueurs, pronos, polémiques, stats, résultats et classements",
        },
        {
          hid: `og:type`,
          property: "og:type",
          content: "article",
        },
        {
          hid: `og:title`,
          property: "og:title",
          content:
            this.langSelected == "EN"
              ? "footfoot - For the love of football"
              : "footfoot - Pour l'amour du football",
        },
        {
          hid: `og:url`,
          property: "og:url",
          content: "https://www.footfoot.co",
        },
        {
          hid: `og:image`,
          property: "og:image",
          content: "/icon.png",
        },
        {
          hid: `og:description`,
          property: "og:description",
          content:
            this.langSelected == "EN"
              ? "The football live on footfoot. News, controversies, players, stats, results and rankings. Live, images and videos to watch and share"
              : "Le foot en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager",
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
          content: "footfoot.co",
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
            this.langSelected == "EN"
              ? "footfoot - For the love of football"
              : "footfoot - Pour l'amour du football",
        },
        {
          hid: `twitter:description`,
          property: "twitter:description",
          content:
            this.langSelected == "EN"
              ? "The football live on footfoot. News, controversies, players, stats, results and rankings. Live, images and videos to watch and share"
              : "Le foot en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager",
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
  props: {},
  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      loadMoreIsActive: true,
      isLoading: false,
      watchItem: "",
      recentPositions: "",
      postWriting: false,
      page: 1,
      babbleTodisplayActive: false,
      abonnementList: "",
      babbles: "",
      babblesPodcast: "",
      babblesFavoris: "",
      forums: "",
      filterBy: "",
    };
  },

  computed: {
    watchInsight() {
      return this.$store.state.var.watchInsight;
    },
    babbleLanding() {
      return this.$store.state.datapage.babbleLanding;
    },
    matches() {
      return this.$store.state.var.matches;
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
    mypage() {
      return this.$store.state.var.mypage;
    },
    babbleTodisplay() {
      return this.$store.state.var.babbleTodisplay;
    },
  },
  components: {
    DisplaybabbleModal: () =>
      import("@/components/side-component/DisplaybabbleModal"),
    MyProfile: () => import("@/components/userpage/MyProfile"),
    SideNextAffiche: () =>
      import("@/components/side-component/SideNextAffiche"),
    SideCurrentInsight: () =>
      import("@/components/side-component/SideCurrentInsight"),
    SideCurrentInsightUnconnect: () =>
      import("@/components/side-component/SideCurrentInsightUnconnect"),
    MyTimeline: () => import("@/components/userpage/MyTimeline"),
    SideRecentActivity: () =>
      import("@/components/side-component/SideRecentActivity"),
    MatchInplay: () => import("@/components/side-component/MatchInplay"),
  },

  methods: {
    loadMore(event) {
      if (!this.$nuxt.isOffline) {
        let userId =
          this.$store.state.auth.user && this.$store.state.auth.user._id
            ? this.$store.state.auth.user._id
            : "";
        if (this.loadMoreIsActive == false) {
          //this.isLoading = true;
          this.loadMoreIsActive = true;
          this.page++;
          if (this.filterBy == "podcast") {
            if (this.babblesPodcast[0] != ["empty"]) {
              getPodcast(false, this.page).then((podcasts) => {
                if (podcasts.length > 0) {
                  this.babblesPodcast = podcasts;
                }
                this.loadMoreIsActive = false;
              });
            } else {
              this.loadMoreIsActive = false;
            }
          } else if (this.filterBy == "forum") {
            if (this.forums[0] != ["empty"]) {
              getAllForums(this.page, "").then((forums) => {
                if (forums.length > 0) {
                  this.forums = forums;
                }
                this.loadMoreIsActive = false;
              });
            } else {
              this.loadMoreIsActive = false;
            }
          } else if (this.filterBy === "pronos") {
            this.filterBy = "pronos";
            this.loadMoreIsActive = false;
          } else if (this.filterBy === "resultats") {
            this.filterBy = "resultats";
            this.loadMoreIsActive = false;
          } else if (this.filterBy === "clap") {
            if (userId) {
              if (this.babblesFavoris[0] != ["empty"]) {
                getClapBabbles(userId, this.page).then((babbles) => {
                  if (babbles.length > 0) {
                    this.babblesFavoris = babbles;
                    this.loadMoreIsActive = false;
                  } else {
                    this.babblesFavoris = ["empty"];
                    this.loadMoreIsActive = false;
                  }
                });
              } else {
                this.loadMoreIsActive = false;
              }
            } else {
              this.babblesFavoris = ["empty"];
              this.loadMoreIsActive = false;
            }
          } else {
            this.filterBy = "all";

            if (this.babbles[0] != ["empty"]) {
              getAllBabbles("all", this.page, userId).then((babbles) => {
                if (babbles.length > 0) {
                  if (this.$auth.user && this.$auth.user._id) {
                    this.babbles = babbles;
                  } else {
                    this.babbles = babbles.filter(
                      (b) => !b.lang || b.lang == this.langSelected
                    );
                  }
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
    openPost() {
      this.postWriting = !this.postWriting;
    },
    contest() {
      this.$router.push("/contest");
    },
    ligue(ligue) {
      this.$store.commit("var/setNewValue", ligue);
    },

    updateTimelineBabble() {
      this.fetchData();
      this.postWriting = false;
    },
    podcast() {
      this.filterBy = "podcast";
      this.isLoading =
        this.babblesPodcast && this.babblesPodcast.length > 1 ? false : true;
      getPodcast(false, this.page).then((podcasts) => {
        if (podcasts.length > 0) {
          this.babblesPodcast = podcasts;
        } else {
          this.babblesPodcast = ["empty"];
        }
        this.isLoading = false;
      });
    },

    abo() {
      this.filterBy = "abonnement";
    },
    forum() {
      this.filterBy = "forum";
      this.isLoading = this.forums && this.forums.length > 1 ? false : true;
      getAllForums(this.page, "").then((forums) => {
        if (forums.length > 0) {
          this.forums = forums;
        } else {
          this.forums = ["empty"];
        }
        this.isLoading = false;
      });
    },
    refresh() {
      this.filterBy = "all";
      this.isLoading = this.babbles && this.babbles.length > 1 ? false : true;
      let userId =
        this.$store.state.auth.user && this.$store.state.auth.user._id
          ? this.$store.state.auth.user._id
          : "";
      getAllBabbles("all", 1, userId).then((babbles) => {
        if (babbles.length > 0) {
          if (this.$auth.user && this.$auth.user._id) {
            this.babbles = babbles;
          } else {
            this.babbles = babbles.filter(
              (b) => !b.lang || b.lang == this.langSelected
            );
            if (
              this.babbles.length ==
              babbles.filter((b) => !b.lang || b.lang == this.langSelected)
                .length
            ) {
              this.loadMore();
            }
          }
        } else {
          this.babbles = ["empty"];
        }
        this.isLoading = false;
      });
    },
    changeSort(filterBy) {
      let userId =
        this.$store.state.auth.user && this.$store.state.auth.user._id
          ? this.$store.state.auth.user._id
          : "";
      this.filterBy = filterBy;
      if (this.filterBy == "pronos") {
      } else if (this.filterBy == "clap") {
        this.isLoading =
          this.babblesFavoris && this.babblesFavoris.length > 1 ? false : true;
        if (userId) {
          getClapBabbles(userId, this.page).then((babbles) => {
            if (babbles.length > 0) {
              this.babblesFavoris = babbles;
            } else {
              this.babblesFavoris = ["empty"];
            }
            this.isLoading = false;
          });
        } else {
          this.babblesFavoris = ["empty"];
          this.isLoading = false;
        }
      } else {
        this.filterBy = "all";
        if (this.babbleLanding) {
          this.isLoading = false;
          this.page = this.babbleLanding.page + 1;
        } else {
          this.isLoading =
            this.babbles && this.babbles.length > 1 ? false : true;
        }
        getAllBabbles("all", this.page, userId).then((babbles) => {
          if (babbles.length > 0) {
            if (this.$auth.user && this.$auth.user._id) {
              this.babbles = babbles;
            } else {
              this.babbles = babbles.filter(
                (b) => !b.lang || b.lang == this.langSelected
              );
            }
          } else {
            this.babbles = ["empty"];
          }
          this.isLoading = false;
        });
      }
    },

    fetchData() {
      let userId =
        this.$store.state.auth.user && this.$store.state.auth.user._id
          ? this.$store.state.auth.user._id
          : "";

      this.isLoading = true;
      if (this.filterBy == "forum") {
        this.filterBy = "forum";
        getAllForums(this.page, "").then((forums) => {
          if (forums.length > 0) {
            this.forums = forums;
          } else {
            this.forums = ["empty"];
          }
          this.isLoading = false;
        });
      } else if (this.filterBy == "podcast") {
        this.filterBy = "podcast";
        getPodcast(false, this.page).then((podcasts) => {
          if (podcasts.length > 0) {
            this.babblesPodcast = podcasts;
          } else {
            this.babblesPodcast = ["empty"];
          }
          this.isLoading = false;
        });
      } else if (this.filterBy == "videos") {
        this.filterBy = "videos";
        getAllBabbles(this.filterBy, this.page, userId).then((babbles) => {
          if (babbles.length > 0) {
            if (this.$auth.user && this.$auth.user._id) {
              this.babbles = babbles;
            } else {
              this.babbles = babbles.filter(
                (b) => !b.lang || b.lang == this.langSelected
              );
            }
            this.isLoading = false;
          } else {
            this.babbles = ["empty"];
            this.isLoading = false;
          }
        });
      } else if (this.filterBy == "clap") {
        if (userId) {
          this.filterBy = "clap";
          getClapBabbles(userId, this.page).then((babbles) => {
            if (babbles.length > 0) {
              this.babblesFavoris = babbles;
              this.isLoading = false;
            } else {
              this.babblesFavoris = ["empty"];
              this.isLoading = false;
            }
          });
        } else {
          this.babblesFavoris = ["empty"];
          this.isLoading = false;
        }
      } else if (this.filterBy == "pronos") {
        this.filterBy = "pronos";
      } else if (this.filterBy == "resultats") {
        this.filterBy = "resultats";
      } else if (this.filterBy == "abonnement") {
        this.filterBy = "abonnement";
      } else {
        this.filterBy = "all";
        this.isLoading = true;
        getAllBabbles(this.filterBy, this.page, userId).then((babbles) => {
          if (babbles.length > 0) {
            if (this.$auth.user && this.$auth.user._id) {
              this.babbles = babbles;
            } else {
              this.babbles = babbles.filter(
                (b) => !b.lang || b.lang == this.langSelected
              );
            }
          } else {
            this.babbles = ["empty"];
          }
          this.isLoading = false;
        });
      }

      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        getAbo(this.$store.state.auth.user._id).then((abo) => {
          if (abo.abonnements && abo.abonnements.length > 0) {
            this.abonnementList = abo.abonnements.sort((a, b) =>
              a.username.localeCompare(b.username)
            );
          }
        });
      } else {
        this.abonnementList = "";
      }
    },
    signup() {
      this.$router.push("/signup");
    },
    LoginModal(autenticate) {
      this.$router.push("/login");
    },
  },
  beforeDestroy() {},

  mounted() {
    let userId =
      this.$store.state.auth.user && this.$store.state.auth.user._id
        ? this.$store.state.auth.user._id
        : "";

    if (process.client && !this.$nuxt.isOffline) {
      this.$store.commit("var/setNewValue", "NextMatch");
      this.$store.commit("var/contestInscription", "");

      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        getAbo(this.$store.state.auth.user._id).then((abo) => {
          if (abo.abonnements && abo.abonnements.length > 0) {
            this.abonnementList = abo.abonnements.sort((a, b) =>
              a.username.localeCompare(b.username)
            );
          }
        });
      }
      if (this.filterBy == "clap") {
        this.loadMoreIsActive = false;
      }
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        if (this.babblesFavoris == "") {
          getClapBabbles(this.$store.state.auth.user._id, 1).then((babbles) => {
            if (babbles && babbles.length > 0) {
              this.babblesFavoris = babbles;
            } else {
              this.babblesFavoris = ["empty"];
            }
          });
        }
      } else {
        this.babblesFavoris = ["empty"];
      }

      if (this.babblesPodcast == "") {
        getPodcast(false, 1).then((babbles) => {
          if (babbles && babbles.length > 0) {
            this.babblesPodcast = babbles;
          } else {
            this.babblesPodcast = ["empty"];
          }
        });
      }
      if (this.filterBy == "all") {
        this.page = 2;
        this.isLoading = false;
        getAllBabbles("all", this.page, userId).then((babbles) => {
          if (babbles && babbles.length > 0) {
            if (this.$auth.user && this.$auth.user._id) {
              this.babbles = babbles;
            } else {
              this.babbles = babbles.filter(
                (b) => !b.lang || b.lang == this.langSelected
              );
            }
          } else {
            this.babbles = ["empty"];
          }
          this.loadMoreIsActive = false;
          this.isLoading = false;
        });
      }
      if (userId && !this.$store.state.var.watchInsight) {
        getWatchInsight(userId).then((watchInsight) => {
          watchInsight.sort((a, b) => new Date(a.date) - new Date(b.date));
          this.$store.commit("var/watchInsight", watchInsight);
        });
      }
    }
  },
  watch: {
    langSelected: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.langSelected) {
          this.loadMore();
        }
      },
    },
    filterBy: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (process.client) {
          if (this.filterBy == "all") {
            this.page =
              this.babbles && this.babbles[0] && this.babbles.length / 10 > 1
                ? Math.round(this.babbles.length / 10)
                : 1;
          } else if (this.filterBy == "clap") {
            this.page =
              this.babblesFavoris &&
              this.babblesFavoris[0] &&
              this.babblesFavoris.length / 10 > 1
                ? Math.round(this.babblesFavoris.length / 10)
                : 1;
          } else if (this.filterBy == "forum") {
            this.page =
              this.forums && this.forums[0] && this.forums.length / 10 > 1
                ? Math.round(this.forums.length / 10)
                : 1;
          } else if (this.filterBy == "podcast") {
            this.page =
              this.babblesPodcast &&
              this.babblesPodcast[0] &&
              this.babblesPodcast.length / 10 > 1
                ? Math.round(this.babblesPodcast.length / 10)
                : 1;
          } else {
            this.page = 1;
          }
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 1);
        }
      },
    },
    watchInsight: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (
          this.$auth.user &&
          this.$auth.user._id &&
          this.watchInsight &&
          this.watchInsight.filter((w) => !w.userBet).length > 0 &&
          this.mobile
        ) {
          this.filterBy = "pronos";
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

    $route() {
      this.loadMoreIsActive = false;
      this.isLoading = false;
      let userId =
        this.$store.state.auth.user && this.$store.state.auth.user._id
          ? this.$store.state.auth.user._id
          : "";

      this.page = 1;

      if (this.$route.path && this.$route.path.includes("forum")) {
        this.filterBy = "forum";
        getAllForums(this.page, "").then((forums) => {
          if (forums.length > 0) {
            this.forums = forums;
          } else {
            this.forums = ["empty"];
          }
          this.isLoading = false;
        });
      } else if (this.$route.path && this.$route.path.includes("podcast")) {
        this.filterBy = "podcast";

        getPodcast(false, this.page).then((podcasts) => {
          if (podcasts.length > 0) {
            this.babblesPodcast = podcasts;
          } else {
            this.babblesPodcast = ["empty"];
          }
          this.isLoading = false;
        });
      } else if (this.$route.path && this.$route.path.includes("videos")) {
        this.filterBy = "videos";
        getAllBabbles(this.filterBy, this.page, userId).then((babbles) => {
          if (babbles.length > 0) {
            this.babbles = babbles;

            this.isLoading = false;
          } else {
            this.babbles = ["empty"];
            this.isLoading = false;
          }
        });
      } else if (this.$route.path && this.$route.path.includes("clap")) {
        this.filterBy = "clap";
        if (userId) {
          getClapBabbles(userId, this.page).then((babbles) => {
            if (babbles.length > 0) {
              this.babblesFavoris = babbles;
              this.isLoading = false;
            } else {
              this.babblesFavoris = ["empty"];
              this.isLoading = false;
            }
          });
        } else {
          this.babblesFavoris = ["empty"];
          this.isLoading = false;
        }
      } else if (this.$route.path && this.$route.path.includes("pronos")) {
        this.filterBy = "pronos";
      } else if (this.$route.path && this.$route.path.includes("resultats")) {
        this.filterBy = "resultats";
      } else if (this.$route.path && this.$route.path.includes("abonnement")) {
        this.filterBy = "abonnement";
      } else {
        this.filterBy = "all";
        if (this.babbleLanding) {
          this.page = this.babbleLanding.page + 1;
        }
        getAllBabbles(this.filterBy, this.page, userId).then((babbles) => {
          if (babbles.length > 0) {
            if (this.$auth.user && this.$auth.user._id) {
              this.babbles = babbles;
            } else {
              this.babbles = babbles.filter(
                (b) => !b.lang || b.lang == this.langSelected
              );
            }
          } else {
            this.babbles = ["empty"];
          }
          this.isLoading = false;
        });
      }

      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        this.$store.commit("var/setNewLang", this.$store.state.auth.user.lang);
      }

      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        getAbo(this.$store.state.auth.user._id).then((abo) => {
          if (abo.abonnements && abo.abonnements.length > 0) {
            this.abonnementList = abo.abonnements.sort((a, b) =>
              a.username.localeCompare(b.username)
            );
          }
        });
      } else {
        this.abonnementList = "";
      }

      this.$store.commit("var/setNewValue", "NextMatch");
      this.$store.commit("var/contestInscription", "");
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
