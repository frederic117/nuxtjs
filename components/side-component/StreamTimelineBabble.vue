<template>
  <div>
    <div>
      <nav v-if="!ùobile" class="navbar is-dark desktopOnly">
        <div class="mainMenu">
          <span
            @click="sortBabbles('all')"
            :class="{ 'is-active': filterBy === 'all' }"
            class="navbar-item is-tab itemMenu"
          >
            <img
              loading="lazy"
              class="is-35"
              src="~assets/images/teams/rumour.png"
              alt="rumour"
            />
            <p v-if="filterBy === 'all'" class="is-active">Actus</p>
          </span>
          <span
            @click="sortBabbles('videos')"
            :class="{ 'is-active': filterBy === 'videos' }"
            class="navbar-item is-tab itemMenu"
          >
            <img
              loading="lazy"
              class="is-35"
              src="~assets/images/teams/soccervideo.png"
              alt="video"
            />
            <p v-if="filterBy === 'videos'">Vidéos</p>
          </span>

          <span
            @click="forum()"
            :class="{ 'is-active': filterBy === 'forum' }"
            class="navbar-item is-tab itemMenu"
          >
            <img
              loading="lazy"
              class="is-35 invertOk"
              src="~assets/images/teams/question-mark-9.png"
              alt="forum"
            />
            <p v-if="filterBy === 'forum'">Forum</p>
          </span>
          <span
            @click="podCasts()"
            :class="{ 'is-active': filterBy === 'podcast' }"
            class="navbar-item is-tab itemMenu"
          >
            <img
              loading="lazy"
              class="is-35"
              src="~assets/images/teams/podcast.png"
              alt="podcast"
            />
            <p v-if="filterBy === 'podcast'">podcasts</p>
          </span>
        </div>

        <i
          @click="refresh"
          class="pointer fa fa-refresh"
          aria-hidden="true"
        ></i>
      </nav>
      <nav v-if="mobile" class="navbar is-dark mobileOnly">
        <div class="mainMenu">
          <span @click="sortBabbles('all')" class="navbar-item is-tab itemMenu">
            <img
              loading="lazy"
              class="is-35"
              src="~assets/images/teams/rumour.png"
              alt="rumour"
            />
          </span>
          <span
            @click="sortBabbles('videos')"
            class="navbar-item is-tab itemMenu"
          >
            <img
              loading="lazy"
              class="is-35"
              src="~assets/images/teams/soccervideo.png"
              alt="video"
            />
          </span>

          <span @click="forum()" class="navbar-item is-tab itemMenu">
            <img
              loading="lazy"
              class="is-35 invertOk"
              src="~assets/images/teams/question-mark-9.png"
              alt="forum"
            />
          </span>
          <span @click="podCasts()" class="navbar-item is-tab itemMenu">
            <img
              loading="lazy"
              class="is-35"
              src="~assets/images/teams/podcast.png"
              alt="podcast"
            />
          </span>
        </div>
      </nav>
      <nav v-if="mobile" class="navbar is-dark subMenu mobileOnly">
        <div class="babblesMenu">
          <span v-if="filterBy === 'all'" class="babMenu">
            <img
              loading="lazy"
              class="is-30"
              src="~assets/images/teams/rumour.png"
              alt="rumour"
            />
            Actus
          </span>
          <span v-if="filterBy === 'forum'" class="babMenu">
            <img
              loading="lazy"
              class="is-30 invertOk"
              src="~assets/images/teams/question-mark-9.png"
              alt="forum"
            />
            Forum
          </span>
          <span v-if="filterBy === 'videos'" class="babMenu">
            <img
              loading="lazy"
              class="is-30"
              src="~assets/images/teams/soccervideo.png"
              alt="video"
            />
            Vidéos
          </span>
          <!-- <span  @click="sortBabbles('insidermates')" :class="{'is-active':filterBy ==='insidermates'}" class="babMenu ">{{langSelected==="EN"?"My Crew":"monCrew"}}</span> -->
          <span v-if="filterBy === 'podcast'" class="babMenu">
            <img
              loading="lazy"
              class="is-30"
              src="~assets/images/teams/podcast.png"
              alt="podcast"
            />
            Podcasts
          </span>
        </div>
        <i
          @click="refresh"
          class="pointer fa fa-refresh"
          aria-hidden="true"
        ></i>
      </nav>

      <div v-if="babbles && babbles.length > 0" class>
        <div class="babbles-box" id="babble-container">
          <div v-if="babbles[0] != 'empty'">
            <div v-for="(babble, index) in babbles" :key="index" class="box">
              <div v-if="babble.babbleImg" class="card-image imageChart">
                <button
                  v-if="babble.babbleVideo"
                  class="button is-medium is-pdf"
                >
                  <a :href="babble.babbleVideo">{{
                    langSelected === "EN"
                      ? "Download PDF."
                      : "Télécharger le PDF."
                  }}</a>
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
                  <img
                    loading="lazy"
                    :src="babble.babbleImg"
                    alt="Placeholder image"
                  />
                </figure>
              </div>

              <div
                v-if="!babble.babbleImg && babble.babbleVideo"
                class="card-image imageChart videoBabble"
              >
                <client-only>
                  <div>
                    <display-video :video="babble.babbleVideo"></display-video>
                  </div>
                </client-only>
              </div>

              <article class="media tweet">
                <figure class="media-left">
                  <div class="image is-64x64 is-circle">
                    <nuxt-link :to="'/dashboard/' + babble.user._id" class>
                      <img
                        loading="lazy"
                        class="imgProfile"
                        :src="babble.user.picProfile"
                        alt="Image"
                      />
                    </nuxt-link>
                  </div>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <div class="tweet-meta">
                      <strong class="usernameStong">
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
                    <h1
                      v-if="!babble.mp3Link && babble.title"
                      class="babbleTitle"
                    >
                      <code v-html="babble.title"></code>
                    </h1>
                    <div v-if="babble.babble && babble.babble.length < 300">
                      <h2
                        class="tweet-body has-text-grey babble-body"
                        v-html="addLinksToHttp(babble.babble)"
                      ></h2>
                      <small
                        class="titleBabble level-item has-text-grey-light"
                        v-if="babble.source"
                        >{{
                          langSelected === "EN" ? "read " : "lire la suite"
                        }}</small
                      >
                    </div>
                    <div
                      v-else-if="babble.babble && babble.babble.length >= 300"
                      class="see-more"
                    >
                      <h2
                        class="tweet-body has-text-grey babble-body1"
                        v-html="
                          addLinksToHttp(babble.babble).substring(0, 300) +
                          '...'
                        "
                      ></h2>
                      <strong class="has-text-grey">
                        <nuxt-link
                          :to="'/news/babble/' + babble._id"
                          class="level-item has-text-grey-light"
                          >{{
                            langSelected === "EN" ? "see more" : "voir plus"
                          }}</nuxt-link
                        >
                      </strong>
                    </div>
                    <div v-else-if="babble.mp3Link">
                      <h1
                        class="tweet-body has-text-grey babble-body"
                        v-html="addLinksToHttp(babble.title)"
                      ></h1>
                      <div class="lecteur-audio-pod">
                        <vue-plyr>
                          <audio>
                            <source :src="babble.mp3Link" />
                            Your browser does not support the audio element.
                          </audio>
                        </vue-plyr>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              <div v-if="babble.babble" class="replyBabble level-right">
                <nuxt-link
                  :to="'/news/babble/' + babble._id"
                  class="level-item has-text-grey-light"
                >
                  <div
                    v-if="babble.babbleReply.length > 0"
                    class="button is-large buttonBet"
                    type="button"
                  >
                    {{ langSelected === "EN" ? "See comments" : "polémique !" }}
                    <small class="favicon"
                      >&nbsp ({{ babble.babbleReply.length }})</small
                    >
                  </div>
                  <div v-else class="button is-large buttonBet" type="button">
                    {{ langSelected === "EN" ? "Comment" : "polémique ?" }}
                  </div>
                </nuxt-link>
              </div>
              <nav class="media-right foOt">
                <div class="level-left sociaSh has-text-grey-light">
                  <div v-if="babble.babble">
                    <ShareNetwork
                      network="facebook"
                      :url="'https://www.footfoot.co/news/babble/' + babble._id"
                      :title="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
                          : babble.babble
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
                          : babble.babble
                      "
                      hashtags="contest,football,pronos,news"
                      twitter-user="InsidersFoot"
                    >
                      <i class="fa fa-facebook">&nbsp &nbsp</i>
                    </ShareNetwork>
                    <ShareNetwork
                      network="twitter"
                      :url="'https://www.footfoot.co/news/babble/' + babble._id"
                      :title="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
                          : babble.babble
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
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
                      :url="'https://www.footfoot.co/news/babble/' + babble._id"
                      :title="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
                          : babble.babble
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
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
                      :url="'https://www.footfoot.co/news/babble/' + babble._id"
                      :title="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
                          : babble.babble
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
                          : babble.babble
                      "
                      hashtags="contest,football,pronos,news"
                      twitter-user="InsidersFoot"
                    >
                      <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                    </ShareNetwork>
                    <ShareNetwork
                      network="whatsapp"
                      :url="'https://www.footfoot.co/news/babble/' + babble._id"
                      :title="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
                          : babble.babble
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
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
                        'https://www.footfoot.co/news/babble/' + babble._id
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
                          : 'https://www.footfoot.co/teams/'
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
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
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
                          : 'https://www.footfoot.co/teams/'
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
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
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
                          : 'https://www.footfoot.co/teams/'
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
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
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
                          : 'https://www.footfoot.co/teams/'
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
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
                          : babble.babble
                      "
                      hashtags="contest,football,pronos,news"
                      twitter-user="InsidersFoot"
                    >
                      <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                    </ShareNetwork>
                    <ShareNetwork
                      network="whatsapp"
                      :url="
                        babble.teamLink.length === 0
                          ? 'https://www.footfoot.co'
                          : 'https://www.footfoot.co/teams/'
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
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="
                        babble.babble && babble.title
                          ? babble.title
                          : babble.meta
                          ? babble.meta
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
                          : 'https://www.footfoot.co/teams/'
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
                      $auth.user &&
                      $auth.user._id &&
                      connectedUser.role === 'admin'
                    "
                    class="plus-img invertOk"
                    src="~assets/images/plus.png"
                    alt="plus"
                  />

                  <nuxt-link
                    :to="'/news/babble/' + babble._id"
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
          <div v-if="babbles[0] === 'empty'" class="babble-container no-babble">
            <p v-if="filterBy === 'all'">...</p>
            <p v-if="filterBy === 'videos'">...</p>
            <p v-if="filterBy === 'podcast'">...</p>
          </div>
        </div>
      </div>
      <div v-if="forums" class="box">
        <div v-if="forums[0] != 'empty'">
          <div
            v-for="(forum, index) in forums"
            :key="index"
            class="box forumBox"
          >
            <h1 class="forumTitleH1">
              <figure v-if="forum.team.length > 0">
                <img
                  loading="lazy"
                  :class="{
                    invertOk: forum.team[0].teamName
                      .toUpperCase()
                      .includes('JUVE'),
                  }"
                  :src="forum.team[0].teamImg"
                  alt="team logo"
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
            <article v-if="forum.user" class="media">
              <div class="media-content">
                <div class="content">
                  <div v-if="forum.user" class="tweet-meta">
                    <strong class="usernameStong">
                      <nuxt-link :to="'/dashboard/' + forum.user._id" class>{{
                        forum.user.username
                      }}</nuxt-link>
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
                      <small class="media-right has-text-grey-light"></small>
                    </div>
                  </div>
                </div>
              </div>
            </article>

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
        <div v-if="forums[0] === 'empty'" class="babble-container no-babble">
          <p>...</p>
        </div>
      </div>
    </div>
    <div v-if="addTeamBabble">
      <b-modal
        :active.sync="addTeamBabbleModal"
        class="selectClubModal"
        :width="640"
      >
        <header class="modal-card-head">
          <h1 class="titleMessage">A quelle équipe ?</h1>
        </header>
        <section class="modal-card-body">
          <div class="media">
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
                      <span class="option__title">{{ props.option.name }}</span>
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
        <footer class="modal-card-foot okAddTeam">
          <button @click="saveTeam" class="button is-success checkOut">
            Ok
          </button>
        </footer>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { sendBabbleReply } from "@/server/api";
