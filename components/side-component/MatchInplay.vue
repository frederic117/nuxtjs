<template>
  <div
    v-if="
      matches &&
      matches.length > 0 &&
      matches.filter(
        (m) => m.status != 'FT' && m.status != 'AET' && m.status != 'FT_PEN'
      ).length > 0
    "
  >
    <nuxt-link v-if="mobile" class="mobileOnly" to="/en-direct">
      <button
        v-if="detailActivate == false"
        class="mobileOnly button is-contest is-fullwidth"
      >
        <strong class="has-text-wc">
          {{ langSelected === "EN" ? "Live:" : "en direct :" }}

          {{
            matches.filter(
              (m) =>
                m.status != "FT" && m.status != "AET" && m.status != "FT_PEN"
            ).length
          }}
          {{
            matches.filter(
              (m) =>
                m.status != "FT" && m.status != "AET" && m.status != "FT_PEN"
            ).length > 1
              ? "matchs"
              : "match"
          }}
        </strong>
      </button>
    </nuxt-link>
    <div v-if="mobile && detailActivate == true" class="box mobileOnly">
      <p>
        <span class="title is-5">
          {{ langSelected === "EN" ? "Live:" : "en direct :" }}
          {{
            matches.filter(
              (m) =>
                m.status != "FT" && m.status != "AET" && m.status != "FT_PEN"
            ).length
          }}
          {{
            matches.filter(
              (m) =>
                m.status != "FT" && m.status != "AET" && m.status != "FT_PEN"
            ).length > 1
              ? "matchs"
              : "match"
          }}
        </span>
      </p>
      <hr />
      <div class="mobileOnly">
        <b-table
          class="matchInPlayTab"
          :data="
            matches
              .filter(
                (m) =>
                  m.status != 'FT' && m.status != 'AET' && m.status != 'FT_PEN'
              )
              .sort((a, b) => b.elapsed - a.elapsed)
          "
          :loading="loading"
          :paginated="isPaginated"
          :per-page="perPage"
          :pagination-simple="isPaginationSimple"
          :total="total"
          :mobile-cards="true"
          :striped="true"
        >
          <template slot-scope="props">
            <b-table-column class="NextMatchWrapper" centered>
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
                  />
                  <client-only>
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
                          langSelected === "EN" ? "Semi final" : "Demi-finale"
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
                      <span v-else class="journéeSpan pointer">
                        <strong>{{ props.row.stage }}</strong>
                      </span>
                    </div>
                  </client-only>
                </figure>

                <div class="mobileOnly">
                  <div
                    v-if="
                      props.row.status.toUpperCase() === 'LIVE' &&
                      props.row.detail &&
                      (!props.row.elapsed || props.row.elapsed == '')
                    "
                  >
                    <strong class="has-text-grey">
                      {{
                        langSelected === "EN"
                          ? "Waiting for the kick-off"
                          : "En attente du coup d'envoi"
                      }}
                    </strong>
                  </div>
                  <div
                    v-else-if="
                      props.row.status.toUpperCase() === 'LIVE' &&
                      props.row.detail &&
                      props.row.elapsed < 46
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
                    <strong class="has-text-green"
                      >{{ props.row.elapsed }}"</strong
                    >
                  </div>
                  <div v-else-if="props.row.status.toUpperCase() === 'HT'">
                    <strong class="has-text-grey">{{
                      langSelected === "EN" ? "half-time" : "mi-temps"
                    }}</strong>
                  </div>
                  <div
                    v-if="
                      props.row.status.toUpperCase() === 'LIVE' &&
                      props.row.elapsed > 45
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
                    <strong class="has-text-green"
                      >{{ props.row.elapsed }}"</strong
                    >
                  </div>
                  <div
                    v-else-if="
                      props.row.status.toUpperCase() === 'BREAK' &&
                      90 < props.row.elapsed < 120
                    "
                  >
                    <strong class="has-text-grey">{{
                      langSelected === "EN"
                        ? "waiting for overtime to start"
                        : "en attente du début des prolongations"
                    }}</strong>
                  </div>
                  <div
                    v-else-if="
                      props.row.status.toUpperCase() === 'BREAK' &&
                      props.row.elapsed >= 120
                    "
                  >
                    <strong class="has-text-grey">{{
                      langSelected === "EN"
                        ? "waiting for penalty shootout"
                        : "en attente du début des tirs au but"
                    }}</strong>
                  </div>
                  <div v-else-if="props.row.status.toUpperCase() === 'ET'">
                    <strong class="has-text-grey">{{
                      langSelected === "EN" ? "overtime:" : "prolongations :"
                    }}</strong>
                    <strong class="has-text-green"
                      >{{ props.row.elapsed }}"</strong
                    >
                  </div>
                  <div
                    v-else-if="props.row.status.toUpperCase() === 'PEN_LIVE'"
                  >
                    <strong class="has-text-grey">{{
                      langSelected === "EN"
                        ? "penalty shootout"
                        : "séance de penalties"
                    }}</strong>
                  </div>
                  <strong
                    @click="seeStadium(props.row.stadium)"
                    class="weatherDiv has-text-yellow pointer"
                  >
                    {{
                      props.row.stadium && props.row.stadium.name
                        ? props.row.stadium.name
                        : ""
                    }}
                    <img
                      v-if="props.row.weather && props.row.weather.icon"
                      class="weather"
                      :src="props.row.weather.icon"
                      alt="weather"
                    />
                  </strong>
                </div>
              </div>
            </b-table-column>
            <b-table-column class="NextMatchWrapper" centered>
              <div class="matchProno">
                <nuxt-link
                  v-if="props.row.homeTeamId && props.row.homeTeamId.shortName"
                  :to="'/teams/' + props.row.homeTeamId.shortName.toLowerCase()"
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
                    <strong
                      class="teamNameStrong pointer"
                      @click="
                        accessTeam(props.row.homeTeamId.shortName.toLowerCase())
                      "
                      >{{
                        props.row.homeTeamId.name
                          ? props.row.homeTeamId.name
                          : props.row.homeTeamName
                      }}</strong
                    >
                  </div>
                </nuxt-link>
                <div v-else class="teamNameLogo">
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
                  <strong class="teamNameStrong pointer">{{
                    props.row.homeTeamId.name
                      ? props.row.homeTeamId.name
                      : props.row.homeTeamName
                  }}</strong>
                </div>
                <span class="bullsAndBearsPicVs">
                  <b-tag
                    v-if="
                      props.row.status.toUpperCase() === 'NOT STARTED' ||
                      props.row.status.toUpperCase() === 'NS' ||
                      props.row.status.toUpperCase() === 'TBA'
                    "
                    class="is-greyLit"
                    size="is-medium"
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
                <div>
                  <div
                    v-if="props.row.lineup && props.row.lineup.data.length > 0"
                    @click="seeLineup(props.row)"
                    class="is-lineUp"
                  >
                    {{ langSelected === "EN" ? "line-up" : "compos" }}
                  </div>
                  <figure @click="result(props.row)" class="versusFigure1">
                    <img
                      loading="lazy"
                      class="vs"
                      src="~assets/images/versus.png"
                      alt="versus"
                    />
                    <span @click="result(props.row)" class="pointer1">{{
                      langSelected === "EN" ? "details" : "détails"
                    }}</span>
                  </figure>
                </div>
                <span class="bullsAndBearsPicVs">
                  <b-tag
                    v-if="
                      props.row.status.toUpperCase() === 'NOT STARTED' ||
                      props.row.status.toUpperCase() === 'NS' ||
                      props.row.status.toUpperCase() === 'TBA'
                    "
                    class="is-greyLit"
                    size="is-medium"
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
                  v-if="props.row.awayTeamId && props.row.awayTeamId.shortName"
                  :to="'/teams/' + props.row.awayTeamId.shortName.toLowerCase()"
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
                    <strong
                      class="teamNameStrong pointer"
                      @click="
                        accessTeam(props.row.awayTeamId.shortName.toLowerCase())
                      "
                      >{{
                        props.row.awayTeamId.name
                          ? props.row.awayTeamId.name
                          : props.row.awayTeamName
                      }}</strong
                    >
                  </div>
                </nuxt-link>
                <div v-else class="teamNameLogo">
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
                  <strong class="teamNameStrong pointer">{{
                    props.row.awayTeamId.name
                      ? props.row.awayTeamId.name
                      : props.row.awayTeamName
                  }}</strong>
                </div>
              </div>
            </b-table-column>
            <!-- <b-table-column field='competition' centered label="">
                  <div class="journée">
                      <strong>({{props.row.matchday}})</strong>
                       <figure @click="ligue(props.row.codeCompetitionApi)" class="image pointer dayChampion">
                            <img loading="lazy"class ="logoligue" :src="'/logoLigue/'+props.row.codeCompetitionApi+'.png'" alt="logoLigue">
                      </figure>
                  </div>
						</b-table-column>-->
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
                <p>
                  {{
                    langSelected === "EN"
                      ? "No game today"
                      : "Pas de match aujourd'hui"
                  }}
                </p>
              </div>
            </section>
          </template>
        </b-table>
      </div>
    </div>
    <div v-if="!mobile" class="box desktopOnly">
      <p>
        <span class="title is-5">
          {{ langSelected === "EN" ? "Live:" : "en direct :" }}
          {{
            matches.filter(
              (m) =>
                m.status != "FT" && m.status != "AET" && m.status != "FT_PEN"
            ).length
          }}
          {{
            matches.filter(
              (m) =>
                m.status != "FT" && m.status != "AET" && m.status != "FT_PEN"
            ).length > 1
              ? "matchs"
              : "match"
          }}
        </span>
      </p>
      <hr />

      <div
        v-for="(match, index) in matches
          .filter(
            (m) => m.status != 'FT' && m.status != 'AET' && m.status != 'FT_PEN'
          )
          .sort((a, b) => b.elapsed - a.elapsed)"
        :key="index"
        class="card desktopOnly profile-card"
      >
        <div class="watchList card-content">
          <nav class="bandB level media">
            <div class="bullsAndBears">
              <div class="bullsAndBearsPic">
                <nuxt-link
                  v-if="match.homeTeamId && match.homeTeamId.shortName"
                  :to="'/teams/' + match.homeTeamId.shortName.toLowerCase()"
                  class="pointer"
                >
                  <img
                    loading="lazy"
                    class="teamShirt pointer"
                    :src="match.homeTeamId.teamImg"
                    :alt="match.homeTeamName"
                    :class="{
                      invertOk: match.homeTeamName
                        .toUpperCase()
                        .includes('JUVE'),
                    }"
                  />
                </nuxt-link>
                <img
                  v-else
                  class="teamShirt pointer"
                  :src="match.homeTeamId.teamImg"
                  :alt="match.homeTeamName"
                  :class="{
                    invertOk: match.homeTeamName.toUpperCase().includes('JUVE'),
                  }"
                />
              </div>
              <span class="bullsAndBearsPicVs">
                <b-tag
                  v-if="
                    match.status.toUpperCase() === 'NOT STARTED' ||
                    match.status.toUpperCase() === 'NS' ||
                    match.status.toUpperCase() === 'TBA'
                  "
                  class="is-greyLit"
                  size="is-medium"
                  >-</b-tag
                >
                <b-tag
                  v-else
                  :class="{
                    'is-green': match.goalsHomeTeam > match.goalsAwayTeam,
                    'is-red': match.goalsHomeTeam < match.goalsAwayTeam,
                    'is-blueInfo': match.goalsHomeTeam === match.goalsAwayTeam,
                  }"
                  size="is-medium"
                  >{{ match.goalsHomeTeam }}</b-tag
                >
              </span>

              <b-tooltip
                :label="match.homeTeamName + ' VS ' + match.awayTeamName"
                position="is-bottom"
                class="bullsAndBearsPicVsLogo"
                type="is-info"
                size="is-large"
              >
                <figure @click="result(match)" class="versusFigure1">
                  <img
                    loading="lazy"
                    @click="result(match)"
                    class="vs"
                    src="~assets/images/versus.png"
                    alt="versus"
                  />
                </figure>
              </b-tooltip>

              <span class="bullsAndBearsPicVs">
                <b-tag
                  v-if="
                    match.status.toUpperCase() === 'NOT STARTED' ||
                    match.status.toUpperCase() === 'NS' ||
                    match.status.toUpperCase() === 'TBA'
                  "
                  class="is-greyLit"
                  size="is-medium"
                  >-</b-tag
                >
                <b-tag
                  v-else
                  :class="{
                    'is-green': match.goalsHomeTeam < match.goalsAwayTeam,
                    'is-red': match.goalsHomeTeam > match.goalsAwayTeam,
                    'is-blueInfo': match.goalsHomeTeam === match.goalsAwayTeam,
                  }"
                  size="is-medium"
                  >{{ match.goalsAwayTeam }}</b-tag
                >
              </span>
              <div class="bullsAndBearsPic">
                <nuxt-link
                  v-if="match.awayTeamId && match.awayTeamId.shortName"
                  :to="'/teams/' + match.awayTeamId.shortName.toLowerCase()"
                  class="pointer"
                >
                  <img
                    loading="lazy"
                    class="teamShirt pointer"
                    :src="match.awayTeamId.teamImg"
                    :alt="match.awayTeamName"
                    :class="{
                      invertOk: match.awayTeamName
                        .toUpperCase()
                        .includes('JUVE'),
                    }"
                  />
                </nuxt-link>
                <img
                  v-else
                  class="teamShirt pointer"
                  :src="match.awayTeamId.teamImg"
                  :alt="match.awayTeamName"
                  :class="{
                    invertOk: match.awayTeamName.toUpperCase().includes('JUVE'),
                  }"
                />
              </div>
              <div>
                <div v-if="match.elapsed == '' || !match.elapsed">
                  <strong class="has-text-grey"> NC </strong>
                </div>

                <div v-else-if="match.status.toUpperCase() === 'HT'">
                  <strong class="has-text-grey">MT</strong>
                </div>
                <div v-else-if="match.status.toUpperCase() === 'PEN_LIVE'">
                  <strong class="has-text-grey">pen</strong>
                </div>
                <div v-else>
                  <strong class="has-text-green">{{ match.elapsed }}"</strong>
                </div>
              </div>
            </div>
          </nav>
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
  </div>
