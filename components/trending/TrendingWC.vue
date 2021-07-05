<template>
  <section class="trendingWrapper">
    <nav class="navbar is-wc">
      <div>
        <div class="babblesMenu">
          <a
            @click="phaseFinale()"
            :class="{ 'is-active': index2Selected === 'phaseFinale' }"
            class="babMenu navbar-item is-tab"
            >{{ langSelected === "EN" ? "Final Stage" : "Phase Finale" }}</a
          >
          <a
            @click="selected('groupe')"
            :class="{ 'is-active': index2Selected === 'groupe' }"
            class="babMenu navbar-item is-tab"
            >{{ langSelected === "EN" ? "Group" : "Groupe" }}</a
          >
          <a
            @click="allGames()"
            :class="{ 'is-active': index2Selected === 'matchlist' }"
            class="babMenu navbar-item is-tab"
            >{{ langSelected === "EN" ? "Group Match" : "Matchs Groupe" }}</a
          >
          <a
            @click="goal()"
            :class="{ 'is-active': index2Selected === 'goal' }"
            class="babMenu navbar-item is-tab"
            >{{ langSelected === "EN" ? "Scorers" : "Buteurs" }}</a
          >
          <a
            @click="assist()"
            :class="{ 'is-active': index2Selected === 'assist' }"
            class="babMenu navbar-item is-tab"
            >{{ langSelected === "EN" ? "Assists" : "Passeurs" }}</a
          >
          <a
            @click="card()"
            :class="{ 'is-active': index2Selected === 'card' }"
            class="babMenu navbar-item is-tab"
            >{{ langSelected === "EN" ? "Cards" : "Cartons" }}</a
          >
        </div>
      </div>
    </nav>
    <div v-if="index2Selected === 'groupe'">
      <div v-for="(group, index) in groups" :key="index">
        <h1 class="groupe has-text-bet has-text-centered">
          <strong class="has-text-bet has-text-centered">{{
            group.name
          }}</strong>
        </h1>
        <b-table
          :data="group.data.standingOp"
          :loading="loading"
          :default-sort="['position', 'desc']"
          :total="total"
          :mobile-cards="false"
          :striped="true"
        >
          <template slot-scope="props">
            <b-table-column
              label
              width="5"
              field="position"
              centered
              class="classementPoint"
            >
              <strong class="positionClass">{{
                props.row.info.position
              }}</strong>
            </b-table-column>
            <b-table-column
              field="fanion"
              class="logo"
              centered
              :label="`${langSelected === 'EN' ? 'Team' : 'Equipe'}`"
            >
              <h1 class="h1class">
                <nuxt-link
                  v-if="props.row.teamDetail[0].shortName"
                  :to="
                    '/teams/' + props.row.teamDetail[0].shortName.toLowerCase()
                  "
                  class="pointer"
                >
                  <img
                    loading="lazy"
                    class
                    :src="props.row.teamDetail[0].teamImg"
                    :alt="props.row.teamDetail[0].name"
                  />
                  <strong class>
                    <!--<span class="has-text-contest" v-if="props.row.info.result">Q&nbsp</span>-->
                    {{ props.row.teamDetail[0].name }}
                  </strong>
                </nuxt-link>
              </h1>
            </b-table-column>

            <b-table-column
              field="forme"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'Form' : 'Forme'}`"
            >
              <div class="forme" v-if="langSelected === 'EN'">
                <span
                  :class="{
                    'form is-win': props.row.info.recent_form[0] === 'W',
                    'form is-loss': props.row.info.recent_form[0] === 'L',
                    'form is-draw': props.row.info.recent_form[0] === 'D',
                  }"
                  >{{ props.row.info.recent_form[2] }}</span
                >
                <span
                  :class="{
                    'form is-win': props.row.info.recent_form[1] === 'W',
                    'form is-loss': props.row.info.recent_form[1] === 'L',
                    'form is-draw': props.row.info.recent_form[1] === 'D',
                  }"
                  >{{ props.row.info.recent_form[1] }}</span
                >
                <span
                  :class="{
                    'form is-win': props.row.info.recent_form[2] === 'W',
                    'form is-loss': props.row.info.recent_form[2] === 'L',
                    'form is-draw': props.row.info.recent_form[2] === 'D',
                  }"
                  >{{ props.row.info.recent_form[0] }}</span
                >
              </div>
              <div class="forme" v-else>
                <span
                  v-if="props.row.info.recent_form[2] === 'W'"
                  class="form is-win"
                  >{{ langSelected === "EN" ? "W" : "V" }}</span
                >
                <span
                  v-if="props.row.info.recent_form[2] === 'L'"
                  class="form is-loss"
                  >{{ langSelected === "EN" ? "L" : "D" }}</span
                >
                <span
                  v-if="props.row.info.recent_form[2] === 'D'"
                  class="form is-draw"
                  >{{ langSelected === "EN" ? "D" : "N" }}</span
                >
                <span
                  v-if="props.row.info.recent_form[1] === 'W'"
                  class="form is-win"
                  >{{ langSelected === "EN" ? "W" : "V" }}</span
                >
                <span
                  v-if="props.row.info.recent_form[1] === 'L'"
                  class="form is-loss"
                  >{{ langSelected === "EN" ? "L" : "D" }}</span
                >
                <span
                  v-if="props.row.info.recent_form[1] === 'D'"
                  class="form is-draw"
                  >{{ langSelected === "EN" ? "D" : "N" }}</span
                >
                <span
                  v-if="props.row.info.recent_form[0] === 'W'"
                  class="form is-win"
                  >{{ langSelected === "EN" ? "W" : "V" }}</span
                >
                <span
                  v-if="props.row.info.recent_form[0] === 'L'"
                  class="form is-loss"
                  >{{ langSelected === "EN" ? "L" : "D" }}</span
                >
                <span
                  v-if="props.row.info.recent_form[0] === 'D'"
                  class="form is-draw"
                  >{{ langSelected === "EN" ? "D" : "N" }}</span
                >
              </div>
            </b-table-column>
            <b-table-column
              field="points"
              numeric
              sortable
              centered
              label="pts"
            >
              <strong>{{ props.row.info.points }}</strong>
            </b-table-column>

            <b-table-column
              field="playedGames"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'P.' : 'J.'}`"
              >{{ props.row.info.overall.games_played }}</b-table-column
            >

            <b-table-column
              class="has-text-green"
              field="wins"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'W.' : 'G.'}`"
              >{{ props.row.info.overall.won }}</b-table-column
            >
            <b-table-column
              field="draws"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'D.' : 'N.'}`"
              >{{ props.row.info.overall.draw }}</b-table-column
            >
            <b-table-column
              class="has-text-red"
              field="losses"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'L.' : 'P.'}`"
              >{{ props.row.info.overall.lost }}</b-table-column
            >
            <b-table-column
              class="has-text-green"
              field="goals"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'G.f' : 'B.p'}`"
              >{{ props.row.info.overall.goals_scored }}</b-table-column
            >
            <b-table-column
              class="has-text-red"
              field="goalsAgainst"
              numeric
              sortable
              centered
              :label="`${langSelected === 'EN' ? 'G.a' : 'B.c'}`"
              >{{ props.row.info.overall.goals_against }}</b-table-column
            >
            <b-table-column
              field="goalDifference"
              numeric
              sortable
              centered
              label="Diff."
              >{{
                props.row.info.overall.goals_scored -
                props.row.info.overall.goals_against
              }}</b-table-column
            >
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

    <div class="matchlist" v-else-if="index2Selected === 'phaseFinale'">
      <div>
        <b-table
          class="NextMatchTable"
          :data="phaseFinaleMatch"
          :loading="loading"
          :paginated="isPaginated"
          :per-page="perPage"
          :pagination-simple="isPaginationSimple"
          :total="total"
          :mobile-cards="true"
          :striped="true"
          :default-sort-direction="defaultSortOrder"
          :default-sort="defaultSortField"
        >
          <template slot-scope="props">
            <b-table-column class="NextMatchWrapper firstRow" centered>
              <div class="journee">
                <figure
                  @click="ligue(props.row.codeCompetitionApi)"
                  width="80"
                  class="pointer dayChampion"
                >
                  <img
                    loading="lazy"
                    class="logoligue"
                    src="/logoLigue/WC.png"
                    alt="logoLigue"
                  />

                  <strong class="is-wc">{{
                    props.row.info.stage.data.name
                  }}</strong>
                </figure>
                <div class="mobileOnly">
                  <strong class="is-wc">{{
                    moment(
                      new Date(
                        props.row.info.time.starting_at.date +
                          "T" +
                          props.row.info.time.starting_at.time +
                          "Z"
                      ).toString()
                    )
                      .local()
                      .format("DD-MM-YYYY HH:mm")
                  }}</strong>
                  <strong class="has-text-yellow">{{
                    props.row.info.venue.data.name.indexOf("(") > -1
                      ? props.row.info.venue.data.name.substring(
                          0,
                          props.row.info.venue.data.name.indexOf("(")
                        )
                      : props.row.info.venue.data.name
                  }}</strong>
                </div>
              </div>
            </b-table-column>
            <b-table-column class="NextMatchWrapper" centered>
              <div class="matchProno">
                <div
                  v-if="props.row.homeTeam[0].shortName"
                  class="teamNameLogo"
                >
                  <nuxt-link
                    :to="
                      '/teams/' + props.row.homeTeam[0].shortName.toLowerCase()
                    "
                    class="pointer logoClub"
                  >
                    <img
                      class="pointer"
                      :src="props.row.homeTeam[0].teamImg"
                      :alt="props.row.homeTeam[0].name"
                    />
                    <strong
                      v-if="props.row.homeTeam[0].shortName"
                      class="teamNameStrong pointer"
                      @click="
                        accessTeam(
                          props.row.homeTeam[0].shortName.toLowerCase()
                        )
                      "
                      >{{ props.row.homeTeam[0].name }}</strong
                    >
                    <strong v-else class="teamNameStrong pointer">{{
                      props.row.homeTeam[0].name
                    }}</strong>
                  </nuxt-link>
                </div>
                <div v-else class="teamNameLogo">
                  <img
                    class="pointer"
                    :src="props.row.homeTeam[0].teamImg"
                    :alt="props.row.homeTeam[0].name"
                  />
                  <strong
                    v-if="props.row.homeTeam[0].shortName"
                    class="teamNameStrong pointer"
                    @click="
                      accessTeam(props.row.homeTeam[0].shortName.toLowerCase())
                    "
                    >{{ props.row.homeTeam[0].name }}</strong
                  >
                  <strong v-else class="teamNameStrong pointer">{{
                    props.row.homeTeam[0].name
                  }}</strong>
                </div>
                <span class="bullsAndBearsPicVs">
                  <b-tag
                    v-if="props.row.info.time.status === 'NS'"
                    class="is-greyLit"
                    >-</b-tag
                  >
                  <b-tag
                    v-else
                    :class="{
                      'is-green':
                        props.row.info.scores.localteam_score >
                        props.row.info.scores.visitorteam_score,
                      'is-red':
                        props.row.info.scores.localteam_score <
                        props.row.info.scores.visitorteam_score,
                      'is-blueInfo':
                        props.row.info.scores.localteam_score ==
                        props.row.info.scores.visitorteam_score,
                    }"
                    size="is-large"
                    >{{ props.row.info.scores.localteam_score }}</b-tag
                  >
                </span>
                <figure @click="result(props.row)" class="versusFigure1">
                  <img
                    loading="lazy"
                    class="vs"
                    src="~assets/images/versus.png"
                    alt="versus"
                  />
                  <span
                    @click="result(props.row)"
                    class="pointer1"
                    v-if="props.row.info.time.status != 'NS'"
                    >{{ langSelected === "EN" ? "details" : "détails" }}</span
                  >
                </figure>
                <span class="bullsAndBearsPicVs">
                  <b-tag
                    v-if="props.row.info.time.status === 'NS'"
                    class="is-greyLit"
                    >-</b-tag
                  >
                  <b-tag
                    v-else
                    :class="{
                      'is-green':
                        props.row.info.scores.localteam_score <
                        props.row.info.scores.visitorteam_score,
                      'is-red':
                        props.row.info.scores.localteam_score >
                        props.row.info.scores.visitorteam_score,
                      'is-blueInfo':
                        props.row.info.scores.localteam_score ==
                        props.row.info.scores.visitorteam_score,
                    }"
                    size="is-large"
                    >{{ props.row.info.scores.visitorteam_score }}</b-tag
                  >
                </span>
                <div
                  v-if="props.row.awayTeam[0].shortName"
                  class="teamNameLogo"
                >
                  <nuxt-link
                    :to="
                      '/teams/' + props.row.awayTeam[0].shortName.toLowerCase()
                    "
                    class="pointer logoClub"
                  >
                    <img
                      class="pointer"
                      :src="props.row.awayTeam[0].teamImg"
                      :alt="props.row.awayTeam[0].name"
                    />
                    <strong
                      v-if="props.row.awayTeam[0].shortName"
                      class="teamNameStrong pointer"
                      @click="
                        accessTeam(
                          props.row.awayTeam[0].shortName.toLowerCase()
                        )
                      "
                      >{{ props.row.awayTeam[0].name }}</strong
                    >

                    <strong v-else class="teamNameStrong pointer">{{
                      props.row.awayTeam[0].name
                    }}</strong>
                  </nuxt-link>
                </div>
              </div>
              <strong
                v-if="
                  props.row.info.scores.localteam_score ===
                    props.row.info.scores.visitorteam_score &&
                  props.row.info.time.status != 'NS'
                "
              >
                <span class="tirsAuBut">
                  <span>{{
                    langSelected === "EN" ? "Penalty shootout" : "Tirs au but"
                  }}</span>
                  <br />
                  <b-tag
                    :class="{
                      'is-green':
                        props.row.info.scores.localteam_pen_score >
                        props.row.info.scores.visitorteam_pen_score,
                      'is-red':
                        props.row.info.scores.localteam_pen_score <
                        props.row.info.scores.visitorteam_pen_score,
                    }"
                    size="is-small"
                    >{{ props.row.info.scores.localteam_pen_score }}</b-tag
                  >
                  <strong>-</strong>
                  <b-tag
                    :class="{
                      'is-green':
                        props.row.info.scores.localteam_pen_score <
                        props.row.info.scores.visitorteam_pen_score,
                      'is-red':
                        props.row.info.scores.localteam_pen_score >
                        props.row.info.scores.visitorteam_pen_score,
                    }"
                    size="is-small"
                    >{{ props.row.info.scores.visitorteam_pen_score }}</b-tag
                  >
                </span>
              </strong>
            </b-table-column>
            <b-table-column
              class="NextMatchWrapper dateStadium desktopOnly"
              centered
            >
              <div class="journee">
                <div class>
                  <strong class="is-wc">{{
                    moment(
                      new Date(
                        props.row.info.time.starting_at.date +
                          "T" +
                          props.row.info.time.starting_at.time +
                          "Z"
                      ).toString()
                    )
                      .local()
                      .format("DD-MM-YYYY HH:mm")
                  }}</strong>
                  <br />
                  <strong class="has-text-yellow">{{
                    props.row.info.venue.data.name.indexOf("(") > -1
                      ? props.row.info.venue.data.name.substring(
                          0,
                          props.row.info.venue.data.name.indexOf("(")
                        )
                      : props.row.info.venue.data.name
                  }}</strong>
                </div>
              </div>
            </b-table-column>
            <!-- <b-table-column field='competition' centered label="">
                  <div class="journée">
                      <strong>({{props.row.info.stage.data.name}})</strong>
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
                <p>...loading</p>
              </div>
            </section>
          </template>
        </b-table>
      </div>
    </div>
    <div class="matchlist" v-else-if="index2Selected === 'goal'">
      <buteurs-WC :goals="goals"></buteurs-WC>
    </div>

    <div class="matchlist" v-else-if="index2Selected === 'assist'">
      <passeurs-WC :assists="assists"></passeurs-WC>
    </div>

    <div class="matchlist" v-else-if="index2Selected === 'card'">
      <cards-WC :cards="cards"></cards-WC>
    </div>

    <div class="matchlist" v-else>
      <div v-for="(matchList, index) in matchLists" :key="index">
        <h1 class="groupe has-text-bet has-text-centered">
          <strong class="has-text-bet has-text-centered">{{
            matchList.name
          }}</strong>
        </h1>
        <b-table
          class="NextMatchTable"
          :data="matchList.data"
          :loading="loading"
          :paginated="isPaginated"
          :per-page="perPage"
          :pagination-simple="isPaginationSimple"
          :total="total"
          :mobile-cards="true"
          :striped="true"
          :default-sort-direction="defaultSortOrder"
          :default-sort="defaultSortField"
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
                    loading="lazy"
                    class="logoligue"
                    src="/logoLigue/WC.png"
                    alt="logoLigue"
                  />
                </figure>
                <div class="mobileOnly">
                  <strong
                    v-if="
                      props.row.info.time.status.toUpperCase() === 'FT' ||
                      props.row.info.time.status.toUpperCase() === 'AET' ||
                      props.row.info.time.status.toUpperCase() === 'FT_PEN'
                    "
                    class="is-wc"
                    >{{
                      moment(props.row.info.time.starting_at.date_time)
                        .local()
                        .format("DD-MM-YY HH:mm")
                    }}</strong
                  >
                  <strong
                    v-if="
                      props.row.info.time.status.toUpperCase() != 'AET' &&
                      props.row.info.time.status.toUpperCase() != 'FT_PEN' &&
                      props.row.info.time.status.toUpperCase() !=
                        'NOT STARTED' &&
                      props.row.info.time.status.toUpperCase() != 'NS' &&
                      props.row.info.time.status.toUpperCase() != 'TBA' &&
                      props.row.info.time.status.toUpperCase() != 'FT' &&
                      props.row.info.time.status.toUpperCase() != 'POSTP' &&
                      props.row.info.time.status.toUpperCase() != 'CANCL'
                    "
                    class="is-wc"
                    >{{
                      langSelected === "EN"
                        ? "game in progress"
                        : "match en cours"
                    }}</strong
                  >
                  <strong
                    v-if="props.row.info.time.status.toUpperCase() === 'TBA'"
                    class="is-wc"
                    >{{
                      moment(props.row.info.time.starting_at.date_time)
                        .local()
                        .format("DD-MM-YY") + " (horaire non fixé)"
                    }}</strong
                  >
                  <strong
                    v-if="
                      props.row.info.time.status.toUpperCase() === 'NS' ||
                      props.row.info.time.status.toUpperCase() === 'NOT STARTED'
                    "
                    class="is-wc"
                    >{{
                      moment(props.row.info.time.starting_at.date_time)
                        .local()
                        .format("DD-MM-YY HH:mm")
                    }}</strong
                  >

                  <strong class="has-text-yellow">{{
                    props.row.info.venue.data.name
                  }}</strong>
                </div>
              </div>
            </b-table-column>
            <b-table-column class="NextMatchWrapper" centered>
              <div class="matchProno">
                <div
                  v-if="props.row.homeTeam[0].shortName"
                  class="teamNameLogo"
                >
                  <nuxt-link
                    :to="
                      '/teams/' + props.row.homeTeam[0].shortName.toLowerCase()
                    "
                    class="pointer logoClub"
                  >
                    <img
                      class="pointer"
                      :src="props.row.homeTeam[0].teamImg"
                      :alt="props.row.homeTeam[0].name"
                    />
                    <strong
                      v-if="props.row.homeTeam[0].shortName"
                      class="teamNameStrong pointer"
                      @click="
                        accessTeam(
                          props.row.homeTeam[0].shortName.toLowerCase()
                        )
                      "
                      >{{ props.row.homeTeam[0].name }}</strong
                    >
                    <strong v-else class="teamNameStrong pointer">{{
                      props.row.homeTeam[0].name
                    }}</strong>
                  </nuxt-link>
                </div>
                <div v-else class="teamNameLogo">
                  <img
                    class="pointer"
                    :src="props.row.homeTeam[0].teamImg"
                    :alt="props.row.homeTeam[0].name"
                  />
                  <strong
                    v-if="props.row.homeTeam[0].shortName"
                    class="teamNameStrong pointer"
                    @click="
                      accessTeam(props.row.homeTeam[0].shortName.toLowerCase())
                    "
                    >{{ props.row.homeTeam[0].name }}</strong
                  >
                  <strong v-else class="teamNameStrong pointer">{{
                    props.row.homeTeam[0].name
                  }}</strong>
                </div>
                <span class="bullsAndBearsPicVs">
                  <b-tag
                    v-if="props.row.info.time.status === 'NS'"
                    class="is-greyLit"
                    >-</b-tag
                  >
                  <b-tag
                    v-else
                    :class="{
                      'is-green':
                        props.row.info.scores.localteam_score >
                        props.row.info.scores.visitorteam_score,
                      'is-red':
                        props.row.info.scores.localteam_score <
                        props.row.info.scores.visitorteam_score,
                      'is-blueInfo':
                        props.row.info.scores.localteam_score ==
                        props.row.info.scores.visitorteam_score,
                    }"
                    size="is-large"
                    >{{ props.row.info.scores.localteam_score }}</b-tag
                  >
                </span>
                <figure @click="result(props.row)" class="versusFigure1">
                  <img
                    loading="lazy"
                    class="vs"
                    src="~assets/images/versus.png"
                    alt="versus"
                  />
                  <span
                    @click="result(props.row)"
                    class="pointer1"
                    v-if="props.row.info.time.status != 'NS'"
                    >{{ langSelected === "EN" ? "details" : "détails" }}</span
                  >
                </figure>
                <span class="bullsAndBearsPicVs">
                  <b-tag
                    v-if="props.row.info.time.status === 'NS'"
                    class="is-greyLit"
                    >-</b-tag
                  >
                  <b-tag
                    v-else
                    :class="{
                      'is-green':
                        props.row.info.scores.localteam_score <
                        props.row.info.scores.visitorteam_score,
                      'is-red':
                        props.row.info.scores.localteam_score >
                        props.row.info.scores.visitorteam_score,
                      'is-blueInfo':
                        props.row.info.scores.localteam_score ==
                        props.row.info.scores.visitorteam_score,
                    }"
                    size="is-large"
                    >{{ props.row.info.scores.visitorteam_score }}</b-tag
                  >
                </span>
                <div
                  v-if="props.row.awayTeam[0].shortName"
                  class="teamNameLogo"
                >
                  <nuxt-link
                    :to="
                      '/teams/' + props.row.awayTeam[0].shortName.toLowerCase()
                    "
                    class="pointer logoClub"
                  >
                    <img
                      class="pointer"
                      :src="props.row.awayTeam[0].teamImg"
                      :alt="props.row.awayTeam[0].name"
                    />
                    <strong
                      v-if="props.row.awayTeam[0].shortName"
                      class="teamNameStrong pointer"
                      @click="
                        accessTeam(
                          props.row.awayTeam[0].shortName.toLowerCase()
                        )
                      "
                      >{{ props.row.awayTeam[0].name }}</strong
                    >

                    <strong v-else class="teamNameStrong pointer">{{
                      props.row.awayTeam[0].name
                    }}</strong>
                  </nuxt-link>
                </div>
                <div v-else class="teamNameLogo">
                  <img
                    class="pointer"
                    :src="props.row.awayTeam[0].teamImg"
                    :alt="props.row.awayTeam[0].name"
                  />
                  <strong
                    v-if="props.row.awayTeam[0].shortName"
                    class="teamNameStrong pointer"
                    @click="
                      accessTeam(props.row.awayTeam[0].shortName.toLowerCase())
                    "
                    >{{ props.row.awayTeam[0].name }}</strong
                  >

                  <strong v-else class="teamNameStrong pointer">{{
                    props.row.awayTeam[0].name
                  }}</strong>
                </div>
              </div>
            </b-table-column>
            <b-table-column
              class="NextMatchWrapper dateStadium desktopOnly"
              centered
            >
              <div class="journee">
                <div class>
                  <strong
                    v-if="
                      props.row.info.time.status.toUpperCase() === 'FT' ||
                      props.row.info.time.status.toUpperCase() === 'AET' ||
                      props.row.info.time.status.toUpperCase() === 'FT_PEN'
                    "
                    class="is-wc"
                    >{{
                      moment(props.row.info.time.starting_at.date_time)
                        .local()
                        .format("DD-MM-YY HH:mm")
                    }}</strong
                  >
                  <strong
                    v-if="
                      props.row.info.time.status.toUpperCase() != 'AET' &&
                      props.row.info.time.status.toUpperCase() != 'FT_PEN' &&
                      props.row.info.time.status.toUpperCase() !=
                        'NOT STARTED' &&
                      props.row.info.time.status.toUpperCase() != 'NS' &&
                      props.row.info.time.status.toUpperCase() != 'TBA' &&
                      props.row.info.time.status.toUpperCase() != 'FT' &&
                      props.row.info.time.status.toUpperCase() != 'POSTP' &&
                      props.row.info.time.status.toUpperCase() != 'CANCL'
                    "
                    class="is-wc"
                    >{{
                      langSelected === "EN"
                        ? "game in progress"
                        : "match en cours"
                    }}</strong
                  >
                  <strong
                    v-if="props.row.info.time.status.toUpperCase() === 'TBA'"
                    class="is-wc"
                    >{{
                      moment(props.row.info.time.starting_at.date_time)
                        .local()
                        .format("DD-MM") + " (horaire non fixé)"
                    }}</strong
                  >
                  <strong
                    v-if="
                      props.row.info.time.status.toUpperCase() === 'NS' ||
                      props.row.info.time.status.toUpperCase() === 'NOT STARTED'
                    "
                    class="is-wc"
                    >{{
                      moment(props.row.info.time.starting_at.date_time)
                        .local()
                        .format("DD-MM-YY HH:mm")
                    }}</strong
                  >
                  <br />
                  <strong class="has-text-yellow">{{
                    props.row.info.venue.data.name
                  }}</strong>
                </div>
              </div>
            </b-table-column>
            <!-- <b-table-column field='competition' centered label="">
                  <div class="journée">
                      <strong>({{props.row.info.stage.data.name}})</strong>
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
                <p>...loading</p>
              </div>
            </section>
          </template>
        </b-table>
      </div>
    </div>

    <div v-if="resultat">
      <b-modal :active.sync="resultatModal">
        <div class="mediaModalBet">
          <h1 class="modalTitleBet">
            <strong class="modalTitleBetH1 has-text-contest">Résultat</strong>
            <br />
          </h1>
          <b-field>
            <div class="modalBetWrapper">
              <div id="bullsAndBearsModal">
                <div class="BBull">
                  <div class="teamNameLogo">
                    <img
                      loading="lazy"
                      class="pointer"
                      :src="resultat.homeTeam[0].teamImg"
                      :alt="resultat.homeTeam[0].name"
                    />
                  </div>
                  <strong class="teamNameGame"
                    >#{{ resultat.homeTeam[0].name }}</strong
                  >
                </div>
                <b-tag
                  class="scoreResultModal"
                  :class="{
                    'is-green':
                      resultat.info.scores.localteam_score >
                      resultat.info.scores.visitorteam_score,
                    'is-red':
                      resultat.info.scores.localteam_score <
                      resultat.info.scores.visitorteam_score,
                    'is-info':
                      resultat.info.scores.localteam_score ===
                      resultat.info.scores.visitorteam_score,
                  }"
                  size="is-large"
                  >{{
                    resultat.info.scores.localteam_score
                      .toString()
                      .replace(" ", "")
                  }}</b-tag
                >

                <strong class="separatorScoreResult">-</strong>

                <b-tag
                  class="scoreResultModal"
                  :class="{
                    'is-green':
                      resultat.info.scores.localteam_score <
                      resultat.info.scores.visitorteam_score,
                    'is-red':
                      resultat.info.scores.localteam_score >
                      resultat.info.scores.visitorteam_score,
                    'is-info':
                      resultat.info.scores.localteam_score ===
                      resultat.info.scores.visitorteam_score,
                  }"
                  size="is-large"
                  >{{
                    resultat.info.scores.visitorteam_score
                      .toString()
                      .replace(" ", "")
                  }}</b-tag
                >
                <div class="BBull">
                  <div class="teamNameLogo">
                    <img
                      loading="lazy"
                      class="pointer"
                      :src="resultat.awayTeam[0].teamImg"
                      :alt="resultat.awayTeam[0].name"
                    />
                  </div>
                  <strong class="teamNameGame"
                    >#{{ resultat.awayTeam[0].name }}</strong
                  >
                </div>
              </div>
              <div class="pronoPlayer">
                <div class="goals-panel" v-if="resultat.info.events">
                  <div
                    v-for="(event, index) in resultat.info.events.data"
                    :key="index"
                  >
                    <span
                      class="goalshome"
                      v-if="
                        event.type.toUpperCase() === 'GOAL' &&
                        resultat.homeTeam[0].id_sportmonks == event.team_id
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
                        resultat.homeTeam[0].id_sportmonks == event.team_id
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
                        resultat.homeTeam[0].id_sportmonks == event.team_id
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
                        resultat.homeTeam[0].id_sportmonks == event.team_id
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
                        resultat.homeTeam[0].id_sportmonks == event.team_id
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
                        resultat.homeTeam[0].id_sportmonks == event.team_id
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
                        resultat.homeTeam[0].id_sportmonks == event.team_id
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
                        resultat.homeTeam[0].id_sportmonks == event.team_id
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
                <div class="goals-panel" v-if="resultat.info.events">
                  <div
                    v-for="(event, index) in resultat.info.events.data"
                    :key="index"
                  >
                    <span
                      class="goalsaway"
                      v-if="
                        event.type.toUpperCase() === 'GOAL' &&
                        resultat.awayTeam[0].id_sportmonks == event.team_id
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
                        resultat.awayTeam[0].id_sportmonks == event.team_id
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
                        resultat.awayTeam[0].id_sportmonks == event.team_id
                      "
                    >
                      ⚽&nbsp
                      <p class="has-text-yellow">{{ event.minute }}"</p>
                      &nbsp
                      <strong>{{ event.player_name }}</strong>
                      <span>(pen)</span>
                    </span>
                    <span
                      class="goalsaway"
                      v-if="
                        event.type.toUpperCase() === 'MISSED_PENALTY' &&
                        resultat.awayTeam[0].id_sportmonks == event.team_id
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
                      <span>(pen)</span>
                    </span>
                    <span
                      class="goalsaway"
                      v-if="
                        event.type.toUpperCase() === 'YELLOWCARD' &&
                        resultat.awayTeam[0].id_sportmonks == event.team_id
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
                        resultat.awayTeam[0].id_sportmonks == event.team_id
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
                        resultat.awayTeam[0].id_sportmonks == event.team_id
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
                        resultat.awayTeam[0].id_sportmonks == event.team_id
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
              <div
                v-if="
                  resultat.info.scores.localteam_score ===
                    resultat.info.scores.visitorteam_score &&
                  resultat.info.time.status === 'FT_PEN'
                "
              >
                <hr />
                <strong class="penSeance">{{
                  langSelected === "EN" ? "Penalty shootout" : "Tirs au but"
                }}</strong>
                <div class="pronoPlayer">
                  <div class="goals-panel" v-if="resultat.info.events">
                    <div
                      v-for="(event, index) in resultat.info.events.data"
                      :key="index"
                    >
                      <span
                        class="goalshome"
                        v-if="
                          event.type === 'pen_shootout_goal' &&
                          resultat.homeTeam[0].id_sportmonks == event.team_id
                        "
                      >
                        ⚽&nbsp &nbsp
                        <strong>{{ event.player_name }}</strong>
                      </span>

                      <span
                        class="goalshome"
                        v-if="
                          event.type === 'pen_shootout_miss' &&
                          resultat.homeTeam[0].id_sportmonks == event.team_id
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
                  <div class="goals-panel" v-if="resultat.info.events">
                    <div
                      v-for="(event, index) in resultat.info.events.data"
                      :key="index"
                    >
                      <span
                        class="goalsaway"
                        v-if="
                          event.type === 'pen_shootout_goal' &&
                          resultat.awayTeam[0].id_sportmonks == event.team_id
                        "
                      >
                        ⚽&nbsp &nbsp
                        <strong>{{ event.player_name }}</strong>
                      </span>

                      <span
                        class="goalsaway"
                        v-if="
                          event.type === 'pen_shootout_miss' &&
                          resultat.awayTeam[0].id_sportmonks == event.team_id
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
          </b-field>
        </div>
      </b-modal>
    </div>
  </section>
