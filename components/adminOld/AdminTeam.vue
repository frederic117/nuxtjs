<template>
  <div v-if="$auth.user && $auth.user._id">
    <section v-if="connectedUser.role === 'admin'">
      <h1 class="title">
        Team administration : {{ teams.length }} teams registered.
      </h1>
      <!-- <br>
    <button class="btn-red" type="button" @click="updateTeamNatMatchList()"name="button">Update national teams calendar and results</button>
			<br>-->
      <br />
      <button
        class="btn-red"
        type="button"
        @click="updateClubSquad()"
        name="button"
      >
        Update clubs squad (mercato)
      </button>
      <br />
      <!-- <br>
    <button class="btn-red" type="button" @click="updateCompetitionWc()"name="button">Update Competition WC</button>
    <br>
			<br>-->
      <button
        class="btn-red"
        type="button"
        @click="updateCompetitionClub()"
        name="button"
      >
        Update Competition Club
      </button>
      <br />

      <br class="page" ref="top" />
      <button type="button" @click="addNewTeam()" name="button">
        Add a Team
      </button>
      <br />
      <hr />
      <br />
      <button @click="goto('bottom')">Go to bottom</button>
      <b-field v-if="teams.length > 0">
        <b-input placeholder="search" v-model="search_query" />
      </b-field>
      <b-table
        :data="filter"
        :loading="loading"
        :paginated="isPaginated"
        :per-page="perPage"
        :pagination-simple="isPaginationSimple"
        :total="total"
        :mobile-cards="false"
        :striped="true"
        :default-sort-direction="defaultSortOrder"
        :default-sort="defaultSortField"
      >
        <template slot-scope="props">
          <b-table-column field="date" sortable centered numeric label>
            <div class="journée">
              <figure class="image">
                <img
                  loading="lazy"
                  class
                  :src="props.row.teamImg"
                  alt="Image"
                />
              </figure>
            </div>
          </b-table-column>
          <b-table-column field="status" centered label="Team">
            <div class="journée">
              <nuxt-link
                v-if="props.row.shortName"
                :to="'/teams/' + props.row.shortName"
                data-replace="Symbol"
              >
                <strong>{{ props.row.name }}</strong>
              </nuxt-link>
              <strong v-else>{{ props.row.name }}</strong>
            </div>
          </b-table-column>
          <b-table-column field="status" centered label="shortName">
            <div v-if="props.row.shortName" class="journée">
              <strong>{{ props.row.shortName }}</strong>
            </div>
          </b-table-column>
          <b-table-column field="searchName" centered label="Search name">
            <div class="journée">
              <strong
                :class="
                  props.row.searchName && props.row.searchName.length > 10
                    ? 'has-text-red'
                    : ''
                "
                >{{ props.row.searchName }}</strong
              >
            </div>
          </b-table-column>
          <b-table-column field="status" centered label="isActive">
            <div class="journée">
              <strong>{{ props.row.isActive }}</strong>
            </div>
          </b-table-column>
          <b-table-column field="competition" centered label="Competition">
            <figure v-if="props.row.championship" class="image">
              <img
                loading="lazy"
                class="logoligue1"
                :src="'/logoLigue/' + props.row.championship + '.png'"
                alt="logoLigue"
              />
              <strong>{{ props.row.championship }}</strong>
            </figure>
          </b-table-column>

          <b-table-column centered>
            <div class="journée">
              <button type="button" @click="editTeam(props.row)" name="button">
                Edit
              </button>
            </div>
          </b-table-column>
          <b-table-column centered>
            <div class="journée">
              <button
                type="button"
                @click="confirmDeleteTeam(props.row)"
                name="button"
              >
                Delete
              </button>
            </div>
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon
                  icon="sentiment_very_satisfied"
                  size="is-large"
                ></b-icon>
              </p>
              <p>...loading</p>
            </div>
          </section>
        </template>
      </b-table>

      <button class="page" ref="bottom" @click="goto('top')">Go to top</button>

      <div v-if="teamModal">
        <b-modal :active.sync="isTeamEditingActive">
          <div class="mediaModal">
            <h1 class="modalTitle">Editing {{ teamModal.longName }} !</h1>

            <div class="card profile-card">
              <div class="card-content column is-12 is-center" id="ActionCard">
                <div>
                  <div class="media-left">
                    <figure class="image is-64x64 is-circle">
                      <img
                        loading="lazy"
                        class="imgProfile"
                        :src="teamModal.teamImg"
                        alt="Image"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-5">{{ teamModal.name }}</p>
                  </div>
                  <br />
                  <div>
                    <p>Id : {{ teamModal._id }}</p>
                  </div>
                  <div>
                    <p>
                      Created at :{{
                        moment(teamModal.created_at).format("DD-MM-YYYY HH:mm")
                      }}
                    </p>
                  </div>
                  <p>
                    Updated at :{{
                      moment(teamModal.updated_at).format("DD-MM-YYYY HH:mm")
                    }}
                  </p>
                  <br />
                  <hr />

                  <span>Name:</span>
                  <br />
                  <input
                    class="location"
                    type="text"
                    v-model="teamModal.name"
                  />
                  <br />
                  <hr />
                  <span>shortName:</span>
                  <br />
                  <input
                    class="location"
                    type="text"
                    v-model="teamModal.shortName"
                  />
                  <br />
                  <hr />
                  <span>searchName:</span>
                  <br />
                  <input
                    class="location"
                    type="text"
                    v-model="teamModal.searchName"
                  />
                  <br />
                  <hr />
                  <span>championship:</span>
                  <br />
                  <input
                    class="location"
                    type="text"
                    v-model="teamModal.championship"
                  />
                  <br />
                  <hr />
                  <span>coach:</span>
                  <br />
                  <input
                    class="location"
                    type="text"
                    v-model="teamModal.coach"
                  />
                  <br />
                  <hr />
                  <span>nextMatch:</span>
                  <br />
                  <input
                    class="location"
                    type="text"
                    v-model="teamModal.nextMatch"
                  />
                  <br />
                  <hr />
                  <span>shirtDom:</span>
                  <br />
                  <input
                    class="location"
                    type="text"
                    v-model="teamModal.shirtDom"
                  />
                  <br />
                  <hr />
                  <span>shirtExt:</span>
                  <br />
                  <input
                    class="location"
                    type="text"
                    v-model="teamModal.shirtExt"
                  />
                  <br />
                  <hr />
                  <span>playersLink:</span>
                  <br />
                  <input
                    class="location"
                    type="text"
                    v-model="teamModal.playersLink"
                  />
                  <br />
                  <hr />
                  <span>championshipRank:</span>
                  <br />
                  <input
                    class="location"
                    type="text"
                    v-model="teamModal.championshipRank"
                  />
                  <br />
                  <hr />
                  <span>players:</span>
                  <br />
                  <div
                    v-if="teamModal.players"
                    v-for="(player, index) in teamModal.players"
                    :key="index"
                    class="location"
                  >
                    <input type="text" v-model="teamModal.players[0 + index]" />
                  </div>
                  <br />
                  <hr />

                  <label>
                    <span>Update teamImg:</span>
                    <br />
                    <croppa
                      v-model="image"
                      :prevent-white-space="false"
                      :reverse-scroll-to-zoom="true"
                      :show-loading="true"
                      :loading-size="50"
                      :accept="'image/*'"
                      initial-image
                      :width="250"
                      :height="250"
                      :quality="1"
                      :placeholder-font-size="18"
                    ></croppa>
                  </label>
                  <br />
                  <hr />
                  <div class="centerButton">
                    <button
                      id="adWL"
                      class="button is-small is-outlined is-primary"
                      @click="saveUpdate"
                    >
                      Save modifications
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-modal>
      </div>
      <div v-if="deleteModale">
        <b-modal :active.sync="isTeamDeletingActive">
          <div class="mediaModal">
            <div class="card profile-card">
              <p>T'es sur de vouloir effacer cette action ????</p>

              <button
                type="button"
                @click="deleteTeam(deleteModale)"
                name="button"
              >
                YES - ERASE IT!
              </button>
              <button type="button" @click="noDelete()" name="button">
                NO ... My mistake
              </button>
            </div>
          </div>
        </b-modal>
      </div>

      <b-modal :active.sync="isTeamCreatingActive">
        <div class="mediaModal">
          <h1 class="modalTitle">Create a new team !</h1>

          <div class="card profile-card">
            <div class="card-content column is-12 is-center" id="ActionCard">
              <div>
                <span>Name:</span>
                <br />
                <input class="location" type="text" v-model="teamModal.name" />
                <br />
                <hr />
                <span>shortName:</span>
                <br />
                <input
                  class="location"
                  type="text"
                  v-model="teamModal.shortName"
                />
                <br />
                <hr />
                <span>searchName:</span>
                <br />
                <input
                  class="location"
                  type="text"
                  v-model="teamModal.searchName"
                />
                <br />
                <hr />
                <span>championship:</span>
                <br />
                <input
                  class="location"
                  type="text"
                  v-model="teamModal.championship"
                />
                <br />
                <hr />
                <span>coach:</span>
                <br />
                <input class="location" type="text" v-model="teamModal.coach" />
                <br />
                <hr />
                <span>nextMatch:</span>
                <br />
                <input
                  class="location"
                  type="text"
                  v-model="teamModal.nextMatch"
                />
                <br />
                <hr />
                <span>shirtDom:</span>
                <br />
                <input
                  class="location"
                  type="text"
                  v-model="teamModal.shirtDom"
                />
                <br />
                <hr />
                <span>shirtExt:</span>
                <br />
                <input
                  class="location"
                  type="text"
                  v-model="teamModal.shirtExt"
                />
                <br />
                <hr />
                <span>playersLink:</span>
                <br />
                <input
                  class="location"
                  type="text"
                  v-model="teamModal.playersLink"
                />
                <br />
                <hr />
                <span>championshipRank:</span>
                <br />
                <input
                  class="location"
                  type="text"
                  v-model="teamModal.championshipRank"
                />
                <br />
                <hr />
                <span>players:</span>
                <br />
                <div
                  v-if="teamModal.players"
                  v-for="(player, index) in teamModal.players"
                  :key="index"
                  class="location"
                >
                  <input type="text" v-model="teamModal.players[index]" />
                </div>
                <br />
                <hr />

                <label>
                  <span>Update teamImg:</span>
                  <br />
                  <croppa
                    v-model="image"
                    :prevent-white-space="false"
                    :reverse-scroll-to-zoom="true"
                    :show-loading="true"
                    :loading-size="50"
                    :accept="'image/*'"
                    initial-image
                    :width="250"
                    :height="250"
                    :quality="1"
                    :placeholder-font-size="18"
                  ></croppa>
                </label>
                <br />
                <hr />
                <div class="centerButton">
                  <button
                    id="adWL"
                    class="button is-small is-outlined is-primary"
                    @click="saveCreate()"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </section>
  </div>
