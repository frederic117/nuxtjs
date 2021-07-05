<template>
  <div>
    <div
      id="loader-container"
      v-if="
        (babblesTodisplay && babblesTodisplay.length == 0) ||
        !babblesTodisplay ||
        refreshActive == true
      "
    >
      <slot name="loading">
        <div class="spinner"></div>
      </slot>
    </div>

    <div v-else class="babbles-box" id="babble-container">
      <div class="babbles-box" v-if="babblesTodisplay[0] != 'empty'">
        <div
          v-for="(babble, index) in babblesTodisplay"
          :key="index"
          class="box"
          v-observe-visibility="
            index === babblesTodisplay.length - 8
              ? loadMoreBabble
              : index === babblesTodisplay.length - 1
              ? loadMoreBabble
              : false
          "
        >
          <div
            v-if="!babble.babbleImg && babble.babbleVideo"
            class="card-image imageChart videoBabble"
          >
            <display-video :video="babble.babbleVideo"></display-video>
          </div>

          <article class="media">
            <figure class="media-left">
              <div class="image is-64x64 is-circle">
                <nuxt-link :to="'/dashboard/' + babble.user._id" class>
                  <img
                    loading="lazy"
                    class="imgProfile"
                    :src="babble.user.picProfile"
                    alt="Image"
                  />
                </nuxt-link>
              </div>
            </figure>
            <div class="tweet-meta">
              <strong class="usernameStong">
                <nuxt-link :to="'/dashboard/' + babble.user._id" class>{{
                  babble.user.username
                }}</nuxt-link>
                <span v-if="babble.user.role === 'bot'" class="icon is-medium">
                  <img
                    loading="lazy"
                    class="verified"
                    src="~assets/images/verified.png"
                    alt="verified"
                  />
                </span>
                <span
                  v-if="!$auth || ($auth.user && !$auth.user._id)"
                  class="icon is-medium"
                >
                  <img
                    type="button"
                    @click="login()"
                    class="icon is-medium"
                    src="~assets/images/plus.png"
                    alt="plus"
                  />
                </span>
              </strong>
              <div class="eraseBab">
                <small class="media-right has-text-grey-light">{{
                  moment(babble.created_at).local().format("DD-MM-YYYY HH:mm")
                }}</small>
                &nbsp
                <client-only>
                  <button
                    v-if="
                      $auth.user &&
                      $auth.user.username &&
                      ($auth.user.role === 'admin' ||
                        $auth.user.level === 'champions league' ||
                        $auth.user._id === babble.user._id)
                    "
                    type="button"
                    @click="eraseBabble(babble)"
                    class="delete deletebabble"
                  ></button>
                </client-only>
              </div>
            </div>
          </article>
          <div class="media-content">
            <div class="content">
              <div class="tagBabblesWrapper">
                <div
                  v-if="babble.players && babble.players.length > 0"
                  class="tagWrapper"
                >
                  <nuxt-link
                    v-for="(player, index) in babble.players"
                    :key="index"
                    :to="`/player/${player.display_name}/${player.id_sportmonks}`"
                  >
                    <figure type="button" class="imgTeamLink">
                      <img
                        loading="lazy"
                        class="rounded"
                        :src="
                          player.picture
                            ? player.picture
                            : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                        "
                        :alt="player.display_name"
                      />
                    </figure>
                  </nuxt-link>
                </div>
                <div
                  v-if="babble.teamLink && babble.teamLink.length > 0"
                  class="tagWrapper"
                >
                  <nuxt-link
                    v-for="(team, index) in babble.teamLink"
                    :key="index"
                    :to="`/teams/${team.shortName}`"
                  >
                    <figure type="button" class="imgTeamLink">
                      <img
                        loading="lazy"
                        :src="team.teamImg"
                        :alt="team.shortName"
                        :class="{
                          invertOk: team.shortName
                            .toUpperCase()
                            .includes('JUVE'),
                        }"
                      />
                    </figure>
                  </nuxt-link>
                </div>
              </div>
              <!--	<nuxt-link v-if="!babble.mp3Link && babble.title" :to="babble.teamLink.length>0? `/teams/${babble.teamLink[0].shortName}/babble/${babble._id}`:'/news/babble/'+babble._id">
												<h1 v-if="!babble.mp3Link && babble.title" class="babbleTitle">
													<code v-html="babble.title"></code>
												</h1>
											</nuxt-link>
							-->
              <a
                v-if="!babble.mp3Link && babble.title"
                @click="openBabbelTodisplay(babble)"
              >
                <h1 v-if="!babble.mp3Link && babble.title" class="babbleTitle">
                  <code v-html="babble.title"></code>
                </h1>
              </a>
              <div v-if="babble.babble" class="displayFlex">
                <div
                  v-if="babble.babbleImg && !mobile"
                  class="card-image imageChart desktopOnly"
                >
                  <figure class="image imageBabble">
                    <a @click="openBabbelTodisplay(babble)">
                      <img
                        loading="lazy"
                        class="smallImg"
                        :src="babble.babbleImg"
                        alt="image"
                      />
                    </a>
                  </figure>
                </div>
                <div class="widthfull">
                  <h2 class="quill-code has-text-grey babble-body">
                    <div
                      v-if="
                        (babble.meta && babble.meta.length > 250) ||
                        babble.babble.length > 500 ||
                        babble.scrap ||
                        babble.scrapHtml
                      "
                    >
                      <a
                        @click="openBabbelTodisplay(babble)"
                        class="linkBabbleMeta"
                      >
                        <code
                          v-html="
                            babble.babbleImg
                              ? babble.babble.slice(0, 200) + '...'
                              : babble.babble.slice(0, 265) + '...'
                          "
                        ></code>
                        <span class="laSuite">...</span>
                      </a>
                    </div>

                    <code v-else v-html="babble.babble"></code>
                  </h2>

                  <small
                    v-if="
                      !babble.scrapHtml &&
                      !babble.scrap &&
                      babble.user.role === 'bot' &&
                      babble.source
                    "
                    class="titleBabble level-item has-text-grey-light"
                  >
                    {{ langSelected === "EN" ? "read on" : "lire sur" }}
                    <a
                      class="lireSurReply"
                      target="_blank"
                      :href="babble.source"
                      >&nbsp{{ babble.user.username }}</a
                    >
                  </small>
                  <small
                    v-else-if="
                      !babble.scrapHtml && !babble.scrap && babble.source
                    "
                    class="titleBabble level-item has-text-grey-light"
                  >
                    <a
                      class="lireSurReply"
                      target="_blank"
                      :href="babble.source"
                      >{{
                        langSelected === "EN" ? "read " : "lire la suite"
                      }}</a
                    >
                  </small>
                </div>
              </div>

              <div v-else-if="babble.mp3Link">
                <h1 class="quill-code tweet-body has-text-grey babble-body">
                  <code v-html="babble.title"></code>
                </h1>
                <div class="lecteur-audio-pod">
                  <vue-plyr>
                    <audio>
                      <source :src="babble.mp3Link" />
                      Your browser does not support the audio element.
                    </audio>
                  </vue-plyr>
                </div>
              </div>
              <!--
              <div
                v-if="babble.taggedUsers && babble.taggedUsers.length > 0"
                class="taggedUserWrapper"
              >
                <b-tag
                  type="button"
                  @click="goToUser(user._id)"
                  class="is-info"
                  v-for="(user, index) in babble.taggedUsers"
                  :key="index"
                >
                  <p type="button" @click="goToUser(user._id)">
                    {{ user.username }}
                  </p>
                </b-tag>
              </div>-->
            </div>
          </div>

          <nav class="media-right foOt">
            <div class="level-left sociaSh has-text-grey-light">
              <div v-if="babble.babble">
                <ShareNetwork
                  network="facebook"
                  :url="
                    babble.teamLink.length > 0
                      ? `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/babble/${babble._id}`
                      : 'https://www.footfoot.co/news/babble/' + babble._id
                  "
                  :title="
                    babble.babble && babble.title
                      ? babble.title
                      : babble.meta
                      ? babble.meta
                      : babble.babble
                  "
                  :description="
                    babble.babble && babble.meta
                      ? babble.meta.substring(0, 300) + '...'
                      : babble.title
                      ? babble.title + '...'
                      : babble.babble.substring(0, 300) + '...'
                  "
                  :quote="
                    babble.babble && babble.title
                      ? babble.title
                      : babble.meta
                      ? babble.meta
                      : babble.babble
                  "
                  hashtags="footfoot,football,pronos,news"
                  twitter-user="InsidersFoot"
                >
                  <i class="fa fa-facebook">&nbsp &nbsp</i>
                </ShareNetwork>
                <ShareNetwork
                  network="twitter"
                  :url="
                    babble.teamLink.length > 0
                      ? `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/babble/${babble._id}`
                      : 'https://www.footfoot.co/news/babble/' + babble._id
                  "
                  :title="
                    babble.babble && babble.title
                      ? babble.title
                      : babble.meta
                      ? babble.meta
                      : babble.babble
                  "
                  :description="
                    babble.babble && babble.meta
                      ? babble.meta.substring(0, 300) + '...'
                      : babble.title
                      ? babble.title + '...'
                      : babble.babble.substring(0, 300) + '...'
                  "
                  :quote="
                    babble.babble && babble.title
                      ? babble.title
                      : babble.meta
                      ? babble.meta
                      : babble.babble
                  "
                  hashtags="footfoot,football,pronos,news"
                  twitter-user="InsidersFoot"
                >
                  <i class="fa fa-twitter">&nbsp &nbsp</i>
                </ShareNetwork>

                <ShareNetwork
                  network="sms"
                  class="mobileOnly"
                  :url="
                    babble.teamLink.length > 0
                      ? `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/babble/${babble._id}`
                      : 'https://www.footfoot.co/news/babble/' + babble._id
                  "
                  :title="
                    babble.babble && babble.title
                      ? babble.title
                      : babble.meta
                      ? babble.meta
                      : babble.babble
                  "
                  :description="
                    babble.babble && babble.meta
                      ? babble.meta.substring(0, 300) + '...'
                      : babble.title
                      ? babble.title + '...'
                      : babble.babble.substring(0, 300) + '...'
                  "
                  :quote="
                    babble.babble && babble.title
                      ? babble.title
                      : babble.meta
                      ? babble.meta
                      : babble.babble
                  "
                  hashtags="footfoot,football,pronos,news"
                  twitter-user="InsidersFoot"
                >
                  <i class="far fa-comment-dots">&nbsp &nbsp</i>
                </ShareNetwork>

                <ShareNetwork
                  network="messenger"
                  class="mobileOnly"
                  :url="
                    babble.teamLink.length > 0
                      ? `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/babble/${babble._id}`
                      : 'https://www.footfoot.co/news/babble/' + babble._id
                  "
                  :title="
                    babble.babble && babble.title
                      ? babble.title
                      : babble.meta
                      ? babble.meta
                      : babble.babble
                  "
                  :description="
                    babble.babble && babble.meta
                      ? babble.meta.substring(0, 300) + '...'
                      : babble.title
                      ? babble.title + '...'
                      : babble.babble.substring(0, 300) + '...'
                  "
                  :quote="
                    babble.babble && babble.title
                      ? babble.title
                      : babble.meta
                      ? babble.meta
                      : babble.babble
                  "
                  hashtags="footfoot,football,pronos,news"
                  twitter-user="InsidersFoot"
                >
                  <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                </ShareNetwork>
                <ShareNetwork
                  network="whatsapp"
                  :url="
                    babble.teamLink.length > 0
                      ? `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/babble/${babble._id}`
                      : 'https://www.footfoot.co/news/babble/' + babble._id
                  "
                  :title="
                    babble.babble && babble.title
                      ? babble.title
                      : babble.meta
                      ? babble.meta
                      : babble.babble
                  "
                  :description="
                    babble.babble && babble.meta
                      ? babble.meta.substring(0, 300) + '...'
                      : babble.title
                      ? babble.title + '...'
                      : babble.babble.substring(0, 300) + '...'
                  "
                  :quote="
                    babble.babble && babble.title
                      ? babble.title
                      : babble.meta
                      ? babble.meta
                      : babble.babble
                  "
                  hashtags="footfoot,football,pronos,news"
                  twitter-user="InsidersFoot"
                >
                  <i class="fa fa-whatsapp">&nbsp &nbsp</i>
                </ShareNetwork>
                <a
                  class="pointer"
                  v-clipboard:success="handleSuccess"
                  v-clipboard="
                    'https://www.footfoot.co/news/babble/' + babble._id
                  "
                  type="button"
                >
                  <i class="fa fas fa-copy"></i
                ></a>
              </div>

              <div v-if="babble.mp3Link">
                <ShareNetwork
                  network="facebook"
                  :url="
                    babble.teamLink.length === 0
                      ? 'https://www.footfoot.co'
                      : `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/podcast`
                  "
                  :title="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :description="
                    babble.babble
                      ? babble.babble.substring(0, 300) + '...'
                      : babble.title + '...'
                  "
                  :quote="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  hashtags="contest,football,pronos,news"
                  twitter-user="InsidersFoot"
                  inline-template
                >
                  <i class="fa fa-facebook">&nbsp &nbsp</i>
                </ShareNetwork>
                <ShareNetwork
                  network="twitter"
                  :url="
                    babble.teamLink.length === 0
                      ? 'https://www.footfoot.co'
                      : `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/podcast`
                  "
                  :title="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :description="
                    babble.babble
                      ? babble.babble.substring(0, 300) + '...'
                      : babble.title + '...'
                  "
                  :quote="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  hashtags="contest,football,pronos,news"
                  twitter-user="InsidersFoot"
                  inline-template
                >
                  <i class="fa fa-twitter">&nbsp &nbsp</i>
                </ShareNetwork>

                <ShareNetwork
                  network="sms"
                  class="mobileOnly"
                  :url="
                    babble.teamLink.length === 0
                      ? 'https://www.footfoot.co'
                      : `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/podcast`
                  "
                  :title="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :description="
                    babble.babble
                      ? babble.babble.substring(0, 300) + '...'
                      : babble.title + '...'
                  "
                  :quote="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  hashtags="contest,football,pronos,news"
                  twitter-user="InsidersFoot"
                  inline-template
                >
                  <i class="far fa-comment-dots">&nbsp &nbsp</i>
                </ShareNetwork>

                <ShareNetwork
                  network="messenger"
                  class="mobileOnly"
                  :url="
                    babble.teamLink.length === 0
                      ? 'https://www.footfoot.co'
                      : `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/podcast`
                  "
                  :title="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :description="
                    babble.babble
                      ? babble.babble.substring(0, 300) + '...'
                      : babble.title + '...'
                  "
                  :quote="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  hashtags="contest,football,pronos,news"
                  twitter-user="InsidersFoot"
                  inline-template
                >
                  <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                </ShareNetwork>
                <ShareNetwork
                  network="whatsapp"
                  :url="
                    babble.teamLink.length === 0
                      ? 'https://www.footfoot.co'
                      : `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/podcast`
                  "
                  :title="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :description="
                    babble.babble
                      ? babble.babble.substring(0, 300) + '...'
                      : babble.title + '...'
                  "
                  :quote="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  hashtags="contest,football,pronos,news"
                  twitter-user="InsidersFoot"
                  inline-template
                >
                  <i class="fa fa-whatsapp">&nbsp &nbsp</i>
                </ShareNetwork>
                <a
                  class="pointer"
                  v-clipboard:success="handleSuccess"
                  v-clipboard="
                    babble.teamLink.length === 0
                      ? 'https://www.footfoot.co'
                      : `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/podcast`
                  "
                  type="button"
                >
                  <i class="fa fas fa-copy"></i
                ></a>
              </div>
            </div>
            <div class="add-team-and-like">
              <nuxt-link
                v-if="!babble.mp3Link && babble.title"
                :to="
                  babble.teamLink.length > 0
                    ? `/teams/${babble.teamLink[0].shortName}/babble/${babble._id}`
                    : '/news/babble/' + babble._id
                "
                class="level-item has-text-grey-light"
              >
                <span class="icon is-medium">
                  <img
                    loading="lazy"
                    class="clap"
                    src="~assets/images/comments.svg"
                    alt="comment"
                  />
                </span>
                <small>{{ babble.babbleReply.length }}</small>
                &nbsp&nbsp
              </nuxt-link>

              <a
                type="button"
                @click="iLike(babble)"
                class="level-item likeBut has-text-grey-light"
              >
                <span class="icon is-medium">
                  <img
                    loading="lazy"
                    class="clap"
                    src="~assets/images/clap.svg"
                    alt="clap"
                  />
                </span>
                <small>{{ babble.like.length }}</small>
              </a>
            </div>
          </nav>
        </div>
      </div>

      <div
        v-else-if="babblesTodisplay[0] === 'empty'"
        class="sideRecent box babble-container no-babble"
      >
        <span class="content-no-bet">
          {{
            langSelected === "EN" ? "no content yet" : "Pas encore de contenu"
          }}
          <br />

          <p class="buttonContest">
            <button @click="goToPublish" class="button is-primary">
              {{ langSelected === "EN" ? "share a news" : "Partage une info" }}
            </button>
          </p>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  postLike,
  postLikeFansong,
  getGoalsVideos,
  askForum,
} from "@/server/api";
import { deleteABbbles } from "@/server/api";
import moment from "moment";

