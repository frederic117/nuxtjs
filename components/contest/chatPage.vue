<template>
  <div>
    <b-loading
      v-if="loading === true"
      :is-full-page="true"
      :active.sync="loading"
      :can-cancel="false"
    ></b-loading>
    <div
      v-if="
        $store.state.auth.user &&
        (userTospeak ||
          (conversationWithinsider && conversationWithinsider.length > 0))
      "
      class="chatWrap wrapper"
    >
      <div
        @click="footerVisible"
        class="inner"
        :class="{
          innerFullheight: maskBottomnav,
          reduceInner: isChatreduce,
        }"
        id="inner"
      >
        <h1
          v-if="isChatreduce"
          class="
            has-text-centered has-text-constes
            is-bold is-size-5
            box
            insiderWrap
          "
        >
          <div
            @click="reduceChat"
            :class="{
              'shake-vertical': newMessreduc,
            }"
            class="butWrap"
            v-if="!mobile"
          >
            <i v-if="newMessreduc" class="mdi mdi-bell mdi-24px pointer"></i>
          </div>
          <div class="pointer" @click="reduceChat">
            <i @click="goBack" class="mdi mdi-keyboard-return"></i>
            {{
              userTospeak
                ? userTospeak.username
                : conversationWithinsider[0].users.filter(
                    (u) => u._id != $auth.user._id
                  )[0].username
            }}

            <img
              v-if="userOnline"
              loading="lazy"
              class="option__image is-12x12"
              src="~assets/images/online.png"
              alt="online"
            />
            <i
              v-if="userOnline"
              @click="openVideo()"
              class="pointer fas fa-video"
            ></i>
          </div>
          <div class="butWrap" v-if="!mobile">
            <i
              v-if="!isChatreduce"
              @click="reduceChat"
              class="pointer fa fa-minus-square-o"
              aria-hidden="true"
            ></i>
            <i
              v-if="isChatreduce"
              @click="reduceChat"
              class="pointer fa fa-plus-square-o"
              aria-hidden="true"
            ></i>
            <i
              @click="oncloseChat"
              class="pointer fa fa-window-close-o"
              aria-hidden="true"
            ></i>
          </div>
        </h1>
        <h1
          v-else
          class="
            has-text-centered has-text-constes
            is-bold is-size-5
            box
            insiderWrap
          "
        >
          <div class="butWrap" v-if="!mobile"></div>
          <div>
            <i @click="goBack" class="mdi mdi-keyboard-return"></i>

            {{
              userTospeak
                ? userTospeak.username
                : conversationWithinsider[0].users.filter(
                    (u) => u._id != $auth.user._id
                  )[0].username
            }}

            <img
              v-if="userOnline"
              loading="lazy"
              class="option__image is-12x12"
              src="~assets/images/online.png"
              alt="online"
            />
            <i
              v-if="userOnline"
              @click="openVideo()"
              class="pointer fas fa-video"
            ></i>
          </div>
          <div class="butWrap" v-if="!mobile">
            <i
              v-if="!isChatreduce"
              @click="reduceChat"
              class="pointer fa fa-minus-square-o"
              aria-hidden="true"
            ></i>
            <i
              v-if="isChatreduce"
              @click="reduceChat"
              class="pointer fa fa-plus-square-o"
              aria-hidden="true"
            ></i>
            <i
              @click="oncloseChat"
              class="pointer fa fa-window-close-o"
              aria-hidden="true"
            ></i>
          </div>
        </h1>
        <div
          v-if="!isChatreduce"
          class="content"
          :class="{
            contentExpanse: maskBottomnav,
          }"
          id="content"
        >
          <div
            v-for="(mess, index) in conversationWithinsider"
            :key="index"
            :id="`a${index}`"
          >
            <div
              v-if="mess.writtenBy != $auth.user._id"
              class="message-wrapper them"
            >
              <div class="headMess">
                <span class="dateAffiche">
                  {{ moment(mess.created_at).format("DD/MM/YYYY HH:mm") }}</span
                >
              </div>
              <div class="avatar circle-wrapper animated bounceIn">
                <img
                  v-if="
                    mess.users &&
                    mess.users.filter((u) => u._id == mess.writtenBy).length > 0
                  "
                  class="pointer picProfile"
                  :src="
                    mess.users.filter((u) => u._id == mess.writtenBy)[0]
                      .picProfile
                  "
                  alt="picProfile"
                />
              </div>
              <div class="text-wrapper animated fadeIn">
                <div v-if="mess.postVideo && mess.postImg">
                  <button class="button is-medium is-pdf">
                    <a :href="mess.postVideo">{{
                      langSelected === "EN"
                        ? "Download PDF."
                        : "Télécharger le PDF."
                    }}</a>
                  </button>
                  <img loading="lazy" :src="mess.postImg" />
                </div>

                <div
                  v-else-if="!mess.postImg && mess.postVideo"
                  class="card-image imageChart videoBabble"
                >
                  <display-video :video="mess.postVideo"></display-video>
                </div>
                <img
                  v-else-if="mess.postImg"
                  loading="lazy"
                  :src="mess.postImg"
                />
                <span v-if="mess.message" v-html="mess.message"></span>
              </div>
            </div>
            <div
              v-if="mess.writtenBy === $auth.user._id"
              class="message-wrapper me"
            >
              <div class="headMess">
                <i
                  v-if="mess.openBy.length > 1 || userTospeakonpage"
                  class="fa fa-check-square-o"
                  aria-hidden="true"
                ></i>
                <span class="dateAffiche">
                  {{ moment(mess.created_at).format("DD/MM/YYYY HH:mm") }}</span
                >
                <button
                  type="button"
                  name="delete"
                  class="delete deleteWarn is-warning"
                  @click="erasePost(mess)"
                ></button>
              </div>
              <div class="circle-wrapper animated bounceIn">
                <img
                  class="manImg"
                  :src="$store.state.auth.user.picProfile"
                  alt="picProfile"
                />
              </div>
              <div class="text-wrapper animated fadeIn">
                <div v-if="mess.postVideo && mess.postImg">
                  <button class="button is-medium is-pdf">
                    <a :href="mess.postVideo">{{
                      langSelected === "EN"
                        ? "Download PDF."
                        : "Télécharger le PDF."
                    }}</a>
                  </button>
                  <img loading="lazy" :src="mess.postImg" />
                </div>

                <div
                  v-else-if="!mess.postImg && mess.postVideo"
                  class="card-image imageChart videoBabble"
                >
                  <display-video :video="mess.postVideo"></display-video>
                </div>
                <img
                  v-else-if="mess.postImg"
                  loading="lazy"
                  :src="mess.postImg"
                />
                <span v-if="mess.message" v-html="mess.message"></span>
              </div>
            </div>
          </div>

          <p id="endContent"></p>
        </div>
      </div>

      <div
        v-if="!isChatreduce"
        class="field"
        :class="{
          fieldExpanse: maskBottomnav,
        }"
      >
        <span
          class="typing"
          v-if="
            isCurrentlyTypingTodisplay &&
            isCurrentlyTypingTodisplay.length > 0 &&
            userTospeakonpage == true
          "
        >
          {{
            userTospeak
              ? userTospeak.username
              : conversationWithinsider[0].users.filter(
                  (u) => u._id != $auth.user._id
                )[0].username
          }}
          {{ langSelected === "EN" ? "is typing" : "écrit" }}
        </span>
        <div class="fieldChild">
          <div v-if="!uploadImage" class="imgIconWrapper">
            <a class="imgIconWrapper">
              <input
                type="file"
                class="hide inputfile"
                id="upload"
                @change="onFileChange"
              />
              <label v-if="!uploadImage" class="imgIconWrapper" for="upload">
                <i class="mdi mdi-paperclip mdi-36px"></i>
              </label>
            </a>
          </div>

          <div
            @click="scrollToEndtwo"
            class="control has-icons-right input-msg is-clearfix"
          >
            <textarea-autosize
              class="autoResizeTextarea sc-user-input--text chatInstan"
              placeholder="..."
              ref="myTextarea"
              v-html="newMess"
              v-model="newMess"
              :min-height="45"
            />
          </div>
          <div @click="sendNewMess" class="sendIconWrapper" id>
            <a class="sendIconWrapper">
              <label class="sendIconWrapper">
                <i class="mdi mdi-telegram mdi-36px"></i>
              </label>
            </a>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      :can-cancel="false"
      class="modalImageWrapper"
      :active.sync="modalImage"
    >
      <div class="modal-card modalImage">
        <progress
          v-if="progress"
          class="progress is-success"
          :value="progress"
          max="100"
        >
          {{ progress }}
        </progress>
        <div v-if="pdfToImage" class="displayUploadImage">
          <div>
            <button
              type="button"
              name="delete"
              class="delete is-warning"
              @click="removeImage"
            ></button>
            <client-only v-if="pdfTransformDone == false">
              <pdf-pageload
                id="imageToUpload"
                @imgReady="transformToImg($event)"
                class="pdfImage"
                :pdfToLoad="pdfToImage"
              ></pdf-pageload>
            </client-only>
            <img loading="lazy" v-else :src="uploadImage" />
          </div>
        </div>

        <div class="displayUploadImage" v-else-if="uploadImage">
          <div>
            <button
              type="button"
              name="delete"
              class="delete is-warning"
              @click="removeImage"
            ></button>
            <img loading="lazy" :src="uploadImage" class="mediacontentModal" />
          </div>
        </div>
        <div v-else>
          <div class="displayUploadImage">
            <button
              type="button"
              name="delete"
              class="delete is-warning"
              @click="removeVideo"
            ></button>
            <div
              v-if="uploadVideo"
              class="card-image imageChart videoBabble mediacontentModal"
            >
              <div
                v-if="uploadVideo.toLowerCase().includes('.mp3')"
                class="lecteur-audio-songs"
              >
                <vue-plyr>
                  <audio>
                    <source :src="uploadVideo" />
                    Your browser does not support the audio element.
                  </audio>
                </vue-plyr>
              </div>
              <vue-plyr v-if="uploadVideo.toLowerCase().includes('youtu')">
                <div class="plyr__video-embed">
                  <iframe
                    loading="lazy"
                    :src="
                      uploadVideo +
                      '?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1'
                    "
                    allowfullscreen
                    allowtransparency
                  ></iframe>
                </div>
              </vue-plyr>
              <vue-plyr v-else-if="uploadVideo.toLowerCase().includes('.mp4')">
                <video>
                  <source :src="uploadVideo" type="video/mp4" />
                </video>
              </vue-plyr>
              <vue-plyr v-else-if="uploadVideo.toLowerCase().includes('.ogg')">
                <video>
                  <source :src="uploadVideo" type="video/ogg" />
                </video>
              </vue-plyr>
              <vue-plyr v-else-if="uploadVideo.toLowerCase().includes('.webm')">
                <video>
                  <source :src="uploadVideo" type="video/webm" />
                </video>
              </vue-plyr>
              <!-- <videoLiveComp
							v-else-if="uploadVideo.toLowerCase().includes('m3u')"
							:videoIndex="'videoIndex'"
							:srcVideo="uploadVideo"
						></videoLiveComp>-->
              <div
                v-else-if="
                  uploadVideo.toLowerCase().includes('ninjastream') ||
                  uploadVideo.toLowerCase().includes('dood')
                "
                class="video-wrap"
              >
                <vue-plyr>
                  <div class="plyr__video-embed">
                    <iframe
                      loading="lazy"
                      :src="
                        uploadVideo
                          .replace('autoplay=true', 'autoplay=false')
                          .replace('autoplay-mute=1', 'autoplay-mute=0')
                      "
                      controls
                      crossorigin
                      allowfullscreen
                      allowtransparency
                    ></iframe>
                  </div>
                </vue-plyr>
              </div>
              <div
                v-else-if="
                  !uploadVideo.includes('sporttube') &&
                  (uploadVideo.toLowerCase().includes('embed') ||
                    uploadVideo.toLowerCase().includes('player') ||
                    uploadVideo.toLowerCase().includes('allfoot.') ||
                    uploadVideo.toLowerCase().includes('stream'))
                "
                class="video-wrap"
              >
                <vue-plyr>
                  <div class="plyr__video-embed">
                    <iframe
                      loading="lazy"
                      :src="
                        uploadVideo.toLowerCase().includes('player')
                          ? uploadVideo
                              .replace('player/html', 'embed')
                              .replace('autoplay=true', 'autoplay=false')
                              .replace('autoplay-mute=1', 'autoplay-mute=0')
                          : uploadVideo
                              .replace('autoplay=true', 'autoplay=false')
                              .replace('autoplay-mute=1', 'autoplay-mute=0')
                      "
                      controls
                      crossorigin
                      allowfullscreen
                      allowtransparency
                    ></iframe>
                  </div>
                </vue-plyr>
              </div>
              <vue-plyr v-else-if="uploadVideo.toLowerCase().includes('mpd')">
                <video :srcVideo="uploadVideo"></video>
              </vue-plyr>

              <div v-else>
                <client-only>
                  <link-preview
                    class="linkPreviewWrap"
                    @successLink="successLink($event)"
                    @problemLink="problemLink"
                    :url="uploadVideo"
                  ></link-preview>
                </client-only>
              </div>
            </div>
          </div>
        </div>

        <div class="fieldModal">
          <div class="control has-icons-right input-msg is-clearfix">
            <textarea-autosize
              class="autoResizeTextarea textModalInputpIC"
              placeholder="..."
              ref="myTextarea"
              v-html="newMess"
              v-model="newMess"
              :min-height="45"
              :max-height="700"
            />
          </div>
          <div @click="sendNewMess" class="sendIconWrapperModal" id>
            <a class="sendIconWrapperModal">
              <label class="sendIconWrapperModal">
                <i class="mdi mdi-telegram mdi-36px"></i>
              </label>
            </a>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import {
  sendFileToAws,
  postPrivatechat,
  deleteAPrivatechat,
  putallPrivatechatsToreadbyUser,
  getAllprivatechatbetweenUsers,
} from "@/server/apiContest";

