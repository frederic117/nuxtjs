<template>
  <div>
    <b-loading
      v-if="!compet || compet.length == 0"
      :is-full-page="true"
      :active.sync="loading"
      :canCancel="false"
    ></b-loading>
    <div v-else>
      <div v-if="isLiveStanding == true">
        <b-table
          :data="
            compet.liveClassement ? compet.liveClassement : compet.classement
          "
          :paginated="isPaginated"
          :per-page="perPage"
          :pagination-simple="isPaginationSimple"
          :total="total"
          :mobile-cards="false"
          :striped="true"
          :default-sort-direction="defaultSortOrder"
          :default-sort="defaultSortField"
        >
          <template slot-scope="props">
            <b-table-column
              label
              field="position"
              sortable
              centered
              class="classementPoint"
            >
              <strong class="positionClass">
                {{ props.row.position }}
                <img
                  class="is-30x30"
                  src="~assets/images/championsLeague.png"
                  v-if="
                    props.row.description &&
                    props.row.description.includes('UEFA Champions League')
                  "
                />
                <img
                  class="is-30x30"
                  src="~assets/images/uefaLeague.png"
                  v-if="props.row.description == 'UEFA Europa League'"
                />
                <i
                  class="fa fa-arrow-down has-text-danger"
                  v-if="props.row.description == 'Relegation'"
                ></i>
                <i
                  class="fa fa-arrow-down has-text-redReleg"
                  v-if="props.row.description == 'Relegation Play-off'"
                ></i>
                <i
                  class="fa fa-arrow-up has-text-greenPromo"
                  v-if="props.row.description == 'Promotion'"
                ></i>
                <i
                  class="fa fa-arrow-up has-text-success"
                  v-if="props.row.description == 'Promotion Play-off'"
                ></i>
              </strong>
            </b-table-column>

            <b-table-column
              field="teamDetail.shortName"
              class="logo"
              centered
              :label="`${langSelected === 'EN' ? 'Team' : 'Equipe'}`"
            >
              <h1>
                <nuxt-link
                  v-if="props.row.teamDetail && props.row.teamDetail.shortName"
                  :to="'/teams/' + props.row.teamDetail.shortName.toLowerCase()"
                  class="pointer"
                >
                  <img
                    class="pointer logoClub"
                    :src="props.row.teamDetail.teamImg"
                    :alt="props.row.teamDetail.shortName + 'logo'"
                    :class="{
                      invertOk: props.row.teamDetail.name
                        .toUpperCase()
                        .includes('JUVE'),
                    }"
                  />
                  <strong class="pointer desktopOnly">{{
                    props.row.teamDetail.name
                  }}</strong>
                </nuxt-link>
                <strong v-else class="pointer">{{
                  props.row.teamDetail.name
                }}</strong>
              </h1>
            </b-table-column>

            <b-table-column
              field="points"
              numeric
              sortable
              centered
              label="pts"
            >
              <strong>{{ props.row.points }}</strong>
            </b-table-column>

            <b-table-column
              field="played"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'P.' : 'J.'}`"
              >{{ props.row.played }}</b-table-column
            >

            <b-table-column
              class="has-text-green"
              field="wins"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'W.' : 'G.'}`"
              >{{ props.row.wins }}</b-table-column
            >
            <b-table-column
              field="draws"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'D.' : 'N.'}`"
              >{{ props.row.draws }}</b-table-column
            >
            <b-table-column
              class="has-text-red"
              field="lost"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'L.' : 'P.'}`"
              >{{ props.row.lost }}</b-table-column
            >
            <b-table-column
              field="goal_diff"
              numeric
              sortable
              centered
              label="Diff."
              >{{ props.row.goal_diff }}</b-table-column
            >
            <b-table-column
              class="has-text-blue"
              field="goals"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'F:A' : 'P:C'}`"
              >{{ props.row.goals }}</b-table-column
            >

            <b-table-column
              field="forme"
              numeric
              centered
              :label="`${langSelected === 'EN' ? 'Form' : 'Forme'}`"
            >
              <div class="forme">
                <span
                  v-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 5] ==
                      'W'
                  "
                  class="form is-win"
                  >{{ langSelected === "EN" ? "W" : "V" }}</span
                >
                <span
                  v-else-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 5] ==
                      'D'
                  "
                  class="form is-draw"
                  >{{ langSelected === "EN" ? "D" : "N" }}</span
                >
                <span
                  v-else-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 5] ==
                      'L'
                  "
                  class="form is-loss"
                  >{{ langSelected === "EN" ? "L" : "D" }}</span
                >
                <span
                  v-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 4] ==
                      'W'
                  "
                  class="form is-win"
                  >{{ langSelected === "EN" ? "W" : "V" }}</span
                >
                <span
                  v-else-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 4] ==
                      'D'
                  "
                  class="form is-draw"
                  >{{ langSelected === "EN" ? "D" : "N" }}</span
                >
                <span
                  v-else-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 4] ==
                      'L'
                  "
                  class="form is-loss"
                  >{{ langSelected === "EN" ? "L" : "D" }}</span
                >
                <span
                  v-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 3] ==
                      'W'
                  "
                  class="form is-win"
                  >{{ langSelected === "EN" ? "W" : "V" }}</span
                >
                <span
                  v-else-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 3] ==
                      'D'
                  "
                  class="form is-draw"
                  >{{ langSelected === "EN" ? "D" : "N" }}</span
                >
                <span
                  v-else-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 3] ==
                      'L'
                  "
                  class="form is-loss"
                  >{{ langSelected === "EN" ? "L" : "D" }}</span
                >
                <span
                  v-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 2] ==
                      'W'
                  "
                  class="form is-win"
                  >{{ langSelected === "EN" ? "W" : "V" }}</span
                >
                <span
                  v-else-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 2] ==
                      'D'
                  "
                  class="form is-draw"
                  >{{ langSelected === "EN" ? "D" : "N" }}</span
                >
                <span
                  v-else-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 2] ==
                      'L'
                  "
                  class="form is-loss"
                  >{{ langSelected === "EN" ? "L" : "D" }}</span
                >
                <span
                  v-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 1] ==
                      'W'
                  "
                  class="form is-win"
                  >{{ langSelected === "EN" ? "W" : "V" }}</span
                >
                <span
                  v-else-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 1] ==
                      'D'
                  "
                  class="form is-draw"
                  >{{ langSelected === "EN" ? "D" : "N" }}</span
                >
                <span
                  v-else-if="
                    props.row.recent_form &&
                    props.row.recent_form[props.row.recent_form.length - 1] ==
                      'L'
                  "
                  class="form is-loss"
                  >{{ langSelected === "EN" ? "L" : "D" }}</span
                >
              </div>
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
                <p>...loading</p>
              </div>
            </section>
          </template>
        </b-table>
      </div>

      <div v-if="isLiveStanding == false">
        <b-table
          :data="compet && compet.classement ? compet.classement : []"
          :paginated="isPaginated"
          :per-page="perPage"
          :pagination-simple="isPaginationSimple"
          :total="total"
          :mobile-cards="false"
          :striped="true"
          :default-sort-direction="defaultSortOrder"
          :default-sort="defaultSortField"
        >
          <template slot-scope="props">
            <b-table-column
              label
              field="position"
              sortable
              centered
              class="classementPoint"
            >
              <strong class="positionClass">
                {{ props.row.position }}
                <img
                  class="is-30x30"
                  src="~assets/images/championsLeague.png"
                  v-if="
                    props.row.result &&
                    props.row.result.includes('UEFA Champions League')
                  "
                />
                <img
                  class="is-30x30"
                  src="~assets/images/uefaLeague.png"
                  v-if="props.row.result == 'UEFA Europa League'"
                />
                <i
                  class="fa fa-arrow-down has-text-danger"
                  v-if="props.row.result == 'Relegation'"
                ></i>
                <i
                  class="fa fa-arrow-down has-text-redReleg"
                  v-if="props.row.result == 'Relegation Play-off'"
                ></i>
                <i
                  class="fa fa-arrow-up has-text-greenPromo"
                  v-if="props.row.result == 'Promotion'"
                ></i>
                <i
                  class="fa fa-arrow-up has-text-success"
                  v-if="props.row.result == 'Promotion Play-off'"
                ></i>
              </strong>
            </b-table-column>

            <b-table-column
              field="teamDetail.shortName"
              class="logo"
              centered
              :label="`${langSelected === 'EN' ? 'Team' : 'Equipe'}`"
            >
              <h1>
                <nuxt-link
                  v-if="props.row.teamDetail && props.row.teamDetail.shortName"
                  :to="'/teams/' + props.row.teamDetail.shortName.toLowerCase()"
                  class="pointer"
                >
                  <img
                    class="pointer logoClub"
                    :src="props.row.teamDetail.teamImg"
                    :alt="props.row.teamDetail.shortName + 'logo'"
                    :class="{
                      invertOk: props.row.teamDetail.name
                        .toUpperCase()
                        .includes('JUVE'),
                    }"
                  />
                  <strong class="pointer">{{
                    props.row.teamDetail.name
                  }}</strong>
                </nuxt-link>
                <strong v-else class="pointer">{{
                  props.row.teamDetail.name
                }}</strong>
              </h1>
            </b-table-column>

            <b-table-column
              field="points"
              numeric
              sortable
              centered
              label="pts"
            >
              <strong>{{ props.row.points }}</strong>
            </b-table-column>

            <b-table-column
              field="overall.games_played"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'P.' : 'J.'}`"
              >{{ props.row.overall.games_played }}</b-table-column
            >

            <b-table-column
              class="has-text-green"
              field="overall.won"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'W.' : 'G.'}`"
              >{{ props.row.overall.won }}</b-table-column
            >
            <b-table-column
              field="overall.draw"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'D.' : 'N.'}`"
              >{{ props.row.overall.draw }}</b-table-column
            >
            <b-table-column
              class="has-text-red"
              field="overall.lost"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'L.' : 'P.'}`"
              >{{ props.row.overall.lost }}</b-table-column
            >
            <b-table-column
              class="has-text-green"
              field="overall.goals_scored"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'G.f' : 'B.p'}`"
              >{{ props.row.overall.goals_scored }}</b-table-column
            >
            <b-table-column
              class="has-text-red"
              field="overall.goals_against"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'G.a' : 'B.c'}`"
              >{{ props.row.overall.goals_against }}</b-table-column
            >
            <b-table-column
              field="overall.goals_scored -overall.goals_against"
              numeric
              sortable
              centered
              label="Diff."
              >{{
                props.row.overall.goals_scored - props.row.overall.goals_against
              }}</b-table-column
            >
            <b-table-column
              field="forme"
              numeric
              centered
              :label="`${langSelected === 'EN' ? 'Form' : 'Forme'}`"
            >
              <div class="forme">
                <span
                  v-if="props.row.recent_form[0] == 'W'"
                  class="form is-win"
                  >{{ langSelected === "EN" ? "W" : "V" }}</span
                >
                <span
                  v-else-if="props.row.recent_form[0] == 'D'"
                  class="form is-draw"
                >
                  {{ langSelected === "EN" ? "D" : "N" }}</span
                >
                <span
                  v-else-if="props.row.recent_form[0] == 'L'"
                  class="form is-loss"
                  >{{ langSelected === "EN" ? "L" : "D" }}</span
                >
                <span
                  v-if="props.row.recent_form[1] == 'W'"
                  class="form is-win"
                  >{{ langSelected === "EN" ? "W" : "V" }}</span
                >
                <span
                  v-else-if="props.row.recent_form[1] == 'D'"
                  class="form is-draw"
                >
                  {{ langSelected === "EN" ? "D" : "N" }}</span
                >
                <span
                  v-else-if="props.row.recent_form[1] == 'L'"
                  class="form is-loss"
                  >{{ langSelected === "EN" ? "L" : "D" }}</span
                >
                <span
                  v-if="props.row.recent_form[2] == 'W'"
                  class="form is-win"
                  >{{ langSelected === "EN" ? "W" : "V" }}</span
                >
                <span
                  v-else-if="props.row.recent_form[2] == 'D'"
                  class="form is-draw"
                >
                  {{ langSelected === "EN" ? "D" : "N" }}</span
                >
                <span
                  v-else-if="props.row.recent_form[2] == 'L'"
                  class="form is-loss"
                  >{{ langSelected === "EN" ? "L" : "D" }}</span
                >
                <span
                  v-if="props.row.recent_form[3] == 'W'"
                  class="form is-win"
                  >{{ langSelected === "EN" ? "W" : "V" }}</span
                >
                <span
                  v-else-if="props.row.recent_form[3] == 'D'"
                  class="form is-draw"
                >
                  {{ langSelected === "EN" ? "D" : "N" }}</span
                >
                <span
                  v-else-if="props.row.recent_form[3] == 'L'"
                  class="form is-loss"
                  >{{ langSelected === "EN" ? "L" : "D" }}</span
                >
                <span
                  v-if="props.row.recent_form[4] == 'W'"
                  class="form is-win"
                  >{{ langSelected === "EN" ? "W" : "V" }}</span
                >
                <span
                  v-else-if="props.row.recent_form[4] == 'D'"
                  class="form is-draw"
                >
                  {{ langSelected === "EN" ? "D" : "N" }}</span
                >
                <span
                  v-else-if="props.row.recent_form[4] == 'L'"
                  class="form is-loss"
                  >{{ langSelected === "EN" ? "L" : "D" }}</span
                >
              </div>
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
                <p>...loading</p>
              </div>
            </section>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      total: 0,
      loading: true,
      defaultSortField: "position",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 400,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
    };
  },
  props: {
    isLiveStanding: "",
    compet: "",
  },
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
};
</script>

<style scoped>
.has-text-greenPromo {
  color: #23d160;
}

.has-text-redReleg {
  color: #ff3860;
}

.is-30x30 {
  height: 30px;
  width: auto;
}

.fa-arrow-up {
  margin-left: 5px;
  font-size: 20px;
}

.fa-arrow-down {
  margin-left: 5px;
  font-size: 20px;
}

.formeMobile {
  display: none;
}

.classementPoint {
  padding: 0px !important;
}

h1 > .pointer {
  display: flex;
  justify-content: flex-start;
}

h1 > .pointer > strong {
  align-self: center;
  margin-left: 10px;
}

.teamName {
  align-self: center;
  min-width: 30% !important;
}

.tag {
  align-self: center;
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

.b-table {
  margin-left: 0 !important;
  margin-right: 0 !important;
  margin: 0.1rem !important;
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
  display: flex;
  align-items: center;
  justify-content: center;
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

.has-text-centered {
  font-size: 1rem !important;
  vertical-align: middle !important;
}

.flag {
  justify-content: space-evenly;
  display: flex;
}

.crypto {
  color: #f7931a !important;
}

.team {
  min-width: 25%;
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

.forme {
  display: flex;
  margin: 5px;
  justify-content: center;
}

.form {
  width: 20px;
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
  cursor: pointer;
}

.is-blueInfo {
  background-color: #3273dc;
  color: #eef1f7;
  border-radius: 3px;
  margin: 2px;
  cursor: pointer;
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
  cursor: pointer;
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

div {
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
  margin-bottom: 0.5rem !important;
}

.flag {
  justify-content: space-around;
  display: flex;
}

.crypto {
  color: #f7931a !important;
}

.navbar-item.is-tab:hover {
  color: #192b41 !important;
}

.logoClub {
  align-self: center;
  width: auto;
  height: 35px !important;
}

.dropdown-item {
  padding: 0.5rem !important;
}

.babMenu {
  font-size: 1.2rem;
  color: #d3d3d3 !important;
}

.babMenuHeader {
  display: flex;
  padding: 5px;
  margin: auto;
  font-weight: bold;
  color: #192b41 !important;
  align-items: center;
}

.babMenuHeader > img {
  margin-right: 10px;
}

@media (max-width: 769px) {
  .container {
    margin-bottom: 0.25rem !important;
  }
  h1 > .pointer {
    flex-direction: column;
  }

  h1 > .pointer > strong {
    align-self: center;
    margin-left: 0px;
  }

  .babMenu {
    font-size: 0.9rem !important;
  }

  .navbar-item.is-tab.is-active {
    font-size: 0.9rem;
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

  .logoClub {
    height: 25px !important;
    width: auto !important;
  }

  .positionClass {
    font-size: 1rem !important;
  }

  img {
    max-height: 42px !important;
  }

  .babMenuHeader > .ligue-img {
    margin-right: 10px;
  }

  .ligue-img {
    width: auto;
    max-height: 45px !important;
  }

  .flag-img {
    width: 40px;
    height: 40px !important;
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

  .tooltip.is-left.is-green:before {
    border-right: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid black;
    right: calc(100% + -4px);
  }

  .tooltip.is-left.is-red:before {
    border-right: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid black;
    right: calc(100% + -4px);
  }

  .tooltip.is-left.is-blueInfo:before {
    border-right: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid black;
    right: calc(100% + -4px);
  }

  .is-left {
    height: 2em !important;
    width: 2em !important;
  }

  .formeMobile {
    display: flex;
    margin: 5px;
    justify-content: center;
  }
}
</style>