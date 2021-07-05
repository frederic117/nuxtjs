<template>
  <div v-if="team && babble">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :canCancel="false"
    ></b-loading>
    <div class="babbles-box">
      <div id="babbleMainCadre" class="box">
        <div v-if="babble.babbleImg" class="card-image imageChart">
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
                    :src="babble.mp3Link ? babble.mp3Link : babble.babbleVideo"
                  />
                  Your browser does not support the audio element.
                </audio>
              </vue-plyr>
            </div>
            <div v-else>
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
          <p class="tweet-meta">
            <strong class="usernameStong">
              <nuxt-link
                :to="'/dashboard/' + babble.user._id"
                id="userUsername"
                >{{ babble.user.username }}</nuxt-link
              >
              <span class="icon is-medium">
                <img
                  loading="lazy"
                  v-if="babble.user.role === 'bot'"
                  class="verified"
                  src="~assets/images/verified.png"
                />
              </span>
            </strong>
            <small class="media-right has-text-grey-light">{{
              moment(babble.created_at.toString())
                .local()
                .format("DD-MM-YYYY HH:mm")
            }}</small>
          </p>
        </article>
        <div class="media-content">
          <div class="content">
            <div class="tagBabblesWrapper">
              <div class="tagWrapper">
                <nuxt-link :to="`/teams/${team.shortName}/songs`">
                  <figure type="button" class="imgTeamLink">
                    <img
                      loading="lazy"
                      :class="{
                        invertOk: team.shortName.toUpperCase().includes('JUVE'),
                      }"
                      :src="team.teamImg"
                      :alt="team.shortName"
                    />
                  </figure>
                </nuxt-link>
              </div>
            </div>

            <h1 v-if="!babble.mp3Link && babble.title" class="babbleTitle">
              <code v-html="babble.title"></code>
            </h1>
            <h2 class="quill-code tweet-body has-text-grey babble-body">
              <code v-html="babble.babble"></code>
            </h2>

            <small
              v-if="babble.source"
              class="titleBabble level-item has-text-grey-light"
            >
              <a class="lireSurReply" target="_blank" :href="babble.source">{{
                langSelected === "EN" ? "read " : "lire la suite"
              }}</a>
            </small>
          </div>
          <br />
          <nav class="media-right foOt">
            <div class="level-left sociaSh has-text-grey-light">
              <div>
                <ShareNetwork
                  network="facebook"
                  :url="
                    'https://www.footfoot.co/teams/' +
                    team.shortName +
                    '/song/' +
                    babble.title
                      .replace(' ?', '')
                      .split(' ')
                      .join('-')
                      .replace(/\s/g, '') +
                    '/' +
                    babble._id
                  "
                  :title="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :description="
                    babble.babble.substring(0, 300) + '... la suite sur'
                  "
                  :quote="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :hashtags="
                    team.shortName + 'football,thisIsMusic,chantsDeSupporters'
                  "
                  twitter-user="InsidersFoot"
                >
                  <i class="fa fa-facebook">&nbsp &nbsp</i>
                </ShareNetwork>
                <ShareNetwork
                  network="twitter"
                  :url="
                    'https://www.footfoot.co/teams/' +
                    team.shortName +
                    '/song/' +
                    babble.title
                      .replace(' ?', '')
                      .split(' ')
                      .join('-')
                      .replace(/\s/g, '') +
                    '/' +
                    babble._id
                  "
                  :title="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :description="
                    babble.babble.substring(0, 300) + '... la suite sur'
                  "
                  :quote="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :hashtags="
                    team.shortName + 'football,thisIsMusic,chantsDeSupporters'
                  "
                  twitter-user="InsidersFoot"
                >
                  <i class="fa fa-twitter">&nbsp &nbsp</i>
                </ShareNetwork>

                <ShareNetwork
                  network="sms"
                  class="mobileOnly"
                  :url="
                    'https://www.footfoot.co/teams/' +
                    team.shortName +
                    '/song/' +
                    babble.title
                      .replace(' ?', '')
                      .split(' ')
                      .join('-')
                      .replace(/\s/g, '') +
                    '/' +
                    babble._id
                  "
                  :title="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :description="
                    babble.babble.substring(0, 300) + '... la suite sur'
                  "
                  :quote="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :hashtags="
                    team.shortName + 'football,thisIsMusic,chantsDeSupporters'
                  "
                  twitter-user="InsidersFoot"
                >
                  <i class="far fa-comment-dots">&nbsp &nbsp</i>
                </ShareNetwork>

                <ShareNetwork
                  network="messenger"
                  class="mobileOnly"
                  :url="
                    'https://www.footfoot.co/teams/' +
                    team.shortName +
                    '/song/' +
                    babble.title
                      .replace(' ?', '')
                      .split(' ')
                      .join('-')
                      .replace(/\s/g, '') +
                    '/' +
                    babble._id
                  "
                  :title="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :description="
                    babble.babble.substring(0, 300) + '... la suite sur'
                  "
                  :quote="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :hashtags="
                    team.shortName + 'football,thisIsMusic,chantsDeSupporters'
                  "
                  twitter-user="InsidersFoot"
                >
                  <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                </ShareNetwork>
                <ShareNetwork
                  network="whatsapp"
                  :url="
                    'https://www.footfoot.co/teams/' +
                    team.shortName +
                    '/song/' +
                    babble.title
                      .replace(' ?', '')
                      .split(' ')
                      .join('-')
                      .replace(/\s/g, '') +
                    '/' +
                    babble._id
                  "
                  :title="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :description="
                    babble.babble.substring(0, 300) + '... la suite sur'
                  "
                  :quote="
                    babble.babble && babble.title ? babble.title : babble.babble
                  "
                  :hashtags="
                    team.shortName + 'football,thisIsMusic,chantsDeSupporters'
                  "
                  twitter-user="InsidersFoot"
                >
                  <i class="fa fa-whatsapp">&nbsp &nbsp</i>
                </ShareNetwork>
                <a
                  class="pointer"
                  v-clipboard:success="handleSuccess"
                  v-clipboard="
                    'https://www.footfoot.co/teams/' +
                    team.shortName +
                    '/song/' +
                    babble.title
                      .replace(' ?', '')
                      .split(' ')
                      .join('-')
                      .replace(/\s/g, '') +
                    '/' +
                    babble._id
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
                    alt="comments"
                  />
                </span>
                <small class="favicon has-text-grey-light">{{
                  babble.babbleReply.length
                }}</small>
              </a>
              <a @click="iLike(babble)" class="level-item has-text-grey-light">
                <span class="icon is-medium">
                  <img
                    loading="lazy"
                    class="clap"
                    src="~assets/images/clap.svg"
                  />
                </span>
                <small class="has-text-grey-light">{{
                  babble.like.length
                }}</small>
              </a>
            </div>
          </nav>
        </div>
      </div>
      <div v-if="babble.babbleReply">
        <div
          v-for="(reply, index) in babble.babbleReply"
          :key="index"
          class="box"
        >
          <div v-if="reply.babbleImg" class="card-image imageChart">
            <button v-if="reply.babbleVideo" class="button is-medium is-pdf">
              <a class="colorWhite" :href="reply.babbleVideo">{{
                langSelected === "EN" ? "Download PDF." : "Télécharger le PDF."
              }}</a>
            </button>
            <a v-if="reply.babbleVideo" :href="reply.babbleVideo">
              <figure class="image imageBabble">
                <img
                  loading="lazy"
                  :src="reply.babbleImg"
                  alt="Placeholder image"
                />
              </figure>
            </a>
            <figure v-else class="image imageBabble">
              <img
                loading="lazy"
                :src="reply.babbleImg"
                alt="Placeholder image"
              />
            </figure>
          </div>

          <div
            v-if="!reply.babbleImg && reply.babbleVideo"
            class="card-image imageChart videoBabble"
          >
            <client-only>
              <div>
                <display-video :video="reply.babbleVideo"></display-video>
              </div>
            </client-only>
          </div>
          <article class="media">
            <figure class="media-left">
              <div class="image is-64x64 is-circle">
                <nuxt-link :to="'/dashboard/' + reply.user" class>
                  <img
                    loading="lazy"
                    class="imgProfile"
                    :src="reply.picProfile"
                    alt="Image"
                  />
                </nuxt-link>
              </div>
            </figure>
            <div class="tweet-meta">
              <nuxt-link :to="'/dashboard/' + reply.user" class>
                <strong>{{ reply.username }}</strong>
              </nuxt-link>
              <small class="media-right has-text-grey-light">{{
                moment(reply.created_at).local().format("DD-MM-YYYY HH:mm")
              }}</small>
            </div>
          </article>
          <div class="media-content">
            <div class="content">
              <h2 class="quill-code tweet-body has-text-grey babble-body">
                <p
                  v-if="reply.babble.includes('titlelinkChat')"
                  class="contestPost"
                  v-html="reply.babble"
                ></p>
                <p v-else v-html="reply.babble"></p>
              </h2>
            </div>
            <nav class="media-right foOt">
              <div class="level-left sociaSh has-text-grey-light">
                <div>
                  <ShareNetwork
                    network="facebook"
                    :url="
                      'https://www.footfoot.co/teams/' +
                      team.shortName +
                      '/song/' +
                      babble.title
                        .replace(' ?', '')
                        .split(' ')
                        .join('-')
                        .replace(/\s/g, '') +
                      '/' +
                      babble._id
                    "
                    :title="reply.babble"
                    :description="
                      babble.babble.substring(0, 300) + '... la suite sur'
                    "
                    :quote="reply.babble"
                    :hashtags="
                      team.shortName + 'football,thisIsMusic,chantsDeSupporters'
                    "
                    twitter-user="InsidersFoot"
                  >
                    <i class="fa fa-facebook">&nbsp &nbsp</i>
                  </ShareNetwork>
                  <ShareNetwork
                    network="twitter"
                    :url="
                      'https://www.footfoot.co/teams/' +
                      team.shortName +
                      '/song/' +
                      babble.title
                        .replace(' ?', '')
                        .split(' ')
                        .join('-')
                        .replace(/\s/g, '') +
                      '/' +
                      babble._id
                    "
                    :title="reply.babble"
                    :description="
                      babble.babble.substring(0, 300) + '... la suite sur'
                    "
                    :quote="reply.babble"
                    :hashtags="
                      team.shortName + 'football,thisIsMusic,chantsDeSupporters'
                    "
                    twitter-user="InsidersFoot"
                  >
                    <i class="fa fa-twitter">&nbsp &nbsp</i>
                  </ShareNetwork>

                  <ShareNetwork
                    network="sms"
                    class="mobileOnly"
                    :url="
                      'https://www.footfoot.co/teams/' +
                      team.shortName +
                      '/song/' +
                      babble.title
                        .replace(' ?', '')
                        .split(' ')
                        .join('-')
                        .replace(/\s/g, '') +
                      '/' +
                      babble._id
                    "
                    :title="reply.babble"
                    :description="
                      babble.babble.substring(0, 300) + '... la suite sur'
                    "
                    :quote="reply.babble"
                    :hashtags="
                      team.shortName + 'football,thisIsMusic,chantsDeSupporters'
                    "
                    twitter-user="InsidersFoot"
                  >
                    <i class="far fa-comment-dots">&nbsp &nbsp</i>
                  </ShareNetwork>

                  <ShareNetwork
                    network="messenger"
                    class="mobileOnly"
                    :url="
                      'https://www.footfoot.co/teams/' +
                      team.shortName +
                      '/song/' +
                      babble.title
                        .replace(' ?', '')
                        .split(' ')
                        .join('-')
                        .replace(/\s/g, '') +
                      '/' +
                      babble._id
                    "
                    :title="reply.babble"
                    :description="
                      babble.babble.substring(0, 300) + '... la suite sur'
                    "
                    :quote="reply.babble"
                    :hashtags="
                      team.shortName + 'football,thisIsMusic,chantsDeSupporters'
                    "
                    twitter-user="InsidersFoot"
                  >
                    <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                  </ShareNetwork>
                  <ShareNetwork
                    network="whatsapp"
                    :url="
                      'https://www.footfoot.co/teams/' +
                      team.shortName +
                      '/song/' +
                      babble.title
                        .replace(' ?', '')
                        .split(' ')
                        .join('-')
                        .replace(/\s/g, '') +
                      '/' +
                      babble._id
                    "
                    :title="reply.babble"
                    :description="
                      babble.babble.substring(0, 300) + '... la suite sur'
                    "
                    :quote="reply.babble"
                    :hashtags="
                      team.shortName + 'football,thisIsMusic,chantsDeSupporters'
                    "
                    twitter-user="InsidersFoot"
                  >
                    <i class="fa fa-whatsapp">&nbsp &nbsp</i>
                  </ShareNetwork>
                  <a
                    class="pointer"
                    v-clipboard:success="handleSuccess"
                    v-clipboard="
                      'https://www.footfoot.co/teams/' +
                      team.shortName +
                      '/song/' +
                      babble.title
                        .replace(' ?', '')
                        .split(' ')
                        .join('-')
                        .replace(/\s/g, '') +
                      '/' +
                      babble._id
                    "
                    type="button"
                  >
                    <i class="fa fas fa-copy"></i
                  ></a>
                </div>
              </div>
              <div class="replyBabble level-right">
                <a
                  @click="showModal(reply)"
                  class="level-item has-text-grey-light"
                >
                  <span class="icon is-medium">
                    <img
                      loading="lazy"
                      class="clap"
                      src="~assets/images/comments.svg"
                    />
                  </span>
                  <small class="favicon">{{ reply.reply.length }}</small>
                </a>

                <a
                  @click="iLikeComment(reply)"
                  class="level-item has-text-grey-light"
                >
                  <span class="icon is-medium">
                    <img
                      loading="lazy"
                      class="clap"
                      src="~assets/images/clap.svg"
                    />
                  </span>
                  <small>{{ reply.like.length }}</small>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div class="box">
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
            <div v-if="uploadVideo" class="card-image imageChart videoBabble">
              <vue-plyr
                v-if="uploadVideo.toLowerCase().includes('sporttube.com/embed')"
              >
                <video>
                  <source
                    :src="
                      uploadVideo.replace(
                        'https://cc.sporttube.com/embed/',
                        'https://vc.sporttube.com/video/' +
                          moment().format('YYYY/M/D').replace('/-/g', '/') +
                          '/'
                      ) + '.mp4'
                    "
                    type="video/mp4"
                  />
                </video>
              </vue-plyr>
              <vue-plyr
                v-else-if="uploadVideo.toLowerCase().includes('embed00')"
              >
                <div class="plyr__video-embed">
                  <iframe
                    loading="lazy"
                    :src="uploadVideo.replace('.mp4', '')"
                    allowfullscreen
                    allowtransparency
                  ></iframe>
                </div>
              </vue-plyr>
              <vue-plyr v-else-if="uploadVideo.toLowerCase().includes('youtu')">
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
              <vue-plyr v-else-if="uploadVideo.toLowerCase().includes('.mp4')">
                <video>
                  <source :src="uploadVideo" type="video/mp4" />
                </video>
              </vue-plyr>
              <vue-plyr v-else-if="uploadVideo.toLowerCase().includes('.ogg')">
                <video>
                  <source :src="uploadVideo" type="video/ogg" />
                </video>
              </vue-plyr>
              <vue-plyr v-else-if="uploadVideo.toLowerCase().includes('.webm')">
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
                              .replace('autoplay=true', 'autoplay=false')
                              .replace('autoplay-mute=1', 'autoplay-mute=0')
                          : uploadVideo
                              .replace('autoplay=true', 'autoplay=false')
                              .replace('autoplay-mute=1', 'autoplay-mute=0')
                      "
                      controls
                      crossorigin
                      allowfullscreen
                      allowtransparency
                    ></iframe>
                  </div>
                </vue-plyr>
              </div>
              <vue-plyr v-else-if="uploadVideo.toLowerCase().includes('mpd')">
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
        <div class="media">
          <div class="media-content">
            <div>
              <div class="field">
                <div class="control">
                  <textarea-autosize
                    class="autoResizeTextarea textearea"
                    placeholder="Participer à la discussion..."
                    ref="myTextarea"
                    v-model="babbleText"
                    :min-height="10"
                    :max-height="1000"
                  />
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
                  <a v-if="!uploadImage" class="has-text-grey-light">
                    <span @click="shareVideo()" class="chartIcon pointer">
                      <i class="fa fa-link"></i>
                    </span>
                  </a>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <button
                      id="babble-submit"
                      @click="postBabble()"
                      class="button is-contest"
                    >
                      <i class="mdi mdi-telegram mdi-36px"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div v-else-if="!progress" class="level">
                <button
                  id="babble-submit"
                  @click="postBabble()"
                  class="button is-medium is-fullwidth is-contest"
                >
                  <i class="mdi mdi-telegram mdi-36px"></i>
                </button>
              </div>
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
          <button class="button" type="button" @click="closeVideoBabble">
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
            <div
              v-if="!modalBabble.babbleImg && modalBabble.babbleVideo"
              class="card-image imageChart videoBabble"
            >
              <div>
                <display-video :video="modalBabble.babbleVideo"></display-video>
              </div>
            </div>

            <article class="media">
              <figure class="media-left">
                <div class="image is-64x64 is-circle">
                  <nuxt-link :to="'/dashboard/' + modalBabble.user" class>
                    <img
                      loading="lazy"
                      class="imgProfile"
                      :src="modalBabble.picProfile"
                      alt="Image"
                    />
                  </nuxt-link>
                </div>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p class="tweet-meta">
                    <nuxt-link :to="'/dashboard/' + modalBabble.user" class>
                      <strong>{{ modalBabble.username }}</strong>
                    </nuxt-link>
                    <small class="media-right has-text-grey-light">{{
                      moment(modalBabble.created_at.toString())
                        .local()
                        .format("DD-MM-YYYY HH:mm")
                    }}</small>
                  </p>
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
                        :url="
                          'https://www.footfoot.co/teams/' +
                          team.shortName +
                          '/song/' +
                          babble.title
                            .replace(' ?', '')
                            .split(' ')
                            .join('-')
                            .replace(/\s/g, '') +
                          '/' +
                          babble._id
                        "
                        :title="
                          modalBabble.babble.substring(0, 200) +
                          '... la suite sur'
                        "
                        :description="modalBabble.babble"
                        :quote="modalBabble.babble"
                        :hashtags="
                          team.shortName +
                          'football,thisIsMusic,chantsDeSupporters'
                        "
                        twitter-user="InsidersFoot"
                      >
                        <i class="fa fa-facebook">&nbsp &nbsp</i>
                      </ShareNetwork>
                      <ShareNetwork
                        network="twitter"
                        :url="
                          'https://www.footfoot.co/teams/' +
                          team.shortName +
                          '/song/' +
                          babble.title
                            .replace(' ?', '')
                            .split(' ')
                            .join('-')
                            .replace(/\s/g, '') +
                          '/' +
                          babble._id
                        "
                        :title="
                          modalBabble.babble.substring(0, 200) +
                          '... la suite sur'
                        "
                        :description="modalBabble.babble"
                        :quote="modalBabble.babble"
                        :hashtags="
                          team.shortName +
                          'football,thisIsMusic,chantsDeSupporters'
                        "
                        twitter-user="InsidersFoot"
                      >
                        <i class="fa fa-twitter">&nbsp &nbsp</i>
                      </ShareNetwork>

                      <ShareNetwork
                        network="sms"
                        class="mobileOnly"
                        :url="
                          'https://www.footfoot.co/teams/' +
                          team.shortName +
                          '/song/' +
                          babble.title
                            .replace(' ?', '')
                            .split(' ')
                            .join('-')
                            .replace(/\s/g, '') +
                          '/' +
                          babble._id
                        "
                        :title="
                          modalBabble.babble.substring(0, 200) +
                          '... la suite sur'
                        "
                        :description="modalBabble.babble"
                        :quote="modalBabble.babble"
                        :hashtags="
                          team.shortName +
                          'football,thisIsMusic,chantsDeSupporters'
                        "
                        twitter-user="InsidersFoot"
                      >
                        <i class="far fa-comment-dots">&nbsp &nbsp</i>
                      </ShareNetwork>

                      <ShareNetwork
                        network="messenger"
                        class="mobileOnly"
                        :url="
                          'https://www.footfoot.co/teams/' +
                          team.shortName +
                          '/song/' +
                          babble.title
                            .replace(' ?', '')
                            .split(' ')
                            .join('-')
                            .replace(/\s/g, '') +
                          '/' +
                          babble._id
                        "
                        :title="
                          modalBabble.babble.substring(0, 200) +
                          '... la suite sur'
                        "
                        :description="modalBabble.babble"
                        :quote="modalBabble.babble"
                        :hashtags="
                          team.shortName +
                          'football,thisIsMusic,chantsDeSupporters'
                        "
                        twitter-user="InsidersFoot"
                      >
                        <i class="fab fa-facebook-messenger">&nbsp &nbsp</i>
                      </ShareNetwork>
                      <ShareNetwork
                        network="whatsapp"
                        :url="
                          'https://www.footfoot.co/teams/' +
                          team.shortName +
                          '/song/' +
                          babble.title
                            .replace(' ?', '')
                            .split(' ')
                            .join('-')
                            .replace(/\s/g, '') +
                          '/' +
                          babble._id
                        "
                        :title="
                          modalBabble.babble.substring(0, 200) +
                          '... la suite sur'
                        "
                        :description="modalBabble.babble"
                        :quote="modalBabble.babble"
                        :hashtags="
                          team.shortName +
                          'football,thisIsMusic,chantsDeSupporters'
                        "
                        twitter-user="InsidersFoot"
                      >
                        <i class="fa fa-whatsapp">&nbsp &nbsp</i>
                      </ShareNetwork>
                      <a
                        class="pointer"
                        v-clipboard:success="handleSuccess"
                        v-clipboard="
                          'https://www.footfoot.co/teams/' +
                          team.shortName +
                          '/song/' +
                          babble.title
                            .replace(' ?', '')
                            .split(' ')
                            .join('-')
                            .replace(/\s/g, '') +
                          '/' +
                          babble._id
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
                      @click="iLikeComment(reply)"
                      class="level-item has-text-grey-light"
                    >
                      <span class="icon is-medium">
                        <img
                          loading="lazy"
                          class="clap"
                          src="~assets/images/clap.svg"
                        />
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
            </article>
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
                        :src="reply.picProfile"
                        alt="Image"
                      />
                    </nuxt-link>
                    <!-- <img loading="lazy"v-if="reply.position==='bear'" src="~assets/images/BearPositionBabbleBlur.png" alt="BearPositionBabble"> -->
                    <!-- <img loading="lazy"v-if="reply.position==='bull'" src="~assets/images/BullPositionBabbleBlur.png" alt="BullPositionBabble"> -->
                  </div>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p class="tweet-meta">
                      <nuxt-link :to="'/dashboard/' + reply.user" class>
                        <strong>{{ reply.username }}</strong>
                      </nuxt-link>
                      <small class="media-right has-text-grey-light">{{
                        moment(reply.created_at)
                          .local()
                          .format("DD-MM-YYYY HH:mm")
                      }}</small>
                    </p>
                    <h2 class="quill-code tweet-body has-text-grey babble-body">
                      <code v-html="reply.babble"></code>
                    </h2>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div class="box firstModalWrap">
          <div class="media">
            <div class="media-left">
              <figure
                v-if="$auth.user && $auth.user._id"
                class="image imageModal is-64x64 is-circle"
              >
                <img
                  loading="lazy"
                  class="imgProfile"
                  :src="connectedUser.picProfile"
                  alt="Image"
                />
              </figure>
            </div>
            <div class="media-content">
              <div>
                <div class="field">
                  <div class="control">
                    <textarea-autosize
                      class="autoResizeTextarea textearea"
                      placeholder="Participer à la discussion..."
                      ref="myTextarea"
                      v-model="babbleText"
                      :min-height="10"
                      :max-height="1000"
                    />
                  </div>
                </div>
                <div class="level levelchartIcon">
                  <div class="level-left leftchartIcon"></div>
                  <div class="level-right rightchartIcon">
                    <div class="level-item">
                      <button
                        id="babble-submit"
                        @click="postReplyBabble(modalBabble)"
                        class="button is-outlined is-primary"
                      >
                        <i class="mdi mdi-telegram mdi-36px"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import {
  sendSongReply,
  postLikeReply,
  sendBabbleReplyComment,
  postLike,
} from "@/server/api";
import moment from "moment";