export default {
  sockets: {
    connect() {},
  },
  components: {
    displayVideo: () => import("@/components/modal/displayVideo"),
    linkPreview: () => import("@/components/userpage/linkPreview"),
    videoLiveComp: () =>
      import("@/components/contest/ContestMain/videoLiveComp"),

    PlaceholderComponent: () =>
      import("@/components/contest/PlaceholderComponent"),
    pdfPage: () => {
      if (!process.client) {
        return {
          component: PlaceholderComponent,
        };
      } else {
        return {
          component: import("@/components/contest/pdfPage"),
        };
      }
    },
    pdfPageload: () => {
      if (!process.client) {
        return {
          component: PlaceholderComponent,
        };
      } else {
        return {
          component: import("@/components/contest/pdfPageload"),
        };
      }
    },
  },

  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      newMess: "",
      interval: "",
      postPost: false,
      sapUser: "",
      loading: false,
      uploadImage: "",
      pdfToImage: "",
      modalImage: false,
      pdfTransformDone: false,
      formatPng: "",
      babbleVideo: "",
      progress: "",
      uploadVideo: "",
      source: "",
      linkText: "",
      linkTitle: "",
      babbleUrl: "",
      userOnline: false,
      isChatreduce: false,
      newMessreduc: false,
      isCurrentlyTyping: [],
      isCurrentlyTypingTodisplay: [],
      typingtime: "",
      actualTime: moment().local().format("X"),
      userTospeakonpage: false,
    };
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    maskBottomnav() {
      return this.$store.state.var.maskBottomnav;
    },
    usersOnlinelist() {
      return this.$store.state.var.usersOnlinelist;
    },
    userTospeak() {
      return this.$store.state.var.userTospeak;
    },
    conversationWithinsider() {
      return this.$store.state.var.conversationWithinsider;
    },
  },
  mounted() {
    this.scrollToEnd();
    this.$store.commit("var/maskBottomnav", false);

    this.addOneSecondToActualTimeEverySecond();
    let users = `${this.userTospeak._id},${this.$auth.user._id}`;
    putallPrivatechatsToreadbyUser(users).then((resp) => {});
    // this.scrollToEnd();
    if (this.sockets) {
      this.sockets.unsubscribe("chatTyping" + this.$auth.user._id);
      this.sockets.subscribe("chatTyping" + this.$auth.user._id, (typing) => {
        if (typing.user && typing.user._id == this.userTospeak._id) {
          let typingToadd = typing;
          this.isCurrentlyTyping.push(typingToadd);
          this.isCurrentlyTyping = [
            ...new Map(
              this.isCurrentlyTyping.map((item) => [item.user._id, item])
            ).values(),
          ];
        }
      });
      this.sockets.unsubscribe("chat" + this.$auth.user._id);
      this.sockets.subscribe("chat" + this.$auth.user._id, (data) => {
        if (
          data &&
          data.message.users.map((u) => u._id).includes(this.userTospeak._id)
        ) {
          this.$store.commit("var/pushconversationWithinsider", data.message);
          if (this.isChatreduce) {
            this.newMessreduc = true;
          } else {
            putallPrivatechatsToreadbyUser(users).then((resp) => {});
          }

          if (this.isCurrentlyTyping && this.isCurrentlyTyping.length > 0) {
            this.isCurrentlyTyping = this.isCurrentlyTyping.filter(
              (item) => item.user._id != data.message.writtenBy
            );
            this.isCurrentlyTypingTodisplay = this.isCurrentlyTyping.filter(
              (item) => item.user._id != data.message.writtenBy
            );
          }
        }
      });
      this.sockets.unsubscribe("userTospeakonpage" + this.$auth.user._id);
      this.$socket.emit("userTospeakonpage", {
        user: this.$auth.user._id,
        to: this.userTospeak._id,
        online: true,
      });
      this.sockets.subscribe(
        "userTospeakonpage" + this.$auth.user._id,
        (userTospeakonpage) => {
          if (
            userTospeakonpage.user == this.userTospeak._id &&
            userTospeakonpage.online &&
            this.userTospeakonpage == false
          ) {
            this.userTospeakonpage = true;
            this.$socket.emit("userTospeakonpage", {
              user: this.$auth.user._id,
              to: this.userTospeak._id,
              online: true,
            });
          }
          if (
            userTospeakonpage.user == this.userTospeak._id &&
            userTospeakonpage.offline
          ) {
            this.userTospeakonpage = false;

            let users = `${this.userTospeak._id},${this.$auth.user._id}`;
            getAllprivatechatbetweenUsers(users).then(
              (conversationWithinsider) => {
                if (conversationWithinsider.length > 0) {
                  let conversationWithinsiderTocommit =
                    conversationWithinsider.sort(
                      (a, b) => new Date(a.created_at) - new Date(b.created_at)
                    );
                  this.$store.commit(
                    "var/conversationWithinsider",
                    conversationWithinsiderTocommit
                  );
                }
              }
            );
          }
        }
      );
    }
  },
  methods: {
    reduceChat() {
      if (this.isChatreduce) {
        let users = `${this.userTospeak._id},${this.$auth.user._id}`;
        putallPrivatechatsToreadbyUser(users).then((resp) => {
          this.$nuxt.$emit("getChatlist");
        });
        this.newMessreduc = false;
      } else {
        this.$nuxt.$emit("getChatlist");
      }
      this.isChatreduce = !this.isChatreduce;
      this.scrollToEnd();
    },
    openVideo() {
      this.$nuxt.$emit("openVideo", this.userTospeak);
    },
    oncloseChat() {
      if (!this.isChatreduce) {
        let users = `${this.userTospeak._id},${this.$auth.user._id}`;
        putallPrivatechatsToreadbyUser(users).then((resp) => {});
        this.$nuxt.$emit("closeChat", this.userTospeak._id);
      } else {
        let users = `${this.userTospeak._id},${this.$auth.user._id}`;
        putallPrivatechatsToreadbyUser(users).then((resp) => {});
        this.$nuxt.$emit("getChatlistCLose", this.userTospeak._id);
      }

      this.$store.commit("var/speak", "");
      this.$store.commit("var/maskBottomnav", false);
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
    goBack() {
      this.$router.push("/chat");
    },
    erasePost(event) {
      deleteAPrivatechat(event._id).then((resp) => {});
      let conversationWithinsidertopush = this.conversationWithinsider.filter(
        (c) => c._id != event._id
      );
      this.$store.commit(
        "var/conversationWithinsider",
        conversationWithinsidertopush
      );
    },

    problemLink() {
      this.babbleText = this.uploadVideo;
      this.uploadVideo = "";
      this.source = "";
      this.linkTitle = "";
      this.linkText = "";
      this.babbleUrl = "";
      this.$store.commit("var/maskBottomnav", false);
      //this.modalImage = false;
    },
    successLink(event) {
      this.babbleUrl = event.images ? event.images[0] : "";
      this.linkTitle = event.title ? event.title : this.problemLink();
      this.babbleText = event.description ? event.description : "";
      this.linkText = event.description ? event.description : "";
      this.source = event.url ? event.url : "";
      this.newMess = "";
    },

    removeImage: function (e) {
      this.babbleUrl = "";
      this.babbleVideo = "";
      this.pdfToImage = "";
      this.uploadImage = "";
      this.uploadVideo = "";
      this.modalImage = false;
      this.$store.commit("var/maskBottomnav", false);
    },
    removeVideo: function (e) {
      this.babbleText = "";
      this.babbleUrl = "";
      this.source = "";
      this.linkTitle = "";
      this.linkText = "";
      this.babbleVideo = "";
      this.pdfToImage = "";
      this.uploadImage = "";
      this.uploadVideo = "";
      this.newMess = "";
      this.modalImage = false;
      this.$store.commit("var/maskBottomnav", false);
    },

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      } else if (
        files[0].name.toLowerCase().includes(".m3u") ||
        files[0].name.toLowerCase().includes(".ogg") ||
        files[0].name.toLowerCase().includes(".mp4") ||
        files[0].name.toLowerCase().includes(".webm")
      ) {
        this.sendFile(files[0]);
      } else if (files[0].type.includes("pdf")) {
        this.sendFile(files[0]);
        var uploadImage = new Image();
        var reader = new FileReader();
        var vm = this;
        reader.onload = (e) => {
          vm.pdfToImage = e.target.result;
        };
        reader.readAsDataURL(files[0], 0);
        this.modalImage = true;
        this.$store.commit("var/maskBottomnav", true);
      } else if (
        files[0].name.toLowerCase().includes(".jpeg") ||
        files[0].name.toLowerCase().includes(".png") ||
        files[0].name.toLowerCase().includes(".jpg") ||
        files[0].name.toLowerCase().includes(".gif") ||
        files[0].name.toLowerCase().includes(".svg") ||
        files[0].name.toLowerCase().includes(".bmp") ||
        files[0].name.toLowerCase().includes(".jfif")
      ) {
        this.createImage(files[0]);
      } else {
        this.$buefy.dialog.alert("Ce format n'est pas supporté");
      }
    },
    createImage(file) {
      var uploadImage = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.uploadImage = e.target.result;
        fetch(e.target.result)
          .then((res) => res.blob())
          .then((blob) => {
            this.sendPdfImg(
              new File(
                [blob],
                this.$auth.user.username +
                  moment().format("DD/MM/YYYY à HH:mm") +
                  ".jpg",
                {
                  type: "image/jpeg",
                }
              )
            );
          });
      };
      reader.readAsDataURL(file, 0);
      this.modalImage = true;
      this.$store.commit("var/maskBottomnav", true);
    },
    async sendPdfImg(file) {
      let formData = new FormData();
      formData.append("file", file);
      sendFileToAws(formData, {}).then((resp) => {
        this.babbleUrl = resp.Location;
      });
    },
    async sendFile(file) {
      this.modalImage = true;
      this.$store.commit("var/maskBottomnav", true);
      let formData = new FormData();
      formData.append("file", file);
      sendFileToAws(formData, {
        onUploadProgress: (e) => {
          this.progress = Math.round((e.loaded * 100) / e.total);
        },
      }).then((resp) => {
        setTimeout(() => {
          if (
            resp.Location.toLowerCase().includes(".m3u") ||
            resp.Location.toLowerCase().includes(".ogg") ||
            resp.Location.toLowerCase().includes(".mp4") ||
            resp.Location.toLowerCase().includes(".webm")
          ) {
            this.uploadImage = "";
            this.babbleVideo = resp.Location;
            this.progress = "";
            this.uploadVideo = resp.Location;
          } else {
            this.uploadImage = resp.Location;
            this.babbleVideo = resp.Location;
            this.progress = "";
          }
        }, 1500);
      });
    },
    transformToImg(event) {
      fetch(event[0].toDataURL("image/jpeg"))
        .then((res) => res.blob())
        .then((blob) => {
          this.sendPdfImg(
            new File(
              [blob],
              this.$auth.user.username +
                moment().format("DD/MM/YYYY-HH:mm:ss") +
                ".jpg",
              {
                type: "image/jpeg",
              }
            )
          );
        });
    },

    moment: function (time) {
      return moment(time);
    },

    sendNewMess() {
      if (
        this.postPost === true ||
        (this.newMess === "" &&
          this.uploadImage === "" &&
          this.uploadVideo === "")
      ) {
      } else {
        let babble = "";
        this.postPost = true;
        babble = this.newMess
          .replace(/Ã¹/gi, "ù")
          .replace(/à´/gi, "ô")
          .replace(/Ã‡/gi, "Ç")
          .replace(/Â©/gi, "©")
          .replace(/Ãª/gi, "ê")
          .replace(/â€¦/gi, "...")
          .replace(/Ã¢/gi, "â")
          .replace(/Â«/gi, "«")
          .replace(/Â»/gi, "»")
          .replace(/Ã«/gi, "ë")
          .replace(/Ã§/gi, "ç")
          .replace(/â€™/gi, "'")
          .replace(/Ã©/gi, "é")
          .replace(/â€‹/gi, "")
          .replace(/Ã¨/gi, "è")
          .replace(/Ã®/gi, "î")
          .replace(/Ã/gi, "à")
          .replace(/Ã»/gi, "û")
          .replace(/Â°/gi, "°");
        babble = this.$sanitize(babble);
        babble = this.addLinksToHttp(babble);
        let message = {
          writtenBy: this.$auth.user._id,
          users: [
            this.userTospeak
              ? this.userTospeak._id
              : this.conversationWithinsider[0].message.writtenBy,
            this.$auth.user._id,
          ],
          message: babble,
          postImg: this.uploadImage,
          created_at: new Date(),
          openBy: this.$auth.user._id,
        };

        if (this.source) {
          if (this.source.includes("footfoot.co")) {
            let slice = this.source.indexOf("footfoot.co") + 11;
            this.source = this.source.slice(slice);
            if (this.babbleUrl) {
              message.message = `<a class="lireSurReply box" href="${this.source}"><span class='displayFlex'><img src="${this.babbleUrl}" class='insideChatimg'/><span><p id="titlelinkChat">${this.linkTitle}</p><p id="subtitlelinkChat">${this.linkText}</p></span></span></a>${babble}`;
            } else {
              message.message = `<a class="lireSurReply box" href="${this.source}"><span class='displayFlex'><span class="columnDirchat"><p id="titlelinkChat">${this.linkTitle}</p><p id="subtitlelinkChat">${this.linkText}</p></span></span></a>${babble}`;
            }
          } else {
            babble = babble ? `<span class="">${babble}</span>` : "";
            if (this.babbleUrl) {
              message.message = `<a class="lireSurReply box" target="_blank" href="${this.source}"><span class='displayFlex'><img src="${this.babbleUrl}" class='insideChatimg'/><span><p id="titlelinkChat">${this.linkTitle}</p><p id="subtitlelinkChat">${this.linkText}</p></span></span></a>${babble}`;
            } else {
              message.message = `<a class="lireSurReply box" target="_blank" href="${this.source}"><span class='displayFlex'><span class="columnDirchat"><p id="titlelinkChat">${this.linkTitle}</p><p id="subtitlelinkChat">${this.linkText}</p></span></span></a>${babble}`;
            }
          }
          message.postImg = "";
          message.postVideo = this.babbleVideo;
        } else if (this.uploadImage && this.babbleVideo) {
          message.message = babble + " ";
          message.postImg = this.babbleUrl;
          message.postVideo = this.babbleVideo;
        } else {
          message.postImg = this.babbleUrl;
          message.postVideo = this.uploadVideo;
          message.message =
            this.uploadVideo && babble.includes("http") ? " " : babble + " ";
        }
        this.scrollToEndtwo();
        //// message.postVideo = this.postVideo;
        postPrivatechat(message).then((data) => {
          this.newMess = "";
          this.$store.commit("var/maskBottomnav", false);
          this.$socket.emit("chat", data);
          this.babbleVideo = "";
          this.modalImage = false;
          this.postPost = false;
          this.uploadImage = "";
          this.uploadVideo = "";
          this.pdfToImage = "";
          this.postPost = false;
          this.source = "";
          this.linkText = "";
          this.linkTitle = "";
          this.babbleUrl = "";
          this.scrollToEndtwo();
        });
      }
    },
    footerVisible() {
      if (this.maskBottomnav) {
        this.$store.commit("var/maskBottomnav", !this.maskBottomnav);
        this.scrollToEnd();
      }
    },
    scrollToEndtwo: function () {
      if (
        this.conversationWithinsider &&
        this.conversationWithinsider.length > 1
      ) {
        if (!this.maskBottomnav) {
          this.$store.commit("var/maskBottomnav", true);
        }
        setTimeout(() => {
          let content = this.$el.querySelector(
            "#endContent"
            ////"#a" + (this.conversationWithinsider.length - 1)
          );
          if (content) {
            content.scrollIntoView();
          }
          setTimeout(() => {
            let content = this.$el.querySelector(
              "#endContent"
              ////"#a" + (this.conversationWithinsider.length - 1)
            );
            if (content) {
              content.scrollIntoView();
            }
          }, 300);
        }, 1);
      }
    },
    scrollToEnd: function () {
      if (
        this.conversationWithinsider &&
        this.conversationWithinsider.length > 1
      ) {
        setTimeout(() => {
          let content = this.$el.querySelector(
            "#endContent"
            ////"#a" + (this.conversationWithinsider.length - 1)
          );
          if (content) {
            content.scrollIntoView();
          }
          setTimeout(() => {
            let content = this.$el.querySelector(
              "#endContent"
              ////"#a" + (this.conversationWithinsider.length - 1)
            );
            if (content) {
              content.scrollIntoView();
            }
          }, 300);
        }, 1);
      }
    },

    convertHourToHourMin(event) {
      if (event >= 0) {
        let hours = event;
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        if (rhours == 0) {
          return rminutes + " min";
        } else if (rminutes == 0) {
          return rhours + " h ";
        } else {
          return rhours + " h " + rminutes + " min";
        }
      } else {
        let hours = -event;
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        if (rhours == 0) {
          return " - " + rminutes + " min";
        } else if (rminutes == 0) {
          return " - " + rhours + " h ";
        } else {
          return " - " + rhours + " h " + rminutes + " min";
        }
      }
    },
    addOneSecondToActualTimeEverySecond() {
      var component = this;
      component.actualTime = moment().local().format("X");
      setTimeout(function () {
        component.addOneSecondToActualTimeEverySecond();
      }, 1000);
    },
  },

  watch: {
    actualTime: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.isCurrentlyTyping && this.isCurrentlyTyping.length > 0) {
          this.isCurrentlyTypingTodisplay = this.isCurrentlyTyping.filter(
            (item) =>
              moment(item.date).format() > moment().add(-17, "seconds").format()
          );

          if (
            this.isCurrentlyTypingTodisplay &&
            this.isCurrentlyTypingTodisplay.length > 0
          ) {
            this.isCurrentlyTypingTodisplay = [
              ...new Map(
                this.isCurrentlyTypingTodisplay.map((item) => [
                  item.user._id,
                  item,
                ])
              ).values(),
            ];
          } else {
            this.isCurrentlyTypingTodisplay = [];
            this.isCurrentlyTyping = [];
          }
        }
        if (this.newMess && this.newMess.length > 0) {
          if (
            !this.typingtime ||
            moment().add(-15, "seconds").format() >
              moment(this.typingtime).format()
          ) {
            let usertoEmit = {};
            usertoEmit._id = this.$auth.user._id;
            usertoEmit.username = this.$auth.user.username;
            this.$socket.emit("chatTyping", {
              user: usertoEmit,
              date: new Date(),
              to: this.userTospeak._id,
            });
            this.typingtime = new Date();
          }
        }
      },
    },
    newMess: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        let regex =
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        let validUrl = regex.test(this.newMess);
        if (validUrl) {
          let startSlice = this.newMess.indexOf("http");
          let prov = this.newMess.slice(startSlice);
          let endSlice = prov.indexOf(" ");
          endSlice = endSlice > 1 ? endSlice : this.newMess.length;
          prov = prov.slice(0, endSlice);
          this.uploadVideo = prov;
          this.modalImage = true;
          this.$store.commit("var/maskBottomnav", true);
        }
      },
    },
    conversationWithinsider: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        this.scrollToEnd();
        if (this.conversationWithinsider) {
          this.scrollToEnd();
        }
      },
    },
    userTospeak: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (!this.userTospeak) {
          this.$router.push("/chat");
        } else {
          this.isChatreduce = false;
        }
      },
    },
    usersOnlinelist: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (
          (this.conversationWithinsider &&
            this.conversationWithinsider.length > 0) ||
          this.userTospeak
        ) {
          let userId = this.userTospeak
            ? this.userTospeak._id
            : this.conversationWithinsider[0].users.filter(
                (u) => u._id != this.$auth.user._id
              )[0]._id;

          if (
            this.usersOnlinelist &&
            this.usersOnlinelist.length > 0 &&
            this.usersOnlinelist.filter(
              (el) =>
                el.user == userId &&
                moment().add(-2, "minutes").format() < moment(el.time).format()
            ).length > 0
          ) {
            this.userOnline = true;
          } else {
            this.userOnline = false;
          }
        } else {
          this.$router.push("/chat");
        }
      },
    },
  },

  beforeDestroy() {
    this.oncloseChat();
    this.sockets.unsubscribe("chatTyping" + this.$auth.user._id);
    this.sockets.unsubscribe("chat" + this.$auth.user._id);
    this.sockets.unsubscribe("stream" + this.$auth.user._id);
    this.sockets.unsubscribe("userTospeakonpage" + this.$auth.user._id);
  },
};
</script>

