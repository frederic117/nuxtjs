<template>
  <section class="column is-9">
    <h1
      class="is-size-3 has-text-primary"
      v-if="this.$route.params && this.$route.params.shortName"
    >
      <span class="is-bold">{{
        this.$route.params.shortName.toUpperCase()
      }}</span>
      : ton chant !
    </h1>
    <div class="displayUploadImage" v-if="uploadImageD">
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
      </div>
    </div>
    <div v-if="uploadVideo">
      <div class="displayUploadImage">
        <div>
          <button
            type="button"
            name="delete"
            class="delete is-warning"
            @click="removeVideo"
          ></button>

          <div v-if="uploadVideo" class="card-image imageChart videoBabble">
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
            <vue-plyr
              v-else-if="
                uploadVideo.toLowerCase().includes('sporttube.com/embed')
              "
            >
              <video>
                <source
                  :src="
                    uploadVideo.replace(
                      'https://cc.sporttube.com/embed/',
                      'https://vc.sporttube.com/video/' +
                        moment().format('YYYY/M/D').replace('/-/g', '/') +
                        '/'
                    ) + '.mp4'
                  "
                  type="video/mp4"
                />
              </video>
            </vue-plyr>
            <vue-plyr v-else-if="uploadVideo.toLowerCase().includes('youtu')">
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
      <div class="field displayFlex mobileColumn" v-else>
        <div v-if="!uploadImageD && !uploadVideo" class="level">
          <a class="options-img-video">
            <input
              type="file"
              class="hide inputfile"
              id="upload"
              @change="onFileChangeD"
            />
            <label v-if="!uploadImageD" class="chartIcon pointer" for="upload">
              <i class="mdi mdi-paperclip mdi-24px"></i>
              <p class="text-img-options">
                {{
                  langSelected === "EN"
                    ? "Share video/mp3"
                    : "un fichier vidéo ou audio"
                }}
              </p>
            </label>
          </a>
        </div>

        <div v-if="!uploadImageD && !progress && !uploadVideo" class="level">
          <label @click="postVideoBabble" class="chartIcon pointer">
            <i class="fa fa-link"></i>
            <p class="text-img-options">Un lien (youtube, mp3)</p>
          </label>
        </div>
      </div>
    </div>
    <b-field>
      <b-input
        v-model="title"
        class="publishText"
        :placeholder="`Le titre de la chanson`"
        type="textarea"
      ></b-input>
    </b-field>
    <div
      class="quill-editor"
      :content="content"
      @change="onEditorChange($event)"
      v-quill:myQuillEditor="editorOption"
    ></div>

    <b-field v-if="!this.$route.params" label="Quel club">
      <multiselect
        :hideSelected="true"
        track-by="name"
        :multiple="false"
        :allowEmpty="true"
        :custom-label="customLabel"
        v-model="favoriteTeam"
        :options="options"
        :loading="loading"
        placeholder="PSG, OL"
        :close-on-select="true"
        @search-change="asyncFind"
        @close="closeMulti()"
        @select="onSelect($event)"
        :showNoOptions="false"
      >
        <span slot="noResult">{{
          langSelected === "EN"
            ? "no matching results!"
            : "pas de résultats correspondants !"
        }}</span>
      </multiselect>
    </b-field>

    <div class="centerButton">
      <button @click="backToPrevious" class="button buttonClose">
        {{ langSelected === "FR" ? "Retour" : "Close" }}
      </button>
      <button @click="postBabble" class="button buttonSuccess">
        {{ langSelected === "FR" ? "Poster" : "Share a news" }}
      </button>
    </div>

    <b-modal class="shareLinkModal" :active.sync="isShareVideoActive">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head chartIcon titleVideo">
          <i class="fa fa-link"></i>
          &nbsp
          {{ langSelected === "EN" ? "Share your video" : "Partage un lien" }}
        </header>
        <section class="modal-card-body">
          <b-field label="Url du lien">
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
            fermer
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
import { sendFansong } from "@/server/apiAdmin";
import { getAllTeamsNav } from "@/server/api";
import { searchTeam } from "@/server/apiSearch";

import { sendFileToAws } from "@/server/apiContest";
import Multiselect from "vue-multiselect";

