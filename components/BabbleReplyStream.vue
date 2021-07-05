<template>
  <section class="section sideRecent">
    <b-loading
      :is-full-page="true"
      :active.sync="loading"
      :canCancel="false"
    ></b-loading>

    <user-profile
      v-if="profileInfo"
      :filterBy="filterBy"
      @updateInsiderProfile="updateInsiderProfile"
      :profileInfo="profileInfo"
      @seePost="seePost()"
      @abonnement="abonnement"
      @abonne="abonne"
      @signup="signup"
    ></user-profile>
    <div class="primordial">
      <div class="sct1">
        <div class="column is-3 sci">
          <client-only>
            <side-current-insight
              v-if="$auth.user && $auth.user._id && !mobile"
              class="column is-12 sidect1"
              @changeWatchlist="updateWatchList($event)"
            ></side-current-insight>
            <side-current-insight-unconnect
              v-else-if="!mobile"
              @signup="SignupModal()"
              class="column is-12 sidect1"
            ></side-current-insight-unconnect>
          </client-only>
        </div>
        <div v-if="babble" class="babblesField column is-6">
          <div v-if="filterBy != 'abonnement' && filterBy != 'abonne'">
            <div
              class="swiper-container"
              v-swiper:myDirectiveSwiper="swiperOptions"
              @slide-next-transition-start="slideNextTransitionStart"
              @slide-prev-transition-start="slidePrevTransitionStart"
              @ready="onReady"
            >
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <babble-reply-stream-main
                    @showModal="showModal($event)"
                    @changeWatchlist="updateWatchList($event)"
                    @changeBabbles="updateTimelineBabble($event)"
                    :babble="babble"
                  ></babble-reply-stream-main>
                </div>
              </div>
            </div>
            <client-only>
              <div class="box replyBox">
                <div class="card-content bg-light">
                  <div class="displayUploadImage" v-if="uploadImage">
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
                          v-else-if="uploadVideo.toLowerCase().includes('.mp4')"
                        >
                          <video>
                            <source :src="uploadVideo" type="video/mp4" />
                          </video>
                        </vue-plyr>
                        <vue-plyr
                          v-else-if="uploadVideo.toLowerCase().includes('.ogg')"
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
                              uploadVideo.toLowerCase().includes('allfoot.') ||
                              uploadVideo.toLowerCase().includes('stream'))
                          "
                          class="video-wrap"
                        >
                          <vue-plyr>
                            <div class="plyr__video-embed">
                              <iframe
                                loading="lazy"
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
                                controls
                                crossorigin
                                allowfullscreen
                                allowtransparency
                              ></iframe>
                            </div>
                          </vue-plyr>
                        </div>
                        <vue-plyr
                          v-else-if="uploadVideo.toLowerCase().includes('mpd')"
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

                  <div class="media publishBabbles">
                    <div class="media-content">
                      <div>
                        <div class="fieldMain">
                          <div v-if="!uploadImage" class="imgIconWrapper">
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
                              :placeholder="
                                langSelected === 'EN'
                                  ? 'give your opinion...'
                                  : 'donne ton avis...'
                              "
                              ref="myTextarea"
                              v-model="babbleText"
                              :min-height="45"
                            />
                          </div>
                          <div
                            v-if="!progress"
                            @click="postBabble()"
                            class="sendIconWrapper"
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
                @ready="onReady"
              >
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <div
                      v-if="babbleSuggest && babbleSuggest.length > 0"
                      class="box"
                    >
                      <div>
                        <span class="title is-5">
                          {{
                            langSelected == "EN"
                              ? "more articles"
                              : "plus d'articles"
                          }}
                        </span>
                      </div>
                      <hr />
                      <div
                        v-for="(babble, index) in babbleSuggest"
                        :key="index"
                        class="box boxSuggest"
                      >
                        <nuxt-link
                          :to="'/news/babble/' + babble._id"
                          class="pointer"
                        >
                          <article class="media tweet">
                            <figure class="media-left suggest">
                              <div class="image is-30x30 is-circle">
                                <img
                                  loading="lazy"
                                  class="imgProfile"
                                  :src="
                                    babble.user.picProfile
                                      ? babble.user.picProfile
                                      : `~/assets/images/popplayer/${babble.user.initalPicture}.jpg`
                                  "
                                  alt="Image"
                                />
                              </div>
                            </figure>

                            <div class="tweet-meta">
                              <strong class="is-size-5">
                                {{ babble.user.username }}
                                <span class="icon is-medium">
                                  <img
                                    loading="lazy"
                                    v-if="babble.user.role === 'bot'"
                                    class="image is-15x15"
                                    src="~assets/images/verified.png"
                                  />
                                </span>
                              </strong>
                              <span
                                class="
                                  media-right
                                  has-text-grey-light
                                  is-size-7
                                "
                                itemprop="datePublished"
                                >{{
                                  moment(babble.created_at.toString())
                                    .local()
                                    .format("DD-MM-YYYY HH:mm")
                                }}</span
                              >
                            </div>
                          </article>
                          <div class="media-content">
                            <div class="content">
                              <div class="displayFlex">
                                <div
                                  v-if="!mobile && babble.babbleVideo"
                                  class="card-image imageChart desktopOnly"
                                >
                                  <figure class="image imageBabble">
                                    <img
                                      loading="lazy"
                                      class="alterPic"
                                      src="~assets/images/teams/soccervideo.png"
                                      alt="image"
                                    />
                                  </figure>
                                </div>
                                <div
                                  v-else-if="!mobile && babble.babbleImg"
                                  class="card-image imageChart desktopOnly"
                                >
                                  <figure class="image imageBabble">
                                    <img
                                      loading="lazy"
                                      class="smallImg"
                                      :src="babble.babbleImg"
                                      alt="image"
                                    />
                                  </figure>
                                </div>
                                <div
                                  v-else-if="!mobile"
                                  class="card-image imageChart desktopOnly"
                                >
                                  <figure class="image imageBabble">
                                    <img
                                      loading="lazy"
                                      class="alterPic"
                                      src="~assets/images/teams/rumour.png"
                                      alt="image"
                                    />
                                  </figure>
                                </div>
                                <div
                                  :class="{
                                    widthfull: babble.babbleImg,
                                    widthfullnoImg: !babble.babbleImg,
                                  }"
                                >
                                  <h2
                                    class="quill-code has-text-grey babble-body"
                                  >
                                    <div class="columnDir">
                                      <code
                                        v-if="babble.title"
                                        class="is-bold"
                                        v-html="`${babble.title}`"
                                      ></code>
                                      <code
                                        v-if="babble.babble"
                                        class="desktopOnly"
                                        v-html="
                                          `${
                                            babble.title
                                              ? babble.babble.slice(0, 120)
                                              : babble.babble.slice(0, 200)
                                          }...`
                                        "
                                      ></code>
                                      <span class="laSuite">...</span>
                                    </div>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <b-modal :active.sync="isShareVideoActive">
                <div class="modal-card" style="width: auto">
                  <header class="modal-card-head chartIcon titleVideo">
                    <i class="fa fa-link"></i>
                    &nbsp
                    {{
                      langSelected === "EN"
                        ? "Share your video"
                        : "Partage le lien"
                    }}
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
                    <button
                      class="button"
                      type="button"
                      @click="closeVideoBabble"
                    >
                      fermer
                    </button>
                    <button
                      id="babble-submit"
                      @click="okVideo()"
                      class="button is-outlined is-primary btn"
                    >
                      Ok
                    </button>
                  </footer>
                </div>
              </b-modal>
            </client-only>
          </div>
          <div
            v-if="
              (filterBy == 'abonnement' || filterBy == 'abonne') && babble.user
            "
          >
            <user-abo
              :filterBy="filterBy"
              :abonnementList="abonnementList"
              :abonneList="abonneList"
              :userId="babble.user._id"
            ></user-abo>
          </div>
        </div>

        <div v-if="!mobile" class="column is-3 sci">
          <match-inplay
            v-if="matches && matches.length > 0"
            @ligue="ligue($event)"
            class="column is-12 inPlayMatch"
          ></match-inplay>
          <side-next-affiche
            class="column is-12 sidect1"
            @ligue="ligue($event)"
          ></side-next-affiche>
        </div>
      </div>
    </div>
    <client-only>
      <div v-if="modalBabble" class="modalBoxNoPad">
        <b-modal :active.sync="isCardModalActiveComment">
          <div class="firstModalWrap box">
            <div class="box">
              <div v-if="modalBabble.babbleImg" class="card-image imageChart">
                <figure class="image imageBabble">
                  <img
                    loading="lazy"
                    :src="modalBabble.babbleImg"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div v-if="modalBabble.babbleVideo" class="card-image imageChart">
                <vue-plyr
                  v-if="modalBabble.babbleVideo.toLowerCase().includes('youtu')"
                >
                  <div class="plyr__video-embed">
                    <iframe
                      loading="lazy"
                      :src="
                        modalBabble.babbleVideo +
                        '?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1'
                      "
                      allowfullscreen
                      allowtransparency
                    ></iframe>
                  </div>
                </vue-plyr>
              </div>

              <article class="media">
                <figure class="media-left">
                  <div class="image is-64x64 is-circle">
                    <nuxt-link :to="'/dashboard/' + modalBabble.user" class>
                      <img
                        loading="lazy"
                        class="imgProfile"
                        :src="
                          modalBabble.picProfile
                            ? modalBabble.picProfile
                            : `~/assets/images/popplayer/${modalBabble.initalPicture}.jpg`
                        "
                        alt="Image"
                      />
                    </nuxt-link>
                  </div>
                </figure>
                <div class="tweet-meta">
                  <nuxt-link :to="'/dashboard/' + modalBabble.user" class>
                    <strong>{{ modalBabble.username }}</strong>
                  </nuxt-link>
                  <small class="media-right has-text-grey-light">{{
                    moment(modalBabble.created_at.toString())
                      .local()
                      .format("DD-MM-YYYY HH:mm")
                  }}</small>
                </div>
              </article>
              <div v-if="modalBabble.babble" class="media-content">
                <div class="content">
                  <h2 class="quill-code tweet-body has-text-grey babble-body">
                    <p
                      v-if="modalBabble.babble.includes('titlelinkChat')"
                      class="contestPost"
                      v-html="modalBabble.babble"
                    ></p>
                    <p v-else v-html="modalBabble.babble"></p>
                  </h2>
                </div>
              </div>
              <nav class="media-right foOt">
                <div class="level-left sociaSh has-text-grey-light">
                  <div>
                    <ShareNetwork
                      network="facebook"
                      :url="'https://www.footfoot.co/news/babble/' + babble._id"
                      :title="
                        modalBabble.babble.substring(0, 200) +
                        '... la suite sur'
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="modalBabble.babble"
                      hashtags="contest,football,pronos,news"
                      twitter-user="InsidersFoot"
                    >
                      <i class="fa fa-facebook">&nbsp &nbsp</i>
                    </ShareNetwork>
                    <ShareNetwork
                      network="twitter"
                      :url="'https://www.footfoot.co/news/babble/' + babble._id"
                      :title="
                        modalBabble.babble.substring(0, 200) +
                        '... la suite sur'
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="modalBabble.babble"
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
                        modalBabble.babble.substring(0, 200) +
                        '... la suite sur'
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="modalBabble.babble"
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
                        modalBabble.babble.substring(0, 200) +
                        '... la suite sur'
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="modalBabble.babble"
                      hashtags="contest,football,pronos,news"
                      twitter-user="InsidersFoot"
                    >
                      <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                    </ShareNetwork>
                    <ShareNetwork
                      network="whatsapp"
                      :url="'https://www.footfoot.co/news/babble/' + babble._id"
                      :title="
                        modalBabble.babble.substring(0, 200) +
                        '... la suite sur'
                      "
                      :description="
                        babble.babble && babble.meta
                          ? babble.meta.substring(0, 300) + '... la suite sur'
                          : babble.title
                          ? babble.title + '... la suite sur'
                          : babble.babble.substring(0, 300) + '... la suite sur'
                      "
                      :quote="modalBabble.babble"
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
                <div class="level-right">
                  <a class="likeModal level-item has-text-grey-light">
                    <span class="icon is-medium">
                      <img
                        loading="lazy"
                        class="clap"
                        src="~assets/images/comments.svg"
                      />
                    </span>
                    <small class="favicon">{{
                      modalBabble.reply.length
                    }}</small>
                  </a>
                  <a
                    @click="iLikeComment(modalBabble)"
                    class="level-item has-text-grey-light"
                  >
                    <span class="icon is-medium">
                      <img
                        loading="lazy"
                        class="clap"
                        src="~assets/images/clap.svg"
                      />
                    </span>
                    <small>{{ modalBabble.like.length }}</small>
                  </a>
                </div>
              </nav>
            </div>
            <div v-if="modalBabble.reply">
              <div
                v-for="(reply, index) in modalBabble.reply"
                :key="index"
                class="box"
              >
                <article class="media">
                  <figure class="media-left">
                    <div class="image is-64x64 is-circle">
                      <nuxt-link :to="'/dashboard/' + reply.user" class>
                        <img
                          loading="lazy"
                          class="imgProfile"
                          :src="
                            reply.picProfile
                              ? reply.picProfile
                              : `~/assets/images/popplayer/${reply.initalPicture}.jpg`
                          "
                          alt="Image"
                        />
                      </nuxt-link>
                    </div>
                  </figure>

                  <div class="tweet-meta">
                    <nuxt-link :to="'/dashboard/' + reply.user" class>
                      <strong>{{ reply.username }}</strong>
                    </nuxt-link>
                    <div>
                      <small class="media-right has-text-grey-light">{{
                        moment(reply.created_at)
                          .local()
                          .format("DD-MM-YYYY HH:mm")
                      }}</small>
                    </div>
                  </div>
                </article>
                <div v-if="reply.babble" class="media-content">
                  <div class="content">
                    <h2 class="quill-code tweet-body has-text-grey babble-body">
                      <div v-html="reply.babble"></div>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="box firstModalWrap">
            <div class="media publishBabbles">
              <div class="media-content">
                <div>
                  <div class="fieldMain">
                    <div v-if="!uploadImage" class="imgIconWrapper">
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
                      class="controlMain has-icons-right input-msg is-clearfix"
                    >
                      <textarea-autosize
                        class="
                          autoResizeTextareamain
                          sc-user-input--text
                          chatInstan
                        "
                        :placeholder="
                          langSelected === 'EN'
                            ? 'give your opinion...'
                            : 'donne ton avis...'
                        "
                        ref="myTextarea"
                        v-model="babbleTextreply"
                        :min-height="45"
                      />
                    </div>
                    <div
                      v-if="!progress"
                      @click="postReplyBabble(modalBabble)"
                      class="sendIconWrapper"
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
                </div>
              </div>
            </div>
          </div>
        </b-modal>
      </div>
    </client-only>
  </section>
