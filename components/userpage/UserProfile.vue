<template>
  <div>
    <div
      v-if="profileInfo && profileInfo._id"
      class="column sideRecent mainSCI"
    >
      <div @click="goBack" class="image is-circle">
        <nuxt-link :to="'/dashboard/' + profileInfo._id">
          <img
            loading="lazy"
            class="imgProfile"
            :src="profileInfo.picProfile"
            alt="Image"
          />
        </nuxt-link>
      </div>

      <div class="profilWrapper">
        <div>
          <div class="nameProfil">
            <div>
              <span @click="goBack">
                <nuxt-link :to="'/dashboard/' + profileInfo._id">{{
                  profileInfo.username
                }}</nuxt-link>
              </span>

              <span v-if="profileInfo.role === 'bot'" class="is-medium">
                <img
                  loading="lazy"
                  class="verified"
                  src="~assets/images/verified.png"
                  alt="verified"
                />
              </span>
              <div class="onLine" v-if="profileInfo.role != 'bot'">
                <img
                  v-if="profileInfo.isOnline"
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
              </div>
            </div>
            <client-only>
              <div
                class="add-to-watchlist"
                v-if="
                  !$auth.user ||
                  ($auth.user && !($route.params.id === $auth.user._id))
                "
              >
                <i class="divVide">
                  <b-dropdown class="shareUser" :triggers="['hover']">
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
                      v-for="network of networks"
                      :key="network.network"
                    >
                      <ShareNetwork
                        :class="{
                          mobileOnly:
                            network.name === 'Messenger' ||
                            network.name === 'SMS',
                        }"
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
                <b-tooltip
                  :label="`${
                    langSelected === 'EN' ? 'unsubscribe' : 'se désabonner'
                  }`"
                  position="is-left"
                  class="bullsAndBearsPicVsLogo versusFigure1"
                  type="is-danger"
                  size="is-large"
                >
                  <img
                    v-if="followed"
                    @click="unfollow"
                    class="desabo pointer"
                    src="~assets/images/unfollow.png"
                    alt="unfollow"
                  />
                </b-tooltip>
                <b-tooltip
                  :label="`${
                    langSelected === 'EN' ? 'subscribe' : 's\'abonner'
                  }`"
                  position="is-left"
                  class="bullsAndBearsPicVsLogo versusFigure1"
                  type="is-success"
                  size="is-large"
                >
                  <img
                    v-if="!followed"
                    @click="follow"
                    class="aboBut pointer"
                    src="~assets/images/stay.png"
                    alt="unfollow"
                  />
                </b-tooltip>
              </div>
              <div v-else class="add-to-watchlist">
                <i class="divVide">
                  <b-dropdown :triggers="['hover']">
                    <template #trigger>
                      <img
                        loading="lazy"
                        class="share iconConnect"
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

                <b-tooltip
                  :label="`${langSelected === 'EN' ? 'Edit' : 'Editer'}`"
                  position="is-left"
                  class
                  type="is-info"
                >
                  <img
                    @click="editMyProfile"
                    class="iconConnect pointer edit-profile invertOk"
                    src="~assets/images/edit-profile.png"
                    alt="edit-profile"
                  />
                </b-tooltip>
                <b-tooltip
                  v-if="!darkActive"
                  label="dark mode"
                  position="is-left"
                  class
                  type="is-info"
                >
                  <span
                    class="displayFlex namePicWrap pointer"
                    @click="setToDark"
                    ><p>🌑</p></span
                  > </b-tooltip
                ><b-tooltip
                  label="light mode"
                  position="is-left"
                  class
                  type="is-info"
                  v-else
                >
                  <span
                    class="displayFlex namePicWrap pointer"
                    @click="setToDark"
                    ><p>🌕</p></span
                  >
                </b-tooltip>
                <b-tooltip
                  :label="`${
                    langSelected === 'EN' ? 'disconnect' : 'Se déconnecter'
                  }`"
                  position="is-left"
                  class
                  type="is-info"
                >
                  <img
                    @click="logout"
                    class="iconConnect pointer invertOk"
                    src="~assets/images/deconnexion.png"
                    alt="deconnexion"
                  />
                </b-tooltip>
              </div>
            </client-only>
          </div>
        </div>

        <div class="activityUserWrapper">
          <span
            v-if="connectedUser && $route.params.id === connectedUser._id"
            @click="seeCagnotte"
            class="button pointer activityUser"
            :class="{
              buttonActive:
                filterBy == 'pronos' ||
                filterBy == 'cagnotte' ||
                filterBy == 'resultats',
            }"
          >
            <img
              class="unfollow"
              src="~assets/images/contestMainCagnotte.png"
              alt="babbles"
            />
            <strong class="has-text-contest"
              >&nbsp{{
                footCoins ? footCoins.toLocaleString("fr") : 0
              }}
              F$</strong
            >
          </span>
          <span
            class="button pointer activityUser"
            :class="{
              buttonActive:
                filterBy == 'all' ||
                filterBy == 'clap' ||
                (filterBy == 'resultats' &&
                  $route.params.id != connectedUser._id) ||
                (filterBy == 'pronos' && $route.params.id != connectedUser._id),
            }"
          >
            <img
              @click="seePost"
              v-if="
                profileInfo.role === 'bot' ||
                $route.params.id === connectedUser._id
              "
              class="unfollow nbBabbles"
              src="~assets/images/teams/rumour.png"
              alt="babbles"
            />
            <img
              v-else
              @click="seeProno"
              class="unfollow nbBabbles"
              src="~assets/images/coupe.png"
              alt="babbles"
            />
            <!--	<strong>{{ profileInfo.nbBabbles }}</strong>-->
          </span>
          <!--	<span class="activityUser">
						<strong>{{profileInfo.nbOfLikes}}</strong>
						{{profileInfo.nbOfLikes>1 ?'claps':'clap'}}
					</span>-->
          <span
            @click="seeAbonne"
            class="button pointer activityUser"
            :class="{ buttonActive: filterBy == 'abonne' }"
          >
            <img
              class="unfollow invertOk"
              src="~assets/images/abonnes.png"
              alt="abonnes"
            />
            <!--   <strong>{{ profileInfo.followers }}</strong>-->
          </span>
          <span
            @click="seeAbonnement"
            class="button pointer activityUser"
            :class="{ buttonActive: filterBy == 'abonnement' }"
          >
            <img
              class="unfollowUp"
              src="~assets/images/stay.png"
              alt="abonnement"
            />
            <!--    <strong>{{ profileInfo.following.length }}</strong>-->
          </span>
        </div>
        <!--	<client-only>
					<div v-if="profileInfo.role!='bot'" class="contestIllustrWrapper" @click="goTocontest">
						<img
							v-if="profileInfo.nbOfContestWon==0"
							class="pointer contestIllustr"
							src="~assets/images/loserL.png"
							alt="contest"
						/>

						<img
							v-if="profileInfo.nbOfContestWon>0"
							class="pointer contestIllustr"
							src="~assets/images/coupe.png"
							alt="contest"
						/>
						<span v-if="profileInfo.nbOfContestWon>1">
							<strong>{{profileInfo.nbOfContestWon}}</strong> Rounds gagnés
						</span>
						<span v-else>
							<strong>{{profileInfo.nbOfContestWon}}</strong> Round gagné
						</span>
					</div>
				</client-only>-->
      </div>
    </div>
    <div v-if="profileInfo && profileInfo.bio">
      <h1 class="userBio" v-html="addLinksToHttp(profileInfo.bio)"></h1>
    </div>
  </div>
</template>

<script>
import { followInsider, unfollowInsider } from "@/server/apiDashboard";
import { userUpdate } from "@/server/apiAdmin";
import moment from "moment";

export default {
  data() {
    return {
      sharing: {
        url: `https://www.footfoot.co${this.$route.path}`,
        title: `Suivez @${this.profileInfo.username} sur footfoot`,
        description: `Les infos, les news, les vidéos, les pronos de @${this.profileInfo.username}`,
        quote: `footfoot.co : Le meilleur site de foot`,
        hashtags: `footfoot,football,pronos,contest,picks,news, @${this.profileInfo.username}`,
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

      insiderId: "",
      followed: "",
      copyLink: "",
      activ: false,
      darkTheme: "",
    };
  },

  props: {
    filterBy: "",
    footCoins: "",
    profileInfo: "",
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
    darkActive() {
      return this.$store.state.var.darkTheme;
    },
  },
  methods: {
    updateDark() {
      if (this.$auth.user._id) {
        let user = {};
        user.darkTheme = this.darkTheme;
        userUpdate(user, this.$auth.user._id).then((data) => {
          this.$auth.fetchUser();
        });
      }
    },
    setToDark() {
      if (this.$store.state.var.darkTheme) {
        this.darkTheme = false;
        this.$store.commit("var/dark", false);
        this.updateDark();
      } else {
        this.darkTheme = true;
        this.$store.commit("var/dark", true);
        this.updateDark();
      }
    },
    goBack() {
      setTimeout(() => {
        this.$store.commit("var/setbabbaleTodisplay", "");
      }, 1);
    },
    goTocontest() {
      this.$router.push("/contest");
    },
    handleSuccess() {
      this.$buefy.dialog.alert("Le lien a été copié! Plus qu'à le partager 😋");
    },
    logout() {
      this.$auth.logout();
      this.$router.push("/mypage/all");
    },
    editMyProfile() {
      this.$router.push("/mypage/edit");
    },
    seeCagnotte() {
      if (
        this.connectedUser &&
        this.$route.params.id === this.connectedUser._id
      )
        this.$emit("cagnotte");
    },
    seePost() {
      if (this.$route.path.includes("dashboard")) {
        this.$emit("seePost");
      } else {
        this.$router.push("/dashboard/" + this.profileInfo._id);
      }
    },
    seeProno() {
      if (this.$route.path.includes("dashboard")) {
        this.$emit("seeProno");
      } else {
        this.$router.push("/dashboard/" + this.profileInfo._id);
      }
    },
    seeAbonnement() {
      this.$emit("abonnement");
    },
    seeAbonne() {
      this.$emit("abonne");
    },
    follow() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        if (this.activ == false) {
          this.activ = true;
          followInsider(this.insiderId).then((resp) => {
            this.followed = true;
            this.activ = false;
            this.$auth.fetchUser();
            this.updateInsiderProfile();
          });
        }
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },
    unfollow() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        if (this.activ == false) {
          this.activ = true;
          unfollowInsider(this.insiderId).then((resp) => {
            this.followed = false;
            this.activ = false;
            this.$auth.fetchUser();
            this.updateInsiderProfile();
          });
        }
      } else {
        this.$router.push("/signup");
      }
      //.catch(next);
    },
    updateInsiderProfile() {
      this.$emit("updateInsiderProfile");
    },
    addLinksToHttp(inputText) {
      var replacedText, replacePattern1, replacePattern2, replacePattern3;
      // Take into parameter a string and return the same string with HTML links
      // Ex: "Hello #axa" => "Hello <a href='/team/axa'>#axas</a>"
      inputText = inputText.replace(
        // /#(([a-zA-Z0-9\.])+@[a-zA-Z\_]+)(\W|$)/g,
        /#(\w+)(\W|$)/g,
        // '<a href="/stocks/$1">#$1$2</a>'
        '<a href="/teams/$1">#$1 -</a>'
      );

      inputText = inputText.replace(/(?:\r\n|\r|\n)/g, "<br />");

      //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(
        replacePattern1,
        '<a href="$1" target="_blank">$1</a>'
      );

      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(
        replacePattern2,
        '$1<a href="http://$2" target="_blank">$2</a>'
      );

      //Change email addresses to mailto:: links.
      replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(
        replacePattern3,
        '<a href="mailto:$1">$1</a>'
      );

      return replacedText;
    },
  },
  watch: {
    profileInfo: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.profileInfo) {
          this.insiderId = this.profileInfo._id;
        }
      },
    },

    $route() {
      this.copyLink = "https://www.footfoot.co" + this.$route.path;
      this.insiderId = this.profileInfo
        ? this.profileInfo._id
        : this.$route.params.id;
      this.followed =
        this.$store.state.auth.user &&
        this.$store.state.auth.user.following &&
        this.$store.state.auth.user.following.includes(this.insiderId)
          ? true
          : false;
    },
  },

  mounted() {
    this.copyLink = "https://www.footfoot.co" + this.$route.path;

    this.insiderId = this.profileInfo
      ? this.profileInfo._id
      : this.$route.params.id;
    this.followed =
      this.$store.state.auth.user &&
      this.$store.state.auth.user.following &&
      this.$store.state.auth.user.following.includes(this.insiderId)
        ? true
        : false;
    this.darkTheme = this.$store.state.var.darkTheme;
  },
  destroyed() {},
};
</script>

