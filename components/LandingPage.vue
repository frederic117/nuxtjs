<template>

<section  class="hero is-fullheight">
 <div class="flag">
 <!--    <img loading="lazy"class="flag-img" @click="changeLang('EN')" src="~assets/images/ukflag.png" alt="ukFlag">
    <img loading="lazy"class="flag-img" @click="changeLang('FR')" src="~assets/images/frenchflag.png" alt="frenchFlag"> -->
  </div> 

  <div class="logo">

       <nuxt-link to="/">
      <img loading="lazy" class="insidersLogo" src="~assets/images/logo.png" alt="footfootLogo">
       </nuxt-link>

  </div>
    <div class="accroche">
        <h1 class="accrocheH1" v-if="langSelected==='EN'">We love football.<br></h1>
        <h1 class="accrocheH1" v-else>Pour l'amour du foot... Le site des supporters.<br></h1>
        <h2 class="accrocheH1" v-if="langSelected==='EN'"><span class="pointer" @click="gotoNews">NEWS</span>&nbsp&nbsp&nbsp&nbsp<span>|</span>&nbsp&nbsp&nbsp&nbsp<span class="pointer" @click="gotoLeagues">LIVE SCORES</span>&nbsp&nbsp&nbsp&nbsp<span>|</span>&nbsp&nbsp&nbsp&nbsp<span class="pointer"  @click="SignupModal">FORUMS</span>&nbsp&nbsp&nbsp&nbsp<span>|</span>&nbsp&nbsp&nbsp&nbsp<span class="pointer" @click="gotoContest">CONTESTS</span></h2>
        <h2 class="accrocheH1" v-else><span class="pointer" @click="gotoNews">ACTUS</span>&nbsp&nbsp&nbsp&nbsp<span>|</span>&nbsp&nbsp&nbsp&nbsp<span class="pointer" @click="gotoLeagues">LIVE SCORES</span>&nbsp&nbsp&nbsp&nbsp<span>|</span>&nbsp&nbsp&nbsp&nbsp<span class="pointer"  @click="SignupModal">FORUMS</span>&nbsp&nbsp&nbsp&nbsp<span>|</span>&nbsp&nbsp&nbsp&nbsp<span class="pointer" @click="gotoContest">CONTESTS</span></h2>
    </div>
    <div class="loggiin">
        <p v-if="langSelected==='EN'" class="button is-large buttonLogin" type="button" @click="LoginModal">Login</p>
        <p v-else class="button is-large buttonLogin" type="button" @click="LoginModal">connexion</p>
        <p v-if="langSelected==='EN'" class="button is-large buttonSignin" type="button" @click="SignupModal">Join</p>
        <p v-else class="button is-large buttonSignin" type="button" @click="SignupModal">rejoindre</p>
    </div>


<footer>
  <ul class="footer-list">

      <nuxt-link to="/faq"><li  class="list">FAQ</li></nuxt-link>
      <li @click="disclamerModal" class="list">CGU</li>
  </ul>
  <span>&copy; 2020 Insiders</span>
</footer>


        <b-modal :active.sync="isAPIModalActive" :width="640">
          <div class="bullbearPos">
                    <div v-if="langSelected==='EN'" class="section has-text-centered">
                        <img loading="lazy"src="~assets/images/comming_soon.png" alt="comingSoon" width="350px">
                    </div>
                    <div v-else class="section has-text-centered">
                        <img loading="lazy"src="~assets/images/Bientot_disponible.png" alt="comingSoon" width="350px">
                    </div>
                </div>
        </b-modal>

        <b-modal :active.sync="isDisclamerModalActive" :width="900">
          <div class="bullbearPos2">
            <div class="section1 has-text-centered">
                        <img loading="lazy" src="~assets/images/logo.png" alt="Insiders logo" width="350px">
                    </div>
                    <div>
                      <h1 class="has-text-centered"><strong>CONDITIONS GENERALES D’UTILISATION DU SITE footfoot.co</strong></h1>
                          <h3 class="has-text-centered">Date des conditions générales : 30/05/2020</h3><br>

                    <p><strong>Conditions générales d’utilisation du site et des services proposés.</strong><br>
                    L’utilisation du site footfoot.co implique l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites. Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment, les utilisateurs du site footfoot.co sont donc invités à les consulter de manière régulière.
Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par footfoot.co, sans qu'il ne soit nécessairement communiqué préalablement aux utilisateurs les dates et heures de l’intervention.
Le site footfoot.co est mis à jour régulièrement. De la même façon, les mentions légales peuvent être modifiées à tout moment : elles s’imposent néanmoins à l’utilisateur qui est invité à s’y référer le plus souvent possible afin d’en prendre connaissance.
</p><br>
<p><strong>Description des services fournis</strong><br>
Le Site www.footfoot.co (ci-après « le Site ») est un site d'information indépendant s’adressant aux passionnés de football, mettant gratuitement à disposition des Utilisateurs (Ci-après Internaute ou Utilisateur) un espace de discussion et fournissant un outil qui permet d’organiser des pronostics entre amis.<br><br>