</template>

<script>
import { sendFileToAws } from "@/server/apiContest";
import {
  sendBabbleReply,
  getRecentPosition,
  getABabble,
  getAbo,
  getBabblesSuggest,
  postLikeReply,
  sendBabbleReplyComment,
  donotDeleteAbabble,
} from "@/server/api";
import moment from "moment";
import { getInsiderProfileInfo } from "@/server/apiDashboard";

export default {
  auth: false,
  scrollToTop: true,
  async asyncData({ params }) {
    let [babble] = await Promise.all([getABabble(params.babble_id)]);
    return {
      babble: babble ? babble : "",
    };
  },
  head() {
    return {
      title: this.babble
        ? this.babble && this.babble.title
          ? this.babble.title
          : this.babble && this.babble.meta
          ? this.babble.meta.substring(0, 200)
          : this.babble.babble.substring(0, 200)
        : "Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Pour l'amour du foot",
      meta: [
        {
          hid: `description`,
          name: "description",
          content: this.babble
            ? this.babble && this.babble.meta
              ? this.babble.meta.substring(0, 200)
              : this.babble.babble.substring(0, 200)
            : "Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Pour l'amour du foot",
        },
        {
          hid: `keywords`,
          name: "keywords",
          keywords: this.babble
            ? this.babble && this.babble.title
              ? this.babble.title
              : this.babble && this.babble.meta
              ? this.babble.meta.substring(0, 200)
              : this.babble.babble.substring(0, 200)
            : "pronos, news, contest - Pour l'amour du foot",
        },
        {
          hid: `og:type`,
          property: "og:type",
          content: "article",
        },
        {
          hid: `og:title`,
          property: "og:title",
          content: this.babble
            ? this.babble && this.babble.title
              ? this.babble.title
              : this.babble && this.babble.meta
              ? this.babble.meta.substring(0, 200)
              : this.babble.babble.substring(0, 200)
            : "Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Pour l'amour du foot",
        },
        {
          hid: `og:url`,
          property: "og:url",
          content: "https://www.footfoot.co" + this.$route.fullPath,
        },

        {
          hid: this.babble && this.babble.babbleVideo ? `og:video` : ``,
          property: this.babble && this.babble.babbleVideo ? `og:video` : ``,
          content:
            this.babble &&
            this.babble.babbleVideo &&
            this.babble.babbleVideo.includes("youtu")
              ? `https://www.youtube.com/v/${this.babble.babbleVideo.slice(
                  -11
                )}`
              : this.babble && this.babble.babbleVideo
              ? this.babble.babbleVideo
              : "",
        },
        {
          hid: this.babble && this.babble.babbleVideo ? `og:video:type` : ``,
          property:
            this.babble && this.babble.babbleVideo ? `og:video:type` : ``,
          content:
            this.babble &&
            this.babble.babbleVideo &&
            this.babble.babbleVideo.includes("mp4")
              ? "video/mp4"
              : this.babble && this.babble.babbleVideo
              ? "application/x-shockwave-flash"
              : "",
        },
        {
          hid: this.babble && this.babble.babbleVideo ? `og:video:width` : ``,
          property:
            this.babble && this.babble.babbleVideo ? `og:video:width` : ``,
          content: this.babble && this.babble.babbleVideo ? "640" : "",
        },
        {
          hid: this.babble && this.babble.babbleVideo ? `og:video:height` : ``,
          property:
            this.babble && this.babble.babbleVideo ? `og:video:height` : ``,
          content: this.babble && this.babble.babbleVideo ? "385" : "",
        },
        {
          hid: `og:image`,
          property: `og:image`,
          content: this.babble
            ? this.babble.position
              ? this.babble.position
              : this.babble.babbleImg
              ? !this.babble.babbleImg.includes("base64")
                ? this.babble.babbleImg
                : "/icon.png"
              : "/icon.png"
            : "/icon.png",
        },

        {
          hid: `og:description`,
          property: "og:description",
          content: this.babble
            ? this.babble && this.babble.meta
              ? this.babble.meta.substring(0, 200)
              : this.babble.babble.substring(0, 200)
            : "Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Pour l'amour du foot",
        },
        {
          hid: `twitter:card`,
          name: `twitter:card`,
          property: "twitter:card",
          content: this.babble
            ? this.babble.babbleVideo != ""
              ? "player"
              : this.babble.babbleImg === ""
              ? "summary"
              : "summary_large_image"
            : "summary",
        },
        {
          hid: this.babble && this.babble.babbleVideo ? `twitter:player` : "",
          name: this.babble && this.babble.babbleVideo ? `twitter:player` : "",
          property:
            this.babble && this.babble.babbleVideo ? "twitter:player" : "",
          content:
            this.babble && this.babble.babbleVideo
              ? this.babble.babbleVideo
              : "",
        },
        {
          hid:
            this.babble && this.babble.babbleVideo
              ? `twitter:player:width`
              : "",
          name:
            this.babble && this.babble.babbleVideo
              ? `twitter:player:width`
              : "",
          property:
            this.babble && this.babble.babbleVideo
              ? "twitter:player:width"
              : "",
          content: this.babble && this.babble.babbleVideo ? "640" : "",
        },
        {
          hid:
            this.babble && this.babble.babbleVideo
              ? `twitter:player:height`
              : "",
          name:
            this.babble && this.babble.babbleVideo
              ? `twitter:player:height`
              : "",
          property:
            this.babble && this.babble.babbleVideo
              ? "twitter:player:height"
              : "",
          content: this.babble && this.babble.babbleVideo ? "385" : "",
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
          content: this.babble
            ? this.babble && this.babble.title
              ? this.babble.title
              : this.babble && this.babble.meta
              ? this.babble.meta.substring(0, 200)
              : this.babble.babble.substring(0, 200)
            : "Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Pour l'amour du foot",
        },
        {
          hid: `twitter:description`,
          name: `twitter:description`,
          property: "twitter:description",
          content: this.babble
            ? this.babble && this.babble.meta
              ? this.babble.meta.substring(0, 200)
              : this.babble.babble.substring(0, 200)
            : "Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Tout pour le football",
        },
        {
          hid: `twitter:image`,
          name: `twitter:image`,
          property: "twitter:image",
          content: this.babble
            ? this.babble.babbleImg
              ? !this.babble.babbleImg.includes("base64")
                ? this.babble.babbleImg
                : "/icon.png"
              : "/icon.png"
            : "/icon.png",
        },
      ],
    };
  },
  props: {},
  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      swiperOk: false,
      mobile: "",
      linkTitle: "",
      linkText: "",
      source: "",
      progress: "",
      uploadVideo: "",
      uploadImage: "",
      babbleReply: "",
      reply: "",
      loading: false,
      babbleImage: null,
      babbleUrl: "",
      isShareVideoActive: false,
      babbleVideo: "",
      postPost: false,
      babble: "",
      recentPositions: "",
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
      filterBy: "all",
      abonnementList: "",
      abonneList: "",
      profileInfo: "",
      modalBabble: "",
      babbleText: "",
      isCardModalActiveComment: false,
      babbleSuggest: "",
      babbleTextreply: "",
    };
  },
  jsonld() {
    return {
      "@context": "http://schema.org/",
      "@type": "NewsArticle",
      headline: this.babble
        ? this.babble && this.babble.title
          ? this.babble.title
          : this.babble.babble.substring(0, 200)
        : "Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Pour l'amour du foot",
      datePublished: this.babble ? this.babble.created_at : new Date(),
      description: this.babble
        ? this.babble && this.babble.meta
          ? this.babble.meta.substring(0, 200)
          : this.babble.babble.substring(0, 200)
        : "Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Pour l'amour du foot",
      image: {
        "@type": "ImageObject",

        url: this.babble
          ? this.babble.position
            ? this.babble.position
            : this.babble.babbleImg
            ? this.babble.babbleImg
            : "/icon.png"
          : "/icon.png",
      },
      author: this.babble ? this.babble.username : "footfoot",
      publisher: {
        "@type": "Organization",
        logo: {
          "@type": "ImageObject",
          url: "/icon.png",
        },
        name: "footfoot",
      },
      articleBody: this.babble
        ? this.babble.scrapHtml
          ? this.babble.scrapHtml
          : this.babble.scrap
          ? this.babble.scrap
          : this.babble.babble
        : "Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Pour l'amour du foot",
    };
  },
  components: {
    linkPreview: () => import("@/components/userpage/linkPreview"),
    videoLiveComp: () =>
      import("@/components/contest/ContestMain/videoLiveComp"),
    PlaceholderComponent: () =>
      import("@/components/contest/PlaceholderComponent"),
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
    userAbo: () => import("@/components/userpage/userAbo"),
    UserProfile: () => import("@/components/userpage/UserProfile"),
    SideNextAffiche: () =>
      import("@/components/side-component/SideNextAffiche"),
    SideCurrentInsight: () =>
      import("@/components/side-component/SideCurrentInsight"),
    SideCurrentInsightUnconnect: () =>
      import("@/components/side-component/SideCurrentInsightUnconnect"),
    BabbleReplyStreamMain: () =>
      import("@/components/side-component/BabbleReplyStreamMain"),

    MatchInplay: () => import("@/components/side-component/MatchInplay"),
  },
  computed: {
    matches() {
      return this.$store.state.var.matches;
    },
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  watch: {
    babbleText: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        let regex =
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        let validUrl = regex.test(this.babbleText);
        if (validUrl) {
          let startSlice = this.babbleText.indexOf("http");
          let prov = this.babbleText.slice(startSlice);
          let endSlice = prov.indexOf(" ");
          endSlice = endSlice > 1 ? endSlice : this.babbleText.length;
          prov = prov.slice(0, endSlice);
          this.uploadVideo = prov;
          this.$store.commit("var/maskBottomnav", true);
        }
      },
    },
    babble: {
      ////the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        setTimeout(() => {
          this.swiperOk = true;
        }, 1000);
        //getABabble(this.$route.params.babble_id).then((babble) => {
        if (this.babble) {
          this.mobile = this.$mobileDetect.mobile();
          this.loading = false;
          getInsiderProfileInfo(this.babble.user._id).then((profileInfo) => {
            if (!profileInfo) {
              this.$router.push("/notFound");
            } else {
              this.profileInfo = profileInfo;
            }
          });
          getAbo(this.babble.user._id).then((abo) => {
            if (abo.abonnements && abo.abonnements.length > 0) {
              this.abonnementList = abo.abonnements.sort((a, b) =>
                a.username.localeCompare(b.username)
              );
            }
            if (abo.abonnements && abo.abonnes.length > 0) {
              this.abonneList = abo.abonnes.sort((a, b) =>
                a.username.localeCompare(b.username)
              );
            }
          });
          if (this.$auth.user && this.$auth.user._id) {
          } else if (
            (this.babble.do_not_delete == false ||
              !this.babble.do_not_delete) &&
            this.babble.user._id != "5f3ecf7743eb1a0031d21948"
          ) {
            donotDeleteAbabble(this.babble._id).then((resp) => {});
          }
        }
        //	});
        getBabblesSuggest(this.$route.params.babble_id).then(
          (babbleSuggest) => {
            this.babbleSuggest = babbleSuggest;
          }
        );
      },
    },
  },
  methods: {
    handleSuccess() {
      this.$buefy.dialog.alert("Le lien a été copié! Plus qu'à le partager 😋");
    },
    onReady() {
      this.swiperOk = true;
    },
    ligue(ligue) {
      this.$store.commit("var/setNewValue", ligue);
    },
    problemLink() {
      this.babbleText = this.uploadVideo;
      this.uploadVideo = "";
      this.isShareVideoActive = false;
    },
    successLink(event) {
      this.babbleUrl = event.images ? event.images[0] : "";
      this.linkTitle = event.title ? event.title : "";
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
    okVideo() {
      this.isShareVideoActive = false;
    },
    shareVideo() {
      this.isShareVideoActive = true;
    },
    closeVideoBabble() {
      this.uploadVideo = "";
      this.isShareVideoActive = false;
    },
    createImage(file) {
      var uploadImage = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.uploadImage = e.target.result;
      };

      reader.readAsDataURL(file, 0);
    },
    async sendFile(file) {
      let formData = new FormData();
      formData.append("file", file);

      this.uploading = true;
      sendFileToAws(formData, {
        onUploadProgress: (e) => {
          this.progress = Math.round((e.loaded * 100) / e.total);
        },
      }).then((resp) => {
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
      });
    },
    transformToImg(event) {
      this.babbleUrl = event[0].toDataURL("image/jpeg");
    },
    removeImage: function (e) {
      this.uploadImage = "";
    },
    removeVideo: function (e) {
      this.uploadVideo = "";
    },
    postBabble() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        if (this.postPost === true) {
        } else {
          let textBabble;
          this.postPost = true;
          textBabble = this.babbleText
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
          textBabble = this.$sanitize(textBabble);
          this.addLinksToHttp(textBabble);

          if (this.source) {
            textBabble = textBabble
              ? `<span class="">${textBabble}</span>`
              : "";
            this.loading = true;
            let textosend;
            if (this.source.includes("footfoot.co")) {
              let slice = this.source.indexOf("footfoot.co") + 11;
              this.source = this.source.slice(slice);
              if (this.babbleUrl) {
                textosend = `<div class="lireSurReply box"><span class='displayFlex'><img src="${this.babbleUrl}" class='insideChatimg'/><span><p id="titlelinkChat">${this.linkTitle}</p><p id="subtitlelinkChat">${this.linkText}</p></span></span><a  href="${this.source}"><small class="titleBabble level-item">${this.source}</small></a></div>${textBabble}`;
              } else {
                textosend = `<div class="lireSurReply box"><span class='displayFlex'><span class="columnDirchat"><p id="titlelinkChat">${this.linkTitle}</p><p id="subtitlelinkChat">${this.linkText}</p></span></span><a  href="${this.source}"><small class="titleBabble level-item">${this.source}</small></a></div>${textBabble}`;
              }
            } else {
              if (this.babbleUrl) {
                textosend = `<div class="lireSurReply box"><span class='displayFlex'><img src="${this.babbleUrl}" class='insideChatimg'/><span><p id="titlelinkChat">${this.linkTitle}</p><p id="subtitlelinkChat">${this.linkText}</p></span></span><a target="_blank" href="${this.source}"><small class="titleBabble level-item">${this.source}</small></a></div>${textBabble}`;
              } else {
                textosend = `<div class="lireSurReply box"><span class='displayFlex'><span class="columnDirchat"><p id="titlelinkChat">${this.linkTitle}</p><p id="subtitlelinkChat">${this.linkText}</p></span></span><a target="_blank" href="${this.source}"><small class="titleBabble level-item">${this.source}</small></a></div>${textBabble}`;
              }
            }
            this.babbleUrl = "";
            sendBabbleReply(
              textosend,
              this.babble._id,
              this.babbleUrl,
              this.babbleVideo
            ).then((data) => {
              this.postPost = false;
              this.babbleText = "";
              this.uploadImage = "";
              this.uploadVideo = "";
              this.babbleUrl = "";
              this.babbleVideo = "";
              this.source = "";
              this.linkText = "";
              this.linkTitle = "";
              this.updateTimelineBabble();
            });
          } else {
            if (this.uploadImage && !this.babbleVideo) {
              this.babbleUrl = this.uploadImage;
              textBabble = textBabble + " ";
            }
            if (this.uploadImage && this.babbleVideo) {
              this.sendingPost = true;
              textBabble = textBabble + " ";
            } else if (this.uploadVideo) {
              this.babbleVideo = this.uploadVideo;
              textBabble = textBabble + " ";
            }
            if (textBabble.length > 0) {
              this.loading = true;
              sendBabbleReply(
                textBabble,
                this.babble._id,
                this.babbleUrl,
                this.babbleVideo
              ).then((data) => {
                this.postPost = false;
                this.babbleText = "";
                this.uploadImage = "";
                this.uploadVideo = "";
                this.babbleUrl = "";
                this.babbleVideo = "";
                this.source = "";
                this.linkText = "";
                this.linkTitle = "";
                this.updateTimelineBabble();
              });
            } else {
              this.postPost = false;
            }
          }
        }
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },
    postReplyBabble(modalBabble) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        this.babbleTextreply = this.$sanitize(this.babbleTextreply);
        this.addLinksToHttp(this.babbleTextreply);
        if (this.babbleTextreply) {
          if (this.postPost == false) {
            this.postPost = true;
            sendBabbleReplyComment(this.babbleTextreply, modalBabble._id).then(
              () => {
                this.babbleTextreply = "";
                this.isCardModalActiveComment = false;
                this.postPost = false;
                this.updateTimelineBabble();
              }
            );
          }
        }
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },
    showModal(babble) {
      this.modalBabble = babble;
      this.isCardModalActiveComment = true;
    },
    iLikeComment(reply) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        postLikeReply(reply._id).then(() => {
          this.updateTimelineBabble();
        });
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },
    updateInsiderProfile() {
      let insiderId = this.babble.user._id;
      getInsiderProfileInfo(insiderId).then((profileInfo) => {
        if (!profileInfo) {
          this.$router.push("/notFound");
        } else {
          this.profileInfo = profileInfo;
        }
      });
    },
    abonnement() {
      this.filterBy = "abonnement";
    },
    abonne() {
      this.filterBy = "abonne";
    },
    seePost() {
      this.filterBy = "all";
    },
    signup() {
      this.$router.push("/signup");
    },
    slideNextTransitionStart() {
      if (this.babbleSuggest && this.babbleSuggest.length > 0) {
        let link =
          this.babbleSuggest[0].teamLink.length > 0
            ? `/teams/${this.babbleSuggest[0].teamLink[0].shortName}/babble/${this.babbleSuggest[0]._id}`
            : "/news/babble/" + this.babbleSuggest[0]._id;
        this.$router.push(link);
      } else {
      }
    },

    slidePrevTransitionStart() {
      if (this.$route.path === "*") {
        this.$router.push(`/`);
      } else {
        this.$router.back();
      }
    },
    SignupModal() {
      this.$router.push("/signup");
    },
    updateWatchList() {
      this.fetchData();
    },
    updateTimelineBabble() {
      this.fetchData();
    },

    moment: function (time) {
      return moment(time);
    },
    addLinksToHttp(inputText) {
      var replacedText, replacePattern1, replacePattern2, replacePattern3;

      inputText = inputText.replace(/(?:\r\n|\r|\n)/g, "<br />");

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
    fetchData() {
      let shortName = this.$route.params.shortName;
      this.loading = true;
      getABabble(this.$route.params.babble_id).then((babble) => {
        if (babble) {
          this.babble = babble;
          this.loading = false;
          getInsiderProfileInfo(babble.user._id).then((profileInfo) => {
            if (!profileInfo) {
              this.$router.push("/notFound");
            } else {
              this.profileInfo = profileInfo;
            }
          });
          getAbo(babble.user._id).then((abo) => {
            if (abo.abonnements && abo.abonnements.length > 0) {
              this.abonnementList = abo.abonnements.sort((a, b) =>
                a.username.localeCompare(b.username)
              );
            }
            if (abo.abonnements && abo.abonnes.length > 0) {
              this.abonneList = abo.abonnes.sort((a, b) =>
                a.username.localeCompare(b.username)
              );
            }
          });
        } else {
          this.$router.push("/");
        }
      });
      getBabblesSuggest(this.$route.params.babble_id).then((babbleSuggest) => {
        this.babbleSuggest = babbleSuggest;
      });
    },
  },
  mounted() {
    if (process.client) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 1);
      if (!this.babble) {
        this.$router.push("/");
      }
    }
  },
};
</script>

