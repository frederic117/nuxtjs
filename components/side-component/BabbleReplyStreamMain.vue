<template>
  <div>
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :canCancel="false"
    ></b-loading>

    <div class="babbles-box">
      <div
        itemscope
        itemtype="http://schema.org/NewsArticle"
        class="box babbleMainCadre"
      >
        <div
          v-if="
            babble.babbleImg &&
            babble.user.username != 'Footy Headlines' &&
            babble.user.username != 'Culture PSG' &&
            babble.user.username != 'Le Monde' &&
            babble.user.username != 'SportaCaen'
          "
          class="card-image imageChart"
        >
          <button v-if="babble.babbleVideo" class="button is-medium is-pdf">
            <a :href="babble.babbleVideo">{{
              langSelected === "EN" ? "Download PDF." : "Télécharger le PDF."
            }}</a>
          </button>
          <a v-if="babble.babbleVideo" :href="babble.babbleVideo">
            <figure class="image imageBabble">
              <img
                loading="lazy"
                :src="babble.babbleImg"
                alt="Placeholder image"
              />
            </figure>
          </a>

          <figure
            v-if="!babble.babbleVideo"
            class="image imageBabble"
            itemprop="image"
            itemscope
            itemtype="http://schema.org/ImageObject"
          >
            <meta itemprop="height" content />
            <meta itemprop="width" content />
            <meta itemprop="url" :content="babble.babbleImg" />
            <img
              loading="lazy"
              :src="babble.babbleImg"
              alt="Placeholder image"
            />
          </figure>
        </div>

        <div
          v-if="!babble.babbleImg && babble.babbleVideo"
          class="card-image imageChart videoBabble"
        >
          <div>
            <display-video :video="babble.babbleVideo"></display-video>
          </div>
        </div>
        <article class="media tweet">
          <figure class="media-left">
            <div class="image is-64x64 is-circle">
              <nuxt-link :to="'/dashboard/' + babble.user._id">
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
              <nuxt-link
                :to="'/dashboard/' + babble.user._id"
                class="userUsername"
                itemprop="author"
                >{{ babble.user.username }}</nuxt-link
              >
              <span class="icon is-medium">
                <img
                  loading="lazy"
                  v-if="babble.user.role === 'bot'"
                  class="verified"
                  src="~assets/images/verified.png"
                />
              </span>
            </strong>
            <small
              class="media-right has-text-grey-light"
              itemprop="datePublished"
              >{{
                moment(babble.created_at.toString())
                  .local()
                  .format("DD-MM-YYYY HH:mm")
              }}</small
            >
          </div>
        </article>
        <div class="media-content">
          <div class="content">
            <div
              v-if="
                (babble.players && babble.players.length > 0) ||
                (babble.teamLink && babble.teamLink.length > 0)
              "
              class="tagBabblesWrapper"
            >
              <div
                v-if="babble.players && babble.players.length > 0"
                class="tagWrapper"
              >
                <nuxt-link
                  v-for="(player, index) in babble.players"
                  :key="index"
                  :to="`/player/${player.display_name}/${player.id_sportmonks}`"
                >
                  <figure class="imgTeamLink">
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
                  <figure class="imgTeamLink">
                    <img
                      loading="lazy"
                      :class="{
                        invertOk: team.shortName.toUpperCase().includes('JUVE'),
                      }"
                      :src="team.teamImg"
                      :alt="team.shortName"
                    />
                  </figure>
                </nuxt-link>
              </div>
            </div>
            <h1
              v-if="!babble.mp3Link && babble.title"
              class="babbleTitle"
              itemprop="headline"
            >
              <code v-html="babble.title"></code>
            </h1>
            <div v-if="ssrRendering">
              <h2
                class="
                  babbleBodyMain
                  quill-code
                  tweet-body
                  has-text-grey
                  babble-body
                "
                itemprop="articleBody"
              >
                <code v-html="addLinksToHttp(babble.babble)"></code>
              </h2>
            </div>
            <div v-else>
              <client-only>
                <h2
                  class="
                    babbleBodyMain
                    quill-code
                    tweet-body
                    has-text-grey
                    babble-body
                  "
                  itemprop="articleBody"
                >
                  <code
                    v-if="babble.scrapHtml"
                    v-html="babble.scrapHtml"
                  ></code>
                  <code
                    v-else-if="babble.scrap"
                    v-html="addLinksToHttp(babble.scrap)"
                  ></code>

                  <code v-else v-html="addLinksToHttp(babble.babble)"></code>

                  <div v-if="babble.tweet && babble.tweet.length > 0">
                    <tweet-embeded
                      class="tweetWrappercomponent"
                      v-for="(tweet, index) in babble.tweet"
                      :key="index"
                      :tweet-id="tweet"
                    ></tweet-embeded>
                  </div>
                </h2>
              </client-only>
            </div>

            <small
              v-if="babble.user.role === 'bot' && babble.source"
              class="titleBabble level-item has-text-grey-light"
            >
              {{ langSelected === "EN" ? "read on" : "lire sur" }}
              <a class="lireSurReply" target="_blank" :href="babble.source"
                >&nbsp{{ babble.user.username }}</a
              >
            </small>
            <small
              v-else-if="babble.source"
              class="titleBabble level-item has-text-grey-light"
            >
              <a class="lireSurReply" target="_blank" :href="babble.source">{{
                langSelected === "EN" ? "read " : "lire la suite"
              }}</a>
            </small>
            <client-only>
              <div
                v-if="babble.taggedUsers && babble.taggedUsers.length > 0"
                class="taggedUserWrapper"
              >
                <b-tag
                  @click="goToUser(user._id)"
                  class="is-info"
                  v-for="(user, index) in babble.taggedUsers"
                  :key="index"
                >
                  <p @click="goToUser(user._id)">{{ user.username }}</p>
                </b-tag>
              </div>
            </client-only>
          </div>
          <br />
          <client-only>
            <nav class="media-right foOt">
              <div class="level-left sociaSh has-text-grey-light">
                <div>
                  <ShareNetwork
                    network="facebook"
                    :url="'https://www.footfoot.co/news/babble/' + babble._id"
                    :title="
                      babble.babble && babble.title
                        ? babble.title
                        : babble.meta
                        ? babble.meta
                        : babble.babble
                    "
                    :description="
                      babble.babble && babble.meta
                        ? babble.meta.substring(0, 300) + '... la suite sur'
                        : babble.title
                        ? babble.title + '... la suite sur'
                        : babble.babble.substring(0, 300) + '... la suite sur'
                    "
                    :quote="
                      babble.babble && babble.title
                        ? babble.title
                        : babble.meta
                        ? babble.meta
                        : babble.babble
                    "
                    hashtags="contest,football,pronos,news"
                    twitter-user="InsidersFoot"
                  >
                    <i class="fa fa-facebook">&nbsp &nbsp</i>
                  </ShareNetwork>
                  <ShareNetwork
                    network="twitter"
                    :url="'https://www.footfoot.co/news/babble/' + babble._id"
                    :title="
                      babble.babble && babble.title
                        ? babble.title
                        : babble.meta
                        ? babble.meta
                        : babble.babble
                    "
                    :description="
                      babble.babble && babble.meta
                        ? babble.meta.substring(0, 300) + '... la suite sur'
                        : babble.title
                        ? babble.title + '... la suite sur'
                        : babble.babble.substring(0, 300) + '... la suite sur'
                    "
                    :quote="
                      babble.babble && babble.title
                        ? babble.title
                        : babble.meta
                        ? babble.meta
                        : babble.babble
                    "
                    hashtags="contest,football,pronos,news"
                    twitter-user="InsidersFoot"
                  >
                    <i class="fa fa-twitter">&nbsp &nbsp</i>
                  </ShareNetwork>

                  <ShareNetwork
                    network="sms"
                    class="mobileOnly"
                    :url="'https://www.footfoot.co/news/babble/' + babble._id"
                    :title="
                      babble.babble && babble.title
                        ? babble.title
                        : babble.meta
                        ? babble.meta
                        : babble.babble
                    "
                    :description="
                      babble.babble && babble.meta
                        ? babble.meta.substring(0, 300) + '... la suite sur'
                        : babble.title
                        ? babble.title + '... la suite sur'
                        : babble.babble.substring(0, 300) + '... la suite sur'
                    "
                    :quote="
                      babble.babble && babble.title
                        ? babble.title
                        : babble.meta
                        ? babble.meta
                        : babble.babble
                    "
                    hashtags="contest,football,pronos,news"
                    twitter-user="InsidersFoot"
                  >
                    <i class="far fa-comment-dots">&nbsp &nbsp</i>
                  </ShareNetwork>

                  <ShareNetwork
                    network="messenger"
                    class="mobileOnly"
                    :url="'https://www.footfoot.co/news/babble/' + babble._id"
                    :title="
                      babble.babble && babble.title
                        ? babble.title
                        : babble.meta
                        ? babble.meta
                        : babble.babble
                    "
                    :description="
                      babble.babble && babble.meta
                        ? babble.meta.substring(0, 300) + '... la suite sur'
                        : babble.title
                        ? babble.title + '... la suite sur'
                        : babble.babble.substring(0, 300) + '... la suite sur'
                    "
                    :quote="
                      babble.babble && babble.title
                        ? babble.title
                        : babble.meta
                        ? babble.meta
                        : babble.babble
                    "
                    hashtags="contest,football,pronos,news"
                    twitter-user="InsidersFoot"
                  >
                    <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                  </ShareNetwork>
                  <ShareNetwork
                    network="whatsapp"
                    :url="'https://www.footfoot.co/news/babble/' + babble._id"
                    :title="
                      babble.babble && babble.title
                        ? babble.title
                        : babble.meta
                        ? babble.meta
                        : babble.babble
                    "
                    :description="
                      babble.babble && babble.meta
                        ? babble.meta.substring(0, 300) + '... la suite sur'
                        : babble.title
                        ? babble.title + '... la suite sur'
                        : babble.babble.substring(0, 300) + '... la suite sur'
                    "
                    :quote="
                      babble.babble && babble.title
                        ? babble.title
                        : babble.meta
                        ? babble.meta
                        : babble.babble
                    "
                    hashtags="contest,football,pronos,news"
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
              </div>
              <div class="level-right">
                <a class="likeModal level-item has-text-grey-light">
                  <span class="icon is-medium">
                    <img
                      loading="lazy"
                      class="clap"
                      src="~assets/images/comments.svg"
                      alt="comment"
                    />
                  </span>
                  <small class="favicon has-text-grey-light">{{
                    babble.babbleReply.length
                  }}</small>
                </a>
                <a
                  @click="iLike(babble)"
                  class="level-item has-text-grey-light"
                >
                  <span class="icon is-medium">
                    <img
                      loading="lazy"
                      class="clap"
                      src="~assets/images/clap.svg"
                    />
                  </span>
                  <small class="has-text-grey-light">{{
                    babble.like.length
                  }}</small>
                </a>
              </div>
            </nav>
          </client-only>
        </div>
      </div>
      <client-only>
        <div v-if="babble.reply">
          <div
            v-for="(reply, index) in babble.babbleReply"
            :key="index"
            class="box"
          >
            <div v-if="reply.babbleImg" class="card-image imageChart">
              <button v-if="reply.babbleVideo" class="button is-medium is-pdf">
                <a class="colorWhite" :href="reply.babbleVideo">{{
                  langSelected === "EN"
                    ? "Download PDF."
                    : "Télécharger le PDF."
                }}</a>
              </button>
              <a v-if="reply.babbleVideo" :href="reply.babbleVideo">
                <figure class="image imageBabble">
                  <img
                    loading="lazy"
                    :src="reply.babbleImg"
                    alt="Placeholder image"
                  />
                </figure>
              </a>
              <figure v-else class="image imageBabble">
                <img
                  loading="lazy"
                  :src="reply.babbleImg"
                  alt="Placeholder image"
                />
              </figure>
            </div>

            <div
              v-if="!reply.babbleImg && reply.babbleVideo"
              class="card-image imageChart videoBabble"
            >
              <div>
                <display-video :video="reply.babbleVideo"></display-video>
              </div>
            </div>
            <article class="media">
              <figure class="media-left">
                <div class="image is-64x64 is-circle">
                  <nuxt-link :to="'/dashboard/' + reply.user" class>
                    <img
                      loading="lazy"
                      class="imgProfile"
                      :src="reply.picProfile"
                      alt="Image"
                    />
                  </nuxt-link>
                </div>
              </figure>
              <div class="tweet-meta">
                <nuxt-link :to="'/dashboard/' + reply.user" class>
                  <strong>{{ reply.username }}</strong>
                </nuxt-link>
                <small class="media-right has-text-grey-light">{{
                  moment(reply.created_at).local().format("DD-MM-YYYY HH:mm")
                }}</small>
              </div>
            </article>
            <div class="media-content">
              <div v-if="reply && reply.babble" class="content">
                <h2 class="quill-code tweet-body has-text-grey babble-body">
                  <p
                    v-if="reply.babble.includes('titlelinkChat')"
                    class="contestPost"
                    v-html="reply.babble"
                  ></p>
                  <p v-else v-html="reply.babble"></p>
                </h2>
              </div>
              <nav v-if="reply && reply.babble" class="media-right foOt">
                <div class="level-left sociaSh has-text-grey-light">
                  <div>
                    <ShareNetwork
                      network="facebook"
                      :url="'https://www.footfoot.co/news/babble/' + babble._id"
                      :title="
                        reply.babble.substring(0, 100) + '... la suite sur'
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="reply.babble"
                      hashtags="contest,football,pronos,news"
                      twitter-user="InsidersFoot"
                    >
                      <i class="fa fa-facebook">&nbsp &nbsp</i>
                    </ShareNetwork>
                    <ShareNetwork
                      network="twitter"
                      :url="'https://www.footfoot.co/news/babble/' + babble._id"
                      :title="
                        reply.babble.substring(0, 100) + '... la suite sur'
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="reply.babble"
                      hashtags="contest,football,pronos,news"
                      twitter-user="InsidersFoot"
                    >
                      <i class="fa fa-twitter">&nbsp &nbsp</i>
                    </ShareNetwork>

                    <ShareNetwork
                      network="sms"
                      class="mobileOnly"
                      :url="'https://www.footfoot.co/news/babble/' + babble._id"
                      :title="
                        reply.babble.substring(0, 100) + '... la suite sur'
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="reply.babble"
                      hashtags="contest,football,pronos,news"
                      twitter-user="InsidersFoot"
                    >
                      <i class="far fa-comment-dots">&nbsp &nbsp</i>
                    </ShareNetwork>

                    <ShareNetwork
                      network="messenger"
                      class="mobileOnly"
                      :url="'https://www.footfoot.co/news/babble/' + babble._id"
                      :title="
                        reply.babble.substring(0, 100) + '... la suite sur'
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="reply.babble"
                      hashtags="contest,football,pronos,news"
                      twitter-user="InsidersFoot"
                    >
                      <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                    </ShareNetwork>
                    <ShareNetwork
                      network="whatsapp"
                      :url="'https://www.footfoot.co/news/babble/' + babble._id"
                      :title="
                        reply.babble.substring(0, 100) + '... la suite sur'
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="reply.babble"
                      hashtags="contest,football,pronos,news"
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
                </div>
                <div class="replyBabble level-right">
                  <a
                    @click="showModal(reply)"
                    class="level-item has-text-grey-light"
                  >
                    <span class="icon is-medium">
                      <img
                        loading="lazy"
                        class="clap"
                        src="~assets/images/comments.svg"
                      />
                    </span>
                    <small class="favicon">{{ reply.reply.length }}</small>
                  </a>

                  <a
                    @click="iLikeComment(reply)"
                    class="level-item has-text-grey-light"
                  >
                    <span class="icon is-medium">
                      <img
                        loading="lazy"
                        class="clap"
                        src="~assets/images/clap.svg"
                      />
                    </span>
                    <small>{{ reply.like.length }}</small>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import { postLikeReply } from "@/server/api";
