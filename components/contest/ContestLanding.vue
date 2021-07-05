<template>
  <section class="section">
    <b-loading
      v-if="loading === true"
      :is-full-page="true"
      :active.sync="loading"
      :canCancel="false"
    ></b-loading>

    <b-tabs
      class="is-bold"
      v-model="activeTab"
      v-if="langSelected === 'EN'"
      type="is-toggle"
      expanded
    >
      <b-tab-item class="is-bold" label="create contest"></b-tab-item>
      <b-tab-item class="is-bold" label="my contest"></b-tab-item>
      <b-tab-item class="is-bold" label="hall of fame"></b-tab-item>
    </b-tabs>
    <b-tabs
      class="is-bold"
      v-model="activeTab"
      v-else
      type="is-toggle"
      expanded
    >
      <b-tab-item class="is-bold" label="créer un contest"></b-tab-item>
      <b-tab-item class="is-bold" label="mes contests"></b-tab-item>
      <b-tab-item class="is-bold" label="hall of fame"></b-tab-item>
    </b-tabs>
    <div
      class="swiper-container"
      v-swiper:myDirectiveSwiper="swiperOptions"
      @slide-next-transition-start="slideNextTransitionStart"
      @slide-prev-transition-start="slidePrevTransitionStart"
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div v-if="activeTab == 0 && loading === false">
            <div class="landingContestMain">
              <div class="bullsAndBearsPic2">
                <img
                  loading="lazy"
                  src="~assets/images/coupe.png"
                  alt="contest"
                />
              </div>
              <div class="marginLeft">
                <div class="bullsAndBearsPic2Mobile">
                  <img
                    loading="lazy"
                    class="imgMobile"
                    src="~assets/images/coupe.png"
                    alt="contest"
                  />
                </div>
                <h1 v-if="langSelected == 'EN'">
                  Create a contest allows you to predict with your family,
                  friends or colleagues the result of the matches of the biggest
                  soccer competitions.
                </h1>
                <h1 v-else>
                  Créer un contest te permet de pronostiquer avec ta famille,
                  tes amis ou collègues le résultat des rencontres des grandes
                  compétitions de football.
                </h1>
                <br />

                <h2 v-if="langSelected == 'EN'">
                  Simply give your contest a name and validate. You will then
                  just have to invite them by communicating the invitation URL
                  that you will find on the contest page.
                </h2>
                <h2 v-else>
                  Donne simplement un nom à ton contest et valide. Il te suffira
                  ensuite de les inviter en leur communiquant l’URL d’invitation
                  que tu trouveras sur la page de ton contest.
                </h2>
              </div>
            </div>
            <div class="buttonCreateWrapper">
              <p
                @click="createContestEuro"
                class="button is-large buttonLoginLeaderboard"
                type="button"
              >
                {{
                  langSelected == "EN"
                    ? "create a contest for the Euro!"
                    : "créer un contest pour l'Euro !"
                }}
              </p>
              <p
                @click="createContest"
                class="button is-large buttonLoginLeaderboard publikButton"
                type="button"
              >
                {{
                  langSelected == "EN"
                    ? "create a contest!"
                    : "créer un contest !"
                }}
              </p>
              <p
                v-if="$auth.user && $auth.user.role === 'admin'"
                @click="createContestPublik"
                class="button is-large buttonLoginLeaderboard publikButton"
                type="button"
              >
                créer un contest publique !
              </p>
            </div>
            <nav class="flag">
              <img
                loading="lazy"
                class="ligue-euro invertOk"
                src="/logoLigue/1326.png"
                alt="logoEuro"
              />
            </nav>
            <nav class="flag">
              <img
                loading="lazy"
                class="ligue-img invertOk"
                src="/logoLigue/2.png"
                alt="logoLigueChamp"
              />
              <img
                loading="lazy"
                class="ligue-img invertOk"
                src="/logoLigue/5.png"
                alt="logoLigueEuropa"
              />
              <img
                loading="lazy"
                class="ligue-img"
                src="/logoLigue/301.png"
                alt="logoLigue"
              />
              <img
                loading="lazy"
                class="ligue-img"
                src="/logoLigue/8.png"
                alt="logoLigue"
              />
              <img
                loading="lazy"
                class="ligue-img"
                src="/logoLigue/564.png"
                alt="logoLigue"
              />
              <img
                loading="lazy"
                class="ligue-img"
                src="/logoLigue/384.png"
                alt="logoLigue"
              />
              <img
                loading="lazy"
                class="ligue-img"
                src="/logoLigue/82.png"
                alt="logoLigue"
              />
            </nav>
            <span class="createContest faqInfo">
              <strong>{{
                langSelected == "FR"
                  ? "besoin de plus d'informations ?"
                  : "need more information?"
              }}</strong>
              <nuxt-link to="/faq">
                <p class="pointer">
                  {{ langSelected == "FR" ? "consulte la" : "check the" }} faq
                </p>
              </nuxt-link>
            </span>
          </div>
          <div v-if="activeTab == 1 && loading === false">
            <div
              v-if="!$auth.user || ($auth.user && !$auth.user._id)"
              class="column is-12 sideRecent"
            >
              <div class="sentimentLandText">
                <img
                  loading="lazy"
                  src="~assets/images/ronaldoPop.png"
                  alt="Bull"
                  class="rounded"
                />
                <div class="columndir">
                  <h1 class="accrocheH1" v-if="langSelected === 'EN'">
                    join footfoot and get into the game
                  </h1>
                  <h1 class="accrocheH1" v-else>
                    rejoins footfoot et participe aux constest
                  </h1>
                  <div class="loggiin">
                    <p
                      v-if="langSelected === 'EN'"
                      class="button is-medium buttonLLLogin"
                      type="button"
                      @click="LoginModal"
                    >
                      login
                    </p>
                    <p
                      v-else
                      class="button is-medium buttonLLLogin"
                      type="button"
                      @click="LoginModal"
                    >
                      connexion
                    </p>
                    <p
                      v-if="langSelected === 'EN'"
                      class="button is-medium buttonSSSignin"
                      type="button"
                      @click="SignupModal"
                    >
                      join
                    </p>
                    <p
                      v-else
                      class="button is-medium buttonSSSignin"
                      type="button"
                      @click="SignupModal"
                    >
                      rejoindre
                    </p>
                  </div>
                </div>
                <img
                  loading="lazy"
                  class="rounded"
                  src="~assets/images/zlatanPop.jpg"
                  alt="Bear"
                />
              </div>
            </div>
            <div
              v-else-if="$auth.user && $auth.user._id && contests.length < 1"
            >
              <strong class="NoContest">
                <!-- <span>⚽⚽⚽ </span>  -->
                <span>
                  {{
                    langSelected === "EN"
                      ? "no public contest at this time"
                      : "pas de contest public en ce moment"
                  }}
                </span>
                <!-- <span>Dépéchez-vous de créer le votre et d'inviter vos amis </span> -->
                <span>⚽⚽⚽</span>
              </strong>
            </div>

            <div v-else>
              <section class="column is-9">
                <div v-for="(contest, index) in contests" :key="index">
                  <div class="box suggestBox">
                    <div class="sideRecent">
                      <div class="profilWrapper">
                        <div
                          @click="goContestMobile(contest)"
                          class="image is-circle"
                        >
                          <img
                            loading="lazy"
                            v-if="contest.contest && contest.contest.image"
                            class="picContest"
                            :src="contest.contest.image"
                            alt="picContest"
                          />
                          <img
                            loading="lazy"
                            v-else
                            class="picContest"
                            src="https://www.footfoot.co/miseLogo.png"
                            alt="picContest"
                          />
                        </div>
                        <div
                          @click="goContestMobile(contest)"
                          class="pointer nameProfilLink nameProfil"
                        >
                          <strong
                            class="
                              is-size-3 is-bold
                              has-text-contest
                              displayFlex
                              nameContest
                            "
                          >
                            {{ contest.contest.name }}

                            <span
                              v-if="contest.lastTwoRounds[0].status"
                              class="activityUserWrapper is-wc displayFlex"
                            >
                              {{
                                contest.contest.isSpecialEvent
                                  ? ""
                                  : "- " + contest.lastTwoRounds[0].name
                              }}
                              <img
                                v-if="
                                  contest.lastTwoRounds[0].isRegistrationOpen
                                "
                                loading="lazy"
                                class="is-12x12"
                                src="~assets/images/online.png"
                                alt="on"
                              />
                            </span>
                            <span
                              v-else-if="
                                contest.lastTwoRounds[1] &&
                                contest.lastTwoRounds[1].status
                              "
                              class="activityUserWrapper is-wc displayFlex"
                            >
                              {{
                                contest.contest.isSpecialEvent
                                  ? ""
                                  : "- " + contest.lastTwoRounds[1].name
                              }}
                              <img
                                v-if="
                                  contest.lastTwoRounds[1].isRegistrationOpen
                                "
                                loading="lazy"
                                class="is-12x12"
                                src="~assets/images/online.png"
                                alt="on"
                              />
                            </span>
                            <span
                              v-else
                              class="activityUserWrapper is-wc displayFlex"
                            >
                              {{
                                contest.contest.isSpecialEvent
                                  ? ""
                                  : "- " + contest.lastTwoRounds[1]
                                  ? contest.lastTwoRounds[1].name
                                  : contest.lastTwoRounds[0].name
                              }}
                              <img
                                loading="lazy"
                                class="is-12x12"
                                src="~assets/images/offline.png"
                                alt="off"
                              />
                            </span>
                          </strong>

                          <div class="activityUserWrapper statWrap">
                            <span class="activityUser">
                              <img
                                class="icon unfollow invertOk"
                                src="~assets/images/teams/maillot.png"
                                alt="player"
                              />
                              <strong>{{
                                contest.lastTwoRounds[1]
                                  ? contest.lastTwoRounds[1].participants.length
                                  : contest.lastTwoRounds[0].participants.length
                              }}</strong>
                            </span>

                            <span class="activityUser">
                              <img
                                class="icon unfollow"
                                src="~assets/images/versus.png"
                                alt="matchs"
                              />
                              <strong>{{
                                contest.lastTwoRounds[1]
                                  ? contest.lastTwoRounds[1].scope.length
                                  : contest.lastTwoRounds[0].scope.length
                              }}</strong>
                            </span>
                            <span class="activityUser footCoincagnotte">
                              <img
                                class="icon unfollow"
                                src="~assets/images/contestMainCagnotte.png"
                                alt="cagnotte"
                              />
                              <strong
                                class="has-text-contest"
                                v-if="contest.contest.isSpecialEvent"
                                >800 F$
                              </strong>
                              <strong
                                class="has-text-contest"
                                v-else-if="contest.contest.isPublic"
                              >
                                {{
                                  contest.lastTwoRounds[1]
                                    ? contest.lastTwoRounds[1].participants
                                      ? (
                                          10 +
                                          Math.round(
                                            Number(
                                              contest.lastTwoRounds[1]
                                                .participants.length
                                            ) * 0.3
                                          )
                                        ).toLocaleString("fr")
                                      : 0
                                    : contest.lastTwoRounds[0].participants
                                    ? (
                                        10 +
                                        Math.round(
                                          Number(
                                            contest.lastTwoRounds[0]
                                              .participants.length
                                          ) * 0.3
                                        )
                                      ).toLocaleString("fr")
                                    : 0
                                }}
                                F$
                              </strong>
                              <strong class="has-text-contest" v-else
                                >{{
                                  contest.lastTwoRounds[1]
                                    ? contest.lastTwoRounds[1].betValue
                                      ? (
                                          Number(
                                            contest.lastTwoRounds[1].betValue
                                          ) *
                                          Number(
                                            contest.lastTwoRounds[1]
                                              .participants.length
                                          )
                                        ).toLocaleString("fr")
                                      : 0
                                    : contest.lastTwoRounds[0].betValue
                                    ? (
                                        Number(
                                          contest.lastTwoRounds[0].betValue
                                        ) *
                                        Number(
                                          contest.lastTwoRounds[0].participants
                                            .length
                                        )
                                      ).toLocaleString("fr")
                                    : 0
                                }}
                                F$</strong
                              >
                            </span>
                          </div>
                        </div>
                        <strong
                          @click="goToLeaderboard(contest.contest._id)"
                          class="winnerWrap has-text-contest pointer"
                        >
                          <div
                            v-if="
                              contest.lastTwoRounds[1] &&
                              !contest.lastTwoRounds[1].status &&
                              contest.lastTwoRounds[1].winner
                            "
                            class="winnerName is-6"
                          >
                            <img
                              loading="lazy"
                              class="coupe"
                              src="~assets/images/coupe.png"
                            />
                            {{ contest.lastTwoRounds[1].winner.username }}
                          </div>
                          <div
                            v-else-if="
                              contest.lastTwoRounds[0] &&
                              !contest.lastTwoRounds[0].status &&
                              contest.lastTwoRounds[0].winner
                            "
                            class="winnerName is-6"
                          >
                            <img
                              loading="lazy"
                              class="coupe"
                              src="~assets/images/coupe.png"
                            />
                            {{ contest.lastTwoRounds[0].winner.username }}
                          </div>
                          <div v-else class="icon pointer is-medium">
                            <img
                              loading="lazy"
                              class="icon unfollow buttonImgAbo"
                              src="~assets/images/podium.png"
                              alt="classement"
                            />
                          </div>
                        </strong>
                      </div>
                    </div>
                    <div
                      class="displayFlex"
                      v-if="
                        $auth.user &&
                        $auth.user._id == contest.contest.adminOfContest._id &&
                        ((contest.lastTwoRounds[1] &&
                          !contest.lastTwoRounds[1].status) ||
                          !contest.lastTwoRounds[0].status)
                      "
                    >
                      <nuxt-link
                        class="widthDemi"
                        v-if="
                          contest.lastTwoRounds[0] &&
                          contest.lastTwoRounds[0].status == true
                        "
                        :to="`/contest/create`"
                      >
                        <button
                          class="
                            createcontest
                            button
                            has-text-contest
                            is-bold is-small is-fullwidth
                          "
                        >
                          {{
                            langSelected == "FR"
                              ? "créé mon contest privé"
                              : "create my private contest"
                          }}
                        </button>
                      </nuxt-link>
                      <nuxt-link
                        class="widthDemi"
                        v-else-if="
                          contest.lastTwoRounds[1] &&
                          contest.lastTwoRounds[1].status == false
                        "
                        :to="`/contest/${contest.lastTwoRounds[1]._id}`"
                      >
                        <button
                          class="button has-text-contest is-small is-fullwidth"
                        >
                          {{
                            langSelected == "FR"
                              ? "round précédent"
                              : "previous round"
                          }}
                        </button>
                      </nuxt-link>
                      <nuxt-link
                        class="widthDemi"
                        v-else-if="
                          (contest.lastTwoRounds[1] &&
                            contest.lastTwoRounds[1].status == true) ||
                          (contest.lastTwoRounds[0] &&
                            contest.lastTwoRounds[0].status == false)
                        "
                        :to="`/contest/${contest.lastTwoRounds[0]._id}`"
                      >
                        <button
                          class="button has-text-contest is-small is-fullwidth"
                        >
                          {{
                            langSelected == "FR"
                              ? "round précédent"
                              : "previous round"
                          }}
                        </button>
                      </nuxt-link>
                      <nuxt-link
                        class="widthDemi"
                        v-if="
                          contest.lastTwoRounds[0] &&
                          !contest.lastTwoRounds[1] &&
                          contest.lastTwoRounds[0].status == true
                        "
                        :to="`/contest/${contest.lastTwoRounds[0]._id}`"
                      >
                        <button
                          class="
                            button
                            is-contest is-bold is-small is-fullwidth
                          "
                        >
                          {{
                            langSelected == "FR"
                              ? "round en cours"
                              : "current round"
                          }}
                        </button>
                      </nuxt-link>
                      <nuxt-link
                        class="widthDemi"
                        v-else-if="
                          contest.lastTwoRounds[1] &&
                          contest.lastTwoRounds[1].status == true
                        "
                        :to="`/contest/${contest.lastTwoRounds[1]._id}`"
                      >
                        <button
                          v-if="langSelected == 'FR'"
                          class="
                            button
                            is-contest is-bold is-small is-fullwidth
                          "
                        >
                          {{
                            contest.lastTwoRounds[1].participants.includes(
                              $auth.user._id
                            )
                              ? `round en cours`
                              : `rejoindre le nouveau round`
                          }}
                        </button>
                        <button
                          v-else
                          class="
                            button
                            is-contest is-bold is-small is-fullwidth
                          "
                        >
                          {{
                            contest.lastTwoRounds[1].participants.includes(
                              $auth.user._id
                            )
                              ? `current round`
                              : `join the new round`
                          }}
                        </button>
                      </nuxt-link>
                      <nuxt-link
                        class="widthDemi"
                        v-else
                        :to="`/contest/${contest.contest._id}/create-round`"
                      >
                        <button
                          class="
                            button
                            is-contest is-bold is-small is-fullwidth
                          "
                        >
                          {{
                            langSelected == "FR"
                              ? "créé le nouveau round"
                              : "create the new round"
                          }}
                        </button>
                      </nuxt-link>
                    </div>
                    <div class="displayFlex" v-else>
                      <nuxt-link
                        class="widthDemi"
                        v-if="contest.lastTwoRounds[0].status == true"
                        :to="`/contest/create`"
                      >
                        <button
                          class="
                            createcontest
                            button
                            has-text-contest
                            is-bold is-small is-fullwidth
                          "
                        >
                          {{
                            langSelected == "FR"
                              ? "créé mon contest privé"
                              : "create my private contest"
                          }}
                        </button>
                      </nuxt-link>
                      <nuxt-link
                        class="widthDemi"
                        v-else-if="
                          contest.lastTwoRounds[1] &&
                          contest.lastTwoRounds[1].status == false
                        "
                        :to="`/contest/${contest.lastTwoRounds[1]._id}`"
                      >
                        <button
                          class="button has-text-contest is-small is-fullwidth"
                        >
                          {{
                            langSelected == "FR"
                              ? "round précédent"
                              : "previous round"
                          }}
                        </button>
                      </nuxt-link>

                      <nuxt-link
                        class="widthDemi"
                        v-else-if="
                          (contest.lastTwoRounds[1] &&
                            contest.lastTwoRounds[1].status == true) ||
                          (contest.lastTwoRounds[0] &&
                            contest.lastTwoRounds[0].status == false)
                        "
                        :to="`/contest/${contest.lastTwoRounds[0]._id}`"
                      >
                        <button
                          class="button has-text-contest is-small is-fullwidth"
                        >
                          {{
                            langSelected == "FR"
                              ? "round précédent"
                              : "previous round"
                          }}
                        </button>
                      </nuxt-link>

                      <nuxt-link
                        class="widthDemi"
                        v-if="
                          contest.lastTwoRounds[0] &&
                          contest.lastTwoRounds[0].status == true
                        "
                        :to="`/contest/${contest.lastTwoRounds[0]._id}`"
                      >
                        <button
                          class="
                            button
                            is-contest is-bold is-small is-fullwidth
                          "
                        >
                          {{
                            langSelected == "FR"
                              ? "round en cours"
                              : "current round"
                          }}
                        </button>
                      </nuxt-link>
                      <nuxt-link
                        class="widthDemi"
                        v-else-if="
                          contest.lastTwoRounds[1] &&
                          contest.lastTwoRounds[1].status == true
                        "
                        :to="`/contest/${contest.lastTwoRounds[1]._id}`"
                      >
                        <button
                          v-if="langSelected == 'FR'"
                          class="
                            button
                            is-contest is-bold is-small is-fullwidth
                          "
                        >
                          {{
                            contest.lastTwoRounds[1].participants.includes(
                              $auth.user._id
                            )
                              ? `round en cours`
                              : `rejoindre le nouveau round`
                          }}
                        </button>
                        <button
                          v-else
                          class="
                            button
                            is-contest is-bold is-small is-fullwidth
                          "
                        >
                          {{
                            contest.lastTwoRounds[1].participants.includes(
                              $auth.user._id
                            )
                              ? `current round`
                              : `join the new round`
                          }}
                        </button>
                      </nuxt-link>
                      <nuxt-link
                        class="widthDemi"
                        v-else
                        :to="`/contest/create`"
                      >
                        <button
                          class="
                            createcontest
                            button
                            is-contest is-bold is-small is-fullwidth
                          "
                        >
                          {{
                            langSelected == "FR"
                              ? "créé mon contest privé"
                              : "create my private contest"
                          }}
                        </button>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <leader-board
            v-if="activeTab == 2 && loading === false"
            @signup="SignupModal"
          ></leader-board>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import { createPublicContest, getAllMyContests } from "@/server/apiContest";