<span class="has-text-red">En aucun cas le Site ne saurait être assimilé à un opérateur de jeux en ligne au sens de la loi n° 2010-476 du 12 mai 2010 relative à l’ouverture à la concurrence et à la régulation du secteur des jeux d’argent et de hasard en ligne.</span><br><br>

footfoot.co s’efforce de fournir sur le Site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
Tous les informations indiquées sur le site footfoot.co sont données à titre indicatif, et sont susceptibles d’évoluer. Par ailleurs, les renseignements figurant sur le Site ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne.

</p><br>
<p><strong>Limitations contractuelles sur les données techniques</strong><br>
Le site Internet ne pourra être tenu responsable de dommages matériels liés à l’utilisation du site. De plus, l’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis-à-jour.
</p><br>

<p><strong>Un contrat de confiance entre nous</strong><br>
Pour utiliser footfoot.co, vous devez avoir au moins 16 ans. En utilisant le Site, les Utilisateurs s’engagent :
<br>- à ne commettre aucune action pouvant constituer une infraction, telle que prévue par la Loi,
<br>- à ne pas extraire ou collecter des données personnelles d’Utilisateurs du Site par quelque procédé que ce soit, ni à tenter de le faire,
<br>- d’extraire, d’enregistrer ou d’exploiter, de quelque manière que ce soit, à d’autres fins que l’unique affichage lors de la navigation sur le présent Site, les contenus de tiers soumis à des droits de propriété intellectuelle, relatifs à la vie privée, ou relatifs à leurs données personnelles ou leur droit à l’image.
<br>- de stocker, de diffuser ou publier tout contenu illégal, préjudiciable, diffamatoire, violent, raciste, antisémite, révisionniste, incitant à la haine, contraire aux bonnes mœurs, portant atteinte à la vie privée ou aux droits privatifs de tiers.
<br>- d’usurper l’identité d’un tiers et/ou publier toute information personnelle d’un tiers
<br>- à ne pas divulguer à des tiers leurs identifiants de connexion ou tout autre élément permettant l’accès au Site. En cas de connexion frauduleuse par un tiers non inscrit avec les identifiants d’un membre, tout dommage causé par ce tiers sera réputé, sauf cas de force majeure, avoir été commis par ledit membre.
<br>
Les Utilisateurs sont seuls responsables des contenus qu’ils publient sur le site.
<br>En publiant sur le site, les Utilisateurs reconnaissent posséder l’ensemble des droits et autorisations nécessaires pour effectuer leurs publications et acceptent que ces dernières deviennent publiques et librement accessibles sur le Site.

<br>Dans le cas où il enfreindrait les présentes conditions générales, la société footfoot.co se réserve le droit de supprimer toute publication d’un Utilisateur sur le Site, voire, en cas d’infractions d’une particulière gravité ou répétées, de supprimer le compte de l’Utilisateur responsable.

<br>Un message contraire à la charte pourra être modifié. La modification peut concerner une partie ou la totalité du message. Outre cela, l’utilisateur postant un message contraire à la présente charte s’expose à un bannissement temporaire du Site. Durant la durée de ce bannissement l’utilisateur ne pourra plus poster de contributions en cas de bannissement simple, et en cas de bannissement complet il ne pourra plus accéder au Site.

<br>Le Site constitue un lieu privé ouvert au public sous la responsabilité de footfoot.co qui en détermine librement les modalités de fonctionnement et d'utilisation et qui peut donc prendre les initiatives nécessaires au bon fonctionnement du forum de discussion.

</p><br>

