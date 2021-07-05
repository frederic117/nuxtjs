<template>
  <section>
    <section class="hero welcome is-small">
      <div class="hero-body">
        <div class>
          <h1 class="title helloText">Bonjour {{ $auth.user.username }},</h1>
          <h2 class="subtitle">Gestion du classment par saison</h2>
        </div>
      </div>
    </section>
    <div v-if="season">
      <section class="info-tiles">
        <div class="tile is-ancestor has-text-centered">
          <div class="pointer tile is-parent">
            <article class="tile is-child box teamNameLogo">
              <strong class="displayFlex is-size-3">
                Classement de&nbsp
                <figure class="image">
                  <img
                    loading="lazy"
                    class="logoligue1"
                    :src="'/logoLigue/' + season.league_id + '.png'"
                    alt="logoLigue"
                  />
                </figure>
                &nbsp{{ season.name }}
              </strong>
              <br />
              <button
                v-if="
                  activeTab == 1 &&
                  classement.length > 0 &&
                  !classement[0].existInInsider
                "
                @click="createClassement"
                class="button is-large is-success"
              >
                Créer le classement
              </button>
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
      <b-table
        class="NextMatchTable"
        v-if="
          insidersClassement &&
          insidersClassement.classement &&
          insidersClassement.classement.standings &&
          insidersClassement.classement.standings.data
        "
        :data="insidersClassement.classement.standings.data"
        :loading="loading"
        :total="total"
        :mobile-cards="true"
        :striped="true"
      >
        <template slot-scope="props">
          <b-table-column
            width="5"
            label
            field="position"
            sortable
            centered
            class="classementPoint"
          >
            <strong class="positionClass">{{ props.row.position }}</strong>
          </b-table-column>

          <b-table-column
            field="team_name"
            class="logo"
            centered
            label="Equipe"
          >
            <h1>
              <strong>{{ props.row.team_name }}</strong>
            </h1>
          </b-table-column>
          <b-table-column field="forme" numeric centered label="Forme">
            <div class="forme">
              <span v-if="props.row.recent_form[0] == 'W'" class="form is-win"
                >V</span
              >
              <span
                v-else-if="props.row.recent_form[0] == 'D'"
                class="form is-draw"
                >N</span
              >
              <span
                v-else-if="props.row.recent_form[0] == 'L'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span v-if="props.row.recent_form[1] == 'W'" class="form is-win"
                >V</span
              >
              <span
                v-else-if="props.row.recent_form[1] == 'D'"
                class="form is-draw"
                >N</span
              >
              <span
                v-else-if="props.row.recent_form[1] == 'L'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span v-if="props.row.recent_form[2] == 'W'" class="form is-win"
                >V</span
              >
              <span
                v-else-if="props.row.recent_form[2] == 'D'"
                class="form is-draw"
                >N</span
              >
              <span
                v-else-if="props.row.recent_form[2] == 'L'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span v-if="props.row.recent_form[3] == 'W'" class="form is-win"
                >V</span
              >
              <span
                v-else-if="props.row.recent_form[3] == 'D'"
                class="form is-draw"
                >N</span
              >
              <span
                v-else-if="props.row.recent_form[3] == 'L'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span v-if="props.row.recent_form[4] == 'W'" class="form is-win"
                >V</span
              >
              <span
                v-else-if="props.row.recent_form[4] == 'D'"
                class="form is-draw"
                >N</span
              >
              <span
                v-else-if="props.row.recent_form[4] == 'L'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
            </div>
          </b-table-column>

          <b-table-column field="points" numeric sortable centered label="pts">
            <strong>{{ props.row.points }}</strong>
          </b-table-column>

          <b-table-column
            field="overall.games_played"
            numeric
            sortable
            centered
            label="J."
            >{{ props.row.overall.games_played }}</b-table-column
          >

          <b-table-column
            class="has-text-green"
            field="overall.won"
            numeric
            sortable
            centered
            label="G."
            >{{ props.row.overall.won }}</b-table-column
          >
          <b-table-column
            field="overall.draw"
            numeric
            sortable
            centered
            label="N."
            >{{ props.row.overall.draw }}</b-table-column
          >
          <b-table-column
            class="has-text-red"
            field="overall.lost"
            numeric
            sortable
            centered
            label="P."
            >{{ props.row.overall.lost }}</b-table-column
          >
          <b-table-column
            class="has-text-green"
            field="overall.goals_scored"
            numeric
            sortable
            centered
            label="B.p."
            >{{ props.row.overall.goals_scored }}</b-table-column
          >
          <b-table-column
            class="has-text-red"
            field="overall.goals_against"
            numeric
            sortable
            centered
            label="B.c."
            >{{ props.row.overall.goals_against }}</b-table-column
          >
          <b-table-column
            field="total.goal_difference"
            numeric
            sortable
            centered
            label="Diff."
            >{{ props.row.total.goal_difference }}</b-table-column
          >
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
    <div
      v-if="
        activeTab == 1 &&
        classement[0].standings &&
        classement[0].standings.data.length > 0
      "
    >
      <div class="container adminBtabs">
        <b-tabs v-model="activeTabTer" type="is-boxed" expanded>
          <b-tab-item>
            <template slot="header">
              <strong>Général</strong>
            </template>
          </b-tab-item>
          <b-tab-item>
            <template slot="header">
              <strong>Domicile</strong>
            </template>
          </b-tab-item>
          <b-tab-item>
            <template slot="header">
              <strong>Extérieur</strong>
            </template>
          </b-tab-item>
        </b-tabs>
      </div>

      <b-table
        v-if="activeTabTer == 0"
        :data="classement[0].standings.data"
        :mobile-cards="false"
        :striped="true"
        :default-sort-direction="defaultSortOrder"
        :default-sort="defaultSortField"
      >
        <template slot-scope="props">
          <b-table-column
            width="5"
            label
            field="position"
            sortable
            centered
            class="classementPoint"
          >
            <strong class="positionClass">{{ props.row.position }}</strong>
          </b-table-column>

          <b-table-column
            field="team_name"
            class="logo"
            centered
            label="Equipe"
          >
            <h1>
              <strong>{{ props.row.team_name }}</strong>
            </h1>
          </b-table-column>
          <b-table-column field="forme" numeric centered label="Forme">
            <div class="forme">
              <span v-if="props.row.recent_form[0] == 'W'" class="form is-win"
                >V</span
              >
              <span
                v-else-if="props.row.recent_form[0] == 'D'"
                class="form is-draw"
                >N</span
              >
              <span
                v-else-if="props.row.recent_form[0] == 'L'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span v-if="props.row.recent_form[1] == 'W'" class="form is-win"
                >V</span
              >
              <span
                v-else-if="props.row.recent_form[1] == 'D'"
                class="form is-draw"
                >N</span
              >
              <span
                v-else-if="props.row.recent_form[1] == 'L'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span v-if="props.row.recent_form[2] == 'W'" class="form is-win"
                >V</span
              >
              <span
                v-else-if="props.row.recent_form[2] == 'D'"
                class="form is-draw"
                >N</span
              >
              <span
                v-else-if="props.row.recent_form[2] == 'L'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span v-if="props.row.recent_form[3] == 'W'" class="form is-win"
                >V</span
              >
              <span
                v-else-if="props.row.recent_form[3] == 'D'"
                class="form is-draw"
                >N</span
              >
              <span
                v-else-if="props.row.recent_form[3] == 'L'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span v-if="props.row.recent_form[4] == 'W'" class="form is-win"
                >V</span
              >
              <span
                v-else-if="props.row.recent_form[4] == 'D'"
                class="form is-draw"
                >N</span
              >
              <span
                v-else-if="props.row.recent_form[4] == 'L'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
            </div>
          </b-table-column>

          <b-table-column field="points" numeric sortable centered label="pts">
            <strong>{{ props.row.points }}</strong>
          </b-table-column>

          <b-table-column
            field="overall.games_played"
            numeric
            sortable
            centered
            label="J."
            >{{ props.row.overall.games_played }}</b-table-column
          >

          <b-table-column
            class="has-text-green"
            field="overall.won"
            numeric
            sortable
            centered
            label="G."
            >{{ props.row.overall.won }}</b-table-column
          >
          <b-table-column
            field="overall.draw"
            numeric
            sortable
            centered
            label="N."
            >{{ props.row.overall.draw }}</b-table-column
          >
          <b-table-column
            class="has-text-red"
            field="overall.lost"
            numeric
            sortable
            centered
            label="P."
            >{{ props.row.overall.lost }}</b-table-column
          >
          <b-table-column
            class="has-text-green"
            field="overall.goals_scored"
            numeric
            sortable
            centered
            label="B.p."
            >{{ props.row.overall.goals_scored }}</b-table-column
          >
          <b-table-column
            class="has-text-red"
            field="overall.goals_against"
            numeric
            sortable
            centered
            label="B.c."
            >{{ props.row.overall.goals_against }}</b-table-column
          >
          <b-table-column
            field="total.goal_difference"
            numeric
            sortable
            centered
            label="Diff."
            >{{ props.row.total.goal_difference }}</b-table-column
          >
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

      <b-table
        v-if="activeTabTer == 1"
        :data="classement[0].standings.data"
        :mobile-cards="false"
        :striped="true"
        :default-sort="['points', 'desc']"
      >
        <template slot-scope="props">
          <b-table-column
            width="5"
            label
            field="position"
            sortable
            centered
            class="classementPoint"
          >
            <strong class="positionClass">{{ props.row.position }}</strong>
          </b-table-column>

          <b-table-column
            field="team_name"
            class="logo"
            centered
            label="Equipe"
          >
            <h1>
              <strong>{{ props.row.team_name }}</strong>
            </h1>
          </b-table-column>

          <b-table-column
            field="points"
            sortable
            numeric
            :custom-sort="sortTotalPointsHome"
            centered
            label="pts"
          >
            <strong>{{ props.row.home.won * 3 + props.row.home.draw }}</strong>
          </b-table-column>

          <b-table-column
            field="home.games_played"
            numeric
            sortable
            centered
            label="J."
            >{{ props.row.home.games_played }}</b-table-column
          >

          <b-table-column
            class="has-text-green"
            field="home.won"
            numeric
            centered
            label="G."
            >{{ props.row.home.won }}</b-table-column
          >
          <b-table-column field="home.draw" numeric centered label="N.">{{
            props.row.home.draw
          }}</b-table-column>
          <b-table-column
            class="has-text-red"
            field="home.lost"
            numeric
            centered
            label="P."
            >{{ props.row.home.lost }}</b-table-column
          >
          <b-table-column
            class="has-text-green"
            field="home.goals_scored"
            numeric
            centered
            label="B.p."
            >{{ props.row.home.goals_scored }}</b-table-column
          >
          <b-table-column
            class="has-text-red"
            field="home.goals_against"
            numeric
            centered
            label="B.c."
            >{{ props.row.home.goals_against }}</b-table-column
          >
          <b-table-column field="difference" numeric centered label="Diff.">{{
            props.row.home.goals_scored - props.row.home.goals_against
          }}</b-table-column>
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
      <b-table
        v-if="activeTabTer == 2"
        :data="classement[0].standings.data"
        :mobile-cards="false"
        :striped="true"
        default-sort-direction="desc"
        default-sort="sortTotalPointsAway"
      >
        <template slot-scope="props">
          <b-table-column
            width="5"
            label
            field="position"
            sortable
            centered
            class="classementPoint"
          >
            <strong class="positionClass">{{ props.row.position }}</strong>
          </b-table-column>

          <b-table-column
            field="team_name"
            class="logo"
            centered
            label="Equipe"
          >
            <h1>
              <strong>{{ props.row.team_name }}</strong>
            </h1>
          </b-table-column>

          <b-table-column
            field="points"
            sortable
            numeric
            :custom-sort="sortTotalPointsAway"
            centered
            label="pts"
          >
            <strong>{{ props.row.away.won * 3 + props.row.away.draw }}</strong>
          </b-table-column>

          <b-table-column
            field="home.games_played"
            numeric
            centered
            label="J."
            >{{ props.row.away.games_played }}</b-table-column
          >

          <b-table-column
            class="has-text-green"
            field="home.won"
            numeric
            centered
            label="G."
            >{{ props.row.away.won }}</b-table-column
          >
          <b-table-column field="home.draw" numeric centered label="N.">{{
            props.row.away.draw
          }}</b-table-column>
          <b-table-column
            class="has-text-red"
            field="home.lost"
            numeric
            centered
            label="P."
            >{{ props.row.away.lost }}</b-table-column
          >
          <b-table-column
            class="has-text-green"
            field="home.goals_scored"
            numeric
            centered
            label="B.p."
            >{{ props.row.away.goals_scored }}</b-table-column
          >
          <b-table-column
            class="has-text-red"
            field="home.goals_against"
            numeric
            centered
            label="B.c."
            >{{ props.row.away.goals_against }}</b-table-column
          >
          <b-table-column field="difference" numeric centered label="Diff.">{{
            props.row.away.goals_scored - props.row.away.goals_against
          }}</b-table-column>
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
  </section>
