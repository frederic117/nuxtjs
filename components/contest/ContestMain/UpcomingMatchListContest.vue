<template>
  <section class="trendingWrapper">
    <b-loading
      :is-full-page="true"
      :active.sync="loading"
      :canCancel="false"
    ></b-loading>

    <div v-for="(match, index) in matchList" :key="index">
      <div
        class="box profile-card"
        v-if="
          match.homeTeamId &&
          match.awayTeamId &&
          !match.homeTeamId.is_placeholder &&
          !match.awayTeamId.is_placeholder
        "
      >
        <div class="watchList card-content">
          <nav class="bandB level media">
            <div class="matchProno">
              <div class="journee pointer">
                <figure
                  @click="ligue(match.codeCompetitionApi)"
                  width="80"
                  class="image pointer dayChampion"
                >
                  <img
                    :class="{
                      invertOk:
                        Number(match.codeCompetitionApi) == 2 ||
                        Number(match.codeCompetitionApi) == 5,
                    }"
                    loading="lazy"
                    class="logoligue"
                    :src="'/logoLigue/' + match.codeCompetitionApi + '.png'"
                    alt="logoLigue"
                  />
                  <span
                    v-if="match.matchday === '8th Finals'"
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
                    v-else-if="match.matchday === '16th Finals'"
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
                    v-else-if="match.matchday === '32nd Finals'"
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
                    v-else-if="match.matchday === 'Quarter-finals'"
                    class="journéeSpan"
                  >
                    <strong>{{
                      langSelected === "EN"
                        ? "Quarter final"
                        : "Quart de finale"
                    }}</strong>
                  </span>
                  <span
                    v-else-if="match.matchday === 'Semi-finals'"
                    class="journéeSpan"
                  >
                    <strong>{{
                      langSelected === "EN" ? "Semi final" : "Demi-finale"
                    }}</strong>
                  </span>
                  <span
                    v-else-if="match.matchday === 'bronze'"
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
                    v-else-if="match.matchday === 'Final'"
                    class="journéeSpan"
                  >
                    <strong>{{
                      langSelected === "EN" ? "Final" : "Finale"
                    }}</strong>
                  </span>
                  <span
                    v-else-if="match.matchday.includes('Round')"
                    class="journéeSpan"
                  >
                    <strong>{{ match.matchday }}</strong>
                  </span>

                  <span
                    v-else-if="match.matchday == 'Group Stage'"
                    class="journéeSpan"
                  >
                    <strong>{{
                      langSelected === "EN" ? match.matchday : "phase de groupe"
                    }}</strong>
                  </span>
                  <span v-else-if="langSelected === 'EN'" class="journéeSpan">
                    <strong
                      v-if="
                        match.matchday == '1' ||
                        match.matchday == '21' ||
                        match.matchday == '31'
                      "
                    >
                      {{ match.matchday }}
                      <sup>st</sup> day
                    </strong>
                    <strong
                      v-else-if="
                        match.matchday == '2' ||
                        match.matchday == '22' ||
                        match.matchday == '32'
                      "
                    >
                      {{ match.matchday }}
                      <sup>nd</sup> day
                    </strong>
                    <strong
                      v-else-if="
                        match.matchday == '3' ||
                        match.matchday == '23' ||
                        match.matchday == '33'
                      "
                    >
                      {{ match.matchday }}
                      <sup>rd</sup> day
                    </strong>
                    <strong v-else>
                      {{ match.matchday }}
                      <sup>th</sup> day
                    </strong>
                  </span>
                  <span v-else class="journéeSpan">
                    <strong v-if="match.matchday == '1'">
                      {{ match.matchday }}
                      <sup>ère</sup> journée
                    </strong>
                    <strong v-else>
                      {{ match.matchday }}
                      <sup>ème</sup> journée
                    </strong>
                  </span>
                </figure>

                <div class="timer countdown">
                  <div v-if="match.status.toUpperCase() === 'DELAYED'">
                    <strong class="is-wc"
                      >{{
                        langSelected === "EN"
                          ? "game in progress"
                          : "match en cours"
                      }}
                      {{
                        langSelected === "EN"
                          ? "delayed kickoff - Pending"
                          : "coup d'envoi décalé - En attente"
                      }}</strong
                    >
                  </div>
                  <div v-if="match.status.toUpperCase() === 'POSTP'">
                    <strong class="is-wc"
                      >{{
                        langSelected === "EN"
                          ? "postponed game - Not taken into account in the contest"
                          : "match reporté - Non pris en compte dans le contest"
                      }}
                    </strong>
                  </div>
                  <div v-if="match.status.toUpperCase() === 'CANCL'">
                    <strong class="is-wc"
                      >{{
                        langSelected === "EN"
                          ? "game cancelled - Not taken into account in the contest"
                          : "match annulé - Non pris en compte dans le contest"
                      }}
                    </strong>
                  </div>
                  <div
                    v-if="
                      match.status.toUpperCase() === 'NS' ||
                      match.status.toUpperCase() === 'TBA'
                    "
                  >
                    <strong class="is-wc">{{
                      moment(match.date)
                        .local()
                        .locale(langSelected.toLowerCase())
                        .calendar()
                    }}</strong>
                  </div>
                  <div
                    v-if="
                      match.status.toUpperCase() === 'LIVE' &&
                      match.detail &&
                      match.elapsed < 46
                    "
                  >
                    <strong v-if="langSelected === 'EN'" class="has-text-grey">
                      1
                      <sup>st</sup> half :&nbsp
                    </strong>
                    <strong v-else class="has-text-grey">
                      1
                      <sup>ère</sup> mi-temps :&nbsp
                    </strong>

                    <strong class="has-text-green">{{ match.elapsed }}"</strong>
                  </div>
                  <div v-if="match.status.toUpperCase() === 'HT'">
                    <strong class="has-text-grey">
                      {{ langSelected === "EN" ? "half-time" : "mi-temps" }}
                    </strong>
                  </div>
                  <div
                    v-if="
                      match.status.toUpperCase() === 'LIVE' &&
                      match.elapsed > 45
                    "
                  >
                    <strong v-if="langSelected === 'EN'" class="has-text-grey">
                      2
                      <sup>nd</sup> half :&nbsp
                    </strong>
                    <strong v-else class="has-text-grey">
                      2
                      <sup>ème</sup> mi-temps :&nbsp
                    </strong>
                    <strong class="has-text-green">{{ match.elapsed }}"</strong>
                  </div>
                  <div
                    v-if="
                      match.status.toUpperCase() === 'BREAK' &&
                      90 < match.elapsed < 120
                    "
                  >
                    {{
                      langSelected === "EN"
                        ? "waiting for overtime to start"
                        : "en attente du début des prolongations"
                    }}
                  </div>
                  <div
                    v-if="
                      match.status.toUpperCase() === 'BREAK' &&
                      match.elapsed >= 120
                    "
                  >
                    <strong class="has-text-grey">{{
                      langSelected === "EN"
                        ? "waiting for penalty shootout"
                        : "en attente du début des tirs au but"
                    }}</strong>
                  </div>
                  <div v-if="match.status.toUpperCase() === 'ET'">
                    <strong class="has-text-grey">{{
                      langSelected === "EN" ? "overtime:" : "prolongations :"
                    }}</strong>
                    <strong class="has-text-green">{{ match.elapsed }}"</strong>
                  </div>
                  <div v-if="match.status.toUpperCase() === 'PEN_LIVE'">
                    <strong class="has-text-grey">{{
                      langSelected === "EN"
                        ? "penalty shootout"
                        : "séance de penalties"
                    }}</strong>
                  </div>
                  <strong
                    @click="seeStadium(match.stadium)"
                    class="has-text-yellow pointer"
                    >{{
                      match.stadium && match.stadium.name
                        ? match.stadium.name
                        : ""
                    }}</strong
                  >
                </div>
              </div>
            </div>
            <div class="bullsAndBears">
              <div class="bullsAndBearsPic">
                <nuxt-link
                  v-if="match.homeTeamId.shortName"
                  :to="`/teams/${match.homeTeamId.shortName}`"
                  class="pointer logoNameDesk"
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

                  <strong
                    class="teamNameStrong pointer"
                    v-if="langSelected === 'EN'"
                  >
                    {{
                      match.homeTeamId
                        ? match.homeTeamId.searchName
                        : match.homeTeamName
                    }}

                    <span
                      class="is-wc"
                      v-if="
                        match.standings && match.standings.localteam_position
                      "
                      >({{ match.standings.localteam_position }})</span
                    >
                  </strong>

                  <strong
                    class="teamNameStrong pointer"
                    v-else-if="match.homeTeamId.name"
                  >
                    {{ match.homeTeamId.name }}
                    <span
                      class="is-wc"
                      v-if="
                        match.standings && match.standings.localteam_position
                      "
                      >({{ match.standings.localteam_position }})</span
                    >
                  </strong>
                  <strong class="teamNameStrong" v-else>
                    {{ match.homeTeamName }}
                    <span
                      class="is-wc"
                      v-if="
                        match.standings && match.standings.localteam_position
                      "
                      >({{ match.standings.localteam_position }})</span
                    >
                  </strong>

                  <div class="forme">
                    <span
                      v-if="match.homeTeamId.forme[0] == 'V'"
                      class="form is-win"
                      >{{ langSelected === "EN" ? "W" : "V" }}</span
                    >
                    <span
                      v-else-if="match.homeTeamId.forme[0] == 'N'"
                      class="form is-draw"
                      >{{ langSelected === "EN" ? "D" : "N" }}</span
                    >
                    <span
                      v-else-if="match.homeTeamId.forme[0] == 'D'"
                      class="form is-loss"
                      >{{ langSelected === "EN" ? "L" : "D" }}</span
                    >
                    <span
                      v-if="match.homeTeamId.forme[1] == 'V'"
                      class="form is-win"
                      >{{ langSelected === "EN" ? "W" : "V" }}</span
                    >
                    <span
                      v-else-if="match.homeTeamId.forme[1] == 'N'"
                      class="form is-draw"
                      >{{ langSelected === "EN" ? "D" : "N" }}</span
                    >
                    <span
                      v-else-if="match.homeTeamId.forme[1] == 'D'"
                      class="form is-loss"
                      >{{ langSelected === "EN" ? "L" : "D" }}</span
                    >
                    <span
                      v-if="match.homeTeamId.forme[2] == 'V'"
                      class="form is-win"
                      >{{ langSelected === "EN" ? "W" : "V" }}</span
                    >
                    <span
                      v-else-if="match.homeTeamId.forme[2] == 'N'"
                      class="form is-draw"
                      >{{ langSelected === "EN" ? "D" : "N" }}</span
                    >
                    <span
                      v-else-if="match.homeTeamId.forme[2] == 'D'"
                      class="form is-loss"
                      >{{ langSelected === "EN" ? "L" : "D" }}</span
                    >
                    <span
                      v-if="match.homeTeamId.forme[3] == 'V'"
                      class="form is-win"
                      >{{ langSelected === "EN" ? "W" : "V" }}</span
                    >
                    <span
                      v-else-if="match.homeTeamId.forme[3] == 'N'"
                      class="form is-draw"
                      >{{ langSelected === "EN" ? "D" : "N" }}</span
                    >
                    <span
                      v-else-if="match.homeTeamId.forme[3] == 'D'"
                      class="form is-loss"
                      >{{ langSelected === "EN" ? "L" : "D" }}</span
                    >
                    <span
                      v-if="match.homeTeamId.forme[4] == 'V'"
                      class="form is-win"
                      >{{ langSelected === "EN" ? "W" : "V" }}</span
                    >
                    <span
                      v-else-if="match.homeTeamId.forme[4] == 'N'"
                      class="form is-draw"
                      >{{ langSelected === "EN" ? "D" : "N" }}</span
                    >
                    <span
                      v-else-if="match.homeTeamId.forme[4] == 'D'"
                      class="form is-loss"
                      >{{ langSelected === "EN" ? "L" : "D" }}</span
                    >
                  </div>
                </nuxt-link>
              </div>

              <div
                class="displayFlex pronoBlock"
                v-if="
                  match.status.toUpperCase() === 'NOT STARTED' ||
                  match.status.toUpperCase() === 'NS' ||
                  match.status.toUpperCase() === 'TBA' ||
                  match.status.toUpperCase() === 'POSTP' ||
                  match.status.toUpperCase() === 'CANCL' ||
                  match.status.toUpperCase() === 'DELAYED'
                "
              >
                <b-tooltip
                  :label="
                    langSelected === 'EN'
                      ? match.homeTeamId.searchName +
                        ' VS ' +
                        match.awayTeamId.searchName
                      : match.homeTeamName + ' VS ' + match.awayTeamName
                  "
                  position="is-top"
                  class="bullsAndBearsPicVS"
                  type="is-info"
                  size="is-large"
                >
                  <div
                    v-if="
                      match.lineup &&
                      match.lineup.data &&
                      match.lineup.data.length > 0
                    "
                    @click="seeLineup(match)"
                    class="is-lineUp"
                  >
                    {{ langSelected === "EN" ? "line-up" : "compos" }}
                  </div>
                  <img
                    @click="result(match)"
                    loading="lazy"
                    class="vs"
                    src="~assets/images/versus.png"
                    alt="versus"
                  />
                </b-tooltip>
                <div @click="iWantBet(match)" class="bullsAndBearsPicVSTag">
                  <b-tooltip
                    v-if="match.status.toUpperCase() != 'FT'"
                    :label="
                      langSelected === 'EN'
                        ? 'to win for a victory of ' +
                          match.homeTeamId.searchName
                        : 'à gagner pour une victoire de ' +
                          match.homeTeamId.name
                    "
                    position="is-bottom"
                    class="teamNameGame is-info"
                    size="is-medium"
                  >
                    <b-taglist attached>
                      <b-tag class="is-tagContestTitle">1</b-tag>
                      <b-tag class="is-tagContest"
                        >{{
                          100 - Math.round(match.trending.percentage[0])
                        }}
                        pts</b-tag
                      >
                    </b-taglist>
                  </b-tooltip>
                  <b-tooltip
                    v-if="match.status.toUpperCase() != 'FT'"
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
                          100 - Math.round(match.trending.percentage[1])
                        }}
                        pts</b-tag
                      >
                    </b-taglist>
                  </b-tooltip>
                  <b-tooltip
                    v-if="match.status.toUpperCase() != 'FT'"
                    :label="
                      langSelected === 'EN'
                        ? 'to win for a victory of ' +
                          match.awayTeamId.searchName
                        : 'à gagner pour une victoire de ' +
                          match.awayTeamId.name
                    "
                    position="is-left"
                    class="teamNameGame is-info"
                    size="is-medium"
                  >
                    <b-taglist attached>
                      <b-tag class="is-tagContestTitle">2</b-tag>
                      <b-tag class="is-tagContest"
                        >{{
                          100 - Math.round(match.trending.percentage[2])
                        }}
                        pts</b-tag
                      >
                    </b-taglist>
                  </b-tooltip>
                </div>
              </div>
              <div v-else class="scoreBlock pronoBlock">
                <div
                  v-if="
                    match.lineup &&
                    match.lineup.data &&
                    match.lineup.data.length > 0
                  "
                  @click="seeLineup(match)"
                  class="is-lineUp"
                >
                  {{ langSelected === "EN" ? "line-up" : "compos" }}
                </div>

                <div @click="result(match)" class="scoreWr">
                  <b-tag
                    v-if="
                      match.status.toUpperCase() === 'NOT STARTED' ||
                      match.status.toUpperCase() === 'NS' ||
                      match.status.toUpperCase() === 'TBA' ||
                      match.status.toUpperCase() === 'POSTP' ||
                      match.status.toUpperCase() === 'CANCL' ||
                      match.status.toUpperCase() === 'DELAYED'
                    "
                    class="scoreResultModal is-greyLit"
                    >-</b-tag
                  >
                  <b-tag
                    v-else
                    class="scoreResultModal"
                    :class="{
                      'is-green': match.goalsHomeTeam > match.goalsAwayTeam,
                      'is-red': match.goalsHomeTeam < match.goalsAwayTeam,
                      'is-info': match.goalsHomeTeam === match.goalsAwayTeam,
                    }"
                    size="is-large"
                    >{{
                      match.goalsHomeTeam.toString().replace(" ", "")
                    }}</b-tag
                  >

                  <strong class="separatorScoreResult">-</strong>
                  <b-tag
                    v-if="
                      match.status.toUpperCase() === 'NOT STARTED' ||
                      match.status.toUpperCase() === 'NS' ||
                      match.status.toUpperCase() === 'TBA' ||
                      match.status.toUpperCase() === 'POSTP' ||
                      match.status.toUpperCase() === 'CANCL' ||
                      match.status.toUpperCase() === 'DELAYED'
                    "
                    class="scoreResultModal is-greyLit"
                    >-</b-tag
                  >
                  <b-tag
                    v-else
                    class="scoreResultModal"
                    :class="{
                      'is-green': match.goalsHomeTeam < match.goalsAwayTeam,
                      'is-red': match.goalsHomeTeam > match.goalsAwayTeam,
                      'is-info': match.goalsHomeTeam === match.goalsAwayTeam,
                    }"
                    size="is-large"
                    >{{
                      match.goalsAwayTeam.toString().replace(" ", "")
                    }}</b-tag
                  >
                </div>
              </div>
              <div class="bullsAndBearsPic">
                <nuxt-link
                  v-if="match.awayTeamId.shortName"
                  :to="`/teams/${match.awayTeamId.shortName}`"
                  class="pointer logoNameDesk"
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

                  <strong
                    class="teamNameStrong pointer"
                    v-if="langSelected === 'EN'"
                  >
                    {{
                      match.awayTeamId
                        ? match.awayTeamId.searchName
                        : match.awayTeamName
                    }}
                    <span
                      class="is-wc"
                      v-if="
                        match.standings && match.standings.visitorteam_position
                      "
                      >({{ match.standings.visitorteam_position }})</span
                    >
                  </strong>

                  <strong
                    class="teamNameStrong pointer"
                    v-else-if="match.awayTeamId.name"
                  >
                    {{ match.awayTeamId.name }}
                    <span
                      class="is-wc"
                      v-if="
                        match.standings && match.standings.visitorteam_position
                      "
                      >({{ match.standings.visitorteam_position }})</span
                    >
                  </strong>
                  <strong class="teamNameStrong" v-else>
                    {{ match.awayTeamName }}
                    <span
                      class="is-wc"
                      v-if="
                        match.standings && match.standings.visitorteam_position
                      "
                      >({{ match.standings.visitorteam_position }})</span
                    >
                  </strong>

                  <div class="forme">
                    <span
                      v-if="match.awayTeamId.forme[0] == 'V'"
                      class="form is-win"
                      >{{ langSelected === "EN" ? "W" : "V" }}</span
                    >
                    <span
                      v-else-if="match.awayTeamId.forme[0] == 'N'"
                      class="form is-draw"
                      >{{ langSelected === "EN" ? "D" : "N" }}</span
                    >
                    <span
                      v-else-if="match.awayTeamId.forme[0] == 'D'"
                      class="form is-loss"
                      >{{ langSelected === "EN" ? "L" : "D" }}</span
                    >
                    <span
                      v-if="match.awayTeamId.forme[1] == 'V'"
                      class="form is-win"
                      >{{ langSelected === "EN" ? "W" : "V" }}</span
                    >
                    <span
                      v-else-if="match.awayTeamId.forme[1] == 'N'"
                      class="form is-draw"
                      >{{ langSelected === "EN" ? "D" : "N" }}</span
                    >
                    <span
                      v-else-if="match.awayTeamId.forme[1] == 'D'"
                      class="form is-loss"
                      >{{ langSelected === "EN" ? "L" : "D" }}</span
                    >
                    <span
                      v-if="match.awayTeamId.forme[2] == 'V'"
                      class="form is-win"
                      >{{ langSelected === "EN" ? "W" : "V" }}</span
                    >
                    <span
                      v-else-if="match.awayTeamId.forme[2] == 'N'"
                      class="form is-draw"
                      >{{ langSelected === "EN" ? "D" : "N" }}</span
                    >
                    <span
                      v-else-if="match.awayTeamId.forme[2] == 'D'"
                      class="form is-loss"
                      >{{ langSelected === "EN" ? "L" : "D" }}</span
                    >
                    <span
                      v-if="match.awayTeamId.forme[3] == 'V'"
                      class="form is-win"
                      >{{ langSelected === "EN" ? "W" : "V" }}</span
                    >
                    <span
                      v-else-if="match.awayTeamId.forme[3] == 'N'"
                      class="form is-draw"
                      >{{ langSelected === "EN" ? "D" : "N" }}</span
                    >
                    <span
                      v-else-if="match.awayTeamId.forme[3] == 'D'"
                      class="form is-loss"
                      >{{ langSelected === "EN" ? "L" : "D" }}</span
                    >
                    <span
                      v-if="match.awayTeamId.forme[4] == 'V'"
                      class="form is-win"
                      >{{ langSelected === "EN" ? "W" : "V" }}</span
                    >
                    <span
                      v-else-if="match.awayTeamId.forme[4] == 'N'"
                      class="form is-draw"
                      >{{ langSelected === "EN" ? "D" : "N" }}</span
                    >
                    <span
                      v-else-if="match.awayTeamId.forme[4] == 'D'"
                      class="form is-loss"
                      >{{ langSelected === "EN" ? "L" : "D" }}</span
                    >
                  </div>
                </nuxt-link>
              </div>
            </div>
          </nav>
          <div class="Last">
            <div class="level-item has-text-centered">
              <div>
                <div
                  class="pointer"
                  @click="oops()"
                  v-if="
                    match.status.toUpperCase() != 'NS' &&
                    match.status.toUpperCase() != 'TBA' &&
                    !match.userBet
                  "
                >
                  <img
                    loading="lazy"
                    class="oops"
                    src="~assets/images/oops.png"
                    alt="oops"
                  />
                </div>
                <div v-else>
                  <div
                    v-if="match.userBet && match.userBet.status === 'active'"
                    class="pointer bet"
                    @click="iWantBet(match)"
                  >
                    <!-- <strong class="has-text-blue nameClub">{{match.homeTeamName}}</strong> -->
                    <div class="displayFlex">
                      <span>
                        {{ langSelected === "EN" ? "My pick" : "mon prono" }}
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </span>
                      <div class="scoreProno">
                        <b-tag
                          :class="{
                            'is-green':
                              match.userBet.scoreTeam1 >
                              match.userBet.scoreTeam2,
                            'is-red':
                              match.userBet.scoreTeam1 <
                              match.userBet.scoreTeam2,
                            'is-blueInfo':
                              match.userBet.scoreTeam1 ==
                              match.userBet.scoreTeam2,
                          }"
                          size="is-large"
                          >{{ match.userBet.scoreTeam1 }}</b-tag
                        >
                        <strong class="separatorScore">-</strong>
                        <b-tag
                          :class="{
                            'is-green':
                              match.userBet.scoreTeam1 <
                              match.userBet.scoreTeam2,
                            'is-red':
                              match.userBet.scoreTeam1 >
                              match.userBet.scoreTeam2,
                            'is-blueInfo':
                              match.userBet.scoreTeam1 ==
                              match.userBet.scoreTeam2,
                          }"
                          size="is-large"
                          >{{ match.userBet.scoreTeam2 }}</b-tag
                        >
                      </div>
                    </div>

                    <div class="pointsContest">
                      <div @click="iWantBet(match)" class="displayFlex">
                        <span>
                          <strong class="has-text-contest">
                            {{
                              langSelected === "EN"
                                ? "potential profit"
                                : "gain potentiel"
                            }}
                          </strong>
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </span>

                        <div
                          class="displayFlex"
                          v-if="
                            match.userBet.scoreTeam1 > match.userBet.scoreTeam2
                          "
                        >
                          <span
                            v-if="match.userBet.bettingPoints"
                            class="is-itallic"
                            >{{
                              langSelected === "EN" ? "result:" : "résultat :"
                            }}

                            <strong class="has-text-contest"
                              >{{
                                (
                                  100 - Math.round(match.trending.percentage[0])
                                ).toFixed(2)
                              }}
                              Pts
                            </strong>
                            ({{ langSelected === "EN" ? "bet:" : "mise :" }}
                            <strong class="has-text-contest">
                              +
                              {{
                                (
                                  ((100 -
                                    Math.round(match.trending.percentage[0])) *
                                    match.userBet.bettingPoints) /
                                  100
                                ).toFixed(2)
                              }}</strong
                            >)
                          </span>
                          <span v-else class="is-itallic"
                            >{{
                              langSelected === "EN" ? "result:" : "résultat :"
                            }}
                            <strong class="has-text-contest"
                              >{{
                                (
                                  100 - Math.round(match.trending.percentage[0])
                                ).toFixed(2)
                              }}
                              Pts
                            </strong>
                          </span>
                          <span
                            v-if="match.userBet.bettingPoints"
                            class="is-itallic"
                            >{{
                              langSelected === "EN"
                                ? "exact score:"
                                : "score exact :"
                            }}
                            <strong class="has-text-contest">
                              {{
                                (
                                  (100 -
                                    Math.round(match.trending.percentage[0]) +
                                    ((100 -
                                      Math.round(
                                        match.trending.percentage[0]
                                      )) *
                                      match.userBet.bettingPoints) /
                                      100) *
                                  2
                                ).toFixed(2)
                              }}
                              Pts
                            </strong></span
                          >
                          <span v-else class="is-itallic"
                            >{{
                              langSelected === "EN"
                                ? "exact score:"
                                : "score exact :"
                            }}
                            <strong class="has-text-contest">
                              {{
                                (
                                  (100 -
                                    Math.round(match.trending.percentage[0])) *
                                  2
                                ).toFixed(2)
                              }}
                              Pts
                            </strong></span
                          >
                        </div>

                        <div
                          class="displayFlex"
                          v-if="
                            match.userBet.scoreTeam1 == match.userBet.scoreTeam2
                          "
                        >
                          <span
                            v-if="match.userBet.bettingPoints"
                            class="is-itallic"
                            >{{
                              langSelected === "EN" ? "result:" : "résultat :"
                            }}
                            <strong class="has-text-contest"
                              >{{
                                (
                                  100 - Math.round(match.trending.percentage[1])
                                ).toFixed(2)
                              }}
                              Pts
                            </strong>
                            ({{ langSelected === "EN" ? "bet:" : "mise :" }}
                            <strong class="has-text-contest">
                              +
                              {{
                                (
                                  ((100 -
                                    Math.round(match.trending.percentage[1])) *
                                    match.userBet.bettingPoints) /
                                  100
                                ).toFixed(2)
                              }}</strong
                            >)
                          </span>
                          <span v-else class="is-itallic"
                            >{{
                              langSelected === "EN" ? "result:" : "résultat :"
                            }}
                            <strong class="has-text-contest"
                              >{{
                                (
                                  100 - Math.round(match.trending.percentage[1])
                                ).toFixed(2)
                              }}
                              Pts
                            </strong>
                          </span>
                          <span
                            v-if="match.userBet.bettingPoints"
                            class="is-itallic"
                            >{{
                              langSelected === "EN"
                                ? "exact score:"
                                : "score exact :"
                            }}
                            <strong class="has-text-contest">
                              {{
                                (
                                  (100 -
                                    Math.round(match.trending.percentage[1]) +
                                    ((100 -
                                      Math.round(
                                        match.trending.percentage[1]
                                      )) *
                                      match.userBet.bettingPoints) /
                                      100) *
                                  2
                                ).toFixed(2)
                              }}
                              Pts
                            </strong></span
                          >
                          <span v-else class="is-itallic"
                            >{{
                              langSelected === "EN"
                                ? "exact score:"
                                : "score exact :"
                            }}
                            <strong class="has-text-contest">
                              {{
                                (
                                  (100 -
                                    Math.round(match.trending.percentage[1])) *
                                  2
                                ).toFixed(2)
                              }}
                              Pts
                            </strong></span
                          >
                        </div>

                        <div
                          class="displayFlex"
                          v-if="
                            match.userBet.scoreTeam1 < match.userBet.scoreTeam2
                          "
                        >
                          <span
                            v-if="match.userBet.bettingPoints"
                            class="is-itallic"
                            >{{
                              langSelected === "EN" ? "result:" : "résultat :"
                            }}
                            <strong class="has-text-contest"
                              >{{
                                (
                                  100 - Math.round(match.trending.percentage[2])
                                ).toFixed(2)
                              }}
                              Pts
                            </strong>
                            ({{ langSelected === "EN" ? "bet:" : "mise :" }}
                            <strong class="has-text-contest">
                              +
                              {{
                                (
                                  ((100 -
                                    Math.round(match.trending.percentage[2])) *
                                    match.userBet.bettingPoints) /
                                  100
                                ).toFixed(2)
                              }}</strong
                            >)
                          </span>
                          <span v-else class="is-itallic"
                            >{{
                              langSelected === "EN" ? "result:" : "résultat :"
                            }}
                            <strong class="has-text-contest"
                              >{{
                                (
                                  100 - Math.round(match.trending.percentage[2])
                                ).toFixed(2)
                              }}
                              Pts
                            </strong>
                          </span>
                          <span
                            v-if="match.userBet.bettingPoints"
                            class="is-itallic"
                            >{{
                              langSelected === "EN"
                                ? "exact score:"
                                : "score exact :"
                            }}
                            <strong class="has-text-contest">
                              {{
                                (
                                  (100 -
                                    Math.round(match.trending.percentage[2]) +
                                    ((100 -
                                      Math.round(
                                        match.trending.percentage[2]
                                      )) *
                                      match.userBet.bettingPoints) /
                                      100) *
                                  2
                                ).toFixed(2)
                              }}
                              Pts
                            </strong></span
                          >
                          <span v-else class="is-itallic"
                            >{{
                              langSelected === "EN"
                                ? "exact score:"
                                : "score exact :"
                            }}
                            <strong class="has-text-contest">
                              {{
                                (
                                  (100 -
                                    Math.round(match.trending.percentage[2])) *
                                  2
                                ).toFixed(2)
                              }}
                              Pts
                            </strong></span
                          >
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="match.userBet.bettingPoints"
                      class="pointsContest"
                    >
                      <div @click="iWantBet(match)" class="displayFlex">
                        <span>
                          {{ langSelected === "EN" ? "bet of" : "mise de" }}
                          <strong class="has-text-contest"
                            >{{ match.userBet.bettingPoints }} pts</strong
                          >
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </span>

                        <img
                          loading="lazy"
                          class="miseLogo"
                          src="~assets/images/miseLogo.png"
                          alt="mise"
                        />
                      </div>
                    </div>
                    <!-- <strong class="has-text-blue nameClub">{{match.awayTeamName}}</strong> -->
                  </div>
                  <div
                    class="pointsContest"
                    v-else-if="
                      match.userBet && match.userBet.status != 'active'
                    "
                  >
                    <strong class="has-text-contest pointer mesPoints"
                      >{{
                        match.userBet.performancePoints.toFixed(2)
                      }}
                      pts</strong
                    >
                    <div v-if="match.userBet.bonus != true" class="scoreProno">
                      <b-tag
                        :class="{
                          'is-win':
                            match.userBet.scoreTeam1 > match.userBet.scoreTeam2,
                          'is-red':
                            match.userBet.scoreTeam1 < match.userBet.scoreTeam2,
                          'is-blueInfo':
                            match.userBet.scoreTeam1 ==
                            match.userBet.scoreTeam2,
                        }"
                        size="is-large"
                        >{{ match.userBet.scoreTeam1 }}</b-tag
                      >
                      <strong class="separatorScore">-</strong>
                      <b-tag
                        :class="{
                          'is-win':
                            match.userBet.scoreTeam1 < match.userBet.scoreTeam2,
                          'is-red':
                            match.userBet.scoreTeam1 > match.userBet.scoreTeam2,
                          'is-blueInfo':
                            match.userBet.scoreTeam1 ==
                            match.userBet.scoreTeam2,
                        }"
                        size="is-large"
                        >{{ match.userBet.scoreTeam2 }}</b-tag
                      >
                    </div>
                    <div v-else>
                      <b-tooltip
                        :label="`${
                          langSelected === 'EN'
                            ? '👏👏👏 You got the right score!'
                            : '👏👏👏 Tu as le bon score !'
                        }`"
                        position="is-left"
                        class
                        type="is-info"
                        size="is-large"
                      >
                        <img
                          loading="lazy"
                          class="oops"
                          src="~assets/images/bonus-final.png"
                          alt="bonus"
                        />
                      </b-tooltip>
                    </div>
                  </div>
                  <div
                    v-else
                    class="button is-large buttonBet"
                    type="button"
                    @click="iWantBet(match)"
                  >
                    {{ langSelected === "EN" ? "my bet" : "mon prono" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="box profile-card"
      v-if="matchList.length == 0 && loading === false"
    >
      <p class="notStart">
        {{
          langSelected === "EN"
            ? "there are no more matches to come!"
            : "il n'y a plus de matchs à venir !"
        }}
      </p>
      <p class="notStart">
        {{
          langSelected === "EN"
            ? "ready for the next round?"
            : "prêt pour le prochain round ?"
        }}
      </p>
    </div>
  </section>
</template>

<script>
import moment from "moment";
export default {
  components: {},
  data() {
    return {
      detailAvailablePoints: false,
      logoNumber: 450,
      indexSelected: "",
      total: 0,
      loading: false,
      defaultSortField: "date",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 50,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      positionTaken: false,
      modifBetId: "",
      modifBetTeam: "",
      currentInsight: "",
      availablePoints: "",
      availablePointsForBet: "",
    };
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
  },
  props: {
    matchList: Array,
    contest: "",
  },
  watch: {
    matchList: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {},
    },
  },
  methods: {
    seeLineup(event) {
      this.$emit("seeLineup", event);
    },
    result(event) {
      this.$emit("result", event);
    },
    seeStadium(event) {
      this.$emit("seeStadium", event);
    },

    ligue(ligue) {
      this.$store.commit("var/setNewValue", ligue);
      setTimeout(() => {
        this.$router.push("/leagues");
      }, 10);
    },
    bringMeToMyDashBoardResult() {
      this.$store.commit("var/bringMeToMyDashBoardResult");
      setTimeout(() => {
        this.$router.push("/mydashboard");
      }, 10);
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

    onPageChange(page) {
      this.page = page;
    },
    sortEventAsc(a, b) {
      if (new Date(a.date) < new Date(b.date)) return -1;
      if (new Date(a.date) > new Date(b.date)) return 1;
      return 0;
    },
    oops() {
      this.$buefy.dialog.alert(
        this.langSelected == "EN"
          ? "You forgot to make your prediction !!!<br> <strong>Don't miss the next one !!!</strong>"
          : "Tu as oublié de faire ton prono !!!<br> <strong>Ne rate pas le prochain !!!</strong>"
      );
    },

    iWantBet(currentInsight) {
      if (this.$auth.user && this.$auth.user._id) {
        if (
          currentInsight.status.toUpperCase() != "NS" &&
          currentInsight.status.toUpperCase() != "TBA" &&
          !currentInsight.userBet
        ) {
          this.oops();
        } else {
          this.$emit("iWantBet", currentInsight);
        }
      } else {
        this.$router.push("/signup");
      }
    },
  },
};
</script>

<style scoped>
.pronoBlock > span {
  display: flex;
  flex-direction: column;
}
.journee {
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  border-radius: 4px;
}

.is-blueInfo {
  background-color: #3273dc;
  color: #eef1f7;
  border-radius: 4px;
}

.is-blue {
  background-color: #192b41;
  color: #eef1f7;
}

.is-greyLit {
  background-color: #778899;
  color: #eef1f7;
  border-radius: 4px;

  font-size: 1.25rem;
}

.is-red {
  background-color: #eb412d;
  color: #eef1f7;
  border-radius: 4px;
}

.is-win {
  background-color: #2da94f;
  border-radius: 4px;
  color: white;
}

.is-draw {
  background-color: #3273dc;
  border-radius: 4px;
  color: white;
}

.is-loss {
  background-color: #eb412d;
  border-radius: 4px;
  color: white;
}

.notStart {
  font-size: 1.2rem;
}
.displayFlex {
  display: flex;
  flex-direction: column;
  margin: 0rem !important;
  align-items: center;
}
.displayFlex > span {
  font-style: italic;
  font-size: 0.9rem;
}
.scoreWr {
  display: flex;
  margin: 0rem !important;
  align-items: center;
  justify-content: center;
}
.scoreWr > span {
  font-style: italic;
  font-size: 0.9rem;
}

.logoNameDesk {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.mesPoints {
  font-size: 1.5rem !important;
  padding: 5px;
}

.buttonBet {
  padding-left: 30px;
  padding-right: 30px;
  font-weight: bolder;
  color: #fff;
  background-color: #ff7d00;
  box-shadow: 0 0 0 0.125em #ff7d00;
  border-color: #ff7d00;
  font-size: 1.2rem !important;
}

.buttonBet:focus,
.buttonBet:hover {
  background-color: #fff !important;
  border-color: #ff7d00 !important;
  color: #ff7d00 !important;
}

.teamNameGame {
  font-size: 1rem !important;
  color: #192b41;
  text-align: center;
  align-self: center;
}
.teamNameGame > div {
  display: flex;
  justify-content: center;
  align-self: center;
}

.oops {
  width: 105px !important;
  align-self: center;
}

.buttonBet {
  font-size: 1rem !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #eef1f7 !important;
  background-color: #ff7d00 !important;
}

.buttonBet:focus,
.buttonBet:hover {
  color: #ff7d00 !important;
  box-shadow: 0 0 0 0.125em #eef1f7 !important;
  border-color: #ff7d00 !important;
  background-color: #eef1f7 !important;
}

div {
  font-size: 1.2rem !important;
}

img {
  max-height: 64px !important;
}

.scoreProno {
  margin: 0px;
  display: flex;
  justify-content: CENTER;
}

.separatorScore {
  margin: 0px 3px;
  font-size: 1rem;
  align-self: center;
}

.box {
  padding: 0.75rem;
}

.bandB {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.2rem !important;
}

.logoligue {
  width: auto !important;
  height: 50px !important;
  margin-right: 1px;
}

.card-content {
  padding: 0rem;
}

.watchList {
  display: flex;
  flex-direction: column;
}

.timer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #ffcf00 !important;
  flex-direction: column;
  font-size: 1rem !important;
}

.timer > strong {
  align-self: flex-end;
}
.timer > div {
  align-self: flex-end;
  color: #ffcf00 !important;
  font-size: 1rem !important;
}

.timer > div > strong {
  align-self: flex-end;
}
.countdown {
  margin-bottom: 5px;
}

.has-text-yellow {
  color: #ffcf00;
}

.teamShirt {
  height: 65px !important;
  width: auto;
  margin: auto;
}

.level-item {
  display: flex;
  justify-content: CENTER;
}

.bullsAndBearsPic {
  justify-content: center;
  display: flex;
  width: 30%;
  flex-direction: column;
}

.bullsAndBears {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100% !important;
  padding: 5px;
  padding-top: 0px;
  padding-bottom: 0px;
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

.dayChampion {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  margin-left: 0;
  padding: 5px;
}

.teamNameStrong {
  align-self: center;
}

.teamNameStrong > .is-wc {
  font-size: 1.2rem !important;
}

.has-text-contest {
  font-weight: bold;
}

.scoreResultModal {
  font-size: 1.7rem !important;
}

.vs {
  height: auto;
  height: 50px;
  max-width: 55px;
  width: auto !important;
  align-self: center;
}

.bullsAndBearsPicVs {
  display: flex;
  justify-content: center;
  width: 10%;
  align-self: center;
  flex-direction: column;
}

.matchProno {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}

.is-wc {
  color: #0084a4 !important;
  font-size: 1.5rem !important;
  text-align: center !important;
  padding-left: 5px;
}

.has-text-yellow {
  color: #ffcf00 !important;
}

.forme {
  display: flex;
  margin: 5px;
  justify-content: center;
}

.is-greyLit {
  background-color: #778899;
  color: #eef1f7;
  border-radius: 4px;

  font-size: 1.25rem;
}

.is-win {
  background-color: #2da94f;
  border-radius: 4px;
  color: white;
}

.is-draw {
  background-color: #3273dc;
  border-radius: 4px;
  color: white;
}

.is-loss {
  background-color: #eb412d;
  border-radius: 4px;
  color: white;
}

.trendingWrapper {
  padding-top: 0rem;
}

div {
  font-size: 1.2rem !important;
}

.bet {
  display: flex;
  justify-content: center;
}

.has-text-centered {
  font-size: 1.2rem !important;
  vertical-align: middle !important;
}

.separatorScoreResult {
  margin: 0px 3px;
  font-size: 2.25rem;
}

.pointsContest {
  display: flex;
  margin-left: 20px;
}

.bullsAndBearsPicVs .tag {
  font-size: 1.5rem !important;
}

.miseLogo {
  width: 40px !important;
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
.is-tagContest {
  background-color: #ff7d00;
  color: #eef1f7;
  border-radius: 0px !important;
  font-size: 1rem;
}

.is-tagContestTitle {
  background-color: #eef1f7;
  color: #ff7d00;
  border-radius: 0px !important;
  font-size: 1rem;
}
.scoreResultModal {
  font-style: initial !important;
  font-weight: bold !important;
  font-size: 1.5rem !important;
  min-width: 45px;
  padding: 0 !important;
}
.pronoBlock {
  justify-content: center;
}
.modalTitleBet {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.modalTitleBetH1 {
  font-size: 1.5rem;
}
@media (max-width: 1047px) {
  .modalTitleBetH1 {
    font-size: 1.2rem;
  }

  .modalTitleBet {
    margin-bottom: 0rem !important;
  }
  .pronoBlock {
    width: 40%;
  }
  .teamNameGame {
    width: 25% !important;
    justify-content: center;
  }
  .teamShirt {
    height: 40px !important;
    width: auto !important;
    margin: auto;
  }
  .bullsAndBearsPicVSTag {
    display: flex;
    justify-content: space-around;
    font-weight: bold;
    margin-top: 0rem;
    width: 95%;
    padding: 0 10px !important;
  }
  .logoClub {
    align-self: center;
    width: 30%;
  }
  .resultWrapper {
    align-self: center;
  }
  .miseLogo {
    width: 30px !important;
  }

  .logoligue {
    height: 40px !important;
  }

  .timer {
    font-size: 0.8rem !important;
  }

  .has-text-centered {
    justify-content: center !important;
  }

  .teamNameStrong {
    width: auto;
  }

  .teamNameStrong > .is-wc {
    font-size: 0.8rem !important;
  }

  .matchProno {
    width: 100% !important;
    justify-content: space-between !important;
  }

  .separatorScoreResult {
    margin: 0px 3px;
    font-size: 1rem;
  }

  .is-greyLit {
    font-size: 0.8rem !important;
  }

  .vs {
    height: 32px !important;
  }

  .bullsAndBearsPicVs {
    width: 15%;
  }

  img {
    max-height: 42px !important;
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

  .mesPoints {
    font-size: 1.5rem !important;
    padding: 5px;
  }

  .is-large {
    font-size: 0.8rem !important;
  }

  .buttonBet {
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 0.9rem !important;
  }

  img {
    max-height: 42px !important;
  }

  div {
    font-size: 0.8rem !important;
  }
  .scoreWr > span {
    font-style: italic;
    font-size: 0.7rem;
  }
  .displayFlex > span {
    font-style: italic;
    font-size: 0.7rem;
  }

  .is-wc {
    color: #0084a4 !important;
    font-size: 0.8rem !important;
    text-align: center !important;
    padding-left: 0px;
  }
  .is-tagContest {
    background-color: #ff7d00;
    color: #eef1f7;
    border-radius: 4px !important;
    font-size: 0.7rem !important;
    width: 49%;
    display: flex;
    justify-content: center;
    height: 1.25rem;
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
  .scoreResultModal {
    font-style: initial !important;
    font-weight: bold !important;
    font-size: 1.15rem !important;
    min-width: 35px;
    padding: 0 !important;
  }
}
@media screen and (max-width: 361px) {
  .is-tagContest {
    width: 49%;
  }
  .mesPoints {
    font-size: 1.1rem !important;
  }
  .miseDet > .is-bold {
    font-size: 0.8rem !important;
  }
  .miseDet > .is-italic {
    font-size: 0.7rem !important;
  }
}
</style>
