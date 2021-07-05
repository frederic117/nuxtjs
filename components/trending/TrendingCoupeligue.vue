<template>
  <section class="trendingWrapper">
    <div class="matchlist">
      <nav class="navbar">
        <div class="babblesMenu desktopNav">
          <div class="navDay">
            <a
              v-if="currentStage != '1st Round'"
              @click="prevDay()"
              class="is-hovered babMenu navbar-item is-tab"
              >Tour précédent</a
            >
          </div>
          <p class="dateNav">{{ currentStage }}</p>
          <div class="navDay">
            <a
              v-if="currentStage != 'Final'"
              @click="nextDay()"
              class="is-hovered babMenu navbar-item is-tab"
              >Tour suivant</a
            >
          </div>
        </div>
        <div class="babblesMenu mobileNav">
          <div class="navDay">
            <a
              v-if="currentStage != '1st Round'"
              @click="prevDay()"
              class="is-hovered babMenu navbar-item is-tab"
            >
              <i class="fa fa-arrow-circle-left navDay"></i>
            </a>
          </div>
          <p class="dateNav">{{ currentStage }}</p>
          <div class="navDay">
            <a
              v-if="currentStage != 'Final'"
              @click="nextDay()"
              class="is-hovered babMenu navbar-item is-tab"
            >
              <i class="fa fa-arrow-circle-right navDay"></i>
            </a>
          </div>
        </div>
      </nav>
      <div>
        <b-table
          class="NextMatchTable"
          :data="phaseFinaleMatch"
          :loading="loading"
          :paginated="isPaginated"
          :per-page="perPage"
          :pagination-simple="isPaginationSimple"
          :total="total"
          :mobile-cards="true"
          :striped="true"
          :default-sort-direction="defaultSortOrder"
          :default-sort="defaultSortField"
        >
          <template slot-scope="props">
            <b-table-column class="NextMatchWrapper dateStadium" centered>
              <div class="journee">
                <figure
                  @click="ligue(props.row.codeCompetitionApi)"
                  width="80"
                  class="image pointer dayChampion"
                >
                  <img
                    loading="lazy"
                    class="logoligue"
                    src="/logoLigue/310.png"
                    alt="logoLigue"
                  />
                  <strong class="is-wc">{{
                    props.row.info.stage.data.name
                  }}</strong>
                </figure>
                <div class="mobileOnly">
                  <strong
                    v-if="
                      props.row.info.time.status.toUpperCase() === 'AET' ||
                      props.row.info.time.status.toUpperCase() === 'FT_PEN' ||
                      props.row.info.time.status.toUpperCase() === 'FT'
                    "
                    class="is-wc"
                    >{{
                      moment(props.row.info.time.starting_at.date_time)
                        .local()
                        .format("DD-MM-YY HH:mm")
                    }}</strong
                  >
                  <strong
                    v-if="
                      props.row.info.time.status.toUpperCase() != 'AET' &&
                      props.row.info.time.status.toUpperCase() != 'FT_PEN' &&
                      props.row.info.time.status.toUpperCase() !=
                        'NOT STARTED' &&
                      props.row.info.time.status.toUpperCase() != 'NS' &&
                      props.row.info.time.status.toUpperCase() != 'TBA' &&
                      props.row.info.time.status.toUpperCase() != 'FT' &&
                      props.row.info.time.status.toUpperCase() != 'POSTP' &&
                      props.row.info.time.status.toUpperCase() != 'CANCL' &&
                      props.row.info.time.status.toUpperCase() != 'DELAYED'
                    "
                    class="is-wc"
                    >{{
                      langSelected === "EN"
                        ? "game in progress"
                        : "match en cours"
                    }}</strong
                  >
                  <strong
                    v-if="props.row.info.time.status.toUpperCase() === 'TBA'"
                    class="is-wc"
                    >{{
                      moment(props.row.info.time.starting_at.date_time)
                        .local()
                        .format("DD-MM-YY") + " (horaire non fixé)"
                    }}</strong
                  >
                  <strong
                    v-if="
                      props.row.info.time.status.toUpperCase() === 'NS' ||
                      props.row.info.time.status.toUpperCase() === 'NOT STARTED'
                    "
                    class="is-wc"
                    >{{
                      moment(props.row.info.time.starting_at.date_time)
                        .local()
                        .format("DD-MM-YY HH:mm")
                    }}</strong
                  >

                  <strong v-if="props.row.info.venue" class="has-text-yellow">{{
                    props.row.info.venue.data.name
                  }}</strong>
                </div>
              </div>
            </b-table-column>
            <b-table-column class="NextMatchWrapper" centered>
              <div
                v-if="props.row.homeTeam && props.row.awayTeam"
                class="matchProno"
              >
                <div v-if="props.row.homeTeam.shortName" class="teamNameLogo">
                  <nuxt-link
                    :to="'/teams/' + props.row.homeTeam.shortName.toLowerCase()"
                    class="pointer logoClub"
                  >
                    <img
                      loading="lazy"
                      class="pointer"
                      :src="props.row.homeTeam.teamImg"
                      :alt="props.row.homeTeam.name"
                      :class="{
                        invertOk: props.row.homeTeam.name
                          .toUpperCase()
                          .includes('JUVE'),
                      }"
                    />
                    <strong
                      v-if="props.row.homeTeam.shortName"
                      class="teamNameStrong pointer"
                      @click="
                        accessTeam(props.row.homeTeam.shortName.toLowerCase())
                      "
                      >{{ props.row.homeTeam.name }}</strong
                    >
                    <strong v-else class="teamNameStrong pointer">{{
                      props.row.homeTeam.name
                    }}</strong>
                  </nuxt-link>
                </div>
                <div v-else class="teamNameLogo">
                  <img
                    loading="lazy"
                    class="pointer"
                    :src="props.row.homeTeam.teamImg"
                    :alt="props.row.homeTeam.name"
                    :class="{
                      invertOk: props.row.homeTeam.name
                        .toUpperCase()
                        .includes('JUVE'),
                    }"
                  />
                  <strong
                    v-if="props.row.homeTeam.shortName"
                    class="teamNameStrong pointer"
                    @click="
                      accessTeam(props.row.homeTeam.shortName.toLowerCase())
                    "
                    >{{ props.row.homeTeam.name }}</strong
                  >
                  <strong v-else class="teamNameStrong pointer">{{
                    props.row.homeTeam.name
                  }}</strong>
                </div>
                <span class="bullsAndBearsPicVs">
                  <b-tag
                    v-if="props.row.info.time.status === 'NS'"
                    class="is-greyLit"
                    >-</b-tag
                  >
                  <b-tag
                    v-else
                    :class="{
                      'is-green':
                        props.row.info.scores.localteam_score >
                        props.row.info.scores.visitorteam_score,
                      'is-red':
                        props.row.info.scores.localteam_score <
                        props.row.info.scores.visitorteam_score,
                      'is-blueInfo':
                        props.row.info.scores.localteam_score ==
                        props.row.info.scores.visitorteam_score,
                    }"
                    size="is-large"
                    >{{ props.row.info.scores.localteam_score }}</b-tag
                  >
                </span>
                <figure @click="result(props.row)" class="versusFigure1">
                  <img
                    loading="lazy"
                    class="vs"
                    src="~assets/images/versus.png"
                    alt="versus"
                  />
                  <span
                    @click="result(props.row)"
                    class="pointer1"
                    v-if="props.row.info.time.status != 'NS'"
                    >{{ langSelected === "EN" ? "details" : "détails" }}</span
                  >
                </figure>
                <span class="bullsAndBearsPicVs">
                  <b-tag
                    v-if="props.row.info.time.status === 'NS'"
                    class="is-greyLit"
                    >-</b-tag
                  >
                  <b-tag
                    v-else
                    :class="{
                      'is-green':
                        props.row.info.scores.localteam_score <
                        props.row.info.scores.visitorteam_score,
                      'is-red':
                        props.row.info.scores.localteam_score >
                        props.row.info.scores.visitorteam_score,
                      'is-blueInfo':
                        props.row.info.scores.localteam_score ==
                        props.row.info.scores.visitorteam_score,
                    }"
                    size="is-large"
                    >{{ props.row.info.scores.visitorteam_score }}</b-tag
                  >
                </span>
                <div v-if="props.row.awayTeam.shortName" class="teamNameLogo">
                  <nuxt-link
                    :to="'/teams/' + props.row.awayTeam.shortName.toLowerCase()"
                    class="pointer logoClub"
                  >
                    <img
                      loading="lazy"
                      class="pointer"
                      :src="props.row.awayTeam.teamImg"
                      :alt="props.row.awayTeam.name"
                      :class="{
                        invertOk: props.row.awayTeam.name
                          .toUpperCase()
                          .includes('JUVE'),
                      }"
                    />
                    <strong
                      v-if="props.row.awayTeam.shortName"
                      class="teamNameStrong pointer"
                      @click="
                        accessTeam(props.row.awayTeam.shortName.toLowerCase())
                      "
                      >{{ props.row.awayTeam.name }}</strong
                    >

                    <strong v-else class="teamNameStrong pointer">{{
                      props.row.awayTeam.name
                    }}</strong>
                  </nuxt-link>
                </div>
                <div v-else class="teamNameLogo">
                  <img
                    loading="lazy"
                    class="pointer"
                    :src="props.row.awayTeam.teamImg"
                    :alt="props.row.awayTeam.name"
                    :class="{
                      invertOk: props.row.awayTeam.name
                        .toUpperCase()
                        .includes('JUVE'),
                    }"
                  />
                  <strong
                    v-if="props.row.awayTeam.shortName"
                    class="teamNameStrong pointer"
                    @click="
                      accessTeam(props.row.awayTeam.shortName.toLowerCase())
                    "
                    >{{ props.row.awayTeam.name }}</strong
                  >

                  <strong v-else class="teamNameStrong pointer">{{
                    props.row.awayTeam.name
                  }}</strong>
                </div>
              </div>
            </b-table-column>
            <b-table-column
              class="NextMatchWrapper dateStadium desktopOnly"
              centered
            >
              <div class="journee">
                <div class>
                  <strong
                    v-if="
                      props.row.info.time.status.toUpperCase() === 'AET' ||
                      props.row.info.time.status.toUpperCase() === 'FT_PEN' ||
                      props.row.info.time.status.toUpperCase() === 'FT'
                    "
                    class="is-wc"
                    >{{
                      moment(props.row.info.time.starting_at.date_time)
                        .local()
                        .format("DD-MM-YY HH:mm")
                    }}</strong
                  >
                  <strong
                    v-if="
                      props.row.info.time.status.toUpperCase() != 'AET' &&
                      props.row.info.time.status.toUpperCase() != 'FT_PEN' &&
                      props.row.info.time.status.toUpperCase() !=
                        'NOT STARTED' &&
                      props.row.info.time.status.toUpperCase() != 'NS' &&
                      props.row.info.time.status.toUpperCase() != 'TBA' &&
                      props.row.info.time.status.toUpperCase() != 'FT' &&
                      props.row.info.time.status.toUpperCase() != 'POSTP' &&
                      props.row.info.time.status.toUpperCase() != 'CANCL' &&
                      props.row.info.time.status.toUpperCase() != 'DELAYED'
                    "
                    class="is-wc"
                    >{{
                      langSelected === "EN"
                        ? "game in progress"
                        : "match en cours"
                    }}</strong
                  >
                  <strong
                    v-if="props.row.info.time.status.toUpperCase() === 'TBA'"
                    class="is-wc"
                    >{{
                      moment(props.row.info.time.starting_at.date_time)
                        .local()
                        .format("DD-MM") + " (horaire non fixé)"
                    }}</strong
                  >
                  <strong
                    v-if="
                      props.row.info.time.status.toUpperCase() === 'NS' ||
                      props.row.info.time.status.toUpperCase() === 'NOT STARTED'
                    "
                    class="is-wc"
                    >{{
                      moment(props.row.info.time.starting_at.date_time)
                        .local()
                        .format("DD-MM-YY HH:mm")
                    }}</strong
                  >
                  <br />
                  <strong v-if="props.row.info.venue" class="has-text-yellow">{{
                    props.row.info.venue.data.name
                  }}</strong>
                </div>
              </div>
            </b-table-column>
            <!-- <b-table-column field='competition' centered label="">
                  <div class="journée">
                      <strong>({{props.row.info.stage.data.name}})</strong>
                       <figure @click="ligue(props.row.codeCompetitionApi)" class="image pointer dayChampion">
                            <img loading="lazy"class ="logoligue" :src="'/logoLigue/'+props.row.codeCompetitionApi+'.png'" alt="logoLigue">
                      </figure>
                  </div>
						</b-table-column>-->
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
                <p v-if="isLoading === true">...loading</p>
                <p v-if="isLoading === false">
                  Les équipes ne sont pas encore connues
                </p>
              </div>
            </section>
          </template>
        </b-table>
      </div>
    </div>

    <b-loading
      :is-full-page="false"
      :active.sync="isLoading"
      :canCancel="false"
    ></b-loading>
    <div v-if="resultat">
      <b-modal :active.sync="resultatModal">
        <resultat-modal
          class="modalResultLineup"
          :resultat="resultat"
        ></resultat-modal>
      </b-modal>
    </div>
  </section>
