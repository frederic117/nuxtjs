<template>
  <section v-if="$auth.user && $auth.user._id" class>
    <div class="NameContest">
      <h1 class="has-text-contest">
        <strong
          >{{ masterContest.name }} - Créer le round
          {{ masterContest.currentRound + 1 }} du contest !</strong
        >
      </h1>
    </div>
    <div class="mainContent">
      <article class="message is-warning">
        <div class="message-header">
          <p>Personnaliser le round</p>
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

            <div @click="modifyPicContest" class="button">Changer</div>
          </div>
          <!-- <b-field class="contestPerso" label="">
              <b-input class="inputCore location" placeholder="Nom du contest" type="text" v-model="contestName"></b-input>
					</b-field>-->
        </div>
      </article>
      <div class="loggiin">
        <p
          class="button is-large buttonMatchSelection"
          type="button"
          @click="suggestMatchs()"
        >
          Suggestion de matchs
        </p>
        &nbsp &nbsp
        <p
          class="button is-large buttonMatchSelection"
          type="button"
          @click="iChooseMyGames()"
        >
          Je choisis les matchs !
        </p>
      </div>
      <br />
      <article
        v-if="choseMatch === false && suggestMatch === true"
        class="message is-warning"
      >
        <div class="message-header">
          <p>Suggestion de matchs</p>
        </div>
        <div class="message-body competValidate">
          <div class="matchRandom">
            <p
              class="button is-large buttonMatchSelection"
              type="button"
              @click="suggestMatchs()"
            >
              Autre suggestion ?
            </p>
          </div>
          <p class="has-text-contest see-selection pointer">
            <strong>{{ scope.length }}</strong> matchs sélectionnés
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
                          invertOk: props.row.codeCompetitionApi == 2,
                          invertOk: props.row.codeCompetitionApi == 5,
                        }"
                        class="logoligue"
                        :src="
                          '/logoLigue/' + props.row.codeCompetitionApi + '.png'
                        "
                        alt="logoLigue"
                      />
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
                        v-if="props.row.stadium.length > 25"
                        class="has-text-yellow"
                        >{{
                          props.row.stadium.substring(0, 25) + "..."
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
        v-if="choseMatch === true && suggestMatch === false"
        class="message is-warning"
      >
        <div class="message-header">
          <p>Choisissez une ou plusieurs compétitions...</p>
        </div>
        <div class="message-body competValidate">
          <nav class="flag">
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
          </nav>
          <br />
          <p
            @click="seeMatchSelection"
            class="has-text-contest see-selection pointer"
          >
            Vous avez sélectionné&nbsp
            <strong>{{ scope.length }}</strong> matchs
            <i>(voir)</i>
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
                          invertOk: props.row.codeCompetitionApi == 2,
                          invertOk: props.row.codeCompetitionApi == 5,
                        }"
                        class="logoligue"
                        :src="
                          '/logoLigue/' + props.row.codeCompetitionApi + '.png'
                        "
                        alt="logoLigue"
                      />
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
                          props.row.status.toUpperCase() != 'NOT STARTED' &&
                          props.row.status.toUpperCase() != 'NS' &&
                          props.row.status.toUpperCase() != 'TBA' &&
                          props.row.status.toUpperCase() != 'FT'
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
                        v-if="props.row.stadium.length > 25"
                        class="has-text-yellow"
                        >{{
                          props.row.stadium.substring(0, 25) + "..."
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

      <article class="message is-warning" v-if="scope.length > 0">
        <div class="message-header">
          <p>L'enjeu de mon contest :</p>
        </div>
        <div class="message-body" v-if="scope.length > 0">
          <div class="matcheschoice">
            <b-radio
              class="bRadio"
              @input="setBetValueContest"
              v-model="bet"
              native-value="oui"
              >Oui, je souhaite constituer une cagnotte à partager entre les
              vainqueurs du contest.</b-radio
            >
            <b-radio
              class="bRadio"
              @input="setBetValueContestTonull"
              v-model="bet"
              native-value="non"
              >Non, nous jouons pour la gloire seulement.</b-radio
            >
          </div>
          <div v-if="bet === 'oui'">
            <strong>
              Pour rejoindre ton contest, chaque joueur devra participer à
              hauteur de
              <strong class="has-text-contest">5 €</strong>.
            </strong>
            <br />
            <!--<b-select @input="productAmountSet" v-model="betValue" placeholder="choisir une mise">
                            <option value="5">5 €</option>
                            <option value="10">10 €</option>
                            <option value="20">20 €</option>
                            <option value="50">50 €</option>
                            <option value="100">100 €</option>
                            <option value="500">500 €</option>
						</b-select>-->
            <br />footfoot.co te propose une fonctionnalité facilitant la
            collecte de la cagnotte. <br />Ce service est payant pour chaque
            utilisateur.
            <!--<strong
							class="pointer"
							@click="seeFees"
						>(voir détail)</strong>.-->
            <br />A la fin du contest,
            <strong>{{ winnerRules }}</strong>
          </div>
        </div>
      </article>

      <article v-if="scope.length > 0" class="message is-warning">
        <div class="message-header" @click="showRules()">
          <p>Détail des règles</p>
          <a class="card-header-icon">
            <i v-if="isRulesActive" class="fa fa-arrow-up"></i>
            <i v-else class="fa fa-arrow-down"></i>
          </a>
        </div>
        <div v-if="isRulesActive" class="message-body">
          <h1>Pronostics :</h1>

          <strong>Comment faire mes pronostics ?</strong>
          <br />Sur la page de chaque équipe vous avez la possibilité de prendre
          position sur le prochain match, en définissant le score pour chacune
          des deux équipes du match sélectionné.
          <br />
          <br />
          <strong
            >Pourquoi je ne vois pas tous les matchs d'une compétition notamment
            les phases finales (quarts de finale, demi-finales, finale) au début
            d'une compétition ?</strong
          >
          <br />A la différence d'autres sites, on ne pronostique sur
          footfoot.co que sur les prochains matchs de l’équipe dont on connait
          précisément les protagonistes. Il faut donc attendre la fin des matchs
          de poule pour connaitre les équipes qui vont s'affronter dans la phase
          finale et donc de pouvoir les pronostiquer.
          <br />
          <br />
          <strong>Dois-je pronostiquer tous les matchs d'un coup ?</strong>
          <br />Non, vous pouvez ne saisir vos pronostics que pour les matchs
          que vous choisissez.
          <br />
          <br />
          <strong
            >Jusqu'à quand est-ce que je peux pronostiquer sur un match
            ?</strong
          >
          <br />Vous pouvez pronostiquer sur un match à tout moment jusqu'à
          l'heure de début du match. En revanche, une fois l'heure dépassée, il
          ne vous est plus possible de pronostiquer sur ce match.
          <br />
          <br />
          <strong
            >Comment fonctionnent les pronostics pour les matchs à élimination
            directe ?</strong
          >
          <br />On pronostique le score jusqu'au bout des prolongations (120
          minutes). le système de pronostic fonctionne exactement comme pour un
          match classique sauf que le score est celui au bout de 120 minutes et
          non 90 minutes. Le nombre de points gagnés ne dépend pas du résultat
          de la séance de tirs au but.
          <br />
          <br />

          <h1>Calcul des points :</h1>
          <strong
            >Comment sont calculés les points gagnés par les pronostics
            ?</strong
          >
          <br />L’attribution des points dépend du pourcentage de pronostics
          contre vous, les points sont attribués en fonction du pourcentage de
          pronostics qui ont donné un résultat différent du vôtre, parmi tous
          les pronostics du site. <br />Par exemple, si vous avez fait un bon
          pronostic donnant l'équipe à domicile vainqueur, et que 23% des
          pronostics ont donné le même résultat que vous, vous gagnez 100 - 23 =
          77 points. <br />Les mauvais pronostics ne sont pas comptabilisés.
          <br />Les scores exacts permettent de multiplier les points obtenus
          par deux.
          <br />
          <br />
          <strong
            >Quel est le score pris en compte en cas de prolongations ?</strong
          >
          <br />* Sur les championnats et les concours pour lesquels la fin du
          match est réglée sur "Temps réglementaire", le score pris en compte
          est celui à la 90e minute. En cas de prolongations, le résultat du
          match est considéré comme nul. <br />* Sur les coupes et les tournois,
          si le paramètre "Fin du match" du concours est réglé sur
          "Prolongations", le score pris en compte est celui à la 120e minute.
          En cas de tirs au but, le résultat du match est considéré comme nul.
          <br />
          <br />
        </div>
      </article>

      <div v-if="scope.length > 0" class="field loggiin">
        <b-switch :value="false" type="is-success" v-model="isSwitched">
          J’accepte les
          <strong class="pointer" @click="disclamerModal"
            >conditions générales du jeu.</strong
          >
        </b-switch>
      </div>
      <br />
      <div
        :class="{
          loggiin: scope.length > 0 && bet == 'oui' && isSwitched === true,
        }"
        class="stripeWrap"
      >
        <label>Informations de paiement</label>
        <div ref="card"></div>
        <div v-if="completeCardOk" class="stripeButton">
          <button class="button is-large buttonLogin" v-on:click="submit">
            JOUER !
          </button>
        </div>
      </div>
      <div v-if="bet == 'non' && isSwitched === true" class="loggiin">
        <p
          class="button is-large buttonLogin"
          type="button"
          @click="saveCreate"
        >
          JOUER !
        </p>
      </div>

      <b-modal class="changePic" :active.sync="modifyPicContestModal">
        <div class="mediaModal">
          <div class="picContestModal">
            <h1 class="contestPic">Changer la photo du contest</h1>
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
      <b-modal :active.sync="activeModal" :padding-top="50" :width="640">
        <div class>
          <article class="message is-warning">
            <div class="message-header">
              <p>Tariffication du service de collecte de la cagnotte.</p>
            </div>
            <div class="message-body">
              <b-table :data="tarif" :striped="true">
                <template slot-scope="tarif">
                  <b-table-column centered label="Montant parcipation">{{
                    tarif.row.montant
                  }}</b-table-column>
                  <b-table-column centered label="Frais de service">{{
                    tarif.row.commission
                  }}</b-table-column>
                </template>
              </b-table>
            </div>
          </article>
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
                >CONDITIONS GENERALES D’UTILISATION DU SITE footfoot.co</strong
              >
            </h1>
            <h3 class="has-text-centered">
              Date des conditions générales : 30/05/2020
            </h3>
            <br />

            <p>
              <strong
                >Conditions générales d’utilisation du site et des services
                proposés.</strong
              >
              <br />L’utilisation du site footfoot.co implique l’acceptation
              pleine et entière des conditions générales d’utilisation ci-après
              décrites. Ces conditions d’utilisation sont susceptibles d’être
              modifiées ou complétées à tout moment, les utilisateurs du site
              footfoot.co sont donc invités à les consulter de manière
              régulière. Ce site est normalement accessible à tout moment aux
              utilisateurs. Une interruption pour raison de maintenance
              technique peut être toutefois décidée par footfoot.co, sans qu'il
              ne soit nécessairement communiqué préalablement aux utilisateurs
              les dates et heures de l’intervention. Le site footfoot.co est mis
              à jour régulièrement. De la même façon, les mentions légales
              peuvent être modifiées à tout moment : elles s’imposent néanmoins
              à l’utilisateur qui est invité à s’y référer le plus souvent
              possible afin d’en prendre connaissance.
            </p>
            <br />
            <p>
              <strong>Description des services fournis</strong>
              <br />Le Site www.footfoot.co (ci-après « le Site ») est un site
              d'information indépendant sur s’adressant aux passionnés de
              football, mettant gratuitement à disposition des Utilisateurs
              (Ci-après Internaute ou Utilisateur) un espace de discussion et
              leur fourni un outil permettant d’organiser des pronostics entre
              amis.
              <br />
              <br />

              <span class="has-text-red"
                >En aucun cas le Site ne saurait être assimilé à un opérateur de
                jeux en ligne au sens de la loi n° 2010-476 du 12 mai 2010
                relative à l’ouverture à la concurrence et à la régulation du
                secteur des jeux d’argent et de hasard en ligne.</span
              >
              <br />
              <br />footfoot.co s’efforce de fournir sur le Site des
              informations aussi précises que possible. Toutefois, il ne pourra
              être tenu responsable des omissions, des inexactitudes et des
              carences dans la mise à jour, qu’elles soient de son fait ou du
              fait des tiers partenaires qui lui fournissent ces informations.
              Tous les informations indiquées sur le site footfoot.co sont
              données à titre indicatif, et sont susceptibles d’évoluer. Par
              ailleurs, les renseignements figurant sur le Site ne sont pas
              exhaustifs. Ils sont donnés sous réserve de modifications ayant
              été apportées depuis leur mise en ligne.
            </p>
            <br />
            <p>
              <strong
                >Limitations contractuelles sur les données techniques</strong
              >
              <br />Le site Internet ne pourra être tenu responsable de dommages
              matériels liés à l’utilisation du site. De plus, l’utilisateur du
              site s’engage à accéder au site en utilisant un matériel récent,
              ne contenant pas de virus et avec un navigateur de dernière
              génération mis-à-jour.
            </p>
            <br />

            <p>
              <strong>Un contrat de confiance entre nous</strong>
              <br />Pour utiliser footfoot.co, vous devez avoir au moins 16
              ans.E n utilisant le Site, les Utilisateurs s’engagent : <br />- à
              ne commettre aucune action pouvant constituer une infraction,
              telle que prévue par la Loi, <br />- à ne pas extraire ou
              collecter des données personnelles d’Utilisateurs du Site par
              quelque procédé que ce soit, ni à tenter de le faire, <br />-
              d’extraire, d’enregistrer ou d’exploiter, de quelque manière que
              ce soit, à d’autres fins que l’unique affichage lors de la
              navigation sur le présent Site, les contenus de tiers soumis à des
              droits de propriété intellectuelle, relatifs à la vie privée, ou
              relatifs à leurs données personnelles ou leur droit à l’image.
              <br />- de stocker, de diffuser ou publier tout contenu illégal,
              préjudiciable, diffamatoire, violent, raciste, antisémite,
              révisionniste, incitant à la haine, contraire aux bonnes mœurs,
              portant atteinte à la vie privée ou aux droits privatifs de tiers.
              <br />- d’usurper l’identité d’un tiers et/ou publier toute
              information personnelle d’un tiers <br />- à ne pas divulguer à
              des tiers leurs identifiants de connexion ou tout autre élément
              permettant l’accès au Site. En cas de connexion frauduleuse par un
              tiers non inscrit avec les identifiants d’un membre, tout dommage
              causé par ce tiers sera réputé, sauf cas de force majeure, avoir
              été commis par ledit membre. <br />Les Utilisateurs sont seuls
              responsables des contenus qu’ils publient sur le site. <br />En
              publiant sur le site, les Utilisateurs reconnaissent posséder
              l’ensemble des droits et autorisations nécessaires pour effectuer
              leurs publications et acceptent que ces dernières deviennent
              publiques et librement accessibles sur le Site. <br />Dans le cas
              où il enfreindrait les présentes conditions générales, la société
              footfoot.co se réserve le droit de supprimer toute publication
              d’un Utilisateur sur le Site, voire, en cas d’infractions d’une
              particulière gravité ou répétées, de supprimer le compte de
              l’Utilisateur responsable. <br />Un message contraire à la charte
              pourra être modifié. La modification peut concerner une partie ou
              la totalité du message. Outre cela, l’utilisateur postant un
              message contraire à la présente charte s’expose à un bannissement
              temporaire du Site. Durant la durée de ce bannissement
              l’utilisateur ne pourra plus poster de contributions en cas de
              bannissement simple, et en cas de bannissement complet il ne
              pourra plus accéder au Site. <br />Le Site constitue un lieu privé
              ouvert au public sous la responsabilité de footfoot.co qui en
              détermine librement les modalités de fonctionnement et
              d'utilisation et qui peut donc prendre les initiatives nécessaires
              au bon fonctionnement du forum de discussion.
            </p>
            <br />

            <p>
              <strong>Propriété intellectuelle et contrefaçons</strong>
              <br />footfoot.co ne revendique aucun droit de propriété sur les
              informations que vous envoyez pour renseigner votre compte ou par
              l'intermédiaire de nos Services. Vous devez disposer des droits
              nécessaires sur les informations que vous envoyez pour renseigner
              votre compte footfoot.co ou par l'intermédiaire de nos Services et
              de l'autorisation requise pour octroyer les droits et licences
              mentionnés dans nos Conditions. Droits d’footfoot.co. Nous
              possédons l'ensemble des droits d'auteur et droits relatifs aux
              marques, aux domaines, aux logos, à la présentation, aux secrets
              commerciaux, aux brevets et autres droits de propriété
              intellectuelle associés à nos Services. Vous ne pouvez pas
              utiliser nos droits d'auteur et droits relatifs aux marques, aux
              domaines, aux logos, à la présentation et aux brevets ou nos
              autres droits de propriété intellectuelle, sauf si vous disposez
              de notre autorisation expresse. <br />Afin que nous puissions
              exploiter et proposer nos Services, vous octroyez à footfoot.co
              une licence internationale, non exclusive, exempte de redevance,
              permettant l'octroi d'une sous-licence et cessible, nous
              autorisant à utiliser, reproduire, distribuer, afficher et
              exploiter les informations (y compris le contenu) que vous
              téléchargez, soumettez, stockez, envoyez ou recevez sur nos
              Services ou par leur intermédiaire, ainsi qu'à en créer des œuvres
              dérivées. Les droits que vous octroyez en vertu de cette licence
              sont destinés aux fins limitées qui sont d'exploiter et de fournir
              de nos Services (par exemple, pour nous permettre d'afficher votre
              photo de profil et votre message de statut, transmettre vos
              messages, stocker vos messages sur nos serveurs).
            </p>
            <br />

            <p>
              <strong>Limitations de responsabilité</strong>
              <br />N’agissant qu’en tant que simple hébergeur, la Société
              footfoot.co n’est pas responsable du déroulement du contest. La
              Société footfoot.co décline toute responsabilité pour les dommages
              qui résulteraient de l’organisation d’un contest privé en ligne et
              des informations qu’ils contiennent. <br />La société footfoot.co
              n’est pas responsable des paris, contrats, transactions conclus
              entre les utilisateurs du site. <br />De la même façon,
              footfoot.co ne pourra être tenue pour responsable en cas de
              défaillance dans la remise d’un lot gagné par un Utilisateur au
              cours d’un contest privé organisé par l’un des utilisateurs du
              site. <br />En toute hypothèse, la Société footfoot.co ne pourra
              être tenue pour responsable de tous dommages directs/ indirects
              qu’ils soient prévisibles ou non, de toutes pertes de profits,
              perte de revenus, perte de chance, perte de données, perte
              économique ou commerciale qu’elle qu’en soit la nature subie par
              un Utilisateur du Site et de la survenance d’un évènement de force
              majeur.
              <br />
              <br />La Société footfoot.co ne garantit en aucun cas
              l’exactitude, l’exhaustivité ou l’actualité du contenu du Site
              (informations, pronostics, conseils, …), l’ensemble des données
              proposées par le Site revêtant un caractère purement indicatif.
              Par conséquent, la Société footfoot.co n’est pas responsable des
              éventuelles omissions, altérations, erreurs ou délais de mise à
              jour de ces informations et de leurs éventuelles conséquences.
              <br />
              <br />En aucun cas la Société footfoot.co ne saurait être tenue
              pour responsable : <br />- de tout dommage résultant d’un
              dysfonctionnement informatique et technique de l’Utilisateur, de
              la perte d’accès au site provoquée par la panne du réseau de
              communication électronique ou du fournisseur d’accès de
              l’Utilisateur, par des opérations de maintenance ou des mises à
              jour, <br />- de la perte de toute donnée, des éventuelles
              modifications frauduleuses des données ou contributions publiées
              sur le Site, <br />- de l’éventuelle transmission de virus ou des
              éventuels risques de bug pouvant survenir lors de la navigation
              sur le Site, <br />- de la mauvaise utilisation du site par
              l’Utilisateur, de toute faute, omission, négligence ou défaillance
              de l’Utilisateur, <br />- de la divulgation ou de l’utilisation
              illicite d’un mot de passe remis de manière confidentielle à
              l’Utilisateur,
            </p>
            <br />

            <div>
              <strong>Collecte des données personnelles</strong>
              <br />Dans le cadre du Règlement Général sur la Protection des
              Données, il vous est demandé de donner votre consentement
              explicite à la collecte et au traitement de vos données
              personnelles dans le cadre de l'utilisation de cette plateforme.
              <br />Les données personnelles collectées et leur utilisation sont
              décrites ci-après :
              <br />
              <ul>
                <li>
                  Identifiant : cet identifiant est libre et vous pouvez choisir
                  de ne pas le faire correspondre à votre identité réelle. Dans
                  tous les cas, cet identifiant peut-être affiché dans le site
                  ou l'application et est potentiellement visible de tout autre
                  utilisateur de la plateforme. Aucun traitement spécifique
                  n'est réalisé.
                </li>
                <li>
                  Adresse Mail : votre adresse mail est utilisée pour
                  communiquer directement avec vous : informations sur la
                  plateforme, procédure de réinitialisation de mot de passe et
                  envoi de rappels de matchs à pronostiquer. Une adresse mail
                  confirmée est nécessaire pour l'utilisation de certaines
                  fonctions du site ou application. Cette information n'est en
                  aucun cas partagée aux autres utilisateurs du site ou avec
                  d'autres organisations.
                </li>
                <li>
                  Image de profil : cette image est libre et vous pouvez choisir
                  de ne pas refléter votre identité réelle. Dans tous les cas,
                  cette image est affichée dans la plateforme et est
                  potentiellement visible de tout autre utilisateur de la
                  plateforme. Aucun traitement spécifique n'est réalisé.
                </li>
                <li>
                  Identifiant de téléphone portable (dans le cas de
                  l'utilisation des applications mobiles) : cet identifiant est
                  unique et ne peut être utilisé par aucune autre application et
                  n'est donc jamais communiqué. Il est utilisé pour vous envoyer
                  des notifications liées à l'utilisation de la plateforme :
                  informations, rappels de pronostics, interactions sur les
                  forums de discussion.
                </li>
                <li>
                  Adresse IP, "cookies" ou espace de stockage local de votre
                  navigateur utilisés à des fins :
                </li>
                <ul>
                  <li>statistiques</li>
                  <li>de connexion automatique à votre compte</li>
                </ul>
              </ul>
            </div>
            <br />
            <p>
              <strong>footfoot.co en entreprise</strong>
              <br />L’utilisation de la plateforme footfoot.co n’engage en rien
              le site footfoot.co et les personnes qui travaillent sur le site
              sur la réussite de votre concours notamment par rapport à la
              disponibilité de la plateforme. La responsabilité de footfoot.co
              et des personnes travaillant sur le site ne pourra en aucun cas
              être engagée notamment si le site venait à être indisponible
              pendant le déroulement d’un contest.
            </p>
            <br />
            <p>
              <strong>Droit applicable et attribution de juridiction</strong>
              <br />Tout litige en relation avec l’utilisation du site
              footfoot.co est soumis au droit français. Il est fait attribution
              exclusive de juridiction aux tribunaux compétents de Paris.
            </p>
            <br />
            <p>
              <strong>Lexique</strong>
              <br />Utilisateur : Internaute se connectant, utilisant le site
              susnommé. Informations personnelles : « les informations qui
              permettent, sous quelque forme que ce soit, directement ou non,
              l'identification des personnes physiques auxquelles elles
              s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978).
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
              <p>Les matchs de mon contest</p>
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
                              invertOk: props.row.codeCompetitionApi == 2,
                              invertOk: props.row.codeCompetitionApi == 5,
                            }"
                            class="logoligue"
                            :src="
                              '/logoLigue/' +
                              props.row.codeCompetitionApi +
                              '.png'
                            "
                            alt="logoLigue"
                          />
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
                              props.row.status.toUpperCase() != 'NOT STARTED' &&
                              props.row.status.toUpperCase() != 'NS' &&
                              props.row.status.toUpperCase() != 'TBA' &&
                              props.row.status.toUpperCase() != 'FT'
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
                            v-if="props.row.stadium.length > 25"
                            class="has-text-yellow"
                            >{{
                              props.row.stadium.substring(0, 25) + "..."
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
    </div>
  </section>
</template>

<script>
import {
  getMatchsList,
  createRound,
  closeContest,
  sendMailToCompetitor,
  createMatchlistContest,
  getMasterContest,
  registerContest,
  getIntentPaiement,
} from "@/server/apiContest";
import { sendServerForPay } from "@/server/apiContest";
import moment from "moment";
import Multiselect from "vue-multiselect";
let stripe;
let elements;
let card;

export default {
  head() {
    return {
      script: [{ src: "https://js.stripe.com/v3/" }],
    };
  },
  components: {
    Multiselect,
  },
  data() {
    return {
      total: 0,
      tarif: [
        { betValue: 5, montant: "5 €", commission: "1 €", fee: 600 },
        { betValue: 10, montant: "10 €", commission: "1,5 €", fee: 1150 },
        { betValue: 20, montant: "20 €", commission: "2 €", fee: 2200 },
        { betValue: 50, montant: "50 €", commission: "3 €", fee: 5300 },
        { betValue: 100, montant: "100 €", commission: "5 €", fee: 10500 },
        { betValue: 500, montant: "500 €", commission: "20 €", fee: 52000 },
      ],
      isSwitched: false,
      isDisclamerModalActive: false,
      isRulesActive: false,
      loading: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 800,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      isSwitched: "",
      matchesChoice: "all",
      bet: "non",
      competitions: "",
      matchList: [],
      matchSelection: [],
      contestName: "",
      adminOfContest: "",
      masterContest: "",
      scope: [],
      winnerRules:
        " les participants ayant le plus de points se verront créditer de leur part de la cagnotte dans leur wallet.",
      betValue: "5",
      deadline: "",
      activeModal: false,
      winnerRulesModifie: "",
      contestCreation: false,
      optionCompet: [
        { selected: false, league: 8 },
        { selected: false, league: 301 },
        { selected: false, league: 82 },
        { selected: false, league: 2 },
        { selected: false, league: 5 },
        { selected: false, league: 384 },
        { selected: false, league: 564 },
      ],
      imageContest: null,
      url: "",
      contest: "",
      buttonClass: "button is-large buttonPaiPos",
      button: "Jouer !",
      product: {
        amount: 1150,
        name: "Inscription au round",
        description: "",
      },
      options: {
        image: "https://www.footfoot.co/miseLogo.png",
        currency: "EUR",
        locale: "auto",
        email: "",
      },
      stripePublishKey: "",
      modifyPicContestModal: false,
      choseMatch: false,
      suggestMatch: false,
      seeMatchSelectionModal: false,
      stripe: "",
      elements: "",
      card: "",
      token: "",
      completeCardOk: false,
      client_secret: "",
    };
  },
  mounted() {
    if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
      getMasterContest(this.$route.params.mastercontestId).then(
        (masterContest) => {
          if (!masterContest) {
            this.$router.push("/contest");
          } else {
            this.masterContest = masterContest;
          }
        }
      );
      this.options.email = this.connectedUser.email;
      this.stripePublishKey =
        process.env.NODE_ENV != "production"
          ? "pk_test_gsnUcVGYecfIcjUduHbMh56e"
          : "pk_live_aJzcFXmfkxnET8gfOObIJ1lm";
    } else {
      this.$router.push("/");
    }
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
    submit() {
      this.stripe.createToken(this.card).then((result) => {
        if (result.error) {
        } else {
          this.sendTokenToServer(result.token);
          ////handle stripe charge logic here.
        }
      });
    },

    mountStripe() {
      this.stripe = Stripe(this.stripePublishKey);
      this.elements = this.stripe.elements();
      var style = {
        base: {
          color: "#32325d",
        },
      };

      this.card = this.elements.create("card", {
        style: style,
      });
      this.card.mount(this.$refs.card);
      this.card.addEventListener("change", (event) => {
        this.completeCardOk = event.complete ? true : false;
      });
    },

    setBetValueContestTonull() {
      this.betValue = 0;
    },
    setBetValueContest() {
      this.betValue = 5;
    },
    sendTokenToServer(token) {
      getIntentPaiement({
        contestName: this.contestName,
        amount: this.betValue * 100,
        payment_method: token.card.id,
      }).then((resp) => {
        this.client_secret = resp.client_secret;
        let payment_method = {
          card: this.card,
          billing_details: {
            email: this.$store.state.auth.user.email,
          },
        };
        this.stripe
          .confirmCardPayment(this.client_secret, { payment_method })
          .then((result) => {
            if (result.error) {
              this.$buefy.dialog.alert(
                `<div>Le paiement n'a pu etre effectué !<br/>
								La CB n'a pas été débitée.</div><br/>
								<span class='is-italic'>${result.error.code}</span>`
              );
              ////Show error to your customer (e.g., insufficient funds)
            } else {
              ////The payment has been processed!
              if (result.paymentIntent.status === "succeeded") {
                createRound(
                  this.scope.map((m) => {
                    return m._id;
                  }),
                  this.winnerRules,
                  this.betValue,
                  this.masterContest._id,
                  this.url
                ).then((data) => {
                  this.contest = data;
                  this.contestCreation = false;

                  if (this.alreadyRegister === true) {
                    this.$buefy.dialog.alert("Ton inscription est en cours");
                  } else {
                    this.alreadyRegister = true;

                    registerContest(this.contest._id).then((resp) => {
                      this.$buefy.dialog.alert(
                        `Félicitations, tu participes au contest !<br> BONS PRONOS`
                      );
                      this.$nuxt.$emit("joinContest");
                      this.$router.push("/contest/" + this.contest._id);
                    });
                  }
                });
                ////Show a success message to your customer
                ////There's a risk of the customer closing the window before callback
                ////execution. Set up a webhook or plugin to listen for the
                ////payment_intent.succeeded event that handles any business critical
                ////post-payment actions.
              }
            }
          });
      });
    },
    seeMatchSelection() {
      this.seeMatchSelectionModal = !this.seeMatchSelectionModal;
    },
    suggestMatchs() {
      this.mountStripe();
      this.options.email = this.connectedUser.email;
      getMatchsList().then((match) => {
        this.matchSelection = match;
        this.scope = match;
        this.matchesChoice = "all";
      });
      this.choseMatch = false;
      this.suggestMatch = true;
    },
    iChooseMyGames() {
      this.mountStripe();
      this.options.email = this.connectedUser.email;
      this.matchSelection = [];
      this.optionCompet[0].selected = false;
      this.optionCompet[1].selected = false;
      this.optionCompet[2].selected = false;
      this.optionCompet[3].selected = false;
      this.optionCompet[4].selected = false;
      this.optionCompet[5].selected = false;
      this.optionCompet[6].selected = false;
      this.scope = [];
      this.choseMatch = true;
      this.suggestMatch = false;
      this.matchesChoice = "custom";
    },
    modifyPicContest() {
      this.modifyPicContestModal = true;
    },
    okPicContest() {
      this.modifyPicContestModal = false;
      this.generateImage();
    },
    productAmountSet() {
      if (this.bet == "oui") {
        this.product.amount = this.tarif.filter((e) => {
          return this.betValue == e.betValue;
        })[0].fee;
        ////Rajouté nico

        this.options.email = this.connectedUser.email;
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

    seeFees() {
      this.activeModal = true;
    },

    competSelect(codeCompete) {
      switch (codeCompete) {
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
      }
    },
    allGameSelected() {
      this.scope = this.matchSelection;
    },
    noGameSelected() {
      this.scope = [];
    },
    saveCreate() {
      if (this.scope.length === 0) {
        this.$buefy.dialog.alert(
          "Choisir au moins un match pour créer le contest"
        );
      } else if (this.contestCreation === true) {
        this.$buefy.dialog.alert("Ton contest est en cours de création");
      } else {
        this.contestCreation = true;
        if (this.bet === "non") {
          this.betValue = 0;
        } else {
          this.betValue = this.betValue;
        }
        if (this.imageContest) {
          this.generateImage();
        } else {
          this.url = "https://www.footfoot.co/miseLogo.png";
        }
        createRound(
          this.scope.map((m) => {
            return m._id;
          }),
          this.winnerRules,
          this.betValue,
          this.masterContest._id,
          this.url
        ).then((data) => {
          this.contestCreation = false;
          registerContest(data._id).then((resp) => {
            this.$buefy.dialog.alert(
              `Félicitations, tu participes au nouveau round !<br> BONS PRONOS`
            );
            this.$router.push("/contest/" + data._id);
          });
        });
        //.catch(next);
      }
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.competValidate {
  padding: 5px;
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
  width: 40%;
  display: FLEX;
  flex-direction: column;
  justify-content: center;
}

.is-checked {
  background-color: #ff7d00;
}

.imgCProfile {
  max-height: 100px !important;
  width: 100px;
  align-self: center;
  margin: 15px;
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
  margin-left: 0.5rem !important;
  margin-bottom: 0.5rem !important;
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
  margin: auto;
  font-size: 1rem;
  color: black;
  width: 50%;
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

.buttonLogin {
  min-width: 25%;
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #ff7d00 !important;
  background-color: #ff7d00 !important;
  color: #eef1f7 !important;
}

.buttonLogin:focus,
.buttonLogin:hover {
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #ff7d00 !important;
  background-color: #eef1f7 !important;
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
  justify-content: space-between;
  display: flex;
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

@media (max-width: 1047px) {
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
    max-height: 70px !important;
    width: 70px;
    margin: 5px;
  }

  .contestPerso {
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
    width: 35px;
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
    font-size: 1.2rem !important;
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
