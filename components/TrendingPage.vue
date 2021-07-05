<template>
  <section class="trendingWrapperMaster">
    <b-loading
      :is-full-page="true"
      :active.sync="loading"
      :canCancel="false"
    ></b-loading>
    <h1 class="container">
      <nav class="flag">
        <img
          :class="{
            'is-not-active': champSelected == 'NextMatch',
            'is-active': champSelected != 'NextMatch',
          }"
          class="flag-img"
          @click="selected('NextMatch')"
          :src="`${
            langSelected === 'EN'
              ? '/logoLigue/Matchs-of-the-day-blue.png'
              : '/logoLigue/Matchs-du-jour-blue.png'
          }`"
          alt="NextMatch"
        />
        <img
          :class="{
            'is-active': champSelected == 'NextMatch',
            'is-not-active': champSelected != 'NextMatch',
          }"
          class="flag-img"
          :src="`${
            langSelected === 'EN'
              ? '/logoLigue/Matchs-of-the-day-or.png'
              : '/logoLigue/Matchs-du-jour-or.png'
          }`"
          alt="NextMatch"
        />
        <img
          class="flag-img"
          @click="selected('1326')"
          src="/logoLigue/1326.png"
          alt="Euro"
        />
        <div
          :class="{
            'is-not-active':
              ////champSelected == '1326' ||
              champSelected == '2' || champSelected == '5',
            'is-active':
              //// champSelected != '1326' ||
              champSelected != '2' || champSelected != '5',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="flag-img"
                src="~assets/images/europeflag.png"
                alt="euFlag"
              />
            </template>

            <b-dropdown-item @click="selected('2')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="invertOk ligue-img"
                  src="/logoLigue/2.png"
                  alt="ChampionsLeague"
                />
                Champion's League
              </span>
            </b-dropdown-item>
            <b-dropdown-item @click="selected('5')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="invertOk ligue-img"
                  src="/logoLigue/5.png"
                  alt="LigueEuropa"
                />
                Europa League
              </span>
            </b-dropdown-item>
            <!--  <b-dropdown-item @click="selected('1326')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/1326.png"
                  alt="Euro"
                />
                Euro 2020
              </span>
            </b-dropdown-item>
			-->
          </b-dropdown>
        </div>
        <div
          :class="{
            'is-active': champSelected == '2',
            'is-not-active': champSelected != '2',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="ligue-img invertOk"
                src="/logoLigue/2.png"
                alt="ChampionsLeague"
              />
            </template>

            <b-dropdown-item @click="selected('5')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img invertOk"
                  src="/logoLigue/5.png"
                  alt="LigueEuropa"
                />
                Europa League
              </span>
            </b-dropdown-item>
            <!--    <b-dropdown-item @click="selected('1326')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/1326.png"
                  alt="LigueEuropa"
                />
                Euro 2020
              </span>
            </b-dropdown-item>-->
          </b-dropdown>
        </div>
        <div
          :class="{
            'is-active': champSelected == '5',
            'is-not-active': champSelected != '5',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="ligue-img invertOk"
                src="/logoLigue/5.png"
                alt="LigueEuropa"
              />
            </template>

            <b-dropdown-item @click="selected('2')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img invertOk"
                  src="/logoLigue/2.png"
                  alt="ChampionsLeague"
                />
                Champion's League
              </span>
            </b-dropdown-item>
            <!--      <b-dropdown-item @click="selected('1326')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/1326.png"
                  alt="LigueEuropa"
                />
                Euro 2020
              </span>
            </b-dropdown-item>-->
          </b-dropdown>
        </div>
        <!--    <div
          :class="{
            'is-active': champSelected == '1326',
            'is-not-active': champSelected != '1326',
          }"
        >
          <b-dropdown hoverable>
            <img
              loading="lazy"
              slot="trigger"
              class="ligue-img"
              src="/logoLigue/1326.png"
              alt="LigueEuropa"
            />
            <b-dropdown-item @click="selected('2')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img invertOk"
                  src="/logoLigue/2.png"
                  alt="ChampionsLeague"
                />
                Champion's League
              </span>
            </b-dropdown-item>
            <b-dropdown-item @click="selected('5')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img invertOk"
                  src="/logoLigue/5.png"
                  alt="LigueEuropa"
                />
                Europa League
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
		-->
        <div
          :class="{
            'is-not-active':
              champSelected == '301' ||
              champSelected == '304' ||
              champSelected == '310' ||
              champSelected == '307',
            'is-active':
              champSelected != '301' ||
              champSelected != '304' ||
              champSelected != '310' ||
              champSelected != '307',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="flag-img"
                src="~assets/images/frenchflag.png"
                alt="uefa-logo"
              />
            </template>

            <b-dropdown-item @click="selected('301')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/301.png"
                  alt="Ligue1"
                />
                Ligue 1
              </span>
            </b-dropdown-item>
            <b-dropdown-item @click="selected('304')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/304.png"
                  alt="Ligue2"
                />
                Ligue 2
              </span>
            </b-dropdown-item>
            <b-dropdown-item @click="selected('307')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/307.png"
                  alt="CoupeDeFr"
                />
                Coupe de France
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div
          :class="{
            'is-active': champSelected == '301',
            'is-not-active': champSelected != '301',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="ligue-img"
                src="/logoLigue/301.png"
                alt="Ligue1"
              />
            </template>

            <b-dropdown-item @click="selected('304')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/304.png"
                  alt="Ligue2"
                />
                Ligue 2
              </span>
            </b-dropdown-item>
            <b-dropdown-item @click="selected('307')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/307.png"
                  alt="CoupeDeFr"
                />
                Coupe de France
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div
          :class="{
            'is-active': champSelected == '304',
            'is-not-active': champSelected != '304',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="ligue-img"
                src="/logoLigue/304.png"
                alt="Ligue2"
              />
            </template>

            <b-dropdown-item @click="selected('301')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/301.png"
                  alt="Ligue1"
                />
                Ligue 1
              </span>
            </b-dropdown-item>
            <b-dropdown-item @click="selected('307')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/307.png"
                  alt="CoupeDeFr"
                />
                Coupe de France
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <div
          :class="{
            'is-active': champSelected == '307',
            'is-not-active': champSelected != '307',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="ligue-img"
                src="/logoLigue/307.png"
                alt="CoupeDeFr"
              />
            </template>

            <b-dropdown-item @click="selected('301')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/301.png"
                  alt="Ligue1"
                />
                Ligue 1
              </span>
            </b-dropdown-item>
            <b-dropdown-item @click="selected('304')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/304.png"
                  alt="Ligue2"
                />
                Ligue 2
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <div
          :class="{
            'is-not-active': champSelected == '24' || champSelected == '8',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="flag-img"
                src="~assets/images/englandflag.png"
                alt="englishFlag"
              />
            </template>

            <b-dropdown-item @click="selected('8')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/8.png"
                  alt="Premier League"
                />
                Premier League
              </span>
            </b-dropdown-item>
            <b-dropdown-item @click="selected('24')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/24.png"
                  alt="FAcup"
                />
                FA Cup
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div
          :class="{
            'is-active': champSelected == '8',
            'is-not-active': champSelected != '8',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="ligue-img"
                src="/logoLigue/8.png"
                alt="Premier League"
              />
            </template>

            <b-dropdown-item @click="selected('24')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/24.png"
                  alt="FAcup"
                />
                FA Cup
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div
          :class="{
            'is-active': champSelected == '24',
            'is-not-active': champSelected != '24',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="ligue-img"
                src="/logoLigue/24.png"
                alt="FAcup"
              />
            </template>

            <b-dropdown-item @click="selected('8')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/8.png"
                  alt="Premier League"
                />
                Premier League
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div
          class="ligaWrap"
          :class="{
            'is-not-active': champSelected == '570' || champSelected == '564',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="flag-img"
                src="~assets/images/spainflag.png"
                alt="spainflag"
              />
            </template>

            <b-dropdown-item @click="selected('564')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/564.png"
                  alt="Liga"
                />
                Liga
              </span>
            </b-dropdown-item>
            <b-dropdown-item @click="selected('570')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/570.png"
                  alt="copaLiga"
                />
                Copa Del Rey
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div
          class="ligaWrap"
          :class="{
            'is-active': champSelected == '564',
            'is-not-active': champSelected != '564',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="ligue-img"
                src="/logoLigue/564.png"
                alt="Liga"
              />
            </template>

            <b-dropdown-item @click="selected('570')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/570.png"
                  alt="copaLiga"
                />
                Copa Del Rey
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div
          class="ligaWrap"
          :class="{
            'is-active': champSelected == '570',
            'is-not-active': champSelected != '570',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="ligue-img"
                src="/logoLigue/570.png"
                alt="copaLiga"
              />
            </template>

            <b-dropdown-item @click="selected('564')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/564.png"
                  alt="Liga"
                />
                Liga
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div
          class="ligaWrap"
          :class="{
            'is-not-active': champSelected == '390' || champSelected == '384',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="flag-img"
                src="~assets/images/italyflag.png"
                alt="italyflag"
              />
            </template>

            <b-dropdown-item @click="selected('384')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/384.png"
                  alt="SerieA"
                />
                Serie A
              </span>
            </b-dropdown-item>
            <b-dropdown-item @click="selected('390')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/390.png"
                  alt="cupItaly"
                />
                Coppa Italia
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div
          class="ligaWrap"
          :class="{
            'is-active': champSelected == '384',
            'is-not-active': champSelected != '384',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="ligue-img"
                src="/logoLigue/384.png"
                alt="SerieA"
              />
            </template>

            <b-dropdown-item @click="selected('390')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/390.png"
                  alt="cupItaly"
                />
                Coppa Italia
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div
          class="ligaWrap"
          :class="{
            'is-active': champSelected == '390',
            'is-not-active': champSelected != '390',
          }"
        >
          <b-dropdown :triggers="['hover']">
            <template #trigger>
              <img
                loading="lazy"
                slot="trigger"
                class="ligue-img"
                src="/logoLigue/390.png"
                alt="cupItaly"
              />
            </template>

            <b-dropdown-item @click="selected('384')">
              <span class="babMenuHeader">
                <img
                  loading="lazy"
                  class="ligue-img"
                  src="/logoLigue/384.png"
                  alt="SerieA"
                />
                Serie A
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <img
          :class="{
            'is-not-active': champSelected == '82',
            'is-active': champSelected != '82',
          }"
          class="flag-img"
          @click="selected('82')"
          src="~assets/images/germanyflag.png"
          alt="germanyFlag"
        />
        <img
          :class="{
            'is-active': champSelected == '82',
            'is-not-active': champSelected != '82',
          }"
          class="ligue-img"
          src="/logoLigue/82.png"
          alt="Bundesliga"
        />
        <img
          :class="{
            'is-not-active': champSelected == '462',
            'is-active': champSelected != '462',
          }"
          class="flag-img"
          @click="selected('462')"
          src="~assets/images/portugalflag.png"
          alt="fifa-logo"
        />
        <img
          :class="{
            'is-active': champSelected == '462',
            'is-not-active': champSelected != '462',
          }"
          class="ligue-img"
          src="/logoLigue/462.png"
          alt="fifaworldcup"
        />
      </nav>
    </h1>
    <div v-if="champSelected">
      <div v-if="champSelected == '1326'">
        <trending-euro></trending-euro>
      </div>
      <div v-else-if="champSelected == '2'">
        <trending-Championsleague></trending-Championsleague>
      </div>
      <div v-else-if="champSelected == '5'">
        <trending-UEFA></trending-UEFA>
      </div>

      <div
        v-else-if="
          champSelected == '24' ||
          champSelected == '307' ||
          champSelected == '310' ||
          champSelected == '390' ||
          champSelected == '570'
        "
      >
        <trending-Coupefrance></trending-Coupefrance>
      </div>

      <div v-else-if="champSelected == 'NextMatch'">
        <trending-NextMatch
          @signup="SignupModal"
          @ligue="ligue()"
        ></trending-NextMatch>
      </div>
      <div v-else>
        <nav class="navbar is-wc">
          <div>
            <div class="babblesMenu">
              <h2>
                <a
                  @click="resultat()"
                  :class="{ 'is-active': index2Selected == 'resultat' }"
                  class="babMenu navbar-item is-tab"
                  >{{ langSelected === "EN" ? "Matchs" : "Matchs" }}</a
                >
              </h2>
              <h2>
                <a
                  @click="classement()"
                  :class="{ 'is-active': index2Selected == 'classement' }"
                  class="babMenu navbar-item is-tab"
                >
                  {{ langSelected === "EN" ? "Ranking" : "Classement" }}</a
                >
              </h2>
              <h2>
                <a
                  @click="goal()"
                  :class="{ 'is-active': index2Selected == 'goal' }"
                  class="babMenu navbar-item is-tab"
                  >{{ langSelected === "EN" ? "Scorers" : "Buteurs" }}</a
                >
              </h2>
              <h2>
                <a
                  @click="assist()"
                  :class="{ 'is-active': index2Selected == 'assist' }"
                  class="babMenu navbar-item is-tab"
                  >{{ langSelected === "EN" ? "Assists" : "Passeurs" }}</a
                >
              </h2>
              <h2>
                <a
                  @click="card()"
                  :class="{ 'is-active': index2Selected == 'card' }"
                  class="babMenu navbar-item is-tab"
                  >{{ langSelected === "EN" ? "Cards" : "Cartons" }}</a
                >
              </h2>
            </div>
          </div>
        </nav>

        <div
          class="swiper-container"
          v-swiper:myDirectiveSwiper="swiperOptions"
          @slide-next-transition-start="slideNextTransitionStart"
          @slide-prev-transition-start="slidePrevTransitionStart"
        >
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="wrappTab">
                <div class="tabWrapper">
                  <section v-if="index2Selected == 'classement'">
                    <trending-championnat-classement
                      :isLiveStanding="isLiveStanding"
                      :compet="compet"
                    ></trending-championnat-classement>
                  </section>
                  <section v-else-if="index2Selected == 'resultat'">
                    <trending-championnat-result
                      @result="result($event)"
                      @seeLineup="seeLineup($event)"
                      @seeStadium="seeStadium($event)"
                      @changeDayChamp="changeDayChamp($event)"
                      :resultDay="resultDay"
                    ></trending-championnat-result>
                  </section>
                  <section v-else-if="index2Selected == 'goal'">
                    <buteurs-WC :goals="scorer"></buteurs-WC>
                  </section>
                  <section v-else-if="index2Selected == 'assist'">
                    <passeurs-WC :assists="player"></passeurs-WC>
                  </section>
                  <section v-else-if="index2Selected == 'card'">
                    <cards-WC :cards="cards"></cards-WC>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="resultatForModal">
      <b-modal :active.sync="resultatModal">
        <resultat-modal
          class="modalResultLineup"
          :lineUp="lineUp"
          :resultat="resultatForModal"
        ></resultat-modal>
      </b-modal>
    </div>
    <b-modal :active.sync="stadiumModal">
      <stadium-modal :stadium="stadium"></stadium-modal>
    </b-modal>
  </section>
</template>

<script>
import { getCompet } from "@/server/apiTrending";
import { getResultChampDay } from "@/server/apiTrending";
import moment from "moment";
export default {
  auth: false,
  name: "trendingPage",
  components: {
    TrendingCoupeligue: () =>
      import("@/components/trending/TrendingCoupeligue"),
    TrendingCoupefrance: () =>
      import("@/components/trending/TrendingCoupefrance"),
    TrendingWC: () => import("@/components/trending/TrendingWC"),
    TrendingUEFA: () => import("@/components/trending/TrendingUEFA"),
    TrendingEuro: () => import("@/components/trending/TrendingEuro"),
    TrendingFacup: () => import("@/components/trending/TrendingFacup"),
    TrendingNextMatch: () => import("@/components/trending/TrendingNextMatch"),
    TrendingChampionsleague: () =>
      import("@/components/trending/TrendingChampionsleague"),
    TrendingChampionnatResult: () =>
      import("@/components/trending/Championnat/TrendingChampionnatResult"),
    TrendingChampionnatClassement: () =>
      import("@/components/trending/Championnat/TrendingChampionnatClassement"),
    ButeursWC: () => import("@/components/trending/WC/ButeursWC"),
    PasseursWC: () => import("@/components/trending/WC/PasseursWC"),
    CardsWC: () => import("@/components/trending/WC/CardsWC"),
    resultatModal: () => import("@/components/modal/resultatModal"),
    stadiumModal: () => import("@/components/modal/stadiumModal"),
  },

  async asyncData({ store }) {
    let champSelected =
      store.state.var && store.state.var.champSelected
        ? store.state.var.champSelected
        : "NextMatch";

    if (
      champSelected == "1326" ||
      champSelected == "307" ||
      champSelected == "310" ||
      champSelected == "390" ||
      champSelected == "570" ||
      champSelected == "2" ||
      champSelected == "24" ||
      champSelected == "5" ||
      champSelected == "NextMatch"
    ) {
    } else {
      let [
        resultDay,
        compet,
        index2Selected,
        isLiveStanding,
      ] = await Promise.all([
        getResultChampDay(champSelected, ""),
        getCompet(champSelected),
        "classement",
        true,
      ]);
      return {
        resultDay: resultDay,
        compet: compet,
        index2Selected:
          resultDay && resultDay.length == 0 ? "classement" : "resultat",
        isLiveStanding: compet && compet.live_standings == true ? true : false,
      };
    }
  },

  data() {
    return {
      compet: [],
      resultDay: "",
      index2Selected: "resultat",
      isLiveStanding: true,

      lineUp: "",
      resultatModal: false,
      resultatForModal: "",
      stadium: "",
      stadiumModal: false,
      loading: false,
      isFullPage: "true",
      scorer: [],
      player: [],
      cards: [],

      swiperOptions: {
        threshold: 15,
        followFinger: false,
        loop: true,
        slidesPerView: "auto",
        loopedSlides: 1,
        centeredSlides: true,
        touchEventsTarget: "wrapper",
        longSwipes: true,
        shortSwipes: true,
        spaceBetween: 20,
      },
    };
  },
  computed: {
    champSelected() {
      return this.$store.state.var.champSelected;
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },

  mounted() {
    if (this.champSelected === "") {
      this.$store.commit("var/setNewValue", "NextMatch");
    }
  },
  methods: {
    seeLineup(event) {
      this.resultatForModal = "";
      this.resultatForModal = event;
      this.lineUp = true;
      this.resultatModal = true;
    },
    result(event) {
      this.resultatForModal = "";
      this.lineUp = false;
      this.resultatForModal = event;
      this.resultatModal = true;
    },
    seeStadium(event) {
      this.stadium = event;
      this.stadiumModal = true;
    },
    slideNextTransitionStart() {
      if (this.index2Selected == "resultat") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
        this.classement();
      } else if (this.index2Selected == "goal") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = false;
        this.assist();
      } else if (this.index2Selected == "assist") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = false;
        this.card();
      } else if (this.index2Selected == "card") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = false;
        this.resultat();
      } else if (this.index2Selected == "classement") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = false;
        this.goal();
      }
    },

    slidePrevTransitionStart() {
      if (this.index2Selected == "resultat") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = false;
        this.card();
      } else if (this.index2Selected == "goal") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
        this.classement();
      } else if (this.index2Selected == "assist") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = false;
        this.goal();
      } else if (this.index2Selected == "card") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = false;
        this.assist();
      } else if (this.index2Selected == "classement") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = false;
        this.resultat();
      }
    },
    changeDayChamp(event) {
      this.loading = true;
      this.index2Selected = "resultat";
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
      this.swiperOptions.longSwipes = false;
      getResultChampDay(this.champSelected, event).then((resultDay) => {
        if (resultDay) {
          this.resultDay = resultDay;
        }
        this.loading = false;
      });
    },
    ligue(ligue) {
      this.$store.commit("var/setNewValue", ligue);
    },
    moment: function (time) {
      return moment(time);
    },
    SignupModal() {
      this.$router.push("/signup");
    },
    LoginModal(autenticate) {
      this.$router.push("/login");
    },

    resultat() {
      //this.loading = true;
      this.index2Selected = "resultat";
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
      this.swiperOptions.longSwipes = false;
      getResultChampDay(this.champSelected, "").then((resultDay) => {
        if (resultDay) {
          this.resultDay = resultDay;
        }
        this.loading = false;
      });
    },
    goal() {
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
      this.swiperOptions.longSwipes = false;
      //	this.loading = true;
      this.scorer = [];
      this.index2Selected = "goal";
      this.defaultSortField = "position";
      this.scorer = this.compet.goalRanking;
      this.loading = false;
    },
    assist() {
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
      this.swiperOptions.longSwipes = false;
      //	this.loading = true;
      this.player = [];
      this.index2Selected = "assist";
      this.defaultSortField = "position";
      this.player = this.compet.assistRanking;
      this.loading = false;
    },
    card() {
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
      this.swiperOptions.longSwipes = false;
      //	this.loading = true;
      this.cards = [];
      this.index2Selected = "card";
      this.defaultSortField = "position";
      this.cards = this.compet.cardRanking;
      this.loading = false;
    },
    classement() {
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
      this.swiperOptions.longSwipes = true;
      //	this.compet = [];
      //	this.loading = true;
      this.index2Selected = "classement";
      this.defaultSortField = "position";
      this.defaultSortOrder = "asc";
      this.defaultSortDirection = "asc";
      getCompet(this.champSelected).then((compet) => {
        this.compet = compet;
        this.loading = false;
        if (compet && compet.live_standings == true) {
          this.isLiveStanding = true;
        } else {
          this.isLiveStanding = false;
        }
      });
    },
    selected(champSelected) {
      this.loading = true;
      this.compet = [];
      this.index2Selected = "";
      this.$store.commit("var/setNewValue", champSelected);
      if (
        champSelected == "1326" ||
        champSelected == "307" ||
        champSelected == "310" ||
        champSelected == "390" ||
        champSelected == "570" ||
        champSelected == "2" ||
        champSelected == "24" ||
        champSelected == "5" ||
        champSelected == "NextMatch"
      ) {
        this.loading = false;
      } else {
        this.loading = true;
        this.index2Selected = "resultat";
        getResultChampDay(this.champSelected, "").then((resultDay) => {
          if (resultDay) {
            this.resultDay = resultDay;
          }
          this.loading = false;
          this.swiperOptions.threshold = 10;
          this.swiperOptions.iOSEdgeSwipeThreshold = 10;
          this.swiperOptions.shortSwipes = true;
          this.swiperOptions.longSwipes = false;
          if (!resultDay || resultDay.length == 0) {
            this.swiperOptions.threshold = 10;
            this.swiperOptions.iOSEdgeSwipeThreshold = 10;
            this.swiperOptions.shortSwipes = true;
            this.swiperOptions.longSwipes = true;
            this.index2Selected = "classement";
            this.defaultSortField = "position";
            this.defaultSortOrder = "asc";
            this.defaultSortDirection = "asc";
          } else {
            this.swiperOptions.threshold = 10;
            this.swiperOptions.iOSEdgeSwipeThreshold = 10;
            this.swiperOptions.shortSwipes = true;
            this.swiperOptions.longSwipes = false;
          }
        });

        getCompet(this.champSelected).then((compet) => {
          this.compet = compet;
          this.loading = false;
          if (compet && compet.live_standings == true) {
            this.isLiveStanding = true;
          } else {
            this.isLiveStanding = false;
          }
        });
      }
    },
  },
  head() {
    return {
      title:
        "Champion's League, Ligue 1, Premier League, Liga, Serie A, Bundesliga...tout le football",
      meta: [
        {
          hid: `description`,
          name: "description",
          content:
            "Retrouvez les classements de la L1, Premier League, Série A, Liga, Bundesliga, Ligue des Champions, UEFA, Coupe du Monde...",
        },
        {
          hid: `keywords`,
          name: "keywords",
          keywords:
            "L1, Premier League, Série A, Liga, Bundesliga, Ligue des Champions, UEFA, Coupe du Monde, buteurs, passeurs...",
        },
        {
          hid: `og:title`,
          property: "og:title",
          content:
            "Champion's League, Ligue 1, Premier League, Liga, Serie A, Bundesliga...tout le football",
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
            "Retrouvez les classements de la L1, Premier League, Série A, Liga, Bundesliga, Ligue des Champions, UEFA, Coupe du Monde...",
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
          content: "@insiders_football",
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
            "Champion's League, Ligue 1, Premier League, Liga, Serie A, Bundesliga...tout le football",
        },
        {
          hid: `twitter:description`,
          property: "twitter:description",
          content:
            "Retrouvez les classements de la L1, Premier League, Série A, Liga, Bundesliga, Ligue des Champions, UEFA, Coupe du Monde...",
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
  watch: {
    champSelected: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        this.loading = true;
        if (this.champSelected === "") {
          this.$store.commit("var/setNewValue", "NextMatch");
        }
        if (
          this.champSelected == "1326" ||
          this.champSelected == "307" ||
          this.champSelected == "310" ||
          this.champSelected == "390" ||
          this.champSelected == "570" ||
          this.champSelected == "2" ||
          this.champSelected == "24" ||
          this.champSelected == "5" ||
          this.champSelected == "NextMatch"
        ) {
          this.loading = false;
        } else {
          this.loading = true;
          this.index2Selected = "resultat";
          getResultChampDay(this.champSelected, "").then((resultDay) => {
            if (resultDay) {
              this.resultDay = resultDay;
            }
            this.loading = false;
            this.swiperOptions.threshold = 10;
            this.swiperOptions.iOSEdgeSwipeThreshold = 10;
            this.swiperOptions.shortSwipes = true;
            this.swiperOptions.longSwipes = false;
            if (!resultDay || resultDay.length == 0) {
              this.swiperOptions.threshold = 10;
              this.swiperOptions.iOSEdgeSwipeThreshold = 10;
              this.swiperOptions.shortSwipes = true;
              this.swiperOptions.longSwipes = true;
              this.index2Selected = "classement";
              this.defaultSortField = "position";
              this.defaultSortOrder = "asc";
              this.defaultSortDirection = "asc";
            } else {
              this.swiperOptions.threshold = 10;
              this.swiperOptions.iOSEdgeSwipeThreshold = 10;
              this.swiperOptions.shortSwipes = true;
              this.swiperOptions.longSwipes = false;
            }
          });

          getCompet(this.champSelected).then((compet) => {
            this.compet = compet;
            this.loading = false;
            if (compet && compet.live_standings == true) {
              this.isLiveStanding = true;
            } else {
              this.isLiveStanding = false;
            }
          });
        }
      },

      ////do your stuff
    },
  },
};
</script>

<style scoped>
.wrappTab {
  width: 100vw;
}
h1 > .pointer {
  display: flex;
  justify-content: flex-start;
}

h1 > .pointer > strong {
  align-self: center;
  margin-left: 10px;
}

.matchProno {
  display: flex;
  justify-content: space-evenly;
}

.navbar.is-wc {
  background-color: #0084a4 !important;
  color: #eef1f7 !important;
  position: relative;
}

.displayFlex {
  display: flex;
  margin-bottom: 0.5rem !important;
}

.groupe {
  margin-bottom: 0.5rem !important;
  font-size: 2rem !important;
}

.flag-img {
  cursor: pointer;
}

.is-active {
  display: block;
}

.is-not-active {
  display: none;
}

.flag-img:hover {
  border-bottom-color: #192b41;
  border-top-color: transparent;
}

.trendingWrapper {
  padding-top: 0rem;
}

.has-text-centered {
  font-size: 1rem !important;
  vertical-align: middle !important;
}

.flag {
  justify-content: space-evenly;
  display: flex;
}

.flag-img {
  cursor: pointer;
}

.is-active {
  display: block;
}

.is-not-active {
  display: none;
}

.flag-img:hover {
  border-bottom-color: #192b41;
  border-top-color: transparent;
}

.has-text-yellow {
  color: #ffcf00 !important;
}

div {
  font-size: 1.2rem !important;
}

img {
  max-height: 64px !important;
}

.has-text-centered {
  font-size: 1.2rem !important;
  vertical-align: middle !important;
}

.container {
  margin-bottom: 0.5rem !important;
}

.flag {
  justify-content: space-around;
  display: flex;
}

.navbar-item.is-tab:hover {
  color: #192b41 !important;
}

.dropdown-item {
  padding: 0.5rem !important;
}

.babMenu {
  font-size: 1.2rem;
  color: #d3d3d3 !important;
}

.babMenuHeader {
  display: flex;
  padding: 5px;
  margin: auto;
  font-weight: bold;
  color: #192b41 !important;
  align-items: center;
}

.babMenuHeader > img {
  margin-right: 10px;
}
.trendingWrapperMaster {
  min-height: 85vh;
}
@media (max-width: 1047px) {
  .trendingWrapperMaster {
    padding-top: 0.5rem;
    padding-bottom: 0rem !important;
  }
}
@media (max-width: 769px) {
  .container {
    margin-bottom: 0.25rem !important;
  }
  h1 > .pointer {
    flex-direction: column;
  }

  .trendingWrapperMaster {
    padding-top: 0.5rem;
    padding-bottom: 0rem !important;
  }

  h1 > .pointer > strong {
    align-self: center;
    margin-left: 0px;
  }

  .babMenu {
    font-size: 0.9rem !important;
  }

  .navbar-item.is-tab.is-active {
    font-size: 0.9rem;
  }

  .displayFlex {
    display: flex;
    flex-direction: column;
  }

  .has-text-centered {
    font-size: 0.8rem !important;
  }

  .navbar.is-dark {
    margin-bottom: 3% !important;
  }

  img {
    max-height: 42px !important;
  }

  .babMenuHeader > .ligue-img {
    margin-right: 10px;
  }

  .ligue-img {
    width: auto;
    max-height: 45px !important;
  }

  .flag-img {
    width: 40px;
    height: 40px !important;
  }

  div {
    font-size: 0.8rem !important;
  }

  .has-text-centered {
    font-size: 0.8rem !important;
  }
}
</style>