export default {
  auth: false,

  head() {
    return {
      title:
        "Gagne des footcoins en faisant les meilleurs pronos de football - Pour l'amour du foot",
      meta: [
        {
          hid: `description`,
          name: "description",
          content:
            "Le meilleur pronostiqueur remportera gloire, respect et footcoins",
        },
        {
          hid: `keywords`,
          name: "keywords",
          keywords:
            "football, pronos, paris, Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Pour l'amour du foot",
        },
        {
          hid: `og:title`,
          property: "og:title",
          content:
            "Gagne des footcoins en faisant les meilleurs pronos de football - Pour l'amour du foot",
        },
        {
          hid: `og:url`,
          property: "og:url",
          content: `https://www.footfoot.co"${this.$route.fullPath}`,
        },

        {
          hid: `og:image`,
          property: `og:image`,
          content: "https://www.footfoot.co/miseLogo.png",
        },

        {
          hid: `og:description`,
          property: "og:description",
          content:
            "Le meilleur pronostiqueur remportera gloire, respect et footcoins ",
        },
        {
          hid: `twitter:card`,
          name: `twitter:card`,
          property: "twitter:card",
          content: "summary_large_image",
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
            "Gagne des footcoins en faisant les meilleurs pronos de football - Pour l'amour du foot",
        },
        {
          hid: `twitter:description`,
          name: `twitter:description`,
          property: "twitter:description",
          content:
            "Le meilleur pronostiqueur remportera gloire, respect et footcoins",
        },
        {
          hid: `twitter:image`,
          name: `twitter:image`,
          property: "twitter:image",
          content: "https://www.footfoot.co/miseLogo.png",
        },
      ],
    };
  },

  components: {
    LeaderBoard: () => import("@/components/LeaderBoard"),
  },
  computed: {
    mycontests() {
      return this.$store.state.datapage.mycontests;
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      activeTab: 0,
      contests: [],
      contestActiv: [],
      contestClosed: [],
      total: 0,
      loading: false,
      defaultSortField: "date",
      defaultSortOrder: "desc",
      page: 1,
      perPage: 5,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      openContests: [],
      swiperOptions: {
        threshold: 15,
        followFinger: false,
        loop: true,
        slidesPerView: "auto",
        loopedSlides: 1,
        centeredSlides: true,
        touchEventsTarget: "container",
        longSwipes: true,
        shortSwipes: true,
        iOSEdgeSwipethreshold: 15,
        spaceBetween: 20,
      },
    };
  },
  methods: {
    goContestMobile(event) {
      if (event.lastTwoRounds[0].status) {
        this.goToContest(event.lastTwoRounds[0]._id);
      } else if (event.lastTwoRounds[1] && event.lastTwoRounds[1].status) {
        this.goToContest(event.lastTwoRounds[1]._id);
      } else if (
        this.$auth.user &&
        this.$auth.user._id == event.contest.adminOfContest._id &&
        ((event.lastTwoRounds[1] && !event.lastTwoRounds[1].status) ||
          !event.lastTwoRounds[0].status)
      ) {
        this.$buefy.dialog.confirm({
          message:
            this.langSelected == "EN"
              ? "this round is over"
              : "Le round est terminé",
          confirmText:
            this.langSelected == "EN" ? "Create a new round" : "Créer un round",
          cancelText:
            this.langSelected == "EN" ? "Go to round" : "Allez au round",
          type: "is-success",
          onConfirm: () => this.createRound(event.contest._id),
          onCancel: () =>
            event.lastTwoRounds[1]
              ? this.goToContest(event.lastTwoRounds[1]._id)
              : this.goToContest(event.lastTwoRounds[0]._id),
        });
      } else {
        this.$buefy.dialog.confirm({
          message:
            this.langSelected == "EN"
              ? "this round is over"
              : "Le round est terminé",
          confirmText:
            this.langSelected == "EN" ? "Create a contest" : "Créer un contest",
          cancelText:
            this.langSelected == "EN" ? "Go to round" : "Allez au round",
          type: "is-success",
          onConfirm: () => this.goCreate(),
          onCancel: () =>
            event.lastTwoRounds[1]
              ? this.goToContest(event.lastTwoRounds[1]._id)
              : this.goToContest(event.lastTwoRounds[0]._id),
        });
      }
    },
    goCreate() {
      this.$router.push("/contest/create");
    },
    slideNextTransitionStart() {
      if (this.activeTab == 0) {
        this.activeTab = 1;
      } else if (this.activeTab == 1) {
        this.activeTab = 2;
      } else if (this.activeTab == 2) {
        this.activeTab = 0;
      }
    },

    slidePrevTransitionStart() {
      if (this.activeTab == 0) {
        this.activeTab = 2;
      } else if (this.activeTab == 1) {
        this.activeTab = 0;
      } else if (this.activeTab == 2) {
        this.activeTab = 1;
      }
    },
    createContestEuro() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        this.$router.push("/contest/create/euro");
      } else {
        this.$router.push("/contest/create/euro");
      }
    },
    createContestPublik() {
      if (
        this.$store.state.auth.user &&
        this.$store.state.auth.user.role == "admin"
      ) {
        this.$router.push("/contest/create/publik");
      } else {
        this.$router.push("/contest");
      }
    },
    createContest() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        this.$router.push("/contest/create");
      } else {
        this.$router.push("/contest/create");
      }
    },
    SignupModal() {
      this.$router.push("/signup");
    },
    LoginModal(autenticate) {
      this.$router.push("/login");
    },
    comingSoon() {
      this.$buefy.dialog.alert("Patience, ça arrive 😜😜😜");
    },
    createRound(event) {
      this.$router.push("contest/" + event + "/create-round");
    },
    goToContest(event) {
      this.$router.push("/contest/" + event);
    },
    goToLeaderboard(event) {
      this.$router.push("contest/leaderboard/" + event);
    },
    moment: function (time) {
      return moment(time);
    },
  },
  mounted() {
    if (this.mycontests) {
      this.activeTab = 1;
      this.contests = this.mycontests;
      getAllMyContests().then((contests) => {
        if (contests && contests != "err") {
          this.$store.commit("datapage/mycontests", contests);
          this.contests = contests;
        } else {
          location.reload();
        }
      });
    } else {
      this.loading = true;
      this.activeTab = 1;

      if (
        this.$auth &&
        this.$auth.user &&
        this.$auth.loggedIn &&
        this.$auth.user._id
      ) {
        getAllMyContests().then((contests) => {
          if (contests && contests != "err") {
            this.$store.commit("datapage/mycontests", contests);
            this.contests = contests;
          } else {
            location.reload();
          }

          this.loading = false;
        });
      } else {
        this.loading = false;
        this.activeTab = 0;
      }
    }
  },
};
</script>