</template>

<script>
import moment from "moment";
export default {
  auth: false,
  components: {
    resultatModal: () => import("@/components/modal/resultatModal"),
    stadiumModal: () => import("@/components/modal/stadiumModal"),
  },

  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      lineUp: "",
      stadium: "",
      stadiumModal: false,
      total: 0,
      loading: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 7,
      perPage: 30,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      resultat: "",
      resultatModal: false,
      detailActivate: false,
    };
  },
  mounted() {
    if (this.$route.path.includes("en-direct")) {
      this.detailActivate = true;
    }
  },

  props: {},
  computed: {
    matches() {
      return this.$store.state.var.matches;
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        return this.$store.state.auth.user;
      } else {
        return "unconnected";
      }
    },
  },
  methods: {
    activeDetail() {
      this.detailActivate = !this.detailActivate;
    },
    seeLineup(event) {
      this.resultat = event;
      this.lineUp = true;
      this.resultatModal = true;
    },
    seeStadium(event) {
      this.stadium = event;
      this.stadiumModal = true;
    },
    result(resultat) {
      this.lineUp = false;
      this.resultat = resultat;
      this.resultatModal = true;
    },
    refresh() {
      this.$emit("refresh");
    },
    ligue(event) {
      this.$store.commit("var/setNewValue", event);
      setTimeout(() => {
        this.$router.push("/leagues");
      }, 10);
    },
    moment: function (time) {
      return moment(time);
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
  },
};
</script>

