<template>
  <div class="column is-3 sideRecent mainSCI">
    <div class="box">
      <p v-if="langSelected === 'EN'" class="title is-5 has-text-contest">
        my forecast
      </p>
      <p v-else class="title is-5 has-text-contest">mes pronos</p>
      <hr />
      <onboarding-unconnect
        :isnotModal="true"
        v-if="firstBet"
      ></onboarding-unconnect>

      <div v-else class>
        <strong v-if="langSelected === 'EN'" class="modalTitleBetH1">
          <strong class="contestName">FREE contest Euro 2020 </strong><br />
          <strong @click="detailFootcoinActiv" class="has-text-contest">
            500 FOOTCOINS to win
          </strong>
          <i
            @click="detailFootcoinActiv"
            class="pointer fa fa-info-circle"
            aria-hidden="true"
          ></i>
        </strong>
        <strong v-else class="modalTitleBetH1">
          <strong class="contestName">concours GRATUIT Euro 2020</strong><br />

          <strong @click="detailFootcoinActiv" class="has-text-contest">
            500 FOOTCOINS à gagner
          </strong>
          <i
            @click="detailFootcoinActiv"
            class="pointer fa fa-info-circle"
            aria-hidden="true"
          ></i>
        </strong>
        <div class="login">
          <p
            v-if="langSelected === 'EN'"
            class="button is-contest"
            type="button"
            @click="SignupModal"
          >
            join
          </p>
          <p
            v-else
            class="button is-contest"
            type="button"
            @click="SignupModal"
          >
            rejoindre
          </p>
        </div>
      </div>
    </div>
    <b-modal :active.sync="detailFootcoinModal">
      <detail-footcoin
        @closedetailFootcoinModal="closedetailFootcoinModal"
      ></detail-footcoin>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailFootcoinModal: false,
    };
  },

  computed: {
    firstBet() {
      return this.$store.state.var.firstBet;
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
  },
  components: {
    detailFootcoin: () => import("@/components/modal/detailFootcoin"),
    onboardingUnconnect: () => import("@/components/modal/onboardingUnconnect"),
  },
  methods: {
    SignupModal() {
      this.$router.push("/signup");
    },
    detailFootcoinActiv() {
      this.detailFootcoinModal = true;
    },
    closedetailFootcoinModal() {
      this.detailFootcoinModal = false;
    },
  },
};
</script>
<style scoped>
.button {
  font-size: 1.5rem;
}
.contestName {
  font-size: 1.75rem;
  color: #0084a4 !important;
}
.modalTitleBetH1 {
  font-size: 1.75rem;
}
.fa-info-circle {
  color: lightgray !important;
}
.profile-card {
  background-color: #eef1f7;
}
.has-text-contest {
  margin-bottom: 0px !important;
}
.login {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>