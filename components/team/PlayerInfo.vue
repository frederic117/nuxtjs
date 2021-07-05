<template>
  <section v-if="player">
    <div v-if="babbleTodisplay">
      <b-modal id="babbleActivModal" :active.sync="babbleTodisplayActive">
        <displaybabble-modal
          @changeBabbles="updateTimelineBabble($event)"
          class="page-enter-active"
          :babbleTodisplay="babbleTodisplay"
        ></displaybabble-modal>
      </b-modal>
    </div>
    <section v-if="compareModalMobile && player.ciesId" class="section">
      <div class="modalWrap" style="width: auto">
        <h1 class="is-ci has-text-centered is-bold is-size-3 paddingCi">
          Compare {{ player.display_name }}
          {{ langSelected === "EN" ? "to the others" : "aux autres !" }}
        </h1>
        <div>
          <compare-player
            v-if="compareModalMobile && player.ciesId"
            class="box compareBox"
            :class="{ displayNone: !activeModal }"
            :url="`https://football-observatory.com/-profil-${player.ciesId}-_none#content`"
          ></compare-player>
        </div>
        <div class="displayFlex paddingCi">
          <button class="button" type="button" @click="closecompareModalMobile">
            {{ langSelected === "EN" ? "close" : "fermer" }}
          </button>
        </div>
      </div>
    </section>
    <section v-else class="section">
      <player-header
        @compare="compare"
        :player="player"
        v-if="player && postWriting === false"
        @ligue="ligue($event)"
        :team="team"
      ></player-header>

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
                <span
                  @click="setFilterBy('stats')"
                  class="pointer navbar-item is-tab itemMenu"
                >
                  <img
                    loading="lazy"
                    class="is-35 invertOk"
                    src="~assets/images/teams/stats.png"
                    alt="stats"
                  />
                </span>

                <span
                  v-if="player.ciesId && player.ciesId != '0'"
                  @click="setFilterBy('caracteristiques')"
                  class="pointer mobileOnly navbar-item is-tab itemMenu"
                >
                  <img
                    loading="lazy"
                    class="is-35"
                    src="~assets/images/teams/ratings2.png"
                    alt="ratings2"
                  />
                </span>

                <span
                  @click="setFilterBy('transfert')"
                  class="pointer navbar-item is-tab itemMenu"
                >
                  <img
                    loading="lazy"
                    class="is-35 invertOk"
                    src="~assets/images/teams/transfert.png"
                    alt="transfert"
                  />
                </span>
                <span
                  @click="setFilterBy('news')"
                  class="pointer navbar-item is-tab itemMenu"
                >
                  <img
                    loading="lazy"
                    class="is-35"
                    src="~assets/images/teams/rumour.png"
                    alt="news"
                  />
                </span>
                <span
                  @click="setFilterBy('videos')"
                  class="pointer navbar-item is-tab itemMenu"
                >
                  <img
                    loading="lazy"
                    class="is-35"
                    src="~assets/images/teams/soccervideo.png"
                    alt="videos"
                  />
                </span>
              </div>
            </nav>
            <nav class="navbar is-dark subMenu">
              <div class="babblesMenu">
                <div class="babMenu" v-if="filterBy === 'stats'">
                  <img
                    loading="lazy"
                    class="is-30 invertOk"
                    src="~assets/images/teams/stats.png"
                    alt="stats"
                  />
                  {{ langSelected === "EN" ? "statistics" : "statistiques" }}
                </div>
                <div
                  class="babMenu"
                  v-if="filterBy === 'caracteristiques' && player.ciesId"
                >
                  <img
                    loading="lazy"
                    class="is-30"
                    src="~assets/images/teams/ratings2.png"
                    alt="ratings2"
                  />

                  {{
                    langSelected === "EN"
                      ? "characteristics"
                      : "caractéristiques"
                  }}
                </div>
                <div class="babMenu" v-if="filterBy === 'transfert'">
                  <img
                    loading="lazy"
                    class="is-30 invertOk"
                    src="~assets/images/teams/transfert.png"
                    alt="transfert"
                  />
                  {{ langSelected === "EN" ? "transfert" : "transferts" }}
                </div>
                <div class="babMenu" v-if="filterBy === 'news'">
                  <img
                    loading="lazy"
                    class="is-30"
                    src="~assets/images/teams/rumour.png"
                    alt="news"
                  />
                  {{ langSelected === "EN" ? "news" : "actus" }}

                  <i
                    @click="goToPublish"
                    class="fa fa-pencil pointer is-20"
                    aria-hidden="true"
                  ></i>
                </div>
                <div class="babMenu" v-if="filterBy === 'videos'">
                  <img
                    loading="lazy"
                    class="is-30"
                    src="~assets/images/teams/soccervideo.png"
                    alt="transfert"
                  />
                  {{ langSelected === "EN" ? "videos" : "vidéos" }}
                </div>
              </div>
            </nav>
            <div v-if="postActivate == true">
              <div class="desktopOnly">
                <publish-post
                  :playerId="player._id"
                  @postOk="postOk"
                ></publish-post>
              </div>
              <div class="mobileOnly">
                <publish-postm
                  :playerId="player._id"
                  @postOk="postOk"
                  class="mobileOnly"
                ></publish-postm>
              </div>
            </div>

            <div
              v-if="postActivate == false"
              class="swiper-container"
              v-swiper:myDirectiveSwiper="swiperOptions"
              @slide-next-transition-start="slideNextTransitionStart"
              @slide-prev-transition-start="slidePrevTransitionStart"
            >
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <stats-player
                    @seeDetail="seeDetail($event)"
                    v-if="filterBy == 'stats' && player && player.stats"
                    :stats="player.stats.data"
                  ></stats-player>
                  <transferts-player
                    v-if="filterBy == 'transfert' && player && player.transfers"
                    :team="[teamForTransfert]"
                    :transfers="
                      player.transfers.data.filter((t) => t.type == 'OUT')
                    "
                  ></transferts-player>
                  <div
                    v-if="
                      filterBy == 'caracteristiques' &&
                      player.ciesId &&
                      isSafari
                    "
                    :class="{
                      displayNone: !(
                        filterBy == 'caracteristiques' &&
                        player.ciesId &&
                        isSafari
                      ),
                    }"
                    class="box"
                  >
                    <compare-player
                      :url="`https://football-observatory.com/-profil-${player.ciesId}-_none#content`"
                    ></compare-player>
                  </div>
                  <caracteristiques-player
                    v-if="
                      filterBy == 'caracteristiques' &&
                      player.ciesId &&
                      !isSafari
                    "
                    @compare="compareMobile"
                    @loadDone="loadDone"
                    :player="player"
                  ></caracteristiques-player>
                  <player-timeline
                    @goToPublish="goToPublish()"
                    @loadMore="loadMore($event)"
                    v-if="filterBy == 'news' || filterBy == 'videos'"
                    :filterBy="filterBy"
                    :babbles="babbles"
                    :babblesVideo="babblesVideo"
                  ></player-timeline>
                  <div
                    id="loader-container"
                    v-if="
                      (filterBy == 'news' || filterBy == 'videos') &&
                      loadMoreIsActive &&
                      isLoading == false
                    "
                  >
                    <slot name="loading">
                      <div class="spinner"></div>
                    </slot>
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
      <b-modal :active.sync="compareModal" class="section">
        <div class="modalWrap" style="width: auto">
          <h1 class="is-ci has-text-centered is-bold is-size-3 paddingCi">
            Compare {{ player.display_name }}
            {{ langSelected === "EN" ? "to the others" : "aux autres !" }}
          </h1>
          <div>
            <compare-player
              class
              :url="`https://football-observatory.com/-profil-${player.ciesId}-_none#content`"
            ></compare-player>
          </div>
          <div class="displayFlex paddingCi">
            <button class="button" type="button" @click="closecompareModal">
              {{ langSelected === "EN" ? "close" : "fermer" }}
            </button>
          </div>
        </div>
      </b-modal>
      <b-modal v-if="statsDetails" id="modalStats" :active.sync="detailModal">
        <div class="modalWrap" style="width: auto">
          <h1 class="is-wc has-text-centered is-bold is-size-3">
            {{
              statsDetails.league &&
              statsDetails.league.data.name == "Friendly International"
                ? "Matchs amicaux"
                : statsDetails.league && statsDetails.league.data.name
                ? statsDetails.league.data.name
                : "-"
            }}
            - {{ statsDetails.season ? statsDetails.season.data.name : "-" }}
            <p v-if="statsDetails.rating" class="displayFlex">
              <img
                loading="lazy"
                class="is-35modal"
                src="~assets/images/teams/ratings2.png"
                alt="ratings2"
              />&nbsp-
              {{ statsDetails.rating }}
            </p>
          </h1>
          <section class>
            <div class="card matchlist">
              <b-table
                :data="[statsDetails]"
                :loading="loading"
                :paginated="isPaginated"
                :per-page="perPage"
                :pagination-simple="isPaginationSimple"
                :mobile-cards="false"
                :striped="true"
              >
                <template slot-scope="props">
                  <b-table-column
                    field="appearences"
                    centered
                    :label="`${langSelected === 'EN' ? 'app.(c)' : 'J.(c)'}`"
                  >
                    <div class="journée">
                      <strong
                        >{{
                          props.row.appearences ? props.row.appearences : "0"
                        }}
                        ({{
                          props.row.appearences ? props.row.captain : "0"
                        }})</strong
                      >
                    </div>
                  </b-table-column>
                  <b-table-column field="lineups" centered label="tit.">
                    <div class="journée">
                      <strong>{{
                        props.row.lineups ? props.row.lineups : "0"
                      }}</strong>
                    </div>
                  </b-table-column>
                  <b-table-column
                    field="substitutes_on_bench"
                    centered
                    :label="`${langSelected === 'EN' ? 'sub.' : 'remp.'}`"
                  >
                    <div class="journée">
                      <strong>{{
                        props.row.substitutes_on_bench
                          ? props.row.substitutes_on_bench
                          : "0"
                      }}</strong>
                    </div>
                  </b-table-column>
                  <b-table-column
                    field="minutes"
                    centered
                    :label="`${langSelected === 'EN' ? 'min.' : 'temps'}`"
                  >
                    <div class="journée">
                      <strong
                        >{{
                          props.row.minutes ? props.row.minutes : "0"
                        }}
                        '</strong
                      >
                    </div>
                  </b-table-column>

                  <b-table-column field="substitute_in" centered label="in">
                    <div class="journée">
                      <strong>
                        <i class="has-text-green fa fa-arrow-circle-right"></i>
                        &nbsp{{ props.row.substitute_in }}
                      </strong>
                    </div>
                  </b-table-column>
                  <b-table-column field="substitute_out" centered label="out">
                    <div class="journée">
                      <strong>
                        {{
                          props.row.substitute_out
                            ? props.row.substitute_out
                            : "0"
                        }}&nbsp
                        <i
                          v-if="props.row.substitute_out"
                          class="has-text-red fa fa-arrow-circle-left"
                        ></i>
                      </strong>
                    </div>
                  </b-table-column>
                </template>
              </b-table>
            </div>

            <div class="card matchlist">
              <b-table
                :data="[statsDetails]"
                :loading="loading"
                :paginated="isPaginated"
                :per-page="perPage"
                :pagination-simple="isPaginationSimple"
                :mobile-cards="false"
                :striped="true"
              >
                <template slot-scope="props">
                  <b-table-column
                    field="goals"
                    centered
                    :label="`${langSelected === 'EN' ? 'goals' : 'buts'}`"
                  >
                    <div class="journée">
                      <strong
                        >{{
                          props.row.goals ? props.row.goals : 0
                        }}&nbsp⚽</strong
                      >
                    </div>
                  </b-table-column>
                  <b-table-column field="penalties" centered label="pen.">
                    <div class="journée">
                      <strong
                        v-if="props.row.penalties && props.row.penalties.scores"
                        >{{
                          props.row.penalties.won
                            ? props.row.penalties.won
                            : "0"
                        }}
                        / {{ props.row.penalties.scores }}</strong
                      >
                      <strong v-else>-</strong>
                    </div>
                  </b-table-column>
                  <b-table-column
                    field="assist"
                    centered
                    :label="`${langSelected === 'EN' ? 'assist' : 'p.d'}`"
                  >
                    <div class="journée">
                      <strong>{{
                        props.row.assists ? props.row.assists : "0"
                      }}</strong>
                    </div>
                  </b-table-column>
                  <b-table-column
                    field="yellowcards"
                    centered
                    :label="`${langSelected === 'EN' ? 'yel.' : 'j.'}`"
                  >
                    <div class="journée">
                      <strong>
                        {{
                          props.row.yellowcards ? props.row.yellowcards : "0"
                        }}
                        <img
                          class="cardRefer"
                          src="~assets/images/yellow_card_icon.svg"
                          alt="yellowCard"
                        />
                      </strong>
                    </div>
                  </b-table-column>
                  <b-table-column
                    field="yellowred"
                    centered
                    :label="`${langSelected === 'EN' ? '2 x y' : '2 x j'}`"
                  >
                    <div class="journée">
                      <strong>
                        {{ props.row.yellowred ? props.row.yellowred : "0" }}
                        &nbsp
                        <img
                          class="cardRefer yellowRed"
                          src="~assets/images/Yellow-red_card.png"
                          alt="yellowCard"
                        />
                      </strong>
                    </div>
                  </b-table-column>
                  <b-table-column field="redcards" centered label="r.">
                    <div class="journée">
                      <strong>
                        {{ props.row.redcards ? props.row.redcards : "0" }}
                        <img
                          class="cardRefer"
                          src="~assets/images/red_card_icon.svg"
                          alt="yellowCard"
                        />
                      </strong>
                    </div>
                  </b-table-column>
                </template>
              </b-table>
            </div>

            <div class="card matchlist">
              <b-table
                :data="[statsDetails]"
                :loading="loading"
                :paginated="isPaginated"
                :per-page="perPage"
                :pagination-simple="isPaginationSimple"
                :mobile-cards="false"
                :striped="true"
              >
                <template slot-scope="props">
                  <b-table-column field="total" centered label="passes">
                    <div class="journée">
                      <strong>{{
                        props.row.passes && props.row.passes.total
                          ? props.row.passes.total
                          : "0"
                      }}</strong>
                    </div>
                  </b-table-column>
                  <b-table-column
                    field="key_passes"
                    centered
                    :label="`${langSelected === 'EN' ? 'key p.' : 'déc.'}`"
                  >
                    <div class="journée">
                      <strong>{{
                        props.row.passes && props.row.passes.key_passes
                          ? props.row.passes.key_passes
                          : "0"
                      }}</strong>
                    </div>
                  </b-table-column>
                  <b-table-column
                    field="accuracy"
                    centered
                    :label="`${
                      langSelected === 'EN' ? 'accuracy' : 'précision'
                    }`"
                  >
                    <div class="journée">
                      <strong
                        >{{
                          props.row.passes && props.row.passes.accuracy
                            ? props.row.passes.accuracy
                            : "0"
                        }}
                        %</strong
                      >
                    </div>
                  </b-table-column>
                  <b-table-column
                    field="tackles"
                    centered
                    :label="`${langSelected === 'EN' ? 'tackles' : 'tacles'}`"
                  >
                    <div class="journée">
                      <strong>{{
                        props.row.tackles ? props.row.tackles : "0"
                      }}</strong>
                    </div>
                  </b-table-column>
                  <b-table-column
                    field="committed"
                    centered
                    :label="`${
                      langSelected === 'EN' ? 'fouls com.' : 'fautes'
                    }`"
                  >
                    <div class="journée">
                      <strong>{{
                        props.row.fouls.committed
                          ? props.row.fouls.committed
                          : 0
                      }}</strong>
                    </div>
                  </b-table-column>
                  <b-table-column
                    field="drawn"
                    centered
                    :label="`${
                      langSelected === 'EN' ? 'fouls drawn' : 'subies'
                    }`"
                  >
                    <div class="journée">
                      <strong>{{
                        props.row.fouls.drawn ? props.row.fouls.drawn : 0
                      }}</strong>
                    </div>
                  </b-table-column>
                </template>
              </b-table>
            </div>

            <div class="card matchlist">
              <b-table
                :data="[statsDetails]"
                :loading="loading"
                :paginated="isPaginated"
                :per-page="perPage"
                :pagination-simple="isPaginationSimple"
                :mobile-cards="false"
                :striped="true"
              >
                <template slot-scope="props">
                  <b-table-column field="attempts" centered label="dribbles">
                    <div class="journée">
                      <strong>{{
                        props.row.dribbles.attempts
                          ? props.row.dribbles.attempts
                          : "0"
                      }}</strong>
                    </div>
                  </b-table-column>
                  <b-table-column
                    field="success"
                    centered
                    :label="`${langSelected === 'EN' ? 'success' : 'réussis'}`"
                  >
                    <div class="journée">
                      <strong>{{
                        props.row.dribbles.success
                          ? props.row.dribbles.success
                          : "0"
                      }}</strong>
                    </div>
                  </b-table-column>

                  <b-table-column
                    field="crosses.total"
                    centered
                    :label="`${langSelected === 'EN' ? 'crosses' : 'centres'}`"
                  >
                    <div class="journée">
                      <strong>{{
                        props.row.crosses.total ? props.row.crosses.total : "0"
                      }}</strong>
                    </div>
                  </b-table-column>
                  <b-table-column
                    field="accuracy"
                    centered
                    :label="`${
                      langSelected === 'EN' ? 'accuracy' : 'précision'
                    }`"
                  >
                    <div class="journée">
                      <strong
                        >{{
                          props.row.crosses.accurate
                            ? props.row.crosses.accurate
                            : "0"
                        }}
                        %</strong
                      >
                    </div>
                  </b-table-column>

                  <b-table-column field="duels.total" centered label="duels">
                    <div class="journée">
                      <strong>{{
                        props.row.duels.total ? props.row.duels.total : "0"
                      }}</strong>
                    </div>
                  </b-table-column>
                  <b-table-column
                    field="won"
                    centered
                    :label="`${langSelected === 'EN' ? 'won' : 'gagnés'}`"
                  >
                    <div class="journée">
                      <strong>{{
                        props.row.duels.won ? props.row.duels.won : "0"
                      }}</strong>
                    </div>
                  </b-table-column>
                </template>
              </b-table>
            </div>
          </section>
          <div class="displayFlex">
            <button class="button" type="button" @click="closedetailModal">
              {{ langSelected === "EN" ? "close" : "fermer" }}
            </button>
          </div>
        </div>
      </b-modal>
    </section>
  </section>
</template>

<script>
import {
  getPlayerBabbles,
  getRecentPosition,
  getTeam,
  getAPlayerBySportsMonkId,
  getPlayerVideos,
} from "@/server/api";

export default {
  scrollToTop: true,
  auth: false,
  name: "playerPage",
  async asyncData({ params }) {
    let [player] = await Promise.all([getAPlayerBySportsMonkId(params.id)]);
    return {
      player: player,
    };
  },
  components: {
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
    PlayerHeader: () => import("@/components/team/player/PlayerHeader"),
    TimelineBabble: () => import("@/components/side-component/TimelineBabble"),
    StatsPlayer: () => import("@/components/team/player/StatsPlayer"),
    TransfertsPlayer: () => import("@/components/team/player/TransfertsPlayer"),
    CaracteristiquesPlayer: () =>
      import("@/components/team/player/CaracteristiquesPlayer"),
    PlayerTimeline: () => import("@/components/team/player/PlayerTimeline"),
    ComparePlayer: () => import("@/components/team/player/ComparePlayer"),
    PublishPost: () => import("@/components/userpage/PublishPost"),
    PublishPostm: () => import("@/components/userpage/PublishPostm"),
    DisplaybabbleModal: () =>
      import("@/components/side-component/DisplaybabbleModal"),
  },
  props: {},

  head() {
    return {
      title:
        this.player && this.player.display_name
          ? this.player.display_name + " : Tout sur ton joueur"
          : "footfoot.co : Pour l'amour du foot",
      meta: [
        {
          hid: `description`,
          name: "description",
          content:
            this.player && this.player.display_name
              ? this.player.display_name + ": Stats, notes, news, transfert"
              : "footfoot.co : Pour l'amour du foot",
        },
        {
          hid: `keywords`,
          name: "keywords",
          keywords:
            this.player && this.player.display_name
              ? this.player.display_name +
                ": Stats, notes, news, transfert, polémiques, buts"
              : "footfoot.co : Pour l'amour du foot",
        },
        {
          hid: `og:title`,
          property: "og:title",
          content:
            this.player && this.player.display_name
              ? this.player.display_name + " : Tout sur ton joueur"
              : "footfoot.co : Pour l'amour du foot",
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
            this.player &&
            this.player.team &&
            this.player.team.squad &&
            this.player.team.squad.data &&
            this.player.team.squad.data.filter(
              (p) =>
                p.player_id.toString() == this.player.id_sportmonks.toString()
            ).length > 0 &&
            this.player.team.squad.data.filter(
              (p) =>
                p.player_id.toString() == this.player.id_sportmonks.toString()
            )[0].player.data.image_path !=
              "https://cdn.sportmonks.com/images/soccer/placeholder.png"
              ? this.player.team.squad.data.filter(
                  (p) =>
                    p.player_id.toString() ==
                    this.player.id_sportmonks.toString()
                )[0].player.data.image_path
              : this.player && this.player.team && this.player.team.teamImg
              ? this.player.team.teamImg
              : "/icon.png",
        },
        {
          hid: `og:description`,
          property: "og:description",
          content:
            this.player && this.player.display_name
              ? this.player.display_name + ": Stats, notes, news, transfert"
              : "footfoot.co : Pour l'amour du foot",
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
            this.player && this.player.display_name
              ? this.player.display_name + " : Tout sur ton joueur"
              : "footfoot.co : Pour l'amour du foot",
        },
        {
          hid: `twitter:description`,
          property: "twitter:description",
          content:
            this.player && this.player.display_name
              ? this.player.display_name + ": Stats, notes, news, transfert"
              : "footfoot.co : Pour l'amour du foot",
        },
        {
          hid: `twitter:image`,
          name: `twitter:image`,
          property: "twitter:image",
          content:
            this.player &&
            this.player.team &&
            this.player.team.squad &&
            this.player.team.squad.data &&
            this.player.team.squad.data.filter(
              (p) =>
                p.player_id.toString() == this.player.id_sportmonks.toString()
            ).length > 0 &&
            this.player.team.squad.data.filter(
              (p) =>
                p.player_id.toString() == this.player.id_sportmonks.toString()
            )[0].player.data.image_path !=
              "https://cdn.sportmonks.com/images/soccer/placeholder.png"
              ? this.player.team.squad.data.filter(
                  (p) =>
                    p.player_id.toString() ==
                    this.player.id_sportmonks.toString()
                )[0].player.data.image_path
              : this.player && this.player.team && this.player.team.teamImg
              ? this.player.team.teamImg
              : "/icon.png",
        },
      ],
    };
  },
  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      babbleTodisplayActive: false,
      loadMoreIsActive: false,
      postActivate: false,
      babblesVideo: "",
      statsDetails: "",
      detailModal: false,
      teamForTransfert: "",
      //player: "",
      isLoading: false,
      watchItem: "",
      babbles: "",
      recentPositions: "",
      detailClub: false,
      postWriting: false,
      page: 1,
      team: "",
      loading: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 800,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      filterBy: "stats",
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
      compareModal: false,
      activeModal: false,
      loadingCiesModal: false,
      compareModalMobile: false,
      ciesReady: false,
    };
  },

  computed: {
    matches() {
      return this.$store.state.var.matches;
    },
    isSafari() {
      return this.$store.state.var.isSafari;
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
    player: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.player) {
        } else {
          this.$router.back();
        }
      },
    },
    filterBy: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (process.client) {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 1);
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

    $route() {
      this.loadMoreIsActive = false;
      this.fetchData();
    },
  },
  methods: {
    loadDone() {
      this.ciesReady = true;
    },
    closecompareModalMobile() {
      this.compareModalMobile = false;
    },
    compareMobile() {
      this.compareModalMobile = true;
      this.activeModal = true;
    },
    compare() {
      this.compareModal = true;
      this.activeModal = true;
    },
    closecompareModal() {
      this.compareModal = false;
    },
    goToPublish() {
      this.postActivate = !this.postActivate;
    },
    postOk() {
      this.postActivate = false;
    },
    loadMore(event) {
      if (!this.$nuxt.isOffline) {
        if (this.loadMoreIsActive == false) {
          //this.isLoading = true;
          this.page++;
          this.loadMoreIsActive = true;
          let id = this.$route.params.id;
          //this.isLoading = true;
          if (this.filterBy == "news") {
            if (this.babbles[0] != "empty") {
              getPlayerBabbles(id, this.page).then((babbles) => {
                if (babbles && babbles.length > 0) {
                  this.babbles = babbles;
                }
                this.loadMoreIsActive = false;
              });
            } else {
              this.loadMoreIsActive = false;
            }
          } else {
            if (this.babblesVideo[0] != "empty") {
              getPlayerVideos(id, this.page).then((babbles) => {
                if (babbles && babbles.length > 0) {
                  this.babblesVideo = babbles;
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
    closedetailModal() {
      this.statsDetails = "";
      this.detailModal = false;
    },
    seeDetail(event) {
      this.statsDetails = event;
      this.detailModal = true;
    },
    slideNextTransitionStart() {
      if (this.filterBy == "caracteristiques") {
        this.filterBy = "transfert";
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "transfert") {
        this.setFilterBy("news");
        this.filterBy = "news";
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      } else if (this.filterBy == "videos") {
        this.filterBy = "stats";
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = false;
      } else if (this.filterBy == "stats") {
        if (this.player.ciesId) {
          this.filterBy = "caracteristiques";
          this.swiperOptions.threshold = 10;
          this.swiperOptions.iOSEdgeSwipeThreshold = 10;
          this.swiperOptions.shortSwipes = true;
          this.swiperOptions.longSwipes = true;
        } else {
          this.filterBy = "transfert";
          this.swiperOptions.threshold = 10;
          this.swiperOptions.iOSEdgeSwipeThreshold = 10;
          this.swiperOptions.shortSwipes = true;
          this.swiperOptions.longSwipes = true;
        }
      } else if (this.filterBy == "news") {
        this.setFilterBy("videos");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
        this.filterBy = "videos";
      }
    },
    slidePrevTransitionStart() {
      if (this.filterBy == "caracteristiques") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.longSwipes = false;
        this.swiperOptions.shortSwipes = true;
        this.filterBy = "stats";
      } else if (this.filterBy == "transfert") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;

        if (this.player.ciesId) {
          this.swiperOptions.shortSwipes = true;
          this.swiperOptions.longSwipes = true;
          this.filterBy = "caracteristiques";
        } else {
          this.swiperOptions.longSwipes = false;
          this.swiperOptions.shortSwipes = true;
          this.filterBy = "stats";
        }
      } else if (this.filterBy == "videos") {
        this.setFilterBy("news");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
        this.filterBy = "news";
      } else if (this.filterBy == "stats") {
        this.setFilterBy("videos");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
        this.filterBy = "videos";
      } else if (this.filterBy == "news") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
        this.filterBy = "transfert";
      }
    },
    setFilterBy(event) {
      this.filterBy = event;
      if (event == "stats") {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.longSwipes = false;
        this.swiperOptions.shortSwipes = true;
      } else {
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
        this.swiperOptions.longSwipes = true;
      }
      if (event == "news") {
        let id = this.$route.params.id;
        getPlayerBabbles(id, 1).then((babbles) => {
          if (babbles && babbles.length > 0) {
            this.babbles = babbles;
          } else {
            this.babbles = ["empty"];
          }
          this.isLoading = false;
        });
      }
      if (event == "videos") {
        let id = this.$route.params.id;
        getPlayerVideos(id, 1).then((babbles) => {
          if (babbles && babbles.length > 0) {
            this.babblesVideo = babbles;
          } else {
            this.babblesVideo = ["empty"];
          }
          this.isLoading = false;
        });
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
      this.babbles = [];
      this.fetchData();
    },
    getArrivee() {
      this.indexSelected = "arrivee";
    },
    getDepart() {
      this.indexSelected = "depart";
    },
    fetchData() {
      let id = this.$route.params.id;
      getAPlayerBySportsMonkId(id).then((player) => {
        if (player) {
          this.player = player;
          this.isLoading = false;
          this.teamForTransfert = {};
          this.teamForTransfert.country_id = "";
          if (player.team) {
            this.teamForTransfert.founded = player.team.founded;
            this.teamForTransfert.id = Number(player.team.id_sportmonks);
            this.teamForTransfert.legacy_id = "";
            this.teamForTransfert.logo_path = player.team.teamImg;
            this.teamForTransfert.name = player.team.name;
            this.teamForTransfert.national_team = player.team.isNationalTeam;
            this.teamForTransfert.twitter = "";
          }
        } else {
          this.$router.back();
        }
      });

      getPlayerBabbles(id, 1).then((babbles) => {
        if (babbles && babbles.length > 0) {
          this.babbles = babbles;
        } else {
          this.babbles = ["empty"];
        }
      });
      getPlayerVideos(id, 1).then((babbles) => {
        if (babbles && babbles.length > 0) {
          this.babblesVideo = babbles;
        } else {
          this.babblesVideo = ["empty"];
        }
      });
    },
  },
  created() {
    let id = this.$route.params.id;
    getPlayerBabbles(id, 1).then((babbles) => {
      if (babbles && babbles.length > 0) {
        this.babbles = babbles;
      } else {
        this.babbles = ["empty"];
      }
    });
    getPlayerVideos(id, 1).then((babbles) => {
      if (babbles && babbles.length > 0) {
        this.babblesVideo = babbles;
      } else {
        this.babblesVideo = ["empty"];
      }
    });
    if (this.player) {
      this.teamForTransfert = {};
      this.teamForTransfert.country_id = "";
      if (this.player.team) {
        this.teamForTransfert.founded = this.player.team.founded;
        this.teamForTransfert.id = Number(this.player.team.id_sportmonks);
        this.teamForTransfert.legacy_id = "";
        this.teamForTransfert.logo_path = this.player.team.teamImg;
        this.teamForTransfert.name = this.player.team.name;
        this.teamForTransfert.national_team = this.player.team.isNationalTeam;
        this.teamForTransfert.twitter = "";
      }
    } else {
      this.$router.push("/not-found");
    }
    //	this.fetchData();
  },
};
</script>

<style scoped>
.modalUltraCies {
  min-height: 500px;
}
.displayNone {
  display: none !important;
}
.is-ci {
  color: #023d7d;
}
.navbar {
  overflow: auto;
}
.matchlist {
  margin-bottom: 0.5rem !important;
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

.mainMenu {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.itemMenu {
  display: flex;
  margin: auto;
  height: 3rem;
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

.mainMenu {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.is-35 {
  width: auto;
  height: 35px;
  max-height: 35px;
}
.is-35modal {
  width: auto;
  height: 35px;
  max-height: 35px;
}

.is-30 {
  width: auto;
  height: 30px;
  padding-right: 10px;
}

.journée {
  min-width: 40px !important;
  max-width: 80px !important;
}
.th-wrap {
  justify-content: center !important;
}
.modalWrap {
  background-color: #eef1f7;
}
.displayFlex {
  justify-content: center;
  align-items: center;
}

.cardWrap {
  display: flex;
}
.cardWrap > strong {
  margin-right: 5px;
}
.cardWrap > strong:last-child {
  margin-right: 0px;
}

.journée > strong {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0084a4 !important;
}

.is-20 {
  cursor: pointer;
  width: auto;
  height: 20px;
  padding-left: 10px;
}
.matchlist {
  margin-bottom: 0.5rem !important;
}

.cardRefer {
  height: 15px;
  align-self: center;
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
  margin-bottom: 10px !important;
  font-size: 1.4rem !important;
}
.navTransf {
  border-top: 0.5px solid;
  border-top-color: lightgrey;
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

.mobileOnly {
  display: none;
}
.yellowRed {
  margin-left: 2px;
}

.paddingCi {
  padding: 0.25rem;
}
@media (max-width: 1047px) {
  .compareBox {
    padding: 0.5rem !important;
  }
  .is-size-3 {
    font-size: 1.2rem !important;
  }
  .is-35modal {
    width: auto;
    height: 25px;
    max-height: 25px;
  }
  .mobileDrop {
    padding-top: 0px;
    align-content: flex-end;
    position: absolute;
    top: 100%;
    z-index: 100 !important;
    right: 5px;
    min-width: 10rem;
  }
  .journée > strong {
    font-size: 1rem !important;
  }

  .cardWrap {
    min-width: 70px !important;
  }
  .yellowRed {
    height: 15px;
    align-self: center;
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
  .navTransf {
    margin-bottom: 0 !important;
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
  .navbar {
    overflow: inherit;
    z-index: inherit;
  }

  .is-30 {
    width: auto;
    height: 30px;
    padding-right: 10px;
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

  .is-30 {
    width: auto;
    height: 30px;
    padding-right: 10px;
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
@media (max-width: 645px) {
  .is-size-3 {
    font-size: 1.3rem !important;
  }
}
</style>
