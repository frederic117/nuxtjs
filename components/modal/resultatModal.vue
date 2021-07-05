<template>
  <div class="mediaModalBet">
    <h1 class="modalTitleBet">
      <div>
        <div class="journee">
          <figure
            @click="ligue(resultat.codeCompetitionApi)"
            width="80"
            class="pointer dayChampion"
          >
            <img
              :class="{
                invertOk:
                  Number(resultat.codeCompetitionApi) == 2 ||
                  Number(resultat.codeCompetitionApi) == 5,
              }"
              class="logoligue"
              :src="'/logoLigue/' + resultat.codeCompetitionApi + '.png'"
              alt="logoLigue"
            />
            <client-only>
              <div v-if="resultat.matchday">
                <span
                  v-if="resultat.matchday === '8th Finals'"
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
                  v-else-if="resultat.matchday === '16th Finals'"
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
                  v-else-if="resultat.matchday === '32nd Finals'"
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
                  v-else-if="resultat.matchday === 'Quarter-finals'"
                  class="journéeSpan"
                >
                  <strong>{{
                    langSelected === "EN" ? "Quarter final" : "Quart de finale"
                  }}</strong>
                </span>
                <span
                  v-else-if="resultat.matchday === 'Semi-finals'"
                  class="journéeSpan"
                >
                  <strong>{{
                    langSelected === "EN" ? "Semi final" : "Demi-finale"
                  }}</strong>
                </span>
                <span
                  v-else-if="resultat.matchday === 'bronze'"
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
                  v-else-if="resultat.matchday === 'Final'"
                  class="journéeSpan"
                >
                  <strong>{{
                    langSelected === "EN" ? "Final" : "Finale"
                  }}</strong>
                </span>
                <span
                  v-else-if="resultat.matchday == 'Group Stage'"
                  class="journéeSpan"
                >
                  <strong>{{
                    langSelected === "EN"
                      ? resultat.matchday
                      : "phase de groupe"
                  }}</strong>
                </span>
                <span
                  v-else-if="resultat.matchday.includes('Round')"
                  class="journéeSpan"
                >
                  <strong>{{ resultat.matchday }}</strong>
                </span>
                <span
                  v-else-if="resultat.matchday.includes('Play-offs')"
                  class="journéeSpan"
                >
                  <strong>{{ resultat.matchday }}</strong>
                </span>
                <span v-else-if="langSelected === 'EN'" class="journéeSpan">
                  <strong
                    v-if="
                      resultat.matchday == '1' ||
                      resultat.matchday == '21' ||
                      resultat.matchday == '31'
                    "
                  >
                    {{ resultat.matchday }}
                    <sup>st</sup> day
                  </strong>
                  <strong
                    v-else-if="
                      resultat.matchday == '2' ||
                      resultat.matchday == '22' ||
                      resultat.matchday == '32'
                    "
                  >
                    {{ resultat.matchday }}
                    <sup>nd</sup> day
                  </strong>
                  <strong
                    v-else-if="
                      resultat.matchday == '3' ||
                      resultat.matchday == '23' ||
                      resultat.matchday == '33'
                    "
                  >
                    {{ resultat.matchday }}
                    <sup>rd</sup> day
                  </strong>
                  <strong v-else>
                    {{ resultat.matchday }}
                    <sup>th</sup> day
                  </strong>
                </span>
                <span v-else class="journéeSpan">
                  <strong v-if="resultat.matchday == '1'">
                    {{ resultat.matchday }}
                    <sup>ère</sup> journée
                  </strong>
                  <strong v-else>
                    {{ resultat.matchday }}
                    <sup>ème</sup> journée
                  </strong>
                </span>
              </div>
              <div v-if="resultat.stage && !resultat.matchday">
                <span
                  v-if="resultat.stage === '16th Finals'"
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
                  v-else-if="resultat.stage === '32nd Finals'"
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
                  v-else-if="resultat.stage === '8th Finals'"
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
                  v-else-if="resultat.stage === 'Quarter-finals'"
                  class="journéeSpan"
                >
                  <strong>{{
                    langSelected === "EN" ? "Quarter final" : "Quart de finale"
                  }}</strong>
                </span>
                <span
                  v-else-if="resultat.stage === 'Semi-finals'"
                  class="journéeSpan"
                >
                  <strong>{{
                    langSelected === "EN" ? "Semi final" : "Demi-finale"
                  }}</strong>
                </span>
                <span
                  v-else-if="resultat.stage === 'bronze'"
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
                  v-else-if="resultat.stage === 'Final'"
                  class="journéeSpan"
                >
                  <strong>{{
                    langSelected === "EN" ? "Final" : "Finale"
                  }}</strong>
                </span>
                <span
                  v-else-if="resultat.stage == 'Group Stage'"
                  class="journéeSpan"
                >
                  <strong>{{
                    langSelected === "EN" ? resultat.stage : "phase de groupe"
                  }}</strong>
                </span>
                <span v-else class="journéeSpan pointer">
                  <strong>{{ resultat.stage }}</strong>
                </span>
              </div>
            </client-only>
          </figure>

          <div class="rightSide">
            <div
              v-if="
                resultat.status.toUpperCase() === 'LIVE' &&
                resultat.detail &&
                resultat.elapsed < 46
              "
            >
              <strong v-if="langSelected == 'EN'" class="has-text-grey">
                1
                <sup>st</sup> half :&nbsp
              </strong>
              <strong v-else class="has-text-grey">
                1
                <sup>ère</sup> mi-temps :&nbsp
              </strong>
              <strong class="has-text-green">{{ resultat.elapsed }}"</strong>
            </div>
            <div v-else-if="resultat.status.toUpperCase() === 'HT'">
              <strong class="has-text-grey">
                {{ langSelected === "EN" ? "half-time" : "mi-temps" }}
              </strong>
            </div>
            <div
              v-else-if="
                resultat.status.toUpperCase() === 'LIVE' &&
                resultat.elapsed > 45
              "
            >
              <strong v-if="langSelected == 'EN'" class="has-text-grey">
                2
                <sup>nd</sup> half :&nbsp
              </strong>
              <strong v-else class="has-text-grey">
                 2
                <sup>ème</sup> mi-temps :&nbsp
               
              </strong>
              <strong class="has-text-green">{{ resultat.elapsed }}"</strong>
            </div>
            <div
              v-else-if="
                resultat.status.toUpperCase() === 'BREAK' &&
                90 < resultat.elapsed < 120
              "
            >
              <strong class="has-text-grey"
                >{{
                  langSelected === "EN"
                    ? "waiting for overtime to start"
                    : "en attente du début des prolongations"
                }}
              </strong>
            </div>
            <div
              v-else-if="
                resultat.status.toUpperCase() === 'BREAK' &&
                resultat.elapsed >= 120
              "
            >
              <strong class="has-text-grey">
                {{
                  langSelected === "EN"
                    ? "waiting for penalty shootout"
                    : "en attente du début des tirs au but"
                }}</strong
              >
            </div>
            <div v-else-if="resultat.status.toUpperCase() === 'ET'">
              <strong class="has-text-grey">{{
                langSelected === "EN" ? "overtime:" : "prolongations :"
              }}</strong>
              <strong class="has-text-green">{{ resultat.elapsed }}"</strong>
            </div>
            <div v-else-if="resultat.status.toUpperCase() === 'PEN_LIVE'">
              <strong class="has-text-grey">{{
                langSelected === "EN"
                  ? "penalty shootout"
                  : "séance de penalties"
              }}</strong>
            </div>
            <div v-else-if="resultat.status.toUpperCase() === 'POSTP'">
              <strong class="has-text-grey">{{
                langSelected === "EN" ? "match postponed" : "match reporté"
              }}</strong>
            </div>
            <div v-else-if="resultat.status.toUpperCase() === 'CANCL'">
              <strong class="has-text-grey">
                {{ langSelected === "EN" ? "match cancelled" : "match annulé" }}
              </strong>
            </div>
            <div v-else-if="resultat.status.toUpperCase() === 'DELAYED'">
              <strong class="has-text-grey">{{
                langSelected === "EN"
                  ? "delayed kickoff - Pending"
                  : "coup d'envoi décalé - En attente"
              }}</strong>
            </div>
            <div v-else>
              <strong class="has-text-grey">{{
                moment(resultat.date)
                  .local()
                  .locale(langSelected.toLowerCase())
                  .calendar()
              }}</strong>
            </div>
            <strong class="weatherDiv has-text-yellow">
              {{
                resultat.stadium && resultat.stadium.name
                  ? resultat.stadium.name
                  : ""
              }}
              <img
                v-if="resultat.weather && resultat.weather.icon"
                class="weather"
                :src="resultat.weather.icon"
                alt="weather"
              />
            </strong>
          </div>
        </div>
      </div>
      <div class="menuWrapper">
        <strong
          @click="seeDetail"
          v-if="
            resultat.lineup &&
            resultat.lineup.data &&
            resultat.lineup.data.length > 0
          "
          class="button videoButs pointer is-wc is-italic"
          :class="{ filterActiv: filter == 'resultat' }"
        >
          <img
            loading="lazy"
            class
            src="~assets/images/versus.png"
            alt="video"
          />
          {{ langSelected === "EN" ? "details" : "détails" }}
        </strong>
        <strong
          @click="seeLineup"
          v-if="
            resultat.lineup &&
            resultat.lineup.data &&
            resultat.lineup.data.length > 0
          "
          class="button videoButs pointer is-wc is-italic"
          :class="{ filterActiv: filter == 'lineup' }"
        >
          <img
            loading="lazy"
            class="invertOk"
            src="~assets/images/teams/maillot.png"
            alt="video"
          />
          {{ langSelected === "EN" ? "line-up" : "compos" }}
        </strong>

        <strong
          v-if="goals.length > 0"
          @click="seeGoals"
          class="button videoButs is-wc is-italic"
          :class="{ filterActiv: filter == 'goals' }"
        >
          <img
            loading="lazy"
            class
            src="~assets/images/teams/soccervideo.png"
            alt="video"
          />
          {{ langSelected === "EN" ? "highlights" : "temps forts" }}
        </strong>
      </div>
    </h1>
    <div class="modalBetWrapper">
      <div id="bullsAndBearsModal">
        <nuxt-link
          class="linkClub"
          :to="`/teams/${resultat.homeTeamId.shortName}/resultats`"
        >
          <div class="BBull">
            <img
              class="teamShirtModalResult"
              :src="resultat.homeTeamId.teamImg"
              :alt="resultat.homeTeamName"
              :class="{
                invertOk: resultat.homeTeamName.toUpperCase().includes('JUVE'),
              }"
            />
            <strong class="teamNameGame">
              {{
                langSelected === "EN"
                  ? resultat.homeTeamId
                    ? resultat.homeTeamId.searchName
                    : resultat.homeTeamName
                  : resultat.homeTeamId
                  ? resultat.homeTeamId.name
                  : resultat.homeTeamName
              }}
              <span
                v-if="
                  resultat.standings && resultat.standings.localteam_position
                "
                class="is-wc"
                >({{ resultat.standings.localteam_position }})</span
              >
            </strong>
          </div>
        </nuxt-link>
        <div
          class="displayFlex pronoBlock"
          v-if="
            resultat.status.toUpperCase() === 'NOT STARTED' ||
            resultat.status.toUpperCase() === 'NS' ||
            resultat.status.toUpperCase() === 'TBA' ||
            resultat.status.toUpperCase() === 'POSTP' ||
            resultat.status.toUpperCase() === 'CANCL' ||
            resultat.status.toUpperCase() === 'DELAYED'
          "
        >
          <b-tooltip
            :label="resultat.homeTeamName + ' VS ' + resultat.awayTeamName"
            position="is-top"
            class="bullsAndBearsPicVS"
            type="is-info"
            size="is-large"
          >
            <img
              loading="lazy"
              class="vs"
              src="~assets/images/versus.png"
              alt="versus"
            />
          </b-tooltip>
          <div @click="goToContest" class="bullsAndBearsPicVSTag">
            <b-tooltip
              v-if="resultat.status.toUpperCase() != 'FT'"
              :label="
                langSelected === 'EN'
                  ? 'to win for a victory of ' + resultat.homeTeamId.name
                  : 'à gagner pour une victoire de ' + resultat.homeTeamId.name
              "
              position="is-bottom"
              class="teamNameGame is-info"
              size="is-medium"
            >
              <b-taglist attached>
                <b-tag class="is-tagContestTitle">1</b-tag>
                <b-tag class="is-tagContest"
                  >{{
                    100 - Math.round(resultat.trending.percentage[0])
                  }}
                  pts</b-tag
                >
              </b-taglist>
            </b-tooltip>
            <b-tooltip
              v-if="resultat.status.toUpperCase() != 'FT'"
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
                    100 - Math.round(resultat.trending.percentage[1])
                  }}
                  pts</b-tag
                >
              </b-taglist>
            </b-tooltip>
            <b-tooltip
              v-if="resultat.status.toUpperCase() != 'FT'"
              :label="
                langSelected === 'EN'
                  ? 'to win for a victory of ' + resultat.awayTeamId.name
                  : 'à gagner pour une victoire de ' + resultat.awayTeamId.name
              "
              position="is-left"
              class="teamNameGame is-info"
              size="is-medium"
            >
              <b-taglist attached>
                <b-tag class="is-tagContestTitle">2</b-tag>
                <b-tag class="is-tagContest"
                  >{{
                    100 - Math.round(resultat.trending.percentage[2])
                  }}
                  pts</b-tag
                >
              </b-taglist>
            </b-tooltip>
          </div>
        </div>
        <div class="scoreBlock" v-else>
          <div class="displayFlex">
            <b-tag
              v-if="
                resultat.status.toUpperCase() === 'NOT STARTED' ||
                resultat.status.toUpperCase() === 'NS' ||
                resultat.status.toUpperCase() === 'TBA' ||
                resultat.status.toUpperCase() === 'POSTP' ||
                resultat.status.toUpperCase() === 'CANCL' ||
                resultat.status.toUpperCase() === 'DELAYED'
              "
              class="scoreResultModal is-greyLit"
              >-</b-tag
            >
            <b-tag
              v-else
              class="scoreResultModal"
              :class="{
                'is-green': resultat.goalsHomeTeam > resultat.goalsAwayTeam,
                'is-red': resultat.goalsHomeTeam < resultat.goalsAwayTeam,
                'is-info': resultat.goalsHomeTeam === resultat.goalsAwayTeam,
              }"
              size="is-large"
              >{{ resultat.goalsHomeTeam.toString().replace(" ", "") }}</b-tag
            >

            <strong class="separatorScoreResult">-</strong>
            <b-tag
              v-if="
                resultat.status.toUpperCase() === 'NOT STARTED' ||
                resultat.status.toUpperCase() === 'NS' ||
                resultat.status.toUpperCase() === 'TBA' ||
                resultat.status.toUpperCase() === 'POSTP' ||
                resultat.status.toUpperCase() === 'CANCL' ||
                resultat.status.toUpperCase() === 'DELAYED'
              "
              class="scoreResultModal is-greyLit"
              >-</b-tag
            >
            <b-tag
              v-else
              class="scoreResultModal"
              :class="{
                'is-green': resultat.goalsHomeTeam < resultat.goalsAwayTeam,
                'is-red': resultat.goalsHomeTeam > resultat.goalsAwayTeam,
                'is-info': resultat.goalsHomeTeam === resultat.goalsAwayTeam,
              }"
              size="is-large"
              >{{ resultat.goalsAwayTeam.toString().replace(" ", "") }}</b-tag
            >
          </div>
          <div @click="goToContest" class="bullsAndBearsPicVSTag">
            <b-tooltip
              :label="
                langSelected === 'EN'
                  ? 'to win for a victory of ' + resultat.homeTeamId.name
                  : 'à gagner pour une victoire de ' + resultat.homeTeamId.name
              "
              position="is-bottom"
              class="teamNameGame is-info"
              size="is-medium"
            >
              <b-taglist attached>
                <b-tag class="is-tagContestTitle">1</b-tag>
                <b-tag class="is-tagContest"
                  >{{
                    100 - Math.round(resultat.trending.percentage[0])
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
                    100 - Math.round(resultat.trending.percentage[1])
                  }}
                  pts</b-tag
                >
              </b-taglist>
            </b-tooltip>
            <b-tooltip
              :label="
                langSelected === 'EN'
                  ? 'to win for a victory of ' + resultat.awayTeamId.name
                  : 'à gagner pour une victoire de ' + resultat.awayTeamId.name
              "
              position="is-left"
              class="teamNameGame is-info"
              size="is-medium"
            >
              <b-taglist attached>
                <b-tag class="is-tagContestTitle">2</b-tag>
                <b-tag class="is-tagContest"
                  >{{
                    100 - Math.round(resultat.trending.percentage[2])
                  }}
                  pts</b-tag
                >
              </b-taglist>
            </b-tooltip>
          </div>
        </div>
        <nuxt-link
          class="linkClub"
          :to="`/teams/${resultat.awayTeamId.shortName}/resultats`"
        >
          <div class="BBull">
            <img
              class="teamShirtModalResult"
              :src="resultat.awayTeamId.teamImg"
              :alt="resultat.awayTeamName"
              :class="{
                invertOk: resultat.awayTeamName.toUpperCase().includes('JUVE'),
              }"
            />
            <strong class="teamNameGame">
              {{
                langSelected === "EN"
                  ? resultat.awayTeamId
                    ? resultat.awayTeamId.searchName
                    : resultat.awayTeamName
                  : resultat.awayTeamId
                  ? resultat.awayTeamId.name
                  : resultat.awayTeamName
              }}

              <span
                class="is-wc"
                v-if="
                  resultat.standings && resultat.standings.visitorteam_position
                "
                >({{ resultat.standings.visitorteam_position }})</span
              >
            </strong>
          </div>
        </nuxt-link>
      </div>
      <div
        v-if="
          (resultat.lineup &&
            resultat.lineup.data &&
            resultat.lineup.data.length > 0) ||
          goals.length > 0
        "
        class="swiper-container"
        v-swiper:myDirectiveSwiper="swiperOptions"
        @slide-next-transition-start="slideNextTransitionStart"
        @slide-prev-transition-start="slidePrevTransitionStart"
      >
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div v-if="filter == 'lineup'" class>
              <div class="LineupFormationsWrap">
                <img
                  alt="footfield"
                  class="footfield swiper-lazy swiper-lazy-loaded"
                  src="~/assets/images/lineup.png"
                />
                <div class="LineupFormationsHomename">
                  <img
                    class="LineupFormationsLogo swiper-lazy swiper-lazy-loaded"
                    :src="resultat.homeTeamId.teamImg"
                    :alt="resultat.homeTeamName"
                    :class="{
                      invertOk: resultat.homeTeamName
                        .toUpperCase()
                        .includes('JUVE'),
                    }"
                  />
                  <span class="formationSpan">{{
                    resultat.formations.localteam_formation
                  }}</span>
                </div>
                <div
                  v-if="homeline1.length > 0"
                  class="LineupFormationsTeamhome"
                >
                  <div v-if="homeline1.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexG) in homeline1"
                      :key="'a' + indexG"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>

                  <div v-if="homeline2.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexD) in homeline2"
                      :key="'b' + indexD"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>
                  <div
                    v-if="homeline3.length > 0"
                    class="LineupFormationsRow"
                    :class="{
                      justifyCenter:
                        homeline5.length > 0 && homeline3.length != 1,
                    }"
                  >
                    <nuxt-link
                      v-for="(player, indexM) in homeline3"
                      :key="'c' + indexM"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>

                  <div
                    v-if="homeline4.length > 0"
                    class="LineupFormationsRow"
                    :class="{ justifyBetween: homeline5.length > 0 }"
                  >
                    <nuxt-link
                      v-for="(player, indexA) in homeline4"
                      :key="'d' + indexA"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>
                  <div v-if="homeline5.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexA) in homeline5"
                      :key="'e' + indexA"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>
                  <div v-if="homeline6.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexA) in homeline6"
                      :key="'f' + indexA"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>
                </div>
                <div v-else class="LineupFormationsTeamhome">
                  <div v-if="homeGoal.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexG) in homeGoal"
                      :key="'a' + indexG"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>

                  <div v-if="homeDef.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexD) in homeDef"
                      :key="'b' + indexD"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>
                  <div v-if="homeMil.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexM) in homeMil"
                      :key="'c' + indexM"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>

                  <div v-if="homeAtt.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexA) in homeAtt"
                      :key="'d' + indexA"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>
                </div>

                <div
                  v-if="awayline1.length > 0"
                  class="LineupFormationsTeamaway"
                >
                  <div v-if="awayline1.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexG) in awayline1"
                      :key="'g' + indexG"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>

                  <div v-if="awayline2.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexD) in awayline2"
                      :key="'h' + indexD"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>
                  <div
                    v-if="awayline3.length > 0"
                    class="LineupFormationsRow"
                    :class="{
                      justifyCenter:
                        awayline5.length > 0 && awayline3.length != 1,
                    }"
                  >
                    <nuxt-link
                      v-for="(player, indexM) in awayline3"
                      :key="'i' + indexM"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>

                  <div
                    v-if="awayline4.length > 0"
                    class="LineupFormationsRow"
                    :class="{ justifyBetween: awayline5.length > 0 }"
                  >
                    <nuxt-link
                      v-for="(player, indexA) in awayline4"
                      :key="'j' + indexA"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>
                  <div v-if="awayline5.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexA) in awayline5"
                      :key="'k' + indexA"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>
                  <div v-if="awayline6.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexA) in awayline6"
                      :key="'l' + indexA"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>
                </div>
                <div v-else class="LineupFormationsTeamaway">
                  <div v-if="awayGoal.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexG) in awayGoal"
                      :key="'a' + indexG"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>

                  <div v-if="awayDef.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexD) in awayDef"
                      :key="'b' + indexD"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>
                  <div v-if="awayMil.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexM) in awayMil"
                      :key="'c' + indexM"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>

                  <div v-if="awayAtt.length > 0" class="LineupFormationsRow">
                    <nuxt-link
                      v-for="(player, indexA) in awayAtt"
                      :key="'d' + indexA"
                      :to="
                        '/player/' +
                        player.player_name.toLowerCase() +
                        '/' +
                        player.player_id
                      "
                      class="LineupFormationsPlayerwrapper pointer"
                    >
                      <div class="LineupFormationsPlayerimg">
                        <img
                          :alt="player.player_name"
                          class="swiper-lazy swiper-lazy-loaded"
                          :src="
                            player.picture
                              ? player.picture
                              : player.image_path
                              ? player.image_path
                              : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                          "
                        />
                      </div>
                      <div class="LineupFormationsPlayerText">
                        <span
                          v-if="player.captain"
                          class="has-text-green is-bold"
                          >(c)</span
                        >
                        <span class="is-bold">{{ player.number }}.</span>
                        <span
                          >{{ player.player_name }}
                          <p class="is-wc is-italic" v-if="player.stats">
                            {{ player.stats.rating }}
                          </p></span
                        >
                      </div>
                    </nuxt-link>
                  </div>
                </div>
                <div class="LineupFormationsAwayname">
                  <img
                    class="LineupFormationsLogo swiper-lazy swiper-lazy-loaded"
                    :src="resultat.awayTeamId.teamImg"
                    :alt="resultat.awayTeamName"
                    :class="{
                      invertOk: resultat.awayTeamName
                        .toUpperCase()
                        .includes('JUVE'),
                    }"
                  />
                  <span class="formationSpan">{{
                    resultat.formations.visitorteam_formation
                  }}</span>
                </div>
              </div>
            </div>
            <!--			<div class="displayFlex" v-if="filter=='lineup'">
							<div class="playerList">
								<h2
									class="has-text-centered is-bold has-text-primary is-size-5"
								>{{resultat.formations.localteam_formation}}</h2>
								<div v-for="(player, index) in homeLineup" :key="index">
									<strong class="has-text-primary">
										<nuxt-link
											:to="'/player/'+player.player_name.toLowerCase()+'/'+player.player_id"
											class="pointer"
										>
											<span v-if="player.captain" class="has-text-green is-bold">(c)</span>
											<span class="is-wc">{{player.number}}.</span>
											{{player.player_name}} ({{player.position}})
										</nuxt-link>
									</strong>
								</div>
							</div>
							<div class="playerList">
								<h2
									class="has-text-centered is-bold has-text-primary is-size-5"
								>{{resultat.formations.visitorteam_formation}}</h2>
								<div v-for="(player, index) in visitorLineup" :key="index">
									<strong class="has-text-primary">
										<nuxt-link
											:to="'/player/'+player.player_name.toLowerCase()+'/'+player.player_id"
											class="pointer"
										>
											<span v-if="player.captain" class="has-text-green is-bold">(c)</span>
											<span class="is-wc">{{player.number}}.</span>
											{{player.player_name}} ({{player.position}})
										</nuxt-link>
									</strong>
								</div>
							</div>
						</div>-->
            <div v-if="filter == 'resultat'">
              <div
                v-if="
                  resultat.detail &&
                  resultat.detail.events &&
                  resultat.detail.events.length > 0
                "
              >
                <div class="pronoPlayer">
                  <div
                    class="goals-panel"
                    v-if="
                      resultat.detail &&
                      resultat.detail.events &&
                      resultat.detail.events.length > 0
                    "
                  >
                    <div
                      @click="goPlayer(event)"
                      class="pointer"
                      v-for="(event, index) in sortMatchevent(
                        resultat.detail.events
                      )"
                      :key="index"
                    >
                      <span
                        class="goalshome"
                        v-if="
                          event.type.toUpperCase() === 'GOAL' &&
                          (resultat.homeTeamId.id_sportmonks == event.team_id ||
                            resultat.homeTeamId_sportsmonk == event.team_id)
                        "
                      >
                        ⚽&nbsp
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp
                        <strong>{{ event.player_name }}</strong>
                      </span>
                      <span
                        class="goalshome"
                        v-if="
                          event.type.toUpperCase() === 'OWN-GOAL' &&
                          (resultat.homeTeamId.id_sportmonks == event.team_id ||
                            resultat.homeTeamId_sportsmonk == event.team_id)
                        "
                      >
                        ⚽&nbsp
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp
                        <strong>{{ event.player_name }}</strong>
                        <span>&nbsp(csc)</span>
                      </span>
                      <span
                        class="goalshome"
                        v-if="
                          event.type.toUpperCase() === 'PENALTY' &&
                          (resultat.homeTeamId.id_sportmonks == event.team_id ||
                            resultat.homeTeamId_sportsmonk == event.team_id)
                        "
                      >
                        ⚽&nbsp
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp
                        <strong>{{ event.player_name }}</strong>
                        <span>&nbsp(pen)</span>
                      </span>
                      <span
                        class="goalshome"
                        v-if="
                          event.type.toUpperCase() === 'MISSED_PENALTY' &&
                          (resultat.homeTeamId.id_sportmonks == event.team_id ||
                            resultat.homeTeamId_sportsmonk == event.team_id)
                        "
                      >
                        <img
                          loading="lazy"
                          class="missPen cardRefer"
                          src="~assets/images/pen-shootout-miss.svg"
                          alt="missPen"
                        />
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp
                        <strong>{{ event.player_name }}</strong>
                        <span>&nbsp(pen)</span>
                      </span>
                      <span
                        class="goalshome"
                        v-if="
                          event.type.toUpperCase() === 'YELLOWCARD' &&
                          (resultat.homeTeamId.id_sportmonks == event.team_id ||
                            resultat.homeTeamId_sportsmonk == event.team_id)
                        "
                      >
                        <img
                          loading="lazy"
                          class="cardRefer"
                          src="~assets/images/yellow_card_icon.svg"
                          alt="yellowCard"
                        />
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp {{ event.player_name }}
                      </span>
                      <span
                        class="goalshome"
                        v-if="
                          event.type.toUpperCase() === 'YELLOWRED' &&
                          (resultat.homeTeamId.id_sportmonks == event.team_id ||
                            resultat.homeTeamId_sportsmonk == event.team_id)
                        "
                      >
                        <img
                          loading="lazy"
                          class="cardRefer"
                          src="~assets/images/red_card_icon.svg"
                          alt="redCard"
                        />
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp {{ event.player_name }}
                      </span>
                      <span
                        class="goalshome"
                        v-if="
                          event.type.toUpperCase() === 'REDCARD' &&
                          (resultat.homeTeamId.id_sportmonks == event.team_id ||
                            resultat.homeTeamId_sportsmonk == event.team_id)
                        "
                      >
                        <img
                          loading="lazy"
                          class="cardRefer"
                          src="~assets/images/red_card_icon.svg"
                          alt="redCard"
                        />
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp {{ event.player_name }}
                      </span>
                      <span
                        class="goalshome"
                        v-if="
                          event.type.toUpperCase() === 'SUBSTITUTION' &&
                          (resultat.homeTeamId.id_sportmonks == event.team_id ||
                            resultat.homeTeamId_sportsmonk == event.team_id)
                        "
                      >
                        <img
                          loading="lazy"
                          class="cardRefer"
                          src="~assets/images/substitution_icon.svg"
                          alt="substitute"
                        />
                        &nbsp
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp
                        <span>
                          <p class="has-text-green">{{ event.player_name }}</p>
                          <p class="has-text-red">
                            {{ event.related_player_name }}
                          </p>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div
                    class="goals-panel"
                    v-if="
                      resultat.detail &&
                      resultat.detail.events &&
                      resultat.detail.events.length > 0
                    "
                  >
                    <div
                      @click="goPlayer(event)"
                      class="pointer"
                      v-for="(event, index) in sortMatchevent(
                        resultat.detail.events
                      )"
                      :key="index"
                    >
                      <span
                        class="goalsaway"
                        v-if="
                          event.type.toUpperCase() === 'GOAL' &&
                          (resultat.awayTeamId.id_sportmonks == event.team_id ||
                            resultat.awayTeamId_sportsmonk == event.team_id)
                        "
                      >
                        ⚽&nbsp
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp
                        <strong>{{ event.player_name }}</strong>
                      </span>
                      <span
                        class="goalsaway"
                        v-if="
                          event.type.toUpperCase() === 'OWN-GOAL' &&
                          (resultat.awayTeamId.id_sportmonks == event.team_id ||
                            resultat.awayTeamId_sportsmonk == event.team_id)
                        "
                      >
                        ⚽&nbsp
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp
                        <strong>{{ event.player_name }}</strong>
                        <span>(csc)</span>
                      </span>
                      <span
                        class="goalsaway"
                        v-if="
                          event.type.toUpperCase() === 'PENALTY' &&
                          (resultat.awayTeamId.id_sportmonks == event.team_id ||
                            resultat.awayTeamId_sportsmonk == event.team_id)
                        "
                      >
                        ⚽&nbsp
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp <strong>{{ event.player_name }}</strong
                        >&nbsp
                        <span>(pen)</span>
                      </span>
                      <span
                        class="goalsaway"
                        v-if="
                          event.type.toUpperCase() === 'MISSED_PENALTY' &&
                          (resultat.awayTeamId.id_sportmonks == event.team_id ||
                            resultat.awayTeamId_sportsmonk == event.team_id)
                        "
                      >
                        <img
                          loading="lazy"
                          class="missPen cardRefer"
                          src="~assets/images/pen-shootout-miss.svg"
                          alt="missPen"
                        />
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp <strong>{{ event.player_name }}</strong
                        >&nbsp
                        <span>
                          {{
                            langSelected === "EN"
                              ? "(pen. missed)"
                              : "(pen. manqué)"
                          }}
                        </span>
                      </span>
                      <span
                        class="goalsaway"
                        v-if="
                          event.type.toUpperCase() === 'YELLOWCARD' &&
                          (resultat.awayTeamId.id_sportmonks == event.team_id ||
                            resultat.awayTeamId_sportsmonk == event.team_id)
                        "
                      >
                        <img
                          loading="lazy"
                          class="cardRefer"
                          src="~assets/images/yellow_card_icon.svg"
                          alt="yellowCard"
                        />
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp {{ event.player_name }}
                      </span>
                      <span
                        class="goalsaway"
                        v-if="
                          event.type.toUpperCase() === 'YELLOWRED' &&
                          (resultat.awayTeamId.id_sportmonks == event.team_id ||
                            resultat.awayTeamId_sportsmonk == event.team_id)
                        "
                      >
                        <img
                          loading="lazy"
                          class="cardRefer"
                          src="~assets/images/red_card_icon.svg"
                          alt="redCard"
                        />
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp {{ event.player_name }}
                      </span>
                      <span
                        class="goalsaway"
                        v-if="
                          event.type.toUpperCase() === 'REDCARD' &&
                          (resultat.awayTeamId.id_sportmonks == event.team_id ||
                            resultat.awayTeamId_sportsmonk == event.team_id)
                        "
                      >
                        <img
                          loading="lazy"
                          class="cardRefer"
                          src="~assets/images/red_card_icon.svg"
                          alt="redCard"
                        />
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp {{ event.player_name }}
                      </span>
                      <span
                        class="goalsaway"
                        v-if="
                          event.type.toUpperCase() === 'SUBSTITUTION' &&
                          (resultat.awayTeamId.id_sportmonks == event.team_id ||
                            resultat.awayTeamId_sportsmonk == event.team_id)
                        "
                      >
                        <img
                          loading="lazy"
                          class="cardRefer"
                          src="~assets/images/substitution_icon.svg"
                          alt="substitute"
                        />
                        &nbsp
                        <p class="has-text-yellow">{{ event.minute }}"</p>
                        &nbsp
                        <span>
                          <p class="has-text-green">{{ event.player_name }}</p>
                          <p class="has-text-red">
                            {{ event.related_player_name }}
                          </p>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="resultat.isPenalty">
                  <hr />
                  <strong class="penSeance">
                    {{
                      langSelected === "EN"
                        ? "Penalty shootout"
                        : "Séance de tirs au but"
                    }}
                  </strong>
                  <div class="pronoPlayer">
                    <div
                      class="goals-panel"
                      v-if="
                        resultat.detail &&
                        resultat.detail.events &&
                        resultat.detail.events.length > 0
                      "
                    >
                      <div
                        v-for="(event, index) in sortMatchevent(
                          resultat.detail.events
                        )"
                        :key="index"
                      >
                        <span
                          class="goalshome"
                          v-if="
                            event.type === 'pen_shootout_goal' &&
                            resultat.homeTeamId.id_sportmonks == event.team_id
                          "
                        >
                          ⚽&nbsp &nbsp
                          <strong>{{ event.player_name }}</strong>
                        </span>

                        <span
                          class="goalshome"
                          v-if="
                            event.type === 'pen_shootout_miss' &&
                            (resultat.homeTeamId.id_sportmonks ==
                              event.team_id ||
                              resultat.homeTeamId_sportsmonk == event.team_id)
                          "
                        >
                          <img
                            loading="lazy"
                            class="missPen cardRefer"
                            src="~assets/images/pen-shootout-miss.svg"
                            alt="missPen"
                          />
                          &nbsp
                          <strong>{{ event.player_name }}</strong>
                        </span>
                      </div>
                    </div>
                    <div
                      class="goals-panel"
                      v-if="
                        resultat.detail &&
                        resultat.detail.events &&
                        resultat.detail.events.length > 0
                      "
                    >
                      <div
                        v-for="(event, index) in sortMatchevent(
                          resultat.detail.events
                        )"
                        :key="index"
                      >
                        <span
                          class="goalsaway"
                          v-if="
                            event.type === 'pen_shootout_goal' &&
                            (resultat.awayTeamId.id_sportmonks ==
                              event.team_id ||
                              resultat.awayTeamId_sportsmonk == event.team_id)
                          "
                        >
                          ⚽&nbsp &nbsp
                          <strong>{{ event.player_name }}</strong>
                        </span>

                        <span
                          class="goalsaway"
                          v-if="
                            event.type === 'pen_shootout_miss' &&
                            (resultat.awayTeamId.id_sportmonks ==
                              event.team_id ||
                              resultat.awayTeamId_sportsmonk == event.team_id)
                          "
                        >
                          <img
                            loading="lazy"
                            class="missPen cardRefer"
                            src="~assets/images/pen-shootout-miss.svg"
                            alt="missPen"
                          />
                          &nbsp
                          <strong>{{ event.player_name }}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else-if="
                  resultat.head2head &&
                  resultat.head2head.data &&
                  resultat.head2head.data.length > 0
                "
              >
                <head-tohead
                  @seeDetail="seeHeadtoheaddetail($event)"
                  :matchList="resultat.head2head.data"
                ></head-tohead>
              </div>
            </div>
            <div class="goalWrap boxSuggest box" v-if="filter == 'goals'">
              <div v-if="!mobile">
                <div
                  class="desktopOnly"
                  v-for="(goal, index) in goals"
                  :key="index"
                >
                  <display-goal :goal="goal"></display-goal>
                </div>
              </div>
              <div v-if="mobile">
                <div class="mobileOnly">
                  <b-table
                    class="tableauMatch NextMatchTable videoModalTable"
                    :data="goals"
                    defaultSortDirection="desc"
                  >
                    <template slot-scope="props">
                      <b-table-column
                        class="videoWrapModal"
                        field="id"
                        centered
                        label
                      >
                        <display-goal :goal="props.row"></display-goal>
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
                          <p>...loading</p>
                        </div>
                      </section>
                    </template>
                  </b-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="
          (resultat.status == 'NS' || resultat.status == 'POSTP') &&
          resultat.head2head &&
          resultat.head2head.data &&
          resultat.head2head.data.length > 0
        "
      >
        <head-tohead
          @seeDetail="seeHeadtoheaddetail($event)"
          :matchList="resultat.head2head.data"
        ></head-tohead>
      </div>
    </div>

    <div v-if="detailHead">
      <b-modal :active.sync="detailHeadModal">
        <div class="box">
          <nav class="bandB level media">
            <strong class="is-wc" v-if="detailHead.round">
              {{ langSelected == "EN" ? "day" : "Journée" }}
              {{ detailHead.round.data.name }} -
              {{ detailHead.stage.data.league.data.name }} -
              {{
                moment(detailHead.time.starting_at.date)
                  .local()
                  .locale(langSelected.toLowerCase())
                  .calendar()
              }}
            </strong>
            <strong class="is-wc" v-else
              >{{ detailHead.stage.data.name }} -
              {{ detailHead.stage.data.league.data.name }} -
              {{
                moment(detailHead.time.starting_at.date)
                  .local()
                  .locale(langSelected.toLowerCase())
                  .calendar()
              }}</strong
            >
            <div class="bullsAndBearsEvent">
              <div class="bullsAndBearsPic colDir">
                <img
                  class="teamShirt pointer"
                  :src="detailHead.localTeam.data.logo_path"
                  :alt="detailHead.localTeam.data.name"
                  :class="{
                    invertOk:
                      detailHead.localTeam &&
                      detailHead.localTeam.data &&
                      detailHead.localTeam.data.name
                        ? detailHead.localTeam.data.name
                            .toUpperCase()
                            .includes('JUV')
                        : false,
                  }"
                />
                <span class="is-wc">
                  {{ detailHead.formations.localteam_formation }}
                </span>
              </div>
              <div class="level-item has-text-centered">
                <div class="bet">
                  <!-- <strong class="has-text-blue nameClub">{{detailHead.detailHead.homeTeamName}}</strong> -->
                  <div class="displayFlex">
                    <div class="scoreProno">
                      <b-tag
                        :class="{
                          'is-green':
                            detailHead.scores.localteam_score >
                            detailHead.scores.visitorteam_score,
                          'is-red':
                            detailHead.scores.localteam_score <
                            detailHead.scores.visitorteam_score,
                          'is-blueInfo':
                            detailHead.scores.localteam_score ==
                            detailHead.scores.visitorteam_score,
                        }"
                        size="is-medium"
                        >{{ detailHead.scores.localteam_score }}</b-tag
                      >
                      <strong class="separatorScore">-</strong>
                      <b-tag
                        :class="{
                          'is-green':
                            detailHead.scores.localteam_score <
                            detailHead.scores.visitorteam_score,
                          'is-red':
                            detailHead.scores.localteam_score >
                            detailHead.scores.visitorteam_score,
                          'is-blueInfo':
                            detailHead.scores.localteam_score ==
                            detailHead.scores.visitorteam_score,
                        }"
                        size="is-medium"
                        >{{ detailHead.scores.visitorteam_score }}</b-tag
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="bullsAndBearsPic colDir">
                <img
                  class="teamShirt pointer"
                  :src="detailHead.visitorTeam.data.logo_path"
                  :alt="detailHead.visitorTeam.data.name"
                  :class="{
                    invertOk:
                      detailHead.visitorTeam &&
                      detailHead.visitorTeam.data &&
                      detailHead.visitorTeam.data.name
                        ? detailHead.visitorTeam.data.name
                            .toUpperCase()
                            .includes('JUV')
                        : false,
                  }"
                />
                <span class="is-wc">
                  {{ detailHead.formations.visitorteam_formation }}
                </span>
              </div>
            </div>
          </nav>
          <div>
            <div class="pronoPlayer2">
              <div
                class="goals-panel"
                v-if="
                  detailHead &&
                  detailHead.events.data &&
                  detailHead.events.data.length > 0
                "
              >
                <div
                  @click="goPlayer(event)"
                  class="pointer"
                  v-for="(event, index) in detailHead.events.data"
                  :key="index"
                >
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'GOAL' &&
                      (detailHead.localteam_id == event.team_id ||
                        detailHead.homeTeamId_sportsmonk == event.team_id)
                    "
                  >
                    ⚽&nbsp
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp
                    <strong>{{ event.player_name }}</strong>
                  </span>
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'OWN-GOAL' &&
                      (detailHead.localteam_id == event.team_id ||
                        detailHead.homeTeamId_sportsmonk == event.team_id)
                    "
                  >
                    ⚽&nbsp
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp
                    <strong>{{ event.player_name }}</strong>
                    <span>&nbsp(csc)</span>
                  </span>
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'PENALTY' &&
                      (detailHead.localteam_id == event.team_id ||
                        detailHead.homeTeamId_sportsmonk == event.team_id)
                    "
                  >
                    ⚽&nbsp
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp
                    <strong>{{ event.player_name }}</strong>
                    <span>&nbsp(pen)</span>
                  </span>
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'MISSED_PENALTY' &&
                      (detailHead.localteam_id == event.team_id ||
                        detailHead.homeTeamId_sportsmonk == event.team_id)
                    "
                  >
                    <img
                      loading="lazy"
                      class="missPen cardRefer"
                      src="~assets/images/pen-shootout-miss.svg"
                      alt="missPen"
                    />
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp
                    <strong>{{ event.player_name }}</strong>
                    <span>&nbsp(pen)</span>
                  </span>
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'YELLOWCARD' &&
                      (detailHead.localteam_id == event.team_id ||
                        detailHead.homeTeamId_sportsmonk == event.team_id)
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/yellow_card_icon.svg"
                      alt="yellowCard"
                    />
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp {{ event.player_name }}
                  </span>
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'YELLOWRED' &&
                      (detailHead.localteam_id == event.team_id ||
                        detailHead.homeTeamId_sportsmonk == event.team_id)
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/red_card_icon.svg"
                      alt="redCard"
                    />
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp {{ event.player_name }}
                  </span>
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'REDCARD' &&
                      (detailHead.localteam_id == event.team_id ||
                        detailHead.homeTeamId_sportsmonk == event.team_id)
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/red_card_icon.svg"
                      alt="redCard"
                    />
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp {{ event.player_name }}
                  </span>
                  <span
                    class="goalshome"
                    v-if="
                      event.type.toUpperCase() === 'SUBSTITUTION' &&
                      (detailHead.localteam_id == event.team_id ||
                        detailHead.homeTeamId_sportsmonk == event.team_id)
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/substitution_icon.svg"
                      alt="substitute"
                    />
                    &nbsp
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp
                    <span>
                      <p class="has-text-green">{{ event.player_name }}</p>
                      <p class="has-text-red">
                        {{ event.related_player_name }}
                      </p>
                    </span>
                  </span>
                </div>
              </div>
              <div
                class="goals-panel"
                v-if="
                  detailHead &&
                  detailHead.events.data &&
                  detailHead.events.data.length > 0
                "
              >
                <div
                  @click="goPlayer(event)"
                  class="pointer"
                  v-for="(event, index) in detailHead.events.data"
                  :key="index"
                >
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'GOAL' &&
                      (detailHead.visitorteam_id == event.team_id ||
                        detailHead.awayTeamId_sportsmonk == event.team_id)
                    "
                  >
                    ⚽&nbsp
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp
                    <strong>{{ event.player_name }}</strong>
                  </span>
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'OWN-GOAL' &&
                      (detailHead.visitorteam_id == event.team_id ||
                        detailHead.awayTeamId_sportsmonk == event.team_id)
                    "
                  >
                    ⚽&nbsp
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp
                    <strong>{{ event.player_name }}</strong>
                    <span>(csc)</span>
                  </span>
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'PENALTY' &&
                      (detailHead.visitorteam_id == event.team_id ||
                        detailHead.awayTeamId_sportsmonk == event.team_id)
                    "
                  >
                    ⚽&nbsp
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp <strong>{{ event.player_name }}</strong
                    >&nbsp
                    <span>(pen)</span>
                  </span>
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'MISSED_PENALTY' &&
                      (detailHead.visitorteam_id == event.team_id ||
                        detailHead.awayTeamId_sportsmonk == event.team_id)
                    "
                  >
                    <img
                      loading="lazy"
                      class="missPen cardRefer"
                      src="~assets/images/pen-shootout-miss.svg"
                      alt="missPen"
                    />
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp <strong>{{ event.player_name }}</strong
                    >&nbsp
                    <span>
                      {{
                        langSelected === "EN"
                          ? "(pen. missed)"
                          : "(pen. manqué)"
                      }}</span
                    >
                  </span>
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'YELLOWCARD' &&
                      (detailHead.visitorteam_id == event.team_id ||
                        detailHead.awayTeamId_sportsmonk == event.team_id)
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/yellow_card_icon.svg"
                      alt="yellowCard"
                    />
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp {{ event.player_name }}
                  </span>
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'YELLOWRED' &&
                      (detailHead.visitorteam_id == event.team_id ||
                        detailHead.awayTeamId_sportsmonk == event.team_id)
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/red_card_icon.svg"
                      alt="redCard"
                    />
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp {{ event.player_name }}
                  </span>
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'REDCARD' &&
                      (detailHead.visitorteam_id == event.team_id ||
                        detailHead.awayTeamId_sportsmonk == event.team_id)
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/red_card_icon.svg"
                      alt="redCard"
                    />
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp {{ event.player_name }}
                  </span>
                  <span
                    class="goalsaway"
                    v-if="
                      event.type.toUpperCase() === 'SUBSTITUTION' &&
                      (detailHead.visitorteam_id == event.team_id ||
                        detailHead.awayTeamId_sportsmonk == event.team_id)
                    "
                  >
                    <img
                      loading="lazy"
                      class="cardRefer"
                      src="~assets/images/substitution_icon.svg"
                      alt="substitute"
                    />
                    &nbsp
                    <p class="has-text-yellow">{{ event.minute }}"</p>
                    &nbsp
                    <span>
                      <p class="has-text-green">{{ event.player_name }}</p>
                      <p class="has-text-red">
                        {{ event.related_player_name }}
                      </p>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div v-if="detailHead.isPenalty">
              <hr />
              <strong class="penSeance">
                {{
                  langSelected === "EN"
                    ? "Penalty shootout"
                    : "Séance de tirs au but"
                }}</strong
              >
              <div class="pronoPlayer2">
                <div
                  class="goals-panel"
                  v-if="
                    detailHead &&
                    detailHead.events.data &&
                    detailHead.events.data.length > 0
                  "
                >
                  <div
                    v-for="(event, index) in detailHead.events.data"
                    :key="index"
                  >
                    <span
                      class="goalshome"
                      v-if="
                        event.type === 'pen_shootout_goal' &&
                        detailHead.localteam_id == event.team_id
                      "
                    >
                      ⚽&nbsp &nbsp
                      <strong>{{ event.player_name }}</strong>
                    </span>

                    <span
                      class="goalshome"
                      v-if="
                        event.type === 'pen_shootout_miss' &&
                        (detailHead.localteam_id == event.team_id ||
                          detailHead.homeTeamId_sportsmonk == event.team_id)
                      "
                    >
                      <img
                        loading="lazy"
                        class="missPen cardRefer"
                        src="~assets/images/pen-shootout-miss.svg"
                        alt="missPen"
                      />
                      &nbsp
                      <strong>{{ event.player_name }}</strong>
                    </span>
                  </div>
                </div>
                <div
                  class="goals-panel"
                  v-if="
                    detailHead &&
                    detailHead.events.data &&
                    detailHead.events.data.length > 0
                  "
                >
                  <div
                    v-for="(event, index) in detailHead.events.data"
                    :key="index"
                  >
                    <span
                      class="goalsaway"
                      v-if="
                        event.type === 'pen_shootout_goal' &&
                        (detailHead.visitorteam_id == event.team_id ||
                          detailHead.awayTeamId_sportsmonk == event.team_id)
                      "
                    >
                      ⚽&nbsp &nbsp
                      <strong>{{ event.player_name }}</strong>
                    </span>

                    <span
                      class="goalsaway"
                      v-if="
                        event.type === 'pen_shootout_miss' &&
                        (detailHead.visitorteam_id == event.team_id ||
                          detailHead.awayTeamId_sportsmonk == event.team_id)
                      "
                    >
                      <img
                        loading="lazy"
                        class="missPen cardRefer"
                        src="~assets/images/pen-shootout-miss.svg"
                        alt="missPen"
                      />
                      &nbsp
                      <strong>{{ event.player_name }}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      detailHead: "",
      detailHeadModal: false,
      loading: false,
      total: 0,
      perPage: 5,
      isPaginated: true,
      isPaginationSimple: false,
      goals: [],
      page: 1,
      filter: "resultat",
      homeLineup: [],
      visitorLineup: [],
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
      homeFormation: "",
      awayFormation: "",
      homeGoal: "",
      homeDef: "",
      homeMil: "",
      homeAtt: "",
      awayGoal: "",
      awayDef: "",
      awayMil: "",
      awayAtt: "",
      NumberHomerow: "",
      homeline1: "",
      homeline2: "",
      homeline3: "",
      homeline4: "",
      homeline5: "",
      homeline6: "",
      NumberAwayrow: "",
      awayline1: "",
      awayline2: "",
      awayline3: "",
      awayline4: "",
      awayline5: "",
      awayline6: "",
    };
  },
  props: {
    resultat: "",
    lineUp: "",
  },
  components: {
    displayGoal: () => import("@/components/modal/displayGoal"),
    headTohead: () => import("@/components/side-component/headTohead"),
  },
  methods: {
    sortMatchevent(events) {
      if (events && events.length > 0) {
        let sortEventAsc = function (a, b) {
          if (a.minute < b.minute) return -1;
          if (a.minute > b.minute) return 1;
          if (a.minute == b.minute && a.extra_minute > b.extra_minute) return 1;
          if (a.minute == b.minute && a.extra_minute < b.extra_minute)
            return -1;
          return 0;
        };
        let eventSorted = [...events].sort(sortEventAsc);
        if (eventSorted) {
          return eventSorted;
        }
      }
    },

    seeHeadtoheaddetail(event) {
      this.detailHead = event;
      this.detailHeadModal = true;
    },
    moment: function (time) {
      return moment(time);
    },
    slideNextTransitionStart() {
      if (this.filter == "lineup") {
        if (this.goals && this.goals.length > 0) {
          this.filter = "goals";
        } else {
          this.filter = "resultat";
        }
      } else if (this.filter == "goals") {
        this.filter = "resultat";
      } else {
        if (
          this.resultat.lineup &&
          this.resultat.lineup.data &&
          this.resultat.lineup.data.length > 0
        ) {
          this.filter = "lineup";
        }
      }
    },

    slidePrevTransitionStart() {
      if (this.filter == "lineup") {
        this.filter = "resultat";
      } else if (this.filter == "resultat") {
        if (this.goals && this.goals.length > 0) {
          this.filter = "goals";
        } else if (
          this.resultat.lineup &&
          this.resultat.lineup.data &&
          this.resultat.lineup.data.length > 0
        ) {
          this.filter = "lineup";
        }
      } else {
        this.filter = "lineup";
      }
    },
    seeLineup() {
      this.filter = "lineup";
    },
    seeDetail() {
      this.filter = "resultat";
    },
    seeGoals() {
      this.filter = "goals";
    },
    goPlayer(event) {
      this.$router.push(
        `/player/${event.player_name.toLowerCase()}/${event.player_id}`
      );
    },
    goToContest() {
      this.$router.push("/contest");
    },
    ligue(event) {
      this.$store.commit("var/setNewValue", event);
      setTimeout(() => {
        this.$router.push("/leagues");
      }, 10);
    },
    compareHome(a, b) {
      ////Use toUpperCase() to ignore character casing
      let aposy = a.posy ? Number(a.posy) : Number(a.formation_position);
      let bposy = b.posy ? Number(b.posy) : Number(b.formation_position);

      let comparison = 0;
      if (aposy > bposy) {
        comparison = 1;
      } else if (aposy < bposy) {
        comparison = -1;
      }
      return comparison;
    },
    compareAway(a, b) {
      ////Use toUpperCase() to ignore character casing
      let aposy = a.posy ? Number(a.posy) : Number(a.formation_position);
      let bposy = b.posy ? Number(b.posy) : Number(b.formation_position);

      let comparison = 0;
      if (aposy < bposy) {
        comparison = 1;
      } else if (aposy > bposy) {
        comparison = -1;
      }
      return comparison;
    },
  },
  watch: {
    resultat: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.resultat.videoGoals) {
          this.goals = this.resultat.videoGoals
            .map((str, index) => ({
              url: str,
              id: index + 1,
            }))
            .reverse();
          this.total = this.resultat.videoGoals.length;
        }
      },
    },

    lineUp: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.resultat.lineup) {
          this.homeLineup = this.resultat.lineup.data.filter(
            (l) =>
              Number(l.team_id) ==
              Number(this.resultat.homeTeamId.id_sportmonks)
          );
          this.visitorLineup = this.resultat.lineup.data.filter(
            (l) =>
              Number(l.team_id) ==
              Number(this.resultat.awayTeamId.id_sportmonks)
          );

          this.homeline1 = this.homeLineup
            .filter((p) => p.posx == 1)
            .sort(this.compareAway);
          this.homeline2 = this.homeLineup
            .filter((p) => p.posx == 2)
            .sort(this.compareAway);
          this.homeline3 = this.homeLineup
            .filter((p) => p.posx == 3)
            .sort(this.compareAway);
          this.homeline4 = this.homeLineup
            .filter((p) => p.posx == 4)
            .sort(this.compareAway);
          this.homeline5 = this.homeLineup
            .filter((p) => p.posx == 5)
            .sort(this.compareAway);
          this.homeline6 = this.homeLineup
            .filter((p) => p.posx == 6)
            .sort(this.compareAway);

          this.awayline1 = this.visitorLineup
            .filter((p) => p.posx == 1)
            .sort(this.compareHome);
          this.awayline2 = this.visitorLineup
            .filter((p) => p.posx == 2)
            .sort(this.compareHome);
          this.awayline3 = this.visitorLineup
            .filter((p) => p.posx == 3)
            .sort(this.compareHome);
          this.awayline4 = this.visitorLineup
            .filter((p) => p.posx == 4)
            .sort(this.compareHome);
          this.awayline5 = this.visitorLineup
            .filter((p) => p.posx == 5)
            .sort(this.compareHome);
          this.awayline6 = this.visitorLineup
            .filter((p) => p.posx == 6)
            .sort(this.compareHome);

          this.homeGoal = this.homeLineup
            .filter((p) => p.position == "G")
            .sort(this.compareHome);
          this.homeDef = this.homeLineup
            .filter((p) => p.position == "D")
            .sort(this.compareHome);
          this.homeMil = this.homeLineup
            .filter((p) => p.position == "M")
            .sort(this.compareHome);
          this.homeAtt = this.homeLineup
            .filter((p) => p.position == "A")
            .sort(this.compareHome);
          if (
            this.resultat.formations &&
            this.resultat.formations.localteam_formation
          ) {
            this.homeFormation =
              this.resultat.formations.localteam_formation.split("-");
          }
          this.awayGoal = this.visitorLineup
            .filter((p) => p.position == "G")
            .sort(this.compareAway);
          this.awayDef = this.visitorLineup
            .filter((p) => p.position == "D")
            .sort(this.compareAway);
          this.awayMil = this.visitorLineup
            .filter((p) => p.position == "M")
            .sort(this.compareAway);
          this.awayAtt = this.visitorLineup
            .filter((p) => p.position == "A")
            .sort(this.compareAway);
          if (
            this.resultat.formations &&
            this.resultat.formations.visitorteam_formation
          ) {
            this.awayFormation =
              this.resultat.formations.visitorteam_formation.split("-");
          }
          this.NumberAwayrow = this.awayFormation.length + 1;
          this.NumberHomerow = this.homeFormation.length + 1;
        }
        if (this.lineUp == true) {
          this.filter = "lineup";
        }
      },
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
.pronoPlayer2 {
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
}
.is-blueInfo {
  background-color: #3273dc;
  color: #eef1f7;
  border-radius: 4px;
  margin: 2px;
}
.bandB {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem !important;
}
.colDir {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bullsAndBearsEvent {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 0.5rem;
  width: 100% !important;
}
.rightSide > div {
  align-items: center;
  display: flex;
  justify-content: flex-end;
}
.swiper-container {
  width: 100%;
}
.weatherDiv {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.journee {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.justifyBetween {
  justify-content: space-between !important;
}
.justifyCenter {
  justify-content: center !important;
}
.justifyCenter > .LineupFormationsPlayerwrapper {
  margin-left: 2.5px;
  margin-right: 2.5px;
  width: 30%;
}
.LineupFormationsWrap {
  border-radius: 6px;
  margin-top: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  max-height: 85vh;
}
.footfield {
  width: 100%;
  height: auto;
  max-height: 85vh !important;
}
.LineupFormationsHomename {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  background: #eef1f7;
  color: #0084a4;
  font-weight: bold;
  opacity: 0.999;
  align-items: center;
}
.LineupFormationsLogo {
  height: 50px;
  width: auto;
}
.LineupFormationsTeamhome {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.LineupFormationsTeamaway {
  height: 50%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-evenly;
}
.LineupFormationsAwayname {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  background: #eef1f7;
  color: #0084a4;
  font-weight: bold;
  opacity: 0.999;
  align-items: center;
}
.formationSpan {
  padding: 10px;
}
.LineupFormationsRow {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.LineupFormationsPlayerwrapper {
  margin-left: 2.5px;
  margin-right: 2.5px;
  max-width: 50%;
  font-size: 11px;
  text-align: center;
}
.LineupFormationsPlayerimg {
  display: flex;
  justify-content: center;
}
.LineupFormationsPlayerimg img {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  box-shadow: 0 0 0 1px #fff;
}
.LineupFormationsPlayerText {
  padding-top: 4px;
  text-align: center;
}
.LineupFormationsPlayerText > span > p {
  font-size: 1.15rem !important;
  margin-bottom: 3px;
}
.swiper {
  width: 100% !important;
  min-height: 20vh !important;
  height: auto;
}
.swiper-slide {
  height: auto;
}
.swiper-wrapper {
  min-height: 30vh;
  width: 100%;
}

.filterActiv {
  border: 2px solid;
  border-color: #ff7d00 !important;
}
.boxSuggest > div {
  margin-top: 10px;
  margin-bottom: 0px;
  padding: 0.25rem;
  background-color: #eef1f7;
  display: flex;
  flex-wrap: wrap;
}
.boxSuggest > div > div {
  width: 49%;
  padding: 2.5px;
}

.videoButs {
  margin-right: 10px;
  margin-left: 10px;
  padding: 20px;
}
.menuWrapper {
  margin: 10px;
}
.playerList {
  min-width: 35%;
  max-width: 50%;
}
.mediaModalBet {
  min-height: 240px;
  min-width: 600px;
  max-width: 700px;
  width: auto !important;
  padding: 10px 5px !important;
}
.is-tagContest {
  background-color: #ff7d00;
  color: #eef1f7;
  border-radius: 0px !important;
}

.is-tagContestTitle {
  background-color: #eef1f7;
  color: #ff7d00;
  border-radius: 0px !important;
}
.is-green {
  background-color: #2da94f;
  color: white;
  border-radius: 4px;
}
.modalTitleBet > div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.is-red {
  background-color: #eb412d;
  color: white;
  border-radius: 4px;
}
.displayFlex {
  align-items: center;
  justify-content: space-between;
}
.journéeSpan {
  font-size: 1.2rem;
  margin-left: 7px;
}
.image {
  width: auto !important;
  height: 45px;
}
.logoligue {
  width: auto !important;
  height: 60px !important;
}
.penSeance {
  display: flex;
  justify-content: center;
}

.teamShirtModalResult {
  height: 6rem !important;
  max-height: 6rem !important;
  width: auto !important;
  align-self: center;
  padding: 0.5rem;
}

.pronoPlayer {
  display: flex;
  margin-top: 0px;
  justify-content: space-between;
}

.scoreResultModal {
  font-size: 1.25rem !important;
  font-weight: bold;
}

.modalBetWrapper {
  display: flex;
  flex-direction: column;
}

.modalTitleBet {
  text-align: center;
  margin-bottom: 0.5rem;
}

.modalTitleBetH1 {
  font-size: 2rem;
}

.BBull {
  display: flex;
  flex-direction: column;
}

.teamNameGame {
  font-size: 1.25rem !important;
  color: #192b41;
  text-align: center;
  align-self: center;
}
.is-wc {
  color: #0084a4 !important;
  font-size: 1.2rem !important;
  text-align: center !important;
}
.teamNameGame > .is-wc {
  font-size: 1.25rem !important;
}
.is-size-5 {
  color: #0084a4 !important;
  font-size: 1.3rem !important;
}
.has-text-green {
  font-weight: bold;
}

.has-text-red {
  font-weight: bold;
}

h1 {
  padding-top: 1rem;
}

.has-text-yellow {
  color: #ffcf00 !important;
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

.separatorScoreResult {
  margin: 0px 3px;
  font-size: 2.25rem;
  font-weight: bold;
}

.BBull {
  display: flex;
  flex-direction: column;
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

hr {
  background-color: #dbdbdb;
  border: none;
  display: block;
  height: 1px;
  margin: 1rem 0;
}

.penSeance {
  display: flex;
  justify-content: center;
}

.has-text-contest {
  font-weight: bold;
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
  font-size: 0.8rem !important;
  margin: 5px;
  min-width: 35%;
}

.goalshome {
  display: flex !important;
  text-align: left;
  padding-right: 5px;
  align-items: center;
}

.goalsaway {
  display: flex !important;
  text-align: left;
  padding-left: 5px;
  align-items: center;
}
.scoreBlock {
  width: 40%;
  display: FLEX;
  flex-direction: COLUMN;
  align-items: CENTER;
}
.pronoBlock {
  display: flex;
  flex-direction: column;
  width: 35%;
  margin: 5px;
}
h1 {
  padding-top: 1rem;
}

.has-text-yellow {
  color: #ffcf00 !important;
}

div {
  font-size: 1.2rem !important;
}

h1 {
  font-size: 1.2rem !important;
}
.linkClub {
  width: 35%;
}
.is-greyLit {
  background-color: #778899;
  color: #eef1f7;
  border-radius: 4px;
  margin: 2px;
  font-size: 1.25rem;
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
}
@media (max-width: 1047px) {
  .LineupFormationsPlayerText > span > p {
    font-size: 0.8rem !important;
    margin-bottom: 1px;
  }
  .scoreResultModal {
    font-size: 1.15rem !important;
    min-width: 35px;
  }
  .footfield {
    height: 85vh !important;
  }
  .boxSuggest > {
    margin-top: 10px;
    margin-bottom: 0px;
    padding: 0.25rem;
    background-color: #eef1f7;
    display: flex;
    flex-wrap: wrap;
  }
  .boxSuggest > div > div {
    width: 100%;
    padding: 0px;
  }
  .boxSuggest > div {
    width: 100%;
    padding: 0;
    padding-bottom: 5px;
  }
  .pronoBlock {
    width: 30%;
  }
  .mediaModalBet {
    min-height: 210px;
    width: 100% !important;
    min-width: 100% !important;
  }
  .journéeSpan {
    font-size: 1rem;
    margin-left: 7px;
  }
  .is-greyLit {
    font-size: 0.8rem !important;
  }
  .teamNameGame {
    font-size: 0.9rem !important;
    color: #192b41;
    text-align: center;
    align-self: center;
  }
  .is-wc {
    color: #0084a4 !important;
    font-size: 0.9rem !important;
    text-align: center !important;
  }
  .teamNameGame > .is-wc {
    font-size: 0.9rem !important;
  }
  .logoligue {
    width: auto !important;
    height: 45px !important;
  }
  .teamShirtModalResult {
    height: 3.5rem !important;
    width: auto !important;
    padding: 0rem !important;
  }
  .linkClub {
    width: 29%;
  }
  .image img {
    width: auto;
  }
  .modalTitleBetH1 {
    font-size: 1.5rem;
  }

  .modalTitleBet {
    margin-bottom: 0rem;
  }

  .separatorScoreResult {
    margin: 0px 3px;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .has-text-green {
    font-weight: bold;
    font-size: 0.8rem !important;
  }

  .has-text-red {
    font-weight: bold;
    font-size: 0.8rem !important;
  }

  img {
    max-height: 42px !important;
  }

  .goalsaway > img {
    max-height: 16px !important;
  }

  .goalshome > img {
    max-height: 16px !important;
  }
  .goalsaway > p {
    font-size: 0.9rem !important;
  }

  .goalshome > p {
    font-size: 0.9rem !important;
  }

  div {
    font-size: 0.8rem !important;
  }

  .BBull {
    width: 100%;
  }
  .bullsAndBearsPicVSTag {
    display: flex;
    justify-content: space-around;
    font-weight: bold;
    margin-top: 0rem;
    width: 95%;
    padding: 0 10px !important;
  }

  .is-tagContest {
    background-color: #ff7d00;
    color: #eef1f7;
    border-radius: 4px !important;
    font-size: 0.7rem !important;
    width: 100%;
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
}
</style>
