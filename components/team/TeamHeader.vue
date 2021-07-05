<template>
  <section v-if="team">
    <div class="column is-6" id="ActionCard">
      <div class="box profile-card">
        <div class="card-content">
          <div class="media" id="teamInfo">
            <div class="media-content">
              <div class="team-banner">
                <div class="teamDetailHeader">
                  <figure @click="seeStadium" class="bigPicture">
                    <img
                      loading="lazy"
                      :class="{
                        invertOk: team.name.toUpperCase().includes('JUVE'),
                      }"
                      class="pointer"
                      :src="team.teamImg"
                      :alt="team.name + ' logo'"
                    />

                    <audio id="anthem" v-if="team.anthem">
                      <source :src="team.anthem" type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </figure>
                  <div class="add-to-watchlist">
                    <h1 @click="seeStadium" class="longNameTitle title is-5">
                      <strong v-if="langSelected == 'EN' && team.isNationalTeam"
                        >{{ team.searchName }}
                      </strong>
                      <strong v-else>{{ team.name }} </strong>

                      <img
                        v-if="team.anthem && audioIsplaying == false"
                        loading="lazy"
                        class="anthemLogo"
                        src="~assets/images/music.svg"
                        alt="music"
                      />
                      <img
                        v-if="team.anthem && audioIsplaying == true"
                        loading="lazy"
                        class="anthemLogo"
                        src="~assets/images/music-off.svg"
                        alt="music-off"
                      />
                    </h1>

                    <div
                      v-if="
                        team.lastFiveMatch &&
                        team.lastFiveMatch.details[0] &&
                        team.lastFiveMatch.details[0].localteam_id
                      "
                      class="team-priceVarForm title is-5"
                    >
                      <b-tooltip
                        v-if="
                          team.lastFiveMatch && team.lastFiveMatch.details[0]
                        "
                        :label="
                          team.lastFiveMatch.details[0].localteam_id ===
                          Number(team.id_sportmonks)
                            ? team.lastFiveMatch.details[0].scores.ft_score +
                              ' VS ' +
                              team.lastFiveMatch.details[0].visitorTeam.data
                                .name
                            : team.lastFiveMatch.details[0].scores.ft_score +
                              ' @ ' +
                              team.lastFiveMatch.details[0].localTeam.data.name
                        "
                        :class="{
                          'is-green': team.forme[0] === 'V',
                          'is-red': team.forme[0] === 'D',
                          'is-blueInfo': team.forme[0] === 'N',
                        }"
                        position="is-bottom"
                      >
                        <span
                          :class="{
                            'form is-win': team.forme[0] === 'V',
                            'form is-loss': team.forme[0] === 'D',
                            'form is-draw': team.forme[0] === 'N',
                          }"
                          >{{
                            langSelected === "EN"
                              ? team.forme[0] === "V"
                                ? "W"
                                : team.forme[0] === "D"
                                ? "L"
                                : "D"
                              : team.forme[0]
                          }}</span
                        >
                      </b-tooltip>

                      <div v-else>
                        <b-tag
                          :class="{
                            'form is-win': team.forme[0] === 'V',
                            'form is-loss': team.forme[0] === 'D',
                            'form is-draw': team.forme[0] === 'N',
                            'form is-greyLit': team.forme[0] === '-',
                          }"
                          >{{
                            langSelected === "EN"
                              ? team.forme[0] === "V"
                                ? "W"
                                : team.forme[0] === "D"
                                ? "L"
                                : "D"
                              : team.forme[0]
                          }}</b-tag
                        >
                      </div>

                      <b-tooltip
                        v-if="
                          team.lastFiveMatch && team.lastFiveMatch.details[1]
                        "
                        :label="
                          team.lastFiveMatch.details[1].localteam_id ===
                          Number(team.id_sportmonks)
                            ? team.lastFiveMatch.details[1].scores.ft_score +
                              ' VS ' +
                              team.lastFiveMatch.details[1].visitorTeam.data
                                .name
                            : team.lastFiveMatch.details[1].scores.ft_score +
                              ' @ ' +
                              team.lastFiveMatch.details[1].localTeam.data.name
                        "
                        :class="{
                          'is-green': team.forme[1] === 'V',
                          'is-red': team.forme[1] === 'D',
                          'is-blueInfo': team.forme[1] === 'N',
                        }"
                        position="is-bottom"
                      >
                        <span
                          :class="{
                            'form is-win': team.forme[1] === 'V',
                            'form is-loss': team.forme[1] === 'D',
                            'form is-draw': team.forme[1] === 'N',
                          }"
                          >{{
                            langSelected === "EN"
                              ? team.forme[1] === "V"
                                ? "W"
                                : team.forme[1] === "D"
                                ? "L"
                                : "D"
                              : team.forme[1]
                          }}</span
                        >
                      </b-tooltip>

                      <div v-else>
                        <b-tag
                          :class="{
                            'form is-win': team.forme[1] === 'V',
                            'form is-loss': team.forme[1] === 'D',
                            'form is-draw': team.forme[1] === 'N',
                            'form is-greyLit': team.forme[1] === '-',
                          }"
                          >{{
                            langSelected === "EN"
                              ? team.forme[1] === "V"
                                ? "W"
                                : team.forme[1] === "D"
                                ? "L"
                                : "D"
                              : team.forme[1]
                          }}</b-tag
                        >
                      </div>

                      <b-tooltip
                        v-if="
                          team.lastFiveMatch && team.lastFiveMatch.details[2]
                        "
                        :label="
                          team.lastFiveMatch.details[2].localteam_id ===
                          Number(team.id_sportmonks)
                            ? team.lastFiveMatch.details[2].scores.ft_score +
                              ' VS ' +
                              team.lastFiveMatch.details[2].visitorTeam.data
                                .name
                            : team.lastFiveMatch.details[2].scores.ft_score +
                              ' @ ' +
                              team.lastFiveMatch.details[2].localTeam.data.name
                        "
                        :class="{
                          'is-green': team.forme[2] === 'V',
                          'is-red': team.forme[2] === 'D',
                          'is-blueInfo': team.forme[2] === 'N',
                        }"
                        position="is-bottom"
                      >
                        <span
                          :class="{
                            'form is-win': team.forme[2] === 'V',
                            'form is-loss': team.forme[2] === 'D',
                            'form is-draw': team.forme[2] === 'N',
                          }"
                          >{{
                            langSelected === "EN"
                              ? team.forme[2] === "V"
                                ? "W"
                                : team.forme[2] === "D"
                                ? "L"
                                : "D"
                              : team.forme[2]
                          }}</span
                        >
                      </b-tooltip>

                      <div v-else>
                        <b-tag
                          :class="{
                            'form is-win': team.forme[2] === 'V',
                            'form is-loss': team.forme[2] === 'D',
                            'form is-draw': team.forme[2] === 'N',
                            'form is-greyLit': team.forme[2] === '-',
                          }"
                          >{{
                            langSelected === "EN"
                              ? team.forme[2] === "V"
                                ? "W"
                                : team.forme[2] === "D"
                                ? "L"
                                : "D"
                              : team.forme[2]
                          }}</b-tag
                        >
                      </div>

                      <b-tooltip
                        v-if="
                          team.lastFiveMatch && team.lastFiveMatch.details[3]
                        "
                        :label="
                          team.lastFiveMatch.details[3].localteam_id ===
                          Number(team.id_sportmonks)
                            ? team.lastFiveMatch.details[3].scores.ft_score +
                              ' VS ' +
                              team.lastFiveMatch.details[3].visitorTeam.data
                                .name
                            : team.lastFiveMatch.details[3].scores.ft_score +
                              ' @ ' +
                              team.lastFiveMatch.details[3].localTeam.data.name
                        "
                        :class="{
                          'is-green': team.forme[3] === 'V',
                          'is-red': team.forme[3] === 'D',
                          'is-blueInfo': team.forme[3] === 'N',
                        }"
                        position="is-bottom"
                      >
                        <span
                          :class="{
                            'form is-win': team.forme[3] === 'V',
                            'form is-loss': team.forme[3] === 'D',
                            'form is-draw': team.forme[3] === 'N',
                          }"
                          >{{
                            langSelected === "EN"
                              ? team.forme[3] === "V"
                                ? "W"
                                : team.forme[3] === "D"
                                ? "L"
                                : "D"
                              : team.forme[3]
                          }}</span
                        >
                      </b-tooltip>

                      <div v-else>
                        <b-tag
                          :class="{
                            'form is-win': team.forme[3] === 'V',
                            'form is-loss': team.forme[3] === 'D',
                            'form is-draw': team.forme[3] === 'N',
                            'form is-greyLit': team.forme[3] === '-',
                          }"
                          >{{
                            langSelected === "EN"
                              ? team.forme[3] === "V"
                                ? "W"
                                : team.forme[3] === "D"
                                ? "L"
                                : "D"
                              : team.forme[3]
                          }}</b-tag
                        >
                      </div>

                      <b-tooltip
                        v-if="
                          team.lastFiveMatch && team.lastFiveMatch.details[4]
                        "
                        :label="
                          team.lastFiveMatch.details[4].localteam_id ===
                          Number(team.id_sportmonks)
                            ? team.lastFiveMatch.details[4].scores.ft_score +
                              ' VS ' +
                              team.lastFiveMatch.details[4].visitorTeam.data
                                .name
                            : team.lastFiveMatch.details[4].scores.ft_score +
                              ' @ ' +
                              team.lastFiveMatch.details[4].localTeam.data.name
                        "
                        :class="{
                          'is-green': team.forme[4] === 'V',
                          'is-red': team.forme[4] === 'D',
                          'is-blueInfo': team.forme[4] === 'N',
                        }"
                        position="is-bottom"
                      >
                        <span
                          :class="{
                            'form is-win': team.forme[4] === 'V',
                            'form is-loss': team.forme[4] === 'D',
                            'form is-draw': team.forme[4] === 'N',
                          }"
                          >{{
                            langSelected === "EN"
                              ? team.forme[4] === "V"
                                ? "W"
                                : team.forme[4] === "D"
                                ? "L"
                                : "D"
                              : team.forme[4]
                          }}</span
                        >
                      </b-tooltip>

                      <div v-else>
                        <b-tag
                          :class="{
                            'form is-win': team.forme[4] === 'V',
                            'form is-loss': team.forme[4] === 'D',
                            'form is-draw': team.forme[4] === 'N',
                            'form is-greyLit': team.forme[4] === '-',
                          }"
                          >{{
                            langSelected === "EN"
                              ? team.forme[4] === "V"
                                ? "W"
                                : team.forme[4] === "D"
                                ? "L"
                                : "D"
                              : team.forme[4]
                          }}</b-tag
                        >
                      </div>
                    </div>
                  </div>

                  <div class="rightBlock title is-5">
                    <div
                      v-if="team.isNationalTeam === true && team.fifaClassement"
                      class="teamClassChamp title is-5"
                    >
                      <strong>
                        {{ team.fifaClassement }}
                        <sup v-if="langSelected == 'EN'">{{
                          team.fifaClassement === "1"
                            ? "st"
                            : team.fifaClassement === "2"
                            ? "nd"
                            : team.fifaClassement === "3"
                            ? "rd"
                            : "th"
                        }}</sup>
                        <sup v-else>{{
                          team.fifaClassement === "1" ? "er" : "ème"
                        }}</sup>
                      </strong>
                      &nbsp
                      <figure class="image pointer" @click="ligueNoevent()">
                        <img
                          loading="lazy"
                          class="logoligue1"
                          src="~assets/images/fifaworldcup.png"
                          alt="fifa-logo"
                        />
                      </figure>
                    </div>
                    <div
                      v-if="team.marketValue"
                      class="teamClassValue title is-5"
                    >
                      <b-tooltip
                        label="valeur de l'effectif"
                        position="is-left"
                      >
                        <strong>
                          {{ team.marketValue }}
                        </strong>
                        <!--     &nbsp
                        <figure class="image">
                          <img
                            loading="lazy"
                            class="imgValue"
                            src="~assets/images/contestMainCagnotte.png"
                            alt="logoUEFA"
                          />
                        </figure>
                        -->
                      </b-tooltip>
                    </div>

                    <div
                      v-if="team.championshipRank"
                      class="teamClassChamp title is-5"
                    >
                      <strong>
                        {{ team.championshipRank }}
                        <sup v-if="langSelected == 'EN'">{{
                          team.championshipRank === 1
                            ? "st"
                            : team.championshipRank === 2
                            ? "nd"
                            : team.championshipRank === 3
                            ? "rd"
                            : "th"
                        }}</sup>
                        <sup v-else>{{
                          team.championshipRank === 1 ? "er" : "ème"
                        }}</sup>
                      </strong>
                      &nbsp
                      <figure
                        class="image pointer"
                        @click="ligue(team.championship)"
                      >
                        <img
                          :class="{
                            invertOk:
                              Number(team.championship) == 2 ||
                              Number(team.championship) == 5,
                          }"
                          v-if="team.isNationalTeam === false"
                          class="logoligue1"
                          :src="'/logoLigue/' + team.championship + '.png'"
                          alt="logoLigue"
                        />
                        <img
                          loading="lazy"
                          v-else
                          class="logoligue1"
                          src="~assets/images/fifaworldcup.png"
                          alt="fifa-logo"
                        />
                      </figure>
                    </div>
                    <div
                      v-if="team.uefaranking"
                      class="teamClassUEFA title is-5"
                    >
                      <strong>
                        {{ team.uefaranking.data.position }}
                        <sup v-if="langSelected == 'EN'">{{
                          team.uefaranking.data.position === 1
                            ? "st"
                            : team.uefaranking.data.position === 2
                            ? "nd"
                            : team.uefaranking.data.position === 3
                            ? "rd"
                            : "th"
                        }}</sup>
                        <sup v-else>
                          {{
                            team.uefaranking.data.position === 1 ? "er" : "ème"
                          }}</sup
                        >
                      </strong>
                      &nbsp
                      <figure class="image pointer">
                        <img
                          loading="lazy"
                          class="logoligue1"
                          src="~assets/images/uefa.png"
                          alt="logoUEFA"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
              <nav
                v-if="team.nextMatch && seeNextMatchActiv === false"
                class="pointer matchHeader"
              >
                <div class="divVide">
                  <b-dropdown :triggers="['hover']">
                    <template #trigger>
                      <img
                        loading="lazy"
                        class="share"
                        src="~assets/images/share.png"
                        alt="share"
                        slot="trigger"
                      />
                    </template>
                    <client-only>
                      <b-dropdown-item
                        v-for="network in networks"
                        :key="network.network"
                        :class="{
                          mobileOnly:
                            network.name === 'Messenger' ||
                            network.name === 'SMS',
                        }"
                      >
                        <ShareNetwork
                          :network="network.network"
                          :url="sharing.url"
                          :title="sharing.title"
                          :description="sharing.description"
                          :quote="sharing.quote"
                          :hashtags="sharing.hashtags"
                          :twitterUser="sharing.twitterUser"
                        >
                          <i :class="network.icon"></i>
                          <span>{{ network.name }}</span>
                        </ShareNetwork>
                        <br />
                      </b-dropdown-item>

                      <b-dropdown-item>
                        <a
                          class="pointer"
                          v-clipboard:success="handleSuccess"
                          v-clipboard="copyLink"
                          type="button"
                        >
                          <i class="fas fa-copy"></i>&nbsp{{
                            langSelected === "EN"
                              ? "Link to share"
                              : "Lien de partage"
                          }}</a
                        >
                      </b-dropdown-item>
                    </client-only>
                  </b-dropdown>
                </div>
                <div
                  v-if="
                    team &&
                    team.nextMatch &&
                    team.nextMatch.homeTeamId &&
                    team.nextMatch.awayTeamId &&
                    team.nextMatch.awayTeamId.name
                  "
                  @click="result(team.nextMatch)"
                  class="centerNextMatchDiv"
                >
                  <div>
                    <h3 class="homeTeamtitle">
                      <!--  <strong class="teamNameGameDesktop">{{
                        team.nextMatch.homeTeamId.name
                      }}</strong>
                      -->
                      <strong class="teamLogoGameMobile">
                        <img
                          class="pointer"
                          :src="team.nextMatch.homeTeamId.teamImg"
                          :alt="team.nextMatch.homeTeamId.name"
                          :class="{
                            invertOk: team.nextMatch.homeTeamId.name
                              .toUpperCase()
                              .includes('JUVE'),
                          }"
                        />
                      </strong>
                    </h3>
                    <div
                      v-if="
                        team.nextMatch.status.toUpperCase() === 'NOT STARTED' ||
                        team.nextMatch.status.toUpperCase() === 'NS' ||
                        team.nextMatch.status.toUpperCase() === 'TBA' ||
                        team.nextMatch.status.toUpperCase() === 'POSTP' ||
                        team.nextMatch.status.toUpperCase() === 'CANCL' ||
                        team.nextMatch.status.toUpperCase() === 'DELAYED'
                      "
                    >
                      <b-tooltip
                        :label="
                          team.nextMatch.homeTeamName +
                          ' VS ' +
                          team.nextMatch.awayTeamName
                        "
                        position="is-top"
                        class="bullsAndBearsPicVS"
                        type="is-info"
                        size="is-large"
                      >
                        <img
                          loading="lazy"
                          class="vsTeamHeader"
                          src="~assets/images/versus.png"
                          alt="versus"
                        />
                      </b-tooltip>
                    </div>
                    <div v-else class="scoreDetailInPlay">
                      <div class>
                        <b-tag
                          :class="{
                            'is-green':
                              team.nextMatch.goalsHomeTeam >
                              team.nextMatch.goalsAwayTeam,
                            'is-red':
                              team.nextMatch.goalsHomeTeam <
                              team.nextMatch.goalsAwayTeam,
                            'is-info':
                              team.nextMatch.goalsHomeTeam ===
                              team.nextMatch.goalsAwayTeam,
                          }"
                          size="is-large"
                          >{{
                            team.nextMatch.goalsHomeTeam
                              .toString()
                              .replace(" ", "")
                          }}</b-tag
                        >
                      </div>
                      <strong class="Score">-</strong>
                      <div class>
                        <b-tag
                          :class="{
                            'is-green':
                              team.nextMatch.goalsHomeTeam <
                              team.nextMatch.goalsAwayTeam,
                            'is-red':
                              team.nextMatch.goalsHomeTeam >
                              team.nextMatch.goalsAwayTeam,
                            'is-info':
                              team.nextMatch.goalsHomeTeam ===
                              team.nextMatch.goalsAwayTeam,
                          }"
                          size="is-large"
                          >{{
                            team.nextMatch.goalsAwayTeam
                              .toString()
                              .replace(" ", "")
                          }}</b-tag
                        >
                      </div>
                    </div>
                    <h3 class="awayTeamtitle">
                      <!--     <strong class="teamNameGameDesktop">{{
                        team.nextMatch.awayTeamId.name
                      }}</strong>
                      -->
                      <strong class="teamLogoGameMobile">
                        <img
                          class="pointer"
                          :src="team.nextMatch.awayTeamId.teamImg"
                          :alt="team.nextMatch.awayTeamId.name"
                          :class="{
                            invertOk: team.nextMatch.awayTeamId.name
                              .toUpperCase()
                              .includes('JUVE'),
                          }"
                        />
                      </strong>
                    </h3>
                  </div>
                  <div class="has-text-centered timerNoExpand">
                    <div
                      v-if="
                        team.nextMatch.status.toUpperCase() === 'FT' ||
                        team.nextMatch.status.toUpperCase() === 'AET' ||
                        team.nextMatch.status.toUpperCase() === 'FT_PEN'
                      "
                      class="timer countdown"
                    >
                      <strong class="has-text-grey">{{
                        langSelected === "EN" ? "game over" : "match terminé"
                      }}</strong>
                    </div>
                    <div
                      v-if="
                        team.nextMatch.status.toUpperCase() === 'NOT STARTED' ||
                        team.nextMatch.status.toUpperCase() === 'NS' ||
                        team.nextMatch.status.toUpperCase() === 'TBA'
                      "
                      class="timer countdown"
                    >
                      <strong class="has-text-grey">
                        {{ langSelected === "EN" ? "game in" : "match dans" }}
                      </strong>
                      <div class="timer time-unite created" v-show="years">
                        <strong class="has-text-yellow time-unite-value">{{
                          years
                        }}</strong
                        >&nbsp
                        <strong class="has-text-yellow time-unite-title"
                          >Y</strong
                        >
                      </div>
                      <div class="timer time-unite created" v-show="months">
                        &nbsp
                        <strong class="has-text-yellow time-unite-value">{{
                          months
                        }}</strong
                        >&nbsp
                        <strong class="has-text-yellow time-unite-title"
                          >{{ langSelected === "EN" ? "Month" : "Mois" }}
                        </strong>
                      </div>
                      <div class="timer time-unite created" v-show="days">
                        &nbsp
                        <strong class="has-text-yellow time-unite-value">{{
                          days
                        }}</strong
                        >&nbsp
                        <strong class="has-text-yellow time-unite-title">
                          {{ langSelected === "EN" ? "D" : "J" }}
                        </strong>
                      </div>
                      <div class="timer time-unite created">
                        &nbsp
                        <strong class="has-text-yellow time-unite-value">{{
                          hours
                        }}</strong
                        >&nbsp
                        <strong class="has-text-yellow time-unite-title"
                          >H</strong
                        >
                      </div>
                      <div class="timer time-unite created">
                        &nbsp
                        <strong class="has-text-yellow time-unite-value">{{
                          minutes
                        }}</strong
                        >&nbsp
                        <strong class="has-text-yellow time-unite-title"
                          >Min</strong
                        >
                      </div>
                      <div class="timer time-unite created">
                        &nbsp
                        <strong class="has-text-yellow time-unite-value">{{
                          seconds
                        }}</strong
                        >&nbsp
                        <strong class="has-text-yellow time-unite-title"
                          >Sec</strong
                        >
                      </div>
                    </div>
                    <div
                      class="scoreWidth"
                      v-if="
                        team.nextMatch.status.toUpperCase() != 'FT' &&
                        team.nextMatch.status.toUpperCase() != 'AET' &&
                        team.nextMatch.status.toUpperCase() != 'FT_PEN' &&
                        team.nextMatch.status.toUpperCase() != 'NS' &&
                        team.nextMatch.status.toUpperCase() != 'NOT STARTED' &&
                        team.nextMatch.status.toUpperCase() != 'TBA' &&
                        team.nextMatch.status.toUpperCase() != 'POSTP' &&
                        team.nextMatch.status.toUpperCase() != 'CANCL' &&
                        team.nextMatch.status.toUpperCase() != 'DELAYED'
                      "
                    >
                      <div
                        v-if="
                          team.nextMatch.status.toUpperCase() === 'LIVE' &&
                          team.nextMatch.detail &&
                          team.nextMatch.elapsed < 46
                        "
                      >
                        <strong
                          v-if="langSelected == 'EN'"
                          class="has-text-grey"
                        >
                          1
                          <sup>st</sup> half :&nbsp
                        </strong>
                        <strong v-else class="has-text-grey">
                          1
                          <sup>ère</sup> mi-temps :&nbsp
                        </strong>
                        <span class="has-text-green timeMatch"
                          >{{ team.nextMatch.elapsed }}"</span
                        >
                      </div>
                      <div v-if="team.nextMatch.status.toUpperCase() === 'HT'">
                        <strong class="has-text-grey">{{
                          langSelected === "EN" ? "half-time" : "mi-temps"
                        }}</strong>
                      </div>
                      <div
                        v-if="
                          team.nextMatch.status.toUpperCase() === 'LIVE' &&
                          team.nextMatch.elapsed > 45
                        "
                      >
                        <strong
                          v-if="langSelected == 'EN'"
                          class="has-text-grey"
                        >
                          2
                          <sup>nd</sup> half :&nbsp
                        </strong>
                        <strong v-else class="has-text-grey">
                          2
                          <sup>ème</sup> mi-temps :&nbsp
                        </strong>
                        <span class="has-text-green timeMatch"
                          >{{ team.nextMatch.elapsed }}"</span
                        >
                      </div>
                      <div
                        v-if="
                          team.nextMatch.status.toUpperCase() === 'BREAK' &&
                          90 < team.nextMatch.elapsed < 120
                        "
                      >
                        <strong class="has-text-grey">{{
                          langSelected === "EN"
                            ? "waiting for overtime to start"
                            : "en attente du début des prolongations"
                        }}</strong>
                      </div>
                      <div
                        v-if="
                          team.nextMatch.status.toUpperCase() === 'BREAK' &&
                          team.nextMatch.elapsed >= 120
                        "
                      >
                        <strong class="has-text-grey">{{
                          langSelected === "EN"
                            ? "waiting for penalty shootout"
                            : "en attente du début des tirs au but"
                        }}</strong>
                      </div>
                      <div v-if="team.nextMatch.status.toUpperCase() === 'ET'">
                        <strong class="has-text-grey">Prolongations</strong>
                        <span class="has-text-green timeMatch"
                          >{{ team.nextMatch.elapsed }}"</span
                        >
                      </div>
                      <div
                        v-if="
                          team.nextMatch.status.toUpperCase() === 'PEN_LIVE'
                        "
                      >
                        <strong class="has-text-grey">{{
                          langSelected === "EN"
                            ? "penalty shootout"
                            : "séance de penalties"
                        }}</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="divVideMore">
                  <div
                    v-if="
                      team.nextMatch.lineup &&
                      team.nextMatch.lineup.data.length > 0
                    "
                    @click="seeLineup(team.nextMatch)"
                    class="is-lineUp"
                  >
                    {{ langSelected === "EN" ? "line-up" : "compos" }}
                  </div>
                  <i @click="result(team.nextMatch)">
                    <img
                      loading="lazy"
                      class="share"
                      src="~assets/images/More.png"
                      alt="plus"
                    />
                  </i>
                </div>
              </nav>
            </div>
          </div>
        </div>

        <b-modal v-if="team.stadium" :active.sync="stadiumModal">
          <stadium-modal :stadium="team.stadium"></stadium-modal>
        </b-modal>
        <div v-if="resultat">
          <b-modal :active.sync="resultatModal">
            <resultat-modal
              class="modalResultLineup"
              :lineUp="lineUp"
              :resultat="resultat"
            ></resultat-modal>
          </b-modal>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import Multiselect from "vue-multiselect";