import { followInsider, unfollowInsider } from "@/server/apiDashboard";

export default {
  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      babblesTodisplay: [],
      babble: "",
      videoId: "videoId",
      loadMore: 1,
      bottom: false,
      textForum: "",
      refreshActive: false,
    };
  },
  props: {
    babbles: "",
    babblesVideo: "",
    filterBy: "",
  },
  components: {
    displayVideo: () => import("@/components/modal/displayVideo"),
  },

  watch: {
    $route() {
      this.loadMore = 1;
    },
    filterBy: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.filterBy == "news") {
          this.babblesTodisplay = this.babbles;
        } else if (this.filterBy == "videos") {
          this.babblesTodisplay = this.babblesVideo;
        } else {
          this.babblesTodisplay = [];
        }
      },
    },

    babbles: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.filterBy == "news") {
          this.babblesTodisplay = this.babbles;
        }
      },
    },
    babblesVideo: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.filterBy == "videos") {
          this.babblesTodisplay = this.babblesVideo;
        }
      },
    },
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        return this.$store.state.auth.user;
      } else {
        return "unconnected";
      }
    },
    charactersLeft() {
      var char = this.babble.length,
        limit = 16180;
      return limit - char;
    },
  },

  methods: {
    handleSuccess() {
      this.$buefy.dialog.alert("Le lien a été copié! Plus qu'à le partager 😋");
    },
    openBabbelTodisplay(event) {
      this.$store.commit("var/setbabbaleTodisplay", event);
    },
    goToPublish() {
      this.$emit("goToPublish");
    },
    unconnect() {
      this.$buefy.dialog.confirm({
        message: "Tu dois être connecté !",
        confirmText: "Rejoins-nous !",
        type: "is-success",
        cancelText: "X",
        onConfirm: () => this.$router.push("/signup"),
      });
    },
    follow(event) {
      followInsider(event).then((resp) => {
        this.$auth.fetchUser();
      });
    },
    unfollow(event) {
      unfollowInsider(event).then((resp) => {
        this.$auth.fetchUser();
      });
    },
    loadMoreBabble(isVisible) {
      if (isVisible) {
        this.loadMore = this.loadMore + 1;
        setTimeout(() => {
          this.$emit("loadMore", this.loadMore);
        }, 1);
      }
    },
    goToTeam(event) {
      this.$router.push(`/teams/${event}`);
    },
    goToUser(event) {
      this.$router.push(`/dashboard/${event}`);
    },

    eraseBabble(babble) {
      if (
        this.$store.state.auth.user &&
        (this.$store.state.auth.user.level === "champions league" ||
          this.$store.state.auth.user.role === "admin" ||
          (this.$store.state.auth.user &&
            this.$store.state.auth.user._id === babble.user._id))
      ) {
        deleteABbbles(babble._id).then(() => {
          this.$emit("changeBabbles");
        });
      }
    },
    refresh() {
      if (!this.$nuxt.isOffline) {
        this.refreshActive = TRUE;
        if (this.filterBy === "podcast") {
          this.$emit("podCast");
        } else if (this.filterBy === "forum") {
          this.$emit("forum");
        } else if (this.filterBy === "buts") {
          this.$emit("buts");
        } else {
          this.$emit("sort", this.filterBy);
        }
        setTimeout(() => {
          this.refreshActive = false;
        }, 1000);
      }
    },
    moment: function (time) {
      return moment(time);
    },

    iLike(babble) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        if (this.filterBy == "songs") {
          postLikeFansong(babble._id).then(() => {
            this.$emit("changeBabbles");
            this.isCardModalActive = false;
          });
        } else {
          let like = {};
          like.babbleId = babble._id;
          like.userLiked = babble.user._id;
          postLike(like).then(() => {
            this.$emit("changeBabbles");
            this.isCardModalActive = false;
          });
        }
      } else {
        this.$router.push("/signup");
      }
    },
    addLinksToHttp(inputText) {
      var replacedText;
      inputText = inputText.replace(/(?:\r\n|\r|\n)/g, "<br />");
      replacedText = inputText;
      return replacedText;
    },
    login() {
      this.$router.push("/signup");
    },
  },
};
</script>

