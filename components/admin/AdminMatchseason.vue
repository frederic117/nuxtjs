<template>
  <section>
    <section class="hero welcome is-small">
      <div class="hero-body">
        <div class>
          <h1 class="title helloText">Bonjour {{ $auth.user.username }},</h1>
          <h2 class="subtitle">Gestion des matchs par saison</h2>
        </div>
        <!-- <button
          v-if="activeTab == 0"
          class="button has-text-contest"
          @click="calculateAllBets()"
        >
          Calculer Bets
        </button> -->
      </div>
    </section>
    <div v-if="detail.length > 0">
      <section class="info-tiles">
        <div class="tile is-ancestor has-text-centered">
          <div class="pointer tile is-parent">
            <article class="tile is-child box teamNameLogo">
              <strong class="displayFlex is-size-3">
                Matchs de
                <figure class="image">
                  <img
                    loading="lazy"
                    class="logoligue1"
                    :src="'/logoLigue/' + matches[0].league_id + '.png'"
                    alt="logoLigue"
                  />
                </figure>
                Saison
                {{
                  moment(matches[0].time.starting_at.date_time)
                    .local()
                    .format("YYYY")
                }}
                -
                {{
                  moment(matches[0].time.starting_at.date_time)
                    .add(1, "years")
                    .local()
                    .format("YYYY")
                }}
              </strong>
              <br />
              <button
                v-if="detail.filter((m) => !m.existInInsider).length > 0"
                @click="createAllMatchs"
                class="button is-large is-success"
              >
                Créer les&nbsp
                <strong>{{
                  detail.filter((m) => !m.existInInsider).length
                }}</strong
                >&nbsp matchs
              </button>
              <div v-else class="is-large has-text-success is-size-3">
                Les&nbsp
                <strong>{{ detail.length }}</strong
                >&nbspmatchs ont été créés
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
    <br />
    <div class="container adminBtabs">
      <b-tabs v-model="activeTab" type="is-boxed" expanded>
        <b-tab-item>
          <template slot="header">
            <strong>Contest DB</strong>
          </template>
        </b-tab-item>
        <b-tab-item>
          <template slot="header">
            <strong>SportsMonk</strong>
          </template>
        </b-tab-item>
      </b-tabs>
    </div>
    <div v-if="activeTab == 0">
      <b-field v-if="insidersMatches.length > 0">
        <b-input placeholder="search" v-model="search_queryDB" />
      </b-field>

      <b-table
        :data="filterInsidersDB"
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
          <b-table-column field="id" sortable centered label="Id">
            <div class="journée">
              <strong>{{ props.row._id }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            field="id_sportmonks"
            sortable
            centered
            label="Id sportsMonk"
          >
            <div class="journée">
              <strong>{{ props.row.id_sportmonks }}</strong>
            </div>
          </b-table-column>
          <b-table-column field="date" sortable centered label="Date">
            <div class="journée">
              <strong class="has-text-yellow">{{
                moment(props.row.date).local().format("DD-MM-YYYY HH:mm")
              }}</strong>
            </div>
          </b-table-column>
          <b-table-column field="competition" centered label="Competition">
            <figure class="image">
              <img
                class="logoligue1"
                :src="'/logoLigue/' + props.row.codeCompetitionApi + '.png'"
                alt="logoLigue"
              />
            </figure>
            <strong>{{ props.row.codeCompetitionApi }}</strong>
          </b-table-column>
          <b-table-column field="matchday" sortable centered label="Journée">
            <div class="journée">
              <strong>{{ props.row.matchday }}</strong>
            </div>
          </b-table-column>
          <b-table-column field="status" sortable centered label="Status">
            <div class="journée">
              <strong>{{ props.row.status }}</strong>
            </div>
          </b-table-column>

          <b-table-column field="stadium.name" sortable centered label="Stade">
            <div class="journée">
              <strong>{{
                props.row.stadium ? props.row.stadium.name : ""
              }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            field="referee_name"
            sortable
            centered
            label="Arbitre"
          >
            <div class="journée">
              <strong>{{ props.row.referee_name }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            field="homeTeamId.name"
            searchable
            sortable
            centered
            label="localTeam name"
          >
            <div class="journée">
              <strong>{{
                props.row.homeTeamId && props.row.homeTeamId.name
                  ? props.row.homeTeamId.name
                  : props.row.localTeam
              }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            field="homeTeamId._id"
            searchable
            sortable
            centered
            label="localTeam _id"
          >
            <div class="journée">
              <span>{{
                props.row.homeTeamId && props.row.homeTeamId._id
                  ? props.row.homeTeamId._id
                  : "ATTENTION"
              }}</span>
            </div>
          </b-table-column>
          <b-table-column
            field="awayTeamId.name"
            searchable
            sortable
            centered
            label="AwayTeam name"
          >
            <div class="journée">
              <strong>{{
                props.row.awayTeamId && props.row.awayTeamId.name
                  ? props.row.awayTeamId.name
                  : props.row.visitorTeam
              }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            field="awayTeamId._id"
            searchable
            sortable
            centered
            label="visitorTeam _id"
          >
            <div class="journée">
              <span>{{
                props.row.awayTeamId && props.row.awayTeamId._id
                  ? props.row.awayTeamId._id
                  : "ATTENTION"
              }}</span>
            </div>
          </b-table-column>

          <b-table-column field="result" centered label="result">
            <div class="journée">
              <strong
                v-if="
                  props.row.status == 'FT' ||
                  props.row.status == 'AET' ||
                  props.row.status == 'FT_PEN'
                "
                >{{ props.row.goalsHomeTeam }} :
                {{ props.row.goalsAwayTeam }}</strong
              >
              <strong v-else>- : -</strong>
            </div>
          </b-table-column>
          <b-table-column centered width="450">
            <div class="journée">
              <button
                class="button is-success is-outlined"
                @click="headToHead(props.row)"
              >
                head to head
              </button>
              <!--   <button
                class="button has-text-contest"
                @click="calculateBets(props.row)"
              >
                Calculer Bets
              </button> -->

              <button
                class="button has-text-contest"
                @click="calculateCote(props.row)"
              >
                Calculer côte
              </button>
              <button
                class="button is-info is-outlined"
                @click="editMatch(props.row)"
              >
                Edit
              </button>

              <button
                class="button is-danger is-outlined"
                @click="deleteMatchConfirm(props.row)"
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
    </div>
    <div v-if="activeTab == 1">
      <b-field v-if="detail.length > 0">
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
          <b-table-column field="id" sortable centered label="Id sportsMonk">
            <div class="journée">
              <strong>{{ props.row.id }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            field="time.starting_at.date_time"
            sortable
            centered
            label="Date"
          >
            <div class="journée">
              <strong class="has-text-yellow">{{
                moment(props.row.time.starting_at.date_time)
                  .local()
                  .format("DD-MM-YYYY HH:mm")
              }}</strong>
            </div>
          </b-table-column>
          <b-table-column field="competition" centered label="Competition">
            <figure class="image">
              <img
                loading="lazy"
                class="logoligue1"
                :src="'/logoLigue/' + props.row.league_id + '.png'"
                alt="logoLigue"
              />
            </figure>
            <strong>{{ props.row.league_id }}</strong>
          </b-table-column>
          <b-table-column field="time.status" sortable centered label="Status">
            <div class="journée">
              <strong>{{ props.row.time.status }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            field="localTeam.data.name"
            sortable
            centered
            label="Home team"
          >
            <div class="journée">
              <strong>{{ props.row.localTeam.data.name }}</strong>
              <br />
              <span>{{ props.row.localTeam.data.id }}</span>
            </div>
          </b-table-column>
          <b-table-column
            field="visitorTeam.data.name"
            sortable
            centered
            label="Away team"
          >
            <div class="journée">
              <strong>{{ props.row.visitorTeam.data.name }}</strong>
              <br />
              <span>{{ props.row.visitorTeam.data.id }}</span>
            </div>
          </b-table-column>
          <b-table-column field="result" centered label="result">
            <div class="journée">
              <strong v-if="props.row.time.status == 'FT'"
                >{{ props.row.scores.localteam_score }} :
                {{ props.row.scores.visitorteam_score }}</strong
              >
              <strong v-else>- : -</strong>
            </div>
          </b-table-column>
          <b-table-column centered width="450">
            <div v-if="props.row.existInInsider">
              <strong class="has-text-success">match créé</strong>
            </div>
            <div v-else>
              <strong class="has-text-danger">match non créé</strong>
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
    </div>
    <b-modal
      class="modifiermissionModalWrapper"
      :active.sync="editMatchModal"
      v-if="matchModal"
      has-modal-card
    >
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <div class="modal-card-title">
            <p>
              Editing match
              <strong class="is-bold"
                >{{ matchModal.homeTeamName }} -
                {{ matchModal.awayTeamName }}</strong
              >
              !
            </p>
          </div>
        </header>
        <section class="modal-card-body">
          <b-field label="status">
            <multiselect
              v-model="matchModal.status"
              :options="statusMatch"
            ></multiselect>
          </b-field>
          <b-field label="Date & heure">
            <b-datetimepicker
              rounded
              placeholder="Click to select..."
              icon="calendar-today"
              v-model="matchModal.date"
            ></b-datetimepicker>
          </b-field>
          <label class="label">Résultat</label>
          <div class="displayFlex">
            <b-input v-model="matchModal.goalsHomeTeam"></b-input>
            <b-input v-model="matchModal.goalsAwayTeam"></b-input>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="displayFlex">
            <button @click="closeModalMatch" class="button is-danger">X</button>
            <button @click="saveMatchChange" class="button is-success">
              Save
            </button>
          </div>
        </footer>
      </div>
    </b-modal>

    <b-modal :active.sync="deletingMatchModal" has-modal-card>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <div class="modal-card-title">
            <p>T'es sur de vouloir effacer ce match ????</p>
          </div>
        </header>

        <footer class="modal-card-foot">
          <button
            class="button is-danger"
            @click="deleteMatch(deleteModale)"
            name="button"
          >
            YES - ERASE IT!
          </button>
          <button class="button is-info" @click="noDelete()" name="button">
            NO ... My mistake
          </button>
        </footer>
      </div>
    </b-modal>
    <b-modal :active.sync="teamModalNoCreate" has-modal-card>
      <div class="modal-card" style="width: 300">
        <header class="modal-card-head">
          <div class="modal-card-title">
            <p class="has-text-danger">
              Ola malheureux !!! Dépèche toi de me créer ces équipes !
            </p>
          </div>
        </header>
        <section class="modal-card-body">
          <b-table
            v-if="noTeamsInInsiders.length > 0"
            :data="noTeamsInInsiders"
            :loading="loading"
            :paginated="false"
            :total="total"
            :hoverable="true"
            :striped="true"
            :mobile-cards="false"
            default-sort-direction="asc"
            default-sort="name"
          >
            <template slot-scope="props">
              <b-table-column centered field="id" label="id" sortable>
                <div class="teamNameLogo">
                  <strong class="teamNameStrong">{{ props.row.id }}</strong>
                </div>
              </b-table-column>
              <b-table-column centered field="name" label="Nom" sortable>
                <div class="teamNameLogo">
                  <strong class="teamNameStrong">{{ props.row.name }}</strong>
                </div>
              </b-table-column>
            </template>
            <template slot="empty">
              <div class="content has-text-grey has-text-centered">
                <p>...</p>
              </div>
            </template>
          </b-table>
        </section>

        <footer class="modal-card-foot">
          <button
            class="button is-success"
            @click="closeteamModalNoCreate()"
            name="button"
          >
            Ok I'll do it
          </button>
        </footer>
      </div>
    </b-modal>
  </section>
</template>

<script>
import {
  initCote,
  calculateBetsOnFinishedMatch,
  getMatchsFromSportsMonkBySeasonId,
  getMatchsBySeason,
  getOneMatch,
  createAllMAtchesFromLeagueForInsiders,
  getTeamsBySeasonFromInsiders,
  modifyOneMatch,
  patchHeadTohead,
} from "@/server/admin";
import moment from "moment";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
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
      search_query: "",
      search_queryDB: "",
      matches: [],
      insidersMatches: [],
      detail: [],
      loading: false,
      total: 0,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 100,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      editMatchModal: false,
      matchModal: "",
      deletingMatchModal: false,
      noTeamsInInsiders: [],
      teamModalNoCreate: false,
      activeTab: 0,
    };
  },
  methods: {
    headToHead(event) {
      patchHeadTohead(event.id_sportmonks).then((match) => {
        this.$buefy.toast.open({
          message: "Head to Head OK",
          type: "is-success",
        });
        this.fetchData();
      });
    },
    createAllMatchs() {
      if (this.detail.length > 0) {
        let ids = [];
        let idsTopurge1 = this.detail.map((m) => m.localTeam.data.id);
        let idsTopurge2 = this.detail.map((m) => m.visitorTeam.data.id);
        let idsTosend = [...new Set([...idsTopurge1, ...idsTopurge2])];

        getTeamsBySeasonFromInsiders(idsTosend).then((insidersTeams) => {
          let teamsFromInsiders = insidersTeams.map((t) => t.id_sportmonks);
          this.noTeamsInInsiders = ids.filter(
            (id) => !teamsFromInsiders.includes(id)
          );
          if (this.noTeamsInInsiders.length > 0) {
            this.teamModalNoCreate = true;
          } else {
            let arrayToSend = [];
            arrayToSend = this.detail
              .filter((d) => !d.existInInsider)
              .map((m) => {
                let o = {
                  currentSeason: m.season_id,
                  codeCompetitionApi: m.league_id,
                  id_sportmonks: m.id,
                  stage: m.stage,
                  round: m.round,
                  stadium: m.venue_id,
                  matchday: m.round ? m.round.data.name : m.stage.data.name,
                  stadium: m.venue,
                  referee_name:
                    m.referee && m.referee.data ? m.referee.data.fullname : "",
                  homeTeamName: m.localTeam.data.name,
                  homeTeamId_sportsmonk: m.localTeam.data.id,
                  awayTeamName: m.visitorTeam.data.name,
                  awayTeamId_sportsmonk: m.visitorTeam.data.id,
                  goalsHomeTeam:
                    m.scores && m.scores.localteam_score
                      ? m.scores.localteam_score
                      : 0,
                  goalsAwayTeam:
                    m.scores && m.scores.visitorteam_score
                      ? m.scores.visitorteam_score
                      : 0,
                  status: m.time.status,
                  weather: m.weather_report,
                  standings: m.standings,
                  formations: m.formations,
                  commentaries: m.commentaries,
                  deleted: m.deleted,
                };

                if (
                  m.localTeam.data.id &&
                  insidersTeams.filter(
                    (t) =>
                      t.id_sportmonks.toString() ==
                      m.localTeam.data.id.toString()
                  )[0]
                ) {
                  o.homeTeamId = insidersTeams.filter(
                    (t) =>
                      t.id_sportmonks.toString() ==
                      m.localTeam.data.id.toString()
                  )[0]._id;
                }
                if (
                  m.visitorTeam.data.id &&
                  insidersTeams.filter(
                    (t) =>
                      t.id_sportmonks.toString() ==
                      m.visitorTeam.data.id.toString()
                  )[0]
                ) {
                  o.awayTeamId = insidersTeams.filter(
                    (t) =>
                      t.id_sportmonks.toString() ==
                      m.visitorTeam.data.id.toString()
                  )[0]._id;
                }
                if (m.winner_team_id) {
                  o.winner_team = m.winner_team_id;
                }
                if (m.time && m.time.starting_at) {
                  o.date = new Date(m.time.starting_at.date_time);
                }
                return o;
              });
            createAllMAtchesFromLeagueForInsiders(arrayToSend).then(
              (matches) => {
                this.$buefy.toast.open({
                  message: "Les matchs ont été créés",
                  type: "is-success",
                });
                this.fetchData();
              }
            );
          }
        });
      }
    },
    closeteamModalNoCreate() {
      this.noTeamsInInsiders = [];
      this.teamModalNoCreate = false;
    },
    saveMatchChange() {
      modifyOneMatch(this.matchModal, this.matchModal._id).then((match) => {
        this.$buefy.toast.open({
          message: "Le match a été modifié",
          type: "is-success",
        });
        this.matchModal = {
          date,
        };
        this.editMatchModal = false;
        this.fetchData();
      });
    },
    deleteMatchConfirm() {
      this.matchModal.status = "Deleted";
      modifyOneMatch(this.matchModal, this.matchModal._id).then((match) => {
        this.$buefy.toast.open({
          message: "Le match a été supprimé",
          type: "is-success",
        });
        this.matchModal = {
          date,
        };
        this.editMatchModal = false;
        this.fetchData();
      });
    },
    deleteMatch(event) {
      this.matchModal = event;
      this.deletingMatchModal = true;
    },
    noDelete() {
      this.matchModal = "";
      this.deletingMatchModal = false;
    },
    calculateAllBets() {
      this.loading = true;
      if (this.insidersMatches.length == 0) {
        this.$buefy.dialog.alert("Tous les bets ont été calculés");
      } else {
        for (let i = 0; i < this.insidersMatches.length; i++) {
          if (i == this.insidersMatches.length - 1) {
            calculateBetsOnFinishedMatch(this.insidersMatches[i]._id).then(
              (match) => {
                this.$buefy.toast.open({
                  message: "Calcul OK",
                  type: "is-success",
                });
                this.fetchData();
              }
            );
          } else {
            calculateBetsOnFinishedMatch(
              this.insidersMatches[i]._id
            ).then((match) => {});
          }
        }
      }
    },
    calculateBets(event) {
      calculateBetsOnFinishedMatch(event._id).then((match) => {
        this.$buefy.toast.open({
          message: "Calcul OK",
          type: "is-success",
        });
        this.fetchData();
      });
    },
    calculateCote(event) {
      initCote(event.id_sportmonks).then((match) => {
        this.$buefy.toast.open({
          message: "Initialisation des cotes ok",
          type: "is-success",
        });
        this.fetchData();
      });
    },
    editMatch(event) {
      this.matchModal = event;
      this.matchModal.date = new Date(event.date);
      this.editMatchModal = true;
    },
    moment: function (time) {
      return moment(time);
    },
    closeModalMatch() {
      this.matchModal = "";
      this.editMatchModal = false;
    },
    fetchData() {
      this.loading = true;
      getMatchsFromSportsMonkBySeasonId(this.$route.params.id).then(
        (matches) => {
          this.matches = matches;
          this.loading = false;

          getMatchsBySeason(this.$route.params.id).then((insidersMatches) => {
            if (insidersMatches != "no match") {
              this.activeTab = 0;
              this.insidersMatches = insidersMatches;
              this.loading = false;
              this.detail = this.matches.map((el) => {
                let existInInsider;
                let obj = el;
                el.existInInsider = true
                  ? insidersMatches
                      .map((l) => l.id_sportmonks)
                      .includes(el.id.toString())
                  : false;
                return obj;
              });
            } else {
              this.activeTab = 1;
              this.detail = this.matches;
            }
          });
        }
      );
    },
  },
  mounted() {
    if (this.connectedUser.role != "admin") {
      this.$router.push(`/`);
    } else {
      this.fetchData();
    }
  },

  computed: {
    connectedUser() {
      return this.$store.state.auth.user;
    },
    filterInsidersDB: function () {
      var name_re = new RegExp(this.search_queryDB, "i");
      var insidersMatches = [];
      for (var i = 0; i < this.insidersMatches.length; i++) {
        if (
          (this.insidersMatches[i].status
            ? this.insidersMatches[i].status.match(name_re)
            : "") ||
          (this.insidersMatches[i].date
            ? moment(this.insidersMatches[i].date)
                .utc()
                .format("DD/MM/YY")
                .match(name_re)
            : "") ||
          (this.insidersMatches[i].homeTeamName
            ? this.insidersMatches[i].homeTeamName.match(name_re)
            : "") ||
          (this.insidersMatches[i].awayTeamName
            ? this.insidersMatches[i].awayTeamName.match(name_re)
            : "")
        ) {
          insidersMatches.push(this.insidersMatches[i]);
        }
      }
      return insidersMatches;
    },
    filter: function () {
      var name_re = new RegExp(this.search_query, "i");
      var detail = [];
      for (var i = 0; i < this.detail.length; i++) {
        if (
          (this.detail[i].time.status
            ? this.detail[i].time.status.match(name_re)
            : "") ||
          (this.detail[i].time && this.detail[i].time.starting_at.date
            ? moment(this.detail[i].time.starting_at.date)
                .utc()
                .format("DD/MM/YY")
                .match(name_re)
            : "") ||
          (this.detail[i].localTeam && this.detail[i].localTeam.data
            ? this.detail[i].localTeam.data.name.match(name_re)
            : "") ||
          (this.detail[i].visitorTeam && this.detail[i].visitorTeam.data
            ? this.detail[i].visitorTeam.data.name.match(name_re)
            : "")
        ) {
          detail.push(this.detail[i]);
        }
      }
      return detail;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style><style scoped>
.is-success {
  border: 1px solid #23d160 !important;
}

.teamNameStrong {
  font-size: 1.2rem;
}

.container {
  max-width: 100%;
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

.hero.is-small .hero-body {
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
}

.hero-body {
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

h1 {
  font-weight: bold !important;
  text-align: center;
}

.teamNameLogo {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
}

.teamNameLogo > img {
  max-height: 64px !important;
  width: auto;
  margin: auto;
  padding: 1px;
}

.image {
  width: 45px;
  margin: auto;
}

.is-size-3 {
  justify-content: center;
}

.displayFlex > .image {
  margin: 0;
  margin-left: 10px;
  margin-right: 10px;
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
  .teamNameStrong {
    font-size: 1rem;
  }

  .title {
    font-size: 1.2rem;
  }

  .hero {
    margin-top: 0rem;
  }

  .teamNameLogo > img {
    max-height: 45px !important;
    width: auto;
    margin: auto;
    padding: 1px;
  }
}
</style>
