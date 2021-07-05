<template>
  <div>
    <div class="column is-6" id="ActionCard">
      <div id class="box">
        <div class="card-content">
          <div class="media" id="stockInfo">
            <div class="media-content">
              <div class="team-banner">
                <div class="sock-info">
                  <figure class="contestImg">
                    <nuxt-link :to="'/contest/rules/' + contest._id">
                      <img
                        v-if="masterContest.image != ''"
                        class="default-logo-contest"
                        :src="masterContest.image"
                        alt="contest"
                      />
                      <img
                        v-else
                        class="default-logo-contest"
                        src="~assets/images/logo-contest.png"
                        alt="contest"
                      />
                    </nuxt-link>
                  </figure>
                  <div class="subtitleIsin is-6">
                    <nuxt-link
                      :to="'/contest/leaderboard/' + masterContest._id"
                    >
                      <h1 class="longNameTitle title is-5">
                        <strong class="has-text-contest">{{
                          masterContest.name
                        }}</strong>
                      </h1>
                    </nuxt-link>
                    <div>
                      <h2 class="contestNamePart">
                        <strong>Round {{ contest.name }}</strong
                        >&nbsp
                        <h1 @click="goToRules" class="is-6 pointer">
                          <a class>{{
                            langSelected === "EN" ? "(rules" : "(règles"
                          }}</a
                          >)
                        </h1>
                      </h2>
                      <div>
                        <h1 class="longNameTitle title">
                          <!-- Fin: -->
                          <div
                            v-if="contest.status === true"
                            class="timer countdown"
                          >
                            <div
                              class="timer time-unite created"
                              v-show="years"
                            >
                              <strong
                                class="has-text-yellow time-unite-value"
                                >{{ years }}</strong
                              >&nbsp
                              <strong class="has-text-yellow time-unite-title"
                                >Y</strong
                              >
                            </div>
                            <div
                              class="timer time-unite created"
                              v-show="months"
                            >
                              &nbsp
                              <strong
                                class="has-text-yellow time-unite-value"
                                >{{ months }}</strong
                              >&nbsp
                              <strong class="has-text-yellow time-unite-title"
                                >M</strong
                              >
                            </div>
                            <div class="timer time-unite created" v-show="days">
                              &nbsp
                              <strong
                                class="has-text-yellow time-unite-value"
                                >{{ days }}</strong
                              >&nbsp
                              <strong class="has-text-yellow time-unite-title"
                                >J</strong
                              >
                            </div>
                            <div class="timer time-unite created">
                              &nbsp
                              <strong
                                class="has-text-yellow time-unite-value"
                                >{{ hours }}</strong
                              >&nbsp
                              <strong class="has-text-yellow time-unite-title"
                                >h</strong
                              >
                            </div>
                            <div class="timer time-unite created">
                              &nbsp
                              <strong
                                class="has-text-yellow time-unite-value"
                                >{{ minutes }}</strong
                              >&nbsp
                              <strong class="has-text-yellow time-unite-title"
                                >min</strong
                              >
                            </div>
                          </div>
                        </h1>
                      </div>
                      <div
                        v-if="contest.isRegistrationOpen === true"
                        class="mobile loggiin"
                      >
                        <client-only>
                          <b-dropdown :triggers="['hover']">
                            <template #trigger>
                              <button
                                class="pointer button is-large buttonLoginInvit"
                                slot="trigger"
                              >
                                <span>{{
                                  langSelected === "EN"
                                    ? "invite friends"
                                    : "invite tes amis"
                                }}</span>
                              </button>
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
                                <i class="fas fa-copy"></i>&nbspLien de
                                partage</a
                              >
                            </b-dropdown-item>
                          </b-dropdown>
                        </client-only>
                      </div>
                      <div v-else class="mobile loggiin loginClose">
                        <a
                          class="pointer button is-large buttonLoginInvitClose"
                          type="button"
                          >{{
                            langSelected === "EN"
                              ? "Round finished"
                              : "Round terminé"
                          }}</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="centralHeaderContest">
                  Bienvenue sur footfoot ! Prends ton premier prono sans tarder
                  et tente de remporter les 10 F$ du champion !
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      sharing: {
        url: `https://www.footfoot.co/contest/inscription/${this.$route.params.contestId}`,
        title: `Gagne des footcoins en faisant les meilleurs pronos de football - Pour l'amour du foot`,
        description: `Le meilleur pronostiqueur remportera gloire, respect et footcoins`,
        quote: `oublie que t'as aucune chance, participe à mon contest de prono avec moi sur footfoot.co !`,
        hashtags: `footfoot,football,pronos,contest,picks,paris`,
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
      contest: {
        _id: "601158d8c7fd5f5ea4d894de",
        betValue: 0,
        freeRound: true,
        isPublic: true,
        isRegistrationOpen: true,
        name: "1",
        nbPlayersTarget: 20,
        participants: [
          "5f89c1b6ccedc73d441a0ade",
          "5fa3c31c35a485242808d78b",
          "5fb241f0020546316831a697",
        ],
        sansMise: false,
        status: true,
      },
      copyLink: "",
      actualTime: moment().local().format("X"),
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      emailObject: "Rejoins-nous sur footfoot.co !",
      masterContest: {
        _id: "601158d8c7fd5f5ea4d894dd",
        currentRound: "1",
        image: "",
        isClosed: false,
        isPublic: true,
        name: "freeRoll",
      },
    };
  },
  methods: {
    moment: function (time) {
      return moment(time);
    },
    addOneSecondToActualTimeEverySecond() {
      var component = this;
      component.actualTime = moment().local().format("X");
      setTimeout(function () {
        component.addOneSecondToActualTimeEverySecond();
      }, 1000);
    },
    getDiffInSeconds() {
      return (
        moment(this.contest.deadline).local().format("X") - this.actualTime
      );
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
  },
};
</script>
<style scoped>
</style>