<style scoped>
.content-no-bet {
  display: flex;
  flex-direction: column;
}
.buttonContest {
  margin: auto;
  margin-top: 5px;
}
.no-babble {
  min-height: 25vh;
}
.forumBox > .tweet {
  padding: 0 !important;
  margin-bottom: 10px;
}
.forumBox > .tweet > .media-content {
  padding: 0 !important;
}
.tag {
  margin-right: 0.5rem;
  cursor: pointer;
}

.taggedUserWrapper {
  display: flex;
  margin: 0.5rem;
  margin-left: 0rem;
}

.taggedUserWrapper > span {
  color: #192b41;
  font-weight: bold;
  margin-right: 0.5rem;
  font-size: 0.6rem;
  cursor: pointer;
}

code {
  background-color: white !important;
}

.add-team-and-like {
  display: flex;
}

.add-team-and-like > img {
  padding-right: 15px;
  margin: auto;
  height: 15px;
}

.okAddTeam {
  margin: auto !important;
}

h1 {
  font-size: 1.2rem !important;
}

h2 {
  font-size: 1.2rem !important;
}

body {
  color: lightslategray;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.7em;
}

a {
  color: #192b41 !important;
}

.modal-card-body {
  overflow: visible;
}

.lecteur-audio-pod {
  display: flex;
  justify-content: center;
}

