<template>
  <section class="trendingWrapper">
    <b-loading
      v-if="loading === true"
      :is-full-page="false"
      :active.sync="loading"
      :canCancel="false"
    ></b-loading>

    <div v-if="loading === false">
      <nav class="navbar">
        <div class="babblesMenu desktopNav">
          <div class="navDay">
            <a
              v-if="
                champSelected == '2' ||
                champSelected == '5' ||
                champSelected == '1326' ||
                champSelected == '307' ||
                champSelected == '24' ||
                champSelected == '570' ||
                champSelected == '390'
              "
              @click="prevDay()"
              class="is-hovered babMenu navbar-item is-tab"
              >{{
                langSelected === "EN" ? "Previous day" : "Journée précédente"
              }}</a
            >
            <a
              v-else-if="
                (resultDay && resultDay[0] && isNaN(resultDay[0].matchday)) ||
                (resultDay && resultDay[0] && resultDay[0].matchday > 1) ||
                !resultDay ||
                !resultDay[0]
              "
              @click="prevDay()"
              class="is-hovered babMenu navbar-item is-tab"
            >
              {{
                langSelected === "EN" ? "Previous day" : "Journée précédente"
              }}
            </a>
          </div>

          <p v-if="resultDay && resultDay[0]" class="dateNav">
            <img
              :class="{
                invertOk:
                  Number(resultDay[0].codeCompetitionApi) == 2 ||
                  Number(resultDay[0].codeCompetitionApi) == 5,
              }"
              class="logoligue"
              :src="'/logoLigue/' + resultDay[0].codeCompetitionApi + '.png'"
              alt="logoLigue"
            />&nbsp
            <span
              v-if="
                resultDay[0].stage &&
                resultDay[0].stage.data &&
                resultDay[0].stage.data.name === 'Group Stage'
              "
              class="journéeSpan"
            >
              <strong>{{
                langSelected === "EN" ? "Group Stage" : "phase de groupe"
              }}</strong>
            </span>
            <span
              v-else-if="resultDay[0].matchday === 'Quarter-finals'"
              class="journéeSpan"
            >
              <strong>{{
                langSelected === "EN" ? "Quarter final" : "Quart de finale"
              }}</strong>
            </span>
            <span
              v-else-if="resultDay[0].matchday === 'Semi-finals'"
              class="journéeSpan"
            >
              <strong>{{
                langSelected === "EN" ? "Semi final" : "Demi-finale"
              }}</strong>
            </span>
            <span
              v-else-if="resultDay[0].matchday === 'bronze'"
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
              v-else-if="resultDay[0].matchday === 'Final'"
              class="journéeSpan"
            >
              <strong>{{ langSelected === "EN" ? "Final" : "Finale" }}</strong>
            </span>
            <span
              v-else-if="resultDay[0].matchday == 'Group Stage'"
              class="journéeSpan"
            >
              <strong>{{
                langSelected === "EN" ? "Group Stage" : "phase de groupe"
              }}</strong>
            </span>
            <span
              v-else-if="resultDay[0].matchday.includes('Round')"
              class="journéeSpan"
            >
              <strong>{{ resultDay[0].matchday }}</strong>
            </span>
            <span
              v-else-if="resultDay[0].matchday.includes('Play-offs')"
              class="journéeSpan"
            >
              <strong>{{ resultDay[0].matchday }}</strong>
            </span>

            <span
              v-else-if="resultDay[0].matchday === '8th Finals'"
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
              v-else-if="resultDay[0].matchday === '16th Finals'"
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
              v-else-if="resultDay[0].matchday === '32nd Finals'"
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

            <span v-else-if="langSelected === 'EN'" class="journéeSpan">
              <strong
                v-if="
                  resultDay[0].matchday == '1' ||
                  resultDay[0].matchday == '21' ||
                  resultDay[0].matchday == '31'
                "
              >
                {{ resultDay[0].matchday }}
                <sup>st</sup> day
              </strong>
              <strong
                v-else-if="
                  resultDay[0].matchday == '2' ||
                  resultDay[0].matchday == '22' ||
                  resultDay[0].matchday == '32'
                "
              >
                {{ resultDay[0].matchday }}
                <sup>nd</sup> day
              </strong>
              <strong
                v-else-if="
                  resultDay[0].matchday == '3' ||
                  resultDay[0].matchday == '23' ||
                  resultDay[0].matchday == '33'
                "
              >
                {{ resultDay[0].matchday }}
                <sup>rd</sup> day
              </strong>
              <strong v-else>
                {{ resultDay[0].matchday }}
                <sup>th</sup> day
              </strong>
            </span>
            <span v-else class="journéeSpan">
              <strong v-if="resultDay[0].matchday == '1'">
                {{ resultDay[0].matchday }}
                <sup>ère</sup> journée
              </strong>
              <strong v-else>
                {{ resultDay[0].matchday }}
                <sup>ème</sup> journée
              </strong>
            </span>
          </p>
          <div class="navDay nextDaywrapper">
            <a
              v-if="
                (champSelected == '2' ||
                  champSelected == '5' ||
                  champSelected == '1326' ||
                  champSelected == '307' ||
                  champSelected == '24' ||
                  champSelected == '570' ||
                  champSelected == '390') &&
                ((resultDay[0] && resultDay[0].matchday != 'Final') ||
                  !resultDay ||
                  !resultDay[0])
              "
              @click="nextDay()"
              class="is-hovered babMenu navbar-item is-tab"
            >
              {{ langSelected === "EN" ? "Next day" : "Journée suivante" }}
            </a>
            <a
              v-else-if="
                (resultDay && resultDay[0] && isNaN(resultDay[0].matchday)) ||
                (resultDay &&
                  resultDay[0] &&
                  resultDay[0].matchday < resultDay.length * 4 - 2) ||
                !resultDay ||
                !resultDay[0]
              "
              @click="nextDay()"
              class="is-hovered babMenu navbar-item is-tab"
              >{{ langSelected === "EN" ? "Next day" : "Journée suivante" }}</a
            >
          </div>
        </div>
        <div class="babblesMenu mobileNav">
          <div class="navDay">
            <a
              v-if="
                champSelected == '2' ||
                champSelected == '5' ||
                champSelected == '1326' ||
                champSelected == '307' ||
                champSelected == '24' ||
                champSelected == '570' ||
                champSelected == '390'
              "
              @click="prevDay()"
              class="is-hovered babMenu navbar-item is-tab"
            >
              <i class="fa fa-arrow-circle-left navDay"></i>
            </a>
            <a
              v-else-if="
                (resultDay && resultDay[0] && isNaN(resultDay[0].matchday)) ||
                (resultDay && resultDay[0] && resultDay[0].matchday > 1) ||
                !resultDay ||
                !resultDay[0]
              "
              @click="prevDay()"
              class="is-hovered babMenu navbar-item is-tab"
            >
              <i class="fa fa-arrow-circle-left navDay"></i>
            </a>
          </div>
          <p v-if="resultDay && resultDay[0]" class="dateNav">
            <img
              :class="{
                invertOk:
                  Number(resultDay[0].codeCompetitionApi) == 2 ||
                  Number(resultDay[0].codeCompetitionApi) == 5,
              }"
              class="logoligue"
              :src="'/logoLigue/' + resultDay[0].codeCompetitionApi + '.png'"
              alt="logoLigue"
            />&nbsp
            <span
              v-if="
                resultDay[0].stage &&
                resultDay[0].stage.data &&
                resultDay[0].stage.data.name === 'Group Stage'
              "
              class="journéeSpan"
            >
              <strong>{{
                langSelected === "EN" ? "Group Stage" : "phase de groupe"
              }}</strong>
            </span>
            <span
              v-else-if="resultDay[0].matchday === 'Quarter-finals'"
              class="journéeSpan"
            >
              <strong>{{
                langSelected === "EN" ? "Quarter final" : "Quart de finale"
              }}</strong>
            </span>
            <span
              v-else-if="resultDay[0].matchday === 'Semi-finals'"
              class="journéeSpan"
            >
              <strong>{{
                langSelected === "EN" ? "Semi final" : "Demi-finale"
              }}</strong>
            </span>
            <span
              v-else-if="resultDay[0].matchday === 'bronze'"
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
              v-else-if="resultDay[0].matchday === 'Final'"
              class="journéeSpan"
            >
              <strong>{{ langSelected === "EN" ? "Final" : "Finale" }}</strong>
            </span>
            <span
              v-else-if="resultDay[0].matchday == 'Group Stage'"
              class="journéeSpan"
            >
              <strong>{{
                langSelected === "EN" ? "Group Stage" : "phase de groupe"
              }}</strong>
            </span>
            <span
              v-else-if="resultDay[0].matchday.includes('Round')"
              class="journéeSpan"
            >
              <strong>{{ resultDay[0].matchday }}</strong>
            </span>
            <span
              v-else-if="resultDay[0].matchday.includes('Play-offs')"
              class="journéeSpan"
            >
              <strong>{{ resultDay[0].matchday }}</strong>
            </span>
            <span
              v-else-if="resultDay[0].matchday === '16th Finals'"
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
              v-else-if="resultDay[0].matchday === '32nd Finals'"
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
              v-else-if="resultDay[0].matchday === '8th Finals'"
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

            <span v-else-if="langSelected === 'EN'" class="journéeSpan">
              <strong
                v-if="
                  resultDay[0].matchday == '1' ||
                  resultDay[0].matchday == '21' ||
                  resultDay[0].matchday == '31'
                "
              >
                {{ resultDay[0].matchday }}
                <sup>st</sup> day
              </strong>
              <strong
                v-else-if="
                  resultDay[0].matchday == '2' ||
                  resultDay[0].matchday == '22' ||
                  resultDay[0].matchday == '32'
                "
              >
                {{ resultDay[0].matchday }}
                <sup>nd</sup> day
              </strong>
              <strong
                v-else-if="
                  resultDay[0].matchday == '3' ||
                  resultDay[0].matchday == '23' ||
                  resultDay[0].matchday == '33'
                "
              >
                {{ resultDay[0].matchday }}
                <sup>rd</sup> day
              </strong>
              <strong v-else>
                {{ resultDay[0].matchday }}
                <sup>th</sup> day
              </strong>
            </span>
            <span v-else class="journéeSpan">
              <strong v-if="resultDay[0].matchday == '1'">
                {{ resultDay[0].matchday }}
                <sup>ère</sup> journée
              </strong>
              <strong v-else>
                {{ resultDay[0].matchday }}
                <sup>ème</sup> journée
              </strong>
            </span>
          </p>
          <div class="navDay">
            <a
              v-if="
                (champSelected == '2' ||
                  champSelected == '5' ||
                  champSelected == '1326' ||
                  champSelected == '307' ||
                  champSelected == '24' ||
                  champSelected == '570' ||
                  champSelected == '390') &&
                ((resultDay[0] && resultDay[0].matchday != 'Final') ||
                  !resultDay ||
                  !resultDay[0])
              "
              @click="nextDay()"
              class="is-hovered babMenu navbar-item is-tab"
            >
              <i class="fa fa-arrow-circle-right navDay"></i>
            </a>
            <a
              v-else-if="
                (resultDay && resultDay[0] && isNaN(resultDay[0].matchday)) ||
                (resultDay &&
                  resultDay[0] &&
                  resultDay[0].matchday < resultDay.length * 4 - 2) ||
                !resultDay ||
                !resultDay[0]
              "
              @click="nextDay()"
              class="is-hovered babMenu navbar-item is-tab"
            >
              <i class="fa fa-arrow-circle-right navDay"></i>
            </a>
          </div>
        </div>
      </nav>

      <div v-if="resultDay && resultDay.length">
        <b-table
          class="NextMatchTable"
          :data="resultDay"
          :loading="loading"
          :total="total"
          :mobile-cards="true"
          :striped="true"
        >
          <template slot-scope="props">
            <b-table-column class="NextMatchWrapper dateStadium" centered>
              <div class="journee">
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
                    :src="'/logoLigue/' + props.row.codeCompetitionApi + '.png'"
                    alt="logoLigue"
                  />&nbsp
                  <span
                    v-if="props.row.matchday === 'Group Stage'"
                    class="journéeSpan"
                  >
                    <strong>{{
                      langSelected === "EN" ? "Group Stage" : "phase de groupe"
                    }}</strong>
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
                    v-else-if="props.row.matchday === '8th Finals'"
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
                      langSelected === "EN" ? "Semi final" : "Demi-finale"
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
                  <span v-else-if="langSelected === 'EN'" class="journéeSpan">
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
                </figure>
                <div class="mobileOnly">
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
                      langSelected === "EN" ? "match cancelled" : "match annulé"
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
                      props.row.status.toUpperCase() === 'FT' ||
                      props.row.status.toUpperCase() === 'AET' ||
                      props.row.status.toUpperCase() === 'FT_PEN'
                    "
                    class="is-wc"
                  >
                    {{ langSelected === "EN" ? "game over" : "match terminé" }}
                    ({{
                      moment(props.row.date)
                        .local()
                        .locale(langSelected.toLowerCase())
                        .calendar()
                    }})
                  </strong>
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
                  <strong
                    class="has-text-yellow pointer"
                    @click="seeStadium(props.row.stadium)"
                    >{{
                      props.row.stadium && props.row.stadium.name
                        ? props.row.stadium.name
                        : ""
                    }}</strong
                  >
                </div>
              </div>
            </b-table-column>

            <b-table-column class="NextMatchWrapper" centered>
              <div class="matchProno">
                <nuxt-link
                  v-if="props.row.homeTeamId"
                  :to="
                    props.row.homeTeamId.shortName
                      ? '/teams/' + props.row.homeTeamId.shortName.toLowerCase()
                      : ''
                  "
                  class="pointer logoClub"
                >
                  <div class="teamNameLogo">
                    <img
                      loading="lazy"
                      class="pointer"
                      :src="props.row.homeTeamId.teamImg"
                      :alt="props.row.homeTeamId.name"
                      :class="{
                        invertOk: props.row.homeTeamId.name
                          .toUpperCase()
                          .includes('JUVE'),
                      }"
                    />
                    <strong class="teamNameStrong pointer"
                      >{{
                        langSelected === "EN"
                          ? props.row.homeTeamId.searchName
                          : props.row.homeTeamId.name
                      }}
                      <span class="is-wc" v-if="props.row.standings"
                        >({{ props.row.standings.localteam_position }})</span
                      ></strong
                    >
                  </div>
                </nuxt-link>
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
                        props.row.goalsHomeTeam === props.row.goalsAwayTeam,
                    }"
                    size="is-large"
                    >{{ props.row.goalsHomeTeam }}</b-tag
                  >
                </span>
                <figure class="versusFigure1">
                  <div
                    class="is-lineUp"
                    v-if="props.row.lineup && props.row.lineup.data.length > 0"
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
                    >{{ langSelected === "EN" ? "details" : "détails" }}</span
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
                        props.row.goalsHomeTeam === props.row.goalsAwayTeam,
                    }"
                    size="is-large"
                    >{{ props.row.goalsAwayTeam }}</b-tag
                  >
                </span>
                <nuxt-link
                  v-if="props.row.awayTeamId"
                  :to="
                    props.row.awayTeamId.shortName
                      ? '/teams/' + props.row.awayTeamId.shortName.toLowerCase()
                      : ''
                  "
                  class="pointer logoClub"
                >
                  <div class="teamNameLogo">
                    <img
                      loading="lazy"
                      class="pointer"
                      :src="props.row.awayTeamId.teamImg"
                      :alt="props.row.awayTeamId.name"
                      :class="{
                        invertOk: props.row.awayTeamId.name
                          .toUpperCase()
                          .includes('JUVE'),
                      }"
                    />
                    <strong class="teamNameStrong pointer">
                      {{
                        langSelected === "EN" && isNat
                          ? props.row.awayTeamId.searchName
                          : props.row.awayTeamId.name
                      }}
                      <span class="is-wc" v-if="props.row.standings">
                        ({{ props.row.standings.visitorteam_position }})</span
                      ></strong
                    >
                  </div>
                </nuxt-link>
              </div>
            </b-table-column>
            <b-table-column
              v-if="!mobile"
              class="NextMatchWrapper dateStadium desktopOnly"
              centered
            >
              <div class="journee">
                <div class>
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
                      langSelected === "EN" ? "match cancelled" : "match annulé"
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
                      props.row.status.toUpperCase() === 'FT' ||
                      props.row.status.toUpperCase() === 'AET' ||
                      props.row.status.toUpperCase() === 'FT_PEN'
                    "
                    class="is-wc"
                  >
                    {{ langSelected === "EN" ? "game over" : "match terminé" }}
                    ({{
                      moment(props.row.date)
                        .local()
                        .locale(langSelected.toLowerCase())
                        .calendar()
                    }})
                  </strong>
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
                    v-if="props.row.stadium && props.row.stadium.length > 25"
                    class="has-text-yellow pointer"
                    >{{ props.row.stadium.substring(0, 25) + "..." }}</strong
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
                <p
                  v-if="resultDay && resultDay.length == 0"
                  class="has-text-primary box"
                >
                  Nous ne connaissons pas encore les matchs
                </p>
                <p v-else class="has-text-primary box">...loading</p>
              </div>
            </section>
          </template>
        </b-table>
      </div>
      <div v-else>
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p class="has-text-primary box">...loading</p>
          </div>
        </section>
      </div>
    </div>
    <section v-else class="trendingWrapper">
      <div class="content has-text-grey has-text-centered">
        <p class="has-text-primary box">...loading</p>
      </div>
    </section>
  </section>
