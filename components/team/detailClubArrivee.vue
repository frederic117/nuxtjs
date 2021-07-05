<template>
  <section>
    <div class="matchlist card">
      <b-table
        :data="transfers"
        :loading="loading"
        :paginated="isPaginated"
        :per-page="perPage"
        :pagination-simple="isPaginationSimple"
        :total="total"
        :mobile-cards="false"
        :striped="true"
        default-sort-direction="desc"
        default-sort="date"
      >
        <template slot-scope="props">
          <b-table-column
            class="dateTransf"
            sortable
            field="date"
            centered
            numeric
            label="date"
          >
            <div class="journée">
              <strong class="is-wc">{{
                moment(props.row.date).local().format("MM-YY")
              }}</strong>
            </div>
          </b-table-column>

          <b-table-column
            class
            field="player.data.display_name"
            sortable
            centered
            label=" "
          >
            <div
              v-if="props.row.player.data && props.row.player.data.display_name"
              class="nomPlay"
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
                class="pointer"
              >
                <figure class="image is-circle profilePic playerPic">
                  <img
                    v-if="props.row.player.data.image_path"
                    class
                    :src="props.row.player.data.image_path"
                    :alt="props.row.player.data.display_name"
                  />
                  <img
                    v-else
                    class
                    src="~assets/images/noPics.png"
                    :alt="props.row.player.data.display_name"
                  />
                </figure>
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
                class="pointer"
              >
                <figure class="image is-circle profilePic playerPic">
                  <img
                    v-if="props.row.player.data.image_path"
                    class
                    :src="props.row.player.data.image_path"
                    :alt="props.row.player.data.fullname"
                  />
                  <img
                    loading="lazy"
                    v-else
                    class
                    src="~assets/images/noPics.png"
                    :alt="props.row.player.data.fullname"
                  />
                </figure>
              </nuxt-link>
            </div>
          </b-table-column>
          <b-table-column
            class="playerName"
            width="100"
            field="Nom"
            centered
            :label="`${langSelected === 'EN' ? 'name' : 'nom'}`"
          >
            <div
              v-if="props.row.player.data && props.row.player.data.display_name"
              class="nomPlay"
            >
              <nuxt-link
                class="is-wc pointer"
                :to="
                  '/player/' +
                  props.row.player.data.display_name
                    .replace(/\s/g, '-')
                    .toLowerCase() +
                  '/' +
                  props.row.player_id
                "
              >
                <div class="nameWrap">
                  <strong>
                    {{ props.row.player.data.display_name }}&nbsp
                    <span v-if="props.row.position_id == 1">(G)</span>
                    <span v-if="props.row.position_id == 2">(D)</span>
                    <span v-if="props.row.position_id == 3">(M)</span>
                    <span v-if="props.row.position_id == 4">(A)</span>
                    <span v-if="props.row.injured === true" class>
                      <img
                        loading="lazy"
                        id="injuredImg"
                        src="~assets/images/blessure.png"
                        alt="blessure"
                      />
                    </span>
                  </strong>
                </div>
              </nuxt-link>
            </div>
            <div v-else>
              <nuxt-link
                class="is-wc pointer"
                :to="
                  '/player/' +
                  props.row.player.data.fullname
                    .replace(/\s/g, '-')
                    .toLowerCase() +
                  '/' +
                  props.row.player_id
                "
              >
                <div class="nameWrap">
                  <strong>
                    {{ props.row.player.data.fullname }}&nbsp
                    <span v-if="props.row.position_id == 1">(G)</span>
                    <span v-if="props.row.position_id == 2">(D)</span>
                    <span v-if="props.row.position_id == 3">(M)</span>
                    <span v-if="props.row.position_id == 4">(A)</span>
                    <span v-if="props.row.injured === true" class>
                      <img
                        loading="lazy"
                        id="injuredImg"
                        src="~assets/images/blessure.png"
                        alt="blessure"
                      />
                    </span>
                  </strong>
                </div>
              </nuxt-link>
            </div>
          </b-table-column>
          <b-table-column
            field="amount"
            centered
            :label="`${langSelected === 'EN' ? 'amount' : 'montant'}`"
            sortable
            class="taille"
          >
            <strong>{{ props.row.amount ? props.row.amount : 0 }} €</strong>
            <span v-if="props.row.transfer === 'loan'">(prêt)</span>
          </b-table-column>
          <b-table-column
            field="club"
            centered
            :label="`${langSelected === 'EN' ? 'from' : 'provenance'}`"
            class="taille"
          >
            <figure v-if="props.row.team" class="image logoLeague">
              <img
                loading="lazy"
                :class="{
                  invertOk: props.row.team.data.name
                    .toUpperCase()
                    .includes('JUVE'),
                }"
                class="logo"
                :src="props.row.team.data.logo_path"
                alt="logoClub"
              />
            </figure>
            <strong class="has-text-blue" v-if="props.row.team">{{
              props.row.team.data.name
            }}</strong>
            <span v-else>-</span>
          </b-table-column>
          <b-table-column
            field="dateOfBirth"
            centered
            :label="`${langSelected === 'EN' ? 'dob' : 'naiss.'}`"
          >
            <strong>{{ props.row.player.data.birthdate }}</strong>
          </b-table-column>
          <b-table-column
            field="taille"
            centered
            :label="`${langSelected === 'EN' ? 'height' : 'taille'}`"
            class="taille"
          >
            <strong>{{
              props.row.player.data.height ? props.row.player.data.height : "-"
            }}</strong>
          </b-table-column>
          <b-table-column
            field="poids"
            centered
            :label="`${langSelected === 'EN' ? 'weight' : 'poids'}`"
            class="taille"
          >
            <strong>{{
              props.row.player.data.weight ? props.row.player.data.weight : "-"
            }}</strong>
          </b-table-column>
          <b-table-column
            field="nationality"
            class="nationalite"
            centered
            label="nat."
          >
            <div class="journée">
              <strong>{{ props.row.player.data.nationality }}</strong>
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
      transfers: [],
      total: 0,
      loading: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 20,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
    };
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
        if (this.team && this.team.transfers && this.team.transfers.data) {
          this.transfers = this.team.transfers.data.filter((tr) => {
            return tr.type === "OUT";
          });
          this.loading = false;
        } else {
          this.transfers = [];
          this.loading = false;
        }
      },
    },
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

  mounted() {
    this.loading = true;
    if (this.team.transfers && this.team.transfers.data) {
      this.transfers = this.team.transfers.data.filter((tr) => {
        return tr.type === "OUT";
      });
      this.loading = false;
    } else {
      this.transfers = [];
      this.loading = false;
    }
  },
  methods: {
    moment: function (time) {
      return moment(time);
    },
  },
};
</script>