.replyBabble {
  cursor: pointer;
}

.babble-body {
  padding-top: 0rem !important;
  margin-bottom: 0.8rem !important;
}

.content {
  margin-bottom: 0rem !important;
}

.p-x-1 {
  min-height: 5rem;
}

.fa {
  cursor: pointer !important;
}

.sociaSh {
  cursor: pointer;
  align-self: center;
}

.foOt {
  display: flex;
  font-size: 1.5rem;
  justify-content: flex-start;
  margin-left: 0rem !important;
}

.reply {
  height: 1.25rem;
  margin-right: 0px !important;
}

.tweet-body {
  word-break: break-word;
}

.babblesMenu {
  display: flex;
  margin: auto;
  width: 100%;
}

.card-content {
  padding: 0.5rem;
}

.fa-refresh {
  margin: auto;
  margin-right: 1.5rem;
  font-size: 1.2rem;
}

.navbar.is-dark {
  display: flex;
  justify-content: space-between;
}

.navbar {
  background-color: #fff;
  min-height: 3.25rem;
  position: relative;
}

.fa {
  text-align: center;
  vertical-align: top;
  color: #192b41;
}

.level-item {
  cursor: pointer;
}

.verified {
  height: 15px;
}

.level-right {
  justify-content: center;
  margin-bottom: 1rem;
}