import { assignTeam } from "@/server/api";
import { deleteABbbles } from "@/server/api";
import { postLike } from "@/server/api";
import moment from "moment";

import Multiselect from "vue-multiselect";
import { searchTeam } from "@/server/apiSearch";

export default {
  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
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
      attachTeam: "",
    };
  },
  components: {
    displayVideo: () => import("@/components/modal/displayVideo"),
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
    babbles: [],
    forums: [],
    filterBy: "",
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.loadMore = this.loadMore + 1;
        setTimeout(() => {
          this.$emit("loadMore", this.loadMore);
        }, 1);
      }
    },
  },
  methods: {
    handleSuccess() {
      this.$buefy.dialog.alert("Le lien a été copié! Plus qu'à le partager 😋");
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
      assignTeam(
        this.addTeamBabble._id,
        this.attachTeam._id,
        this.attachTeam.shortName,
        this.addTeamBabble.babble
      ).then((data) => {
        this.$emit("changeBabbles");
        this.addTeamBabbleModal = false;
      });
    },
    addTeam(event) {
      this.addTeamBabble = event;
      this.addTeamBabbleModal = true;
    },

    bottomVisible() {
      let scrollY = window.scrollY;
      let visible =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      let pageHeight =
        window.scrollHeight || document.documentElement.scrollHeight;
      let bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    refresh() {
      if (!this.$nuxt.isOffline) {
        if (this.filterBy === "podcast") {
          this.$emit("podCast");
        } else if (this.filterBy === "forum") {
          this.$emit("forum");
        } else {
          this.$emit("sort", this.filterBy);
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
    sortBabbles(filterBy) {
      if (filterBy == "videos") {
        this.$router.push(`/videos`);
      } else {
        this.$router.push(`/`);
      }
    },
    podCasts() {
      this.$router.push(`/podcast`);
    },
    forum() {
      this.$router.push(`/forum`);
    },
    postBabble(modalBabble) {
      this.stop;
      sendBabbleReply(this.babbleText, modalBabble._id).then(() => {
        this.babbleText = "";
        this.isCardModalActive = false;
        this.$emit("changeBabbles");
      });
      //.catch(next);
    },

    ////Take into parameter a string and return the same string with HTML links
    ////Ex: "Hello #axa" => "Hello <a href='/team/axa'>#axas</a>"
    ////Optimisation => rajouter un event listener qui sera appeler au click et fera un push
    ////ou regarder doc dynamic compile router link
    ////addLinksToBabble(babbleString) {
    ////  return babbleString.replace(
    ////    /#(\w+)(\W|$)/g,
    ////    '<a href="/stocks/$1">#$1$2</a>'
    ////  );
    ////},
    addLinksToHttp(inputText) {
      var replacedText, replacePattern1, replacePattern2, replacePattern3;
      ////Take into parameter a string and return the same string with HTML links
      ////Ex: "Hello #axa" => "Hello <a href='/team/axa'>#axas</a>"
      inputText = inputText.replace(
        /////#(([a-zA-Z0-9\.])+@[a-zA-Z\_]+)(\W|$)/g,
        /#(\w+)(\W|$)/g,
        ////'<a href="/stocks/$1">#$1$2</a>'
        '<a href="/teams/$1">#$1 -</a>'
      );

      inputText = inputText.replace(/(?:\r\n|\r|\n)/g, "<br />");

      //URLs starting with http://, https://, or ftp://
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
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
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
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
.itemMenu {
  display: flex;
  margin: auto;
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
@media screen and (max-width: 768px) {
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
    margin: auto;
    padding: 0.5rem;
    font-size: 1rem !important;
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
  .level-right {
    display: flex;
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
