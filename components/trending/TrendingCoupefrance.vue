<template>
  <section class="trendingWrapper">
    <nav class="navbar is-wc">
      <div>
        <div class="babblesMenu">
          <a
            @click="phaseFinale()"
            :class="{ 'is-active': index2Selected === 'phaseFinale' }"
            class="babMenu navbar-item is-tab"
            >{{ langSelected === "EN" ? "Matchs" : "Matchs" }}</a
          >

          <a
            @click="goal()"
            :class="{ 'is-active': index2Selected === 'goal' }"
            class="babMenu navbar-item is-tab"
            >{{ langSelected === "EN" ? "Scorers" : "Buteurs" }}</a
          >
          <a
            @click="assist()"
            :class="{ 'is-active': index2Selected === 'assist' }"
            class="babMenu navbar-item is-tab"
            >{{ langSelected === "EN" ? "Assists" : "Passeurs" }}</a
          >
          <a
            @click="card()"
            :class="{ 'is-active': index2Selected === 'card' }"
            class="babMenu navbar-item is-tab"
            >{{ langSelected === "EN" ? "Cards" : "Cartons" }}</a
          >
        </div>
      </div>
    </nav>
    <b-loading
      :is-full-page="false"
      :active.sync="isLoading"
      :canCancel="false"
    ></b-loading>
    <div
      class="swiper-container"
      v-swiper:myDirectiveSwiper="swiperOptions"
      @slide-next-transition-start="slideNextTransitionStart"
      @slide-prev-transition-start="slidePrevTransitionStart"
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div>
            <div class="matchlist" v-if="index2Selected === 'phaseFinale'">
              <trending-championnat-result
                v-if="isLoading == false"
                @result="result($event)"
                @seeLineup="seeLineup($event)"
                @seeStadium="seeStadium($event)"
                @changeDayChamp="changeDayChamp($event)"
                :resultDay="resultDay"
              ></trending-championnat-result>
            </div>

            <div class="matchlist" v-else-if="index2Selected === 'goal'">
              <buteurs-WC
                :goals="goals"
                :champSelected="champSelected"
                :langSelected="langSelected"
                :connectedUser="connectedUser"
              ></buteurs-WC>
            </div>

            <div class="matchlist" v-else-if="index2Selected === 'assist'">
              <passeurs-WC
                :assists="assists"
                :champSelected="champSelected"
                :langSelected="langSelected"
                :connectedUser="connectedUser"
              ></passeurs-WC>
            </div>

            <div class="matchlist" v-else-if="index2Selected === 'card'">
              <cards-WC
                :cards="cards"
                :champSelected="champSelected"
                :langSelected="langSelected"
                :connectedUser="connectedUser"
              ></cards-WC>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="resultatForModal">
      <b-modal :active.sync="resultatModal">
        <resultat-modal
          class="modalResultLineup"
          :lineUp="lineUp"
          :resultat="resultatForModal"
        ></resultat-modal>
      </b-modal>
    </div>
    <b-modal :active.sync="stadiumModal">
      <stadium-modal :stadium="stadium"></stadium-modal>
    </b-modal>
  </section>
</template>

