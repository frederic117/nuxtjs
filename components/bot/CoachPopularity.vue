<template>
  <section class="section" v-if="team">
    <div class="coachpopularity box column is-6" id="ActionCard">
      <div id="cardAction" class="card profile-card">
        <div class="card-content">
          <div class="media" id="teamInfo">
            <div class="media-content">
              <nav class="bandB level">
                <div class="mobileBandB">
                  <div class="BBull">
                    <small class="coachMob">
                      {{
                        langSelected === "EN" ? "Popularity of" : "La cote de"
                      }}
                      <strong
                        class="coachName"
                        v-if="team.isNationalTeam === true"
                        >{{ team.detail.coach }}</strong
                      >
                      <strong class="coachName" v-else>{{
                        team.coach.name
                      }}</strong>
                    </small>
                  </div>
                </div>
                <div class="coachPouce">
                  <div @click="getOut()" class="bullsAndBearsPic">
                    <img
                      loading="lazy"
                      class="teamShirt pointer"
                      src="~assets/images/leave.png"
                      alt="thumbdown"
                    />
                  </div>
                  <div class="coachInfo">
                    <figure class="is-128x128 is-circle">
                      <img
                        v-if="team.isNationalTeam === true"
                        class="imgProfile"
                        :src="team.detail.coachImg"
                        alt="PicProfile"
                      />
                      <img
                        loading="lazy"
                        v-else
                        class="imgProfile"
                        :src="team.coach.picture"
                        alt="PicProfile"
                      />
                    </figure>
                  </div>
                  <div @click="stay()" class="bullsAndBearsPic">
                    <img
                      loading="lazy"
                      class="teamShirt pointer"
                      src="~assets/images/stay.png"
                      alt="thumbup"
                    />
                  </div>
                </div>
                <div class="mobileBandB">
                  <div class="BBull">
                    <strong
                      class="thumb"
                      :class="{
                        'is-thumUp':
                          (team.coach.coachOk.length /
                            (team.coach.coachOk.length +
                              team.coach.coachKo.length)) *
                            100 >=
                          50,
                        'is-thumDown':
                          (team.coach.coachOk.length /
                            (team.coach.coachOk.length +
                              team.coach.coachKo.length)) *
                            100 <
                          50,
                      }"
                      >{{
                        (
                          (team.coach.coachOk.length /
                            (team.coach.coachOk.length +
                              team.coach.coachKo.length)) *
                          100
                        ).toFixed(0)
                      }}
                      %</strong
                    >
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { getTeamDetail } from "@/server/api";
import moment from "moment";

