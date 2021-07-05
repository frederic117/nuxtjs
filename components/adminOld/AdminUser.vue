<template>
  <div v-if="$auth.user && $auth.user._id">
    <section class="hero welcome is-small">
      <div class="hero-body">
        <div class>
          <h1 class="title helloText">Bonjour {{ $auth.user.username }},</h1>
          <h2 v-if="!seeBotactiv" class="subtitle">
            Suivi des {{ userList.length }}
            utilisateurs
          </h2>
          <h2 v-else class="subtitle">
            Suivi des {{ botList.length }}
            bots
          </h2>
          <button
            class="button"
            type="button"
            @click="updateContestWon()"
            name="button"
          >
            Update rounds won for all users
          </button>
          <button
            v-if="!seeBotactiv"
            @click="seeBot"
            class="button"
            type="button"
            name="button"
          >
            Voir bots
          </button>
          <button
            v-else
            @click="unseeBot"
            class="button"
            type="button"
            name="button"
          >
            Voir tous
          </button>
          <button
            @click="createBot"
            class="button is-success is-outlined"
            type="button"
            name="button"
          >
            Créer un bot
          </button>
        </div>
      </div>
    </section>

    <br />
    <b-field class="searchField" v-if="!seeBotactiv && userList.length > 0">
      <b-input placeholder="search" v-model="search_query" />
    </b-field>

    <section v-if="!seeBotactiv">
      <b-table
        :data="filter"
        :loading="loading"
        :paginated="true"
        :per-page="50"
        :pagination-simple="isPaginationSimple"
        :total="total"
        :mobile-cards="true"
        :striped="true"
        :default-sort-direction="defaultSortOrder"
        :default-sort="defaultSortField"
      >
        <template slot-scope="props">
          <b-table-column
            class="userWrapper"
            field="username"
            centered
            label="user"
          >
            <figure class="image is-64x64 is-circle">
              <img
                loading="lazy"
                class="imgProfile"
                :src="props.row.picProfile"
                alt="Image"
              />
            </figure>
            <strong
              >{{ props.row.email }} <br />{{ props.row.username }}
            </strong>
          </b-table-column>
          <b-table-column field="_id" centered label="id">
            <div class="journée">
              <strong>{{ props.row._id }}</strong>
            </div>
          </b-table-column>
          <b-table-column field="created_at" centered label="Created_at">
            <div class="journée">
              <strong>{{
                moment(props.row.created_at).format("DD-MM-YYYY HH:mm")
              }}</strong>
            </div>
          </b-table-column>
          <b-table-column field="updated_at" centered label="Updated">
            <div class="journée">
              <strong>{{
                moment(props.row.updated_at).format("DD-MM-YYYY HH:mm")
              }}</strong>
            </div>
          </b-table-column>
          <b-table-column field="  " centered label="  ">
            <div v-if="props.row.role === 'bot'" class="journée">
              <button
                class="button is-success is-outlined"
                @click="goGetNews(props.row)"
                name="button"
              >
                Bot va chercher
              </button>
            </div>
          </b-table-column>
          <b-table-column field=" " centered label=" ">
            <div class="journée">
              <button class="button" @click="editUser(props.row)" name="button">
                Edit
              </button>
              <button
                class="button is-danger"
                @click="confirmDeleteUser(props.row)"
                name="button"
              >
                Delete
              </button>
            </div>
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div
              v-if="loading == false"
              class="content has-text-grey has-text-centered"
            >
              <p>...</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
    <div v-if="seeBotactiv">
      <bot-list
        @botUpdate="botUpdate"
        @deleteUser="deleteUser($event)"
        :botList="botList"
      ></bot-list>
    </div>
    <div v-if="userModal">
      <b-modal :active.sync="isUserEditingActive" class="botcreation">
        <div class>
          <header class="modal-card-head">
            <p class="titleMessage">
              Editing
              <strong>{{ userModal.username }}</strong>
            </p>
          </header>
          <section class="modal-card-body">
            <div class="mediaModalBet">
              <div class="media-left">
                <figure class="image is-64x64 is-circle">
                  <img
                    loading="lazy"
                    class="imgProfile"
                    :src="userModal.picProfile"
                    alt="Image"
                  />
                </figure>
              </div>
              <div class="displayFlex">
                <p>
                  Created at :{{
                    moment(userModal.created_at).format("DD-MM-YYYY HH:mm")
                  }}
                </p>

                <p>
                  Updated at :{{
                    moment(userModal.updated_at).format("DD-MM-YYYY HH:mm")
                  }}
                </p>
              </div>
              <hr />
              <b-field label="userName">
                <b-input v-model="userModal.username"></b-input>
              </b-field>
              <div class="displayFlex">
                <b-field label="location">
                  <b-input v-model="userModal.location"></b-input>
                </b-field>
                <b-field label="lang">
                  <b-input v-model="userModal.lang"></b-input>
                </b-field>
              </div>
              <div class="displayFlex">
                <b-field label="level">
                  <b-input v-model="userModal.level"></b-input>
                </b-field>
                <b-field label="role">
                  <b-input v-model="userModal.role"></b-input>
                </b-field>
                <b-field label="insider">
                  <b-select v-model="userModal.insider">
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </b-select>
                </b-field>
              </div>
              <b-field label="CoverPix">
                <b-input v-model="userModal.coverPix"></b-input>
              </b-field>

              <hr />
              <b-field label="Update user photo">
                <croppa
                  v-model="image"
                  :prevent-white-space="false"
                  :reverse-scroll-to-zoom="true"
                  :show-loading="true"
                  :loading-size="50"
                  :accept="'image/*'"
                  initial-image
                  :width="150"
                  :height="150"
                  :quality="1"
                  :placeholder-font-size="18"
                ></croppa
                >&nbsp
                <b-input placeholder="url photo" v-model="url"></b-input>
              </b-field>
              <div v-if="userModal.role == 'bot'">
                <b-field label="typeOfScrap"></b-field>
                <div class="marginBottom">
                  <b-checkbox
                    v-model="userModal.typeOfScrap"
                    native-value="podcast"
                    >&nbsppodcast</b-checkbox
                  >
                  <b-checkbox
                    v-model="userModal.typeOfScrap"
                    native-value="youtube"
                    >&nbspyoutube</b-checkbox
                  >
                  <b-checkbox
                    v-model="userModal.typeOfScrap"
                    native-value="twitter"
                    >&nbsptwitter</b-checkbox
                  >
                  <b-checkbox v-model="userModal.typeOfScrap" native-value="rss"
                    >&nbsprss</b-checkbox
                  >
                  <b-checkbox
                    v-model="userModal.typeOfScrap"
                    native-value="news"
                    >&nbspnews</b-checkbox
                  >
                  <b-checkbox
                    v-model="userModal.typeOfScrap"
                    native-value="instagram"
                    >&nbspinstagram</b-checkbox
                  >
                </div>

                <b-field label="youtubeChannel">
                  <b-input v-model="userModal.youtubeChannel"></b-input>
                </b-field>
                <b-field label="twitterId">
                  <b-input v-model="userModal.twitterId"></b-input>
                </b-field>

                <b-field label="rssAddress">
                  <b-input v-model="userModal.rssAddress"></b-input>
                </b-field>
                <b-field label="podcastAddress">
                  <b-input v-model="userModal.podcastAddress"></b-input>
                </b-field>
                <b-field label="instagramId">
                  <b-input v-model="userModal.instagramId"></b-input>
                </b-field>
                <div class="displayFlex">
                  <b-field label="is_news">
                    <b-select v-model="userModal.is_news">
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </b-select>
                  </b-field>
                </div>
                <b-field label="Team">
                  <multiselect
                    :custom-label="customLabel"
                    v-model="team"
                    placeholder="Club"
                    :loading="loading"
                    :options="options"
                    :close-on-select="true"
                    @search-change="asyncFind"
                    @close="closeMulti()"
                    :showNoOptions="false"
                    track-by="name"
                    label="name"
                    :hideSelected="true"
                    :multiple="false"
                    :allowEmpty="true"
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

                    <span slot="noResult">{{
                      langSelected === "EN"
                        ? "no matching results!"
                        : "pas de résultats correspondants !"
                    }}</span>
                  </multiselect>
                </b-field>
                <b-field label="Joueur">
                  <multiselect
                    :custom-label="customLabelPlayer"
                    v-model="player"
                    placeholder="Joueur"
                    :options="optionPlayers"
                    :close-on-select="true"
                    @search-change="asyncFindPlayer"
                    :showNoOptions="false"
                    track-by="searchName"
                    label="searchName"
                    :multiple="false"
                    :allowEmpty="true"
                  >
                    <template slot="option" slot-scope="props">
                      <div class="searchWrap">
                        <img
                          loading="lazy"
                          class="option__image navImg roudImg"
                          :src="props.option.img"
                          alt="player"
                        />
                        <div class="option__desc">
                          <span class="option__title">{{
                            props.option.searchName
                          }}</span>
                        </div>
                      </div>
                    </template>
                    <span slot="noResult">{{
                      langSelected === "EN"
                        ? "no matching results!"
                        : "pas de résultats correspondants !"
                    }}</span>
                  </multiselect>
                </b-field>
              </div>
            </div>
            <b-notification v-if="error" type="is-danger" has-icon>{{
              error
            }}</b-notification>
          </section>
          <footer class="modal-card-foot">
            <p class="control">
              <button
                id="adWL"
                class="button is-small is-outlined is-primary"
                @click="saveUpdate"
              >
                Save modifications
              </button>
            </p>
          </footer>
        </div>
      </b-modal>
    </div>

    <div v-if="deleteModale">
      <b-modal :active.sync="isUserDeletingActive">
        <div class="mediaModal">
          <div class="card profile-card">
            <h1 class="is-size-3">T'es sur de vouloir effacer ce user ????</h1>
            <br />
            <div class="displayFlex">
              <button
                class="button is-danger is-outlined is-large"
                @click="deleteUser(deleteModale)"
                name="button"
              >
                YES - ERASE IT!
              </button>
              <button
                class="button is-success is-outlined is-large"
                @click="noDelete()"
                name="button"
              >
                NO ... My mistake
              </button>
            </div>
          </div>
        </div>
      </b-modal>
    </div>

    <b-modal :active.sync="createBotModal" class="botcreation">
      <div class>
        <header class="modal-card-head">
          <p class="titleMessage">Création d'un bot</p>
        </header>
        <section class="modal-card-body">
          <div class="mediaModalBet">
            <b-field label="userName">
              <b-input v-model="userCreate.username"></b-input>
            </b-field>

            <b-field label="CoverPix">
              <b-input v-model="userCreate.coverPix"></b-input>
            </b-field>

            <hr />
            <b-field label="user photo">
              <croppa
                v-model="image"
                :prevent-white-space="false"
                :reverse-scroll-to-zoom="true"
                :show-loading="true"
                :loading-size="50"
                :accept="'image/*'"
                initial-image
                :width="150"
                :height="150"
                :quality="1"
                :placeholder-font-size="18"
              ></croppa
              >&nbsp
              <b-input placeholder="url photo" v-model="url"></b-input>
            </b-field>

            <b-field label="typeOfScrap"></b-field>
            <div class="marginBottom">
              <b-checkbox
                v-model="userCreate.typeOfScrap"
                native-value="podcast"
                >&nbsppodcast</b-checkbox
              >
              <b-checkbox
                v-model="userCreate.typeOfScrap"
                native-value="youtube"
                >&nbspyoutube</b-checkbox
              >
              <b-checkbox
                v-model="userCreate.typeOfScrap"
                native-value="twitter"
                >&nbsptwitter</b-checkbox
              >
              <b-checkbox v-model="userCreate.typeOfScrap" native-value="rss"
                >&nbsprss</b-checkbox
              >
              <b-checkbox v-model="userCreate.typeOfScrap" native-value="news"
                >&nbspnews</b-checkbox
              >
              <b-checkbox
                v-model="userCreate.typeOfScrap"
                native-value="instagram"
                >&nbspinstagram</b-checkbox
              >
            </div>

            <b-field label="youtubeChannel">
              <b-input v-model="userCreate.youtubeChannel"></b-input>
            </b-field>
            <b-field label="twitterId">
              <b-input v-model="userCreate.twitterId"></b-input>
            </b-field>
            <b-field label="rssAddress">
              <b-input v-model="userCreate.rssAddress"></b-input>
            </b-field>

            <b-field label="podcastAddress">
              <b-input v-model="userCreate.podcastAddress"></b-input>
            </b-field>
            <b-field label="instagramId">
              <b-input v-model="userCreate.instagramId"></b-input>
            </b-field>

            <b-field label="is_news">
              <b-select v-model="userCreate.is_news">
                <option value="true">true</option>
                <option value="false">false</option>
              </b-select>
            </b-field>
            <b-field label="insider">
              <b-select v-model="userCreate.insider">
                <option value="true">true</option>
                <option value="false">false</option>
              </b-select>
            </b-field>

            <b-field label="Team">
              <multiselect
                :custom-label="customLabel"
                v-model="team"
                placeholder="Club"
                :loading="loading"
                :options="options"
                :close-on-select="true"
                @search-change="asyncFind"
                @close="closeMulti()"
                :showNoOptions="false"
                track-by="name"
                label="name"
                :hideSelected="true"
                :multiple="false"
                :allowEmpty="true"
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

                <span slot="noResult">{{
                  langSelected === "EN"
                    ? "no matching results!"
                    : "pas de résultats correspondants !"
                }}</span>
              </multiselect>
            </b-field>
            <b-field label="Joueur">
              <multiselect
                :custom-label="customLabelPlayer"
                v-model="player"
                placeholder="Joueur"
                :options="optionPlayers"
                :close-on-select="true"
                @search-change="asyncFindPlayer"
                :showNoOptions="false"
                track-by="searchName"
                label="searchName"
                :multiple="false"
                :allowEmpty="true"
              >
                <template slot="option" slot-scope="props">
                  <div class="searchWrap">
                    <img
                      loading="lazy"
                      class="option__image navImg roudImg"
                      :src="props.option.img"
                      alt="player"
                    />
                    <div class="option__desc">
                      <span class="option__title">{{
                        props.option.searchName
                      }}</span>
                    </div>
                  </div>
                </template>
                <span slot="noResult">{{
                  langSelected === "EN"
                    ? "no matching results!"
                    : "pas de résultats correspondants !"
                }}</span>
              </multiselect>
            </b-field>
          </div>
        </section>
        <footer class="modal-card-foot">
          <p class="control">
            <button
              id="adWL"
              class="button is-small is-outlined is-primary"
              @click="saveCreateBot"
            >
              Save
            </button>
          </p>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { searchTeam, searchAll } from "@/server/apiSearch";