<style scoped>
.buttonActive {
  border: 2px solid;
  border-color: #ff7d00 !important;
}
.onLine {
  display: flex;
  align-items: center;
}
.divVide {
  display: flex;
  align-items: center;
  margin-left: 15px;
  margin-right: 15px;
}
.edit-profile {
  margin-right: 15px;
}
.share {
  height: auto;
  width: 2rem;
}
.iconConnect {
  height: 2.5rem;
  width: auto;
}
.aboBut {
  height: 3.5rem;
  width: auto;
}
.verified {
  height: 1.5rem;
  width: auto;
}
.namePicWrap {
  margin-right: 10px;
}
.desabo {
  height: 2rem;
  width: auto;
}
.unfollow {
  width: auto !important;
  max-width: 2rem !important;
}
.button:focus,
.button.is-focused {
  border-color: #363636;
  color: #363636;
  box-shadow: 0 0 0 0.125em #eef1f7;
}
.button:focus:not(:active),
.button.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em #eef1f7;
}
.userBio {
  color: #192b41;
  display: flex;
  justify-content: center;
  padding: 5px;
  word-break: break-word;
  font-size: 1rem;
}
.profilWrapper {
  width: 70%;
}

.sideRecent {
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  width: 55%;
  margin: auto;
}
.contestIllustr {
  height: 25px;
  width: auto;
}
.contestIllustrWrapper {
  justify-content: center;
  align-items: center;
  margin: 1rem;
  cursor: pointer;
}
.contestIllustrWrapper > span {
  padding: 0 10px;
  font-size: 1rem;
}
code {
  background-color: #eef1f7 !important;
}
.mainSCI > div {
  padding: 0.5rem !important;
  margin-bottom: 0rem;
}
.activityUserWrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  margin-top: 0.25rem;
}
.activityUser {
  font-size: 1.2rem;
}

