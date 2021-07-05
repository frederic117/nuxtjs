<template>
  <div class="mediaModalBet">
    <h1 class="modalTitleBet has-text-centered">
      <strong class="modalTitleBetH1 has-text-contest">
        Bienvenue sur
        <img
          loading="lazy"
          class="logoInsiders"
          src="~/assets/images/logo.png"
          alt="footfootLogo"
        />
      </strong>
    </h1>
    <div class="modalBetWrapper">
      <h1 class="is-wc">Du jeu. De l'enjeu. Défis tes potes pour de vrai.</h1>
      <h2 class="explanationBet">
        <strong class="has-text-contest">footfoot</strong> est le jeu de foot
        ultime ⚽⚽⚽ <br />Grâce au
        <strong class="has-text-contest">contest</strong> tu peux défier tes
        potes et montrer qui est le BOSS <br />Un
        <strong class="has-text-contest">contest</strong> c'est un groupe de
        potes, une cagnotte 💰 et une liste de matchs choisis par l'organisateur
        <br />Ensuite, chacun fait ses
        <strong class="has-text-contest">pronos</strong> (avec des mises comme
        au poker), et à la fin les meilleurs se partagent le pot 💶💶💶
        <br />⚠️⚡🚨 jeu très addictif .... Si tes potes sont meilleurs que toi
        sur le ⚽, ne joue pas 😜 Chambrage garanti <br />Dès l'inscription tu
        rejoins un
        <strong class="has-text-contest">contest</strong> public...Pour tester
        et te tester avant de passer aux choses sérieuses 🤑
      </h2>
    </div>
    <div @click="signup" class="betButton">
      <nuxt-link :to="`/signup`">
        <p class="button is-medium is-contest" type="button">je m'inscris</p>
      </nuxt-link>
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
    signup() {
      if (this.$route.path.includes("inscription")) {
        this.$store.commit(
          "var/contestInscription",
          this.$route.params.contestId
        );
      }
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
.is-wc {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}
.explanationBet {
  font-size: 1rem;
}
.modalTitleBetH1 {
  display: flex;
  align-items: center;
  justify-content: center;
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
.logoInsiders {
  height: 50px;
  width: auto;
}
@media screen and (max-width: 768px) {
  .logoInsiders {
    height: 40px;
    width: auto;
  }
  .mediaModalBet {
    padding: 5px !important;
  }
  .is-wc {
    font-size: 1.1rem;
    font-weight: bold;
  }
  .modalTitleBetH1 {
    font-size: 1.5rem;
  }
}
</style>