<style lang="scss" scoped>
#endContent {
  padding-bottom: 5px;
}
.video {
  position: relative;
  height: auto;
  &__partner {
    height: auto;
  }
  &__myself {
    top: 0px;
    position: absolute;
    float: right;
    width: auto;
    right: 0;
    height: 75px;
    z-index: 2;
  }
  &__spinner {
    width: 100% !important;
    height: auto !important;
  }
}
#remoteVideo {
  border: 1px solid #192b41 !important;
}
.lireSurReply {
  color: #192b41 !important;
  margin-bottom: 0 !important;
}
.is-12x12 {
  width: 12px;
  margin-left: 5px;
}
.deleteWarn {
  border-radius: 50%;
  background-color: lightgray;
  color: white;
  width: 20px !important;
  min-width: 20px !important;
  margin-left: 5px !important;
  margin-right: 0px !important;
}
.modal-card-foot > .fa-share {
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: #22c65b !important;
  font-size: 35px;
  cursor: pointer;
}
.fa-share {
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: #ffdd57;
}
.floatRight {
  display: FLEX;
  justify-content: FLEX-END;
}

.vehiculeTable > img {
  height: 35px;
  max-width: 100%;
}

* {
  box-sizing: border-box;
}

h1 {
  margin-bottom: 0.5rem !important;
}

