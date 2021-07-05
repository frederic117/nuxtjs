

<template>
  <div class="wrapContent">
    <div
      v-if="detailAvailablePoints == false"
      :class="{ isnotinmodal: isnotModal }"
      class="mediaModalBet"
    >
      <h1 class="modalTitleBet">
        <strong v-if="langSelected === 'EN'" class="modalTitleBetH1">
          <strong class="contestName">FREE contest Euro 2020 </strong><br />
          <strong @click="detailFootcoinActiv" class="has-text-contest">
            500 FOOTCOINS (50 €) to win
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
            500 FOOTCOINS (50 €) à gagner
          </strong>
          <i
            @click="detailFootcoinActiv"
            class="pointer fa fa-info-circle"
            aria-hidden="true"
          ></i>
        </strong>

        <span
          :class="{ subtitleStartisnotModal: isnotModal }"
          class="is-wc subtitleStart"
        >
          {{
            langSelected == "EN"
              ? "Start with your prediction on this game:"
              : "Pour commencer pronostique sur ce match :"
          }}</span
        >
      </h1>

      <div class="modalBetWrapper">
        <div id="bullsAndBearsModal">
          <div class="BBull">
            <img
              class="teamShirtModal"
              :src="match.homeTeamId.teamImg"
              :alt="match.homeTeamName"
              :class="{
                invertOk: match.homeTeamName.toUpperCase().includes('JUVE'),
                teamShirtModalisnotModal: isnotModal,
              }"
            />
            <strong
              :class="{ steamNameGamenotModal: isnotModal }"
              class="teamNameGame"
              >{{
                langSelected == "EN"
                  ? match.homeTeamId.searchName
                  : match.homeTeamId.name
              }}
              <span
                class="is-wc"
                v-if="match.standings && match.standings.localteam_position"
                >({{ match.standings.localteam_position }})</span
              >
            </strong>
            <div :class="{ formenotModal: isnotModal }" class="forme">
              <span
                v-if="match.homeTeamId.forme[0] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="match.homeTeamId.forme[0] == 'N'"
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="match.homeTeamId.forme[0] == 'D'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="match.homeTeamId.forme[1] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="match.homeTeamId.forme[1] == 'N'"
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="match.homeTeamId.forme[1] == 'D'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="match.homeTeamId.forme[2] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="match.homeTeamId.forme[2] == 'N'"
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="match.homeTeamId.forme[2] == 'D'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="match.homeTeamId.forme[3] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="match.homeTeamId.forme[3] == 'N'"
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="match.homeTeamId.forme[3] == 'D'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="match.homeTeamId.forme[4] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="match.homeTeamId.forme[4] == 'N'"
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="match.homeTeamId.forme[4] == 'D'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
            </div>
            <input
              step="1"
              v-model="teamHomeScore"
              class="scoreModal"
              type="number"
              min="0"
              placeholder="0"
            />
          </div>

          <img
            loading="lazy"
            class="vsmodal"
            src="~assets/images/versus.png"
            alt="versus"
          />

          <div class="BBull">
            <img
              class="teamShirtModal"
              :src="match.awayTeamId.teamImg"
              :alt="match.awayTeamName"
              :class="{
                invertOk: match.awayTeamName.toUpperCase().includes('JUVE'),
                teamShirtModalisnotModal: isnotModal,
              }"
            />
            <strong
              :class="{ steamNameGamenotModal: isnotModal }"
              class="teamNameGame"
              >{{
                langSelected == "EN"
                  ? match.awayTeamId.searchName
                  : match.awayTeamId.name
              }}
              <span
                class="is-wc"
                v-if="match.standings && match.standings.visitorteam_position"
                >({{ match.standings.visitorteam_position }})</span
              >
            </strong>
            <div :class="{ formenotModal: isnotModal }" class="forme">
              <span
                v-if="match.awayTeamId.forme[0] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="match.awayTeamId.forme[0] == 'N'"
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="match.awayTeamId.forme[0] == 'D'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="match.awayTeamId.forme[1] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="match.awayTeamId.forme[1] == 'N'"
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="match.awayTeamId.forme[1] == 'D'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="match.awayTeamId.forme[2] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="match.awayTeamId.forme[2] == 'N'"
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="match.awayTeamId.forme[2] == 'D'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="match.awayTeamId.forme[3] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="match.awayTeamId.forme[3] == 'N'"
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="match.awayTeamId.forme[3] == 'D'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="match.awayTeamId.forme[4] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="match.awayTeamId.forme[4] == 'N'"
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="match.awayTeamId.forme[4] == 'D'"
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
            </div>

            <input
              step="1"
              v-model="teamAwayScore"
              class="scoreModal"
              type="number"
              min="0"
              placeholder="0"
            />
          </div>
        </div>
        <!--
          <div>
          <h1 @click="seeExplanationAvailablePoints" class="pointer is-wc">
            {{
              langSelected == "EN" ? "I can bet up to" : "Je peux miser jusqu'à"
            }}

            <strong class="has-text-contest">100 points !</strong>
            <i class="fa fa-info-circle" aria-hidden="true"></i>
          </h1>

          <input
            step="10"
            v-model="betPoints"
            class="scoreModal pointsAvailable"
            type="number"
            min="0"
            max="100"
            placeholder="0"
          />
        </div>
        -->
        <br />
        <div class="betButton">
          <p
            class="button is-large buttonBetModal"
            type="button"
            @click="parier()"
          >
            {{ langSelected == "EN" ? "Bet !" : "Parier !" }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="detailAvailablePoints == true" class="mediaModalBet">
      <h1 class="modalTitleBet">
        <strong class="modalTitleBetH1 has-text-contest"
          >{{
            langSelected == "EN"
              ? "How do I bet my points?"
              : "Comment miser mes points ?"
          }}
        </strong>
      </h1>
      <div class="modalBetWrapper">
        <h2 class="explanationBet">
          {{
            langSelected == "EN"
              ? "For each prediction, you can add a bet of up to your total available points to your pick. If you have no more points, you can still win some with each prediction..."
              : "Lors de chaque prono, tu peux agrémenter ton pari d'une mise allant jusqu'à l'ensemble de tes points disponibles. Si tu n'as plus de points, tu continues à pouvoir en gagner à chaque prono..."
          }}

          <strong class="has-text-contest">{{
            langSelected == "EN" ? "The game goes on!" : "Le jeu continue !"
          }}</strong>
          <br />
          <br />
          <h3 class="has-text-contest">
            {{
              langSelected == "EN"
                ? "Calculation of points :"
                : "Calcul des points :"
            }}
          </h3>
          {{
            langSelected == "EN"
              ? "- The allocation of points depends on the % of predictions against you among all the predictions of the site."
              : "- L’attribution des points dépend du % de pronos contre toi parmi tous les pronos du site."
          }}
          <br />
          {{
            langSelected == "EN"
              ? "For example, if you made a good prediction that the home team would win, and 23% of the predictions gave the same result as you, you win 100 - 23 ="
              : "- Par exemple, si tu as fait un bon prono donnant l'équipe à domicile vainqueur, et que 23% des pronos ont donné le même résultat que toi, tu gagnes 100 - 23 ="
          }}
          <strong class="has-text-contest">77 points</strong>. <br />
          {{
            langSelected == "EN"
              ? "The exact score gives a"
              : "- Le score exact permet d'obtenir un"
          }}
          <strong class="has-text-contest">bonus</strong> :
          {{
            langSelected == "EN"
              ? "It multiplies the points obtained by 2, i.e. 77 bonus points in our example for a total of"
              : "Il multiplie les points obtenus par 2, soit 77 points de bonus dans notre exemple pour un total de"
          }}

          <strong class="has-text-contest">144 points</strong>.<br />
          <strong>
            {{
              langSelected == "EN"
                ? "On footfoot, at the beginning of the round everyone starts with 100 points, which is the equivalent of a poker buy-in. You have the possibility to bet these points:"
                : "Sur footfoot, au début du round chacun commence avec 100 points, c'est l'équivalent de la cave au Poker. Tu as la possibilité de miser ces points :"
            }}
          </strong>
          <br />-
          <strong class="has-text-contest">{{
            langSelected == "EN" ? "The placing" : "La mise"
          }}</strong>
          {{
            langSelected == "EN"
              ? "allows you to earn more points."
              : "permet de gagner plus de points."
          }}<br />
          {{
            langSelected == "EN"
              ? "In our example, you have earned 77 pts with the right result."
              : "Dans notre exemple, tu as gagné 77 pts avec le bon résultat."
          }}
          <br />{{ langSelected == "EN" ? "If you bet" : "Si tu as misé" }}
          <strong class="has-text-contest">20 pts</strong>
          {{
            langSelected == "EN"
              ? "on this bet, your placing pays you"
              : "sur ce pari, ta mise te rapporte"
          }}
          <strong class="has-text-contest">15,4 pts</strong>. (77*20/100);
          <br />
          {{
            langSelected == "EN"
              ? "If you had the right score, your bet would have brought you"
              : "Si tu avais en plus le bon score, ta mise t'aurais rapporté"
          }}
          <strong class="has-text-contest">30,8 pts</strong>. (144*20/100);
          <br />
          {{
            langSelected == "EN"
              ? "... A bad result you lose your bet"
              : "... Un mauvais resultat tu perds ta mise"
          }}.<br />
          {{
            langSelected == "EN"
              ? "Your bankroll increases or decreases according to the points you win or lose. You can bet the maximum amount of your available points in each game."
              : "Ta cave augmente ou diminue en fonction des points que tu gagnes ou perds. A chaque match tu peux donc miser au maximum l'ensemble de tes points disponibles."
          }}

          <br />
          <br />
        </h2>
      </div>
      <div class="betButton">
        <p
          class="button is-medium has-text-contest"
          type="button"
          @click="seeExplanationAvailablePoints()"
        >
          {{ langSelected == "EN" ? "Back" : "Retour" }}
        </p>
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
import moment from "moment";
export default {
  data() {
    return {
      detailFootcoinModal: false,
      detailAvailablePoints: false,
      teamHomeScore: "",
      teamAwayScore: "",
      positionTaken: false,
      betPoints: Number,
      match: {},
    };
  },
  props: {
    isnotModal: "",
  },
  components: {
    detailFootcoin: () => import("@/components/modal/detailFootcoin"),
  },

  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    firstBet() {
      return this.$store.state.var.firstBet;
    },
  },
  watch: {
    firstBet: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (
          this.firstBet &&
          this.firstBet.scope &&
          this.firstBet.scope.length > 0
        ) {
          this.match = this.firstBet.scope.filter((m) => {
            return (
              m.status.toUpperCase() != "FT" &&
              m.status.toUpperCase() != "POSTP" &&
              m.status.toUpperCase() != "CANCL" &&
              m.status.toUpperCase() != "AET" &&
              m.status.toUpperCase() != "FT_PEN"
            );
          })[0];
        }
      },
    },
  },
  methods: {
    detailFootcoinActiv() {
      this.detailFootcoinModal = true;
    },
    closedetailFootcoinModal() {
      this.detailFootcoinModal = false;
    },
    seeExplanationAvailablePoints() {
      this.detailAvailablePoints = !this.detailAvailablePoints;
    },
    parier() {
      if (this.positionTaken === true) {
        this.$buefy.dialog.alert(
          this.langSelected == "EN"
            ? "Bet registration in progress"
            : "Position en cours d'enregistrement"
        );
      } else {
        if (Number(this.betPoints) > 100) {
          if (this.langSelected == "EN") {
            this.$buefy.dialog.alert(
              `You can't bet more than ${Number(
                this.currentInsight.availablePointsForBet
              )} points 😜😜😜`
            );
          } else {
            this.$buefy.dialog.alert(
              `Tu ne peux pas miser plus de ${Number(
                this.currentInsight.availablePointsForBet
              )} points 😜😜😜`
            );
          }
          this.betPoints = 100;
        } else if (Number(this.betPoints) < 0) {
          this.$buefy.dialog.alert(
            this.langSelected == "EN"
              ? "You can't bet a negative number of points 😜😜😜"
              : "Tu ne peux pas miser un nombre de points négatif 😜😜😜"
          );
          this.betPoints = 0;
        } else if (
          Number(this.teamHomeScore) < 0 ||
          Number(this.teamAwayScore) < 0
        ) {
          this.$buefy.dialog.alert(
            this.langSelected == "EN"
              ? "The score cannot be less than 0 😜😜😜"
              : "Le score ne peut etre inférieur à 0 😜😜😜"
          );
          this.teamHomeScore = 0;
          this.teamAwayScore = 0;
        } else {
          this.positionTaken = true;

          let query = {};
          query.match = this.match._id;
          query.scoreTeam1 = this.teamHomeScore ? this.teamHomeScore : 0;
          query.scoreTeam2 = this.teamAwayScore ? this.teamAwayScore : 0;
          query.round = this.firstBet._id;
          query.bettingPoints = this.betPoints ? Number(this.betPoints) : 0;
          this.$store.commit("var/pronoUnconnect", query);
          this.$buefy.dialog.alert(
            this.langSelected == "EN"
              ? "Well done, one last step: creating your account to save your prediction and take the others 😜😜😜"
              : "Bien joué, une dernière étape : la création de ton compte pour enregistrer ton prono et prendre les autres 😜😜😜"
          );
          this.$router.push("/signup");
        }
      }
    },
    moment: function (time) {
      return moment(time);
    },
  },
};
</script>

