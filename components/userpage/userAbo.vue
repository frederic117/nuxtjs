<template>
  <div
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-throttle-delay="1000"
    infinite-scroll-distance="50"
  >
    <div class="box suggestBox" v-if="nameInsider">
      <div class="sideRecent mainSCI">
        <nuxt-link :to="'/dashboard/' + nameInsider.shortName">
          <div class="image is-circle">
            <img
              loading="lazy"
              class="imgProfile"
              :src="nameInsider.img"
              alt="Image"
            />
          </div>
        </nuxt-link>

        <div class="profilWrapper">
          <div>
            <div class="nameProfil">
              <nuxt-link
                class="nameProfilLink nameProfil"
                :to="'/dashboard/' + nameInsider.shortName"
              >
                <div>
                  <span>{{ nameInsider.searchName }}</span>
                  <span
                    v-if="nameInsider.role === 'bot'"
                    class="icon is-medium"
                  >
                    <img
                      loading="lazy"
                      class="verified"
                      src="~assets/images/verified.png"
                      alt="verified"
                    />
                  </span>
                </div>
              </nuxt-link>
              <div class="add-to-watchlist">
                <client-only
                  v-if="
                    $store.state.auth.user &&
                    nameInsider.shortName != $store.state.auth.user._id
                  "
                >
                  <span
                    v-if="
                      $store.state.auth.user &&
                      $store.state.auth.user.following &&
                      $store.state.auth.user.following.includes(
                        nameInsider.shortName
                      ) === false
                    "
                    class="icon pointer is-medium"
                  >
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
                        type="button"
                        @click="follow(nameInsider.shortName)"
                        class="icon unfollow buttonImgAbo"
                        src="~assets/images/stay.png"
                        alt="follow"
                      />
                    </b-tooltip>
                  </span>

                  <span
                    v-if="
                      $store.state.auth.user &&
                      $store.state.auth.user.following &&
                      $store.state.auth.user.following.includes(
                        nameInsider.shortName
                      ) === true
                    "
                    class="icon pointer is-medium"
                  >
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
                        type="button"
                        @click="unfollow(nameInsider.shortName)"
                        class="icon unfollow buttonImgUnAbo"
                        src="~assets/images/unfollow.png"
                        alt="unfollow"
                      />
                    </b-tooltip>
                  </span>
                </client-only>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav
      v-if="
        $route.path.includes('babble') ||
        $route.path.includes('news') ||
        $route.path.includes('dashboard') ||
        $route.path.includes('mypage') ||
        $route.path == '/'
      "
      class="navbar is-dark"
    >
      <div class="babblesMenu">
        <div class="babMenu" v-if="filterBy === 'abonnement'">
          <img
            loading="lazy"
            class="is-30"
            src="~assets/images/stay.png"
            alt="abonnement"
          />
          <strong
            v-if="
              connectedUser &&
              ($route.params.id === connectedUser._id ||
                userId === connectedUser._id)
            "
          >
            {{
              langSelected === "EN" ? "my subscriptions" : "mes abonnements"
            }}</strong
          >
          <strong v-else>
            {{
              langSelected === "EN" ? "his subscriptions" : "ses abonnements"
            }}</strong
          >
        </div>
        <div class="babMenu" v-if="filterBy === 'abonne'">
          <strong
            v-if="
              connectedUser &&
              ($route.params.id === connectedUser._id ||
                userId === connectedUser._id)
            "
          >
            {{ langSelected === "EN" ? "his subscribers" : "mes subscribers" }}
          </strong>
          <strong v-else>{{
            langSelected === "EN" ? "his subscribers" : "ses subscribers"
          }}</strong>
          <img
            loading="lazy"
            class="is-30 is-30-abonnes invertOk"
            src="~assets/images/abonnes.png"
            alt="abonnes"
          />
        </div>
      </div>
    </nav>

    <!--  
    <nav
      v-if="
        connectedUser &&
        ($route.params.id === connectedUser._id ||
          userId === connectedUser._id) &&
        filterBy === 'abonnement' &&
        abonnementList &&
        abonnementList.length > 0
      "
      class="navbar is-dark"
    >
      <div class="babblesMenu">
        <div class="babMenu">
          <img
            loading="lazy"
            class="is-30"
            src="~assets/images/stay.png"
            alt="abonnement"
          />
          <strong>abonnements</strong>
        </div>
      </div>
    </nav>
    -->
    <div>
      <div
        v-if="
          (filterBy === 'abonnement' &&
            abonnementList &&
            abonnementList.length > 0) ||
          (filterBy === 'abonne' && abonneList && abonneList.length > 0)
        "
      >
        <div
          v-for="(abo, index) in filterBy === 'abonnement'
            ? abonnementList
            : abonneList"
          :key="index"
        >
          <div class="box suggestBox" v-if="abo && abo.username">
            <div class="sideRecent mainSCI">
              <nuxt-link :to="'/dashboard/' + abo._id">
                <div class="image is-circle">
                  <img
                    loading="lazy"
                    class="imgProfile"
                    :src="abo.picProfile"
                    alt="Image"
                  />
                </div>
              </nuxt-link>

              <div class="profilWrapper">
                <div>
                  <div class="nameProfil">
                    <nuxt-link
                      class="nameProfilLink nameProfil"
                      :to="'/dashboard/' + abo._id"
                    >
                      <div>
                        <span>{{ abo.username }}</span>
                        <span v-if="abo.role === 'bot'" class="icon is-medium">
                          <img
                            loading="lazy"
                            class="verified"
                            src="~assets/images/verified.png"
                            alt="verified"
                          />
                        </span>
                      </div>
                      <!-- <div class="activityUserWrapper">
                        <span class="activityUser">
                          <img
                            class="icon unfollow"
                            src="~assets/images/stay.png"
                            alt="follow"
                          />
                           <strong>{{ abo.followers }}</strong> 
                        </span>

                        <span class="activityUser">
                          <img
                            class="icon unfollow nbBabbles"
                            src="~assets/images/teams/rumour.png"
                            alt="babbles"
                          />
                          	<strong>{{ abo.nbBabbles }}</strong>
                        </span>

                        <span v-if="abo.nbOfVideos" class="activityUser">
                          <img
                            class="icon unfollow"
                            src="~assets/images/teams/soccervideo.png"
                            alt="babbles"
                          />
                            <strong>{{ abo.nbOfVideos }}</strong>
                        </span>
                      </div>-->
                    </nuxt-link>
                    <div class="add-to-watchlist">
                      <client-only
                        v-if="
                          $store.state.auth.user &&
                          abo._id != $store.state.auth.user._id
                        "
                      >
                        <span
                          v-if="
                            $store.state.auth.user &&
                            $store.state.auth.user.following &&
                            $store.state.auth.user.following.includes(
                              abo._id
                            ) === false
                          "
                          class="icon pointer is-medium"
                        >
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
                              type="button"
                              @click="follow(abo._id)"
                              class="icon unfollow buttonImgAbo"
                              src="~assets/images/stay.png"
                              alt="follow"
                            />
                          </b-tooltip>
                        </span>

                        <span
                          v-if="
                            $store.state.auth.user &&
                            $store.state.auth.user.following &&
                            $store.state.auth.user.following.includes(
                              abo._id
                            ) === true
                          "
                          class="icon pointer is-medium"
                        >
                          <b-tooltip
                            :label="`${
                              langSelected === 'EN'
                                ? 'unsubscribe'
                                : 'se désabonner'
                            }`"
                            position="is-left"
                            class="bullsAndBearsPicVsLogo versusFigure1"
                            type="is-danger"
                            size="is-large"
                          >
                            <img
                              type="button"
                              @click="unfollow(abo._id)"
                              class="icon unfollow buttonImgUnAbo"
                              src="~assets/images/unfollow.png"
                              alt="unfollow"
                            />
                          </b-tooltip>
                        </span>
                      </client-only>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="box">
        {{
          filterBy === "abonnement"
            ? langSelected === "EN"
              ? "no subscription"
              : "Pas encore d'abonnement !"
            : langSelected === "EN"
            ? "no subscripter"
            : "Pas encore d'abonné !"
        }}
      </div>
      <div v-if="filterBy === 'abonnement' && abonnementSuggest.length > 0">
        <nav class="navbar is-dark">
          <div class="babblesMenu">
            <div class="babMenu">
              <img
                loading="lazy"
                class="is-30"
                src="~assets/images/abo.png"
                alt="abonnement"
              />
              <strong>suggestions</strong>
            </div>
          </div>
        </nav>

        <div v-for="(aboSuggest, index) in abonnementSuggest" :key="index">
          <div class="box suggestBox" v-if="aboSuggest && aboSuggest.username">
            <div class="sideRecent mainSCI">
              <nuxt-link :to="'/dashboard/' + aboSuggest._id">
                <div class="image is-circle">
                  <img
                    loading="lazy"
                    class="imgProfile"
                    :src="aboSuggest.picProfile"
                    alt="Image"
                  />
                </div>
              </nuxt-link>

              <div class="profilWrapper">
                <div>
                  <div class="nameProfil">
                    <nuxt-link
                      class="nameProfilLink nameProfil"
                      :to="'/dashboard/' + aboSuggest._id"
                    >
                      <div>
                        <span>{{ aboSuggest.username }}</span>
                        <span
                          v-if="aboSuggest.role === 'bot'"
                          class="icon is-medium"
                        >
                          <img
                            loading="lazy"
                            class="verified"
                            src="~assets/images/verified.png"
                            alt="verified"
                          />
                        </span>
                      </div>
                      <!--
                      <div class="activityUserWrapper">
                        <span class="activityUser">
                          <img
                            class="icon unfollow"
                            src="~assets/images/stay.png"
                            alt="follow"
                          />
                          <strong>{{ aboSuggest.followers }}</strong>
                        </span>
                        <span class="activityUser">
                          <img
                            class="icon unfollow"
                            src="~assets/images/teams/rumour.png"
                            alt="babbles"
                          />
                            <strong>{{ aboSuggest.nbBabbles }}</strong>
                        </span>
                        <span v-if="aboSuggest.nbOfVideos" class="activityUser">
                          <img
                            class="icon unfollow"
                            src="~assets/images/teams/soccervideo.png"
                            alt="babbles"
                          />
                          <strong>{{ aboSuggest.nbOfVideos }}</strong>
                        </span>
                      </div>
                      -->
                    </nuxt-link>
                    <div class="add-to-watchlist">
                      <client-only
                        v-if="
                          $store.state.auth.user &&
                          aboSuggest._id != $store.state.auth.user._id
                        "
                      >
                        <span
                          v-if="
                            $store.state.auth.user &&
                            $store.state.auth.user.following &&
                            $store.state.auth.user.following.includes(
                              aboSuggest._id
                            ) === false
                          "
                          class="icon pointer is-medium"
                        >
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
                              type="button"
                              @click="follow(aboSuggest._id)"
                              class="icon unfollow buttonImgAbo"
                              src="~assets/images/stay.png"
                              alt="follow"
                            />
                          </b-tooltip>
                        </span>
                        <span
                          v-if="
                            $store.state.auth.user &&
                            $store.state.auth.user.following &&
                            $store.state.auth.user.following.includes(
                              aboSuggest._id
                            ) === true
                          "
                          class="icon pointer is-medium"
                        >
                          <b-tooltip
                            :label="`${
                              langSelected === 'EN'
                                ? 'unsubscribe'
                                : 'se désabonner'
                            }`"
                            position="is-left"
                            class="bullsAndBearsPicVsLogo versusFigure1"
                            type="is-danger"
                            size="is-large"
                          >
                            <img
                              type="button"
                              @click="unfollow(aboSuggest._id)"
                              class="icon unfollow buttonImgUnAbo"
                              src="~assets/images/unfollow.png"
                              alt="unfollow"
                            />
                          </b-tooltip>
                        </span>
                      </client-only>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="loader-container" v-if="loadMoreIsActive">
          <slot name="loading">
            <div class="spinner"></div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWhotofollow } from "@/server/api";
import { followInsider, unfollowInsider } from "@/server/apiDashboard";
export default {
  data() {
    return {
      abonnementSuggest: "",
      loadMoreIsActive: false,
      emptyResp: false,
    };
  },
  mounted() {
    if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
      getWhotofollow().then((resp) => {
        this.abonnementSuggest = resp;
      });
    }
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
    abonnementList: "",
    abonneList: "",
    filterBy: "",
    userId: "",
    nameInsider: "",
  },
  methods: {
    follow(event) {
      followInsider(event).then((resp) => {
        this.$auth.fetchUser();
        let arrayToPush = this.abonnementSuggest.concat(resp);
        if (arrayToPush.length > 0) {
          this.abonnementSuggest = Array.from(
            new Set(arrayToPush.map((a) => a._id))
          ).map((id) => {
            return arrayToPush.find((a) => a._id === id);
          });
        }
      });
    },
    unfollow(event) {
      unfollowInsider(event).then((resp) => {
        this.$auth.fetchUser();
        let arrayToPush = this.abonnementSuggest.concat(resp);
        if (arrayToPush.length > 0) {
          this.abonnementSuggest = Array.from(
            new Set(arrayToPush.map((a) => a._id))
          ).map((id) => {
            return arrayToPush.find((a) => a._id === id);
          });
        }
      });
    },
    loadMore() {
      if (!this.$nuxt.isOffline) {
        if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
          if (this.loadMoreIsActive == false && this.emptyResp == false) {
            this.loadMoreIsActive = true;
            getWhotofollow().then((resp) => {
              if (
                resp &&
                resp.length > 0 &&
                this.abonnementSuggest &&
                this.abonnementSuggest.length > 0
              ) {
                let array1 = this.abonnementSuggest
                  .map((a) => a.username)
                  .sort((a, b) => a.localeCompare(b));
                let array2 = resp
                  .map((a) => a.username)
                  .sort((a, b) => a.localeCompare(b));
                if (
                  array1.length === array2.length &&
                  array1.every(function (value, index) {
                    return value === array2[index];
                  })
                ) {
                  this.emptyResp = true;
                } else {
                  let arrayToPush = this.abonnementSuggest.concat(resp);
                  if (arrayToPush.length > 0) {
                    this.abonnementSuggest = Array.from(
                      new Set(arrayToPush.map((a) => a._id))
                    ).map((id) => {
                      return arrayToPush.find((a) => a._id === id);
                    });
                  }
                }
              }
              this.loadMoreIsActive = false;
            });
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.is-30 {
  width: auto;
  height: 30px;
  padding-right: 10px;
}
.is-30-abonnes {
  padding-right: 0px !important;
  padding-left: 10px;
  height: 20px !important;
}
.box {
  padding: 0.25rem;
}
.navbar.is-dark {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  justify-content: space-between;
}

.navbar {
  background-color: #fff;
  min-height: 3.25rem;
  position: relative;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-bottom: 0.5rem;
}
.babMenu {
  display: flex;
  padding: 5px;
  margin: auto;
  font-weight: bold;
  color: #192b41 !important;
  justify-content: center !important;
}
.babMenu > span {
  display: flex;
  align-items: center;
}
.babblesMenu {
  display: flex;
  margin: auto;
  width: 100%;
}
.edit-profile {
  margin-right: 15px;
}
.share {
  height: 2rem;
  width: auto !important;
}

.verified {
  height: 1.5rem;
  width: auto !important;
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
  display: flex;
  justify-content: center;
  padding: 5px;
  word-break: break-word;
  font-size: 1rem;
}
.profilWrapper {
  width: 70%;
  margin-right: 0px !important;
}
.buttonImgAbo {
  height: 3rem !important;
  width: auto !important;
}
.buttonImgUnAbo {
  height: 2.5rem !important;
  width: auto !important;
}
.sideRecent {
  justify-content: space-evenly;
  align-items: center;
  display: flex;
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
  padding: 0.25rem !important;
  margin-bottom: 0rem;
}
.mainSCI > a {
  padding: 0.25rem !important;
  margin-bottom: 0rem;
}

.activityUser {
  display: flex;
  align-items: center;
  margin-right: 1rem;
  font-size: 1.2rem !important;
}

.sideRecent > div > div {
  display: flex;
}
.nameProfil {
  display: flex;
  width: 100%;
  color: #0084a4;
  justify-content: flex-start;
}

.nameProfil > div > span {
  font-size: 1.5rem;
  font-weight: bold;
}
.nameProfil > div {
  display: flex;
  margin-right: 0px;
  align-items: center;
}
strong {
  color: #192b41;
}

span {
  color: #0084a4;
}
.icon.is-medium {
  width: 3rem;
  height: auto !important;
  display: FLEX;
  align-self: CENTER;
  align-items: center;
}
.icon > img {
  width: auto !important;
  height: 1rem;
}
.icon {
  width: auto !important;
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
  height: auto !important;
  width: 60px !important;
  max-width: 100px !important;
}
.is-12x12 {
  margin-left: 10px;
  align-self: center;
  height: 15px;
  width: auto;
}
@media (max-width: 1047px) {
  .is-12x12 {
    margin-left: 10px;
    height: 10px;
    width: auto;
  }
  .suggestBox {
    padding: 0.25rem !important;
  }
  .babMenu {
    width: 100%;
    padding: 0.5rem;
    font-size: 1.3rem !important;
    color: #c9c9c9;
    font-weight: bold;
    align-items: center;
  }

  .nameProfil > div > span {
    font-size: 1.3rem;
    font-weight: bold;
  }
  .icon.is-medium {
    width: 2rem;
    height: auto !important;
  }
  .unfollowIcon {
    width: 1.5rem;
  }
  .icon > img {
    width: auto !important;
    height: 1rem;
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
  .verified {
    height: 1rem;
    width: auto !important;
  }
  .profilWrapper {
    width: 100%;
  }

  .mainSCI > a > .image {
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
    font-size: 1rem !important;
  }
  .activityUser > img {
    height: 20px !important;
    width: auto !important;
  }
  .desktopOnly {
    display: none;
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
    width: 50px !important;
    max-width: 50px !important;
  }
  .mainSCI > a {
    padding: 0px !important;
    margin-bottom: 0rem;
    margin-right: 0.5rem;
  }
}
@media screen and (max-width: 365px) {
  .nameProfil > div > span {
    font-size: 1rem;
    font-weight: bold;
  }
  .activityUser {
    font-size: 0.8rem !important;
  }
  .imgProfile {
    height: auto;
    width: 45px !important;
    max-width: 45px !important;
  }
  .mainSCI > a > .image {
    width: 10%;
  }
  .mainSCI > a {
    padding: 0px !important;
    margin-bottom: 0rem;
  }
}
</style>
