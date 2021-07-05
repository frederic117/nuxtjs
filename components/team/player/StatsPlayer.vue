<template>
  <div class="card matchlist">
    <b-table
      :data="stats"
      :loading="loading"
      :paginated="isPaginated"
      :per-page="perPage"
      :pagination-simple="isPaginationSimple"
      :mobile-cards="false"
      :striped="true"
      :default-sort-direction="defaultSortOrder"
      :default-sort="defaultSortField"
    >
      <template slot-scope="props">
        <b-table-column
          field="season.data.name"
          sortable
          centered
          :label="`${langSelected === 'EN' ? 'season' : 'saison'}`"
        >
          <div @click="seeDetail(props.row)" class="journée pointer">
            <strong>
              {{ props.row.season ? props.row.season.data.name : "-" }}
              <img
                class="is-20 cardRefer"
                src="~assets/images/More.png"
                alt="plus"
              />
            </strong>
          </div>
        </b-table-column>
        <b-table-column
          field="league.data.name"
          sortable
          centered
          :label="`${langSelected === 'EN' ? 'league' : 'compétition'}`"
        >
          <div class="journée">
            <strong>{{
              props.row.league &&
              (props.row.league.data.name == "Friendly International" ||
                props.row.league.data.name == "Club Friendlies")
                ? langSelected === "EN"
                  ? props.row.league.data.name
                  : "Matchs amicaux"
                : props.row.league && props.row.league.data.name
                ? props.row.league.data.name
                : "-"
            }}</strong>
          </div>
        </b-table-column>
        <b-table-column
          field="team_id"
          sortable
          centered
          :label="`${langSelected === 'EN' ? 'team' : 'équipe'}`"
        >
          <div
            v-if="props.row.team && props.row.team.data"
            class="journée teamWrap"
          >
            <b-tooltip
              :label="props.row.team.data.name"
              position="is-top"
              class="teamNameGame"
              type="is-info"
              size="is-small"
            >
              <img
                class="logoClub"
                :src="
                  props.row.team &&
                  props.row.team.data &&
                  props.row.team.data.logo_path
                "
                :alt="props.row.team.data.name"
                :class="{
                  invertOk: props.row.team.data.name
                    .toUpperCase()
                    .includes('JUVE'),
                }"
              />
            </b-tooltip>
          </div>
        </b-table-column>
        <b-table-column
          field="appearences"
          meta="appearences"
          sortable
          centered
          :label="`${langSelected === 'EN' ? 'app.(c)' : 'J.(c)'}`"
        >
          <div class="journée">
            <strong
              >{{ props.row.appearences ? props.row.appearences : "0" }} ({{
                props.row.appearences ? props.row.captain : "0"
              }})</strong
            >
          </div>
        </b-table-column>
        <b-table-column
          field="goals"
          sortable
          meta="note"
          centered
          :label="`${langSelected === 'EN' ? 'rating' : 'note'}`"
        >
          <div class="journée">
            <strong>{{ props.row.rating ? props.row.rating : "-" }}</strong>
          </div>
        </b-table-column>

        <b-table-column
          field="goals"
          sortable
          meta="buts"
          centered
          :label="`${langSelected === 'EN' ? 'goals' : 'buts'}`"
        >
          <div class="journée">
            <strong>{{ props.row.goals ? props.row.goals : 0 }}&nbsp⚽</strong>
          </div>
        </b-table-column>
        <b-table-column
          field="goals/appearences"
          centered
          :label="`${langSelected === 'EN' ? 'g/m' : 'b/m'}`"
        >
          <div class="journée">
            <strong>{{
              props.row.goals && props.row.appearences
                ? (props.row.goals / props.row.appearences).toFixed(2)
                : props.row.goals
                ? props.row.goals
                : 0
            }}</strong>
          </div>
        </b-table-column>
        <b-table-column
          field="assist"
          sortable
          meta="assist"
          centered
          :label="`${langSelected === 'EN' ? 'assist' : 'p.d'}`"
        >
          <div class="journée">
            <strong>{{ props.row.assists ? props.row.assists : "0" }}</strong>
          </div>
        </b-table-column>
        <b-table-column
          field="yellowcards"
          sortable
          centered
          :label="`${langSelected === 'EN' ? 'yel.' : 'j.'}`"
        >
          <div class="journée">
            <strong>
              {{ props.row.yellowcards ? props.row.yellowcards : "0" }}
              <img
                class="cardRefer"
                src="~assets/images/yellow_card_icon.svg"
                alt="yellowCard"
              />
            </strong>
          </div>
        </b-table-column>
        <b-table-column
          field="redcards"
          sortable
          centered
          :label="`${langSelected === 'EN' ? 'r.' : 'r.'}`"
        >
          <div class="journée">
            <strong>
              {{ props.row.redcards ? props.row.redcards : "0" }}
              <img
                class="cardRefer"
                src="~assets/images/red_card_icon.svg"
                alt="yellowCard"
              />
            </strong>
          </div>
        </b-table-column>
        <b-table-column
          field="minutes"
          sortable
          centered
          :label="`${langSelected === 'EN' ? 'min.' : 'temps'}`"
        >
          <div class="journée">
            <strong>{{ props.row.minutes ? props.row.minutes : "0" }}'</strong>
          </div>
        </b-table-column>
      </template>
      <template slot="footer">
        <th>
          <div class="th-wrap">Total</div>
        </th>
        <th>
          <div class="th-wrap"></div>
        </th>
        <th>
          <div class="th-wrap"></div>
        </th>
        <th>
          <div class="th-wrap is-centered">
            {{ totalAppearences.toString() }}
          </div>
        </th>
        <th>
          <div class="th-wrap"></div>
        </th>
        <th>
          <div class="th-wrap">{{ totalButs.toString() }}&nbsp⚽</div>
        </th>
        <th>
          <div class="th-wrap">
            {{ totalButsParMatch ? totalButsParMatch.toString() : 0 }}
          </div>
        </th>
        <th>
          <div class="th-wrap">{{ totalAssists.toString() }}</div>
        </th>
        <th>
          <div class="th-wrap">
            {{ totalYellows.toString() }}
            <img
              class="cardRefer"
              src="~assets/images/yellow_card_icon.svg"
              alt="yellowCard"
            />
          </div>
        </th>

        <th>
          <div class="th-wrap">
            {{ totalReds.toString() }}
            <img
              class="cardRefer"
              src="~assets/images/red_card_icon.svg"
              alt="yellowCard"
            />
          </div>
        </th>
        <th>
          <div class="th-wrap"></div>
        </th>
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  auth: false,
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
    totalButs: function () {
      if (this.stats) {
        return this.stats
          .map((item) => (item.goals ? item.goals : 0))
          .reduce((prev, next) => prev + next, 0);
      }
    },
    totalButsParMatch: function () {
      if (this.totalButs && this.totalAppearences) {
        return (Number(this.totalButs) / Number(this.totalAppearences)).toFixed(
          2
        );
      }
    },
    totalReds: function () {
      if (this.stats) {
        return this.stats
          .map((item) => (item.redcards ? item.redcards : 0))
          .reduce((prev, next) => prev + next, 0);
      }
    },
    totalYellows: function () {
      if (this.stats) {
        return this.stats
          .map((item) => (item.yellowcards ? item.yellowcards : 0))
          .reduce((prev, next) => prev + next, 0);
      }
    },
    totalTime: function () {
      if (this.stats) {
        return this.stats
          .map((item) => (item.totalTime ? Number(item.totalTime) : 0))
          .reduce((prev, next) => prev + next, 0);
      }
    },
    totalAssists: function () {
      if (this.stats) {
        return this.stats
          .map((item) => (item.assists ? item.assists : 0))
          .reduce((prev, next) => prev + next, 0);
      }
    },

    totalAppearences: function () {
      if (this.stats) {
        return this.stats
          .map((item) => (item.appearences ? item.appearences : 0))
          .reduce((prev, next) => prev + next, 0);
      }
    },
  },
  data() {
    return {
      loading: false,
      defaultSortField: "season.data.name",
      defaultSortOrder: "desc",
      page: 1,
      perPage: 800,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "desc",
    };
  },
  props: {
    stats: "",
  },
  methods: {
    seeDetail(event) {
      this.$emit("seeDetail", event);
    },
  },
};
</script>
<style scoped>
.teamWrap {
  display: flex;
  justify-content: center;
}
.journée {
  min-width: 40px !important;
  max-width: 80px !important;
}
.th-wrap {
  justify-content: center !important;
}
.modalWrap {
  background-color: #eef1f7;
}
.displayFlex {
  justify-content: center;
}
.cardWrap {
  display: flex;
}
.cardWrap > strong {
  margin-right: 5px;
}
.cardWrap > strong:last-child {
  margin-right: 0px;
}
.navbar {
  overflow: auto;
}
.journée > strong {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0084a4 !important;
}
.is-20 {
  cursor: pointer;
  width: auto;
  margin-left: 5px;
}
.matchlist {
  margin-bottom: 0.5rem !important;
}
.transfertSub {
  flex-direction: column;
  width: 100%;
  display: flex;
  margin: auto;
  font-weight: bold;
  color: #192b41 !important;
}
.transfertSub > div {
  margin: auto;
  display: flex;
}
.cardRefer {
  height: 15px;
  align-self: center;
}
.babblesField {
  margin-right: 0.5%;
  margin-left: 0.5%;
}
.column.is-6 {
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  width: 50%;
}
.is-on {
  border-bottom: 2px solid #192b41 !important;
  margin-bottom: 10px !important;
  font-size: 1.4rem !important;
}
.navTransf {
  border-top: 0.5px solid;
  border-top-color: lightgrey;
}
.babblesMenu {
  display: flex;
  margin: auto;
  width: 100%;
}
.babMenu {
  display: flex;
  padding: 5px;
  margin: auto;
  font-weight: bold;
  color: #192b41 !important;
}
a:hover {
  color: #eef1f7;
}
.sci2 {
  display: none;
}
div {
  font-size: 1.2rem !important;
}
.primordial {
  width: 100%;
  justify-content: center;
  display: flex;
}
.babblesField {
  width: 50%;
  margin-right: 0.5%;
  margin-left: 0.5%;
}
.sct1 {
  width: 100%;
  justify-content: center;
  display: flex;
  padding: 0px 0.5rem;
}
.forumTitle {
  margin-bottom: 1rem;
}
.mainMenu {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.is-35 {
  width: auto;
  height: 35px;
  max-height: 35px;
}
.is-30 {
  width: auto;
  height: 30px;
  padding-right: 10px;
}
.itemMenu {
  display: flex;
  margin: auto;
  height: 3rem;
}
.mobileOnly {
  display: none;
}
.yellowRed {
  margin-left: 2px;
}
.logoClub {
  width: auto;
  height: 40px;
}
@media (max-width: 1047px) {
  .logoClub {
    width: auto;
    height: 25px !important;
  }
  .is-size-3 {
    font-size: 1.2rem !important;
  }
  .mobileDrop {
    padding-top: 0px;
    align-content: flex-end;
    position: absolute;
    top: 100%;
    z-index: 100 !important;
    right: 5px;
    min-width: 10rem;
  }
  .journée > strong {
    font-size: 0.8rem !important;
  }

  .cardWrap {
    min-width: 70px !important;
  }
  .yellowRed {
    height: 15px;
    align-self: center;
  }
  .mobileDropSub {
    background-color: white;
    border-radius: 3px;
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
      0 0 0 1px rgba(10, 10, 10, 0.1);
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
  .navTransf {
    margin-bottom: 0 !important;
  }
  .mobileDropSub > a {
    padding-right: 3rem;
    white-space: nowrap;
    color: #4a4a4a;
    display: block;
    font-size: 0.875rem;
    line-height: 1.7em;
    padding: 0.375rem 1rem;
    position: relative;
  }
  .navbar {
    overflow: inherit;
    z-index: inherit;
  }
  .babMenu {
    margin: auto;
    padding: 0.5rem;
    font-size: 1.3rem !important;
    color: #c9c9c9;
    font-weight: bold;
    align-items: center;
  }
  .is-30 {
    width: auto;
    height: 30px;
    padding-right: 10px;
  }
  .mobileOnly {
    display: flex;
  }
  .desktopOnly {
    display: none;
  }
  .sci2 {
    display: inline;
  }
  .sct1 {
    padding: 0px;
    margin-left: 0px;
    margin-right: 0px;
    max-width: 100%;
    flex-direction: column !important;
  }
  .main {
    background-color: #eef1f7;
    padding-top: 0.5rem !important;
    margin-left: 0px !important;
    margin-right: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .columns {
    margin-left: 0px !important;
    margin-right: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .column {
    margin-left: 0px !important;
    margin-right: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .sci {
    display: none;
  }
}
</style>