.section {
  padding: 0.75rem;
  background-color: #eef1f7;
  min-height: 90vh !important;
  width: 100% !important;
}

.delete {
  margin: auto;
}
.mdi-45px {
  margin-left: 15px;
  color: #ff7d00;
}
.mdi-45px::before {
  font-size: 45px;
}
body {
  /* position: relative; */
  background-color: #ff7d00;
}

.hide {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.modalImageWrapper {
  display: flex;
  justify-content: center;
}
.fieldModal {
  display: flex;
}
.modalImage {
  padding: 5px;
  border: 1px solid black;
  border-radius: 10px;
  width: 100%;
  background-color: white;
  overflow-y: auto;
  margin: auto !important;
}
.imgBab {
  background-color: #fff;
}
.upLoadImgModal {
  width: 100%;
  height: auto;
}
.deleteButton {
  margin: 0 !important;
  align-self: flex-end;
}

#imageToUpload {
  width: 100%;
  margin: 0.5rem;
  display: flex !important;
  justify-content: center;
}

.displayUploadImage {
  display: flex;
  flex-direction: column;
  margin-bottom: 0rem;
  margin-top: 0.5rem;
  align-items: center;
  background-color: #eef1f7;
  padding: 2px;
}

.displayUploadImage > div {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #eef1f7;
}

