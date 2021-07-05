<template>
  <div v-if="loading">
    <b-loading
      :is-full-page="false"
      :active.sync="loading"
      :canCancel="false"
    ></b-loading>
  </div>
  <section
    v-else-if="contest.contest && contest.contest.adminOfContest"
    class="section"
  >
    <div class="mainContent">
      <h1 class="column is-9 is-bold has-text-contest is-size-1">
        <strong>
          {{
            langSelected === "EN"
              ? "Rules of the contest "
              : "Règles du contest "
          }}
          - {{ contest.contest.name }}</strong
        >
        <p class="is-italic has-text-primary">
          {{ langSelected === "EN" ? "created by " : "créé par " }}
          {{ contest.contest.adminOfContest.username }}
        </p>
      </h1>
    </div>
    <div class="mainContent">
      <article class="message is-warning">
        <div class="message-header">
          <p>{{ langSelected === "EN" ? "Rules:" : "Règles :" }}</p>
        </div>
        <div v-if="langSelected == 'EN'" class="message-body">
          <h1>Forecasts:</h1>
          <strong>How do I make my predictions?</strong>
          <br />In your contest area you take position on the matches of the
          round. The matches are chosen by the creator of the round. You define
          the score for each of the two teams in the selected match.
          <br />
          <br />
          <strong
            >Why don't I see all the matches of a competition, especially final
            stages (quarter finals, semi finals, final) at the beginning of a of
            a competition?</strong
          >
          <br />Unlike other sites, we only predict on only on the next matches
          of the team we know precisely the protagonists. precisely the
          protagonists. You have to wait for the end of the group matches the
          end of the group matches to know the teams that will play each other
          in the to know the teams that will play each other in the final phase
          and therefore to be able to predict them.
          <br />
          <br />
          <strong>Until when can I predict a game?</strong>
          <br />You can make predictions on a game at any time up until the time
          the game the start of the match. However, once the time has passed, it
          is no longer you can no longer make a prediction on that match.
          <br />
          <br />
          <strong>How to see the predictions of other players?</strong>
          <br />On the ranking of each round, you can see the predictions of the
          other participants.
          <br />
          <br />
          <strong
            >Is it possible for the organizer of a contest to block the
            predictions in advance for the players, for example, at a fixed date
            predefined date?</strong
          >
          <br />No, this feature is not offered.
          <br />
          <br />
          <strong>How do the predictions for knockout matches work? </strong>
          <br />The score is predicted until the end of extra time (120
          minutes). The prediction system works exactly like in a classic match
          except that the score is the one after 120 minutes and not 90 minutes.
          The number of points won does not depend on the The number of points
          won does not depend on the result of the penalty shootout.
          <br />
          <br />
          <strong
            >I don't see the option to specify the winner in case of a
            draw.</strong
          >
          <br />On footfoot we take into account the score before the sessions
          of penalty kicks.
          <br />
          <br />
          <h1>Points:</h1>
          <strong
            >What is the score taken into account in case of overtime?</strong
          >
          <br />The score taken into account is the one at the end of the extra
          time. In penalty kicks, the result of the match is considered a draw.
          <br />
          <br />
          <strong>Calculation of points:</strong>
          - The allocation of points depends on the % of predictions against you
          among all the predictions of the site. <br />- For example, if you
          made a good prediction that the home team would win, and 23% of the
          predictions gave the same result as you, you win 100 - 23 =
          <strong class="has-text-contest">77 points</strong>. <br />- The exact
          score allows you to obtain a
          <strong class="has-text-contest">bonus</strong> : It multiplies the
          points obtained by 2, i.e. 77 bonus points in our example for a a
          total of
          <strong class="has-text-contest">144 points</strong>.<br /><br />
          <strong
            >On footfoot, at the beginning of the round everyone starts with 100
            points, which is the equivalent of the cellar in poker. You have the
            possibility to bet these points:</strong
          >
          <br />- <strong class="has-text-contest">The placing</strong> allows
          you to to win more points. <br />In our example, you have earned 77
          pts with the right result. <br />If you bet
          <strong class="has-text-contest">20 pts</strong> on this bet, your bet
          pays you <strong class="has-text-contest">15,4 pts</strong>.
          (77*20/100); <br />If you also had the right score, your bet would
          have brought you <strong class="has-text-contest">30,8 pts</strong>.
          (144*20/100); <br />... A bad result means you lose your bet. Your
          bankroll increases or decreases according to the points you win or
          lose.In each game you can bet the maximum amount of your available
          points.
          <br />
          <br />

          <strong
            >In case of a tie at the end of the round, what happens?</strong
          >
          <br />In the event of a tie, the order of entry in the round will
          determine the will be used to decide between players. <br />If 3
          players have the same number of points, the 1 <sup>st</sup> of the 3
          will be the 1 <sup>st</sup> entered in the round, then the 2
          <sup>nd</sup> and finally the 3 <sup>rd</sup>.
          <br />
          <br />
          <nuxt-link
            class="pointer"
            :to="'/contest/' + this.$route.params.contestId"
          >
            <div class="betButton">
              <p class="button is-medium has-text-contest" type="button">
                {{ langSelected === "EN" ? "Back" : "Retour" }}
              </p>
            </div>
          </nuxt-link>
        </div>
        <div v-else class="message-body">
          <h1>Pronostics :</h1>

          <strong>Comment faire mes pronostics ?</strong>
          <br />Dans ton espace contest tu prends position sur les matchs du
          round. Les matchs sont choisis par le créateur du round. Tu définis le
          score pour chacune des deux équipes du match sélectionné.
          <br />
          <br />
          <strong
            >Pourquoi je ne vois pas tous les matchs d'une compétition notamment
            les phases finales (quarts de finale, demi-finales, finale) au début
            d'une compétition ?</strong
          >
          <br />A la différence d'autres sites, on ne pronostique sur
          footfoot.co que sur les prochains matchs de l’équipe dont on connait
          précisément les protagonistes. Il faut donc attendre la fin des matchs
          de poule pour connaitre les équipes qui vont s'affronter dans la phase
          finale et donc de pouvoir les pronostiquer.
          <br />
          <br />
          <strong
            >Jusqu'à quand est-ce que je peux pronostiquer sur un match
            ?</strong
          >
          <br />Tu peux pronostiquer sur un match à tout moment jusqu'à l'heure
          de début du match. En revanche, une fois l'heure dépassée, il n'est
          plus possible de pronostiquer sur ce match.
          <br />
          <br />
          <strong>Comment voir les pronostics des autres joueurs ?</strong>
          <br />Sur le classement de chaque round, tu peux voir les pronos des
          autres participants.
          <br />
          <br />
          <strong
            >Est-il possible à l’organisateur d'un contest de bloquer les
            pronostics en avance pour les joueurs, par exemple, à une date fixe
            prédéfinie ?</strong
          >
          <br />Non, cette fonctionnalité n'est pas proposée.
          <br />
          <br />
          <strong
            >Comment fonctionnent les pronostics pour les matchs à élimination
            directe ?</strong
          >
          <br />On pronostique le score jusqu'au bout des prolongations (120
          minutes). le système de pronostic fonctionne exactement comme pour un
          match classique sauf que le score est celui au bout de 120 minutes et
          non 90 minutes. <br />Le nombre de points gagnés ne dépend pas du
          résultat de la séance de tirs au but.
          <br />
          <br />
          <strong
            >Je ne vois pas l'option pour préciser le vainqueur en cas de match
            nul.</strong
          >
          <br />Sur footfoot nous prenons en compte le score avant les séances
          de pénalty.
          <br />
          <br />

          <h1>Points :</h1>
          <strong
            >Quel est le score pris en compte en cas de prolongations ?</strong
          >
          <br />Le score pris en compte est celui à la fin des prolongations. En
          cas de tirs au but, le résultat du match est considéré comme nul.
          <br />
          <br />
          <strong>Calcul des points :</strong>
          - L’attribution des points dépend du % de pronos contre toi parmi tous
          les pronos du site. <br />- Par exemple, si tu as fait un bon prono
          donnant l'équipe à domicile vainqueur, et que 23% des pronos ont donné
          le même résultat que toi, tu gagnes 100 - 23 =
          <strong class="has-text-contest">77 points</strong>. <br />- Le score
          exact permet d'obtenir un
          <strong class="has-text-contest">bonus</strong> : Il multiplie les
          points obtenus par 2, soit 77 points de bonus dans notre exemple pour
          un total de
          <strong class="has-text-contest">144 points</strong>.<br /><br />
          <strong
            >Sur footfoot, au début du round chacun commence avec 100 points,
            c'est l'équivalent de la cave au Poker. Tu as la possibilité de
            miser ces points :</strong
          >
          <br />- <strong class="has-text-contest">La mise</strong> permet de
          gagner plus de points. <br />Dans notre exemple, tu as gagné 77 pts
          avec le bon résultat. <br />Si tu as misé
          <strong class="has-text-contest">20 pts</strong> sur ce pari, ta mise
          te rapporte <strong class="has-text-contest">15,4 pts</strong>.
          (77*20/100); <br />Si tu avais en plus le bon score, ta mise t'aurais
          rapporté <strong class="has-text-contest">30,8 pts</strong>.
          (144*20/100); <br />... Un mauvais resultat tu perds ta mise.<br />
          Ta cave augmente ou diminue en fonction des points que tu gagnes ou
          perds. A chaque match tu peux donc miser au maximum l'ensemble de tes
          points disponibles.
          <br />
          <br />

          <strong
            >En cas d'égalité de points à la fin du round, que se passe-t-il
            ?</strong
          >
          <br />En cas d'égalité de points, l'ordre d'inscription au round
          départage les joueurs. <br />Si 3 joueurs ont le même nombre de
          points, le 1 <sup>er</sup> des 3 sera le 1 <sup>er</sup> inscrit au
          round, puis le 2 <sup>nd</sup> et enfin le 3 <sup>ème</sup>.
          <br />
          <br />
          <nuxt-link
            class="pointer"
            :to="'/contest/' + this.$route.params.contestId"
          >
            <div class="betButton">
              <p class="button is-medium has-text-contest" type="button">
                {{ langSelected === "EN" ? "Back" : "Retour" }}
              </p>
            </div>
          </nuxt-link>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { getContestMain, registerContest } from "@/server/apiContest";
