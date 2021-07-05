<template>
  <div v-if="$auth.user && $auth.user._id">
    <section class="hero welcome is-small">
      <div class="hero-body">
        <div class>
          <h1 class="title helloText">Bonjour {{ $auth.user.username }},</h1>
          <h2 class="subtitle">Suivi des transactions</h2>
        </div>
      </div>
    </section>
    <div class="container adminBtabs">
      <b-tabs v-model="activeTab" type="is-boxed" expanded>
        <b-tab-item>
          <template slot="header">
            <strong>Retrait de F$</strong>
          </template>
        </b-tab-item>
        <b-tab-item>
          <template slot="header">
            <strong>Achat de F$</strong>
          </template>
        </b-tab-item>
      </b-tabs>
    </div>

    <div>
      <b-field class="searchField" v-if="displayTransactions.length > 0">
        <b-input placeholder="search" v-model="search_query" />
      </b-field>

      <section>
        <b-table
          :data="filter"
          :loading="loading"
          :paginated="true"
          :per-page="50"
          :pagination-simple="isPaginationSimple"
          :total="total"
          :mobile-cards="true"
          :striped="true"
          :default-sort-direction="defaultSortOrder"
          :default-sort="defaultSortField"
        >
          <template slot-scope="props">
            <b-table-column
              sortable
              field="designation"
              centered
              label="designation"
            >
              <div class="transac">
                <img
                  v-if="props.row.action === 'sell'"
                  loading="lazy"
                  src="~assets/images/cashOut.png"
                  alt="cashOut"
                />
                <img
                  v-else-if="props.row.action === 'buy'"
                  loading="lazy"
                  src="~assets/images/buyF.png"
                  alt="buy"
                />
                <div class="columnDir">
                  <strong>{{ props.row.designation }}</strong>
                  <span class="is-italic">{{ props.row._id }}</span>
                </div>
              </div>
            </b-table-column>
            <b-table-column
              sortable
              field="footCoins"
              centered
              label="footCoins"
            >
              <div class="columnDir">
                <strong>{{ props.row.footCoins }} F$</strong>
                <span class="is-italic">{{ props.row.amount / 100 }} €</span>
              </div>
            </b-table-column>

            <b-table-column field="date" sortable centered label="date">
              <div class="journée">
                <strong>{{
                  moment(props.row.date).format("DD-MM-YYYY HH:mm")
                }}</strong>
              </div>
            </b-table-column>

            <b-table-column
              sortable
              field="to"
              centered
              :label="activeTab == 0 ? 'from' : 'to'"
            >
              <div class="displayFlex">
                <div v-if="props.row.to" class="box suggestBox">
                  <div class="sideRecent mainSCI">
                    <nuxt-link :to="'/dashboard/' + props.row.to._id">
                      <div class="image is-circle">
                        <img
                          loading="lazy"
                          class="imgProfile"
                          :src="props.row.to.picProfile"
                          alt="Image"
                        />
                      </div>
                    </nuxt-link>

                    <div class="profilWrapper">
                      <div>
                        <div class="nameProfil">
                          <nuxt-link
                            class="nameProfilLink nameProfil"
                            :to="'/dashboard/' + props.row.to._id"
                          >
                            <div>
                              <span>{{ props.row.to.username }}</span>
                            </div>
                            <div class="activityUserWrapper">
                              <span class="activityUser">
                                <img
                                  class="icon unfollow"
                                  src="~assets/images/stay.png"
                                  alt="follow"
                                />
                                <strong>{{ props.row.to.followers }}</strong>
                              </span>

                              <span class="activityUser">
                                <img
                                  class="icon unfollow"
                                  src="~assets/images/teams/rumour.png"
                                  alt="babbles"
                                />
                                <strong>{{ props.row.to.nbBabbles }}</strong>
                              </span>

                              <span
                                v-if="props.row.to.nbOfVideos"
                                class="activityUser"
                              >
                                <img
                                  class="icon unfollow"
                                  src="~assets/images/teams/soccervideo.png"
                                  alt="babbles"
                                />
                                <strong>{{ props.row.to.nbOfVideos }}</strong>
                              </span>
                            </div>
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="props.row.from" class="box suggestBox">
                  <div class="sideRecent mainSCI">
                    <nuxt-link :to="'/dashboard/' + props.row.from._id">
                      <div class="image is-circle">
                        <img
                          loading="lazy"
                          class="imgProfile"
                          :src="props.row.from.picProfile"
                          alt="Image"
                        />
                      </div>
                    </nuxt-link>

                    <div class="profilWrapper">
                      <div>
                        <div class="nameProfil">
                          <nuxt-link
                            class="nameProfilLink nameProfil"
                            :to="'/dashboard/' + props.row.from._id"
                          >
                            <div>
                              <span>{{ props.row.from.username }}</span>
                            </div>
                            <div class="activityUserWrapper">
                              <span class="activityUser">
                                <img
                                  class="icon unfollow"
                                  src="~assets/images/stay.png"
                                  alt="follow"
                                />
                                <strong>{{ props.row.from.followers }}</strong>
                              </span>

                              <span class="activityUser">
                                <img
                                  class="icon unfollow"
                                  src="~assets/images/teams/rumour.png"
                                  alt="babbles"
                                />
                                <strong>{{ props.row.from.nbBabbles }}</strong>
                              </span>

                              <span
                                v-if="props.row.from.nbOfVideos"
                                class="activityUser"
                              >
                                <img
                                  class="icon unfollow"
                                  src="~assets/images/teams/soccervideo.png"
                                  alt="babbles"
                                />
                                <strong>{{ props.row.from.nbOfVideos }}</strong>
                              </span>
                            </div>
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-table-column>
            <b-table-column sortable field="status" centered label="status">
              <div class="journée">
                <strong>{{ props.row.status }}</strong>
              </div>
            </b-table-column>
          </template>
          <template slot="empty">
            <section class="section">
              <div
                v-if="loading == false"
                class="content has-text-grey has-text-centered"
              >
                <p>...</p>
              </div>
            </section>
          </template>
        </b-table>
      </section>
    </div>
  </div>
