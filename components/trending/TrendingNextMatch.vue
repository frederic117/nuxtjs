<template>
  <section class="trendingWrapper">
    <div>
      <nav class="navbar is-wc">
        <div class="babblesMenu desktopNav">
          <a @click="prevDay()" class="is-hovered babMenu navbar-item is-tab">{{
            langSelected === "EN" ? "Previous day" : "Journée précédente"
          }}</a>
          <p class="dateNav">
            {{
              moment(dateIndex)
                .locale(langSelected.toLowerCase())
                .local()
                .format("dddd Do MMM")
            }}
          </p>
          <a @click="nextDay()" class="is-hovered babMenu navbar-item is-tab">{{
            langSelected === "EN" ? "Next day" : "Journée suivante"
          }}</a>
        </div>
        <div class="babblesMenu mobileNav">
          <a @click="prevDay()" class="is-hovered babMenu navbar-item is-tab">
            <i class="fa fa-arrow-circle-left"></i>
          </a>
          <p class="dateNav">
            {{
              moment(dateIndex)
                .locale(langSelected.toLowerCase())
                .local()
                .format("dddd Do MMM")
            }}
          </p>
          <a @click="nextDay()" class="is-hovered babMenu navbar-item is-tab">
            <i class="fa fa-arrow-circle-right"></i>
          </a>
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
            <div class="tabWrapper">
              <b-table
                v-if="matchList.length > 0"
                class="NextMatchTable"
                :data="matchList"
                :loading="isLoading"
                :total="total"
                :mobile-cards="true"
                :striped="true"
              >
                <template slot-scope="props">
                  <b-table-column class="NextMatchWrapper dateStadium" centered>
                    <h1 class="journee">
                      <figure
                        @click="ligue(props.row.codeCompetitionApi)"
                        width="80"
                        class="image pointer dayChampion"
                      >
                        <img
                          :class="{
                            invertOk:
                              Number(props.row.codeCompetitionApi) == 2 ||
                              Number(props.row.codeCompetitionApi) == 5,
                          }"
                          class="logoligue"
                          :src="
                            '/logoLigue/' +
                            props.row.codeCompetitionApi +
                            '.png'
                          "
                          alt="logoLigue"
                        />&nbsp
                        <div v-if="props.row.matchday">
                          <span
                            v-if="props.row.matchday === '8th Finals'"
                            class="journéeSpan"
                          >
                            <strong v-if="langSelected === 'EN'">
                              8
                              <sup>th</sup> round
                            </strong>
                            <strong v-else>
                              8
                              <sup>ème</sup> de finale
                            </strong>
                          </span>
                          <span
                            v-else-if="props.row.matchday === '16th Finals'"
                            class="journéeSpan"
                          >
                            <strong v-if="langSelected === 'EN'">
                              16
                              <sup>th</sup> round
                            </strong>
                            <strong v-else>
                              16
                              <sup>ème</sup> de finale
                            </strong>
                          </span>
                          <span
                            v-else-if="props.row.matchday === '32nd Finals'"
                            class="journéeSpan"
                          >
                            <strong v-if="langSelected === 'EN'">
                              32
                              <sup>nd</sup> round
                            </strong>
                            <strong v-else>
                              32
                              <sup>ème</sup> de finale
                            </strong>
                          </span>
                          <span
                            v-else-if="props.row.matchday === 'Quarter-finals'"
                            class="journéeSpan"
                          >
                            <strong>{{
                              langSelected === "EN"
                                ? "Quarter final"
                                : "Quart de finale"
                            }}</strong>
                          </span>
                          <span
                            v-else-if="props.row.matchday === 'Semi-finals'"
                            class="journéeSpan"
                          >
                            <strong>{{
                              langSelected === "EN"
                                ? "Semi final"
                                : "Demi-finale"
                            }}</strong>
                          </span>
                          <span
                            v-else-if="props.row.matchday === 'bronze'"
                            class="journéeSpan"
                          >
                            <strong v-if="langSelected === 'EN'">
                              match for 3
                              <sup>rd</sup> place
                            </strong>
                            <strong v-else>
                              match pour la 3
                              <sup>ème</sup> place
                            </strong>
                          </span>
                          <span
                            v-else-if="props.row.matchday === 'Final'"
                            class="journéeSpan"
                          >
                            <strong>{{
                              langSelected === "EN" ? "Final" : "Finale"
                            }}</strong>
                          </span>
                          <span
                            v-else-if="props.row.matchday == 'Group Stage'"
                            class="journéeSpan"
                          >
                            <strong>{{
                              langSelected === "EN"
                                ? props.row.matchday
                                : "phase de groupe"
                            }}</strong>
                          </span>
                          <span
                            v-else-if="props.row.matchday.includes('Round')"
                            class="journéeSpan"
                          >
                            <strong>{{ props.row.matchday }}</strong>
                          </span>
                          <span
                            v-else-if="props.row.matchday.includes('Play-offs')"
                            class="journéeSpan"
                          >
                            <strong>{{ props.row.matchday }}</strong>
                          </span>
                          <span
                            v-else-if="langSelected === 'EN'"
                            class="journéeSpan"
                          >
                            <strong
                              v-if="
                                props.row.matchday == '1' ||
                                props.row.matchday == '21' ||
                                props.row.matchday == '31'
                              "
                            >
                              {{ props.row.matchday }}
                              <sup>st</sup> day
                            </strong>
                            <strong
                              v-else-if="
                                props.row.matchday == '2' ||
                                props.row.matchday == '22' ||
                                props.row.matchday == '32'
                              "
                            >
                              {{ props.row.matchday }}
                              <sup>nd</sup> day
                            </strong>
                            <strong
                              v-else-if="
                                props.row.matchday == '3' ||
                                props.row.matchday == '23' ||
                                props.row.matchday == '33'
                              "
                            >
                              {{ props.row.matchday }}
                              <sup>rd</sup> day
                            </strong>
                            <strong v-else>
                              {{ props.row.matchday }}
                              <sup>th</sup> day
                            </strong>
                          </span>
                          <span v-else class="journéeSpan">
                            <strong v-if="props.row.matchday == '1'">
                              {{ props.row.matchday }}
                              <sup>ère</sup> journée
                            </strong>
                            <strong v-else>
                              {{ props.row.matchday }}
                              <sup>ème</sup> journée
                            </strong>
                          </span>
                        </div>
                        <div v-if="props.row.stage && !props.row.matchday">
                          <span
                            v-if="props.row.stage === '16th Finals'"
                            class="journéeSpan"
                          >
                            <strong v-if="langSelected === 'EN'">
                              16
                              <sup>th</sup> round
                            </strong>
                            <strong v-else>
                              16
                              <sup>ème</sup> de finale
                            </strong>
                          </span>

                          <span
                            v-else-if="props.row.stage === '32nd Finals'"
                            class="journéeSpan"
                          >
                            <strong v-if="langSelected === 'EN'">
                              32
                              <sup>nd</sup> round
                            </strong>
                            <strong v-else>
                              32
                              <sup>ème</sup> de finale
                            </strong>
                          </span>
                          <span
                            v-else-if="props.row.stage === '8th Finals'"
                            class="journéeSpan"
                          >
                            <strong v-if="langSelected === 'EN'">
                              8
                              <sup>th</sup> round
                            </strong>
                            <strong v-else>
                              8
                              <sup>ème</sup> de finale
                            </strong>
                          </span>
                          <span
                            v-else-if="props.row.stage === 'Quarter-finals'"
                            class="journéeSpan"
                          >
                            <strong>{{
                              langSelected === "EN"
                                ? "Quarter final"
                                : "Quart de finale"
                            }}</strong>
                          </span>
                          <span
                            v-else-if="props.row.stage === 'Semi-finals'"
                            class="journéeSpan"
                          >
                            <strong>{{
                              langSelected === "EN"
                                ? "Semi final"
                                : "Demi-finale"
                            }}</strong>
                          </span>
                          <span
                            v-else-if="props.row.stage === 'bronze'"
                            class="journéeSpan"
                          >
                            <strong v-if="langSelected === 'EN'">
                              match for 3
                              <sup>rd</sup> place
                            </strong>
                            <strong v-else>
                              match pour la 3
                              <sup>ème</sup> place
                            </strong>
                          </span>
                          <span
                            v-else-if="props.row.stage === 'Final'"
                            class="journéeSpan"
                          >
                            <strong>{{
                              langSelected === "EN" ? "Final" : "Finale"
                            }}</strong>
                          </span>
                          <span
                            v-else-if="props.row.stage == 'Group Stage'"
                            class="journéeSpan"
                          >
                            <strong>{{
                              langSelected === "EN"
                                ? props.row.stage
                                : "phase de groupe"
                            }}</strong>
                          </span>
                          <span v-else class="journéeSpan">
                            <strong>{{ props.row.stage }}</strong>
                          </span>
                        </div>
                      </figure>

                      <div class="mobileOnly">
                        <strong
                          v-if="
                            props.row.status.toUpperCase() === 'FT' ||
                            props.row.status.toUpperCase() === 'AET' ||
                            props.row.status.toUpperCase() === 'FT_PEN'
                          "
                          class="is-wc"
                          >{{
                            langSelected === "EN"
                              ? "game over"
                              : "match terminé"
                          }}</strong
                        >
                        <strong
                          v-if="props.row.status.toUpperCase() === 'POSTP'"
                          class="is-wc"
                          >{{
                            langSelected === "EN"
                              ? "match postponed"
                              : "match reporté"
                          }}</strong
                        >
                        <strong
                          v-if="props.row.status.toUpperCase() === 'CANCL'"
                          class="is-wc"
                          >{{
                            langSelected === "EN"
                              ? "match cancelled"
                              : "match annulé"
                          }}</strong
                        >
                        <strong
                          v-if="props.row.status.toUpperCase() === 'DELAYED'"
                          class="is-wc"
                          >{{
                            langSelected === "EN"
                              ? "delayed kickoff - Pending"
                              : "coup d'envoi décalé - En attente"
                          }}</strong
                        >

                        <strong
                          v-if="
                            props.row.status.toUpperCase() != 'AET' &&
                            props.row.status.toUpperCase() != 'FT_PEN' &&
                            props.row.status.toUpperCase() != 'NOT STARTED' &&
                            props.row.status.toUpperCase() != 'NS' &&
                            props.row.status.toUpperCase() != 'TBA' &&
                            props.row.status.toUpperCase() != 'FT' &&
                            props.row.status.toUpperCase() != 'POSTP' &&
                            props.row.status.toUpperCase() != 'CANCL' &&
                            props.row.status.toUpperCase() != 'DELAYED'
                          "
                          >{{
                            langSelected === "EN"
                              ? "game in progress"
                              : "match en cours"
                          }}</strong
                        >
                        <strong
                          v-if="props.row.status.toUpperCase() === 'TBA'"
                          class="is-wc"
                          >{{
                            moment(props.row.date)
                              .local()
                              .locale(langSelected.toLowerCase())
                              .local()
                              .format("DD-MM") + " (horaire non fixé)"
                          }}</strong
                        >
                        <strong
                          v-if="
                            props.row.status.toUpperCase() === 'NS' ||
                            props.row.status.toUpperCase() === 'NOT STARTED'
                          "
                          class="is-wc"
                          >{{
                            moment(props.row.date)
                              .local()
                              .locale(langSelected.toLowerCase())
                              .calendar()
                          }}</strong
                        >
                        <strong
                          @click="seeStadium(props.row.stadium)"
                          class="has-text-yellow pointer"
                          >{{
                            props.row.stadium && props.row.stadium.name
                              ? props.row.stadium.name
                              : ""
                          }}</strong
                        >
                      </div>
                    </h1>
                  </b-table-column>

                  <b-table-column class="NextMatchWrapper" centered>
                    <div class="matchProno">
                      <div class="teamNameStrong">
                        <h1>
                          <nuxt-link
                            v-if="props.row.homeTeamId"
                            :to="
                              '/teams/' +
                              props.row.homeTeamId.shortName.toLowerCase()
                            "
                            class="pointer logoClub"
                          >
                            <div class="teamNameLogo">
                              <img
                                class="pointer"
                                :src="props.row.homeTeamId.teamImg"
                                :alt="props.row.homeTeamId.name"
                                :class="{
                                  invertOk: props.row.homeTeamId.name
                                    .toUpperCase()
                                    .includes('JUVE'),
                                }"
                              />
                            </div>
                          </nuxt-link>
                          <strong
                            class="teamNameStrong pointer"
                            v-if="
                              props.row.homeTeamId && props.row.homeTeamId.name
                            "
                            @click="
                              accessTeam(
                                props.row.homeTeamId.shortName.toLowerCase()
                              )
                            "
                          >
                            {{
                              langSelected === "EN"
                                ? props.row.homeTeamId.searchName
                                : props.row.homeTeamId.name
                            }}
                          </strong>

                          <strong class="teamNameStrong" v-else>{{
                            props.row.homeTeamName
                          }}</strong>
                        </h1>
                      </div>

                      <span class="bullsAndBearsPicVs">
                        <b-tag
                          v-if="
                            props.row.status.toUpperCase() === 'NOT STARTED' ||
                            props.row.status.toUpperCase() === 'NS' ||
                            props.row.status.toUpperCase() === 'TBA' ||
                            props.row.status.toUpperCase() === 'POSTP' ||
                            props.row.status.toUpperCase() === 'CANCL' ||
                            props.row.status.toUpperCase() === 'DELAYED'
                          "
                          class="is-greyLit"
                          >-</b-tag
                        >
                        <b-tag
                          v-else
                          :class="{
                            'is-green':
                              props.row.goalsHomeTeam > props.row.goalsAwayTeam,
                            'is-red':
                              props.row.goalsHomeTeam < props.row.goalsAwayTeam,
                            'is-blueInfo':
                              props.row.goalsHomeTeam ===
                              props.row.goalsAwayTeam,
                          }"
                          size="is-large"
                          >{{ props.row.goalsHomeTeam }}</b-tag
                        >
                      </span>
                      <figure class="versusFigure1">
                        <div
                          class="is-lineUp"
                          v-if="
                            props.row.lineup && props.row.lineup.data.length > 0
                          "
                          @click="seeLineup(props.row)"
                        >
                          {{ langSelected === "EN" ? "line-up" : "compos" }}
                        </div>
                        <img
                          loading="lazy"
                          @click="result(props.row)"
                          class="vs"
                          src="~assets/images/versus.png"
                          alt="versus"
                        />
                        <span
                          v-if="
                            props.row.status.toUpperCase() != 'NOT STARTED' &&
                            props.row.status.toUpperCase() != 'NS' &&
                            props.row.status.toUpperCase() != 'TBA' &&
                            props.row.status.toUpperCase() != 'POSTP' &&
                            props.row.status.toUpperCase() != 'CANCL' &&
                            props.row.status.toUpperCase() != 'DELAYED'
                          "
                          @click="result(props.row)"
                          class="pointer1"
                          >{{
                            langSelected === "EN" ? "details" : "détails"
                          }}</span
                        >
                      </figure>
                      <span class="bullsAndBearsPicVs">
                        <b-tag
                          v-if="
                            props.row.status.toUpperCase() === 'NOT STARTED' ||
                            props.row.status.toUpperCase() === 'NS' ||
                            props.row.status.toUpperCase() === 'TBA' ||
                            props.row.status.toUpperCase() === 'POSTP' ||
                            props.row.status.toUpperCase() === 'CANCL' ||
                            props.row.status.toUpperCase() === 'DELAYED'
                          "
                          class="is-greyLit"
                          >-</b-tag
                        >
                        <b-tag
                          v-else
                          :class="{
                            'is-green':
                              props.row.goalsHomeTeam < props.row.goalsAwayTeam,
                            'is-red':
                              props.row.goalsHomeTeam > props.row.goalsAwayTeam,
                            'is-blueInfo':
                              props.row.goalsHomeTeam ===
                              props.row.goalsAwayTeam,
                          }"
                          size="is-large"
                          >{{ props.row.goalsAwayTeam }}</b-tag
                        >
                      </span>
                      <div class="teamNameStrong">
                        <h1>
                          <nuxt-link
                            v-if="props.row.awayTeamId"
                            :to="
                              '/teams/' +
                              props.row.awayTeamId.shortName.toLowerCase()
                            "
                            class="pointer logoClub"
                          >
                            <div class="teamNameLogo">
                              <img
                                class="pointer"
                                :src="props.row.awayTeamId.teamImg"
                                :alt="props.row.awayTeamId.name"
                                :class="{
                                  invertOk: props.row.awayTeamId.name
                                    .toUpperCase()
                                    .includes('JUVE'),
                                }"
                              />
                            </div>
                          </nuxt-link>
                          <strong
                            class="teamNameStrong pointer"
                            v-if="
                              props.row.awayTeamId && props.row.awayTeamId.name
                            "
                            @click="
                              accessTeam(
                                props.row.awayTeamId.shortName.toLowerCase()
                              )
                            "
                          >
                            {{
                              langSelected === "EN"
                                ? props.row.awayTeamId.searchName
                                : props.row.awayTeamId.name
                            }}</strong
                          >
                          <strong class="teamNameStrong" v-else>{{
                            props.row.awayTeamName
                          }}</strong>
                        </h1>
                      </div>
                    </div>
                    <strong v-if="props.row.isPenalty === true">
                      <span class="tirsAuBut">
                        <span>{{
                          langSelected === "EN"
                            ? "Penalty shootout"
                            : "Tirs au but"
                        }}</span>
                        <br />
                      </span>
                    </strong>
                  </b-table-column>
                  <b-table-column
                    class="NextMatchWrapper dateStadium desktopOnly"
                    centered
                  >
                    <div class="journee">
                      <div class>
                        <strong
                          v-if="
                            props.row.status.toUpperCase() === 'FT' ||
                            props.row.status.toUpperCase() === 'AET' ||
                            props.row.status.toUpperCase() === 'FT_PEN'
                          "
                          class="is-wc"
                          >{{
                            langSelected === "EN"
                              ? "game over"
                              : "match terminé"
                          }}</strong
                        >
                        <strong
                          v-if="props.row.status.toUpperCase() === 'POSTP'"
                          class="is-wc"
                          >{{
                            langSelected === "EN"
                              ? "match postponed"
                              : "match reporté"
                          }}</strong
                        >
                        <strong
                          v-if="props.row.status.toUpperCase() === 'CANCL'"
                          class="is-wc"
                          >{{
                            langSelected === "EN"
                              ? "match cancelled"
                              : "match annulé"
                          }}</strong
                        >
                        <strong
                          v-if="props.row.status.toUpperCase() === 'DELAYED'"
                          class="is-wc"
                          >{{
                            langSelected === "EN"
                              ? "delayed kickoff - Pending"
                              : "coup d'envoi décalé - En attente"
                          }}</strong
                        >
                        <strong
                          v-if="
                            props.row.status.toUpperCase() != 'AET' &&
                            props.row.status.toUpperCase() != 'FT_PEN' &&
                            props.row.status.toUpperCase() != 'NOT STARTED' &&
                            props.row.status.toUpperCase() != 'NS' &&
                            props.row.status.toUpperCase() != 'TBA' &&
                            props.row.status.toUpperCase() != 'FT' &&
                            props.row.status.toUpperCase() != 'POSTP' &&
                            props.row.status.toUpperCase() != 'CANCL' &&
                            props.row.status.toUpperCase() != 'DELAYED'
                          "
                          class="is-wc"
                          >{{
                            langSelected === "EN"
                              ? "game in progress"
                              : "match en cours"
                          }}</strong
                        >
                        <strong
                          v-if="props.row.status.toUpperCase() === 'TBA'"
                          class="is-wc"
                          >{{
                            moment(props.row.date)
                              .local()
                              .locale(langSelected.toLowerCase())
                              .format("DD-MM") + " (horaire non fixé)"
                          }}</strong
                        >
                        <strong
                          v-if="
                            props.row.status.toUpperCase() === 'NS' ||
                            props.row.status.toUpperCase() === 'NOT STARTED'
                          "
                          class="is-wc"
                          >{{
                            moment(props.row.date)
                              .local()
                              .locale(langSelected.toLowerCase())
                              .calendar()
                          }}</strong
                        >
                        <br />
                        <strong
                          @click="seeStadium(props.row.stadium)"
                          v-if="
                            props.row.stadium &&
                            props.row.stadium.name &&
                            props.row.stadium.name.length > 25
                          "
                          class="has-text-yellow pointer"
                          >{{
                            props.row.stadium.name.substring(0, 25) + "..."
                          }}</strong
                        >
                        <strong
                          @click="seeStadium(props.row.stadium)"
                          v-else
                          class="has-text-yellow pointer"
                          >{{
                            props.row.stadium && props.row.stadium.name
                              ? props.row.stadium.name
                              : ""
                          }}</strong
                        >
                      </div>
                    </div>
                  </b-table-column>
                </template>
                <template slot="empty">
                  <section class="section">
                    <div class="content has-text-grey has-text-centered">
                      <p>
                        <b-icon
                          icon="sentiment_very_satisfied"
                          size="is-large"
                        ></b-icon>
                      </p>
                      <div>
                        {{
                          langSelected === "EN" ? "..loading" : "..chargement"
                        }}
                      </div>
                    </div>
                  </section>
                </template>
              </b-table>
              <div
                class="has-text-centered"
                v-if="matchList.length == 0 && isLoading == false"
              >
                <br />{{
                  langSelected === "EN"
                    ? "No game today"
                    : "Pas de match aujourd'hui"
                }}
              </div>
              <div
                class="has-text-centered"
                v-if="matchList.length == 0 && isLoading == true"
              >
                <br />{{ langSelected === "EN" ? "..loading" : "..chargement" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="resultat">
      <b-modal :active.sync="resultatModal">
        <resultat-modal
          class="modalResultLineup"
          :lineUp="lineUp"
          :resultat="resultat"
        ></resultat-modal>
      </b-modal>
    </div>
    <b-modal :active.sync="stadiumModal">
      <stadium-modal :stadium="stadium"></stadium-modal>
    </b-modal>
  </section>
</template>

<script>
import { takeAbet, modifyAbet } from "@/server/apiContest";
import { getNextMatchList } from "@/server/apiTrending";
import moment from "moment";
export default {
  auth: false,
  components: {
    resultatModal: () => import("@/components/modal/resultatModal"),
    stadiumModal: () => import("@/components/modal/stadiumModal"),
  },
  data() {
    return {
      lineUp: "",
      stadium: "",
      stadiumModal: false,
      logoNumber: 450,
      matchList: [],
      indexSelected: "",
      total: 0,
      isLoading: true,
      defaultSortField: "date",
      defaultSortOrder: "asc",
      page: 1,
      dateIncrement: 0,
      dateIndex: moment().local().format("YYYY-MM-DD"),
      perPage: 10,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      teamHomeScore: "",
      teamAwayScore: "",
      betModal: false,
      positionTaken: false,
      modifBetId: "",
      modifBetTeam: "",
      currentInsight: "",
      resultatModal: false,
      resultat: "",
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
  methods: {
    slideNextTransitionStart() {
      this.nextDay();
    },

    slidePrevTransitionStart() {
      this.prevDay();
    },
    seeStadium(event) {
      this.stadium = event;
      this.stadiumModal = true;
    },
    seeLineup(event) {
      this.resultat = event;
      this.lineUp = true;
      this.resultatModal = true;
    },
    result(resultat) {
      this.lineUp = false;
      this.resultat = resultat;
      this.resultatModal = true;
    },
    sortByDate(a, b, isAsc) {
      if (isAsc) {
        return (
          new Date(b.schedule_date).getTime() -
          new Date(a.schedule_date).getTime()
        );
      } else {
        return (
          new Date(a.schedule_date).getTime() -
          new Date(b.schedule_date).getTime()
        );
      }
    },
    sortByDateDesc(a, b) {
      if (
        new Date(a.info.time.starting_at.date_time) <
        new Date(b.info.time.starting_at.date_time)
      )
        return 1;
      if (
        new Date(a.info.time.starting_at.date_time) >
        new Date(b.info.time.starting_at.date_time)
      )
        return -1;

      return 0;
    },
    sortByDateAsc(a, b) {
      if (
        new Date(a.info.time.starting_at.date_time) <
        new Date(b.info.time.starting_at.date_time)
      )
        return -1;
      if (
        new Date(a.info.time.starting_at.date_time) >
        new Date(b.info.time.starting_at.date_time)
      )
        return 1;

      return 0;
    },
    accessTeam(event) {
      this.$router.push("/teams/" + event);
    },
    prevDay() {
      this.dateIncrement--;
      this.dateIndex = moment()
        .add(this.dateIncrement, "days")
        .local()
        .format("YYYY-MM-DD");
      this.isLoading = true;
      getNextMatchList(this.dateIndex).then((matchList) => {
        this.matchList = matchList;
        this.isLoading = false;
      });
    },
    nextDay() {
      this.dateIncrement++;
      this.dateIndex = moment()
        .add(this.dateIncrement, "days")
        .local()
        .format("YYYY-MM-DD");
      this.isLoading = true;
      getNextMatchList(this.dateIndex).then((matchList) => {
        this.matchList = matchList;
        this.isLoading = false;
      });
    },

    moment: function (time) {
      return moment(time);
    },
    ligue(ligue) {
      this.$store.commit("var/setNewValue", ligue);
      setTimeout(() => {
        this.$router.push("/leagues");
      }, 10);
    },
    SignupModal() {
      this.$router.push("/signup");
    },
    LoginModal(autenticate) {
      this.$router.push("/login");
    },

    onPageChange(page) {
      this.page = page;
    },
    sortByDate(a, b, isAsc) {
      if (isAsc) {
        return (
          new Date(b.schedule_date).getTime() -
          new Date(a.schedule_date).getTime()
        );
      } else {
        return (
          new Date(a.schedule_date).getTime() -
          new Date(b.schedule_date).getTime()
        );
      }
    },

    iWantBet(currentInsight) {
      if (
        currentInsight.status.toUpperCase() != "NOT STARTED" &&
        currentInsight.status.toUpperCase() != "NS" &&
        currentInsight.status.toUpperCase() != "TBA"
      ) {
        this.$buefy.dialog.alert(
          "Désolé, il n'est plus possible de pronostiquer pour ce match 😜😜😜"
        );
      } else if (!currentInsight.homeTeamId) {
        this.$buefy.dialog.alert(
          "Désolé, il n'est pas encore possible de pronostiquer pour ce match 😜😜😜"
        );
      } else {
        this.currentInsight = currentInsight;
        if (currentInsight.userProno) {
          this.teamHomeScore = currentInsight.userProno.position[0];
          this.teamAwayScore = currentInsight.userProno.position[1];
          this.betModal = true;
        } else {
          this.teamHomeScore = "";
          this.teamAwayScore = "";
          this.betModal = true;
        }
      }
    },
  },

  head() {
    return {
      title:
        "Ligue des Champions, Ligue 1, Premier League, Liga, Serie A, Bundesliga...tout le football",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Retrouvez les classements de tous les championnats europeens, ligue des champions, coupe du monde...",
        },
      ],
    };
  },
  mounted() {
    this.isLoading = true;
    getNextMatchList(this.dateIndex).then((matchList) => {
      this.matchList = matchList;
      this.isLoading = false;
    });
  },
};
</script>

<style scoped>
.tabWrapper {
  width: 100%;
}
.babblesMenu {
  width: 100%;
}
.NextMatchTable {
  border-radius: 5px;
}

.dateNav {
  font-weight: bold;
  margin: auto;
}

.resultModalTitle > div > span {
  display: flex;
  margin: auto;
}

.is-current-sort {
  display: none !important;
}

.journee {
  display: flex;
  justify-content: center;
}

thead {
  display: none !important;
}

.is-current-sort {
  display: none !important;
}

.dayChampion {
  align-items: center;
  display: flex;
  justify-content: center;
}

.dayChampion > div {
  display: flex;
}

.dayChampion > img {
  margin: 0px;
  align-self: CENTER;
  height: 64px !important;
}

.babMenu {
  font-size: 1.2rem;
  color: lightgrey !important;
}

.dateStadium {
  width: 20%;
}

.cardRefer {
  width: auto !important;
}

.tirsAuBut {
  align-self: center;
}

.teamNameLogo {
  display: flex;
  justify-content: center;
}

.penSeance {
  display: flex;
  justify-content: center;
}

.teamNameStrong {
  align-self: center;
  width: 30%;
  min-width: 30%;
}

.logoClub {
  align-self: center;
}

.has-text-contest {
  font-weight: bold;
}

.versusFigure1 {
  display: flex !important;
  flex-direction: column !important;
  align-self: center;
}

.pointer1 {
  cursor: pointer;
  font-size: 1rem !important;
  font-style: italic !important;
  color: #192b41 !important;
}

.stadiumPics {
  width: auto;
  height: auto;
  max-height: 450px !important;
  border-radius: 5px;
}

.pronoPlayer {
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
}

.goals-panel {
  font-weight: normal !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  min-width: 50%;
  font-size: 0.8rem !important;
  margin: 5px;
}

.goalshome {
  display: flex !important;
  text-align: left;
  padding-right: 5px;
}

.goalsaway {
  display: flex !important;
  text-align: left;
  padding-left: 5px;
}

.scoreResultModal {
  font-size: 1.7rem !important;
}

.team {
  min-width: 25%;
}

.modalTitleBet {
  text-align: center;
  margin-bottom: 2rem;
}

.vs {
  height: 48px !important;
  align-self: center;
}

.bullsAndBearsPicVs {
  display: flex;
  justify-content: center;
  align-self: center;
}

.bullsAndBearsPicVsName {
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
  justify-content: space-between;
}

.navbar.is-wc {
  background-color: #0084a4 !important;
  color: #eef1f7 !important;
  position: relative;
}

.is-wc {
  color: #0084a4 !important;
}

.matchlist > .b-table {
  border: none !important;
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

.is-active {
  display: flex;
}

.is-not-active {
  display: none;
}

.flag-img:hover {
  border-bottom-color: #192b41;
  border-top-color: transparent;
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
  border-radius: 3px;
  margin: 2px;
  font-size: 1.25rem;
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

img {
  max-height: 64px !important;
}

.has-text-centered {
  font-size: 1.2rem !important;
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

.separatorScoreResult {
  margin: 0px 3px;
  font-size: 2.25rem;
}

.navbar-item.navbar-item.is-tab:hover {
  color: #192b41 !important;
}

.mobileNav {
  display: none;
}

.desktopNav {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.logoligue {
  width: auto;
  max-height: 45px;
}

.mobileOnly {
  display: none;
}

@media (max-width: 769px) {
  .desktopOnly {
    display: none !important;
  }

  .journee {
    display: flex;
    justify-content: space-between;
  }

  .mobileOnly {
    display: flex;
    flex-direction: column;
    max-width: 55%;
  }

  .mobileOnly > strong {
    text-align: right;
  }

  .NextMatchWrapper:before {
    margin-right: 0 !important;
    padding-right: 0em !important;
    width: 0% !important;
  }

  .logoligue {
    width: auto;
    height: 35px;
  }

  .fa-arrow-circle-left {
    font-size: 2rem;
  }

  .fa-arrow-circle-right {
    font-size: 2rem;
  }

  .pointer1 {
    cursor: pointer;
    font-size: 0.7rem !important;
    font-style: italic !important;
    color: #192b41 !important;
  }

  .desktopNav {
    display: none;
  }

  .mobileNav {
    display: flex;
    justify-content: space-between;
    min-height: 3.25rem;
  }

  .has-text-centered {
    justify-content: center !important;
  }

  .babMenu {
    font-size: 0.9rem;
  }

  .navbar-item.is-tab.is-active {
    font-size: 0.9rem;
  }

  .matchProno {
    width: 100% !important;
  }

  .separatorScoreResult {
    margin: 0px 3px;
    font-size: 1rem;
  }

  .pointsContest {
    display: flex;
  }

  .is-large {
    font-size: 1rem !important;
    min-width: 32px;
    padding: 0px;
  }

  .is-greyLit {
    font-size: 1rem !important;
  }

  .vs {
    height: 35px !important;
  }

  .positionClass {
    font-size: 1rem !important;
  }

  .bullsAndBearsPicVs {
    width: 0%;
  }

  .bullsAndBearsPicVsName {
    width: 30%;
    padding-left: 5px;
    padding-right: 5px;
  }

  .is-hidden-tablet {
    display: none !important;
  }

  img {
    max-height: 42px !important;
  }

  .teamNameLogo > img {
    max-height: 40px !important;
    height: 40px !important;
    width: auto;
    margin: 0px;
    padding: 1px;
  }

  .teamNameLogo {
    padding: 5px;
  }

  .goalsaway > img {
    max-height: 16px !important;
  }

  .goalshome > img {
    max-height: 16px !important;
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

  .control {
    height: 30px !important;
    width: 30px !important;
  }

  .navbar.is-dark {
    margin-bottom: 3% !important;
  }
}
</style>