import moment from "moment";

export default {
  data() {
    return {
      total: 0,
      loading: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 800,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      exemplePointModal: false,
      isSwitched: false,
      isClosed: false,
      contest: [],
    };
  },
  components: {
    repartitionGain: () => import("@/components/modal/repartitionGain"),
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    moment: function (time) {
      return moment(time);
    },
    seeExemple() {
      this.exemplePointModal = true;
    },
  },
  mounted() {
    this.loading = true;
    getContestMain(this.$route.params.contestId).then((contest) => {
      if (contest === "no contest") {
        this.$router.push("/notFound");
      } else {
        this.loading = false;
        this.contest = contest;
      }
    });
  },
};
</script>
<style scoped>
.pointer {
  text-decoration: none !important;
}
.leaderBoardHead {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  width: 90%;
}
.betButton {
  display: flex;
  justify-content: center;
  align-self: center;
}
.backContest {
  font-size: 2rem;
}
.mainContent {
  margin: 1rem 5%;
}

.message-header > p {
  font-weight: bold;
}
.message.is-warning .message-header {
  background-color: #ff7d00;
  color: #eef1f7;
}
.message.is-warning .message-body {
  border-color: #ff7d00;
  color: #192b41;
}
strong {
  color: #ff7d00;
}
div {
  font-size: 1.2rem !important;
}
h1 {
  font-size: 2.2rem !important;
  padding-bottom: 1rem;
  align-self: center;
}
@media screen and (max-width: 768px) {
  .backContest {
    font-size: 2rem;
    padding: 10px;
  }
  h1 {
    font-size: 1.2rem !important;
  }
  div {
    font-size: 0.8rem !important;
  }
  .mainContent {
    margin: 0.1rem;
  }
}
</style>
