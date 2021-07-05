<template>
  <div id="app">
    <div v-if="$route.path.includes('loaderio')">
      <test-loaderio></test-loaderio>
    </div>
    <div v-if="$route.path == '/'">
      <landing-contest></landing-contest>
    </div>
    <div @click="sayOnline" v-else>
      <nav-wrapper></nav-wrapper>

      <div
        v-if="
          ((unredContestpost && unredContestpost.length > 0) ||
            (insiderWantsTotalk && insiderWantsTotalk.length > 0)) &&
          !$nuxt.isOffline
        "
      >
        <div
          @click="retrieveContestmess(unredContestpost[0])"
          v-if="
            unredContestpost &&
            unredContestpost.length > 0 &&
            !this.$route.path.includes('chat/') &&
            !this.$route.path.includes('contest/')
          "
          class="wrapNewmesscontest"
        >
          <nuxt-link
            class="justifyCenter"
            :to="`/contest/${unredContestpost[0]}/message`"
          >
            <div class="shadow"></div>
            <div class="icon-container">
              <div class="icon-inner">
                <div class="iconmess">
                  <img
                    loading="lazy"
                    class="coupeLogo"
                    src="~assets/images/coupe.png"
                    alt="contest"
                  />
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
        <div
          v-if="
            insiderWantsTotalk &&
            insiderWantsTotalk.length > 0 &&
            !this.$route.path.includes('chat')
          "
          class="wrapNewmesscontest"
          :class="{
            wrapNewmess:
              unredContestpost &&
              unredContestpost.length > 0 &&
              !this.$route.path.includes('chat/') &&
              !this.$route.path.includes('contest/'),
          }"
        >
          <nuxt-link class="justifyCenter" to="/chat">
            <div class="shadow"></div>
            <div class="icon-container">
              <div class="icon-inner">
                <div class="iconmess">
                  <svg
                    class="stayWhite"
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
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div v-if="$nuxt.isOffline" class="notices is-bottom">
        <div role="alert" class="toast is-danger is-bottom" style="">
          <div>
            {{
              langSelected == "EN" ? "no internet" : "pas de connexion internet"
            }}
          </div>
        </div>
      </div>

      <section
        class="main"
        :class="{
          removePadding: maskBottomnav && $route.path.includes('/chat/'),
        }"
      >
        <transition
          v-if="!videoIsopen && !wherebyRoomUrl"
          name="page"
          mode="out-in"
          :class="{ notactiveTransition: firstRender === true }"
        >
          <Nuxt class="wrapper" />
        </transition>

        <!--       <div
          v-if="
            insiderWantsTotalk && insiderWantsTotalk.length > 0 && !chatActivate
          "
          class="displayFlex wantsTotalkWrap"
        >
          <div
            class="talkingSollicitationWrap"
            v-for="(user, index) in insiderWantsTotalk"
            :key="index"
          >
            <button class="button talkingSollicitation">
               <img
                @click="openChat(user)"
                class="is-12x12"
                src="~assets/images/online.png"
                alt="online"
              />&nbsp
              <span @click="openChat(user)"
                >@{{ user.username }}&nbsp&nbsp</span
              >
              <button
                type="button"
                name="delete"
                class="delete is-warning"
                @click="removeinsiderWantsTotalk(user)"
              ></button>
            </button>
          </div>
        </div>
        -->
        <incoming-call
          v-if="
            modalProposecall && (insiderwantAcall || (iMakecall && userTocall))
          "
          :insiderwantAcall="insiderwantAcall"
          :iMakecall="iMakecall"
          :userTocall="userTocall"
          class="incomingCall"
        ></incoming-call>
        <div v-if="wherebyRoomUrl && userTocall" class="video">
          <header class="modal-card-head displayFlex">
            <div class="videoInfo">
              <div class="displayFlex">
                <img
                  loading="lazy"
                  class="imgProfile image is-36x36 is-circle"
                  :src="userTocall.picProfile"
                  alt="profile"
                />

                <span class="nameCall">{{ userTocall.username }}</span>
              </div>
              <img
                @click="closeVideo"
                loading="lazy"
                class="declineCall pointer"
                src="~assets/images/phone-hangup.svg"
                alt="decline"
              />
            </div>
          </header>
          <div class="video__partner box boxDaily">
            <!-- WHEREBY
            <iframe
              loading="lazy"
              id="remoteVideo"
              class="video__spinner"
              :src="`${wherebyRoomUrl}?video=on&audio=on&screenshare=on&chat=off&background=off&floatSelf&lang=fr`"
              allow="camera; microphone; fullscreen; speaker; display-capture"
            ></iframe>
             -->

            <!--DAILY.CO-->
            <iframe
              allow="microphone; camera; autoplay;fullscreen;speaker; display-capture"
              :src="`${wherebyRoomUrl}`"
              class="video__spinner"
              loading="lazy"
              id="remoteVideo"
            ></iframe>
          </div>
        </div>
        <div v-if="videoIsopen && userTocall" class="video">
          <header class="modal-card-head displayFlex">
            <div class="videoInfo">
              <div class="displayFlex">
                <img
                  loading="lazy"
                  class="imgProfile image is-36x36 is-circle"
                  :src="userTocall.picProfile"
                  alt="profile"
                />

                <span class="nameCall">{{ userTocall.username }}</span>
              </div>
              <i @click="closeVideo" class="pointer fas fa-video-slash"></i>
            </div>
          </header>
          <div class="video__partner box">
            <video
              :src="remoteVideo"
              id="remoteVideo"
              class="video__spinner"
              controls
              autoplay
              playsinline
            ></video>
          </div>
          <video
            :src="myVideo"
            id="myVideo"
            class="video__myself"
            controls
            autoplay
            playsinline
            muted
          ></video>
        </div>
      </section>

      <b-modal :active.sync="isForgetModalActive" :width="640">
        <forget-password-modal></forget-password-modal>
      </b-modal>

      <b-modal
        :active.sync="selectClubModal"
        class="selectClubModal"
        :width="640"
      >
        <header class="modal-card-head">
          <p class="titleMessage">
            {{
              langSelected == "EN" ? "choose your team" : "choisis ton camp !"
            }}
          </p>
        </header>
        <section class="modal-card-body">
          <div class="media">
            <p v-if="langSelected == 'EN'">
              In order for you to fully enjoy the features
              of<strong>footfoot</strong>,we need to know your<strong
                >favorite team.</strong
              >
            </p>
            <p v-else>
              Afin de te faire profiter pleinement des fonctionnalités de
              <strong>footfoot</strong>, nous avons besoin de connaitre ton
              <strong>club de coeur.</strong>
            </p>

            <b-field
              :label="`
                      ${
                        langSelected == 'EN'
                          ? 'i support:'
                          : 'je suis supporter de :'
                      }`"
            >
              <multiselect
                :custom-label="customLabel"
                v-model="favoriteTeam"
                :placeholder="`
                      ${langSelected == 'EN' ? 'my team' : 'mon club'}`"
                :loading="loading"
                :options="options"
                :close-on-select="true"
                @search-change="asyncFind"
                @close="closeMulti()"
                :showNoOptions="false"
                track-by="name"
                label="name"
              >
                <template slot="option" slot-scope="props">
                  <div>
                    <div class="searchWrap">
                      <img
                        loading="lazy"
                        class="option__image navImg"
                        :src="props.option.teamImg"
                        alt="team"
                      />
                      <div class="option__desc">
                        <span class="option__title">{{
                          props.option.name
                        }}</span>
                      </div>
                    </div>
                  </div>
                </template>

                <span slot="noResult">
                  {{
                    langSelected == "EN"
                      ? "no result"
                      : "Pas de résultats correspondants !"
                  }}
                </span>
              </multiselect>
            </b-field>
            <div class="fullWidthCenter">
              <img
                v-if="favoriteTeam"
                loading="lazy"
                :src="favoriteTeam.teamImg"
                :class="{
                  invertOk: favoriteTeam.name.toUpperCase().includes('JUVE'),
                }"
                alt="team"
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <p class="control">
            <button @click="saveMyTeam" class="button is-success checkOut">
              Ok
            </button>
          </p>
        </footer>
      </b-modal>
      <b-modal :active.sync="aboInfo" class="selectClubModal" :width="640">
        <header class="modal-card-head">
          <p class="titleMessage">
            {{ langSelected == "EN" ? "subscribe !" : "abonne toi !" }}
          </p>
        </header>
        <section class="modal-card-body">
          <div class="media">
            <div class="displayFlex aboInfoWrap">
              <span>{{ langSelected == "EN" ? "On" : "Sur" }}&nbsp</span>

              <strong class="has-text-contest">footfoot</strong>
              <span
                >,
                {{
                  langSelected == "EN"
                    ? "you pick your news"
                    : "tu choisis tes news"
                }}</span
              >
              <sup>
                <img
                  loading="lazy"
                  class="option__image navImg"
                  src="~assets/images/teams/rumour.png"
                  alt="news"
                />
              </sup>
            </div>
            <br />
            <div class="displayFlex aboInfoWrap">
              <span
                >{{
                  langSelected == "EN"
                    ? "You choose who you subscribe to by clicking on"
                    : "Tu choisis à qui tu t'abonnes en cliquant sur"
                }}
              </span>
              <sup>
                <img
                  loading="lazy"
                  class="option__image navImg"
                  src="~assets/images/stay.png"
                  alt="abo"
                />
              </sup>
            </div>
            <br />
            <div class="displayFlex aboInfoWrap">
              <span>
                {{
                  langSelected == "EN"
                    ? "You can unsubscribe by clicking on"
                    : "Tu te désabonnes en cliquant sur"
                }}
              </span>
              <sup>
                <img
                  loading="lazy"
                  class="option__image navImg"
                  src="~assets/images/leave.png"
                  alt="desabo"
                />
              </sup>
            </div>
          </div>
          <br />
          <strong>
            {{
              langSelected == "EN"
                ? "By default, we have subscribed you to:"
                : "Par défaut, nous t'avons abonné à :"
            }}
          </strong>
          <div class="firstAboWrap" v-if="firstAbos && firstAbos.length > 0">
            <div v-for="(firstAbo, index) in firstAbos" :key="index">
              <div class="image is-circle">
                <img
                  loading="lazy"
                  class="imgProfile aboPic"
                  :src="firstAbo.picProfile"
                  alt="Image"
                />

                <!--  <span class="has-text-contest is-italic is-size-7"
                  >@{{ firstAbo.username }}</span
                > -->
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <p class="control">
            <button @click="goAbo" class="button is-success checkOut">
              Ok
            </button>
          </p>
        </footer>
      </b-modal>
      <b-modal
        :active.sync="contestInfoModal"
        class="selectClubModal"
        :width="640"
      >
        <header class="modal-card-head">
          <p class="titleMessage">
            {{
              langSelected == "EN"
                ? "take your first pick"
                : "prend ton premier prono"
            }}
          </p>
        </header>
        <section class="modal-card-body">
          <div class="media explanationContest">
            <div class="displayFlex">
              <p>
                {{ langSelected == "EN" ? "on" : "sur" }}

                <strong>footfoot</strong>,
                {{
                  langSelected == "EN"
                    ? "on footfoot you can participate in prediction"
                    : "tu peux participer à des"
                }}
                <strong class="has-text-contest">contests</strong>
                {{ langSelected == "EN" ? "" : "de pronos" }}
              </p>
              <img
                loading="lazy"
                class="option__image navImg"
                src="~assets/images/coupe.png"
                alt="coupe"
              />
            </div>

            <br />
            <div class="displayFlex">
              <p>
                {{
                  langSelected == "EN"
                    ? "create your own private"
                    : "cré ton propre"
                }}
                <strong class="has-text-contest">contest</strong>
                {{
                  langSelected == "EN"
                    ? "to choose your matches and invite your friends"
                    : "privé, pour choisir tes matchs et inviter tes amis"
                }}
              </p>
            </div>
            <div class="displayFlex">
              <p>
                {{
                  langSelected == "EN"
                    ? "you can even set up a prize fund for the winners"
                    : "tu peux même constituer une cagnotte pour les vainqueurs"
                }}
              </p>
              <img
                loading="lazy"
                class="option__image navImg"
                src="~assets/images/contestMainCagnotte.png"
                alt="cagnotte"
              />
            </div>
            <br />
            <div class="displayFlex">
              <p>
                {{
                  langSelected == "EN"
                    ? "to introduce you to the game, you are invited to the public"
                    : "pour te faire découvrir le jeu, tu es invité au"
                }}
                <strong class="has-text-contest">contest</strong>
                {{ langSelected == "EN" ? "" : "public" }}
              </p>
            </div>
            <div class="displayFlex">
              <p>
                {{
                  langSelected == "EN"
                    ? "you can already make your predictions and measure yourself against the community ⚽⚽⚽"
                    : "tu peux d'ors et déjà faire tes pronos et te mesurer à la communauté ⚽⚽⚽"
                }}
              </p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <p class="control">
            <button @click="goContest" class="button is-success checkOut">
              {{
                langSelected == "EN" ? "Go to the contest" : "Allez au contest"
              }}
            </button>
          </p>
        </footer>
      </b-modal>
    </div>

    <div>
      <b-loading
        :is-full-page="true"
        :active.sync="isLoading"
        :canCancel="false"
      ></b-loading>
    </div>

    <div v-if="chatActivate" class="chatDesktop" :width="640">
      <chat-page></chat-page>
    </div>
    <b-modal :active.sync="onbordingActive" class="chatModalWrap" :width="640">
      <onboarding-unconnect></onboarding-unconnect>
    </b-modal>
    <!-- SOUNDS -->
    <audio id="endCallSignal" preload="auto">
      <source src="/sound/end_of_call.mp3" type="audio/mp3" />
    </audio>

    <audio id="callingSignal" loop preload="auto">
      <source src="/sound/calling.mp3" type="audio/mp3" />
    </audio>

    <audio id="ringtoneSignal" loop preload="auto">
      <source src="/sound/ringtone.mp3" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
let servers = {
  configuration: {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  },
  iceServers: [
    { url: "stun:stun.l.google.com:19302" },
    { url: "stun:stun1.l.google.com:19302" },
    { url: "stun:stun2.l.google.com:19302" },
    { url: "stun:stun3.l.google.com:19302" },
    { url: "stun:stun4.l.google.com:19302" },
    { url: "stun:stunserver.org" },
    { url: "stun:stun.services.mozilla.com" },
    { url: "stun:stun.skyway.io:3478" },
    { url: "stun:stun.stunprotocol.org" },
    { url: "stun:stun01.sipphone.com" },
    { url: "stun:stun.ekiga.net" },
    { url: "stun:stun.fwdnet.net" },
    { url: "stun:stun.ideasip.com" },
    { url: "stun:stun.iptel.org" },
    { url: "stun:stun.rixtelecom.se" },
    { url: "stun:stun.schlund.de" },
    { url: "stun:stun.softjoys.com" },
    { url: "stun:stun.voiparound.com" },
    { url: "stun:stun.voipbuster.com" },
    { url: "stun:stun.voipstunt.com" },
    { url: "stun:stun.voxgratia.org" },
    { url: "stun:stun.xten.com" },
    {
      url: "turn:numb.viagenie.ca",
      credential: "muazkh",
      username: "webrtc@live.com",
    },
    {
      url: "turn:192.158.29.39:3478?transport=udp",
      credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      username: "28224511:1379330808",
    },
    {
      url: "turn:192.158.29.39:3478?transport=tcp",
      credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      username: "28224511:1379330808",
    },
  ],
};
import cookies from "js-cookie";
import axios from "axios";
import moment from "moment";
import Multiselect from "vue-multiselect";
import {
  getInsiderCurrentInsights,
  userUpdateFirst,
  userOffline,
} from "@/server/apiDashboard";

import {
  getUser,
  getRounds,
  getMatchInplay,
  getWatchInsight,
  getWhereBy,
  deleteWhereBy,
  getDailyco,
  deleteDailyco,
} from "@/server/api";

import {
  takeAbet,
  getUnReadPrivatePostForUser,
  getUsersforchat,
  putallPrivatechatsToreadbyUser,
  getAllprivatechatbetweenUsers,
  getAllunreadprivatechatbyuser,
  getBetforunconnect,
  getAllMyContests,
} from "@/server/apiContest";
import { searchTeam } from "@/server/apiSearch";
export default {
  transition: "default",
  head() {
    return {
      htmlAttrs: {
        lang: this.langSelected ? this.langSelected.toLowerCase() : "fr",
      },
    };
  },
  sockets: {
    connect() {},
  },
  async asyncData({ store }) {
    if (store.state.auth.user && store.state.auth.user.darkTheme) {
      store.commit("var/dark", true);
    }
  },
  components: {
    IncomingCall: () => import("@/components/side-component/IncomingCall"),
    LandingContest: () => import("@/components/LandingContest"),
    TestLoaderio: () => import("@/components/TestLoaderio"),
    NavWrapper: () => import("@/components/NavWrapper"),
    LoginPage: () => import("@/components/auth/LoginPage"),
    SignupPage: () => import("@/components/auth/SignupPage"),
    ForgetPasswordModal: () => import("@/components/auth/ForgetPasswordModal"),
    Multiselect,
    chatPage: () => import("@/components/contest/chatPage"),
    onboardingUnconnect: () => import("@/components/modal/onboardingUnconnect"),
  },

  metaInfo: {
    noscript: [
      {
        innerHTML: "This website requires JavaScript.",
      },
    ],
    title: "footfoot.co", ////set a title
  },

  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      firstRender: true,
      teamList: "",
      favoriteTeam: "",
      favTeamSN: "",
      loading: false,
      options: [],
      fanTeam: "",
      isLoading: false,
      isFullPage: true,
      isSignupModalActive: false,
      isLoginModalActive: false,
      isForgetModalActive: false,
      autenticate: "",
      isRetina: false,
      contest: [],
      selectClubModal: false,
      socketNames: [],
      aboInfo: false,
      firstAbos: "",
      contestInfoModal: false,
      roundsSubscribe: "",
      chatActivate: false,
      onbordingActive: false,
      insidersTospeak: [],
      unredContestpost: [],
      insiderwantAcall: "",
      modalProposecall: false,
      localConnection: "",
      videoStream: "",
      remoteStream: "",
      myVideo: {},
      remoteVideo: {},
      constraints: {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
        },
        video: true,
      },
      videoIsopen: false,
      userTocall: "",
      iMakecall: false,
      wherebyRoomUrl: "",
      roomNameforDelete: "",
    };
  },

  watch: {
    $route() {
      if (!this.$nuxt.isOffline) {
        if (this.$auth.user && this.$auth.user._id) {
          axios.defaults.headers.common["Authorization"] =
            cookies.get("auth._token.local");
          this.onbordingActive = false;
          this.$store.commit("var/firstBet", "");
          this.$store.commit("var/setNewLang", this.$auth.user.lang);
        } else if (
          this.firstBet &&
          this.$route.path &&
          !this.$route.path.includes("login") &&
          !this.$route.path.includes("signup") &&
          !this.$route.path.includes("resetpassword") &&
          !this.$route.path.includes("inscription") &&
          !this.$route.path.includes("unsubscribe") &&
          !this.$route.path.includes("contest") &&
          this.onbordingActive == false
        ) {
          setTimeout(() => {
            this.onbordingActive = true;
          }, 100);
        } else {
          this.onbordingActive = false;
        }

        this.$auth.fetchUser();

        setTimeout(() => {
          this.$store.commit("var/setbabbaleTodisplay", "");
        }, 10);
        getMatchInplay().then((matches) => {
          this.$store.commit("var/matches", matches);
        });

        if (this.$auth.user && this.$auth.user._id) {
          getAllunreadprivatechatbyuser(this.$auth.user._id).then((resp) => {
            if (resp && resp.length > 0) {
              this.$store.commit("var/insiderWantsTotalk", resp);
            } else {
              this.$store.commit("var/insiderWantsTotalk", []);
            }
          });

          getRounds().then((round) => {
            if (round == "err") {
              location.reload();
            }
            this.roundsSubscribe = round;
            let rId = this.roundsSubscribe.map((s) => s._id);
            this.unredContestpost = [];
            for (let i = 0; i < rId.length; i++) {
              getUnReadPrivatePostForUser(rId[i]).then((numberMess) => {
                if (numberMess > 0) {
                  let postunreadTopush = rId[i];
                  this.unredContestpost.push(postunreadTopush);
                }
              });
            }
          });
          getUsersforchat().then((insidersTospeak) => {
            if (
              insidersTospeak &&
              insidersTospeak.conversations &&
              insidersTospeak.conversations.length > 0
            ) {
              this.insidersTospeak = insidersTospeak.conversations;
              this.$store.commit(
                "var/setInsidersTospeak",
                this.insidersTospeak
              );
            }
          });
        }
        if (
          (this.$auth.user && this.$auth.user._id) ||
          (this.$route.path &&
            (this.$route.path.includes("login") ||
              this.$route.path.includes("contest") ||
              this.$route.path.includes("signup") ||
              this.$route.path.includes("reset")))
        ) {
          this.onbordingActive = false;
        }

        if (
          this.$store.state.auth.user &&
          this.$store.state.auth.user._id &&
          !this.$store.state.auth.user.fanTeam &&
          this.$store.state.var.contestInscriptionId === "" &&
          !this.$route.path.includes("contest")
        ) {
          this.selectClubModal = true;
        }

        if (process.client) {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 1);
        }
      }
    },

    userTospeak: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.userTospeak) {
          this.isLoading = true;
          let users = `${this.userTospeak._id},${this.$auth.user._id}`;
          getUsersforchat().then((insidersTospeak) => {
            if (
              insidersTospeak &&
              insidersTospeak.conversations &&
              insidersTospeak.conversations.length > 0
            ) {
              this.insidersTospeak = insidersTospeak.conversations;
              this.$store.commit(
                "var/setInsidersTospeak",
                this.insidersTospeak
              );
            }
          });
          putallPrivatechatsToreadbyUser(users).then((resp) => {});
          getAllprivatechatbetweenUsers(users).then(
            (conversationWithinsider) => {
              let conversationWithinsiderTocommit =
                conversationWithinsider.sort(
                  (a, b) => new Date(a.created_at) - new Date(b.created_at)
                );
              this.$store.commit(
                "var/conversationWithinsider",
                conversationWithinsiderTocommit
              );
              this.isLoading = false;
              if (this.$mobileDetect.mobile()) {
                this.$router.push(`/chat/${this.userTospeak.username}`);
              } else {
                this.chatActivate = true;
              }
            }
          );
        }
      },
    },

    darkActive: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (process.client) {
          this.$auth.fetchUser();
          if (this.darkActive == true) {
            this.$store.commit("var/dark", true);
            document.documentElement.className =
              "font_sofia_pro_light_condensed_rg font_sofia_pro_light_condensed_rg_normal_normal darkSide";
          } else {
            this.$store.commit("var/dark", false);
            document.documentElement.className =
              "font_sofia_pro_light_condensed_rg font_sofia_pro_light_condensed_rg_normal_normal";
          }
        }
      },
    },
    watchInsight: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (
          process.client &&
          !this.$nuxt.isOffline &&
          this.$auth.user &&
          this.$auth.user._id
        ) {
          let query = {
            $and: [
              { cave: false },
              { status: { $in: ["active"] } },
              { user: this.$auth.user._id },
              ////  {"match.date": {$gte: new Date(moment().startOf("day").add(1, "days").format())}},
            ],
          };
          getInsiderCurrentInsights(query).then((matchList) => {
            if (matchList && matchList.length > 0) {
              let matchListtocommit = matchList.filter(
                (m) =>
                  m.match &&
                  m.match.status.toUpperCase() != "POSTP" &&
                  m.match.status.toUpperCase() != "CANCL" &&
                  m.match.status.toUpperCase() != "FT" &&
                  m.match.status.toUpperCase() != "AET" &&
                  m.match.status.toUpperCase() != "FT_PEN"
              );
              this.$store.commit("var/pronoEncours", matchListtocommit);
            }
          });
        }
      },
    },
    insiderwantAcall: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.insiderwantAcall && this.insiderwantAcall._id) {
          this.sockets.unsubscribe("callAnswer" + this.$auth.user._id);
          this.sockets.subscribe(
            "callAnswer" + this.$auth.user._id,
            (message) => {
              if (message.from == this.insiderwantAcall._id) {
                this.closeCallmodal();
              }
            }
          );
        }
      },
    },
    userTocall: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.userTocall && this.userTocall._id) {
          this.sockets.unsubscribe("callAnswer" + this.$auth.user._id);
          this.sockets.subscribe(
            "callAnswer" + this.$auth.user._id,
            (message) => {
              if (this.userTocall && this.userTocall._id) {
                if (message.from == this.userTocall._id && message.whereby) {
                  this.wherebyRoomUrl = message.whereby;
                  this.roomNameforDelete = message.roomNameforDelete;
                  this.modalProposecall = false;
                  let callingSignal = document.querySelector("#callingSignal");
                  callingSignal.pause();
                } else if (
                  message.from == this.userTocall._id &&
                  message.answser == true
                ) {
                  //this.callAccept();
                  this.callAcceptwhereBy();
                } else if (
                  message.from == this.userTocall._id &&
                  message.answser == false
                ) {
                  this.callRefuse();
                } else if (message.from == this.userTocall._id) {
                  this.closeCallmodal();
                }
              }
            }
          );
          this.sockets.unsubscribe("stream" + this.$auth.user._id);
          this.sockets.subscribe("stream" + this.$auth.user._id, (message) => {
            if (message.from == this.userTocall._id) {
              if (message.peerConn) {
                if (message.peerConn.type === "offer") {
                  this.localConnection = new RTCPeerConnection(servers);
                  this.localConnection.setRemoteDescription(
                    new RTCSessionDescription(message.peerConn)
                  );
                  // Receive stream from remote client and add to remote video area
                  // this.remoteVideo = new MediaStream();

                  this.videoIsopen = true;
                  setTimeout(() => {
                    this.remoteVideo = document.getElementById("remoteVideo");
                    this.remoteStream = new MediaStream();
                    this.localConnection.ontrack = (stream) => {
                      if (stream.streams && stream.streams[0]) {
                        this.remoteStream = stream.streams[0];
                        this.remoteVideo.srcObject = this.remoteStream;
                      }
                    };

                    if (navigator && navigator.mediaDevices) {
                      this.myVideo = document.getElementById("myVideo");

                      this.getUserMediaForreceiveCall(message);
                    }
                  }, 1);
                } else if (message.peerConn.type === "answer") {
                  this.localConnection.setRemoteDescription(
                    new RTCSessionDescription(message.peerConn)
                  );
                }
              } else if (message.type === "candidate" && message.id) {
                this.localConnection
                  .addIceCandidate(
                    new RTCIceCandidate({
                      candidate: message.candidate,
                      sdpMLineIndex: message.label,
                      sdpMid: message.id,
                    })
                  )
                  .catch((e) => {
                    console.log("Failure during addIceCandidate(): " + e.name);
                  });
              }
            }
          });
        }
      },
    },
  },

  computed: {
    conversationWithinsider() {
      return this.$store.state.var.conversationWithinsider;
    },
    insiderWantsTotalk() {
      return this.$store.state.var.insiderWantsTotalk;
    },
    matches() {
      return this.$store.state.var.matches;
    },
    newMessage() {
      return this.$store.state.var.newMessage;
    },
    watchInsight() {
      return this.$store.state.var.watchInsight;
    },
    isSafari() {
      return this.$store.state.var.isSafari;
    },
    maskBottomnav() {
      return this.$store.state.var.maskBottomnav;
    },
    pronoUnconnect() {
      return this.$store.state.var.pronoUnconnect;
    },
    firstBet() {
      return this.$store.state.var.firstBet;
    },
    darkActive() {
      return this.$store.state.var.darkTheme;
    },
    usersOnlinelist() {
      return this.$store.state.var.usersOnlinelist;
    },
    userTospeak() {
      return this.$store.state.var.userTospeak;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
    contestInscriptionId() {
      return this.$store.state.var.contestInscriptionId;
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
  },
  methods: {
    async getUserMediaForreceiveCall(message) {
      try {
        this.videoStream = new MediaStream();
        this.videoStream = await navigator.mediaDevices.getUserMedia(
          this.constraints
        );
        this.myVideo.srcObject = this.videoStream;

        this.videoStream
          .getTracks()
          .forEach((track) =>
            this.localConnection.addTrack(track, this.videoStream)
          );

        this.localConnection.createAnswer().then((answer) => {
          this.localConnection.setLocalDescription().then(() => {
            this.sendMessage({
              peerConn: this.localConnection.localDescription,
              to: this.userTocall._id,
              from: this.$auth.user._id,
            });
          });
        });
        // Send Candidtates to establish a channel communication to send stream and data

        this.localConnection.onicecandidate = (candidate) => {
          if (candidate && candidate.candidate) {
            this.sendMessage({
              type: "candidate",
              label: candidate.candidate.sdpMLineIndex,
              id: candidate.candidate.sdpMid,
              candidate: candidate.candidate.candidate,
              to: this.userTocall._id,
              from: this.$auth.user._id,
            });
          } else {
            //  console.log("End of candidates.");
          }
        };
      } catch (error) {}
    },
    async getUserMedia() {
      if (navigator && navigator.mediaDevices) {
        let dataEmit = {};
        dataEmit.to = this.userTocall._id;
        dataEmit.from = this.$auth.user;
        this.$socket.emit("proposeCall", dataEmit);

        this.localConnection = new RTCPeerConnection(servers);
        try {
          this.videoStream = new MediaStream();
          this.videoStream = await navigator.mediaDevices.getUserMedia(
            this.constraints
          );
          this.myVideo.srcObject = this.videoStream;
        } catch (error) {}
      }
    },
    callAcceptwhereBy() {},
    openVideoWhereBy() {
      if (this.insiderwantAcall) {
        this.declineCall();
      }
      setTimeout(() => {
        let dataEmit = {};
        dataEmit.to = this.userTocall._id;
        dataEmit.from = this.$auth.user;
        this.$socket.emit("proposeCall", dataEmit);
        this.iMakecall = true;
        this.modalProposecall = true;
        let callingSignal = document.querySelector("#callingSignal");
        callingSignal.play();
        let ringtoneSignal = document.querySelector("#ringtoneSignal");
        ringtoneSignal.pause();
      }, 1);
    },
    callAccept() {
      this.videoStream
        .getTracks()
        .forEach((track) =>
          this.localConnection.addTrack(track, this.videoStream)
        );

      this.localConnection.createOffer().then((offer) => {
        this.localConnection.setLocalDescription().then(() => {
          this.sendMessage({
            peerConn: this.localConnection.localDescription,
            to: this.userTocall._id,
            from: this.$auth.user._id,
          });
        });
      });

      // Receive stream from remote client and add to remote video area

      this.remoteVideo = document.getElementById("remoteVideo");
      this.remoteStream = new MediaStream();
      this.localConnection.ontrack = (stream) => {
        if (stream.streams && stream.streams[0]) {
          this.remoteStream = stream.streams[0];
          this.remoteVideo.srcObject = this.remoteStream;
        }
      };
      // Send Candidtates to establish a channel communication to send stream and data

      this.localConnection.onicecandidate = (candidate) => {
        if (candidate && candidate.candidate) {
          setTimeout(() => {
            this.sendMessage({
              type: "candidate",
              label: candidate.candidate.sdpMLineIndex,
              id: candidate.candidate.sdpMid,
              candidate: candidate.candidate.candidate,
              to: this.userTocall._id,
              from: this.$auth.user._id,
            });
          }, 100);
        } else {
          // console.log("End of candidates.");
        }
      };
    },
    callRefuse() {
      this.$buefy.toast.open({
        indefinite: true,
        message: `<b>${this.userTocall.username}</b> ne répond pas`,
        position: "is-bottom",
        type: "is-danger",
      });
      this.iMakecall = false;
      this.modalProposecall = false;
      let callingSignal = document.querySelector("#callingSignal");
      callingSignal.pause();
      this.wherebyRoomUrl = "";
      this.userTocall = "";
      //  setTimeout(() => {
      //  location.reload();
      //}, 300);
    },
    callAbortedbyinitiator() {
      let dataEmit = {};
      dataEmit.to = this.userTocall._id;
      dataEmit.from = this.$auth.user._id;
      this.$socket.emit("callAnswer", dataEmit);
      let callingSignal = document.querySelector("#callingSignal");
      callingSignal.pause();
      this.iMakecall = false;
      this.modalProposecall = false;
      this.wherebyRoomUrl = "";
      this.userTocall = "";
    },
    sendMessage(message) {
      this.$socket.emit("stream", message);
    },

    closeVideo() {
      let dataEmit = {};
      dataEmit.to = this.userTocall._id;
      dataEmit.from = this.$auth.user._id;
      this.$socket.emit("callAnswer", dataEmit);
      this.iMakecall = false;
      let callingSignal = document.querySelector("#callingSignal");
      callingSignal.pause();
      let endCallSignal = document.querySelector("#endCallSignal");
      endCallSignal.pause();
      this.modalProposecall = false;
      this.wherebyRoomUrl = "";
      this.userTocall = "";
      //deleteWhereBy(this.roomNameforDelete).then((resp) => {});
      deleteDailyco(this.roomNameforDelete).then((resp) => {});

      //location.reload();
    },

    openVideo() {
      this.videoIsopen = true;
      setTimeout(() => {
        this.myVideo = document.getElementById("myVideo");
        this.getUserMedia();
      }, 1);
    },
    closeCallmodal() {
      let ringtoneSignal = document.querySelector("#ringtoneSignal");
      ringtoneSignal.pause();
      this.modalProposecall = false;
      this.insiderwantAcall = "";
      this.userTocall = "";
      this.iMakecall = false;
      this.wherebyRoomUrl = "";
    },
    answerCallWhereby() {
      let ringtoneSignal = document.querySelector("#ringtoneSignal");
      ringtoneSignal.pause();
      getWhereBy().then((resp) => {
        this.userTocall = this.insiderwantAcall;
        let dataEmit = {};
        dataEmit.to = this.insiderwantAcall._id;
        dataEmit.from = this.$auth.user._id;
        dataEmit.whereby = resp.roomUrl;
        dataEmit.roomNameforDelete = resp.meetingId;
        this.$socket.emit("callAnswer", dataEmit);
        this.wherebyRoomUrl = resp.roomUrl;
        this.roomNameforDelete = resp.meetingId;

        this.modalProposecall = false;
      });
    },
    answerCallDailyco() {
      let ringtoneSignal = document.querySelector("#ringtoneSignal");
      ringtoneSignal.pause();
      getDailyco().then((resp) => {
        this.userTocall = this.insiderwantAcall;
        let dataEmit = {};
        dataEmit.to = this.insiderwantAcall._id;
        dataEmit.from = this.$auth.user._id;
        dataEmit.whereby = resp.url;
        dataEmit.roomNameforDelete = resp.name;
        this.$socket.emit("callAnswer", dataEmit);
        this.wherebyRoomUrl = resp.url;
        this.roomNameforDelete = resp.name;

        this.modalProposecall = false;
      });
    },
    answerCallWebrtc() {
      this.userTocall = this.insiderwantAcall;
      let dataEmit = {};
      dataEmit.to = this.insiderwantAcall._id;
      dataEmit.from = this.$auth.user._id;
      dataEmit.answser = true;
      this.$socket.emit("callAnswer", dataEmit);
      this.modalProposecall = false;
    },
    declineCall() {
      let dataEmit = {};
      dataEmit.to = this.insiderwantAcall._id;
      dataEmit.from = this.$auth.user._id;
      dataEmit.answser = false;
      this.$socket.emit("callAnswer", dataEmit);
      this.insiderwantAcall = "";
      this.modalProposecall = false;
      let ringtoneSignal = document.querySelector("#ringtoneSignal");
      ringtoneSignal.pause();
    },
    retrieveContestmess() {
      if (this.unredContestpost && this.unredContestpost.length > 0) {
        this.unredContestpost.shift();
      }
    },
    sayOnline() {
      if (this.$auth.user && this.$auth.user._id) {
        let dataEmit = {};
        dataEmit.user = this.$auth.user._id;
        dataEmit.time = new Date();
        this.$socket.emit("online", dataEmit);
      }
    },
    moment: function (time) {
      return moment(time);
    },

    removeinsiderWantsTotalk(event) {
      let removeWantstotalk = this.insiderWantsTotalk.filter(
        (i) => i._id != this.userTospeak._id
      );
      this.$store.commit("var/insiderWantsTotalk", removeWantstotalk);
    },
    closeChat(event) {
      this.chatActivate = false;
      let users = `${this.userTospeak._id},${this.$auth.user._id}`;
      // putallPrivatechatsToreadbyUser(users).then((resp) => {});
      let removeWantstotalk = this.insiderWantsTotalk.filter(
        (i) => i._id != this.userTospeak._id
      );
      this.$socket.emit("userTospeakonpage", {
        user: this.$auth.user._id,
        to: event,
        offline: true,
      });

      this.$store.commit("var/insiderWantsTotalk", removeWantstotalk);
      getUsersforchat().then((insidersTospeak) => {
        if (
          insidersTospeak &&
          insidersTospeak.conversations &&
          insidersTospeak.conversations.length > 0
        ) {
          this.insidersTospeak = insidersTospeak.conversations;
          this.$store.commit("var/setInsidersTospeak", this.insidersTospeak);
        }
      });
    },
    getChatlistCLose(event) {
      this.$socket.emit("userTospeakonpage", {
        user: this.$auth.user._id,
        to: event,
        offline: true,
      });
      this.getChatlist();
      this.chatActivate = false;
    },
    getChatlist() {
      getUsersforchat().then((insidersTospeak) => {
        if (
          insidersTospeak &&
          insidersTospeak.conversations &&
          insidersTospeak.conversations.length > 0
        ) {
          this.insidersTospeak = insidersTospeak.conversations;
          this.$store.commit("var/setInsidersTospeak", this.insidersTospeak);
        }
      });
      getAllunreadprivatechatbyuser(this.$auth.user._id).then((resp) => {
        if (resp && resp.length > 0) {
          this.$store.commit("var/insiderWantsTotalk", resp);
        } else {
          this.$store.commit("var/insiderWantsTotalk", []);
        }
      });
    },
    openChat(event) {
      this.isLoading = false;
      let users = `${event._id},${this.$auth.user._id}`;
      getAllprivatechatbetweenUsers(users).then((conversationWithinsider) => {
        if (conversationWithinsider.length > 0) {
          let conversationWithinsiderTocommit = conversationWithinsider.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          );
          this.$store.commit(
            "var/conversationWithinsider",
            conversationWithinsiderTocommit
          );
        }

        this.isLoading = false;
        this.$store.commit("var/speak", event);
        this.chatActivate = true;
      });

      getUsersforchat().then((insidersTospeak) => {
        if (
          insidersTospeak &&
          insidersTospeak.conversations &&
          insidersTospeak.conversations.length > 0
        ) {
          this.insidersTospeak = insidersTospeak.conversations;
          this.$store.commit("var/setInsidersTospeak", this.insidersTospeak);
        }
      });

      putallPrivatechatsToreadbyUser(users).then((resp) => {});
      let removeWantstotalk = this.insiderWantsTotalk.filter(
        (i) => i._id != this.userTospeak._id
      );
      this.$store.commit("var/insiderWantsTotalk", removeWantstotalk);
    },
    goContest() {
      this.selectClubModal = false;
      this.aboInfo = false;
      this.firstAbos = "";
      this.contestInfoModal = false;
      if (
        this.$store.state.auth.user &&
        this.$store.state.auth.user._id &&
        this.socketNames.length > 0
      ) {
        for (let i = 0; i < this.socketNames.length; i++) {
          this.sockets.unsubscribe("mess" + this.socketNames[i]);
        }
      }
      getRounds().then((round) => {
        if (round && round.length > 0) {
          this.roundsSubscribe = round;
          this.$router.push(`/contest/${round[0]._id}`);
          this.socketNames = this.roundsSubscribe.map((s) => s._id);
          for (let i = 0; i < this.socketNames.length; i++) {
            this.sockets.subscribe("mess" + this.socketNames[i], (data) => {
              this.$store.commit("var/newMessage", data);
              setTimeout(() => {
                this.$store.commit("var/newMessage", "");
              }, 1000);
              if (
                data.message.user._id != this.$store.state.auth.user._id &&
                !this.$route.path.includes(data.message.round)
              ) {
                let postTopush = data.message.round;
                this.unredContestpost.push(postTopush);
              }
            });
          }
        } else {
          this.$router.push(`/contest/`);
        }
      });
    },
    goAbo() {
      this.selectClubModal = false;
      this.aboInfo = false;
      this.firstAbos = "";
      this.contestInfoModal = true;
    },
    joinContest(contest) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        for (let i = 0; i < this.socketNames.length; i++) {
          this.sockets.unsubscribe("mess" + this.socketNames[i]);
        }
      }
      getRounds().then((round) => {
        this.roundsSubscribe = round;
        this.socketNames = this.roundsSubscribe.map((s) => s._id);
        for (let i = 0; i < this.socketNames.length; i++) {
          this.sockets.subscribe("mess" + this.socketNames[i], (data) => {
            this.$store.commit("var/newMessage", data);
            setTimeout(() => {
              this.$store.commit("var/newMessage", "");
            }, 1000);
            if (
              data.message.user._id != this.$store.state.auth.user._id &&
              !this.$route.path.includes(data.message.round)
            ) {
              let postTopush = data.message.round;
              this.unredContestpost.push(postTopush);
            }
          });
        }
      });
      setTimeout(() => {
        getAllMyContests().then((contests) => {
          if (contests && contests != "err") {
            this.$store.commit("datapage/mycontests", contests);
          }
        });
      }, 10);
      truepush.push({
        operation: "add-tags",
        data: [
          {
            tagName: contest._id,
            tagType: "CONTESTINSCRIPTION",
            tagValue: contest.name,
          },
        ],
        callback: function (error, response) {
          console.log(error, response);
        },
      });
    },

    asyncFind(query) {
      this.options = [];
      if (query[0] && query[0] != " ") {
        this.loading = true;
        searchTeam(query.toLowerCase()).then((data) => {
          this.loading = false;
          this.options = data;
        });
      } else {
        this.options = [];
      }
    },
    closeMulti() {
      this.isLoading = false;
      this.options = [];
    },
    customLabel({ searchName, shortName, name }) {
      if (shortName) {
        return `${name} - ${shortName}`;
      } else {
        return [];
      }
    },
    saveMyTeam() {
      if (this.favoriteTeam._id) {
        this.fanTeam = this.favoriteTeam._id;
        this.favTeamSN = this.favoriteTeam.shortName;
        this.selectClubModal = false;
        this.aboInfo = true;

        userUpdateFirst({
          fanTeam: this.fanTeam,
          favoriteTeam: this.favTeamSN,
        }).then((data) => {
          truepush.push({
            operation: "add-tags",
            data: [
              {
                tagName: this.favTeamSN,
                tagType: "CLUB",
                tagValue: this.favTeamSN,
              },
            ],
            callback: function (error, response) {
              console.log(error, response);
            },
          });
          this.firstAbos = data.filter((d) => d.lang == this.langSelected);
          this.$router.push("/mypage/abonnement");
          setTimeout(() => {
            this.selectClubModal = false;
          }, 100);
        });
      } else {
        this.selectClubModal = false;
        this.$router.push("/mypage/abonnement");
        setTimeout(() => {
          this.selectClubModal = false;
        }, 100);
      }

      //.catch(next);
    },

    registerUser() {
      this.isSignupModalActive = false;
      if (this.$auth && this.$auth.user && this.$auth.user._id) {
        getUser().then((response) => {
          if (response.darkTheme) {
            this.$store.commit("var/dark", true);
            document.documentElement.className =
              "font_sofia_pro_light_condensed_rg font_sofia_pro_light_condensed_rg_normal_normal darkSide";
          } else {
            this.$store.commit("var/dark", false);
            document.documentElement.className =
              "font_sofia_pro_light_condensed_rg font_sofia_pro_light_condensed_rg_normal_normal";
          }
        });
        getAllunreadprivatechatbyuser(this.$auth.user._id).then((resp) => {
          if (resp && resp.length > 0) {
            this.$store.commit("var/insiderWantsTotalk", resp);
          } else {
            this.$store.commit("var/insiderWantsTotalk", []);
          }
        });

        setInterval(() => {
          let dataEmit = {};
          dataEmit.user = this.$auth.user._id;
          dataEmit.time = new Date();
          this.$socket.emit("online", dataEmit);
          this.$socket.emit("online", dataEmit);
        }, 30000);
        let dataEmit2 = {};
        dataEmit2.user = this.$auth.user._id;
        dataEmit2.time = new Date();
        this.$socket.emit("online", dataEmit2);
        this.sockets.subscribe("online", (data) => {
          if (data) {
            let usersOnlinelistUpdate = this.usersOnlinelist.filter(
              (u) =>
                u.user != data.user &&
                moment().add(-0.5, "minutes").format() < moment(u.date).format()
            );
            usersOnlinelistUpdate.push(data);
            this.$store.commit("var/userOnline", usersOnlinelistUpdate);
          }
        });
        this.sockets.subscribe("proposeCall" + this.$auth.user._id, (data) => {
          if (this.modalProposecall == false && !this.insiderwantAcall) {
            this.insiderwantAcall = data.from;
            this.modalProposecall = true;
            let ringtoneSignal = document.querySelector("#ringtoneSignal");
            ringtoneSignal.play();
          }
        });

        getUsersforchat().then((insidersTospeak) => {
          if (
            insidersTospeak &&
            insidersTospeak.conversations &&
            insidersTospeak.conversations.length > 0
          ) {
            this.insidersTospeak = insidersTospeak.conversations;
            this.$store.commit("var/setInsidersTospeak", this.insidersTospeak);
          }
        });

        this.sockets.subscribe("chat" + this.$auth.user._id, (data) => {
          let insiderWantsTotalk = data.message.users.filter(
            (u) => u._id != this.$auth.user._id
          )[0];

          if (
            this.insiderWantsTotalk &&
            this.insiderWantsTotalk.length > 1 &&
            this.insiderWantsTotalk
              .map((i) => i._id)
              .includes(insiderWantsTotalk._id)
          ) {
          } else {
            this.$store.commit(
              "var/pushInsiderWantsTotalk",
              insiderWantsTotalk
            );
          }
        });
        //getUser().then(response => {});
        //this.$store.commit("var/setNewLang", this.$store.state.auth.user.lang);
        getRounds().then((round) => {
          if (round == "err") {
            //location.reload();
          } else {
            this.roundsSubscribe = round;

            let rId = this.roundsSubscribe.map((s) => s._id);

            for (let i = 0; i < rId.length; i++) {
              getUnReadPrivatePostForUser(rId[i]).then((numberMess) => {
                if (numberMess > 0) {
                  let postTopush = rId[i];
                  this.unredContestpost.push(postTopush);
                }
              });
            }

            this.socketNames = this.roundsSubscribe.map((s) => s._id);
            for (let i = 0; i < this.socketNames.length; i++) {
              this.sockets.subscribe("mess" + this.socketNames[i], (data) => {
                this.$store.commit("var/newMessage", data);
                setTimeout(() => {
                  this.$store.commit("var/newMessage", "");
                }, 1000);
                if (
                  data.message.user._id != this.$store.state.auth.user._id &&
                  !this.$route.path.includes(data.message.round)
                ) {
                  let postTopush = data.message.round;
                  this.unredContestpost.push(postTopush);
                }
              });
            }
          }
        });
        getWatchInsight(this.$store.state.auth.user._id).then(
          (watchInsight) => {
            watchInsight.sort((a, b) => new Date(a.date) - new Date(b.date));
            this.$store.commit("var/watchInsight", watchInsight);
          }
        );

        this.$store.commit("var/firstBet", "");
      }
      if (this.pronoUnconnect) {
        takeAbet(this.pronoUnconnect).then((resp) => {});
        this.$router.push(
          "/contest/inscription/" + this.$store.state.var.contestInscriptionId
        );
      } else if (this.$store.state.var.contestInscriptionId) {
        this.$router.push("/contest/inscription/" + this.contestInscriptionId);
      } else {
        this.$router.push("/mypage/all");
      }
    },

    getFavoriteTeam() {
      this.selectClubModal = true;
    },

    SignupModal() {
      this.$router.push("/signup");
    },
    LoginModal(autenticate) {
      this.autenticate = autenticate;
      this.$router.push("/login");
    },

    forgetModal() {
      this.isForgetModalActive = true;
    },
  },
  beforeDestroy() {
    if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
      userOffline().then((data) => {});
      for (let i = 0; i < this.socketNames.length; i++) {
        this.sockets.unsubscribe("mess" + this.socketNames[i]);
      }
    }
    this.sockets.unsubscribe("match");
  },

  created() {
    if (process.client && !this.$nuxt.isOffline) {
      if (this.$auth && this.$auth.user && this.$auth.user.lang) {
        this.$store.commit("var/setNewLang", this.$auth.user.lang);
      } else {
        if (this.$route.query && this.$route.query.lang == "en") {
          this.$store.commit("var/setNewLang", "EN");
        } else if (this.$route.query && this.$route.query.lang == "fr") {
          this.$store.commit("var/setNewLang", "FR");
        } else {
          let userLang = navigator.language || navigator.userLanguage;
          if (userLang.includes("fr")) {
            this.$store.commit("var/setNewLang", "FR");
          } else {
            this.$store.commit("var/setNewLang", "EN");
          }
        }
      }
      let token =
        cookies.get("auth._token.local") != "false"
          ? cookies.get("auth._token.local")
          : "";
      if (token) {
        this.$axios.setToken(token);
      }
      this.$nuxt.$on("betTaken", () => {
        getWatchInsight(this.$store.state.auth.user._id).then(
          (watchInsight) => {
            watchInsight.sort((a, b) => new Date(a.date) - new Date(b.date));
            this.$store.commit("var/watchInsight", watchInsight);
          }
        );
      });
      this.$nuxt.$on("getChatlist", () => {
        this.getChatlist();
      });
      this.$nuxt.$on("getChatlistCLose", (event) => {
        this.getChatlistCLose(event);
      });
      this.$nuxt.$on("closeChat", (event) => {
        this.closeChat(event);
      });
      this.$nuxt.$on("login", (event) => {
        this.LoginModal(event);
      });
      this.$nuxt.$on("forget", () => {
        this.forgetModal();
      });
      this.$nuxt.$on("registerUser", () => {
        this.registerUser();
      });
      this.$nuxt.$on("joinContest", (event) => {
        this.joinContest(event);
      });
      this.$nuxt.$on("firstBetmodal", () => {
        if (this.$auth.user && this.$auth.user._id) {
          this.onbordingActive = false;
          this.$store.commit("var/firstBet", "");
        } else if (
          this.firstBet &&
          this.$route.path &&
          !this.$route.path.includes("login") &&
          !this.$route.path.includes("signup") &&
          !this.$route.path.includes("resetpassword") &&
          !this.$route.path.includes("inscription") &&
          !this.$route.path.includes("unsubscribe") &&
          !this.$route.path.includes("contest") &&
          this.onbordingActive == false
        ) {
          setTimeout(() => {
            this.onbordingActive = true;
          }, 100);
        } else {
          this.onbordingActive = false;
        }
      });
      this.$nuxt.$on("answerCall", () => {
        //this.answerCallWhereby();
        this.answerCallDailyco();
      });
      this.$nuxt.$on("declineCall", () => {
        this.declineCall();
      });
      this.$nuxt.$on("openVideo", (event) => {
        this.userTocall = event;
        //this.openVideo();
        this.openVideoWhereBy();
      });
      this.$nuxt.$on("callAbortedbyinitiator", () => {
        this.callAbortedbyinitiator();
      });
      setTimeout(() => {
        let isSafari = /^((?!chrome|android).)*safari/i.test(
          navigator.userAgent
        );
        this.$store.commit("var/isSafari", isSafari);
      }, 1);

      if (this.$auth && this.$auth.user && this.$auth.user._id) {
        getUser().then((response) => {
          if (response.darkTheme) {
            this.$store.commit("var/dark", true);
            document.documentElement.className =
              "font_sofia_pro_light_condensed_rg font_sofia_pro_light_condensed_rg_normal_normal darkSide";
          } else {
            this.$store.commit("var/dark", false);
            document.documentElement.className =
              "font_sofia_pro_light_condensed_rg font_sofia_pro_light_condensed_rg_normal_normal";
          }
        });
        getAllunreadprivatechatbyuser(this.$auth.user._id).then((resp) => {
          if (resp && resp.length > 0) {
            this.$store.commit("var/insiderWantsTotalk", resp);
          } else {
            this.$store.commit("var/insiderWantsTotalk", []);
          }
        });

        setInterval(() => {
          let dataEmit = {};
          dataEmit.user = this.$auth.user._id;
          dataEmit.time = new Date();
          this.$socket.emit("online", dataEmit);
        }, 30000);
        let dataEmit2 = {};
        dataEmit2.user = this.$auth.user._id;
        dataEmit2.time = new Date();
        this.$socket.emit("online", dataEmit2);
        this.sockets.subscribe("online", (data) => {
          if (data) {
            let usersOnlinelistUpdate = this.usersOnlinelist.filter(
              (u) =>
                u.user != data.user &&
                moment().add(-0.5, "minutes").format() < moment(u.date).format()
            );
            usersOnlinelistUpdate.push(data);
            this.$store.commit("var/userOnline", usersOnlinelistUpdate);
          }
        });
        this.sockets.subscribe("proposeCall" + this.$auth.user._id, (data) => {
          if (this.modalProposecall == false && !this.insiderwantAcall) {
            this.insiderwantAcall = data.from;
            this.modalProposecall = true;
            let ringtoneSignal = document.querySelector("#ringtoneSignal");
            ringtoneSignal.play();
          }
        });

        getUsersforchat().then((insidersTospeak) => {
          if (
            insidersTospeak &&
            insidersTospeak.conversations &&
            insidersTospeak.conversations.length > 0
          ) {
            this.insidersTospeak = insidersTospeak.conversations;
            this.$store.commit("var/setInsidersTospeak", this.insidersTospeak);
          }
        });

        this.sockets.subscribe("chat" + this.$auth.user._id, (data) => {
          let insiderWantsTotalk = data.message.users.filter(
            (u) => u._id != this.$auth.user._id
          )[0];

          if (
            this.insiderWantsTotalk &&
            this.insiderWantsTotalk.length > 1 &&
            this.insiderWantsTotalk
              .map((i) => i._id)
              .includes(insiderWantsTotalk._id)
          ) {
          } else {
            this.$store.commit(
              "var/pushInsiderWantsTotalk",
              insiderWantsTotalk
            );
          }
        });
        //getUser().then(response => {});
        //this.$store.commit("var/setNewLang", this.$store.state.auth.user.lang);
        getRounds().then((round) => {
          if (round == "err") {
            //location.reload();
          } else {
            this.roundsSubscribe = round;

            let rId = this.roundsSubscribe.map((s) => s._id);

            for (let i = 0; i < rId.length; i++) {
              getUnReadPrivatePostForUser(rId[i]).then((numberMess) => {
                if (numberMess > 0) {
                  let postTopush = rId[i];
                  this.unredContestpost.push(postTopush);
                }
              });
            }

            this.socketNames = this.roundsSubscribe.map((s) => s._id);
            for (let i = 0; i < this.socketNames.length; i++) {
              this.sockets.subscribe("mess" + this.socketNames[i], (data) => {
                this.$store.commit("var/newMessage", data);
                setTimeout(() => {
                  this.$store.commit("var/newMessage", "");
                }, 1000);
                if (
                  data.message.user._id != this.$store.state.auth.user._id &&
                  !this.$route.path.includes(data.message.round)
                ) {
                  let postTopush = data.message.round;
                  this.unredContestpost.push(postTopush);
                }
              });
            }
          }
        });
        getWatchInsight(this.$store.state.auth.user._id).then(
          (watchInsight) => {
            watchInsight.sort((a, b) => new Date(a.date) - new Date(b.date));
            this.$store.commit("var/watchInsight", watchInsight);
          }
        );

        this.$store.commit("var/firstBet", "");
      } else {
        this.$auth.logout();
        getBetforunconnect().then((firstBet) => {
          this.$store.commit("var/firstBet", firstBet);
          if (
            this.$route.path &&
            !this.$route.path.includes("login") &&
            !this.$route.path.includes("signup") &&
            !this.$route.path.includes("resetpassword") &&
            !this.$route.path.includes("inscription") &&
            !this.$route.path.includes("unsubscribe") &&
            !this.$route.path.includes("contest")
          ) {
            setTimeout(() => {
              this.onbordingActive = true;
            }, 1000);
          }
        });
      }
      getMatchInplay().then((matches) => {
        this.$store.commit("var/matches", matches);
      });

      //this.sockets.unsubscribe("match");
      this.sockets.subscribe("match", (data) => {
        if (data.match.status) {
          if (
            data.match.status != "FT" &&
            data.match.status != "FT_PEN" &&
            data.match.status != "AET" &&
            data.match.status != "AET"
          ) {
            if (this.matches.map((m) => m._id).includes(data.match._id)) {
              let oldMatchesInplay = this.matches.filter(
                (m) => m._id != data.match._id
              );
              oldMatchesInplay.unshift(data.match);
              this.$store.commit("var/matches", oldMatchesInplay);
            }
          }

          if (
            this.$store.state.auth.user &&
            this.$store.state.auth.user.username &&
            this.watchInsight &&
            this.watchInsight.length > 0 &&
            this.watchInsight.map((m) => m._id).includes(data.match._id)
          ) {
            getWatchInsight(this.$store.state.auth.user._id).then(
              (watchInsight) => {
                watchInsight.sort(
                  (a, b) => new Date(a.date) - new Date(b.date)
                );
                this.$store.commit("var/watchInsight", watchInsight);
              }
            );
          }
        }
      });
    }
  },
  mounted() {
    if (process.client && !this.$nuxt.isOffline) {
      this.firstRender = false;
      setTimeout(() => {
        if (this.isSafari) {
          let PullToRefresh = require("pulltorefreshjs");

          PullToRefresh.init({
            mainElement: "#app",
            onRefresh() {
              window.location.reload();
            },
          });
        }
      }, 100);
    }
    /*this.$store.dispatch('authentication/fetch');*/
    /* Sample function that returns boolean in case the browser is Internet Explorer*/
    let is_ie =
      navigator.userAgent.indexOf("MSIE") > -1 ||
      navigator.userAgent.indexOf("Trident/") > -1;

    /* Create an alert to show if the browser is IE or not */
    if (is_ie) {
      this.$buefy.dialog.alert(
        "Vous utilisez un navigateur qui est trop ancien pour afficher correctement le site... 😅<br> Utilisez Chrome ou Firefox pour profiter pleinement d'footfoot.co."
      );
    }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style><style lang="scss" scoped>
.video {
  background-color: #eef1f7;
  position: absolute;
  height: 90vh;
  width: 99vw;
  margin: auto;
  top: 4.5rem;
  z-index: 1000000;
  &__partner {
    height: 95%;
    max-height: 95%;
    background-color: black !important;
  }
  &__myself {
    top: 50px;
    position: absolute;
    float: right;
    width: 130px;
    right: 0;
    height: 100px;
    z-index: 2000000;
  }
  &__spinner {
    width: 100% !important;
    height: 100% !important;
  }
}
.modal-card-head {
  height: 50px;
}
.is-36x36 {
  height: 48px !important;
  width: auto !important;
  margin-right: 10px;
}
.declineCall {
  height: 3rem;
  filter: invert(8%) sepia(98%) saturate(7109%) hue-rotate(358deg)
    brightness(105%) contrast(122%);
}
.videoInfo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.fa-video-slash {
  font-size: 2rem;
  display: flex;
  align-items: center;
  color: #192b41;
}
.nameCall {
  color: #ff7d00;
  font-size: 2rem !important;
  font-weight: bold;
  margin-right: 20px;
}
#remoteVideo {
  border-radius: 5px;
  height: 99%;
}
.firstAboWrap {
  overflow-x: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: flex-start;
  max-width: 30vw;
}
.justifyCenter {
  display: flex;
  justify-content: center;
}
.aboPic {
  max-height: 40px !important;
}
.firstAboWrap > div {
  flex: 1 0 10%;
}
.wantsTotalkWrap {
  z-index: 40000;
  position: fixed;
  top: 5rem;
  left: 0;
  display: flex;
  flex-wrap: wrap;
}
.is-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.is-circle > img {
  height: 5rem !important;
  width: 5rem !important;
}

.fullWidthCenter {
  display: flex;
  justify-content: center;
  width: 100%;
}

.fullWidthCenter > img {
  height: 10rem;
  width: 10rem;
}

.navImg {
  margin-left: 5px;
}

.displayFlex {
  align-items: center;
}

.aboInfoWrap {
  font-size: 1rem !important;
}

.container {
  max-width: 95%;
}

.navcontest {
  padding-top: 2rem;
}

.has-text-centered {
  font-size: 1rem !important;
}

footer {
  justify-content: flex-end;
}

.titleMessage {
  font-size: 1.5rem;
}

.media {
  display: flex;
  flex-direction: column;
}

.modal-card-body {
  overflow: visible;
}

.field {
  margin-top: 2rem;
  overflow: visible;
  width: 100%;
}

.mobileOnlynav {
  display: none;
}
.is-12x12 {
  width: 12px;
  height: 12px;
}
.delete {
  border-radius: 50%;
  background-color: red;
  color: white;
  width: 20px !important;
  min-width: 20px !important;
}

.talkingSollicitationWrap {
  z-index: 400;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.talkingSollicitation {
  background-color: white;
  color: #ff7d00;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 5px !important;
  border: 2px solid;
  border-color: #ff7d00 !important;
}
.wantsTotalkWrap > .talkingSollicitationWrap:not(:last-child) {
  margin-right: 15px;
}
.explanationContest div {
  display: flex;
  align-items: center;
}
.explanationContest div > p {
  align-items: center;
}
.incomingCall {
  z-index: 100000000000000;
  position: fixed;
  top: 5rem;
}
.boxDaily {
  padding: 0.25rem !important;
}
.chatDesktop {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 100000000000000;
  max-width: 500px;
}
//**********************messageANim
.wrapNewmesscontest {
  display: flex;
  align-items: center;
  bottom: 50px;
  right: 50px;
  position: fixed;
  z-index: 1000000000000000000;
  -webkit-animation: pulse 1.6s infinite;
  animation: pulse 1.6s infinite;
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}

.wrapNewmess {
  display: flex;
  align-items: center;
  bottom: 50px !important;
  right: 150px !important;
  position: fixed;
  z-index: 1000000000000000000;
  -webkit-animation: pulse 1.6s infinite;
  animation: pulse 1.6s infinite;
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}

.icon-container {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 50%;
  box-sizing: content-box;
  background-color: #ff7d00;
  width: 75px;
  height: 75px;
  .icon-inner {
    width: 75px;
    height: 75px;

    .iconmess {
      width: 75px;
      height: 75px;
      svg {
        margin: 0 auto;
        width: 45px;
        height: 45px;
        padding: 15px;
        fill: #fff !important;
      }
    }
    .iconmess {
      width: 75px;
      height: 75px;
      .coupeLogo {
        margin: 0 auto;
        width: 45px;
        height: 45px;
        padding: 15px;
      }
    }
  }
}
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.shadow {
  position: absolute;
  transform: translate(-50%, -45%) scale(0.9);
  top: 50%;
  left: 50%;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #192b41;
  opacity: 1;
  filter: blur(5px);
  box-sizing: content-box;
  opacity: 0.8;
}
.darkSide .stayWhite {
  filter: invert(98%) sepia(55%) saturate(180%) hue-rotate(216deg)
    brightness(114%) contrast(100%);
}

//************ */

@media (max-width: 1047px) {
  //**********************messageANim
  .wrapNewmess {
    bottom: 170px !important;
    right: 50px !important;
  }
  .wrapNewmesscontest {
    bottom: 90px;
    right: 50px;
  }
  .icon-container {
    width: 55px;
    height: 55px;
    .icon-inner {
      width: 55px;
      height: 55px;
      .iconmess {
        width: 55px;
        height: 55px;
        svg {
          width: 35px;
          height: 35px;
          padding: 10px;
        }
      }
      .iconmess {
        width: 55px;
        height: 55px;
        .coupeLogo {
          width: 35px;
          height: 35px;
          padding: 10px;
        }
      }
    }
  }
  .shadow {
    width: 70px;
    height: 70px;
  }
  //*****************************/
  .video__partner {
    max-height: calc(100vh - 9.25rem);
  }
  .videoInfo {
    justify-content: space-between;
  }
  .declineCall {
    height: 2.5rem;
  }
  .nameCall {
    margin-right: 0px;
    font-size: 1.75rem !important;
  }
  .is-36x36 {
    height: 36px !important;
  }
  .video {
    height: calc(90vh - 50px);
    width: 100vw;
    top: 3rem;
  }
  .incomingCall {
    top: 3rem;
  }
  .firstAboWrap {
    max-width: 100vw;
  }
  .aboPic {
    height: 35px !important;
  }
  .wantsTotalkWrap {
    top: 4rem;
  }
  .talkingSollicitationWrap {
    top: 3.25rem;
  }

  .mobileOnlynav {
    display: block !important;
  }

  .desktopOnlynav {
    display: none !important;
  }

  .wrapper {
    padding-bottom: 0.15rem;
  }

  .field {
    margin-bottom: 0rem;
  }

  div {
    font-size: 0.8rem !important;
  }

  .has-text-centered {
    font-size: 0.8rem !important;
  }
}

@media (max-width: 450px) {
  .explanationContest div {
    font-size: 0.8rem !important;
  }
}

@media (max-width: 370px) {
  .explanationContest div {
    font-size: 0.8rem !important;
  }
}
</style>
