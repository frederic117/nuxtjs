<template>
  <div>
    <div>
      <div>
        <my-publish v-if="!mobile" class="desktopOnly"></my-publish>

        <nav class="navbar is-dark">
          <div class="mainMenu">
            <a @click="sortBabbles('all')" class="navbar-item is-tab itemMenu">
              <span type="button">
                <img
                  loading="lazy"
                  class="is-35"
                  src="~assets/images/teams/rumour.png"
                  alt="rumor"
                />
              </span>
            </a>
            <a
              @click="abonnement()"
              class="navbar-item is-tab itemMenu"
              to="/mypage/abonnement"
            >
              <span type="button">
                <img
                  loading="lazy"
                  class="is-35"
                  src="~assets/images/stay.png"
                  alt="abo"
                />
              </span>
            </a>
            <!--	<nuxt-link class="navbar-item is-tab itemMenu" to="/mypage/forum">
							<span type="button">
								<img
									loading="lazy"
									class="is-35 invertOk"
									src="~assets/images/teams/question-mark-9.png"
									alt="forum"
								/>
							</span>
						</nuxt-link> -->

            <a @click="podCasts" class="navbar-item is-tab itemMenu">
              <span type="button">
                <img
                  loading="lazy"
                  class="is-35"
                  src="~assets/images/teams/podcast.png"
                  alt="podcast"
                />
              </span>
            </a>

            <a
              @click="sortBabbles('clap')"
              class="navbar-item is-tab itemMenu"
              to="/mypage/clap"
            >
              <span type="button">
                <img
                  loading="lazy"
                  class="is-35 clapi"
                  src="~assets/images/clap.png"
                  alt="clap"
                />
              </span>
            </a>
            <a
              @click="sortBabbles('pronos')"
              class="navbar-item is-tab itemMenu"
            >
              <span type="button">
                <img
                  loading="lazy"
                  class="is-35"
                  src="~assets/images/ballon-contest.png"
                  alt="ballon-contest"
                />
              </span>
            </a>
          </div>
        </nav>
        <nav class="navbar is-dark subMenu">
          <div class="babblesMenu">
            <span v-if="filterBy === 'all'" class="babMenu">
              <img
                loading="lazy"
                class="is-30"
                src="~assets/images/teams/rumour.png"
                alt="rumour"
              />
              {{ langSelected == "EN" ? "news" : "actus" }}
              <nuxt-link
                v-if="!mobile"
                class="buttonContest desktopOnly"
                to="/publish"
              >
                <i class="fa fa-pencil pointer is-20" aria-hidden="true"></i>
              </nuxt-link>
              <nuxt-link class="buttonContest mobileOnly" to="/publishm">
                <i class="fa fa-pencil pointer is-20" aria-hidden="true"></i>
              </nuxt-link>
            </span>
            <span v-if="filterBy === 'clap'" class="babMenu">
              <img
                loading="lazy"
                class="is-30 clapi"
                src="~assets/images/clap.png"
                alt="favoris"
              />
              {{ langSelected == "EN" ? "bookmarks" : "favoris" }}
            </span>
            <span v-if="filterBy === 'forum'" class="babMenu">
              <img
                loading="lazy"
                class="is-30 invertOk"
                src="~assets/images/teams/question-mark-9.png"
                alt="forum"
              />
              forum
              <img
                type="button"
                @click="openisAskForum"
                class="is-20"
                src="~assets/images/More.png"
                alt="plus"
              />
            </span>

            <!-- <span  type="button" @click="sortBabbles('insidermates')" :class="{'is-active':filterBy ==='insidermates'}" class="babMenu ">{{langSelected==="EN"?"My Crew":"monCrew"}}</span> -->
            <span v-if="filterBy === 'podcast'" class="babMenu">
              <img
                loading="lazy"
                class="is-30"
                src="~assets/images/teams/podcast.png"
                alt="podcast"
              />
              podcasts
            </span>
            <span v-if="filterBy === 'pronos'" class="babMenu">
              <img
                loading="lazy"
                class="is-30"
                src="~assets/images/ballon-contest.png"
                alt="ballon-contest"
              />
              {{ langSelected == "EN" ? "my bets" : "mes pronos" }}
            </span>
            <span v-if="filterBy === 'resultats'" class="babMenu">
              <img
                loading="lazy"
                class="is-30"
                src="~assets/images/ballon-contest.png"
                alt="ballon"
              />
              {{ langSelected == "EN" ? "result" : "résultats" }}
            </span>
            <div class="babblesMenu" v-if="filterBy === 'abonnement'">
              <span
                v-if="$auth.user && $auth.user._id"
                class="babMenu formNavWrap"
              >
                <div class="control has-icons-left formNav">
                  <multiselect
                    :custom-label="customLabelInsider"
                    v-model="nameInsider"
                    :placeholder="'téléfoot, SteevyG, Virage, Romain molina ....'"
                    :loading="isLoading"
                    :options="optionsInsider"
                    :close-on-select="true"
                    @search-change="asyncFindInsider"
                    @close="closeMultiInsider()"
                    :showNoOptions="false"
                    track-by="searchName"
                    label="searchName"
                    :multiple="false"
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
                    <span slot="noResult">
                      {{
                        langSelected == "EN"
                          ? "no result"
                          : "pas de résultats correspondants !"
                      }}
                    </span>
                  </multiselect>
                  <span class="icon is-big is-left">
                    <i class="fa fa-search" type="submit"></i>
                  </span>
                </div>
              </span>
              <span v-else class="babMenu">
                <img
                  loading="lazy"
                  class="is-30"
                  src="~assets/images/stay.png"
                  alt="abonnement"
                />
                {{ langSelected == "EN" ? "subscriptions" : "abonnements" }}
              </span>
            </div>
          </div>
          <i
            v-if="
              filterBy != 'resultats' &&
              filterBy != 'pronos' &&
              filterBy != 'abonnement'
            "
            type="button"
            @click="refresh()"
            class="pointer fa fa-refresh"
            aria-hidden="true"
          ></i>
        </nav>
        <div id="loader-container" v-if="refreshActive == true">
          <slot name="loading">
            <div class="spinner"></div>
          </slot>
        </div>
        <div
          class="swiper-container"
          v-swiper:myDirectiveSwiper="swiperOptions"
          @slide-next-transition-start="slideNextTransitionStart"
          @slide-prev-transition-start="slidePrevTransitionStart"
          @ready="onReady"
        >
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div v-if="filterBy === 'pronos' && $auth.user && $auth.user._id">
                <user-insights
                  @seeResult="seeResult($event)"
                  @seeLineup="seeLineup($event)"
                  @seeStadium="seeStadium($event)"
                  @ligue="ligue($event)"
                ></user-insights>
              </div>
              <div v-else-if="filterBy === 'pronos'">
                <upcoming-match-list-contest
                  v-if="upcomingMatchList && upcomingMatchList.length > 0"
                  :matchList="upcomingMatchList"
                  @result="seeResult($event)"
                  @seeLineup="seeLineup($event)"
                  @seeStadium="seeStadium($event)"
                ></upcoming-match-list-contest>
                <div v-else class="babbles-box box babble-container no-babble">
                  <div class="content-no-bet">
                    <p>
                      {{
                        langSelected == "EN"
                          ? "join a contest to win"
                          : "rejoins un contest pour gagner des"
                      }}
                      <strong class="has-text-contest">footCoins</strong>
                    </p>
                    <button class="button is-large buttonBet">
                      <nuxt-link to="/signup"
                        ><strong class="is-white">{{
                          langSelected == "EN" ? "register" : "inscription"
                        }}</strong></nuxt-link
                      >
                    </button>
                  </div>
                </div>
              </div>
              <div v-else-if="filterBy === 'abonnement'">
                <client-only>
                  <user-abo
                    :nameInsider="nameInsider"
                    v-if="$auth.user && $auth.user._id"
                    :filterBy="filterBy"
                    :abonnementList="abonnementList"
                    :userId="$auth.user && $auth.user._id ? $auth.user._id : ''"
                  ></user-abo>

                  <div
                    v-else
                    class="babbles-box box babble-container no-babble"
                  >
                    <div class="content-no-bet">
                      {{
                        langSelected == "EN"
                          ? "your subscriptions"
                          : "retrouve ici tes abonnements !"
                      }}

                      <button class="button is-large buttonBet">
                        <nuxt-link to="/signup"
                          ><strong class="is-white">{{
                            langSelected == "EN" ? "register" : "inscription"
                          }}</strong></nuxt-link
                        >
                      </button>
                    </div>
                  </div>
                </client-only>
              </div>
              <div
                v-else-if="
                  (filterBy === 'podcast' ||
                    filterBy === 'all' ||
                    filterBy === 'clap') &&
                  babblesTodisplay
                "
              >
                <div
                  class="babbles-box"
                  v-if="
                    babblesTodisplay.length > 0 &&
                    babblesTodisplay[0] != 'empty'
                  "
                >
                  <div
                    @click="setBabbleClick(`a${babble._id}`)"
                    v-for="(babble, index) in babblesTodisplay"
                    :key="index"
                    :id="`a${babble._id}`"
                    class="box"
                    v-observe-visibility="
                      index === babblesTodisplay.length - 8
                        ? loadMoreBabble
                        : index === babblesTodisplay.length - 1
                        ? loadMoreBabble
                        : false
                    "
                  >
                    <div
                      v-if="!babble.babbleImg && babble.babbleVideo"
                      class="card-image imageChart videoBabble"
                    >
                      <display-video
                        :video="babble.babbleVideo"
                      ></display-video>
                    </div>

                    <article class="media">
                      <figure class="media-left">
                        <div
                          v-if="babble.user"
                          class="image is-64x64 is-circle"
                        >
                          <nuxt-link
                            :to="'/dashboard/' + babble.user._id"
                            class
                          >
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
                        <strong v-if="babble.user" class="usernameStong">
                          <nuxt-link
                            :to="'/dashboard/' + babble.user._id"
                            class
                            >{{ babble.user.username }}</nuxt-link
                          >
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
                        <client-only
                          v-if="
                            $auth.user &&
                            $auth.user.username &&
                            $auth.user.role === 'admin'
                          "
                        >
                          <i
                            @click="postPushNotif(babble)"
                            class="fas fa-bell pointer"
                          ></i>
                        </client-only>
                        <div class="eraseBab">
                          <small class="media-right has-text-grey-light">{{
                            moment(babble.created_at)
                              .local()
                              .format("DD-MM-YYYY HH:mm")
                          }}</small>
                          &nbsp
                          <client-only>
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
                          </client-only>
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
                                  :src="
                                    player.picture
                                      ? player.picture
                                      : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                                  "
                                  :alt="player.display_name"
                                />
                              </figure>
                            </nuxt-link>
                          </div>
                          <div
                            v-if="babble.teamLink && babble.teamLink.length > 0"
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
                                    invertOk:
                                      team && team.shortName
                                        ? team.shortName
                                            .toUpperCase()
                                            .includes('JUVE')
                                        : false,
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
                          <h1
                            v-if="!babble.mp3Link && babble.title"
                            class="babbleTitle"
                          >
                            <code v-html="babble.title"></code>
                          </h1>
                        </a>
                        <div
                          v-if="babble.babble && !mobile"
                          class="displayFlex desktopOnly"
                        >
                          <div
                            v-if="babble.babbleImg"
                            class="card-image imageChart desktopOnly"
                          >
                            <figure class="image imageBabble">
                              <a @click="openBabbelTodisplay(babble)">
                                <img
                                  loading="lazy"
                                  class="smallImg"
                                  :src="babble.babbleImg"
                                  alt="image"
                                />
                              </a>
                            </figure>
                          </div>
                          <div class="widthfull">
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
                                Your browser does not support the audio element.
                              </audio>
                            </vue-plyr>
                          </div>
                        </div>
                        <!--
                        <div
                          v-if="
                            babble.taggedUsers && babble.taggedUsers.length > 0
                          "
                          class="taggedUserWrapper"
                        >
                          <b-tag
                            type="button"
                            @click="goToUser(user._id)"
                            class="is-info"
                            v-for="(user, index) in babble.taggedUsers"
                            :key="index"
                          >
                            <p type="button" @click="goToUser(user._id)">
                              {{ user.username }}
                            </p>
                          </b-tag>
                        </div>
                        -->
                      </div>
                    </div>

                    <nav class="media-right foOt">
                      <div class="level-left sociaSh has-text-grey-light">
                        <div v-if="filterBy == 'podcast'">
                          <ShareNetwork
                            network="facebook"
                            url="https://www.footfoot.co/mypage/podcast"
                            :title="
                              babble.title
                                ? babble.title
                                : babble.meta
                                ? babble.meta
                                : babble.babble
                            "
                            :description="`Viens écouter le podcast de ${babble.user.username} sur footfoot`"
                            :quote="
                              babble.title
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
                            url="https://www.footfoot.co/mypage/podcast"
                            :title="
                              babble.title
                                ? babble.title
                                : babble.meta
                                ? babble.meta
                                : babble.babble
                            "
                            :description="`Viens écouter le podcast de ${babble.user.username} sur footfoot`"
                            :quote="
                              babble.title
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
                            url="https://www.footfoot.co/mypage/podcast"
                            :title="
                              babble.title
                                ? babble.title
                                : babble.meta
                                ? babble.meta
                                : babble.babble
                            "
                            :description="`Viens écouter le podcast de ${babble.user.username} sur footfoot`"
                            :quote="
                              babble.title
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
                            url="https://www.footfoot.co/mypage/podcast"
                            :title="
                              babble.title
                                ? babble.title
                                : babble.meta
                                ? babble.meta
                                : babble.babble
                            "
                            :description="`Viens écouter le podcast de ${babble.user.username} sur footfoot`"
                            :quote="
                              babble.title
                                ? babble.title
                                : babble.meta
                                ? babble.meta
                                : babble.babble
                            "
                            hashtags="footfoot,football,pronos,news"
                            twitter-user="InsidersFoot"
                          >
                            <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                          </ShareNetwork>
                          <ShareNetwork
                            network="whatsapp"
                            url="https://www.footfoot.co/mypage/podcast"
                            :title="
                              babble.title
                                ? babble.title
                                : babble.meta
                                ? babble.meta
                                : babble.babble
                            "
                            :description="`Viens écouter le podcast de ${babble.user.username} sur footfoot`"
                            :quote="
                              babble.title
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
                              `https://www.footfoot.co/mypage/podcast`
                            "
                            type="button"
                          >
                            <i class="fa fas fa-copy"></i
                          ></a>
                        </div>
                        <div v-else-if="babble.babble">
                          <ShareNetwork
                            network="facebook"
                            :url="`https://www.footfoot.co/news/babble/${babble._id}`"
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
                            :url="`https://www.footfoot.co/news/babble/${babble._id}`"
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
                            :url="`https://www.footfoot.co/news/babble/${babble._id}`"
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
                            :url="`https://www.footfoot.co/news/babble/${babble._id}`"
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
                            <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                          </ShareNetwork>
                          <ShareNetwork
                            network="whatsapp"
                            :url="`https://www.footfoot.co/news/babble/${babble._id}`"
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
                              `https://www.footfoot.co/news/babble/${babble._id}`
                            "
                            type="button"
                          >
                            <i class="fa fas fa-copy"></i
                          ></a>
                        </div>
                      </div>
                      <div class="add-team-and-like">
                        <img
                          type="button"
                          @click="addTeam(babble)"
                          v-if="
                            $auth.user &&
                            $auth.user.username &&
                            $auth.user.role === 'admin'
                          "
                          class="plus-img invertOk pointer"
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
                          type="button"
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
                  v-if="babblesTodisplay[0] === 'empty'"
                  class="babbles-box box babble-container no-babble"
                >
                  <div class="content-no-bet" v-if="filterBy === 'all'">
                    {{
                      langSelected == "EN"
                        ? "share a news"
                        : "partage une info, un article !"
                    }}
                    <br />
                    <nuxt-link
                      v-if="!mobile"
                      class="buttonContest desktopOnly"
                      to="/publish"
                    >
                      <button class="button is-primary">
                        {{
                          langSelected == "EN"
                            ? "share a news"
                            : "partage une info"
                        }}
                      </button>
                    </nuxt-link>
                    <nuxt-link class="buttonContest mobileOnly" to="/publishm">
                      <button class="button is-primary">
                        {{
                          langSelected == "EN"
                            ? "share a news"
                            : "partage une info"
                        }}
                      </button>
                    </nuxt-link>
                  </div>
                  <p v-if="filterBy === 'videos'">...</p>
                  <p v-if="filterBy === 'podcast'">...</p>

                  <div v-if="filterBy === 'clap'" class="content-no-bet">
                    {{
                      langSelected == "EN"
                        ? "your favorite news"
                        : "retrouve ici tes articles préférés !"
                    }}
                    <span v-if="$auth && $auth.user && $auth.user._id"></span>
                    <button v-else class="button is-large buttonBet">
                      <nuxt-link to="/signup"
                        ><strong class="is-white">{{
                          langSelected == "EN" ? "register" : "inscription"
                        }}</strong></nuxt-link
                      >
                    </button>
                  </div>
                </div>
              </div>

              <div v-else-if="filterBy === 'forum'">
                <div v-if="forums[0] != 'empty'">
                  <div
                    v-for="(forum, index) in forums"
                    :key="index"
                    class="forumBox box"
                    v-observe-visibility="
                      index === forums.length - 8
                        ? loadMoreBabble
                        : index === forums.length - 1
                        ? loadMoreBabble
                        : false
                    "
                  >
                    <article v-if="forum.user" class="media">
                      <div class="media-content">
                        <div class="content">
                          <div v-if="forum.user" class="tweet-meta">
                            <strong class="usernameStong">
                              <nuxt-link
                                :to="'/dashboard/' + forum.user._id"
                                class
                                >{{ forum.user.username }}</nuxt-link
                              >
                              <span
                                v-if="forum.user.role === 'bot'"
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
                              <small
                                class="media-right has-text-grey-light"
                              ></small>
                              &nbsp

                              <button
                                v-if="
                                  $auth.user &&
                                  $auth.user.username &&
                                  ($auth.user.role === 'admin' ||
                                    $auth.user.level === 'champions league' ||
                                    $auth.user._id === forum.user._id)
                                "
                                type="button"
                                @click="eraseforum(forum)"
                                class="delete deletebabble"
                              ></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                    <h1 class="forumTitleH1">
                      <figure v-if="forum.team && forum.team.length > 0">
                        <img
                          loading="lazy"
                          class
                          :src="forum.team[0].teamImg"
                          alt="team logo"
                          :class="{
                            invertOk:
                              forum.team[0] && forum.team[0].name
                                ? forum.team[0].name
                                    .toUpperCase()
                                    .includes('JUVE')
                                : false,
                          }"
                        />
                      </figure>
                      <figure v-else-if="forum.tags && forum.tags.length > 0">
                        <img
                          loading="lazy"
                          v-if="forum.tags && forum.tags[0] == 'match'"
                          class
                          src="~assets/images/ballon-bleu.png"
                          alt="match"
                        />
                        <img
                          v-else-if="forum.tags && forum.tags[0] == 'interview'"
                          class
                          src="~assets/images/microphone.png"
                          alt="interview"
                        />
                        <img
                          v-else
                          class="invertOk"
                          src="~assets/images/question-mark-9.png"
                          alt="question"
                        />
                      </figure>
                      <figure v-else>
                        <img
                          class="invertOk"
                          src="~assets/images/question-mark-9.png"
                          alt="question"
                        />
                      </figure>
                      <nuxt-link
                        :to="
                          '/forum/' +
                          forum._id +
                          '/' +
                          forum.title
                            .replace(' ?', '')
                            .split(' ')
                            .join('-')
                            .replace(/\s/g, '')
                        "
                        class="forumTitle"
                      >
                        <strong>{{ forum.title }}</strong>
                      </nuxt-link>
                    </h1>

                    <nav class="media-right foOt navForum">
                      <div class="level-left sociaSh has-text-grey-light">
                        <div>
                          <ShareNetwork
                            network="facebook"
                            :url="
                              'https://www.footfoot.co/forum/' +
                              forum._id +
                              '/' +
                              forum.title
                                .replace(' ?', '')
                                .split(' ')
                                .join('-')
                                .replace(/\s/g, '')
                            "
                            :title="forum.title"
                            :description="forum.title"
                            :quote="forum.title"
                            hashtags="contest,football,pronos,news"
                            twitter-user="InsidersFoot"
                          >
                            <i class="fa fa-facebook">&nbsp &nbsp</i>
                          </ShareNetwork>
                          <ShareNetwork
                            network="twitter"
                            :url="
                              'https://www.footfoot.co/forum/' +
                              forum._id +
                              '/' +
                              forum.title
                                .replace(' ?', '')
                                .split(' ')
                                .join('-')
                                .replace(/\s/g, '')
                            "
                            :title="forum.title"
                            :description="forum.title"
                            :quote="forum.title"
                            hashtags="contest,football,pronos,news"
                            twitter-user="InsidersFoot"
                          >
                            <i class="fa fa-twitter">&nbsp &nbsp</i>
                          </ShareNetwork>

                          <ShareNetwork
                            network="sms"
                            class="mobileOnly"
                            :url="
                              'https://www.footfoot.co/forum/' +
                              forum._id +
                              '/' +
                              forum.title
                                .replace(' ?', '')
                                .split(' ')
                                .join('-')
                                .replace(/\s/g, '')
                            "
                            :title="forum.title"
                            :description="forum.title"
                            :quote="forum.title"
                            hashtags="contest,football,pronos,news"
                            twitter-user="InsidersFoot"
                          >
                            <i class="far fa-comment-dots">&nbsp &nbsp</i>
                          </ShareNetwork>

                          <ShareNetwork
                            network="messenger"
                            class="mobileOnly"
                            :url="
                              'https://www.footfoot.co/forum/' +
                              forum._id +
                              '/' +
                              forum.title
                                .replace(' ?', '')
                                .split(' ')
                                .join('-')
                                .replace(/\s/g, '')
                            "
                            :title="forum.title"
                            :description="forum.title"
                            :quote="forum.title"
                            hashtags="contest,football,pronos,news"
                            twitter-user="InsidersFoot"
                          >
                            <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                          </ShareNetwork>
                          <ShareNetwork
                            network="whatsapp"
                            :url="
                              'https://www.footfoot.co/forum/' +
                              forum._id +
                              '/' +
                              forum.title
                                .replace(' ?', '')
                                .split(' ')
                                .join('-')
                                .replace(/\s/g, '')
                            "
                            :title="forum.title"
                            :description="forum.title"
                            :quote="forum.title"
                            hashtags="contest,football,pronos,news"
                            twitter-user="InsidersFoot"
                          >
                            <i class="fa fa-whatsapp">&nbsp &nbsp</i>
                          </ShareNetwork>
                          <a
                            class="pointer"
                            v-clipboard:success="handleSuccess"
                            v-clipboard="
                              'https://www.footfoot.co/forum/' +
                              forum._id +
                              '/' +
                              forum.title
                                .replace(' ?', '')
                                .split(' ')
                                .join('-')
                                .replace(/\s/g, '')
                            "
                            type="button"
                          >
                            <i class="fa fas fa-copy"></i
                          ></a>
                        </div>
                      </div>
                      <div class="replyBabble level-right replyForum">
                        <nuxt-link
                          :to="
                            '/forum/' +
                            forum._id +
                            '/' +
                            forum.title
                              .replace(' ?', '')
                              .split(' ')
                              .join('-')
                              .replace(/\s/g, '')
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
                          <small>{{
                            forum.forumReply && forum.forumReply.length > 0
                              ? forum.forumReply.length
                              : ""
                          }}</small>
                        </nuxt-link>
                      </div>
                    </nav>
                  </div>
                </div>

                <div
                  v-if="forums[0] === 'empty'"
                  class="box babble-container no-babble"
                >
                  <p>lance un débat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="addTeamBabble">
        <client-only>
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
                <b-field v-if="filterBy != 'podcast'" label="Joueur">
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
        </client-only>
      </div>
      <b-modal class="selectClubModal" :active.sync="isAskForum">
        <client-only>
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head chartIcon titleVideo">
              {{
                langSelected === "EN"
                  ? "A question ?"
                  : "Une question, un débat ?"
              }}
            </header>
            <section class="modal-card-body">
              <b-field>
                <b-input
                  placeholder="Messi ou Ronaldo ?"
                  v-model="textForum"
                  class="publishText"
                  type="textarea"
                ></b-input>
              </b-field>
              <div class="media">
                <multiselect
                  :custom-label="customLabel"
                  v-model="teamForum"
                  placeholder="Celà concerne une équipe ?"
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
              </div>
            </section>
            <footer class="modal-card-foot">
              <button class="button" type="button" @click="closeisAskForum">
                X
              </button>
              <button
                @click="sendAskForum"
                id="babble-submit"
                class="button is-outlined is-success btn"
              >
                Envoyer
              </button>
            </footer>
          </div>
        </client-only>
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
  </div>
