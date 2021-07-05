<template>
  <section>
    <div v-if="babbleTodisplay">
      <b-modal id="babbleActivModal" :active.sync="babbleTodisplayActive">
        <displaybabble-modal
          @changeBabbles="updateTimelineBabble($event)"
          class="page-enter-active"
          :babbleTodisplay="babbleTodisplay"
        ></displaybabble-modal>
      </b-modal>
    </div>
    <!-- <div>
      <nav-contest v-if="postWriting === true"></nav-contest>
    </div>-->
    <section v-if="team.shortName" class="section">
      <team-header
        v-if="team && postWriting === false"
        :team="team"
      ></team-header>

      <b-loading
        :is-full-page="true"
        :active.sync="isLoading"
        :canCancel="false"
      ></b-loading>
      <div class="primordial" v-if="postWriting === false">
        <div class="sct1">
          <side-current-insight
            v-if="!mobile && $auth.user && $auth.user._id"
            @ligue="ligue($event)"
            class="sidect1 sci"
            @changeWatchlist="updateWatchList($event)"
          ></side-current-insight>
          <side-current-insight-unconnect
            v-else-if="!mobile"
            @signup="signup()"
            class="sidect1 sci"
          ></side-current-insight-unconnect>

          <div class="babblesField column is-6">
            <nav class="navbar is-dark">
              <div class="mainMenu">
                <span @click="all" class="navbar-item is-tab itemMenu">
                  <img
                    loading="lazy"
                    class="is-35"
                    src="~assets/images/teams/rumour.png"
                    alt="rumour"
                  />
                </span>
                <span @click="videos" class="navbar-item is-tab itemMenu">
                  <img
                    loading="lazy"
                    class="is-35"
                    src="~assets/images/teams/soccervideo.png"
                    alt="video"
                  />
                </span>

                <span @click="effectif" class="navbar-item is-tab itemMenu">
                  <img
                    v-if="team.home_shirt"
                    loading="lazy"
                    class="shirtOfficial"
                    :src="team.home_shirt"
                    :alt="team.shortName"
                  />
                  <img
                    v-else
                    loading="lazy"
                    class="is-35 invertOk"
                    src="~assets/images/teams/maillot.png"
                    :alt="team.shortName"
                  />
                </span>

                <span @click="calendrier" class="navbar-item is-tab itemMenu">
                  <img
                    loading="lazy"
                    class="is-35 invertOk"
                    src="~assets/images/teams/calendarTeam.png"
                    alt="calendar"
                  />
                </span>
                <span
                  v-if="!mobile"
                  @click="resultat"
                  class="navbar-item is-tab itemMenu desktopOnly"
                >
                  <img
                    loading="lazy"
                    class="is-35"
                    src="~assets/images/ballon-bleu.png"
                    alt="ballon"
                  />
                </span>

                <span
                  v-if="!mobile"
                  @click="coach"
                  class="navbar-item is-tab itemMenu desktopOnly"
                >
                  <img
                    v-if="
                      team &&
                      team.coach &&
                      team.coach.coachDetail &&
                      team.coach.coachDetail.image_path
                    "
                    class="is-35 coachImg"
                    :src="team.coach.coachDetail.image_path"
                    alt="coach"
                    loading="lazy"
                  />

                  <img
                    loading="lazy"
                    v-else
                    class="is-35 coachImg"
                    src="~assets/images/teams/coach.png"
                    alt="coach"
                  />
                </span>

                <span
                  v-if="!mobile && team.isNationalTeam === false"
                  class="navbar-item is-tab itemMenu desktopOnly"
                  @click="transfert"
                >
                  <img
                    loading="lazy"
                    class="is-35 invertOk"
                    src="~assets/images/teams/transfert.png"
                    alt="transfert"
                  />
                </span>

                <span
                  v-if="!mobile"
                  @click="songs"
                  class="navbar-item is-tab itemMenu desktopOnly"
                >
                  <img
                    loading="lazy"
                    class="is-35 invertOk"
                    src="~assets/images/teams/music-song.png"
                    alt="chant"
                  />
                </span>
                <!--<span class="navbar-item is-tab itemMenu desktopOnly">
									<nuxt-link :to="`/teams/${team.shortName}/forum`">
										<img
											loading="lazy"
											class="is-35 invertOk"
											src="~assets/images/teams/question-mark-9.png"
											alt="forum"
										/>
									</nuxt-link>
								</span>-->
                <span
                  v-if="!mobile"
                  @click="podCasts"
                  class="navbar-item is-tab itemMenu desktopOnly"
                >
                  <img
                    loading="lazy"
                    class="is-35"
                    src="~assets/images/teams/podcast.png"
                    alt="podcast"
                  />
                </span>

                <span
                  v-if="mobile"
                  class="mobileOnly navbar-item is-tab itemMenu itemMenuDots"
                >
                  <b-dropdown :triggers="['hover']">
                    <template #trigger>
                      <img
                        loading="lazy"
                        class="is-35 invertOk"
                        src="~assets/images/teams/dots.png"
                        alt="dots"
                      />
                    </template>

                    <b-dropdown-item>
                      <span @click="resultat" class="babMenu">
                        <img
                          loading="lazy"
                          class="is-30"
                          src="~assets/images/ballon-bleu.png"
                          alt="ballon"
                        />
                        {{ langSelected === "EN" ? "result" : "résultats" }}
                      </span>
                    </b-dropdown-item>
                    <b-dropdown-item>
                      <span @click="coach" class="babMenu">
                        <img
                          v-if="
                            team &&
                            team.coach &&
                            team.coach.coachDetail &&
                            team.coach.coachDetail.image_path
                          "
                          class="is-30 coachImg"
                          :src="team.coach.coachDetail.image_path"
                          alt="coach"
                        />

                        <img
                          loading="lazy"
                          v-else
                          class="is-30 coachImg"
                          src="~assets/images/teams/coach.png"
                          alt="coach"
                        />coach
                      </span>
                    </b-dropdown-item>

                    <b-dropdown-item>
                      <span
                        v-if="team.isNationalTeam === false"
                        @click="transfert"
                        class="babMenu"
                      >
                        <img
                          loading="lazy"
                          class="is-30 invertOk"
                          src="~assets/images/teams/transfert.png"
                          alt="transfert"
                        />{{ langSelected === "EN" ? "transfer" : "transfert" }}
                      </span>
                    </b-dropdown-item>
                    <b-dropdown-item>
                      <span @click="songs" class="babMenu">
                        <img
                          loading="lazy"
                          class="is-30 invertOk"
                          src="~assets/images/teams/music-song.png"
                          alt="chant"
                        />{{ langSelected === "EN" ? "songs" : "chants" }}
                      </span>
                    </b-dropdown-item>
                    <!--   <b-dropdown-item>
                           <nuxt-link :to="`/teams/${team.shortName}/forum`">
											<span class="babMenu">
												<img
													loading="lazy"
													class="is-30 invertOk"
													src="~assets/images/teams/question-mark-9.png"
													alt="forum"
												/>forum
											</span>
										</nuxt-link>
                          </b-dropdown-item>-->
                    <b-dropdown-item>
                      <span @click="podCasts" class="babMenu">
                        <img
                          loading="lazy"
                          class="is-30"
                          src="~assets/images/teams/podcast.png"
                          alt="podcast"
                        />podcast
                      </span>
                    </b-dropdown-item>
                  </b-dropdown>
                </span>

                <!--
                <span
                  v-if="mobile"
                  @click="ActivMobileDrop"
                  class="mobileOnly navbar-item is-tab itemMenu itemMenuDots"
                >
                  <img
                    loading="lazy"
                    class="is-35 invertOk"
                    src="~assets/images/teams/dots.png"
                    alt="dots"
                  />
                </span>

                <div v-if="mobileDropActiv === true" class="mobileDrop">
                  <div class="mobileDropSub">
                    <span @click="resultat" class="babMenu">
                      <img
                        loading="lazy"
                        class="is-30"
                        src="~assets/images/ballon-bleu.png"
                        alt="ballon"
                      />résultats
                    </span>

                    <span @click="coach" class="babMenu">
                      <img
                        v-if="
                          team &&
                          team.coach &&
                          team.coach.coachDetail &&
                          team.coach.coachDetail.image_path
                        "
                        class="is-30"
                        :src="team.coach.coachDetail.image_path"
                        alt="coach"
                      />

                      <img
                        loading="lazy"
                        v-else
                        class="is-30"
                        src="~assets/images/teams/coach.png"
                        alt="coach"
                      />coach
                    </span>

                    <span
                      v-if="team.isNationalTeam === false"
                      @click="transfert"
                      class="babMenu"
                    >
                      <img
                        loading="lazy"
                        class="is-30 invertOk"
                        src="~assets/images/teams/transfert.png"
                        alt="transfert"
                      />transfert
                    </span>

                    <span @click="songs" class="babMenu">
                      <img
                        loading="lazy"
                        class="is-30 invertOk"
                        src="~assets/images/teams/music-song.png"
                        alt="chant"
                      />chants
                    </span>
                    <nuxt-link :to="`/teams/${team.shortName}/forum`">
											<span class="babMenu">
												<img
													loading="lazy"
													class="is-30 invertOk"
													src="~assets/images/teams/question-mark-9.png"
													alt="forum"
												/>forum
											</span>
										</nuxt-link>

                    <span @click="podCasts" class="babMenu">
                      <img
                        loading="lazy"
                        class="is-30"
                        src="~assets/images/teams/podcast.png"
                        alt="podcast"
                      />podcast
                    </span>
                  </div>
                </div>
                -->
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
                  <nav
                    v-if="
                      filterBy === 'calendrier' ||
                      filterBy === 'coach' ||
                      filterBy === 'transfert' ||
                      filterBy === 'resultats' ||
                      filterBy === 'effectif'
                    "
                    class="navbar is-dark subMenu"
                  >
                    <div class="babblesMenu">
                      <span v-if="filterBy === 'calendrier'" class="babMenu">
                        <img
                          loading="lazy"
                          class="is-30 invertOk"
                          src="~assets/images/teams/calendarTeam.png"
                          alt="calendar"
                        />
                        {{ langSelected === "EN" ? "calendar" : "calendrier" }}
                      </span>
                      <span v-if="filterBy === 'resultats'" class="babMenu">
                        <img
                          loading="lazy"
                          class="is-30"
                          src="~assets/images/ballon-bleu.png"
                          alt="ballon"
                        />
                        {{ langSelected === "EN" ? "result" : "résultats" }}
                      </span>
                      <span v-if="filterBy === 'coach'" class="babMenu">
                        <img
                          v-if="
                            team &&
                            team.coach &&
                            team.coach.coachDetail &&
                            team.coach.coachDetail.image_path
                          "
                          class="is-30 coachImg"
                          :src="team.coach.coachDetail.image_path"
                          alt="coach"
                        />

                        <img
                          loading="lazy"
                          v-else
                          class="is-30 coachImg"
                          src="~assets/images/teams/coach.png"
                          alt="coach"
                        />
                        coach
                      </span>
                      <span v-if="filterBy === 'effectif'" class="babMenu">
                        <img
                          v-if="team.away_shirt"
                          loading="lazy"
                          class="shirtOfficial"
                          :src="team.away_shirt"
                          :alt="team.shortName"
                        />
                        <img
                          v-else
                          loading="lazy"
                          class="is-30 invertOk"
                          src="~assets/images/teams/maillot.png"
                          :alt="team.shortName"
                        />
                        {{ langSelected === "EN" ? "squad" : "effectif" }}
                      </span>
                      <span
                        v-if="filterBy === 'transfert'"
                        class="transfertSub"
                      >
                        <p class="babMenu">
                          <img
                            loading="lazy"
                            class="is-30 invertOk"
                            src="~assets/images/teams/transfert.png"
                            alt="transfert"
                          />
                          {{ langSelected === "EN" ? "transfer" : "transfert" }}
                        </p>
                        <nav class="navbar is-wc navTransf">
                          <div class="babblesMenu">
                            <a
                              @click="getArrivee()"
                              :class="{ 'is-on': indexSelected === 'arrivee' }"
                              class="babMenu transfertMenu navbar-item is-tab"
                            >
                              <i
                                class="has-text-green fa fa-arrow-circle-right"
                              ></i
                              >&nbsp
                              {{
                                langSelected === "EN" ? "incoming" : "arrivées"
                              }}
                            </a>
                            <a
                              @click="getDepart()"
                              :class="{ 'is-on': indexSelected === 'depart' }"
                              class="babMenu transfertMenu navbar-item is-tab"
                            >
                              {{
                                langSelected === "EN" ? "departures" : "départs"
                              }}
                              &nbsp
                              <i
                                class="has-text-red fa fa-arrow-circle-right"
                              ></i>
                            </a>
                          </div>
                        </nav>
                      </span>
                      <span v-if="filterBy === 'but'" class="babMenu">
                        <img
                          loading="lazy"
                          class="is-30"
                          src="~assets/images/teams/soccervideo.png"
                          alt="video"
                        />
                        {{ langSelected === "EN" ? "videos" : "vidéos" }}
                      </span>
                    </div>
                  </nav>

                  <team-coach
                    v-if="team && filterBy === 'coach'"
                    @getCoach="getCoach()"
                    @signup="signup()"
                    :filterBy="filterBy"
                    :team="team ? team : {}"
                  ></team-coach>
                  <timeline-babble
                    v-if="
                      team &&
                      (filterBy === 'forum' ||
                        filterBy === 'songs' ||
                        filterBy === 'podcast' ||
                        filterBy === 'buts' ||
                        filterBy === 'all')
                    "
                    :filterBy="filterBy"
                    @loadMore="loadMore($event)"
                    :forums="forums"
                    @forum="forum()"
                    @songs="songs()"
                    @podCast="podCasts()"
                    @buts="videos()"
                    :team="team ? team : {}"
                    :babbles="babbles"
                    :babblesPodcast="babblesPodcast"
                    :babblesVideo="babblesVideo"
                    :babblesSong="babblesSong"
                    @sort="changeSort($event)"
                    @changeBabbles="updateTimelineBabble($event)"
                  ></timeline-babble>
                  <div
                    id="loader-container"
                    v-if="
                      team &&
                      (filterBy === 'forum' ||
                        filterBy === 'songs' ||
                        filterBy === 'podcast' ||
                        filterBy === 'buts' ||
                        filterBy === 'all') &&
                      loadMoreIsActive &&
                      isLoading == false
                    "
                  >
                    <slot name="loading">
                      <div class="spinner"></div>
                    </slot>
                  </div>

                  <detail-club-player
                    v-if="filterBy === 'effectif'"
                    :team="team"
                  ></detail-club-player>
                  <detail-club-resultat
                    v-else-if="filterBy === 'resultats'"
                    :team="team"
                  ></detail-club-resultat>
                  <detail-club-calendrier
                    v-else-if="filterBy === 'calendrier'"
                    :team="team"
                  ></detail-club-calendrier>
                  <div
                    v-else-if="
                      filterBy === 'transfert' &&
                      team &&
                      team.isNationalTeam === false
                    "
                  >
                    <detail-club-arrivee
                      v-if="indexSelected === 'arrivee'"
                      :team="team"
                    ></detail-club-arrivee>
                    <detail-club-depart
                      v-if="indexSelected === 'depart'"
                      :team="team"
                    ></detail-club-depart>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!mobile" class="column is-3 sci">
            <client-only>
              <match-inplay
                v-if="matches && matches.length > 0"
                @ligue="ligue($event)"
                class="column is-12 inPlayMatch"
              ></match-inplay>
              <side-next-affiche
                class="column is-12 sidect1"
                @ligue="ligue($event)"
              ></side-next-affiche>
            </client-only>
            <!--<side-recent-activity  class="column is-12 sidect1 " :recentPositions ="recentPositions"></side-recent-activity>-->
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import {
  getAllForums,
  getRecentPosition,
  getTeamBabbles,
  getPodcast,
  getFanSong,
  getTeam,
  getGoalsVideos,
} from "@/server/api";

