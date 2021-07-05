<template>
  <section class="main">
    <div class="matchoftheday box column is-6">
      <h1 class="has-text-contest headingTitle">
        <img
          loading="lazy"
          class="insidersLogo"
          src="~assets/images/logo.png"
          alt="footfootLogo"
        />
        Les affiches du jour
        <br />
      </h1>
      <div
        v-for="(match, index) in bigMatches"
        :key="index"
        class="card profile-card"
      >
        <div
          v-if="
            match.status.toUpperCase() === 'NOT STARTED' ||
            match.status.toUpperCase() === 'NS' ||
            match.status.toUpperCase() === 'TBA' ||
            match.status.toUpperCase() === 'FT' ||
            match.status.toUpperCase() === 'AET' ||
            match.status.toUpperCase() === 'FT_PEN'
          "
          class="card-content watchList"
        >
          <nav class="bandB level media">
            <div class="bullsAndBears">
              <div class="teamLogoForme">
                <div>
                  <div class="bullsAndBearsPic">
                    <nuxt-link
                      :to="'/teams/' + match.homeTeamId.shortName.toLowerCase()"
                      class="pointer"
                    >
                      <img
                        loading="lazy"
                        class="teamShirt pointer"
                        :src="match.homeTeamId.teamImg"
                        :alt="match.homeTeamName"
                      />&nbsp
                    </nuxt-link>
                  </div>
                  <strong class="teamNameGameDesktop">
                    {{ match.homeTeamId.searchName }}&nbsp
                    <strong
                      v-if="
                        match.codeCompetitionApi === '8' ||
                        match.codeCompetitionApi === '82' ||
                        match.codeCompetitionApi === '301' ||
                        match.codeCompetitionApi === '384' ||
                        match.codeCompetitionApi === '564'
                      "
                      class="teamNameGameDesktop"
                    >
                      ({{ match.homeTeamId.championshipRank }}
                      <sup>{{
                        match.homeTeamId.championshipRank === 1 ? "er" : "ème"
                      }}</sup
                      >)
                    </strong>
                  </strong>
                </div>
                <div class="forme">
                  <span
                    v-if="match.homeTeamId.forme[0] == 'V'"
                    class="form is-win"
                    >{{ langSelected === "EN" ? "W" : "V" }}</span
                  >
                  <span
                    v-else-if="match.homeTeamId.forme[0] == 'N'"
                    class="form is-draw"
                  >
                    {{ langSelected === "EN" ? "D" : "N" }}</span
                  >
                  <span
                    v-else-if="match.homeTeamId.forme[0] == 'D'"
                    class="form is-loss"
                    >{{ langSelected === "EN" ? "L" : "D" }}</span
                  >
                  <span
                    v-if="match.homeTeamId.forme[1] == 'V'"
                    class="form is-win"
                    >{{ langSelected === "EN" ? "W" : "V" }}</span
                  >
                  <span
                    v-else-if="match.homeTeamId.forme[1] == 'N'"
                    class="form is-draw"
                  >
                    {{ langSelected === "EN" ? "D" : "N" }}</span
                  >
                  <span
                    v-else-if="match.homeTeamId.forme[1] == 'D'"
                    class="form is-loss"
                    >{{ langSelected === "EN" ? "L" : "D" }}</span
                  >
                  <span
                    v-if="match.homeTeamId.forme[2] == 'V'"
                    class="form is-win"
                    >{{ langSelected === "EN" ? "W" : "V" }}</span
                  >
                  <span
                    v-else-if="match.homeTeamId.forme[2] == 'N'"
                    class="form is-draw"
                  >
                    {{ langSelected === "EN" ? "D" : "N" }}</span
                  >
                  <span
                    v-else-if="match.homeTeamId.forme[2] == 'D'"
                    class="form is-loss"
                    >{{ langSelected === "EN" ? "L" : "D" }}</span
                  >
                  <span
                    v-if="match.homeTeamId.forme[3] == 'V'"
                    class="form is-win"
                    >{{ langSelected === "EN" ? "W" : "V" }}</span
                  >
                  <span
                    v-else-if="match.homeTeamId.forme[3] == 'N'"
                    class="form is-draw"
                  >
                    {{ langSelected === "EN" ? "D" : "N" }}</span
                  >
                  <span
                    v-else-if="match.homeTeamId.forme[3] == 'D'"
                    class="form is-loss"
                    >{{ langSelected === "EN" ? "L" : "D" }}</span
                  >
                  <span
                    v-if="match.homeTeamId.forme[4] == 'V'"
                    class="form is-win"
                    >{{ langSelected === "EN" ? "W" : "V" }}</span
                  >
                  <span
                    v-else-if="match.homeTeamId.forme[4] == 'N'"
                    class="form is-draw"
                  >
                    {{ langSelected === "EN" ? "D" : "N" }}</span
                  >
                  <span
                    v-else-if="match.homeTeamId.forme[4] == 'D'"
                    class="form is-loss"
                    >{{ langSelected === "EN" ? "L" : "D" }}</span
                  >
                </div>
              </div>
              <div class="level-item versusBox has-text-centered">
                <div
                  class="journée pointer"
                  @click="ligue(match.codeCompetitionApi)"
                >
                  <span
                    v-if="match.matchday === '8th Finals'"
                    class="journéeSpan pointer"
                  >
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
                    v-else-if="match.matchday === '16th Finals'"
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
                    v-else-if="match.matchday === '32nd Finals'"
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
                  <span
                    v-else-if="match.matchday === 'Quarter-finals'"
                    class="journéeSpan pointer"
                  >
                    <strong>{{
                      langSelected === "EN"
                        ? "Quarter final"
                        : "Quart de finale"
                    }}</strong>
                  </span>
                  <span
                    v-else-if="match.matchday === 'Semi-finals'"
                    class="journéeSpan pointer"
                  >
                    <strong>{{
                      langSelected === "EN" ? "Semi final" : "Demi-finale"
                    }}</strong>
                  </span>
                  <span
                    v-else-if="match.matchday === 'bronze'"
                    class="journéeSpan pointer"
                  >
                    <strong v-if="langSelected === 'EN'">
                      match for 3
                      <sup>rd</sup> place
                    </strong>
                    <strong v-else>
                      match pour la 3
                      <sup>ème</sup> place
                    </strong>
                  </span>
                  <span
                    v-else-if="match.matchday === 'Final'"
                    class="journéeSpan pointer"
                  >
                    <strong>{{
                      langSelected === "EN" ? "Final" : "Finale"
                    }}</strong>
                  </span>
                  <span
                    v-else-if="match.matchday == 'Group Stage'"
                    class="journéeSpan"
                  >
                    <strong>{{
                      langSelected === "EN" ? match.matchday : "phase de groupe"
                    }}</strong>
                  </span>
                  <span
                    v-else-if="langSelected === 'EN'"
                    class="journéeSpan pointer"
                  >
                    <strong
                      v-if="
                        match.matchday == '1' ||
                        match.matchday == '21' ||
                        match.matchday == '31'
                      "
                    >
                      {{ match.matchday }}
                      <sup>st</sup> day of
                    </strong>
                    <strong
                      v-else-if="
                        match.matchday == '2' ||
                        match.matchday == '22' ||
                        match.matchday == '32'
                      "
                    >
                      {{ match.matchday }}
                      <sup>nd</sup> day of
                    </strong>
                    <strong
                      v-else-if="
                        match.matchday == '3' ||
                        match.matchday == '23' ||
                        match.matchday == '33'
                      "
                    >
                      {{ match.matchday }}
                      <sup>rd</sup> day of
                    </strong>
                    <strong v-else>
                      {{ match.matchday }}
                      <sup>th</sup> day of
                    </strong>
                  </span>
                  <span
                    v-else
                    class="journéeSpan pointer"
                  >
                    <strong v-if="match.matchday == '1'">
                      {{ match.matchday }}
                      <sup>ère</sup> journée de
                    </strong>
                    <strong v-else>
                      {{ match.matchday }}
                      <sup>ème</sup> journée de
                    </strong>
                  </span>
                  &nbsp
                  <figure class="image dayChampion">
                    <img
                      class="logoligue"
                      :src="'/logoLigue/' + match.codeCompetitionApi + '.png'"
                      alt="logoLigue1"
                    />
                  </figure>
                </div>
                <img
                  loading="lazy"
                  class="vs"
                  src="~assets/images/versus.png"
                  alt="versus"
                />

                <div class="timer countdown">
                  <strong class="is-wc">{{
                    moment(match.date)
                      .local()
                      .locale(langSelected.toLowerCase())
                      .calendar()
                  }}</strong>
                  <strong class="has-text-yellow">{{
                    match.stadium && match.stadium.name
                      ? match.stadium.name.substring(0, 35)
                      : ""
                  }}</strong>
                </div>
              </div>
              <div class="teamLogoForme">
                <div>
                  <div class="bullsAndBearsPic">
                    <nuxt-link
                      :to="'/teams/' + match.awayTeamId.shortName.toLowerCase()"
                      class="pointer"
                    >
                      <img
                        loading="lazy"
                        class="teamShirt pointer"
                        :src="match.awayTeamId.teamImg"
                        :alt="match.awayTeamName"
                      />
                    </nuxt-link>
                  </div>
                  <strong class="teamNameGameDesktop">
                    {{ match.awayTeamId.searchName }}&nbsp
                    <strong
                      v-if="
                        match.codeCompetitionApi === '8' ||
                        match.codeCompetitionApi === '82' ||
                        match.codeCompetitionApi === '301' ||
                        match.codeCompetitionApi === '384' ||
                        match.codeCompetitionApi === '564'
                      "
                      class="teamNameGameDesktop"
                    >
                      ({{ match.awayTeamId.championshipRank }}
                      <sup>{{
                        match.awayTeamId.championshipRank === 1 ? "er" : "ème"
                      }}</sup
                      >)
                    </strong>
                  </strong>
                </div>
                <div class="forme">
                  <span
                    v-if="match.awayTeamId.forme[0] == 'V'"
                    class="form is-win"
                    >{{ langSelected === "EN" ? "W" : "V" }}</span
                  >
                  <span
                    v-else-if="match.awayTeamId.forme[0] == 'N'"
                    class="form is-draw"
                  >
                    {{ langSelected === "EN" ? "D" : "N" }}</span
                  >
                  <span
                    v-else-if="match.awayTeamId.forme[0] == 'D'"
                    class="form is-loss"
                    >{{ langSelected === "EN" ? "L" : "D" }}</span
                  >
                  <span
                    v-if="match.awayTeamId.forme[1] == 'V'"
                    class="form is-win"
                    >{{ langSelected === "EN" ? "W" : "V" }}</span
                  >
                  <span
                    v-else-if="match.awayTeamId.forme[1] == 'N'"
                    class="form is-draw"
                  >
                    {{ langSelected === "EN" ? "D" : "N" }}</span
                  >
                  <span
                    v-else-if="match.awayTeamId.forme[1] == 'D'"
                    class="form is-loss"
                    >{{ langSelected === "EN" ? "L" : "D" }}</span
                  >
                  <span
                    v-if="match.awayTeamId.forme[2] == 'V'"
                    class="form is-win"
                    >{{ langSelected === "EN" ? "W" : "V" }}</span
                  >
                  <span
                    v-else-if="match.awayTeamId.forme[2] == 'N'"
                    class="form is-draw"
                  >
                    {{ langSelected === "EN" ? "D" : "N" }}</span
                  >
                  <span
                    v-else-if="match.awayTeamId.forme[2] == 'D'"
                    class="form is-loss"
                    >{{ langSelected === "EN" ? "L" : "D" }}</span
                  >
                  <span
                    v-if="match.awayTeamId.forme[3] == 'V'"
                    class="form is-win"
                    >{{ langSelected === "EN" ? "W" : "V" }}</span
                  >
                  <span
                    v-else-if="match.awayTeamId.forme[3] == 'N'"
                    class="form is-draw"
                  >
                    {{ langSelected === "EN" ? "D" : "N" }}</span
                  >
                  <span
                    v-else-if="match.awayTeamId.forme[3] == 'D'"
                    class="form is-loss"
                    >{{ langSelected === "EN" ? "L" : "D" }}</span
                  >
                  <span
                    v-if="match.awayTeamId.forme[4] == 'V'"
                    class="form is-win"
                    >{{ langSelected === "EN" ? "W" : "V" }}</span
                  >
                  <span
                    v-else-if="match.awayTeamId.forme[4] == 'N'"
                    class="form is-draw"
                  >
                    {{ langSelected === "EN" ? "D" : "N" }}</span
                  >
                  <span
                    v-else-if="match.awayTeamId.forme[4] == 'D'"
                    class="form is-loss"
                    >{{ langSelected === "EN" ? "L" : "D" }}</span
                  >
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="createContest">
        <p class="button is-large buttonLoginLeaderboard" type="button">
          Voir tous les matchs
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import { getNextMatchListBot } from "@/server/apiAdmin";
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
      bigMatches: "",
      dateIndex: moment().format("YYYY-MM-DD"),
    };
  },
  mounted() {
    getNextMatchListBot(this.dateIndex).then((bigMatches) => {
      this.bigMatches = bigMatches;
    });
  },
  props: {},
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
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
.teamLogoName {
  display: flex;
}
.teamLogoForme {
  width: 30%;
}
.versusBox {
  display: flex;
  flex-direction: column;
}
.headingTitle {
  display: FLEX;
  flex-direction: COLUMN;
  text-align: CENTER;
  font-size: 2.5rem !important;
  color: #192b41 !important;
  margin-bottom: 1.5rem;
}
.headingTitle > img {
  margin: auto;
  max-width: 50% !important;
  margin-bottom: 1.5rem;
}
.headingTitle > h2 {
  font-size: 1.8rem;
  color: #192b41;
}
.is-6 {
  margin: auto;
}
.box {
  padding: 0.75rem;
}
.journée {
  display: flex;
  margin-bottom: 5px;
}

