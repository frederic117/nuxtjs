
<template>
  <div class="modal-card modalResult">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ langSelected === "EN" ? "Résults of " : "Résultats de " }}
        {{ insider.username }}
      </p>
    </header>
    <section v-if="isLoadingresult" class="modal-card-body">
      <b-loading
        :is-full-page="false"
        :active.sync="isLoadingresult"
        :canCancel="false"
      ></b-loading>
    </section>
    <section v-else class="modal-card-body">
      <div v-if="matchList.length == 0">
        {{
          langSelected === "EN"
            ? "No results yet in the contest for "
            : "Pas encore de résultats dans le contest pour "
        }}
        {{ insider.username }}
      </div>
      <div
        v-for="(match, index) in matchList"
        :key="index"
        class="box profile-card"
      >
        <div class="watchList card-content">
          <nav class="bandB level media">
            <div class="bullsAndBears">
              <div class="matchProno">
                <div class="journee">
                  <figure width="80" class="image pointer dayChampion">
                    <img
                      :class="{
                        invertOk:
                          Number(match.match.codeCompetitionApi) == 2 ||
                          Number(match.match.codeCompetitionApi) == 5,
                      }"
                      class="logoligue"
                      :src="
                        '/logoLigue/' + match.match.codeCompetitionApi + '.png'
                      "
                      alt="logoLigue"
                    />
                    <span
                      v-if="match.match.matchday === '8th Finals'"
                      class="journéeSpan"
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
                      v-else-if="match.match.matchday === '16th Finals'"
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
                      v-else-if="match.match.matchday === '32nd Finals'"
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
                      v-else-if="match.match.matchday === 'Quarter-finals'"
                      class="journéeSpan"
                    >
                      <strong>{{
                        langSelected === "EN"
                          ? "Quarter final"
                          : "Quart de finale"
                      }}</strong>
                    </span>
                    <span
                      v-else-if="match.match.matchday === 'Semi-finals'"
                      class="journéeSpan"
                    >
                      <strong>{{
                        langSelected === "EN" ? "Semi final" : "Demi-finale"
                      }}</strong>
                    </span>
                    <span
                      v-else-if="match.match.matchday === 'bronze'"
                      class="journéeSpan"
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
                      v-else-if="match.match.matchday === 'Final'"
                      class="journéeSpan"
                    >
                      <strong>{{
                        langSelected === "EN" ? "Final" : "Finale"
                      }}</strong>
                    </span>
                    <span
                      v-else-if="match.match.matchday == 'Group Stage'"
                      class="journéeSpan"
                    >
                      <strong>{{
                        langSelected === "EN"
                          ? match.match.matchday
                          : "phase de groupe"
                      }}</strong>
                    </span>
                    <span v-else-if="langSelected === 'EN'" class="journéeSpan">
                      <strong
                        v-if="
                          match.match.matchday == '1' ||
                          match.match.matchday == '21' ||
                          match.match.matchday == '31'
                        "
                      >
                        {{ match.match.matchday }}
                        <sup>st</sup> day
                      </strong>
                      <strong
                        v-else-if="
                          match.match.matchday == '2' ||
                          match.match.matchday == '22' ||
                          match.match.matchday == '32'
                        "
                      >
                        {{ match.match.matchday }}
                        <sup>nd</sup> day
                      </strong>
                      <strong
                        v-else-if="
                          match.match.matchday == '3' ||
                          match.match.matchday == '23' ||
                          match.match.matchday == '33'
                        "
                      >
                        {{ match.match.matchday }}
                        <sup>rd</sup> day
                      </strong>
                      <strong v-else>
                        {{ match.match.matchday }}
                        <sup>th</sup> day
                      </strong>
                    </span>
                    <span v-else class="journéeSpan">
                      <strong v-if="match.match.matchday == '1'">
                        {{ match.match.matchday }}
                        <sup>ère</sup> journée
                      </strong>
                      <strong v-else>
                        {{ match.match.matchday }}
                        <sup>ème</sup> journée
                      </strong>
                    </span>
                  </figure>

                  <div class="timer countdown">
                    <strong
                      v-if="
                        match.match.status.toUpperCase() === 'FT' ||
                        match.match.status.toUpperCase() === 'AET' ||
                        match.match.status.toUpperCase() === 'FT_PEN'
                      "
                      class="is-wc"
                      >{{
                        langSelected === "EN" ? "game over" : "match terminé"
                      }}</strong
                    >
                    <strong
                      v-if="
                        match.match.status.toUpperCase() != 'AET' &&
                        match.match.status.toUpperCase() != 'FT_PEN' &&
                        match.match.status.toUpperCase() != 'NOT STARTED' &&
                        match.match.status.toUpperCase() != 'NS' &&
                        match.match.status.toUpperCase() != 'TBA' &&
                        match.match.status.toUpperCase() != 'FT' &&
                        match.match.status.toUpperCase() != 'POSTP' &&
                        match.match.status.toUpperCase() != 'CANCL'
                      "
                      class="is-wc"
                      >{{
                        langSelected === "EN"
                          ? "game in progress"
                          : "match en cours"
                      }}</strong
                    >
                    <strong
                      v-if="match.match.status.toUpperCase() === 'TBA'"
                      class="is-wc"
                      >{{
                        moment(match.match.date).local().format("DD-MM") +
                        " (horaire non fixé)"
                      }}</strong
                    >
                    <strong
                      v-if="
                        match.match.status.toUpperCase() === 'NS' ||
                        match.match.status.toUpperCase() === 'NOT STARTED'
                      "
                      class="is-wc"
                      >{{
                        moment(match.match.date)
                          .local()
                          .locale(langSelected.toLowerCase())
                          .calendar()
                      }}</strong
                    >
                    <strong class="has-text-yellow pointer">{{
                      match.match.stadium && match.match.stadium.name
                        ? match.match.stadium.name
                        : ""
                    }}</strong>
                  </div>
                </div>

                <div class>
                  <div class="bullsAndBearsPic">
                    <nuxt-link
                      :to="
                        '/teams/' +
                        match.match.homeTeamId.shortName.toLowerCase()
                      "
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
                      <strong
                        class="teamNameStrong pointer"
                        v-if="match.match.homeTeamId.name"
                        >{{ match.match.homeTeamId.name }}</strong
                      >
                      <strong class="teamNameStrong" v-else>{{
                        match.match.homeTeamId.shortName
                      }}</strong>
                    </nuxt-link>
                  </div>

                  <span class="bullsAndBearsPicVs">
                    <b-tag
                      v-if="
                        match.match.status.toUpperCase() === 'NOT STARTED' ||
                        match.match.status.toUpperCase() === 'NS' ||
                        match.match.status.toUpperCase() === 'TBA'
                      "
                      class="is-greyLit"
                      >-</b-tag
                    >
                    <b-tag
                      v-else
                      :class="{
                        'is-green':
                          match.match.goalsHomeTeam > match.match.goalsAwayTeam,
                        'is-red':
                          match.match.goalsHomeTeam < match.match.goalsAwayTeam,
                        'is-blueInfo':
                          match.match.goalsHomeTeam ===
                          match.match.goalsAwayTeam,
                      }"
                      size="is-large"
                      >{{ match.match.goalsHomeTeam }}</b-tag
                    >
                    <div>
                      <b-tooltip
                        :label="
                          match.match.homeTeamName +
                          ' VS ' +
                          match.match.awayTeamName
                        "
                        position="is-bottom"
                        class="bullsAndBearsPicVsLogo versusFigure1"
                        type="is-info"
                        size="is-large"
                      >
                        <img
                          class="vs pointer"
                          src="~assets/images/versus.png"
                          alt="versus"
                        />
                      </b-tooltip>
                    </div>
                    <b-tag
                      v-if="
                        match.match.status.toUpperCase() === 'NOT STARTED' ||
                        match.match.status.toUpperCase() === 'NS' ||
                        match.match.status.toUpperCase() === 'TBA'
                      "
                      class="is-greyLit"
                      >-</b-tag
                    >
                    <b-tag
                      v-else
                      :class="{
                        'is-green':
                          match.match.goalsHomeTeam < match.match.goalsAwayTeam,
                        'is-red':
                          match.match.goalsHomeTeam > match.match.goalsAwayTeam,
                        'is-blueInfo':
                          match.match.goalsHomeTeam ===
                          match.match.goalsAwayTeam,
                      }"
                      size="is-large"
                      >{{ match.match.goalsAwayTeam }}</b-tag
                    >
                  </span>

                  <div class="bullsAndBearsPic">
                    <nuxt-link
                      :to="
                        '/teams/' +
                        match.match.awayTeamId.shortName.toLowerCase()
                      "
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
                      <strong
                        class="teamNameStrong pointer"
                        v-if="match.match.awayTeamId.name"
                        >{{ match.match.awayTeamId.name }}</strong
                      >
                      <strong class="teamNameStrong" v-else>{{
                        match.match.awayTeamId.shortName
                      }}</strong>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="level-item has-text-centered resultContest">
              <div
                class="pointer justifyCenterWidth mesPoints"
                v-if="
                  match.match.status.toUpperCase() != 'NS' &&
                  match.match.status.toUpperCase() != 'TBA' &&
                  !match
                "
              >
                <img
                  loading="lazy"
                  class="oops"
                  src="~assets/images/oops.png"
                  alt="oops"
                />
              </div>
              <div class="justifyCenterWidth" v-else>
                <div
                  v-if="match && match.status === 'active'"
                  class="pointer bet"
                >
                  <div class="scoreProno justifyCenterWidth">
                    <b-tag
                      :class="{
                        'is-green': match.scoreTeam1 > match.scoreTeam2,
                        'is-red': match.scoreTeam1 < match.scoreTeam2,
                        'is-blueInfo': match.scoreTeam1 == match.scoreTeam2,
                      }"
                      size="is-large"
                      >{{ match.scoreTeam1 }}</b-tag
                    >
                    <strong class="separatorScore">-</strong>
                    <b-tag
                      :class="{
                        'is-green': match.scoreTeam1 < match.scoreTeam2,
                        'is-red': match.scoreTeam1 > match.scoreTeam2,
                        'is-blueInfo': match.scoreTeam1 == match.scoreTeam2,
                      }"
                      size="is-large"
                      >{{ match.scoreTeam2 }}</b-tag
                    >
                  </div>
                </div>
                <div
                  class="pointsContest justifyCenterWidth"
                  v-else-if="match && match.status != 'active'"
                >
                  <div v-if="match.bonus != true" class="scoreProno">
                    <b-tag class="is-greyLit" size="is-medium">{{
                      match.scoreTeam1
                    }}</b-tag>
                    <strong class="separatorScore">-</strong>
                    <b-tag class="is-greyLit" size="is-medium">{{
                      match.scoreTeam2
                    }}</b-tag>
                  </div>
                  <div class="leftImg" v-else>
                    <b-tooltip
                      :label="`${
                        langSelected === 'EN'
                          ? '👏👏👏 Right pick!'
                          : '👏👏👏 Bon score !'
                      }`"
                      position="is-right"
                      class
                      type="is-info"
                      size="is-large"
                    >
                      <img
                        loading="lazy"
                        class="oops"
                        src="~assets/images/bonus-final.png"
                        alt="bonus"
                      />
                    </b-tooltip>
                  </div>
                  <strong class="has-text-contest pointer mesPoints"
                    >{{ match.performancePoints.toFixed(2) }} pts</strong
                  >

                  <div v-if="match.bettingPointsWon" class="pointsContest">
                    <div class="miseResult">
                      <img
                        loading="lazy"
                        class="miseLogo"
                        src="~assets/images/miseLogo.png"
                        alt="mise"
                      />
                      <span
                        v-if="match.bettingPointsWon > 0"
                        class="miseDet is-bold"
                      >
                        <strong class="is-bold has-text-success"
                          >{{
                            Math.abs(match.bettingPointsWon).toFixed(2)
                          }}
                          pts</strong
                        >
                        <span class="is-italic has-text-primary"
                          >{{ langSelected === "EN" ? "bet" : "misé" }}
                          {{ Math.abs(match.bettingPoints).toFixed(2) }}
                          pts</span
                        >
                      </span>
                      <span
                        v-if="match.bettingPointsWon < 0"
                        class="miseDet is-bold"
                      >
                        <strong class="is-bold has-text-danger"
                          >{{
                            Math.abs(match.bettingPointsWon).toFixed(2)
                          }}
                          pts</strong
                        >
                        <span class="is-italic has-text-primary"
                          >{{ langSelected === "EN" ? "bet" : "misé" }}
                          {{ Math.abs(match.bettingPoints).toFixed(2) }}
                          pts</span
                        >
                      </span>
                    </div>
                  </div>
                </div>
                <div v-else class="button is-large buttonBet" type="button">
                  {{ langSelected === "EN" ? "My pick" : "mon prono" }}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button buttonBetModal" @click="closeResult()">
        {{ langSelected === "EN" ? "close" : "fermer" }}
      </button>
    </footer>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: { matchList: Array, insider: "", isLoadingresult: true },
  methods: {
    closeResult() {
      this.$emit("closeInsiderResult");
    },
    moment: function (time) {
      return moment(time);
    },
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
  },
};
</script>

<style scoped>
.notStart {
  font-size: 1.2rem;
}
.matchProno {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  flex-direction: column;
}

.matchProno > div {
  display: flex;
}

.penSeance {
  display: flex;
  justify-content: center;
}

.pronoPlayer {
  display: flex;
  margin-top: 0px;
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

.modalBetWrapper {
  display: flex;
  flex-direction: column;
}

.modalTitleBet {
  text-align: center;
  margin-bottom: 2rem;
}

.modalTitleBetH1 {
  font-size: 2rem;
}

.BBull {
  display: flex;
  flex-direction: column;
}

.teamNameGame {
  font-size: 1rem !important;
  color: #192b41;
  text-align: center;
  align-self: center;
}

.has-text-green {
  font-weight: bold;
}

.has-text-red {
  font-weight: bold;
}

h1 {
  padding-top: 1rem;
}

.has-text-yellow {
  color: #ffcf00 !important;
}

div {
  font-size: 1.2rem !important;
}

h1 {
  font-size: 1.2rem !important;
}

img {
  max-height: 64px !important;
}

.separatorScoreResult {
  margin: 0px 3px;
  font-size: 2.25rem;
}

.logoNameDesk {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.mesPoints {
  display: flex;
  font-size: 2rem !important;
  margin-left: 15px;
  align-items: center;
}
.mesPoints > div {
  display: flex;
  align-items: center;
}
.leftImg {
  display: flex;
  align-items: center;
}
.teamPercentage {
  font-size: 2rem;
}

.buttonBetModal {
  padding-left: 30px;
  padding-right: 30px;
  font-weight: bolder;
  color: #fff;
  background-color: #ff7d00;
  box-shadow: 0 0 0 0.125em #ff7d00;
  border-color: #ff7d00;
  font-size: 1.2rem !important;
}

.buttonBetModal:focus,
.buttonBetModal:hover {
  background-color: #fff !important;
  border-color: #ff7d00 !important;
  color: #ff7d00 !important;
}

.buttonBet {
  padding-left: 30px;
  padding-right: 30px;
  font-weight: bolder;
  color: #fff;
  background-color: #ff7d00;
  box-shadow: 0 0 0 0.125em #ff7d00;
  border-color: #ff7d00;
  font-size: 1.2rem !important;
}

.buttonBet:focus,
.buttonBet:hover {
  background-color: #fff !important;
  border-color: #ff7d00 !important;
  color: #ff7d00 !important;
}

.betButton {
  align-self: center;
}

.BBull {
  display: flex;
  flex-direction: column;
}

.teamNameGame {
  font-size: 1rem !important;
  color: #192b41;
  text-align: center;
  align-self: center;
}

.has-text-blue {
  font-weight: bold;
}

.oops {
  width: 90px !important;
  align-self: center;
}

.buttonBet {
  font-size: 1rem !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #eef1f7 !important;
  background-color: #ff7d00 !important;
}

.buttonBet:focus,
.buttonBet:hover {
  color: #ff7d00 !important;
  box-shadow: 0 0 0 0.125em #eef1f7 !important;
  border-color: #ff7d00 !important;
  background-color: #eef1f7 !important;
}

h1 {
  padding-top: 1rem;
}

div {
  font-size: 1.2rem !important;
}

h1 {
  font-size: 1.2rem !important;
}

img {
  max-height: 64px !important;
}

.teamShirtModal {
  height: 8rem !important;
  max-height: 8rem !important;
  width: auto !important;
  align-self: center;
  padding: 0.5rem;
}

.scoreProno {
  display: flex;
  justify-content: CENTER;
  margin-bottom: 0px;
}

.separatorScore {
  margin: 0px 3px;
  font-size: 1rem;
  align-self: center;
}

.box {
  padding: 0.75rem;
}

.countdown > div > strong {
  font-size: 0.9rem;
}

.bandB {
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0rem;
}

.logoligue {
  width: auto !important;
  height: 40px !important;
  margin-right: 5px;
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
  font-size: 1rem !important;
}

.timer > strong {
  align-self: flex-end;
}

.countdown {
  margin-bottom: 5px;
}

.teamShirt {
  height: 65px !important;
  width: auto !important;
  margin: auto;
}

.level-item {
  display: flex;
  justify-content: CENTER;
}

.bullsAndBearsPic {
  justify-content: center;
  display: flex;
  width: 35% !important;
}

.bullsAndBears {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100% !important;
  padding: 5px;
}

#Last {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
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
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
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
  margin: 0;
  margin-left: 0;
  padding: 5px;
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
  width: 40%;
}

.has-text-contest {
  font-weight: bold;
}

.versusFigure1 {
  display: flex !important;
  flex-direction: column !important;
  align-self: center;
}

.voirDetail {
  font-size: 0.6rem;
  text-align: CENTER;
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

h1 {
  padding-top: 1rem;
}

.team {
  min-width: 25%;
}

.vs {
  height: 35px;
  width: auto;
  max-width: 40px;
  align-self: center;
}

.bullsAndBearsPicVs {
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 40%;
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

.navbar.is-wc {
  background-color: #0084a4 !important;
  color: #eef1f7 !important;
  position: relative;
}

.is-wc {
  color: #0084a4 !important;
  font-size: 1rem !important;
  text-align: center !important;
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
  color: white;
  border-radius: 2px;
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
  color: white;
  border-radius: 2px;
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

.miseLogo {
  width: 40px !important;
  margin-right: 5px;
}
.resultContest {
  width: 100%;
}
.miseResult {
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.justifyCenterWidth {
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
}
.pointsContest {
  display: flex;
  justify-content: center;
  font-size: 2rem;
}
.modal-card-body {
  max-height: 65vh;
  padding: 0 !important;
}
.miseDet {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.miseDet > .is-italic {
  font-size: 1rem !important;
}
@media (max-width: 1047px) {
  .miseDet > .is-italic {
    font-size: 0.8rem !important;
  }
  .miseDet > .is-bold {
    font-size: 1rem !important;
  }

  .mesPoints {
    margin-left: 10px;
    font-size: 1.5rem !important;
  }
  .scoreProno {
    margin-bottom: 0px;
  }
  .mesPoints > div {
    padding-bottom: 0px;
  }
  .miseResult {
    margin-left: 10px;
  }
  .miseLogo {
    width: 30px !important;
    margin-right: 5px;
  }

  .teamShirt {
    height: 40px !important;
    width: auto !important;
    margin: auto;
  }

  .timer {
    font-size: 0.8rem !important;
  }
  .modalTitleBetH1 {
    font-size: 1.5rem;
  }

  .modalTitleBet {
    margin-bottom: 0rem;
  }

  .separatorScoreResult {
    margin: 0px 3px;
    font-size: 1rem;
  }

  .has-text-green {
    font-weight: bold;
    font-size: 0.7rem !important;
  }

  .has-text-red {
    font-weight: bold;
    font-size: 0.7rem !important;
  }

  .BBull {
    width: 100%;
    padding-top: 0.7rem;
  }

  img {
    max-height: 42px !important;
  }

  .goalsaway > img {
    max-height: 16px !important;
  }

  .goalshome > img {
    max-height: 16px !important;
  }

  div {
    font-size: 0.8rem !important;
  }

  .desktopOnly {
    display: none !important;
  }

  .teamPercentage {
    font-size: 1.7rem;
  }

  .mobileOnly {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .journee {
    margin-bottom: 5px;
  }

  .NextMatchWrapper:before {
    margin-right: 0 !important;
    padding-right: 0em !important;
    width: 0% !important;
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
    font-size: 0.8rem !important;
  }

  .matchProno {
    width: 100% !important;
    justify-content: space-around !important;
  }

  .separatorScoreResult {
    margin: 0px 3px;
    font-size: 1rem;
  }

  .is-large {
    font-size: 1rem !important;
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

  .teamNameLogo {
    justify-content: center;
  }

  .teamNameLogo > img {
    max-height: 40px !important;
    height: 40px !important;
    width: auto;
    margin: 0px;
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

  .has-text-centered {
    font-size: 0.8rem !important;
  }

  .button .icon.is-small {
    height: 1.5em !important;
    width: 1.5em !important;
  }

  .navbar.is-dark {
    margin-bottom: 3% !important;
  }

  .teamShirtModal {
    height: 6rem;
    width: auto;
    padding: 0rem;
  }

  .BBull {
    width: 100%;
    padding-top: 0.7rem;
  }

  .buttonBetModal {
    font-size: 1.2rem !important;
  }

  .buttonBet {
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 0.9rem !important;
  }

  .nameClub {
    align-self: center;
    padding: 0px 5px;
  }

  img {
    max-height: 42px !important;
  }

  div {
    font-size: 0.8rem !important;
  }

  .bet {
    display: flex;
    justify-content: center;
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