export default {
  scrollToTop: true,
  components: {
    DisplaybabbleModal: () =>
      import("@/components/side-component/DisplaybabbleModal"),
    SideNextAffiche: () =>
      import("@/components/side-component/SideNextAffiche"),
    SideCurrentInsight: () =>
      import("@/components/side-component/SideCurrentInsight"),
    SideCurrentInsightUnconnect: () =>
      import("@/components/side-component/SideCurrentInsightUnconnect"),
    TeamCoach: () => import("@/components/team/TeamCoach"),
    SideRecentActivity: () =>
      import("@/components/side-component/SideRecentActivity"),
    MatchInplay: () => import("@/components/side-component/MatchInplay"),
    TeamHeader: () => import("@/components/team/TeamHeader"),
    TimelineBabble: () => import("@/components/side-component/TimelineBabble"),
    detailClubPlayer: () => import("@/components/team/detailClubPlayer"),
    detailClubResultat: () => import("@/components/team/detailClubResultat"),
    detailClubCalendrier: () =>
      import("@/components/team/detailClubCalendrier"),
    detailClubDepart: () => import("@/components/team/detailClubDepart"),
    detailClubArrivee: () => import("@/components/team/detailClubArrivee"),
  },
  name: "teamPage",
  auth: false,
  async asyncData({ params, store }) {
    let favTeam =
      store.state.datapage && store.state.datapage.favTeam
        ? store.state.datapage.favTeam
        : "";
    let favTeambabble =
      store.state.datapage && store.state.datapage.favTeambabble
        ? store.state.datapage.favTeambabble
        : "";

    let [
      team,
      babbles,
      babblesPodcast,
      babblesVideo,
      babblesSong,
      forums,
      filterBy,
    ] = await Promise.all([
      favTeam && favTeam.shortName && params.shortName == favTeam.shortName
        ? favTeam
        : getTeam(params.shortName),
      favTeambabble &&
      favTeam &&
      favTeam.shortName &&
      params.shortName == favTeam.shortName
        ? favTeambabble.babbles
        : (params.path && params.path == "all") || !params.path
        ? getTeamBabbles(params.shortName, "all", 1)
        : "",
      params.path && params.path == "podcast"
        ? getPodcast(params.shortName, 1)
        : "",
      params.path && params.path == "buts"
        ? getGoalsVideos(params.shortName, 1)
        : "",
      params.path && params.path == "songs"
        ? getFanSong(1, params.shortName)
        : "",
      params.path && params.path == "forum"
        ? getAllForums(1, params.shortName)
        : "",
      params.path ? params.path : "all",
    ]);
    return {
      team: team,
      babbles: babbles,
      babblesPodcast: babblesPodcast,
      babblesVideo: babblesVideo,
      babblesSong: babblesSong,
      forums: forums,
      filterBy: filterBy,
    };
  },
  mounted() {
    if (
      this.filterBy == "all" &&
      ((this.babbles && this.babbles[0] == ["empty"]) || !this.babbles)
    ) {
      this.filterBy = "effectif";
    } else if (
      this.filterBy == "forum" &&
      ((this.forums && this.forums[0] == ["empty"]) || !this.forums)
    ) {
      this.filterBy = "effectif";
    } else if (
      this.filterBy == "podcast" &&
      ((this.babblesPodcast && this.babblesPodcast[0] == ["empty"]) ||
        !this.babblesPodcast)
    ) {
      this.filterBy = "effectif";
    } else if (
      this.filterBy == "buts" &&
      ((this.babblesVideo && this.babblesVideo[0] == ["empty"]) ||
        !this.babblesVideo)
    ) {
      this.filterBy = "effectif";
    } else if (
      this.filterBy == "songs" &&
      ((this.babblesSong && this.babblesSong[0] == ["empty"]) ||
        !this.babblesSong)
    ) {
      this.filterBy = "effectif";
    }

    if (process.client && !this.$nuxt.isOffline) {
      if (
        !this.babbles ||
        (this.favTeam && this.$route.params.shortName == this.favTeam.shortName)
      ) {
        this.page = 1;
        this.isLoading = false;
        getTeamBabbles(this.$route.params.shortName, "all", this.page).then(
          (babbles) => {
            if (babbles && babbles.length > 0) {
              this.babbles = babbles;
            } else {
              this.babbles = ["empty"];
            }
            this.isLoading = false;
          }
        );
      } else {
        this.loadMoreIsActive = true;
        setTimeout(() => {
          this.loadMoreIsActive = false;
        }, 1000);
      }
      this.$store.commit("var/contestInscription", "");
      if (this.babblesVideo == "") {
        getGoalsVideos(this.$route.params.shortName, 1).then((babbles) => {
          if (babbles && babbles.length > 0) {
            this.babblesVideo = babbles;
          } else {
            this.babblesVideo = ["empty"];
          }
        });
      }
      if (this.babblesPodcast == "") {
        getPodcast(this.$route.params.shortName, 1).then((babbles) => {
          if (babbles && babbles.length > 0) {
            this.babblesPodcast = babbles;
          } else {
            this.babblesPodcast = ["empty"];
          }
        });
      }

      if (this.babblesSong == "") {
        getFanSong(1, this.$route.params.shortName).then((babbles) => {
          if (babbles && babbles.length > 0) {
            this.babblesSong = babbles;
          } else {
            this.babblesSong = ["empty"];
          }
        });
      }
      if (
        this.favTeam &&
        this.favTeam.shortName &&
        this.$route.params.shortName == this.favTeam.shortName
      ) {
        getTeam(this.$route.params.shortName).then((team) => {
          if (!team.name) {
            this.$router.back();
          }
          this.team = team;
        });
      }
    }
  },
  head() {
    return {
      title:
        this.team && this.team.name
          ? this.team.name + this.$route.path == "transfert"
            ? this.team.name + " : Tous les transferts"
            : this.$route.path == "coach"
            ? this.team.name + " : La côte du Coach"
            : this.$route.path == "effectif"
            ? this.team.name + " : Les stats des joueurs"
            : this.$route.path == "calendrier"
            ? this.team.name + " : Les prochains matchs"
            : this.$route.path == "resultats"
            ? this.team.name + " : Les derniers matchs"
            : this.$route.path == "forum"
            ? this.team.name + " : Les débats des supporters"
            : this.$route.path == "podcast"
            ? this.team.name + " : Les podcasts du club"
            : this.$route.path == "buts"
            ? this.team.name + " : Les dernières vidéos"
            : this.$route.path == "songs"
            ? this.team.name + " : Les chants des supporters"
            : this.team.name + " : Les dernières news et infos du club"
          : "Pour l'amour du foot",

      meta: [
        {
          hid: `description`,
          name: "description",
          content:
            this.team && this.team.name
              ? this.team.name + this.$route.path == "transfert"
                ? this.team.name +
                  " : Tous les transferts en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "coach"
                ? this.team.name +
                  " : La côte du Coach en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "effectif"
                ? this.team.name +
                  " : Les stats des joueurs en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "calendrier"
                ? this.team.name +
                  " : Les prochains matchs en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "resultats"
                ? this.team.name +
                  " : Les derniers matchs sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "forum"
                ? this.team.name +
                  " : Les débats des supporters sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "podcast"
                ? this.team.name +
                  " : Les podcasts du club sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "buts"
                ? this.team.name +
                  " : Les derniers buts en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "songs"
                ? this.team.name +
                  " : Les chants des supporters sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.team.name +
                  " : Les dernières news et infos du club sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
              : "Le foot en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager",
        },
        {
          hid: `keywords`,
          name: "keywords",
          keywords:
            this.team && this.team.name
              ? this.team.name +
                ": news, vidéos, buts, joueurs, transferts, effectif, prochain match, chants, polémiques : Tout sur ton club"
              : "news, vidéos, buts, joueurs, transferts, effectif, prochain match, chants, polémiques : Tout sur ton club",
        },
        {
          hid: `og:title`,
          property: "og:title",
          content:
            this.team && this.team.name
              ? this.team.name + this.$route.path == "transfert"
                ? "Tous les transferts"
                : this.$route.path == "coach"
                ? "La côte du Coach"
                : this.$route.path == "effectif"
                ? "Les stats des joueurs"
                : this.$route.path == "calendrier"
                ? "Les prochains matchs"
                : this.$route.path == "resultats"
                ? "Les derniers matchs"
                : this.$route.path == "forum"
                ? "Les débats des supporters"
                : this.$route.path == "podcast"
                ? "Les podcasts du club"
                : this.$route.path == "buts"
                ? "Les dernières vidéos"
                : this.$route.path == "songs"
                ? "Les chants des supporters"
                : "Les dernières news et infos du club"
              : "Pour l'amour du foot",
        },
        {
          hid: `og:url`,
          property: "og:url",
          content: "https://www.footfoot.co" + this.$route.fullPath,
        },
        {
          hid: `og:image`,
          property: "og:image",
          content:
            this.team && this.team.teamImg
              ? this.team.teamImg === ""
                ? "/icon.png"
                : this.team.teamImg
              : "/icon.png",
        },
        {
          hid: `og:description`,
          property: "og:description",
          content:
            this.team && this.team.name
              ? this.team.name + this.$route.path == "transfert"
                ? this.team.name +
                  " : Tous les transferts en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "coach"
                ? this.team.name +
                  " : La côte du Coach en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "effectif"
                ? this.team.name +
                  " : Les stats des joueurs en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "calendrier"
                ? this.team.name +
                  " : Les prochains matchs en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "resultats"
                ? this.team.name +
                  " : Les derniers matchs sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "forum"
                ? this.team.name +
                  " : Les débats des supporters sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "podcast"
                ? this.team.name +
                  " : Les podcasts du club sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "buts"
                ? this.team.name +
                  " : Les derniers buts en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "songs"
                ? this.team.name +
                  " : Les chants des supporters sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.team.name +
                  " : Les dernières news et infos du club sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
              : "Le foot en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager",
        },
        {
          hid: `twitter:card`,
          name: `twitter:card`,
          property: "twitter:card",
          content: "summary",
        },
        {
          hid: `twitter:site`,
          name: `twitter:site`,
          property: "twitter:site",
          content: "@footfoot.co",
        },
        {
          hid: `twitter:creator`,
          name: `twitter:creator`,
          property: "twitter:creator",
          content: "@InsidersFoot",
        },
        {
          hid: `twitter:title`,
          name: `twitter:title`,
          property: "twitter:title",
          content:
            this.team && this.team.name
              ? this.team.name + this.$route.path == "transfert"
                ? "Tous les transferts"
                : this.$route.path == "coach"
                ? "La côte du Coach"
                : this.$route.path == "effectif"
                ? "Les stats des joueurs"
                : this.$route.path == "calendrier"
                ? "Les prochains matchs"
                : this.$route.path == "resultats"
                ? "Les derniers matchs"
                : this.$route.path == "forum"
                ? "Les débats des supporters"
                : this.$route.path == "podcast"
                ? "Les podcasts du club"
                : this.$route.path == "buts"
                ? "Les dernières vidéos"
                : this.$route.path == "songs"
                ? "Les chants des supporters"
                : "Les dernières news et infos du club"
              : "Pour l'amour du foot",
        },
        {
          hid: `twitter:description`,
          property: "twitter:description",
          content:
            this.team && this.team.name
              ? this.team.name + this.$route.path == "transfert"
                ? this.team.name +
                  " : Tous les transferts en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "coach"
                ? this.team.name +
                  " : La côte du Coach en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "effectif"
                ? this.team.name +
                  " : Les stats des joueurs en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "calendrier"
                ? this.team.name +
                  " : Les prochains matchs en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "resultats"
                ? this.team.name +
                  " : Les derniers matchs sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "forum"
                ? this.team.name +
                  " : Les débats des supporters sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "podcast"
                ? this.team.name +
                  " : Les podcasts du club sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "buts"
                ? this.team.name +
                  " : Les derniers buts en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.$route.path == "songs"
                ? this.team.name +
                  " : Les chants des supporters sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
                : this.team.name +
                  " : Les dernières news et infos du club sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager"
              : "Le foot en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager",
        },

        {
          hid: `twitter:image`,
          name: `twitter:image`,
          property: "twitter:image",
          content:
            this.team && this.team.name
              ? this.team.teamImg === ""
                ? "/icon.png"
                : this.team.teamImg
              : "/icon.png",
        },
      ],
    };
  },
  props: {},
  data() {
    return {
      filterBy: "",
      team: "",
      babbles: "",
      babblesPodcast: "",
      babblesVideo: "",
      babblesSong: "",
      forums: "",
      mobile: this.$mobileDetect.mobile(),
      babbleTodisplayActive: false,
      mobileDropActiv: false,
      indexSelected: "arrivee",
      isLoading: false,
      watchItem: "",
      recentPositions: "",
      detailClub: false,
      postWriting: false,
      page: 1,
      swiperOptions: {
        threshold: 15,
        followFinger: false,
        loop: true,
        slidesPerView: "auto",
        loopedSlides: 1,
        centeredSlides: true,
        spaceBetween: 50,
        touchEventsTarget: "wrapper",
        longSwipes: true,
        shortSwipes: true,
      },
      loadMoreIsActive: false,
    };
  },
  beforeDestroy() {
    if (
      this.favTeam &&
      this.favTeam.shortName &&
      this.team.shortName == this.favTeam.shortName
    ) {
      this.$store.commit("datapage/favTeam", this.team);
    }
  },
  computed: {
    favTeam() {
      return this.$store.state.datapage.favTeam;
    },
    favTeambabble() {
      return this.$store.state.datapage.favTeambabble;
    },
    matches() {
      return this.$store.state.var.matches;
    },
    babbleTodisplay() {
      return this.$store.state.var.babbleTodisplay;
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  watch: {
    team: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.team == "no team") {
          this.$router.back();
        } else {
          getTeamBabbles(this.$route.params.shortName, "all", this.page).then(
            (babbles) => {
              if (babbles && babbles.length > 0) {
                this.babbles = babbles;
              } else {
                if (
                  this.filterBy != "coach" &&
                  this.filterBy != "resultat" &&
                  this.filterBy != "calendrier"
                ) {
                  this.filterBy = "effectif";
                  this.babbles = ["empty"];
                }
              }
              this.isLoading = false;
            }
          );
        }
      },
    },

    babbleTodisplay: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.babbleTodisplay) {
          this.babbleTodisplayActive = true;
          this.$nuxt.$emit("firstBetmodal");
        } else {
          this.babbleTodisplayActive = false;
        }
      },
    },
    matches: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (
          this.team &&
          this.team.nextMatch &&
          this.team.nextMatch._id &&
          this.matches &&
          this.matches.length > 0 &&
          this.matches.map((m) => m._id).includes(this.team.nextMatch._id)
        ) {
          getTeam(this.$route.params.shortName).then((team) => {
            if (!team.name) {
              this.$router.back();
            }
            this.team = team;
          });
        }
      },
    },

    filterBy: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (process.client) {
          this.page = 1;
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 1);
        }
        this.mobileDropActiv = false;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      },
    },
    $route() {
      this.loadMoreIsActive = false;
      this.page = 1;
      getTeam(this.$route.params.shortName).then((team) => {
        if (!team.name) {
          this.$router.back();
        }
        this.team = team;
      });
      getTeamBabbles(
        this.$route.params.shortName,
        this.filterBy,
        this.page
      ).then((babbles) => {
        if (babbles && babbles.length > 0) {
          this.babbles = babbles;
        } else {
          this.filterBy = "effectif";
          this.babbles = ["empty"];
        }
        this.isLoading = false;
      });
      if (this.$route && this.$route.path.includes("transfert")) {
        this.filterBy = "transfert";
      } else if (this.$route && this.$route.path.includes("coach")) {
        this.filterBy = "coach";
      } else if (this.$route && this.$route.path.includes("effectif")) {
        this.filterBy = "effectif";
      } else if (this.$route && this.$route.path.includes("calendrier")) {
        this.filterBy = "calendrier";
      } else if (this.$route && this.$route.path.includes("resultats")) {
        this.filterBy = "resultats";
      } else if (this.$route && this.$route.path.includes("forum")) {
        this.filterBy = "forum";
      } else if (this.$route && this.$route.path.includes("podcast")) {
        this.filterBy = "podcast";
      } else if (this.$route && this.$route.path.includes("buts")) {
        this.filterBy = "buts";
      } else if (this.$route && this.$route.path.includes("songs")) {
        this.filterBy = "songs";
      } else {
        this.filterBy = "all";
      }

      if (process.client && !this.$nuxt.isOffline) {
        this.$store.commit("var/contestInscription", "");
        getGoalsVideos(this.$route.params.shortName, 1).then((babbles) => {
          if (babbles && babbles.length > 0) {
            this.babblesVideo = babbles;
          } else {
            this.babblesVideo = ["empty"];
          }
        });
        getPodcast(this.$route.params.shortName, 1).then((babbles) => {
          if (babbles && babbles.length > 0) {
            this.babblesPodcast = babbles;
          } else {
            this.babblesPodcast = ["empty"];
          }
        });
        getFanSong(1, this.$route.params.shortName).then((babbles) => {
          if (babbles && babbles.length > 0) {
            this.babblesSong = babbles;
          } else {
            this.babblesSong = ["empty"];
          }
        });
      }
    },
  },
  methods: {
    slideNextTransitionStart() {
      if (this.filterBy == "all") {
        this.videos();

        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "buts") {
        this.effectif();

        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = false;
      } else if (this.filterBy == "effectif") {
        this.calendrier();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "calendrier") {
        this.resultat();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "resultats") {
        this.coach();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "coach") {
        if (this.team.isNationalTeam === false) {
          this.transfert();
          this.swiperOptions.threshold = 10;
          this.swiperOptions.iOSEdgeSwipeThreshold = 10;
          this.swiperOptions.shortSwipes = true;
          this.swiperOptions.longSwipes = false;
        } else {
          this.songs();
          this.swiperOptions.threshold = 10;
          this.swiperOptions.iOSEdgeSwipeThreshold = 10;
          this.swiperOptions.shortSwipes = true;
          this.swiperOptions.longSwipes = true;
        }
      } else if (this.filterBy == "transfert") {
        this.songs();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "songs") {
        this.podCasts();
        //this.forum();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "forum") {
        this.podCasts();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else {
        this.all();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      }
    },

    slidePrevTransitionStart() {
      if (this.filterBy == "all") {
        this.podCasts();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "buts") {
        this.all();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "effectif") {
        this.videos();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "calendrier") {
        this.effectif();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = false;
      } else if (this.filterBy == "resultats") {
        this.calendrier();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "coach") {
        this.resultat();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "transfert") {
        this.coach();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "songs") {
        if (this.team.isNationalTeam === false) {
          this.transfert();
          this.swiperOptions.threshold = 10;
          this.swiperOptions.iOSEdgeSwipeThreshold = 10;
          this.swiperOptions.shortSwipes = true;
          this.swiperOptions.longSwipes = false;
        } else {
          this.coach();
          this.swiperOptions.threshold = 10;
          this.swiperOptions.iOSEdgeSwipeThreshold = 10;
          this.swiperOptions.shortSwipes = true;
          this.swiperOptions.longSwipes = true;
        }
      } else if (this.filterBy == "forum") {
        this.songs();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else {
        this.songs();
        //this.forum();
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      }
    },
    ActivMobileDrop() {
      this.mobileDropActiv = !this.mobileDropActiv;
    },
    loadMore(event) {
      if (!this.$nuxt.isOffline) {
        if (this.loadMoreIsActive == false) {
          this.page++;
          //this.isLoading = true;
          this.loadMoreIsActive = true;
          if (this.filterBy == "podcast") {
            if (this.babblesPodcast[0] != "empty") {
              getPodcast(this.$route.params.shortName, this.page).then(
                (podcasts) => {
                  if (podcasts && podcasts.length > 0) {
                    this.babblesPodcast = podcasts;
                  }
                  this.loadMoreIsActive = false;
                }
              );
            } else {
              this.loadMoreIsActive = false;
            }
          } else if (this.filterBy == "forum") {
            if (this.forums[0] != "empty") {
              getAllForums(this.page, this.$route.params.shortName).then(
                (forums) => {
                  if (forums && forums.length > 0) {
                    this.forums = forums;
                  }
                  this.loadMoreIsActive = false;
                }
              );
            } else {
              this.loadMoreIsActive = false;
            }
          } else if (this.filterBy == "buts") {
            if (this.babblesVideo[0] != "empty") {
              getGoalsVideos(this.$route.params.shortName, this.page).then(
                (babbles) => {
                  if (babbles && babbles.length > 0) {
                    this.babblesVideo = babbles;
                  }
                  //this.filterBy = "all";
                  this.loadMoreIsActive = false;
                }
              );
            } else {
              this.loadMoreIsActive = false;
            }
          } else if (this.filterBy == "songs") {
            if (this.babblesSong[0] != "empty") {
              getFanSong(this.page, this.$route.params.shortName).then(
                (songs) => {
                  if (songs && songs.length > 0) {
                    this.babblesSong = songs;
                    this.loadMoreIsActive = false;
                  }
                  this.loadMoreIsActive = false;
                }
              );
            } else {
              this.loadMoreIsActive = false;
            }
          } else if (
            this.filterBy == "coach" ||
            this.filterBy == "transfert" ||
            this.filterBy == "effectif" ||
            this.filterBy == "calendrier" ||
            this.filterBy == "resultats"
          ) {
            this.isLoading = false;
            this.loadMoreIsActive = false;
          } else {
            this.filterBy = "all";
            if (this.babbles[0] != "empty") {
              getTeamBabbles(
                this.$route.params.shortName,
                this.filterBy,
                this.page
              ).then((babbles) => {
                if (babbles && babbles.length > 0) {
                  this.babbles = babbles;
                  this.loadMoreIsActive = false;
                }

                this.loadMoreIsActive = false;
              });
            } else {
              this.loadMoreIsActive = false;
            }
          }
        }
      }
    },
    openPost() {
      this.postWriting = !this.postWriting;
    },
    ligue(ligue) {
      this.$store.commit("var/setNewValue", ligue);
    },
    signup() {
      this.$router.push("/signup");
    },
    LoginModal(autenticate) {
      this.$router.push("/login");
    },

    updateWatchList() {
      this.fetchData();
    },
    updateTimelineBabble() {
      this.postWriting = false;
      this.fetchData();
    },

    changeSort() {
      this.fetchData();
    },
    getCoach() {
      getTeam(this.$route.params.shortName).then((team) => {
        if (!team.name) {
          this.$router.back();
        }
        this.team = team;

        this.isLoading = false;
      });
    },
    getArrivee() {
      this.indexSelected = "arrivee";
    },
    getDepart() {
      this.indexSelected = "depart";
    },
    fetchData() {
      //this.isLoading = true;
      this.page = 1;
      let shortName = this.$route.params.shortName;
      if (this.filterBy == "transfert") {
        this.filterBy = "transfert";
        this.isLoading = false;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = false;
      } else if (this.filterBy == "resultats") {
        this.filterBy = "resultats";
        this.isLoading = false;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "calendrier") {
        this.filterBy = "calendrier";
        this.isLoading = false;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "effectif") {
        this.filterBy = "effectif";
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = false;
        this.isLoading = false;
      } else if (this.filterBy == "coach") {
        this.filterBy = "coach";
        this.isLoading = false;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "podcast") {
        this.filterBy = "podcast";
        //this.isLoading = true;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        getPodcast(this.$route.params.shortName, this.page).then((podcasts) => {
          if (podcasts && podcasts.length > 0) {
            this.babblesPodcast = podcasts;
          } else {
            this.babblesPodcast = ["empty"];
          }
          this.isLoading = false;
        });
      } else if (this.filterBy == "forum") {
        this.filterBy = "forum";
        //this.isLoading = true;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        getAllForums(this.page, this.$route.params.shortName).then((forums) => {
          if (forums && forums.length > 0) {
            this.forums = forums;
          } else {
            this.forums = ["empty"];
          }
          this.isLoading = false;
        });
      } else if (this.filterBy == "songs") {
        this.filterBy = "songs";
        //this.isLoading = true;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        getFanSong(this.page, this.$route.params.shortName).then((songs) => {
          if (songs && songs.length > 0) {
            this.babblesSong = songs;
          } else {
            this.babblesSong = ["empty"];
          }
          this.isLoading = false;
          this.swiperOptions.threshold = 10;
          this.swiperOptions.iOSEdgeSwipeThreshold = 10;
          this.swiperOptions.shortSwipes = true;
        });
      } else if (this.filterBy == "buts") {
        this.filterBy = "buts";
        //this.isLoading = true;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        getGoalsVideos(this.$route.params.shortName, this.page).then(
          (goals) => {
            if (goals && goals.length > 0) {
              this.babblesVideo = goals;
            } else {
              this.babblesVideo = ["empty"];
            }
            this.isLoading = false;
            this.swiperOptions.threshold = 10;
            this.swiperOptions.iOSEdgeSwipeThreshold = 10;
            this.swiperOptions.shortSwipes = true;
          }
        );
      } else {
        this.filterBy = "all";
        //this.isLoading = true;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        getTeamBabbles(
          this.$route.params.shortName,
          this.filterBy,
          this.page
        ).then((babbles) => {
          if (babbles && babbles.length > 0) {
            this.babbles = babbles;
          } else {
            this.babbles = ["empty"];
          }
          this.isLoading = false;
        });
      }
    },
    all() {
      this.filterBy = "all";

      this.isLoading = this.babbles && this.babbles[0] ? false : true;
      this.page = 1;

      getTeamBabbles(
        this.$route.params.shortName,
        this.filterBy,
        this.page
      ).then((babbles) => {
        if (babbles && babbles.length > 0) {
          this.babbles = babbles;
        } else {
          this.babbles = ["empty"];
        }
        this.isLoading = false;
        this.isLoading = false;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      });
      //this.$router.push(`/teams/${this.team.shortName}`);
    },
    podCasts() {
      this.filterBy = "podcast";
      this.isLoading =
        this.babblesPodcast && this.babblesPodcast[0] ? false : true;
      this.page = 1;
      getPodcast(this.$route.params.shortName, this.page).then((podcasts) => {
        if (podcasts && podcasts.length > 0) {
          this.babblesPodcast = podcasts;
        } else {
          this.babblesPodcast = ["empty"];
        }
        this.isLoading = false;
        this.isLoading = false;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      });
      //this.$router.push(`/teams/${this.team.shortName}/podcast`);
    },
    songs() {
      this.page = 1;
      this.filterBy = "songs";
      this.isLoading = this.babblesSong && this.babblesSong[0] ? false : true;
      getFanSong(this.page, this.$route.params.shortName).then((songs) => {
        if (songs && songs.length > 0) {
          this.babblesSong = songs;
        } else {
          this.babblesSong = ["empty"];
        }
        this.isLoading = false;
        this.isLoading = false;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      });
      //this.$router.push(`/teams/${this.team.shortName}/songs`);
    },
    forum() {
      this.page = 1;
      this.filterBy = "forum";
      this.isLoading = this.forums && this.forums[0] ? false : true;
      getAllForums(this.page, this.$route.params.shortName).then((forums) => {
        if (forums && forums.length > 0) {
          this.forums = forums;
        } else {
          this.forums = ["empty"];
        }
        this.isLoading = false;
        this.isLoading = false;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      });
      //this.$router.push(`/teams/${this.team.shortName}/forum`);
    },
    videos() {
      this.page = 1;
      this.filterBy = "buts";
      this.isLoading = this.babblesVideo && this.babblesVideo[0] ? false : true;
      getGoalsVideos(this.$route.params.shortName, this.page).then((goals) => {
        if (goals && goals.length > 0) {
          this.babblesVideo = goals;
        } else {
          this.babblesVideo = ["empty"];
        }
        this.isLoading = false;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      });
      //this.$router.push(`/teams/${this.team.shortName}/buts`);
    },
    coach() {
      this.filterBy = "coach";

      //this.$router.push(`/teams/${this.team.shortName}/coach`);
    },
    transfert() {
      this.filterBy = "transfert";

      //this.$router.push(`/teams/${this.team.shortName}/transferts`);
    },
    calendrier() {
      this.filterBy = "calendrier";

      //this.$router.push(`/teams/${this.team.shortName}/calendrier`);
    },
    effectif() {
      this.filterBy = "effectif";

      //this.$router.push(`/teams/${this.team.shortName}/effectif`);
    },
    resultat() {
      this.filterBy = "resultats";

      //this.$router.push(`/teams/${this.team.shortName}/resultats`);
    },
  },
};
</script>

