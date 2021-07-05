<template>
  <nav class>
    <div class="babblesMenu">
      <a class="navbar-item is-tab babMenu">
        <img
          loading="lazy"
          class="is-48x48"
          src="~assets/images/teams/rumour.png"
          alt="rumour"
        />
      </a>
      <a class="navbar-item is-tab babMenu">
        <img
          loading="lazy"
          class="is-48x48 invertOk"
          src="~assets/images/teams/question-mark-9.png"
          alt="forum"
        />
      </a>
      <a class="navbar-item is-tab babMenu">
        <img
          loading="lazy"
          class="is-48x48 invertOk"
          src="~assets/images/teams/calendarTeam.png"
          alt="calendar"
        />
      </a>
      <a class="navbar-item is-tab babMenu">
        <img
          loading="lazy"
          class="is-48x48"
          src="~assets/images/ballon-bleu.png"
          alt="ballon"
        />
      </a>
      <a class="navbar-item is-tab babMenu">
        <img
          loading="lazy"
          v-if="team.isNationalTeam === true"
          class="is-48x48 coachImg"
          :src="team.detail.coachImg"
          alt="coach"
        />
        <img
          loading="lazy"
          v-else
          class="is-48x48 coachImg"
          :src="team.coach.picture"
          alt="coach"
        />
      </a>
      <a class="navbar-item is-tab babMenu">
        <img
          loading="lazy"
          class="is-48x48"
          :src="team.shirtDom"
          :alt="team.shortName"
        />
      </a>
      <a class="navbar-item is-tab babMenu">
        <img
          loading="lazy invertOk"
          class="is-48x48"
          src="~assets/images/teams/transfert.png"
          alt="transfert"
        />
      </a>
      <a class="navbar-item is-tab babMenu">
        <img
          loading="lazy"
          class="is-48x48 invertOk"
          src="~assets/images/teams/music-song.png"
          alt="chant"
        />
      </a>
      <a class="navbar-item is-tab babMenu">
        <img
          loading="lazy"
          class="is-48x48"
          src="~assets/images/teams/soccervideo.png"
          alt="video"
        />
      </a>
      <a class="navbar-item is-tab babMenu">
        <img
          loading="lazy"
          class="is-48x48"
          src="~assets/images/teams/stadium.png"
          alt="stade"
        />
      </a>
    </div>
  </nav>
</template>

<script>
import ResultsMatchListContest from "@/components/contest/ContestMain/ResultsMatchListContest";
import { getUser } from "@/server/api";
import moment from "moment";

export default {
  data() {
    return {};
  },
  props: {
    team: "",
  },
  components: {},
  computed: {},

  destroyed() {},

  mounted() {},
  watch: {},
  methods: {},
};
</script>
<style scoped>
.babblesMenu {
  display: flex;
  justify-content: space-between;
}
.is-48x48 {
  width: 40px;
  height: auto;
  max-height: 2.5rem;
}
.babMenu {
  display: flex;
  margin: auto;
}
</style>