import { postLike } from "@/server/api";
import moment from "moment";

export default {
  components: {
    displayVideo: () => import("@/components/modal/displayVideo"),
    tweetEmbeded: () => import("@/components/side-component/tweetEmbeded"),
  },
  mounted() {
    this.ssrRendering = false;
  },
  data() {
    return {
      ssrRendering: true,
      isLoading: false,
    };
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  props: {
    babble: "",
  },

  methods: {
    handleSuccess() {
      this.$buefy.dialog.alert("Le lien a été copié! Plus qu'à le partager 😋");
    },
    goToUser(event) {
      this.$router.push(`/dashboard/${event}`);
    },

    goToTeam(event) {
      this.$router.push(`/teams/${event}`);
    },

    moment: function (time) {
      return moment(time);
    },

    iLike(babble) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        let like = {};
        like.babbleId = babble._id;
        like.userLiked = babble.user._id;
        postLike(like).then(() => {
          this.$emit("changeBabbles");
        });
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },
    iLikeComment(reply) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        postLikeReply(reply._id).then(() => {
          this.$emit("changeBabbles");
        });
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },

    showModal(babble) {
      this.$emit("showModal", babble);
    },
    addLinksToHttp(inputText) {
      var replacedText, replacePattern1, replacePattern2, replacePattern3;
      inputText = inputText.replace(/(?:\r\n|\r|\n)/g, "<br />");
      replacePattern1 =
        /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(
        replacePattern1,
        '<a href="$1" target="_blank">$1</a>'
      );
      //URLs starting with "www." (without ////before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(
        replacePattern2,
        '$1<a href="http://$2" target="_blank">$2</a>'
      );
      //Change email addresses to mailto:: links.
      replacePattern3 =
        /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(
        replacePattern3,
        '<a href="mailto:$1">$1</a>'
      );
      return replacedText;
    },
  },
};
</script>