<style scoped>
.navbar {
  overflow: auto;
}

.transfertSub {
  flex-direction: column;
  width: 100%;
  display: flex;
  margin: auto;
  font-weight: bold;
  color: #192b41 !important;
}

.transfertSub > div {
  margin: auto;
  display: flex;
}

.babblesField {
  margin-right: 0.5%;
  margin-left: 0.5%;
}

.column.is-6 {
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  width: 50%;
}

.is-on {
  border-bottom: 2px solid #192b41 !important;
  font-size: 1.4rem !important;
}
.transfertMenu {
  margin-bottom: 0px !important;
  min-height: 1rem !important;
  display: flex;
  align-items: center;
  width: auto;
}

.navTransf {
  border-top: 0.5px solid;
  border-top-color: lightgrey;
}
.navbar-item {
  cursor: pointer !important;
}
.babblesMenu {
  display: flex;
  margin: auto;
  width: 100%;
}

.babMenu {
  display: flex;
  padding: 5px;
  margin: auto;
  font-weight: bold;
  color: #192b41 !important;
  cursor: pointer;
}

a:hover {
  color: #eef1f7;
}

.sci2 {
  display: none;
}

div {
  font-size: 1.2rem !important;
}

.primordial {
  width: 100%;
  justify-content: center;
  display: flex;
}

