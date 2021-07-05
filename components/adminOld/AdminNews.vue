<template>
  <div v-if="$auth.user && $auth.user._id">
    <section v-if="connectedUser.role === 'admin'" class="main">
      <h1 class="title">News publishing</h1>
      <br />
      <br />
      <button
        class="btn-red"
        type="button"
        @click="launchTwitter()"
        name="button"
      >
        Launch Twitter scrap
      </button>
      <br />
      <button
        class="btn-red"
        type="button"
        @click="closeTwitter()"
        name="button"
      >
        Close Twitter scrap
      </button>
      <br />
      <div>
        <p>Choose the source of News:</p>
        <button @click="toggleShow" class="instrument-button">
          {{ this.activeLink }}
        </button>
        <div v-if="show" class="instrument-list">
          <div
            class="instrument"
            v-for="link in this.sourceLink"
            @click="itemClicked(link)"
          >
            {{ link }}
          </div>
        </div>
      </div>
      <br />
      <table>
        <tr>
          <th>TITLE</th>
          <th>DESCRIPTION</th>
          <th>LINK</th>
          <th>IMAGE</th>
          <th>POST BABBLE</th>
        </tr>
        <tr v-for="(n, index) in news" :key="index">
          <td>
            <span data-replace="Symbol">
              <strong>{{ n.title }}</strong>
            </span>
            <p>
              potential team:
              <strong class="red-color"
                >{{ n.potTeamLongName }} ({{ n.potTeamShortName }})</strong
              >
            </p>
          </td>

          <td>{{ n.description.substring(0, 300) }}</td>
          <td>{{ n.link.substring(0, 400) }}</td>
          <td>
            <img loading="lazy" v-if="n.image" :src="n.image" />
          </td>
          <td>
            <button @click="openModalBabble(n)" class="btn-red">
              Post Babble
            </button>
          </td>
        </tr>
      </table>
      <div v-if="modalBabble" class="modalBoxNoPad">
        <b-modal :active.sync="isCardModalActive">
          <div class="mediaModal">
            <div>
              <label>
                <strong v-if="$auth.user && $auth.user._id" class="chartIcon">
                  <i class="mdi mdi-paperclip mdi-36px"></i>
                  &nbsp
                  {{
                    langSelected === "EN" ? "Share an image" : "partager image"
                  }}
                </strong>

                <croppa
                  v-model="babbleImage"
                  :width="490"
                  :height="245"
                  :quality="1"
                  :placeholder-font-size="18"
                  :prevent-white-space="false"
                  :reverse-scroll-to-zoom="true"
                  :show-loading="true"
                  :loading-size="50"
                  :accept="'image/*'"
                  class="column"
                ></croppa>
              </label>
              <br />
              <div class="card-content bg-light">
                <div class="media">
                  <div class="media-content">
                    <div>
                      <div class="field1">
                        <div class="control">
                          <textarea
                            v-if="$auth.user && $auth.user._id"
                            v-model="babbleText"
                            id="babble-text"
                            name="babble"
                            maxlength="16180"
                            rows="3"
                            class="textarea"
                          ></textarea>
                          <div class="level-item has-text-grey">
                            {{ charactersLeft }}
                          </div>
                        </div>
                        <div class="control">
                          <textarea
                            v-if="$auth.user && $auth.user._id"
                            v-model="babbleVideo"
                            placeholder="put video link here"
                            id="babble-text"
                            name="video"
                            rows="3"
                            class="textarea"
                          >

                            </div>
                            <a :href="modalBabble.link" target="_blank"><button class="button is-large is-outlined is-primary">see article</button></a>
                            <div class="control">
                              <textarea placeholder="TeamLongName">{{
                              modalBabble.potTeamLongName
                            }}</textarea
                          >
                          <textarea placeholder="TeamID">{{
                            modalBabble.potTeamId
                          }}</textarea>
                          <textarea placeholder="TeamShortName">{{
                            modalBabble.potTeamShortName
                          }}</textarea>
                        </div>

                        <nav class="media-right">
                          <div class="foot">
                            <p>bot</p>
                            <button
                              @click="toggleShow"
                              class="button instrument-button"
                            >
                              {{ this.activeBot.username }}
                            </button>
                          </div>
                          <div v-if="show" class="instrument-list">
                            <div
                              class="instrument"
                              v-for="bot in this.bots"
                              @click="botClicked(bot)"
                            >
                              {{ bot.username }}
                            </div>
                          </div>
                          <div class>
                            <div class="level-item">
                              <button
                                id="babble-submit"
                                @click="postBabble(modalBabble)"
                                class="button is-outlined is-primary"
                              >
                                Post
                              </button>
                            </div>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-modal>
      </div>
    </section>
  </div>
