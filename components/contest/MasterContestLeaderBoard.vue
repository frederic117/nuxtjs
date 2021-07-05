<template>
  <div v-if="leaderboards.length > 0">
    <div class="leaderBoardHead">
      <h1 class="column is-9 has-text-primary">
        <nuxt-link :to="`/contest`">
          <strong class="has-text-contest is-bold is-size-3 contest-name"
            >{{ masterContest.name }}&nbsp</strong
          >
          <span class="is-italic is-size-7">- classement général</span>
        </nuxt-link>
      </h1>
    </div>

    <section
      v-if="$auth.user && $auth.user._id"
      class="leaderBoardSection section"
    >
      <div v-if="leaderboards" class="column is-9">
        <b-loading
          :is-full-page="true"
          :active.sync="loading"
          :canCancel="false"
        ></b-loading>
        <div class>
          <div v-for="(leaderbord, index) in leaderboards" :key="index">
            <div class="box suggestBox">
              <div class="sideRecent mainSCI">
                <div class="displayFlex firstLeft">
                  <div class="is-bold has-text-contest is-size-2 classement">
                    {{ index + startFrom }}
                  </div>
                  <nuxt-link
                    :to="'/dashboard/' + leaderbord._id"
                    class="profLink"
                  >
                    <div class="image is-circle">
                      <img
                        loading="lazy"
                        class="imgProfile"
                        :src="leaderbord.picProfile"
                        alt="Image"
                      />
                    </div>
                  </nuxt-link>

                  <div class="profilWrapper">
                    <div class="nameProfilLink">
                      <nuxt-link :to="'/dashboard/' + leaderbord._id">
                        <div class="nameWrapMob">
                          <strong class="is-size-3 is-bold is-wc">{{
                            leaderbord.username
                          }}</strong>

                          <img
                            v-if="leaderbord.isOnline"
                            class="is-12x12"
                            src="~assets/images/online.png"
                            alt="online"
                          />
                        </div>
                      </nuxt-link>
                      <div class="activityUserWrapper">
                        <b-tooltip
                          :label="`réussite (${Number(
                            leaderbord.nbPronoWon
                          ).toLocaleString('fr')} pronos gagnants)`"
                          position="is-bottom"
                          class="bullsAndBearsPicVsLogo versusFigure1"
                          type="is-primary"
                          size="is-medium"
                        >
                          <span class="is-size-5 pronosticWonLeade">
                            <span class="activityUser">
                              <img
                                class="icon unfollow"
                                loading="lazy"
                                alt="contestMainReussite"
                                src="~assets/images/contestMainReussite.png"
                              />
                              <strong
                                >{{
                                  leaderbord.ratioWon &&
                                  Number(leaderbord.ratioWon) > 0
                                    ? (
                                        Number(leaderbord.ratioWon) * 100
                                      ).toFixed(0)
                                    : "-"
                                }}
                                %</strong
                              >
                            </span>
                          </span> </b-tooltip
                        >&nbsp
                        <b-tooltip
                          label="rounds gagnés"
                          position="is-bottom"
                          class="bullsAndBearsPicVsLogo versusFigure1"
                          type="is-primary"
                          size="is-medium"
                        >
                          <span class="is-size-5 pronosticWonLeade">
                            <span class="activityUser">
                              <img
                                loading="lazy"
                                class="icon unfollow"
                                alt="coupe"
                                src="~assets/images/coupe.png"
                              />
                              <strong>{{
                                leaderbord.nbOfContestWon
                                  ? leaderbord.nbOfContestWon
                                  : 0
                              }}</strong>
                            </span>
                          </span>
                        </b-tooltip>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="!mobile" class="displayFlex desktopOnly">
                  <img
                    loading="lazy"
                    class="contestMainCagnotte is-48x48"
                    src="~assets/images/contestMainCagnotte.png"
                  />
                  <strong class="has-text-contest is-size-4"
                    >{{
                      leaderbord.totalGain
                        ? Number(leaderbord.totalGain.toFixed()).toLocaleString(
                            "fr"
                          )
                        : 0
                    }}
                    F$</strong
                  >
                </div>
                <div class="add-to-watchlist">
                  <strong class="is-wc pointsStrong is-size-3"
                    >{{
                      leaderbord.performancePoints
                        ? Number(
                            leaderbord.performancePoints.toFixed(0)
                          ).toLocaleString("fr")
                        : 0
                    }}
                    pts</strong
                  >
                  <div class="displayFlex mobileOnly">
                    <img
                      loading="lazy"
                      class="contestMainCagnotte is-48x48"
                      src="~assets/images/contestMainCagnotte.png"
                    />
                    <strong class="has-text-contest is-size-4"
                      >{{
                        leaderbord.totalGain
                          ? Number(
                              leaderbord.totalGain.toFixed()
                            ).toLocaleString("fr")
                          : 0
                      }}
                      F$</strong
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <b-loading
    v-else
    :is-full-page="false"
    :active.sync="loading"
    :canCancel="false"
  ></b-loading>
</template>
<script>
import moment from "moment";
import {
  followInsider,
  unfollowInsider,
  isFollowed,
} from "@/server/apiDashboard";
import {
  getMasterContestLeaderboard,
  getMasterContest,
} from "@/server/apiContest";

export default {
  components: {},
  head() {
    return {
      title:
        "Les meilleurs Insiders : Suivez leurs conseils et devenez un meilleur pronostiqueur ! - footfoot.co",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Pour l'amour du foot",
        },
      ],
    };
  },
  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      loading: true,
      followed: "",
      leaderboards: [],
      indexSelected: "all",
      total: 20,
      totalContest: 20,
      current: 1,
      perPage: 20,
      order: "",
      size: "",
      contest: "",
      isSimple: false,
      isRounded: false,
      startFrom: 1,
      activeLeaderboard: "",
      masterContest: "",
      matchList: [],
      modalResult: false,
      insider: "",
      activ: false,
      leaderboardsTodisplay: [],
    };
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
    usersOnlinelist() {
      return this.$store.state.var.usersOnlinelist;
    },
  },
  watch: {
    leaderboards: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.leaderboards) {
          this.leaderboardsTodisplay = this.leaderboards.map((el) => {
            let isOnline;
            let obj = el;
            el.isOnline = true
              ? this.usersOnlinelist.filter(
                  (l) =>
                    l.user == el._id &&
                    moment().add(-0.5, "minutes").format() <
                      moment(l.time).format()
                ).length > 0
              : false;
            return obj;
          });
        }
      },
    },
    usersOnlinelist: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.usersOnlinelist) {
          this.leaderboardsTodisplay = this.leaderboards.map((el) => {
            let isOnline;
            let obj = el;
            el.isOnline = true
              ? this.usersOnlinelist.filter(
                  (l) =>
                    l.user == el._id &&
                    moment().add(-0.5, "minutes").format() <
                      moment(l.time).format()
                ).length > 0
              : false;
            return obj;
          });
        }
      },
    },
  },

  mounted() {
    this.loading = true;
    getMasterContest(this.$route.params.contestId).then((masterContest) => {
      this.masterContest = masterContest;
    });
    getMasterContestLeaderboard(this.$route.params.contestId).then(
      (leaderboards) => {
        if (leaderboards.length === 0) {
          this.$router.push("/notFound");
        } else {
          this.leaderboards = leaderboards;
          this.loading = false;
        }
      }
    );
  },
  destroyed() {
    this.$emit("isnotleaderboardcontest");
  },
  methods: {
    closeResult() {
      this.insider = "";
      this.matchList = [];
      this.modalResult = false;
    },

    directChamp(ligue) {
      this.$store.commit("var/setNewValue", ligue);
      setTimeout(() => {
        this.$router.push("/leagues");
      }, 1);
    },

    editMyProfile() {
      this.$router.push("/mydashboard");
    },
    follow(leaderbord) {
      if (this.activ == false) {
        this.activ = true;
        if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
          this.isLoading = true;
          followInsider(leaderbord._id).then((resp) => {
            this.$auth.fetchUser();
            this.isLoading = false;
            getMasterContestLeaderboard(this.$route.params.contestId).then(
              (leaderboards) => {
                this.leaderboards = leaderboards;
                this.activ = false;
              }
            );
          });
        } else {
          this.$router.push("/signup");
        }
      }
      //.catch(next);
    },
    unfollow(leaderbord) {
      if (this.activ == false) {
        this.activ = true;
        if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
          this.isLoading = true;
          unfollowInsider(leaderbord._id).then((resp) => {
            this.$auth.fetchUser();
            this.isLoading = false;
            getMasterContestLeaderboard(this.$route.params.contestId).then(
              (leaderboards) => {
                this.leaderboards = leaderboards;
                this.activ = false;
              }
            );
          });
        } else {
          this.$router.push("/signup");
        }
      }
      //.catch(next);
    },

    moment: function (time) {
      return moment(time);
    },
  },
};
</script>

<style scoped>
h1 {
  display: FLEX;
  justify-content: CENTER;
  align-items: CENTER;
}
.is-9 {
  margin: auto;
}
.is-size-7 {
  font-size: 1.5rem !important;
}
.firstLeft {
  min-width: 50%;
}
.displayFlex {
  align-items: center;
}
.is-48x48 {
  height: 48px;
  margin-right: 5px;
  width: auto;
}
.profLink {
  margin-right: 30px;
}
.classement {
  min-width: 10%;
  margin-right: 20px;
}
.add-to-watchlist {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box {
  padding: 0.25rem;
}
.share {
  height: auto;
  width: 2rem;
}
.button:focus:not(:active),
.button.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em #eef1f7;
}
.profilWrapper {
  margin-right: 0px !important;
}

.sideRecent {
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin: 0 20px;
}
.mainSCI > div {
  margin-bottom: 0rem;
}

.activityUser {
  width: 100%;
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-size: 1.2rem !important;
}
.activityUser > img {
  margin-right: 5px;
}
.sideRecent > div > div {
  display: flex;
}
.nameProfilLink {
  flex-direction: column;
}
strong {
  color: #192b41;
}

span {
  color: #0084a4;
}
.icon {
  width: auto !important;
}
.imgProfile {
  height: auto !important;
  width: 60px !important;
  max-width: 100px !important;
}
.is-12x12 {
  margin-left: 10px;
  align-self: center;
  height: 15px;
  width: auto;
}
.mobileOnly {
  display: none !important;
}
.activityUserWrapper {
  display: flex;
  margin-bottom: 0.25rem;
  margin-top: 0.25rem;
}
.is-size-3 {
  font-size: 1.75rem !important;
}
@media (max-width: 1047px) {
  .is-size-7 {
    font-size: 0.75rem !important;
  }
  .mobileOnly {
    display: flex !important;
  }
  .pointsStrong {
    display: flex;
    align-items: center;
  }
  .pointsStrong > i {
    margin-left: 5px;
  }
  .classement {
    margin-right: 5px;
    font-size: 1.5rem !important;
    min-width: fit-content;
  }
  .firstLeft {
    min-width: 65%;
  }
  .nameWrapMob {
    display: flex;
    align-items: center;
  }
  .tag {
    font-size: 0.7rem !important;
    margin-left: 10px;
  }
  .is-48x48 {
    height: 24px;
    margin-right: 5px;
    width: auto;
  }
  .desktopOnly {
    display: none !important;
  }
  .mobileOnly {
    display: flex;
  }
  .is-size-3 {
    font-size: 1.25rem !important;
  }
  .is-size-4 {
    font-size: 1rem !important;
  }
  .profLink {
    margin-right: 10px;
  }

  .is-12x12 {
    margin-left: 10px;
    height: 10px;
    width: auto;
  }
  .suggestBox {
    padding: 0.25rem !important;
  }
  .unfollow {
    width: 1.5rem !important;
  }
  .share {
    height: 1.5rem;
    width: 1.5rem;
  }
  .profilWrapper {
    width: 100%;
  }
  .sideRecent {
    align-items: center;
    display: flex;
    width: 100%;
    margin: auto;
  }

  .activityUser {
    display: flex;
    align-items: center;
    margin-right: 5px;
    font-size: 0.95rem !important;
  }
  .activityUser > img {
    height: 20px !important;
    width: auto !important;
  }
  .desktopOnly {
    display: none;
  }
  .imgProfile {
    height: auto;
    width: 40px !important;
    max-width: 60px !important;
  }
}
@media screen and (max-width: 365px) {
  .activityUser {
    font-size: 0.8rem !important;
  }
  .imgProfile {
    height: auto;
    width: 30px !important;
    max-width: 45px !important;
  }
  .pointsStrong {
    font-size: 1rem !important;
  }
}
</style>