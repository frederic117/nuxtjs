<template>
  <section>
    <div class="matchlist card">
      <b-table
        v-if="transfers.length > 0"
        :data="transfers"
        :loading="loading"
        :paginated="isPaginated"
        :per-page="perPage"
        :pagination-simple="isPaginationSimple"
        :total="total"
        :mobile-cards="false"
        :striped="true"
        default-sort-direction="desc"
        default-sort="date"
      >
        <template slot-scope="props">
          <b-table-column
            class="dateTransf"
            sortable
            field="date"
            width="20"
            centered
            numeric
            label="Date"
          >
            <div class="journée">
              <strong class="is-wc">{{
                moment(props.row.date).local().format("MM-YY")
              }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            field="amount"
            sortable
            centered
            :label="`${langSelected === 'EN' ? 'Amount' : 'Montant'}`"
            class="taille"
          >
            <strong>{{ props.row.amount ? props.row.amount : 0 }} €</strong>
            <span v-if="props.row.transfer === 'loan'">(prêt)</span>
          </b-table-column>
          <b-table-column
            field="Provenance"
            centered
            :label="`${langSelected === 'EN' ? 'From' : 'Provenance'}`"
            class="taille"
          >
            <figure
              v-if="
                props.row.team &&
                props.row.team.data &&
                props.row.team.data.logo_path
              "
              class="image logoLeague"
            >
              <img
                loading="lazy"
                :class="{
                  invertOk: props.row.team.data.name
                    .toUpperCase()
                    .includes('JUVE'),
                }"
                class="logo"
                :src="props.row.team.data.logo_path"
                alt="logoClub"
              />
            </figure>
            <figure v-else class="image logoLeague">
              <img
                loading="lazy"
                class="logo"
                src="~assets/images/teams/team_placeholder.png"
                alt="logoClub"
              />
            </figure>
            <strong class="has-text-blue" v-if="props.row.team">{{
              props.row.team.data.name
            }}</strong>
            <span v-else>-</span>
          </b-table-column>
          <b-table-column
            field="Destination"
            centered
            :label="`${langSelected === 'EN' ? 'To' : 'Destination'}`"
            class="taille"
          >
            <figure
              v-if="team && props.row.to_team_id"
              class="image logoLeague"
            >
              <img
                :class="{
                  invertOk: teams
                    .filter((t) => t.id === props.row.to_team_id)[0]
                    .name.toUpperCase()
                    .includes('JUVE'),
                }"
                v-if="
                  teams.filter((t) => t.id === props.row.to_team_id).length > 0
                "
                class="logo"
                :src="
                  teams.filter((t) => t.id === props.row.to_team_id)[0]
                    .logo_path
                "
                alt="logoClub"
              />
            </figure>
            <strong
              class="has-text-blue"
              v-if="
                team &&
                props.row.to_team_id &&
                teams.filter((t) => t.id === props.row.to_team_id).length > 0
              "
              >{{
                teams.filter((t) => t.id === props.row.to_team_id)[0].name
              }}</strong
            >
            <span v-else>-</span>
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
              <p>...</p>
            </div>
          </section>
        </template>
      </b-table>
      <p v-else>
        {{
          langSelected === "This player has never been transferred"
            ? ""
            : "Ce joueur n'a jamais été transféré"
        }}
      </p>
    </div>
  </section>
</template>

<script>
import moment from "moment";
export default {
  auth: false,
  data() {
    return {
      total: 0,
      loading: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 50,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      teams: "",
    };
  },
  props: {
    transfers: "",
    team: "",
  },
  watch: {
    transfers: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.transfers.length > 0) {
          this.teams = [
            ...new Set([
              ...this.transfers.map((t) => t.team.data),
              ...this.team,
            ]),
          ];
        }
      },
    },
    team: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.transfers.length > 0) {
          this.teams = [
            ...new Set([
              ...this.transfers.map((t) => t.team.data),
              ...this.team,
            ]),
          ];
        }
      },
    },
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        return this.$store.state.auth.user;
      } else {
        return "unconnected";
      }
    },
  },
  mounted() {
    if (this.transfers.length > 0) {
      this.teams = [
        ...new Set([...this.transfers.map((t) => t.team.data), ...this.team]),
      ];
    }
  },
  methods: {
    moment: function (time) {
      return moment(time);
    },
  },
};
</script>

<style scoped>
.nomPlay {
  display: flex;
  flex-direction: column;
}

.nomPlay > div {
  display: flex;
  margin: auto;
  flex-direction: column;
}

.nomPlay > div > strong {
  padding-right: 2px;
}

.teamNameGame > img {
  height: 32px;
  width: 32px;
}

.teamNameGame > img {
  height: 32px;
  width: 32px;
}

.taille {
  width: 90px;
}

td {
  height: 75px !important;
}

.nationalite > span {
  display: flex;
  flex-direction: column;
}

.playerName {
  vertical-align: middle;
}

