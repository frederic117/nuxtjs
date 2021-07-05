<template>
  <div v-if="$auth.user && $auth.user._id">
    <section class="hero welcome is-small">
      <div class="hero-body">
        <div class>
          <h1 class="title helloText">Bonjour {{ $auth.user.username }},</h1>
          <h2 class="subtitle">Suivi des {{ rounds.length }} rounds actifs</h2>
        </div>
      </div>
    </section>

    <b-field class="searchField" v-if="rounds.length > 0">
      <b-input placeholder="search" v-model="search_query" />
    </b-field>

    <section>
      <b-table
        :data="rounds"
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
          <b-table-column class="" field="img" centered label="">
            <img
              loading="lazy"
              class="contestImg"
              :src="props.row.contest.image"
              alt="Image"
            />
          </b-table-column>
          <b-table-column sortable field="name" centered label="nom">
            <strong class="userWrapper"
              >{{ props.row.contest ? props.row.contest.name : "" }} -
              {{ props.row.name }}</strong
            >
            <span class="is-italic">{{ props.row._id }}</span>
          </b-table-column>
          <b-table-column
            sortable
            field="adminOfContest"
            centered
            label="créé par"
          >
            <div class="journée">
              <strong>
                <nuxt-link
                  class="has-text-info"
                  :to="`/dashboard/${props.row.contest.adminOfContest._id}`"
                  >{{ props.row.contest.adminOfContest.username }}</nuxt-link
                ></strong
              >
            </div>
          </b-table-column>

          <b-table-column sortable field="betValue" centered label="betValue">
            <div class="journée">
              <strong>{{ props.row.betValue }} F$</strong>
            </div>
          </b-table-column>
          <b-table-column
            sortable
            field="participants"
            centered
            label="participants/cible"
          >
            <div class="journée">
              <strong
                >{{ props.row.participants.length }}/{{
                  props.row.nbPlayersTarget
                }}</strong
              >
            </div>
          </b-table-column>
          <b-table-column
            sortable
            field="scope"
            centered
            label="nbre de matchs"
          >
            <div class="journée">
              <strong>{{ props.row.scope.length }}</strong>
            </div>
          </b-table-column>
          <b-table-column field="deadline" centered label="deadline">
            <div class="journée">
              <strong>{{
                moment(props.row.deadline).format("DD-MM-YYYY HH:mm")
              }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            sortable
            field="isRegistrationOpen"
            centered
            label="isRegistrationOpen"
          >
            <div class="journée">
              <i
                v-if="props.row.isRegistrationOpen"
                class="is-success mdi mdi-check-circle mdi-24px"
              ></i>
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
  </div>
</template>

<script>
import { getActiveRound } from "@/server/apiContest";
import moment from "moment";

export default {
  auth: true,
  components: {},

  data() {
    return {
      total: 0,
      loading: false,
      defaultSortField: "deadline",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 150,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      search_query: "",
      rounds: [],
    };
  },
  mounted() {
    if (this.connectedUser.role != "admin") {
      this.$router.push(`/`);
    } else {
      getActiveRound().then((rounds) => {
        this.rounds = rounds;
      });
    }
  },
  computed: {
    connectedUser() {
      return this.$store.state.auth.user;
    },
    filter: function () {
      var name_re = new RegExp(this.search_query, "i");
      var rounds = [];
      for (var i = 0; i < this.rounds.length; i++) {
        if (
          (this.rounds[i].contest
            ? this.rounds[i].contest.match(name_re)
            : "") ||
          (this.rounds[i]._id ? this.rounds[i]._id.match(name_re) : "")
        ) {
          rounds.push(this.rounds[i]);
        }
      }
      return rounds;
    },
  },
  methods: {
    moment: function (time) {
      return moment(time);
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
.contestImg {
  width: auto;
  height: 45px;
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