.babblesField {
  width: 50%;
  margin-right: 0.5%;
  margin-left: 0.5%;
}

.sct1 {
  width: 100%;
  justify-content: center;
  display: flex;
  padding: 0px 0.5rem;
}

.forumTitle {
  margin-bottom: 1rem;
}

.mainMenu {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.is-35 {
  width: auto;
  height: 35px;
  max-height: 35px;
  margin: 0;
}
.shirtOfficial {
  width: auto;
  height: 50px;
  max-height: 50px;
}

.is-30 {
  width: auto;
  height: 30px;
  padding-right: 10px;
}

.itemMenu {
  display: flex;
  margin: auto;
  height: 3rem;
}

.mobileOnly {
  display: none;
}

@media (max-width: 1047px) {
  .mobileDrop {
    padding-top: 0px;
    align-content: flex-end;
    position: absolute;
    top: 100%;
    z-index: 100 !important;
    right: 5px;
    min-width: 10rem;
  }

  .navTransf {
    margin-bottom: 0 !important;
  }

  .mobileDropSub {
    background-color: white;
    border-radius: 3px;
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
      0 0 0 1px rgba(10, 10, 10, 0.1);
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }

  .mobileDropSub > a {
    padding-right: 3rem;
    white-space: nowrap;
    color: #4a4a4a;
    display: block;
    font-size: 0.875rem;
    line-height: 1.7em;
    padding: 0.375rem 1rem;
    position: relative;
  }

  .navbar {
    overflow: inherit;
    z-index: inherit;
  }

  .babMenu {
    margin: auto;
    padding: 0.5rem;
    font-size: 1.3rem !important;
    color: #c9c9c9;
    font-weight: bold;
    align-items: center;
  }

  .is-30 {
    width: auto;
    height: 30px;
    padding-right: 10px;
  }

  .mobileOnly {
    display: flex;
  }

  .desktopOnly {
    display: none;
  }

  .sci2 {
    display: inline;
  }

  .sct1 {
    padding: 0px;
    margin-left: 0px;
    margin-right: 0px;
    max-width: 100%;
    flex-direction: column !important;
  }

  .main {
    background-color: #eef1f7;
    padding-top: 0.5rem !important;
    margin-left: 0px !important;
    margin-right: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }

  .columns {
    margin-left: 0px !important;
    margin-right: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }

  .column {
    margin-left: 0px !important;
    margin-right: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }

  .sci {
    display: none;
  }
}

@media (max-width: 325px) {
  .itemMenuDots {
    padding-right: 5px !important;
  }

  .itemMenuDots > img {
    width: auto;
    height: 30px !important;
    max-height: 30px !important;
  }
}
</style>
