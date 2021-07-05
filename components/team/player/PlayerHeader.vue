<template>
  <section v-if="player">
    <div class="column is-6" id="ActionCard">
      <div class="box profile-card">
        <div class="card-content">
          <div class="media" id="teamInfo">
            <div class="media-content">
              <div class="team-banner">
                <h1 class="longNameTitle title is-5">
                  <strong class="is-wc playerNameWrap">
                    <nuxt-link
                      v-if="player.team && !mobile"
                      :to="`/teams/${player.team.shortName.toLowerCase()}/effectif`"
                      class="pointer logoClubWrapper desktopOnly"
                    >
                      <img
                        loading="lazy"
                        class="paysClub"
                        :src="player.team.teamImg"
                        :alt="player.team.name + 'logo'"
                        :class="{
                          invertOk: player.team.name
                            .toUpperCase()
                            .includes('JUVE'),
                        }"
                      />
                    </nuxt-link>
                    {{ player.number }} {{ player.display_name }}
                    <div v-if="player.transfermarkt">
                      <nuxt-link
                        :to="`/teams/${player.nationality.toLowerCase()}/effectif`"
                        class="pointer"
                      >
                        <b-tooltip
                          v-if="player.transfermarkt.nationality1"
                          :label="player.transfermarkt.nationality1"
                          class="'is-info'"
                          position="is-bottom"
                        >
                          <img
                            class="paysImage"
                            :src="player.transfermarkt.nationality1Img"
                            :alt="player.transfermarkt.nationality1"
                          />
                        </b-tooltip>
                      </nuxt-link>
                      <nuxt-link
                        v-if="player.transfermarkt.nationality2Img"
                        :to="`/teams/${player.transfermarkt.nationality2.toLowerCase()}/effectif`"
                        class="pointer"
                      >
                        <b-tooltip
                          v-if="player.transfermarkt.nationality2Img"
                          :label="player.transfermarkt.nationality2"
                          class="'is-info'"
                          position="is-bottom"
                        >
                          <img
                            class="paysImage"
                            v-if="player.transfermarkt.nationality2Img"
                            :src="player.transfermarkt.nationality2Img"
                            :alt="player.transfermarkt.nationality2"
                          />
                        </b-tooltip>
                      </nuxt-link>
                    </div>
                    <div v-else>
                      <nuxt-link
                        :to="`/teams/${player.nationality.toLowerCase()}/effectif`"
                        class="pointer"
                      >
                        <b-tooltip
                          v-if="player.nationality"
                          :label="player.nationality"
                          class="'is-info'"
                          position="is-bottom"
                        >
                          <img
                            loading="lazy"
                            class="paysImage"
                            :src="player.nationalityImg"
                            :alt="player.nationality"
                          />
                        </b-tooltip>
                      </nuxt-link>
                    </div>
                    <client-only>
                      <i class="divVidePlayer">
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
                      </i>
                    </client-only>
                  </strong>
                </h1>
                <div class="teamDetailHeader">
                  <div class="bigPictureWrap">
                    <figure class="is-circle bigPicture">
                      <img
                        class
                        :src="
                          player.picture
                            ? player.picture
                            : player.image_path
                            ? player.image_path
                            : 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
                        "
                        :alt="player.display_name"
                      />
                    </figure>
                  </div>
                  <div class="add-to-watchlist">
                    <h1 class="longNameTitle title is-5">
                      <span
                        v-if="
                          player.transfermarkt && player.transfermarkt.injury
                        "
                      >
                        <b-message class="injuryNotif" type="is-danger">
                          <img
                            loading="lazy"
                            id="injuredImg"
                            src="~assets/images/blessure.png"
                            alt="blessure"
                          />
                          {{ player.transfermarkt.injuryType }}
                          <br class="mobileOnly" />
                          <span class="desktopOnly">&nbsp-&nbsp</span>
                          {{ player.transfermarkt.comeBackDate }}
                        </b-message>
                      </span>
                      <span
                        v-if="player.position && player.position.data.id == 1"
                      >
                        {{
                          langSelected === "EN"
                            ? player.position.data.name
                            : "Gardien"
                        }}
                      </span>
                      <span
                        v-if="player.position && player.position.data.id == 2"
                      >
                        {{
                          langSelected === "EN"
                            ? player.position.data.name
                            : "Défenseur"
                        }}
                      </span>
                      <span
                        v-if="player.position && player.position.data.id == 3"
                      >
                        {{
                          langSelected === "EN"
                            ? player.position.data.name
                            : "Milieu"
                        }}
                      </span>
                      <span
                        v-if="player.position && player.position.data.id == 4"
                      >
                        {{
                          langSelected === "EN"
                            ? player.position.data.name
                            : "Attaquant"
                        }}
                      </span>
                      <span v-if="player.fifaIndex && player.fifaIndex.bestFoot"
                        >-&nbsp{{
                          player.fifaIndex.bestFoot == "Droit"
                            ? langSelected === "EN"
                              ? "Right foot"
                              : "Droitier"
                            : player.fifaIndex.bestFoot == "Gauche"
                            ? langSelected === "EN"
                              ? "left foot"
                              : "Gaucher"
                            : langSelected === "EN"
                            ? "Both feet"
                            : "Les 2 pieds"
                        }}</span
                      >
                    </h1>
                    <div class="team-priceVarForm title is-primary">
                      <span v-if="birthdateDate && birthdateDate != new Date()"
                        >{{ moment().diff(moment(birthdateDate), "years") }}
                        {{ langSelected === "EN" ? "years" : "ans" }}
                      </span>
                      <span v-if="player.height"
                        >&nbsp- {{ player.height }}</span
                      >
                      <span v-if="player.weight"
                        >&nbsp- {{ player.weight }}</span
                      >
                    </div>
                    <h2 class="valueWrap playerNameWrap">
                      {{ langSelected === "EN" ? "Value:" : "Valeur :" }}

                      <strong class="is-wc playerNameWrap"
                        >&nbsp{{
                          player.transfermarkt &&
                          player.transfermarkt.marketValue
                            ? player.transfermarkt.marketValue
                            : "-"
                        }}</strong
                      >
                    </h2>
                    <span
                      v-if="
                        player.transfermarkt &&
                        player.transfermarkt.contractUntil
                      "
                      class="endContract"
                    >
                      {{
                        langSelected === "EN"
                          ? "End of contract:"
                          : "Fin de contrat :"
                      }}

                      {{ player.transfermarkt.contractUntil }}</span
                    >
                  </div>

                  <div class="title is-5 statWrap">
                    <div class="teamClassChamp title is-5">
                      <div v-if="!mobile" class="desktopOnly playerDataWrapper">
                        <iframe
                          loading="lazy"
                          v-if="player.ciesId && player.ciesId != '0'"
                          class="invertOk playerData"
                          scrolling="no"
                          :src="`https://football-observatory.com/-profil-${player.ciesId}-_none#content`"
                        ></iframe>
                        <nuxt-link
                          v-else-if="player.team"
                          :to="`/teams/${player.team.shortName.toLowerCase()}/effectif`"
                          class="pointer logoClubWrapper"
                        >
                          <img
                            loading="lazy"
                            :src="player.team.teamImg"
                            :alt="player.team.name + 'logo'"
                            :class="{
                              invertOk: player.team.name
                                .toUpperCase()
                                .includes('JUVE'),
                            }"
                          />
                        </nuxt-link>
                      </div>
                      <figure v-if="mobile" class="logoClubmobile mobileOnly">
                        <nuxt-link
                          v-if="player.team"
                          :to="`/teams/${player.team.shortName.toLowerCase()}/effectif`"
                          class="pointer logoClubWrapper"
                        >
                          <img
                            loading="lazy"
                            :src="player.team.teamImg"
                            :alt="player.team.name + 'logo'"
                            :class="{
                              invertOk: player.team.name
                                .toUpperCase()
                                .includes('JUVE'),
                            }"
                          />
                        </nuxt-link>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="player.ciesId && player.ciesId != '0' && !mobile"
            class="compare desktopOnly"
          >
            <span
              @click="comparePlayer()"
              class="pointer desktopOnly is-ci is-italic"
            >
              <figure class="versusFigure1">
                <img
                  loading="lazy"
                  class="vs"
                  src="~assets/images/versus.png"
                  alt="versus"
                />
              </figure>
              (data from CIES)
            </span>
          </div>
        </div>

        <b-modal
          v-if="player.team && player.team.stadium"
          :active.sync="stadiumModal"
        >
          <stadium-modal
            :stadium="player.team && player.team.stadium"
          ></stadium-modal>
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
  auth: false,
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
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        return this.$store.state.auth.user;
      } else {
        return "unconnected";
      }
    },
  },
  props: {
    player: "",
    team: "",
    watchItem: "",
  },
  data() {
    return {
      mobile: this.$mobileDetect.mobile(),
      sharing: {
        url: `https://www.footfoot.co${this.$route.path}`,
        title: `Toutes les infos sur ${this.player.display_name}`,
        description: `Les infos, les news, les vidéos, les transferts, les stats sur ${this.player.display_name}`,
        quote: `footfoot.co : Le site le plus complet sur ${this.player.display_name}`,
        hashtags: `footfoot,football,pronos,contest,picks,news, ${this.player.display_name}`,
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
      birthdateDate: new Date(),
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
      playerPic: "",
      isoImg: "",
    };
  },
  mounted() {
    this.copyLink = "https://www.footfoot.co" + this.$route.path;

    if (this.player && this.player.birthdate) {
      let date1 = this.player.birthdate.split("-");
      let newDate = date1[1] + "/" + date1[0] + "/" + date1[2];
      this.birthdateDate = new Date(this.player.birthdate);
    }
  },
  watch: {
    player: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        this.copyLink = "https://www.footfoot.co" + this.$route.path;

        if (this.player && this.player.birthdate) {
          let date1 = this.player.birthdate.split("-");
          let newDate = date1[1] + "/" + date1[0] + "/" + date1[2];
          this.birthdateDate = new Date(this.player.birthdate);
        } else {
          this.birthdateDate = new Date();
        }
      },
    },
  },
  methods: {
    comparePlayer() {
      this.$emit("compare");
    },
    seeLineup(event) {
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
      this.stadiumModal = true;
    },
    play(audio) {
      audio.isPlaying = true;
      audio.file.play();
    },
    pause(audio) {
      audio.isPlaying = false;
      audio.file.pause();
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
.is-ci {
  color: #023d7d;
}
.playerDataWrapper {
  align-items: center;
  display: flex;
  justify-content: flex-end;
}
.valueWrap {
  font-size: 2rem !important;
}
.endContract {
  display: flex;
  justify-content: center;
  font-style: italic;
}
.playerNameWrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.playerNameWrap > div {
  display: flex;
}
.playerNameWrap > div > .pointer {
  display: flex;
}

.divVidePlayer {
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 1.7rem;
}
.paysImage {
  margin-left: 10px;
  width: auto;
  height: 48px;
}
.share {
  margin-left: 20px;
  width: auto;
  height: 48px;
}
.paysClub {
  margin-right: 10px;
  width: auto;
  height: 60px;
}

.logoClubWrapper {
  display: flex;
  justify-content: center;
}

.longNameTitle > strong {
  font-weight: BOLD;
  font-size: 3rem !important;
}

.card-content {
  padding: 0rem;
}

.media-content {
  padding: 0 !important;
}

.bigPicture {
  display: flex;
  align-self: center;
  border: none;
  background-color: transparent;
  margin-top: -5rem;
}
.bigPictureWrap {
  width: 25%;
}
.statWrap {
  width: 25%;
  margin-top: -4.5rem;
}

.bigPicture > img {
  width: auto;
  height: 200px;
}
.bigPicture > a > img {
  width: auto;
  height: 200px;
}
.title {
  line-height: 1.25;
  word-break: initial;
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

.box {
  padding: 0.25rem;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  margin-bottom: 0.5rem !important;
}

.teamClassChamp {
  font-size: 1.3rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 0px !important;
}

.team-priceVarForm {
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 0.5rem !important;
}

.add-to-watchlist {
  min-width: 30%;
  display: flex;
  flex-direction: column;
}

.longNameTitle {
  margin-bottom: 15px !important;
  text-align: center;
  font-size: 1.5rem !important;
}

#ActionCard {
  width: 100%;
  padding: 0.25rem !important;
}

#teamInfo {
  display: flex;
}

.mobileOnly {
  display: none !important;
}
.compare {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.compare > span {
  display: flex;
  font-size: 0.8rem;
}
.versusFigure1 {
  display: flex;
  align-items: center;
}
.versusFigure1 > img {
  height: 20px;
}
.playerData {
  height: 475px !important;
  width: 315px !important;
  position: absolute;
  top: -185px;
  left: -5px;
}

.playerDataWrapper {
  width: 310px !important;
  height: 285px !important;
  overflow: hidden;
  position: relative;
}
@media (max-width: 1047px) {
  .divVidePlayer {
    font-size: 1.2rem;
  }
  #ActionCard {
    padding-top: 0.25rem !important;
  }

  .desktopOnly {
    display: none !important;
  }
  .mobileOnly {
    display: flex !important;
  }
  .bigPicture > img {
    height: 70px;
    width: auto;
  }
  .statWrap {
    width: 25%;
    margin-top: -2rem;
  }
  .logoClubmobile {
    width: 100%;
    justify-content: flex-end;
  }
  .logoClubmobile > a > img {
    height: 70px;
  }
  .logoClubmobile > img {
    height: 70px;
  }
  .bigPicture {
    margin-top: -2rem !important;
  }

  .endContract {
    font-size: 0.9rem !important;
  }
  .valueWrap {
    font-size: 1.3rem !important;
  }
  .paysImage {
    margin-left: 5px;
    width: auto;
    height: 24px;
  }
  .share {
    margin-left: 10px;
    width: auto;
    height: 24px;
  }
  .paysClub {
    margin-right: 5px;
    width: auto;
    height: 24px;
  }
  .media-content {
    padding: 1px;
  }

  #ActionCard {
    width: 100%;
    padding: 0rem !important;
    padding-top: 0.25rem !important;
  }

  section {
    padding-top: 0rem;
  }

  .team-priceVarForm {
    font-size: 1rem !important;
    width: 100%;
    margin: auto;
  }

  div {
    font-size: 0.6rem;
  }

  .teamClassChamp {
    margin-bottom: 5px !important;
  }

  .add-to-watchlist {
    align-self: center;
    width: 60%;
  }

  .card-content {
    padding: 0rem;
  }

  .longNameTitle {
    margin-bottom: 5px !important;
    font-size: 1.1rem !important;
  }

  .longNameTitle > strong {
    font-size: 1.3rem !important;
  }

  .team-banner {
    display: flex;
  }
  @media (max-width: 361px) {
    .team-priceVarForm {
      font-size: 0.8rem !important;
    }
  }
}
</style>
