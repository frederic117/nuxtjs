<template>
  <div class="mediaModalBet">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :canCancel="false"
    ></b-loading>
    <h1 class="modalTitleBet">
      <strong class="modalTitleBetH1 has-text-contest"
        >{{ langSelected === "EN" ? "buy FootCoins" : "achat de FootCoins" }}
      </strong>
      <span class="has-text-primary is-italic">
        {{ langSelected === "EN" ? "you own" : "tu possèdes" }}
        <strong>{{ footCoins ? footCoins.toLocaleString("fr") : 0 }} F$</strong>
      </span>
    </h1>

    <div class="modalBetWrapper">
      <h2>
        {{
          langSelected === "EN"
            ? "How many FootCoins would you like to purchase?"
            : "Combien de FootCoins souhaites-tu acheter ?"
        }}
      </h2>
      <div class="block has-text-contest">
        <div>
          <input
            step="1"
            v-model="numberOfFootcoins"
            class="scoreModal"
            type="number"
            min="50"
            placeholder="50"
          />
          {{ langSelected === "EN" ? "for" : "pour" }}
          {{ euroSpend ? euroSpend.toLocaleString("fr") : 0 }}€
        </div>
      </div>
      <h2>
        {{
          langSelected === "EN"
            ? "Payment Information"
            : "Informations de paiement"
        }}
        (powered by
        <a href="https://stripe.com/fr" target="_blank" class="has-text-info"
          >Stripe</a
        >)
      </h2>
      <div ref="card"></div>
      <div v-if="completeCardOk" class="stripeButton">
        <button class="button is-large buttonLogin" v-on:click="submit">
          {{ langSelected === "EN" ? "Pay" : "Payer" }}
          {{ euroSpend ? euroSpend.toLocaleString("fr") : "" }} €
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  sendIntentPayment,
  buyFootcoin,
  getuserfootCoins,
} from "@/server/apiContest";
export default {
  mounted() {
    if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
      getuserfootCoins(this.$store.state.auth.user._id).then((footCoins) => {
        this.footCoins = footCoins;
      });
      if (this.betValue) {
        this.numberOfFootcoins = this.betValue;
      }
      this.options.email = this.$store.state.auth.user.email;
      this.stripePublishKey =
        process.env.NODE_ENV != "production"
          ? "pk_test_gsnUcVGYecfIcjUduHbMh56e"
          : "pk_live_aJzcFXmfkxnET8gfOObIJ1lm";
      setTimeout(() => {
        this.mountStripe();
      }, 10);
    } else {
      this.$router.push("/");
    }
  },
  data() {
    return {
      isLoading: false,
      footCoins: "",
      options: {
        image: "https://www.footfoot.co/miseLogo.png",
        currency: "EUR",
        locale: "fr",
        email: "",
      },
      stripePublishKey: "",
      stripe: "",
      elements: "",
      card: "",
      token: "",
      completeCardOk: false,
      numberOfFootcoins: 100,
    };
  },
  destroyed() {
    this.stripe = "";
    this.elements = "";
    this.card = "";
  },
  props: {
    betValue: "",
  },
  watch: {},
  computed: {
    euroSpend: function () {
      if (Number(this.numberOfFootcoins)) {
        return this.numberOfFootcoins / 10;
      }
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
  },
  methods: {
    mountStripe() {
      this.stripe = Stripe(this.stripePublishKey);
      this.elements = this.stripe.elements();
      var style = {
        base: {
          color: "#32325d",
        },
      };

      this.card = this.elements.create("card", {
        style: style,
      });
      this.card.mount(this.$refs.card);
      this.card.addEventListener("change", (event) => {
        this.completeCardOk = event.complete ? true : false;
        if (this.completeCardOk == true) {
        }
      });
    },
    submit() {
      if (Number(this.euroSpend) < 5) {
        this.$buefy.dialog.alert(
          "Le minimum de F$ que tu peux acheter est de 50 pour 5€"
        );
        this.numberOfFootcoins = 50;
      } else {
        if (this.isLoading == false) {
          this.isLoading = true;
          this.stripe.createToken(this.card).then((result) => {
            if (result.error) {
              this.isLoading = false;
              this.$buefy.dialog.alert(
                `<div>Le paiement n'a pu etre effectué !<br/>
								La CB n'a pas été débitée.</div>`
              );
            } else {
              this.sendTokenToServer(result.token);
              ////handle stripe charge logic here.
            }
          });
        }
      }
    },
    sendTokenToServer(token) {
      sendIntentPayment({
        amount: Number(this.euroSpend) * 100,
        payment_method: token.card.id,
      }).then((resp) => {
        if (!resp) {
          this.isLoading = false;
          this.$buefy.dialog.alert(
            `<div>Le paiement n'a pu etre effectué !<br/>
								La CB n'a pas été débitée.</div>`
          );
        } else {
          this.client_secret = resp.client_secret;
          let payment_method = {
            card: this.card,
            billing_details: {
              email: this.$store.state.auth.user.email,
            },
          };

          this.stripe
            .confirmCardPayment(this.client_secret, { payment_method })
            .then((result) => {
              if (result.error) {
                this.isLoading = false;
                this.$buefy.dialog.alert(
                  `<div>Le paiement n'a pu etre effectué !<br/>
								La CB n'a pas été débitée.</div><br/>
								<span class='is-italic'>${result.error.code}</span>`
                );
                ////Show error to your customer (e.g., insufficient funds)
              } else {
                ////The payment has been processed!
                if (result.paymentIntent.status === "succeeded") {
                  let query = {};
                  query.amount = Number(this.euroSpend) * 100;
                  query.nbFootCoins = Number(this.numberOfFootcoins);
                  query.transactionRef = this.client_secret;
                  buyFootcoin(query).then((resp) => {
                    this.isLoading = false;
                    if (!this.$route.path.includes("contest/create")) {
                      this.$buefy.dialog.alert(
                        `Félicitations, ton compte a été crédité !<br> BONS PRONOS`
                      );
                    }

                    this.$emit("closeAchat");
                  });
                  ////Show a success message to your customer
                  ////There's a risk of the customer closing the window before callback
                  ////execution. Set up a webhook or plugin to listen for the
                  ////payment_intent.succeeded event that handles any business critical
                  ////post-payment actions.
                }
              }
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.scoreModal {
  margin-right: 0.5rem;
  max-width: 8rem;
  align-self: CENTER;
  position: relative;
  color: #ff7d00 !important;
}
.mediaModalBet {
  background-color: #eef1f7;
  max-width: 500px;
}
.block {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
}

.block > div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.75rem;
  font-size: 1.5rem !important;
}
.selectFootcoin {
  width: 40%;
  font-size: 1.2rem;
}
.buttonLogin {
  min-width: 25%;
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #ff7d00 !important;
  background-color: #ff7d00 !important;
  color: #eef1f7 !important;
}

.buttonLogin:focus,
.buttonLogin:hover {
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #ff7d00 !important;
  background-color: #eef1f7 !important;
  color: #ff7d00 !important;
}
.modalBetWrapper {
  display: flex;
  flex-direction: column;
}

.modalTitleBet {
  text-align: center;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
}

.modalTitleBetH1 {
  font-size: 2rem;
}

div {
  font-size: 1.2rem !important;
}

.has-text-contest {
  font-weight: bold;
}

div {
  font-size: 1.2rem !important;
}

h1 {
  padding-top: 1rem;
  font-size: 1.3rem !important;
}
h2 {
  font-weight: bold;
  font-size: 1.2rem !important;
}
.stripeButton {
  display: FLEX;
  justify-content: CENTER;
  margin-top: 1rem;
}
.StripeElement {
  box-sizing: border-box;
  height: 40px;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;
  box-shadow: 2px 2px 6px #cacdd2, -2px -2px 6px #ffffff !important;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

@media (max-width: 1047px) {
  h2 {
    font-weight: bold;
    font-size: 1rem !important;
  }
  .selectFootcoin {
    width: 40%;
    font-size: 1rem;
  }

  .modalTitleBetH1 {
    font-size: 1.5rem;
  }

  .modalTitleBet {
    margin-bottom: 0rem;
  }
  .modalTitleBet > .is-italic {
    font-size: 1rem !important;
  }

  .is-large {
    font-size: 0.8rem !important;
  }

  .buttonLogin {
    font-size: 1.2rem !important;
  }

  div {
    font-size: 0.8rem !important;
  }
}
</style>