import {
  getNewsBot,
  createUser,
  getUsersList,
  userUpdate,
  userDelete,
  updateRoundWon,
  createBot,
  getBotByQuery,
  updateBot,
} from "@/server/apiAdmin";
import moment from "moment";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
    botList: () => import("@/components/adminOld/botList"),
  },

  data() {
    return {
      total: 0,
      loading: false,
      defaultSortField: "position",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 150,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      search_query: "",
      userList: "",
      isUserEditingActive: false,
      isUserDeletingActive: false,
      userModal: {
        typeOfScrap: [],
      },
      image: null,
      deleteModale: "",
      seeBotactiv: false,
      allUser: "",
      options: [],
      team: "",
      userCreate: {
        typeOfScrap: [],
      },
      createBotModal: false,
      error: "",
      optionPlayers: [],
      player: "",
      url: "",
      botList: [],
    };
  },
  mounted() {
    if (this.connectedUser.role != "admin") {
      this.$router.push(`/`);
    } else {
      getUsersList().then((userList) => {
        if (userList === "unauthorized") {
          this.$router.push("/404");
        } else {
          this.allUser = userList;
          this.userList = this.allUser.filter((u) => u.role != "bot");
        }
      });
      getBotByQuery().then((botList) => {
        if (botList === "unauthorized") {
          this.$router.push("/404");
        } else {
          this.botList = botList;
        }
      });
    }
  },
  computed: {
    connectedUser() {
      return this.$store.state.auth.user;
    },
    filter: function () {
      var name_re = new RegExp(this.search_query, "i");
      var userList = [];
      for (var i = 0; i < this.userList.length; i++) {
        if (
          (this.userList[i].email
            ? this.userList[i].email.match(name_re)
            : "") ||
          (this.userList[i]._id ? this.userList[i]._id.match(name_re) : "")
        ) {
          userList.push(this.userList[i]);
        }
      }
      return userList;
    },
  },
  methods: {
    botUpdate() {
      getBotByQuery().then((botList) => {
        if (botList === "unauthorized") {
          this.$router.push("/404");
        } else {
          this.botList = botList;
          this.seeBotactiv = true;
        }
      });
    },
    asyncFindPlayer(query) {
      this.optionPlayers = [];
      if (query[1]) {
        searchAll(query.toLowerCase()).then((resp) => {
          let optionPlayer = {};

          if (resp.players.length > 0) {
            optionPlayer = resp.players.map((p) => {
              return {
                searchName: p.display_name ? p.display_name : p.name,
                shortName: p.id_sportmonks,
                type: "Joueurs",
                img:
                  p.picture && p.picture.includes("data:image/jpeg")
                    ? p.picture.replace("data:image/jpeg;", "data:image/png;")
                    : p.picture,
              };
            });
            this.optionPlayers = optionPlayer;
          }
        });
      } else {
        this.optionPlayers = [];
      }
    },

    customLabelPlayer({ searchName, shortName, name, type }) {
      if (searchName) {
        return `${searchName}`;
      } else {
        return [];
      }
    },
    goGetNews(event) {
      getBotByQuery({ user: event._id }).then((resp) => {
        if (resp && resp[0].typeOfScrap.length > 1) {
          for (let i = 0; i < resp[0].typeOfScrap.length; i++) {
            if (i == resp[0].typeOfScrap.length - 1) {
              getNewsBot(resp[0]._id, resp[0].typeOfScrap[i], resp[0]).then(
                (resp) => {
                  this.$buefy.toast.open({
                    message: "C'est parti",
                    type: "is-success",
                  });
                }
              );
            } else {
              getNewsBot(resp[0]._id, resp[0].typeOfScrap[i], resp[0]).then(
                (resp) => {}
              );
            }
          }
        } else {
          getNewsBot(resp[0]._id, resp[0].typeOfScrap[0], resp[0]).then(
            (resp) => {
              this.$buefy.toast.open({
                message: "C'est parti",
                type: "is-success",
              });
            }
          );
        }
      });
    },
    saveCreateBot() {
      this.image && this.image.imageSet === true ? this.generateImage() : "";

      let user = {
        email: this.userCreate.username
          .trim()
          .replace(/ /g, "")
          .concat("@footfoot.co"),
        username: this.userCreate.username,
        lang: "FR",
        role: "bot",
        picProfile: this.url,
        coverPix: this.userCreate.coverPix,
      };
      if (this.team) {
        user.fanTeam = this.team._id;
      }
      createUser(user).then((r) => {
        let botCreate = {};
        botCreate.user = r._id;
        if (this.team) {
          botCreate.fanTeam = this.team._id;
        }

        botCreate.typeOfScrap = this.userCreate.typeOfScrap;
        botCreate.youtubeChannel = this.userCreate.youtubeChannel;
        botCreate.twitterId = this.userCreate.twitterId;
        botCreate.rssAddress = this.userCreate.rssAddress;
        botCreate.podcastAddress = this.userCreate.podcastAddress;
        botCreate.instagramId = this.userCreate.instagramId;
        botCreate.is_news = this.userCreate.is_news;
        botCreate.insider = this.userCreate.insider;
        createBot(botCreate).then((response) => {
          getUsersList().then((userList) => {
            if (userList === "unauthorized") {
              this.$router.push("/404");
            } else {
              this.$buefy.toast.open({
                message: "Bot créé",
                type: "is-success",
              });
              this.createBotModal = false;
              this.allUser = userList;
              this.userList = userList;
            }
          });
        });
      });
    },
    createBot() {
      this.image = null;
      this.url = "";
      this.createBotModal = true;
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
        return `${name} – ${searchName} -${shortName}`;
      } else {
        return [];
      }
    },
    seeBot() {
      this.seeBotactiv = true;
    },
    unseeBot() {
      this.seeBotactiv = false;
    },
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;

      window.scrollTo(0, top);
    },
    updateContestWon() {
      updateRoundWon().then((resp) => {
        this.$buefy.toast.open({
          message: "Round won updated!",
          type: "is-success",
        });
      });
    },
    moment: function (time) {
      return moment(time);
    },
    editUser(user) {
      this.team = "";
      this.image = null;
      this.url = "";
      if (user.role == "bot") {
        getBotByQuery({ user: user._id }).then((resp) => {
          this.userModal = { ...user, ...resp[0] };
          this.userModal.typeOfScrap = "" ? [] : this.userModal.typeOfScrap;
          this.isUserEditingActive = true;
          if (this.userModal.fanTeam) {
            this.team = {};
            this.team._id = this.userModal.fanTeam._id;
            this.team.name = this.userModal.fanTeam.name;
            this.team.shortName = this.userModal.fanTeam.shortName;
            this.team.teamImg = this.userModal.fanTeam.teamImg;
          } else {
            this.team = "";
          }
          if (this.userModal.fanPlayer) {
            this.player = {};
            this.player._id = this.userModal.fanPlayer;
          } else {
            this.player = "";
          }
        });
      } else {
        this.userModal = user;
        if (user.fanTeam) {
          this.team = {};
          this.team._id = this.userModal.fanTeam._id;
          this.team.name = this.userModal.fanTeam.name;
          this.team.shortName = this.userModal.fanTeam.shortName;
          this.team.teamImg = this.userModal.fanTeam.teamImg;
        } else {
          this.team = "";
        }
        if (user.fanPlayer) {
          this.player = {};
          this.player._id = user.fanPlayer;
        } else {
          this.player = "";
        }
        this.userModal.typeOfScrap = [];
        this.isUserEditingActive = true;
      }
    },
    saveUpdate() {
      let userId = this.userModal.user
        ? this.userModal.user._id
        : this.userModal._id;
      this.image && this.image.imageSet === true ? this.generateImage() : "";
      if (this.url === "") {
        this.url = this.userModal.picProfile;
      }

      let user = {};
      if (this.team) {
        user.fanTeam = this.team._id;
      }
      user.username = this.userModal.username;
      user.location = this.userModal.location;
      user.lang = this.userModal.lang;
      user.role = this.userModal.role;
      user.picProfile = this.url;
      user.level = this.userModal.level;

      this.error = "";
      userUpdate(user, userId).then((data) => {
        if (data === null) {
          this.error =
            this.$store.state.var.langSelected === "EN"
              ? "Username is already registered. Please choose another Username."
              : "Ce nom d'utilisateur est pris. Veuillez en choisir un autre.";
        } else {
          if (this.userModal.role == "bot") {
            let botUpdate = {};
            botUpdate.team = this.team._id;
            botUpdate.typeOfScrap = this.userModal.typeOfScrap;
            botUpdate.youtubeChannel = this.userModal.youtubeChannel;
            botUpdate.twitterId = this.userModal.twitterId;
            botUpdate.rssAddress = this.userModal.rssAddress;
            botUpdate.podcastAddress = this.userModal.podcastAddress;
            botUpdate.instagramId = this.userModal.instagramId;
            botUpdate.is_news = this.userModal.is_news;
            botUpdate.insider = this.userModal.insider;
            updateBot(this.userModal._id, botUpdate).then((response) => {
              this.$buefy.toast.open({
                message: "Bot mis à jour",
                type: "is-success",
              });
              this.isUserEditingActive = false;
              getUsersList().then((userList) => {
                if (userList === "unauthorized") {
                  this.$router.push("/404");
                } else {
                  this.allUser = userList;
                  this.userList = userList;
                }
              });
            });
          } else {
            this.isUserEditingActive = false;
            getUsersList().then((userList) => {
              if (userList === "unauthorized") {
                this.$router.push("/404");
              } else {
                this.allUser = userList;
                this.userList = userList;
              }
            });
          }
        }
      });
      //.catch(next);
    },
    generateImage: function () {
      let url = this.image.generateDataUrl();
      if (!url) {
        alert("no image");
        return;
      }
      this.url = url;
      this.url = url;
    },
    confirmDeleteUser(user) {
      this.deleteModale = user;
      this.isUserDeletingActive = true;
    },
    deleteUser(user) {
      userDelete(user._id).then((data) => {
        getUsersList().then((userList) => {
          if (userList === "unauthorized") {
            this.$router.push("/404");
          } else {
            this.allUser = userList;
            this.userList = userList;
            this.isUserDeletingActive = false;
            this.$buefy.toast.open({
              message: "Suppression réussie",
              type: "is-success",
            });
          }
        });
      });
      //.catch(next);
    },
    noDelete() {
      this.isUserDeletingActive = false;
    },
  },
};
</script>

