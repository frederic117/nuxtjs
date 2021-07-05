<template>
  <section id="mainWrapper">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :canCancel="false"
    ></b-loading>
    <div class="NameContest">
      <h1 v-if="masterContest" class="has-text-contest">
        <div class="picContestDiv">
          <img
            loading="lazy"
            v-if="masterContest.image"
            class="imgCProfile"
            :src="masterContest.image"
            alt="contest"
          />
          <img
            v-else
            class="imgCProfile"
            src="https://www.footfoot.co/miseLogo.png"
            alt="contest"
          />
        </div>
        <strong
          >{{ masterContest.name }} -
          {{ langSelected === "EN" ? "Create the round" : "Créer le round" }}
          {{ masterContest.currentRound + 1 }}
          {{
            langSelected === "EN" ? "of the contest !" : "du contest !"
          }}</strong
        >
      </h1>
      <h1 v-else-if="$route.path.includes('publik')" class="has-text-contest">
        <strong>{{
          langSelected === "EN"
            ? "Create a public contest!"
            : "Crée un contest publique !"
        }}</strong>
      </h1>
      <h1 v-else class="has-text-contest">
        <strong v-if="$route.path.includes('euro')">
          {{
            langSelected === "EN"
              ? "Create your contest for Euro 2020!"
              : "Crée ton contest pour l'Euro 2020 !"
          }}
        </strong>
        <strong v-else>{{
          langSelected === "EN"
            ? "Create your contest with friends!"
            : "Crée ton contest entre amis !"
        }}</strong>
      </h1>
    </div>
    <div v-if="!signupActiv" class="mainContent">
      <article v-if="!masterContest" class="message is-warning">
        <div class="message-header">
          <p>
            {{
              langSelected === "EN"
                ? "Customize your contest"
                : "Personnalise ton contest"
            }}
          </p>
        </div>
        <div class="message-body NameContest NameContestPic">
          <div class="picContestDiv">
            <img
              loading="lazy"
              v-if="url"
              class="imgCProfile"
              :src="url"
              alt="contest"
            />
            <img
              v-else
              class="imgCProfile"
              src="https://www.footfoot.co/miseLogo.png"
              alt="contest"
            />

            <div @click="modifyPicContest" class="button">
              {{ langSelected === "EN" ? "Change" : "Changer" }}
            </div>
          </div>
          <b-field v-if="!masterContest" class="contestPerso" label>
            <b-input
              class="inputCore location"
              :placeholder="`${
                langSelected === 'EN' ? 'Name of the contest' : 'Nom du contest'
              }`"
              type="text"
              v-model="contestName"
            ></b-input>
            <div
              v-if="$route.path.includes('xxxx')"
              @click="modifyNamecontest"
              class="button modifyNamecontest"
            >
              {{ langSelected === "EN" ? "Change" : "Changer" }}
            </div>
          </b-field>
        </div>
      </article>

      <div
        v-if="!$route.path.includes('publik') && !$route.path.includes('euro')"
        class="loggiin"
      >
        <p
          :class="{ activeButton: suggestMatch == true }"
          class="button is-large buttonMatchSelection"
          type="button"
          @click="suggestMatchs()"
        >
          {{
            langSelected === "EN" ? "Suggested games" : "Suggestion de matchs"
          }}
        </p>
        &nbsp &nbsp
        <p
          :class="{ activeButton: choseMatch == true }"
          class="button is-large buttonMatchSelection"
          type="button"
          @click="iChooseMyGames()"
        >
          {{
            langSelected === "EN"
              ? "I choose the games!"
              : "Je choisis les matchs !"
          }}
        </p>
      </div>
      <br v-if="!$route.path.includes('euro')" />
      <article
        v-if="choseMatch === false && suggestMatch === true"
        class="message is-warning"
      >
        <div class="message-header">
          <p>
            {{
              langSelected === "EN" ? "Suggested games" : "Suggestion de matchs"
            }}
          </p>
        </div>
        <div class="message-body competValidate">
          <div class="matchRandom">
            <p
              class="button is-large buttonMatchSelection"
              type="button"
              @click="suggestMatchs()"
            >
              {{
                langSelected === "EN"
                  ? "Another suggestion?"
                  : "Autre suggestion ?"
              }}
            </p>
          </div>
          <p class="has-text-contest see-selection pointer">
            <strong>{{ scope.length }}</strong>
            {{
              langSelected === "EN" ? "selected matches" : "matchs sélectionnés"
            }}
          </p>
          <div v-if="matchSelection.length > 0" class="matchlist tableauMatch">
            <b-table
              class="tableauMatch NextMatchTable"
              :data="matchSelection"
              :loading="loading"
              :paginated="isPaginated"
              :per-page="perPage"
              :pagination-simple="isPaginationSimple"
              :row-class="
                (row, index) =>
                  scope.map((e) => e._id).includes(row._id) &&
                  'isContestSelected'
              "
              focusable
              :total="total"
              :mobile-cards="true"
              :striped="true"
            >
              <template slot-scope="props">
                <b-table-column
                  class="desktopOnly"
                  field="selected"
                  centered
                  label
                >
                  <b-checkbox
                    v-model="scope"
                    :native-value="props.row"
                  ></b-checkbox>
                </b-table-column>
                <b-table-column class="NextMatchWrapper" centered>
                  <div @click="selectMatch(props.row)" class="pointer journee">
                    <figure width="80" class="image pointer dayChampion">
                      <img
                        :class="{
                          invertOk:
                            Number(props.row.codeCompetitionApi) == 2 ||
                            Number(props.row.codeCompetitionApi) == 5,
                        }"
                        class="logoligue"
                        :src="
                          '/logoLigue/' + props.row.codeCompetitionApi + '.png'
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
                          langSelected === "EN" ? "game over" : "match terminé"
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
                          props.row.status.toUpperCase() != 'CANCL'
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
                          moment(props.row.date).local().format("DD-MM") +
                          " (horaire non fixé)"
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
                      <strong class="has-text-yellow">{{
                        props.row.stadium && props.row.stadium.name
                          ? props.row.stadium.name
                          : ""
                      }}</strong>
                    </div>
                  </div>
                </b-table-column>

                <b-table-column class="NextMatchWrapper" centered>
                  <div
                    @click="selectMatch(props.row)"
                    class="pointer matchProno"
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
                      <strong
                        class="teamNameStrong pointer"
                        v-if="props.row.homeTeamId.name"
                        >{{
                          langSelected === "EN"
                            ? props.row.homeTeamName
                            : props.row.homeTeamId.name
                        }}</strong
                      >
                      <strong class="teamNameStrong" v-else>{{
                        props.row.homeTeamId.shortName
                      }}</strong>
                    </div>
                    <figure class="versusFigure1">
                      <img
                        loading="lazy"
                        class="vs"
                        src="~assets/images/versus.png"
                        alt="versus"
                      />
                    </figure>
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
                      <strong
                        class="teamNameStrong pointer"
                        v-if="props.row.awayTeamId.name"
                        >{{
                          langSelected === "EN"
                            ? props.row.awayTeamName
                            : props.row.awayTeamId.name
                        }}</strong
                      >
                      <strong class="teamNameStrong" v-else>{{
                        props.row.awayTeamId.shortName
                      }}</strong>
                    </div>
                  </div>
                </b-table-column>
                <b-table-column
                  class="NextMatchWrapper desktopOnly"
                  width="200"
                  centered
                >
                  <div @click="selectMatch(props.row)" class="pointer journee">
                    <div class>
                      <strong
                        v-if="props.row.status.toUpperCase() === 'TBA'"
                        class="is-wc"
                        >{{
                          moment(props.row.date).local().format("DD-MM") +
                          " (horaire non fixé)"
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
                        v-if="
                          props.row.stadium &&
                          props.row.stadium.name &&
                          props.row.stadium.name.length > 25
                        "
                        class="has-text-yellow"
                        >{{
                          props.row.stadium.name.substring(0, 25) + "..."
                        }}</strong
                      >
                      <strong v-else class="has-text-yellow">{{
                        props.row.stadium && props.row.stadium.name
                          ? props.row.stadium.name
                          : ""
                      }}</strong>
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
                    <p>...loading</p>
                  </div>
                </section>
              </template>
            </b-table>
          </div>
        </div>
      </article>
      <article
        v-if="
          (choseMatch === true && suggestMatch === false) ||
          $route.path.includes('publik') ||
          $route.path.includes('euro')
        "
        class="message is-warning"
      >
        <div class="message-header">
          <p v-if="$route.path.includes('euro')">
            {{
              langSelected === "EN"
                ? "The matches of Euro 2020"
                : "Les matchs de l'Euro 2020"
            }}
          </p>
          <p v-else>
            {{
              langSelected === "EN"
                ? "Choose one or more competitions..."
                : "Choisis une ou plusieurs compétitions..."
            }}
          </p>
        </div>
        <div class="message-body competValidate">
          <nav v-if="!$route.path.includes('euro')" class="flag">
            <div class="euroWrapp">
              <div @click="competSelect(1326)" class="checkcompetValidate">
                <img
                  loading="lazy"
                  class="ligue-euro pointer invertOk"
                  src="/logoLigue/1326.png"
                  alt="logoEuro"
                />
                <div
                  class="checkBoxLeague"
                  :class="{ check: optionCompet[12].selected }"
                >
                  <img
                    v-if="optionCompet[12].selected"
                    class="ligue-img pointer"
                    src="~assets/images/check-blanc.png"
                    alt="logoLigue"
                  />
                </div>
              </div>
            </div>
          </nav>
          <nav v-if="!$route.path.includes('euro')" class="flag">
            <div>
              <div @click="competSelect(2)" class="checkcompetValidate">
                <img
                  loading="lazy"
                  class="ligue-img pointer invertOk"
                  src="/logoLigue/2.png"
                  alt="logoLigueChamp"
                />
                <div
                  class="checkBoxLeague"
                  :class="{ check: optionCompet[3].selected }"
                >
                  <img
                    v-if="optionCompet[3].selected"
                    class="ligue-img pointer"
                    src="~assets/images/check-blanc.png"
                    alt="logoLigue"
                  />
                </div>
              </div>
              <div @click="competSelect(5)" class="checkcompetValidate">
                <img
                  loading="lazy"
                  class="ligue-img pointer invertOk"
                  src="/logoLigue/5.png"
                  alt="logoLigueEuropa"
                />
                <div
                  class="checkBoxLeague"
                  :class="{ check: optionCompet[4].selected }"
                >
                  <img
                    v-if="optionCompet[4].selected"
                    class="ligue-img pointer"
                    src="~assets/images/check-blanc.png"
                    alt="logoLigue"
                  />
                </div>
              </div>
              <div @click="competSelect(301)" class="checkcompetValidate">
                <img
                  loading="lazy"
                  class="ligue-img pointer"
                  src="/logoLigue/301.png"
                  alt="logoLigue"
                />
                <div
                  class="checkBoxLeague"
                  :class="{ check: optionCompet[1].selected }"
                >
                  <img
                    v-if="optionCompet[1].selected"
                    class="ligue-img pointer"
                    src="~assets/images/check-blanc.png"
                    alt="logoLigue"
                  />
                </div>
              </div>
              <div @click="competSelect(8)" class="checkcompetValidate">
                <img
                  loading="lazy"
                  class="ligue-img pointer"
                  src="/logoLigue/8.png"
                  alt="logoLigue"
                />
                <div
                  class="checkBoxLeague"
                  :class="{ check: optionCompet[0].selected }"
                >
                  <img
                    v-if="optionCompet[0].selected"
                    class="ligue-img pointer"
                    src="~assets/images/check-blanc.png"
                    alt="logoLigue"
                  />
                </div>
              </div>
              <div @click="competSelect(564)" class="checkcompetValidate">
                <img
                  loading="lazy"
                  class="ligue-img pointer"
                  src="/logoLigue/564.png"
                  alt="logoLigue"
                />
                <div
                  class="checkBoxLeague"
                  :class="{ check: optionCompet[6].selected }"
                >
                  <img
                    v-if="optionCompet[6].selected"
                    class="ligue-img pointer"
                    src="~assets/images/check-blanc.png"
                    alt="logoLigue"
                  />
                </div>
              </div>
              <div @click="competSelect(384)" class="checkcompetValidate">
                <img
                  loading="lazy"
                  class="ligue-img pointer"
                  src="/logoLigue/384.png"
                  alt="logoLigue"
                />
                <div
                  class="checkBoxLeague"
                  :class="{ check: optionCompet[5].selected }"
                >
                  <img
                    v-if="optionCompet[5].selected"
                    class="ligue-img pointer"
                    src="~assets/images/check-blanc.png"
                    alt="logoLigue"
                  />
                </div>
              </div>
            </div>
            <div>
              <div @click="competSelect(82)" class="checkcompetValidate">
                <img
                  loading="lazy"
                  class="ligue-img pointer"
                  src="/logoLigue/82.png"
                  alt="logoLigue"
                />
                <div
                  class="checkBoxLeague"
                  :class="{ check: optionCompet[2].selected }"
                >
                  <img
                    v-if="optionCompet[2].selected"
                    class="ligue-img pointer"
                    src="~assets/images/check-blanc.png"
                    alt="logoLigue"
                  />
                </div>
              </div>

              <div @click="competSelect(462)" class="checkcompetValidate">
                <img
                  loading="lazy"
                  class="ligue-img pointer"
                  src="/logoLigue/462.png"
                  alt="logoLigue"
                />
                <div
                  class="checkBoxLeague"
                  :class="{ check: optionCompet[7].selected }"
                >
                  <img
                    v-if="optionCompet[7].selected"
                    class="ligue-img pointer"
                    src="~assets/images/check-blanc.png"
                    alt="logoLigue"
                  />
                </div>
              </div>
              <div @click="competSelect(307)" class="checkcompetValidate">
                <img
                  loading="lazy"
                  class="ligue-img pointer"
                  src="/logoLigue/307.png"
                  alt="logoLigue"
                />
                <div
                  class="checkBoxLeague"
                  :class="{ check: optionCompet[8].selected }"
                >
                  <img
                    v-if="optionCompet[8].selected"
                    class="ligue-img pointer"
                    src="~assets/images/check-blanc.png"
                    alt="logoLigue"
                  />
                </div>
              </div>
              <div @click="competSelect(24)" class="checkcompetValidate">
                <img
                  loading="lazy"
                  class="ligue-img pointer"
                  src="/logoLigue/24.png"
                  alt="logoLigue"
                />
                <div
                  class="checkBoxLeague"
                  :class="{ check: optionCompet[9].selected }"
                >
                  <img
                    v-if="optionCompet[9].selected"
                    class="ligue-img pointer"
                    src="~assets/images/check-blanc.png"
                    alt="logoLigue"
                  />
                </div>
              </div>
              <div @click="competSelect(570)" class="checkcompetValidate">
                <img
                  loading="lazy"
                  class="ligue-img pointer"
                  src="/logoLigue/570.png"
                  alt="logoLigue"
                />
                <div
                  class="checkBoxLeague"
                  :class="{ check: optionCompet[10].selected }"
                >
                  <img
                    v-if="optionCompet[10].selected"
                    class="ligue-img pointer"
                    src="~assets/images/check-blanc.png"
                    alt="logoLigue"
                  />
                </div>
              </div>
              <div @click="competSelect(390)" class="checkcompetValidate">
                <img
                  loading="lazy"
                  class="ligue-img pointer"
                  src="/logoLigue/390.png"
                  alt="logoLigue"
                />
                <div
                  class="checkBoxLeague"
                  :class="{ check: optionCompet[11].selected }"
                >
                  <img
                    v-if="optionCompet[11].selected"
                    class="ligue-img pointer"
                    src="~assets/images/check-blanc.png"
                    alt="logoLigue"
                  />
                </div>
              </div>
            </div>
          </nav>
          <br v-if="!$route.path.includes('euro')" />
          <p
            v-if="!$route.path.includes('publik')"
            @click="seeMatchSelection"
            class="has-text-contest see-selection pointer"
          >
            {{
              langSelected === "EN" ? "You have selected" : "Tu as sélectionné"
            }}

            <strong>{{ scope.length }}</strong
            >{{ langSelected === "EN" ? " games" : " matchs" }}
            <i>{{ langSelected === "EN" ? "(see)" : "(voir)" }} </i>
          </p>

          <div
            v-if="!$route.path.includes('publik') && matchSelection.length > 0"
            class="matchlist tableauMatch"
          >
            <b-table
              class="tableauMatch NextMatchTable"
              :data="matchSelection"
              :loading="loading"
              :paginated="isPaginated"
              :per-page="perPage"
              :pagination-simple="isPaginationSimple"
              :row-class="
                (row, index) =>
                  scope.map((e) => e._id).includes(row._id) &&
                  'isContestSelected'
              "
              focusable
              :total="total"
              :mobile-cards="true"
              :striped="true"
            >
              <template slot-scope="props">
                <b-table-column
                  class="desktopOnly"
                  field="selected"
                  centered
                  label
                >
                  <b-checkbox
                    v-model="scope"
                    :native-value="props.row"
                  ></b-checkbox>
                </b-table-column>
                <b-table-column class="NextMatchWrapper" centered>
                  <div @click="selectMatch(props.row)" class="pointer journee">
                    <figure width="80" class="image pointer dayChampion">
                      <img
                        :class="{
                          invertOk:
                            Number(props.row.codeCompetitionApi) == 2 ||
                            Number(props.row.codeCompetitionApi) == 5,
                        }"
                        class="logoligue"
                        :src="
                          '/logoLigue/' + props.row.codeCompetitionApi + '.png'
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
                          langSelected === "EN" ? "game over" : "match terminé"
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
                          props.row.status.toUpperCase() != 'CANCL'
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
                          moment(props.row.date).local().format("DD-MM") +
                          " (horaire non fixé)"
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
                      <strong class="has-text-yellow">{{
                        props.row.stadium && props.row.stadium.name
                          ? props.row.stadium.name
                          : ""
                      }}</strong>
                    </div>
                  </div>
                </b-table-column>

                <b-table-column class="NextMatchWrapper" centered>
                  <div
                    @click="selectMatch(props.row)"
                    class="pointer matchProno"
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
                      <strong
                        class="teamNameStrong pointer"
                        v-if="props.row.homeTeamId.name"
                        >{{
                          langSelected === "EN"
                            ? props.row.homeTeamName
                            : props.row.homeTeamId.name
                        }}</strong
                      >
                      <strong class="teamNameStrong" v-else>{{
                        props.row.homeTeamId.shortName
                      }}</strong>
                    </div>
                    <figure class="versusFigure1">
                      <img
                        loading="lazy"
                        class="vs"
                        src="~assets/images/versus.png"
                        alt="versus"
                      />
                    </figure>
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
                      <strong
                        class="teamNameStrong pointer"
                        v-if="props.row.awayTeamId.name"
                        >{{
                          langSelected === "EN"
                            ? props.row.awayTeamName
                            : props.row.awayTeamId.name
                        }}</strong
                      >
                      <strong class="teamNameStrong" v-else>{{
                        props.row.awayTeamId.shortName
                      }}</strong>
                    </div>
                  </div>
                </b-table-column>
                <b-table-column
                  class="NextMatchWrapper desktopOnly"
                  width="200"
                  centered
                >
                  <div @click="selectMatch(props.row)" class="journee pointer">
                    <div class>
                      <strong
                        v-if="props.row.status.toUpperCase() === 'TBA'"
                        class="is-wc"
                        >{{
                          moment(props.row.date).local().format("DD-MM") +
                          " (horaire non fixé)"
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
                        v-if="
                          props.row.stadium &&
                          props.row.stadium.name &&
                          props.row.stadium.name.length > 25
                        "
                        class="has-text-yellow"
                        >{{
                          props.row.stadium.name.substring(0, 25) + "..."
                        }}</strong
                      >
                      <strong v-else class="has-text-yellow">{{
                        props.row.stadium && props.row.stadium.name
                          ? props.row.stadium.name
                          : ""
                      }}</strong>
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
                    <p>...loading</p>
                  </div>
                </section>
              </template>
            </b-table>
          </div>
        </div>
      </article>

      <article
        class="message is-warning"
        v-if="scope.length > 0 && !$route.path.includes('publik')"
      >
        <div class="message-header">
          <p>
            {{
              langSelected === "EN"
                ? "The issue of the round:"
                : "L'enjeu du round :"
            }}
          </p>
        </div>
        <div class="message-body" v-if="scope.length > 0">
          <div class="matcheschoice">
            <strong>
              {{
                langSelected === "EN"
                  ? "Would you like to add some spice to your contest by playing footcoins (you will be able to change the stakes in each round of your contest)"
                  : "Souhaites-tu ajouter un peu de piment à ton contest en jouant des footcoins ? (tu auras la possibilité à chaque round de ton contest de modifier les enjeux)"
              }}
            </strong>
            <b-radio
              class="bRadio"
              @input="setBetValueContest"
              v-model="bet"
              native-value="oui"
            >
              {{
                langSelected === "EN"
                  ? "Yes, I want every participant in this round to play a footcoin bet."
                  : "Oui, je souhaite que chaque participant de ce round joue une mise de footcoins."
              }}

              <br />
              {{
                langSelected === "EN"
                  ? "The best predictor(s) of the round will share the prize pool."
                  : "Le ou les meilleurs pronostiqueurs du round se partageront la cagnotte constituée."
              }}

              <!--<span
								class="seePyramide pointer"
								@click="openRepartitiongain"
							>
								voir la pyramide des gains
								<i class="pointer fa fa-info-circle" aria-hidden="true"></i>
							</span>-->
            </b-radio>
            <b-radio
              class="bRadio"
              @input="setBetValueContestTonull"
              v-model="bet"
              native-value="non"
            >
              {{
                langSelected === "EN"
                  ? "No, we only play for glory."
                  : "Non, nous jouons pour la gloire seulement."
              }}
            </b-radio>
          </div>
          <div v-if="bet === 'oui'">
            <strong>
              {{
                langSelected === "EN"
                  ? "To join your contest, each player will have to participate in the amount of :"
                  : "Pour rejoindre ton contest, chaque joueur devra participer à hauteur de :"
              }}

              <div class="block footCoinSetWrap has-text-contest">
                <div>
                  <input
                    step="1"
                    @input="productAmountSet"
                    v-model="betValue"
                    class="footcoinInput"
                    type="number"
                    min="1"
                    placeholder="1"
                  />
                </div>
                <strong class="has-text-contest">FootCoins</strong>&nbsp
                <sup>
                  <i
                    @click="detailFootcoin"
                    class="pointer fa fa-info-circle"
                    aria-hidden="true"
                  ></i>
                </sup>
              </div>
            </strong>
            <br />
            <strong class="marginTop">
              {{
                langSelected === "EN"
                  ? "How many people do you want to invite to your contest?"
                  : "Combien de personnes souhaites-tu inviter dans ton contest ?"
              }}

              <div class="block footCoinSetWrap has-text-contest personContest">
                <div>
                  <input
                    step="1"
                    v-model="numberPlayers"
                    class="footcoinInput"
                    type="number"
                    min="2"
                    placeholder="1"
                  />
                </div>
              </div>
            </strong>
            <br />
            <br class="mobileOnly" />
            <div class="loggiin">
              <p
                class="button is-large buttonLogin"
                @click="openRepartitiongain"
              >
                {{
                  langSelected === "EN"
                    ? "see the earnings pyramid"
                    : "voir la pyramide des gains"
                }}
              </p>
            </div>

            <br />
            {{
              langSelected === "EN"
                ? "footfoot.co offers you a feature to facilitate the collection of the prize pool."
                : "footfoot.co te propose une fonctionnalité facilitant la collecte de la cagnotte."
            }}
            <br />
            {{
              langSelected === "EN"
                ? "The game and the creation of the prize pool are free of charge, but there is a service charge when withdrawing the footcoins."
                : "Le jeu et la constitution de la cagnotte sont gratuit, en revanche des frais de services s’appliquent au moment du retrait des footcoins."
            }}
          </div>
        </div>
      </article>

      <article
        v-if="scope.length > 0 && !$route.path.includes('publik')"
        class="message is-warning"
      >
        <div class="message-header" @click="showRules()">
          <p>
            {{
              langSelected === "EN"
                ? "Details of the rules"
                : "Détail des règles"
            }}
          </p>
          <a class="card-header-icon">
            <i v-if="isRulesActive" class="fa fa-arrow-up"></i>
            <i v-else class="fa fa-arrow-down"></i>
          </a>
        </div>
        <div v-if="isRulesActive" class="message-body">
          <h1>{{ langSelected === "EN" ? "Forecasts:" : "Pronostics :" }}</h1>

          <strong>{{
            langSelected === "EN"
              ? "How do I make my predictions?"
              : "Comment faire mes pronostics ?"
          }}</strong>
          <br />
          {{
            langSelected === "EN"
              ? "In the space dedicated to the contest, you choose the score for each of the two teams of the selected match."
              : "Dans l'espace dédié au contest, tu choisis le score pour chacune des deux équipes du match sélectionné."
          }}

          <br />
          <br />
          <strong>
            {{
              langSelected === "EN"
                ? "Why can't I see all the matches of a competition, especially the final stages (quarter-finals, semi-finals, final) at the beginning of a competition?"
                : "Pourquoi je ne vois pas tous les matchs d'une compétition notamment les phases finales (quarts de finale, demi-finales, finale) au début d'une compétition ?"
            }}
          </strong>
          <br />
          {{
            langSelected === "EN"
              ? "Unlike other sites, on footfoot.co you can only predict on the next matches of the team you know precisely. You have to wait until the end of the group matches to know the teams that will face each other in the final phase and therefore to be able to predict them."
              : "A la différence d'autres sites, on ne pronostique sur footfoot.co que sur les prochains matchs de l’équipe dont on connait précisément les protagonistes. Il faut donc attendre la fin des matchs de poule pour connaitre les équipes qui vont s'affronter dans la phase finale et donc de pouvoir les pronostiquer."
          }}

          <br />
          <br />
          <strong>
            {{
              langSelected === "EN"
                ? "Do I have to predict all the games at once?"
                : "Dois-je pronostiquer tous les matchs d'un coup ?"
            }}
          </strong>
          <br />
          {{
            langSelected === "EN"
              ? "No, you can only enter your predictions for the games you choose."
              : "Non, tu peux ne saisir tes pronostics que pour les matchs que tu choisis."
          }}

          <br />
          <br />
          <strong>
            {{
              langSelected === "EN"
                ? "How long can I predict a game?"
                : "Jusqu'à quand est-ce que je peux pronostiquer sur un match ?"
            }}
          </strong>
          <br />
          {{
            langSelected === "EN"
              ? "You can make predictions on a match at any time up until the start time of the match. However, once the time has passed, it is no longer possible to make predictions on that match."
              : "Tu peux pronostiquer sur un match à tout moment jusqu'à l'heure de début du match. En revanche, une fois l'heure dépassée, il n'est plus possible de pronostiquer sur ce match."
          }}
          <br />
          <br />
          <strong>
            {{
              langSelected === "EN"
                ? "How do the predictions for knockout matches work?"
                : "Comment fonctionnent les pronostics pour les matchs à élimination directe ?"
            }}
          </strong>
          <br />
          {{
            langSelected === "EN"
              ? "The score is predicted until the end of extra time (120 minutes). The prediction system works exactly like in a classic match except that the score is the one after 120 minutes and not 90 minutes. The number of points won does not depend on the result of the penalty shootout."
              : "On pronostique le score jusqu'au bout des prolongations (120 minutes). Le système de pronostic fonctionne exactement comme pour un match classique sauf que le score est celui au bout de 120 minutes et non 90 minutes. Le nombre de points gagnés ne dépend pas du résultat de la séance de tirs au but."
          }}

          <br />
          <br />

          <h1>
            {{
              langSelected === "EN"
                ? "Calculation of points:"
                : "Calcul des points :"
            }}
          </h1>
          <strong
            >{{
              langSelected === "EN"
                ? "How are the points earned by the predictions calculated?"
                : "Comment sont calculés les points gagnés par les pronostics ?"
            }}
            ?</strong
          >
          <br />
          {{
            langSelected === "EN"
              ? "The awarding of points depends on the percentage of predictions against you, the points are awarded according to the percentage of predictions that gave a different result from yours, among all predictions of the site."
              : "L’attribution des points dépend du pourcentage de pronostics contre toi, les points sont attribués en fonction du pourcentage de pronostics qui ont donné un résultat différent du tien, parmi tous les pronostics du site."
          }}
          <br />
          {{
            langSelected === "EN"
              ? "For example, if you made a good prediction that the home team would win, and 23% of the predictions had the same result as you, you earn 100 - 23 = 77 points."
              : "Par exemple, si tu as fait un bon prono donnant l'équipe à domicile vainqueur, et que 23% des pronostics ont donné le même résultat que toi, tu gagnes 100 - 23 = 77 points."
          }}

          <br />
          {{
            langSelected === "EN"
              ? "Wrong predictions earn 0 pts."
              : "Les mauvais pronostics rapportent 0 pts."
          }}
          <br />
          {{
            langSelected === "EN"
              ? "The exact scores are used to multiply the points obtained by two."
              : "Les scores exacts permettent de multiplier les points obtenus par deux."
          }}

          <br />
          <br />
          <strong>
            {{
              langSelected === "EN"
                ? "What is the score in overtime?"
                : "Quel est le score pris en compte en cas de prolongations ?"
            }}</strong
          >
          <br />
          {{
            langSelected === "EN"
              ? "* The score taken into account is the one at the end of the extra time."
              : "* Le score pris en compte est celui à la fin des prolongations."
          }}

          <br />
          {{
            langSelected === "EN"
              ? "* In the event of a penalty kick, the result of the match is considered a draw."
              : "* En cas de tirs au but, le résultat du match est considéré comme nul."
          }}

          <br />
          <br />
        </div>
      </article>

      <div
        v-if="scope.length > 0 && !$route.path.includes('publik')"
        class="field loggiin"
      >
        <b-switch
          @input="cgjAccepted"
          :value="false"
          type="is-success"
          v-model="isSwitched"
        >
          {{ langSelected === "EN" ? "I accept the" : "J’accepte les" }}
          <strong class="pointer" @click="disclamerModal">{{
            langSelected === "EN"
              ? "terms and conditions of the game."
              : "conditions générales du jeu."
          }}</strong>
        </b-switch>
      </div>
      <br v-if="!$route.path.includes('publik')" />

      <div
        v-if="
          bet == 'oui' && isSwitched === true && !$route.path.includes('publik')
        "
        class="loggiin"
      >
        <p class="button is-large buttonLogin" type="button" @click="submit">
          {{ langSelected === "EN" ? "PLAY" : "JOUER" }}
          {{ betValue ? betValue.toLocaleString("fr") : "" }} F$ !
        </p>
      </div>
      <div
        v-if="
          bet == 'non' && isSwitched === true && !$route.path.includes('publik')
        "
        class="loggiin"
      >
        <p
          class="button is-large buttonLogin"
          type="button"
          @click="saveCreate"
        >
          {{ langSelected === "EN" ? "PLAY!" : "JOUER !" }}
        </p>
      </div>
      <div v-if="$route.path.includes('publik')" class="loggiin">
        <p
          class="button is-large buttonLogin"
          type="button"
          @click="createApublikContest"
        >
          {{ langSelected === "EN" ? "PLAY!" : "JOUER !" }}
        </p>
      </div>

      <b-modal class="changePic" :active.sync="modifyPicContestModal">
        <div class="mediaModal">
          <div class="picContestModal">
            <h1 class="contestPic">
              {{
                langSelected === "EN"
                  ? "Change the contest picture"
                  : "Changer la photo du contest"
              }}
            </h1>
            <croppa
              v-model="imageContest"
              class="croppaContest"
              :placeholder="'Image du Contest'"
              :accept="'image/*'"
              :width="150"
              :height="150"
              :quality="1"
              :placeholder-font-size="18"
              :prevent-white-space="true"
            ></croppa>
            <div @click="okPicContest" class="button">Ok</div>
          </div>
        </div>
      </b-modal>

      <b-modal :active.sync="isDisclamerModalActive" :width="900">
        <div class="bullbearPos2">
          <div class="section1 has-text-centered">
            <img
              loading="lazy"
              class="logo-insiders"
              src="~assets/images/logo.png"
              alt="Insiders logo"
              width="350px"
            />
          </div>
          <div>
            <h1 class="has-text-centered">
              <strong
                >{{
                  langSelected === "EN"
                    ? "GENERAL CONDITIONS OF USE OF footfoot.co"
                    : "CONDITIONS GENERALES D’UTILISATION DU SITE footfoot.co"
                }}
              </strong>
            </h1>
            <h3 class="has-text-centered">
              {{
                langSelected === "EN"
                  ? "Date of the general conditions: 30/05/2020"
                  : "Date des conditions générales : 30/05/2020"
              }}
            </h3>
            <br />

            <p>
              <strong
                >{{
                  langSelected === "EN"
                    ? "General conditions of use of the site and the services offered."
                    : "Conditions générales d’utilisation du site et des services proposés."
                }}
              </strong>
              <br />
              {{
                langSelected === "EN"
                  ? "The use of the footfoot.co website implies the full acceptance of the general conditions of use described below. These conditions of use may be modified or completed at any time, so users of the footfoot.co site are invited to consult them regularly. This site is normally accessible to users at all times. However, footfoot.co may decide to interrupt the site for technical maintenance purposes, without necessarily informing users of the dates and times of the intervention beforehand. The footfoot.co website is updated regularly. In the same way, the legal mentions can be modified at any time: they are nevertheless imposed to the user who is invited to refer to them as often as possible in order to read them."
                  : "L’utilisation du site footfoot.co implique l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites. Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment, les utilisateurs du site footfoot.co sont donc invités à les consulter de manière régulière. Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par footfoot.co, sans qu'il ne soit nécessairement communiqué préalablement aux utilisateurs les dates et heures de l’intervention. Le site footfoot.co est mis à jour régulièrement. De la même façon, les mentions légales peuvent être modifiées à tout moment : elles s’imposent néanmoins à l’utilisateur qui est invité à s’y référer le plus souvent possible afin d’en prendre connaissance."
              }}
            </p>
            <br />
            <p>
              <strong>
                {{
                  langSelected === "EN"
                    ? "Description of the services provided"
                    : "Description des services fournis"
                }}</strong
              >
              <br />
              {{
                langSelected === "EN"
                  ? "The Site www.footfoot.co (hereinafter 'the Site') is an independent information site for soccer enthusiasts, providing Users (hereinafter 'the User') with a free discussion space and a tool to organize predictions between friends."
                  : "Le Site www.footfoot.co (ci-après « le Site ») est un site d'information indépendant sur s’adressant aux passionnés de football, mettant gratuitement à disposition des Utilisateurs (Ci-après Internaute ou Utilisateur) un espace de discussion et leur fourni un outil permettant d’organiser des pronostics entre amis."
              }}

              <br />
              <br />

              <span class="has-text-red">
                {{
                  langSelected === "EN"
                    ? "Under no circumstances shall the Site be considered an online gaming operator within the meaning of Law No. 2010-476 of May 12, 2010 relating to the opening up to competition and the regulation of the online gambling sector."
                    : "En aucun cas le Site ne saurait être assimilé à un opérateur de jeux en ligne au sens de la loi n° 2010-476 du 12 mai 2010 relative à l’ouverture à la concurrence et à la régulation du secteur des jeux d’argent et de hasard en ligne."
                }}
              </span>
              <br />
              <br />
              {{
                langSelected === "EN"
                  ? "footfoot.co strives to provide on the Site information as accurate as possible. However, it cannot be held responsible for omissions, inaccuracies and deficiencies in the update, whether they are of its own making or of the making of third party partners who provide it with this information. All the information indicated on the footfoot.co site is given as an indication, and is likely to evolve. Moreover, the information on the Site is not exhaustive. They are given under reserve of modifications having been made since their setting on line."
                  : "footfoot.co s’efforce de fournir sur le Site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations. Tous les informations indiquées sur le site footfoot.co sont données à titre indicatif, et sont susceptibles d’évoluer. Par ailleurs, les renseignements figurant sur le Site ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne."
              }}
            </p>
            <br />
            <p>
              <strong>
                {{
                  langSelected === "EN"
                    ? "Contractual limitations on technical data"
                    : "Limitations contractuelles sur les données techniques"
                }}
              </strong>
              <br />
              {{
                langSelected === "EN"
                  ? "The website cannot be held responsible for material damages related to the use of the site. Moreover, the user of the site undertakes to access the site using recent equipment, free of viruses and with a last generation updated browser."
                  : "Le site Internet ne pourra être tenu responsable de dommages matériels liés à l’utilisation du site. De plus, l’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis-à-jour."
              }}
            </p>
            <br />

            <p>
              <strong>
                {{
                  langSelected === "EN"
                    ? "A contract of trust between us"
                    : "Un contrat de confiance entre nous"
                }}
              </strong>
              <br />
              {{
                langSelected === "EN"
                  ? "To use footfoot.co, you must be at least 16 years old. By using the Site, Users agree to:"
                  : "Pour utiliser footfoot.co, vous devez avoir au moins 16 ans. En utilisant le Site, les Utilisateurs s’engagent :"
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "- not to commit any action that may constitute an offence, as provided for in the Act,"
                  : "- à ne commettre aucune action pouvant constituer une infraction, telle que prévue par la Loi,"
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "- not to extract or collect personal data from Users of the Site by any means whatsoever, nor to attempt to do so,"
                  : "- à ne pas extraire ou collecter des données personnelles d’Utilisateurs du Site par quelque procédé que ce soit, ni à tenter de le faire,s"
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "- to extract, record or exploit, in any way whatsoever, for any purpose other than the sole purpose of displaying during navigation on this Site, the contents of third parties subject to intellectual property rights, relating to privacy, or relating to their personal data or their right to image."
                  : "- d’extraire, d’enregistrer ou d’exploiter, de quelque manière que ce soit, à d’autres fins que l’unique affichage lors de la navigation sur le présent Site, les contenus de tiers soumis à des droits de propriété intellectuelle, relatifs à la vie privée, ou relatifs à leurs données personnelles ou leur droit à l’image."
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "- to store, distribute or publish any content that is illegal, harmful, defamatory, violent, racist, anti-Semitic, revisionist, inciting to hatred, contrary to good morals, infringing on the privacy or private rights of third parties"
                  : "- de stocker, de diffuser ou publier tout contenu illégal, préjudiciable, diffamatoire, violent, raciste, antisémite, révisionniste, incitant à la haine, contraire aux bonnes mœurs, portant atteinte à la vie privée ou aux droits privatifs de tiers."
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "- impersonate any third party and/or publish any personal information of a third party"
                  : "- d’usurper l’identité d’un tiers et/ou publier toute information personnelle d’un tiers"
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "- not to disclose to third parties their connection identifiers or any other element allowing access to the Site. In case of fraudulent connection by a third party not registered with the identifiers of a member, any damage caused by this third party will be deemed, except in cases of force majeure, to have been committed by the said member."
                  : "- à ne pas divulguer à des tiers leurs identifiants de connexion ou tout autre élément permettant l’accès au Site. En cas de connexion frauduleuse par un tiers non inscrit avec les identifiants d’un membre, tout dommage causé par ce tiers sera réputé, sauf cas de force majeure, avoir été commis par ledit membre."
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "Users are solely responsible for the content they publish on the site."
                  : "Les Utilisateurs sont seuls responsables des contenus qu’ils publient sur le site."
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "By publishing on the Site, Users acknowledge that they have all the necessary rights and authorizations to carry out their publications and accept that the latter become public and freely accessible on the Site."
                  : "En publiant sur le site, les Utilisateurs reconnaissent posséder l’ensemble des droits et autorisations nécessaires pour effectuer leurs publications et acceptent que ces dernières deviennent publiques et librement accessibles sur le Site."
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "In the event that a User violates these terms and conditions, footfoot.co reserves the right to delete any publication of a User on the Site, or even, in the case of particularly serious or repeated violations, to delete the account of the User responsible."
                  : "Dans le cas où il enfreindrait les présentes conditions générales, la société footfoot.co se réserve le droit de supprimer toute publication d’un Utilisateur sur le Site, voire, en cas d’infractions d’une particulière gravité ou répétées, de supprimer le compte de l’Utilisateur responsable."
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "A message contrary to the charter may be modified. The modification can concern a part or the totality of the message. In addition to that, the user posting a message contrary to the present charter exposes himself to a temporary banishment of the Site. During the duration of this ban the user will not be able to post any more contributions in case of simple ban, and in case of complete ban he will not be able to access the Site."
                  : "Un message contraire à la charte pourra être modifié. La modification peut concerner une partie ou la totalité du message. Outre cela, l’utilisateur postant un message contraire à la présente charte s’expose à un bannissement temporaire du Site. Durant la durée de ce bannissement l’utilisateur ne pourra plus poster de contributions en cas de bannissement simple, et en cas de bannissement complet il ne pourra plus accéder au Site."
              }}

              <br />
              {{
                langSelected === "EN"
                  ? "The Site constitutes a private place open to the public under the responsibility of footfoot.co which freely determines the modalities of functioning and use and which can thus take the necessary initiatives for the good functioning of the discussion forum."
                  : "Le Site constitue un lieu privé ouvert au public sous la responsabilité de footfoot.co qui en détermine librement les modalités de fonctionnement et d'utilisation et qui peut donc prendre les initiatives nécessaires au bon fonctionnement du forum de discussion."
              }}
            </p>
            <br />

            <p>
              <strong>
                {{
                  langSelected === "EN"
                    ? "Intellectual property and counterfeiting"
                    : "Propriété intellectuelle et contrefaçons"
                }}
              </strong>
              <br />
              {{
                langSelected === "EN"
                  ? "footfoot.co does not claim any ownership rights in the information you submit to fill out your account or through our Services. You must have the necessary rights in the information you submit to fill out your footfoot.co account or through our Services and the necessary authorization to grant the rights and licenses set forth in our Terms. Rights of footfoot.co. We own all copyrights, trademarks, domains, logos, trade dress, trade secrets, patents and other intellectual property rights associated with our Services. You may not use any of our copyrights, trademarks, domain names, logos, trade dress, patents or other intellectual property rights unless you have our express permission."
                  : "footfoot.co ne revendique aucun droit de propriété sur les informations que vous envoyez pour renseigner votre compte ou par l'intermédiaire de nos Services. Vous devez disposer des droits nécessaires sur les informations que vous envoyez pour renseigner votre compte footfoot.co ou par l'intermédiaire de nos Services et de l'autorisation requise pour octroyer les droits et licences mentionnés dans nos Conditions. Droits d’footfoot.co. Nous possédons l'ensemble des droits d'auteur et droits relatifs aux marques, aux domaines, aux logos, à la présentation, aux secrets commerciaux, aux brevets et autres droits de propriété intellectuelle associés à nos Services. Vous ne pouvez pas utiliser nos droits d'auteur et droits relatifs aux marques, aux domaines, aux logos, à la présentation et aux brevets ou nos autres droits de propriété intellectuelle, sauf si vous disposez de notre autorisation expresse."
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "In order for us to operate and provide our Services, you grant footfoot.co a worldwide, non-exclusive, royalty-free, sublicensable, and assignable license to use, reproduce, distribute, display, and exploit information (including content) that you upload, submit, store, send or receive on or through our Services, and to create derivative works therefrom. The rights you grant under this license are for the limited purpose of operating and providing our Services (e.g., to allow us to display your profile picture and status message, transmit your messages, store your messages on our servers)."
                  : "Afin que nous puissions exploiter et proposer nos Services, vous octroyez à footfoot.co une licence internationale, non exclusive, exempte de redevance, permettant l'octroi d'une sous-licence et cessible, nous autorisant à utiliser, reproduire, distribuer, afficher et exploiter les informations (y compris le contenu) que vous téléchargez, soumettez, stockez, envoyez ou recevez sur nos Services ou par leur intermédiaire, ainsi qu'à en créer des œuvres dérivées. Les droits que vous octroyez en vertu de cette licence sont destinés aux fins limitées qui sont d'exploiter et de fournir de nos Services (par exemple, pour nous permettre d'afficher votre photo de profil et votre message de statut, transmettre vos messages, stocker vos messages sur nos serveurs)."
              }}
            </p>
            <br />

            <p>
              <strong>
                {{
                  langSelected === "EN"
                    ? "Limitations of liability"
                    : "Limitations de responsabilité"
                }}
              </strong>
              <br />
              {{
                langSelected === "EN"
                  ? "Acting as a mere host, the Company footfoot.co is not responsible for the conduct of the contest. The Company footfoot.co declines any responsibility for the damage which would result from the organization of a private contest on line and the information which they contain."
                  : "N’agissant qu’en tant que simple hébergeur, la Société footfoot.co n’est pas responsable du déroulement du contest. La  Société footfoot.co décline toute responsabilité pour les dommages qui résulteraient de l’organisation d’un contest privé en ligne et des informations qu’ils contiennent."
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "The company footfoot.co is not responsible for bets, contracts, transactions concluded between users of the site."
                  : "La société footfoot.co n’est pas responsable des paris, contrats, transactions conclus entre les utilisateurs du site."
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "In the same way, footfoot.co cannot be held responsible in case of failure to deliver a prize won by a User during a private contest organized by one of the users of the site."
                  : "De la même façon, footfoot.co ne pourra être tenue pour responsable en cas de défaillance dans la remise d’un lot gagné par un Utilisateur au cours d’un contest privé organisé par l’un des utilisateurs du site."
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "In any hypothesis, the Company footfoot.co cannot be held responsible for any direct/indirect damage that they are foreseeable or not, of any loss of profits, loss of income, loss of chance, loss of data, economic or commercial loss that it is the nature undergone by a User of the Site and of the occurrence of an event of major force."
                  : "En toute hypothèse, la Société footfoot.co ne pourra être tenue pour responsable de tous dommages directs/ indirects qu’ils soient prévisibles ou non, de toutes pertes de profits, perte de revenus, perte de chance, perte de données, perte économique ou commerciale qu’elle qu’en soit la nature subie par un Utilisateur du Site et de la survenance d’un évènement de force majeur."
              }}

              <br />
              <br />
              {{
                langSelected === "EN"
                  ? "The Company footfoot.co does not guarantee in any case the accuracy, the exhaustiveness or the topicality of the contents of the Site (information, forecasts, advice,?), the whole of the data proposed by the Site being purely indicative. Therefore, the Company footfoot.co is not responsible for any omissions, alterations, errors or delays in updating this information and their possible consequences."
                  : "La Société footfoot.co ne garantit en aucun cas l’exactitude, l’exhaustivité ou l’actualité du contenu du Site (informations, pronostics, conseils, …), l’ensemble des données proposées par le Site revêtant un caractère purement indicatif. Par conséquent, la Société footfoot.co n’est pas responsable des éventuelles omissions, altérations, erreurs ou délais de mise à jour de ces informations et de leurs éventuelles conséquences."
              }}

              <br />
              <br />
              {{
                langSelected === "EN"
                  ? "In any case the Company footfoot.co could not be held responsible:"
                  : "En aucun cas la Société footfoot.co ne saurait être tenue pour responsable :"
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "- any damage resulting from computer and technical malfunction of the User, loss of access to the site caused by the failure of the electronic communication network or the access provider of the User, by maintenance operations or updates,"
                  : "- de tout dommage résultant d’un dysfonctionnement informatique et technique de l’Utilisateur, de la perte d’accès au site provoquée par la panne du réseau de communication électronique ou du fournisseur d’accès de l’Utilisateur, par des opérations de maintenance ou des mises à jour,"
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "- the loss of any data, possible fraudulent modifications of data or contributions published on the Site,"
                  : "- de la perte de toute donnée, des éventuelles modifications frauduleuses des données ou contributions publiées sur le Site,"
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "- the possible transmission of viruses or the possible risks of bugs that may occur during navigation on the Site,"
                  : "- de l’éventuelle transmission de virus ou des éventuels risques de bug pouvant survenir lors de la navigation sur le Site,"
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "- the misuse of the site by the User, any fault, omission, negligence or default of the User,"
                  : "- de la mauvaise utilisation du site par l’Utilisateur, de toute faute, omission, négligence ou défaillance de l’Utilisateur,"
              }}
              <br />
              {{
                langSelected === "EN"
                  ? "- the disclosure or unlawful use of a password given in confidence to the User,"
                  : "- de la divulgation ou de l’utilisation illicite d’un mot de passe remis de manière confidentielle à l’Utilisateur,"
              }}
            </p>
            <br />

            <div>
              <strong
                >{{
                  langSelected === "EN"
                    ? "Personal data collection"
                    : "Collecte des données personnelles"
                }}
              </strong>
              <br />
              {{
                langSelected === "EN"
                  ? "Under the General Data Protection Regulation, you are asked to give your explicit consent to the collection and processing of your personal data when using this platform."
                  : "Dans le cadre du Règlement Général sur la Protection des Données, il vous est demandé de donner votre consentement explicite à la collecte et au traitement de vos données personnelles dans le cadre de l'utilisation de cette plateforme."
              }}

              <br />
              {{
                langSelected === "EN"
                  ? "The personal data collected and their use are described below:"
                  : "Les données personnelles collectées et leur utilisation sont décrites ci-après :"
              }}
              <br />
              <ul>
                <li>
                  {{
                    langSelected === "EN"
                      ? "User ID: this user ID is free and you can choose not to match it to your real identity. In any case, this identifier can be displayed in the site or the application and is potentially visible to any other user of the platform. No specific processing is done."
                      : "Identifiant : cet identifiant est libre et vous pouvez choisir de ne pas le faire correspondre à votre identité réelle. Dans tous les cas, cet identifiant peut-être affiché dans le site ou l'application et est potentiellement visible de tout autre utilisateur de la plateforme. Aucun traitement spécifique n'est réalisé."
                  }}
                </li>
                <li>
                  {{
                    langSelected === "EN"
                      ? "Email address: your email address is used to communicate directly with you: information on the platform, password reset procedure and sending reminders of games to predict. A confirmed email address is required to use certain functions of the site or application. This information is not shared with other users of the site or with other organizations."
                      : "Adresse Mail : votre adresse mail est utilisée pour communiquer directement avec vous : informations sur la plateforme, procédure de réinitialisation de mot de passe et envoi de rappels de matchs à pronostiquer. Une adresse mail confirmée est nécessaire pour l'utilisation de certaines fonctions du site ou application. Cette information n'est en aucun cas partagée aux autres utilisateurs du site ou avec d'autres organisations."
                  }}
                </li>
                <li>
                  {{
                    langSelected === "EN"
                      ? "Profile image: this image is free and you can choose not to reflect your real identity. In any case, this image is displayed in the platform and is potentially visible to any other user of the platform. No specific processing is done."
                      : "Image de profil : cette image est libre et vous pouvez choisir de ne pas refléter votre identité réelle. Dans tous les cas, cette image est affichée dans la plateforme et est potentiellement visible de tout autre utilisateur de la plateforme. Aucun traitement spécifique n'est réalisé."
                  }}
                </li>
                <li>
                  {{
                    langSelected === "EN"
                      ? "Cell phone identifier (in the case of mobile applications): this identifier is unique and cannot be used by any other application and is therefore never communicated. It is used to send you notifications related to the use of the platform: information, prediction reminders, interactions on the discussion forums."
                      : " Identifiant de téléphone portable (dans le cas de l'utilisation des applications mobiles) : cet identifiant est unique et ne peut être utilisé par aucune autre application et n'est donc jamais communiqué. Il est utilisé pour vous envoyer des notifications liées à l'utilisation de la plateforme : informations, rappels de pronostics, interactions sur les forums de discussion."
                  }}
                </li>
                <li>
                  {{
                    langSelected === "EN"
                      ? "IP address, 'cookies' or local storage space of your browser used for :"
                      : "Adresse IP, 'cookies' ou espace de stockage local de votre navigateur utilisés à des fins :"
                  }}
                </li>
                <ul>
                  <li>
                    {{
                      langSelected === "EN"
                        ? "automatic login statistics to your account"
                        : "statistiques de connexion automatique à votre compte"
                    }}
                  </li>
                </ul>
              </ul>
            </div>
            <br />
            <p>
              <strong>
                {{
                  langSelected === "EN"
                    ? "footfoot.co in companies"
                    : "footfoot.co en entreprise"
                }}
              </strong>
              <br />
              {{
                langSelected === "EN"
                  ? "The use of the footfoot.co platform does not commit footfoot.co and the people working on the site to the success of your contest, especially in relation to the availability of the platform. The responsibility of footfoot.co and the people working on the site can in no way be engaged if the site was unavailable during the course of a contest."
                  : "L’utilisation de la plateforme footfoot.co n’engage en rien le site footfoot.co et les personnes qui travaillent sur le site sur la réussite de votre concours notamment par rapport à la disponibilité de la plateforme. La responsabilité de footfoot.co et des personnes travaillant sur le site ne pourra en aucun cas être engagée notamment si le site venait à être indisponible pendant le déroulement d’un contest."
              }}
            </p>
            <br />
            <p>
              <strong>
                {{
                  langSelected === "EN"
                    ? "Applicable law and jurisdiction"
                    : "Droit applicable et attribution de juridiction"
                }}
              </strong>
              <br />
              {{
                langSelected === "EN"
                  ? "Any dispute in connection with the use of the site footfoot.co is subject to French law. The competent courts of Paris have exclusive jurisdiction."
                  : "Tout litige en relation avec l’utilisation du site footfoot.co est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris."
              }}
            </p>
            <br />
            <p>
              <strong>{{
                langSelected === "EN" ? "Glossary" : "Lexique"
              }}</strong>
              <br />
              {{
                langSelected === "EN"
                  ? "User: Internet user connecting, using the above-mentioned site. Personal information: « information that allows, in any form whatsoever, directly or not, the identification of individuals to whom they apply » (Article 4 of Law No. 78-17 of 6 January 1978)."
                  : "Utilisateur : Internaute se connectant, utilisant le site susnommé. Informations personnelles : « les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978)."
              }}
            </p>
            <br />
          </div>
        </div>
      </b-modal>
      <b-modal
        :active.sync="seeMatchSelectionModal"
        class="seeMatchSelectionModalcss"
        :padding-top="50"
        :width="1080"
      >
        <div class>
          <article class="message is-warning">
            <div class="message-header">
              <p>
                {{
                  langSelected === "EN"
                    ? "The matches of my contest"
                    : "Les matchs de mon contest"
                }}
              </p>
            </div>
            <div class="message-body">
              <div v-if="scope.length > 0" class="matchlist tableauMatch">
                <b-table
                  class="tableauMatch NextMatchTable"
                  :data="scope"
                  :loading="loading"
                  :paginated="isPaginated"
                  :per-page="perPage"
                  :pagination-simple="isPaginationSimple"
                  :row-class="
                    (row, index) =>
                      scope.map((e) => e._id).includes(row._id) &&
                      'isContestSelected'
                  "
                  focusable
                  :total="total"
                  :mobile-cards="true"
                  :striped="true"
                >
                  <template slot-scope="props">
                    <b-table-column
                      class="desktopOnly"
                      field="selected"
                      centered
                      label
                    >
                      <b-checkbox
                        v-model="scope"
                        :native-value="props.row"
                      ></b-checkbox>
                    </b-table-column>
                    <b-table-column class="NextMatchWrapper" centered>
                      <div
                        @click="selectMatch(props.row)"
                        class="pointer journee"
                      >
                        <figure width="80" class="image pointer dayChampion">
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
                              v-else-if="
                                props.row.matchday === 'Quarter-finals'
                              "
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
                              v-else-if="
                                props.row.matchday.includes('Play-offs')
                              "
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
                            v-if="
                              props.row.status.toUpperCase() != 'AET' &&
                              props.row.status.toUpperCase() != 'FT_PEN' &&
                              props.row.status.toUpperCase() != 'NOT STARTED' &&
                              props.row.status.toUpperCase() != 'NS' &&
                              props.row.status.toUpperCase() != 'TBA' &&
                              props.row.status.toUpperCase() != 'FT' &&
                              props.row.status.toUpperCase() != 'POSTP' &&
                              props.row.status.toUpperCase() != 'CANCL'
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
                              moment(props.row.date).local().format("DD-MM") +
                              " (horaire non fixé)"
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
                          <strong class="has-text-yellow">{{
                            props.row.stadium && props.row.stadium.name
                              ? props.row.stadium.name
                              : ""
                          }}</strong>
                        </div>
                      </div>
                    </b-table-column>

                    <b-table-column class="NextMatchWrapper" centered>
                      <div
                        @click="selectMatch(props.row)"
                        class="pointer matchProno"
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
                          <strong
                            class="teamNameStrong pointer"
                            v-if="props.row.homeTeamId.name"
                            >{{
                              langSelected === "EN"
                                ? props.row.homeTeamName
                                : props.row.homeTeamId.name
                            }}</strong
                          >
                          <strong class="teamNameStrong" v-else>{{
                            props.row.homeTeamId.shortName
                          }}</strong>
                        </div>
                        <figure class="versusFigure1">
                          <img
                            loading="lazy"
                            class="vs"
                            src="~assets/images/versus.png"
                            alt="versus"
                          />
                        </figure>
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
                          <strong
                            class="teamNameStrong pointer"
                            v-if="props.row.awayTeamId.name"
                            >{{
                              langSelected === "EN"
                                ? props.row.awayTeamName
                                : props.row.awayTeamId.name
                            }}</strong
                          >
                          <strong class="teamNameStrong" v-else>{{
                            props.row.awayTeamId.shortName
                          }}</strong>
                        </div>
                      </div>
                    </b-table-column>
                    <b-table-column
                      class="NextMatchWrapper desktopOnly"
                      width="200"
                      centered
                    >
                      <div
                        @click="selectMatch(props.row)"
                        class="pointer journee"
                      >
                        <div class>
                          <strong
                            v-if="props.row.status.toUpperCase() === 'TBA'"
                            class="is-wc"
                            >{{
                              moment(props.row.date).local().format("DD-MM") +
                              " (horaire non fixé)"
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
                            v-if="
                              props.row.stadium &&
                              props.row.stadium.name &&
                              props.row.stadium.name.length > 25
                            "
                            class="has-text-yellow"
                            >{{
                              props.row.stadium.name.substring(0, 25) + "..."
                            }}</strong
                          >
                          <strong v-else class="has-text-yellow">{{
                            props.row.stadium && props.row.stadium.name
                              ? props.row.stadium.name
                              : ""
                          }}</strong>
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
                        <p>...loading</p>
                      </div>
                    </section>
                  </template>
                </b-table>
              </div>
            </div>
          </article>
          <div @click="seeMatchSelection" class="button matchSelectionOK">
            Ok
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="detailFootcoinModal">
        <detail-footcoin
          @closedetailFootcoinModal="closedetailFootcoinModal"
        ></detail-footcoin>
      </b-modal>
      <b-modal :active.sync="iwantFootcoinModal">
        <achat-footcoin
          :betValue="betValue"
          @closeAchat="closeAchat"
          class="buyFootCoinModal"
        ></achat-footcoin>
      </b-modal>
      <b-modal :active.sync="repartitiongainModal">
        <repartition-gain
          :footcoinPlayed="betValue"
          :nbrePlayers="numberPlayers"
          @closeRepartitiongain="closeRepartitiongain"
          class="repFootCoinModal"
        ></repartition-gain>
      </b-modal>
    </div>
    <div v-if="signupActiv" class="mainContent">
      <signup-page
        @signupOk="signupOk"
        :createContestinprogress="true"
      ></signup-page>
    </div>
  </section>
</template>

<script>
import {
  createPublicContest,
  getMatchsList,
  createContest,
  registerContest,
  createMatchlistContest,
  createMatchlistContestNat,
  getuserfootCoins,
  getMasterContest,
  createRound,
} from "@/server/apiContest";
import moment from "moment";

export default {
  auth: false,
  head() {
    return {
      script: [{ src: "https://js.stripe.com/v3/" }],
    };
  },
  components: {
    repartitionGain: () => import("@/components/modal/repartitionGain"),
    detailFootcoin: () => import("@/components/modal/detailFootcoin"),
    achatFootcoin: () => import("@/components/modal/achatFootcoin"),
    SignupPage: () => import("@/components/auth/SignupPage"),
  },
  data() {
    return {
      masterContest: "",
      repartitiongainModal: false,
      total: 0,
      isSwitched: false,
      isDisclamerModalActive: false,
      isRulesActive: false,
      loading: false,
      isLoading: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 800,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      matchesChoice: "all",
      bet: "oui",
      competitions: "",
      matchList: [],
      matchSelection: [],
      contestName: "",
      adminOfContest: "",
      scope: [],
      winnerRules:
        " les participants ayant le plus de points se verront créditer de leur part de la cagnotte dans leur wallet.",
      betValue: "50",
      winnerRulesModifie: "",
      contestCreation: false,
      optionCompet: [
        {
          selected: false,
          league: 8,
        },
        {
          selected: false,
          league: 301,
        },
        {
          selected: false,
          league: 82,
        },
        {
          selected: false,
          league: 2,
        },
        {
          selected: false,
          league: 5,
        },
        {
          selected: false,
          league: 384,
        },
        {
          selected: false,
          league: 564,
        },

        {
          selected: false,
          league: 462,
        },
        {
          selected: false,
          league: 307,
        },
        {
          selected: false,
          league: 24,
        },
        {
          selected: false,
          league: 570,
        },
        {
          selected: false,
          league: 390,
        },
        {
          selected: false,
          league: 1326,
        },
      ],
      imageContest: null,
      url: "",
      contest: "",
      product: {
        amount: 500,
        name: "Inscription au contest",
        description: "",
      },
      options: {
        image: "https://www.footfoot.co/miseLogo.png",
        currency: "EUR",
        locale: "fr",
        email: "",
      },
      modifyPicContestModal: false,
      choseMatch: false,
      suggestMatch: false,
      seeMatchSelectionModal: false,
      detailFootcoinModal: false,
      iwantFootcoinModal: false,
      numberPlayers: "20",
      footCoins: "",
      signupActiv: false,
    };
  },
  created() {
    if (this.$route.path.includes("euro")) {
      this.contestName = "";
      this.url = "https://www.footfoot.co/logoLigue/1326.png";
    }
  },
  mounted() {
    if (this.$route.path.includes("euro")) {
      this.contestName = "";
      this.url = "https://www.footfoot.co/logoLigue/1326.png";
      this.isLoading = true;
      createMatchlistContestNat("1326").then((matchSelection) => {
        this.isLoading = false;

        this.matchSelection = matchSelection;
        this.scope = matchSelection;
      });
    }
    if (this.$route.params.mastercontestId) {
      getMasterContest(this.$route.params.mastercontestId).then(
        (masterContest) => {
          if (!masterContest) {
            this.$router.push("/contest");
          } else {
            this.masterContest = masterContest;
            this.iChooseMyGames();
          }
        }
      );
    }
    if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
      this.options.email = this.connectedUser.email;
    }
    //  else {
    //   this.$router.push("/");
    // }
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    modifyNamecontest() {
      this.contestName = "";
    },
    iwantFootcoin() {
      this.iwantFootcoinModal = true;
    },
    closeRepartitiongain() {
      this.repartitiongainModal = false;
    },
    openRepartitiongain() {
      this.repartitiongainModal = true;
    },
    closeAchat() {
      this.iwantFootcoinModal = false;
      this.submit();
    },
    closedetailFootcoinModal() {
      this.detailFootcoinModal = false;
    },
    detailFootcoin() {
      this.detailFootcoinModal = true;
    },
    cgjAccepted() {
      if (
        Number.isInteger(Number(this.numberPlayers)) &&
        Number(this.numberPlayers) > 1
      ) {
        this.numberPlayers = Number(this.numberPlayers);
      } else {
        this.$buefy.dialog.alert("Le nombre de joueur est un entier positif");
        setTimeout(() => {
          this.isSwitched = false;
        }, 1);
      }
      if (this.bet == "oui") {
        if (
          Number.isInteger(Number(this.betValue)) &&
          Number(this.betValue) >= 1
        ) {
          this.product.amount = Number(this.betValue) * 100;
          ////Rajouté nico

          this.options.email = this.connectedUser.email;
        } else {
          this.$buefy.dialog.alert(
            "Tu ne peux miser que des nombres entier positif"
          );
          setTimeout(() => {
            this.isSwitched = false;
          }, 1);
        }
      }
    },
    createApublikContest() {
      if (this.contestName === "") {
        this.$buefy.dialog.alert(
          "Tu dois choisir un nom pour créer le contest"
        );
      } else {
        let leagues = this.optionCompet
          .filter((c) => c.selected)
          .map((m) => m.league);
        if (leagues.length > 0) {
          let publikContest = {};
          publikContest.name = this.$sanitize(this.contestName);
          publikContest.image = this.url;
          publikContest.adminOfContest =
            this.$store.state.auth.user && this.$store.state.auth.user._id;
          publikContest.isPublic = true;
          publikContest.publicContest = {
            leagues: leagues,
          };
          createPublicContest(publikContest).then((resp) => {
            this.$buefy.dialog.alert(`Contest publique crée!<br> BONS PRONOS`);
            this.$router.push("/contest/");
          });
        } else {
          this.$buefy.dialog.alert(
            "Choisis au moins une compet pour créer le contest publique"
          );
        }
      }
    },

    setBetValueContestTonull() {
      this.betValue = 0;
    },
    setBetValueContest() {
      this.betValue = "5";
      setTimeout(() => {
        this.isSwitched = false;
      }, 1);
    },
    signupOk() {
      this.signupActiv = false;
      if (this.bet) {
        this.submit();
      } else {
        this.saveCreate();
      }
    },
    submit() {
      if (this.contestName === "" && !this.masterContest) {
        this.$buefy.dialog.alert(
          `${
            this.$store.state.var.langSelected === "EN"
              ? "Choose a name to create the contest"
              : "Choisis un nom pour créer le contest"
          }`
        );
      } else if (this.scope.length === 0) {
        this.$buefy.dialog.alert(
          `${
            this.$store.state.var.langSelected === "EN"
              ? "Pick at least one game to create the contest"
              : "Choisis au moins un match pour créer le contest"
          }`
        );
      } else {
        if (!this.$auth.user || (this.$auth.user && !this.$auth.user._id)) {
          this.$buefy.dialog.alert({
            message:
              this.$store.state.var.langSelected === "EN"
                ? "All you have to do is create your footfoot account"
                : "Il ne te reste plus qu'à créer ton compte footfoot",
            confirmText: "Ok",
            type: "is-success",
            onConfirm: () => (this.signupActiv = true),
          });
        } else if (this.contestCreation === true) {
          this.$buefy.dialog.alert(
            `${
              this.$store.state.var.langSelected === "EN"
                ? "Your contest is being created"
                : "Ton contest est en cours de création"
            }`
          );
        } else {
          getuserfootCoins(this.$store.state.auth.user._id).then(
            (footCoins) => {
              this.footCoins = footCoins;
              if (footCoins >= Number(this.betValue)) {
                if (this.imageContest) {
                  this.generateImage();
                } else if (this.url) {
                  this.url = this.url;
                } else {
                  this.url = "https://www.footfoot.co/miseLogo.png";
                }
                let nbPlayersTargets = this.numberPlayer
                  ? Number(this.numberPlayer)
                  : 20;
                this.contestCreation = true;
                if (this.masterContest) {
                  createRound(
                    this.scope.map((m) => {
                      return m._id;
                    }),
                    this.winnerRules,
                    this.betValue,
                    nbPlayersTargets,
                    this.masterContest._id
                  ).then((data) => {
                    this.contest = data;
                    this.contestCreation = false;
                    registerContest(data._id).then((resp) => {
                      this.$buefy.dialog.alert(
                        `${
                          this.$store.state.var.langSelected === "EN"
                            ? "Congratulations, you are in the new round!<br> GOOD BETS"
                            : "Félicitations, tu participes au nouveau round !<br> BONS PRONOS"
                        }`
                      );

                      this.$nuxt.$emit("joinContest", this.contest);
                      this.$router.push("/contest/" + data._id);
                    });
                  });
                } else {
                  this.contestName = this.$sanitize(this.contestName);
                  createContest(
                    this.contestName,
                    this.scope.map((m) => {
                      return m._id;
                    }),
                    this.winnerRules,
                    Number(this.betValue),
                    nbPlayersTargets,
                    this.url
                  ).then((data) => {
                    this.contest = data;
                    this.contestCreation = false;
                    registerContest(this.contest._id).then((resp) => {
                      this.$buefy.dialog.alert(
                        `${
                          this.$store.state.var.langSelected === "EN"
                            ? "Congratulations, you are in the new round!<br> GOOD BETS"
                            : "Félicitations, tu participes au nouveau round !<br> BONS PRONOS"
                        }`
                      );
                      this.$nuxt.$emit("joinContest", this.contest);
                      this.$router.push("/contest/" + this.contest._id);
                    });
                  });
                }
              } else {
                this.$buefy.dialog.confirm({
                  message:
                    this.$store.state.var.langSelected === "EN"
                      ? "You don't have enough FootCoin to create this contest!"
                      : "Tu n'as pas assez de FootCoin pour créer ce contest !",

                  confirmText:
                    this.$store.state.var.langSelected === "EN"
                      ? "Buy some FootCoin"
                      : "Acheter des FootCoin",
                  cancelText:
                    this.$store.state.var.langSelected === "EN"
                      ? "Cancel"
                      : "Annuler",
                  type: "is-success",
                  onConfirm: () => (this.iwantFootcoinModal = true),
                });
              }
            }
          );
        }
      }
    },

    saveCreate() {
      if (this.contestName === "" && !this.masterContest) {
        this.$buefy.dialog.alert(
          `${
            this.$store.state.var.langSelected === "EN"
              ? "Choose a name to create the contest"
              : "Choisis un nom pour créer le contest"
          }`
        );
      } else if (this.scope.length === 0) {
        this.$buefy.dialog.alert(
          `${
            this.$store.state.var.langSelected === "EN"
              ? "Pick at least one game to create the contest"
              : "Choisis au moins un match pour créer le contest"
          }`
        );
      } else {
        if (!this.$auth.user || (this.$auth.user && !this.$auth.user._id)) {
          this.$buefy.dialog.alert({
            message:
              this.$store.state.var.langSelected === "EN"
                ? "All you have to do is create your footfoot account"
                : "Il ne te reste plus qu'à créer ton compte footfoot",
            confirmText: "Ok",
            type: "is-success",
            onConfirm: () => (this.signupActiv = true),
          });
        } else if (this.contestCreation === true) {
          this.$buefy.dialog.alert(
            `${
              this.$store.state.var.langSelected === "EN"
                ? "Your contest is being created"
                : "Ton contest est en cours de création"
            }`
          );
        } else {
          this.contestCreation = true;
          let nbPlayersTargets = this.numberPlayer
            ? Number(this.numberPlayer)
            : 20;

          if (this.bet === "non") {
            this.betValue = 0;
          }
          if (this.imageContest) {
            this.generateImage();
          } else if (this.url) {
            this.url = this.url;
          } else {
            this.url = "https://www.footfoot.co/miseLogo.png";
          }
          if (this.masterContest) {
            createRound(
              this.scope.map((m) => {
                return m._id;
              }),
              this.winnerRules,
              Number(this.betValue),
              nbPlayersTargets,
              this.masterContest._id
            ).then((data) => {
              this.contestCreation = false;
              registerContest(data._id).then((resp) => {
                this.$buefy.dialog.alert(
                  `${
                    this.$store.state.var.langSelected === "EN"
                      ? "Congratulations, you are in the new round!<br> GOOD BETS"
                      : "Félicitations, tu participes au nouveau round !<br> BONS PRONOS"
                  }`
                );

                this.$router.push("/contest/" + data._id);
              });
            });
          } else {
            this.contestName = this.$sanitize(this.contestName);
            createContest(
              this.contestName,
              this.scope.map((m) => {
                return m._id;
              }),
              this.winnerRules,
              Number(this.betValue),
              nbPlayersTargets,
              this.url
            ).then((data) => {
              this.contest = data;
              this.contestCreation = false;
              registerContest(this.contest._id).then((resp) => {
                this.$buefy.dialog.alert(
                  `${
                    this.$store.state.var.langSelected === "EN"
                      ? "Congratulations, you are in the new round!<br> GOOD BETS"
                      : "Félicitations, tu participes au nouveau round !<br> BONS PRONOS"
                  }`
                );

                this.$nuxt.$emit("joinContest", this.contest._id);
                this.$router.push("/contest/" + this.contest._id);
              });
            });
          }
        }
      }
    },
    seeMatchSelection() {
      this.seeMatchSelectionModal = !this.seeMatchSelectionModal;
    },
    suggestMatchs() {
      if (this.contestName === "" && !this.masterContest) {
        this.$buefy.dialog.alert(
          `${
            this.$store.state.var.langSelected === "EN"
              ? "Choose a name to create the contest"
              : "Choisis un nom pour créer le contest"
          }`
        );
      } else {
        this.options.email = this.connectedUser.email;
        getMatchsList().then((match) => {
          this.matchSelection = match;
          this.scope = match;
          this.matchesChoice = "all";
        });
        this.choseMatch = false;
        this.suggestMatch = true;
      }
    },
    iChooseMyGames() {
      if (this.contestName === "" && !this.masterContest) {
        this.$buefy.dialog.alert(
          `${
            this.$store.state.var.langSelected === "EN"
              ? "Choose a name to create the contest"
              : "Choisis un nom pour créer le contest"
          }`
        );
      } else {
        if (!this.$route.path.includes("publik")) {
          //	this.mountStripe();
        }
        this.options.email = this.connectedUser.email;
        this.matchSelection = [];
        this.optionCompet[0].selected = false;
        this.optionCompet[1].selected = false;
        this.optionCompet[2].selected = false;
        this.optionCompet[3].selected = false;
        this.optionCompet[4].selected = false;
        this.optionCompet[5].selected = false;
        this.optionCompet[6].selected = false;

        this.optionCompet[7].selected = false;
        this.optionCompet[8].selected = false;
        this.optionCompet[9].selected = false;
        this.optionCompet[10].selected = false;
        this.optionCompet[11].selected = false;
        this.optionCompet[12].selected = false;
        this.scope = [];
        this.choseMatch = true;
        this.suggestMatch = false;
        this.matchesChoice = "custom";
      }
    },

    modifyPicContest() {
      this.modifyPicContestModal = true;
    },
    okPicContest() {
      this.modifyPicContestModal = false;
      this.generateImage();
    },
    SignupModal() {
      this.$router.push("/signup");
    },
    LoginModal(autenticate) {
      this.$router.push("/login");
    },
    productAmountSet() {
      if (this.bet == "oui") {
        if (Number.isInteger(Number(this.betValue))) {
          this.product.amount = Number(this.betValue) * 100;
          ////Rajouté nico

          this.options.email = this.connectedUser.email;
        } else {
          this.$buefy.dialog.alert(
            `${
              this.$store.state.var.langSelected === "EN"
                ? "You can only bet on whole numbers"
                : "Tu ne peux miser que des nombres entier"
            }`
          );

          setTimeout(() => {
            this.isSwitched = false;
          }, 1);
        }
      } else {
        this.product.amount = 0;
      }
    },
    disclamerModal() {
      this.isDisclamerModalActive = true;
    },
    generateImage: function () {
      let url = this.imageContest.generateDataUrl();
      if (!url) {
        alert("no image");
        return;
      }
      this.url = url;
    },
    showRules() {
      this.isRulesActive = !this.isRulesActive;
    },

    competSelect(codeCompete) {
      switch (codeCompete) {
        case 1326:
          this.optionCompet[12].selected = !this.optionCompet[12].selected;
          createMatchlistContestNat("1326").then((matchSelection) => {
            this.matchSelection = matchSelection;
            this.scope = matchSelection;
          });
          break;
        case 8:
          this.optionCompet[0].selected = !this.optionCompet[0].selected;
          createMatchlistContest(this.optionCompet).then((matchSelection) => {
            this.matchSelection = matchSelection;
          });
          break;
        case 301:
          this.optionCompet[1].selected = !this.optionCompet[1].selected;
          createMatchlistContest(this.optionCompet).then((matchSelection) => {
            this.matchSelection = matchSelection;
          });
          break;
        case 82:
          this.optionCompet[2].selected = !this.optionCompet[2].selected;
          createMatchlistContest(this.optionCompet).then((matchSelection) => {
            this.matchSelection = matchSelection;
          });
          break;
        case 2:
          this.optionCompet[3].selected = !this.optionCompet[3].selected;
          createMatchlistContest(this.optionCompet).then((matchSelection) => {
            this.matchSelection = matchSelection;
          });
          break;
        case 5:
          this.optionCompet[4].selected = !this.optionCompet[4].selected;
          createMatchlistContest(this.optionCompet).then((matchSelection) => {
            this.matchSelection = matchSelection;
          });
          break;
        case 384:
          this.optionCompet[5].selected = !this.optionCompet[5].selected;
          createMatchlistContest(this.optionCompet).then((matchSelection) => {
            this.matchSelection = matchSelection;
          });
          break;
        case 564:
          this.optionCompet[6].selected = !this.optionCompet[6].selected;
          createMatchlistContest(this.optionCompet).then((matchSelection) => {
            this.matchSelection = matchSelection;
          });
          break;

        case 462:
          this.optionCompet[7].selected = !this.optionCompet[7].selected;
          createMatchlistContest(this.optionCompet).then((matchSelection) => {
            this.matchSelection = matchSelection;
          });
          break;
        case 307:
          this.optionCompet[8].selected = !this.optionCompet[8].selected;
          createMatchlistContest(this.optionCompet).then((matchSelection) => {
            this.matchSelection = matchSelection;
          });
          break;
        case 24:
          this.optionCompet[9].selected = !this.optionCompet[9].selected;
          createMatchlistContest(this.optionCompet).then((matchSelection) => {
            this.matchSelection = matchSelection;
          });
          break;
        case 570:
          this.optionCompet[10].selected = !this.optionCompet[10].selected;
          createMatchlistContest(this.optionCompet).then((matchSelection) => {
            this.matchSelection = matchSelection;
          });
          break;
        case 390:
          this.optionCompet[11].selected = !this.optionCompet[11].selected;
          createMatchlistContest(this.optionCompet).then((matchSelection) => {
            this.matchSelection = matchSelection;
          });
          break;
      }
    },
    allGameSelected() {
      this.scope = this.matchSelection;
    },
    noGameSelected() {
      this.scope = [];
    },

    moment: function (time) {
      return moment(time);
    },
    selectMatch(event) {
      if (this.scope.map((e) => e._id).includes(event._id)) {
        this.scope = this.scope.filter((e) => event._id != e._id);
      } else {
        this.scope.push(event);
      }
    },
  },
};
</script>
<style scoped>
.seePyramide {
  display: flex;
  align-items: center;
}
.seePyramide > .fa-info-circle {
  margin-left: 5px;
}
.competValidate {
  padding: 5px;
}
.fa-info-circle {
  color: #ff7d00;
  font-size: 1.5rem !important;
}
.footCoinSetWrap {
  display: flex;
  font-size: 1.5rem !important;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.footcoinInput {
  width: 100px;
  margin-right: 10px;
}
.matchSelectionOK {
  width: 90%;
  margin: AUTO;
  display: FLEX;
}

.picContestModal {
  background-color: #eef1f7;
  border-radius: 5px;
}

.picContestModal > .button {
  font-size: 1.2rem !important;
}

.see-selection {
  margin: auto;
  font-size: 2rem;
  margin-bottom: 1.5rem;
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
.stripeButton {
  display: FLEX;
  justify-content: CENTER;
  margin-top: 1rem;
}
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

.stripeWrap {
  display: none;
  flex-direction: column;
  width: 50%;
  margin: AUTO;
}
.loggiin {
  justify-content: center;
  display: flex;
}
.visibleStripe {
  display: flex !important;
}

.displayStripe {
  height: 5rem;
  width: 50%;
  background-color: #fff;
}

.section1 {
  padding-top: 0rem !important;
  margin-bottom: 1rem;
}

.matchRandom {
  display: FLEX;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.contestPerso {
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-self: center;
}
.modifyNamecontest {
  width: fit-content;
  align-self: flex-end;
  font-size: 1rem !important;
}
.is-checked {
  background-color: #ff7d00;
}

.imgCProfile {
  border-radius: 10% !important;
  border: 2px solid #ff7d00 !important;
  max-height: 100px !important;
  width: 100px;
  align-self: center;
  margin-bottom: 5px;
}

.checkBoxLeague {
  display: flex;
  width: 1.25em;
  height: 1.25em;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  border-radius: 3px;
  border: 2px solid #7a7a7a;
  -webkit-transition: background 150ms ease-out;
  transition: background 150ms ease-out;
  margin: auto;
  margin-top: 5px;
}

.check {
  background: #ff7d00;
  border-color: #ff7d00;
}

.versusFigure1 {
  display: flex;
}

:focus {
  outline: -webkit-focus-ring-color auto 0px;
  outline-color: -webkit-focus-ring-color;
  outline-style: auto;
  outline-width: 0px;
  outline: auto 0px;
  outline-color: #ff7d00;
}

.competValidate {
  display: flex;
  flex-direction: column;
}

.validateCompet {
  width: fit-content;
  height: 2rem;
  align-self: center;
}

textarea {
  width: 100%;
  height: 20vh;
}

.matcheschoice {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.bRadio {
  margin: 0.5rem !important;
}

.NameContest {
  display: flex;
  justify-content: center;
  margin: auto;
}

.contestPic {
  margin: auto;
}

.field:not(:last-child) {
  margin-bottom: 0rem;
}

.inputCore {
  align-self: flex-end;
  width: 100%;
  font-size: 1rem;
  color: black;
}

.buttonMatchSelection {
  min-width: 25%;
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #ff7d00 !important;
  background-color: #fff !important;
  color: #ff7d00 !important;
}

.buttonMatchSelection:focus,
.buttonMatchSelection:hover {
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #ff7d00 !important;
  background-color: #ff7d00 !important;
  color: #fff !important;
}
.activeButton {
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #ff7d00 !important;
  background-color: #ff7d00 !important;
  color: #fff !important;
}
.buttonLogin {
  min-width: 25%;
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #ff7d00 !important;
  background-color: #ff7d00 !important;
  color: #fff !important;
}

.buttonLogin:focus,
.buttonLogin:hover {
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #ff7d00 !important;
  background-color: #fff !important;
  color: #ff7d00 !important;
}

.main {
  background-color: #eef1f7;
}

.content {
  display: flex;
  flex-direction: column;
}

.is-italic {
  font-style: italic;
}

.mainContent {
  margin: 1rem 5%;
}

.message-header > p {
  font-weight: bold;
}

.message.is-warning .message-header {
  background-color: #ff7d00;
  color: #eef1f7;
}

.message.is-warning .message-body {
  border-color: #ff7d00;
  color: #192b41;
}

.modal-content {
  background-color: #fff;
  padding: 0%;
  margin: 1%;
  border-radius: 5px;
  border: solid, #192b41;
}

strong {
  color: #ff7d00;
}

li {
  list-style-type: disc;
}

.seeExemple {
  cursor: pointer;
}

.ligue-img {
  width: auto;
  max-height: 90px !important;
}
.ligue-euro {
  width: auto;
  max-height: 100px !important;
}
.trendingWrapper {
  padding-top: 0rem;
}

div {
  font-size: 1.2rem !important;
}

h1 {
  font-size: 2.2rem !important;
  padding-top: 1rem;
  padding-bottom: 1rem;
  align-self: center;
}

img {
  max-height: 64px !important;
}

.has-text-centered {
  font-size: 1rem !important;
  vertical-align: middle !important;
}

.container {
  margin-bottom: 2rem !important;
}

.flag {
  display: flex;
}
.flag > div {
  justify-content: space-around;
  display: flex;
  width: 50%;
}

.tableauMatch {
  margin: 0px !important;
  padding: 0px !important;
}

.checkcompetValidate {
  display: flex;
  flex-direction: column;
}

.checkcompetValidate > .checkbox {
  margin: auto;
  margin-top: 5px;
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

.teamNameStrong {
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

.logoligue {
  width: 40px;
  height: auto !important;
  max-height: auto !important;
}

.dayChampion {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
  margin-left: 0;
}

.mobileOnly {
  display: none;
}

.teamNameLogo {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 40%;
}

.teamNameLogo > img {
  max-height: 45px !important;
  width: auto;
  margin: auto;
}

.picContestDiv {
  display: flex;
  flex-direction: column;
}

.picContestDiv > div {
  font-size: 1rem !important;
  margin: auto;
  padding: 10px;
}

.picContestModal {
  display: flex;
  flex-direction: column;
}

.croppaContest {
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
}
.personContest {
  width: 80%;
}
.euroWrapp {
  width: 100% !important;
  justify-content: center !important;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
}
@media (max-width: 1047px) {
  .euroWrapp {
    margin-bottom: 15px;
    margin-top: 5px;
  }
  .marginTop {
    margin-top: 10px;
  }
  .personContest {
    width: 100%;
  }
  .flag {
    flex-direction: column;
  }
  .flag > div {
    margin-top: 10px;
    justify-content: space-around;
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .flag > div:last-child {
    margin-top: 25px;
  }
  .stripeWrap {
    width: 100%;
  }
  .desktopOnly {
    display: none !important;
  }

  .NextMatchWrapper {
    padding: 5px;
  }

  .message-body {
    padding: 5px;
  }

  .see-selection {
    margin: auto;
    font-size: 1rem;
  }

  .imgCProfile {
    max-height: 100px !important;
    width: 100px;
  }

  .contestPerso {
    margin-left: 0;
    width: 50%;
  }

  .competValidate {
    padding: 0;
    padding-top: 0.5em;
  }

  .inputCore {
    width: 100%;
  }

  .NameContestPic {
    justify-content: space-around !important;
  }

  .teamNameLogo > img {
    max-height: 35px !important;
    height: 35px !important;
    width: auto;
    margin: auto;
  }

  .teamNameStrong {
    width: auto;
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
    width: 25px !important;
    height: auto !important;
  }

  h1 {
    font-size: 1.5rem !important;
  }

  td {
    height: auto !important;
  }

  .vs {
    align-self: center;
    max-height: 45px !important;
  }

  .teamName {
    align-self: center;
    min-width: auto !important;
  }

  .is-large {
    font-size: 1rem !important;
  }

  .matchProno {
    max-width: 100% !important;
  }

  .displayFlex {
    display: flex;
    flex-direction: column;
  }

  .bullsAndBearsPicVs {
    width: 100%;
  }

  .is-hidden-tablet {
    display: none !important;
  }

  .ligue-img {
    max-height: 35px !important;
  }
  .ligue-euro {
    max-height: 50px !important;
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

  .navbar.is-dark {
    margin-bottom: 3% !important;
  }

  .main {
    padding: 1rem 1rem;
  }

  .mainContent {
    margin: 0.1rem 0.1rem 2rem;
  }
}
</style>
