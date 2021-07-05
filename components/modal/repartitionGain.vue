<template>
  <div class="mediaModalBet">
    <h1
      v-if="contest && contest.contest && contest.contest.adminOfContest"
      class="modalTitleBet"
    >
      <strong class="modalTitleBetH1 has-text-contest"
        >{{ contest.contest.adminOfContest.username }}
        {{ langSelected == "EN" ? "has invited:" : "a invité :" }}
        {{ nbrePlayers }} {{ langSelected == "EN" ? "palyers:" : "joueurs" }}
        <br />
        {{
          langSelected == "EN"
            ? "Here is the distribution of the prize pool:"
            : "Voici la répartition de la cagnotte :"
        }}
      </strong>
    </h1>
    <h1 v-else class="modalTitleBet">
      <strong class="modalTitleBetH1 has-text-contest"
        >{{
          langSelected == "EN"
            ? "Distribution of prize pool"
            : "Répartition de la cagnotte"
        }}
      </strong>
    </h1>

    <div class="modalBetWrapper">
      <b-table
        class="simulateWrapper"
        v-if="dataForTab.length > 0"
        :data="dataForTab"
        :hoverable="true"
        :striped="true"
        :mobile-cards="false"
        default-sort-direction="asc"
        default-sort="range"
        :paginated="true"
        :per-page="10"
        :pagination-simple="false"
      >
        <template slot-scope="props">
          <b-table-column
            centered
            field="range"
            :label="`${langSelected == 'EN' ? 'Rank' : 'Rang'}`"
            sortable
          >
            <div class="teamNameLogo">
              <strong class="teamNameStrong">{{ props.row.range }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            centered
            field="win"
            :label="`${
              langSelected == 'EN' ? 'Earned amount' : 'Montant gagné'
            }`"
            meta="mg"
            sortable
          >
            <div class="teamNameLogo">
              <strong class="teamNameStrong has-text-contest"
                >{{
                  props.row.win ? props.row.win.toLocaleString("fr") : ""
                }}
                F$</strong
              >
            </div>
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>...loading</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
    <div
      v-if="
        !$route.path.includes('rules') && !$route.path.includes('inscription')
      "
      class="betButton"
    >
      <p
        class="button is-medium has-text-contest"
        type="button"
        @click="closedetail()"
      >
        {{ langSelected == "EN" ? "Back" : "Retour" }}
      </p>
    </div>
  </div>
</template>

<script>
import { testSimulatePriceCOntest } from "@/server/apiAdmin";
export default {
  data() {
    return {
      dataForTab: [],
      AmountPlayByPlayer: "",
    };
  },
  props: {
    nbrePlayers: "",
    footcoinPlayed: "",
    contest: "",
  },
  computed: {
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  watch: {
    footcoinPlayed: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        this.AmountPlayByPlayer = Number(this.footcoinPlayed);
        this.sendTestSimulate();
      },
    },
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
  },
  methods: {
    closedetail() {
      this.$emit("closeRepartitiongain");
    },
    sendTestSimulate() {
      this.dataForTab = [];
      if (this.contest && this.contest.isPublic) {
        this.AmountPlayByPlayer = 10;
      }
      if (this.contest && this.contest.isSpecialEvent) {
        this.AmountPlayByPlayer = 500;
      }

      testSimulatePriceCOntest(
        this.nbrePlayers,
        this.AmountPlayByPlayer,
        this.contest && this.contest.isSpecialEvent
          ? this.contest.isSpecialEvent
          : false,
        this.contest && this.contest.isPublic ? this.contest.isPublic : false
      ).then((resp) => {
        let priceDistribution = resp.priceDistribution;
        for (let i = 0; i < priceDistribution.length; i++) {
          let objToPush = {};
          objToPush = {
            win: priceDistribution[i],
            qty: priceDistribution[i],
            range: i + 1,
          };
          this.dataForTab.push(objToPush);
        }
      });
    },
  },
};
</script>

<style scoped>
.teamNameStrong {
  font-size: 1.2rem;
}

h1 {
  font-weight: bold !important;
  text-align: center;
}

.teamNameLogo {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
}

.modalTitleBetH1 {
  font-size: 2rem;
}
.modalTitleBet {
  margin-bottom: 1rem;
}
.mediaModalBet {
  padding: 5px !important;
}
.betButton {
  display: flex;
  justify-content: center;
  align-self: center;
}
@media screen and (max-width: 768px) {
  .mediaModalBet {
    padding: 5px !important;
  }
  .modalTitleBetH1 {
    font-size: 1.2rem;
  }
  .teamNameStrong {
    font-size: 1rem;
  }
}
</style>