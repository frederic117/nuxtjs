<template>
  <div v-if="$auth.user&&$auth.user._id && teams.length>0">
  <section v-if="connectedUser.role==='admin'" class="">
    <h1 class= "title">
      match administration : {{teams.length}} Matchs registered.
    </h1>
    <div class="adminMatchButon">
    <button class="btn-red" type="button" @click="closeOldWatchitems()" name="button">Close positions on matchs finished</button>
  
    <button class="btn-red" type="button" @click="generalUpdate()" name="button">Mise à jours des next matchs</button>
   
    <button class="btn-red" type="button" @click="allMatchsUpdate()" name="button">MAJ past / upcoming matchs</button>
   </div>
      <br class="page" ref="top">
      <button type="button" @click="addNewTeam()" name="button">Create a match</button>
      <br>
      <br>
      <button @click="goto('bottom')">Go to bottom</button>
      <br><br>


      <!-- <article class="message is-warning">
          <div class="message-header">
            <p>Choisis la compétition :</p>
          </div>
          <div class="message-body">
            <multiselect @input="competSelect(competitions)" v-model="competitions" :close-on-select="true" :options="options" :multiple="true"></multiselect>
          </div>
      </article>-->

      <button class="button" @click="finished()" >Status Finished</button> &nbsp &nbsp
      <button class="button" @click="notFinished()" >Status != Finished</button>
    <br>
    <b-field v-if="teams.length>0">
      <b-input placeholder="search" v-model="search_query" />
    </b-field>
    <br>
    <section>
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
                <b-table-column  field='date' sortable centered numeric label="Date">
                  <div class="journée">

                        <strong  class='has-text-yellow'>
                           {{moment(props.row.date).local().format('DD-MM-YYYY HH:mm')}}
                        </strong>

                  </div>
                </b-table-column>
                <b-table-column  field='competition' centered label="Competition">
                  <figure class="image">
                    <img loading="lazy"class ="logoligue1" :src="'/logoLigue/'+props.row.codeCompetitionApi+'.png'" alt="logoLigue">
                  </figure>
                  <strong > {{props.row.codeCompetitionApi}}</strong>

                </b-table-column>
                <b-table-column   field='status' centered label="Status">
                  <div  class="journée">
                         <strong > {{props.row.status}}</strong>
                  </div>
                </b-table-column>
                <b-table-column   field='status' centered label="codeMatchApi">
                  <div  class="journée">
                         <strong > {{props.row.codeMatchApi}}</strong>
                  </div>
                </b-table-column>
                <b-table-column  field='home' centered label="Home team">
                  <div  class="journée">
                        <strong> {{props.row.homeTeamName}}</strong>
                  </div>
                </b-table-column>
                <b-table-column  field='away' centered label="Away team">
                  <div  class="journée">
                        <strong> {{props.row.awayTeamName}}</strong>
                  </div>
                </b-table-column>
                <b-table-column  field='result' centered label="result">
                  <div  class="journée">
                        <strong> {{props.row.goalsHomeTeam}} : {{props.row.goalsAwayTeam}}</strong>
                  </div>
                </b-table-column>
                <b-table-column centered>
                  <div  class="journée">
                        <button type="button" @click="editTeam(props.row)" name="button">Edit</button>
                  </div>
                </b-table-column>
                <b-table-column centered>
                  <div  class="journée">
                        <button type="button" @click="confirmDeleteTeam(props.row)"name="button">Delete</button>
                  </div>
                </b-table-column>
                <b-table-column centered >
                  <div  class="journée">
                       <button type="button" @click="updateMatch(props.row)"name="button">Update match events</button>
                  </div>
                </b-table-column>
            </template>
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="sentiment_very_satisfied"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>...loading</p>
                    </div>
                </section>
            </template>
        </b-table>
    </section>
    <button class="page" ref="bottom" @click="goto('top')">Go to top</button>


      <div v-if= "teamModal">

      <b-modal :active.sync="isTeamEditingActive">
          <div class="mediaModal">
                  <h1 class="modalTitle">
                      Editing match {{teamModal.homeTeamName}}:{{teamModal.awayTeamName}} !
                  </h1>

                    <div class="card profile-card">
                      <div class="card-content column is-6 is-center"id="ActionCard">
                        <div >
                          <div class="media-content">
                          </div>
                          <br>
                          <div >
                            <p >
                              Id : {{teamModal._id}}
                            </p>
                          </div>
                          <div >
                            <p >
                              Created at :{{moment(teamModal.created_at).format('DD-MM-YYYY HH:mm')}}
                            </p>
                          </div>
                            <p >
                              Updated at :{{moment(teamModal.updated_at).format('DD-MM-YYYY HH:mm')}}
                            </p>
                            <br><hr>

                            <span>Date:</span><br>
                          <input class="location" type="text" v-model="teamModal.date"/>
                            <br><hr>
                            <span>Competition:</span><br>
                              <multiselect v-model="teamModal.competition" :options="options"></multiselect>
                             <hr>
                            <span>codeMatchApi:</span><br>
                              <input class="location" type="number" v-model="teamModal.codeMatchApi" :options="options"></input>
                             <hr>
                            <span>Home team by Id:</span><br>
                            <input class="location" type="text" v-model="teamModal.homeTeamId"/>
                            <br><hr>
                            <span>Home team Name:</span><br>
                            <input class="location" type="text" v-model="teamModal.homeTeamName"/>
                            <br><hr>

                            <span>Away team by Id:</span><br>
                              <input class="location" type="text" v-model="teamModal.awayTeamId"/>
                            <br><hr>
                            <span>Away team Name:</span><br>
                              <input class="location" type="text" v-model="teamModal.awayTeamName"/>
                            <br><hr>
                            <span>Result</span><br>
                              <input class="location" type="number" v-model="teamModal.goalsHomeTeam"/>
                              <input class="location" type="number" v-model="teamModal.goalsAwayTeam"/>
                            <br><hr>
                            <span>status</span><br>
                              <multiselect v-model="teamModal.status" :options="statusMatch" ></multiselect>
                            <br><hr>
                          <br><hr>
                              <br><hr>
                              <div class ="centerButton"><button id="adWL" class="button is-small is-outlined is-primary" @click="saveUpdate">Save modifications</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

      </b-modal>
      </div>
    <div v-if= "deleteModale">

      <b-modal :active.sync="isTeamDeletingActive">
        <div class="mediaModal">
          <div class="card profile-card">
        <p>T'es sur de vouloir effacer ce match  ????</p>

        <button type="button" @click="deleteTeam(deleteModale)" name="button">YES - ERASE IT!</button>
        <button type="button" @click="noDelete()" name="button">NO ... My mistake</button>
      </div>
      </div>
      </b-modal>
    </div>


    <b-modal :active.sync="isTeamCreatingActive">
        <div class="mediaModal">
                <h1 class="modalTitle">
                    Create a new team !
                </h1>

                  <div class="card profile-card">
                    <div class="card-content column is-6 is-center"id="ActionCard">
                      <div >

                              <span>Date:</span><br>
                            <input class="location" type="text" v-model="teamModal.date"/>
                              <br><hr>
                              <span>Competition:</span><br>
                                <multiselect v-model="teamModal.index" :options="options"></multiselect>
                               <hr>
                              <span>Home team by Id:</span><br>
                              <input class="location" type="text" v-model="teamModal.homeTeamId"/>
                              <br><hr>
                              <span>Home team Name:</span><br>
                              <input class="location" type="text" v-model="teamModal.homeTeamName"/>
                              <br><hr>

                              <span>Away team by Id:</span><br>
                                <input class="location" type="text" v-model="teamModal.awayTeamId"/>
                              <br><hr>
                              <span>Away team Name:</span><br>
                                <input class="location" type="text" v-model="teamModal.awayTeamName"/>
                              <br><hr>
                              <span>Result</span><br>
                                <input class="location" type="number" v-model="teamModal.goalsHomeTeam"/>
                                <input class="location" type="number" v-model="teamModal.goalsAwayTeam"/>
                              <br><hr>
                              <span>status</span><br>
                                <multiselect v-model="teamModal.status" :options="statusMatch" ></multiselect>
                              <br><hr>
                            <br><hr>
                            <div class ="centerButton"><button id="adWL" class="button is-small is-outlined is-primary" @click="saveCreate()">Save</button>
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
  getAllMatchs,
  matchUpdate,
  matchUpdateEvents,
  matchDelete,
  matchCreate,
  updateNextmatch,
  scoreUpdate,
  updateAllMatch,
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
      options: ["FL1", "BL1", "SA", "PD", "PL", "CL", "EL", "AUTRE"],
      statusMatch: [
        "NS",
        "FT",
        "LIVE",
        "HT",
        "FT",
        "ET",
        "PEN_LIVE",
        "AET",
        "BREAK",
        "FT_PEN",
        "CANCL",
        "POSTP",
        "INT",
        "ABAN",
        "SUSP",
        "AWARDED",
        "DELAYED",
        "TBA",
        "WO",
        "AU",
        "Deleted",
      ],
      image: null,
      options: [],
      matchSelection: [],
      competitions: "",
    };
  },
  mounted() {
    if (this.connectedUser.role != "admin") {
      this.$router.push(`/`);
    } else {
      getAllMatchs().then((teams) => {
        if (teams === "unauthorized") {
          this.$router.push("/404");
        } else {
          this.teams = teams;
          this.matchSelection = teams;
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
      var matchSelection = [];
      for (var i = 0; i < this.matchSelection.length; i++) {
        if (
          (this.matchSelection[i].status
            ? this.matchSelection[i].status.match(name_re)
            : "") ||
          (this.matchSelection[i].date
            ? moment(this.matchSelection[i].date)
                .utc()
                .format("DD/MM/YY")
                .match(name_re)
            : "") ||
          (this.matchSelection[i].codeCompetitionApi
            ? this.matchSelection[i].codeCompetitionApi
                .toString()
                .match(name_re)
            : "") ||
          (this.matchSelection[i].codeMatchApi
            ? this.matchSelection[i].codeMatchApi.toString().match(name_re)
            : "") ||
          (this.matchSelection[i].homeTeamName
            ? this.matchSelection[i].homeTeamName.match(name_re)
            : "") ||
          (this.matchSelection[i].awayTeamName
            ? this.matchSelection[i].awayTeamName.match(name_re)
            : "")
        ) {
          matchSelection.push(this.matchSelection[i]);
        }
      }
      return matchSelection;
    },
  },
  methods: {
    finished() {
      if (this.competitions.length === 0) {
        this.matchSelection = this.teams.filter((m) => {
          return m.status.includes("FT");
        });
      } else {
        this.matchSelection = this.matchSelection.filter((m) => {
          return m.status.includes("FT");
        });
      }
    },
    notFinished() {
      if (this.competitions.length === 0) {
        this.matchSelection = this.teams.filter((m) => {
          return !m.status.includes("FT");
        });
      } else {
        this.matchSelection = this.matchSelection.filter((m) => {
          return !m.status.includes("FT");
        });
      }
    },
    competSelect(competitions) {
      if (competitions.length === 0) {
        this.matchSelection = this.teams;
      } else {
        this.competitions = competitions;
        this.matchSelection = this.teams.filter((m) => {
          return competitions.some((c) => m.codeCompetitionApi === c);
        });
      }
    },
    goto(refName) {
      var element = this.$refs[refName];

      var top = element.offsetTop;

      window.scrollTo(0, top);
    },
    addNewTeam() {
      this.isTeamCreatingActive = true;
    },
    generalUpdate() {
      updateNextmatch().then((data) => {
        alert("Mise à jour des matchs " + data);
      });
    },
    allMatchsUpdate() {
      updateAllMatch().then((data) => {
        alert("Mise à jour des matchs passés et futurs (1 mois)" + data);
      });
    },
    updateMatch(team) {
      matchUpdateEvents(team.codeMatchApi).then((data) => {
        alert("Mise à jour du match " + data);
      });
    },
    closeOldWatchitems() {
      scoreUpdate().then((data) => {
        data === "No updates"
          ? alert(
              "Mise à jour des Watchitems réussie! => positions closed : " +
                data
            )
          : alert(
              "Mise à jour des Watchitems réussie! => positions closed contest : " +
                data
            );
      });
    },
    saveCreate() {
      matchCreate(this.teamModal).then((data) => {
        getAllMatchs().then((teams) => {
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
      matchDelete(team._id).then((data) => {
        getAllMatchs().then((teams) => {
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

      matchUpdate(
        this.teamModal._id,
        this.teamModal.competition,
        this.teamModal.status,
        this.teamModal.date,
        this.teamModal.goalsAwayTeam,
        this.teamModal.goalsHomeTeam,
        this.teamModal.homeTeamId,
        this.teamModal.awayTeamId,
        this.teamModal.homeTeamName,
        this.teamModal.awayTeamName,
        this.teamModal.codeMatchApi
      ).then((data) => {
        this.isTeamEditingActive = false;
        getAllMatchs().then((teams) => {
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
.image {
  width: 45px;
  margin: auto;
}
.has-text-centered {
  vertical-align: middle;
}
tr {
  margin: 25px;
  padding: 10px 30px;
}
.adminMatchButon {
  display: flex;
}
.table-centered {
  align-self: center !important;
}
td {
  align-self: center !important;
}
strong {
  text-align: center !important;
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
