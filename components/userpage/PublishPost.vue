<template>
  <section
    :class="{
      'column is-9': !$route.path.includes('player'),
      fullWidth: $route.path.includes('player'),
    }"
  >
    <div v-if="pdfToImage" class="displayUploadImage">
      <div>
        <button
          type="button"
          name="delete"
          class="delete is-warning"
          @click="removeImage"
        ></button>
        <client-only>
          <pdf-pageload
            id="imageToUpload"
            @imgReady="transformToImg($event)"
            class="pdfImage"
            :pdfToLoad="pdfToImage"
          ></pdf-pageload>
        </client-only>
      </div>
    </div>
    <div class="displayUploadImage" v-else-if="uploadImageD">
      <div>
        <button
          type="button"
          name="delete"
          class="delete is-warning"
          @click="removeImage"
        ></button>
        <img
          loading="lazy"
          v-if="uploadImageD.toLowerCase().includes('base64')"
          :src="uploadImageD"
        />
        <client-only v-else>
          <pdf-pageload
            id="imageToUpload"
            @imgReady="transformToImg($event)"
            class="pdfImage"
            :pdfToLoad="uploadImageD"
          ></pdf-pageload>
        </client-only>
      </div>
    </div>
    <div class="displayUploadImageWrap" v-if="uploadVideo">
      <div class="displayUploadImage">
        <div>
          <button
            type="button"
            name="delete"
            class="delete is-warning"
            @click="removeVideo"
          ></button>

          <div
            v-if="uploadVideo"
            class="card-image imageChart videoBabble displayUploadImageWrap"
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
    </div>
    <div class="field displayFlex">
      <progress
        v-if="progress"
        class="progress is-success"
        :value="progress"
        max="100"
      >
        {{ progress }}
      </progress>
      <div class="field displayFlex" v-else>
        <div v-if="!uploadImageD && !uploadVideo" class="level">
          <a class="options-img-video">
            <input
              type="file"
              class="hide inputfile"
              id="upload"
              @change="onFileChangeD"
            />
            <label v-if="!uploadImageD" class="chartIcon pointer" for="upload">
              <i class="mdi mdi-paperclip mdi-36px"></i>
              <p class="text-img-options">
                {{
                  langSelected === "EN"
                    ? "share image/gif"
                    : "partage une vidéo, une photo, un pdf"
                }}
              </p>
            </label>
          </a>
        </div>

        <div v-if="!uploadImageD && !progress && !uploadVideo" class="level">
          <label @click="postVideoBabble" class="chartIcon pointer">
            <i class="fa fa-link"></i>
            <p class="text-img-options">
              {{ langSelected === "EN" ? "share a link" : "partage un lien" }}
            </p>
          </label>
        </div>
        <!--	<div v-if="!uploadImageD && !progress && !uploadVideo" class="level">
					<label @click="shareYourScreen" class="chartIcon pointer">
						<i class="fa fa-link"></i>
						<p class="text-img-options">Diffuse ton écran</p>
					</label>
				</div>-->
      </div>
    </div>

    <b-field :label="`${langSelected === 'EN' ? 'the title' : 'le titre'}`">
      <b-input type="text" v-model="babbleTitle" placeholder="..."></b-input>
    </b-field>

    <b-field :label="`${langSelected === 'EN' ? 'the news' : 'ta news'}`">
      <div
        class="quill-editor"
        :content="content"
        @change="onEditorChange($event)"
        v-quill:myQuillEditor="editorOption"
      ></div>
    </b-field>

    <b-field
      v-if="!$route.path.includes('player')"
      :label="`${
        langSelected === 'EN'
          ? 'I tag the clubs concerned by my post'
          : 'Je tague les clubs concernés par mon post'
      }`"
    >
      <multiselect
        :custom-label="customLabel"
        v-model="favoriteTeam"
        placeholder="PSG, OL"
        :loading="loading"
        :options="options"
        :close-on-select="true"
        @search-change="asyncFind"
        @close="closeMulti()"
        :showNoOptions="false"
        track-by="name"
        label="name"
        :hideSelected="true"
        :multiple="true"
        :allowEmpty="true"
        @select="onSelect($event)"
      >
        <template slot="option" slot-scope="props">
          <span class="searchWrap">
            <img
              loading="lazy"
              class="option__image navImg"
              :src="props.option.teamImg"
              alt="team"
            />
            <span class="option__desc">
              <p class="option__title">{{ props.option.name }}</p>
            </span>
          </span>
        </template>

        <span slot="noResult">{{
          langSelected === "EN"
            ? "no matching results!"
            : "pas de résultats correspondants !"
        }}</span>
      </multiselect>
    </b-field>
    <!--
       <b-field label="Je tague un insiders">
      <multiselect
        :hideSelected="true"
        track-by="searchName"
        :multiple="true"
        :allowEmpty="true"
        :custom-label="customLabelTagged"
        v-model="insidersTagged"
        :options="optionsTagged"
        :loading="loading"
        placeholder="@nico"
        :close-on-select="true"
        @search-change="asyncFindTagged"
        @close="closeMulti()"
        @select="onSelectTagged($event)"
        :showNoOptions="false"
      >
        <span slot="noResult">{{ langSelected === "EN" ? "no matching results!" : "pas de résultats correspondants !" }}</span>
      </multiselect>
    </b-field>
    -->
    <div class="centerButton">
      <button @click="closePublish" class="button buttonClose">
        <i class="mdi mdi-close mdi-36px"></i>
      </button>
      <button @click="postBabble" class="button buttonSuccess">
        <i class="mdi mdi-telegram mdi-36px"></i>
      </button>
    </div>

    <!--		<video id="videoStream" controls autoplay playsinline muted="false" volume="0"></video>

		<canvas width="1280" id="canvas" height="960"></canvas>-->

    <b-modal class="shareLinkModal" :active.sync="isShareVideoActive">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head chartIcon titleVideo">
          <i class="fa fa-link"></i>
          &nbsp
          {{ langSelected === "EN" ? "Share your video" : "Partage un lien" }}
        </header>
        <section class="modal-card-body">
          <b-field :label="`${langSelected === 'EN' ? 'Url' : 'Url du lien'}`">
            <b-input
              type="url"
              v-model="uploadVideo"
              :placeholder="
                langSelected === 'EN'
                  ? 'https://www.youtube.com/watch?v=rlZRtQkfK04'
                  : 'https://www.youtube.com/watch?v=rlZRtQkfK04'
              "
            ></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="closeVideoBabble">
            {{ langSelected === "EN" ? "close" : "fermer" }}
          </button>
          <button
            id="babble-submit"
            @click="okVideo()"
            class="button is-outlined is-primary btn"
          >
            Ok
          </button>
        </footer>
      </div>
    </b-modal>
  </section>
</template>

<script>
//let fs = require("fs");
//let existsSync = require("fs");
//let apiVideo = require("@api.video/nodejs-sdk");

//import uploadToCloud from "@/server/apiVideo";
import Multiselect from "vue-multiselect";
import { searchUser, searchTeam } from "@/server/apiSearch";
import { sendBabble } from "@/server/api";

import { sendFileToAws } from "@/server/apiContest";
export default {
  auth: false,
  head: {
    script: [
      {
        src: "https://www.webrtc-experiment.com/MultiStreamsMixer.js",
      },
    ],
  },
  props: {
    playerId: "",
  },
  components: {
    linkPreview: () => import("@/components/userpage/linkPreview"),
    videoLiveComp: () =>
      import("@/components/contest/ContestMain/videoLiveComp"),
    PlaceholderComponent: () =>
      import("@/components/contest/PlaceholderComponent"),

    Multiselect,
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
      streamVideo: "",
      pdfToImage: "",
      babbleTitle: "",
      source: "",
      progress: "",
      isShareVideoActive: false,
      postPost: false,
      favoriteTeam: [],
      taggedInsiders: [],
      insidersTagged: [],
      optionsTagged: [],
      options: [],
      loading: false,
      team: [],
      babble: "",
      babbleUrl: "",
      babbleVideo: "",
      content: "",
      uploadImageD: "",
      uploadVideo: "",
      meta: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [
              {
                header: 1,
              },
              {
                header: 2,
              },
            ],
            [
              {
                list: "ordered",
              },
              {
                list: "bullet",
              },
            ],
            [
              {
                script: "sub",
              },
              {
                script: "super",
              },
            ],
            [
              {
                indent: "-1",
              },
              {
                indent: "+1",
              },
            ],
            [
              {
                direction: "rtl",
              },
            ],

            [
              {
                header: [1, 2, 3, false],
              },
            ],
            [
              {
                font: [],
              },
            ],
            [
              {
                color: [],
              },
              {
                background: [],
              },
            ],
            [
              {
                align: [],
              },
            ],
            ["clean"],
            ["image", "video"],
          ],
          imageResize: true,
        },
        placeholder: "...",
      },
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
  destroyed() {
    this.$store.commit("var/setUploadImage", "");
  },
  mounted() {
    if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
      this.editorOption.placeholder =
        this.langSelected == "EN" ? "Share with us!" : "Partage avec nous !";
    } else {
      this.$router.push(`/login`);
    }
    if (this.$store.state.var.uploadImage.name) {
      if (
        this.$store.state.var.uploadImage.name.toLowerCase().includes(".m3u") ||
        this.$store.state.var.uploadImage.name.toLowerCase().includes(".ogg") ||
        this.$store.state.var.uploadImage.name.toLowerCase().includes(".mp4") ||
        this.$store.state.var.uploadImage.name.toLowerCase().includes(".webm")
      ) {
        this.sendFile(this.$store.state.var.uploadImage);
      } else if (
        this.$store.state.var.uploadImage.name.toLowerCase().includes(".pdf")
      ) {
        this.sendFile(this.$store.state.var.uploadImage);
      } else {
        this.createImageD(this.$store.state.var.uploadImage);
      }
    }
  },
  methods: {
    async shareYourScreen() {
      if (navigator.mediaDevices.getDisplayMedia) {
        let videoElem = document.getElementById("videoStream");
        try {
          videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
          });
          screenStream.fullcanvas = true;
          screenStream.width = screen.width; ////or 3840
          screenStream.height = screen.height; ////or 2160

          cameraStream.width = parseInt((20 / 100) * screenStream.width);
          cameraStream.height = parseInt((20 / 100) * screenStream.height);
          cameraStream.top = screenStream.height - cameraStream.height;
          cameraStream.left = screenStream.width - cameraStream.width;

          let mixer = new MultiStreamsMixer([screenStream, cameraStream]);

          rtcPeerConnection.addStream(mixer.getMixedStream());

          mixer.frameInterval = 1;
          mixer.startDrawingFrames();

          btnStopStreams.onclick = function () {
            mixer.releaseStreams();
          };

          btnAppendNewStreams.onclick = function () {
            mixer.appendStreams([anotherStream]);
          };

          btnStopScreenSharing.onclick = function () {
            ////replace all old streams with this one
            ////it will replace only video tracks
            mixer.resetVideoStreams([cameraStreamOnly]);
          };
        } catch (error) {}
      }
    },

    onFileChangeD(e) {
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
      } else if (files[0].name.toLowerCase().includes(".pdf")) {
        this.sendFile(files[0]);
        var uploadImage = new Image();
        var reader = new FileReader();
        var vm = this;
        reader.onload = (e) => {
          vm.pdfToImage = e.target.result;
        };
        reader.readAsDataURL(files[0], 0);
      } else if (
        files[0].name.toLowerCase().includes(".jpeg") ||
        files[0].name.toLowerCase().includes(".png") ||
        files[0].name.toLowerCase().includes(".jpg") ||
        files[0].name.toLowerCase().includes(".gif") ||
        files[0].name.toLowerCase().includes(".svg") ||
        files[0].name.toLowerCase().includes(".bmp") ||
        files[0].name.toLowerCase().includes(".jfif")
      ) {
        this.createImageD(files[0]);
      } else {
        this.$buefy.dialog.alert("Ce format n'est pas supporté");
      }
    },
    problemLink() {
      this.babble = this.uploadVideo;
      this.uploadVideo = "";
      this.isShareVideoActive = false;
    },
    successLink(event) {
      this.babbleUrl = event.images ? event.images[0] : "";
      this.babbleTitle = event.title ? event.title : "";
      this.content = event.description
        ? event.description.concat(
            `<p class="ql-align-right"><em>${event.url}</em></p>`
          )
        : `<p class="ql-align-right"><em>${event.url}</em></p>`;
      this.source = event.url ? event.url : "";
      this.isShareVideoActive = false;
    },

    okVideo() {
      this.isShareVideoActive = false;
    },
    postVideoBabble() {
      this.isShareVideoActive = true;
    },
    closeVideoBabble() {
      this.uploadVideo = "";
      this.isShareVideoActive = false;
    },
    createImageD(file) {
      var uploadImageD = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.uploadImageD = e.target.result;
      };

      reader.readAsDataURL(file, 0);
    },
    async sendFile(file) {
      let formData = new FormData();
      formData.append("file", file);

      this.uploading = true;
      sendFileToAws(formData, {
        onUploadProgress: (e) => {
          this.progress = Math.round((e.loaded * 100) / e.total);
        },
      }).then((resp) => {
        if (
          resp.Location.toLowerCase().includes(".m3u") ||
          resp.Location.toLowerCase().includes(".ogg") ||
          resp.Location.toLowerCase().includes(".mp4") ||
          resp.Location.toLowerCase().includes(".webm")
        ) {
          this.uploadImageD = "";
          this.uploadVideo = resp.Location;
          this.babbleVideo = resp.Location;
          this.progress = "";
        } else {
          this.uploadImageD = resp.Location;
          this.babbleVideo = resp.Location;
          this.progress = "";
        }
      });
    },
    transformToImg(event) {
      this.babbleUrl = event[0].toDataURL("image/jpeg");
    },
    removeImage: function (e) {
      this.babbleUrl = "";
      this.babbleVideo = "";
      this.pdfToImage = "";
      this.uploadImageD = "";
      this.uploadVideo = "";
    },
    removeVideo: function (e) {
      this.babbleUrl = "";
      this.babbleVideo = "";
      this.pdfToImage = "";
      this.uploadImageD = "";
      this.uploadVideo = "";
      this.babbleTitle = "";
      this.content = "";
      this.source = "";
    },
    postBabble() {
      if (
        this.postPost === true ||
        (this.babble == "" &&
          this.meta == "" &&
          this.babbleUrl == "" &&
          this.babbleVideo == "" &&
          this.uploadImageD == "" &&
          this.uploadVideo == "")
      ) {
      } else {
        let player = "";
        this.postPost = true;
        if (this.favoriteTeam.length > 0) {
          this.team = this.favoriteTeam.map((t) => t._id);
        }
        if (this.insidersTagged.length > 0) {
          this.taggedInsiders = this.insidersTagged.map((t) => t.shortName);
        }
        if (this.$route.path.includes("player")) {
          player = this.$route.params.id;
        }
        if (this.source) {
          this.babble = this.content + " ";
          let babblePost = {
            title: this.babbleTitle ? this.$sanitize(this.babbleTitle) : "",
            babble: this.$sanitize(this.babble),
            scrapHtml: this.babble,
            source: this.source ? this.source : "",
            players: player ? [this.playerId] : [],
            meta: this.babbleTitle
              ? this.$sanitize(
                  this.babbleTitle.concat("<br>".concat(this.meta))
                )
              : this.$sanitize(this.meta),
            teamLink: this.team,
            taggedUsers: this.taggedInsiders,
            babbleImg: this.babbleUrl,
            lang: this.langSelected,
          };
          sendBabble(babblePost).then((data) => {
            this.postPost = false;
            if (this.$route.path.includes("player")) {
              this.$emit("postOk");
            } else {
              this.$router.back();
            }
          });
        } else {
          if (!this.uploadImageD.toLowerCase().includes(".pdf")) {
            this.babbleUrl = this.uploadImageD;
          }
          if (this.babbleVideo.toLowerCase().includes(".pdf")) {
            this.isLoading = true;
            this.sendingPost = true;
            this.babble = this.babble + " ";
          }
          this.babble = this.content + " ";
          let babblePost = {
            title: this.babbleTitle ? this.$sanitize(this.babbleTitle) : "",
            meta: this.babbleTitle
              ? this.$sanitize(
                  this.babbleTitle.concat("<br>".concat(this.meta))
                )
              : this.$sanitize(this.meta),
            babble: this.$sanitize(this.babble),
            scrapHtml: this.babble,
            players: player ? [this.playerId] : [],
            teamLink: this.team,
            taggedUsers: this.taggedInsiders,
            babbleVideo: this.uploadVideo ? this.uploadVideo : this.babbleVideo,
            babbleImg: this.babbleUrl,
            lang: this.langSelected,
          };

          sendBabble(babblePost).then((data) => {
            this.postPost = false;
            if (this.$route.path.includes("player")) {
              this.$emit("postOk");
            } else {
              this.$router.push(`/mypage/all`);
            }
          });
        }
      }
      //.catch(next);
    },
    onSelect(team) {
      if (team) {
        this.favoriteTeam = team;
      }
    },
    onSelectTagged(insidersTagged) {
      if (insidersTagged) {
        this.insidersTagged = insidersTagged;
      }
    },
    asyncFind(query) {
      this.options = [];
      if (query[0] && query[0] != " ") {
        this.loading = true;
        searchTeam(query.toLowerCase()).then((data) => {
          this.loading = false;
          this.options = data;
        });
      }
    },
    asyncFindTagged(query) {
      this.options = [];
      if (query[0] === "@") {
        this.loading = true;
        searchUser(query.slice(1)).then((data) => {
          this.loading = false;
          this.data = data;
          this.optionsTagged = data.map((u) => {
            return {
              searchName: "@" + u.username,
              shortName: u._id,
            };
          });
        });
      } else if (query[0] && query[0] != " ") {
        this.loading = true;
        searchUser(query).then((data) => {
          this.loading = false;
          this.data = data;
          this.optionsTagged = data.map((u) => {
            return {
              searchName: "@" + u.username,
              shortName: u._id,
            };
          });
        });
      }
    },
    closeMulti() {
      this.isLoading = false;
      this.options = [];
      this.optionsTagged = [];
    },
    customLabel({ shortName, name }) {
      if (shortName) {
        return `${name} - ${shortName}`;
      } else {
        return [];
      }
    },
    customLabelTagged({ searchName, shortName, name }) {
      if (searchName) {
        return searchName;
      } else {
        return [];
      }
    },
    closePublish() {
      if (this.$route.path.includes("player")) {
        this.$emit("postOk");
      } else {
        this.$router.back();
      }
    },
    onEditorChange({ editor, html, text }) {
      if (html) {
        this.content = html;
        this.meta = text;
      }
    },
  },
};
</script>
<style scoped>
.video-wrap > div > div > iframe {
  width: 100% !important;
  height: 401px !important;
  margin-bottom: 0;
}

.fullWidth {
  width: 100%;
}
.column.is-9 {
  width: 48%;
}
.displayUploadImageWrap {
  background-color: #eef1f7;
}
.videoStream {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #fff;
}

.displayFlex {
  display: flex;
}

.displayFlex > .level {
  margin-right: 15px;
}

.level {
  margin-bottom: 0rem !important;

  background-color: #eef1f7 !important;
}

.displayUploadImage {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  align-items: center;
  background-color: #eef1f7;
}

.displayUploadImage > div {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #eef1f7;
}

.delete {
  align-self: flex-end;
}

.fa {
  text-align: center;
  color: #192b41;
  cursor: pointer;
  font-size: 2rem;
  margin-right: 5px;
}

.hide {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.chartIcon {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
}

.column {
  margin: auto;
  display: flex;
  flex-direction: column;
}

div {
  background-color: #fff;
}

.field {
  margin-top: 0.75rem;
  background-color: #eef1f7;
}

.buttonClose {
  margin-right: 20px;
  color: #eb412d;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #fff !important;
  border-color: #eb412d !important;
  box-shadow: 0 0 0 0.125em #eb412d !important;
  align-self: flex-end;
}

.buttonClose:hover,
.buttonClose:focus {
  background-color: #eb412d !important;
  border-color: #eb412d !important;
  color: #fff !important;
}

.buttonSuccess {
  margin-left: 20px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #2da94f !important;
  border-color: #2da94f !important;
  box-shadow: 0 0 0 0.125em #2da94f !important;
}

.buttonSuccess:hover,
.buttonSuccess:focus {
  background-color: #fff !important;
  border-color: #2da94f !important;
  color: #2da94f !important;
}

.centerButton {
  background-color: #eef1f7;
  margin: 0.5rem;
  display: flex;
  justify-content: center;
}

section {
  padding: 0.1rem;
}

.container {
  width: 60%;
  margin: 0 auto;
  padding: 50px 0;
}

.quill-editor {
  max-height: fit-content;
  overflow-y: initial;
}

.level-left {
  display: flex;
  justify-content: FLEX-END;
  background-color: #eef1f7 !important;
}

@media (max-width: 1047px) {
  .level-left {
    display: flex;
    justify-content: FLEX-END;
    margin-top: 0px !important;
  }

  .chartIcon {
    justify-content: baseline !important;
  }
}
</style>
