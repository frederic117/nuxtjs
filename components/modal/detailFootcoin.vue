<template>
  <div class="mediaModalBet">
    <h1 class="modalTitleBet has-text-centered">
      <strong class="modalTitleBetH1 has-text-contest">
        {{
          langSelected === "EN"
            ? "What is FootCoin?"
            : "Qu'est ce que le FootCoin ?"
        }}</strong
      >
    </h1>
    <div class="modalBetWrapper">
      <h2 class="explanationBet">
        {{ langSelected === "EN" ? "The" : "Le" }}
        <strong class="has-text-contest">FootCoin</strong
        >{{
          langSelected === "EN"
            ? " is the currency used on footfoot.co"
            : " est la monnaie qui a cours sur footfoot.co"
        }}

        <br />
        {{
          langSelected === "EN"
            ? "It allows you to register for paid contests and build up a prize pool that the winners of each round will share!"
            : "Elle te permet de t'inscrire aux contests payants et de constituer une cagnotte que les vainqueurs de chaque round se partageront !"
        }}

        <br />
        <br />
        <h3 class="has-text-contest is-bold">
          {{
            langSelected === "EN"
              ? "How much is 1 FootCoin worth?"
              : "Quelle est la valeur d' 1 FootCoin ?"
          }}
        </h3>
        <strong class="is-bold has-text-contest">1 F$ = 0.10€</strong>. <br />{{
          langSelected === "EN"
            ? "When you withdraw your footcoins, the money is usually paid within 7 business days."
            : "Lors du retrait de tes footcoins, l'argent est versé habituellement sous 7 jours ouvrés."
        }}

        <br />{{
          langSelected === "EN"
            ? "The transactions are carried out by"
            : "Les transactions sont effectuées par"
        }}

        <a href="https://stripe.com/fr" target="_blank" class="has-text-info"
          >Stripe</a
        >.
      </h2>
    </div>
    <div class="betButton">
      <p
        class="button is-medium has-text-contest"
        type="button"
        @click="closedetailFootcoinModal()"
      >
        {{ langSelected === "EN" ? "Back" : "Retour" }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {};
  },
  destroyed() {},
  props: {},
  watch: {},
  methods: {
    closedetailFootcoinModal() {
      this.$emit("closedetailFootcoinModal");
    },
  },

  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
  },
};
</script>

<style scoped>
.explanationBet {
  font-size: 1rem;
  padding: 10px;
}
.modalTitleBetH1 {
  font-size: 2rem;
}
.modalTitleBet {
  margin-bottom: 1rem;
}
.mediaModalBet {
  padding: 25px !important;
}
.betButton {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-self: center;
}
@media screen and (max-width: 768px) {
  .mediaModalBet {
    padding: 5px !important;
  }
  .modalTitleBetH1 {
    font-size: 1.5rem;
  }
  .explanationBet {
    padding: 5px;
  }
}
</style>
