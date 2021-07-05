<template>
  <div class="primordial">
    <div class="sct1">
      <div v-if="!mobile" class="desktopOnly column is-3 sci">
        <my-profile
          v-if="$auth.user && $auth.user.username"
          class="column is-12 sidect1"
        ></my-profile>
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
      <div class="babblesField column is-6">
        <div>
          <section
            v-if="$auth.user && $auth.user._id"
            class="leaderBoardSection section"
          >
            <div>
              <div class="box">
                <div class="control has-icons-left formNav">
                  <multiselect
                    :custom-label="customLabelInsider"
                    v-model="nameInsider"
                    :placeholder="
                      langSelected === 'EN'
                        ? 'search for a friend'
                        : 'recherche un contact'
                    "
                    :loading="isLoading"
                    :options="optionsInsider"
                    :close-on-select="true"
                    @select="onSelect($event)"
                    @search-change="asyncFindInsider"
                    @close="closeMultiInsider()"
                    :showNoOptions="false"
                    track-by="searchName"
                    label="searchName"
                    :multiple="false"
                  >
                    <template slot="option" slot-scope="props">
                      <div class="searchWrap">
                        <img
                          loading="lazy"
                          class="option__image navImg roudImg"
                          :src="props.option.img"
                          alt="player"
                        />
                        <div class="option__desc">
                          <span class="option__title">{{
                            props.option.searchName
                          }}</span>
                        </div>
                      </div>
                    </template>
                    <span slot="noResult"
                      >{{
                        langSelected === "EN"
                          ? "no matching results!"
                          : "pas de résultats correspondants !"
                      }}
                    </span>
                  </multiselect>
                  <span class="icon is-big is-left">
                    <i class="fa fa-search" type="submit"></i>
                  </span>
                </div>
              </div>

              <div v-if="insidersTospeakTodisplay" class>
                <div
                  v-for="(user, index) in insidersTospeakTodisplay"
                  :key="index"
                >
                  <div @click="speakWith(user)" class="box pointer suggestBox">
                    <div class="sideRecent mainSCI">
                      <div class="displayFlex firstLeft">
                        <span class="profLink">
                          <div class="image is-circle">
                            <img
                              loading="lazy"
                              class="imgProfile"
                              :src="user.picProfile"
                              alt="Image"
                            />
                          </div>
                        </span>

                        <div class="profilWrapper">
                          <div class="nameProfilLink">
                            <div class="displayFlex">
                              <span>
                                <div class="nameWrapMob">
                                  <strong class="is-size-3 is-bold is-wc">{{
                                    user.username
                                  }}</strong>

                                  <img
                                    loading="lazy"
                                    v-if="user.isOnline"
                                    class="is-12x12"
                                    src="~assets/images/online.png"
                                    alt="online"
                                  />
                                </div>
                              </span>
                              <i
                                @click="speakWith(user)"
                                class="mdi mdi-telegram mdi-36px pointer"
                              ></i>
                              &nbsp<i
                                v-if="user.isOnline"
                                @click="openVideo(user)"
                                class="pointer fas fa-video"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-if="user.notRead == true">
                        <i
                          @click="speakWith(user)"
                          class="mdi mdi-bell mdi-36px pointer"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div v-if="!mobile" class="desktopOnly column is-3 sci">
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
</template>

<script>
import moment from "moment";
import getUsersforchat from "@/server/apiContest";
import {
  getInsiderProfileInfo,
  followInsider,
  unfollowInsider,
  isFollowed,
} from "@/server/apiDashboard";

