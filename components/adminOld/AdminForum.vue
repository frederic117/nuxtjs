<template>
  <div v-if="$auth.user && $auth.user._id">
    <section v-if="connectedUser.role === 'admin'" class="main">
      <h1 class="title">Forum - Topic publishing</h1>
      <br />
      <b-field label="Title">
        <b-input
          v-model="title"
          required
          name="title"
          type="title"
          placeholder="...?"
        ></b-input>
      </b-field>
      <b-field label="lang">
        <b-input
          v-model="lang"
          required
          name="lang"
          type="lang"
          placeholder="FR"
        ></b-input>
      </b-field>
      <b-field label="Author">
        <b-input
          v-model="user"
          name="user"
          type="user"
          placeholder="Select an insider"
        ></b-input>
      </b-field>
      <b-field label="Tags">
        <b-select v-model="tags">
          <option value="question">question</option>
          <option value="interview">interview</option>
          <option value="match">match</option>
        </b-select>
      </b-field>
      <b-field label="Team">
        <b-input
          v-model="team"
          name="team"
          type="team"
          placeholder="team shortName"
        ></b-input>
      </b-field>
      <br />
      <div class="level-item">
        <button
          id="babble-submit"
          @click="postTopic(modalBabble)"
          class="button is-outlined is-primary"
        >
          Post a topic
        </button>
      </div>
      <br />

      <div v-if="modalBabble" class="modalBoxNoPad">
        <b-modal :active.sync="isCardModalActive">
          <div class="mediaModal">
            <div>
              <label>
                <strong v-if="connectedUser" class="chartIcon">
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
  getAllTopic,
  getAllBot,
  postBabbleAdmin,
  postTopicAdmin,
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
      title: "",
      lang: "",
      user: "",
      team: "",
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
      tags: "question",
    };
  },
  mounted() {
    if (this.connectedUser.role != "admin") {
      this.$router.push(`/`);
    } else {
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
  ////computed: {
  ////  charactersLeft() {
  ////    var char = this.babbleText.length,
  ////      limit = 380;
  ////    return limit - char;
  ////  }
  ////},
  methods: {
    generateImage: function () {
      let babbleUrl = this.babbleImage.generateDataUrl("image/jpeg", 0.8);
      this.babbleUrl = babbleUrl;
    },
    toggleShow: function () {
      this.show = !this.show;
    },
    itemClicked: function (link) {
      this.toggleShow();
      this.activeLink = link;
      if (this.activeLink === "RSS") {
        getAllTopic().then((news) => {
          this.news = news;
        });
        //.catch(next);
      }
    },
    botClicked: function (bot) {
      this.toggleShow();
      this.activeBot = bot;
    },

    postTopic(modalBabble) {
      postTopicAdmin(
        this.title,
        this.lang,
        this.user,
        this.team,
        this.tags
      ).then(() => {
        this.title = "";
        this.lang = "";
        this.user = "";
        this.team = "";
        this.tags = "question";
        this.isCardModalActive = false;
      });
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
