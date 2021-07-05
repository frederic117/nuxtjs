<template>
  <div class="ultraWrapper">
    <headroom
      class="navbarMainWrapp"
      :class="{
        maskBottomnav: maskBottomnav && $route.path.includes('/chat/'),
        visibleTrue: babbleTodisplay,
        visible: $route.path.includes('chat'),
      }"
      :offset="20"
      :disabled="isCheck === true"
    >
      <header>
        <div v-if="searchActivate == false" class="navWrapper">
          <div class="top2">
            <div @click="backToPrevious()" class="pointer">
              <img
                loading="lazy"
                class="logoInsiders"
                src="~/assets/images/backButton.png"
                alt="backButton"
              />
              <img
                loading="lazy"
                class="logoInsiders"
                src="~/assets/images/logo.png"
                alt="footfootLogo"
              />
            </div>
          </div>
          <div class="displayFlex">
            <i
              @click="searchActivation"
              class="material-icons mdi mdi-magnify pointer"
              aria-hidden="true"
            ></i>

            <svg
              v-if="$auth && $auth.user && $auth.user._id"
              @click="goToChat"
              class="pointer"
              fill="#000000"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"
              />
            </svg>
            <button
              class="button is-success"
              v-else
              @click="goToChat"
              aria-hidden="true"
            >
              {{ langSelected == "EN" ? "sign in" : "rejoindre" }}
            </button>

            <div class="nav-profile">
              <nuxt-link
                v-if="$auth && $auth.user && $auth.user._id"
                :to="`/dashboard/${$auth.user._id}`"
              >
                <div class="image is-40x40 is-circle">
                  <img
                    loading="lazy"
                    class="imgProfile"
                    :src="$auth.user.picProfile"
                    alt="Image"
                  />
                </div>
              </nuxt-link>
              <div class="alignCenter" v-else>
                <img
                  v-if="langSelected == 'EN'"
                  loading="lazy"
                  class="flag-img"
                  @click="changeLang('FR')"
                  src="~assets/images/frenchflag.png"
                  alt="frenchFlag"
                />
                <img
                  v-else
                  loading="lazy"
                  class="flag-img"
                  @click="changeLang('EN')"
                  src="~assets/images/ukflag.png"
                  alt="ukFlag"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="searchActivate == true" class="navWrapper">
          <i
            @click="searchActivation"
            class="fa fa-arrow-left pointer"
            aria-hidden="true"
          ></i>
          <div v-if="data" class="control mobileNavBar">
            <multiselect
              :custom-label="customLabel"
              v-model="name"
              :placeholder="
                langSelected === 'EN'
                  ? 'search a news, a team or a player'
                  : 'recherche une info, une équipe ou un joueur...'
              "
              :loading="isLoading"
              @select="onSelect($event)"
              :options="options"
              :close-on-select="true"
              @search-change="asyncFind"
              @close="closeMulti()"
              :showNoOptions="false"
              group-values="detail"
              group-label="type"
              :group-select="false"
              track-by="searchName"
              label="searchName"
            >
              <template slot="option" slot-scope="props">
                <span v-if="props.option.$isLabel">
                  {{ props.option.$groupLabel }}
                </span>
                <div v-else>
                  <div
                    v-if="
                      props.option.type == 'Joueurs' ||
                      props.option.type == 'Insider'
                    "
                    class="searchWrap"
                  >
                    <img
                      loading="lazy"
                      class="option__image navImg roudImg"
                      :src="props.option.img"
                      alt="player"
                    />
                    <div class="option__desc">
                      <span class="option__title">
                        {{ props.option.searchName }}
                      </span>
                    </div>
                  </div>
                  <div v-if="props.option.type == 'Forum'" class="searchWrap">
                    <img
                      loading="lazy"
                      class="option__image navImg invertOk"
                      src="~assets/images/question-mark-9.png"
                      alt="forum"
                    />
                    <div class="option__desc">
                      <span class="option__title">
                        {{ props.option.searchName }}
                      </span>
                    </div>
                  </div>
                  <div v-if="props.option.type == 'News'" class="searchWrap">
                    <img
                      v-if="props.option.img == 'video'"
                      class="option__image navImg babsImg"
                      src="~assets/images/teams/soccervideo.png"
                      alt="videos"
                    />
                    <img
                      v-else-if="props.option.img"
                      class="option__image navImg babsImg"
                      :src="props.option.img"
                      alt="news"
                    />
                    <img
                      loading="lazy"
                      v-else
                      class="option__image navImg"
                      src="~assets/images/teams/rumour.png"
                      alt="news"
                    />
                    <div class="option__desc">
                      <span class="option__title">
                        {{ props.option.searchName }}
                      </span>
                    </div>
                  </div>
                  <div v-if="props.option.type == 'Equipe'" class="searchWrap">
                    <img
                      loading="lazy"
                      class="option__image navImg"
                      :src="props.option.img"
                      alt="babble"
                    />
                    <div class="option__desc">
                      <span class="option__title">{{ props.option.name }}</span>
                    </div>
                  </div>
                </div>
              </template>

              <span slot="noResult">
                {{
                  langSelected == "EN"
                    ? "no result"
                    : "pas de résultats correspondants "
                }}</span
              >
            </multiselect>
          </div>
        </div>
      </header>
    </headroom>
    <b-notification
      v-if="iosNotif"
      class="instalIphone"
      has-icon
      aria-close-label="Close notification"
    >
      <div class="notifWrapper">
        <div>
          <img
            loading="lazy"
            class="addiphone"
            src="~assets/images/addtohome.png"
            alt="add"
          />
        </div>
        <div class="instalText">
          <span>
            {{ langSelected == "EN" ? "install" : "installe" }}&nbsp
            <strong class="has-text-contest">footfoot</strong>&nbsp{{
              langSelected == "EN" ? "on your Iphone" : "sur ton Iphone"
            }}.
          </span>
          <span>
            {{ langSelected == "EN" ? "click on" : "clique sur" }}
            <img
              loading="lazy"
              class="actioniphone"
              src="~assets/images/actionIphone.png"
              alt="add"
            />
          </span>
          <span>
            {{ langSelected == "EN" ? "then" : "puis" }}&nbsp
            <strong>{{
              langSelected == "EN"
                ? "add to home screen"
                : "Ajouter à l'écran d'accueil"
            }}</strong
            >.
          </span>
        </div>
      </div>
    </b-notification>
    <nav
      class="mobile-bottom-nav"
      :class="{
        maskBottomnav: maskBottomnav && $route.path.includes('/chat/'),
      }"
    >
      <div class="mobile-bottom-nav__item">
        <nuxt-link :to="`/contest`">
          <div class="mobile-bottom-nav__item-content">
            <img
              loading="lazy"
              class="logo pointer"
              src="~assets/images/coupe.png"
              alt="contest"
            />

            <span :class="{ linkActive: $route.path.includes('contest') }"
              >contest</span
            >
          </div>
        </nuxt-link>
      </div>
      <div class="mobile-bottom-nav__item">
        <nuxt-link :to="`/mypage/all`">
          <div
            @click="setBabbleTodisplaytoNull"
            class="mobile-bottom-nav__item-content"
          >
            <img
              loading="lazy"
              class="logo pointer"
              src="~assets/images/teams/rumour.png"
              alt="news"
            />

            <span
              :class="{
                linkActive:
                  ($route.path.includes('mypage') || $route.path == '/') &&
                  !babbleTodisplay,
              }"
              >news</span
            >
          </div>
        </nuxt-link>
      </div>
      <div class="mobile-bottom-nav__item">
        <nuxt-link :to="`/leagues`">
          <div class="mobile-bottom-nav__item-content">
            <img
              loading="lazy"
              class="logo pointer"
              src="~assets/images/podium2.png"
              alt="classement"
            />

            <span :class="{ linkActive: $route.path.includes('/leagues') }">{{
              langSelected == "EN" ? "result." : "class./result."
            }}</span>
          </div>
        </nuxt-link>
      </div>

      <div
        @click="getFavoriteTeam"
        v-if="
          !connectedUser ||
          (connectedUser && connectedUser._id && !connectedUser.fanTeam)
        "
        class="mobile-bottom-nav__item"
      >
        <div class="mobile-bottom-nav__item-content">
          <img
            loading="lazy"
            class="logo pointer"
            src="~assets/images/question-mark-4.png"
            alt="question"
          />

          <span>{{ langSelected == "EN" ? "my team" : "mon club" }}</span>
        </div>
      </div>
      <div v-else class="mobile-bottom-nav__item">
        <nuxt-link :to="`/teams/${connectedUser.fanTeam.shortName}`">
          <div
            @click="setBabbleTodisplaytoNull"
            class="mobile-bottom-nav__item-content"
          >
            <img
              loading="lazy"
              class="logo pointer"
              :src="connectedUser.fanTeam.teamImg"
              :class="{
                invertOk: connectedUser.fanTeam.name
                  .toUpperCase()
                  .includes('JUVE'),
              }"
              alt="logoClub"
            />
            <span
              :class="{
                linkActive:
                  $route.path.includes(connectedUser.fanTeam.shortName) &&
                  !babbleTodisplay,
              }"
            >
              {{ langSelected == "EN" ? "my team" : "mon club" }}</span
            >
          </div>
        </nuxt-link>
      </div>
    </nav>
  </div>