.forme {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  font-size: 1rem !important;
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
.teamNameGameDesktop {
  display: flex;
  justify-content: center;
}
.bandB {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
}
.logoligue {
  width: auto;
  max-height: 60px;
}

.scorePosition {
  align-self: center;
  font-size: 2rem !important;
}
.card-content {
  padding: 0rem;
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
#currentInsight {
  padding-left: 20px;
}

.watchList {
  display: flex;
  flex-direction: column;
}
.timer {
  display: flex;
  justify-content: center;
  color: #ffcf00 !important;
  flex-direction: column;
  font-size: 1rem !important;
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
.createContest {
  display: flex;
  justify-content: center;
  margin: 1rem;
  margin-top: 1.25rem;
}
.countdown {
  margin-bottom: 5px;
}

.teamShirt {
  height: 100px !important;
}
.level-item {
  display: flex;
  justify-content: CENTER;
}
.bullsAndBearsPic {
  justify-content: center;
  display: flex;
}
.bullsAndBearsPicVsLogo {
  width: 20%;
  display: flex;
  justify-content: center;
}
.bullsAndBearsPicVs {
  width: 10%;
}
.bullsAndBears {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100% !important;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
.bandB {
  justify-content: center;
}
#Last {
  display: flex;
  justify-content: center;
  align-items: center;
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
.journéeSpan {
  margin: auto;
  margin-left: 0 !important;
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
.navbar-item.is-tab.is-active {
  background-color: transparent;
  border-bottom-color: #eef1f7 !important;
  border-bottom-style: solid !important;
  border-bottom-width: 3px !important;
  color: #eef1f7 !important;
  padding-bottom: calc(0.5rem - 3px) !important;
  font-size: 1.2rem;
  font-weight: bold;
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
  margin: 5px;
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
  font-size: 1.2rem !important;
  padding-top: 1rem;
}
.team {
  min-width: 25%;
}

.vs {
  height: 65px !important;
  align-self: center;
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

.positionClass {
  font-size: 1.2rem !important;
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
</style>