<style scoped>
.firstModalWrap {
  background-color: #eef1f7;
}
.box {
  padding: 0.25rem;
}
.babblesField > div > .box {
  padding: 0.25rem !important;
  margin-top: 0.25rem !important;
}
#forumMainCadre {
  padding: 0.25rem !important;
}
.media-content {
  padding-top: 5px;
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

.displayUploadImage {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  align-items: flex-end;
}

.mdi-paperclip {
  color: #ff7d00 !important;
  font-size: 30px;
}

.fa-link {
  color: #ff7d00 !important;
  font-size: 30px;
}

.titleBabble {
  display: flex;
  justify-content: flex-end;
}

.options-img-video {
  padding-right: 15px;
}

.titleVideo {
  font-size: 1.2rem !important;
  font-weight: bold;
}

.fa-youtube {
  color: #ff0000 !important;
  font-size: 30px;
}

.containerYoutube1 {
  width: 100%;
  margin-top: 20px;
}

.containerYoutube2 {
  width: 100%;
}

.youtubeField {
  width: 100%;
  height: 70%;
  padding: 5px;
  font-size: 1.2rem;
  font-style: italic;
}

.fa-line-chart {
  font-size: 21px;
}

.chartIcon {
  width: 100%;
  display: flex;
  align-items: baseline;
  font-size: 0.85rem;
}

.level-right {
  width: 35%;
  margin: 0px !important;
}

.level-left {
  width: 65%;
  margin: 0px !important;
}

.level {
  display: flex;
  height: 3em;
  align-items: center;
  justify-content: space-between;
}

.mediaModal {
  background-color: #fff;
  padding: 5%;
  margin: 5%;
  border-radius: 5px;
  border: solid, #192b41;
}

.bg-light {
  background-color: #eef1f7;
}

.fa {
  text-align: center;
  vertical-align: top;
  color: #192b41;
}

.field1 {
  margin-bottom: 0.75rem !important;
}

.backFlux {
  display: none;
  cursor: pointer;
}

.fa-arrow-circle-left {
  font-size: 2rem;
}

.userUsername {
  color: #192b41 !important;
}

.babbleMainCadre {
  background-color: #fff;
}

.babbleBodyMain {
  color: #192b41 !important;
}

.lireSurReply {
  color: #192b41 !important;
}

a {
  color: #192b41;
}

.content {
  margin-bottom: 0rem !important;
}

.p-x-1 {
  min-height: 9rem;
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
  justify-content: space-between;
  margin-left: 0rem !important;
}

.reply {
  height: 1.2rem;
}

.tweet-body {
  word-break: break-word;
}

.likeModal {
  cursor: initial !important;
}

.card-content {
  padding: 0.25rem;
}

.bg-light {
  background-color: #eef1f7;
}

.fa {
  text-align: center;
  vertical-align: top;
  color: #192b41;
}

.level-item {
  cursor: pointer;
}
.displayUploadImage {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  align-items: flex-end;
}
.is-fullwidth {
  margin-right: 5px;
}

.verified {
  height: 15px;
}

.replyBabble {
  cursor: pointer;
}

.babble-body {
  padding: 0rem !important;
  margin-bottom: 0.8rem !important;
}

.box > .tweet {
  padding: 0.25rem !important;
  padding-bottom: 0px !important;
}
.videoBabble {
  padding-bottom: 0px !important;
}
@media screen and (max-width: 768px) {
  .backFlux {
    display: block;
  }

  h1 {
    font-size: 0.8rem !important;
  }

  h2 {
    font-size: 0.8rem !important;
  }

  .media-right {
    font-size: 0.8rem;
  }

  .usernameStong {
    font-size: 0.9rem;
  }

  .field:not(:last-child) {
    margin-bottom: 0rem !important;
    margin-top: 0rem !important;
    padding-right: 0px;
  }

  .is-5 {
    font-size: 1rem !important;
  }

  .retourFlux {
    display: none;
  }

  .p-x-1 {
    min-height: 0rem;
  }

  .media-left {
    margin: 0px;
    margin-right: 10px;
  }

  .icon {
    font-size: 0.8rem;
  }

  .level-left + .level-right {
    margin-top: 0px !important;
  }

  .levelchartIcon {
    display: flex !important;
    align-items: center !important;
  }

  .level-left {
    display: flex;
  }

  .level-item {
    margin-right: 10px;
  }

  .level-right {
    display: flex;
    margin-top: 0rem;
  }

  .level-item:not(:last-child) {
    margin-bottom: 0px;
  }
  s .text-img-options {
    display: none;
  }

  .level-left {
    display: flex;
  }

  .field1 {
    margin-bottom: 0.75rem !important;
    margin-top: 0.75rem !important;
    padding-right: 5px;
  }
  .media-left {
    margin: 0px;
    margin-right: 5px;
  }

  .card-content {
    padding: 0px;
  }

  .chartIcon {
    justify-content: baseline !important;
  }
}
</style>
