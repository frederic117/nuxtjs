<template>
  <div>
    <div class="dark-wrapper">
      <!-- Landing page Hero -->
      <section class="hero is-fullheight is-transparent">
        <div class="hero-head">
          <div class="navWrapper">
            <div class="top2">
              <div class="pointer">
                <a
                  :href="`${
                    langSelected
                      ? 'https://www.footfoot.co/mypage/all?lang=' +
                        langSelected.toLowerCase()
                      : 'https://www.footfoot.co/mypage/all'
                  }`"
                >
                  <img
                    loading="lazy"
                    class="logoInsiders"
                    src="~/assets/images/logo.png"
                    alt="footfootLogo"
                  />
                </a>
              </div>
            </div>
            <div class="displayFlex">
              <div class="nav-profile">
                <a
                  v-if="$auth && $auth.user && $auth.user._id"
                  :href="`https://www.footfoot.co/dashboard/${
                    $auth.user._id
                  }?lang=${langSelected.toLowerCase()}`"
                >
                  <div class="image is-40x40 is-circle">
                    <img
                      loading="lazy"
                      class="imgProfile"
                      :src="$auth.user.picProfile"
                      alt="Image"
                    />
                  </div>
                </a>
                <div v-else class="nav-profile">
                  <a
                    :href="`${
                      langSelected
                        ? 'https://www.footfoot.co/login?lang=' +
                          langSelected.toLowerCase()
                        : 'https://www.footfoot.co/login'
                    }`"
                  >
                    <div class="button">login</div>
                  </a>
                  <img
                    v-if="langSelected == 'EN'"
                    loading="lazy"
                    class="flag-img"
                    @click="changeLang('FR')"
                    src="~assets/images/frenchflag.png"
                    alt="frenchFlag"
                  />
                  <img
                    v-else
                    loading="lazy"
                    class="flag-img"
                    @click="changeLang('EN')"
                    src="~assets/images/ukflag.png"
                    alt="ukFlag"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hero Image and Title -->
        <div class="hero-body">
          <div class="container">
            <figure class="">
              <div>
                <img
                  loading="lazy"
                  class="mobileOnly ligue-euro ligueDesk invertOk"
                  src="/logoLigue/1326.png"
                  alt="logoEuro"
                />
              </div>
            </figure>
            <div class="columns is-vcentered upperLand" id="firstUp">
              <!-- Landing page Title -->
              <div class="column is-5 landing-caption">
                <h1
                  v-if="langSelected == 'EN'"
                  class="
                    title
                    has-text-primary
                    is-1 is-semibold is-spaced
                    main-title
                  "
                >
                  The best platform to organize your Euro prediction contest
                </h1>
                <h1
                  v-else
                  class="
                    title
                    has-text-primary
                    is-1 is-semibold is-spaced
                    main-title
                  "
                >
                  La meilleure plateforme pour organiser ton concours de pronos
                  pour l’Euro
                </h1>

                <h2
                  v-if="langSelected == 'EN'"
                  class="subtitle is-5 is-chosen-dark-grey is-thin"
                >
                  Invite your friends in two clicks and create your online
                  <strong class="has-text-contest"> footcoins</strong>
                  pool
                </h2>
                <h2 v-else class="subtitle is-5 is-chosen-dark-grey is-thin">
                  Invite en deux clics tes amis et crée ta cagnotte de
                  <strong class="has-text-contest"> footcoins</strong>
                  en ligne
                </h2>

                <br /><br class="desktopOnly" />
                <div class="has-text-centered">
                  <a
                    :href="`${
                      langSelected
                        ? 'https://www.footfoot.co/contest/create/euro?lang=' +
                          langSelected.toLowerCase()
                        : 'https://www.footfoot.co/contest/create/euro'
                    }`"
                  >
                    <div class="buttonCreateWrapper">
                      <p
                        class="button is-large buttonLoginLeaderboard"
                        type="button"
                      >
                        {{
                          langSelected == "EN"
                            ? "create a contest for the Euro!"
                            : "créer un contest pour l'Euro !"
                        }}
                      </p>
                    </div></a
                  >
                </div>
              </div>
              <div v-if="!mobile" class="desktopOnly column is-7">
                <img
                  loading="lazy"
                  class="ligue-euro invertOk euroDesktop eurologoDesktop"
                  src="/logoLigue/1326.png"
                  alt="logoEuro"
                />
              </div>
            </div>
            <div class="orangeBack">
              <div class="orangeBackchild">
                <img
                  loading="lazy"
                  class="ligue-euro invertOk"
                  src="~assets/images/coinsoccer.png"
                  alt="mise"
                />
                <div class="column is-5 landing-caption">
                  <h1 class="title whiteText is-1 is-semibold is-spaced">
                    {{
                      langSelected == "EN"
                        ? "“A poker inspired wagering game. Unique and totally addictive”"
                        : "“Un mode de jeu avec mises inspiré du poker. Unique et totalement addictif”"
                    }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hero footer -->
        <div class="hero-foot">
          <div class="container"></div>
        </div>
      </section>

      <!-- Company section -->
      <section class="solarBack section is-medium has-big-dark-gradient">
        <!-- Container -->

        <div
          v-if="langSelected == 'EN'"
          class="container fourreasonExplain"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <img
            loading="lazy"
            class="ligue-euro invertOk fourReasons"
            src="~@/assets/images/4reasonsen.png"
            alt="4reasons"
            data-aos="zoom-in"
            data-aos-delay="500"
          />
        </div>
        <div
          v-else
          class="container fourreasonExplain"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <img
            loading="lazy"
            class="ligue-euro invertOk fourReasons"
            src="~@/assets/images/4reasons.png"
            alt="4reasons"
            data-aos="zoom-in"
            data-aos-delay="500"
          />
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="300"
          class="container fourreasonExplain"
        >
          <div class="columns is-vcentered upperLand">
            <div
              class="desktopOnly column is-7"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <img
                loading="lazy"
                class="ligue-euro invertOk logoCoupe"
                src="~@/assets/images/coupe.png"
                alt="coupe"
                data-aos="zoom-in"
                data-aos-delay="500"
              />
            </div>
            <!-- Landing page Title -->

            <div class="column is-5 landing-caption">
              <h1
                class="
                  title
                  has-text-primary
                  is-1 is-semibold is-spaced
                  main-title
                "
              >
                {{
                  langSelected == "EN"
                    ? "Prediction contests between friends"
                    : "Les contests de pronos entre amis"
                }}
              </h1>

              <h2
                v-if="langSelected == 'EN'"
                class="subtitle is-5 is-chosen-dark-grey is-thin"
              >
                <strong class="has-text-contest">footfoot</strong> is the best
                platform to organize your private prediction contest.<br />
                Choose the games you want to play, then invite the participants
                of your choice to join a private space with secure messaging.<br />
                You can even choose to attach a prize pool that the best will
                share.
              </h2>
              <h2 v-else class="subtitle is-5 is-chosen-dark-grey is-thin">
                <strong class="has-text-contest">footfoot</strong> est la
                meilleure plateforme pour organiser ton concours de pronostics
                privés.<br />
                Choisis les matchs sur lesquels tu veux jouer, puis invite les
                participants de ton choix à rejoindre un espace privé avec une
                messagerie sécurisée.<br />
                Tu peux même choisir de rattacher une cagnotte que les meilleurs
                se partageront.
              </h2>
              <br /><br class="desktopOnly" />
              <div class="has-text-centered">
                <a
                  :href="`${
                    langSelected
                      ? 'https://www.footfoot.co/contest/create?lang=' +
                        langSelected.toLowerCase()
                      : 'https://www.footfoot.co/contest/create'
                  }`"
                >
                  <div class="buttonCreateWrapper">
                    <p
                      class="button is-large buttonLoginLeaderboard"
                      type="button"
                    >
                      {{
                        langSelected == "EN"
                          ? "create my contest"
                          : "créer mon contest"
                      }}
                    </p>
                  </div></a
                >
              </div>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="300"
          class="container fourreasonExplain"
        >
          <div class="columns is-vcentered upperLand">
            <!-- Landing page Title -->
            <div
              v-if="mobile"
              class="column is-7"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <img
                loading="lazy"
                class="ligue-euro invertOk euroDesktop footfieldLogo"
                src="~@/assets/images/footfield.png"
                alt="footfield"
                data-aos="zoom-in"
                data-aos-delay="500"
              />
            </div>
            <div class="column is-5 landing-caption">
              <h1
                class="
                  title
                  has-text-primary
                  is-1 is-semibold is-spaced
                  main-title
                "
              >
                {{
                  langSelected == "EN"
                    ? "News from your team"
                    : "L'actualité de ton club"
                }}
              </h1>
              <h2
                v-if="langSelected == 'EN'"
                class="subtitle is-5 is-chosen-dark-grey is-thin"
              >
                <strong class="has-text-contest">footfoot</strong> is the
                platform made for fans!<br />
                Find all the news about your club, the summaries of the matches,
                transfers, live scores, videos...
                <br />Share and comment with others...create or react to
                controversies!
              </h2>
              <h2 v-else class="subtitle is-5 is-chosen-dark-grey is-thin">
                <strong class="has-text-contest">footfoot</strong> est la
                plateforme faite pour les supporters !<br />
                Retrouve toutes les news sur ton club, les résumés des matchs,
                les transferts, les scores en direct, des vidéos...
                <br />Partage et commente avec les autres...crée ou réagit aux
                polémiques !
              </h2>

              <br /><br class="desktopOnly" />
              <div class="has-text-centered">
                <a
                  :href="`${
                    langSelected
                      ? 'https://www.footfoot.co/mypage/all?lang=' +
                        langSelected.toLowerCase()
                      : 'https://www.footfoot.co/mypage/all'
                  }`"
                >
                  <div class="buttonCreateWrapper">
                    <p
                      class="button is-large buttonLoginLeaderboard"
                      type="button"
                    >
                      {{
                        langSelected == "EN" ? "go to news" : "voir les news"
                      }}
                    </p>
                  </div>
                </a>
              </div>
            </div>
            <div
              v-if="!mobile"
              class="desktopOnly column is-7"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <img
                loading="lazy"
                class="ligue-euro invertOk euroDesktop"
                src="~@/assets/images/footfield.png"
                alt="footfield"
                data-aos="zoom-in"
                data-aos-delay="500"
              />
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          class="container fourreasonExplain"
        >
          <div class="columns is-vcentered upperLand">
            <div
              class="desktopOnly column is-7"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <img
                loading="lazy"
                class="ligue-euro invertOk logoStripe"
                src="~@/assets/images/stripe.png"
                alt="stripe"
                data-aos="zoom-in"
                data-aos-delay="500"
              />
            </div>
            <!-- Landing page Title -->

            <div class="column is-5 landing-caption">
              <h1
                class="
                  title
                  has-text-primary
                  is-1 is-semibold is-spaced
                  main-title
                "
              >
                {{
                  langSelected == "EN" ? "Secure payment" : "Paiement sécurisé"
                }}
              </h1>
              <h2
                v-if="langSelected == 'EN'"
                class="subtitle is-5 is-chosen-dark-grey is-thin"
              >
                All payments and transactions carried out on
                <strong class="has-text-contest">footfoot</strong> are perfectly
                secure, via SSL encryption by our partner Stripe, in accordance
                with the rules in force within the European Union.<br />
                In addition,
                <strong class="has-text-contest">footfoot</strong> implements
                security measures to protect the confidentiality of personal
                data and confidentiality of data and personal information
                against any attempt of unauthorized access.
              </h2>
              <h2 v-else class="subtitle is-5 is-chosen-dark-grey is-thin">
                Tous les paiements et transactions effecutés sur
                <strong class="has-text-contest">footfoot</strong> sont
                parfaitement sécurisés, via le cryptage SSL par notre partenaire
                Stripe, en application des règles en vigueur au sein de l'Union
                Européenne.<br />
                De plus, <strong class="has-text-contest">footfoot</strong> met
                en oeuvre des mesures de sécurité visant à protéger la
                confidentialité des données et des informations personnelles
                contre toute tentative d'accès sans autorisation.
              </h2>

              <br /><br class="desktopOnly" />
              <div class="has-text-centered">
                <a
                  :href="`${
                    langSelected
                      ? 'https://www.footfoot.co/signup?lang=' +
                        langSelected.toLowerCase()
                      : 'https://www.footfoot.co/signup'
                  }`"
                >
                  <div class="buttonCreateWrapper">
                    <p
                      class="button is-large buttonLoginLeaderboard"
                      type="button"
                    >
                      {{
                        langSelected == "EN"
                          ? "buy footcoins"
                          : "acheter des footcoins"
                      }}
                    </p>
                  </div></a
                >
              </div>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="300"
          class="container fourreasonExplain"
        >
          <div class="columns is-vcentered upperLand">
            <div
              v-if="mobile"
              class="column is-7"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <img
                loading="lazy"
                class="ligue-euro invertOk euroDesktop phoneScreenlogo"
                src="~@/assets/images/phoneScreen.jpg"
                alt="phoneScreen"
                data-aos="zoom-in"
                data-aos-delay="500"
              />
            </div>
            <!-- Landing page Title -->
            <div class="column is-5 landing-caption">
              <h1
                class="
                  title
                  has-text-primary
                  is-1 is-semibold is-spaced
                  main-title
                "
              >
                {{
                  langSelected == "EN"
                    ? "footfoot is also an app"
                    : "footfoot c'est aussi une appli"
                }}
              </h1>
              <h2
                v-if="langSelected == 'EN'"
                class="subtitle is-5 is-chosen-dark-grey is-thin"
              >
                You can download
                <strong class="has-text-contest">footfoot</strong> on your
                mobile, and for that you don't need to go to the store. Just go
                to footfoot.co from your mobile and let yourself be guided. If
                you want to know more about Progressive Web Apps (PWA) follow
                the link below
              </h2>
              <h2 v-else class="subtitle is-5 is-chosen-dark-grey is-thin">
                Tu peux télécharger
                <strong class="has-text-contest">footfoot</strong> sur ton
                mobile, et pour ça pas besoin d'aller sur le store. Va sur
                footfoot.co depuis ton mobile et laisse toi guider. Si tu veux
                en savoir plus sur les Progressive Web App (PWA) suis le lien
                ci-dessous
              </h2>
              <br /><br class="desktopOnly" />
              <div class="has-text-centered">
                <a
                  v-if="langSelected == 'EN'"
                  href="https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DDesktop&hl=en"
                  target="_blank"
                >
                  <div class="buttonCreateWrapper">
                    <p
                      class="button is-large buttonLoginLeaderboard"
                      type="button"
                    >
                      install a pwa
                    </p>
                  </div>
                </a>
                <a
                  v-else
                  href="https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DDesktop&hl=fr"
                  target="_blank"
                >
                  <div class="buttonCreateWrapper">
                    <p
                      class="button is-large buttonLoginLeaderboard"
                      type="button"
                    >
                      installe une pwa
                    </p>
                  </div>
                </a>
              </div>
            </div>
            <div
              v-if="!mobile"
              class="desktopOnly column is-7"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <img
                loading="lazy"
                class="ligue-euro invertOk euroDesktop"
                src="~@/assets/images/phoneScreen.jpg"
                alt="phoneScreen"
                data-aos="zoom-in"
                data-aos-delay="500"
              />
            </div>
          </div>
        </div>

        <div class="orangeFoot">
          <div class="colDir">
            <strong class="whiteText">{{
              langSelected == "EN"
                ? "need more information?"
                : "besoin de plus d'informations ?"
            }}</strong>
            <span class="whiteText"
              >{{ langSelected == "EN" ? "check the" : "consulte la" }}
              <a
                :href="`${
                  langSelected
                    ? 'https://www.footfoot.co/faq?lang=' +
                      langSelected.toLowerCase()
                    : 'https://www.footfoot.co/faq'
                }`"
              >
                <strong class="whiteText pointer">faq</strong></a
              ></span
            >
          </div>
        </div>
      </section>
    </div>
    <b-notification
      v-if="iosNotif"
      class="instalIphone"
      has-icon
      aria-close-label="Close notification"
    >
      <div class="notifWrapper">
        <div>
          <img
            loading="lazy"
            class="addiphone"
            src="~assets/images/addtohome.png"
            alt="add"
          />
        </div>
        <div class="instalText">
          <span>
            {{ langSelected == "EN" ? "install" : "installe" }}&nbsp
            <strong class="has-text-contest">footfoot</strong>&nbsp{{
              langSelected == "EN" ? "on your Iphone" : "sur ton Iphone"
            }}.
          </span>
          <span>
            {{ langSelected == "EN" ? "click on" : "clique sur" }}
            <img
              loading="lazy"
              class="actioniphone"
              src="~assets/images/actionIphone.png"
              alt="add"
            />
          </span>
          <span>
            {{ langSelected == "EN" ? "then" : "puis" }}&nbsp
            <strong>{{
              langSelected == "EN"
                ? "add to home screen"
                : "Ajouter à l'écran d'accueil"
            }}</strong
            >.
          </span>
        </div>
      </div>
    </b-notification>
  </div>
</template>

<script>
import cookies from "js-cookie";
export default {
  auth: false,
  middleware({ store, redirect }) {
    if (
      store.state.auth &&
      store.state.auth.user &&
      store.state.auth.user._id
    ) {
      return redirect("/mypage");
    }
  },
  async asyncData({ store, redirect }) {
    let userId =
      store.state.auth && store.state.auth.user && store.state.auth.user._id
        ? store.state.auth.user._id
        : "";

    if (userId) {
      return redirect("/mypage");
    }
  },
  head() {
    if (this.langSelected == "EN") {
      return {
        htmlAttrs: {
          lang: this.langSelected ? this.langSelected.toLowerCase() : "fr",
        },
        title:
          "footfoot - the best site to play with your friends on Euro 2020",
        meta: [
          {
            hid: `description`,
            name: "description",
            content:
              "The best platform to organize your Euro prediction contest",
          },
          {
            hid: `keywords`,
            name: "keywords",
            keywords:
              "pronostics, euro, football, actualités, résumé, faits marquants, ligue 1, ligue des champions, première ligue, bundsliga, liga - footfoot",
          },
          {
            hid: `og:title`,
            property: "og:title",
            content: "the best site on soccer - footfoot",
          },
          {
            hid: `og:url`,
            property: "og:url",
            content: "https://www.footfoot.co",
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
              "The best platform to organize your Euro prediction contest",
          },
        ],
      };
    } else {
      return {
        htmlAttrs: {
          lang: this.langSelected ? this.langSelected.toLowerCase() : "fr",
        },
        title:
          "footfoot - le meilleur site pour jouer avec tes amis sur l'Euro 2020",
        meta: [
          {
            hid: `description`,
            name: "description",
            content:
              "La meilleure plateforme pour organiser ton concours de pronos pour l’Euro",
          },
          {
            hid: `keywords`,
            name: "keywords",
            keywords:
              "pronos, euro, football, news, résumé, highlights, ligue 1, ligue des champions, premier league, bundsliga, liga - footfoot",
          },
          {
            hid: `og:title`,
            property: "og:title",
            content: "le meilleur site sur le football - footfoot",
          },
          {
            hid: `og:url`,
            property: "og:url",
            content: "https://www.footfoot.co",
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
              "La meilleure plateforme pour organiser ton concours de pronos pour l’Euro",
          },
        ],
      };
    }
  },
  components: {},
  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      iosNotif: false,
    };
  },
  created() {},
  props: {},
  watch: {},
  mounted() {
    if (process.client) {
      let token =
        cookies.get("auth._token.local") != "false"
          ? cookies.get("auth._token.local")
          : "";

      if (token) {
        this.$router.push("/mypage");
      }
      let isIos = () => {
        let userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
      };
      ////Detects if device is in standalone mode
      let isInStandaloneMode = () =>
        "standalone" in window.navigator && window.navigator.standalone;

      ////Checks if should display install popup notification:
      if (isIos() && !isInStandaloneMode()) {
        this.iosNotif = true;
      }
    }
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
  },
  methods: {
    changeLang(lang) {
      this.$store.commit("var/setNewLang", lang);
    },
  },
};
</script>

<style scoped>
img {
  width: auto;
}
.upperLand {
  width: 90vw !important;
  height: 60vh;
  margin-top: 0rem;
  margin-bottom: 0rem !important;
}
.column.is-7 {
  width: 40% !important;
}
.column.is-7 > img {
  display: flex !important;
}
.fieldBottom {
  display: flex;
  flex-direction: column;
}
.nextButton {
  max-width: 25%;
  align-self: flex-end;
}
.margin-left {
  margin-left: 15px;
}
.landing-caption {
  width: 60% !important;
}
.subtitle.is-5 {
  font-size: 2.25rem;
}

.container {
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.hero-body {
  padding: 0 !important;
}
.buttonLoginLeaderboard {
  align-self: center;
  font-weight: bolder !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #eef1f7 !important;
  background-color: #ff7d00 !important;
}

.buttonLoginLeaderboard:focus,
.buttonLoginLeaderboard:hover {
  font-weight: bolder !important;
  color: #ff7d00 !important;
  box-shadow: 0 0 0 0.125em #eef1f7 !important;
  border-color: #ff7d00 !important;
  background-color: #eef1f7 !important;
}
.orangeBack {
  background-color: #ff7d00 !important;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 31vh;
}
.orangeBackchild {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}

.orangeBackchild > img {
  margin-right: 2rem;
}
.whiteText {
  color: #fff;
}
.euroDesktop {
  height: 25rem;
  width: auto;
  margin: auto;
}
.logoCoupe {
  height: 15rem;
  width: auto;
  margin: auto;
}
.logoStripe {
  height: 5rem;
  width: auto;
  margin: auto;
}
.sendmessButton {
  margin: auto;
  display: flex;
}

.logoInsiders {
  height: auto !important;
  max-height: 2.75rem !important;
  vertical-align: middle;
  width: auto !important;
}
.navWrapper {
  display: flex;
  align-items: center !important;
  justify-content: space-between;
  margin: 0px;
  padding: 40px;
  width: 100%;
  height: 3rem;
}

.nav-profile {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.fourReasons {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
#firstUp {
  width: 90vw !important;
  height: 60vh;
  margin-top: 0rem;
  margin-bottom: 0rem !important;
}
.orangeFoot {
  background-color: #ff7d00 !important;
  background-color: #ff7d00 !important;
  padding: 1rem;
  margin-top: 5rem;
}
.colDir {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.fourreasonExplain {
  margin-top: 3rem;
  margin-bottom: 5rem;
}
.has-text-contest {
  font-weight: bold;
}
.imgProfile {
  height: 4rem;
}
.notifWrapper {
  display: FLEX;
  align-items: CENTER;
}
.instalIphone {
  box-shadow: 0 -2px 5px -2px #192b41;
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 0;
  margin: 0 !important;
  background-color: #eef1f7;
}
.instalText {
  display: flex;
  flex-direction: column;
}
.addiphone {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}
.actioniphone {
  width: 25px;
  height: 25px;
  margin-left: 5px;
}
.instalText > span {
  display: flex;
  align-items: center;
}
.flag {
  display: flex;
  justify-content: flex-end;
}
.flag-img {
  width: 60px;
  height: 60px;
  padding: 5px;
  cursor: pointer;
  margin-left: 15px;
}
@media (max-width: 1047px) {
  .flag-img {
    width: 45px;
    height: 45px;
    margin-left: 10px;
  }
  .imgProfile {
    height: 2.5rem;
  }
  .fourreasonExplain {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .orangeFoot {
    margin-top: 3rem;
  }
  .column.is-7 {
    width: 100% !important;
  }
  .euroDesktop {
    height: 10rem;
    width: auto;
    margin: auto;
  }
  .logoCoupe {
    height: 5rem;
    width: auto;
    margin: auto;
    margin-bottom: 3rem;
    margin-top: 2rem;
  }
  .footfieldLogo {
    margin-top: 3rem;
  }
  .logoStripe {
    height: 4rem;
    width: auto;
    margin: auto;
    margin-bottom: 3rem;
    margin-top: 5rem;
  }
  .phoneScreenlogo {
    height: 15rem;
    margin-bottom: 3rem;
    margin-top: 5rem;
  }
  .logoInsiders {
    height: 2rem;
    vertical-align: middle;
    width: auto;
  }
  .navWrapper {
    padding: 10px;
  }
  .upperLand {
    height: auto;
  }

  .main-title {
    font-size: 2rem !important;
  }
  .subtitle.is-5 {
    font-size: 1.5rem !important;
  }
  .ligueDesk {
    height: 7rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .orangeBack {
    height: 25vh;
    margin-top: 2rem;
  }
  .orangeBackchild {
    margin: 1rem;
  }
  .orangeBackchild > img {
    margin-right: 2rem;
    height: 4rem;
  }
  .title.is-1 {
    font-size: 1.5rem;
  }
  .title {
    font-size: 1.5rem;
  }
  .landing-caption {
    width: 100% !important;
  }
  .landing-caption .subtitle {
    max-width: 100% !important;
  }
  .margin-left {
    margin-left: 0px;
    margin-top: 10px;
  }

  .is-vcentered {
    margin-bottom: -0.75rem;
    margin: 0rem;
  }
  .hero.is-fullheight {
    min-height: 0 !important;
  }
  .hero-body {
    flex-grow: 1;
    flex-shrink: 0;
    padding: 4rem 0rem 2.5rem;
  }
  .has-text-centered {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .has-text-centered > .button {
    width: 50%;
  }
  #firstUp {
    height: auto;
  }
}
@media (max-width: 376px) {
  .main-title {
    font-size: 1.5rem !important;
  }
  .subtitle.is-5 {
    font-size: 1.15rem !important;
  }
  .title.is-1 {
    font-size: 1.15rem;
  }
  .title {
    font-size: 1.15rem;
  }
}
</style>
