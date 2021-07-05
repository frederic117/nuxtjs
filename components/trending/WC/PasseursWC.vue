<template>
  <section>
    <b-loading
      v-if="!assists || assists.length == 0"
      :is-full-page="true"
      :active.sync="loading"
      :canCancel="false"
    ></b-loading>
    <div v-else>
      <b-table
        v-if="assists && assists.length > 0"
        :data="assists"
        :paginated="true"
        :per-page="50"
        :pagination-simple="isPaginationSimple"
        :total="total"
        :mobile-cards="false"
        :striped="true"
        :default-sort-direction="defaultSortOrder"
        :default-sort="defaultSortField"
      >
        <template slot-scope="props">
          <b-table-column width="40" field="Classement" centered numeric label>
            <div class="journée">
              <strong class="has-text-yellow">{{ props.row.position }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            field="Nom"
            width="300"
            centered
            class="playerName"
            :label="`${langSelected === 'EN' ? 'Name' : 'Nom'}`"
          >
            <div
              class
              v-if="props.row.player.data && props.row.player.data.display_name"
            >
              <nuxt-link
                :to="
                  '/player/' +
                  props.row.player.data.display_name
                    .replace(/\s/g, '-')
                    .toLowerCase() +
                  '/' +
                  props.row.player_id
                "
                class="player"
              >
                <img
                  v-if="props.row.player.data.image_path"
                  class="imgProfile"
                  :src="props.row.player.data.image_path"
                  :alt="props.row.player.data.display_name"
                />
                <img
                  v-else
                  class="imgProfile"
                  src="~assets/images/noPics.png"
                  :alt="props.row.player.data.display_name"
                />

                <strong>{{ props.row.player.data.display_name }}</strong>
              </nuxt-link>
            </div>
            <div v-else>
              <nuxt-link
                :to="
                  '/player/' +
                  props.row.player.data.fullname
                    .replace(/\s/g, '-')
                    .toLowerCase() +
                  '/' +
                  props.row.player_id
                "
                class="player"
              >
                <img
                  v-if="props.row.player.data.image_path"
                  class="imgProfile"
                  :src="props.row.player.data.image_path"
                  :alt="props.row.player.data.fullname"
                />
                <img
                  v-else
                  class="imgProfile"
                  src="~assets/images/noPics.png"
                  :alt="props.row.player.data.fullname"
                />

                <strong>{{ props.row.player.data.fullname }}</strong>
              </nuxt-link>
            </div>
          </b-table-column>
          <b-table-column
            field="Equipe"
            centered
            :label="`${langSelected === 'EN' ? 'Team' : 'Equipe'}`"
          >
            <div class="journée">
              <b-tooltip
                :label="props.row.teamDetail.shortName"
                position="is-left"
                class="teamNameGame"
                type="is-info"
                size="is-small"
              >
                <img
                  loading="lazy"
                  class
                  :src="props.row.teamDetail.teamImg"
                  :alt="props.row.teamDetail.shortName"
                  :class="{
                    invertOk: props.row.teamDetail.name
                      .toUpperCase()
                      .includes('JUVE'),
                  }"
                />
              </b-tooltip>
            </div>
          </b-table-column>
          <b-table-column
            field="But"
            numeric
            width="100"
            centered
            :label="`${langSelected === 'EN' ? 'Assists' : 'Passes décisives'}`"
          >
            <div class="journée">
              <strong>{{ props.row.assists }}</strong>
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
import { getPlayer } from "@/server/apiTrending";

export default {
  auth: false,
  data() {
    return {
      total: 0,
      loading: true,
      defaultSortField: "position",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 150,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
    };
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
  props: {
    assists: Array,
  },
  mounted() {},
};
</script>
<style scoped>
.teamName {
  align-self: center;
  min-width: 30% !important;
}
.journée {
  display: flex;
  align-items: center;
  justify-content: center;
}
.player {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.player > strong {
  margin-left: 10px;
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
  max-height: 45px !important;
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
  .playerName {
    font-size: 0.8rem !important;
  }
  .is-hidden-tablet {
    display: none !important;
  }
  img {
    max-height: 25px !important;
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

