<template>
  <div v-if="$auth.user && $auth.user._id" class="column sideRecent mainSCI">
    <div class="box">
      <p v-if="langSelected === 'EN'">
        <span class="title has-text-contest is-5">my forecasts </span>
      </p>
      <p v-else>
        <span class="title has-text-contest is-5">mes pronos</span>
      </p>
      <hr />

      <div v-if="!openProno || (openProno && openProno.length < 1)">
        <div class>
          <nuxt-link to="/contest">
            <p v-if="langSelected === 'EN'">have a break</p>
            <p v-else class="content-no-bet">have a break</p>
            <div class="displayFlex">
              <button class="button is-contest">take a bet !</button>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div v-else-if="!mobile">
        <div
          v-for="(match, index) in openProno"
          :key="index"
          class="card desktopOnly profile-card"
        >
          <div
            v-if="
              match &&
              match.match &&
              match.match.status.toUpperCase() != 'CANCL' &&
              match.match.status.toUpperCase() != 'POSTP'
            "
            class="watchList card-content"
          >
            <nav class="bandB level media">
              <div class="bullsAndBears">
                <div class="bullsAndBearsPic">
                  <b-tooltip
                    :label="
                      langSelected === 'EN'
                        ? match.match.homeTeamId.searchName
                        : match.match.homeTeamName
                    "
                    position="is-top"
                    class="bullsAndBearsPicVS"
                    type="is-info"
                    size="is-large"
                  >
                    <nuxt-link
                      v-if="match.match.homeTeamId.shortName"
                      :to="`/teams/${match.match.homeTeamId.shortName}`"
                      class="pointer logoNameDesk"
                    >
                      <img
                        class="teamShirt pointer"
                        :src="match.match.homeTeamId.teamImg"
                        :alt="match.match.homeTeamName"
                        :class="{
                          invertOk: match.match.homeTeamName
                            .toUpperCase()
                            .includes('JUVE'),
                        }"
                      />
                    </nuxt-link>
                  </b-tooltip>
                </div>
                <div class="level-item has-text-centered">
                  <div
                    @click="iWantBet(match)"
                    v-if="match && match.status === 'active'"
                    class="bet pointer"
                  >
                    <!-- <strong class="has-text-blue nameClub">{{match.match.homeTeamName}}</strong> -->
                    <div class="displayFlex" id="myPronoWrap">
                      <span
                        >{{ langSelected === "EN" ? "My pick" : "mon prono" }}
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </span>
                      <div class="scoreProno">
                        <b-tag
                          :class="{
                            'is-green': match.scoreTeam1 > match.scoreTeam2,
                            'is-red': match.scoreTeam1 < match.scoreTeam2,
                            'is-blueInfo': match.scoreTeam1 == match.scoreTeam2,
                          }"
                          size="is-medium"
                          >{{ match.scoreTeam1 }}</b-tag
                        >
                        <strong class="separatorScore">-</strong>
                        <b-tag
                          :class="{
                            'is-green': match.scoreTeam1 < match.scoreTeam2,
                            'is-red': match.scoreTeam1 > match.scoreTeam2,
                            'is-blueInfo': match.scoreTeam1 == match.scoreTeam2,
                          }"
                          size="is-medium"
                          >{{ match.scoreTeam2 }}</b-tag
                        >
                      </div>
                    </div>

                    <div v-if="match.bettingPoints" class="pointsContest">
                      <div class="displayFlex">
                        <span>
                          {{ langSelected === "EN" ? "bet of" : "mise de" }}
                          <strong class="has-text-contest"
                            >{{ match.bettingPoints }} pts</strong
                          >
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </span>

                        <img
                          loading="lazy"
                          class="miseLogo"
                          src="~assets/images/miseLogo.png"
                          alt="mise"
                        />
                      </div>
                    </div>
                    <!-- <strong class="has-text-blue nameClub">{{match.match.awayTeamName}}</strong> -->
                  </div>
                  <div
                    class="pointsContest"
                    v-else-if="match && match.status != 'active'"
                  >
                    <div v-if="match.bonus == true" class="scoreProno">
                      <b-tooltip
                        :label="`${
                          langSelected == 'EN'
                            ? '👏👏👏 You got the right score!'
                            : '👏👏👏 Tu as le bon score !'
                        }`"
                        position="is-top"
                        class
                        type="is-info"
                        size="is-medium"
                      >
                        <img
                          loading="lazy"
                          class="oops"
                          src="~assets/images/bonus-final.png"
                          alt="bonus"
                        />
                      </b-tooltip>
                    </div>
                    <strong class="has-text-contest mesPoints"
                      >{{
                        Number(
                          match.performancePoints.toFixed(2)
                        ).toLocaleString("fr")
                      }}
                      pts</strong
                    >

                    <div v-if="match.bettingPointsWon" class="pointsContest">
                      <div class="miseResult">
                        <img
                          loading="lazy"
                          class="miseLogoResult"
                          src="~assets/images/miseLogo.png"
                          alt="mise"
                        />
                      </div>
                    </div>
                  </div>
                  <div v-else class="button is-large buttonBet" type="button">
                    {{ langSelected === "EN" ? "My pick" : "mon prono" }}
                  </div>
                </div>

                <div class="bullsAndBearsPic">
                  <b-tooltip
                    :label="
                      langSelected === 'EN'
                        ? match.match.awayTeamId.searchName
                        : match.match.awayTeamName
                    "
                    position="is-top"
                    class="bullsAndBearsPicVS"
                    type="is-info"
                    size="is-large"
                  >
                    <nuxt-link
                      v-if="match.match.awayTeamId.shortName"
                      :to="`/teams/${match.match.awayTeamId.shortName}`"
                      class="pointer logoNameDesk"
                    >
                      <img
                        class="teamShirt pointer"
                        :src="match.match.awayTeamId.teamImg"
                        :alt="match.match.awayTeamName"
                        :class="{
                          invertOk: match.match.awayTeamName
                            .toUpperCase()
                            .includes('JUVE'),
                        }"
                      />
                    </nuxt-link>
                  </b-tooltip>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div v-if="resultat">
      <b-modal :active.sync="resultatModal">
        <resultat-modal
          class="modalResultLineup"
          :lineUp="lineUp"
          :resultat="resultat"
        ></resultat-modal>
      </b-modal>
    </div>
    <b-modal :active.sync="stadiumModal">
      <stadium-modal :stadium="stadium"></stadium-modal>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";

export default {
  components: {
    resultatModal: () => import("@/components/modal/resultatModal"),
    stadiumModal: () => import("@/components/modal/stadiumModal"),
  },
  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      total: 0,
      loading: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 7,
      perPage: 30,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      lineUp: "",
      stadium: "",
      stadiumModal: false,
      resultatModal: false,
      resultat: "",
    };
  },

  props: {
    openProno: "",
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
    iWantBet(currentInsight) {
      if (this.$auth.user && this.$auth.user._id) {
        if (
          currentInsight.match.status.toUpperCase() != "NS" &&
          currentInsight.match.status.toUpperCase() != "TBA"
        ) {
          this.oops();
        } else {
          let currentInsighttoemit = {};
          currentInsighttoemit = currentInsight.match;
          currentInsighttoemit.userBet = {};
          currentInsighttoemit.userBet._id = currentInsight._id;
          currentInsighttoemit.userBet.bettingPoints =
            currentInsight.bettingPoints;
          currentInsighttoemit.userBet.scoreTeam1 = currentInsight.scoreTeam1;
          currentInsighttoemit.userBet.scoreTeam2 = currentInsight.scoreTeam2;
          currentInsighttoemit.userBet.match = currentInsight.match;
          this.$emit("iWantBet", currentInsighttoemit);
        }
      } else {
        this.$router.push("/signup");
      }
    },
    oops() {
      this.$buefy.dialog.alert(
        this.langSelected == "EN"
          ? "Bets are done <br><strong> Nothing can go anymore !!! </strong>"
          : "Les jeux sont faits <br><strong>Rien ne va plus !!!</strong>"
      );
    },
    seeLineup(event) {
      this.resultat = event.match;
      this.lineUp = true;
      this.resultatModal = true;
    },
    result(resultat) {
      this.lineUp = false;
      this.resultat = resultat.match;
      this.resultatModal = true;
    },
    seeStadium(event) {
      this.stadium = event;
      this.stadiumModal = true;
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
.profile-card {
  background-color: #eef1f7;
}
.resultWrapper {
  display: FLEX;
  flex-direction: COLUMN;
  align-items: CENTER;
}
.box {
  font-size: 1rem;
}

.displayFlex {
  justify-content: center;
  margin-top: 15px;
  display: flex;
  margin-bottom: 0.5rem !important;
}
.journéeSpan {
  margin: auto;
  margin-left: 0 !important;
  align-self: center;
  font-size: 0.9rem;
}
.journée {
  display: flex;
  margin-bottom: 5px;
}
.content-no-bet {
  padding: 5px;
}
.scoreProno {
  margin: 0px;
  display: flex;
  justify-content: CENTER;
  align-items: center;
}
.mesPoints {
  margin-right: 10px;
  margin-left: 10px;
}
.forme {
  margin-top: 2px;
  display: flex;
}
.form {
  padding: 3px;
  margin: 0 1px;
  font-size: 0.7rem;
  font-weight: bold;
}
.oops {
  width: 50px !important;
  align-self: center;
}

.bet {
  display: flex;
  justify-content: center;
}
.bet > .displayFlex {
  display: flex;
  flex-direction: column;
  margin: 0rem !important;
  align-items: center;
}
#myPronoWrap {
  margin-right: 0px !important;
}

.bet > .displayFlex > span {
  font-style: italic;
  font-size: 0.9rem;
}
.pointsContest {
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.pointsContest > .displayFlex {
  display: flex;
  flex-direction: column;
  margin: 0rem !important;
  align-items: center;
}

.pointsContest > .displayFlex > span {
  font-style: italic;
  font-size: 0.9rem;
}
.miseLogo {
  height: 36px !important;
  width: auto;
}
.miseLogoResult {
  height: 36px !important;
  width: auto;
}
.Wrap {
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.separatorScore {
  margin: 0px 3px;
  font-size: 1rem;
  align-self: center;
}
.profile-card {
  background-color: #eef1f7;
}
.logoNameDesk {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.spaceBetween {
  width: 95%;
  display: flex;
  justify-content: space-between;
}
.box {
  padding: 0.75rem;
}
.journée {
  display: flex;
  margin-bottom: 5px;
}
.journée > div {
  display: flex;
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
  max-height: 25px;
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
  flex-direction: column;
  color: #ffcf00 !important;
  flex-direction: column;
  font-size: 0.8rem !important;
}

.timer > strong {
  align-self: flex-end;
}
.timer > div {
  align-self: flex-end;
  color: #ffcf00 !important;
  font-size: 0.8rem !important;
}

.timer > div > strong {
  align-self: flex-end;
}

.countdown {
  margin-bottom: 5px;
}

.teamShirt {
  height: 45px !important;
  width: auto !important;
}
.level-item {
  display: flex;
  justify-content: CENTER;
}
.bullsAndBearsPic {
  width: 30%;
  justify-content: space-evenly;
  display: flex;
}
.bullsAndBearsPicVsLogo {
  width: 20%;
  display: flex;
  justify-content: center;
}

.bullsAndBears {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100% !important;
}
.bandB {
  justify-content: center;
}
.Last {
  margin-bottom: 5px;
  margin-top: 5px;
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
  font-size: 1.2rem;
  color: lightgrey !important;
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
#is-lineUp {
  font-size: 1rem !important;
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
  height: 30px !important;
  align-self: center;
  width: auto;
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

.resultContest {
  width: 100%;
}
.miseResult {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.miseDet {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.miseDet > .is-italic {
  font-size: 0.8rem !important;
}
.miseDet > .is-bold {
  font-size: 1rem !important;
}
.justifyCenterWidth {
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
}
.pointsContest {
  display: flex;
  justify-content: space-evenly;
  font-size: 2rem;
}
@media (max-width: 1047px) {
  .miseDet > .is-italic {
    font-size: 0.8rem !important;
  }
  .miseDet > .is-bold {
    font-size: 1rem !important;
  }
  .mesPoints {
    padding: 5px;
    font-size: 1.5rem !important;
    padding: 5px;
    padding-bottom: 0px;
  }
  .scoreProno {
    margin: 10px;
    margin-bottom: 0px;
  }
  .mesPoints > div {
    padding: 5px;
    padding-bottom: 0px;
  }
  .miseResult {
    margin: 10px 10px 0;
  }
  .miseLogo {
    width: 30px !important;
    margin-right: 5px;
  }
  .miseLogoResult {
    width: 30px !important;
    margin-right: 5px;
  }
}
@media screen and (max-width: 361px) {
  .mesPoints {
    font-size: 1.1rem !important;
  }
  .miseDet > .is-bold {
    font-size: 0.8rem !important;
  }
  .miseDet > .is-italic {
    font-size: 0.7rem !important;
  }
}
</style>

