<template>
  <div
    v-if="$auth.user && $auth.user.username"
    class="column is-3 sideRecent mainSCI"
  >
    <div class="box">
      <div>
        <div class="image is-48x48 is-circle">
          <img
            loading="lazy"
            class="imgProfile"
            :src="$auth.user.picProfile"
            alt="Image"
          />
        </div>

        <div class="nameProfil">
          <strong>{{ $auth.user.username }}</strong>
          <div>
            <img
              @click="updateMyProfil"
              class="verified pointer edit-profile invertOk"
              src="~assets/images/edit-profile.png"
              alt="edit-profile"
            />
            <span
              class="displayFlex namePicWrap pointer"
              v-if="!darkActive"
              @click="setToDark"
              ><p>🌑</p></span
            >
            <span
              class="displayFlex namePicWrap pointer"
              v-else
              @click="setToDark"
              ><p>🌕</p></span
            >
          </div>
        </div>
      </div>

      <!-- <div class="activityUserWrapper">
        <span class="activityUser">
          <strong>{{ $auth.user.nbBabbles }}</strong>
          {{ $auth.user.nbBabbles > 1 ? "publications" : "publication" }}
        </span>
        <span class="activityUser">
          <strong>{{ $auth.user.followers }}</strong>
          {{ $auth.user.followers > 1 ? "abonnés" : "abonné" }}
        </span>
        <span class="activityUser">
          <strong>{{
            $auth.user.following ? $auth.user.following.length : 0
          }}</strong>
          {{ $auth.user.following.length > 1 ? "abonnements" : "abonnement" }}
        </span>
      </div>-->
      <div class="contestIllustrWrapper">
        <nuxt-link
          v-if="connectedUser && connectedUser._id"
          :to="`/dashboard/${connectedUser._id}`"
        >
          <div class="displayFlex">
            <img
              class="icon unfollow"
              loading="lazy"
              alt="contestMainReussite"
              src="~assets/images/contestMainCagnotte.png"
            />
            <strong class="has-text-contest"
              >{{ footCoins ? footCoins.toLocaleString("fr") : 0 }} F$</strong
            >
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getuserfootCoins } from "@/server/apiContest";
import { userUpdate } from "@/server/apiAdmin";
export default {
  data() {
    return {
      footCoins: "",
      darkTheme: "",
    };
  },

  props: {},
  mounted() {
    getuserfootCoins(this.$store.state.auth.user._id).then((footCoins) => {
      this.footCoins = footCoins;
    });
    this.darkTheme = this.$store.state.var.darkTheme;
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
        userUpdate(user, this.$auth.user._id).then((data) => {});
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
    goTocontest() {
      this.$router.push("/contest");
    },
    updateMyProfil() {
      this.$router.push("/mypage/edit");
    },
    ligue(team) {
      this.$store.commit("var/setNewValue", team.match.codeCompetitionApi);
      setTimeout(() => {
        this.$router.push("/leagues");
      }, 10);
    },
    moment: function (time) {
      return moment(time);
    },
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
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
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
      replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
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
.verified {
  height: 1.5rem;
  width: auto;
  margin-left: 0px;
  margin-right: 5px;
}
.icon {
  height: 2rem;
  width: 2rem;
}
.displayFlex {
  align-items: center;
}
.displayFlex > strong {
  font-size: 1.25rem;
}
.unfollow {
  margin-right: 10px;
}
.button {
  border-color: #192b41 !important;
  color: #192b41 !important;
}

.button:active,
.button.is-active {
  border-color: #192b41 !important;
  color: #192b41 !important;
}

.button:focus,
.button.is-focused {
  border-color: #192b41 !important;
  color: #192b41 !important;
  box-shadow: 0 0 0 0.125em #192b41 !important;
}
.has-text-contest {
  border-color: #ff7d00 !important;
  color: #ff7d00 !important;
}

.has-text-contest:focus,
.has-text-contest.is-focused {
  border-color: #ff7d00 !important;
  color: #ff7d00 !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
}
.has-text-contest:hover {
  background-color: #ff7d00;
  color: white !important;
  border-color: #ff7d00 !important;
}
.userBio {
  display: flex;
  justify-content: center;
  padding: 5px;
  word-break: break-word;
  font-size: 1rem;
}
.contestIllustr {
  height: 25px;
  width: auto;
}
.contestIllustrWrapper {
  justify-content: center;
  align-items: CENTER;
  margin: 0.5rem;
  cursor: pointer;
}
.contestIllustrWrapper > span {
  padding: 0 10px;
  font-size: 1rem;
}
.mainSCI > div {
  padding: 0.5rem !important;
  margin-bottom: 0.5rem;
}

.activityUserWrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  align-items: center;
}
.activityUser {
  font-size: 1rem;
}
.sideRecent > div > div {
  display: flex;
}
.nameProfil {
  margin-left: 5px;
  display: flex;
  align-self: center;
  width: 100%;
  justify-content: space-between;
  color: #192b41;
  margin-bottom: 1rem;
}
.nameProfil > div > span {
  font-size: 1.2rem;
  font-weight: bold;
}
.nameProfil > div {
  display: flex;
  align-self: center;
  align-items: center;
  margin-right: 0px;
}
strong {
  color: #192b41;
}

span {
  color: #192b41;
}
@media screen and (max-width: 365px) {
  .activityUser {
    font-size: 0.8rem;
  }
  .imgProfile {
    height: 45px;
    width: 45px !important;
    max-width: 45px !important;
  }
  .mainSCI > div {
    padding: 0px !important;
    margin-bottom: 0.5rem;
  }
  .activityUserWrapper {
    justify-content: space-evenly;
  }
}
</style>
