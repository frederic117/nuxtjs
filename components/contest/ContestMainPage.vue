<template>
  <div v-if="loading">
    <b-loading
      :is-full-page="false"
      :active.sync="loading"
      :canCancel="false"
    ></b-loading>
  </div>
  <div v-else>
    <!--  <publicheader-unconnect></publicheader-unconnect>-->
    <section
      class="section"
      v-if="contest.contest && $auth.user && $auth.user._id"
    >
      <div>
        <div class="column is-6" id="ActionCard">
          <div id class="box">
            <div class="card-content">
              <div class="media" id="stockInfo">
                <div class="media-content">
                  <div class="team-banner">
                    <div class="sock-info">
                      <figure class="contestImg">
                        <nuxt-link :to="'/contest/rules/' + contest._id">
                          <img
                            v-if="masterContest.image != ''"
                            class="default-logo-contest"
                            :src="masterContest.image"
                            alt="contest"
                          />
                          <img
                            v-else
                            class="default-logo-contest"
                            src="~assets/images/logo-contest.png"
                            alt="contest"
                          />
                        </nuxt-link>
                      </figure>
                      <div class="subtitleIsin is-6">
                        <nuxt-link
                          :to="'/contest/leaderboard/' + masterContest._id"
                        >
                          <h1 class="longNameTitle title is-5">
                            <strong class="has-text-contest">{{
                              masterContest.name
                            }}</strong>
                          </h1>
                        </nuxt-link>
                        <div>
                          <h2 class="contestNamePart">
                            <strong
                              v-if="masterContest.isSpecialEvent === false"
                              >Round {{ contest.name }}&nbsp</strong
                            >
                            <h1 @click="goToRules" class="is-6 pointer">
                              <a class>{{
                                langSelected === "EN" ? "(rules)" : "(règles)"
                              }}</a>
                            </h1>
                          </h2>
                          <div>
                            <h1 class="longNameTitle title">
                              <!-- Fin: -->
                              <div
                                v-if="contest.status === true"
                                class="timer countdown"
                              >
                                <div
                                  class="timer time-unite created"
                                  v-show="years"
                                >
                                  <strong
                                    class="has-text-yellow time-unite-value"
                                    >{{ years }}</strong
                                  >&nbsp
                                  <strong
                                    class="has-text-yellow time-unite-title"
                                    >Y</strong
                                  >
                                </div>
                                <div
                                  class="timer time-unite created"
                                  v-show="months"
                                >
                                  &nbsp
                                  <strong
                                    class="has-text-yellow time-unite-value"
                                    >{{ months }}</strong
                                  >&nbsp
                                  <strong
                                    class="has-text-yellow time-unite-title"
                                    >M</strong
                                  >
                                </div>
                                <div
                                  class="timer time-unite created"
                                  v-show="days"
                                >
                                  &nbsp
                                  <strong
                                    class="has-text-yellow time-unite-value"
                                    >{{ days }}</strong
                                  >&nbsp
                                  <strong
                                    class="has-text-yellow time-unite-title"
                                  >
                                    {{ langSelected === "EN" ? "D" : "J" }}
                                  </strong>
                                </div>
                                <div class="timer time-unite created">
                                  &nbsp
                                  <strong
                                    class="has-text-yellow time-unite-value"
                                    >{{ hours }}</strong
                                  >&nbsp
                                  <strong
                                    class="has-text-yellow time-unite-title"
                                    >h</strong
                                  >
                                </div>
                                <div class="timer time-unite created">
                                  &nbsp
                                  <strong
                                    class="has-text-yellow time-unite-value"
                                    >{{ minutes }}</strong
                                  >&nbsp
                                  <strong
                                    class="has-text-yellow time-unite-title"
                                    >min</strong
                                  >
                                </div>
                              </div>
                            </h1>
                          </div>
                          <div
                            v-if="contest.isRegistrationOpen === true"
                            class="mobile loggiin"
                          >
                            <client-only>
                              <b-dropdown :triggers="['hover']">
                                <template #trigger>
                                  <button
                                    class="
                                      pointer
                                      button
                                      is-large
                                      buttonLoginInvit
                                    "
                                    slot="trigger"
                                  >
                                    <span>{{
                                      langSelected === "EN"
                                        ? "invite friends"
                                        : "invite tes amis"
                                    }}</span>
                                  </button>
                                </template>

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
                              </b-dropdown>
                            </client-only>
                          </div>
                          <div v-else class="mobile loggiin loginClose">
                            <a
                              class="
                                pointer
                                button
                                is-large
                                buttonLoginInvitClose
                              "
                              type="button"
                              >{{
                                langSelected === "EN"
                                  ? "Round finished"
                                  : "Round terminé"
                              }}</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="centralHeaderContest">
                      <span
                        v-if="
                          (contest.betValue &&
                            contest.betValue * contest.participants.length >
                              0) ||
                          masterContest.isPublic
                        "
                        class="mobile"
                      >
                        <img
                          v-if="masterContest.image != ''"
                          class="is-32x32 mobile default-logo-contest"
                          :src="masterContest.image"
                          alt="contest"
                        />
                        <img
                          loading="lazy"
                          v-else
                          class="is-32x32 mobile default-logo-contest"
                          src="~assets/images/logo-contest.png"
                          alt="contest"
                        />
                        <strong
                          @click="openRepartitiongain()"
                          class="
                            has-text-contest
                            pointsContest
                            mobileOnly
                            pointer
                          "
                        >
                          <img
                            class="cagnotteImg"
                            src="~assets/images/contestMainCagnotte.png"
                            alt="classement"
                          />
                          :&nbsp
                          <p v-if="masterContest.isSpecialEvent" class="">
                            500 &nbspF$
                          </p>
                          <p v-else-if="masterContest.isPublic" class="">
                            {{
                              (
                                10 +
                                Math.round(contest.participants.length * 0.3)
                              ).toLocaleString("fr")
                            }}&nbspF$
                          </p>
                          <p v-else class="">
                            {{
                              contest.betValue
                                ? (
                                    contest.betValue *
                                    contest.participants.length
                                  ).toLocaleString("fr")
                                : 0
                            }}&nbspF$
                          </p>
                        </strong>
                      </span>
                      <span v-else class="mobile">
                        <img
                          v-if="masterContest.image != ''"
                          class="is-32x32 mobile default-logo-contest"
                          :src="masterContest.image"
                          alt="contest"
                        />
                        <img
                          loading="lazy"
                          v-else
                          class="is-32x32 mobile"
                          src="~assets/images/logo-contest.png"
                          alt="contest"
                        />
                      </span>

                      <article class="userPerf desktop">
                        <img
                          @click="getUpcoming()"
                          loading="lazy"
                          class="is-32x32"
                          src="~assets/images/coupe.png"
                          alt="points"
                        />
                        <div @click="getUpcoming()">
                          <h1>
                            {{
                              langSelected === "EN" ? "my points" : "mes points"
                            }}
                          </h1>
                          <strong
                            class="has-text-contest"
                            v-if="availablePoints"
                            >{{
                              Number(
                                availablePoints.performancePoints.toFixed(2)
                              ).toLocaleString("fr")
                            }}
                            pts</strong
                          >
                        </div>

                        <img
                          @click="getResult()"
                          loading="lazy"
                          class="is-32x32 userPerfDeskMiddleImg"
                          src="~assets/images/contestMainReussite.png"
                          alt="reussite"
                        />
                        <div @click="getResult()" class="userPerfDeskMiddle">
                          <h1>
                            {{ langSelected === "EN" ? "success" : "réussite" }}
                          </h1>
                          <strong
                            >{{
                              userLeaderboard.ratioWon &&
                              Number(userLeaderboard.ratioWon) > 0
                                ? (
                                    Number(userLeaderboard.ratioWon) * 100
                                  ).toFixed(0)
                                : "-"
                            }}
                            %</strong
                          >
                        </div>
                        <img
                          @click="leaderBoard()"
                          class="is-32x32"
                          src="~assets/images/podium.png"
                          alt="classement"
                        />
                        <div @click="leaderBoard()">
                          <h1>
                            {{
                              langSelected === "EN" ? "ranking" : "classement"
                            }}
                          </h1>
                          <strong
                            >{{ userPosition }}/{{
                              contest.participants.length
                            }}</strong
                          >
                        </div>
                      </article>
                      <span
                        v-if="
                          (contest.betValue &&
                            contest.betValue * contest.participants.length >
                              0) ||
                          masterContest.isPublic
                        "
                        class="priceWrap pointer"
                        @click="openRepartitiongain()"
                      >
                        <strong class="has-text-contest pointsContest desktop">
                          <img
                            class="cagnotteImg"
                            src="~assets/images/contestMainCagnotte.png"
                            alt="classement"
                          />
                          :&nbsp
                          <p v-if="masterContest.isSpecialEvent" class="">
                            500 &nbspF$
                          </p>
                          <p v-else-if="masterContest.isPublic" class="">
                            {{
                              (
                                10 +
                                Math.round(contest.participants.length * 0.3)
                              ).toLocaleString("fr")
                            }}&nbspF$
                          </p>
                          <p class="" v-else>
                            {{
                              (
                                contest.betValue * contest.participants.length
                              ).toLocaleString("fr")
                            }}&nbspF$
                          </p>
                        </strong>
                      </span>
                    </div>
                    <article class="mobile userPerfMobile">
                      <div
                        @click="getUpcoming()"
                        class="mobileUserContestPoints"
                      >
                        <strong class="has-text-contest" v-if="availablePoints"
                          >{{
                            Number(
                              availablePoints.performancePoints.toFixed(2)
                            ).toLocaleString("fr")
                          }}
                          pts</strong
                        >
                        &nbsp &nbsp
                        <h1>
                          <img
                            loading="lazy"
                            class="is-32x32"
                            src="~assets/images/coupe.png"
                            alt="points"
                          />
                        </h1>
                      </div>

                      <div
                        @click="getResult()"
                        class="mobileUserContestPoints imgClass"
                      >
                        <strong
                          >{{
                            userLeaderboard.ratioWon &&
                            Number(userLeaderboard.ratioWon) > 0
                              ? (
                                  Number(userLeaderboard.ratioWon) * 100
                                ).toFixed(0)
                              : "-"
                          }}
                          %</strong
                        >
                        &nbsp &nbsp
                        <h1>
                          <img
                            loading="lazy"
                            class="is-32x32"
                            src="~assets/images/contestMainReussite.png"
                            alt="reussite"
                          />
                        </h1>
                      </div>
                      <div
                        @click="leaderBoard()"
                        class="mobileUserContestPoints"
                      >
                        <strong
                          >{{ userPosition }}/{{
                            contest.participants.length
                          }}</strong
                        >
                        &nbsp &nbsp
                        <h1>
                          <img
                            loading="lazy"
                            class="is-32x32"
                            src="~assets/images/podium.png"
                            alt="classement"
                          />
                        </h1>
                      </div>
                    </article>
                    <div
                      v-if="contest.isRegistrationOpen === true"
                      class="desktop loggiiin"
                    >
                      <b-dropdown :triggers="['hover']">
                        <template #trigger>
                          <button
                            class="pointer button is-large buttonLoginInvit"
                            slot="trigger"
                          >
                            <span>{{
                              langSelected === "EN"
                                ? "invite friends"
                                : "invite tes amis"
                            }}</span>
                          </button>
                        </template>

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
                            <i class="fas fa-copy"></i>&nbsp
                            {{
                              langSelected === "EN"
                                ? "Sharing link"
                                : "Lien de partage"
                            }}</a
                          >
                        </b-dropdown-item>
                      </b-dropdown>
                    </div>
                    <div v-else class="desktop endWrapButton loggiin">
                      <a
                        class="pointer button is-large buttonLoginInvitClose"
                        type="button"
                        >{{
                          langSelected === "EN"
                            ? "Round finished"
                            : "Round terminé"
                        }}</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="primordial">
        <div class="sct1">
          <div class="sci">
            <side-current-insight-contest
              v-if="!mobile"
              @iWantBet="iWantBet($event)"
              @ligue="ligue($event)"
              :openProno="openProno"
              @changeWatchlist="updateWatchList($event)"
            ></side-current-insight-contest>
          </div>
          <div class="babblesField column is-6">
            <div class>
              <nav v-if="$auth.user && $auth.user._id" class="sci">
                <div class="box babblesMenu">
                  <a
                    @click="getUpcoming()"
                    :class="{ 'is-active': activeItem === 'upcoming' }"
                    class="navbar-item is-tab babMenu"
                  >
                    <img
                      loading="lazy"
                      class="is-32x32 navbar-itemImg"
                      src="~assets/images/ballon-contest.png"
                      alt="ballon-contest"
                    />
                  </a>
                  <a
                    @click="getResult()"
                    :class="{ 'is-active': activeItem === 'results' }"
                    class="navbar-item is-tab babMenu"
                  >
                    <img
                      loading="lazy"
                      class="is-32x32 navbar-itemImg"
                      src="~assets/images/contestMainReussite.png"
                      alt="contestMainReussite"
                    />
                  </a>

                  <a
                    @click="getPrivatePosts()"
                    :class="{
                      'is-active': activeItem === 'privatePosts',
                      'shake-vertical': numberMess > 0,
                    }"
                    class="navbar-item is-tab babMenu"
                  >
                    <img
                      loading="lazy"
                      class="is-32x32 navbar-itemImg"
                      src="~assets/images/chat.png"
                      alt="chat"
                    />
                    <!--<sup
											:class="{'countMess':numberMess>0,'shake-vertical':numberMess>0 }"
											:data-count="numberMess"
										></sup>-->
                  </a>
                  <a
                    @click="leaderBoard()"
                    :class="{ 'is-active': activeItem === 'leaderboard' }"
                    class="navbar-item is-tab babMenu"
                  >
                    <img
                      loading="lazy"
                      class="is-32x32 navbar-itemImg"
                      src="~assets/images/podium.png"
                      alt="podium"
                    />
                  </a>
                </div>
              </nav>
              <nav v-if="$auth.user && $auth.user._id" class="pronoNext navbar">
                <div class="box babblesMenu">
                  <a
                    @click="getUpcoming()"
                    :class="{ 'is-active': activeItem === 'upcoming' }"
                    class="navbar-item is-tab babMenu"
                  >
                    <img
                      loading="lazy"
                      class="is-32x32 navbar-itemImg"
                      src="~assets/images/ballon-contest.png"
                      alt="ballon-contest"
                    />
                  </a>
                  <a
                    @click="getResult()"
                    :class="{ 'is-active': activeItem === 'results' }"
                    class="navbar-item is-tab babMenu"
                  >
                    <img
                      loading="lazy"
                      class="is-32x32 navbar-itemImg"
                      src="~assets/images/contestMainReussite.png"
                      alt="contestMainReussite"
                    />
                  </a>
                  <a
                    @click="getPrivatePosts()"
                    :class="{
                      'is-active': activeItem === 'privatePosts',
                      'shake-vertical': numberMess > 0,
                    }"
                    class="navbar-item is-tab babMenu"
                  >
                    <img
                      loading="lazy"
                      class="is-32x32 navbar-itemImg"
                      src="~assets/images/chat.png"
                      alt="chat"
                    />
                  </a>
                  <a
                    @click="PronoNextMatch()"
                    :class="{ 'is-active': activeItem === 'prono' }"
                    class="navbar-item is-tab babMenu"
                  >
                    <img
                      loading="lazy"
                      class="is-32x32 navbar-itemImg"
                      src="~assets/images/chut.png"
                      alt="chut"
                    />
                  </a>
                  <a
                    @click="leaderBoard()"
                    :class="{ 'is-active': activeItem === 'leaderboard' }"
                    class="navbar-item is-tab babMenu"
                  >
                    <img
                      loading="lazy"
                      class="is-32x32 navbar-itemImg"
                      src="~assets/images/podium.png"
                      alt="podium"
                    />
                  </a>
                </div>
              </nav>
              <div v-if="activeItem === 'privatePosts'">
                <!--	<div v-if="issharingScreen">
									<screen-broadcast></screen-broadcast>
								</div>
								<div v-else>-->
                <div>
                  <b-loading
                    :is-full-page="true"
                    :active.sync="isLoading"
                    :canCancel="false"
                  ></b-loading>
                  <div class="box bg-light">
                    <div v-if="pdfToImage" class="displayUploadImage">
                      <button
                        type="button"
                        name="delete"
                        class="delete is-warning"
                        @click="removeImage"
                      ></button>
                      <client-only>
                        <pdf-pageload
                          id="imageToUpload"
                          @imgReady="transformToImg($event)"
                          class="pdfImage"
                          :pdfToLoad="pdfToImage"
                        ></pdf-pageload>
                      </client-only>
                    </div>
                    <div class="displayUploadImage" v-else-if="uploadImage">
                      <button
                        type="button"
                        name="delete"
                        class="delete is-warning"
                        @click="removeImage"
                      ></button>
                      <img
                        loading="lazy"
                        v-if="uploadImage.toLowerCase().includes('base64')"
                        :src="uploadImage"
                      />
                      <client-only v-else>
                        <pdf-pageload
                          id="imageToUpload"
                          @imgReady="transformToImg($event)"
                          class="pdfImage"
                          :pdfToLoad="uploadImage"
                        ></pdf-pageload>
                      </client-only>
                    </div>
                    <div v-if="uploadVideo">
                      <div class="displayUploadImage">
                        <button
                          type="button"
                          name="delete"
                          class="delete is-warning"
                          @click="removeVideo"
                        ></button>
                        <div
                          v-if="uploadVideo"
                          class="card-image imageChart videoBabble"
                        >
                          <div
                            v-if="uploadVideo.toLowerCase().includes('mp3')"
                            class="lecteur-audio-songs"
                          >
                            <vue-plyr>
                              <audio>
                                <source :src="uploadVideo" />
                                Your browser does not support the audio element.
                              </audio>
                            </vue-plyr>
                          </div>

                          <vue-plyr
                            v-if="
                              uploadVideo
                                .toLowerCase()
                                .includes('sporttube.com/embed')
                            "
                          >
                            <video>
                              <source
                                :src="
                                  uploadVideo.replace(
                                    'https://cc.sporttube.com/embed/',
                                    'https://vc.sporttube.com/video/' +
                                      moment()
                                        .format('YYYY/M/D')
                                        .replace('/-/g', '/') +
                                      '/'
                                  ) + '.mp4'
                                "
                                type="video/mp4"
                              />
                            </video>
                          </vue-plyr>
                          <vue-plyr
                            v-else-if="
                              uploadVideo.toLowerCase().includes('youtu')
                            "
                          >
                            <div class="plyr__video-embed">
                              <iframe
                                loading="lazy"
                                :src="
                                  uploadVideo +
                                  '?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1'
                                "
                                allowfullscreen
                                allowtransparency
                              ></iframe>
                            </div>
                          </vue-plyr>
                          <vue-plyr
                            v-else-if="
                              uploadVideo.toLowerCase().includes('.mp4')
                            "
                          >
                            <video>
                              <source :src="uploadVideo" type="video/mp4" />
                            </video>
                          </vue-plyr>
                          <vue-plyr
                            v-else-if="
                              uploadVideo.toLowerCase().includes('.ogg')
                            "
                          >
                            <video>
                              <source :src="uploadVideo" type="video/ogg" />
                            </video>
                          </vue-plyr>
                          <vue-plyr
                            v-else-if="
                              uploadVideo.toLowerCase().includes('.webm')
                            "
                          >
                            <video>
                              <source :src="uploadVideo" type="video/webm" />
                            </video>
                          </vue-plyr>

                          <!-- <videoLiveComp
														v-else-if="uploadVideo.toLowerCase().includes('m3u')"
														:videoIndex="'videoIndex'"
														:srcVideo="uploadVideo"
													></videoLiveComp>-->
                          <div
                            v-else-if="
                              !uploadVideo.includes('sporttube') &&
                              (uploadVideo.toLowerCase().includes('embed') ||
                                uploadVideo.toLowerCase().includes('player') ||
                                uploadVideo
                                  .toLowerCase()
                                  .includes('allfoot.') ||
                                uploadVideo.toLowerCase().includes('stream'))
                            "
                            class="video-wrap"
                          >
                            <vue-plyr>
                              <div class="plyr__video-embed">
                                <iframe
                                  loading="lazy"
                                  webkitallowfullscreen="true"
                                  mozallowfullscreen="true"
                                  allow="autoplay"
                                  allowfullscreen="true"
                                  scrolling="no"
                                  frameborder="0"
                                  allowtransparency="true"
                                  :data-src="
                                    uploadVideo.toLowerCase().includes('player')
                                      ? uploadVideo
                                          .replace('player/html', 'embed')
                                          .replace(
                                            'autoplay=true',
                                            'autoplay=false'
                                          )
                                          .replace(
                                            'autoplay-mute=1',
                                            'autoplay-mute=0'
                                          )
                                      : uploadVideo
                                          .replace(
                                            'autoplay=true',
                                            'autoplay=false'
                                          )
                                          .replace(
                                            'autoplay-mute=1',
                                            'autoplay-mute=0'
                                          )
                                  "
                                  :src="
                                    uploadVideo.toLowerCase().includes('player')
                                      ? uploadVideo
                                          .replace('player/html', 'embed')
                                          .replace(
                                            'autoplay=true',
                                            'autoplay=false'
                                          )
                                          .replace(
                                            'autoplay-mute=1',
                                            'autoplay-mute=0'
                                          )
                                      : uploadVideo
                                          .replace(
                                            'autoplay=true',
                                            'autoplay=false'
                                          )
                                          .replace(
                                            'autoplay-mute=1',
                                            'autoplay-mute=0'
                                          )
                                  "
                                ></iframe>
                              </div>
                            </vue-plyr>
                          </div>
                          <vue-plyr
                            v-else-if="
                              uploadVideo.toLowerCase().includes('mpd')
                            "
                          >
                            <video :srcVideo="uploadVideo"></video>
                          </vue-plyr>

                          <div v-else>
                            <client-only>
                              <link-preview
                                class="linkPreviewWrap"
                                @successLink="successLink($event)"
                                @problemLink="problemLink"
                                :url="uploadVideo"
                              ></link-preview>
                            </client-only>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="typing">
                      <div
                        v-for="(isTyping, index) in isCurrentlyTypingTodisplay"
                        :key="index"
                      >
                        <span>
                          <strong class="has-text-success">{{
                            isTyping.user.username
                          }}</strong>
                          {{ langSelected === "EN" ? "is typing" : "écrit"
                          }}<span
                            v-if="
                              index != isCurrentlyTypingTodisplay.length - 1
                            "
                            >,&nbsp
                          </span></span
                        >
                      </div>
                    </div>
                    <div class="media publishBabbles">
                      <div
                        v-if="$auth.user && $auth.user._id"
                        class="media-content"
                      >
                        <div>
                          <div class="fieldMain">
                            <div
                              v-if="!uploadImage"
                              class="pointer imgIconWrapper"
                            >
                              <a class="imgIconWrapper">
                                <input
                                  type="file"
                                  class="hide inputfile"
                                  id="upload"
                                  @change="onFileChange"
                                />
                                <label
                                  v-if="!uploadImage"
                                  class="imgIconWrapper"
                                  for="upload"
                                >
                                  <i class="mdi mdi-paperclip mdi-36px"></i>
                                </label>
                              </a>
                            </div>
                            <div
                              class="
                                controlMain
                                has-icons-right
                                input-msg
                                is-clearfix
                              "
                            >
                              <textarea-autosize
                                class="
                                  autoResizeTextareamain
                                  sc-user-input--text
                                  chatInstan
                                "
                                :placeholder="`${
                                  langSelected === 'EN'
                                    ? 'a message to others?'
                                    : 'un message aux autres ?'
                                }`"
                                ref="myTextarea"
                                v-model="babble"
                                :min-height="45"
                              />
                            </div>
                            <div
                              v-if="!progress"
                              @click="sendPrivatePostConfirm"
                              class="sendIconWrapper pointer"
                              id
                            >
                              <a class="sendIconWrapper">
                                <label class="sendIconWrapper">
                                  <i class="mdi mdi-telegram mdi-36px"></i>
                                </label>
                              </a>
                            </div>
                          </div>

                          <progress
                            v-if="progress"
                            class="progress is-success"
                            :value="progress"
                            max="100"
                          >
                            {{ progress }}
                          </progress>
                          <!--  
                            <div
                            v-else-if="!progress"
                            class="level postFullWidth"
                          >
                            <button
                              id="babble-submit"
                              @click="sendPrivatePostConfirm()"
                              class="button is-medium is-fullwidth is-contest"
                            >
                              <i class="mdi mdi-telegram mdi-36px"></i>
                            </button>
                          </div>
                            
                            
                            <div v-if="!uploadImage && !progress" class="level">
                            <div class="level-left">
                              <a class="options-img-video">
                                <input
                                  v-if="!uploadImage"
                                  type="file"
                                  class="hide inputfile"
                                  id="upload"
                                  @change="onFileChange"
                                />
                                <label
                                  v-if="!uploadImage"
                                  class="chartIcon pointer"
                                  for="upload"
                                >
                                  <i class="mdi mdi-paperclip mdi-36px"></i>
                                </label>
                              </a>
                             
                              <a
                                v-if="!uploadImage"
                                class="has-text-grey-light"
                              >
                                <span
                                  @click="shareVideo()"
                                  class="chartIcon pointer"
                                >
                                  <i class="fa fa-link"></i>
                                </span>
                              </a>
                         	<a v-if="!uploadImage" class="has-text-grey-light">
																<span @click="shareScreen()" class="chartIcon pointer">
																	<i class="fa fa-video-camera"></i>
																</span>
															</a>
                            </div>
                           
                          </div>-->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="swiper-container"
                v-swiper:myDirectiveSwiper="swiperOptions"
                @slide-next-transition-start="slideNextTransitionStart"
                @slide-prev-transition-start="slidePrevTransitionStart"
              >
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <div v-if="activeItem === 'prono'">
                      <side-recent-activity-contest
                        @iWantBet="iWantBet($event)"
                        @seeDetailMatchprono="seeDetailMatchprono($event)"
                        :lastPronos="lastPronos"
                      ></side-recent-activity-contest>
                    </div>
                    <div v-if="activeItem === 'leaderboard'">
                      <contest-leader-board
                        :resultMatchList="resultMatchList"
                        @followUnfollow="IwantLeaderboard"
                        @voirInsidersBet="voirInsidersBet($event)"
                        :leaderboards="leaderboards"
                        class
                      ></contest-leader-board>
                    </div>
                    <div v-else-if="activeItem === 'upcoming'">
                      <b-loading
                        :is-full-page="true"
                        :active.sync="isLoading"
                        :canCancel="false"
                      ></b-loading>
                      <button
                        v-if="
                          upcomingMatchList.filter(
                            (m) =>
                              !m.userBet &&
                              !m.homeTeamId.is_placeholder &&
                              !m.awayTeamId.is_placeholder &&
                              (m.status.toUpperCase() == 'NS' ||
                                m.status.toUpperCase() == 'TBA')
                          ).length > 0
                        "
                        @click="randomizeBet"
                        class="button is-fullwidth randomButt has-text-contest"
                      >
                        <i class="fas fa-dice"></i>&nbsp
                        {{
                          langSelected === "EN"
                            ? "Random mode "
                            : "Mode aléatoire "
                        }}&nbsp
                        <i class="fas fa-dice"></i>
                      </button>
                      <upcoming-match-list-contest
                        :matchList="upcomingMatchList"
                        @iWantBet="iWantBet($event)"
                        @result="result($event)"
                        @seeLineup="seeLineup($event)"
                        @seeStadium="seeStadium($event)"
                        :contest="contest"
                        @bringMeToMyDashBoardResult="
                          bringMeToMyDashBoardResult()
                        "
                        @changeWatchlist="updateWatchList($event)"
                      ></upcoming-match-list-contest>
                    </div>
                    <div v-else-if="activeItem === 'results'">
                      <results-match-list-contest
                        :contest="contest"
                        :matchList="resultMatchList"
                        @result="result($event)"
                        @seeLineup="seeLineup($event)"
                        @seeStadium="seeStadium($event)"
                        :activeItem="activeItem"
                        @bringMeToMyDashBoardResult="
                          bringMeToMyDashBoardResult()
                        "
                        @changeWatchlist="updateWatchList($event)"
                      ></results-match-list-contest>
                    </div>

                    <div
                      v-if="activeItem === 'privatePosts' && !issharingScreen"
                      class
                    >
                      <div class="babbles-box" id="babble-container">
                        <div v-if="timelineTodisplay">
                          <div
                            v-for="(babble, index) in timelineTodisplay"
                            :key="index"
                            class="box"
                            v-observe-visibility="
                              index === timelineTodisplay.length - 5
                                ? getPrivatePosts
                                : index === timelineTodisplay.length - 1
                                ? getPrivatePosts
                                : false
                            "
                          >
                            <div
                              v-if="
                                babble.robot &&
                                babble.postImg &&
                                babble.postImg ==
                                  'https://media.giphy.com/media/H1TKAv5I5AOYcD7vxq/giphy.gif'
                              "
                              class="card-image imageChart robotImg"
                            >
                              <figure class="image imageBabble">
                                <img
                                  loading="lazy"
                                  :src="babble.postImg"
                                  alt="Placeholder image"
                                />
                              </figure>
                            </div>
                            <article
                              v-if="
                                $auth.user &&
                                $auth.user._id &&
                                babble.privatePost
                              "
                              class="media"
                            >
                              <figure
                                v-if="babble.robot"
                                class="pointer media-left picProfileBabble"
                              >
                                <div class="image is-32x32 is-circle">
                                  <img
                                    loading="lazy"
                                    class="imgProfile"
                                    src="~assets/images/ballon-contest.png"
                                    alt="ballon-contest"
                                  />
                                </div>
                              </figure>
                              <figure
                                v-else
                                class="pointer media-left picProfileBabble"
                              >
                                <div class="image is-32x32 is-circle">
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
                                <strong
                                  v-if="babble.robot"
                                  class="alignCenter has-text-primary"
                                >
                                  footfoot
                                </strong>
                                <nuxt-link
                                  v-else
                                  class="pointer"
                                  :to="'/dashboard/' + babble.user._id"
                                >
                                  <strong class="alignCenter">
                                    {{ babble.user.username }}
                                    <img
                                      v-if="babble.isOnline"
                                      class="is-12x12"
                                      src="~assets/images/online.png"
                                      alt="online"
                                    />
                                    <img
                                      loading="lazy"
                                      v-else
                                      class="is-12x12"
                                      src="~assets/images/offline.png"
                                      alt="offline"
                                    />
                                  </strong>
                                </nuxt-link>
                                <div class="eraseBab">
                                  <small
                                    class="media-right has-text-grey-light"
                                    >{{
                                      moment(babble.created_at)
                                        .local()
                                        .format("DD-MM-YYYY HH:mm")
                                    }}</small
                                  >
                                  &nbsp
                                  <button
                                    v-if="
                                      $auth.user &&
                                      $auth.user.username &&
                                      ($auth.user.role === 'admin' ||
                                        $auth.user.level ===
                                          'champions league' ||
                                        (babble.user &&
                                          $auth.user._id === babble.user._id))
                                    "
                                    type="button"
                                    @click="eraseBabble(babble)"
                                    class="delete deletebabble"
                                  ></button>
                                </div>
                              </div>
                            </article>

                            <code
                              v-if="
                                babble.robot &&
                                babble.postImg &&
                                babble.postImg ==
                                  'https://media.giphy.com/media/H1TKAv5I5AOYcD7vxq/giphy.gif'
                              "
                              v-html="babble.privatePost"
                            ></code>
                            <div
                              v-else
                              @click="showModalreply(babble)"
                              class="media-content"
                            >
                              <div class="mainContent">
                                <div
                                  v-if="babble.postImg"
                                  class="card-image imageChart"
                                >
                                  <figure class="image imageBabble">
                                    <img
                                      class="sideImg"
                                      loading="lazy"
                                      :src="babble.postImg"
                                      alt="Placeholder image"
                                    />
                                  </figure>
                                </div>
                                <div
                                  v-if="!babble.postImg && babble.postVideo"
                                  class="mobileOnly card-image imageChart"
                                >
                                  <figure class="image imageBabble">
                                    <img
                                      loading="lazy"
                                      class
                                      src="~assets/images/teams/soccervideo.png"
                                      alt="video"
                                    />
                                  </figure>
                                </div>
                                <div
                                  v-if="
                                    !mobile &&
                                    !babble.postImg &&
                                    babble.postVideo
                                  "
                                  @click="showModalreply(babble)"
                                  class="
                                    desktopOnly
                                    card-image
                                    imageChart
                                    contestChat
                                  "
                                >
                                  <div class="transparentForIframe"></div>
                                  <display-video
                                    v-if="replyModalactiv == false"
                                    @click="showModalreply(babble)"
                                    :video="babble.postVideo"
                                  ></display-video>
                                </div>
                                <h2
                                  class="
                                    pointer
                                    tweet-body
                                    has-text-grey
                                    babble-body
                                  "
                                >
                                  <p
                                    v-if="
                                      babble.privatePost.includes(
                                        'titlelinkChat'
                                      )
                                    "
                                    class="contestPost"
                                    v-html="babble.privatePost"
                                  ></p>
                                  <p v-else v-html="babble.privatePost"></p>
                                </h2>
                              </div>
                              <nav class="media-right foOt">
                                <div class="replyBabble level-right">
                                  <a class="level-item has-text-grey-light">
                                    <span class="icon is-medium">
                                      <img
                                        loading="lazy"
                                        class="clap"
                                        src="~assets/images/comments.svg"
                                      />
                                    </span>
                                    <small
                                      v-if="
                                        babble.comments &&
                                        babble.comments.length > 0
                                      "
                                      :class="{
                                        boldContest:
                                          babble.comments &&
                                          babble.comments.length > 0,
                                      }"
                                      class="favicon"
                                      >{{
                                        babble.comments
                                          ? babble.comments.length
                                          : ""
                                      }}</small
                                    >
                                  </a>
                                </div>
                              </nav>
                            </div>
                          </div>
                        </div>
                        <div
                          id="loader-container"
                          v-if="loadMoreIsActive == true"
                        >
                          <slot name="loading">
                            <div class="spinner"></div>
                          </slot>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sci">
            <side-recent-activity-contest
              v-if="!mobile"
              @seeDetailMatchprono="seeDetailMatchprono($event)"
              :lastPronos="lastPronos"
            ></side-recent-activity-contest>
          </div>
        </div>
      </div>
      <b-modal :active.sync="isShareVideoActive">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head chartIcon titleVideo">
            <i class="fa fa-link"></i>
            &nbsp
            {{ langSelected === "EN" ? "Share your video" : "Partage le lien" }}
          </header>
          <section class="modal-card-body">
            <b-field label="Url du lien">
              <b-input
                type="url"
                v-model="uploadVideo"
                :placeholder="
                  langSelected === 'EN'
                    ? 'https://www.youtube.com/watch?v=rlZRtQkfK04'
                    : 'https://www.youtube.com/watch?v=rlZRtQkfK04'
                "
              ></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button class="button btn" type="button" @click="closeVideoBabble">
              X
            </button>
            <button @click="okVideo()" class="button is-outlined is-contest">
              Ok
            </button>
          </footer>
        </div>
      </b-modal>

      <b-modal class="pdfModalWrapper" :active.sync="seePdfModal">
        <div>
          <div class>
            <div>
              <a :href="seePdf">
                {{
                  langSelected === "EN" ? "Download PDF" : "Télécharger le PDF"
                }}</a
              >.
            </div>
            <div class="card-image pdfCard">
              <iframe
                loading="lazy"
                class="iframePdf"
                :src="`https://drive.google.com/viewerng/viewer?url=${seePdf}&hl=en&pid=explorer&efh=false&a=v&chrome=false&embedded=true`"
                frameborder="0"
              ></iframe>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="closeContestModal" :width="640">
        <div class="mediaModal bullbearPos">
          <div class="bullsAndBearsPic2">
            <img
              loading="lazy"
              src="~assets/images/coupe.png"
              alt="contest-image"
            />
          </div>
          <div class="modalPosTaken">
            <h1>
              Es-tu sûr de vouloir clôturer le contest
              <strong class="has-text-contest">{{
                contest.contest.name
              }}</strong>
              ?
            </h1>
            <br />Si tu décides de fermer ce contest, celui-ci sera fermé
            définitivement. <br />Tu pourras organiser ou participer à un autre
            contest.
            <br />
            <br />
            <p
              class="button is-large buttonLoginLeaderboard"
              type="button"
              @click="validateCloseContest"
            >
              Clôturer le contest
            </p>
            <p
              class="button is-large buttonLoginLeaderboard"
              type="button"
              @click="cancel"
            >
              Annuler
            </p>
          </div>
        </div>
      </b-modal>

      <div v-if="currentInsight">
        <b-modal :active.sync="betModal">
          <bet-modal
            @result="result($event)"
            :currentInsight="currentInsight"
          ></bet-modal>
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
      <b-modal class="pronoinsiderModal" :active.sync="modalResult">
        <pronoinsider-modal
          :isLoadingresult="isLoadingresult"
          @closeInsiderResult="closeResult"
          :insider="insider"
          :matchList="matchList"
        ></pronoinsider-modal>
      </b-modal>
      <div v-if="modalReply" class="modalBoxNoPad">
        <b-modal :active.sync="replyModalactiv">
          <div>
            <div class="firstModalWrap box">
              <div class="box">
                <div v-if="modalReply.postImg" class="card-image imageChart">
                  <button
                    v-if="modalReply.postVideo"
                    class="button is-medium is-pdf"
                  >
                    <a :href="modalReply.postVideo">{{
                      langSelected === "EN"
                        ? "Download PDF"
                        : "Télécharger le PDF"
                    }}</a>
                  </button>
                  <a v-if="modalReply.postVideo" :href="modalReply.postVideo">
                    <figure class="image imageBabble">
                      <img
                        class="pdfImgModal"
                        loading="lazy"
                        :src="modalReply.postImg"
                        alt="Placeholder image"
                      />
                    </figure>
                  </a>
                  <figure v-else class="image imageBabble">
                    <img
                      loading="lazy"
                      :src="modalReply.postImg"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>

                <div
                  v-if="!modalReply.postImg && modalReply.postVideo"
                  class="card-image imageChart"
                >
                  <display-video :video="modalReply.postVideo"></display-video>
                </div>

                <article
                  v-if="$auth.user && $auth.user._id && modalReply.privatePost"
                  class="media"
                >
                  <figure
                    v-if="modalReply.robot"
                    class="pointer media-left picProfileBabble"
                  >
                    <div class="image is-32x32 is-circle">
                      <img
                        loading="lazy"
                        class="imgProfile"
                        src="~assets/images/ballon-contest.png"
                        alt="ballon-contest"
                      />
                    </div>
                  </figure>
                  <figure v-else class="media-left picProfileBabble">
                    <div class="image is-32x32 is-circle">
                      <nuxt-link
                        :to="'/dashboard/' + modalReply.user._id"
                        class
                      >
                        <img
                          loading="lazy"
                          class="imgProfile"
                          :src="modalReply.user.picProfile"
                          alt="Image"
                        />
                      </nuxt-link>
                    </div>
                  </figure>
                  <div class="tweet-meta">
                    <strong
                      v-if="modalReply.robot"
                      class="alignCenter has-text-primary"
                    >
                      footfoot
                    </strong>
                    <nuxt-link
                      v-else
                      :to="'/dashboard/' + modalReply.user._id"
                      class
                    >
                      <strong class="alignCenter">
                        {{ modalReply.user.username }}
                        <img
                          v-if="modalReply.user.online"
                          class="is-12x12"
                          src="~assets/images/online.png"
                          alt="online"
                        />
                        <img
                          loading="lazy"
                          v-else
                          class="is-12x12"
                          src="~assets/images/offline.png"
                          alt="offline"
                        />
                      </strong>
                    </nuxt-link>
                    <div>
                      <small class="media-right has-text-grey-light">{{
                        moment(modalReply.created_at)
                          .local()
                          .format("DD-MM-YYYY HH:mm")
                      }}</small>
                    </div>
                  </div>
                </article>
                <div class="media-content">
                  <div
                    v-if="modalReply && modalReply.privatePost"
                    class="content"
                  >
                    <h2 class="quill-code tweet-body has-text-grey babble-body">
                      <p
                        v-if="modalReply.privatePost.includes('titlelinkChat')"
                        class="contestPost"
                        v-html="modalReply.privatePost"
                      ></p>
                      <p v-else v-html="modalReply.privatePost"></p>
                    </h2>
                  </div>
                  <nav class="media-right foOt">
                    <div class="replyBabble level-right">
                      <a class="level-item has-text-grey-light">
                        <span class="icon is-medium">
                          <img
                            loading="lazy"
                            class="clap"
                            src="~assets/images/comments.svg"
                          />
                        </span>
                        <small
                          v-if="
                            modalReply.comments &&
                            modalReply.comments.length > 0
                          "
                          :class="{
                            boldContest:
                              modalReply.comments &&
                              modalReply.comments.length > 0,
                          }"
                          class="favicon"
                          >{{
                            modalReply.comments
                              ? modalReply.comments.length
                              : ""
                          }}</small
                        >
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
              <div v-if="modalReply.comments">
                <div
                  v-for="(reply, index) in modalReply.comments"
                  :key="index"
                  :id="`a${index}`"
                  class="box"
                >
                  <article class="media">
                    <figure class="media-left picProfileBabble">
                      <div class="image is-32x32 is-circle">
                        <nuxt-link
                          :to="'/dashboard/' + reply.babble.user"
                          class
                        >
                          <img
                            loading="lazy"
                            class="imgProfile"
                            :src="reply.babble.picProfile"
                            alt="Image"
                          />
                        </nuxt-link>
                      </div>
                    </figure>

                    <div class="tweet-meta">
                      <nuxt-link :to="'/dashboard/' + reply.babble.user" class>
                        <strong class="alignCenter">
                          {{ reply.babble.username }}
                          <img
                            loading="lazy"
                            v-if="reply.babble.isOnline"
                            class="is-12x12"
                            src="~assets/images/online.png"
                            alt="online"
                          />
                          <img
                            loading="lazy"
                            v-else
                            class="is-12x12"
                            src="~assets/images/offline.png"
                            alt="offline"
                          />
                        </strong>
                      </nuxt-link>
                      <div>
                        <small class="media-right has-text-grey-light">{{
                          moment(reply.babble.created_at)
                            .local()
                            .format("DD-MM-YYYY HH:mm")
                        }}</small>
                      </div>
                    </div>
                  </article>
                  <div class="media-content">
                    <div class="content">
                      <h2
                        class="quill-code tweet-body has-text-grey babble-body"
                      >
                        <p v-html="reply.babble.babble"></p>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="box firstModalWrap">
              <div class="typing">
                <div
                  v-for="(isTyping, index) in isCurrentlyTypingTodisplay"
                  :key="index"
                >
                  <span>
                    <strong>{{ isTyping.user.username }}</strong>
                    {{ langSelected === "EN" ? "is typing" : "écrit"
                    }}<span
                      v-if="index != isCurrentlyTypingTodisplay.length - 1"
                      >,&nbsp
                    </span></span
                  >
                </div>
              </div>
              <div class="media">
                <div class="media-content media-contentmodal">
                  <div>
                    <div class="fieldMain">
                      <div
                        class="
                          controlMain
                          has-icons-right
                          input-msg
                          is-clearfix
                        "
                      >
                        <textarea-autosize
                          class="
                            autoResizeTextareamain
                            sc-user-input--text
                            chatInstan
                          "
                          placeholder="..."
                          ref="myTextarea"
                          v-model="babbleReply"
                          :min-height="45"
                        />
                      </div>
                      <div
                        @click="postReplyBabble(modalReply)"
                        class="sendIconWrapper pointer"
                        id
                      >
                        <a class="sendIconWrapper">
                          <label class="sendIconWrapper">
                            <i class="mdi mdi-telegram mdi-36px"></i>
                          </label>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-modal>
      </div>
      <b-modal
        has-modal-card
        class="pronoinsiderModal"
        :active.sync="detailmodalProno"
      >
        <div
          v-if="matchProno && matchProno.length > 0"
          class="modal-card"
          style="width: auto"
        >
          <header class="modal-card-head">
            <div class="modal-card-title primordial">
              <img
                loading="lazy"
                class="logoUserMatchProno"
                :src="matchProno[0].match.homeTeamId.teamImg"
                :alt="matchProno[0].match.homeTeamName"
                :class="{
                  invertOk: matchProno[0].match.homeTeamName
                    .toUpperCase()
                    .includes('JUVE'),
                }"
              />
              <img
                loading="lazy"
                class="logoUserMatchPronoVersus"
                src="~assets/images/versus.png"
                alt="versus"
              />
              <img
                loading="lazy"
                class="logoUserMatchProno"
                :src="matchProno[0].match.awayTeamId.teamImg"
                :alt="matchProno[0].match.awayTeamName"
                :class="{
                  invertOk: matchProno[0].match.awayTeamName
                    .toUpperCase()
                    .includes('JUVE'),
                }"
              />
            </div>
          </header>
          <section class="modal-card-body wrapUsermatchprono">
            <modalPronousers :lastPronos="matchProno"></modalPronousers>
          </section>
          <footer class="modal-card-foot">
            <div class="displayFlex">
              <button
                @click="closedetailmodalProno"
                class="button is-outlined is-danger"
              >
                {{ langSelected === "EN" ? "close" : "fermer" }}
              </button>
            </div>
          </footer>
        </div>
        <b-loading
          v-else
          :is-full-page="false"
          :active.sync="isLoadinguserProno"
          :canCancel="false"
        ></b-loading>
      </b-modal>
      <b-modal :active.sync="repartitiongainModal">
        <repartition-gain
          :contest="masterContest"
          :footcoinPlayed="contest.betValue"
          :nbrePlayers="contest.participants.length"
          @closeRepartitiongain="closeRepartitiongain"
          class="repFootCoinModal"
        ></repartition-gain>
      </b-modal>

      <b-modal
        has-modal-card
        class="inviteModalStyle"
        :active.sync="inviteModal"
      >
        <div class="modal-card inviteModalStyle" style="width: auto">
          <header class="modal-card-head">
            <div class="modal-card-title primordial">
              <strong class="modalInvitHead has-text-contest">
                {{
                  langSelected === "EN"
                    ? "challenge your buddies"
                    : "défi tes potes"
                }}</strong
              >
            </div>
          </header>
          <section class="modal-card-body inviteModalStyle wrapUsermatchprono">
            <p v-if="contest.betValue">
              {{
                langSelected === "EN"
                  ? "the more people in the round, the more at stake 💶💶💶"
                  : "plus il y a de monde dans le round, plus il y a d'enjeu 💶💶💶"
              }}

              <br />{{
                langSelected === "EN"
                  ? "the more you can tease, the more fun it is 😜"
                  : "plus tu peux chambrer, et plus c'est marrant 😜"
              }}
              <br />
              {{ langSelected === "EN" ? "help" : "aide" }}
              <strong>{{ contest.contest.adminOfContest.username }}</strong>
              {{ langSelected === "EN" ? "and" : "et" }}
              <strong class="modalInvitHead has-text-contest"
                >{{
                  langSelected === "EN"
                    ? "makes the pot swell 💰💰💰"
                    : "fait gonfler le pot 💰💰💰"
                }}
              </strong>
            </p>
            <p v-else>
              {{
                langSelected === "EN"
                  ? "the more people in the round, the more at stake 💶💶💶"
                  : "plus il y a de monde dans le round, plus il y a d'enjeu 💶💶💶"
              }}
              <br />{{
                langSelected === "EN"
                  ? "the more you can tease, the more fun it is 😜"
                  : "plus tu peux chambrer, et plus c'est marrant 😜"
              }}<br />
              {{
                langSelected === "EN"
                  ? "and for the next one don't hesitate to add some stakes 💶💶💶"
                  : "et pour le prochain n'hésites pas à ajouter de l'enjeu 💶💶💶"
              }}

              <strong class="modalInvitHead has-text-contest"
                >{{
                  langSelected === "EN"
                    ? "create a contest with a prize pool 💰💰💰"
                    : "créer un contest avec cagnotte 💰💰💰"
                }}
              </strong>
            </p>
            <div class="centerButton">
              <client-only>
                <b-dropdown :triggers="['hover']">
                  <template #trigger>
                    <button
                      class="pointer button is-large buttonLoginLeaderboard"
                      slot="trigger"
                    >
                      <span>{{
                        langSelected === "EN"
                          ? "invite friends"
                          : "invite tes potes"
                      }}</span>
                    </button>
                  </template>

                  <b-dropdown-item
                    v-for="network in networks"
                    :key="network.network"
                    :class="{
                      mobileOnly:
                        network.name === 'Messenger' || network.name === 'SMS',
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
                      <i class="fas fa-copy"></i>&nbsp
                      {{
                        langSelected === "EN"
                          ? "Sharing link"
                          : "Lien de partage"
                      }}</a
                    >
                  </b-dropdown-item>
                </b-dropdown>
              </client-only>
            </div>
          </section>
          <footer class="modal-card-foot">
            <div class="displayFlex">
              <button
                @click="closeInviteModal"
                class="button is-small is-outlined is-danger"
              >
                {{ langSelected === "EN" ? "later!" : "plus tard !" }}
              </button>
            </div>
          </footer>
        </div>
      </b-modal>
      <b-modal class="modalRandom" :active.sync="pronoRandomModal">
        <div class="modalRandomwrap">
          <b-loading
            :is-full-page="true"
            :active.sync="isLoading"
            :canCancel="false"
          ></b-loading>
          <div class="displayFlex">
            <button
              @click="saveRandombet"
              class="button SaveRandomButt is-fullwidth is-contest"
            >
              <i class="fas fa-dice"></i>&nbsp
              {{ langSelected === "EN" ? "Save " : "Sauvegarder " }}&nbsp
              <i class="fas fa-dice"></i></button
            ><button
              @click="randomizeBet"
              class="button randomButt is-fullwidth has-text-contest"
            >
              <i class="fas fa-dice"></i>&nbsp
              {{
                langSelected === "EN" ? "Random mode " : "Mode aléatoire "
              }}&nbsp
              <i class="fas fa-dice"></i>
            </button>
          </div>

          <div v-for="(match, index) in pronoRandom" :key="index">
            <div
              class="box profile-card"
              v-if="match.match.homeTeamId && match.match.awayTeamId"
            >
              <div class="watchList displayFlex card-content">
                <div class="displayFlex bullsAndBears">
                  <div class="bullsAndBearsPic">
                    <img
                      loading="lazy"
                      class="modalRandomImg pointer"
                      :src="match.match.homeTeamId.teamImg"
                      :alt="match.match.homeTeamName"
                      :class="{
                        invertOk: match.match.homeTeamName
                          .toUpperCase()
                          .includes('JUVE'),
                      }"
                    />

                    <strong
                      class="teamNameStrong pointer"
                      v-if="langSelected === 'EN'"
                    >
                      {{
                        match.match.homeTeamId
                          ? match.match.homeTeamId.searchName
                          : match.match.homeTeamName
                      }}
                    </strong>

                    <strong
                      class="teamNameStrong pointer"
                      v-else-if="match.match.homeTeamId.name"
                    >
                      {{ match.match.homeTeamId.name }}
                    </strong>
                    <strong class="teamNameStrong" v-else>
                      {{ match.match.homeTeamName }}
                    </strong>
                  </div>
                </div>
                <input
                  step="1"
                  v-model="match.scoreTeam1"
                  class="scoreModal"
                  type="number"
                  min="0"
                  placeholder="0"
                />
                <div class="displayFlex pronoBlock">
                  <img
                    loading="lazy"
                    class="vs modalRandomImg"
                    src="~assets/images/versus.png"
                    alt="versus"
                  />
                </div>

                <input
                  step="1"
                  v-model="match.scoreTeam2"
                  class="scoreModal"
                  type="number"
                  min="0"
                  placeholder="0"
                />
                <div class="displayFlex bullsAndBears">
                  <div class="bullsAndBearsPic">
                    <img
                      loading="lazy"
                      class="modalRandomImg pointer"
                      :src="match.match.awayTeamId.teamImg"
                      :alt="match.match.awayTeamName"
                      :class="{
                        invertOk: match.match.awayTeamName
                          .toUpperCase()
                          .includes('JUVE'),
                      }"
                    />

                    <strong
                      class="teamNameStrong pointer"
                      v-if="langSelected === 'EN'"
                    >
                      {{
                        match.match.awayTeamId
                          ? match.match.awayTeamId.searchName
                          : match.match.awayTeamName
                      }}
                    </strong>

                    <strong
                      class="teamNameStrong pointer"
                      v-else-if="match.match.awayTeamId.name"
                    >
                      {{ match.match.awayTeamId.name }}
                    </strong>
                    <strong class="teamNameStrong" v-else>
                      {{ match.match.awayTeamName }}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="displayFlex">
            <button
              @click="saveRandombet"
              class="button marginBotnul SaveRandomButt is-fullwidth is-contest"
            >
              <i class="fas fa-dice"></i>&nbsp
              {{ langSelected === "EN" ? "Save " : "Sauvegarder " }}&nbsp
              <i class="fas fa-dice"></i></button
            ><button
              @click="randomizeBet"
              class="
                button
                marginBotnul
                randomButt
                is-fullwidth
                has-text-contest
              "
            >
              <i class="fas fa-dice"></i>&nbsp
              {{
                langSelected === "EN" ? "Random mode " : "Mode aléatoire "
              }}&nbsp
              <i class="fas fa-dice"></i>
            </button>
          </div>
        </div>
      </b-modal>
    </section>
    <section v-else-if="contest">
      <div class="column is-12 sideRecent mainSCI">
        <div class="sentimentLandText">
          <img
            loading="lazy"
            class="img-player"
            src="~assets/images/ronaldoPop.png"
            alt="Bull"
          />
          <h1 class="accrocheH1" v-if="langSelected === 'EN'">
            Challenge the others!
            <br />Come and make your predictions...
          </h1>
          <h1 class="accrocheH1" v-else>
            Défi les autres !
            <br />Viens faire tes pronos...
          </h1>
          <img
            loading="lazy"
            class="img-player"
            src="~assets/images/zlatanPop.jpg"
            alt="Bear"
          />
        </div>
        <div class="loggiin">
          <p
            v-if="langSelected === 'EN'"
            class="button is-large buttonLLLogin"
            type="button"
            @click="LoginModal"
          >
            login
          </p>
          <p
            v-else
            class="button is-large buttonLLLogin"
            type="button"
            @click="LoginModal"
          >
            connexion
          </p>
          <p
            v-if="langSelected === 'EN'"
            class="button is-large buttonSSSignin"
            type="button"
            @click="SignupModal"
          >
            join
          </p>
          <p
            v-else
            class="button is-large buttonSSSignin"
            type="button"
            @click="SignupModal"
          >
            rejoindre
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  getContestMain,
  getTimelinePost,
  getPositionContest,
  deleteContest,
  sendPrivatePost,
  getContestLeaderboard,
  sendFileToAws,
  getAvailablePointsToBetOnRound,
  getUnReadPrivatePostForUser,
  setPrivatePostReadForUser,
  sendPrivatpostreply,
  getMatchdayRound,
  getMatchdayMatchProno,
  deleteAPrivatepost,
  takeAbet,
} from "@/server/apiContest";
import { getContestMatchList } from "@/server/apiContest";
import { getInsiderPastInsightsRound } from "@/server/apiDashboard";
import moment from "moment";
export default {
  auth: false,
  sockets: {
    connect() {},
  },
  components: {
    PublicheaderUnconnect: () =>
      import("@/components/contest/ContestMain/PublicheaderUnconnect"),
    displayVideo: () => import("@/components/modal/displayVideo"),
    screenBroadcast: () =>
      import("@/components/contest/ContestMain/screenBroadcast"),
    pronoinsiderModal: () => import("@/components/modal/pronoinsiderModal"),
    betModal: () => import("@/components/modal/betModal"),
    resultatModal: () => import("@/components/modal/resultatModal"),
    stadiumModal: () => import("@/components/modal/stadiumModal"),
    ContestLeaderBoard: () => import("@/components/contest/ContestLeaderBoard"),
    SideCurrentInsightContest: () =>
      import("@/components/contest/ContestMain/SideCurrentInsightContest"),
    SideRecentActivityContest: () =>
      import("@/components/contest/ContestMain/SideRecentActivityContest"),
    ResultsMatchListContest: () =>
      import("@/components/contest/ContestMain/ResultsMatchListContest"),
    UpcomingMatchListContest: () =>
      import("@/components/contest/ContestMain/UpcomingMatchListContest"),
    linkPreview: () => import("@/components/userpage/linkPreview"),
    videoLiveComp: () =>
      import("@/components/contest/ContestMain/videoLiveComp"),
    PlaceholderComponent: () =>
      import("@/components/contest/PlaceholderComponent"),
    modalPronousers: () =>
      import("@/components/contest/ContestMain/modalPronousers"),
    repartitionGain: () => import("@/components/modal/repartitionGain"),
    pdfPage: () => {
      if (!process.client) {
        return {
          component: PlaceholderComponent,
        };
      } else {
        return {
          component: import("@/components/contest/pdfPage"),
        };
      }
    },
    pdfPageload: () => {
      if (!process.client) {
        return {
          component: PlaceholderComponent,
        };
      } else {
        return {
          component: import("@/components/contest/pdfPageload"),
        };
      }
    },
  },
  head() {
    return {
      //script: [{ src: "https://unpkg.com/@daily-co/daily-js" }],//
      title:
        "Gagne des footcoins en faisant les meilleurs pronos de football - Pour l'amour du foot",
      meta: [
        {
          hid: `description`,
          name: "description",
          content:
            "Le meilleur pronostiqueur remportera gloire, respect et footcoins",
        },
        {
          hid: `keywords`,
          name: "keywords",
          keywords:
            "football, pronos, paris, Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Pour l'amour du foot",
        },
        {
          hid: `og:title`,
          property: "og:title",
          content:
            "Gagne des footcoins en faisant les meilleurs pronos de football - Pour l'amour du foot",
        },
        {
          hid: `og:url`,
          property: "og:url",
          content: `https://www.footfoot.co"${this.$route.fullPath}`,
        },
        {
          hid: `og:image`,
          property: `og:image`,
          content: "https://www.footfoot.co/miseLogo.png",
        },
        {
          hid: `og:description`,
          property: "og:description",
          content:
            "Le meilleur pronostiqueur remportera gloire, respect et footcoins ",
        },
        {
          hid: `twitter:card`,
          name: `twitter:card`,
          property: "twitter:card",
          content: "summary_large_image",
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
            "Gagne des footcoins en faisant les meilleurs pronos de football - Pour l'amour du foot",
        },
        {
          hid: `twitter:description`,
          name: `twitter:description`,
          property: "twitter:description",
          content:
            "Le meilleur pronostiqueur remportera gloire, respect et footcoins",
        },
        {
          hid: `twitter:image`,
          name: `twitter:image`,
          property: "twitter:image",
          content: "https://www.footfoot.co/miseLogo.png",
        },
      ],
    };
  },
  data() {
    return {
      pronoRandomModal: false,
      pronoRandom: "",
      noMoreBabble: false,
      loadMoreIsActive: false,
      mobile: this.$mobileDetect.mobile(),
      sharing: {
        url: `https://www.footfoot.co/contest/inscription/${this.$route.params.contestId}`,
        title: `Gagne des footcoins en faisant les meilleurs pronos de football - Pour l'amour du foot`,
        description: `Le meilleur pronostiqueur remportera gloire, respect et footcoins`,
        quote: `oublie que t'as aucune chance, participe à mon contest de prono avec moi sur footfoot.co !`,
        hashtags: `footfoot,football,pronos,contest,picks,paris`,
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
      repartitiongainModal: false,
      issharingScreen: false,
      upcomingMatchList: [],
      resultMatchList: [],
      matchList: [],
      modalResult: false,
      insider: "",
      betModal: false,
      currentInsight: "",
      lineUp: "",
      resultatModal: false,
      resultat: "",
      stadium: "",
      stadiumModal: false,
      numberMess: 0,
      availablePoints: "",
      pdfToImage: "",
      uploadVideo: "",
      linkTitle: "",
      linkText: "",
      progress: "",
      isLoading: false,
      seePdf: "",
      seePdfModal: false,
      sendingPost: false,
      userLeaderboard: "",
      userPosition: "",
      leaderboards: [],
      uploadImage: "",
      copyLink: "",
      isSharingActive: false,
      total: 0,
      closeContestModal: false,
      loading: true,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 800,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      exemplePointModal: false,
      isSwitched: false,
      isClosed: false,
      contest: "",
      openProno: [],
      timeline: [],
      lastPronos: [],
      actualTime: moment().local().format("X"),
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      babble: "",
      isShareChartActive: false,
      isShareVideoActive: false,
      babbleImage: null,
      babbleUrl: "",
      noSticker: false,
      width: 490,
      height: 245,
      quality: 1,
      babbleVideo: "",
      activeItem: "",
      videoId: "videoId",
      emailObject: "Rejoins-nous sur footfoot.co !",
      masterContest: "",
      isLoadingresult: false,
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
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic"],
            [
              {
                header: [1, 2, 3, false],
              },
            ],
            [
              {
                align: [],
              },
            ],
          ],
          imageResize: true,
        },
        placeholder: "Les messages ici sont privés, lâches-toi ! ",
      },
      emailText: "",
      modalReply: "",
      replyModalactiv: false,
      babbleReply: "",
      babbleText: "",
      detailmodalProno: false,
      matchProno: "",
      isLoadinguserProno: false,
      allMatchesInround: [],
      postreplyactiv: false,
      timelineTodisplay: [],
      inviteModal: false,
      lastBabbleid: "",
      isCurrentlyTyping: [],
      isCurrentlyTypingTodisplay: [],
      typingtime: "",
    };
  },
  props: {},
  computed: {
    matches() {
      return this.$store.state.var.matches;
    },
    newMessage() {
      return this.$store.state.var.newMessage;
    },
    contestInscriptionId() {
      return this.$store.state.var.contestInscriptionId;
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
    usersOnlinelist() {
      return this.$store.state.var.usersOnlinelist;
    },
  },
  destroyed() {
    this.$auth.fetchUser();
  },
  beforeDestroy() {
    this.sockets.unsubscribe("contestTyping" + this.$route.params.contestId);
    this.sockets.unsubscribe("mess" + this.$route.params.contestId);
  },
  mounted() {
    this.$nuxt.$on("betTaken", () => {
      this.betTaken();
    });
    if (this.sockets) {
      this.sockets.unsubscribe("contestTyping" + this.$route.params.contestId);
      this.sockets.subscribe(
        "contestTyping" + this.$route.params.contestId,
        (typing) => {
          if (typing.user && typing.user._id != this.$auth.user._id) {
            let typingToadd = typing;
            this.isCurrentlyTyping.push(typingToadd);

            this.isCurrentlyTyping = [
              ...new Map(
                this.isCurrentlyTyping.map((item) => [item.user._id, item])
              ).values(),
            ];
          }
        }
      );
      this.sockets.unsubscribe("mess" + this.$route.params.contestId);
      this.sockets.subscribe(
        "mess" + this.$route.params.contestId,
        (newMessage) => {
          if (this.isCurrentlyTyping && this.isCurrentlyTyping.length > 0) {
            this.isCurrentlyTyping = this.isCurrentlyTyping.filter(
              (item) => item.user._id != newMessage.message.user._id
            );
            this.isCurrentlyTypingTodisplay = this.isCurrentlyTyping.filter(
              (item) => item.user._id != newMessage.message.user._id
            );
          }
          let messToadd = newMessage.message;
          messToadd.isOnline = true;
          this.timeline = this.timeline.filter(
            (t) => t._id != newMessage.message._id
          );
          this.timeline.unshift(messToadd);

          this.lastBabbleid = newMessage.message._id;
          if (
            this.replyModalactiv == true &&
            this.modalReply._id == newMessage.message._id
          ) {
            this.showModalreply(newMessage.message);
          }

          if (this.activeItem != "privatePosts") {
            this.numberMess = Number(this.numberMess) + 1;
          } else {
            setPrivatePostReadForUser(this.$route.params.contestId);
          }
        }
      );
    }
    if (this.$auth.user && this.$auth.user._id) {
      if (this.langSelected == "EN") {
        this.sharing = {
          url: `https://www.footfoot.co/contest/inscription/${this.$route.params.contestId}`,
          title: `Win footcoins by making the best soccer predictions - For the love of soccer`,
          description: `The best predictor will win glory, respect and footcoins`,
          quote: `forget that you have no chance, participate in my prediction contest with me on footfoot.co!`,
          hashtags: `footfoot,football,pronos,contest,picks,paris`,
          twitterUser: "InsidersFoot",
        };
      }
      this.copyLink =
        "https://www.footfoot.co/contest/inscription/" +
        this.$route.params.contestId;
      this.fetchData();
    } else if (this.$route.params.contestId) {
      this.$router.push("/contest/inscription/" + this.$route.params.contestId);
    } else {
      this.$router.push("/contest/");
    }
  },
  watch: {
    modalReply: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.modalReply.user) {
          this.modalReply.user.online = true
            ? this.usersOnlinelist.filter(
                (l) =>
                  l.user == this.modalReply.user._id &&
                  moment().add(-0.5, "minutes").format() <
                    moment(l.time).format()
              ).length > 0
            : false;
        }
        if (this.modalReply.comments && this.modalReply.comments.length > 0) {
          this.modalReply.comments.map((el) => {
            let isOnline;
            let obj = el.babble;
            el.babble.isOnline = true
              ? this.usersOnlinelist.filter(
                  (l) =>
                    l.user == el.babble.user &&
                    moment().add(-0.5, "minutes").format() <
                      moment(l.time).format()
                ).length > 0
              : false;
            return obj;
          });
        }
      },
    },
    timeline: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.timeline) {
          let uniqueArray = [
            ...new Map(this.timeline.map((item) => [item._id, item])).values(),
          ];
          this.timelineTodisplay = uniqueArray.map((el) => {
            let isOnline;
            let obj = el;
            el.isOnline = true
              ? this.usersOnlinelist.filter(
                  (l) =>
                    el.user &&
                    l.user == el.user._id &&
                    moment().add(-0.5, "minutes").format() <
                      moment(l.time).format()
                ).length > 0
              : false;
            return obj;
          });
          if (this.langSelected) {
            this.timelineTodisplay = this.timelineTodisplay.filter(
              (b) =>
                !b.lang || (b.lang && b.lang == this.langSelected.toLowerCase())
            );
          }
        }
      },
    },
    usersOnlinelist: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.usersOnlinelist) {
          let uniqueArray = [
            ...new Map(this.timeline.map((item) => [item._id, item])).values(),
          ];
          this.timelineTodisplay = uniqueArray.map((el) => {
            let isOnline;
            let obj = el;
            el.isOnline = true
              ? this.usersOnlinelist.filter(
                  (l) =>
                    el.user &&
                    l.user == el.user._id &&
                    moment().add(-0.5, "minutes").format() <
                      moment(l.time).format()
                ).length > 0
              : false;
            return obj;
          });
          if (this.langSelected) {
            this.timelineTodisplay = this.timelineTodisplay.filter(
              (b) =>
                !b.lang || (b.lang && b.lang == this.langSelected.toLowerCase())
            );
          }
          if (this.modalReply.user) {
            this.modalReply.user.online = true
              ? this.usersOnlinelist.filter(
                  (l) =>
                    l.user == this.modalReply.user._id &&
                    moment().add(-0.5, "minutes").format() <
                      moment(l.time).format()
                ).length > 0
              : false;
          }
          if (this.modalReply.comments && this.modalReply.comments.length > 0) {
            this.modalReply.comments.map((el) => {
              let isOnline;
              let obj = el.babble;
              el.babble.isOnline = true
                ? this.usersOnlinelist.filter(
                    (l) =>
                      l.user == el.babble.user &&
                      moment().add(-0.5, "minutes").format() <
                        moment(l.time).format()
                  ).length > 0
                : false;
              return obj;
            });
          }
        }
      },
    },
    matches: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (
          this.allMatchesInround &&
          this.allMatchesInround.length > 0 &&
          this.allMatchesInround.filter((m) =>
            this.matches.map((l) => l._id).includes(m._id)
          ).length > 0
        ) {
          getContestMatchList(this.$route.params.contestId).then(
            (matchList) => {
              this.allMatchesInround = matchList;
              if (matchList.length > 0) {
                this.upcomingMatchList = matchList.filter((m) => {
                  return (
                    m.status.toUpperCase() != "FT" &&
                    m.status.toUpperCase() != "POSTP" &&
                    m.status.toUpperCase() != "CANCL" &&
                    m.status.toUpperCase() != "AET" &&
                    m.status.toUpperCase() != "FT_PEN"
                  );
                });
                let mL = matchList
                  .filter((m) => {
                    return (
                      m.status.toUpperCase() === "FT" ||
                      m.status.toUpperCase() === "POSTP" ||
                      m.status.toUpperCase() === "CANCL" ||
                      m.status.toUpperCase() === "AET" ||
                      m.status.toUpperCase() === "FT_PEN"
                    );
                  })
                  .sort((a, b) => new Date(b.date) - new Date(a.date));
                this.resultMatchList = mL;
              }
            }
          );
          if (!this.isClosed) {
            getMatchdayRound(this.$route.params.contestId).then((lastProno) => {
              this.lastPronos = lastProno.sort(
                (a, b) => new Date(a.match[0].date) - new Date(b.match[0].date)
              );
            });
          } else {
            this.lastPronos = [];
          }
          getPositionContest(
            this.$store.state.auth.user._id,
            this.$route.params.contestId
          ).then((openProno) => {
            this.openProno = openProno;
          });
        }
      },
    },
    activeItem: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.activeItem) {
          if (this.activeItem === "privatePosts") {
            setPrivatePostReadForUser(this.$route.params.contestId);
          }
        }
      },
    },

    babble: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        let regex =
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        let validUrl = regex.test(this.babble);
        if (validUrl) {
          let startSlice = this.babble.indexOf("http");
          let prov = this.babble.slice(startSlice);
          let endSlice = prov.indexOf("\n");
          if (endSlice > 1) {
            endSlice = endSlice;
          } else {
            endSlice = prov.indexOf(" ");
            endSlice = endSlice > 1 ? endSlice : this.babble.length;
          }
          prov = prov.slice(0, endSlice);
          this.uploadVideo = prov;
        }

        //this.modalImage = true;
      },
    },

    actualTime: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        this.compute();
        if (this.isCurrentlyTyping && this.isCurrentlyTyping.length > 0) {
          this.isCurrentlyTypingTodisplay = this.isCurrentlyTyping.filter(
            (item) =>
              moment(item.date).format() > moment().add(-17, "seconds").format()
          );

          if (
            this.isCurrentlyTypingTodisplay &&
            this.isCurrentlyTypingTodisplay.length > 0
          ) {
            this.isCurrentlyTypingTodisplay = [
              ...new Map(
                this.isCurrentlyTypingTodisplay.map((item) => [
                  item.user._id,
                  item,
                ])
              ).values(),
            ];
          } else {
            this.isCurrentlyTypingTodisplay = [];
            this.isCurrentlyTyping = [];
          }
        }
        if (this.babble && this.babble.length > 0) {
          if (
            !this.typingtime ||
            moment().add(-15, "seconds").format() >
              moment(this.typingtime).format()
          ) {
            let usertoEmit = {};
            usertoEmit._id = this.$auth.user._id;
            usertoEmit.username = this.$auth.user.username;
            this.$socket.emit("contestTyping", {
              user: usertoEmit,
              date: new Date(),
              round: this.$route.params.contestId,
            });
            this.typingtime = new Date();
          }
        }
        if (this.babbleReply && this.babbleReply.length > 0) {
          if (
            !this.typingtime ||
            moment().add(-15, "seconds").format() >
              moment(this.typingtime).format()
          ) {
            let usertoEmit = {};
            usertoEmit._id = this.$auth.user._id;
            usertoEmit.username = this.$auth.user.username;
            this.$socket.emit("contestTyping", {
              user: usertoEmit,
              date: new Date(),
              round: this.$route.params.contestId,
            });
            this.typingtime = new Date();
          }
        }
      },
    },
  },
  methods: {
    saveRandombet() {
      this.isLoading = true;
      let pronoRandomTosend = this.pronoRandom.filter(
        (m) =>
          m.match.status.toUpperCase() == "NS" ||
          m.match.status.toUpperCase() == "TBA"
      );
      for (let i = 0; i < pronoRandomTosend.length; i++) {
        if (i == pronoRandomTosend.length - 1) {
          let query = {};
          query.match = pronoRandomTosend[i].match._id;
          query.scoreTeam1 = Number(pronoRandomTosend[i].scoreTeam1);
          query.scoreTeam2 = Number(pronoRandomTosend[i].scoreTeam2);
          query.round = this.$route.params.contestId;
          query.bettingPoints = 0;

          takeAbet(query).then((resp) => {
            if (resp.status == "error") {
              this.$buefy.toast.open({
                message:
                  this.langSelected == "EN"
                    ? "Bet is closed on this game"
                    : "Prono fermé sur ce match",
                type: "is-danger",
              });
            }
            this.betTaken();
            this.$buefy.dialog.alert(
              this.langSelected == "EN"
                ? "Your predictions have been saved 😜 <br>You still can change it and bet some points"
                : "Tes pronos ont été enregistrés😜 <br>Tu peux toujours les modifier et miser des points"
            );
          });
        } else {
          let query = {};
          query.match = pronoRandomTosend[i].match._id;
          query.scoreTeam1 = Number(pronoRandomTosend[i].scoreTeam1);
          query.scoreTeam2 = Number(pronoRandomTosend[i].scoreTeam2);
          query.round = this.$route.params.contestId;
          query.bettingPoints = 0;

          takeAbet(query).then((resp) => {
            if (resp.status == "error") {
              this.$buefy.toast.open({
                message:
                  this.langSelected == "EN"
                    ? "Bet is closed on this game"
                    : "Prono fermé sur ce match",
                type: "is-danger",
              });
            }
          });
        }
      }
    },
    randomizeBet() {
      let upcomingMatchListwithoutBet = this.upcomingMatchList.filter(
        (m) =>
          !m.userBet &&
          !m.homeTeamId.is_placeholder &&
          !m.awayTeamId.is_placeholder &&
          (m.status.toUpperCase() == "NS" || m.status.toUpperCase() == "TBA")
      );
      this.pronoRandom = [];
      for (let i = 0; i < upcomingMatchListwithoutBet.length; i++) {
        if (i == upcomingMatchListwithoutBet.length - 1) {
          let query = {};
          query.match = upcomingMatchListwithoutBet[i];
          query.scoreTeam1 = Math.floor(Math.random() * 4);
          query.scoreTeam2 = Math.floor(Math.random() * 5);
          query.round = this.$route.params.contestId;
          query.bettingPoints = 0;

          this.pronoRandom.push(query);

          this.pronoRandomModal = true;
        } else {
          let query = {};
          query.match = upcomingMatchListwithoutBet[i];
          query.scoreTeam1 = Math.floor(Math.random() * 5);
          query.scoreTeam2 = Math.floor(Math.random() * 4);
          query.round = this.$route.params.contestId;
          query.bettingPoints = 0;
          this.pronoRandom.push(query);
        }
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
        deleteAPrivatepost(babble._id).then(() => {
          this.timeline = this.timeline.filter((t) => t._id != babble._id);
          if (this.timeline.length > 0) {
            this.lastBabbleid = this.timeline[this.timeline.length - 1]._id;
          } else {
            this.lastBabbleid = "";
          }
        });
      }
    },
    closeInviteModal() {
      this.inviteModal = false;
    },
    closeRepartitiongain() {
      this.repartitiongainModal = false;
    },
    openRepartitiongain() {
      this.repartitiongainModal = true;
    },
    closedetailmodalProno() {
      this.matchProno = "";
      this.detailmodalProno = false;
      this.isLoadinguserProno = false;
    },
    seeDetailMatchprono(event) {
      this.isLoadinguserProno = true;
      this.detailmodalProno = true;
      getMatchdayMatchProno(
        this.$route.params.contestId,
        event.match[0]._id
      ).then((matchProno) => {
        this.isLoadinguserProno = false;
        this.matchProno = matchProno;
      });
    },
    postReplyBabble(modalReply) {
      if (this.postreplyactiv == true || !this.babbleReply) {
      } else if (
        this.$store.state.auth.user &&
        this.$store.state.auth.user._id
      ) {
        this.postreplyactiv = true;

        let babbleComment = {};
        babbleComment.user = this.$auth.user._id;
        babbleComment.username = this.$auth.user.username;
        babbleComment.created_at = new Date();
        babbleComment.babble = this.addbrBabble(this.babbleReply);
        babbleComment.babble = this.$sanitize(babbleComment.babble);
        babbleComment.babble = this.addLinksToHttp(babbleComment.babble);
        if (this.$auth.user.picProfile) {
          babbleComment.picProfile = this.$auth.user.picProfile;
          babbleComment.initalPicture = this.$auth.user.initalPicture;
        } else {
          babbleComment.initalPicture = this.$auth.user.initalPicture;
        }
        sendPrivatpostreply(babbleComment, modalReply._id).then((resp) => {
          this.postreplyactiv = false;
          this.babbleReply = "";
          this.replyModalactiv = true;
          ////  this.timeline = this.timeline.filter((t) => t._id != modalReply._id);
          ////getTimelinePost(this.$route.params.contestId, this.lastBabbleid).then(
          ////  (timeline) => {
          ////   this.timeline = this.timeline.concat(timeline);
          ////              if (this.timeline.length > 0) {
          ////            this.lastBabbleid = this.timeline[this.timeline.length - 1]._id;
          ////      }
          ////}
          //// );
          this.retrievePrivatepost();
          setTimeout(() => {
            this.showModalreply(resp);
          }, 1);
          getUnReadPrivatePostForUser(this.$route.params.contestId).then(
            (numberMess) => {
              this.numberMess = numberMess;
            }
          );
        });
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },
    showModalreply(reply) {
      this.modalReply = reply;
      this.replyModalactiv = true;
      setTimeout(() => {
        if (reply && reply.comments.length > 1) {
          let content = this.$el.querySelector(
            "#a" + (reply.comments.length - 1)
          );
          if (content) {
            content.scrollIntoView();
          }
        }
      }, 5);
    },
    shareScreen() {
      this.issharingScreen = true;
    },
    onEditorChange({ editor, html, text }) {
      if (html) {
        this.babble = html;
      }
    },
    closeResult() {
      this.insider = "";
      this.matchList = [];
      this.modalResult = false;
    },
    voirInsidersBet(event) {
      this.modalResult = true;
      this.matchList = [];
      this.insider = event;
      this.isLoadingresult = true;
      let query = {
        $and: [
          { cave: false },
          { round: this.$route.params.contestId },
          { status: { $in: ["won", "lost"] } },
          { user: event._id },
        ],
      };
      getInsiderPastInsightsRound(query).then((pastInsights) => {
        this.matchList = pastInsights;
        this.isLoadingresult = false;
      });
    },
    slideNextTransitionStart() {
      if (this.activeItem == "prono") {
        this.leaderBoard();
      } else if (this.activeItem == "leaderboard") {
        this.getUpcoming();
      } else if (this.activeItem == "results") {
        this.getPrivatePosts();
      } else if (this.activeItem == "privatePosts") {
        this.PronoNextMatch();
      } else if (this.activeItem == "upcoming") {
        this.getResult();
      }
    },
    slidePrevTransitionStart() {
      if (this.activeItem == "prono") {
        this.getPrivatePosts();
      } else if (this.activeItem == "leaderboard") {
        this.PronoNextMatch();
      } else if (this.activeItem == "results") {
        this.getUpcoming();
      } else if (this.activeItem == "privatePosts") {
        this.getResult();
      } else if (this.activeItem == "upcoming") {
        this.leaderBoard();
      }
    },
    PronoNextMatch() {
      this.activeItem = "prono";
    },
    leaderBoard() {
      this.IwantLeaderboard();
      this.activeItem = "leaderboard";
    },
    getUpcoming() {
      this.activeItem = "upcoming";
    },
    getResult() {
      this.activeItem = "results";
    },
    betTaken() {
      this.currentInsight = "";
      this.isLoading = true;
      getContestMatchList(this.$route.params.contestId).then((matchList) => {
        this.allMatchesInround = matchList;
        if (matchList.length > 0) {
          this.upcomingMatchList = matchList.filter((m) => {
            return (
              m.status.toUpperCase() != "FT" &&
              m.status.toUpperCase() != "POSTP" &&
              m.status.toUpperCase() != "CANCL" &&
              m.status.toUpperCase() != "AET" &&
              m.status.toUpperCase() != "FT_PEN"
            );
          });
          this.betModal = false;
          let mL = matchList
            .filter((m) => {
              return (
                m.status.toUpperCase() === "FT" ||
                m.status.toUpperCase() === "POSTP" ||
                m.status.toUpperCase() === "CANCL" ||
                m.status.toUpperCase() === "AET" ||
                m.status.toUpperCase() === "FT_PEN"
              );
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));
          this.resultMatchList = mL;
          this.isLoading = false;
          this.pronoRandomModal = false;
        }
      });
      if (!this.isClosed) {
        getMatchdayRound(this.$route.params.contestId).then((lastProno) => {
          this.lastPronos = lastProno.sort(
            (a, b) => new Date(a.match[0].date) - new Date(b.match[0].date)
          );
        });
      } else {
        this.lastPronos = [];
      }
      getPositionContest(
        this.$store.state.auth.user._id,
        this.$route.params.contestId
      ).then((openProno) => {
        this.openProno = openProno;
      });
    },
    iWantBet(currentInsight) {
      this.currentInsight = {};
      this.currentInsight.detailAvailablePoints = false;
      this.currentInsight.betPoints = Number(0);
      this.currentInsight.teamHomeScore = Number(0);
      this.currentInsight.teamAwayScore = Number(0);
      if (
        currentInsight.status.toUpperCase() != "NS" &&
        currentInsight.status.toUpperCase() != "TBA"
      ) {
        this.$buefy.dialog.alert(
          "Désolé, il n'est plus possible de pronostiquer pour ce match 😜😜😜"
        );
      } else if (!currentInsight.homeTeamId) {
        this.$buefy.dialog.alert(
          "Désolé, il n'est pas encore possible de pronostiquer pour ce match 😜😜😜"
        );
      } else if (!this.contest.status) {
        this.$buefy.dialog.alert(
          "Ce contest est terminé, il n'est plus possible de pronostiquer 😜😜😜"
        );
      } else {
        getAvailablePointsToBetOnRound(this.$route.params.contestId).then(
          (availablePoints) => {
            this.currentInsight.availablePoints = availablePoints;
            this.currentInsight.currentInsight = currentInsight;
            if (currentInsight.userBet) {
              this.currentInsight.availablePointsForBet =
                Math.round(
                  (Number(
                    this.currentInsight.availablePoints[0].availablePointsForBet
                  ) +
                    Number.EPSILON) *
                    100
                ) /
                  100 +
                Math.round(
                  (Number(currentInsight.userBet.bettingPoints) +
                    Number.EPSILON) *
                    100
                ) /
                  100;
              Number(currentInsight.userBet.bettingPoints);
              this.currentInsight.teamHomeScore = Number(
                currentInsight.userBet.scoreTeam1
              );
              this.currentInsight.teamAwayScore = Number(
                currentInsight.userBet.scoreTeam2
              );
              this.currentInsight.betPoints = Number(
                currentInsight.userBet.bettingPoints
              );
              this.betModal = true;
            } else {
              this.currentInsight.availablePointsForBet = Number(
                Math.round(
                  (Number(
                    this.currentInsight.availablePoints[0].availablePointsForBet
                  ) +
                    Number.EPSILON) *
                    100
                ) / 100
              );
              this.currentInsight.betPoints = Number(0);
              this.currentInsight.teamHomeScore = Number(0);
              this.currentInsight.teamAwayScore = Number(0);
              this.betModal = true;
            }
          }
        );
      }
    },
    seeLineup(event) {
      this.resultat = event;
      this.lineUp = true;
      this.resultatModal = true;
    },
    result(event) {
      this.lineUp = false;
      this.resultat = event;
      this.resultatModal = true;
    },
    seeStadium(event) {
      this.stadium = event;
      this.stadiumModal = true;
    },
    closeVideoBabble() {
      this.babbleVideo = "";
      this.isShareVideoActive = false;
    },
    bringMeToMyDashBoardResult() {
      this.$emit("bringMeToMyDashBoardResult");
    },
    handleSuccess() {
      if (this.langSelected == "EN") {
        this.$buefy.dialog.alert(
          "The link has been copied! Just have to share it 😋"
        );
      } else {
        this.$buefy.dialog.alert(
          "Le lien a été copié! Plus qu'à le partager 😋"
        );
      }
    },
    SignupModal() {
      this.$router.push("/signup");
    },
    LoginModal(autenticate) {
      this.$router.push("/login");
    },
    closeContest() {
      this.closeContestModal = true;
    },
    validateCloseContest() {
      this.closeContestModal = false;
      deleteContest(this.$route.params.contestId).then((contest) => {
        this.contest = contest;
        this.loading = true;
        this.fetchData();
      });
    },
    cancel() {
      this.closeContestModal = false;
    },
    moment: function (time) {
      return moment(time);
    },
    getPrivatePosts() {
      this.numberMess = 0;
      this.activeItem = "privatePosts";
      this.noMoreBabble = false;
      this.retrievePrivatepost();
      setPrivatePostReadForUser(this.$route.params.contestId);
      if (!this.isClosed) {
        getMatchdayRound(this.$route.params.contestId).then((lastProno) => {
          this.lastPronos = lastProno.sort(
            (a, b) => new Date(a.match[0].date) - new Date(b.match[0].date)
          );
        });
      } else {
        this.lastPronos = [];
      }
      getPositionContest(
        this.$store.state.auth.user && this.$store.state.auth.user._id,
        this.$route.params.contestId
      ).then((openProno) => {
        this.openProno = openProno;
      });

      this.numberMess = 0;
    },
    retrievePrivatepost() {
      if (this.loadMoreIsActive == false && this.noMoreBabble == false) {
        this.loadMoreIsActive = true;
        let lastBabble = this.lastBabbleid;

        getTimelinePost(this.$route.params.contestId, this.lastBabbleid).then(
          (timeline) => {
            if (
              this.$route.path.includes("message") ||
              this.activeItem == "privatePosts"
            ) {
              this.isLoading = false;
            }
            this.loadMoreIsActive = false;
            this.timeline = this.timeline.concat(timeline);
            this.timeline = this.timeline.sort(
              (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
            if (this.timeline.length > 0) {
              this.lastBabbleid = this.timeline[this.timeline.length - 1]._id;
            }
            if (lastBabble == this.lastBabbleid || this.timeline.length == 0) {
              this.noMoreBabble = true;
            }
          }
        );
      }
    },

    PronoNextMatch() {
      this.activeItem = "prono";
    },
    ligue(ligue) {
      this.$store.commit("var/setNewValue", ligue);
    },
    addOneSecondToActualTimeEverySecond() {
      var component = this;
      component.actualTime = moment().local().format("X");
      setTimeout(function () {
        component.addOneSecondToActualTimeEverySecond();
      }, 1000);
    },
    getDiffInSeconds() {
      return (
        moment(this.contest.deadline).local().format("X") - this.actualTime
      );
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
    seeExemple() {
      this.exemplePointModal = true;
    },
    shareChart() {
      this.uploadImage = "";
      this.isShareChartActive = true;
    },
    shareVideo() {
      this.isShareVideoActive = true;
    },
    problemLink() {
      this.babbleText = this.uploadVideo;
      this.uploadVideo = "";
      this.isShareVideoActive = false;
    },
    successLink(event) {
      this.babble = "";
      this.babbleUrl = event.images ? event.images[0] : "";
      this.linkTitle = event.title ? event.title : "";
      this.babbleText = event.description ? event.description : "";
      this.linkText = event.description ? event.description : "";
      this.source = event.url ? event.url : "";
      this.isShareVideoActive = false;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      } else if (
        files[0].name.toLowerCase().includes(".m3u") ||
        files[0].name.toLowerCase().includes(".ogg") ||
        files[0].name.toLowerCase().includes(".mp4") ||
        files[0].name.toLowerCase().includes(".webm")
      ) {
        this.sendFile(files[0]);
      } else if (files[0].type.includes("pdf")) {
        this.sendFile(files[0]);
        var uploadImage = new Image();
        var reader = new FileReader();
        var vm = this;
        reader.onload = (e) => {
          vm.pdfToImage = e.target.result;
        };
        reader.readAsDataURL(files[0], 0);
      } else if (
        files[0].name.toLowerCase().includes(".jpeg") ||
        files[0].name.toLowerCase().includes(".png") ||
        files[0].name.toLowerCase().includes(".jpg") ||
        files[0].name.toLowerCase().includes(".gif") ||
        files[0].name.toLowerCase().includes(".svg") ||
        files[0].name.toLowerCase().includes(".bmp") ||
        files[0].name.toLowerCase().includes(".jfif")
      ) {
        this.createImage(files[0]);
      } else {
        this.$buefy.dialog.alert("Ce format n'est pas supporté");
      }
    },
    createImage(file) {
      var uploadImage = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.uploadImage = e.target.result;
        fetch(e.target.result)
          .then((res) => res.blob())
          .then((blob) => {
            this.sendPdfImg(
              new File(
                [blob],
                this.$auth.user.username +
                  moment().format("DD/MM/YYYY à HH:mm") +
                  ".jpg",
                {
                  type: "image/jpeg",
                }
              )
            );
          });
      };
      reader.readAsDataURL(file, 0);
    },
    removeImage: function (e) {
      this.babbleUrl = "";
      this.babbleVideo = "";
      this.pdfToImage = "";
      this.uploadImage = "";
      this.uploadVideo = "";
    },
    removeVideo: function (e) {
      this.babbleUrl = "";
      this.babbleVideo = "";
      this.pdfToImage = "";
      this.uploadImage = "";
      this.uploadVideo = "";
    },
    okVideo() {
      this.isShareVideoActive = false;
    },
    async sendPdfImg(file) {
      let formData = new FormData();
      formData.append("file", file);

      sendFileToAws(formData, {}).then((resp) => {
        this.babbleUrl = resp.Location;
      });
    },
    async sendFile(file) {
      let formData = new FormData();
      formData.append("file", file);

      sendFileToAws(formData, {
        onUploadProgress: (e) => {
          this.progress = Math.round((e.loaded * 100) / e.total);
        },
      }).then((resp) => {
        setTimeout(() => {
          if (
            resp.Location.toLowerCase().includes(".m3u") ||
            resp.Location.toLowerCase().includes(".ogg") ||
            resp.Location.toLowerCase().includes(".mp4") ||
            resp.Location.toLowerCase().includes(".webm")
          ) {
            this.uploadImage = "";
            this.babbleVideo = resp.Location;
            this.progress = "";
            this.uploadVideo = resp.Location;
          } else {
            this.uploadImage = resp.Location;
            this.babbleVideo = resp.Location;
            this.progress = "";
          }
        }, 1500);
      });
    },
    transformToImg(event) {
      fetch(event[0].toDataURL("image/jpeg"))
        .then((res) => res.blob())
        .then((blob) => {
          this.sendPdfImg(
            new File(
              [blob],
              this.$auth.user.username +
                moment().format("DD/MM/YYYY-HH:mm:ss") +
                ".jpg",
              {
                type: "image/jpeg",
              }
            )
          );
        });
    },

    sendPrivatePostConfirm() {
      if (this.postPost === true) {
      } else {
        let textBabble;
        this.postPost = true;

        textBabble = this.babble
          .replace(/Ã¹/gi, "ù")
          .replace(/à´/gi, "ô")
          .replace(/Ã‡/gi, "Ç")
          .replace(/Â©/gi, "©")
          .replace(/Ãª/gi, "ê")
          .replace(/â€¦/gi, "...")
          .replace(/Ã¢/gi, "â")
          .replace(/Â«/gi, "«")
          .replace(/Â»/gi, "»")
          .replace(/Ã«/gi, "ë")
          .replace(/Ã§/gi, "ç")
          .replace(/â€™/gi, "'")
          .replace(/Ã©/gi, "é")
          .replace(/â€‹/gi, "")
          .replace(/Ã¨/gi, "è")
          .replace(/Ã®/gi, "î")
          .replace(/Ã/gi, "à")
          .replace(/Ã»/gi, "û")
          .replace(/Â°/gi, "°");
        if (this.uploadVideo) {
          textBabble = textBabble.replace(this.uploadVideo, " ");
        }
        //this.isLoading = true;
        textBabble = this.addbrBabble(textBabble);
        textBabble = this.$sanitize(textBabble);
        textBabble = this.addLinksToHttp(textBabble);

        if (this.source) {
          textBabble = textBabble ? `<span class="">${textBabble}</span>` : "";
          let babbleToSend = {};

          if (this.source.includes("footfoot.co")) {
            let slice = this.source.indexOf("footfoot.co") + 11;
            this.source = this.source.slice(slice);
            if (this.babbleUrl) {
              babbleToSend.privatePost = `<div class="lireSurReply box"><span class='displayFlex'><img src="${this.babbleUrl}" class='insideChatimg'/><span><p id="titlelinkChat">${this.linkTitle}</p><p id="subtitlelinkChat">${this.linkText}</p></span></span><a  href="${this.source}"><small class="titleBabble level-item">${this.source}</small></a></div>${textBabble}`;
            } else {
              babbleToSend.privatePost = `<div class="lireSurReply box"><span class='displayFlex'><span class="columnDirchat"><p id="titlelinkChat">${this.linkTitle}</p><p id="subtitlelinkChat">${this.linkText}</p></span></span><a  href="${this.source}"><small class="titleBabble level-item">${this.source}</small></a></div>${textBabble}`;
            }
          } else {
            if (this.babbleUrl) {
              babbleToSend.privatePost = `<div class="lireSurReply box"><span class='displayFlex'><img src="${this.babbleUrl}" class='insideChatimg'/><span><p id="titlelinkChat">${this.linkTitle}</p><p id="subtitlelinkChat">${this.linkText}</p></span></span><a target="_blank" href="${this.source}"><small class="titleBabble level-item">${this.source}</small></a></div>${textBabble}`;
            } else {
              babbleToSend.privatePost = `<div class="lireSurReply box"><span class='displayFlex'><span class="columnDirchat"><p id="titlelinkChat">${this.linkTitle}</p><p id="subtitlelinkChat">${this.linkText}</p></span></span><a target="_blank" href="${this.source}"><small class="titleBabble level-item">${this.source}</small></a></div>${textBabble}`;
            }
          }

          babbleToSend.postVideo = this.babbleVideo;
          babbleToSend.user = this.$store.state.auth.user._id;
          babbleToSend.round = this.contest._id;

          sendPrivatePost(babbleToSend).then((data) => {
            this.retrievePrivatepost();
            ////   getTimelinePost(
            ////     this.$route.params.contestId,
            ////     this.lastBabbleid
            ////            ).then((timeline) => {
            ////          this.timeline = this.timeline.concat(timeline);

            ////      if (this.timeline.length > 0) {
            ////    this.lastBabbleid = this.timeline[this.timeline.length - 1]._id;
            ////    }
            ////  });
            getUnReadPrivatePostForUser(this.$route.params.contestId).then(
              (numberMess) => {
                if (this.$route.path.includes("message")) {
                  this.activeItem = "privatePosts";
                  setPrivatePostReadForUser(this.$route.params.contestId);
                  this.numberMess = 0;
                } else {
                  this.numberMess = numberMess;
                }
              }
            );
            this.postPost = false;
            this.babble = "";
            this.uploadImage = "";
            this.uploadVideo = "";
            this.babbleUrl = "";
            this.babbleVideo = "";
            this.source = "";
            this.linkText = "";
            this.linkTitle = "";
            this.pdfToImage = "";
            this.isLoading = false;
          });
        } else if (this.uploadImage || this.babbleVideo || textBabble) {
          if (this.uploadImage && this.babbleVideo) {
            this.isLoading = true;
            this.sendingPost = true;
            textBabble = textBabble + " ";
          } else {
            this.babbleVideo = this.uploadVideo;
            textBabble = textBabble + " ";
          }

          let babbleToSend = {};
          babbleToSend.privatePost = textBabble;
          babbleToSend.postImg = this.babbleUrl;
          babbleToSend.postVideo = this.babbleVideo;
          babbleToSend.user = this.$store.state.auth.user._id;
          babbleToSend.round = this.contest._id;
          babbleToSend.privatePost = babbleToSend.privatePost;

          sendPrivatePost(babbleToSend).then(() => {
            this.retrievePrivatepost();
            ////            getTimelinePost(
            ////          this.$route.params.contestId,
            ////      this.lastBabbleid
            ////).then((timeline) => {
            ////      this.timeline = this.timeline.concat(timeline);
            ////              if (this.timeline.length > 0) {
            ////            this.lastBabbleid = this.timeline[this.timeline.length - 1]._id;
            ////      }
            ////   });
            getUnReadPrivatePostForUser(this.$route.params.contestId).then(
              (numberMess) => {
                if (this.$route.path.includes("message")) {
                  this.activeItem = "privatePosts";
                  setPrivatePostReadForUser(this.$route.params.contestId);
                  this.numberMess = 0;
                } else {
                  this.numberMess = numberMess;
                }
              }
            );
            this.postPost = false;
            this.babble = "";
            this.uploadImage = "";
            this.uploadVideo = "";
            this.babbleUrl = "";
            this.babbleVideo = "";
            this.source = "";
            this.linkText = "";
            this.linkTitle = "";
            this.pdfToImage = "";
            this.isLoading = false;
          });
        }
      }
    },
    IwantLeaderboard() {
      getContestLeaderboard(this.$route.params.contestId).then(
        (leaderboards) => {
          if (leaderboards.length === 0) {
            ////this.$router.push("/notFound");
          } else {
            this.leaderboards = leaderboards;
            this.userLeaderboard = this.leaderboards.filter((ul) => {
              return ul._id === this.$store.state.auth.user._id;
            })[0];
            this.userPosition =
              leaderboards.findIndex((ul) => {
                return ul._id === this.$store.state.auth.user._id;
              }) + 1;
          }
        }
      );
    },
    fetchData() {
      //this.$emit("isleaderboardcontest");
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        getContestMatchList(this.$route.params.contestId).then((matchList) => {
          if (matchList == "err") {
            //location.reload();
          }
          this.allMatchesInround = matchList;
          if (matchList.length > 0) {
            this.upcomingMatchList = matchList.filter((m) => {
              return (
                m.status.toUpperCase() != "FT" &&
                m.status.toUpperCase() != "POSTP" &&
                m.status.toUpperCase() != "CANCL" &&
                m.status.toUpperCase() != "AET" &&
                m.status.toUpperCase() != "FT_PEN"
              );
            });

            if (this.upcomingMatchList.length == 0) {
              this.activeItem = "leaderboard";
            }
            this.isLoading = false;
            let mL = matchList
              .filter((m) => {
                return (
                  m.status.toUpperCase() === "FT" ||
                  m.status.toUpperCase() === "POSTP" ||
                  m.status.toUpperCase() === "CANCL" ||
                  m.status.toUpperCase() === "AET" ||
                  m.status.toUpperCase() === "FT_PEN"
                );
              })
              .sort((a, b) => new Date(b.date) - new Date(a.date));
            this.resultMatchList = mL;
            getUnReadPrivatePostForUser(this.$route.params.contestId).then(
              (numberMess) => {
                if (this.$route.path.includes("message")) {
                  this.activeItem = "privatePosts";
                  setPrivatePostReadForUser(this.$route.params.contestId);
                  this.numberMess = 0;
                } else {
                  this.numberMess = numberMess;
                  if (
                    this.numberMess == 0 &&
                    this.upcomingMatchList.filter((u) => u.userBet).length ==
                      0 &&
                    this.resultMatchList.length == 0
                  ) {
                    this.inviteModal = true;
                  }
                }
              }
            );
          }
        });
        this.retrievePrivatepost();
        //// getTimelinePost(this.$route.params.contestId, this.lastBabbleid).then(
        ////   (timeline) => {
        //// this.timeline = this.timeline.concat(timeline);
        //// this.timeline = this.timeline.sort(
        ////      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        ////    );
        ////    if (this.timeline.length > 0) {
        ////      this.lastBabbleid = this.timeline[this.timeline.length - 1]._id;
        ////   }
        ////  }
        //// );
        getContestMain(this.$route.params.contestId).then((contest) => {
          if (contest === "no contest") {
            this.$buefy.dialog.alert("Ce round n'existe pas...");
            this.$router.push("/contest");
          } else if (
            !contest.participants.includes(
              this.$store.state.auth.user && this.$store.state.auth.user._id
            ) &&
            contest.status === false
          ) {
            this.$buefy.dialog.alert(
              "Tu as loupé ce round !<br> Ne rate pas le prochain 😋"
            );
            this.$router.push("/contest");
          } else if (
            !contest.participants.includes(
              this.$store.state.auth.user && this.$store.state.auth.user._id
            ) &&
            contest.status === true
          ) {
            this.$router.push(
              "/contest/inscription/" + this.$route.params.contestId
            );
          } else {
            if (contest.status === false) {
              this.isClosed = true;
              if (this.$route.path.includes("message")) {
                this.activeItem = "privatePosts";
                setPrivatePostReadForUser(this.$route.params.contestId);
                this.numberMess = 0;
              } else {
                this.activeItem = "leaderboard";
              }
            }
            this.contest = contest;
            this.loading = false;
            this.masterContest = contest.contest;
            this.copyLink =
              "https://www.footfoot.co/contest/inscription/" +
              this.$route.params.contestId;
            this.compute();
            this.addOneSecondToActualTimeEverySecond();
            if (this.$route.path.includes("message")) {
              this.activeItem = "privatePosts";
              setPrivatePostReadForUser(this.$route.params.contestId);
              this.numberMess = 0;
            } else if (this.contestInscriptionId != "" || !this.activeItem) {
              this.activeItem = "upcoming";
            } else {
              this.activeItem = this.activeItem;
            }
          }
        });
        if (!this.isClosed) {
          getMatchdayRound(this.$route.params.contestId).then((lastProno) => {
            this.lastPronos = lastProno.sort(
              (a, b) => new Date(a.match[0].date) - new Date(b.match[0].date)
            );
          });
        } else {
          this.lastPronos = [];
        }
        getAvailablePointsToBetOnRound(this.$route.params.contestId).then(
          (availablePoints) => {
            this.availablePoints = availablePoints[0];
          }
        );
        getPositionContest(
          this.$store.state.auth.user._id,
          this.$route.params.contestId
        ).then((openProno) => {
          this.openProno = openProno;
        });

        getContestLeaderboard(this.$route.params.contestId).then(
          (leaderboards) => {
            if (leaderboards.length === 0) {
              ////this.$router.push("/notFound");
            } else {
              this.leaderboards = leaderboards;
              this.userLeaderboard = this.leaderboards.filter((ul) => {
                return ul._id === this.$store.state.auth.user._id;
              })[0];
              this.userPosition =
                leaderboards.findIndex((ul) => {
                  return ul._id === this.$store.state.auth.user._id;
                }) + 1;
            }
          }
        );
        this.isLoading = true;

        this.emailText =
          process.env.NODE_ENV === "production"
            ? "Bonjour, %0D%0A%0D%0AJ'ai créé une compétition de pronostics entre amis sur footfoot.co. %0D%0APour la rejoindre et jouer avec moi, clique sur le lien suivant: %0D%0A%0D%0Ahttp://www.footfoot.co/contest/inscription/" +
              this.$route.params.contestId +
              "%0D%0A%0D%0AA très vite.%0D%0A" +
              this.$store.state.auth.user.username
            : "Bonjour, %0D%0A%0D%0AJ'ai créé une compétition de pronostics entre amis sur footfoot.co. %0D%0APour la rejoindre et jouer avec moi, clique sur le lien suivant: %0D%0A%0D%0Ahttp://localhost:8080/contest/inscription/" +
              this.$route.params.contestId +
              "%0D%0A%0D%0AA très vite.%0D%0A" +
              this.$store.state.auth.user.username;
      } else {
        this.$router.push(
          "/contest/inscription/" + this.$route.params.contestId
        );
      }
    },
    updateWatchList() {
      this.loading = true;
      this.fetchData();
    },
    goToRules() {
      this.$router.push("/contest/rules/" + this.$route.params.contestId);
    },
    addbrBabble(inputText) {
      inputText = inputText.replace(/(?:\r\n|\r|\n)/g, "<br />");
      return inputText;
    },
    addLinksToHttp(inputText) {
      var replacedText, replacePattern1, replacePattern2, replacePattern3;

      replacePattern1 =
        /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(
        replacePattern1,
        '<a href="$1" target="_blank">$1</a>'
      );

      //URLs starting with "www." (without ////before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(
        replacePattern2,
        '$1<a href="http://$2" target="_blank">$2</a>'
      );
      //Change email addresses to mailto:: links.
      replacePattern3 =
        /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(
        replacePattern3,
        '<a href="mailto:$1">$1</a>'
      );
      return replacedText;
    },
  },
};
</script>