<style scoped>
.profile-card {
  background-color: #eef1f7;
}
.resultModalTitle > div {
  display: flex;
}
.resultModalTitle > div > span {
  display: flex;
  margin: auto;
}
.spaceBetween {
  width: 95%;
  display: flex;
  justify-content: space-between;
}
.box {
  padding: 0.75rem;
  margin-bottom: 1rem;
}
.teamNameGame {
  display: flex;
  justify-content: center;
}
.journée {
  display: flex;
  margin-bottom: 5px;
}
.journée > div {
  display: flex;
}

.bandB {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.2rem !important;
}
.logoligue {
  width: auto;
  margin-right: 5px;
  max-height: 45px;
}

.resultModalTitle > span {
  display: flex;
}
.resultModalTitle > span > strong {
  margin: auto;
}
.resultModalTitle > img {
  max-height: 60px !important;
}
.journéeSpan {
  margin: auto;
  margin-left: 0 !important;
}
.scorePosition {
  align-self: center;
  font-size: 2rem !important;
}
.card-content {
  padding: 0rem;
}
.vs {
  align-self: center;
  height: 35px !important;
}
.navbar.is-dark {
  background-color: #192b41;
  color: #eef1f7;
}
.whiteci {
  color: #eef1f7;
}
.babMenu {
  background-color: transparent;
  color: #ff7d00 !important;
  font-weight: bold;
  padding-bottom: calc(0.5rem - 3px);
}
.weatherDiv {
  display: flex;
  align-items: center;
}
#currentInsight {
  padding-left: 20px;
}