export default {
  asyncData({ params }) {
    return getTeamDetail(params.shortName).then((team) => {
      return { team: team };
    });
  },
  components: {},
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      stadiumModal: false,
      championship: "",
      watchItem: "",
      indexSelected: "effectif",
      palmares: "",
      champion: "",
      cup: "",
      championLeague: "",
      EuropaLeague: "",
      audios: [
        {
          id: "hymne",
          name: "Hymne",
          file: "",
          isPlaying: false,
        },
      ],
    };
  },

  mounted() {
    this.isLoading = true;
    let shortName = this.$route.params.shortName;
    getTeamDetail(shortName).then((team) => {
      if (team === "no team") {
        this.$router.push("/notFound");
      }
      this.team = team;
      this.palmares = team.detail.palmares;
      this.$store.commit("var/setNewValue", this.team.championship);
      if (team.isNationalTeam === false) {
        this.championship = team.championship;
      } else {
        this.championship = "";
        this.audios[0].file = new Audio(this.team.anthem);
      }
      if (this.championship === "301") {
        this.champion = team.detail.palmares
          .filter((l) => {
            return l.title === "French Champion";
          })
          .map((annee) => {
            return annee.year;
          });
        this.cup = team.detail.palmares
          .filter((l) => {
            return l.title === "French Cup Winner (Coupe de France)";
          })
          .map((annee) => {
            return annee.year;
          });
        this.championLeague = team.detail.palmares
          .filter((l) => {
            return (
              l.title === "Champions League Winner" ||
              l.title === "European Cup Winner"
            );
          })
          .map((annee) => {
            return annee.year;
          });
        this.EuropaLeague = team.detail.palmares
          .filter((l) => {
            return (
              l.title === "UEFA Cup Winner" ||
              l.title === "Europa League Winner"
            );
          })
          .map((annee) => {
            return annee.year;
          });
      } else if (this.championship === "564") {
        this.champion = team.detail.palmares
          .filter((l) => {
            return l.title === "Spanish Champion";
          })
          .map((annee) => {
            return annee.year;
          });
        this.cup = team.detail.palmares
          .filter((l) => {
            return l.title === "Spanish Cup Winner (Copa del Rey)";
          })
          .map((annee) => {
            return annee.year;
          });
        this.championLeague = team.detail.palmares
          .filter((l) => {
            return (
              l.title === "Champions League Winner" ||
              l.title === "European Cup Winner"
            );
          })
          .map((annee) => {
            return annee.year;
          });
        this.EuropaLeague = team.detail.palmares
          .filter((l) => {
            return (
              l.title === "UEFA Cup Winner" ||
              l.title === "Europa League Winner"
            );
          })
          .map((annee) => {
            return annee.year;
          });
      } else if (this.championship === "82") {
        this.champion = team.detail.palmares
          .filter((l) => {
            return l.title === "German Champion";
          })
          .map((annee) => {
            return annee.year;
          });
        this.cup = team.detail.palmares
          .filter((l) => {
            return l.title === "German Cup Winner (DFB-Pokal)";
          })
          .map((annee) => {
            return annee.year;
          });
        this.championLeague = team.detail.palmares
          .filter((l) => {
            return (
              l.title === "Champions League Winner" ||
              l.title === "European Cup Winner"
            );
          })
          .map((annee) => {
            return annee.year;
          });
        this.EuropaLeague = team.detail.palmares
          .filter((l) => {
            return (
              l.title === "UEFA Cup Winner" ||
              l.title === "Europa League Winner"
            );
          })
          .map((annee) => {
            return annee.year;
          });
      } else if (this.championship === "384") {
        this.champion = team.detail.palmares
          .filter((l) => {
            return l.title === "Italian Champion";
          })
          .map((annee) => {
            return annee.year;
          });
        this.cup = team.detail.palmares
          .filter((l) => {
            return l.title === "Italian Cup Winner (Coppa Italia)";
          })
          .map((annee) => {
            return annee.year;
          });
        this.championLeague = team.detail.palmares
          .filter((l) => {
            return (
              l.title === "Champions League Winner" ||
              l.title === "European Cup Winner"
            );
          })
          .map((annee) => {
            return annee.year;
          });
        this.EuropaLeague = team.detail.palmares
          .filter((l) => {
            return (
              l.title === "UEFA Cup Winner" ||
              l.title === "Europa League Winner"
            );
          })
          .map((annee) => {
            return annee.year;
          });
      } else if (this.championship === "8") {
        this.champion = team.detail.palmares
          .filter((l) => {
            return l.title === "English Champion";
          })
          .map((annee) => {
            return annee.year;
          });
        this.cup = team.detail.palmares
          .filter((l) => {
            return l.title === "FA Cup Winner";
          })
          .map((annee) => {
            return annee.year;
          });
        this.championLeague = team.detail.palmares
          .filter((l) => {
            return (
              l.title === "Champions League Winner" ||
              l.title === "European Cup Winner"
            );
          })
          .map((annee) => {
            return annee.year;
          });
        this.EuropaLeague = team.detail.palmares
          .filter((l) => {
            return (
              l.title === "UEFA Cup Winner" ||
              l.title === "Europa League Winner"
            );
          })
          .map((annee) => {
            return annee.year;
          });
      }
      this.isLoading = false;
    });
  },
  watch: {
    $route() {
      setTimeout(() => {
        this.$store.commit("var/setNewValue", this.team.championship);
      }, 1000);
    },
  },
  methods: {
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
    SignupModal() {
      this.$router.push("/signup");
    },
    getEffectif() {
      this.indexSelected = "effectif";
    },
    getArrivee() {
      this.indexSelected = "arrivee";
    },
    getDepart() {
      this.indexSelected = "depart";
    },
    getResultat() {
      this.indexSelected = "resultat";
    },
    getCalendrier() {
      this.indexSelected = "calendrier";
    },
    stay() {
      if (!this.$store.state.auth.user.username) {
        this.SignupModal();
      } else {
        stayWithUs(this.team._id).then((resp) => {
          getTeamDetail(this.$route.params.shortName).then((team) => {
            this.team = team;
          });
        });
      }
    },
    getOut() {
      if (!this.$store.state.auth.user.username) {
        this.SignupModal();
      } else {
        getOutBitch(this.team._id).then((resp) => {
          getTeamDetail(this.$route.params.shortName).then((team) => {
            this.team = team;
          });
        });
      }
    },

    ligue() {
      this.$store.commit("var/setNewValue", this.team.championship);
      setTimeout(() => {
        this.$router.push("/leagues");
      }, 10);
    },

    moment: function (time) {
      return moment(time);
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.section {
  padding: 0rem !important;
}
.thumb {
  font-size: 2rem;
  margin: auto;
}
.coachPouce {
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.mobileBandB {
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.coachName {
  margin-top: 0.5rem;
  align-self: center;
  font-size: 1.5rem !important;
}
.coachInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.is-128x128 {
  justify-content: center;
  display: flex;
  width: 128px;
  height: 128px;
}
.bandB {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-content {
  padding: 1.5rem;
}

.BBull {
  display: flex;
  flex-direction: column;
}
.teamShirt {
  height: 6rem !important;
  width: auto !important;
}
#cardAction {
  margin-bottom: 2.5% !important;
}
.bullsAndBearsPic {
  display: flex;
  justify-content: center;
}
#ActionCard {
  width: 100%;
  padding: 0.25rem !important;
}
#teamInfo {
  display: flex;
}
small {
  font-size: 1.1rem !important;
}
.coachMob {
  font-size: 1.5rem !important;
}
@media (max-width: 1047px) {
  .thumb {
    font-size: 1.5rem;
  }
  .coachName {
    align-self: center;
    margin-top: 0rem;
    font-size: 1.1rem !important;
  }
  .coachPouce {
    justify-content: space-around;
    width: 100%;
  }
  .is-128x128 {
    width: 80px;
    height: 80px;
  }
  .bandB {
    display: flex;
    align-items: center;
  }

  .mobileBandB {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  small {
    font-size: 0.7rem !important;
  }
  .card-content {
    padding: 0.5rem;
  }
  .BBull {
    width: 100%;
    padding-top: 0rem;
  }
  .coachMob {
    font-size: 1rem !important;
    align-self: center;
  }
  .teamShirt {
    height: 5rem !important;
    width: auto !important;
  }
}
</style>