.field {
  width: 100% !important;
  align-items: center;
  flex-direction: column;
  display: flex;
}
.fieldChild {
  background-color: white;
  display: flex;
  width: 100% !important;
  align-items: center;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  justify-content: space-between;
}

.textModalInput {
  resize: none;
  outline: none;
  box-sizing: border-box;
  padding: 10px 50px 10px 10px;
  min-height: 65px !important;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.33;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #565867;
  -webkit-font-smoothing: antialiased;
  overflow: scroll;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0 -2px 5px -2px #ff7d00;
  border-radius: 0px;
  width: 100%;
}
.fa-video {
  color: #ff7d00;
  margin-left: 10px;
}
.mdi-bell {
  color: #ff7d00;
}
.sendIconWrapperModal {
  display: flex;
  align-items: center;
  color: #ff7d00;
  cursor: pointer;
  z-index: 5;
}

.sendIconWrapper {
  color: #ff7d00;
  right: 5px;
  bottom: 2px;
  cursor: pointer;
}

.imgIconWrapper {
  color: #ff7d00;
  left: 2px;
  bottom: 2px;
  cursor: pointer;
  z-index: 5;
}

.sc-user-input--text {
  padding: 10px 100px 10px 50px;
}

.input-msg {
  width: 100%;
}

.message-wrapper > span {
  display: flex;
}