</template>

<script>
import { getTransactionsByQuery } from "@/server/apiContest";
import moment from "moment";

export default {
  auth: true,
  components: {},

  data() {
    return {
      activeTab: 0,
      total: 0,
      loading: false,
      defaultSortField: "deadline",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 150,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      search_query: "",
      sellTransactions: [],
      buyTransactions: [],
    };
  },
  mounted() {
    if (this.connectedUser.role != "admin") {
      this.$router.push(`/`);
    } else {
      getTransactionsByQuery({ action: "sell", status: "pending" }).then(
        (transactions) => {
          this.sellTransactions = transactions;
        }
      );
      getTransactionsByQuery({ action: "buy" }).then((transactions) => {
        this.buyTransactions = transactions;
      });
    }
  },
  computed: {
    connectedUser() {
      return this.$store.state.auth.user;
    },
    filter: function () {
      var name_re = new RegExp(this.search_query, "i");
      var displayTransactions = [];
      for (var i = 0; i < this.displayTransactions.length; i++) {
        if (
          (this.displayTransactions[i].from &&
          this.displayTransactions[i].from._id
            ? this.displayTransactions[i].from._id.match(name_re)
            : "") ||
          (this.displayTransactions[i].from &&
          this.displayTransactions[i].from.username
            ? this.displayTransactions[i].from.username.match(name_re)
            : "") ||
          (this.displayTransactions[i].to && this.displayTransactions[i].to._id
            ? this.displayTransactions[i].to._id.match(name_re)
            : "") ||
          (this.displayTransactions[i].to &&
          this.displayTransactions[i].to.username
            ? this.displayTransactions[i].to.username.match(name_re)
            : "") ||
          (this.displayTransactions[i]._id
            ? this.displayTransactions[i]._id.match(name_re)
            : "")
        ) {
          displayTransactions.push(this.displayTransactions[i]);
        }
      }
      return displayTransactions;
    },
    displayTransactions: function () {
      if (this.activeTab == 0) {
        return this.sellTransactions;
      } else {
        return this.buyTransactions;
      }
    },
  },
  methods: {
    moment: function (time) {
      return moment(time);
    },
  },
};
</script>