<style scoped>
.publishBabbles > .media-content {
  padding: 0px !important;
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
.is-size-5 {
  font-size: 1rem !important;
}
.firstModalWrap > .box {
  margin-bottom: 0.75rem !important;
}
.boxSuggest {
  background-color: #eef1f7 !important;
}
.columnDir {
  display: flex;
  flex-direction: column;
}
.columnDir > code {
  background-color: #eef1f7 !important;
}
.suggest {
  margin-right: 0.5rem !important;
}
.is-15x15 {
  height: 15px;
  max-width: 25px;
}
.is-30x30 {
  height: 30px;
  max-width: 30px;
}
div {
  font-size: 1.2rem !important;
}
.is-sticky {
  position: sticky;
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
.firstModalWrap {
  background-color: #eef1f7;
}
.box {
  padding: 0.25rem;
}
.babblesField > div > .box {
  padding: 0.25rem !important;
  margin-top: 0.25rem !important;
}

.media-content {
  padding-top: 5px;
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

.displayUploadImage {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  align-items: flex-end;
}

.mdi-paperclip {
  color: #ff7d00 !important;
  font-size: 30px;
}

.fa-link {
  color: #ff7d00 !important;
  font-size: 30px;
}

.titleBabble {
  display: flex;
  justify-content: flex-end;
}

.options-img-video {
  padding-right: 15px;
}

.titleVideo {
  font-size: 1.2rem !important;
  font-weight: bold;
}

.fa-youtube {
  color: #ff0000 !important;
  font-size: 30px;
}

.containerYoutube1 {
  width: 100%;
  margin-top: 20px;
}

.containerYoutube2 {
  width: 100%;
}

.youtubeField {
  width: 100%;
  height: 70%;
  padding: 5px;
  font-size: 1.2rem;
  font-style: italic;
}

.fa-line-chart {
  font-size: 21px;
}

.chartIcon {
  width: 100%;
  display: flex;
  align-items: baseline;
  font-size: 0.85rem;
}

.level-right {
  width: 35%;
  margin: 0px !important;
}

.level-left {
  width: 60%;
  margin: 0px !important;
}

.level {
  display: flex;
  height: 3em;
  align-items: center;
  justify-content: space-between;
}

.mediaModal {
  background-color: #fff;
  padding: 5%;
  margin: 5%;
  border-radius: 5px;
  border: solid, #192b41;
}

.bg-light {
  background-color: #eef1f7;
}

.fa {
  text-align: center;
  vertical-align: top;
  color: #192b41;
}

.field1 {
  margin-bottom: 0.75rem !important;
}

.backFlux {
  display: none;
  cursor: pointer;
}

.fa-arrow-circle-left {
  font-size: 2rem;
}

#mainTitleBabble {
  display: none;
}

#userUsername {
  color: #192b41 !important;
}

#babbleMainCadre {
  background-color: #fff;
}