.headMess {
  display: flex;
  justify-content: center;
}

.title {
  color: #ffffff;
  text-align: center;
  font-weight: 100;
}

.wrapper {
  box-shadow: none !important;
  transition: 0.3s ease;
}

.wrapper .inner {
  width: 500px;
  height: auto;
  padding-top: 0px;
  background: #eef1f7;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.reduceInner {
  width: 365px !important;
}
.reduceInner > h1 {
  margin-bottom: 0px !important;
}
.wrapper .inner::-webkit-scrollbar {
  width: 0 !important;
}

.wrapper .inner .content {
  padding: 10px;
  margin-bottom: 0px;
  margin-top: 0px;
  margin-left: 2rem;
}

.content {
  max-height: 65vh !important;
  min-height: 65vh;
  overflow-y: auto !important;
}

.wrapper .inner .contentNote {
  padding: 10px;
  margin-bottom: 0px;
  margin-top: 0px;
}

.contentNote {
  max-height: 70vh !important;
  overflow-y: auto !important;
}

.contentNote > div > .message-wrapper > .text-wrapper {
  width: 89% !important;
}

.bottom {
  display: flex;
  margin-left: 0rem;
  width: 100%;
  border: none;
  position: absolute;
  height: auto;
  background: #ffffff;
  /* box-shadow: 0px -3px 3px 0px rgba(50, 50, 50, 0.1); */
}