<style scoped>
.wrapContent {
  display: flex;
}
.isnotinmodal {
  max-width: 350px;
}
.buttonBetModal {
  padding-left: 30px;
  padding-right: 30px;
  font-weight: bolder;
  color: #fff;
  background-color: #ff7d00;
  box-shadow: 0 0 0 0.125em #ff7d00;
  border-color: #ff7d00;
  font-size: 1.2rem !important;
}

.buttonBetModal:focus,
.buttonBetModal:hover {
  background-color: #fff !important;
  border-color: #ff7d00 !important;
  color: #ff7d00 !important;
}

.betButton {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-self: center;
}

.modalBetWrapper {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.scoreModal {
  margin-top: 1rem;
  width: 4rem;
  align-self: CENTER;
  position: relative;
  color: #ff7d00 !important;
}

.pointsAvailable {
  width: 6rem;
  align-self: center;
  display: flex;
}

.modalTitleBet {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.modalTitleBetH1 {
  font-size: 1.75rem;
}
.contestName {
  font-size: 1.75rem;
  color: #0084a4 !important;
}

.BBull {
  display: flex;
  flex-direction: column;
}

.pointsAvailable {
  margin: auto;
  margin-top: 5px;
}

h1 {
  padding-top: 1rem;
}

div {
  font-size: 1.2rem !important;
}

h1 {
  font-size: 1.2rem !important;
}

img {
  max-height: 64px !important;
}

.teamShirtModal {
  height: 8rem !important;
  max-height: 8rem !important;
  width: auto !important;
  align-self: center;
  padding: 0.5rem;
}
.teamShirtModalisnotModal {
  height: 6rem !important;
}
.vsmodal {
  height: 5rem;
  width: auto;
}

.has-text-contest {
  font-weight: bold;
}

h1 {
  padding-top: 1rem;
}

.is-wc {
  color: #0084a4 !important;
  font-size: 1.5rem !important;
  text-align: center !important;
  padding-left: 5px;
}
.subtitleStartisnotModal {
  font-size: 1.1rem !important;
}
.subtitleStart {
  padding-left: 0px !important;
}

div {
  font-size: 1.2rem !important;
}

h1 {
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
.pronoBlock > span {
  display: flex;
  flex-direction: column;
}
.pronoBlock {
  justify-content: center;
}
.bullsAndBearsPicVSTag > span {
  margin: 0.15rem;
  border: solid #ff7d00;
  border-radius: 5px;
}

.bullsAndBearsPicVSTag {
  display: flex;
  justify-content: space-around;
  font-weight: bold;
  margin-top: 0.5rem;
}
.is-tagContest {
  background-color: #ff7d00;
  color: #eef1f7;
  border-radius: 0px !important;
  font-size: 1rem;
}

.is-tagContestTitle {
  background-color: #eef1f7;
  color: #ff7d00;
  border-radius: 0px !important;
  font-size: 1rem;
}

.teamNameGame {
  font-size: 1.5rem !important;
  color: #192b41;
  text-align: center;
  align-self: center;
}
.steamNameGamenotModal {
  font-size: 1.2rem !important;
}
.steamNameGamenotModal > .is-wc {
  font-size: 1.2rem !important;
}
.formenotModal {
  font-size: 1rem !important;
}
.teamNameGame > div {
  display: flex;
  justify-content: center;
  align-self: center;
}
.fa-info-circle {
  color: lightgray !important;
}
.explanationBet {
  padding: 10px;
}
@media (max-width: 1047px) {
  .explanationBet {
    padding: 5px;
  }
  .teamNameGame {
    font-size: 1.25rem !important;
  }
  .modalBetWrapper {
    margin-top: 0rem;
  }
  .is-tagContest {
    background-color: #ff7d00;
    color: #eef1f7;
    border-radius: 3px !important;
    font-size: 0.7rem !important;
    width: 49%;
    display: flex;
    justify-content: center;
    height: 1.25rem;
  }
  .vsmodal {
    max-height: 4rem !important;
  }
  .is-tagContestTitle {
    background-color: #fff;
    color: #ff7d00;
    border-radius: 0px !important;
    display: flex;
    margin: auto !important;
    margin-bottom: 0rem !important;
    font-size: 0.7rem !important;
  }

  .pronoBlock {
    width: 40%;
  }
  .bullsAndBearsPicVSTag {
    display: flex;
    justify-content: space-around;
    font-weight: bold;
    margin-top: 0rem;
    width: 95%;
    padding: 0 10px !important;
  }
  img {
    max-height: 42px !important;
  }

  div {
    font-size: 0.8rem !important;
  }

  .teamShirtModal {
    height: 4rem !important;
    width: auto;
    padding: 0rem;
  }
  .modalTitleBetH1 {
    font-size: 1.25rem;
  }
  .contestName {
    font-size: 1.25rem;
    color: #0084a4 !important;
  }
  .modalTitleBet {
    margin-bottom: 0rem;
  }

  .BBull {
    width: 100%;
  }

  .is-large {
    font-size: 0.8rem !important;
  }

  .buttonBetModal {
    font-size: 1.2rem !important;
  }

  img {
    max-height: 42px !important;
  }

  div {
    font-size: 0.8rem !important;
  }

  .is-wc {
    color: #0084a4 !important;
    font-size: 1.1rem !important;
    text-align: center !important;
  }
}
@media screen and (max-width: 361px) {
  .is-tagContest {
    width: 49%;
  }
}
</style>