</template>

<script>
import {
  sendBabbleReply,
  askForum,
  assignTeam,
  assignPodcastTeam,
  deleteABbbles,
  deleteAforum,
  postLike,
  postTruepushnotif,
} from "@/server/api";
import moment from "moment";

import Multiselect from "vue-multiselect";
import { searchTeam, searchAll } from "@/server/apiSearch";
import { followInsider, unfollowInsider } from "@/server/apiDashboard";

export default {
  components: {
    userAbo: () => import("@/components/userpage/userAbo"),
    displayVideo: () => import("@/components/modal/displayVideo"),
    Multiselect,
    MyPublish: () => import("@/components/userpage/MyPublish"),
    UserInsights: () => import("@/components/userpage/UserInsights"),
    UpcomingMatchListContest: () =>
      import("@/components/contest/ContestMain/UpcomingMatchListContest"),
    resultatModal: () => import("@/components/modal/resultatModal"),
    stadiumModal: () => import("@/components/modal/stadiumModal"),
  },
  data() {
    return {
      lineUp: "",
      resultatModal: false,
      resultat: "",
      stadium: "",
      stadiumModal: false,
      mobile: this.$mobileDetect.mobile(),
      loading: false,
      isLoading: false,
      optionsInsider: [],
      nameInsider: "",
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
      isAskForum: false,
      textForum: "",
      teamForum: "",
      swiperOptions: {
        threshold: 10,
        followFinger: false,
        loop: true,
        slidesPerView: "auto",
        loopedSlides: 1,
        centeredSlides: true,
        touchEventsTarget: "container",
        longSwipes: true,
        shortSwipes: true,
        iOSEdgeSwipethreshold: 10,
        spaceBetween: 10,
      },
      swiperOk: false,
      optionPlayers: [],
      playersToAssign: [],
      babbleClick: "",
      upcomingMatchList: "",
      babblesTodisplay: "",
      refreshActive: false,
    };
  },
  props: {
    babbles: "",
    babblesFavoris: "",
    babblesPodcast: "",
    forums: "",
    filterBy: "",
    abonnementList: "",
  },
  mounted() {
    if (process.client) {
      this.swiperOk = true;
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
      setTimeout(() => {
        this.swiperOk = true;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      }, 100);
    }
  },

  watch: {
    babblesPodcast: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.filterBy == "podcast") {
          this.babblesTodisplay = this.babblesPodcast;
          this.swiperOptions.threshold = 10;
          this.swiperOptions.iOSEdgeSwipeThreshold = 10;
          this.swiperOptions.shortSwipes = true;
        }
      },
    },
    filterBy: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.filterBy == "all") {
          this.babblesTodisplay = this.babbles;
        } else if (this.filterBy == "podcast") {
          this.babblesTodisplay = this.babblesPodcast;
        } else if (this.filterBy == "clap") {
          this.babblesTodisplay = this.babblesFavoris;
        } else if (this.filterBy == "forum") {
          this.babblesTodisplay = "";
        }
        if (this.filterBy == "all" && this.babbleLanding) {
          this.loadMore = this.babbleLanding.page;
        }
        this.swiperOk = true;
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      },
    },
    babbles: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.filterBy == "all") {
          this.babblesTodisplay = this.babbles;
          this.swiperOptions.threshold = 10;
          this.swiperOptions.iOSEdgeSwipeThreshold = 10;
          this.swiperOptions.shortSwipes = true;
        }
      },
    },
    babblesFavoris: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.filterBy == "clap") {
          this.babblesTodisplay = this.babblesFavoris;
          this.swiperOptions.threshold = 10;
          this.swiperOptions.iOSEdgeSwipeThreshold = 10;
          this.swiperOptions.shortSwipes = true;
        }
      },
    },

    forum: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.filterBy == "forum") {
          this.babblesTodisplay = "";
          this.swiperOptions.threshold = 10;
          this.swiperOptions.iOSEdgeSwipeThreshold = 10;
          this.swiperOptions.shortSwipes = true;
        }
      },
    },

    firstBet: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (
          this.$auth.user &&
          this.$auth.user._id &&
          this.firstBet &&
          this.firstBet.scope
        ) {
          this.swiperOptions.threshold = 10;
          this.swiperOptions.iOSEdgeSwipeThreshold = 10;
          this.swiperOptions.shortSwipes = true;
          this.upcomingMatchList = this.firstBet.scope;
        } else {
          this.upcomingMatchList = [];
          this.swiperOptions.threshold = 10;
          this.swiperOptions.iOSEdgeSwipeThreshold = 10;
          this.swiperOptions.shortSwipes = true;
        }
      },
    },

    $route() {
      if (this.babbles && this.babbles.length > 1) {
        let babbleLandingtoCommit = {
          page: 1,
          babbles:
            this.babbles.length < 11 ? this.babbles : this.babbles.slice(0, 10),
        };
        this.$store.commit("datapage/babbleLanding", babbleLandingtoCommit);
      }
    },
  },
  beforeDestroy() {
    if (this.babbles && this.babbles.length > 1) {
      let babbleLandingtoCommit = {
        page: 1,
        babbles:
          this.babbles.length < 11 ? this.babbles : this.babbles.slice(0, 10),
      };
      this.$store.commit("datapage/babbleLanding", babbleLandingtoCommit);
    }
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
    babbleLanding() {
      return this.$store.state.datapage.babbleLanding;
    },
    firstBet() {
      return this.$store.state.var.firstBet;
    },
  },

  methods: {
    handleSuccess() {
      this.$buefy.dialog.alert("Le lien a été copié! Plus qu'à le partager 😋");
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
    postPushNotif(babble) {
      let query = {};
      query.title = babble.title.slice(0, 55);
      query.message = babble.babble.slice(0, 139);
      query.link = `https://www.footfoot.co/news/babble/${babble._id}`;
      query.icon = "https://www.footfoot.co/icon.png";
      if (babble.babbleImg) {
        query.image = babble.babbleImg;
      }
      postTruepushnotif(query).then((resp) => {
        if (resp.status == "SUCCESS") {
          this.$buefy.toast.open({
            message: resp.message,
            type: "is-success",
          });
        } else {
          this.$buefy.toast.open({
            message: resp.message,
            type: "is-danger",
          });
        }
      });
    },
    openBabbelTodisplay(event) {
      this.$store.commit("var/setbabbaleTodisplay", event);
    },
    scrollTo: function () {
      if (
        this.$store.state.var.mypage &&
        this.$store.state.var.mypage.babbleClick
      ) {
        setTimeout(() => {
          let content = this.$el.querySelector(
            this.$store.state.var.mypage.babbleClick
          );

          if (content) {
            content.scrollIntoView();
          }
        }, 1);
      }
    },
    setBabbleClick(event) {
      this.babbleClick = "#" + event;
    },

    asyncFindInsider(query) {
      this.isLoading = true;
      this.optionsInsider = [];
      let optionInsider = {};

      if (query[1]) {
        searchAll(query.toLowerCase()).then((resp) => {
          this.isLoading = false;
          if (resp.users.length > 0) {
            optionInsider = resp.users.map((u) => {
              return {
                searchName: u.username,
                shortName: u._id,
                type: "Insider",
                img: u.picProfile ? u.picProfile : u.initalPicture,
              };
            });
            this.optionsInsider = optionInsider;
          }
        });
      } else {
        this.isLoading = false;
        this.optionsInsider = [];
      }
    },
    closeMultiInsider() {
      this.isLoading = false;
      this.optionsInsider = [];
    },
    customLabelInsider({ searchName }) {
      if (searchName) {
        return `${searchName}`;
      } else {
        return [];
      }
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
    addTeam(event) {
      this.addTeamBabble = event;

      if (event.players.length > 0) {
        this.playersToAssign = event.players.map((p) => {
          return {
            searchName: p.display_name,
            shortName: p._id,
            type: "Joueurs",
            img: p.picture,
          };
        });
      } else {
        this.playersToAssign = [];
      }

      if (event.teamLink.length > 0) {
        this.attachTeam = event.teamLink.map((t) => {
          return {
            shortName: t.shortName,
            name: t.shortName,
            _id: t._id,
            img: t.teamImg,
          };
        });
      } else {
        this.attachTeam = [];
      }
      this.addTeamBabbleModal = true;
    },
    customLabelPlayer({ searchName, shortName, name, type }) {
      if (searchName) {
        return `${searchName}`;
      } else {
        return [];
      }
    },
    customLabel({ shortName, name }) {
      if (shortName) {
        return `${name} - ${shortName}`;
      } else {
        return [];
      }
    },
    slideNextTransitionStart() {
      if (this.filterBy == "clap") {
        this.$emit("sort", "pronos");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      } else if (this.filterBy == "podcast") {
        this.$emit("sort", "clap");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      } else if (this.filterBy == "abonnement") {
        //this.$emit("forum");
        this.$emit("podCast");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      } else if (this.filterBy == "forum") {
        this.$emit("podCast");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      } else if (this.filterBy == "pronos") {
        this.$emit("sort", "all");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      } else {
        this.$emit("abonnement");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      }
    },

    slidePrevTransitionStart() {
      if (this.filterBy == "clap") {
        this.$emit("podCast");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      } else if (this.filterBy == "podcast") {
        //	this.$emit("forum");
        this.$emit("abonnement");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      } else if (this.filterBy == "abonnement") {
        this.$emit("sort", "all");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      } else if (this.filterBy == "forum") {
        this.$emit("abonnement");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      } else if (this.filterBy == "pronos") {
        this.$emit("sort", "clap");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      } else {
        this.$emit("sort", "pronos");
        this.swiperOptions.threshold = 10;
        this.swiperOptions.iOSEdgeSwipeThreshold = 10;
        this.swiperOptions.shortSwipes = true;
      }
    },
    onReady() {
      this.swiperOk = true;
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
    },
    sendAskForum() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        let forum = {};
        forum.title = this.textForum;
        forum.user = this.$store.state.auth.user._id;
        forum.team = this.teamForum ? this.teamForum.map((t) => t._id) : [];
        forum.tags = "question";
        askForum(forum).then((resp) => {
          this.$emit("forum");
          this.isAskForum = false;
        });
      } else {
        this.$router.push("/signup");
      }
    },
    sortBabbles(filterBy) {
      if (filterBy == "videos") {
        this.$router.push(`/mypage/videos`);
      } else if (filterBy == "clap") {
        //this.$router.push(`/mypage/clap`);
        this.$emit("sort", "clap");
      } else if (filterBy == "pronos") {
        //this.$router.push(`/mypage/clap`);
        this.$emit("sort", "pronos");
      } else {
        this.$emit("sort", "all");
        //this.$router.push(`/mypage/all`);
      }
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
    },
    abonnement() {
      this.$emit("abonnement");
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
    },
    podCasts() {
      this.$emit("podCast");
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
      //this.$router.push(`/mypage/podcast`);
    },
    forum() {
      this.$emit("forum");
      this.swiperOptions.threshold = 10;
      this.swiperOptions.iOSEdgeSwipeThreshold = 10;
      this.swiperOptions.shortSwipes = true;
      //this.$router.push(`/mypage/forum`);
    },
    openisAskForum() {
      this.teamForum = "";
      this.textForum = "";
      this.isAskForum = true;
    },
    closeisAskForum() {
      this.isAskForum = false;
    },
    follow(event) {
      followInsider(event).then((resp) => {
        this.$auth.fetchUser();
      });
    },
    unfollow(event) {
      unfollowInsider(event).then((resp) => {
        this.$auth.fetchUser();
      });
    },
    loadMoreBabble(isVisible) {
      if (isVisible) {
        this.swiperOk = true;
        if (this.filterBy != "abonnement") {
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

    ligue(ligue) {
      this.$store.commit("var/setNewValue", ligue);
      setTimeout(() => {
        this.$router.push("/leagues");
      }, 10);
    },
    closeMulti() {
      this.loading = false;
      this.options = [];
    },

    saveTeam() {
      let teamLink =
        this.attachTeam.length > 0 ? this.attachTeam.map((t) => t._id) : [];
      let players =
        this.playersToAssign.length > 0
          ? this.playersToAssign.map((p) => p.shortName)
          : [];
      if (this.filterBy == "podcast") {
        assignPodcastTeam(this.addTeamBabble._id, { teamsId: teamLink }).then(
          (data) => {
            this.$emit("changeBabbles");
            this.addTeamBabbleModal = false;
          }
        );
      } else {
        assignTeam(this.addTeamBabble._id, players, teamLink).then((data) => {
          this.$emit("changeBabbles");
          this.addTeamBabbleModal = false;
        });
      }
    },

    refresh(event) {
      if (!this.$nuxt.isOffline) {
        if (event) {
          location.reload();
        } else {
          this.refreshActive = true;
          if (this.filterBy === "podcast") {
            this.$emit("podCast");
          } else if (this.filterBy === "forum") {
            this.$emit("forum");
          } else if (this.filterBy === "all") {
            this.$emit("refresh");
          } else {
            this.$emit("sort", this.filterBy);
          }
          setTimeout(() => {
            this.refreshActive = false;
          }, 1000);
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
    eraseforum(forum) {
      if (
        this.$store.state.auth.user &&
        (this.$store.state.auth.user.level === "champions league" ||
          this.$store.state.auth.user.role === "admin" ||
          (this.$store.state.auth.user &&
            this.$store.state.auth.user._id === forum.user._id))
      ) {
        deleteAforum(forum._id).then(() => {
          this.$emit("changeBabbles");
        });
      } else {
        this.$buefy.dialog.confirm({
          message: "Tu veux te désabonner de cet insider ?",
          confirmText: "Ok",
          type: "is-success",
          onConfirm: () =>
            unfollowInsider(forum.user._id).then((resp) => {
              this.$emit("changeBabbles");
            }),
        });
      }
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
      } else {
        this.$buefy.dialog.confirm({
          message: "Tu veux te désabonner de cet insider ?",
          confirmText: "Ok",
          type: "is-success",
          onConfirm: () =>
            unfollowInsider(babble.user._id).then((resp) => {
              this.$emit("changeBabbles");
            }),
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

    myPronos() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        this.$router.push(`/mypage/pronos`);
      } else {
        this.$router.push(`/signup`);
      }
    },
    myResults() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        this.$router.push(`/mypage/resultats`);
      } else {
        this.$router.push(`/signup`);
      }
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
.formNavWrap {
  width: 100%;
}
.formNav {
  width: 100%;
}
.assignToteam {
  display: flex !important;
  flex-direction: column !important;
}
.navbar-item > span {
  align-items: center;
  display: flex;
}
.navbar-item {
  border-bottom: none;
}
.content-no-bet {
  display: flex;
  flex-direction: column;
}
.content-no-bet > p {
  font-size: 1.2rem;
}
.buttonContest {
  margin: auto;
  margin-top: 5px;
}
.forumBox > .tweet {
  padding: 0 !important;
  margin-bottom: 10px;
}
.forumBox > .tweet > .media-content {
  padding: 0 !important;
}
.no-babble {
  min-height: 25vh;
}
.tag {
  margin-right: 0.5rem;
  cursor: pointer;
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
  height: 24px;
}
.fa-bell {
  margin: auto;
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
.smallImg {
  max-height: 10rem;
  max-width: 10rem;
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
  display: flex;
  justify-content: space-between;
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
  font-size: 1rem !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #eef1f7 !important;
  background-color: #ff7d00 !important;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 0.9rem !important;
  margin: auto;
  display: flex;
  margin-top: 10px;
}

.buttonBet:focus,
.buttonBet:hover {
  color: #ff7d00 !important;
  box-shadow: 0 0 0 0.125em #eef1f7 !important;
  border-color: #ff7d00 !important;
  background-color: #eef1f7 !important;
}
.is-white {
  color: #fff;
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

.replyForumButton {
  font-size: 0.9rem !important;
}

.replyForum {
  margin-bottom: 0px !important;
}

.forumTitleH1 {
  display: flex;
}

.forumTitleH1 > figure {
  min-width: 10% !important;
  width: 10%;
  display: flex;
  justify-content: center;
  margin: auto;
  margin-left: 0px;
  margin-right: 0px;
}

.forumTitleH1 > figure > img {
  width: auto;
  height: 40px;
  margin-right: 1rem;
}

.forumTitle > strong {
  width: 90% !important;
  color: #192b41;
  font-weight: 500;
  word-break: break-word;
  font-size: 1.8rem;
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
.is-20 {
  cursor: pointer;
  width: auto;
  height: 20px;
  padding-left: 10px;
}
.itemMenu {
  display: flex;
  margin: auto;
  cursor: pointer;
}

.babMenu {
  display: flex;
  padding: 5px;
  margin: auto;
  font-weight: bold;
  color: #192b41 !important;
}

.itemMenu > p {
  padding-left: 0.5rem;
}

.mobileOnly {
  display: none !important;
}

.usernameStong .icon {
  width: 20px;
  padding: 1px;
  cursor: pointer;
  align-self: center;
}

.usernameStong a {
  margin-right: 5px;
}
.widthfull {
  width: 100%;
  min-height: 55px;
}

@media screen and (max-width: 768px) {
  .add-team-and-like > img {
    height: 19px;
  }
  .widthfull {
    min-height: 5px;
  }
  .navbar.is-dark {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
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

  .babMenu {
    margin: auto;
    padding: 0.5rem;
    font-size: 1.3rem !important;
    color: #c9c9c9;
    font-weight: bold;
    align-items: center;
  }

  .forumTitleH1 > figure {
    min-width: 15% !important;
    width: 15%;
  }

  .forumTitleH1 > figure > img {
    height: 45px;
    margin: 0.5rem -0.5rem 0.5rem 0.5rem;
  }

  .forumTitle {
    margin-bottom: 0rem;
    padding: 1rem;
  }

  .forumTitle > strong {
    font-size: 1.2rem;
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