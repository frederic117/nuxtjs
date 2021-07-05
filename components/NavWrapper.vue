<template>
  <div>
    <nav-bar
      v-if="$route.path != '/'"
      class="desktopOnlynav"
      @getFavoriteTeam="getFavoriteTeam"
    ></nav-bar>
    <nav-barmobile
      v-if="$route.path != '/'"
      class="mobileOnlynav"
      @getFavoriteTeam="getFavoriteTeam"
    ></nav-barmobile>
  </div>
</template>

<script>
import { getTeamBabbles, getTeam, getAllBabbles } from "@/server/api";
import { getAllMyContests } from "@/server/apiContest";
export default {
  components: {
    NavBarmobile: () => import("@/components/NavBarmobile"),
    NavBar: () => import("@/components/NavBar"),
  },
  methods: {
    getFavoriteTeam() {
      if (this.connectedUser && this.connectedUser._id) {
        this.$emit("getFavoriteTeam");
      } else {
        this.$router.push("/signup");
      }
    },
  },
  mounted() {
    if (
      process.client &&
      !this.$nuxt.isOffline &&
      this.$auth &&
      this.$auth.user &&
      this.$auth.user._id &&
      (this.$route.path != "/" || !this.$route.path.includes("/mypage"))
    ) {
      getAllBabbles("all", 1, this.$auth.user._id).then((babbles) => {
        let babbleLandingtoCommit = {
          page: 1,
          babbles: babbles,
        };
        this.$store.commit("datapage/babbleLanding", babbleLandingtoCommit);
      });
    } else if (
      process.client &&
      !this.$nuxt.isOffline &&
      (this.$route.path != "/" || !this.$route.path.includes("/mypage"))
    ) {
      getAllBabbles("all", 1, "").then((babbles) => {
        let babbleLandingtoCommit = {
          page: 1,
          babbles: babbles,
        };
        this.$store.commit("datapage/babbleLanding", babbleLandingtoCommit);
      });
    }
    if (
      process.client &&
      !this.$nuxt.isOffline &&
      this.$auth &&
      this.$auth.user &&
      this.$auth.user._id
    ) {
      setTimeout(() => {
        getAllMyContests().then((contests) => {
          if (contests && contests != "err") {
            this.$store.commit("datapage/mycontests", contests);
          }
        });
      }, 1);
    }

    if (
      process.client &&
      !this.$nuxt.isOffline &&
      this.$auth.user &&
      this.$auth.user.fanTeam &&
      this.$auth.user.fanTeam.shortName &&
      this.$route.path != `/teams/${this.$auth.user.fanTeam.shortName}`
    ) {
      setTimeout(() => {
        getTeam(this.$auth.user.fanTeam.shortName).then((team) => {
          if (team.name) {
            this.$store.commit("datapage/favTeam", team);
          }
        });
        getTeamBabbles(this.$auth.user.fanTeam.shortName, "all", 1).then(
          (babbles) => {
            let babblestoCommit = {
              page: 1,
              babbles: babbles,
            };
            this.$store.commit("datapage/favTeambabble", babblestoCommit);
          }
        );
      }, 1);
    }
  },
};
</script>

<style scoped>
.mobileOnlynav {
  display: none;
}
@media (max-width: 1047px) {
  .mobileOnlynav {
    display: block !important;
  }

  .desktopOnlynav {
    display: none !important;
  }
}
</style>
