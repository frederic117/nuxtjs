<template>
  <section>
    <div class="card matchlist">
      <b-table
        class="NextMatchTable"
        :data="resultat"
        :loading="loading"
        :paginated="isPaginated"
        :per-page="perPage"
        :pagination-simple="isPaginationSimple"
        :total="total"
        :mobile-cards="true"
        :striped="true"
      >
        <template slot-scope="props">
          <b-table-column class="NextMatchWrapper sideTab" centered>
            <div class="journee">
              <figure
                @click="ligue(props.row.league_id)"
                width="80"
                class="image pointer dayChampion"
              >
                <img
                  v-if="
                    props.row.league_id != 1326 && props.row.league_id != 732
                  "
                  :class="{
                    invertOk:
                      Number(props.row.league_id) == 2 ||
                      Number(props.row.league_id) == 5,
                  }"
                  loading="lazy"
                  class="logoligue"
                  :src="'/logoLigue/' + props.row.league_id + '.png'"
                  alt="logoLigue"
                />
                <strong v-else class="is-wc">{{
                  props.row.league_id == 1326 ? "Euro" : "World Cup"
                }}</strong>

                <!--   <span v-if="props.row.matchday==='8th Finals'" class="journéeSpan ">
                                 <strong v-if="langSelected==='EN'">8<sup>th</sup> round</strong>
                                 <strong v-else>8<sup>ème</sup> de finale</strong></span>
                                 <span
                            v-else-if="props.row.matchday === '16th Finals'"
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
                            v-else-if="props.row.matchday === '32nd Finals'"
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
                                <span  v-else-if="props.row.matchday==='Quarter-finals'" class="journéeSpan ">
                                 <strong>{{langSelected==='EN'? 'Quarter final':"Quart de finale"}}</strong>
                                </span>
                                <span  v-else-if="props.row.matchday==='Semi-finals' " class="journéeSpan ">
                                 <strong>{{langSelected==='EN'? 'Semi final':"Demi-finale"}}</strong>
                                </span>
                                <span  v-else-if="props.row.matchday==='bronze'" class="journéeSpan ">
                                  <strong v-if="langSelected==='EN'">match for 3<sup>rd</sup> place</strong>
                                  <strong v-else>match pour la 3<sup>ème</sup> place</strong>
                                </span>
                                <span  v-else-if="props.row.matchday==='Final'" class="journéeSpan ">
                                 <strong>{{langSelected==='EN'? 'Final':"Finale"}}</strong>
                                </span>
                                <span v-else-if="langSelected==='EN'" class="journéeSpan ">
                                    <strong v-if="props.row.matchday=='1' || props.row.matchday=='21' || props.row.matchday=='31'">{{props.row.matchday}} <sup>st</sup> day</strong>
                                    <strong v-else-if="props.row.matchday=='2' || props.row.matchday=='22' || props.row.matchday=='32'">{{props.row.matchday}} <sup>nd</sup> day</strong>
                                    <strong v-else-if="props.row.matchday=='3' || props.row.matchday=='23' || props.row.matchday=='33'">{{props.row.matchday}} <sup>rd</sup> day</strong>
                                    <strong v-else>{{props.row.matchday}} <sup>th</sup> day</strong>
                                </span>
                                <span v-else-if="langSelected==='FR'" class="journéeSpan ">
                                    <strong v-if="props.row.matchday=='1'">{{props.row.matchday}} <sup>ère</sup> journée</strong>
                                    <strong v-else>{{props.row.matchday}} <sup>ème</sup> journée</strong>
								</span>-->
              </figure>
              <div class="mobileOnly">
                <strong
                  v-if="
                    props.row.time.status.toUpperCase() === 'AET' ||
                    props.row.time.status.toUpperCase() === 'FT_PEN' ||
                    props.row.time.status.toUpperCase() != 'EAT' ||
                    props.row.time.status.toUpperCase() === 'FT'
                  "
                  class="is-wc"
                  >{{
                    moment(props.row.time.starting_at.date_time)
                      .local()
                      .locale(langSelected.toLowerCase())
                      .calendar()
                  }}</strong
                >

                <strong
                  v-if="
                    props.row.time.status.toUpperCase() != 'AET' &&
                    props.row.time.status.toUpperCase() != 'FT_PEN' &&
                    props.row.time.status.toUpperCase() != 'NOT STARTED' &&
                    props.row.time.status.toUpperCase() != 'NS' &&
                    props.row.time.status.toUpperCase() != 'TBA' &&
                    props.row.time.status.toUpperCase() != 'FT' &&
                    props.row.time.status.toUpperCase() != 'POSTP' &&
                    props.row.time.status.toUpperCase() != 'CANCL' &&
                    props.row.time.status.toUpperCase() != 'DELAYED'
                  "
                  class="is-wc"
                  >{{
                    langSelected === "EN"
                      ? "game in progress"
                      : "match en cours"
                  }}</strong
                >
                <strong
                  v-if="props.row.time.status.toUpperCase() === 'TBA'"
                  class="is-wc"
                  >{{
                    moment(props.row.time.starting_at.date_time)
                      .local()
                      .locale(langSelected.toLowerCase())
                      .calendar()
                  }}</strong
                >
                <strong
                  v-if="
                    props.row.time.status.toUpperCase() === 'NS' ||
                    props.row.time.status.toUpperCase() === 'NOT STARTED'
                  "
                  class="is-wc"
                  >{{
                    moment(props.row.time.starting_at.date_time)
                      .local()
                      .locale(langSelected.toLowerCase())
                      .calendar()
                  }}</strong
                >
                <!--  <br><strong class='is-wc'>{{props.row.stadium&&props.row.stadium.name?props.row.stadium.name:""}}</strong> -->
              </div>
            </div>
          </b-table-column>

          <b-table-column class="NextMatchWrapper" centered>
            <div class="matchProno">
              <div class="teamNameLogo logoClub">
                <img
                  class="pointer"
                  :src="props.row.localTeam.data.logo_path"
                  :alt="props.row.localTeam.data.name"
                  :class="{
                    invertOk: props.row.localTeam.data.name
                      .toUpperCase()
                      .includes('JUVE'),
                  }"
                />
                <strong class="teamNameStrong pointer">{{
                  props.row.localTeam.data.name
                }}</strong>
              </div>
              <div class="marginAuto">
                <div class="displayFlex">
                  <span class="bullsAndBearsPicVs">
                    <b-tag
                      v-if="
                        props.row.time.status.toUpperCase() === 'NOT STARTED' ||
                        props.row.time.status.toUpperCase() === 'NS' ||
                        props.row.time.status.toUpperCase() === 'TBA'
                      "
                      class="is-greyLit"
                      >-</b-tag
                    >
                    <b-tag
                      v-else
                      :class="{
                        'is-green':
                          props.row.scores.localteam_score >
                          props.row.scores.visitorteam_score,
                        'is-red':
                          props.row.scores.localteam_score <
                          props.row.scores.visitorteam_score,
                        'is-blueInfo':
                          props.row.scores.localteam_score ===
                          props.row.scores.visitorteam_score,
                      }"
                      size="is-large"
                      >{{ props.row.scores.localteam_score }}</b-tag
                    >
                  </span>
                  <figure class="versusFigure1">
                    <img
                      loading="lazy"
                      class="vs"
                      src="~assets/images/versus.png"
                      alt="versus"
                    />
                  </figure>
                  <span class="bullsAndBearsPicVs">
                    <b-tag
                      v-if="
                        props.row.time.status.toUpperCase() === 'NOT STARTED' ||
                        props.row.time.status.toUpperCase() === 'NS' ||
                        props.row.time.status.toUpperCase() === 'TBA'
                      "
                      class="is-greyLit"
                      >-</b-tag
                    >
                    <b-tag
                      v-else
                      :class="{
                        'is-green':
                          props.row.scores.localteam_score <
                          props.row.scores.visitorteam_score,
                        'is-red':
                          props.row.scores.localteam_score >
                          props.row.scores.visitorteam_score,
                        'is-blueInfo':
                          props.row.scores.localteam_score ===
                          props.row.scores.visitorteam_score,
                      }"
                      size="is-large"
                      >{{ props.row.scores.visitorteam_score }}</b-tag
                    >
                  </span>
                </div>
                <div
                  class="colDir"
                  v-if="props.row.time.status.toUpperCase() == 'FT_PEN'"
                >
                  <span class="is-italic">{{
                    langSelected == "EN" ? "Penalty shootout" : "Pénalties"
                  }}</span>
                  <div class="displayFlex">
                    <b-tag
                      :class="{
                        'is-green':
                          props.row.scores.localteam_pen_score >
                          props.row.scores.visitorteam_pen_score,
                        'is-red':
                          props.row.scores.localteam_pen_score <
                          props.row.scores.visitorteam_pen_score,
                        'is-blueInfo':
                          props.row.scores.localteam_pen_score ===
                          props.row.scores.visitorteam_pen_score,
                      }"
                      size="is-large"
                      >{{ props.row.scores.localteam_pen_score }}</b-tag
                    >-
                    <b-tag
                      :class="{
                        'is-green':
                          props.row.scores.localteam_pen_score <
                          props.row.scores.visitorteam_pen_score,
                        'is-red':
                          props.row.scores.localteam_pen_score >
                          props.row.scores.visitorteam_pen_score,
                        'is-blueInfo':
                          props.row.scores.localteam_pen_score ===
                          props.row.scores.visitorteam_pen_score,
                      }"
                      size="is-large"
                      >{{ props.row.scores.visitorteam_pen_score }}</b-tag
                    >
                  </div>
                </div>
              </div>
              <div class="teamNameLogo logoClub">
                <img
                  class="pointer"
                  :src="props.row.visitorTeam.data.logo_path"
                  :alt="props.row.visitorTeam.data.name"
                  :class="{
                    invertOk: props.row.visitorTeam.data.name
                      .toUpperCase()
                      .includes('JUVE'),
                  }"
                />
                <strong class="teamNameStrong pointer">{{
                  props.row.visitorTeam.data.name
                }}</strong>
              </div>
            </div>
          </b-table-column>
          <b-table-column class="NextMatchWrapper sideTab desktopOnly" centered>
            <div class="journee">
              <div class>
                <strong
                  v-if="
                    props.row.time.status.toUpperCase() === 'FT_PEN' ||
                    props.row.time.status.toUpperCase() === 'AET' ||
                    props.row.time.status.toUpperCase() === 'FT'
                  "
                  class="is-wc"
                  >{{
                    moment(props.row.time.starting_at.date_time)
                      .local()
                      .locale(langSelected.toLowerCase())
                      .calendar()
                  }}</strong
                >

                <strong
                  v-if="
                    props.row.time.status.toUpperCase() != 'AET' &&
                    props.row.time.status.toUpperCase() != 'FT_PEN' &&
                    props.row.time.status.toUpperCase() != 'NOT STARTED' &&
                    props.row.time.status.toUpperCase() != 'NS' &&
                    props.row.time.status.toUpperCase() != 'TBA' &&
                    props.row.time.status.toUpperCase() != 'FT' &&
                    props.row.time.status.toUpperCase() != 'POSTP' &&
                    props.row.time.status.toUpperCase() != 'CANCL' &&
                    props.row.time.status.toUpperCase() != 'DELAYED'
                  "
                  class="is-wc"
                  >{{
                    langSelected === "EN"
                      ? "game in progress"
                      : "match en cours"
                  }}</strong
                >
                <strong
                  v-if="props.row.time.status.toUpperCase() === 'TBA'"
                  class="is-wc"
                  >{{
                    moment(props.row.time.starting_at.date_time)
                      .local()
                      .locale(langSelected.toLowerCase())
                      .calendar()
                  }}</strong
                >
                <strong
                  v-if="
                    props.row.time.status.toUpperCase() === 'NS' ||
                    props.row.time.status.toUpperCase() === 'NOT STARTED'
                  "
                  class="is-wc"
                  >{{
                    moment(props.row.time.starting_at.date_time)
                      .local()
                      .locale(langSelected.toLowerCase())
                      .calendar()
                  }}</strong
                >
                <!--  <br><strong class='is-wc'>{{props.row.stadium&&props.row.stadium.name?props.row.stadium.name:""}}</strong> -->
              </div>
            </div>
          </b-table-column>
          <!-- <b-table-column field='competition' centered label="">
                  <div class="journée">
                      <strong>({{props.row.matchday}})</strong>
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
              <p>...</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
  </section>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      resultat: [],
      total: 0,
      loading: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 800,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
    };
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
  props: {
    team: "",
  },
  watch: {
    team: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.team && this.team.calendarAndResults) {
          this.resultat = this.team.calendarAndResults.matchPastList;
          this.loading = false;
        } else {
          this.resultat = [];
          this.loading = false;
        }
      },
    },
  },
  methods: {
    moment: function (time) {
      return moment(time);
    },
    accessTeam(event) {
      this.$router.push("/teams/" + event);
    },
    ligue(ligue) {
      this.$store.commit("var/setNewValue", ligue);
      setTimeout(() => {
        this.$router.push("/leagues");
      }, 10);
    },
  },
  mounted() {
    this.loading = true;
    if (this.team.calendarAndResults) {
      this.resultat = this.team.calendarAndResults.matchPastList;
      this.loading = false;
    } else {
      this.resultat = [];
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.sideTab {
  width: 15%;
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
  flex-direction: column;
  width: 40%;
  margin: 0.2rem;
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
.logoClub > img {
  height: 45px;
  width: auto;
  margin: auto;
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
  height: 35px !important;
  align-self: center;
  padding: 0 15px;
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
  margin: 0rem !important;
}
.matchlist > .b-table {
  border: none !important;
}
.displayFlex {
  justify-content: center;
  align-content: center;
  align-items: center;
  display: flex;
}
.marginAuto {
  margin: auto;
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
.logoligue {
  height: 64px !important;
  width: auto;
}
.mobileOnly {
  display: none;
}
.colDir {
  display: flex;
  flex-direction: column;
}
.colDir > .is-italic {
  font-size: 1rem;
}
@media (max-width: 769px) {
  .colDir > .is-italic {
    font-size: 0.8rem;
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
    justify-content: flex-end;
    align-items: center !important;
  }
  .NextMatchWrapper:before {
    margin-right: 0 !important;
    padding-right: 0em !important;
    width: 0% !important;
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

  .bullsAndBearsPicVsName {
    width: 30%;
    padding-left: 5px;
    padding-right: 5px;
  }
  .bullsAndBearsPicVs > .tag {
    font-size: 1rem !important;
  }
  .is-hidden-tablet {
    display: none !important;
  }
  img {
    max-height: 42px !important;
  }
  .teamNameLogo {
    width: 35%;
  }
  .teamNameLogo > img {
    height: 35px !important;
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