</template>

<script>
import moment from "moment";
export default {
  components: {},
  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      total: 0,
      loading: false,
      defaultSortField: "date",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 10,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      resultat: "",
      dayChamp: 0,
    };
  },
  props: {
    resultDay: "",
    isNat: "",
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
    prevDay() {
      if (!this.resultDay[0]) {
        this.$emit("changeDayChamp", "");
      } else {
        if (
          this.resultDay[0].round &&
          this.champSelected != "5" &&
          this.champSelected != "2" &&
          this.champSelected != "1326"
        ) {
          this.$emit("changeDayChamp", Number(this.resultDay[0].matchday) - 1);
        } else {
          this.$emit(
            "changeDayChamp",
            Number(this.resultDay[0].stage.data.id) + 1
          );
        }
      }
    },
    nextDay() {
      if (!this.resultDay[0]) {
        this.$emit("changeDayChamp", "");
      } else {
        if (
          this.resultDay[0].round &&
          this.champSelected != "5" &&
          this.champSelected != "2" &&
          this.champSelected != "1326"
        ) {
          this.$emit("changeDayChamp", Number(this.resultDay[0].matchday) + 1);
        } else {
          this.$emit(
            "changeDayChamp",
            Number(this.resultDay[0].stage.data.id) - 1
          );
        }
      }
    },
    seeLineup(event) {
      this.$emit("seeLineup", event);
    },

    seeStadium(event) {
      this.$emit("seeStadium", event);
    },
    result(resultat) {
      this.resultat = resultat;
      this.$emit("result", this.resultat);
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
  watch: {
    resultDay: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {},
    },
  },
};
</script>


