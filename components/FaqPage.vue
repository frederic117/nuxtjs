<template>
  <section>
    <div class="leaderBoardHead">
      <h1 class="column is-9 is-bold has-text-contest is-size-1">
        <strong>footfoot.co - FAQ</strong>
      </h1>
      <div @click="backToPrevious()" class>
        <p class="backContest">
          <i class="fa fa-arrow-circle-left"></i>
        </p>
      </div>
    </div>

    <div v-if="langSelected == 'EN'" class="mainContent">
      <article class="message is-warning">
        <div class="message-header">
          <p>Général</p>
        </div>
        <div class="message-body">
          <strong>Is it free to use footfoot?</strong>
          <br />Yes, the whole site and the mobile application are totally free.
          You can organize your own private prediction contests with whoever you
          want without paying a cent.
          <br />
          <br />
          <strong>Can I bet money on footfoot?</strong>
          <br />The organizer of a round of contest has the possibility to ask
          his friends to participate. Please note that the law tolerates betting
          "as long as the sports bet remains in the private circle". - between
          friends or family. To help you, it is possible to the organization of
          a contest to ask your friends for a contribution. The amount of the
          global fee is displayed on the contest screen. footfoot.co is not
          responsible for the amount of money you decide to bet with each other.
          <br />
          <br />
          <strong>What are the competitions offered on footfoot?</strong>
          <br />footfoot.co allows you to predict on most of the football soccer
          competitions of the moment: national championships, but also but also
          world and continental cups: Ligue 1, Serie A, Liga, Premier League,
          Bundesliga, Champions League, World Cup, Euro, etc.
          <br />
          <br />
          <strong>How are the matches of a competition updated?</strong>
          <br />The result of the matches of a competition is updated
          automatically when a match ends, starts or a goal is scored. scored.
          Each of these events automatically triggers the update of the the
          predictions associated with the match.
          <br />
          <br />
        </div>
      </article>
      <article class="message is-warning">
        <div class="message-header">
          <p>Pronostics</p>
        </div>
        <div class="message-body">
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
        </div>
      </article>
      <article class="message is-warning">
        <div class="message-header">
          <p>Points</p>
        </div>
        <div class="message-body">
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
        </div>
      </article>
      <article class="message is-warning">
        <div class="message-header">
          <p>Contest</p>
        </div>
        <div class="message-body">
          <strong>What is a contest?</strong>
          <br />A contest is a prediction competition between friends. It is
          divided into rounds, consisting of a list of matches on which to make
          predictions. Attention, at each creation of a round, the members of
          the contest members must register to participate. The winner of the
          round is the player with the most points at the end of the round. A
          leaderboard of the contest allows to follow the ranking of the
          participants on all the rounds.
          <br />
          <br />
          <strong>How many people can participate in the same contest?</strong>
          <br />When you join or create a private contest, the number of
          participants in a single contest is limited to 1000.
          <br />
          <br />
          <strong>How to join a contest?</strong>
          <br />To join a contest, you must create your contest or have received
          an invitation link from one of the participants.
          <br />
          <br />
          <strong>Can I participate in several contests?</strong>
          <br />Yes, you can organize and participate in as many contests as you
          want.
          <br />
          <br />
          <strong>Who has access to private contests?</strong>
          <br />Only participants in a private contest have access to it. No
          other user or visitor to the site can see or interact with the
          contest. In addition, messages exchanged within the contest are only
          visible visible only to the members of the contest.
          <br />
          <br />
          <!-- <strong>Peut-on me refuser de participer à un contest privé ?</strong><br>
                      Lorsque vous rejoignez un contest privé, votre participation peut-être rejetée par un administrateur du contest. Vous n'en faites alors plus partie.
					<br><br>-->
          <strong>What is a contest organizer and what is his role?</strong>
          <br />A contest organizer is in charge of giving it a name, choosing
          the choose the matches of the rounds and define an amount if he wants
          to a prize pool.
          <br />
          <br />
          <strong>How to invite other participants to join a contest?</strong>
          <br />All participants of a contest can invite other participants by
          using the participants by using the "invite participants" button and
          by sending an email or sending an email or an invitation link to their
          friends.
          <br />
          <br />
          <strong
            >On some games, the name of the teams does not appear, is this
            normal?</strong
          >
          <br />Yes, this is quite normal, especially for matches in the
          tournament phase. The name of the teams of the concerned matches will
          be updated automatically by the application as the competition
          progresses.
          <br />
        </div>
      </article>
    </div>
    <div v-else class="mainContent">
      <article class="message is-warning">
        <div class="message-header">
          <p>Général</p>
        </div>
        <div class="message-body">
          <strong>Est-ce que l'utilisation du site est gratuite ?</strong>
          <br />Oui. L'ensemble du site ainsi que l'application mobile sont
          totalement gratuits. Tu peux organiser tes contests de pronostics
          privés avec qui tu veux sans payer un centime.
          <br />
          <br />
          <strong>Peut-on parier de l'argent sur le site ?</strong>
          <br />L'organisateur d'un round de contest a la possibilité de
          demander une participation à ses amis. Attention, la loi tolère les
          mises “Tant que le pari sportif reste de l’ordre du cercle privé" -
          entre copains ou en famille. Pour t'aider, il est possible lors de
          l’organisation d’un contest de demander une cotisation à tes amis. Le
          montant de la cagnote globale est affichée sur l’écran du contest.
          footfoot.co n’est pas responsable des sommes que vous décidez de
          parier entre vous.
          <br />
          <br />
          <strong>Quelles sont les compétitions proposées sur ce site ?</strong>
          <br />footfoot.co te permet de pronostiquer sur la plupart des
          compétitions de football du moment : championnats nationaux, mais
          aussi coupes mondiales et continentales : Ligue 1, Série A, Liga,
          Premier Ligue, Bundesliga, Ligue des champions, Coupe du Monde, Euro,
          etc.
          <br />
          <br />
          <strong
            >Comment sont mis à jour les matchs d'une compétition ?</strong
          >
          <br />Le résultat des matchs d'une compétition est mis à jour
          automatiquement lorsqu'un match se termine, démarre, ou qu'un but est
          marqué. Chacun de ces événements déclenche automatiquement la mise à
          jour des pronostics associés au match.
          <br />
          <br />
        </div>
      </article>
      <article class="message is-warning">
        <div class="message-header">
          <p>Pronostics</p>
        </div>
        <div class="message-body">
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
        </div>
      </article>
      <article class="message is-warning">
        <div class="message-header">
          <p>Points</p>
        </div>
        <div class="message-body">
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
        </div>
      </article>
      <article class="message is-warning">
        <div class="message-header">
          <p>Contest</p>
        </div>
        <div class="message-body">
          <strong>Qu'est-ce qu'un contest ?</strong>
          <br />Un contest est une compétition de pronostics entre amis. Il se
          découpe en rounds, constitués d'une liste de matchs sur lesquels
          pronostiquer. Attention, à chaque création de round, les membres du
          contest doivent s'incrire pour participer. Le vainqueur du round est
          le joueur ayant le plus de points à la fin de ce dernier. Un
          leaderboard du contest permet de suivre le classement des participants
          sur l'ensemble des rounds.
          <br />
          <br />
          <strong
            >Combien de personnes peuvent participer à un même contest ?</strong
          >
          <br />Lorsque tu rejoins ou créé un contest privé, le nombre de
          participants sur un même contest est limité à 1000.
          <br />
          <br />
          <strong>Comment rejoindre un contest ?</strong>
          <br />Pour rejoindre un contest, tu dois créér ton contest ou avoir
          reçu un lien d'invitation par l'un des participants.
          <br />
          <br />
          <strong>Est-ce que je peux participer à plusieurs contests ?</strong>
          <br />Oui, tu peux organiser et participer à autant de contests que tu
          le souhaites.
          <br />
          <br />
          <strong>Qui a accès aux contests privés ?</strong>
          <br />Seuls les participants à un contests privé y ont accès. Aucun
          autre utilisateur ou visiteur du site ne peut voir ou interagir avec
          le contest. De plus les messages échangés dans le cadre du contest ne
          sont visibles que par les membres du contest.
          <br />
          <br />
          <!-- <strong>Peut-on me refuser de participer à un contest privé ?</strong><br>
                      Lorsque vous rejoignez un contest privé, votre participation peut-être rejetée par un administrateur du contest. Vous n'en faites alors plus partie.
					<br><br>-->
          <strong
            >Qu'est ce qu'un organisateur de contest et quel est son rôle
            ?</strong
          >
          <br />Un organisateur de contest a la charge de lui donner un nom, de
          choisir les matchs des rounds et de définir un montant si il souhaite
          constituer une cagnotte.
          <br />
          <br />
          <strong
            >Comment inviter d'autres participants à rejoindre un contest
            ?</strong
          >
          <br />Tous les participants d’un contest peuvent inviter d’autres
          participants en utilisant le bouton « inviter des participants » et en
          envoyant un email ou un lien d'invitation à ses amis.
          <br />
          <br />
          <strong
            >Sur certains matchs, le nom des équipes n'apparaît pas, est-ce
            normal ?</strong
          >
          <br />Oui c'est tout à fait normal, notamment pour les matchs en phase
          de tournoi. Le nom des équipes des matchs concernés sera mis à jour
          automatiquement par l'application au fur et à mesure de la
          compétition.
          <br />
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
  methods: {
    backToPrevious() {
      this.$router.back();
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
.leaderBoardSection {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.leaderBoardHead {
  padding: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
}

.backContest {
  font-size: 2rem;
}
.dateMatch {
  min-width: 60px !important;
}
textarea {
  width: 100%;
  height: 20vh;
}
.matcheschoice {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.bRadio {
  margin-left: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

.NameContest {
  display: flex;
  justify-content: center;
}
.inputCore {
  margin-top: 5px;
  border: solid;
  border-color: #ff7d00;
  padding: 5px;
  font-size: 1.2rem;
}
.buttonLogin {
  min-width: 25%;
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #192b41 !important;
  border-color: #192b41 !important;
  background-color: #192b41 !important;
  color: #eef1f7 !important;
}

.buttonLogin:focus,
.buttonLogin:hover {
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #192b41 !important;
  border-color: #192b41 !important;
  background-color: #eef1f7 !important;
  color: #192b41 !important;
}
.main {
  background-color: #eef1f7;
}
.content {
  display: flex;
  flex-direction: column;
}
.is-italic {
  font-style: italic;
}
.mainContent {
  margin: 1rem 5%;
}

.message-header > p {
  font-weight: bold;
}
.message.is-warning .message-header {
  background-color: #192b41;
  color: #eef1f7;
}
.message.is-warning .message-body {
  border-color: #192b41;
  color: #192b41;
}
.modal-content {
  background-color: #fff;
  padding: 0%;
  margin: 1%;
  border-radius: 3%;
  border: solid, #192b41;
}
strong {
  color: #192b41;
}
li {
  list-style-type: disc;
}
.seeExemple {
  cursor: pointer;
}

.loggiin {
  justify-content: CENTER;
  display: FLEX;
  padding-bottom: 1rem;
}
.mediaModal {
  background-color: #fff;
  padding: 5%;
  margin: 5%;
  border-radius: 3%;
  border: solid, #192b41;
}
.content ul {
  margin-top: 0rem;
}
.tagWrapper {
  align-self: center !important;
}
.taille {
  width: 90px;
}
td {
  height: 100px !important;
}
.playerPic {
  max-height: 48px !important;
  min-height: 48px !important;
  min-width: 48px !important;
  max-width: 48px !important;
}
.playerPic > img {
  border-radius: 50% !important;
}
.teamName {
  align-self: center;
  min-width: 30% !important;
}
.tag {
  align-self: center;
}
.team {
  min-width: 25%;
}
.bullsAndBearsPicVs {
  width: 15%;
  display: flex;
  justify-content: center;
  align-self: center;
}
td > span {
  display: flex;
  justify-content: center;
}
.matchProno {
  display: flex;
  justify-content: space-evenly;
}
.navbar.is-wc {
  background-color: #a92521 !important;
  color: #eef1f7 !important;
  position: relative;
}
.is-wc {
  color: #a92521 !important;
}

.displayFlex {
  display: flex;
  margin-bottom: 0.5rem !important;
}
.groupe {
  margin-bottom: 0.5rem !important;
  font-size: 2rem !important;
}
.ligue-img {
  width: auto;
  max-height: 90px !important;
}
.flag-img {
  cursor: pointer;
}

.flag-img:hover {
  border-bottom-color: #192b41;
  border-top-color: transparent;
}
.has-text-yellow {
  color: #ffcf00 !important;
}
.positionClass {
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
  border-radius: 3px;
  margin: 2px;
}
.is-greyLit {
  background-color: #778899;
  color: #eef1f7;
  border-radius: 3px;
  margin: 2px;
}
.is-blueInfo {
  background-color: #3273dc;
  color: #eef1f7;
  border-radius: 3px;
  margin: 2px;
}
.is-blue {
  background-color: #192b41;
  color: #eef1f7;
}
.is-greyLit {
  background-color: #778899;
  color: #eef1f7;
}
.is-red {
  background-color: #eb412d;
  color: #eef1f7;
  border-radius: 3px;
  margin: 2px;
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
.trendingWrapper {
  padding-top: 0rem;
}
div {
  font-size: 1.2rem !important;
}
h1 {
  font-size: 3rem !important;
  padding-bottom: 1rem;
  align-self: center;
}
img {
  max-height: 64px !important;
}
.has-text-centered {
  font-size: 1rem !important;
  vertical-align: middle !important;
}
.container {
  margin-bottom: 2rem !important;
}
.flag {
  justify-content: space-evenly;
  display: flex;
}
.crypto {
  color: #f7931a !important;
}
@media screen and (max-width: 768px) {
  .backContest {
    font-size: 1.2rem;
  }
  .tableauMatch {
    margin: 0px !important;
    padding: 0px !important;
  }
  h1 {
    font-size: 1.5rem !important;
  }
  td {
    height: auto !important;
  }
  .vs {
    align-self: center;
    max-height: 22px !important;
  }
  .teamName {
    align-self: center;
    min-width: auto !important;
  }
  .is-large {
    font-size: 1rem !important;
  }
  .matchProno {
    max-width: 100% !important;
  }
  .displayFlex {
    display: flex;
    flex-direction: column;
  }
  .bullsAndBearsPicVs {
    width: 100%;
  }
  .is-hidden-tablet {
    display: none !important;
  }

  .ligue-img {
    max-height: 45px !important;
  }

  .flag-img {
    width: 40px;
    height: 40px !important;
  }
  .container {
    margin-bottom: 1rem !important;
  }
  .trendingWrapper {
    padding-top: 0rem;
  }
  div {
    font-size: 0.8rem !important;
  }
  .has-text-centered {
    font-size: 0.8rem !important;
  }
  .button .icon.is-small {
    height: 1.5em !important;
    width: 1.5em !important;
  }

  .navbar.is-dark {
    margin-bottom: 3% !important;
  }
  .main {
    padding: 1rem 1rem;
  }
  .mainContent {
    margin: 0.1rem 2% 2rem;
  }
}
</style>