<style scoped>
.transac {
  display: flex;
  align-items: center;
  justify-content: center;
}
.transac > img {
  height: 2.5rem !important;
}
.suggestBox {
  width: max-content;
  display: flex;
  justify-content: center;
  margin: 0;
}
.box {
  padding: 0.25rem;
  margin-bottom: 0rem !important;
}

.profilWrapper {
  width: 70%;
  margin-right: 0px !important;
}
.sideRecent {
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  margin: auto;
}

.mainSCI > div {
  padding: 0.25rem !important;
  margin-bottom: 0rem;
}
.mainSCI > a {
  padding: 0.25rem !important;
  margin-bottom: 0rem;
}

.activityUser {
  display: flex;
  align-items: center;
  margin-right: 1rem;

  font-size: 1.2rem !important;
}
.activityUser > img {
  margin-right: 5px;
}
.sideRecent > div > div {
  display: flex;
}
.nameProfil {
  display: flex;
  width: 100%;
  color: #0084a4;

  justify-content: flex-start;
}
.nameProfilLink {
  flex-direction: column;
}
.nameProfil > div > span {
  font-size: 1.5rem;
  font-weight: bold;
}
.nameProfil > div {
  display: flex;
  margin-right: 0px;
}
strong {
  color: #192b41;
}

span {
  color: #0084a4;
}
.icon.is-medium {
  width: 3rem;
  height: auto !important;
  display: FLEX;
  align-self: CENTER;
  align-items: center;
}
.icon > img {
  width: auto !important;
  height: 1rem;
}
.icon {
  width: auto !important;
}

.imgProfile {
  height: auto !important;
  width: 60px !important;
  max-width: 100px !important;
}

.columnDir {
  display: flex;
  flex-direction: column;
}
.botcreation {
  overflow-y: scroll;
}
.marginBottom {
  margin-bottom: 0.75rem;
}
.justifyCenter {
  display: flex;
  justify-content: center;
}
.displayFlex {
  justify-content: center;
}
.marginTop {
  margin-top: 5rem;
}
.searchField {
  margin-bottom: 15px;
}
.hero {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 15px;
  background: linear-gradient(90deg, #192b41, #296084);
  margin-top: -1rem;
}

.hero.welcome .title,
.hero.welcome .subtitle {
  color: hsl(192, 17%, 99%);
}

.helloText {
  text-align: left !important;
}
.mediaModalBet {
  max-width: 100%;
}
.hero.is-small .hero-body {
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
}

.hero-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 3rem 1rem;
}

.tile.is-ancestor:last-child {
  margin-bottom: -0.75rem;
}

.tile.is-ancestor {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;
}

.tile {
  align-items: stretch;
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: -webkit-min-content;
  min-height: -moz-min-content;
  min-height: min-content;
}
.has-text-centered {
  vertical-align: middle !important;
}

.insider {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
a {
  color: #192b41;
}
#no {
  text-align: CENTER;
  margin-top: 5%;
  font-weight: bold;
  color: #192b41;
}
.main {
  background-color: #eef1f7 !important;
  padding: 7rem 1.5rem;
}
.container {
  display: flex;
}

.navbar.is-dark {
  background-color: #192b41 !important;
  color: #eef1f7 !important;
}

.navbar-item.is-tab.is-active {
  background-color: transparent;
  border-bottom-color: #eef1f7 !important;
  border-bottom-style: solid !important;
  border-bottom-width: 3px !important;
  color: #eef1f7 !important;
  padding-bottom: calc(0.5rem - 3px) !important;
}

.userWrapper {
  display: flex;
  flex-direction: column;
}
.image {
  margin: auto;
}

@media (max-width: 1047px) {
  .main {
    padding-top: 0.5rem !important;
  }
  .icon {
    height: 1.5em !important;
    width: 1.5em !important;
  }
  .control {
    height: 30px !important;
  }
  .navbar.is-dark {
    margin-bottom: 3% !important;
  }
}
</style>
