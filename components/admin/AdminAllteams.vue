<template>
  <section>
    <section class="hero welcome is-small">
      <div class="hero-body">
        <div class>
          <h1 class="title helloText">Bonjour {{ $auth.user.username }},</h1>
          <h2 class="subtitle">
            Gestion des
            <span class="has-text-white is-bold">{{
              insidersTeams.length > 0 ? insidersTeams.length : ""
            }}</span>
            équipes
          </h2>
          <div class="displayFlex">
            <client-only v-if="jsonForXcell.length > 0" class="title exportCsv">
              <download-csv
                :name="'AllTeams' + '.csv'"
                :separator-excel="true"
                :data="jsonForXcell"
              >
                <div class="displayFlex">
                  <button class="button is-success is-medium is-outlined">
                    Export Excel : {{ jsonForXcell.length }} équipes
                  </button>
                </div>
              </download-csv>
            </client-only>
            <div
              v-if="jsonForXcell.length == 0"
              class="displayFlex exportCsv xcellButton"
            >
              <button
                @click="getXcell()"
                class="button xcelBut is-success is-medium is-outlined"
              >
                Export Excel des équipes
              </button>
            </div>

            <client-only
              v-if="jsonForXcellPlayers.length > 0"
              class="title exportCsv"
            >
              <download-csv
                :name="'AllTeams' + '.csv'"
                :separator-excel="true"
                :data="jsonForXcellPlayers"
              >
                <div class="displayFlex">
                  <button class="button is-success is-medium is-outlined">
                    Export Excel : {{ jsonForXcellPlayers.length }} joeurs
                  </button>
                </div>
              </download-csv>
            </client-only>
            <div
              v-if="jsonForXcellPlayers.length == 0"
              class="displayFlex exportCsv xcellButton"
            >
              <button
                @click="getXcellPlayer()"
                class="button xcelBut is-success is-medium is-outlined"
              >
                Export Excel des joeurs
              </button>
            </div>
          </div>
        </div>
        <div class>
          <button @click="majMatchs()" class="button is-success">
            Mise à jour de tous les nextmatchs des équipes de toutes les saisons
            de championnat actives
          </button>
          <div class="displayFlex threeButtonsWrapper">
            <button @click="goForupdateFootballData" class="button is-danger">
              UPDATE-FOOTBALL-DATA
            </button>
            <button @click="goForupdateNameTeam" class="button is-warning">
              UPDATE-NAME-TEAM
            </button>
            <button @click="goForCies" class="button is-success is-outlined">
              CIES Player Ids
            </button>
          </div>
        </div>
      </div>
    </section>

    <h1 class="container">
      <nav class="flag">
        <img
          :class="{
            'is-not-active': champSelected == 'NextMatch',
            'is-active': champSelected != 'NextMatch',
          }"
          class="flag-img"
          @click="selected('NextMatch')"
          src="/logoLigue/Matchs-du-jour-blue.png"
          alt="NextMatch"
        />
        <img
          :class="{
            'is-active': champSelected == 'NextMatch',
            'is-not-active': champSelected != 'NextMatch',
          }"
          class="flag-img"
          src="/logoLigue/Matchs-du-jour-or.png"
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
    <div>
      <b-field>
        <b-input placeholder="search" v-model="search_query" />
      </b-field>
      <b-table
        class="overflowX"
        :loading="loading"
        :data="filter"
        :paginated="isPaginated"
        :per-page="perPage"
        :pagination-simple="isPaginationSimple"
        :total="total"
        :hoverable="true"
        :striped="true"
        :mobile-cards="false"
        default-sort-direction="asc"
        default-sort="name"
      >
        <template slot-scope="props">
          <b-table-column centered field="id" label="id" sortable>
            <div class="">
              <strong class>{{ props.row._id }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            centered
            field="id_sportmonks"
            label="id_sportmonks"
            sortable
          >
            <div class="teamNameLogo">
              <strong class>{{ props.row.id_sportmonks }}</strong>
            </div>
          </b-table-column>
          <b-table-column centered field="name" label="Nom" sortable>
            <div class="teamNameLogo">
              <img
                loading="lazy"
                class
                :src="props.row.teamImg"
                :alt="props.row.name"
              />
              <strong class="teamNameStrong">{{ props.row.name }}</strong>
            </div>
          </b-table-column>
          <b-table-column centered field="isActive" label="isActive" sortable>
            <div class="teamNameLogo">
              <strong class="teamNameStrong">{{ props.row.isActive }}</strong>
            </div>
          </b-table-column>

          <b-table-column
            centered
            field="searchName"
            label="searchName"
            sortable
          >
            <div class="teamNameLogo">
              <strong class="teamNameStrong">{{ props.row.searchName }}</strong>
            </div>
          </b-table-column>
          <b-table-column centered field="shortName" label="shortName" sortable>
            <div class="teamNameLogo">
              <strong class="teamNameStrong">{{ props.row.shortName }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            centered
            field="frenchName"
            label="frenchName"
            sortable
          >
            <div class="teamNameLogo">
              <strong class="teamNameStrong">{{ props.row.frenchName }}</strong>
            </div>
          </b-table-column>
          <b-table-column centered field="founded" label="founded" sortable>
            <div class="teamNameLogo">
              <strong class="teamNameStrong">{{ props.row.founded }}</strong>
            </div>
          </b-table-column>

          <b-table-column
            centered
            field="uefaranking"
            label="uefaranking"
            sortable
          >
            <div class="teamNameLogo">
              <strong class="teamNameStrong">{{
                props.row.uefaranking ? props.row.uefaranking.data.position : ""
              }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            centered
            field="fifaranking"
            label="fifaranking"
            sortable
          >
            <div class="teamNameLogo">
              <strong class="teamNameStrong">{{
                props.row.fifaranking ? props.row.fifaranking.data.position : ""
              }}</strong>
            </div>
          </b-table-column>
          <b-table-column centered field="anthem" label="anthem" sortable>
            <div class="teamNameLogo">
              <strong class="teamNameStrong">{{ props.row.anthem }}</strong>
            </div>
          </b-table-column>
          <b-table-column
            centered
            field="coach.coachDetail"
            label="Coach"
            sortable
          >
            <div v-if="props.row.coach.coachDetail" class="teamNameLogo">
              <img
                class
                :src="props.row.coach.coachDetail.image_path"
                :alt="props.row.coach.coachDetail.common_name"
              />
              <strong class="teamNameStrong">{{
                props.row.coach.coachDetail.common_name
              }}</strong>
            </div>
          </b-table-column>

          <b-table-column centered field=" " label=" " sortable>
            <div>
              <button class="button" @click="goMajNextMatchs(props.row)">
                MaJ nextmatchs
              </button>
              <button class="button" @click="goTeamDb(props.row)">
                Modifier l'équipe
              </button>
              <button class="button" @click="updateTeam(props.row)">
                Update l'équipe
              </button>
            </div>
          </b-table-column>
        </template>
        <template slot="empty">
          <div class="content has-text-grey has-text-centered">
            <p>...</p>
          </div>
        </template>
      </b-table>
    </div>

    <b-modal
      v-if="displayTeam"
      class="modifiermissionModalWrapper"
      :active.sync="modalTeam"
      has-modal-card
    >
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <div class="modal-card-title">
            <span>{{ displayTeam.name }}</span>
          </div>
        </header>
        <section class="modal-card-body">
          <b-field label="Nom">
            <b-input v-model="displayTeam.name"></b-input>
          </b-field>
          <b-field label="searchName">
            <b-input v-model="displayTeam.searchName"></b-input>
          </b-field>
          <b-field label="shortName">
            <b-input v-model="displayTeam.shortName"></b-input>
          </b-field>
          <b-field label="frenchName">
            <b-input v-model="displayTeam.frenchName"></b-input>
          </b-field>
          <b-field label="anthem">
            <b-input v-model="displayTeam.anthem"></b-input>
          </b-field>
          <b-field label="isActive">
            <b-select v-model="displayTeam.isActive">
              <option value="true">true</option>
              <option value="false">false</option>
            </b-select>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <div class="displayFlex">
            <button @click="closeModalTeam" class="button is-danger">X</button>
            <button @click="saveTeamChange" class="button is-success">
              Save
            </button>
          </div>
        </footer>
      </div>
    </b-modal>
  </section>
</template>

<script>
import {
  updateFootballData,
  chargeFormeandMatchlist,
  getAllteams,
  patchTeamForInsiders,
  updateAteambyId,
  updateNextMatchs,
  getExcelTeams,
  updateNameTeams,
  ciesUpdate,
  getExcelPlayers,
} from "@/server/admin";
export default {
  data() {
    return {
      teams: [],
      insidersTeams: [],
      detail: [],
      loading: false,
      total: 0,
      loading: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 50,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      modalTeam: false,
      displayTeam: "",
      activeTab: 0,
      search_query: "",
      jsonForXcell: [],
      jsonForXcellPlayers: [],
      champSelected: "",
    };
  },
  mounted() {
    if (this.connectedUser.role != "admin") {
      this.$router.push(`/`);
    } else {
      this.fetchData();
    }
  },
  computed: {
    connectedUser() {
      return this.$store.state.auth.user;
    },
    filter: function () {
      var name_re = new RegExp(this.search_query, "i");
      var insidersTeams = [];
      for (let i = 0; i < this.insidersTeams.length; i++) {
        if (
          (this.insidersTeams[i].name
            ? this.insidersTeams[i].name.match(name_re)
            : "") ||
          (this.insidersTeams[i].searchName
            ? this.insidersTeams[i].searchName.match(name_re)
            : "")
        ) {
          insidersTeams.push(this.insidersTeams[i]);
        }
      }
      return insidersTeams;
    },
  },
  methods: {
    selected(champSelected) {
      this.loading = true;
      this.champSelected = champSelected;
      let query = {};
      query.championship = champSelected;
      getAllteams(query).then((insidersTeams) => {
        console.log("insidersTeams", insidersTeams);
        if (insidersTeams === "unauthorized") {
          this.$router.push("/404");
        } else {
          this.insidersTeams = insidersTeams;
          this.loading = false;
        }
      });
    },
    goForCies() {
      ciesUpdate().then((resp) => {
        this.$buefy.toast.open({
          message: "Mis à jour en cours",
          type: "is-success",
        });
      });
    },
    goForupdateNameTeam() {
      updateNameTeams().then((resp) => {
        this.$buefy.toast.open({
          message: "Mis à jour en cours",
          type: "is-success",
        });
      });
    },
    goForupdateFootballData() {
      updateFootballData().then((resp) => {
        this.$buefy.toast.open({
          message: "Mis à jour en cours",
          type: "is-success",
        });
      });
    },
    getXcell() {
      if (this.$store.state.auth.user._id) {
        getExcelTeams().then((resp) => {
          this.jsonForXcell = resp;
        });
      }
    },
    getXcellPlayer() {
      if (this.$store.state.auth.user._id) {
        getExcelPlayers().then((resp) => {
          this.jsonForXcellPlayers = resp;
        });
      }
    },
    goMajNextMatchs(event) {
      chargeFormeandMatchlist(event.id_sportmonks).then((resp) => {
        this.$buefy.toast.open({
          message: "Mis à jour effectuée",
          type: "is-success",
        });
        this.fetchData();
      });
    },
    majMatchs() {
      updateNextMatchs().then((resp) => {
        this.$buefy.toast.open({
          message: "Mis à jour effectuée",
          type: "is-success",
        });
        this.fetchData();
      });
    },
    closeModalTeam() {
      this.displayTeam = "";
      this.modalTeam = false;
    },
    saveTeamChange() {
      this.displayTeam.isActive =
        this.displayTeam.isActive == "true" ? true : false;
      patchTeamForInsiders(this.displayTeam._id, this.displayTeam).then(
        (resp) => {
          this.$buefy.toast.open({
            message: "L'équipe a éte modifiée",
            type: "is-success",
          });
          this.displayTeam = "";
          this.modalTeam = false;
          this.fetchData();
        }
      );
    },
    fetchData() {
      if (this.connectedUser.role != "admin") {
        this.$router.push(`/`);
      }
      //.catch(next);
    },

    updateTeam(event) {
      updateAteambyId(event.id_sportmonks).then((teams) => {
        let teamSportsMonkToUpdate = teams.data.filter(
          (t) => t.id == event.id_sportmonks
        )[0];
        let team = {
          coach: {},
        };
        team.coach.coachDetail = teamSportsMonkToUpdate.coach.data;
        team.teamImg = teamSportsMonkToUpdate.logo_path;
        team.squad = teamSportsMonkToUpdate.squad;
        team.stats = teamSportsMonkToUpdate.stats;
        team.transfers = teamSportsMonkToUpdate.transfers;
        team.uefaranking = teamSportsMonkToUpdate.uefaranking;
        team.stadium = teamSportsMonkToUpdate.venue_id;
        team.founded = teamSportsMonkToUpdate.founded;
        if (teamSportsMonkToUpdate.fifaranking) {
          team.fifaranking = teamSportsMonkToUpdate.fifaranking;
        }
        if (teamSportsMonkToUpdate.uefaranking) {
          team.uefaranking = teamSportsMonkToUpdate.uefaranking;
        }
        patchTeamForInsiders(event._id, team).then((resp) => {
          this.$buefy.toast.open({
            message: "L'équipe a éte updatée",
            type: "is-success",
          });
          this.fetchData();
        });
      });
    },

    goTeamDb(event) {
      this.displayTeam = event;
      this.modalTeam = true;
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
.threeButtonsWrapper {
  justify-content: space-between;
  margin-top: 10px;
}

.container {
  max-width: 100%;
}

.is-success {
  border: 1px solid #23d160 !important;
}

.teamNameStrong {
  font-size: 1.2rem;
}
.has-text-white {
  color: #fff !important;
}
.hero {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 15px;
  background: linear-gradient(90deg, #192b41, #296084);
  margin-top: -1rem;
}

.hero.welcome .title,
.hero.welcome .subtitle {
  color: hsl(192, 17%, 99%);
}

.helloText {
  text-align: left !important;
}

.hero.is-small .hero-body {
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
}

.hero-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 3rem 1rem;
}

.tile.is-ancestor:last-child {
  margin-bottom: -0.75rem;
}

.tile.is-ancestor {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;
}

.tile {
  align-items: stretch;
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: -webkit-min-content;
  min-height: -moz-min-content;
  min-height: min-content;
}

h1 {
  font-weight: bold !important;
  text-align: center;
}

.teamNameLogo {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
}

.teamNameLogo > img {
  max-height: 64px !important;
  width: auto;
  margin: auto;
  padding: 1px;
}

@media (max-width: 1047px) {
  .teamNameStrong {
    font-size: 1rem;
  }

  .title {
    font-size: 1.2rem;
  }

  .hero {
    margin-top: 0rem;
  }

  .teamNameLogo > img {
    max-height: 45px !important;
    width: auto;
    margin: auto;
    padding: 1px;
  }
}
</style>
