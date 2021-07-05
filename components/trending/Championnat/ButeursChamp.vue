<template>
  <section>
    <b-loading
      v-if="!scorer || scorer.length == 0"
      :is-full-page="true"
      :active.sync="loading"
      :canCancel="false"
    ></b-loading>
    <div v-else>
      <b-table
        v-if="scorer && scorer.length > 0"
        :data="scorer"
        :loading="loading"
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
          <b-table-column field="position" centered numeric label="class.">
            <div class="journée">
              <strong class="has-text-yellow">{{ props.row.position }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            field="Nom"
            centered
            class="playerName"
            :label="`${langSelected === 'EN' ? 'Name' : 'Nom'}`"
          >
            <div class="journée">
              <img
                class="imgProfile"
                :src="props.row.player.data.image_path"
                :alt="props.row.player.data.display_name"
              />
              <br />
              <strong>{{ props.row.player.data.display_name }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            field="Equipe"
            centered
            :label="`${langSelected === 'EN' ? 'Team' : 'Equipe'}`"
          >
            <div class="journée">
              <img
                loading="lazy"
                class
                :src="props.row.team.data.logo_path"
                :alt="props.row.team.data.name"
                :class="{
                  invertOk: props.row.team.data.name
                    .toUpperCase()
                    .includes('JUVE'),
                }"
              />
              <br />
              <span>{{ props.row.team.data.name }}</span>
            </div>
          </b-table-column>
          <b-table-column
            field="But"
            numeric
            centered
            :label="`${langSelected === 'EN' ? 'Goals' : 'Buts'}`"
          >
            <div class="journée">
              <strong>{{ props.row.goals }}</strong>
            </div>
          </b-table-column>
          <b-table-column field="pen" numeric centered label="penalty">
            <div class="journée">
              <strong>{{ props.row.penalty_goals }}</strong>
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      defaultSortField: "position",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 150,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      loading: true,
    };
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  props: {
    indexSelected: "",
    scorer: [],
  },
};
</script>

<style scoped>
.teamName {
  align-self: center;
  min-width: 30% !important;
}
.playerName {
  vertical-align: middle;
}
.tag {
  align-self: center;
}
h1 {
  padding-top: 1rem;
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
.is-wc {
  color: #0084a4 !important;
}
.b-table {
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
  font-size: 1rem !important;
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
@media (max-width: 769px) {
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
  img {
    max-height: 42px !important;
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
    font-size: 1rem !important;
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