<style scoped>
.dateNav {
  display: flex;
  align-items: center;
  margin: auto;
  font-weight: bold;
  font-size: 1.4rem;
  color: #192b41;
}
.dateStadium {
  width: 20%;
}
.navDay {
  min-width: 10%;
  display: flex;
}
.previousDaywrapper {
  justify-content: flex-start;
}
.nextDaywrapper {
  justify-content: flex-end;
  margin-right: 15px;
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

.dayChampion > strong {
  margin: auto;
  margin-left: 5px;
}
.dayChampion > img {
  margin: 0px;
  align-self: CENTER;
  height: 64px !important;
}
.dayChampion {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
  margin-left: 0;
}
.navbar-item.is-tab.is-active {
  background-color: transparent;
  border-bottom-color: #192b41 !important;
  border-bottom-style: solid !important;
  border-bottom-width: 3px !important;
  color: #192b41 !important;
  padding-bottom: calc(0.5rem - 3px) !important;
  font-size: 1.2rem;
  font-weight: bold;
}
.babMenu {
  font-size: 1.2rem;
  color: grey !important;
}

.tirsAuBut {
  align-self: center;
}
.teamNameLogo {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  width: 100%;
}
.teamNameLogo > img {
  max-height: 64px !important;
  height: 64px !important;
  width: auto;
  margin: auto;
  padding: 1px;
}
.penSeance {
  display: flex;
  justify-content: center;
}
.teamNameStrong {
  align-self: center;
  width: 100%;
}
.logoClub {
  align-self: center;
  width: 30%;
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
h1 {
  padding-top: 1rem;
}
.team {
  min-width: 25%;
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
.b-table {
  margin: 0.5rem !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.matchlist > .b-table {
  border: none !important;
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
h1 {
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
.cardRefer {
  width: auto !important;
}
@media (max-width: 769px) {
  .teamNameStrong {
    width: auto;
  }
  .desktopOnly {
    display: none !important;
  }
  .logoClub {
    width: 25%;
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
  .NextMatchWrapper {
    width: 95% !important;
  }
  .NextMatchWrapper > span {
    width: 100% !important;
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
  }
  .is-greyLit {
    font-size: 1rem !important;
  }

  .vs {
    height: 32px !important;
  }
  .positionClass {
    font-size: 1rem !important;
  }
  .displayFlex {
    display: flex;
    flex-direction: column;
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
    max-height: 45px !important;
    height: 45px !important;
    width: auto;
    margin: auto;
    padding: 1px;
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