<style scoped>
.widthDemi {
  width: 50%;
  margin: 5px;
  margin-bottom: 0px;
  display: flex;
  justify-content: center;
}
.suggestBox > .sideRecent {
  margin-bottom: 5px;
}
.swiper {
  min-height: 75vh;
}
.statWrap {
  justify-content: center;
}
.columndir {
  flex-direction: column;
}
.winnerWrap {
  display: flex;
  align-items: center;
}
.winnerName {
  display: FLEX;
  flex-direction: COLUMN;
  align-items: CENTER;
}
.is-12x12 {
  height: 15px;
  width: 15px;
  margin: 0;
  padding: 5px;
}
.displayFlex {
  align-items: center;
}
.buttonCreateWrapper {
  display: flex;
  justify-content: center;
}
.buttonCreateWrapper > .publikButton {
  margin-left: 15px;
}

.NoContest {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.NoContest > span {
  align-self: center;
}

div {
  font-size: 1.3rem;
}
.rounded {
  height: 150px !important;
  width: 150px;
  padding: 0 !important;
}
img {
  padding: 1rem;
}

.has-text-contest {
  font-weight: bold;
}

.faqInfo {
  display: flex;
  flex-direction: column;
}

.bullsAndBearsPic2Mobile {
  display: none;
}

.landingContestMain {
  display: flex;
  align-items: center;
  border-radius: 5px;
  justify-content: space-evenly;
  width: 90%;
  margin: auto;
  margin-top: 0rem;
  margin-bottom: 0rem;
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

.createContest {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}

.flag {
  justify-content: space-around;
  display: flex;
  margin-top: 3rem;
}

.ligue-img {
  width: auto;
  max-height: 100px !important;
  padding: 0rem !important;
}
.ligue-euro {
  max-height: 150px !important;
  width: auto;
  padding: 0rem !important;
}
.mainSCI {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
}

.buttonSSSignin {
  margin-left: 2.5%;
  min-width: 20%;
  border-color: #192b41 !important;
  background-color: #fff !important;
  color: #192b41 !important;
}

.buttonLLLogin {
  margin-right: 2.5%;
  min-width: 20%;
  border-color: #192b41 !important;
  background-color: #fff !important;
  color: #192b41 !important;
}

.buttonLLLogin:focus,
.buttonLLLogin:hover {
  font-weight: bolder !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #192b41 !important;
  border-color: #eef1f7 !important;
  background-color: #192b41 !important;
}

.buttonSSSignin:focus,
.buttonSSSignin:hover {
  font-weight: bolder !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #192b41 !important;
  border-color: #eef1f7 !important;
  background-color: #192b41 !important;
}

.loggiin {
  display: flex;
  justify-content: center;
  padding-bottom: 0.5rem;
}

.sentimentLandText {
  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
}

.accrocheH1 {
  font-size: 2rem;
  color: #192b41;
  padding: 3%;
  text-align: center;
}
.marginLeft {
  margin-left: 1rem;
}
.box {
  padding: 0.25rem;
}
.button:focus:not(:active),
.button.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em #eef1f7;
}
.profilWrapper {
  display: flex;
  justify-content: space-between;
  margin-right: 0px !important;
  align-items: center;
  width: 100%;
}
.buttonImgAbo {
  height: 3rem !important;
  max-width: 3rem;
  width: auto !important;
}
.sideRecent {
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  margin: auto;
}
.mainSCI > div {
  padding: 0.25rem !important;
  margin-bottom: 0rem;
}
.nameContest {
  justify-content: center;
}
.activityUser {
  display: flex;
  align-items: center;
  margin-right: 1rem;

  font-size: 1.2rem !important;
}
.activityUser > img {
  margin-right: 5px;
}
.sideRecent > div > div {
  display: flex;
}
.nameProfil {
  display: flex;
  color: #0084a4;
  justify-content: flex-start;
}
.nameProfilLink {
  flex-direction: column;
}
.nameProfil > div > span {
  font-size: 1.5rem;
  font-weight: bold;
}
.nameProfil > div {
  display: flex;
  margin-right: 0px;
}
strong {
  color: #192b41;
}
.margR {
  margin-right: 5px;
  width: auto !important;
}
span {
  color: #192b41;
}
.icon.is-medium {
  width: 3rem;
  height: auto !important;
  display: FLEX;
  align-self: CENTER;
  align-items: center;
}
.icon > img {
  width: auto !important;
  height: 1rem;
}
.icon {
  width: auto !important;
}
.is-9 {
  width: 60% !important;
  margin: auto;
}
.picContest {
  border: 2px solid #ff7d00 !important;
  border-radius: 10%;
  height: 70px !important;
  width: 70px !important;
  max-width: 70px !important;
  padding: 0;
}
.suggestBox > .mainSCI {
  flex-direction: row !important;
}
.unfollow {
  padding: 0rem;
}
.is-wc {
  font-size: 1.5rem !important;
  margin-left: 5px;
}
.coupe {
  height: 45px;
  width: auto;
  padding: 0px;
}
.sentimentLandText > img {
  margin-top: 1.5rem;
}
.createcontest {
  background-color: #2da94f !important;
  color: #fff !important;
}
.footCoincagnotte > .has-text-contest {
  min-width: 90px;
}
@media screen and (max-width: 1025px) {
  .flag {
    margin-top: 2rem;
  }
  .buttonImgAbo {
    height: 2rem !important;
    max-width: 2rem;
    width: auto !important;
  }
  .is-12x12 {
    height: 10px;
    width: 10px;
    margin: 0;
    padding: 5px;
  }
  .picContest {
    height: 50px !important;
    width: 50px !important;
  }
  .winnerName {
    font-size: 1rem !important;
  }
  .coupe {
    height: 25px;
    width: auto;
    padding: 0px;
  }
  .is-size-3 {
    font-size: 1.25rem !important;
  }
  .is-wc {
    font-size: 1rem !important;
  }
  .is-9 {
    width: 100% !important;
    margin: auto;
  }
  .suggestBox > .mainSCI {
    flex-direction: row !important;
  }
  .unfollow {
    padding: 0rem;
  }
  .marginLeft {
    margin-left: 0rem;
  }
  .loggiin {
    padding-top: 0.5rem;
  }
  .rounded {
    height: 100px !important;
    width: 100px;
  }
  .buttonCreateWrapper {
    flex-direction: column;
  }
  .buttonCreateWrapper > .publikButton {
    margin-left: 0px;
    margin-top: 15px;
  }

  .box {
    margin-bottom: 1rem !important;
    padding: 0.25rem !important;
  }

  .sentimentLandText {
    flex-direction: column;
    margin-top: 0rem;
  }

  .sentimentLandText > img {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 0rem !important;
  }

  .accrocheH1 {
    padding: 0%;
  }

  .createContest {
    margin: 2rem;
  }

  .landingContestMain {
    text-align: justify;
    margin-top: 0rem;
    margin-bottom: 2rem;
  }

  .ligue-img {
    max-height: 45px !important;
  }
  .ligue-euro {
    max-height: 70px !important;
  }
  .bullsAndBearsPic2Mobile {
    display: flex;
    justify-content: center;
  }

  .bullsAndBearsPic2 {
    display: none;
  }

  .imgMobile {
    width: 60px;
    height: 60px;
    padding: 0rem !important;
    margin-bottom: 0.5rem;
  }

  .faqInfo > strong {
    align-self: center;
  }

  .suggestBox {
    padding: 0.25rem !important;
  }

  .nameProfil > div > span {
    font-size: 1.3rem;
    font-weight: bold;
  }
  .icon.is-medium {
    width: 2rem;
    height: auto !important;
  }
  .icon > img {
    width: auto !important;
    height: 1rem;
  }

  .sideRecent {
    justify-content: space-evenly;
    align-items: center;
    display: flex;
    width: 100%;
    margin: auto;
  }

  .activityUser {
    font-size: 1rem !important;
  }
  .activityUser > img {
    height: 20px !important;
    width: auto !important;
  }
  .footCoincagnotte > .has-text-contest {
    min-width: 60px;
  }
}
@media screen and (max-width: 376px) {
  .is-size-3 {
    font-size: 1.25rem !important;
  }
  .nameProfil > div > span {
    font-size: 1rem;
    font-weight: bold;
  }
  .activityUser {
    font-size: 0.9rem !important;
  }
  .picContest {
    height: 30px !important;
    width: 30px !important;
  }
}
</style>
