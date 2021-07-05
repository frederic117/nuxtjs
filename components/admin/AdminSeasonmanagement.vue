<template>
  <section>
    <b-loading
      :is-full-page="true"
      :active.sync="loading"
      :canCancel="false"
    ></b-loading>
    <section class="hero welcome is-small">
      <div class="hero-body">
        <div class>
          <h1 class="title helloText">Bonjour {{ $auth.user.username }},</h1>
          <h2 class="subtitle">Gestion des saisons</h2>
        </div>
      </div>
    </section>
    <div v-if="seasons.length > 0">
      <section class="info-tiles">
        <div class="tile is-ancestor has-text-centered">
          <div class="pointer tile is-parent">
            <article class="tile is-child box teamNameLogo">
              <strong class="displayFlex is-size-3"
                >Toutes les saisons actives</strong
              >
            </article>
          </div>
        </div>
      </section>
      <br />
      <b-table
        v-if="seasons.length > 0"
        :data="seasons"
        :paginated="isPaginated"
        :per-page="perPage"
        :pagination-simple="isPaginationSimple"
        :total="total"
        :hoverable="true"
        :striped="true"
        :mobile-cards="false"
        default-sort-direction="desc"
        default-sort="name"
      >
        <template slot-scope="props">
          <b-table-column centered field="Compet" label="Compet" sortable>
            <div class="teamNameLogo">
              <figure class="image is-30x30">
                <img
                  loading="lazy"
                  class="logoligue1"
                  :src="'/logoLigue/' + props.row.league_id + '.png'"
                  alt="logoLigue"
                />
              </figure>
            </div>
          </b-table-column>
          <b-table-column
            centered
            field="id_sportmonks"
            label="id_sportmonks"
            sortable
          >
            <div class="teamNameLogo">
              <strong class="teamNameStrong">
                {{ props.row.id_sportmonks }}
              </strong>
            </div>
          </b-table-column>
          <b-table-column centered field="name" label="Nom" sortable>
            <div class="teamNameLogo">
              <strong class="teamNameStrong">{{ props.row.name }}</strong>
            </div>
          </b-table-column>

          <b-table-column
            centered
            field="is_current_season"
            label="Saison en cours"
            sortable
          >
            <div v-if="props.row.is_current_season" class="has-text-success">
              <i class="has-text-success mdi mdi-check-circle mdi-24px"
                >&nbsp;</i
              >
            </div>
          </b-table-column>

          <b-table-column
            centered
            field="current_round_id"
            label="current_round_id"
            sortable
          >
            <div class="teamNameLogo">
              <strong class="teamNameStrong">
                {{ props.row.current_round_id }}
              </strong>
            </div>
          </b-table-column>
          <b-table-column
            centered
            field="current_stage_id"
            label="current_stage_id"
            sortable
          >
            <div class="teamNameLogo">
              <strong class="teamNameStrong">
                {{ props.row.current_stage_id }}
              </strong>
            </div>
          </b-table-column>
          <b-table-column centered field="league_id" label="league_id" sortable>
            <div class="teamNameLogo">
              <strong class="teamNameStrong">
                {{ props.row.league_id }}
              </strong>
            </div>
          </b-table-column>
          <b-table-column
            centered
            field="teams"
            label="Nombre d'équipes"
            sortable
          >
            <div class="teamNameLogo">
              <strong class="teamNameStrong">
                {{ props.row.teams.length }}
              </strong>
            </div>
          </b-table-column>

          <b-table-column centered field=" " label=" " sortable>
            <button class="button" @click="goMatchs(props.row)">
              Voir matchs
            </button>
            <button class="button" @click="updateLiveClassement(props.row)">
              Update classement Live
            </button>
            <button class="button" @click="updateMatch(props.row)">
              Update all matchs
            </button>
            <button class="button" @click="refreshSeason(props.row)">
              Refresh Season
            </button>
            <button class="button" @click="refreshStanding(props.row)">
              Refresh Standing
            </button>
            <button class="button" @click="createAllPlayersSeason(props.row)">
              Créer les joueurs
            </button>

            <button
              v-if="props.row.teams.length == 0"
              class="button"
              @click="updateTeams(props.row)"
            >
              Lier les équipes
            </button>
            <!--<button  class="button" @click="updateNextMatchs(props.row)">Update next matchs</button>-->
          </b-table-column>
        </template>
        <template slot="empty">
          <div class="content has-text-grey has-text-centered">
            <p>...</p>
          </div>
        </template>
      </b-table>
    </div>
  </section>
