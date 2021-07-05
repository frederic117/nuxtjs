<template>
  <div class="column sideRecent mainSCI">
    <div class="">
      <p>
        <span class="title is-wc is-5">head to head</span>
      </p>

      <div>
        <div
          v-for="(match, index) in matchList"
          :key="index"
          class="card profile-card"
        >
          <div @click="result(match)" class="pointer watchList card-content">
            <nav class="bandB level media">
              <div class="bet">
                <div class="displayFlex">
                  <span v-if="match.round">
                    {{ langSelected == "EN" ? "day" : "Journée" }}
                    {{ match.round.data.name }} -
                    {{ match.stage.data.league.data.name }} -
                    {{
                      moment(match.time.starting_at.date)
                        .local()
                        .locale(langSelected.toLowerCase())
                        .calendar()
                    }}
                  </span>
                  <span v-else
                    >{{ match.stage.data.name }} -
                    {{ match.stage.data.league.data.name }} -
                    {{
                      moment(match.time.starting_at.date)
                        .local()
                        .locale(langSelected.toLowerCase())
                        .calendar()
                    }}</span
                  >
                </div>
              </div>
              <div class="bullsAndBears">
                <div class="bullsAndBearsPic">
                  <img
                    class="teamShirt pointer"
                    :src="match.localTeam.data.logo_path"
                    :alt="match.localTeam.data.name"
                    :class="{
                      invertOk:
                        match.localTeam.data && match.localTeam.data.name
                          ? match.localTeam.data.name
                              .toUpperCase()
                              .includes('JUV')
                          : false,
                    }"
                  />
                </div>
                <div class="level-item has-text-centered">
                  <div class="bet">
                    <!-- <strong class="has-text-blue nameClub">{{match.match.homeTeamName}}</strong> -->
                    <div class="displayFlex" id="myPronoWrap">
                      <div class="scoreProno">
                        <b-tag
                          :class="{
                            'is-green':
                              match.scores.localteam_score >
                              match.scores.visitorteam_score,
                            'is-red':
                              match.scores.localteam_score <
                              match.scores.visitorteam_score,
                            'is-blueInfo':
                              match.scores.localteam_score ==
                              match.scores.visitorteam_score,
                          }"
                          size="is-medium"
                          >{{ match.scores.localteam_score }}</b-tag
                        >
                        <strong class="separatorScore">-</strong>
                        <b-tag
                          :class="{
                            'is-green':
                              match.scores.localteam_score <
                              match.scores.visitorteam_score,
                            'is-red':
                              match.scores.localteam_score >
                              match.scores.visitorteam_score,
                            'is-blueInfo':
                              match.scores.localteam_score ==
                              match.scores.visitorteam_score,
                          }"
                          size="is-medium"
                          >{{ match.scores.visitorteam_score }}</b-tag
                        >
                      </div>
                      <span
                        v-if="
                          match && match.events.data && match.events.data.length
                        "
                        >{{
                          langSelected == "EN" ? "see détails" : "voir détails"
                        }}</span
                      >
                    </div>
                  </div>
                </div>

                <div class="bullsAndBearsPic">
                  <img
                    class="teamShirt pointer"
                    :src="match.visitorTeam.data.logo_path"
                    :alt="match.visitorTeam.data.name"
                    :class="{
                      invertOk:
                        match.visitorTeam.data && match.visitorTeam.data.name
                          ? match.visitorTeam.data.name
                              .toUpperCase()
                              .includes('JUV')
                          : false,
                    }"
                  />
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    matchList: "",
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
      if (resultat && resultat.events.data && resultat.events.data.length) {
        this.$emit("seeDetail", resultat);
      }
    },
    moment: function (time) {
      return moment(time);
    },
  },
};
</script>
<style scoped>
.colDir {
  flex-direction: column;
  align-items: center;
}
.profile-card {
  background-color: #eef1f7;
}
.resultWrapper {
  display: FLEX;
  flex-direction: COLUMN;
  align-items: CENTER;
}
.box {
  min-width: 500px;
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
  margin-right: 15px;
  margin-left: 15px;
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
  width: 35px !important;
}
.miseLogoResult {
  width: 35px !important;
  margin-right: 5px;
}
.composWrap {
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
  margin-bottom: 0.25rem !important;
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
  height: 45px;
  width: auto !important;
}
.level-item {
  display: flex;
  justify-content: CENTER;
  margin-bottom: 0px !important;
}
.bullsAndBearsPic {
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
.bullsAndBearsEvent {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 0.5rem;
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
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
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

.goals-panel {
  font-weight: normal !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  font-size: 0.8rem !important;
  margin: 5px;
  min-width: 35%;
}

.goalshome {
  display: flex !important;
  text-align: left;
  padding-right: 5px;
  align-items: center;
}

.goalsaway {
  display: flex !important;
  text-align: left;
  padding-left: 5px;
  align-items: center;
}
@media (max-width: 1047px) {
  .box {
    min-width: 50px;
  }
  .goalsaway > img {
    max-height: 16px !important;
  }

  .goalshome > img {
    max-height: 16px !important;
  }
  .goalsaway {
    font-size: 0.9rem !important;
  }
  .goalshome {
    font-size: 0.9rem !important;
  }
  .goalsaway p {
    font-size: 0.9rem !important;
  }

  .goalshome p {
    font-size: 0.9rem !important;
  }
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

