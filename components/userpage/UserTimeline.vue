<template>
  <div>
    <div v-if="profileInfo">
      <my-publish
        v-if="
          !mobile && connectedUser && $route.params.id === connectedUser._id
        "
        class="desktopOnly"
      ></my-publish>

      <nav
        v-if="
          profileInfo &&
          profileInfo.role != 'bot' &&
          connectedUser &&
          $route.params.id != connectedUser._id
        "
        :class="{
          borderNotRound:
            connectedUser &&
            $route.params.id === connectedUser._id &&
            filterBy != 'all',
          subMenu:
            connectedUser &&
            $route.params.id === connectedUser._id &&
            filterBy == 'all',
          topRounded:
            connectedUser &&
            $route.params.id === connectedUser._id &&
            filterBy == 'all',
        }"
        class="navbar is-dark"
      >
        <client-only>
          <div
            v-if="
              connectedUser &&
              $route.params.id === connectedUser._id &&
              filterBy === 'all'
            "
            class="babblesMenu"
          >
            <div class="babMenu" v-if="filterBy === 'all'">
              <span>
                <img
                  loading="lazy"
                  class="is-30"
                  src="~assets/images/teams/rumour.png"
                  alt="rumour"
                />
                posts
              </span>
              <i
                @click="refresh"
                class="pointer fa fa-refresh"
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <div v-else class="mainMenu">
            <span
              v-if="
                profileInfo &&
                profileInfo.role != 'bot' &&
                connectedUser &&
                $route.params.id === connectedUser._id
              "
              @click="cagnotte()"
              class="navbar-item is-tab itemMenu"
            >
              <img
                loading="lazy"
                class="is-35"
                src="~assets/images/contestMainCagnotte.png"
                alt="cagnotte"
              />
            </span>
            <span
              v-if="profileInfo && profileInfo.role != 'bot'"
              @click="Pronos()"
              class="navbar-item is-tab itemMenu"
            >
              <img
                loading="lazy"
                class="is-35"
                src="~assets/images/coupe.png"
                alt="coupe"
              />
            </span>
            <!--     <span
            v-if="profileInfo && profileInfo.role != 'bot'"
            @click="Results()"
            class="navbar-item is-tab itemMenu"
          >
            <img
              loading="lazy"
              class="is-35"
              src="~assets/images/contestMainReussite.png"
              alt="contestMainReussite"
            />
          </span> -->
            <span
              v-if="
                profileInfo &&
                profileInfo.role != 'bot' &&
                (!connectedUser ||
                  (connectedUser && !connectedUser._id) ||
                  (connectedUser && $route.params.id != connectedUser._id))
              "
              @click="sortBabbles('all')"
              class="navbar-item is-tab itemMenu"
            >
              <img
                loading="lazy"
                class="is-35"
                src="~assets/images/teams/rumour.png"
                alt="rumor"
              />
            </span>

            <span
              v-if="
                profileInfo &&
                profileInfo.role != 'bot' &&
                (!connectedUser ||
                  (connectedUser && !connectedUser._id) ||
                  (connectedUser && $route.params.id != connectedUser._id))
              "
              @click="sortBabbles('clap')"
              class="navbar-item is-tab itemMenu"
            >
              <img
                loading="lazy"
                class="is-35 clapi"
                src="~assets/images/clap.png"
                alt="clap"
              />
            </span>
          </div>
        </client-only>
      </nav>
      <client-only>
        <nav
          v-if="
            (connectedUser && $route.params.id === connectedUser._id) ||
            !connectedUser ||
            (connectedUser && !connectedUser._id) ||
            (connectedUser && $route.params.id != connectedUser._id)
          "
          :class="{ topRounded: profileInfo.role === 'bot' }"
          class="navbar is-dark subMenu"
        >
          <div class="babblesMenu">
            <div class="babMenu" v-if="filterBy === 'cagnotte'">
              <span
                v-if="connectedUser && $route.params.id === connectedUser._id"
              >
                <img
                  loading="lazy"
                  class="is-30"
                  src="~assets/images/contestMainCagnotte.png"
                  alt="cagnotte"
                />
                {{ langSelected === "EN" ? "my wallet" : "mon wallet" }}
              </span>
            </div>

            <div class="babMenu" v-if="filterBy === 'pronos'">
              <span>
                <img
                  loading="lazy"
                  class="is-30"
                  src="~assets/images/coupe.png"
                  alt="coupe"
                />
                {{ langSelected === "EN" ? "bet" : "pronos" }}
              </span>
            </div>
            <div class="babMenu" v-if="filterBy === 'resultats'">
              <span>
                <img
                  loading="lazy"
                  class="is-30"
                  src="~assets/images/contestMainReussite.png"
                  alt="contestMainReussite"
                />
                {{ langSelected === "EN" ? "results" : "résultats" }}
              </span>
            </div>
            <div class="babMenu" v-if="filterBy === 'all'">
              <span>
                <img
                  loading="lazy"
                  class="is-30"
                  src="~assets/images/teams/rumour.png"
                  alt="rumour"
                />
                posts
              </span>
            </div>
            <div class="babMenu" v-if="filterBy === 'clap'">
              <span
                v-if="connectedUser && $route.params.id != connectedUser._id"
              >
                <img
                  loading="lazy"
                  class="is-30 clapi"
                  src="~assets/images/clap.png"
                  alt="clap"
                />
                {{ langSelected === "EN" ? "bookmarks" : "favoris" }}
              </span>
            </div>
          </div>

          <i
            v-if="
              filterBy != 'resultats' &&
              filterBy != 'pronos' &&
              filterBy != 'cagnotte'
            "
            @click="refresh"
            class="pointer fa fa-refresh"
            aria-hidden="true"
          ></i>
        </nav>

        <div
          class="swiper-container"
          v-swiper:myDirectiveSwiper="swiperOptions"
          @slide-next-transition-start="slideNextTransitionStart"
          @slide-prev-transition-start="slidePrevTransitionStart"
        >
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div v-if="filterBy === 'pronos'">
                <user-insights
                  :matchList="matchList"
                  @seeResult="seeResult($event)"
                  @seeLineup="seeLineup($event)"
                  @seeStadium="seeStadium($event)"
                  @ligue="ligue($event)"
                ></user-insights>
              </div>
              <div
                v-if="
                  filterBy === 'cagnotte' &&
                  $route.params.id === connectedUser._id
                "
              >
                <wallet-page
                  :footCoins="footCoins"
                  :transactions="transactions"
                  @getWalletInfo="getWalletInfo"
                  @iwantTowithDraw="iwantTowithDraw"
                  @iwantFootcoin="iwantFootcoin"
                  @detailFootcoin="detailFootcoin"
                ></wallet-page>
              </div>
              <div v-if="filterBy === 'resultats'">
                <user-results
                  :matchList="pastInsights"
                  @seeResult="seeResult($event)"
                  @seeLineup="seeLineup($event)"
                  @seeStadium="seeStadium($event)"
                  @ligue="ligue($event)"
                ></user-results>
              </div>

              <div
                v-if="
                  filterBy === 'podcast' ||
                  filterBy === 'all' ||
                  filterBy === 'clap'
                "
                class
              >
                <div class="babbles-box" id="babble-container">
                  <div v-if="babbles[0] != 'empty'">
                    <div
                      v-for="(babble, index) in babbles"
                      :key="index"
                      class="box"
                      v-observe-visibility="
                        index === babbles.length - 8
                          ? loadMoreBabble
                          : index === babbles.length - 1
                          ? loadMoreBabble
                          : false
                      "
                    >
                      <div
                        v-if="babble.babbleImg"
                        class="card-image imageChart"
                      >
                        <button
                          v-if="babble.babbleVideo"
                          class="button is-medium is-pdf"
                        >
                          <a :href="babble.babbleVideo">
                            {{
                              langSelected === "EN"
                                ? "Download PDF."
                                : "Télécharger le PDF."
                            }}</a
                          >
                        </button>
                        <a v-if="babble.babbleVideo" :href="babble.babbleVideo">
                          <figure class="image imageBabble">
                            <img
                              loading="lazy"
                              :src="babble.babbleImg"
                              alt="Placeholder image"
                            />
                          </figure>
                        </a>
                        <figure v-else class="image imageBabble">
                          <a @click="openBabbelTodisplay(babble)">
                            <img
                              loading="lazy"
                              :src="babble.babbleImg"
                              alt="Placeholder image"
                            />
                          </a>
                        </figure>
                      </div>

                      <div
                        v-if="!babble.babbleImg && babble.babbleVideo"
                        class="card-image imageChart videoBabble"
                      >
                        <div
                          v-if="
                            babble.mp3Link ||
                            babble.babbleVideo.toLowerCase().includes('mp3')
                          "
                          class="lecteur-audio-songs"
                        >
                          <vue-plyr>
                            <audio>
                              <source
                                :src="
                                  babble.mp3Link
                                    ? babble.mp3Link
                                    : babble.babbleVideo
                                "
                              />
                              Your browser does not support the audio element.
                            </audio>
                          </vue-plyr>
                        </div>

                        <div v-else>
                          <display-video
                            :video="babble.babbleVideo"
                          ></display-video>
                        </div>
                      </div>

                      <article class="media tweet">
                        <figure class="media-left">
                          <div class="image is-64x64 is-circle">
                            <nuxt-link :to="'/dashboard/' + babble.user._id">
                              <img
                                loading="lazy"
                                class="imgProfile"
                                :src="babble.user.picProfile"
                                alt="Image"
                              />
                            </nuxt-link>
                          </div>
                        </figure>
                        <div class="tweet-meta">
                          <strong class="usernameStong">
                            <nuxt-link :to="'/dashboard/' + babble.user._id">{{
                              babble.user.username
                            }}</nuxt-link>
                            <span
                              v-if="babble.user.role === 'bot'"
                              class="icon is-medium"
                            >
                              <img
                                loading="lazy"
                                class="verified"
                                src="~assets/images/verified.png"
                                alt="verified"
                              />
                            </span>
                          </strong>
                          <div class="eraseBab">
                            <small class="media-right has-text-grey-light">{{
                              moment(babble.created_at)
                                .local()
                                .format("DD-MM-YYYY HH:mm")
                            }}</small>
                            &nbsp
                            <button
                              v-if="
                                $auth.user &&
                                $auth.user.username &&
                                ($auth.user.role === 'admin' ||
                                  $auth.user.level === 'champions league' ||
                                  $auth.user._id === babble.user._id)
                              "
                              type="button"
                              @click="eraseBabble(babble)"
                              class="delete deletebabble"
                            ></button>
                          </div>
                        </div>
                      </article>
                      <div class="media-content">
                        <div class="content">
                          <div class="tagBabblesWrapper">
                            <div
                              v-if="babble.players && babble.players.length > 0"
                              class="tagWrapper"
                            >
                              <nuxt-link
                                v-for="(player, index) in babble.players"
                                :key="index"
                                :to="`/player/${player.display_name}/${player.id_sportmonks}`"
                              >
                                <figure type="button" class="imgTeamLink">
                                  <img
                                    loading="lazy"
                                    class="rounded"
                                    :src="player.picture"
                                    :alt="player.display_name"
                                  />
                                </figure>
                              </nuxt-link>
                            </div>
                            <div
                              v-if="
                                babble.teamLink && babble.teamLink.length > 0
                              "
                              class="tagWrapper"
                            >
                              <nuxt-link
                                v-for="(team, index) in babble.teamLink"
                                :key="index"
                                :to="`/teams/${team.shortName}`"
                              >
                                <figure type="button" class="imgTeamLink">
                                  <img
                                    loading="lazy"
                                    :src="team.teamImg"
                                    :alt="team.shortName"
                                    :class="{
                                      invertOk: team.shortName
                                        .toUpperCase()
                                        .includes('JUVE'),
                                    }"
                                  />
                                </figure>
                              </nuxt-link>
                            </div>
                          </div>
                          <a
                            v-if="!babble.mp3Link && babble.title"
                            @click="openBabbelTodisplay(babble)"
                          >
                            <h1 class="babbleTitle">
                              <code v-html="babble.title"></code>
                            </h1>
                          </a>
                          <div v-if="babble.babble">
                            <h2 class="quill-code has-text-grey babble-body">
                              <div
                                v-if="
                                  (babble.meta && babble.meta.length > 250) ||
                                  babble.babble.length > 500 ||
                                  babble.scrap ||
                                  babble.scrapHtml
                                "
                              >
                                <a
                                  @click="openBabbelTodisplay(babble)"
                                  class="linkBabbleMeta"
                                >
                                  <code
                                    v-html="
                                      babble.babbleImg
                                        ? babble.babble.slice(0, 200) + '...'
                                        : babble.babble.slice(0, 265) + '...'
                                    "
                                  ></code>
                                  <span class="laSuite">...</span>
                                </a>
                              </div>
                              <code v-else v-html="babble.babble"></code>
                            </h2>
                            <small
                              v-if="
                                !babble.scrapHtml &&
                                !babble.scrap &&
                                babble.user.role === 'bot' &&
                                babble.source
                              "
                              class="titleBabble level-item has-text-grey-light"
                            >
                              {{
                                langSelected === "EN" ? "read on" : "lire sur"
                              }}
                              <a
                                class="lireSurReply"
                                target="_blank"
                                :href="babble.source"
                                >&nbsp{{ babble.user.username }}</a
                              >
                            </small>
                            <small
                              v-else-if="
                                !babble.scrapHtml &&
                                !babble.scrap &&
                                babble.source
                              "
                              class="titleBabble level-item has-text-grey-light"
                            >
                              <a
                                class="lireSurReply"
                                target="_blank"
                                :href="babble.source"
                                >{{
                                  langSelected === "EN"
                                    ? "read "
                                    : "lire la suite"
                                }}</a
                              >
                            </small>
                          </div>

                          <div v-else-if="babble.mp3Link">
                            <h1
                              class="
                                quill-code
                                tweet-body
                                has-text-grey
                                babble-body
                              "
                            >
                              <code v-html="babble.title"></code>
                            </h1>
                            <div class="lecteur-audio-pod">
                              <vue-plyr>
                                <audio>
                                  <source :src="babble.mp3Link" />
                                  Your browser does not support the audio
                                  element.
                                </audio>
                              </vue-plyr>
                            </div>
                          </div>
                          <!--
                          <div
                            v-if="
                              babble.taggedUsers &&
                              babble.taggedUsers.length > 0
                            "
                            class="taggedUserWrapper"
                          >
                            <b-tag
                              @click="goToUser(user._id)"
                              class="is-info"
                              v-for="(user, index) in babble.taggedUsers"
                              :key="index"
                            >
                              <p @click="goToUser(user._id)">
                                {{ user.username }}
                              </p>
                            </b-tag>
                          </div>
                          -->
                        </div>
                      </div>

                      <nav class="media-right foOt">
                        <div class="level-left sociaSh has-text-grey-light">
                          <div v-if="babble.babble">
                            <ShareNetwork
                              network="facebook"
                              :url="
                                babble.teamLink.length > 0
                                  ? `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/babble/${babble._id}`
                                  : 'https://www.footfoot.co/news/babble/' +
                                    babble._id
                              "
                              :title="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.meta
                                  ? babble.meta
                                  : babble.babble
                              "
                              :description="
                                babble.babble && babble.meta
                                  ? babble.meta.substring(0, 300) +
                                    '... la suite sur'
                                  : babble.title
                                  ? babble.title + '... la suite sur'
                                  : babble.babble.substring(0, 300) +
                                    '... la suite sur'
                              "
                              :quote="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.meta
                                  ? babble.meta
                                  : babble.babble
                              "
                              hashtags="footfoot,football,pronos,news"
                              twitter-user="InsidersFoot"
                            >
                              <i class="fa fa-facebook">&nbsp &nbsp</i>
                            </ShareNetwork>
                            <ShareNetwork
                              network="twitter"
                              :url="
                                babble.teamLink.length > 0
                                  ? `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/babble/${babble._id}`
                                  : 'https://www.footfoot.co/news/babble/' +
                                    babble._id
                              "
                              :title="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.meta
                                  ? babble.meta
                                  : babble.babble
                              "
                              :description="
                                babble.babble && babble.meta
                                  ? babble.meta.substring(0, 300) +
                                    '... la suite sur'
                                  : babble.title
                                  ? babble.title + '... la suite sur'
                                  : babble.babble.substring(0, 300) +
                                    '... la suite sur'
                              "
                              :quote="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.meta
                                  ? babble.meta
                                  : babble.babble
                              "
                              hashtags="footfoot,football,pronos,news"
                              twitter-user="InsidersFoot"
                            >
                              <i class="fa fa-twitter">&nbsp &nbsp</i>
                            </ShareNetwork>

                            <ShareNetwork
                              network="sms"
                              class="mobileOnly"
                              :url="
                                babble.teamLink.length > 0
                                  ? `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/babble/${babble._id}`
                                  : 'https://www.footfoot.co/news/babble/' +
                                    babble._id
                              "
                              :title="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.meta
                                  ? babble.meta
                                  : babble.babble
                              "
                              :description="
                                babble.babble && babble.meta
                                  ? babble.meta.substring(0, 300) +
                                    '... la suite sur'
                                  : babble.title
                                  ? babble.title + '... la suite sur'
                                  : babble.babble.substring(0, 300) +
                                    '... la suite sur'
                              "
                              :quote="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.meta
                                  ? babble.meta
                                  : babble.babble
                              "
                              hashtags="footfoot,football,pronos,news"
                              twitter-user="InsidersFoot"
                            >
                              <i class="far fa-comment-dots">&nbsp &nbsp</i>
                            </ShareNetwork>

                            <ShareNetwork
                              network="messenger"
                              class="mobileOnly"
                              :url="
                                babble.teamLink.length > 0
                                  ? `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/babble/${babble._id}`
                                  : 'https://www.footfoot.co/news/babble/' +
                                    babble._id
                              "
                              :title="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.meta
                                  ? babble.meta
                                  : babble.babble
                              "
                              :description="
                                babble.babble && babble.meta
                                  ? babble.meta.substring(0, 300) +
                                    '... la suite sur'
                                  : babble.title
                                  ? babble.title + '... la suite sur'
                                  : babble.babble.substring(0, 300) +
                                    '... la suite sur'
                              "
                              :quote="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.meta
                                  ? babble.meta
                                  : babble.babble
                              "
                              hashtags="footfoot,football,pronos,news"
                              twitter-user="InsidersFoot"
                            >
                              <i class="fab fa-facebook-messenger"
                                >&nbsp &nbsp</i
                              >
                            </ShareNetwork>
                            <ShareNetwork
                              network="whatsapp"
                              :url="
                                babble.teamLink.length > 0
                                  ? `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/babble/${babble._id}`
                                  : 'https://www.footfoot.co/news/babble/' +
                                    babble._id
                              "
                              :title="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.meta
                                  ? babble.meta
                                  : babble.babble
                              "
                              :description="
                                babble.babble && babble.meta
                                  ? babble.meta.substring(0, 300) +
                                    '... la suite sur'
                                  : babble.title
                                  ? babble.title + '... la suite sur'
                                  : babble.babble.substring(0, 300) +
                                    '... la suite sur'
                              "
                              :quote="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.meta
                                  ? babble.meta
                                  : babble.babble
                              "
                              hashtags="footfoot,football,pronos,news"
                              twitter-user="InsidersFoot"
                            >
                              <i class="fa fa-whatsapp">&nbsp &nbsp</i>
                            </ShareNetwork>
                            <a
                              class="pointer"
                              v-clipboard:success="handleSuccess"
                              v-clipboard="
                                'https://www.footfoot.co/news/babble/' +
                                babble._id
                              "
                              type="button"
                            >
                              <i class="fa fas fa-copy"></i
                            ></a>
                          </div>

                          <div v-if="babble.mp3Link">
                            <ShareNetwork
                              network="facebook"
                              :url="
                                babble.teamLink.length === 0
                                  ? 'https://www.footfoot.co'
                                  : `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/podcast`
                              "
                              :title="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.babble
                              "
                              :description="
                                babble.babble
                                  ? babble.babble.substring(0, 300) +
                                    '... la suite sur'
                                  : babble.title + '... la suite sur'
                              "
                              :quote="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.babble
                              "
                              hashtags="contest,football,pronos,news"
                              twitter-user="InsidersFoot"
                            >
                              <i class="fa fa-facebook">&nbsp &nbsp</i>
                            </ShareNetwork>
                            <ShareNetwork
                              network="twitter"
                              :url="
                                babble.teamLink.length === 0
                                  ? 'https://www.footfoot.co'
                                  : `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/podcast`
                              "
                              :title="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.babble
                              "
                              :description="
                                babble.babble
                                  ? babble.babble.substring(0, 300) +
                                    '... la suite sur'
                                  : babble.title + '... la suite sur'
                              "
                              :quote="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.babble
                              "
                              hashtags="contest,football,pronos,news"
                              twitter-user="InsidersFoot"
                            >
                              <i class="fa fa-twitter">&nbsp &nbsp</i>
                            </ShareNetwork>

                            <ShareNetwork
                              network="sms"
                              class="mobileOnly"
                              :url="
                                babble.teamLink.length === 0
                                  ? 'https://www.footfoot.co'
                                  : `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/podcast`
                              "
                              :title="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.babble
                              "
                              :description="
                                babble.babble
                                  ? babble.babble.substring(0, 300) +
                                    '... la suite sur'
                                  : babble.title + '... la suite sur'
                              "
                              :quote="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.babble
                              "
                              hashtags="contest,football,pronos,news"
                              twitter-user="InsidersFoot"
                            >
                              <i class="far fa-comment-dots">&nbsp &nbsp</i>
                            </ShareNetwork>

                            <ShareNetwork
                              network="messenger"
                              class="mobileOnly"
                              :url="
                                babble.teamLink.length === 0
                                  ? 'https://www.footfoot.co'
                                  : `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/podcast`
                              "
                              :title="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.babble
                              "
                              :description="
                                babble.babble
                                  ? babble.babble.substring(0, 300) +
                                    '... la suite sur'
                                  : babble.title + '... la suite sur'
                              "
                              :quote="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.babble
                              "
                              hashtags="contest,football,pronos,news"
                              twitter-user="InsidersFoot"
                            >
                              <i class="fab fa-facebook-messenger"
                                >&nbsp &nbsp</i
                              >
                            </ShareNetwork>
                            <ShareNetwork
                              network="whatsapp"
                              :url="
                                babble.teamLink.length === 0
                                  ? 'https://www.footfoot.co'
                                  : `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/podcast`
                              "
                              :title="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.babble
                              "
                              :description="
                                babble.babble
                                  ? babble.babble.substring(0, 300) +
                                    '... la suite sur'
                                  : babble.title + '... la suite sur'
                              "
                              :quote="
                                babble.babble && babble.title
                                  ? babble.title
                                  : babble.babble
                              "
                              hashtags="contest,football,pronos,news"
                              twitter-user="InsidersFoot"
                            >
                              <i class="fa fa-whatsapp">&nbsp &nbsp</i>
                            </ShareNetwork>
                            <a
                              class="pointer"
                              v-clipboard:success="handleSuccess"
                              v-clipboard="
                                babble.teamLink.length === 0
                                  ? 'https://www.footfoot.co'
                                  : `https://www.footfoot.co/teams/${babble.teamLink[0].shortName}/podcast`
                              "
                              type="button"
                            >
                              <i class="fa fas fa-copy"></i
                            ></a>
                          </div>
                        </div>
                        <div class="add-team-and-like">
                          <img
                            @click="addTeam(babble)"
                            v-if="
                              connectedUser &&
                              $auth.user &&
                              $auth.user._id &&
                              connectedUser.role === 'admin'
                            "
                            class="plus-img invertOk"
                            src="~assets/images/plus.png"
                            alt="plus"
                          />
                          <nuxt-link
                            v-if="!babble.mp3Link && babble.title"
                            :to="
                              babble.teamLink.length > 0
                                ? `/teams/${babble.teamLink[0].shortName}/babble/${babble._id}`
                                : '/news/babble/' + babble._id
                            "
                            class="level-item has-text-grey-light"
                          >
                            <span class="icon is-medium">
                              <img
                                loading="lazy"
                                class="clap"
                                src="~assets/images/comments.svg"
                                alt="comment"
                              />
                            </span>
                            <small>{{ babble.babbleReply.length }}</small>
                            &nbsp&nbsp
                          </nuxt-link>

                          <a
                            @click="iLike(babble)"
                            class="level-item likeBut has-text-grey-light"
                          >
                            <span class="icon is-medium">
                              <img
                                loading="lazy"
                                class="clap"
                                src="~assets/images/clap.svg"
                                alt="clap"
                              />
                            </span>
                            <small>{{ babble.like.length }}</small>
                          </a>
                        </div>
                      </nav>
                    </div>
                  </div>

                  <div
                    v-if="babbles[0] === 'empty'"
                    class="sideRecent box babble-container no-babble"
                  >
                    <p class="content-no-bet" v-if="filterBy === 'all'">
                      {{
                        langSelected === "EN"
                          ? "no articles yet"
                          : "Pas encore d'article !"
                      }}
                      <br />
                      <nuxt-link
                        class="buttonContest desktopOnly"
                        to="/publish"
                      >
                        <button class="button is-primary">
                          {{
                            langSelected === "EN"
                              ? "share a news"
                              : "Partage une info"
                          }}
                        </button>
                      </nuxt-link>
                      <nuxt-link
                        class="buttonContest mobileOnly"
                        to="/publishm"
                      >
                        <button class="button is-primary">
                          {{
                            langSelected === "EN"
                              ? "share a news"
                              : "Partage une info"
                          }}
                        </button>
                      </nuxt-link>
                    </p>
                    <p v-if="filterBy === 'videos'">...</p>
                    <p v-if="filterBy === 'podcast'">...</p>
                    <p v-if="filterBy === 'clap'">
                      {{
                        $auth.user && $auth.user._id == $route.params.id
                          ? "Retrouve ici tes articles préférés"
                          : "Pas encore d'articles favoris"
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </client-only>
    </div>
    <div v-if="addTeamBabble">
      <b-modal
        :active.sync="addTeamBabbleModal"
        class="selectClubModal"
        :width="640"
      >
        <header class="modal-card-head">
          <h1 class="titleMessage">A quelle équipe / joueur ?</h1>
        </header>
        <section class="modal-card-body">
          <div class="media assignToteam">
            <b-field label="Equipe">
              <multiselect
                :custom-label="customLabel"
                v-model="attachTeam"
                placeholder="Equipe"
                :loading="loading"
                :options="options"
                :close-on-select="true"
                @search-change="asyncFind"
                @close="closeMulti()"
                :showNoOptions="false"
                track-by="name"
                label="name"
                :hideSelected="true"
                :multiple="true"
                :allowEmpty="true"
              >
                <template slot="option" slot-scope="props">
                  <div>
                    <div class="searchWrap">
                      <img
                        loading="lazy"
                        class="option__image navImg"
                        :src="props.option.teamImg"
                        alt="team"
                      />
                      <div class="option__desc">
                        <span class="option__title">{{
                          props.option.name
                        }}</span>
                      </div>
                    </div>
                  </div>
                </template>

                <span slot="noResult">{{
                  langSelected === "EN"
                    ? "no matching results!"
                    : "pas de résultats correspondants !"
                }}</span>
              </multiselect>
            </b-field>
            <b-field label="Joueur">
              <multiselect
                :custom-label="customLabelPlayer"
                v-model="playersToAssign"
                placeholder="Joueur"
                :options="optionPlayers"
                :close-on-select="true"
                @search-change="asyncFindPlayer"
                :showNoOptions="false"
                track-by="searchName"
                :multiple="true"
                label="searchName"
                :allowEmpty="true"
              >
                <template slot="option" slot-scope="props">
                  <div class="searchWrap">
                    <img
                      loading="lazy"
                      class="option__image navImg roudImg"
                      :src="props.option.img"
                      alt="player"
                    />
                    <div class="option__desc">
                      <span class="option__title">{{
                        props.option.searchName
                      }}</span>
                    </div>
                  </div>
                </template>
                <span slot="noResult">{{
                  langSelected === "EN"
                    ? "no matching results!"
                    : "pas de résultats correspondants !"
                }}</span>
              </multiselect>
            </b-field>
          </div>
        </section>
        <footer class="modal-card-foot okAddTeam">
          <button
            type="button"
            @click="saveTeam"
            class="button is-success checkOut"
          >
            Ok
          </button>
        </footer>
      </b-modal>
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
    <b-modal
      v-if="filterBy === 'cagnotte' && $route.params.id === connectedUser._id"
      :active.sync="detailFootcoinModal"
    >
      <detail-footcoin
        @closedetailFootcoinModal="closedetailFootcoinModal"
      ></detail-footcoin>
    </b-modal>
    <b-modal
      v-if="filterBy === 'cagnotte' && $route.params.id === connectedUser._id"
      :active.sync="iwantFootcoinModal"
    >
      <achat-footcoin
        @closeAchat="closeAchat"
        class="buyFootCoinModal"
      ></achat-footcoin>
    </b-modal>
    <b-modal
      v-if="filterBy === 'cagnotte' && $route.params.id === connectedUser._id"
      :active.sync="withdrawModal"
    >
      <withdraw-footcoin @closeWithdraw="closeWithdraw"></withdraw-footcoin>
    </b-modal>
  </div>
</template>

<script>
import {
  sendBabbleReply,
  assignTeam,
  deleteABbbles,
  postLike,
} from "@/server/api";
import { searchTeam, searchAll } from "@/server/apiSearch";
import moment from "moment";
import Multiselect from "vue-multiselect";

export default {
  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      lineUp: "",
      resultatModal: false,
      resultat: "",
      stadium: "",
      stadiumModal: false,
      loading: false,
      options: [],
      babble: "",
      isCardModalActive: false,
      babbleText: "",
      modalBabble: "",
      userReply: "",
      videoId: "videoId",
      loadMore: 1,
      bottom: false,
      addTeamBabbleModal: false,
      addTeamBabble: "",
      attachTeam: [],
      uploadImage: "",
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
      optionPlayers: [],
      playersToAssign: [],
      detailFootcoinModal: false,
      iwantFootcoinModal: false,
      withdrawModal: false,
    };
  },
  components: {
    displayVideo: () => import("@/components/modal/displayVideo"),
    MyPublish: () => import("@/components/userpage/MyPublish"),
    UserResults: () => import("@/components/userpage/UserResults"),
    UserInsights: () => import("@/components/userpage/UserInsights"),
    walletPage: () => import("@/components/userpage/walletPage"),
    resultatModal: () => import("@/components/modal/resultatModal"),
    stadiumModal: () => import("@/components/modal/stadiumModal"),
    achatFootcoin: () => import("@/components/modal/achatFootcoin"),
    withdrawFootcoin: () => import("@/components/modal/withdrawFootcoin"),
    detailFootcoin: () => import("@/components/modal/detailFootcoin"),
    Multiselect,
  },
  watch: {
    $route() {
      this.loadMore = 1;
    },
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
    pastInsights: Array,
    profileInfo: "",
    matchList: Array,
    babbles: "",
    forums: "",
    filterBy: "",
    footCoins: "",
    transactions: Array,
  },

  methods: {
    handleSuccess() {
      this.$buefy.dialog.alert("Le lien a été copié! Plus qu'à le partager 😋");
    },
    openBabbelTodisplay(event) {
      this.$store.commit("var/setbabbaleTodisplay", event);
    },
    closeWithdraw() {
      this.$emit("getWalletInfo");
      this.withdrawModal = false;
    },
    iwantTowithDraw() {
      this.withdrawModal = true;
    },
    iwantFootcoin() {
      this.iwantFootcoinModal = true;
    },
    closeAchat() {
      this.$emit("getWalletInfo");
      this.iwantFootcoinModal = false;
    },
    closedetailFootcoinModal() {
      this.detailFootcoinModal = false;
    },
    detailFootcoin() {
      this.detailFootcoinModal = true;
    },
    asyncFindPlayer(query) {
      this.optionPlayers = [];
      if (query[1]) {
        searchAll(query.toLowerCase()).then((resp) => {
          let optionPlayer = {};

          if (resp.players.length > 0) {
            optionPlayer = resp.players.map((p) => {
              return {
                searchName: p.display_name ? p.display_name : p.name,
                shortName: p._id,
                type: "Joueurs",
                img:
                  p.picture && p.picture.includes("data:image/jpeg")
                    ? p.picture.replace("data:image/jpeg;", "data:image/png;")
                    : p.picture,
              };
            });
            this.optionPlayers = optionPlayer;
          }
        });
      } else {
        this.optionPlayers = [];
      }
    },

    customLabelPlayer({ searchName, shortName, name, type }) {
      if (searchName) {
        return `${searchName}`;
      } else {
        return [];
      }
    },
    seeLineup(event) {
      this.resultat = event;
      this.lineUp = true;
      this.resultatModal = true;
    },
    seeResult(event) {
      this.lineUp = false;
      this.resultat = event;
      this.resultatModal = true;
    },
    seeStadium(event) {
      this.stadium = event;
      this.stadiumModal = true;
    },
    getWalletInfo() {
      this.$emit("getWalletInfo");
    },
    sortBabbles(event) {
      this.$emit("sortbabbles", event);
    },
    cagnotte() {
      this.$emit("cagnotte");
    },
    Pronos() {
      this.$emit("pronos");
    },
    Results() {
      this.$emit("results");
    },
    slideNextTransitionStart() {
      if (this.profileInfo.role != "bot") {
        if (this.$route.params.id === this.connectedUser._id) {
          if (this.$route.params.id === this.connectedUser._id) {
            if (this.filterBy == "cagnotte") {
              this.$emit("sortbabbles", "all");
            } else if (this.filterBy == "all") {
              this.$emit("abonne");
              //this.$emit("results");
            } else if (this.filterBy == "abonne") {
              this.$emit("abonnement");
              //this.$emit("results");
            } else {
              this.$emit("cagnotte");
            }
          }
        } else {
          if (this.filterBy == "clap") {
            this.$emit("pronos");
          } else if (this.filterBy == "pronos") {
            this.$emit("sortbabbles", "all");
            //this.$emit("results");
          } else if (this.filterBy == "resultats") {
            this.$emit("sortbabbles", "all");
          } else {
            this.$emit("sortbabbles", "clap");
          }
        }
      }
    },

    slidePrevTransitionStart() {
      if (this.profileInfo.role != "bot") {
        if (this.$route.params.id === this.connectedUser._id) {
          if (this.filterBy == "cagnotte") {
            this.$emit("abonnement");
          } else if (this.filterBy == "all") {
            this.$emit("cagnotte");
            //this.$emit("results");
          } else if (this.filterBy == "abonne") {
            this.$emit("sortbabbles", "all");
            //this.$emit("results");
          } else {
            this.$emit("abonne");
          }
        } else {
          if (this.filterBy == "clap") {
            this.$emit("sortbabbles", "all");
          } else if (this.filterBy == "pronos") {
            this.$emit("sortbabbles", "clap");
            //this.$emit("results");
          } else if (this.filterBy == "resultats") {
            this.$emit("sortbabbles", "all");
          } else {
            this.$emit("pronos");
          }
        }
      }
    },
    loadMoreBabble(isVisible) {
      if (isVisible) {
        if (
          this.filterBy != "pronos" &&
          this.filterBy != "resultats" &&
          this.filterBy != "cagnotte"
        ) {
          this.loadMore = this.loadMore + 1;
          setTimeout(() => {
            this.$emit("loadMore", this.loadMore);
          }, 1);
        }
      }
    },
    goToTeam(event) {
      this.$router.push(`/teams/${event}`);
    },
    goToUser(event) {
      this.$router.push(`/dashboard/${event}`);
    },
    asyncFind(query) {
      this.options = [];
      if (query[0] && query[0] != " ") {
        this.loading = true;
        searchTeam(query).then((data) => {
          this.loading = false;
          this.options = data;
        });
      } else {
        this.options = [];
      }
    },
    ligue(ligue) {
      this.$store.commit("var/setNewValue", ligue);
      setTimeout(() => {
        this.$router.push("/leagues");
      }, 10);
    },
    closeMulti() {
      this.isLoading = false;
      this.options = [];
    },
    customLabel({ searchName, shortName, name }) {
      if (shortName) {
        return `${name} – ${searchName} -${shortName}`;
      } else {
        return [];
      }
    },
    saveTeam() {
      let teamLink =
        this.attachTeam.length > 0 ? this.attachTeam.map((t) => t._id) : [];
      let players =
        this.playersToAssign.length > 0
          ? this.playersToAssign.map((p) => p.shortName)
          : [];
      assignTeam(this.addTeamBabble._id, players, teamLink).then((data) => {
        this.$emit("changeBabbles");
        this.addTeamBabbleModal = false;
      });
    },
    addTeam(event) {
      this.addTeamBabble = event;
      this.addTeamBabbleModal = true;
    },

    refresh() {
      if (!this.$nuxt.isOffline) {
        if (this.filterBy === "podcast") {
          this.$emit("podCast");
        } else if (this.filterBy === "forum") {
          this.$emit("forum");
        } else {
          this.$emit("sortbabbles", this.filterBy);
        }
      }
    },
    moment: function (time) {
      return moment(time);
    },

    showModal(babble) {
      this.pause;
      this.modalBabble = babble;
      this.isCardModalActive = true;
    },

    stop() {
      this.player.stopVideo();
    },
    eraseBabble(babble) {
      if (
        this.$store.state.auth.user &&
        (this.$store.state.auth.user.level === "champions league" ||
          this.$store.state.auth.user.role === "admin" ||
          (this.$store.state.auth.user &&
            this.$store.state.auth.user._id === babble.user._id))
      ) {
        deleteABbbles(babble._id).then(() => {
          this.$emit("changeBabbles");
        });
      }
    },
    iLike(babble) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        this.stop;
        let like = {};
        like.babbleId = babble._id;
        like.userLiked = babble.user._id;
        postLike(like).then(() => {
          this.$emit("changeBabbles");
          this.isCardModalActive = false;
        });
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },

    postBabble(modalBabble) {
      this.stop;
      sendBabbleReply(this.babbleText, modalBabble._id).then(() => {
        this.babbleText = "";
        this.isCardModalActive = false;
        this.$emit("changeBabbles");
      });
    },
    addLinksToHttp(inputText) {
      var replacedText;
      inputText = inputText.replace(/(?:\r\n|\r|\n)/g, "<br />");
      replacedText = inputText;
      return replacedText;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style><style scoped>
.assignToteam {
  display: flex !important;
  flex-direction: column !important;
}
.content-no-bet {
  display: flex;
  flex-direction: column;
}
.buttonContest {
  margin: auto;
  margin-top: 5px;
}
.sideRecent {
  min-height: 50vh;
}
.tag {
  margin-right: 0.5rem;
  cursor: pointer;
}
.sideRecent {
  min-height: 50vh;
}
.taggedUserWrapper {
  display: flex;
  margin: 0.5rem;
  margin-left: 0rem;
}

.taggedUserWrapper > span {
  color: #192b41;
  font-weight: bold;
  margin-right: 0.5rem;
  font-size: 0.6rem;
  cursor: pointer;
}

code {
  background-color: white !important;
}

.add-team-and-like {
  display: flex;
}

.add-team-and-like > img {
  padding-right: 15px;
  margin: auto;
  height: 15px;
}

.okAddTeam {
  margin: auto !important;
}

h1 {
  font-size: 1.2rem !important;
}

h2 {
  font-size: 1.2rem !important;
}

body {
  color: lightslategray;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.7em;
}

a {
  color: #192b41 !important;
}

.modal-card-body {
  overflow: visible;
}

.lecteur-audio-pod {
  display: flex;
  justify-content: center;
}

.replyBabble {
  cursor: pointer;
}

.babble-body {
  padding: 0rem !important;
  margin-bottom: 0.8rem !important;
}

.content {
  margin-bottom: 0rem !important;
}

.p-x-1 {
  min-height: 5rem;
}

.fa {
  cursor: pointer !important;
}

.sociaSh {
  cursor: pointer;
  align-self: center;
}

.foOt {
  display: flex;
  font-size: 1.5rem;
  justify-content: flex-start;
  margin-left: 0rem !important;
}

.reply {
  height: 1.25rem;
  margin-right: 0px !important;
}

.tweet-body {
  word-break: break-word;
}

.babblesMenu {
  display: flex;
  margin: auto;
  width: 100%;
}

.card-content {
  padding: 0.5rem;
}

.fa-refresh {
  margin: auto;
  margin-right: 1.5rem;
  font-size: 1.2rem;
}

.navbar.is-dark {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  justify-content: space-between;
}
.borderNotRound {
  border-top-right-radius: 0px !important;
  border-top-left-radius: 0px !important;
}

.navbar {
  background-color: #fff;
  min-height: 3.25rem;
  position: relative;
}

.fa {
  text-align: center;
  vertical-align: top;
  color: #192b41;
}

.level-item {
  cursor: pointer;
}

.verified {
  height: 15px;
}

.level-right {
  justify-content: center;
  margin-bottom: 1rem;
}

.buttonBet {
  padding-left: 30px;
  padding-right: 30px;
  font-weight: bolder;
  color: #fff;
  background-color: #eb412d;
  box-shadow: 0 0 0 0.125em#eb412d;
  border-color: #eb412d;
  font-size: 1.2rem !important;
}

.buttonBet:focus,
.buttonBet:hover {
  background-color: #fff !important;
  border-color: #eb412d !important;
  color: #eb412d !important;
}

.media-right {
  margin-left: 0rem;
  justify-content: space-between;
  display: flex;
}

.likeBut {
  justify-content: flex-end;
}

.titleBabble {
  display: flex;
  justify-content: flex-end;
}

.plus-img {
  height: 25px;
  width: auto;
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

.is-30 {
  width: auto;
  height: 30px;
  padding-right: 10px;
}

.itemMenu {
  display: flex;
  margin: auto;
  cursor: pointer;
}

.babMenu {
  width: 100%;
  display: flex;
  padding: 5px;
  margin: auto;
  font-weight: bold;
  color: #192b41 !important;
}
.babMenu > span {
  display: flex;
  align-items: center;
}

.itemMenu > p {
  padding-left: 0.5rem;
}

.mobileOnly {
  display: none !important;
}

@media screen and (max-width: 768px) {
  .borderNotRound {
    border-top-right-radius: 5px !important;
    border-top-left-radius: 5px !important;
  }
  .level-right {
    display: flex;
    margin-top: 0rem;
  }

  .mobileOnly {
    display: flex !important;
  }

  .desktopOnly {
    display: none !important;
  }

  .is-30 {
    width: auto;
    height: 30px;
    padding-right: 10px;
  }

  .babMenu {
    width: 100%;
    padding: 0.5rem;
    font-size: 1.3rem !important;
    color: #c9c9c9;
    font-weight: bold;
    align-items: center;
  }

  h1 {
    font-size: 0.8rem !important;
  }

  h2 {
    font-size: 0.8rem !important;
  }
  .has-text-grey-light > small {
    font-size: 0.9rem !important;
  }
  .likeBut > small {
    font-size: 0.9rem !important;
  }

  .media {
    margin-bottom: 0rem !important;
  }

  .buttonBet {
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 0.9rem !important;
  }

  .media-right {
    font-size: 1rem;
    padding: 0 0.5rem;
  }

  .usernameStong {
    font-size: 0.9rem;
  }

  .level-item {
    margin-right: 10px;
  }

  .level-item:not(:last-child) {
    margin-bottom: 0px;
  }

  .media-left {
    margin: 0px;
    margin-right: 5px;
  }

  .card-content {
    padding: 0px;
  }

  .icon {
    font-size: 0.8rem;
  }

  .level-left + .level-right {
    margin-top: 0px !important;
  }
}
</style>