<style scoped>
.nomPlay {
  display: flex;
  flex-direction: column;
}

.nomPlay > div {
  display: flex;
  margin: auto;
  flex-direction: column;
}

.nomPlay > div > strong {
  padding-right: 2px;
}

.teamNameGame > img {
  height: 32px;
  width: 32px;
}

.teamNameGame > img {
  height: 32px;
  width: 32px;
}

.taille {
  width: 90px;
}

td {
  height: 75px !important;
}

.nationalite > span {
  display: flex;
  flex-direction: column;
}

.playerName {
  vertical-align: middle;
}

.playerPic {
  height: 50px;
  width: 50px;
  margin: auto;
}

.logoLeague {
  margin: auto;
  width: 50px;
}

.playerPic > img {
  border-radius: 50% !important;
}

.logo {
  margin: auto;
}

.teamName {
  align-self: center;
  min-width: 30% !important;
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
  border: solid;
  border-color: #0084a4 !important;
  margin: 0rem !important;
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
  font-size: 1rem !important;
}

h1 {
  font-size: 1.2rem !important;
}

.has-text-centered {
  font-size: 0.9rem !important;
  font-weight: normal;
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
  .dateTransf {
    min-width: 80px !important;
  }

  td {
    height: auto !important;
  }

  .valPlayer {
    min-width: 105px !important;
  }

  .playerPic {
    width: 32px !important;
    height: 32px !important;
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

  img {
    height: 32px !important;
    width: 32px !important;
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