<style scoped>
.typing {
  display: flex;
}
.typing > div {
  font-size: 0.8rem !important;
  color: #2da94f;
}
.scoreModal {
  width: 4rem;
  align-self: CENTER;
  position: relative;
  color: #ff7d00 !important;
  display: block;
}
.fieldMain {
  border-radius: 6px;
  background-color: white;
  border: 1px solid #ff7d00 !important;

  width: 100% !important;
  align-items: center;

  display: flex;
  justify-content: space-between;
}
.robotImg {
  padding-bottom: 5px;
}
.inviteModalStyle {
  overflow: visible !important;
}

.modalInvitHead {
  font-size: 1.5rem;
}
.mdi-telegram:before {
  max-height: 36px;
  display: flex;
  align-items: center;
  color: #ff7d00;
}
.boldContest {
  font-weight: bold;
  color: #ff7d00;
  font-size: 1.25rem !important;
}
.mainText {
  background-color: #eef1f7 !important;
}
.controlMain {
  width: 100%;
  border-color: #ff7d00;
}
.autoResizeTextareamain {
  display: block;
  width: 100% !important;
  border-radius: 5px;
  border-color: #ff7d00;
  padding: 5px;
  min-width: 100%;
  resize: vertical;
  background-color: white;
  border-radius: 4px;
  color: #363636;
  font-size: 1rem;
  height: 2.25em;
  justify-content: flex-start;
  position: relative;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 10px;
  border: none;
  box-shadow: none;
  margin: 1px;
  line-height: 1.5 !important;
  max-height: 80vh;
}
.autoResizeTextarea {
  border: 1px solid #ff7d00;
  margin-top: 5px;
  color: #192b41 !important;
  height: 50px;
}
.tweet-body {
  font-size: 1.2rem !important;
  color: #192b41 !important;
}
.firstModalWrap {
  background-color: #eef1f7;
  max-width: 640px;
}
.firstModalWrap > .box {
  margin-bottom: 0.75rem !important;
}
.box {
  padding: 0.25rem;
}
.babblesField > div > .box {
  padding: 0.25rem !important;
  margin-top: 0.25rem !important;
}
.iframeContest {
  width: 100%;
  height: 345px;
}
#ActionCard > .box {
  padding: 0.25rem !important;
}
.is-fullwidth {
  width: 100%;
  margin-bottom: 0.5rem;

  font-size: 1.25rem;
}