</template>

<script>
import {
  getAllTeams,
  scorerUpdate,
  passUpdate,
  teamDelete,
  teamUpdate,
  teamCreate,
  updateNationalTeamCalendar,
  updateSquadMercato,
  competitionUpdate,
  competitionUpdateClub,
} from "@/server/apiAdmin";
import moment from "moment";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      search_query: "",
      total: 0,
      loading: false,
      defaultSortField: "position",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 150,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      teams: [],
      isTeamEditingActive: false,
      isTeamDeletingActive: false,
      isTeamCreatingActive: false,
      teamModal: {},
      deleteModale: "",

      ////start INDEX LIST
      options: [],
      //end INDEX LIST
      image: null,
    };
  },
  mounted() {
    if (this.connectedUser.role != "admin") {
      this.$router.push(`/`);
    } else {
      getAllTeams().then((teams) => {
        if (teams === "unauthorized") {
          this.$router.push("/404");
        } else {
          this.teams = teams;
        }
      });
    }
    //.catch(next);
  },
  computed: {
    connectedUser() {
      return this.$store.state.auth.user;
    },
    filter: function () {
      var name_re = new RegExp(this.search_query, "i");
      var teams = [];
      for (var i = 0; i < this.teams.length; i++) {
        if (
          this.teams[i].isActive.toString().match(name_re) ||
          this.teams[i].name.match(name_re) ||
          this.teams[i].shirtDom.match(name_re) ||
          this.teams[i].shirtExt.match(name_re)
        ) {
          teams.push(this.teams[i]);
        }
      }
      return teams;
    },
  },
  methods: {
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
    addNewTeam() {
      this.isTeamCreatingActive = true;
    },
    updateTeamNatMatchList() {
      updateNationalTeamCalendar().then((data) => {
        alert("Mise à jour du calendrier des équipes : " + data);
      });
    },
    updateClubSquad() {
      updateSquadMercato().then((data) => {
        alert("Mise à jour des joueurs, entraineurs + transfert : " + data);
      });
    },
    updateCompetitionWc() {
      competitionUpdate().then((data) => {
        alert("Mise à jour du trending World Cup : " + data);
      });
    },
    updateCompetitionClub() {
      competitionUpdateClub().then((data) => {
        alert("Mise à jour du clussement des championnats : " + data);
      });
    },

    saveCreate() {
      this.image.imageSet === true ? this.generateImage() : "";
      teamCreate(this.teamModal).then((data) => {
        getAllTeams().then((teams) => {
          if (teams === "unauthorized") {
            this.$router.push("/404");
          } else {
            this.teams = teams;
            this.isTeamCreatingActive = false;
          }
        });
      });
      //.catch(next);
    },
    editTeam(team) {
      this.teamModal = team;
      this.isTeamEditingActive = true;
      this.url = this.teamModal.teamImg;
    },
    confirmDeleteTeam(team) {
      this.deleteModale = team;
      this.isTeamDeletingActive = true;
    },
    deleteTeam(team) {
      teamDelete(team._id).then((data) => {
        getAllTeams().then((teams) => {
          if (teams === "unauthorized") {
            this.$router.push("/404");
          } else {
            this.teams = teams;
            this.isTeamDeletingActive = false;
            alert("success");
          }
        });
      });
      //.catch(next);
    },
    noDelete() {
      this.isTeamDeletingActive = false;
    },
    moment: function (time) {
      return moment(time);
    },
    saveUpdate() {
      let teamId = this.teamModal._id;
      this.image.imageSet === true ? this.generateImage() : "";
      teamUpdate({
        _id: this.teamModal._id,
        name: this.teamModal.name,
        shortName: this.teamModal.shortName,
        searchName: this.teamModal.searchName,
        championship: this.teamModal.championship,
        coach: this.teamModal.coach,
        nextMatch: this.teamModal.nextMatch,
        shirtDom: this.teamModal.shirtDom,
        shirtExt: this.teamModal.shirtExt,
        championshipRank: this.teamModal.championshipRank,
      }).then((data) => {
        this.isTeamEditingActive = false;
        getAllTeams().then((teams) => {
          if (teams === "unauthorized") {
            this.$router.push("/404");
          } else {
            this.teams = teams;
          }
        });
      });
      //.catch(next);
    },
    generateImage: function () {
      let url = this.image.generateDataUrl("image/jpeg", 0.8);
      if (!url) {
        alert("no image");
        return;
      }
      this.teamModal.teamImg = url;
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
tr {
  margin: 25px;
  padding: 10px 30px;
}
input {
  width: 100%;
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
.insider {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
a {
  color: #192b41;
}
.modal-content {
  overflow: OVERLAY !important;
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

.image {
  width: 48px !important;
  margin-right: 20px !important;
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