.sideRecent > div > div {
  display: flex;
}
.nameProfil {
  display: flex;
  align-self: center;
  width: 100%;
  justify-content: space-between;
  color: #192b41;
  margin-bottom: 1rem;
}
.nameProfil > div > span {
  font-size: 2.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.nameProfil > div {
  display: flex;
  align-self: center;
  margin-right: 0px;
}
strong {
  color: #192b41;
}

span {
  color: #192b41;
}
.icon.is-medium {
  height: 3rem;
  width: auto;
  display: FLEX;
  align-self: CENTER;
  align-items: center;
}
.icon > img {
  width: auto;
  height: 1.5rem;
}
.nbBabbles {
  margin-right: 0px !important;
  margin-left: 0px !important;
}
.unfollowIcon {
  width: auto !important;
  height: 3rem;
  display: FLEX;
  align-self: CENTER;
  align-items: center;
  justify-content: center;
}
.unfollowIcon > img {
  width: 2rem;
  height: auto !important;
}
.imgProfile {
  height: auto;
  width: 100px !important;
  max-width: 100px !important;
}
.is-12x12 {
  margin-left: 10px;
  align-self: center;
  height: 15px;
  width: auto;
}
.unfollowUp {
  width: 1.5rem !important;
  height: auto !important;
  max-width: 2rem !important;
}
@media screen and (max-width: 1050px) {
  .desabo {
    height: 1.5rem !important;
    width: auto;
  }

  .unfollowUp {
    width: 1rem !important;
    height: auto !important;
  }
  .is-12x12 {
    margin-left: 10px;
    height: 10px;
    width: auto;
  }

  .nameProfil > div > span {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .namePicWrap > P {
    font-size: 1.25rem;
  }
  .icon.is-medium {
    width: 2rem;
    height: auto;
  }
  .unfollowIcon {
    height: 1.5rem;
    width: auto;
  }
  .icon > img {
    width: auto;
    height: 1rem;
  }
  .unfollowIcon > img {
    height: 1rem;
    width: auto;
  }
  .edit-profile {
    margin-right: 15px;
  }
  .divVide {
    margin-left: 15px;
    margin-right: 15px;
  }
  .share {
    height: 1.5rem;
    width: 1.5rem;
  }
  .iconConnect {
    height: 1.5rem;
    width: auto;
  }
  .aboBut {
    height: 2.5rem;
    width: auto;
  }
  .verified {
    height: 1rem;
    width: auto;
  }
  .unfollow {
    height: 1.2rem !important;
    width: auto !important;
  }
  .profilWrapper {
    width: 80%;
  }
  .mainSCI > .image {
    width: 15%;
  }
  .button {
    font-size: 0.7rem;
  }
  .sideRecent {
    justify-content: space-evenly;
    align-items: center;
    display: flex;
    width: 100%;
    margin: auto;
  }
  .contestIllustrWrapper > span {
    padding: 0px 5px;
    font-size: 1rem;
  }

  .activityUser {
    font-size: 1rem;
  }

  .desktopOnly {
    display: none;
  }
  .nameProfil {
    margin: 0.5rem 0;
  }
  .contestIllustrWrapper {
    justify-content: center;
    align-items: center;
    margin: 1rem;
    margin-left: 0rem;
    margin-right: 0rem;
    cursor: pointer;
  }
  .imgProfile {
    height: auto;
    width: 55px !important;
    max-width: 55px !important;
  }
  .mainSCI > div {
    padding: 0px !important;
    margin-bottom: 0rem;
    margin-right: 0rem;
  }
}
@media screen and (max-width: 365px) {
  .nameProfil > div > span {
    font-size: 1rem;
    font-weight: bold;
  }
  .activityUser {
    font-size: 0.8rem;
  }
  .imgProfile {
    height: auto;
    width: 45px !important;
    max-width: 45px !important;
  }
  .mainSCI > .image {
    width: 10%;
  }
  .mainSCI > div {
    padding: 0px !important;
    margin-bottom: 0rem;
  }
  .activityUserWrapper {
    justify-content: space-between;
  }
}
</style>
