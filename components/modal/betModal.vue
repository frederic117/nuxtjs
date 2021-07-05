<template>
  <div class="mediaModalBet">
    <div v-if="detailAvailablePoints == false" class="mediaModalBet">
      <h1 class="modalTitleBet">
        <strong class="modalTitleBetH1 has-text-contest">
          {{ langSelected == "EN" ? "my bet" : "mon prono" }}</strong
        >
      </h1>

      <div class="modalBetWrapper">
        <div id="bullsAndBearsModal">
          <div class="BBull">
            <img
              class="teamShirtModal"
              :src="currentInsight.currentInsight.homeTeamId.teamImg"
              :alt="currentInsight.currentInsight.homeTeamName"
              :class="{
                invertOk: currentInsight.currentInsight.homeTeamName
                  .toUpperCase()
                  .includes('JUVE'),
              }"
            />
            <strong class="teamNameGame"
              >{{
                langSelected == "EN"
                  ? currentInsight.currentInsight.homeTeamId
                    ? currentInsight.currentInsight.homeTeamId.searchName
                    : currentInsight.currentInsight.homeTeamName
                  : currentInsight.currentInsight.homeTeamId
                  ? currentInsight.currentInsight.homeTeamId.name
                  : currentInsight.currentInsight.homeTeamName
              }}

              <span
                class="is-wc"
                v-if="
                  currentInsight.currentInsight.standings &&
                  currentInsight.currentInsight.standings.localteam_position
                "
                >({{
                  currentInsight.currentInsight.standings.localteam_position
                }})</span
              >
            </strong>
            <div class="forme">
              <span
                v-if="currentInsight.currentInsight.homeTeamId.forme[0] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.homeTeamId.forme[0] == 'N'
                "
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.homeTeamId.forme[0] == 'D'
                "
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="currentInsight.currentInsight.homeTeamId.forme[1] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.homeTeamId.forme[1] == 'N'
                "
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.homeTeamId.forme[1] == 'D'
                "
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="currentInsight.currentInsight.homeTeamId.forme[2] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.homeTeamId.forme[2] == 'N'
                "
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.homeTeamId.forme[2] == 'D'
                "
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="currentInsight.currentInsight.homeTeamId.forme[3] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.homeTeamId.forme[3] == 'N'
                "
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.homeTeamId.forme[3] == 'D'
                "
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="currentInsight.currentInsight.homeTeamId.forme[4] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.homeTeamId.forme[4] == 'N'
                "
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.homeTeamId.forme[4] == 'D'
                "
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
          <div
            @click="seeHeadtoheaddetail(currentInsight.currentInsight)"
            class="pronoBlock pointer"
          >
            <span class="bullsAndBearsPicVS pointer">
              <span class="pointer is-wc h2h">{{
                langSelected == "EN" ? "see head2head" : "voir head2head"
              }}</span>
              <img
                loading="lazy"
                class="vs"
                src="~assets/images/versus.png"
                alt="versus"
            /></span>
            <div class="bullsAndBearsPicVSTag">
              <b-tooltip
                :label="
                  langSelected === 'EN'
                    ? 'to win for a victory of ' +
                      currentInsight.currentInsight.homeTeamId.name
                    : 'à gagner pour une victoire de ' +
                      currentInsight.currentInsight.homeTeamId.name
                "
                position="is-bottom"
                class="teamNameGame is-info"
                size="is-medium"
              >
                <b-taglist attached>
                  <b-tag class="is-tagContestTitle">1</b-tag>
                  <b-tag class="is-tagContest"
                    >{{
                      100 -
                      Math.round(
                        currentInsight.currentInsight.trending.percentage[0]
                      )
                    }}
                    pts</b-tag
                  >
                </b-taglist>
              </b-tooltip>
              <b-tooltip
                :label="
                  langSelected === 'EN'
                    ? 'to win for a draw'
                    : 'à gagner pour un match nul'
                "
                position="is-bottom"
                class="teamNameGame is-info"
                size="is-medium"
              >
                <b-taglist attached>
                  <b-tag class="is-tagContestTitle">X</b-tag>
                  <b-tag class="is-tagContest"
                    >{{
                      100 -
                      Math.round(
                        currentInsight.currentInsight.trending.percentage[1]
                      )
                    }}
                    pts</b-tag
                  >
                </b-taglist>
              </b-tooltip>
              <b-tooltip
                :label="
                  langSelected === 'EN'
                    ? 'to win for a victory of ' +
                      currentInsight.currentInsight.awayTeamId.name
                    : 'à gagner pour une victoire de ' +
                      currentInsight.currentInsight.awayTeamId.name
                "
                position="is-left"
                class="teamNameGame is-info"
                size="is-medium"
              >
                <b-taglist attached>
                  <b-tag class="is-tagContestTitle">2</b-tag>
                  <b-tag class="is-tagContest"
                    >{{
                      100 -
                      Math.round(
                        currentInsight.currentInsight.trending.percentage[2]
                      )
                    }}
                    pts</b-tag
                  >
                </b-taglist>
              </b-tooltip>
            </div>
          </div>
          <div class="BBull">
            <img
              class="teamShirtModal"
              :src="currentInsight.currentInsight.awayTeamId.teamImg"
              :alt="currentInsight.currentInsight.awayTeamName"
              :class="{
                invertOk: currentInsight.currentInsight.awayTeamName
                  .toUpperCase()
                  .includes('JUVE'),
              }"
            />
            <strong class="teamNameGame">
              {{
                langSelected == "EN"
                  ? currentInsight.currentInsight.awayTeamId
                    ? currentInsight.currentInsight.awayTeamId.searchName
                    : currentInsight.currentInsight.awayTeamName
                  : currentInsight.currentInsight.awayTeamId
                  ? currentInsight.currentInsight.awayTeamId.name
                  : currentInsight.currentInsight.awayTeamName
              }}

              <span
                class="is-wc"
                v-if="
                  currentInsight.currentInsight.standings &&
                  currentInsight.currentInsight.standings.visitorteam_position
                "
                >({{
                  currentInsight.currentInsight.standings.visitorteam_position
                }})</span
              >
            </strong>

            <div class="forme">
              <span
                v-if="currentInsight.currentInsight.awayTeamId.forme[0] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.awayTeamId.forme[0] == 'N'
                "
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.awayTeamId.forme[0] == 'D'
                "
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="currentInsight.currentInsight.awayTeamId.forme[1] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.awayTeamId.forme[1] == 'N'
                "
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.awayTeamId.forme[1] == 'D'
                "
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="currentInsight.currentInsight.awayTeamId.forme[2] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.awayTeamId.forme[2] == 'N'
                "
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.awayTeamId.forme[2] == 'D'
                "
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="currentInsight.currentInsight.awayTeamId.forme[3] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.awayTeamId.forme[3] == 'N'
                "
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.awayTeamId.forme[3] == 'D'
                "
                class="form is-loss"
                >{{ langSelected === "EN" ? "L" : "D" }}</span
              >
              <span
                v-if="currentInsight.currentInsight.awayTeamId.forme[4] == 'V'"
                class="form is-win"
                >{{ langSelected === "EN" ? "W" : "V" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.awayTeamId.forme[4] == 'N'
                "
                class="form is-draw"
              >
                {{ langSelected === "EN" ? "D" : "N" }}</span
              >
              <span
                v-else-if="
                  currentInsight.currentInsight.awayTeamId.forme[4] == 'D'
                "
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
        <div class="teamNamegamewrap">
          <div class="displayFlex suggestScore">
            <span @click="setScoreHome(0)" class="formWc">0</span>
            <span @click="setScoreHome(1)" class="formWc">1</span>
            <span @click="setScoreHome(2)" class="formWc">2</span>
            <span @click="setScoreHome(3)" class="formWc">3</span>
          </div>
          <div class="displayFlex suggestScore">
            <span @click="setScoreAway(0)" class="formWc">0</span>
            <span @click="setScoreAway(1)" class="formWc">1</span>
            <span @click="setScoreAway(2)" class="formWc">2</span>
            <span @click="setScoreAway(3)" class="formWc">3</span>
          </div>
        </div>
        <div v-if="currentInsight.availablePointsForBet > 0">
          <h1 @click="seeExplanationAvailablePoints" class="pointer is-wc">
            {{
              langSelected == "EN" ? "I can bet up to" : "Je peux miser jusqu'à"
            }}

            <strong class="has-text-contest"
              >{{ currentInsight.availablePointsForBet }} points !</strong
            >
            <i class="fa fa-info-circle" aria-hidden="true"></i>
          </h1>

          <input
            step="10"
            v-model="betPoints"
            class="scoreModal pointsAvailable"
            type="number"
            min="0"
            :max="currentInsight.availablePointsForBet"
            placeholder="0"
          />
        </div>
        <br />
        <div class="betButton">
          <p
            class="button is-large buttonBetModal"
            type="button"
            @click="parier()"
          >
            {{ langSelected == "EN" ? "Bet!" : "Parier !" }}
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
  </div>
</template>

<script>
import {
  takeAbet,
  modifyAbet,
  getAvailablePointsToBetOnRound,
} from "@/server/apiContest";
import moment from "moment";
export default {
  data() {
    return {
      detailAvailablePoints: false,
      teamHomeScore: "",
      teamAwayScore: "",
      positionTaken: false,
      betPoints: Number,
    };
  },
  props: { currentInsight: "" },
  watch: {
    currentInsight: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        this.teamHomeScore =
          this.currentInsight && this.currentInsight.teamHomeScore
            ? this.currentInsight.teamHomeScore
            : "";
        this.teamAwayScore =
          this.currentInsight && this.currentInsight.teamAwayScore
            ? this.currentInsight.teamAwayScore
            : "";
        this.betPoints = this.currentInsight.betPoints;
      },
    },
  },
  methods: {
    setScoreAway(event) {
      this.teamAwayScore = event;
    },
    setScoreHome(event) {
      this.teamHomeScore = event;
    },
    seeHeadtoheaddetail(event) {
      this.$emit("result", event);
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
        if (
          Number(this.betPoints) >
          Number(this.currentInsight.availablePointsForBet)
        ) {
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
          this.betPoints = this.currentInsight.availablePointsForBet;
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

          if (this.currentInsight.currentInsight.userBet) {
            let query = {};
            query.round = this.$route.params.contestId;
            query.match = this.currentInsight.currentInsight._id;
            query.scoreTeam1 = this.teamHomeScore ? this.teamHomeScore : 0;
            query.scoreTeam2 = this.teamAwayScore ? this.teamAwayScore : 0;
            query.bettingPoints = this.betPoints ? Number(this.betPoints) : 0;

            modifyAbet(
              this.currentInsight.currentInsight.userBet._id,
              query
            ).then((resp) => {
              this.loading = true;
              if (resp.status == "error") {
                this.$buefy.dialog.alert(
                  this.langSelected == "EN"
                    ? "Sorry, it is no longer possible to make predictions for this game 😜😜😜"
                    : "Désolé, il n'est plus possible de pronostiquer pour ce match 😜😜😜"
                );
                this.positionTaken = false;
                this.loading = false;
              } else {
                this.$nuxt.$emit("betTaken");
                this.positionTaken = false;
              }
            });
          } else {
            let query = {};
            query.match = this.currentInsight.currentInsight._id;
            query.scoreTeam1 = this.teamHomeScore ? this.teamHomeScore : 0;
            query.scoreTeam2 = this.teamAwayScore ? this.teamAwayScore : 0;
            query.round = this.$route.params.contestId;
            query.bettingPoints = this.betPoints ? Number(this.betPoints) : 0;

            takeAbet(query).then((resp) => {
              this.loading = true;
              if (resp.status == "error") {
                this.$buefy.dialog.alert(
                  this.langSelected == "EN"
                    ? "Sorry, it is no longer possible to make predictions for this game 😜😜😜"
                    : "Désolé, il n'est plus possible de pronostiquer pour ce match 😜😜😜"
                );
                this.positionTaken = false;
                this.loading = false;
              } else {
                this.$nuxt.$emit("betTaken");
                this.positionTaken = false;
              }
            });
          }
        }
      }
    },
    moment: function (time) {
      return moment(time);
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
  margin-bottom: 0.5rem;
}

.modalBetWrapper {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
}

.scoreModal {
  margin-top: 0.5rem;
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
  width: 30%;
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
  margin-top: 1.7rem;
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
  border-radius: 4px;
}

.is-blueInfo {
  background-color: #3273dc;
  color: #eef1f7;
  border-radius: 4px;
}

.is-blue {
  background-color: #192b41;
  color: #eef1f7;
}

.is-greyLit {
  background-color: #778899;
  color: #eef1f7;
  border-radius: 4px;
  font-size: 1.25rem;
}

.is-red {
  background-color: #eb412d;
  color: #eef1f7;
  border-radius: 4px;
}

.is-win {
  background-color: #2da94f;
  border-radius: 4px;
  color: white;
}

.is-draw {
  background-color: #3273dc;
  border-radius: 4px;
  color: white;
}

.is-loss {
  background-color: #eb412d;
  border-radius: 4px;
  color: white;
}

.pronoBlock {
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: 5px;
  align-items: center;
}
.pronoBlock > span {
  display: flex;
  flex-direction: column;
}

.bullsAndBearsPicVS {
  display: flex;
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
  width: fit-content;
}
.is-tagContest {
  background-color: #ff7d00;
  color: #eef1f7;
  border-radius: 0px !important;
  font-size: 1rem;
  width: inherit !important;
}

.is-tagContestTitle {
  background-color: #eef1f7;
  color: #ff7d00;
  border-radius: 0px !important;
  font-size: 1rem;
  margin-bottom: 0 !important;
  width: 100%;
}
.teamNamegamewrap {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.teamNameGame {
  width: 100%;
  margin-bottom: 5px;
  font-size: 1.5rem !important;
  color: #192b41;
  text-align: center;
  align-self: center;
}
.teamNameGame > div {
  display: flex;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  width: 65px;
}
.fa-info-circle {
  color: lightgray !important;
}
.mediaModalBet {
  display: flex;
  padding: 5px 0px;
}
.mediaModalBet > .mediaModalBet {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
}
.vs {
  height: auto;
  height: 50px;
  max-width: 55px;
  width: auto !important;
  align-self: center;
}

.bullsAndBearsPicVs {
  display: flex;
  justify-content: center;
  width: 10%;
  align-self: center;
  flex-direction: column;
}
.fullWidth {
  width: 100%;
}
.h2h {
  font-style: italic;
  font-size: 1rem !important;
  padding: 0 !important;
}
.suggestScore {
  width: 33%;
  justify-content: space-evenly;
  margin-top: 1rem;
}
.formWc {
  cursor: pointer;
  background-color: #ff7d00;
  color: #fff;
  border-radius: 5px !important;
  width: 30px;
  border-color: #0084a4 !important;
  text-align: center !important;
  font-weight: bolder;
  font-size: 1rem !important;
  box-shadow: 0 0 0 0.125em #0084a4 !important;
  padding: 5px;
  margin: 5px;
  font-style: normal !important;
}
.explanationBet {
  padding: 10px;
}
@media (max-width: 1047px) {
  .suggestScore {
    width: 40%;
  }
  .explanationBet {
    padding: 5px;
  }
  .teamNameGame {
    font-size: 0.9rem !important;
    width: 100%;
  }
  .teamNameGame > div {
    flex-direction: column;
    width: 35px;
  }
  .modalBetWrapper {
    margin-top: 0rem;
  }
  .BBull {
    width: 35%;
  }
  .pronoBlock {
    width: 20%;
  }

  .bullsAndBearsPicVSTag {
    display: flex;
    justify-content: space-around;
    font-weight: bold;
    margin-top: 0rem;
    padding: 0 10px !important;
  }

  .displayFlex > span {
    font-style: italic;
    font-size: 0.7rem;
  }

  .is-wc {
    color: #0084a4 !important;
    font-size: 0.9rem !important;
    text-align: center !important;
    padding-left: 0px;
  }
  .is-tagContest {
    background-color: #ff7d00;
    color: #eef1f7;
    border-radius: 4px !important;
    font-size: 0.7rem !important;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 1.25rem;
  }

  .is-tagContestTitle {
    background-color: #fff;
    color: #ff7d00;
    border-radius: 0px !important;
    display: flex;
    margin: 0 !important;
    margin-bottom: 0rem !important;
    font-size: 0.7rem !important;
  }
  img {
    max-height: 42px !important;
  }

  div {
    font-size: 0.8rem !important;
  }

  .teamShirtModal {
    height: 3rem !important;
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

  .h2h {
    font-size: 0.7rem !important;
  }
}
@media screen and (max-width: 361px) {
  .is-tagContest {
    width: 100%;
  }
  .teamNameGame {
    font-size: 0.8rem !important;
  }
  .teamNameGame > div {
    flex-direction: column;
    width: 30px;
  }
}
</style>