.bottom .textarea {
  min-height: 90px !important;
  height: 42px !important;
  background: #ffffff !important;
  border: none !important;
  width: calc(100% - 64px) !important;
  left: 0 !important;
  top: 0 !important;
  right: 0;
  bottom: 0;
  padding: 0 5% !important;
  resize: none !important;
  overflow: scroll !important;
  padding-top: 24px !important;
  font-weight: 300 !important;
  -ms-overflow-style: none !important;
  overflow: -moz-scrollbars-none !important;
}

.message-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
}

.message-wrapper .circle-wrapper {
  height: 42px;
  width: 42px;
  border-radius: 50%;
  border: solid 1px;
  display: flex;
  justify-content: center;
}

.message-wrapper > div > img {
  display: flex;
  justify-content: center;
  margin: auto;

  border-radius: 50px;
}

.message-wrapper .text-wrapper {
  padding: 5px;
  min-height: 42px;
  width: 85%;
  margin: 10px;
  margin-top: 0px;
  box-shadow: 0px 1px 0px 0px rgba(50, 50, 50, 0.3);
  border-radius: 2px;
  font-weight: 300;
  position: relative;
  opacity: 0;
}

.text-wrapper {
  word-break: break-word !important;
}

.message-wrapper .text-wrapper:before {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
}

.message-wrapper.them .circle-wrapper {
  background: none;
  float: left;
}

.message-wrapper.them .text-wrapper {
  background: #ff7d00;
  float: left;
  color: #ffffff;
}

.message-wrapper.them .text-wrapper:before {
  border-width: 0 10px 10px 0;
  border-color: transparent #ff7d00 transparent transparent;
  position: absolute;
  top: 0;
  left: -9px;
}