.watchList {
  display: flex;
  flex-direction: column;
}
.timer {
  display: flex;
  justify-content: center;
  color: #ffcf00 !important;
  flex-direction: column;
  font-size: 1rem !important;
}
.countdown {
  margin-bottom: 5px;
}

.teamShirt {
  height: 40px !important;
}
.level-item {
  display: flex;
  justify-content: CENTER;
}
.bullsAndBearsPic {
  justify-content: center;
  display: flex;
  width: 20%;
}
.bullsAndBearsPicVsLogo {
  display: flex;
  justify-content: center;
}
.bullsAndBearsPicVs {
  width: 10%;
}
.bullsAndBears {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100% !important;
}
.bandB {
  justify-content: center;
}
.Last {
  display: flex;
  justify-content: center;
  align-items: center;
}
.box > p {
  display: flex;
  justify-content: space-between;
}
.title {
  margin-bottom: 0rem;
}
hr {
  background-color: #dbdbdb;
  border: none;
  display: block;
  height: 1px;
  margin: 1rem 0;
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
  margin: 0;
  padding: 5px;
  padding-left: 0px;
}

.babMenu {
  font-size: 1.2rem;
  color: lightgrey !important;
}

.teamNameStrong {
  width: 10%;
  align-self: center;
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

.modalTitleBet {
  text-align: center;
  margin-bottom: 0.5rem;
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
  justify-content: space-evenly;
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
.mobileOnly {
  display: none;
}
@media screen and (min-width: 770px) and (max-width: 1023px) {
  .mobileOnly {
    display: none;
  }
  .desktopOnly {
    display: flex;
    flex-direction: column;
  }

  .teamShirt {
    height: 70px !important;
  }
  .tag {
    font-size: 1.5rem !important;
  }
}
@media (max-width: 769px) {
  .box {
    padding: 0rem;
    margin-bottom: 0rem !important;
  }
  .box > p {
    padding: 0.5rem;
  }
  hr {
    margin: 0.5rem;
  }
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
    width: 100% !important;
  }
  .NextMatchWrapper > span {
    width: 100% !important;
  }
  .logoligue {
    width: auto;
    height: 30px;
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
  .logoClub {
    width: 25%;
  }
  .teamNameStrong {
    width: auto;
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
  }
  .mobileOnly > div > strong {
    text-align: right;
  }
  .mobileOnly > div {
    text-align: right;
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
  .teamNameLogo {
    flex-direction: column;
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
  .is-fullwidth {
    margin-bottom: -0.25rem;
  }
}
</style>