<script>
import { getCompet, getResultCupDay } from "@/server/apiTrending";
import moment from "moment";
export default {
  auth: false,
  components: {
    TrendingChampionnatResult: () =>
      import("@/components/trending/Championnat/TrendingChampionnatResult"),
    resultatModal: () => import("@/components/modal/resultatModal"),
    stadiumModal: () => import("@/components/modal/stadiumModal"),
    ButeursWC: () => import("@/components/trending/WC/ButeursWC"),
    PasseursWC: () => import("@/components/trending/WC/PasseursWC"),
    CardsWC: () => import("@/components/trending/WC/CardsWC"),
  },
  data() {
    return {
      lineUp: "",
      resultatForModal: "",
      stadium: "",
      stadiumModal: false,
      resultDay: [],
      index2Selected: "",
      total: 0,
      loading: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 7,
      perPage: 4,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      groups: [],
      matchLists: [],
      phaseFinaleMatch: [],
      compet: "",
      resultatModal: false,
      resultat: "",
      goals: [],
      assists: [],
      cards: [],
      isLoading: false,
      currentStage: "",
      stageArray: [
        "8th Finals",
        "16th Finals",
        "32nd FInals",
        "Quarter-finals",
        "Semi-finals",
        "Final",
      ],
      swiperOptions: {
        threshold: 15,
        followFinger: false,
        loop: true,
        slidesPerView: "auto",
        loopedSlides: 1,
        centeredSlides: true,
        touchEventsTarget: "container",
        longSwipes: true,
        shortSwipes: true,
        iOSEdgeSwipethreshold: 15,
        spaceBetween: 20,
      },
    };
  },
  props: {},
  computed: {
    champSelected() {
      return this.$store.state.var.champSelected;
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    seeLineup(event) {
      this.resultatForModal = "";
      this.resultatForModal = event;
      this.lineUp = true;
      this.resultatModal = true;
    },
    result(event) {
      this.resultatForModal = "";
      this.lineUp = false;
      this.resultatForModal = event;
      this.resultatModal = true;
    },
    seeStadium(event) {
      this.stadium = event;
      this.stadiumModal = true;
    },
    changeDayChamp(event) {
      this.loading = true;
      this.index2Selected = "phaseFinale";
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
      this.swiperOptions.longSwipes = false;
      getResultCupDay(this.champSelected, event).then((resultDay) => {
        if (resultDay) {
          this.resultDay = resultDay;
        }

        this.loading = false;
      });
    },
    phaseFinale() {
      this.index2Selected = "phaseFinale";
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
      this.swiperOptions.longSwipes = false;
      getResultCupDay(this.champSelected, "").then((resultDay) => {
        if (resultDay) {
          this.resultDay = resultDay;
        }
        this.loading = false;
      });
    },
    slideNextTransitionStart() {
      if (this.index2Selected == "phaseFinale") {
        this.swiperOptions.threshold = 10;
        this.goal();
      } else if (this.index2Selected == "goal") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.assist();
      } else if (this.index2Selected == "assist") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.card();
      } else if (this.index2Selected == "card") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.phaseFinale();
      } else if (this.index2Selected == "groupe") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.goal();
      }
    },

    slidePrevTransitionStart() {
      if (this.index2Selected == "phaseFinale") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.card();
      } else if (this.index2Selected == "goal") {
        this.swiperOptions.threshold = 10;
        this.phaseFinale();
      } else if (this.index2Selected == "assist") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.goal();
      } else if (this.index2Selected == "card") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.assist();
      } else if (this.index2Selected == "groupe") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.phaseFinale();
      }
    },

    moment: function (time) {
      return moment(time);
    },
    SignupModal() {
      this.$router.push("/signup");
    },
    LoginModal(autenticate) {
      this.$router.push("/login");
    },

    goal() {
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
      this.index2Selected = "goal";
      this.goals = this.compet.goalRanking;
    },
    assist() {
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
      this.index2Selected = "assist";
      this.assists = this.compet.assistRanking;
    },
    card() {
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
      this.index2Selected = "card";
      this.cards = this.compet.cardRanking;
    },
    selected(champSelected) {
      this.swiperOptions.threshold = 10;
      this.index2Selected = "groupe";
      this.loading = true;
      this.defaultSortField = "points";
      this.perPage = 4;
      this.isPaginated = false;

      this.loading = false;
    },

    phaseFinale() {
      this.index2Selected = "phaseFinale";
      this.isPaginated = false;
      this.perPage = 100;
      this.paginationSimple = false;
      this.defaultSortField = "date";
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
  },

  head() {
    return {
      title:
        "Ligue des Champions, Ligue 1, Premier League, Liga, Serie A, Bundesliga...tout le football",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Retrouvez les classements de tous les championnats europeens, ligue des champions, coupe du monde...",
        },
      ],
    };
  },
  mounted() {
    this.isLoading = true;
    this.index2Selected = "phaseFinale";
    this.swiperOptions.threshold = 10;
    this.swiperOptions.iOSEdgeSwipeThreshold = 10;
    this.swiperOptions.shortSwipes = true;

    getResultCupDay(this.champSelected, "").then((resultDay) => {
      if (resultDay) {
        this.resultDay = resultDay;
      }
      this.isLoading = false;
      if (!resultDay || resultDay.length == 0) {
        this.index2Selected = "groupe";
        this.defaultSortField = "position";
        this.defaultSortOrder = "asc";
        this.defaultSortDirection = "asc";
      }
    });
    getCompet(this.champSelected).then((compet) => {
      this.compet = compet;
      this.currentStage = compet.currentMatchday;
      this.isPaginated = false;
      this.perPage = 100;
      this.paginationSimple = false;
      this.defaultSortField = "date";
      this.isLoading = false;
      this.cards = this.compet.cardRanking;
      this.assists = this.compet.assistRanking;
      this.goals = this.compet.goalRanking;
    });
  },
  watch: {
    champSelected: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        this.isLoading = true;
        this.index2Selected = "phaseFinale";
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.resultDay = [];
        this.compet = "";
        getResultCupDay(this.champSelected, "").then((resultDay) => {
          this.resultDay = resultDay;

          this.isLoading = false;
          if (!resultDay || resultDay.length == 0) {
            this.resultDay = [];
          }
        });
        getCompet(this.champSelected).then((compet) => {
          this.compet = compet;
          this.currentStage = compet.currentMatchday;
          this.isPaginated = false;
          this.perPage = 100;
          this.paginationSimple = false;
          this.defaultSortField = "date";
          this.isLoading = false;
          this.cards = this.compet.cardRanking;
          this.assists = this.compet.assistRanking;
          this.goals = this.compet.goalRanking;
        });
      },
    },

    ////do your stuff
  },
};
</script>