<p><strong>Propriété intellectuelle et contrefaçons</strong><br>
footfoot.co ne revendique aucun droit de propriété sur les informations que vous envoyez pour renseigner votre compte ou par l'intermédiaire de nos Services. Vous devez disposer des droits nécessaires sur les informations que vous envoyez pour renseigner votre compte footfoot.co ou par l'intermédiaire de nos Services et de l'autorisation requise pour octroyer les droits et licences mentionnés dans nos Conditions.
Droits d’footfoot.co. Nous possédons l'ensemble des droits d'auteur et droits relatifs aux marques, aux domaines, aux logos, à la présentation, aux secrets commerciaux, aux brevets et autres droits de propriété intellectuelle associés à nos Services. Vous ne pouvez pas utiliser nos droits d'auteur et droits relatifs aux marques, aux domaines, aux logos, à la présentation et aux brevets ou nos autres droits de propriété intellectuelle, sauf si vous disposez de notre autorisation expresse.
 
<br>Afin que nous puissions exploiter et proposer nos Services, vous octroyez à footfoot.co une licence internationale, non exclusive, exempte de redevance, permettant l'octroi d'une sous-licence et cessible, nous autorisant à utiliser, reproduire, distribuer, afficher et exploiter les informations (y compris le contenu) que vous téléchargez, soumettez, stockez, envoyez ou recevez sur nos Services ou par leur intermédiaire, ainsi qu'à en créer des œuvres dérivées. Les droits que vous octroyez en vertu de cette licence sont destinés aux fins limitées qui sont d'exploiter et de fournir de nos Services (par exemple, pour nous permettre d'afficher votre photo de profil et votre message de statut, transmettre vos messages, stocker vos messages sur nos serveurs).

</p><br>

<p><strong>Limitations de responsabilité</strong><br>
N’agissant qu’en tant que simple hébergeur, la Société footfoot.co n’est pas responsable du déroulement du contest. La Société footfoot.co décline toute responsabilité pour les dommages qui résulteraient de l’organisation d’un contest privé en ligne et des informations qu’ils contiennent.
<br>La société footfoot.co n’est pas responsable des paris, contrats, transactions conclus entre les utilisateurs du site.
<br>De la même façon, footfoot.co ne pourra être tenue pour responsable en cas de défaillance dans la remise d’un lot gagné par un Utilisateur au cours d’un contest privé organisé par l’un des utilisateurs du site.
<br>En toute hypothèse, la Société footfoot.co ne pourra être tenue pour responsable de tous dommages directs/ indirects qu’ils soient prévisibles ou non, de toutes pertes de profits, perte de revenus, perte de chance, perte de données, perte économique ou commerciale qu’elle qu’en soit la nature subie par un Utilisateur du Site et de la survenance d’un évènement de force majeur.

<br><br>La Société footfoot.co ne garantit en aucun cas l’exactitude, l’exhaustivité ou l’actualité du contenu du Site (informations, pronostics, conseils, …), l’ensemble des données proposées par le Site revêtant un caractère purement indicatif. Par conséquent, la Société footfoot.co n’est pas responsable des éventuelles omissions, altérations, erreurs ou délais de mise à jour de ces informations et de leurs éventuelles conséquences.

<br><br>En aucun cas la Société footfoot.co ne saurait être tenue pour responsable : 

<br>- de tout dommage résultant d’un dysfonctionnement informatique et technique de l’Utilisateur, de la perte d’accès au site provoquée par la panne du réseau de communication électronique ou du fournisseur d’accès de l’Utilisateur, par des opérations de maintenance ou des mises à jour,
<br>- de la perte de toute donnée, des éventuelles modifications frauduleuses des données ou contributions publiées sur le Site,
<br>- de l’éventuelle transmission de virus ou des éventuels risques de bug pouvant survenir lors de la navigation sur le Site,
<br>- de la mauvaise utilisation du site par l’Utilisateur, de toute faute, omission, négligence ou défaillance de l’Utilisateur,
<br>- de la divulgation ou de l’utilisation illicite d’un mot de passe remis de manière confidentielle à l’Utilisateur,

</p><br>

<p><strong>Collecte des données personnelles</strong><br>
Dans le cadre du Règlement Général sur la Protection des Données, il vous est demandé de donner votre consentement explicite à la collecte et au traitement de vos données personnelles dans le cadre de l'utilisation de cette plateforme.

  <br>Les données personnelles collectées et leur utilisation sont décrites ci-après :<br>
  <ul>
    <li>Identifiant : cet identifiant est libre et vous pouvez choisir de ne pas le faire correspondre à votre identité réelle. Dans tous les cas, cet identifiant peut-être affiché dans le site ou l'application et est potentiellement visible de tout autre utilisateur de la plateforme. Aucun traitement spécifique n'est réalisé.</li>
    <li>  Adresse Mail : votre adresse mail est utilisée pour communiquer directement avec vous : informations sur la plateforme, procédure de réinitialisation de mot de passe et envoi de rappels de matchs à pronostiquer. Une adresse mail confirmée est nécessaire pour l'utilisation de certaines fonctions du site ou application. Cette information n'est en aucun cas partagée aux autres utilisateurs du site ou avec d'autres organisations.</li>
    <li>  Image de profil : cette image est libre et vous pouvez choisir de ne pas refléter votre identité réelle. Dans tous les cas, cette image est affichée dans la plateforme et est potentiellement visible de tout autre utilisateur de la plateforme. Aucun traitement spécifique n'est réalisé.</li>
    <li>  Identifiant de téléphone portable (dans le cas de l'utilisation des applications mobiles) : cet identifiant est unique et ne peut être utilisé par aucune autre application et n'est donc jamais communiqué. Il est utilisé pour vous envoyer des notifications liées à l'utilisation de la plateforme : informations, rappels de pronostics, interactions sur les forums de discussion.</li>
    <li>  Adresse IP, "cookies" ou espace de stockage local de votre navigateur utilisés à des fins :</li>
    <ul>
      <li>statistiques</li>
      <li>de connexion automatique à votre compte</li>
    </ul>
  </ul>
</p>
<br>
<p><strong>footfoot.co en entreprise</strong><br>
L’utilisation de la plateforme footfoot.co n’engage en rien le site footfoot.co et les personnes qui travaillent sur le site sur la réussite de votre concours notamment par rapport à la disponibilité de la plateforme. La responsabilité de footfoot.co et des personnes travaillant sur le site ne pourra en aucun cas être engagée notamment si le site venait à être indisponible pendant le déroulement d’un contest.
</p><br>
<p><strong>Droit applicable et attribution de juridiction</strong><br>
Tout litige en relation avec l’utilisation du site footfoot.co est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
</p><br>
<p><strong>Lexique</strong><br>
Utilisateur : Internaute se connectant, utilisant le site susnommé.
Informations personnelles : « les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978).
</p><br>
                </div>
              </div>
        </b-modal>
    </section>
</template>

<script>
import { getUser } from "@/server/api";

export default {
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      isAPIModalActive: false,
      isDisclamerModalActive: false,
      isLoading: false,
      user: "",
    };
  },

  methods: {
    gotoLeagues() {
      this.$router.push("/leagues");
    },
    gotoNews() {
      this.$router.push("/signup");
    },
    gotoForum() {
      this.$router.push("/forum");
    },
    gotoContest() {
      this.$router.push("/contest");
    },
    disclamerModal() {
      this.isDisclamerModalActive = true;
    },
    apiModal() {
      this.isAPIModalActive = true;
    },
    SignupModal() {
      this.$router.push("/signup");
    },
    LoginModal(autenticate) {
      this.$router.push("/login");
    },

    changeLang(lang) {
      if (lang === "EN") {
        this.$buefy.dialog.alert("Coming soon");
      } else {
        this.$store.commit("var/setNewLang", lang);
      }
    },
  },
  watch: {
    $route() {
      this.$emit("islanding");
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        this.$router.push("/mypage/all");
      } else {
      }
    },
  },
  mounted() {
    this.$emit("islanding");
    if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
      this.$router.push("/mypage/all");
    } else {
    }
  },
  destroyed() {
    this.$emit("isnotlanding");
  },
  head() {
    return {
      title:
        "News, vidéos, pronostics, classement, résultats, matchs : Tout pour le football",
      meta: [
        {
          hid: `description`,
          name: "description",
          content:
            "News, vidéos, pronostics, classement, résultats, matchs : Pour l'amour du foot",
        },
        {
          hid: `keywords`,
          name: "keywords",
          keywords:
            "News, vidéos, pronostics, classement, résultats, matchs : Tout pour le football",
        },
        {
          hid: `og:title`,
          property: "og:title",
          content:
            "News, vidéos, pronostics, classement, résultats, matchs : Tout pour le football",
        },
        {
          hid: `og:url`,
          property: "og:url",
          content: "https://www.footfoot.co" + this.$route.fullPath,
        },
        {
          hid: `og:image`,
          property: "og:image",
          content: "/icon.png",
        },
        {
          hid: `og:description`,
          property: "og:description",
          content:
            "News, vidéos, pronostics, classement, résultats, matchs : Pour l'amour du foot",
        },
        {
          hid: `twitter:card`,
          name: `twitter:card`,
          property: "twitter:card",
          content: "summary",
        },
        {
          hid: `twitter:site`,
          name: `twitter:site`,
          property: "twitter:site",
          content: "@footfoot.co",
        },
        {
          hid: `twitter:creator`,
          name: `twitter:creator`,
          property: "twitter:creator",
          content: "@InsidersFoot",
        },
        {
          hid: `twitter:title`,
          name: `twitter:title`,
          property: "twitter:title",
          content:
            "News, vidéos, pronostics, classement, résultats, matchs : Pour l'amour du foot",
        },
        {
          hid: `twitter:description`,
          property: "twitter:description",
          content:
            "News, vidéos, pronostics, classement, résultats, matchs : Pour l'amour du foot",
        },
        {
          hid: `twitter:image`,
          name: `twitter:image`,
          property: "twitter:image",
          content: "/icon.png",
        },
      ],
    };
  },
};
</script>

