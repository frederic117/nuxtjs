<template>
  <div class>
    <div v-if="$auth.user && $auth.user._id">
      <div v-if="lastPronosTodisplay.length > 0">
        <div
          v-for="(lastProno, index) in lastPronosTodisplay"
          :key="index"
          class="columns mainwrapper"
        >
          <div class="picss column is-12 is-marginless">
            <div class="media-left">
              <figure class="image is-48x48 is-circle">
                <nuxt-link :to="'/dashboard/' + lastProno.user._id" class>
                  <img
                    loading="lazy"
                    class="imgProfile"
                    :src="lastProno.user.picProfile"
                    alt="Image"
                  />
                </nuxt-link>
              </figure>
            </div>

            <div class="displayFlex">
              <nuxt-link
                class="nameWrap"
                :to="'/dashboard/' + lastProno.user._id"
              >
                <strong class="alignCenter">
                  &commat;{{ lastProno.user.username }}
                  <img
                    v-if="lastProno.user.isOnline"
                    class="is-12x12"
                    src="~assets/images/online.png"
                    alt="online"
                  />
                </strong>
              </nuxt-link>
              <div class="pointsWrap">
                <img
                  v-if="
                    lastProno.match.status.toUpperCase() != 'NS' &&
                    lastProno.match.status.toUpperCase() != 'TBA' &&
                    lastProno.bettingPoints
                  "
                  class="miseLogoResult"
                  src="https://www.footfoot.co/miseLogo.png"
                  alt="contest"
                />
                <strong
                  v-if="
                    lastProno.match.status.toUpperCase() != 'NS' &&
                    lastProno.match.status.toUpperCase() != 'TBA' &&
                    lastProno.bettingPoints
                  "
                  class="has-text-contest"
                >
                  {{ lastProno.bettingPoints.toLocaleString("fr") }}</strong
                >
              </div>

              <div class="pronoPlayer">
                <div class="control">
                  <b-tag
                    :class="{
                      'is-green': lastProno.scoreTeam1 > lastProno.scoreTeam2,
                      'is-red': lastProno.scoreTeam1 < lastProno.scoreTeam2,
                      'is-info': lastProno.scoreTeam1 == lastProno.scoreTeam2,
                    }"
                    size="is-big"
                    >{{ lastProno.scoreTeam1 }}</b-tag
                  >
                </div>
                <strong class="separatorScore">-</strong>
                <div class="control">
                  <b-tag
                    :class="{
                      'is-green': lastProno.scoreTeam1 < lastProno.scoreTeam2,
                      'is-red': lastProno.scoreTeam1 > lastProno.scoreTeam2,
                      'is-info': lastProno.scoreTeam1 == lastProno.scoreTeam2,
                    }"
                    size="is-big"
                    >{{ lastProno.scoreTeam2 }}</b-tag
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="lastPronosTodisplay.length === 0">
        {{
          langSelected === "EN"
            ? "There are no games today!"
            : "Il n'y a pas de matchs aujourd'hui !"
        }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      lastPronosTodisplay: "",
    };
  },
  computed: {
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
  watch: {
    usersOnlinelist: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.usersOnlinelist) {
          this.lastPronosTodisplay = this.lastPronos
            .map((el) => {
              let isOnline;
              let obj = el;
              el.isOnline = true
                ? this.usersOnlinelist.filter(
                    (l) =>
                      l.user == el.user._id &&
                      moment().add(-1, "minutes").format() <
                        moment(l.time).format()
                  ).length > 0
                : false;
              return obj;
            })
            .sort((a, b) => b.bettingPoints - a.bettingPoints);
        }
      },
    },
    lastPronos: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.lastPronos) {
          this.lastPronosTodisplay = this.lastPronos
            .map((el) => {
              let isOnline;
              let obj = el;
              el.isOnline = true
                ? this.usersOnlinelist.filter(
                    (l) =>
                      l.user == el.user._id &&
                      moment().add(-1, "minutes").format() <
                        moment(l.time).format()
                  ).length > 0
                : false;
              return obj;
            })
            .sort((a, b) => b.bettingPoints - a.bettingPoints);
        }
      },
    },
  },
  props: {
    lastPronos: "",
  },
  methods: {
    moment: function (time) {
      return moment(time);
    },
  },
};
</script>

<style scoped>
.is-48x48 {
  height: 32px !important;
  width: 32px !important;
}
.displayFlex {
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.titleHead {
  justify-content: center;
}
.titleHead > .logo {
  height: 1.5rem;
  width: 1.5rem;
}
.separatorScore {
  font-weight: 1000;
  font-size: 1rem;
  margin: 0rem 0.5rem;
}
.media-left {
  margin-right: 0.5rem;
  align-self: center;
}
.mainwrapper {
  width: 100% !important;
  margin: 0rem !important;
}
.is-green {
  background-color: #2da94f;
  color: #eef1f7;
}
.is-greyLit {
  background-color: #778899;
  color: #eef1f7;
}
.is-blue {
  background-color: #192b41;
  color: #eef1f7;
}
.is-red {
  background-color: #eb412d;
  color: #eef1f7;
}
.control {
  margin-bottom: 1px;
  font-weight: bolder;
}
.pronoPlayer {
  display: flex !important;
  align-items: center;
}
.is-9 {
  margin-left: 5%;
}
.picss {
  display: flex;
  margin-bottom: 10px !important;
}
a {
  color: #192b41 !important;
}
.seeDash {
  color: #b5b5b5 !important;
}
.alignCenter {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.alignCenter > .is-12x12 {
  margin-left: 10px;
  height: 15px;
  width: auto;
}
.miseLogoResult {
  height: 25px !important;
  width: auto;
  margin-right: 5px;
}
.pointsWrap {
  display: flex;
  align-items: center;
  width: 120px;
  justify-content: flex-start;
}
.nameWrap {
  width: 150px;
}
.pronoPlayer {
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 1047px) {
  .nameWrap {
    width: 120px;
  }
  .alignCenter > .is-12x12 {
    margin-left: 10px;
    height: 10px;
    width: auto;
  }

  .box {
    background-color: white;
    border-radius: 0px;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #192b41 !important;
    display: block;
    padding: 0.15rem;
  }
}
</style>