</template>

<script>
import { searchAll } from "@/server/apiSearch";
import Multiselect from "vue-multiselect";
import { headroom } from "vue-headroom";
export default {
  name: "NavBar",
  data() {
    return {
      name: "",
      selected: null,
      isLoading: false,
      data: [],
      options: [],
      selectLabel: "",
      isCheck: false,
      searchActivate: false,
      iosNotif: false,
    };
  },
  props: {},
  components: {
    Multiselect,
    headroom,
  },
  computed: {
    maskBottomnav() {
      return this.$store.state.var.maskBottomnav;
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
    babbleTodisplay() {
      return this.$store.state.var.babbleTodisplay;
    },
  },
  methods: {
    changeLang(lang) {
      this.$store.commit("var/setNewLang", lang);
    },
    setBabbleTodisplaytoNull() {
      this.$store.commit("var/setbabbaleTodisplay", "");
    },
    backToPrevious() {
      if (this.babbleTodisplay) {
        this.$store.commit("var/setbabbaleTodisplay", "");
      } else {
        if (this.$route.path === "*") {
          this.$router.push(`/contest`);
        } else {
          this.$router.back();
        }
      }
    },

    searchActivation() {
      this.searchActivate = !this.searchActivate;
    },
    goToChat() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        this.$router.push(`/chat`);
      } else {
        this.$router.push(`/signup`);
      }
    },
    convertImg(ImageURL) {
      let block = ImageURL.split(";");
      let realData = block[1].split(",")[1];

      while (realData.length % 4 > 0) {
        realData += "=";
      }
      let output = `data:image/png;base64,${realData}`;
      return output;
    },

    asyncFind(query) {
      this.isLoading = true;
      this.options = [];

      if (query[1]) {
        if (query[0] == "@") {
          searchAll(query.substr(1).toLowerCase()).then((resp) => {
            this.isLoading = false;

            let optionTeam = {};
            let optionInsider = {};
            let optionForum = {};
            let optionBabble = {};
            let optionPlayer = {};

            if (resp.users.length > 0) {
              optionInsider.type = "Insider";
              optionInsider.detail = resp.users.map((u) => {
                return {
                  searchName: "@" + u.username,
                  shortName: u._id,
                  type: "Insider",
                  img: u.picProfile ? u.picProfile : u.initalPicture,
                };
              });

              this.options = [optionTeam].concat(
                [optionPlayer].concat(
                  [optionBabble].concat([optionForum].concat([optionInsider]))
                )
              );
            }
          });
        } else {
          searchAll(query.toLowerCase()).then((resp) => {
            let optionTeam = {};
            let optionInsider = {};
            let optionForum = {};
            let optionBabble = {};
            let optionPlayer = {};
            this.isLoading = false;
            if (resp.teams.length > 0) {
              optionTeam.type = this.langSelected == "EN" ? "Team" : "Equipe";
              optionTeam.detail = resp.teams.map((t) => {
                return {
                  name: t.name,
                  searchName: t.searchName ? t.searchName : t.name,
                  shortName: t.shortName,
                  type: "Equipe",
                  img:
                    t.teamImg && t.teamImg.includes("data:image/jpeg")
                      ? t.teamImg.replace("data:image/jpeg;", "data:image/png;")
                      : t.teamImg,
                };
              });
            }
            if (resp.users.length > 0) {
              optionInsider.type = "Insider";
              optionInsider.detail = resp.users.map((u) => {
                return {
                  searchName: "@" + u.username,
                  shortName: u._id,
                  type: "Insider",

                  img: u.picProfile
                    ? u.picProfile
                    : `~/assets/images/${u.initalPicture}.png`,
                };
              });
            }
            if (resp.forums.length > 0) {
              optionForum.type = "Forum";
              optionForum.detail = resp.forums.map((forum) => {
                return {
                  searchName: forum.title,
                  shortName:
                    forum._id +
                    "/" +
                    forum.title
                      .replace(" ?", "")
                      .split(" ")
                      .join("-")
                      .replace(/\s/g, ""),
                  type: "Forum",
                };
              });
            }
            if (resp.babbles.length > 0) {
              optionBabble.type = "News";
              optionBabble.detail = resp.babbles.map((babble) => {
                return {
                  searchName: babble.title ? babble.title : babble.babble,
                  shortName: babble._id,
                  type: "News",
                  img:
                    babble.babbleImg &&
                    babble.babbleImg.includes("data:image/jpeg")
                      ? babble.babbleImg.replace(
                          "data:image/jpeg;",
                          "data:image/png;"
                        )
                      : babble.babbleImg
                      ? babble.babbleImg
                      : babble.babbleVideo
                      ? "video"
                      : "",
                };
              });
            }
            if (resp.players.length > 0) {
              optionPlayer.type =
                this.langSelected == "EN" ? "Players" : "Joueurs";
              optionPlayer.detail = resp.players.map((p) => {
                return {
                  searchName: p.display_name ? p.display_name : p.name,
                  shortName: p.id_sportmonks,
                  type: "Joueurs",
                  img: p.picture,
                };
              });
            }
            this.isLoading = false;
            this.options = [optionTeam].concat(
              [optionPlayer].concat(
                [optionBabble].concat([optionForum].concat([optionInsider]))
              )
            );
          });
        }
      } else {
        this.isLoading = false;
        this.options = [];
      }
    },
    closeMulti() {
      this.isLoading = false;
      this.data = [];
      this.options = [];
    },
    customLabel({ searchName, shortName, name, type }) {
      if (searchName) {
        if (type == "Equipe") {
          return `${name} – ${searchName} - ${shortName}`;
        } else {
          return searchName;
        }
      } else {
        return [];
      }
    },

    onSelect(team) {
      if (team) {
        this.selected = team;
        if (this.selected.type === "Insider") {
          this.$router.push("/dashboard/" + team.shortName);
        } else if (this.selected.type === "Equipe") {
          this.$router.push("/teams/" + team.shortName.toLowerCase());
        } else if (this.selected.type === "Joueurs") {
          this.$router.push(
            "/player/" +
              team.searchName.replace(/\s/g, "-").toLowerCase() +
              "/" +
              team.shortName
          );
        } else if (this.selected.type === "News") {
          this.$router.push("/news/babble/" + team.shortName.toLowerCase());
        } else {
          this.$router.push("/forum/" + team.shortName);
        }
      }
    },
    getFavoriteTeam() {
      if (this.connectedUser && this.connectedUser._id) {
        this.$emit("getFavoriteTeam");
      } else {
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    if (process.client) {
      let isIos = () => {
        let userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
      };
      ////Detects if device is in standalone mode
      let isInStandaloneMode = () =>
        "standalone" in window.navigator && window.navigator.standalone;

      ////Checks if should display install popup notification:
      if (isIos() && !isInStandaloneMode()) {
        this.iosNotif = true;
      }
    }
  },
  watch: {
    $route() {
      this.$auth.fetchUser();
      this.options = [];
      this.name = "";
      this.selected = null;
      this.$store.commit("var/maskBottomnav", false);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
svg {
  width: auto;
  height: 40px;
  fill: #ff7d00;
}
.is-success {
  margin: 0 10px;
}
.alignCenter {
  display: flex;
  align-items: center;
}
.flag-img {
  width: 45px;
  height: 45px;
  padding: 5px;
  cursor: pointer;
}
.mdi-telegram {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mdi-telegram::before {
  font-size: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
}
.mdi-magnify {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #192b41;
}
.mdi-magnify::before {
  font-size: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
}
.fa-search {
  height: 35px;
  display: flex;
  align-items: center;
}
.fa-search:before {
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
}
.notifWrapper {
  display: FLEX;
  align-items: CENTER;
}
.instalIphone {
  box-shadow: 0 -2px 5px -2px #192b41;
  position: fixed;
  width: 100%;
  bottom: 3rem;
  padding: 0;
  margin: 0 !important;
  background-color: #eef1f7;
}
.instalText {
  display: flex;
  flex-direction: column;
}
.addiphone {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}
.actioniphone {
  width: 25px;
  height: 25px;
  margin-left: 5px;
}
.instalText > span {
  display: flex;
  align-items: center;
}
.searchWrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 95vw !important;
  overflow-x: scroll;
}
.option__title {
  overflow-x: scroll;
  max-width: 90% !important;
}
.navImg {
  width: auto;
  height: 30px;
  margin-right: 5px;
}
.babsImg {
  border-radius: 5px;
}
.roudImg {
  border-radius: 50%;
}
header {
  width: 100%;
}
.ultraWrapper {
  width: 100vw;
  z-index: 10000000;
  position: absolute;
}
.navbarMainWrapp {
  max-width: 100vw !important;
  height: 3rem !important;
  display: FLEX;
  justify-content: CENTER;
  align-items: CENTER;
  background-color: transparent !important;
  position: fixed;
  width: 100%;
  text-align: center;
}
.logo {
  height: 25px;
  width: 25px;
  align-self: center;
  vertical-align: middle;
}
.mobile-bottom-nav {
  max-width: 100vw !important;
  padding: 0rem;
  position: fixed;
  top: auto;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  will-change: transform;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  display: flex;
  height: 50px;
  box-shadow: 0 -2px 5px -2px #192b41;
  background-color: #fff;
  flex-direction: row;
}
.mobile-bottom-nav__item {
  width: 25%;
  display: flex;
  justify-content: center;
}
.mobile-bottom-nav__item-content {
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.mobile-bottom-nav__item-content > span {
  text-align: CENTER;
  font-size: 0.7rem;
  color: darkgrey;
}
.linkActive {
  color: #192b41 !important;
  font-weight: bold !important;
}
.top2 {
  display: flex;
  justify-content: space-between;
  display: flex;
  -webkit-box-align: stretch;
  align-items: stretch;
  position: relative;
  padding: 0px;
  margin-left: 0rem;
}
.top2 > div {
  display: flex;
  align-self: center;
}

.logoInsiders {
  height: 2rem;
  vertical-align: middle;
  width: auto;
}
.logo {
  vertical-align: middle;
  width: auto;
}
.navWrapper {
  display: flex;
  justify-content: space-between;
  margin: 0px;
}
.navEnd {
  display: flex;
  width: 30%;
  justify-content: FLEX-END;
}
.nav-profile {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.is-40x40 {
  height: 40px;
  width: 40px;
  margin-right: 5px;
}
.displayFlex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 50%;
}
.fa {
  color: #192b41;
  font-size: 1.9rem !important;
  align-self: center;
}

.fa-arrow-left {
  width: 9%;
}
.control {
  width: 90%;
  margin-right: 5px;
}
@media screen and (max-width: 361px) {
  .logoInsiders {
    height: 1.75rem;
    vertical-align: middle;
    width: auto;
  }
}
</style>