export default {
  components: {
    resultatModal: () => import("@/components/modal/resultatModal"),
    stadiumModal: () => import("@/components/modal/stadiumModal"),
    Multiselect,
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  props: {
    team: "",
  },
  data() {
    return {
      sharing: {
        url: `https://www.footfoot.co${this.$route.path}`,
        title: `Toutes les infos sur le ${this.team.name}`,
        description: `Les infos, les transferts, les news, les buts, l'effectif, le calendrier, les résultats de l'équipe`,
        quote: `footfoot.co : Le site le plus complet sur le ${this.team.name}`,
        hashtags: `footfoot,football,pronos,contest,picks,news,${this.team.name}`,
        twitterUser: "InsidersFoot",
      },
      networks: [
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fa fa-whatsapp",
          color: "#25d366",
        },
        {
          network: "messenger",
          name: "Messenger",
          icon: "fab fa-facebook-messenger",
          color: "#0084ff",
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "fa fa-twitter",
          color: "#1da1f2",
        },
        {
          network: "facebook",
          name: "Facebook",
          icon: "fa fa-facebook",
          color: "#1877f2",
        },
        {
          network: "sms",
          name: "SMS",
          icon: "far fa-comment-dots",
          color: "#333333",
        },
        {
          network: "telegram",
          name: "Telegram",
          icon: "fa fa-telegram",
          color: "#0088cc",
        },

        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "fa fa-linkedin",
          color: "#007bb5",
        },
      ],
      copyLink: "",
      teamHomeScore: "",
      teamAwayScore: "",
      contestSelected: null,
      actualTime: moment().local().format("X"),
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      betModal: false,
      positionTaken: false,
      stadiumModal: false,
      seeNextMatchActiv: false,
      audios: [
        {
          id: "hymne",
          name: "Hymne",
          file: "",
          isPlaying: false,
        },
      ],
      resultat: "",
      resultatModal: false,
      lineUp: true,
      audioIsplaying: false,
    };
  },
  mounted() {
    this.compute();
    this.team.isNationalTeam === true
      ? (this.audios[0].file = new Audio(this.team.anthem))
      : (this.audios[0].file = ""),
      this.addOneSecondToActualTimeEverySecond();
    this.copyLink = "https://www.footfoot.co" + this.$route.path;
  },
  watch: {
    actualTime(val, oldVal) {
      this.copyLink = "https://www.footfoot.co" + this.$route.path;
      this.compute();
    },
    $route() {
      this.resultatModal = false;
    },
  },
  methods: {
    result(result) {
      let resultat = Object.assign({}, result);
      this.lineUp = false;
      this.resultat = Object.assign({}, resultat);
      this.resultatModal = true;
    },

    seeLineup(event) {
      this.resultat = "";
      this.resultat = event;
      this.lineUp = true;
      this.resultatModal = true;
    },
    handleSuccess() {
      this.$buefy.dialog.alert("Le lien a été copié! Plus qu'à le partager 😋");
    },
    seeNextMatch() {
      this.seeNextMatchActiv = !this.seeNextMatchActiv;
    },
    goToContest() {
      this.$router.push("/contest");
    },
    seeStadium() {
      if (this.team && this.team.anthem) {
        let anthem = document.querySelector("#anthem");
        if (this.audioIsplaying == false) {
          anthem.play();
          this.audioIsplaying = true;
        } else {
          anthem.pause();
          anthem.currentTime = 0;
          this.audioIsplaying = false;
        }
      } else {
        this.stadiumModal = true;
      }
    },
    play(audio) {
      audio.isPlaying = true;
      audio.file.play();
    },
    pause(audio) {
      audio.isPlaying = false;
      audio.file.pause();
    },
    ligueNoevent() {
      this.$router.push("/leagues");
    },
    ligue(event) {
      this.$store.commit("var/setNewValue", event);
      setTimeout(() => {
        this.$router.push("/leagues");
      }, 10);
    },
    addOneSecondToActualTimeEverySecond() {
      var component = this;
      component.actualTime = moment().local().format("X");
      setTimeout(function () {
        component.addOneSecondToActualTimeEverySecond();
      }, 1000);
    },
    getDiffInSeconds() {
      if (this.team.nextMatch) {
        return (
          moment(this.team.nextMatch.date).local().format("X") - this.actualTime
        );
      }
    },
    compute() {
      var duration = moment.duration(this.getDiffInSeconds(), "seconds");
      this.years = duration.years() > 0 ? duration.years() : 0;
      this.months = duration.months() > 0 ? duration.months() : 0;
      this.days = duration.days() > 0 ? duration.days() : 0;
      this.hours = duration.hours() > 0 ? duration.hours() : 0;
      this.minutes = duration.minutes() > 0 ? duration.minutes() : 0;
      this.seconds = duration.seconds() > 0 ? duration.seconds() : 0;
    },
    moment: function (time) {
      return moment(time);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style><style scoped>
.longNameTitle {
  cursor: pointer;
  margin-bottom: 0px !important;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scoreWidth {
  width: 100%;
}

#is-lineUp {
  padding-bottom: 5px;
  font-size: 2rem !important;
}

.penSeance {
  display: flex;
  justify-content: center;
}

.goals-panel {
  font-weight: normal !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  min-width: 45%;
}

.timerNoExpand {
  margin-top: 1rem;
  font-size: 1.5rem;
}

.goals-panelHome {
  font-weight: normal !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-end !important;
  min-width: 45%;
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
  align-items: CENTER;
}

.teamNameGameDesktop {
  font-size: 2rem !important;
  color: #192b41;
  text-align: center;
  background-color: #fff !important;
  align-self: center;
}

.teamNameGameMobile {
  display: none;
}

.vs {
  height: 5rem;
  width: 8rem;
}

.bullsAndBearsPicVSTag > span {
  margin: 0.15rem;
  border: solid #ff7d00;
  border-radius: 5px;
}

.b-tooltip.is-green:before {
  border-right: 6px solid transparent;
  border-bottom: 6px solid #2da94f;
  border-left: 6px solid transparent;
  top: calc(100% + 2px);
}

.b-tooltip.is-red:before {
  border-right: 6px solid transparent;
  border-bottom: 6px solid#eb412d;
  border-left: 6px solid transparent;
  top: calc(100% + 2px);
}

.b-tooltip.is-blueInfo:before {
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

.is-win {
  background-color: #2da94f;
  border-radius: 2px;
  color: white;
}

.form {
  display: flex;
  margin: 1px;
  padding: 1px;
  -webkit-box-align: center;
  align-items: center;
  font-weight: 700;
  -webkit-box-pack: center;
  justify-content: center;
  text-transform: uppercase;
  width: 100%;
  font-size: 1.2rem !important;
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

.is-green {
  background-color: #2da94f;
  color: #eef1f7;
  cursor: pointer;
}

.is-blueInfo {
  background-color: #3273dc;
  color: #eef1f7;
  cursor: pointer;
}

.is-blue {
  background-color: #192b41;
  color: #eef1f7;
}

.is-greyLit {
  background-color: #778899;
  color: #eef1f7;
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

.is-red {
  background-color: #eb412d;
  color: #eef1f7;
  cursor: pointer;
}

.logoClubWrapper {
  display: flex;
  justify-content: center;
}

.Score {
  display: flex;
  font-weight: 1000;
  font-size: 1.5rem;
  margin: 0rem 0.5rem;
}

.pronoPlayer {
  display: flex;
  justify-content: CENTER;
  padding-top: 5px;
  font-weight: 1000;
}

.longNameTitle > strong {
  font-weight: BOLD;
  font-size: 3rem !important;
  color: #192b41;
}

.bandB {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem !important;
}

.bandB > div {
  display: flex;
  justify-content: center;
  width: 100%;
}

.journée {
  display: flex;
  margin: auto;
  margin-bottom: 0.75rem;
}

.journéeSpan {
  align-self: center;
  font-size: 2rem !important;
  margin-right: 10px;
}

.logoligue {
  height: 55px !important;
  width: auto;
  max-height: 55px;
}

.logoligue1 {
  width: auto;
  max-height: 50px;
}
.imgValue {
  width: auto;
  max-height: 40px;
}
.card-content {
  padding: 0.5rem;
}

.timer {
  display: flex;
  justify-content: center;
  color: #ffcf00 !important;
}

.BBull {
  display: flex;
  flex-direction: column;
}

.teamNameGame {
  font-size: 2rem !important;
  color: #192b41;
  text-align: center;
  background-color: #fff !important;
  align-self: center;
}

.bigPicture {
  margin-top: -1rem;
  border: none;
  background-color: transparent;
  width: 10%;
}
.rightBlock {
  width: 10%;
}
.bigPicture > img {
  width: auto;
  height: 110px;
}

.teamLogoGame {
  width: auto;
  height: 70px;
}

.title {
  line-height: 1.25;
  word-break: initial;
}

.level-item {
  display: flex;
  flex-direction: COLUMN;
  justify-content: CENTER;
  width: 100%;
}

.team-banner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.teamDetailHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
}

.matchHeader {
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(219, 219, 219, 0.5);
}

.matchHeader > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}

.matchHeader > div > div {
  display: flex;
  justify-content: center;
}

.matchHeader > div > div > h3 {
  margin: auto;
}

.box {
  padding: 0.25rem;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  margin-bottom: 0.5rem !important;
}
.profile-card {
  padding: 0.1rem !important;
}
.teamClassChamp {
  font-size: 1.3rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 15px !important;
}

.teamClassChamp > strong {
  font-size: 2rem;
  color: #192b41;
  margin-left: 0;
  margin-right: 0;
}

.teamClassUEFA > strong {
  font-size: 2rem;
  color: #192b41;
  margin-left: 0;
  margin-right: 0;
}

.teamClassUEFA {
  font-size: 1.3rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 0rem !important;
}
.teamClassValue {
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 0rem !important;
}
.teamClassValue > span > strong {
  font-size: 1.5rem;
  color: #192b41;
  margin-left: 0;
  margin-right: 0;
}
.teamClassValue > span {
  display: flex;
  align-items: center;
}
.team-priceVarForm {
  font-size: 1.3rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 0.5rem !important;
}

.team-priceVarForm > span {
  border-radius: 3px;
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
  width: 100%;
}
.team-priceVarForm > div {
  border-radius: 3px;
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
  width: 100%;
}

.add-to-watchlist {
  min-width: 30%;
  display: flex;
  flex-direction: column;
}

.bullsAndBearsPic {
  width: 40%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.bullsAndBearsPicVS {
  display: flex;
  justify-content: center;
}

.bullsAndBearsPicVSTag {
  display: flex;
  justify-content: space-around;
  font-weight: bold;
  margin-top: 0.5rem;
}

.bullsAndBears {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100% !important;
}

.Last {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}

#ActionCard {
  width: 100%;
  padding: 0.25rem !important;
}

#teamInfo {
  display: flex;
}
.centerNextMatchDiv > div {
  width: 90%;
  align-items: center;
}
.centerNextMatchDiv {
  width: 90%;
  margin: auto;
  align-content: CENTER;
}
.scoreDetailInPlay {
  display: flex;
  margin: 0 15px;
  align-items: center;
  width: 25%;
  justify-content: center;
}
.homeTeamtitle {
  width: 37%;
  display: FLEX;
  justify-content: flex-end;
}
.awayTeamtitle {
  width: 37%;
  display: FLEX;
  justify-content: flex-start;
}
.vsTeamHeader {
  height: 55px;
  width: auto;
  max-width: 100%;
}

.divVide {
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.divVideMore {
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.divVideMore > i {
  display: flex;
  align-items: center;
}

.share {
  height: 3rem;
  width: auto;
}

.fa-close {
  color: #eb412d;
  vertical-align: middle;
  font-size: 3rem;
}

.missPen {
  height: 25px !important;
  margin-right: 5px !important;
}
.expandResult {
  flex-direction: column;
}
.expandScore {
  display: flex;
  justify-content: center;
}
.expandEvent {
  display: flex;
  justify-content: space-between;
}
.dayChampion {
  display: flex !important;
  align-items: center;
  justify-content: CENTER;
  width: auto !important;
}
.teamLogoGameMobile {
  display: flex;
  justify-content: center;
  align-items: center;
}
.teamLogoGameMobile > img {
  height: 65px;
  width: auto;
}

.anthemLogo {
  filter: invert(70%) sepia(72%) saturate(5498%) hue-rotate(1deg)
    brightness(104%) contrast(105%);
  margin-left: 15px;
  height: 48px;
  width: auto;
}
@media (max-width: 1047px) {
  #ActionCard {
    padding-top: 0.25rem !important;
  }
}

@media (max-width: 769px) {
  .anthemLogo {
    height: 24px;
    margin-left: 5px;
  }

  .matchHeader > div {
    margin: 0;
    align-self: flex-start;
  }
  .form {
    font-size: 0.7rem !important;
  }
  .scoreDetailInPlay {
    width: 33%;
  }
  .homeTeamtitle {
    width: auto;
  }
  .awayTeamtitle {
    width: auto;
  }
  #is-lineUp {
    font-size: 1rem !important;
  }
  .timerNoExpand {
    margin-top: 0rem;
  }
  .timerNoExpand > .timer {
    font-size: 1rem !important;
  }

  .timerNoExpand > .timer > .timer {
    font-size: 1rem !important;
  }

  .media-content {
    padding: 1px;
  }

  #ActionCard {
    width: 100%;
    padding: 0rem !important;
    padding-top: 0.25rem !important;
  }

  .missPen {
    height: 25px !important;
    margin-right: 0px !important;
  }

  section {
    padding-top: 0rem;
  }

  .bigPicture > img {
    height: 3.5rem;
    width: auto;
  }

  .teamLogoGame {
    width: auto;
    height: 50px;
  }

  .team-priceVarForm {
    width: 80%;
    margin: auto;
  }

  .divVide {
    width: auto;
    justify-content: center;
    align-items: center;
    margin: auto !important;
    min-width: 40px;
  }

  .divVideMore {
    width: auto;
    justify-content: flex-end;
    align-items: center;
    margin: auto !important;
    min-width: 50px;
  }

  .share {
    height: 2rem;
  }

  .fa-close {
    font-size: 2rem;
  }

  div {
    font-size: 0.6rem;
  }

  .vsTeamHeader {
    height: 40px;
    width: AUTO;
    max-width: 50px;
  }

  .goals-panel {
    min-width: 45%;
  }

  .goals-panelHome {
    min-width: 45%;
  }

  .scoreWidth {
    width: 100%;
  }
  .scoreWidth > div > strong {
    font-size: 0.8rem;
  }
  .teamLogoGameMobile {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .teamLogoGameMobile > img {
    height: 45px;
    width: auto;
  }
  .teamNameGameMobile {
    display: block;
    font-size: 1rem !important;
    color: #192b41;
    text-align: center;
    background-color: #fff !important;
    align-self: center;
  }

  .teamNameGameDesktop {
    display: none;
  }

  .teamNameGame {
    font-size: 1rem !important;
  }

  .teamClassChamp {
    margin-bottom: 5px !important;
  }

  .teamClassChamp > strong {
    font-size: 1rem;
    margin: auto;
    margin-left: 0;
    margin-right: 0;
  }

  .teamClassUEFA > strong {
    font-size: 0.9rem;
    margin: auto;
    margin-left: 0;
    margin-right: 0;
  }
  .imgValue {
    height: 20px;
  }
  .teamClassValue > span > strong {
    font-size: 0.85rem;
    margin: auto;
    margin-left: 0;
    margin-right: 0;
  }
  .pronoPlayer {
    display: flex;
    margin-top: 0.2rem;
    margin: auto;
  }

  .vs {
    height: 2.5rem;
    width: 4rem;
  }

  .control {
    margin-bottom: 3px;
    display: flex !important;
  }

  .cardRefer {
    width: 32px;
    height: 20px;
  }

  .add-to-watchlist {
    align-self: center;
    width: auto;
    width: 55%;
  }
  .rightBlock {
    width: auto;
    min-width: 55px;
  }
  .bigPicture {
    margin-top: 0rem;
    width: fit-content;
    min-width: 55px;
  }

  .journée > div {
    font-size: 1rem !important;
  }

  .journéeSpan {
    align-self: center;
    font-size: 1rem !important;
  }

  .logoligue1 {
    width: auto;
    height: 30px;
  }

  .logoligue {
    width: auto;
    padding-right: 0px;
    height: 35px !important;
  }

  .goalsaway > img {
    max-height: 25px !important;
  }

  .goalshome > img {
    max-height: 25px !important;
  }

  .has-text-green {
    font-size: 0.7rem !important;
  }

  .has-text-red {
    font-size: 0.7rem !important;
  }
  .timeMatch {
    font-size: 1rem !important;
    font-weight: BOLD !important;
  }
  .bandB {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bullsAndBearsPic {
    width: 55%;
  }

  .bullsAndBears {
    justify-content: space-between !important;
  }

  .card-content {
    padding: 0rem;
  }

  .longNameTitle {
    margin-bottom: 5px !important;
    font-size: 0.8rem !important;
  }

  .longNameTitle > strong {
    font-size: 1.2rem !important;
  }

  .team-banner {
    display: flex;
  }

  .level-item {
    max-width: 100%;
    margin-bottom: 0px !important;
    font-size: 0.6rem;
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
    border-radius: 3px !important;
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
@media (max-width: 360px) {
  .timerNoExpand > .timer {
    font-size: 0.9rem !important;
  }

  .timerNoExpand > .timer > .timer {
    font-size: 0.9rem !important;
  }
}
@media (max-width: 321px) {
  .scoreDetailInPlay {
    width: 40%;
  }
  .longNameTitle > strong {
    font-size: 1rem !important;
  }
  .teamClassValue > span > strong {
    font-size: 0.7rem;
  }
  .teamClassChamp > strong {
    font-size: 0.9rem;
  }
  .logoligue1 {
    width: auto;
    height: 25px;
  }
  .imgValue {
    width: auto;
    height: 15px;
  }
}
</style>