#babbleBodyMain {
  color: #192b41 !important;
}

.lireSurReply {
  color: #192b41 !important;
}

a {
  color: #192b41;
}

.content {
  margin-bottom: 0rem !important;
}

.p-x-1 {
  min-height: 9rem;
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
  justify-content: space-between;
  margin-left: 0rem !important;
  padding-bottom: 0rem;
}

.reply {
  height: 1.2rem;
}

.tweet-body {
  word-break: break-word;
}

.likeModal {
  cursor: initial !important;
}

.card-content {
  padding: 0.25rem;
}

.bg-light {
  background-color: #eef1f7;
}

.fa {
  text-align: center;
  vertical-align: top;
  color: #192b41;
}

.button {
  background-color: #192b41 !important;
  color: #fff !important;
  border-color: #192b41 !important;
}

.button:hover,
.button:focus {
  background-color: #fff !important;
  border-color: #192b41 !important;
  color: #192b41 !important;
}

.level-item {
  cursor: pointer;
}
.displayUploadImage {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  align-items: flex-end;
}
.is-fullwidth {
  margin-right: 5px;
}

.verified {
  height: 15px;
}

.replyBabble {
  cursor: pointer;
}

.babble-body {
  padding: 0rem !important;
}

.box > .tweet {
  padding: 0.25rem !important;
  padding-bottom: 0px !important;
}
.videoBabble {
  padding-bottom: 0px !important;
}
.modalBabble {
  margin-bottom: 0rem !important;
}
.widthfull {
  min-width: 75%;
}
.widthfull > .babble-body {
  margin-bottom: 0 !important;
}
.widthfullnoImg {
  min-width: 90%;
}
.widthfullnoImg > .babble-body {
  margin-bottom: 0 !important;
}
.alterPic {
  max-height: 55px;
  width: auto;
  max-width: 55px;
}
.buttonTelegram {
  padding-bottom: 0 !important;
  padding-top: 0 !important;
}
.mdi-telegram {
  color: #ff7d00 !important;
}
.mdi-telegram:before {
  max-height: 36px;
  display: flex;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .widthfullnoImg {
    min-width: 100%;
  }
  .alterPic {
    max-height: 35px;
    width: auto;
  }
  .level-right {
    display: flex;
    margin-top: 0rem;
  }

  .backFlux {
    display: block;
  }

  h1 {
    font-size: 0.8rem !important;
  }

  h2 {
    font-size: 0.8rem !important;
  }

  #mainTitleBabble {
    align-self: center;
    display: flex;
    justify-content: space-between;
  }

  .media-right {
    font-size: 0.8rem;
  }

  .usernameStong {
    font-size: 0.9rem;
  }

  .field:not(:last-child) {
    margin-bottom: 0rem !important;
    margin-top: 0rem !important;
    padding-right: 0px;
  }

  .is-5 {
    font-size: 1rem !important;
  }

  .retourFlux {
    display: none;
  }

  .p-x-1 {
    min-height: 0rem;
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
    margin-right: 10px;
  }

  .icon {
    font-size: 0.8rem;
  }

  .level-left + .level-right {
    margin-top: 0px !important;
  }

  .levelchartIcon {
    display: flex !important;
    align-items: center !important;
  }

  .level-left {
    display: flex;
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

  .text-img-options {
    display: none;
  }

  .level-left {
    display: flex;
  }

  .field1 {
    margin-bottom: 0.75rem !important;
    margin-top: 0.75rem !important;
    padding-right: 5px;
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

  .chartIcon {
    justify-content: baseline !important;
  }

  .primordial {
    margin-top: 0.5rem !important;
  }
  .sct1 {
    max-width: 100%;
    flex-direction: column;
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
</style>