<style scoped>
.navDay {
  min-width: 15%;
  color: grey !important;
}
.navDay > .babMenu {
  min-width: 15%;
  color: grey !important;
}
.dayChampion {
  align-items: center;
  display: flex;
  justify-content: center;
}
.dayChampion > strong {
  margin: auto;
  margin-left: 5px;
}
.dayChampion > img {
  height: 64px !important;
  margin: 0px;
  align-self: CENTER;
}
.classementPoint {
  padding: 0px !important;
}

.dateNav {
  margin: auto;
  font-weight: bold;
  font-size: 1.4rem;
  color: #192b41;
}
.dateStadium {
  width: 20%;
}
.babMenu {
  font-size: 1.2rem;
  color: lightgrey !important;
}

.tirsAuBut {
  align-self: center;
}
.teamNameLogo {
  width: 30%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.teamNameLogo > .logoClub {
  display: flex;
  justify-content: center;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
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

.team {
  min-width: 25%;
}

.vs {
  height: 48px !important;
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
.is-wc {
  color: #0084a4 !important;
}
.b-table {
  border: solid;
  border-color: #0084a4 !important;
  margin: 0.5rem !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  border-radius: 5px;
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
  padding-top: 0.5rem;
  font-size: 1.2rem !important;
}
img {
  max-height: 64px !important;
  width: 45px;
  margin: auto;
}
.teamName {
  font-size: 1.2rem !important;
  vertical-align: middle !important;
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
.logo {
  vertical-align: middle !important;
}
.mobileNav {
  display: none;
}
.desktopNav {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.logoligue {
  width: 64px;
}
.mobileOnly {
  display: none;
}
.cardRefer {
  width: auto !important;
}
.logoTd {
  min-width: 35px !important;
  padding: 0px !important;
}
@media (max-width: 769px) {
  .fa-arrow-circle-left {
    font-size: 2rem;
  }
  .fa-arrow-circle-right {
    font-size: 2rem;
  }
  .desktopNav {
    display: none;
  }
  .mobileNav {
    display: flex;
    justify-content: space-between;
    min-height: 3.25rem;
  }
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
    max-width: 55%;
  }
  .mobileOnly > strong {
    text-align: right;
  }
  .NextMatchWrapper:before {
    margin-right: 0 !important;
    padding-right: 0em !important;
    width: 0% !important;
  }
  .NextMatchWrapper {
    width: 95% !important;
  }
  .NextMatchWrapper > span {
    width: 100% !important;
  }
  .logoligue {
    width: auto;
    height: 35px;
  }
  .babMenu {
    font-size: 0.9rem;
  }
  .navbar-item.is-tab.is-active {
    font-size: 0.9rem;
  }

  .pointer1 {
    cursor: pointer;
    font-size: 0.7rem !important;
    font-style: italic !important;
    color: #192b41 !important;
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
    font-size: 1rem !important;
  }
  .is-greyLit {
    font-size: 1rem !important;
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
    width: 42px;
  }
  .teamNameLogo > img {
    max-height: 35px !important;
    height: 35px !important;
    width: auto !important;
    margin: auto;
  }
  .logo {
    min-width: 105px !important;
  }
  .logoClub {
    max-height: 30px !important;
    height: auto !important;
    width: auto !important;
    max-width: auto !important;
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
  .teamName {
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