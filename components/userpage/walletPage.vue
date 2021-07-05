<template>
  <div class="box">
    <b-loading
      :is-full-page="true"
      :active.sync="loading"
      :canCancel="false"
    ></b-loading>
    <h1 class="is-bold is-size-3 has-text-contest has-text-centered">
      FootCoin :
      <strong
        class="has-text-success"
        :class="{
          'has-text-success': Number(footCoins) > 0,
          'has-text-danger': Number(footCoins) == 0,
        }"
        >{{
          Number(footCoins) > 0 ? footCoins.toLocaleString("fr") : 0
        }}
        F$</strong
      >

      <i
        @click="detailFootcoin"
        class="pointer fa fa-info-circle"
        aria-hidden="true"
      ></i>
    </h1>
    <div class="displayFlex buttonWrap">
      <button @click="iwantFootcoin" class="button is-wallet is-fullwidth">
        <img
          loading="lazy"
          class="is-15 buyF"
          src="~assets/images/buyF.png"
          alt="buy"
        />
        {{ langSelected === "EN" ? "Buy " : "Acheter" }}</button
      >&nbsp
      <button
        @click="iwantTowithDraw"
        class="button is-wallet is-outlined is-fullwidth"
      >
        {{ langSelected === "EN" ? "Withdraw " : "Retirer" }}
        <img
          loading="lazy"
          class="is-15 cashOut"
          src="~assets/images/cashOut.png"
          alt="withdraw"
        />
      </button>
    </div>
    <div>
      <div
        v-for="(transaction, index) in transactions"
        :key="index"
        class="masterName box"
      >
        <div>
          <img
            v-if="transaction.action === 'sell'"
            loading="lazy"
            class="podiumMc"
            src="~assets/images/cashOut.png"
            alt="cashOut"
          />
          <img
            v-else-if="transaction.action === 'buy'"
            loading="lazy"
            class="podiumMc"
            src="~assets/images/buyF.png"
            alt="buy"
          />
          <img
            @click="goToround(transaction.round._id)"
            v-else
            loading="lazy"
            class="pointer podiumMc contestPic"
            :src="
              transaction.round &&
              transaction.round.contest &&
              transaction.round.contest.image
                ? transaction.round.contest.image
                : 'https://www.footfoot.co/miseLogo.png'
            "
            alt="contestImg"
          />
          <p class="longNameTitle is-5">
            <strong v-if="transaction.action === 'sell'" class="is-primary"
              >{{
                langSelected === "EN" ? "Withdraw" : "Retrait de"
              }}
              FootCoins</strong
            >
            <strong v-if="transaction.action === 'buy'" class="is-primary"
              >{{
                langSelected === "EN" ? "Buy" : "Achat de"
              }}
              FootCoins</strong
            >
            <strong
              @click="goToround(transaction.round._id)"
              v-if="transaction.action === 'transfert out'"
              class="pointer is-primary"
              >{{
                langSelected === "EN" ? "Inscription to" : "Inscription au"
              }}
              {{
                transaction.round ? "round " + transaction.round.name : ""
              }}</strong
            >
            <strong
              @click="goToround(transaction.round._id)"
              v-if="
                transaction.action === 'transfert in' &&
                transaction.designation.includes('Organisation')
              "
              class="pointer is-primary"
              >Bonus pour l'organisation
              {{
                transaction.round ? "du round " + transaction.round.name : ""
              }}</strong
            >
            <strong
              @click="goToround(transaction.round._id)"
              v-else-if="transaction.action === 'transfert in'"
              class="pointer is-primary"
            >
              {{ transaction.ranking }}
              <sup v-if="transaction.ranking == 1">{{
                langSelected === "EN" ? "st" : "er"
              }}</sup>
              <sup v-else-if="transaction.ranking == 2">{{
                langSelected === "EN" ? "nd" : "ème"
              }}</sup>
              <sup v-else-if="transaction.ranking == 3">{{
                langSelected === "EN" ? "rd" : "ème"
              }}</sup>
              <sup v-else>{{ langSelected === "EN" ? "th" : "ème" }}</sup>
              &nbsp{{ langSelected === "EN" ? "at " : "au " }} round
              {{ transaction.round.name }}
            </strong>
            <span
              v-if="
                transaction.action === 'sell' || transaction.action === 'buy'
              "
              class="is-italic"
              >{{
                langSelected === "EN"
                  ? "for an amount of"
                  : "pour un montant de"
              }}
              {{ (Number(transaction.amount) / 100).toLocaleString("fr") }}
              €</span
            >
            <span
              @click="goToround(transaction.round._id)"
              v-if="
                transaction.action === 'transfert out' ||
                transaction.action === 'transfert in'
              "
              class="is-italic has-text-contest"
              >{{
                transaction.round &&
                transaction.round.contest &&
                transaction.round.contest.name
                  ? transaction.round.contest.name
                  : ""
              }}</span
            >
          </p>
        </div>
        <div class="lossWinPoints is-5">
          <strong v-if="transaction.action === 'sell'" class="has-text-danger"
            >{{ transaction.footCoins.toLocaleString("fr") }} F$</strong
          >
          <strong v-if="transaction.action === 'buy'" class="has-text-green"
            >+{{ transaction.footCoins.toLocaleString("fr") }} F$</strong
          >
          <strong
            @click="goToround(transaction.round._id)"
            v-if="transaction.action === 'transfert out'"
            class="pointer has-text-danger"
            >{{ transaction.footCoins.toLocaleString("fr") }} F$</strong
          >
          <strong
            @click="goToround(transaction.round._id)"
            v-if="transaction.action === 'transfert in'"
            class="pointer has-text-green"
            >+{{ transaction.footCoins.toLocaleString("fr") }} F$</strong
          >
          <span class="is-italic is-greyLiht">{{
            moment(transaction.created_at).format("DD/MM/YYYY")
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
    } else {
      this.$router.push("/");
    }
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
    footCoins: "",
    transactions: Array,
  },
  methods: {
    goToround(event) {
      this.$router.push(`/contest/${event}`);
    },
    iwantTowithDraw() {
      this.$emit("iwantTowithDraw");
    },
    iwantFootcoin() {
      this.$emit("iwantFootcoin");
    },
    detailFootcoin() {
      this.$emit("detailFootcoin");
    },
    moment: function (time) {
      return moment(time);
    },
  },
};
</script>

<style scoped>
.contestPic {
  border: 2px solid #ff7d00 !important;
  border-radius: 10%;
}
.fa-info-circle {
  color: lightgray !important;
}
.buttonWrap {
  margin-bottom: 15px;
  margin-top: 5px;
}
.is-wallet {
  background-color: white;
  border-color: #ff7d00;
  color: #ff7d00;
}
.box {
  padding: 0.5rem;
}
.podiumMc {
  height: 40px;
  padding: 0rem;
  margin-right: 10px;
}
.masterName {
  background-color: #eef1f7 !important;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: space-between;
}
.masterName > div {
  display: flex;
  align-items: center;
}

.longNameTitle {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.lossWinPoints {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.longNameTitle > strong {
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
}
.longNameTitle > span {
  font-size: 1rem;
  display: flex;
  justify-content: center;
}
.lossWinPoints > strong {
  font-size: 1.5rem;
  display: flex;
  justify-content: flex-end;
}
.lossWinPoints > span {
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
}
.is-15 {
  height: 25px;
  width: auto;
}
.buyF {
  margin-right: 5px;
}
.cashOut {
  margin-left: 5px;
}
.is-greyLiht {
  font-size: 0.8rem !important;
}
</style>