.pdfCard {
  display: flex;
}
.foOt {
  display: flex;
  justify-content: space-between;
  margin-left: 0rem !important;
}
.replyBabble {
  cursor: pointer;
}
.reply {
  height: 1.2rem;
}
.iframePdf {
  margin: auto;
  height: 90vh;
  width: stretch;
}
.button:focus:not(:active) {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.default-logo-contest {
  border: 2px solid #ff7d00 !important;
  height: 135px !important;
  width: 135px !important;
  width: auto !important;
  border-radius: 10% !important;
}
.imgCProfile {
  width: auto !important;
  border-radius: 50% !important;
}
.userPerf {
  padding: 0rem 0.5rem;
  cursor: pointer;
  width: max-content;
  display: flex;
}
.userPerfDeskMiddle {
  margin-right: 3rem !important;
}
.userPerfDeskMiddleImg {
  margin-left: 3rem !important;
}
.userPerf > div {
  margin: 0.5rem;
  flex-direction: column;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  text-align: left;
}
.userPerf > div > h1 {
  font-weight: bold;
}
.userPerf > div > strong {
  color: #192b41 !important;
  margin: auto;
}
.userPerf > img {
  height: 45px;
  width: auto;
  align-self: center;
}
.section {
  padding: 0rem !important;
}
.hide {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.displayUploadImage {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  align-items: center;
}
.mdi-paperclip {
  color: #ff7d00 !important;
  font-size: 30px;
  margin: auto;
}
.fa-link {
  color: #ff7d00 !important;
  font-size: 30px;
}
.options-img-video {
  padding-right: 15px;
}
.titleVideo {
  font-size: 1.2rem !important;
  font-weight: bold;
}
.button.is-contest {
  background-color: #ff7d00;
  color: #fff;
  border-color: #ff7d00;
}
.button {
  background-color: #192b41;
  color: #fff;
  border-color: #192b41;
  cursor: pointer;
  max-width: stretch;
}
.button:hover,
.button:focus {
  background-color: #fff;
  border-color: #192b41;
  color: #192b41;
}
.mediaModal {
  background-color: #fff;
  padding: 5%;
  margin: 5%;
  border-radius: 5px;
  border: solid, #192b41;
}
.chartIcon {
  width: 100%;
  display: flex;
  align-items: baseline;
  font-size: 0.85rem;
}
.level-right {
  display: flex;
  width: 35%;
  margin: 0px !important;
}
.foOt > .level-right {
  width: 100% !important;
}
.level-left {
  width: 60%;
  margin: 0px !important;
}
.level {
  margin-right: 5px;
  margin-left: 5px;
  display: flex;
  height: 3em;
  align-items: center;
  justify-content: space-between;
}
.bg-light {
  padding: 0rem !important;
  padding-bottom: 0px !important;
}
.field1 {
  margin-bottom: 5px !important;
}
body {
  color: #4a4a4a;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.7em;
}
.babble-body {
  padding-top: 0rem;
  padding-bottom: 0rem;
}
.content {
  margin-bottom: 0rem !important;
}
.tweet-body {
  word-break: break-word;
}
.babblesMenu {
  display: flex;
  width: 100%;
  justify-content: SPACE-BETWEEN;
}
.card-content {
  padding: 0.5rem;
}
.navbar {
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background-color: #fff;
  min-height: 3.25rem;
  position: relative;
  border-radius: 5px;
}
.fa {
  text-align: center;
  color: #192b41;
  cursor: pointer;
}
.media-content {
  overflow: initial !important;
  padding: 5px;
  align-self: center !important;
}
.media-contentmodal {
  padding: 0px !important;
}
#stockInfo > .media-content {
  padding: 0px !important;
}
.publishBabbles > .media-content {
  padding: 0px !important;
}
.buttonLoginInvit {
  margin-right: 2.5%;
  min-width: 20%;
  font-weight: bolder !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #2da94f !important;
  border-color: #eef1f7 !important;
  background-color: #2da94f !important;
}
.buttonLoginInvitClose,
.buttonLoginInvitClose:focus,
.buttonLoginInvitClose:hover {
  margin-right: 2.5%;
  min-width: 20%;
  font-weight: bolder !important;
  color: #fff !important;
  box-shadow: 0 0 0 0.125em #e7e7e7 !important;
  border-color: #fff !important;
  background-color: #e7e7e7 !important;
}
.buttonLoginInvit:focus,
.buttonLoginInvit:hover {
  font-weight: bolder !important;
  color: #2da94f !important;
  box-shadow: 0 0 0 0.125em #eef1f7 !important;
  border-color: #2da94f !important;
  background-color: #eef1f7 !important;
}
.centerButton {
  margin-top: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}
.buttonLoginLeaderboard {
  margin-right: 2.5%;
  min-width: 20%;
  font-weight: bolder !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #eef1f7 !important;
  background-color: #ff7d00 !important;
}
.buttonLoginLeaderboard:focus,
.buttonLoginLeaderboard:hover {
  font-weight: bolder !important;
  color: #ff7d00 !important;
  box-shadow: 0 0 0 0.125em #eef1f7 !important;
  border-color: #ff7d00 !important;
  background-color: #eef1f7 !important;
}
.pointsContest {
  font-size: 2rem !important;
  font-weight: bold;
  align-self: center;
  display: flex !important;
  align-items: center;
}
.is-3 {
  display: flex;
  flex-direction: column;
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
  max-width: 99%;
}
.sock-info {
  width: 33%;
  align-self: center;
  display: flex;
}
.longNameTitle > strong {
  font-weight: bold;
  color: #192b41;
  font-size: 1.5rem !important;
}
.timer {
  display: flex;
  justify-content: center;
  color: #ffcf00 !important;
  font-size: 1.25rem !important;
}
.countdown {
  margin: auto;
}
.has-text-yellow {
  color: #ffcf00;
}
.bullsAndBearsPic2 {
  width: 40%;
  padding: 1rem;
}
.subtitleIsin {
  font-size: 1rem !important;
  color: #192b41;
  margin: 0rem 0rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.bullbearPos {
  display: flex;
  align-items: center;
  border-radius: 5px;
  justify-content: space-evenly;
}
.title {
  line-height: 1.25;
  word-break: initial;
}
.level-item {
  cursor: pointer;
  display: flex;
  justify-content: CENTER;
}
.team-banner {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.longNameTitle {
  display: flex;
  align-items: center;
  margin-bottom: 0% !important;
  font-size: 1.25rem !important;
}
a {
  color: #192b41;
  cursor: inherit;
  text-decoration: none;
}
#ActionCard {
  width: 100%;
  padding: 0rem !important;
  margin-bottom: 0.5rem;
}
#stockInfo {
  display: flex;
}
small {
  font-size: 0.8rem !important;
}
.btn {
  cursor: pointer;
  font-weight: bolder;
  color: #192b41 !important;
  background-color: #fff !important;
  border-color: #192b41 !important;
}
.mainSCI {
  display: flex;
  flex-direction: column;
}
.sentimentLandText {
  align-items: center;
  display: flex;
  justify-content: center;
}
.img-player {
  width: 10rem;
  max-height: 10rem !important;
}
.accrocheH1 {
  font-size: 2rem;
  color: #192b41;
  padding: 3%;
  text-align: center;
}
.loggiiin {
  width: 33%;
  display: flex;
  justify-content: flex-end;
  align-self: center;
}
.loggiin {
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 1.5rem;
}
.endWrapButton {
  width: 33%;
  justify-content: flex-end !important;
}
.buttonSSSignin {
  margin-left: 2.5%;
  min-width: 20%;
  border-color: #192b41 !important;
  background-color: #fff !important;
  color: #192b41 !important;
}
.buttonLLLogin {
  margin-right: 2.5%;
  min-width: 20%;
  border-color: #192b41 !important;
  background-color: #fff !important;
  color: #192b41 !important;
}
.buttonLLLogin:focus,
.buttonLLLogin:hover {
  font-weight: bolder !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #192b41 !important;
  border-color: #eef1f7 !important;
  background-color: #192b41 !important;
}
.buttonSSSignin:focus,
.buttonSSSignin:hover {
  font-weight: bolder !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #192b41 !important;
  border-color: #eef1f7 !important;
  background-color: #192b41 !important;
}
.navbar-item.navbar-item.is-tab:hover {
  color: #ff7d00 !important;
}
.babMenu {
  font-size: 1.2rem;
  color: grey !important;
  cursor: pointer;
}
.contestImg {
  padding: 5px;
}
.pronoNext {
  display: none;
}
.contestNamePart {
  display: flex;
}
.contestNamePart > strong {
  align-self: center;
}
input {
  display: none;
}
.centralHeaderContest {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.mobile {
  display: none;
}
.centralHeaderContest > span {
  display: flex;
  margin: auto;
  margin-top: 10px;
  align-items: center;
}
.centralHeaderContest > span > img {
  height: 60px;
  margin: auto;
  margin-right: 5px;
  margin-left: 0px;
}
.countdown {
  margin: 0px;
}
.publishBabbles {
  margin-bottom: 0px;
}
.publishBabbles > .media-left {
  margin-right: 0rem !important;
  padding-top: 5px !important;
  padding-left: 5px !important;
}
.tweet-body {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.picProfileBabble {
  margin-right: 5px !important;
  margin-bottom: 5px;
}
.tweet {
  padding: 0.25rem;
  padding-bottom: 0px;
}
.navbar-itemImg {
  width: auto !important;
  max-height: 2.75rem !important;
}
.dropdown-content > div {
  font-size: 1.2rem !important;
}
.navbar-item.is-tab.is-active {
  background-color: transparent;
  border-bottom-color: #ff7d00 !important;
  border-bottom-style: solid !important;
  border-bottom-width: 3px !important;
  color: #ff7d00 !important;
  padding-bottom: calc(0.5rem - 3px) !important;
  font-size: 1.2rem;
  font-weight: bold;
}
.shake-vertical {
  -webkit-animation: pulse 1.6s infinite linear;
  animation: pulse 1.6s infinite linear;
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
  transform-origin: 50% 50%;
  -webkit-transform-origin: 50% 50%;
  border-radius: 50%;
  background-color: transparent;
  border-bottom-color: #ff7d00 !important;
  border-bottom-style: solid !important;
  border-bottom-width: 3px !important;
  color: #ff7d00 !important;
  padding-bottom: calc(0.5rem - 3px) !important;
  font-size: 1.2rem;
  font-weight: bold;
}
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes shake-vertical {
  0% {
    -webkit-transform: translate(2px, 0px) rotate(0deg);
  }
  10% {
    -webkit-transform: translate(-1px, 0px) rotate(-1deg);
  }
  20% {
    -webkit-transform: translate(-3px, 0px) rotate(2deg);
  }
  30% {
    -webkit-transform: translate(0px, 0px) rotate(0deg);
  }
  40% {
    -webkit-transform: translate(1px, 0px) rotate(2deg);
  }
  50% {
    -webkit-transform: translate(-1px, 0px) rotate(-2deg);
  }
  60% {
    -webkit-transform: translate(-3px, 0px) rotate(0deg);
  }
  70% {
    -webkit-transform: translate(2px, 0px) rotate(-2deg);
  }
  80% {
    -webkit-transform: translate(-1px, 0px) rotate(2deg);
  }
  90% {
    -webkit-transform: translate(2px, 0px) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(1px, 0px) rotate(-2deg);
  }
}
.countMess[data-count]:after {
  padding: 5px;
  position: absolute;
  right: -10px;
  content: attr(data-count);
  font-size: 0.8rem;
  border-radius: 50%;
  color: white;
  background: #2da94f;
  text-align: center;
  font-weight: bold;
  bottom: 5px;
}
.postFullWidth {
  margin-bottom: 10px;
}
.alignCenter {
  display: flex;
  align-items: center;
}
.alignCenter > .is-12x12 {
  margin-left: 10px;
  height: 15px;
  width: auto;
}
.priceWrap {
  display: flex;
  align-items: center;
}
.cup {
  margin-left: 5px !important;
}
.answerWrap {
  display: flex;
  justify-content: flex-end;
}
.is-20x20 {
  height: 20px;
}
.mobileOnly {
  display: none !important;
}
.wrapUsermatchprono {
  padding: 10px;
  max-height: 60vh;
}
.logoUserMatchProno {
  height: 2rem;
  width: auto;
}
.logoUserMatchPronoVersus {
  padding: 0px 15px;
  height: 2rem;
  width: auto;
  max-width: 65px;
}
.sci {
  min-width: 25%;
}
.mainContent {
  display: flex;
}
.mainContent > .babble-body {
  width: 100%;
  width: -moz-available; /* WebKit-based browsers will ignore this. */
  width: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
  width: fill-available;
}

.mainContent > .imageChart {
  margin-right: 10px;
}
.cagnotteImg {
  height: 50px;
  margin-right: 10px;
}
.sideImg {
  max-height: 50px;
  width: auto;
}
.transparentForIframe {
  width: 90px;
  height: 70px;
  background-color: transparent;
  position: fixed !important;
  cursor: pointer;
}
.pdfImgModal {
  margin: auto;
  width: auto;
  max-height: 300px;
}
.modalRandomwrap {
  background-color: #eef1f7;
}
.modalRandomImg {
  height: 45px;
  width: auto;
}
.watchList {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bullsAndBears {
  align-items: center;
  width: 20%;
  justify-content: CENTER;
}
.bullsAndBearsPic {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.randomButt {
  border-color: #ff7d00 !important;
  background-color: white !important;
}
.SaveRandomButt {
  border-color: #ff7d00 !important;
  background-color: #ff7d00 !important;
}
.marginBotnul {
  margin-bottom: 0 !important;
}
@media (max-width: 1047px) {
  .is-fullwidth {
    font-size: 1rem;
  }
  .pdfImgModal {
    margin: auto;
    width: auto;
    max-height: 230px;
  }
  .imageBabble {
    max-width: 100%;
  }
  .wrapUsermatchprono {
    max-height: 65vh;
  }
  .cagnotteImg {
    height: 35px;
    margin-right: 5px;
  }
  .mainContent > .imageChart {
    width: 100%;
    margin-right: 0px;
    max-width: 50px;
  }
  .mainContent > .imageChart > .imageBabble {
    margin-left: 0px;
    margin-right: 10px;
    margin-top: 5px;
    text-align: center;
    min-width: 25px;
  }
  .mainContent > .babble-body {
    width: 100%;
    width: -moz-available; /* WebKit-based browsers will ignore this. */
    width: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
    width: fill-available;
  }
  .desktopOnly {
    display: none !important;
  }
  .mobileOnly {
    display: flex !important;
  }
  .cup {
    height: 35px !important;
  }
  .alignCenter {
    font-size: 0.9rem !important;
  }
  .alignCenter > .is-12x12 {
    margin-left: 10px;
    height: 10px;
    width: auto;
  }
  .modalResult {
    height: 75vh !important;
  }
  .countMess[data-count]:after {
    font-size: 0.7rem;
  }
  .navbar-item.is-tab.is-active {
    font-size: 0.9rem;
  }
  .button.is-contest {
    padding-bottom: 0px !important;
    padding-top: 0px !important;
  }
  .tweet-meta {
    padding-bottom: 15px;
  }
  .tweet-body {
    padding-bottom: 0.25rem;
  }
  .publishBabbles {
    margin-bottom: 0px;
  }
  .navbar-itemImg {
    height: 35px !important;
    width: auto !important;
    max-height: 35px !important;
  }
  .centralHeaderContest > span {
    display: flex;
    flex-direction: column;
    margin: auto !important;
  }
  .centralHeaderContest {
    margin: auto !important;
  }
  .imgClass {
    margin: 5px;
    margin-left: 0px;
    margin-right: 0px;
  }
  .centralHeaderContest > span > img {
    margin-right: 0px;
    padding: 0px;
    height: 60px !important;
    width: 60px !important;
  }
  .contestNamePart {
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .mobile {
    display: block;
  }
  .mobileUserContestPoints {
    display: flex;
    justify-content: flex-end;
  }
  .mobileUserContestPoints > h1 > img {
    vertical-align: middle;
    width: 25px;
    height: auto;
  }
  .mobileUserContestPoints > strong {
    align-self: center;
    font-size: 1rem !important;
    color: #192b41;
  }
  .userPerfMobile {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 0px;
    width: 33%;
  }
  .desktop {
    display: none !important;
  }
  .userPerf > div {
    margin: 5px;
  }
  .contestImg {
    display: none;
  }
  .babMenu {
    font-size: 0.9rem;
  }
  #ActionCard {
    margin-bottom: 0rem;
    margin-top: 0.5rem;
  }
  .babblesMenu {
    margin-bottom: 0.5rem !important;
    padding: 0.25rem !important;
    display: flex;
    justify-content: space-between;
  }
  .is-large {
    font-size: 1rem !important;
  }
  .loggiin {
    justify-content: flex-start;
    display: FLEX;
    padding: 0rem;
    padding-left: 0px;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.7rem !important;
  }
  .loginClose {
    width: 100%;
  }
  .pronoNext {
    border-radius: 5px;
    margin-top: 0rem !important;
    margin-bottom: 0.5rem !important;
    display: block;
  }
  .accrocheH1 {
    font-size: 1.5rem;
  }
  .img-player {
    width: 5rem;
    max-height: 5rem !important;
  }
  .sentimentLandText {
    flex-direction: column;
    padding-bottom: 1.5rem;
  }
  .longNameTitle > strong {
    font-size: 1rem !important;
  }
  .sci {
    display: none;
  }
  .timer {
    font-size: 0.8rem !important;
  }
  .timer > strong {
    align-self: center;
  }
  div {
    font-size: 0.8rem !important;
  }
  .buttonLoginInvit {
    font-size: 0.7rem !important;
    margin-right: 0%;
  }
  .buttonLoginInvitClose,
  .buttonLoginInvitClose:focus,
  .buttonLoginInvitClose:hover {
    font-size: 0.7rem !important;
    margin-right: 0%;
  }
  .buttonLoginLeaderboard {
    font-size: 1rem !important;
  }
  .pointsContest {
    margin-top: 10px;
    font-size: 1.2rem !important;
  }
  .level-left {
    display: flex;
  }
  .field1 {
    margin-top: 0rem !important;
  }
  .chartIcon {
    justify-content: baseline !important;
  }
  .babMenu {
    color: #c9c9c9;
  }
  .picProfileBabble {
    margin: 0px;
    margin-right: 5px;
    display: block !important;
  }
  .card-content {
    padding: 1px;
  }
  .level-left + .level-right {
    margin-top: 0px !important;
  }
  .section {
    padding: 0px !important;
    padding-top: 0.1rem !important;
  }
  .sct1 {
    max-width: 100%;
    flex-direction: column;
  }
  .column {
    margin-left: 0px !important;
    margin-right: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .sock-info {
    width: 33%;
    margin-left: 0rem;
  }
  .control {
    margin-bottom: 3px;
  }
  .bullsAndBearsPic2 {
    width: 100%;
    padding-left: 0;
  }
  .longNameTitle {
    font-size: 0.8rem !important;
  }
  .team-banner {
    display: flex;
    padding: 0.1rem;
  }
  .level-item {
    margin-bottom: 0px !important;
    font-size: 0.6rem;
  }
  .media-left {
    margin-right: 0rem;
    padding: 2px;
  }
  .subtitleIsin {
    font-size: 0.7rem !important;
    margin: 0px;
  }
}
@media (max-width: 350px) {
  .pointsContest {
    font-size: 1rem !important;
  }
  .mobileUserContestPoints > strong {
    font-size: 0.9rem !important;
  }
}
</style>