<style scoped>
.insidersLogo {
  height: auto;
  max-width: 90%;
}
.is-fullheight {
  background-color: #eef1f7 !important;
  padding: 0rem !important;
}
.section {
  padding: 0rem !important;
}
.section1 {
  padding-top: 0rem !important;
  margin-bottom: 1rem;
}
.bullbearPos {
  display: flex;
  align-items: center;
  border-radius: 5px;
  justify-content: space-evenly;
  background-color: #eef1f7;
  padding: 1rem;
}
.bullbearPos2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  justify-content: space-evenly;
  background-color: #eef1f7;
  padding: 1rem;
}
.accroche {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
}
.accrocheH1 {
  font-size: 2rem;
  color: #192b41;
  text-align: center;
  margin-bottom: 0.5rem;
}
.accrocheH1 > span {
  font-weight: bold;
  color: #192b41;
}
.accrocheP {
  font-size: 1.5rem;
  color: #192b41;
  text-align: center;
  font-style: italic;
}
.flag {
  display: flex;
  justify-content: flex-end;
}
.flag-img {
  width: 10vh;
  height: 10vh;
  padding: 5px;
  cursor: pointer;
}

.buttonSignin {
  margin-left: 2.5%;
  min-width: 20%;
  border-color: #192b41 !important;
  background-color: #eef1f7 !important;
  color: #192b41 !important;
}
.buttonLogin {
  margin-right: 2.5%;
  min-width: 20%;
  border-color: #192b41 !important;
  background-color: #eef1f7 !important;
  color: #192b41 !important;
}