import { searchAll } from "@/server/apiSearch";
import Multiselect from "vue-multiselect";
export default {
  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      isLoading: false,
      insidersTospeakTodisplay: [],
      nameInsider: "",
      optionsInsider: [],
    };
  },
  components: {
    Multiselect,
    MyProfile: () => import("@/components/userpage/MyProfile"),
    SideNextAffiche: () =>
      import("@/components/side-component/SideNextAffiche"),
    SideCurrentInsight: () =>
      import("@/components/side-component/SideCurrentInsight"),
    SideCurrentInsightUnconnect: () =>
      import("@/components/side-component/SideCurrentInsightUnconnect"),
    SideRecentActivity: () =>
      import("@/components/side-component/SideRecentActivity"),
    MatchInplay: () => import("@/components/side-component/MatchInplay"),
  },
  computed: {
    insiderWantsTotalk() {
      return this.$store.state.var.insiderWantsTotalk;
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
    usersOnlinelist() {
      return this.$store.state.var.usersOnlinelist;
    },
    insidersTospeak() {
      return this.$store.state.var.insidersTospeak;
    },
  },
  props: {},
  mounted() {},
  methods: {
    openVideo(user) {
      this.$nuxt.$emit("openVideo", user);
    },
    asyncFindInsider(query) {
      this.isLoading = true;
      this.optionsInsider = [];
      let optionInsider = {};

      if (query[1]) {
        searchAll(query.toLowerCase()).then((resp) => {
          this.isLoading = false;
          if (resp.users && resp.users.length > 0) {
            optionInsider = resp.users
              .filter((l) => l._id != this.$auth.user._id)
              .filter((l) => l.role != "bot")
              .map((u) => {
                return {
                  searchName: u.username,
                  shortName: u._id,
                  type: "Insider",
                  img: u.picProfile ? u.picProfile : u.initalPicture,
                };
              });
            this.optionsInsider = optionInsider;
          }
        });
      } else {
        this.isLoading = false;
        this.optionsInsider = [];
      }
    },
    closeMultiInsider() {
      this.isLoading = false;
      this.optionsInsider = [];
      this.nameInsider = "";
    },
    customLabelInsider({ searchName }) {
      if (searchName) {
        return `${searchName}`;
      } else {
        return [];
      }
    },
    onSelect(event) {
      getInsiderProfileInfo(event.shortName).then((profileInfo) => {
        this.$store.commit("var/speak", profileInfo);
      });
    },
    speakWith(userTospeak) {
      this.$store.commit("var/speak", userTospeak);
    },
    moment: function (time) {
      return moment(time);
    },
  },
  watch: {
    insidersTospeak: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.insidersTospeak && this.insidersTospeak.length > 0) {
          this.insidersTospeakTodisplay = this.insidersTospeak
            .map((el) => {
              let isOnline;
              let obj = el;
              el.notRead = true
                ? this.insiderWantsTotalk.filter((i) => el._id == i._id)
                    .length > 0
                : false;
              el.isOnline = true
                ? this.usersOnlinelist.filter(
                    (l) =>
                      l.user == el._id &&
                      moment().add(-2, "minutes").format() <
                        moment(l.time).format()
                  ).length > 0
                : false;
              return obj;
            })
            .filter((l) => l._id != this.$auth.user._id)
            .sort((a, b) => a.username.localeCompare(b.username))
            .sort((a, b) => (a.notRead === b.notRead ? 0 : a.notRead ? -1 : 1));
        }
        if (this.insidersTospeak && this.insidersTospeak.length > 0) {
          this.optionsInsider = [];
          this.insidersTospeak
            .filter((l) => l._id != this.$auth.user._id)
            .map((el) => {
              let obj = {};
              obj.isOnline = true
                ? this.usersOnlinelist.filter(
                    (l) =>
                      l.user == el._id &&
                      moment().add(-2, "minutes").format() <
                        moment(l.time).format()
                  ).length > 0
                : false;
              obj.searchName = el.username;
              obj.shortName = el._id;
              obj.type = "Insider";
              obj.img = el.picProfile ? el.picProfile : el.initalPicture;
              this.optionsInsider.push(obj);
            })
            .sort((a, b) => a.searchName.localeCompare(b.searchName));
        }
      },
    },

    usersOnlinelist: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (
          this.usersOnlinelist &&
          this.insidersTospeak &&
          this.insidersTospeak.length > 0
        ) {
          this.insidersTospeakTodisplay = this.insidersTospeak
            .map((el) => {
              let isOnline;
              let obj = el;
              el.notRead = true
                ? this.insiderWantsTotalk.filter((i) => el._id == i._id)
                    .length > 0
                : false;
              el.isOnline = true
                ? this.usersOnlinelist.filter(
                    (l) =>
                      l.user == el._id &&
                      moment().add(-2, "minutes").format() <
                        moment(l.time).format()
                  ).length > 0
                : false;
              return obj;
            })
            .filter((l) => l._id != this.$auth.user._id)
            .sort((a, b) => a.username.localeCompare(b.username))
            .sort((a, b) => (a.notRead === b.notRead ? 0 : a.notRead ? -1 : 1));
        }
        if (this.insidersTospeak && this.insidersTospeak.length > 0) {
          this.optionsInsider = [];
          this.insidersTospeak
            .filter((l) => l._id != this.$auth.user._id)
            .map((el) => {
              let obj = {};
              obj.isOnline = true
                ? this.usersOnlinelist.filter(
                    (l) =>
                      l.user == el._id &&
                      moment().add(-2, "minutes").format() <
                        moment(l.time).format()
                  ).length > 0
                : false;
              obj.searchName = el.username;
              obj.shortName = el._id;
              obj.type = "Insider";
              obj.img = el.picProfile ? el.picProfile : el.initalPicture;
              this.optionsInsider.push(obj);
            })
            .sort((a, b) => a.searchName.localeCompare(b.searchName));
        }
      },
    },
    insiderWantsTotalk: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.insidersTospeak && this.insidersTospeak.length > 0) {
          this.insidersTospeakTodisplay = this.insidersTospeak
            .map((el) => {
              let isOnline;
              let obj = el;
              el.notRead = true
                ? this.insiderWantsTotalk.filter((i) => el._id == i._id)
                    .length > 0
                : false;
              el.isOnline = true
                ? this.usersOnlinelist.filter(
                    (l) =>
                      l.user == el._id &&
                      moment().add(-2, "minutes").format() <
                        moment(l.time).format()
                  ).length > 0
                : false;
              return obj;
            })
            .filter((l) => l._id != this.$auth.user._id)
            .sort((a, b) => a.username.localeCompare(b.username))
            .sort((a, b) => (a.notRead === b.notRead ? 0 : a.notRead ? -1 : 1));
        }
        if (this.insidersTospeak && this.insidersTospeak.length > 0) {
          this.optionsInsider = [];
          this.insidersTospeak
            .filter((l) => l._id != this.$auth.user._id)
            .map((el) => {
              let obj = {};
              obj.isOnline = true
                ? this.usersOnlinelist.filter(
                    (l) =>
                      l.user == el._id &&
                      moment().add(-2, "minutes").format() <
                        moment(l.time).format()
                  ).length > 0
                : false;
              obj.searchName = el.username;
              obj.shortName = el._id;
              obj.type = "Insider";
              obj.img = el.picProfile ? el.picProfile : el.initalPicture;
              this.optionsInsider.push(obj);
            })
            .sort((a, b) => a.searchName.localeCompare(b.searchName));
        }
      },
    },
  },
};
</script>
<style scoped>
.fa {
  text-align: center;
  vertical-align: top;
  color: #192b41;
}
.is-6 {
  margin: auto;
  margin-top: 0;
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
.box > .displayFlex {
  justify-content: center;
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
  margin: auto;
}
.mainSCI > div {
  margin-bottom: 0rem;
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

.mdi-bell {
  color: #ff7d00;
}
.mdi-telegram {
  color: #ff7d00;
  margin-left: 10px;
}

.fa-video {
  font-size: 1.25rem;
  color: #ff7d00;
  margin-left: 10px;
}
.mdi-telegram:before {
  font-size: 30px;
  max-height: 20px;
  display: flex;
  align-items: center;
}
.is-size-3 {
  font-size: 1.75rem !important;
}
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
.option__title {
  font-size: 1rem;
  font-weight: bold;
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
    display: flex !important;
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