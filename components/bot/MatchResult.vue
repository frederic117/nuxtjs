<template>
  <section class="main">
    <div class="matchresultat box column is-6">
      <h1 class="has-text-contest headingTitle">
        <img
          loading="lazy"
          class="insidersLogo"
          src="~assets/images/logo.png"
          alt="footfootLogo"
        />
        Pour l'amour du foot... Le site des supporters.
        <br />
        <h2 class="accrocheH1">
          <span class="pointer">ACTUS</span>&nbsp&nbsp&nbsp&nbsp
          <span>|</span>&nbsp&nbsp&nbsp&nbsp
          <span class="pointer">LIVE SCORES</span>&nbsp&nbsp&nbsp&nbsp
          <span>|</span>&nbsp&nbsp&nbsp&nbsp
          <span class="pointer">FORUMS</span>&nbsp&nbsp&nbsp&nbsp
          <span>|</span>&nbsp&nbsp&nbsp&nbsp
          <span class="pointer">CONTESTS</span>
        </h2>
      </h1>
      <div v-if="resultat" class="mediaModalBet">
        <h1 class="modalTitleBet">
          <strong class="modalTitleBetH1 has-text-contest">
            <figure
              @click="ligue(resultat.codeCompetitionApi)"
              width="80"
              class="image pointer resultModalTitle dayChampion"
            >
              <span v-if="resultat.matchday === '8th Finals'" class>
                <strong v-if="langSelected === 'EN'">
                  8
                  <sup>th</sup> round
                </strong>
                <strong v-else>
                  8
                  <sup>ème</sup> de finale
                </strong>
              </span>
              <span
                v-else-if="resultat.matchday === '16th Finals'"
                class="journéeSpan"
              >
                <strong v-if="langSelected === 'EN'">
                  16
                  <sup>th</sup> round
                </strong>
                <strong v-else>
                  16
                  <sup>ème</sup> de finale
                </strong>
              </span>
              <span
                v-else-if="resultat.matchday === '32nd Finals'"
                class="journéeSpan"
              >
                <strong v-if="langSelected === 'EN'">
                  32
                  <sup>nd</sup> round
                </strong>
                <strong v-else>
                  32
                  <sup>ème</sup> de finale
                </strong>
              </span>
              <span v-else-if="resultat.matchday === 'Quarter-finals'" class>
                <strong>{{
                  langSelected === "EN" ? "Quarter final" : "Quart de finale"
                }}</strong>
              </span>
              <span v-else-if="resultat.matchday === 'Semi-finals'" class>
                <strong>{{
                  langSelected === "EN" ? "Semi final" : "Demi-finale"
                }}</strong>
              </span>
              <span v-else-if="resultat.matchday === 'bronze'" class>
                <strong v-if="langSelected === 'EN'">
                  match for 3
                  <sup>rd</sup> place
                </strong>
                <strong v-else>
                  match pour la 3
                  <sup>ème</sup> place
                </strong>
              </span>
              <span v-else-if="resultat.matchday === 'Final'" class>
                <strong>{{
                  langSelected === "EN" ? "Final" : "Finale"
                }}</strong>
              </span>
              <span
                v-else-if="resultat.matchday == 'Group Stage'"
                class="journéeSpan"
              >
                <strong>{{
                  langSelected === "EN" ? resultat.matchday : "phase de groupe"
                }}</strong>
              </span>
              <span v-else-if="langSelected === 'EN'" class>
                <strong
                  v-if="
                    resultat.matchday == '1' ||
                    resultat.matchday == '21' ||
                    resultat.matchday == '31'
                  "
                >
                  {{ resultat.matchday }}
                  <sup>st</sup> day
                </strong>
                <strong
                  v-else-if="
                    resultat.matchday == '2' ||
                    resultat.matchday == '22' ||
                    resultat.matchday == '32'
                  "
                >
                  {{ resultat.matchday }}
                  <sup>nd</sup> day
                </strong>
                <strong
                  v-else-if="
                    resultat.matchday == '3' ||
                    resultat.matchday == '23' ||
                    resultat.matchday == '33'
                  "
                >
                  {{ resultat.matchday }}
                  <sup>rd</sup> day
                </strong>
                <strong v-else>
                  {{ resultat.matchday }}
                  <sup>th</sup> day
                </strong>
              </span>
              <span v-else class>
                <strong v-if="resultat.matchday == '1'">
                  {{ resultat.matchday }}
                  <sup>ère</sup> journée
                </strong>
                <strong v-else>
                  {{ resultat.matchday }}
                  <sup>ème</sup> journée de
                </strong> </span
              >&nbsp
              <img
                class="logoligue"
                :class="{
                  invertOk:
                    Number(resultat.codeCompetitionApi) == 2 ||
                    Number(resultat.codeCompetitionApi) == 5,
                }"
                :src="'/logoLigue/' + resultat.codeCompetitionApi + '.png'"
                alt="logoLigue"
              />
            </figure>
          </strong>
        </h1>
        <b-field>
          <div class="modalBetWrapper">
            <div id="bullsAndBearsModal">
              <div class="BBull">
                <div class="teamNameLogo">
                  <img
                    loading="lazy"
                    class="pointer"
                    :src="resultat.homeTeamId.teamImg"
                    :alt="resultat.homeTeamId.name"
                    :class="{
                      invertOk: resultat.homeTeamId.name
                        .toUpperCase()
                        .includes('JUVE'),
                    }"
                  />
                </div>
                <strong class="teamNameGame"
                  >#{{
                    resultat.homeTeamId.searchName
                      ? resultat.homeTeamId.searchName
                      : resultat.homeTeamId.shortName
                  }}</strong
                >
              </div>
              <b-tag
                class="scoreResultModal"
                :class="{
                  'is-green': resultat.goalsHomeTeam > resultat.goalsAwayTeam,
                  'is-red': resultat.goalsHomeTeam < resultat.goalsAwayTeam,
                  'is-info': resultat.goalsHomeTeam === resultat.goalsAwayTeam,
                }"
                size="is-large"
                >{{ resultat.goalsHomeTeam.toString().replace(" ", "") }}</b-tag
              >

              <strong class="separatorScoreResult">-</strong>

              <b-tag
                class="scoreResultModal"
                :class="{
                  'is-green': resultat.goalsHomeTeam < resultat.goalsAwayTeam,
                  'is-red': resultat.goalsHomeTeam > resultat.goalsAwayTeam,
                  'is-info': resultat.goalsHomeTeam === resultat.goalsAwayTeam,
                }"
                size="is-large"
                >{{ resultat.goalsAwayTeam.toString().replace(" ", "") }}</b-tag
              >
              <div class="BBull">
                <div class="teamNameLogo">
                  <img
                    loading="lazy"
                    class="pointer"
                    :src="resultat.awayTeamId.teamImg"
                    :alt="resultat.awayTeamId.name"
                    :class="{
                      invertOk: resultat.homeTeamId.name
                        .toUpperCase()
                        .includes('JUVE'),
                    }"
                  />
                </div>
                <strong class="teamNameGame"
                  >#{{
                    resultat.awayTeamId.searchName
                      ? resultat.awayTeamId.searchName
                      : resultat.awayTeamId.shortName
                  }}</strong
                >
              </div>
            </div>
            <div class="pronoPlayer">
              <div class="goals-panel" v-if="resultat.detail.events">
                <div
                  v-for="(event, index) in resultat.detail.events"
                  :key="index"
                >
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'GOAL' &&
                      resultat.homeTeamId.id_sportmonks == event.team_id
                    "
                  >
                    ⚽&nbsp
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp
                    <strong>{{ event.player_name }}</strong>
                  </span>
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'OWN-GOAL' &&
                      resultat.homeTeamId.id_sportmonks == event.team_id
                    "
                  >
                    ⚽&nbsp
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp
                    <strong>{{ event.player_name }}</strong>
                    <span>&nbsp(csc)</span>
                  </span>
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'PENALTY' &&
                      resultat.homeTeamId.id_sportmonks == event.team_id
                    "
                  >
                    ⚽&nbsp
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp
                    <strong>{{ event.player_name }}</strong>
                    <span>&nbsp(pen)</span>
                  </span>
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'MISSED_PENALTY' &&
                      resultat.homeTeamId.id_sportmonks == event.team_id
                    "
                  >
                    <img
                      loading="lazy"
                      class="missPen cardRefer"
                      src="~assets/images/pen-shootout-miss.svg"
                      alt="missPen"
                    />
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp
                    <strong>{{ event.player_name }}</strong>
                    <span>&nbsp(pen)</span>
                  </span>
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'YELLOWCARD' &&
                      resultat.homeTeamId.id_sportmonks == event.team_id
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/yellow_card_icon.svg"
                      alt="yellowCard"
                    />
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp {{ event.player_name }}
                  </span>
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'YELLOWRED' &&
                      resultat.homeTeamId.id_sportmonks == event.team_id
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/red_card_icon.svg"
                      alt="redCard"
                    />
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp {{ event.player_name }}
                  </span>
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'REDCARD' &&
                      resultat.homeTeamId.id_sportmonks == event.team_id
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/red_card_icon.svg"
                      alt="redCard"
                    />
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp {{ event.player_name }}
                  </span>
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'SUBSTITUTION' &&
                      resultat.homeTeamId.id_sportmonks == event.team_id
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/substitution_icon.svg"
                      alt="substitute"
                    />
                    &nbsp
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp
                    <span>
                      <p class="has-text-green">{{ event.player_name }}</p>
                      <p class="has-text-red">
                        {{ event.related_player_name }}
                      </p>
                    </span>
                  </span>
                </div>
              </div>
              <div class="goals-panel2" v-if="resultat.detail.events">
                <div
                  v-for="(event, index) in resultat.detail.events"
                  :key="index"
                >
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'GOAL' &&
                      resultat.awayTeamId.id_sportmonks == event.team_id
                    "
                  >
                    ⚽&nbsp
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp
                    <strong>{{ event.player_name }}</strong>
                  </span>
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'OWN-GOAL' &&
                      resultat.awayTeamId.id_sportmonks == event.team_id
                    "
                  >
                    ⚽&nbsp
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp
                    <strong>{{ event.player_name }}</strong>
                    <span>(csc)</span>
                  </span>
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'PENALTY' &&
                      resultat.awayTeamId.id_sportmonks == event.team_id
                    "
                  >
                    ⚽&nbsp
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp
                    <strong>{{ event.player_name }}</strong>
                    <span>(pen)</span>
                  </span>
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'MISSED_PENALTY' &&
                      resultat.awayTeamId.id_sportmonks == event.team_id
                    "
                  >
                    <img
                      loading="lazy"
                      class="missPen cardRefer"
                      src="~assets/images/pen-shootout-miss.svg"
                      alt="missPen"
                    />
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp
                    <strong>{{ event.player_name }}</strong>
                    <span>(pen)</span>
                  </span>
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'YELLOWCARD' &&
                      resultat.awayTeamId.id_sportmonks == event.team_id
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/yellow_card_icon.svg"
                      alt="yellowCard"
                    />
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp {{ event.player_name }}
                  </span>
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'YELLOWRED' &&
                      resultat.awayTeamId.id_sportmonks == event.team_id
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/red_card_icon.svg"
                      alt="redCard"
                    />
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp {{ event.player_name }}
                  </span>
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'REDCARD' &&
                      resultat.awayTeamId.id_sportmonks == event.team_id
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/red_card_icon.svg"
                      alt="redCard"
                    />
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp {{ event.player_name }}
                  </span>
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'SUBSTITUTION' &&
                      resultat.awayTeamId.id_sportmonks == event.team_id
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/substitution_icon.svg"
                      alt="substitute"
                    />
                    &nbsp
                    <p class="is-wc">{{ event.minute }}"</p>
                    &nbsp
                    <span>
                      <p class="has-text-green">{{ event.player_name }}</p>
                      <p class="has-text-red">
                        {{ event.related_player_name }}
                      </p>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div
              v-if="
                resultat.goalsHomeTeam === resultat.goalsAwayTeam &&
                resultat.status === 'FT_PEN'
              "
            >
              <hr />
              <strong class="penSeance">{{
                langSelected === "EN"
                  ? "Penalty shootout"
                  : "Séance de tirs au but"
              }}</strong>
              <div class="pronoPlayer">
                <div class="goals-panel" v-if="resultat.detail.events">
                  <div
                    v-for="(event, index) in resultat.detail.events"
                    :key="index"
                  >
                    <span
                      class="goalshome"
                      v-if="
                        event.type === 'pen_shootout_goal' &&
                        resultat.homeTeamId.id_sportmonks == event.team_id
                      "
                    >
                      ⚽&nbsp &nbsp
                      <strong>{{ event.player_name }}</strong>
                    </span>

                    <span
                      class="goalshome"
                      v-if="
                        event.type === 'pen_shootout_miss' &&
                        resultat.homeTeamId.id_sportmonks == event.team_id
                      "
                    >
                      <img
                        loading="lazy"
                        class="missPen cardRefer"
                        src="~assets/images/pen-shootout-miss.svg"
                        alt="missPen"
                      />
                      &nbsp
                      <strong>{{ event.player_name }}</strong>
                    </span>
                  </div>
                </div>
                <div class="goals-panel" v-if="resultat.detail.events">
                  <div
                    v-for="(event, index) in resultat.detail.events"
                    :key="index"
                  >
                    <span
                      class="goalsaway"
                      v-if="
                        event.type === 'pen_shootout_goal' &&
                        resultat.awayTeamId.id_sportmonks == event.team_id
                      "
                    >
                      ⚽&nbsp &nbsp
                      <strong>{{ event.player_name }}</strong>
                    </span>

                    <span
                      class="goalsaway"
                      v-if="
                        event.type === 'pen_shootout_miss' &&
                        resultat.awayTeamId.id_sportmonks == event.team_id
                      "
                    >
                      <img
                        loading="lazy"
                        class="missPen cardRefer"
                        src="~assets/images/pen-shootout-miss.svg"
                        alt="missPen"
                      />
                      &nbsp
                      <strong>{{ event.player_name }}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-field>
      </div>
      <div class="createContest">
        <p class="button is-large buttonLoginLeaderboard" type="button">
          Voir les buts
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import { getMatchResultBot } from "@/server/apiAdmin";
export default {
  data() {
    return {
      total: 0,
      loading: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 7,
      perPage: 30,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      resultat: "",
    };
  },
  mounted() {
    getMatchResultBot(this.$route.params.id).then((resultat) => {
      this.resultat = resultat;
    });
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
  methods: {
    result(resultat) {
      this.resultat = resultat;
      this.resultatModal = true;
    },

    ligue(event) {
      this.$store.commit("var/setNewValue", event);
      setTimeout(() => {
        this.$router.push("/leagues");
      }, 10);
    },
    moment: function (time) {
      return moment(time);
    },
    sortByDate(a, b, isAsc) {
      if (isAsc) {
        return (
          new Date(b.schedule_date).getTime() -
          new Date(a.schedule_date).getTime()
        );
      } else {
        return (
          new Date(a.schedule_date).getTime() -
          new Date(b.schedule_date).getTime()
        );
      }
    },
    sortByDateDesc(a, b) {
      if (
        new Date(a.info.time.starting_at.date_time) <
        new Date(b.info.time.starting_at.date_time)
      )
        return 1;
      if (
        new Date(a.info.time.starting_at.date_time) >
        new Date(b.info.time.starting_at.date_time)
      )
        return -1;

      return 0;
    },
    sortByDateAsc(a, b) {
      if (
        new Date(a.info.time.starting_at.date_time) <
        new Date(b.info.time.starting_at.date_time)
      )
        return -1;
      if (
        new Date(a.info.time.starting_at.date_time) >
        new Date(b.info.time.starting_at.date_time)
      )
        return 1;

      return 0;
    },
    accessTeam(event) {
      this.$router.push("/teams/" + event);
    },
    sortByDate(a, b, isAsc) {
      if (isAsc) {
        return (
          new Date(b.schedule_date).getTime() -
          new Date(a.schedule_date).getTime()
        );
      } else {
        return (
          new Date(a.schedule_date).getTime() -
          new Date(b.schedule_date).getTime()
        );
      }
    },
  },
};
</script>

<style scoped>
.box {
  padding: 0.75rem;
}
.teamNameGame {
  display: flex;
  justify-content: center;
}

.journée {
  display: flex;
  margin-bottom: 5px;
}

.createContest {
  display: flex;
  justify-content: center;
  margin: 1rem;
  margin-top: 1.25rem;
}
.buttonLoginLeaderboard {
  align-self: center;
  font-weight: bolder !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #eef1f7 !important;
  background-color: #ff7d00 !important;
}

.buttonLoginLeaderboard:focus,
.buttonLoginLeaderboard:hover {
  font-weight: bolder !important;
  color: #ff7d00 !important;
  box-shadow: 0 0 0 0.125em #eef1f7 !important;
  border-color: #ff7d00 !important;
  background-color: #eef1f7 !important;
}

.logoligue {
  width: auto;
  max-height: 45px;
}

.resultModalTitle > span {
  display: flex;
}
.resultModalTitle > span > strong {
  margin: auto;
  font-size: 1.5rem;
}
.resultModalTitle > img {
  max-height: 60px !important;
}

.scorePosition {
  align-self: center;
  font-size: 2rem !important;
}
.card-content {
  padding: 0rem;
}
.vs {
  align-self: center;
  height: 35px !important;
}
.navbar.is-dark {
  background-color: #192b41;
  color: #eef1f7;
}
.whiteci {
  color: #eef1f7;
}
.babMenu {
  background-color: transparent;
  color: #ff7d00 !important;
  font-weight: bold;
  padding-bottom: calc(0.5rem - 3px);
}

.timer {
  display: flex;
  justify-content: center;
  color: #ffcf00 !important;
  flex-direction: column;
  font-size: 1rem !important;
}
.countdown {
  margin-bottom: 5px;
}

.teamShirt {
  height: 50px !important;
}
.level-item {
  display: flex;
  justify-content: CENTER;
}
.bullsAndBearsPic {
  justify-content: space-evenly;
  display: flex;
  width: 25%;
}
.bullsAndBearsPicVsLogo {
  width: 20%;
  display: flex;
  justify-content: center;
}
.bullsAndBearsPicVs {
  width: 10%;
}

.box > p {
  display: flex;
  justify-content: space-between;
}
.title {
  margin-bottom: 0rem;
}
hr {
  background-color: #dbdbdb;
  border: none;
  display: block;
  height: 1px;
  margin: 1rem 0;
}

.is-current-sort {
  display: none !important;
}
.journee {
  display: flex;
  justify-content: center;
}
thead {
  display: none !important;
}
.is-current-sort {
  display: none !important;
}
.dayChampion {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
  margin-left: 0;
  padding: 5px;
}

.babMenu {
  font-size: 1.3rem;
  color: lightgrey !important;
}

.teamNameStrong {
  width: 10%;
}
.tirsAuBut {
  align-self: center;
}
.teamNameLogo {
  display: flex;
  justify-content: center;
}
.penSeance {
  display: flex;
  justify-content: center;
}
.teamNameStrong {
  align-self: center;
}
.logoClub {
  align-self: center;
}
.has-text-contest {
  font-weight: bold;
}
.versusFigure1 {
  display: flex !important;
  flex-direction: column !important;
  align-self: center;
}
.pointer1 {
  cursor: pointer;
  font-size: 1rem !important;
  font-style: italic !important;
  color: #192b41 !important;
}

.pronoPlayer {
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
}
.goals-panel {
  font-weight: normal !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  min-width: 50%;
  font-size: 0.8rem !important;
  margin-left: 3rem;
}

.goals-panel2 {
  font-weight: normal !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  min-width: 50%;
  margin-left: 1rem;
}
.goalshome {
  display: flex !important;
  text-align: left;
  padding-right: 5px;
}
.goalsaway {
  display: flex !important;
  text-align: left;
  padding-left: 5px;
}
.scoreResultModal {
  font-size: 1.7rem !important;
}
h1 {
  padding-top: 1rem;
}
.team {
  min-width: 25%;
}

.modalTitleBet {
  text-align: center;
  margin-bottom: 0rem;
}

.bullsAndBearsPicVs {
  display: flex;
  justify-content: center;
  align-self: center;
}
.bullsAndBearsPicVsName {
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
  display: flex;
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
.is-6 {
  margin: auto;
}
.box {
  padding: 0.75rem;
}
.headingTitle {
  display: FLEX;
  flex-direction: COLUMN;
  text-align: CENTER;
  font-size: 1.3rem !important;
  color: #192b41 !important;
  margin-bottom: 1.5rem;
}
.headingTitle > img {
  margin: auto;
  max-width: 50% !important;
  margin-bottom: 1.2rem;
}
.headingTitle > h2 {
  font-size: 1.2rem;
  color: #192b41;
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
  border-radius: 3px;
  margin: 2px;
  font-size: 1.25rem;
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
  font-size: 1.2rem !important;
}
h1 {
  font-size: 1.2rem !important;
}
.has-text-centered {
  font-size: 1.2rem !important;
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
.separatorScoreResult {
  margin: 0px 3px;
  font-size: 2.25rem;
}
.navbar-item.navbar-item.is-tab:hover {
  color: #192b41 !important;
}
.mobileNav {
  display: none;
}
.desktopNav {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.mobileOnly {
  display: none;
}
@media (max-width: 1047px) {
  .desktopOnly {
    display: none !important;
  }
  .journee {
    display: flex;
    justify-content: space-between;
  }
  .mobileOnly {
    display: flex;
    flex-direction: column;
  }
  .NextMatchWrapper:before {
    margin-right: 0 !important;
    padding-right: 0em !important;
    width: 0% !important;
  }
  .NextMatchWrapper {
    width: 100% !important;
  }
  .NextMatchWrapper > span {
    width: 100% !important;
  }
  .logoligue {
    width: auto;
    height: 35px;
  }
  .fa-arrow-circle-left {
    font-size: 2rem;
  }
  .fa-arrow-circle-right {
    font-size: 2rem;
  }
  .pointer1 {
    cursor: pointer;
    font-size: 0.7rem !important;
    font-style: italic !important;
    color: #192b41 !important;
  }
  .desktopNav {
    display: none;
  }
  .mobileNav {
    display: flex;
    justify-content: space-between;
    min-height: 3.25rem;
  }
  .has-text-centered {
    justify-content: center !important;
  }
  .babMenu {
    font-size: 0.9rem;
  }
  .navbar-item.is-tab.is-active {
    font-size: 0.9rem;
  }
  .teamNameStrong {
    width: auto;
  }

  .matchProno {
    width: 100% !important;
  }
  .separatorScoreResult {
    margin: 0px 3px;
    font-size: 1rem;
  }
  .pointsContest {
    display: flex;
  }

  .is-large {
    font-size: 0.8rem !important;
  }
  .is-greyLit {
    font-size: 0.8rem !important;
  }

  .vs {
    height: 32px !important;
  }
  .positionClass {
    font-size: 1rem !important;
  }
  .displayFlex {
    display: flex;
    flex-direction: column;
  }
  .bullsAndBearsPicVsName {
    width: 30%;
    padding-left: 5px;
    padding-right: 5px;
  }
  .is-hidden-tablet {
    display: none !important;
  }
  img {
    max-height: 42px !important;
  }
  .teamNameLogo > img {
    max-height: 45px !important;
    margin: 0px;
    padding: 1px;
    height: 45px !important;
    width: auto;
  }
  .goalsaway > img {
    max-height: 16px !important;
  }
  .goalshome > img {
    max-height: 16px !important;
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