import { sendFileToAws } from "@/server/apiContest";
export default {
  components: {
    videoLiveComp: () =>
      import("@/components/contest/ContestMain/videoLiveComp"),
    displayVideo: () => import("@/components/modal/displayVideo"),
    linkPreview: () => import("@/components/userpage/linkPreview"),

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
  },
  data() {
    return {
      isLoading: false,
      linkTitle: "",
      linkText: "",
      source: "",
      progress: "",
      uploadVideo: "",
      uploadImage: "",
      postPost: false,
      isCardModalActiveComment: false,
      isShareChartActive: false,
      babbleReply: "",
      reply: "",
      babbleText: "",
      userReply: "",
      modalBabble: "",
      activeItem: "all",
      videoId: "videoId",
      babbleImage: "",
      babbleUrl: "",
      noSticker: false,
      width: 490,
      height: 245,
      quality: 1,
      isShareVideoActive: false,
      babbleVideo: "",
      positionTaken: false,
    };
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
    charactersLeft() {
      var char = this.babbleText.length,
        limit = 16180;
      return limit - char;
    },
  },
  props: {
    team: "",
    babble: "",
    watchItem: "",
    contest: [],
  },

  methods: {
    handleSuccess() {
      this.$buefy.dialog.alert("Le lien a été copié! Plus qu'à le partager 😋");
    },
    problemLink() {
      this.babbleText = this.uploadVideo;
      this.uploadVideo = "";
      this.isShareVideoActive = false;
    },
    successLink(event) {
      this.babbleUrl = event.images ? event.images[0] : "";
      this.linkTitle = event.title ? event.title : "";
      //this.babbleText = event.description ? event.description : "";
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
      } else {
        this.createImage(files[0]);
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
            sendSongReply(
              textosend,
              this.babble._id,
              this.babbleUrl,
              this.babbleVideo
            ).then((resp) => {
              this.postPost = false;
              this.babbleText = "";
              this.uploadImage = "";
              this.uploadVideo = "";
              this.babbleUrl = "";
              this.babbleVideo = "";
              this.source = "";
              this.linkText = "";
              this.linkTitle = "";
              this.isLoading = false;
              this.$emit("changeBabbles");
            });
          } else {
            if (this.uploadImage && !this.babbleVideo) {
              this.babbleUrl = this.uploadImage;
              textBabble = textBabble + " ";
            }
            if (this.uploadImage && this.babbleVideo) {
              this.sendingPost = true;
              textBabble = textBabble + " ";
            }
            if (this.uploadVideo) {
              this.babbleVideo = this.uploadVideo;
              textBabble = textBabble + " ";
            }
            if (textBabble.length > 0) {
              this.loading = true;
              sendSongReply(
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
                this.isLoading = false;
                this.$emit("changeBabbles");
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
    moment: function (time) {
      return moment(time);
    },

    iLike(babble) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        let like = {};
        like.babbleId = babble._id;
        like.userLiked = babble.user._id;
        postLike(like).then(() => {
          this.$emit("changeBabbles");
        });
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },
    iLikeComment(reply) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        postLikeReply(reply._id).then(() => {
          this.$emit("changeBabbles");
        });
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
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
    shareVideo() {
      this.isShareVideoActive = true;
    },
    closeVideoBabble() {
      this.babbleVideo = "";
      this.isShareVideoActive = false;
    },

    postReplyBabble(modalBabble) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        let textBabble = this.babbleText;
        textBabble = this.$sanitize(textBabble);
        this.addLinksToHttp(textBabble);
        sendBabbleReplyComment(textBabble, modalBabble._id).then(() => {
          this.babbleText = "";
          this.isCardModalActiveComment = false;
          this.$emit("changeBabbles");
        });
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },
    showModal(babble) {
      this.pause;
      this.modalBabble = babble;
      this.isCardModalActiveComment = true;
    },
  },
};
</script>


<style scoped>
.babblesField > div > .box {
  padding: 0.25rem !important;
  margin-top: 0.25rem !important;
}
#forumMainCadre {
  padding: 0.25rem !important;
}
.media-content {
  padding-top: 5px;
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
.button.is-contest {
  background-color: #ff7d00;
  color: #fff;
  border-color: #ff7d00;
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

.is-fullwidth {
  margin-right: 5px;
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
.babble-body {
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
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
  padding: 0.5rem;
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
.level {
  display: flex;
  height: 3em;
  align-items: center;
  justify-content: space-between;
}
.verified {
  height: 15px;
}
.box > .tweet {
  padding: 0.25rem !important;
  padding-bottom: 0px !important;
}
.videoBabble {
  padding-bottom: 0px !important;
}
@media screen and (max-width: 768px) {
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
    margin-bottom: 0rem !important;
    margin-top: 0rem !important;
    padding-right: 0px;
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
}
</style>