.message-wrapper.me .circle-wrapper {
  background: none;
  float: right;
}

.message-wrapper.me .text-wrapper {
  float: right;
  color: #333333;
  background: #ffffff;
}

.message-wrapper.me .text-wrapper:before {
  border-width: 10px 10px 0 0;
  border-color: #ffffff transparent transparent transparent;
  position: absolute;
  top: 0;
  right: -9px;
}

.message-wrapper.us .circle-wrapper {
  background: none;
  float: left;
}

.message-wrapper.us .text-wrapper {
  float: left;
  color: #333333;
  background: #ffffff;
}

.message-wrapper.us .text-wrapper:before {
  border-width: 0 10px 10px 0;
  border-color: transparent #fff transparent transparent;
  position: absolute;
  top: 0;
  left: -9px;
}

.dateAffiche {
  align-self: center;
  text-align: center;
  display: flex;
  justify-content: center;
  font-weight: 100;
  font-style: italic;
  font-size: 0.8rem;
}

.fadeIn > img {
  border-radius: 5px !important;
  border: 0.75px solid lightgrey;
  width: 100% !important;
  height: AUTO !important;
}

.chatInstan {
  width: 100%;
}
.autoResizeTextarea {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 5px;
  max-width: 99vw;
  border: none;
  box-shadow: none;
  margin: 1px;
  line-height: 1.5 !important;
  max-height: 80vh;
}
.displayUploadImage > div > img {
  max-height: 45vh;
}
.chatWrap {
  display: flex;
  flex-direction: column;
}
.inner > h1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.mdi-keyboard-return {
  display: none;
}
.mediacontentModal {
  max-height: 75vh;
}
.butWrap {
  width: 45px;
}
.insiderWrap {
  padding: 0.25rem !important;
  justify-content: space-between !important;
}
.shake-vertical {
  animation: shake-vertical 0.8s infinite linear;
  transform-origin: 50% 50%;
  -webkit-transform-origin: 50% 50%;
  border-radius: 50%;
}
@keyframes shake-vertical {
  0% {
    -webkit-transform: translate(2px, 0px) rotate(0deg);
  }
  10% {
    -webkit-transform: translate(-1px, 0px) rotate(-1deg);
  }
  20% {
    -webkit-transform: translate(-3px, 0px) rotate(2deg);
  }
  30% {
    -webkit-transform: translate(0px, 0px) rotate(0deg);
  }
  40% {
    -webkit-transform: translate(1px, 0px) rotate(2deg);
  }
  50% {
    -webkit-transform: translate(-1px, 0px) rotate(-2deg);
  }
  60% {
    -webkit-transform: translate(-3px, 0px) rotate(0deg);
  }
  70% {
    -webkit-transform: translate(2px, 0px) rotate(-2deg);
  }
  80% {
    -webkit-transform: translate(-1px, 0px) rotate(2deg);
  }
  90% {
    -webkit-transform: translate(2px, 0px) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(1px, 0px) rotate(-2deg);
  }
}
.insiderWrap > div {
  display: flex;
  align-items: center;
}
.fa-window-close-o {
  margin-left: 10px;
}
.typing {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;
  font-style: italic;
  font-weight: normal;
  color: #2da94f;
  background-color: #eef1f7;
}
.fa-check-square-o {
  color: #2da94f;
  font-weight: 100;
  display: FLEX;
  align-items: CENTER;
  font-size: 0.8rem;
  padding-right: 5px;
}
@media (max-width: 768px) {
  .insiderWrap {
    justify-content: center !important;
  }
  .insiderWrap > div {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .mediacontentModal {
    max-height: 65vh;
  }
  .deleteWarn {
    width: 10px !important;
    min-width: 10px !important;
    height: 12px;
    min-height: 12px;
  }
  .mdi-keyboard-return {
    margin-right: 5px;
    display: block;
    cursor: pointer;
  }
  .text-wrapper {
    font-size: 1rem !important;
  }
  .wrapper {
    padding: 0px !important;
  }
  .wrapper .inner {
    width: 100%;
    padding: 0px;
    height: calc(100vh - (7rem));
  }

  .wrapper .inner .content {
    margin-left: 0rem;
    height: calc(100vh - (12rem));
    padding: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .contentExpanse {
    height: calc(100vh - (6rem)) !important;
  }
  .message-wrapper {
    margin-bottom: 10px !important;
  }
  .text-wrapper {
    width: calc(100vw - (70px)) !important;
    margin: 5px !important;
  }
  .headMess {
    margin-bottom: -5px !important;
  }
  .sc-user-input--text {
    bottom: 0px;
    padding: 10px;
    min-height: 50px !important;
    height: 50px;
  }
  .textModalInput {
    bottom: 0px;
    padding: 10px 40px 10px 10px;
    min-height: 60px !important;
  }
  .sendIconWrapper {
    bottom: 5px;
  }

  .imgIconWrapper {
    bottom: 5px;
    height: 55px;
  }

  .is-size-5 {
    font-size: 1rem !important;
  }

  .message-wrapper.me .text-wrapper {
    background: #fff;
  }

  .message-wrapper.me .text-wrapper:before {
    border-color: #fff transparent transparent transparent;
  }

  .message-body {
    padding: 5px !important;
  }

  .send {
    width: 10%;
  }

  .field {
    width: 100% !important;
    bottom: 50px;
    position: fixed;
  }
  .fieldExpanse {
    bottom: 0px;
  }

  .is-size-5 {
    margin-bottom: 0px !important;
  }

  .content {
    max-height: 100vh !important;
  }
}

@media (max-width: 400px) {
}

@media (max-width: 320px) {
  .message-wrapper .circle-wrapper {
    height: 30px;
    width: 30px;
  }

  .picProfile {
    height: 28px;
    width: 28px;
  }

  .manImg {
    width: 1.5rem;
  }

  .humeurImgWrapper > .is-size-6 {
    font-size: 0.8rem !important;
  }
}
</style>