<style scoped>
.botcreation {
  overflow-y: scroll;
}
.marginBottom {
  margin-bottom: 0.75rem;
}
.justifyCenter {
  display: flex;
  justify-content: center;
}
.displayFlex {
  justify-content: space-between;
}
.marginTop {
  margin-top: 5rem;
}
.searchField {
  margin-bottom: 15px;
}
.hero {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 15px;
  background: linear-gradient(90deg, #192b41, #296084);
  margin-top: -1rem;
}

.hero.welcome .title,
.hero.welcome .subtitle {
  color: hsl(192, 17%, 99%);
}

.helloText {
  text-align: left !important;
}
.mediaModalBet {
  max-width: 100%;
}
.hero.is-small .hero-body {
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
}

.hero-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 3rem 1rem;
}

.tile.is-ancestor:last-child {
  margin-bottom: -0.75rem;
}

.tile.is-ancestor {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;
}

.tile {
  align-items: stretch;
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: -webkit-min-content;
  min-height: -moz-min-content;
  min-height: min-content;
}
.has-text-centered {
  vertical-align: middle !important;
}

.insider {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
a {
  color: #192b41;
}
#no {
  text-align: CENTER;
  margin-top: 5%;
  font-weight: bold;
  color: #192b41;
}
.main {
  background-color: #eef1f7 !important;
  padding: 7rem 1.5rem;
}
.container {
  display: flex;
}

.navbar.is-dark {
  background-color: #192b41 !important;
  color: #eef1f7 !important;
}

.navbar-item.is-tab.is-active {
  background-color: transparent;
  border-bottom-color: #eef1f7 !important;
  border-bottom-style: solid !important;
  border-bottom-width: 3px !important;
  color: #eef1f7 !important;
  padding-bottom: calc(0.5rem - 3px) !important;
}
.babblesMenu {
  display: flex;
  overflow: auto;
}

.userWrapper {
  display: flex;
  flex-direction: column;
}
.image {
  margin: auto;
}

@media (max-width: 1047px) {
  .main {
    padding-top: 0.5rem !important;
  }
  .icon {
    height: 1.5em !important;
    width: 1.5em !important;
  }
  .control {
    height: 30px !important;
  }
  .navbar.is-dark {
    margin-bottom: 3% !important;
  }
}
</style>
