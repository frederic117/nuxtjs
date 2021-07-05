<template>
  <div v-if="forum && forum._id">
    <div class>
      <div id="forumMainCadre" class="box forumBox">
        <article v-if="forum.user" class="media tweet">
          <div class="media-content">
            <div class="content">
              <div v-if="forum.user && forum.user._id" class="tweet-meta">
                <strong class="usernameStong">
                  <nuxt-link :to="'/dashboard/' + forum.user._id" class>{{
                    forum.user.username
                  }}</nuxt-link>
                  <span v-if="forum.user.role === 'bot'" class="icon is-medium">
                    <img
                      loading="lazy"
                      class="verified"
                      src="~assets/images/verified.png"
                      alt="verified"
                    />
                  </span>
                </strong>
                <div class="eraseBab">
                  <small class="media-right has-text-grey-light"></small>
                  &nbsp
                  <client-only>
                    <button
                      v-if="
                        $store.state.auth &&
                        $store.state.auth.user &&
                        $store.state.auth.user.username &&
                        ($store.state.auth.user.role === 'admin' ||
                          $store.state.auth.user.level === 'champions league' ||
                          $store.state.auth.user._id === forum.user._id)
                      "
                      type="button"
                      @click="eraseforum(forum)"
                      class="delete deletebabble"
                    ></button>
                  </client-only>
                </div>
              </div>
            </div>
          </div>
        </article>
        <h1 class="forumTitleH1">
          <figure v-if="forum.team && forum.team.length > 0">
            <img
              loading="lazy"
              :class="{
                invertOk: forum.team[0].name.toUpperCase().includes('JUVE'),
              }"
              :src="forum.team[0].teamImg"
              alt="team logo"
            />
          </figure>
          <figure v-else-if="forum.tags && forum.tags.length > 0">
            <img
              loading="lazy"
              v-if="forum.tags && forum.tags[0] == 'match'"
              class
              src="~assets/images/ballon-bleu.png"
              alt="match"
            />
            <img
              v-else-if="forum.tags && forum.tags[0] == 'interview'"
              class
              src="~assets/images/microphone.png"
              alt="interview"
            />
            <img
              v-else
              class="invertOk"
              src="~assets/images/question-mark-9.png"
              alt="question"
            />
          </figure>
          <figure v-else>
            <img
              class="invertOk"
              src="~assets/images/question-mark-9.png"
              alt="question"
            />
          </figure>
          <div class="forumTitle">
            <strong>{{ forum.title }}</strong>
          </div>
        </h1>

        <div class="media-content">
          <nav class="media-right foOt contentquestionUserNav">
            <div class="level-left sociaSh has-text-grey-light">
              <div v-if="forum._id">
                <ShareNetwork
                  network="facebook"
                  :url="
                    'https://www.footfoot.co/forum/' +
                    forum._id +
                    '/' +
                    forum.title
                      .replace(' ?', '')
                      .split(' ')
                      .join('-')
                      .replace(/\s/g, '')
                  "
                  :title="forum.title"
                  :description="forum.title"
                  :quote="forum.title"
                  hashtags="contest,football,pronos,news"
                  twitter-user="InsidersFoot"
                >
                  <i class="fa fa-facebook">&nbsp &nbsp</i>
                </ShareNetwork>
                <ShareNetwork
                  network="twitter"
                  :url="
                    'https://www.footfoot.co/forum/' +
                    forum._id +
                    '/' +
                    forum.title
                      .replace(' ?', '')
                      .split(' ')
                      .join('-')
                      .replace(/\s/g, '')
                  "
                  :title="forum.title"
                  :description="forum.title"
                  :quote="forum.title"
                  hashtags="contest,football,pronos,news"
                  twitter-user="InsidersFoot"
                >
                  <i class="fa fa-twitter">&nbsp &nbsp</i>
                </ShareNetwork>

                <ShareNetwork
                  network="sms"
                  class="mobileOnly"
                  :url="
                    'https://www.footfoot.co/forum/' +
                    forum._id +
                    '/' +
                    forum.title
                      .replace(' ?', '')
                      .split(' ')
                      .join('-')
                      .replace(/\s/g, '')
                  "
                  :title="forum.title"
                  :description="forum.title"
                  :quote="forum.title"
                  hashtags="contest,football,pronos,news"
                  twitter-user="InsidersFoot"
                >
                  <i class="far fa-comment-dots">&nbsp &nbsp</i>
                </ShareNetwork>

                <ShareNetwork
                  network="messenger"
                  class="mobileOnly"
                  :url="
                    'https://www.footfoot.co/forum/' +
                    forum._id +
                    '/' +
                    forum.title
                      .replace(' ?', '')
                      .split(' ')
                      .join('-')
                      .replace(/\s/g, '')
                  "
                  :title="forum.title"
                  :description="forum.title"
                  :quote="forum.title"
                  hashtags="contest,football,pronos,news"
                  twitter-user="InsidersFoot"
                >
                  <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                </ShareNetwork>
                <ShareNetwork
                  network="whatsapp"
                  :url="
                    'https://www.footfoot.co/forum/' +
                    forum._id +
                    '/' +
                    forum.title
                      .replace(' ?', '')
                      .split(' ')
                      .join('-')
                      .replace(/\s/g, '')
                  "
                  :title="forum.title"
                  :description="forum.title"
                  :quote="forum.title"
                  hashtags="contest,football,pronos,news"
                  twitter-user="InsidersFoot"
                >
                  <i class="fa fa-whatsapp">&nbsp &nbsp</i>
                </ShareNetwork>
                <a
                  class="pointer"
                  v-clipboard:success="handleSuccess"
                  v-clipboard="
                    'https://www.footfoot.co/forum/' +
                    forum._id +
                    '/' +
                    forum.title
                      .replace(' ?', '')
                      .split(' ')
                      .join('-')
                      .replace(/\s/g, '')
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
                  forum.forumReply.length
                }}</small>
              </a>
              <!-- <a @click="iLikeForum(forum)" class=" level-item has-text-grey-light">
                                  <span class="icon is-medium"><img loading="lazy"class="" src="~assets/images/clap.svg"></span>
                                        <small class="has-text-grey-light">{{forum.like.length}}</small>
							</a>-->
            </div>
          </nav>
        </div>
      </div>
      <div v-if="forum.forumReply">
        <div
          v-for="(reply, index) in forum.forumReply"
          :key="index"
          class="box"
        >
          <div v-if="reply.forumImg" class="card-image imageChart">
            <figure class="image imageBabble">
              <img
                loading="lazy"
                :src="reply.forumImg"
                alt="Placeholder image"
              />
            </figure>
          </div>

          <div
            v-if="reply.forumVideo"
            class="card-image imageChart videoBabble"
          >
            <display-video :video="reply.forumVideo"></display-video>
          </div>

          <article class="media tweet">
            <figure class="media-left">
              <div class="image is-64x64 is-circle">
                <nuxt-link :to="'/dashboard/' + reply.user" class>
                  <img
                    loading="lazy"
                    class="imgProfile"
                    :src="reply.user.picProfile"
                    alt="Image"
                  />
                </nuxt-link>
                <!-- <img loading="lazy"v-if="reply.position==='bear'" src="~assets/images/BearPositionBabbleBlur.png" alt="BearPositionBabble">
								<img loading="lazy"v-if="reply.position==='bull'" src="~assets/images/BullPositionBabbleBlur.png" alt="BullPositionBabble">-->
              </div>
            </figure>

            <div class="tweet-meta">
              <nuxt-link :to="'/dashboard/' + reply.user" class>
                <strong>{{ reply.user.username }}</strong>
              </nuxt-link>
              <div class="eraseBab">
                <client-only>
                  <small class="media-right has-text-grey-light"></small>
                  &nbsp
                  <button
                    v-if="
                      $auth.user &&
                      $auth.user.username &&
                      ($auth.user.role === 'admin' ||
                        $auth.user.level === 'champions league' ||
                        $auth.user._id === babble.user._id)
                    "
                    type="button"
                    @click="eraseForumReply(reply)"
                    class="delete deletebabble"
                  ></button>
                </client-only>
              </div>
            </div>
          </article>
          <div class="media-content">
            <div class="content">
              <!-- <div v-html="addLinksToHttp(reply.babble)" class="tweet-body has-text-grey babble-body babbleForum">
							</div>-->
              <h2 class="quill-code">
                <code v-html="reply.babble"></code>
              </h2>
            </div>
            <nav class="media-right foOt">
              <div class="level-left sociaSh has-text-grey-light">
                <div>
                  <ShareNetwork
                    network="facebook"
                    :url="
                      'https://www.footfoot.co/forum/' +
                      forum._id +
                      '/' +
                      forum.title
                        .replace(' ?', '')
                        .split(' ')
                        .join('-')
                        .replace(/\s/g, '')
                    "
                    :title="forum.title"
                    :description="forum.title"
                    :quote="forum.title"
                    hashtags="contest,football,pronos,news"
                    twitter-user="InsidersFoot"
                  >
                    <i class="fa fa-facebook">&nbsp &nbsp</i>
                  </ShareNetwork>
                  <ShareNetwork
                    network="twitter"
                    :url="
                      'https://www.footfoot.co/forum/' +
                      forum._id +
                      '/' +
                      forum.title
                        .replace(' ?', '')
                        .split(' ')
                        .join('-')
                        .replace(/\s/g, '')
                    "
                    :title="forum.title"
                    :description="forum.title"
                    :quote="forum.title"
                    hashtags="contest,football,pronos,news"
                    twitter-user="InsidersFoot"
                  >
                    <i class="fa fa-twitter">&nbsp &nbsp</i>
                  </ShareNetwork>

                  <ShareNetwork
                    network="sms"
                    class="mobileOnly"
                    :url="
                      'https://www.footfoot.co/forum/' +
                      forum._id +
                      '/' +
                      forum.title
                        .replace(' ?', '')
                        .split(' ')
                        .join('-')
                        .replace(/\s/g, '')
                    "
                    :title="forum.title"
                    :description="forum.title"
                    :quote="forum.title"
                    hashtags="contest,football,pronos,news"
                    twitter-user="InsidersFoot"
                  >
                    <i class="far fa-comment-dots">&nbsp &nbsp</i>
                  </ShareNetwork>

                  <ShareNetwork
                    network="messenger"
                    class="mobileOnly"
                    :url="
                      'https://www.footfoot.co/forum/' +
                      forum._id +
                      '/' +
                      forum.title
                        .replace(' ?', '')
                        .split(' ')
                        .join('-')
                        .replace(/\s/g, '')
                    "
                    :title="forum.title"
                    :description="forum.title"
                    :quote="forum.title"
                    hashtags="contest,football,pronos,news"
                    twitter-user="InsidersFoot"
                  >
                    <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                  </ShareNetwork>
                  <ShareNetwork
                    network="whatsapp"
                    :url="
                      'https://www.footfoot.co/forum/' +
                      forum._id +
                      '/' +
                      forum.title
                        .replace(' ?', '')
                        .split(' ')
                        .join('-')
                        .replace(/\s/g, '')
                    "
                    :title="forum.title"
                    :description="forum.title"
                    :quote="forum.title"
                    hashtags="contest,football,pronos,news"
                    twitter-user="InsidersFoot"
                  >
                    <i class="fa fa-whatsapp">&nbsp &nbsp</i>
                  </ShareNetwork>
                  <a
                    class="pointer"
                    v-clipboard:success="handleSuccess"
                    v-clipboard="
                      'https://www.footfoot.co/forum/' +
                      forum._id +
                      '/' +
                      forum.title
                        .replace(' ?', '')
                        .split(' ')
                        .join('-')
                        .replace(/\s/g, '')
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
                  @click="iLikeForumComment(reply)"
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
    </div>

    <div class="box">
      <div class="card-content bg-light">
        <div class="displayUploadImage" v-if="uploadImage">
          <button
            type="button"
            name="delete"
            class="delete is-warning"
            @click="removeImage"
          ></button>
          <img loading="lazy" :src="uploadImage" />
        </div>
        <div class="media">
          <div v-if="!mobile" class="desktopOnly">
            <div class="field">
              <div class="control">
                <div
                  class="quill-editor"
                  :content="content"
                  @change="onEditorChange($event)"
                  v-quill:myQuillEditor="editorOption"
                ></div>
              </div>
            </div>
            <div class="level">
              <div class="level-item repondreReply">
                <button
                  id="babble-submit"
                  @click="postBabble(babbleReply)"
                  class="button is-outlined buttonBet"
                >
                  <i class="mdi mdi-telegram mdi-36px"></i>
                </button>
              </div>
            </div>
          </div>
          <div v-if="mobile" class="mobileOnly">
            <publish-forumreplym
              @changeBabbles="changeBabbles"
              :forum="forum"
            ></publish-forumreplym>
          </div>
        </div>
      </div>
    </div>

    <div v-if="modalBabble" class="modalBoxNoPad">
      <b-modal :active.sync="isCardModalActiveComment">
        <div>
          <div class="firstModalWrap box">
            <div class="box">
              <div v-if="modalBabble.babbleImg" class="card-image imageChart">
                <figure class="image imageBabble">
                  <img
                    loading="lazy"
                    :src="modalBabble.babbleImg"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div v-if="modalBabble.babbleVideo" class="card-image imageChart">
                <vue-plyr>
                  <div class="plyr__video-embed">
                    <iframe
                      loading="lazy"
                      :src="
                        modalBabble.babbleVideo +
                        '?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1'
                      "
                      allowfullscreen
                      allowtransparency
                    ></iframe>
                  </div>
                </vue-plyr>
              </div>

              <article class="media">
                <figure class="media-left picProfileBabble">
                  <div class="image is-32x32 is-circle">
                    <nuxt-link :to="'/dashboard/' + modalBabble.user" class>
                      <img
                        loading="lazy"
                        class="imgProfile"
                        :src="modalBabble.user.picProfile"
                        alt="Image"
                      />
                    </nuxt-link>
                  </div>
                </figure>

                <div class="tweet-meta">
                  <nuxt-link :to="'/dashboard/' + modalBabble.user" class>
                    <strong>{{ modalBabble.user.username }}</strong>
                  </nuxt-link>
                  <small class="media-right has-text-grey-light"> </small>
                </div>
              </article>
              <div class="media-content">
                <div class="content">
                  <h2 class="quill-code tweet-body has-text-grey babble-body">
                    <code v-html="modalBabble.babble"></code>
                  </h2>
                </div>
                <nav class="media-right foOt">
                  <div class="level-left sociaSh has-text-grey-light">
                    <div>
                      <ShareNetwork
                        network="facebook"
                        :url="
                          'https://www.footfoot.co/forum/' +
                          forum._id +
                          '/' +
                          forum.title
                            .replace(' ?', '')
                            .split(' ')
                            .join('-')
                            .replace(/\s/g, '')
                        "
                        :title="forum.title"
                        :description="forum.title"
                        :quote="forum.title"
                        hashtags="contest,football,pronos,news"
                        twitter-user="InsidersFoot"
                      >
                        <i class="fa fa-facebook">&nbsp &nbsp</i>
                      </ShareNetwork>
                      <ShareNetwork
                        network="twitter"
                        :url="
                          'https://www.footfoot.co/forum/' +
                          forum._id +
                          '/' +
                          forum.title
                            .replace(' ?', '')
                            .split(' ')
                            .join('-')
                            .replace(/\s/g, '')
                        "
                        :title="forum.title"
                        :description="forum.title"
                        :quote="forum.title"
                        hashtags="contest,football,pronos,news"
                        twitter-user="InsidersFoot"
                      >
                        <i class="fa fa-twitter">&nbsp &nbsp</i>
                      </ShareNetwork>

                      <ShareNetwork
                        network="sms"
                        class="mobileOnly"
                        :url="
                          'https://www.footfoot.co/forum/' +
                          forum._id +
                          '/' +
                          forum.title
                            .replace(' ?', '')
                            .split(' ')
                            .join('-')
                            .replace(/\s/g, '')
                        "
                        :title="forum.title"
                        :description="forum.title"
                        :quote="forum.title"
                        hashtags="contest,football,pronos,news"
                        twitter-user="InsidersFoot"
                      >
                        <i class="far fa-comment-dots">&nbsp &nbsp</i>
                      </ShareNetwork>

                      <ShareNetwork
                        network="messenger"
                        class="mobileOnly"
                        :url="
                          'https://www.footfoot.co/forum/' +
                          forum._id +
                          '/' +
                          forum.title
                            .replace(' ?', '')
                            .split(' ')
                            .join('-')
                            .replace(/\s/g, '')
                        "
                        :title="forum.title"
                        :description="forum.title"
                        :quote="forum.title"
                        hashtags="contest,football,pronos,news"
                        twitter-user="InsidersFoot"
                      >
                        <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                      </ShareNetwork>
                      <ShareNetwork
                        network="whatsapp"
                        :url="
                          'https://www.footfoot.co/forum/' +
                          forum._id +
                          '/' +
                          forum.title
                            .replace(' ?', '')
                            .split(' ')
                            .join('-')
                            .replace(/\s/g, '')
                        "
                        :title="forum.title"
                        :description="forum.title"
                        :quote="forum.title"
                        hashtags="contest,football,pronos,news"
                        twitter-user="InsidersFoot"
                      >
                        <i class="fa fa-whatsapp">&nbsp &nbsp</i>
                      </ShareNetwork>
                      <a
                        class="pointer"
                        v-clipboard:success="handleSuccess"
                        v-clipboard="
                          'https://www.footfoot.co/forum/' +
                          forum._id +
                          '/' +
                          forum.title
                            .replace(' ?', '')
                            .split(' ')
                            .join('-')
                            .replace(/\s/g, '')
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
                        />
                      </span>
                      <small class="favicon">{{
                        modalBabble.reply.length
                      }}</small>
                    </a>
                    <a
                      @click="iLikeForumComment(modalBabble)"
                      class="level-item has-text-grey-light"
                    >
                      <span class="icon is-medium">
                        <img
                          loading="lazy"
                          class="clap"
                          src="~assets/images/clap.svg"
                        />
                      </span>
                      <small>{{ modalBabble.like.length }}</small>
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div v-if="modalBabble.reply">
            <div
              v-for="(reply, index) in modalBabble.reply"
              :key="index"
              class="box"
            >
              <article class="media">
                <figure class="media-left picProfileBabble">
                  <div class="image is-32x32 is-circle">
                    <nuxt-link :to="'/dashboard/' + reply.user._id" class>
                      <img
                        loading="lazy"
                        class="imgProfile"
                        :src="reply.user.picProfile"
                        alt="Image"
                      />
                    </nuxt-link>
                  </div>
                </figure>

                <div class="tweet-meta">
                  <nuxt-link :to="'/dashboard/' + reply.user._id" class>
                    <strong>{{ reply.username }}</strong>
                  </nuxt-link>
                  <small class="media-right has-text-grey-light"></small>
                </div>
              </article>
              <div class="media-content">
                <div class="content">
                  <h2 class="quill-code tweet-body has-text-grey babble-body">
                    <p v-html="addLinksToHttp(reply.babble)"></p>
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div class="box card-content bg-light">
            <div class="media">
              <div class="media-content">
                <div>
                  <div class="field">
                    <div class="control">
                      <textarea-autosize
                        class="autoResizeTextarea textearea"
                        :placeholder="'répond à ' + modalBabble.user.username"
                        ref="myTextarea"
                        v-model="babbleText"
                        :min-height="10"
                        :max-height="1000"
                      />
                    </div>
                  </div>
                  <div class="level modalLevelReply">
                    <button
                      id="babble-submit"
                      @click="postReplyBabble(modalBabble)"
                      class="button is-outlined is-primary"
                    >
                      <i class="mdi mdi-telegram mdi-36px"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { sendForumReply, deleteForumReply } from "@/server/api";