</template>

<script>
import { getCompet } from "@/server/apiTrending";
import { getMatchList } from "@/server/apiTrending";
import moment from "moment";
export default {
  auth: false,
  components: {
    resultatModal: () => import("@/components/modal/resultatModal"),
  },
  data() {
    return {
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
      phaseFinaleMatch: [],
      compet: "",
      resultatModal: false,
      resultat: "",
      isLoading: false,
      currentStage: "",
      stageArray: [
        "1st Round",
        "16th Finals",
        "8th Finals",
        "Quarter-finals",
        "Semi-finals",
        "Final",
      ],
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
    prevDay() {
      let stageIndex = this.stageArray.indexOf(this.currentStage);
      this.currentStage = this.stageArray[stageIndex - 1];
      let phaseFinaleMatch = this.compet.matchList.filter((gr) => {
        return gr.namePhase === this.currentStage;
      })[0].fixtureOp;
      let phaseFinaleMatchSorted = phaseFinaleMatch.sort(this.sortByDateAsc);
      this.phaseFinaleMatch = phaseFinaleMatchSorted;
    },
    nextDay() {
      let stageIndex = this.stageArray.indexOf(this.currentStage);
      this.currentStage = this.stageArray[stageIndex + 1];
      let phaseFinaleMatch = this.compet.matchList.filter((gr) => {
        return gr.namePhase === this.currentStage;
      })[0].fixtureOp;
      let phaseFinaleMatchSorted = phaseFinaleMatch.sort(this.sortByDateAsc);
      this.phaseFinaleMatch = phaseFinaleMatchSorted;
    },
    accessTeam(event) {
      this.$router.push("/teams/" + event);
    },
    result(resultat) {
      let sortEventAsc = function (a, b) {
        if (a.minute < b.minute) return -1;
        if (a.minute > b.minute) return 1;
        if (a.minute == b.minute && a.extra_minute > b.extra_minute) return 1;
        if (a.minute == b.minute && a.extra_minute < b.extra_minute) return -1;
        return 0;
      };
      let eventSorted = resultat.info.events.data.sort(sortEventAsc);
      this.resultat = resultat;
      resultat.info.events.data = eventSorted;
      this.resultatModal = true;
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
    moment: function (time) {
      return moment(time);
    },
    SignupModal() {
      this.$router.push("/signup");
    },
    LoginModal(autenticate) {
      this.$router.push("/login");
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
    getCompet(this.champSelected).then((compet) => {
      let phaseFinaleMatch = compet.matchList.filter((gr) => {
        return gr.namePhase === compet.currentMatchday;
      })[0].fixtureOp;
      let phaseFinaleMatchSorted = phaseFinaleMatch.sort(this.sortByDateAsc);
      this.compet = compet;
      this.currentStage = compet.currentMatchday;
      this.isPaginated = false;
      this.perPage = 100;
      this.paginationSimple = false;
      this.defaultSortField = "date";
      this.phaseFinaleMatch = phaseFinaleMatchSorted;
      this.isLoading = false;
    });
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
  margin: 0px;
  align-self: CENTER;
  height: 64px !important;
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
.logoClub {
  height: 35px;
  width: auto;
  padding: 5px;
  align-self: center;
  display: flex;
  flex-direction: column;
}
.logoClub > div {
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
  padding-top: 1rem;
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
  font-size: 1.2rem !important;
}
img {
  max-height: 64px !important;
  width: 64px;
  margin: auto;
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

.mobileNav {
  display: none;
}
.desktopNav {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.logoligue {
  width: auto;
}
.mobileOnly {
  display: none;
}
.cardRefer {
  width: auto !important;
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
    max-height: 45px !important;
    height: 45px !important;
    width: auto;
    margin: auto;
  }
  .logoClub {
    max-height: 30px !important;
    height: 30px !important;
    padding: 0px;
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