.buttonBet {
  padding-left: 30px;
  padding-right: 30px;
  font-weight: bolder;
  color: #fff;
  background-color: #eb412d;
  box-shadow: 0 0 0 0.125em#eb412d;
  border-color: #eb412d;
  font-size: 1.2rem !important;
}

.buttonBet:focus,
.buttonBet:hover {
  background-color: #fff !important;
  border-color: #eb412d !important;
  color: #eb412d !important;
}

.media-right {
  margin-left: 0rem;
  justify-content: space-between;
  display: flex;
}

.likeBut {
  justify-content: flex-end;
}

.titleBabble {
  display: flex;
  justify-content: flex-end;
}

.plus-img {
  height: 25px;
  width: auto;
}

.mainMenu {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.is-35 {
  width: auto;
  height: 35px;
  max-height: 35px;
}

.is-30 {
  width: auto;
  height: 30px;
  padding-right: 10px;
}
.is-20 {
  cursor: pointer;
  width: auto;
  height: 20px;
  padding-left: 10px;
}

.itemMenu {
  display: flex;
  margin: auto;
  cursor: pointer;
}

.babMenu {
  display: flex;
  padding: 5px;
  margin: auto;
  font-weight: bold;
  color: #192b41 !important;
}

.itemMenu > p {
  padding-left: 0.5rem;
}

.mobileOnly {
  display: none !important;
}

.usernameStong .icon {
  width: 20px;
  padding: 1px;
  cursor: pointer;
  align-self: center;
}

.usernameStong a {
  margin-right: 5px;
}

.mdi-paperclip {
  display: flex;
  font-size: 2rem;
  color: #192b41 !important;
}

.fa-youtube {
  color: #ff0000 !important;
  font-size: 2rem;
}
.publishText {
  max-height: 50px !important;
}
.publishWrapper {
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
}

.publishWrapper > .control {
  width: 85%;
  color: #192b41 !important;
}

.publishWrapper > img {
  height: 45px;
  margin-right: 10px;
}
.fa-send {
  font-size: 2rem;
}
.is-right {
  width: 15% !important;
}

.faWrapper {
  margin-left: 15px;
}

@media screen and (max-width: 768px) {
  .publishWrapper > img {
    height: 35px;
    margin-right: 5px;
  }
  .faWrapper {
    margin-left: 5px;
  }
  .fa-send {
    font-size: 1.5rem;
  }
  .level-right {
    display: flex;
    margin-top: 0rem;
  }

  .mobileOnly {
    display: flex !important;
  }

  .desktopOnly {
    display: none !important;
  }

  .babMenu {
    margin: auto;
    padding: 0.5rem;
    font-size: 1.3rem !important;
    color: #c9c9c9;
    font-weight: bold;
    align-items: center;
  }

  h1 {
    font-size: 0.8rem !important;
  }

  h2 {
    font-size: 0.8rem !important;
  }
  .has-text-grey-light > small {
    font-size: 0.9rem !important;
  }
  .likeBut > small {
    font-size: 0.9rem !important;
  }

  .media {
    margin-bottom: 0rem !important;
  }

  .buttonBet {
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 0.9rem !important;
  }

  .media-right {
    font-size: 1rem;
    padding: 0 0.5rem;
  }

  .usernameStong {
    font-size: 0.9rem;
  }

  .level-item {
    margin-right: 10px;
  }

  .level-item:not(:last-child) {
    margin-bottom: 0px;
  }

  .media-left {
    margin: 0px;
    margin-right: 5px;
  }

  .card-content {
    padding: 0px;
  }

  .icon {
    font-size: 0.8rem;
  }

  .level-left + .level-right {
    margin-top: 0px !important;
  }
}
</style>