.buttonLogin:focus,
.buttonLogin:hover {
  font-weight: bolder !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #192b41 !important;
  border-color: #eef1f7 !important;
  background-color: #192b41 !important;
}
.buttonSignin:focus,
.buttonSignin:hover {
  font-weight: bolder !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #192b41 !important;
  border-color: #eef1f7 !important;
  background-color: #192b41 !important;
}
.logo {
  display: flex;
  justify-content: space-evenly;
  margin: 0% 15%;
}
.loggiin {
  display: flex;
  justify-content: center;
  padding-bottom: 2.5rem;
}

footer {
  text-align: center;
  background-color: #eef1f7;
}

.footer-list {
  display: inline-block;
  cursor: pointer;
}
.list {
  border: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
  display: inline-block;
  font-weight: bold;
  margin: 0 10px;
  color: #1c5380;
}
span {
  color: grey;
  font-weight: 400;
}
.desktopNone {
  display: none;
}
@media screen and (max-width: 768px) {
  .logo {
    display: flex;
    justify-content: space-evenly;
    margin: 0% 5%;
  }
  .mobileNone {
    display: none;
  }
  .desktopNone {
    display: block;
  }
  .flag-img {
    width: 3rem;
    height: 3rem;
  }
  .insidersLogo {
    height: auto;
    max-width: 100%;
  }
  .section {
    padding: 1rem 1.5rem;
  }
  .accrocheH1 {
    font-size: 0.8rem;
  }
  .accrocheH1 > span {
    font-size: 0.75rem !important;
  }
  .accrocheP {
    font-size: 1rem;
  }
  .accroche {
    padding: 0rem;
  }
  h1 {
    font-size: 0.9rem !important;
  }
}
</style>