</template>

<script>
import {
  refreshDataBySeason,
  refreshDataByStanding,
  getSeasonbyquery,
  updateMatchsBySeason,
  liaiseWithSeason,
  updateLiveStanding,
  updateNextMatchsBySeason,
  createPlayers,
} from "@/server/admin";
export default {
  data() {
    return {
      seasons: [],
      insidersSeasons: [],
      detail: [],
      total: 0,
      loading: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 50,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
    };
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
  mounted() {
    if (this.connectedUser.role != "admin") {
      this.$router.push(`/`);
    } else {
      this.fetchData();
    }
  },
  methods: {
    createAllPlayersSeason(event) {
      this.loading = true;
      createPlayers(event.id_sportmonks).then((r) => {
        this.fetchData();
        this.$buefy.toast.open({
          message: "Joueurs créés",
          type: "is-success",
        });
      });
    },
    refreshSeason(event) {
      this.loading = true;
      refreshDataBySeason(event.id_sportmonks).then((r) => {
        this.fetchData();
        this.$buefy.toast.open({
          message: "La saison a été rafraichie",
          type: "is-success",
        });
      });
    },
    refreshStanding(event) {
      this.loading = true;
      refreshDataByStanding(event.id_sportmonks).then((r) => {
        this.fetchData();
        this.$buefy.toast.open({
          message: "Le classement a été rafraichi",
          type: "is-success",
        });
      });
    },
    updateTeams(event) {
      this.loading = true;
      liaiseWithSeason(event.id_sportmonks).then((r) => {
        this.fetchData();
        this.$buefy.toast.open({
          message: "Les équipes ont été liées à la saison",
          type: "is-success",
        });
      });
    },
    updateLiveClassement(event) {
      this.loading = true;
      updateLiveStanding(event.id_sportmonks).then((r) => {
        this.fetchData();
        this.$buefy.toast.open({
          message: "Le classement été mis à jour",
          type: "is-success",
        });
      });
    },
    updateMatch(event) {
      this.loading = true;
      updateMatchsBySeason(event.id_sportmonks).then((r) => {
        this.fetchData();
        this.$buefy.toast.open({
          message: "Les matchs ont été mis à jour",
          type: "is-success",
        });
      });
    },
    updateNextMatchs(event) {
      this.loading = true;
      updateNextMatchsBySeason(event.id_sportmonks).then((r) => {
        this.fetchData();
        this.$buefy.toast.open({
          message: "Les next matchs ont été mis à jour",
          type: "is-success",
        });
      });
    },

    goClassement(event) {
      this.$router.push(`/admin/classement/${event.id}`);
    },
    goMatchs(event) {
      this.$router.push(`/admin/matches/${event.id_sportmonks}`);
    },
    fetchData() {
      this.loading = true;
      let query = {};
      query.is_current_season = true;
      getSeasonbyquery(query).then((seasons) => {
        this.seasons = seasons;
        this.loading = false;
      });
    },

    goSeason(event) {
      this.$router.push(`/admin/teams/${event.id}`);
    },
  },
};
</script>

<style scoped>
.is-success {
  border: 1px solid #23d160 !important;
}
.teamNameStrong {
  font-size: 1.2rem;
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
.is-size-3 {
  justify-content: center;
  align-items: center;
}
article > strong > figure > img {
  margin: 0;
  margin-left: 20px;
  height: 90px;
  width: auto;
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
