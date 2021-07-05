s<template>
  <div class="mediaModalBet">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :canCancel="false"
    ></b-loading>
    <h1 class="modalTitleBet">
      <strong class="modalTitleBetH1 has-text-contest"
        >{{
          langSelected === "EN"
            ? "you want to withdraw FootCoins"
            : "tu veux retirer des FootCoins"
        }}
      </strong>
      <span v-if="Number(footCoins) < 300" class="is-size-7">
        {{ langSelected === "EN" ? "you have" : "tu possèdes" }}
        <strong class="is-bold has-text-contest">{{ footCoins }} F$,</strong>
        <span
          >{{
            langSelected === "EN" ? "you need at least" : "il te faut au moins"
          }}
        </span>
        <strong class="is-bold has-text-contest">300 F$</strong>
        <span
          >{{
            langSelected === "EN"
              ? "in order to make a withdrawal"
              : "pour pouvoir effectuer un retrait"
          }}
        </span>
      </span>
      <span v-else class="is-italic is-size-7">
        {{
          langSelected === "EN"
            ? "you can withdraw a minimum of"
            : "tu peux retirer un minimum de"
        }}

        <strong class="is-bold has-text-contest">300 F$</strong>
        <span v-if="footCoins && Number(footCoins) > 300"
          >{{ langSelected === "EN" ? "and a maximum of" : "et un maximum de" }}
        </span>
        <strong
          v-if="footCoins && Number(footCoins) > 300"
          class="is-bold has-text-contest"
          >{{ footCoins.toLocaleString("fr") }} F$</strong
        >
      </span>
    </h1>

    <div class="modalBetWrapper">
      <h2>
        {{
          langSelected === "EN"
            ? "How many FootCoins would you like to withdraw?"
            : "combien de FootCoins souhaites-tu retirer ?"
        }}
      </h2>
      <div class="block has-text-contest">
        <div>
          <input
            step="10"
            v-model="withdrawFootCoin"
            class="footcoinInput"
            type="number"
            min="300"
            placeholder="300"
          />
          {{ langSelected === "EN" ? "for " : "pour " }}
          {{ Number(euroFootcoin).toLocaleString("fr") }} €
          <i
            @click="detailFootcoin"
            class="pointer fa fa-info-circle"
            aria-hidden="true"
          ></i>
        </div>
      </div>
      <div class>
        <b-field
          class="marginBotom"
          :label="`${langSelected === 'EN' ? 'your lastname' : 'ton nom'}`"
        >
          <b-input v-model="withdrawName" placeholder="Gaucho"></b-input>
        </b-field>

        <b-field
          class="marginBotom"
          :label="`${langSelected === 'EN' ? 'your firstname' : 'ton prénom'}`"
        >
          <b-input
            v-model="withdrawFirstname"
            placeholder="Ronaldinho"
          ></b-input>
        </b-field>

        <b-field
          class="marginBotom"
          :label="`${langSelected === 'EN' ? 'your BIC' : 'ton BIC'}`"
        >
          <b-input v-model="withdrawBic" placeholder="AGRIFRPP"></b-input>
        </b-field>

        <b-field
          class="marginBotom"
          :label="`${langSelected === 'EN' ? 'your IBAN' : 'ton IBAN'}`"
        >
          <b-input
            v-model="withdrawIban"
            placeholder="FR1420041010050500013M02606"
          ></b-input>
        </b-field>
        <b-field
          class
          :label="`${
            langSelected === 'EN' ? 'photo of your rib' : 'photo de ton rib'
          }`"
        >
          <div v-if="pdfToImage || withdrawRibdoc" class="displayUploadImage">
            <p @click="seeRibActiv" class="button is-outlined is-success">
              {{ langSelected === "EN" ? "see RIB" : "voir le RIB" }}
            </p>
          </div>
          <div v-else class="level">
            <a class="options-img-video">
              <input
                type="file"
                class="hide inputfile"
                id="upload"
                @change="onFileChange"
              />
              <label
                v-if="!withdrawRibdoc || !pdfToImage"
                class="chartIcon pointer"
                for="upload"
              >
                <p class="button text-img-options">
                  {{
                    langSelected === "EN" ? "upload your RIB" : "charge le RIB"
                  }}
                </p>
              </label>
            </a>
          </div>
        </b-field>
      </div>

      <div class="stripeButton">
        <button class="button is-large buttonLogin" @click="submit">
          {{ langSelected === "EN" ? "withdraw " : "retirer " }}
          {{ Number(euroFootcoin).toLocaleString("fr") }} €
        </button>
      </div>
    </div>
    <b-modal has-modal-card :active.sync="seeRib">
      <div class="modal-card ribimg" style="width: auto">
        <header class="modal-card-head">
          {{ langSelected === "EN" ? "your RIB" : "ton RIB" }}
        </header>
        <section class="modal-card-body">
          <div class="media">
            <div v-if="pdfToImage" class="displayUploadImage">
              <div>
                <client-only>
                  <pdf-pageload
                    id="imageToUpload"
                    @imgReady="transformToImg($event)"
                    class="pdfImage"
                    :pdfToLoad="pdfToImage"
                  ></pdf-pageload>
                </client-only>
              </div>
            </div>
            <div class="displayUploadImage" v-else-if="withdrawRibdoc">
              <div>
                <img
                  loading="lazy"
                  v-if="withdrawRibdoc.toLowerCase().includes('base64')"
                  :src="withdrawRibdoc"
                />
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot okAddTeam">
          <button class="button is-outlined is-danger" @click="removeImage">
            {{
              langSelected === "EN" ? "remove the picture" : "retirer l'image"
            }}
          </button>
          <button @click="closeModalRib" class="button is-success">
            {{ langSelected === "EN" ? "close" : "fermer" }}
          </button>
        </footer>
      </div>
    </b-modal>
    <b-modal :active.sync="detailFootcoinModal">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head chartIcon titleVideo">
          <h2 class="is-size-5">
            {{
              langSelected === "EN"
                ? "detail of a $300 withdrawal"
                : "détail d'un retrait de 300 F$"
            }}
          </h2>
        </header>
        <section class="modal-card-body">
          <h2 class="is-size-7">
            {{
              langSelected === "EN"
                ? "value of 300 F$ = 30 €"
                : "valeur de 300 F$ = 30 €"
            }}
          </h2>
          <ul>
            <li>
              {{
                langSelected === "EN"
                  ? "- bank fees = 3€"
                  : "- frais bancaire = 3€"
              }}
            </li>
            <li>
              {{ langSelected === "EN" ? "- taxes = 3€" : "- taxes = 3€" }}
            </li>
            <li>
              {{
                langSelected === "EN"
                  ? "- running costs of your favorite site = 3€"
                  : "- frais de fonctionnement de ton site préféré = 3€"
              }}
            </li>
          </ul>
          <h1 class="is-size-5">
            {{
              langSelected === "EN"
                ? "with a withdrawal of 300 F$ you receive"
                : "lors d'un retrait de 300 F$ tu reçois"
            }}

            <strong class="has-text-contest">21 €</strong>
          </h1>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="closedetailFootcoin">
            {{ langSelected === "EN" ? "close" : "fermer" }}
          </button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  isValidBIC,
  isValidIBAN,
  electronicFormatIBAN,
} from "@/server/checkIban";
import { getuserfootCoins, sellFootcoin } from "@/server/apiContest";
export default {
  mounted() {
    if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
      getuserfootCoins(this.$store.state.auth.user._id).then((footCoins) => {
        this.footCoins = footCoins;
      });
    } else {
      this.$router.push("/");
    }
  },
  data() {
    return {
      pdfToImage: "",
      withdrawFirstname: "",
      withdrawName: "",
      withdrawRibdoc: "",
      withdrawIban: "",
      withdrawBic: "",
      isLoading: false,
      footCoins: "",
      withdrawFootCoin: "300",
      seeRib: false,
      detailFootcoinModal: false,
    };
  },
  components: {
    PlaceholderComponent: () =>
      import("@/components/contest/PlaceholderComponent"),
    pdfPage: () => {
      if (!process.client) {
        return {
          component: PlaceholderComponent,
        };
      } else {
        return {
          component: import("@/components/contest/pdfPage"),
        };
      }
    },
    pdfPageload: () => {
      if (!process.client) {
        return {
          component: PlaceholderComponent,
        };
      } else {
        return {
          component: import("@/components/contest/pdfPageload"),
        };
      }
    },
  },
  computed: {
    euroFootcoin: function () {
      return (
        Math.floor(((Number(this.withdrawFootCoin) * 0.7) / 10) * 100) / 100
      );
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
  },
  props: {},
  watch: {},
  methods: {
    detailFootcoin() {
      this.detailFootcoinModal = true;
    },
    closedetailFootcoin() {
      this.detailFootcoinModal = false;
    },
    closeModalRib() {
      this.seeRib = false;
    },
    seeRibActiv() {
      if (this.pdfToImage || this.withdrawRibdoc) {
        this.seeRib = true;
      } else {
        this.$buefy.dialog.alert(
          "ton rib est obligatoire pour retirer des F$."
        );
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      } else if (files[0].name.toLowerCase().includes(".pdf")) {
        var withdrawRibdoc = new Image();
        var reader = new FileReader();
        var vm = this;
        reader.onload = (e) => {
          vm.pdfToImage = e.target.result;
        };
        reader.readAsDataURL(files[0], 0);
      } else if (
        files[0].name.toLowerCase().includes(".jpeg") ||
        files[0].name.toLowerCase().includes(".png") ||
        files[0].name.toLowerCase().includes(".jpg") ||
        files[0].name.toLowerCase().includes(".gif") ||
        files[0].name.toLowerCase().includes(".svg") ||
        files[0].name.toLowerCase().includes(".bmp") ||
        files[0].name.toLowerCase().includes(".jfif")
      ) {
        this.createImage(files[0]);
      } else {
        this.$buefy.dialog.alert("Ce format n'est pas supporté");
      }
    },
    createImage(file) {
      var withdrawRibdoc = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.withdrawRibdoc = e.target.result;
      };

      reader.readAsDataURL(file, 0);
    },
    transformToImg(event) {
      this.withdrawRibdoc = event[0].toDataURL("image/jpeg");
    },
    removeImage: function (e) {
      this.seeRib = false;
      this.pdfToImage = "";
      this.withdrawRibdoc = "";
    },
    submit() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        if (this.isLoading == false) {
          if (!this.withdrawFirstname || !this.withdrawName) {
            this.$buefy.dialog.alert(
              "Pour retirer tes F$, nous avons besoin de ton nom et de ton prénom."
            );
          } else if (!this.withdrawBic || !this.withdrawIban) {
            this.$buefy.dialog.alert(
              "Pour retirer tes F$, nous avons besoin de ton Bic et de ton IBAN."
            );
          } else if (!isValidBIC(this.withdrawBic)) {
            this.$buefy.dialog.alert("ton Bic est invalide.");
          } else if (!isValidIBAN(electronicFormatIBAN(this.withdrawIban))) {
            this.$buefy.dialog.alert("ton IBAN est invalide.");
          } else if (!this.withdrawRibdoc) {
            this.$buefy.dialog.alert(
              "ton rib est obligatoire pour retirer des F$."
            );
          } else {
            this.isLoading = true;
            getuserfootCoins(this.$store.state.auth.user._id).then(
              (footCoins) => {
                this.footCoins = footCoins;
                if (
                  Number(this.withdrawFootCoin) >= 300 &&
                  Number(this.withdrawFootCoin) <= footCoins &&
                  Number.isInteger(Number(this.withdrawFootCoin))
                ) {
                  let query = {};
                  query.firstName = this.withdrawFirstname.toUpperCase();
                  query.lastName = this.withdrawName.toUpperCase();
                  query.ribDoc = this.withdrawRibdoc;
                  query.iban = electronicFormatIBAN(this.withdrawIban);
                  query.bic = this.withdrawBic;
                  query.amount = Number(this.euroFootcoin) * 100;
                  query.nbFootCoins = Number(this.withdrawFootCoin);
                  sellFootcoin(query).then((resp) => {
                    this.isLoading = false;
                    this.$buefy.dialog.alert(
                      "Ta demande est prise en compte. <br> Tu devrais recevoir ton virement sous 7 jours"
                    );
                    this.$emit("closeWithdraw");
                  });
                } else if (Number(this.withdrawFootCoin) < 300) {
                  this.isLoading = false;
                  this.$buefy.dialog.alert(
                    "Tu ne peux retirer moins de 300 F$."
                  );
                } else if (Number(this.withdrawFootCoin) > footCoins) {
                  this.isLoading = false;
                  this.$buefy.dialog.alert(
                    "Tu ne peux retirer plus de F$ que tu n'en as !!"
                  );
                } else {
                  this.isLoading = false;
                  this.$buefy.dialog.alert(
                    "Le nombre de F$ que tu peux retirer doit etre un entier positif"
                  );
                }
              }
            );
          }
        }
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.marginBotom {
  margin-bottom: 0.75rem !important;
}
ul {
  font-size: 1.2rem;
}
ul > li {
  font-size: 1.2rem;
}
.fa-info-circle {
  color: lightgray !important;
  margin-left: 5px;
}
.ribimg {
  max-height: 80vh;
}
.delete {
  display: flex;
}
.footcoinInput {
  width: 145px;
  margin-right: 0.5rem;
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
  font-size: 1.7rem !important;
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
@media (max-width: 370px) {
  h2 {
    font-weight: bold;
    font-size: 1rem !important;
  }
}
</style>