import { postLikeForumReply } from "@/server/api";
import { sendForumReplyComment } from "@/server/api";
import { postLikeForum } from "@/server/api";
import moment from "moment";

import { followInsider, unfollowInsider } from "@/server/apiDashboard";
export default {
  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      uploadImage: "",
      isCardModalActiveComment: false,
      isShareChartActive: false,
      babbleReply: "",
      reply: "",
      babbleText: "",
      userReply: "",
      modalBabble: "",
      activeItem: "all",
      videoId: "videoId",
      babbleImage: "",
      babbleUrl: "",
      noSticker: false,
      width: 490,
      height: 245,
      quality: 1,
      isShareVideoActive: false,
      babbleVideo: "",
      postPost: false,
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],

            [
              {
                header: [1, 2, 3, false],
              },
            ],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["image", "video"],
          ],
          imageResize: true,
        },
        placeholder: "Quel est ton avis ?",
      },
    };
  },
  components: {
    displayVideo: () => import("@/components/modal/displayVideo"),
    PublishForumreplym: () =>
      import("@/components/userpage/PublishForumreplym"),
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
    charactersLeft() {
      var char = this.babbleText.length,
        limit = 16180;
      return limit - char;
    },
  },
  props: {
    forum: "",
    watchItem: "",
  },

  methods: {
    handleSuccess() {
      this.$buefy.dialog.alert("Le lien a été copié! Plus qu'à le partager 😋");
    },
    follow(leaderbord) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        followInsider(leaderbord._id).then((resp) => {
          this.$auth.fetchUser();
        });
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },
    unfollow(leaderbord) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        unfollowInsider(leaderbord._id).then((resp) => {
          this.$auth.fetchUser();
        });
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },
    eraseForumReply(babble) {
      deleteForumReply(babble._id).then(() => {
        this.$emit("changeBabbles");
      });
    },
    onEditorChange({ editor, html, text }) {
      if (html) {
        this.content = html;
      }
    },

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var uploadImage = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.uploadImage = e.target.result;
      };
      reader.readAsDataURL(file, 0);
    },
    removeImage: function (e) {
      this.uploadImage = "";
    },
    moment: function (time) {
      return moment(time);
    },

    ////iLikeForum(babble) {
    ////  postLikeForum(babble._id).then(() => {
    ////    this.$emit("changeBabbles");
    ////  });
    ////  //.catch(next);
    ////},
    iLikeForumComment(reply) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        postLikeForumReply(reply._id).then(() => {
          this.$emit("changeBabbles");
        });
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },
    shareVideo() {
      this.isShareVideoActive = true;
    },
    postVideoBabble() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        this.babbleText = this.babbleText + " ";
        this.postBabble();
        this.isShareVideoActive = false;
      } else {
        this.$router.push("/signup");
      }
    },
    postBabble(babbleReply) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        this.babbleText = this.content;
        if (this.postPost === true) {
        } else {
          this.postPost = true;
          this.babbleUrl = this.uploadImage;
          sendForumReply(
            this.babbleText,
            this.forum._id,
            this.babbleUrl,
            this.babbleVideo
          ).then(() => {
            this.postPost = false;
            this.content = "";
            this.babbleText = "";
            this.uploadImage = "";
            this.babbleUrl = "";
            this.babbleVideo = "";
            this.$emit("changeBabbles");
          });
        }
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },
    changeBabbles() {
      this.$emit("changeBabbles");
    },
    postReplyBabble(modalBabble) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        sendForumReplyComment(
          this.babbleText,
          modalBabble._id,
          this.watchItem ? this.watchItem.position : ""
        ).then(() => {
          this.babbleText = "";
          this.isCardModalActiveComment = false;
          this.$emit("changeBabbles");
        });
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },
    showModal(reply) {
      this.pause;
      this.modalBabble = reply;
      this.isCardModalActiveComment = true;
    },

    ////Take into parameter a string and return the same string with HTML links
    ////Ex: "Hello #axa" => "Hello <a href='/team/axa'>#axas</a>"
    ////Optimisation => rajouter un event listener qui sera appeler au click et fera un push
    ////ou regarder doc dynamic compile router link
    ////addLinksToBabble(babbleString) {
    ////  return babbleString.replace(
    ////    /#(\w+)(\W|$)/g,
    ////    '<a href="/stocks/$1">#$1$2</a>'
    ////  );
    ////},
    addLinksToHttp(inputText) {
      var replacedText, replacePattern1, replacePattern2, replacePattern3;
      ////Take into parameter a string and return the same string with HTML links
      ////Ex: "Hello #axa" => "Hello <a href='/team/axa'>#axa</a>"
      inputText = inputText.replace(
        /#(([a-zA-Z0-9\.])+@[a-zA-Z\_]+)(\W|$)/g,
        /////#(\w+)(\W|$)/g,
        ////'<a href="/team/$1">#$1$2</a>'
        '<a href="/team/$1">#$1 -</a>'
      );
      inputText = inputText.replace(/(?:\r\n|\r|\n)/g, "<br />");
      //URLs starting with http://, https://, or ftp://
      replacePattern1 =
        /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(
        replacePattern1,
        '<a href="$1" target="_blank">$1</a>'
      );

      //URLs starting with "www." (without //before it, or it'd re-link the ones done above).
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
.delete {
  width: 20px !important;
}
.firstModalWrap > .box {
  margin-bottom: 0.75rem !important;
}
.forumBox > .tweet {
  padding: 0 !important;
  margin-bottom: 10px;
}
.forumBox > .tweet > .media-content {
  padding: 0 !important;
}
.imageModal {
  padding-top: 5px;
  padding-left: 5px;
}
.modalLevelReply {
  justify-content: center !important;
}
.babblesField > div > .box {
  padding: 0.25rem !important;
  margin-top: 0.25rem !important;
}
.box {
  padding: 0.25rem !important;
}
#forumMainCadre {
  padding: 0.25rem !important;
}
.forumTitleH1 {
  display: flex;
}
.forumTitleH1 > figure {
  min-width: 10% !important;
  width: 10%;
  display: flex;
  justify-content: center;
  margin: auto 0;
}
.forumTitleH1 > figure > img {
  width: auto;
  height: 40px;
  margin-right: 1rem;
}
.forumTitle > strong {
  width: 90% !important;
  color: #192b41;
  font-weight: 500;
  word-break: break-word;
  font-size: 1.8rem;
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
a {
  color: #192b41 !important;
}
.level-right {
  width: 35%;
  margin: 0px !important;
}
.level-left {
  width: 60%;
  margin: 0px !important;
}
.bg-light {
  background-color: #eef1f7;
}
.fa {
  text-align: center;
  vertical-align: top;
  color: #192b41;
}
.button {
  background-color: #192b41 !important;
  color: #fff !important;
  box-shadow: 0 0 0 0.125em #192b41 !important;
  border-color: #192b41 !important;
}
.button:hover,
.button:focus {
  background-color: #fff !important;
  border-color: #192b41 !important;
  color: #192b41 !important;
}

#userUsername {
  color: #192b41 !important;
}
a {
  color: #192b41;
}
.babble-body {
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
}
.content {
  margin-bottom: 0rem !important;
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
.media-content {
  padding-top: 5px;
}
.card-content {
  padding: 0rem;
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
.level {
  display: flex;
  height: 3em;
  align-items: center;
  justify-content: space-between;
}
.verified {
  height: 15px;
}

.box > .tweet {
  padding: 0.25rem !important;
  padding-bottom: 0px !important;
}
.videoBabble {
  padding-bottom: 0px !important;
}
@media screen and (max-width: 768px) {
  .forumTitleH1 > figure {
    min-width: 15% !important;
    width: 15%;
  }
  .forumTitleH1 > figure > img {
    height: 45px;
    margin: 0.5rem -0.5rem 0.5rem 0.5rem;
  }
  .forumTitle {
    margin-bottom: 0;
    padding: 0rem;
    padding-left: 1rem;
    align-items: CENTER;
    display: FLEX;
    width: 100%;
  }
  .forumTitle > strong {
    font-size: 1.2rem;
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
  .level-item {
    margin-right: 10px;
  }
  .level-right {
    display: flex;
  }
  .level-item:not(:last-child) {
    margin-bottom: 0px;
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
  }
  .level-item:not(:last-child) {
    margin-bottom: 0px;
  }
  .level-left {
    display: flex;
  }
  .level-item {
    margin-right: 10px;
  }
  .level-right {
    display: flex;
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
}
</style>