</template>

<script>
import {
  getAllNewsRss,
  getAllBot,
  startTwitter,
  stopTwitter,
  postBabbleAdmin,
} from "@/server/apiAdmin";
import moment from "moment";
import { sendBabbleReply } from "@/server/api";
//import vSelect from "vue-select";

export default {
  ////multi select component
  components: {
    //// vSelect
  },
  data() {
    return {
      news: {},
      show: false,
      sourceLink: ["RSS", "API", "SCRAPPING"],
      activeLink: "RSS",
      activeBot: "",
      isCardModalActive: false,
      modalBabble: "",
      babbleText: "",
      babbleVideo: "",
      bots: [],
      babbleImage: null,
      babbleUrl: "",
      width: 0,
      height: 0,
      quality: 0,
    };
  },
  mounted() {
    if (this.connectedUser.role != "admin") {
      this.$router.push(`/`);
    } else {
      getAllNewsRss().then((news) => {
        if (news === "unauthorized") {
          this.$router.push("/404");
        } else {
          this.news = news;
        }
      });
      getAllBot().then((bots) => {
        this.bots = bots;
        this.activeBot = bots[0];
      });
    }
  },
  computed: {
    connectedUser() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        return this.$store.state.auth.user;
      } else {
        return "unconnected";
      }
    },
  },
  computed: {
    charactersLeft() {
      var char = this.babbleText.length,
        limit = 16180;
      return limit - char;
    },
  },
  methods: {
    generateImage: function () {
      let babbleUrl = this.babbleImage.generateDataUrl("image/jpeg", 0.8);

      this.babbleUrl = babbleUrl;
    },
    toggleShow: function () {
      this.show = !this.show;
    },
    launchTwitter: function () {
      startTwitter().then((data) => {
        alert("Lancement du scrap twitter : " + data);
      });
    },
    closeTwitter: function () {
      stopTwitter().then((data) => {
        alert("Arrêt du scrap twitter : " + data);
      });
    },
    itemClicked: function (link) {
      this.toggleShow();
      this.activeLink = link;
      if (this.activeLink === "RSS") {
        getAllNewsRss().then((news) => {
          this.news = news;
        });
        //.catch(next);
      }
    },
    botClicked: function (bot) {
      this.toggleShow();
      this.activeBot = bot;
    },
    openModalBabble(news) {
      this.modalBabble = news;
      this.babbleText = news.title + " " + news.description;
      this.width =
        window.visualViewport.width >= 640
          ? 640 * 0.75
          : window.visualViewport.width * 0.6;
      this.height =
        window.visualViewport.width >= 640
          ? 640 * 0.75 * 0.5
          : window.visualViewport.width * 0.6 * 0.5;
      this.quality =
        window.visualViewport.width >= 640 ? 0.7 : (640 * 0.7) / this.width;
      this.isCardModalActive = true;
    },
    postBabble(modalBabble) {
      this.generateImage();
      if (this.modalBabble.potTeamShortName) {
        this.babbleText =
          "#" + this.modalBabble.potTeamShortName + " " + this.babbleText;
      }

      postBabbleAdmin(
        this.activeBot._id,
        this.babbleText,
        this.modalBabble.potTeamId,
        this.babbleUrl,
        this.babbleVideo
      ).then(() => {
        this.babbleText = "";
        this.babbleUrl = "";
        this.babbleVideo = "";
        this.isCardModalActive = false;
      });
      //.catch(next);
    },
  },
};
</script>

<style scoped>
.foot {
  display: flex;
  justify-content: space-envenly;
}
tr {
  margin: 25px;
  padding: 10px 30px;
}

td {
  padding: 20px 3px;
  border-bottom: solid 1px black;
}

.red-color {
  color: red;
}

.btn-red {
  margin: 30px;
  padding-left: 30px;
  padding-right: 30px;
  color: #fff !important;
  background-color: #eb412d !important;
  box-shadow: 0 0 0 0.125em#eb412d !important;
  border-color: #eb412d !important;
  font-weight: bolder;
  font-size: 1.2rem;
}

th {
  margin: 25px 10px 25px 60px;
  padding: 10px;
  background-color: #bdbdbd;
}

.title {
  font-size: 100%;
  font-weight: bold;
  font-style: ITALIC;
}
.main {
  background-color: #eef1f7 !important;
  padding: 7rem 1.5rem;
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

.mediaModal {
  background-color: #fff;
  padding: 5%;
  margin: 5%;
  border-radius: 5px;
  border: solid, #192b41;
}

.card-content {
  padding: 1.5rem;
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
  width: 90%;
  margin: 0.5rem;
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

.field1 {
  margin-bottom: 0.75rem !important;
}
</style>