.playerPic {
  height: 50px;
  width: 50px;
  margin: auto;
}

.logoLeague {
  margin: auto;
  width: 50px;
}

.playerPic > img {
  border-radius: 50% !important;
}

.logo {
  margin: auto;
}

.teamName {
  align-self: center;
  min-width: 30% !important;
}

.tag {
  align-self: center;
}

h1 {
  padding-top: 1rem;
}

.team {
  min-width: 25%;
}

.bullsAndBearsPicVs {
  width: 15%;
  display: flex;
  justify-content: center;
  align-self: center;
}

td > span {
  display: flex;
  justify-content: center;
}

.matchProno {
  display: flex;
  justify-content: space-evenly;
}

.navbar.is-wc {
  background-color: #0084a4 !important;
  color: #eef1f7 !important;
  position: relative;
}

.is-wc {
  color: #0084a4 !important;
}

.b-table {
  border: solid;
  border-color: #0084a4 !important;
  margin: 0rem !important;
}

.matchlist > .b-table {
  border: none !important;
}

.displayFlex {
  display: flex;
  margin-bottom: 0.5rem !important;
}

.groupe {
  margin-bottom: 0.5rem !important;
  font-size: 2rem !important;
}

.ligue-img {
  width: auto;
  max-height: 90px !important;
}

.flag-img {
  cursor: pointer;
}

.is-active {
  display: block;
}

.is-not-active {
  display: none;
}

.flag-img:hover {
  border-bottom-color: #192b41;
  border-top-color: transparent;
}

.has-text-yellow {
  color: #ffcf00 !important;
}

.positionClass {
  font-size: 1.2rem !important;
}

.forme {
  display: flex;
  margin: 5px;
  justify-content: center;
}

.form {
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
  width: 20px;
}

.tooltip.is-bottom.is-green:before {
  border-right: 6px solid transparent;
  border-bottom: 6px solid #2da94f;
  border-left: 6px solid transparent;
  top: calc(100% + 2px);
}

.tooltip.is-bottom.is-red:before {
  border-right: 6px solid transparent;
  border-bottom: 6px solid#eb412d;
  border-left: 6px solid transparent;
  top: calc(100% + 2px);
}

.tooltip.is-bottom.is-blueInfo:before {
  border-right: 6px solid transparent;
  border-bottom: 6px solid #3273dc;
  border-left: 6px solid transparent;
  top: calc(100% + 2px);
}

.tooltip.is-green:after {
  background: #2da94f;
  color: #fff;
}

.tooltip.is-red:after {
  background: #eb412d;
  color: #fff;
}

.tooltip.is-blueInfo:after {
  background: #3273dc;
  color: #fff;
}

.is-green {
  background-color: #2da94f;
  color: #eef1f7;
  border-radius: 3px;
  margin: 2px;
}

.is-greyLit {
  background-color: #778899;
  color: #eef1f7;
  border-radius: 3px;
  margin: 2px;
}

.is-blueInfo {
  background-color: #3273dc;
  color: #eef1f7;
  border-radius: 3px;
  margin: 2px;
}

.is-blue {
  background-color: #192b41;
  color: #eef1f7;
}

.is-greyLit {
  background-color: #778899;
  color: #eef1f7;
}

.is-red {
  background-color: #eb412d;
  color: #eef1f7;
  border-radius: 3px;
  margin: 2px;
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

.trendingWrapper {
  padding-top: 0rem;
}

div {
  font-size: 1rem !important;
}

h1 {
  font-size: 1.2rem !important;
}

.has-text-centered {
  font-size: 0.9rem !important;
  font-weight: normal;
  vertical-align: middle !important;
}

.container {
  margin-bottom: 2rem !important;
}

.flag {
  justify-content: space-evenly;
  display: flex;
}

.crypto {
  color: #f7931a !important;
}

@media (max-width: 769px) {
  .dateTransf {
    min-width: 80px !important;
  }

  td {
    height: auto !important;
  }

  .valPlayer {
    min-width: 105px !important;
  }

  .playerPic {
    width: 32px !important;
    height: 32px !important;
  }

  .displayFlex {
    display: flex;
    flex-direction: column;
  }

  .bullsAndBearsPicVs {
    width: 100%;
  }

  .is-hidden-tablet {
    display: none !important;
  }

  img {
    height: 32px !important;
    width: 32px !important;
  }

  .ligue-img {
    max-height: 45px !important;
  }

  .flag-img {
    width: 40px;
    height: 40px !important;
  }

  .container {
    margin-bottom: 1rem !important;
  }

  .trendingWrapper {
    padding-top: 0rem;
  }

  div {
    font-size: 0.8rem !important;
  }

  .has-text-centered {
    font-size: 0.8rem !important;
  }

  .button .icon.is-small {
    height: 1.5em !important;
    width: 1.5em !important;
  }

  .control {
    height: 30px !important;
    width: 30px !important;
  }

  .navbar.is-dark {
    margin-bottom: 3% !important;
  }
}
</style>