</template>

<script>
import { getCompet } from "@/server/apiTrending";
import { getMatchList } from "@/server/apiTrending";
import moment from "moment";
export default {
  auth: false,
  components: {
    resultatModal: () => import("@/components/modal/resultatModal"),
    stadiumModal: () => import("@/components/modal/stadiumModal"),
    ButeursWC: () => import("@/components/trending/WC/ButeursWC"),
    PasseursWC: () => import("@/components/trending/WC/PasseursWC"),
    CardsWC: () => import("@/components/trending/WC/CardsWC"),
  },
  data() {
    return {
      index2Selected: "",
      total: 0,
      loading: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 7,
      perPage: 4,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      groups: [],
      matchLists: [],
      phaseFinaleMatch: [],
      compet: "",
      resultatModal: false,
      resultat: "",
      goals: [],
      assists: [],
      cards: [],
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
    accessTeam(event) {
      this.$router.push("/teams/" + event);
    },
    result(resultat) {
      let sortEventAsc = function (a, b) {
        if (a.minute < b.minute) return -1;
        if (a.minute > b.minute) return 1;
        if (a.minute == b.minute && a.extra_minute > b.extra_minute) return 1;
        if (a.minute == b.minute && a.extra_minute < b.extra_minute) return -1;
        return 0;
      };
      let eventSorted = resultat.info.events.data.sort(sortEventAsc);
      this.resultat = resultat;
      resultat.info.events.data = eventSorted;
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
    moment: function (time) {
      return moment(time);
    },
    SignupModal() {
      this.$router.push("/signup");
    },
    LoginModal(autenticate) {
      this.$router.push("/login");
    },

    goal() {
      this.index2Selected = "goal";
      this.goals = this.compet.goalRanking;
    },
    assist() {
      this.index2Selected = "assist";
      this.assists = this.compet.assistRanking;
    },
    card() {
      this.index2Selected = "box";
      this.cards = this.compet.cardRanking;
    },
    selected(champSelected) {
      this.index2Selected = "groupe";
      this.loading = true;
      (this.defaultSortField = "points"),
        (this.perPage = 4),
        (this.isPaginated = false),
        (this.groups = [
          {
            name: "Groupe A",
            data: this.compet.classement.filter((gr) => {
              return gr.nameGrp === "Group A";
            })[0],
          },
          {
            name: "Groupe B",
            data: this.compet.classement.filter((gr) => {
              return gr.nameGrp === "Group B";
            })[0],
          },
          {
            name: "Groupe C",
            data: this.compet.classement.filter((gr) => {
              return gr.nameGrp === "Group C";
            })[0],
          },
          {
            name: "Groupe D",
            data: this.compet.classement.filter((gr) => {
              return gr.nameGrp === "Group D";
            })[0],
          },
          {
            name: "Groupe E",
            data: this.compet.classement.filter((gr) => {
              return gr.nameGrp === "Group E";
            })[0],
          },
          {
            name: "Groupe F",
            data: this.compet.classement.filter((gr) => {
              return gr.nameGrp === "Group F";
            })[0],
          },
          {
            name: "Groupe G",
            data: this.compet.classement.filter((gr) => {
              return gr.nameGrp === "Group G";
            })[0],
          },
          {
            name: "Groupe H",
            data: this.compet.classement.filter((gr) => {
              return gr.nameGrp === "Group H";
            })[0],
          },
        ]);
      this.loading = false;
    },
    allGames() {
      this.index2Selected = "matchlist";
      this.loading = true;
      this.isPaginated = false;
      this.perPage = 100;
      this.defaultSortField = "date";
      this.matchLists = [
        {
          name: "Groupe A",
          data: this.compet.matchList
            .filter((gr) => {
              return gr.namePhase === "Group Stage";
            })[0]
            .fixtureOp.filter((gr) => {
              return gr.info.group_id == "185";
            }),
        },
        {
          name: "Groupe B",
          data: this.compet.matchList
            .filter((gr) => {
              return gr.namePhase === "Group Stage";
            })[0]
            .fixtureOp.filter((gr) => {
              return gr.info.group_id == "186";
            }),
        },
        {
          name: "Groupe C",
          data: this.compet.matchList
            .filter((gr) => {
              return gr.namePhase === "Group Stage";
            })[0]
            .fixtureOp.filter((gr) => {
              return gr.info.group_id == "187";
            }),
        },
        {
          name: "Groupe D",
          data: this.compet.matchList
            .filter((gr) => {
              return gr.namePhase === "Group Stage";
            })[0]
            .fixtureOp.filter((gr) => {
              return gr.info.group_id == "188";
            }),
        },
        {
          name: "Groupe E",
          data: this.compet.matchList
            .filter((gr) => {
              return gr.namePhase === "Group Stage";
            })[0]
            .fixtureOp.filter((gr) => {
              return gr.info.group_id == "189";
            }),
        },
        {
          name: "Groupe F",
          data: this.compet.matchList
            .filter((gr) => {
              return gr.namePhase === "Group Stage";
            })[0]
            .fixtureOp.filter((gr) => {
              return gr.info.group_id == "190";
            }),
        },
        {
          name: "Groupe G",
          data: this.compet.matchList
            .filter((gr) => {
              return gr.namePhase === "Group Stage";
            })[0]
            .fixtureOp.filter((gr) => {
              return gr.info.group_id == "191";
            }),
        },
        {
          name: "Groupe H",
          data: this.compet.matchList
            .filter((gr) => {
              return gr.namePhase === "Group Stage";
            })[0]
            .fixtureOp.filter((gr) => {
              return gr.info.group_id == "192";
            }),
        },
      ];
      this.loading = false;
    },
    phaseFinale() {
      this.index2Selected = "phaseFinale";

      this.isPaginated = false;
      this.perPage = 100;
      this.paginationSimple = false;
      this.defaultSortField = "date";
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
    this.loading = true;
    this.index2Selected = "phaseFinale";
    getCompet("WC").then((compet) => {
      let phaseFinaleMatch = compet.matchList
        .filter((gr) => {
          return gr.namePhase === "8th Finals";
        })[0]
        .fixtureOp.concat(
          compet.matchList
            .filter((gr) => {
              return gr.namePhase === "Quarter-finals";
            })[0]
            .fixtureOp.concat(
              compet.matchList
                .filter((gr) => {
                  return gr.namePhase === "Semi-finals";
                })[0]
                .fixtureOp.concat(
                  compet.matchList
                    .filter((gr) => {
                      return gr.namePhase === "3rd Place Final";
                    })[0]
                    .fixtureOp.concat(
                      compet.matchList.filter((gr) => {
                        return gr.namePhase === "Final";
                      })[0].fixtureOp
                    )
                )
            )
        );
      let phaseFinaleMatchSorted = phaseFinaleMatch.sort(this.sortByDateAsc);
      this.compet = compet;
      this.isPaginated = false;
      this.perPage = 100;
      this.paginationSimple = false;
      this.defaultSortField = "date";
      this.phaseFinaleMatch = phaseFinaleMatchSorted;
      this.loading = false;
    });
  },
};
</script> 


<style scoped>
.h1class > .pointer {
  display: flex;
  flex-direction: column;
}

.h1class {
  padding-top: 0rem !important;
}
.firstRow {
  width: 15%;
}
.dayChampion {
  display: flex;
  justify-content: center;
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

.classementPoint {
  padding: 0px !important;
}

.dateStadium {
  width: 20%;
}
.babMenu {
  font-size: 1.2rem;
  color: lightgrey !important;
}

.tirsAuBut {
  align-self: center;
}
.teamNameLogo {
  width: 30%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.penSeance {
  display: flex;
  justify-content: center;
}
.teamNameStrong {
  align-self: center;
}
.logoClub {
  align-self: center;
  display: flex;
  flex-direction: column;
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
.b-table {
  border: solid;
  border-color: #0084a4 !important;
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
img {
  max-height: 64px !important;
  width: 64px;
  margin: auto;
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

.mobileNav {
  display: none;
}
.desktopNav {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.logoligue {
  width: 64px;
}
.mobileOnly {
  display: none;
}
.cardRefer {
  width: auto !important;
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
  .babMenu {
    font-size: 0.9rem;
  }
  .navbar-item.is-tab.is-active {
    font-size: 0.9rem;
  }

  .pointer1 {
    cursor: pointer;
    font-size: 0.7rem !important;
    font-style: italic !important;
    color: #192b41 !important;
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
    width: 42px;
  }
  .teamNameLogo > img {
    max-height: 55px !important;
    height: 55px;
    width: auto;
    margin: auto;
  }
  .logoClub > img {
    max-height: 45px !important;
    height: 45px !important;
    width: auto;
    margin: auto;
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
  .h1class > .pointer > strong {
    font-size: 0.8rem;
  }
}
</style>


