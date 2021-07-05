<template>
  <div v-if="$auth.user && $auth.user._id" class="column sideRecent mainSCI">
    <div class="box">
      <p v-if="langSelected === 'EN'">
        <span class="title is-5">contest match picks</span>
      </p>
      <p v-else>
        <span class="title is-5">tendance du contest</span>
      </p>
      <hr class="desktopOnly" />
      <div v-if="lastPronos.length > 0" class="columns mainwrapper">
        <div
          @click="seeDetail(lastProno)"
          v-for="(lastProno, index) in lastPronos"
          :key="index"
          class="box pointer"
        >
          <div>
            <div class="wrappPos">
              <div class="displayFlex">
                <img
                  v-if="lastProno && lastProno.match[0]"
                  loading="lazy"
                  class="teamShirt pointer"
                  :src="lastProno.match[0].homeTeamId.teamImg"
                  :alt="lastProno.match[0].homeTeamName"
                  :class="{
                    invertOk: lastProno.match[0].homeTeamName
                      .toUpperCase()
                      .includes('JUVE'),
                  }"
                />
                <p>
                  &nbsp
                  <strong class="has-text-success"
                    >{{
                      Math.round(
                        (lastProno.nbBet1 /
                          (lastProno.nbBet1 +
                            lastProno.nbBetN +
                            lastProno.nbBet2)) *
                          100
                      )
                    }}
                    %</strong
                  >
                </p>
              </div>
              <div class="displayFlex">
                <strong class="has-text-primary">X</strong>
                <p>
                  &nbsp
                  <strong class="has-text-info"
                    >{{
                      Math.round(
                        (lastProno.nbBetN /
                          (lastProno.nbBet1 +
                            lastProno.nbBetN +
                            lastProno.nbBet2)) *
                          100
                      )
                    }}
                    %</strong
                  >
                </p>
              </div>
              <div class="displayFlex">
                <img
                  v-if="lastProno && lastProno.match[0]"
                  loading="lazy"
                  class="teamShirt pointer"
                  :src="lastProno.match[0].awayTeamId.teamImg"
                  :alt="lastProno.match[0].awayTeamName"
                  :class="{
                    invertOk: lastProno.match[0].awayTeamName
                      .toUpperCase()
                      .includes('JUVE'),
                  }"
                />
                <p>
                  &nbsp
                  <strong class="has-text-danger"
                    >{{
                      100 -
                      (Math.round(
                        (lastProno.nbBet1 /
                          (lastProno.nbBet1 +
                            lastProno.nbBetN +
                            lastProno.nbBet2)) *
                          100
                      ) +
                        Math.round(
                          (lastProno.nbBetN /
                            (lastProno.nbBet1 +
                              lastProno.nbBetN +
                              lastProno.nbBet2)) *
                            100
                        ))
                    }}
                    %</strong
                  >
                </p>
              </div>
              <div class="displayFlex">
                <img
                  loading="lazy"
                  class="teamShirt"
                  alt="miseLogo"
                  src="~assets/images/miseLogo.png"
                />
                &nbsp
                <p>
                  <strong class="has-text-contest">{{
                    Number(lastProno.sumOfBettingPointsOnMatch).toLocaleString(
                      "fr"
                    )
                  }}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="lastPronos.length === 0">
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
export default {
  data() {
    return {};
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
    lastPronos: "",
  },
  methods: {
    seeDetail(event) {
      this.$emit("seeDetailMatchprono", event);
    },
  },
};
</script>

<style scoped>
.wrappPos {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.wrappPos > .displayFlex {
  width: 25%;
  justify-content: center;
  align-items: center;
}
.box > div > .displayFlex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.teamShirt {
  width: auto;
  height: 1.25rem;
}
.mainwrapper {
  width: 100% !important;
  margin: 0rem !important;
  flex-direction: column;
}
.mainwrapper > .box {
  background-color: #eef1f7 !important;
  padding: 0.25rem !important;
}
.has-text-contest {
  font-size: 1rem !important;
}
@media (max-width: 1047px) {
  .desktopOnly {
    display: none !important;
  }
  .mainwrapper {
    margin-top: 5px !important;
  }
  .box {
    background-color: white;
    border-radius: 0px;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #192b41 !important;
    display: block;
    padding: 0.15rem !important;
  }
}
</style>