export default {
  data() {
    return {
      title: "",
      loading: false,
      team: "",
      babble: "",
      mp3Link: "",
      babbleUrl: "",
      babbleVideo: "",
      options: [],
      isLoading: false,
      progress: "",
      isShareVideoActive: false,
      postPost: false,
      favoriteTeam: "",
      content: "",
      uploadImageD: "",
      uploadVideo: "",
      meta: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],

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
            ["image", "video"],
          ],
        },
        placeholder: "Les paroles de la chanson ! ",
      },
    };
  },
  components: {
    videoLiveComp: () =>
      import("@/components/contest/ContestMain/videoLiveComp"),
    Multiselect,
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (this.connectedUser.role != "admin") {
      this.$router.push(`/`);
    } else {
      if (this.$route.params && this.$route.params.id) {
        this.team = this.$route.params.id;
      }
    }
  },

  methods: {
    backToPrevious() {
      this.$router.back();
    },

    onFileChangeD(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      } else if (
        files[0].name.toLowerCase().includes(".m3u") ||
        files[0].name.toLowerCase().includes(".ogg") ||
        files[0].name.toLowerCase().includes(".mp4") ||
        files[0].name.toLowerCase().includes(".webm") ||
        files[0].name.toLowerCase().includes(".mp3")
      ) {
        this.sendFile(files[0]);
      } else {
        this.$buefy.dialog.alert("Ce format n'est pas supporté");
      }
    },

    okVideo() {
      if (
        this.uploadVideo.includes("mp3") ||
        this.uploadVideo.includes("youtu")
      ) {
        this.isShareVideoActive = false;
      } else {
        this.$buefy.dialog.alert("Ce format n'est pas supporté");
      }
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
          resp.Location.toLowerCase().includes(".webm") ||
          resp.Location.toLowerCase().includes(".mp3")
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
    },
    back() {
      this.$emit("changeBabbles");
    },
    onSelect(team) {
      if (team) {
        this.favoriteTeam = team;
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
    closeMulti() {
      this.isLoading = false;
      this.options = [];
      this.optionsTagged = [];
    },
    customLabel({ searchName, shortName, name }) {
      if (shortName) {
        return `${name} – ${searchName} -${shortName}`;
      } else {
        return [];
      }
    },
    onEditorChange({ editor, html, text }) {
      if (html) {
        this.content = html;
        this.meta = text;
      }
    },

    postBabble() {
      if (this.postPost === true) {
      } else {
        this.babble = this.content + " ";
        this.postPost = true;
        let song = {};
        song.title = this.title;
        song.babble = this.babble;
        song.mp3Link =
          this.uploadVideo && this.uploadVideo.includes("mp3")
            ? this.uploadVideo
            : this.babbleVideo && this.babbleVideo.includes("mp3")
            ? this.babbleVideo
            : "";
        song.babbleUrl = this.uploadImageD;
        song.babbleVideo =
          this.uploadVideo && !this.uploadVideo.includes("mp3")
            ? this.uploadVideo
            : this.babbleVideo && !this.babbleVideo.includes("mp3")
            ? this.babbleVideo
            : "";
        song.team = this.team;

        sendFansong(song).then((resp) => {
          this.postPost = false;
          this.title = "";
          this.babble = "";
          this.mp3Link = "";
          this.babbleUrl = "";
          this.babbleVideo = "";
          this.$emit("changeBabbles");
          this.$router.back();
        });
      }
      //.catch(next);
    },
  },
};
</script>

<style scoped>
.modal-card {
  background-color: #fff;
}
.column.is-9 {
  width: 48%;
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
  align-items: center;
  justify-content: space-between;
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
  background-color: #eef1f7 !important;
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
  font-size: 1.2rem;
  background-color: #eef1f7;
  margin-bottom: 0.5rem;
}
.column {
  margin: auto;
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
  .displayUploadImage > div {
    width: 100%;
  }
  .column {
    padding: 0.25rem !important;
  }
  .level {
    padding-bottom: 0.5rem !important;
    background-color: #eef1f7 !important;
  }
  .level-left {
    display: flex;
    justify-content: FLEX-END;
    margin-top: 0px !important;
    margin-right: 5px;
  }

  .chartIcon {
    justify-content: baseline !important;
  }

  .fa {
    font-size: 1.5rem;
  }

  .uploadWrap {
    margin-top: 0.5rem !important;
  }
  .mobileColumn {
    flex-direction: column;
  }

  .field {
    margin-top: 0.25rem;
  }
  .column.is-9 {
    width: 100%;
  }
}
</style>