</template>

<script>
import {
  getStandingsFromSportsMonkByseasonId,
  createStandings,
  getStandingsFromInsidersByseasonId,
  getSeasonByLeagueFromInsiders,
} from "@/server/admin";
import moment from "moment";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      search_query: "",
      search_queryDB: "",
      classement: [],
      insidersClassement: [],
      detail: [],
      loading: false,
      total: 0,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 300,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      activeTab: 0,
      activeTabTer: 0,
      season: "",
    };
  },
  methods: {
    sortTotalPointsHome(a, b, isAsc) {
      if (isAsc) {
        return a.home.won * 3 + a.home.draw - (b.home.won * 3 + b.home.draw);
      } else {
        return b.home.won * 3 + b.home.draw - (a.home.won * 3 + a.home.draw);
      }
    },
    sortTotalPointsAway(a, b, isAsc) {
      if (isAsc) {
        return a.away.won * 3 + a.away.draw - (b.away.won * 3 + b.away.draw);
      } else {
        return b.away.won * 3 + b.away.draw - (a.away.won * 3 + a.away.draw);
      }
    },
    createClassement() {
      let standings = {};
      standings.sportmonks_season_id = this.classement[0].season_id;
      standings.classement = this.season.league.is_cup
        ? { data: this.classement }
        : this.classement[0];
      standings.season = this.season._id;
      createStandings(standings).then((matches) => {
        this.$buefy.toast.open({
          message: "Le classement a été créé",
          type: "is-success",
        });
        this.fetchData();
      });
    },

    moment: function (time) {
      return moment(time);
    },

    fetchData() {
      this.loading = true;
      getSeasonByLeagueFromInsiders(this.$route.params.id).then((season) => {
        this.season = season;
      });
      getStandingsFromSportsMonkByseasonId(this.$route.params.id).then(
        (classement) => {
          this.classement = classement.data;
          this.loading = false;
          getSeasonByLeagueFromInsiders(classement.data[0].league_id).then(
            (season) => {
              this.season = season.filter(
                (s) =>
                  s.id_sportmonks == classement.data[0].season_id.toString()
              )[0];
            }
          );

          getStandingsFromInsidersByseasonId(this.$route.params.id).then(
            (insidersClassement) => {
              if (insidersClassement != "no match") {
                this.insidersClassement = insidersClassement;
                this.loading = false;
                this.detail = this.classement.map((el) => {
                  let existInInsider;
                  let obj = el;
                  el.existInInsider = true
                    ? insidersClassement.sportmonks_season_id ===
                      el.season_id.toString()
                    : false;
                  return obj;
                });
              } else {
                this.detail = this.classement;
              }
            }
          );
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
    langSelected() {
      return this.$store.state.var.langSelected;
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

.forme {
  display: flex;
  margin: 5px;
  justify-content: center;
}

.form {
  width: 20px;
  margin: 1px;
  padding: 1px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-weight: 700;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-transform: uppercase;
}

.is-win {
  background-color: #2da94f;
  border-radius: 2px;
  color: white;
}

.is-draw {
  background-color: #3273dc;
  border-radius: 2px;
  color: white;
}

.is-loss {
  background-color: #eb412d;
  border-radius: 2px;
  color: white;
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
