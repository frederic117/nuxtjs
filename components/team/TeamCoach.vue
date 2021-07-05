<template>
  <div class="bandB card level media">
    <div class="mobileBandB">
      <h1 v-if="team && team.coach && team.coach.coachDetail" class="BBull">
        <small class="coachMob">
          {{ langSelected === "EN" ? "Popularity of" : "La cote de" }}

          <strong class="coachName">{{
            team.coach.coachDetail.fullname
          }}</strong>
        </small>
      </h1>
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
            v-if="
              team &&
              team.coach &&
              team.coach.coachDetail &&
              team.coach.coachDetail.image_path
            "
            class="imgProfile"
            :src="team.coach.coachDetail.image_path"
            alt="PicProfile"
          />

          <img
            loading="lazy"
            v-else
            class="imgProfile"
            src="~assets/images/teams/coach.png"
            alt="coach coachImg"
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
              (team.coach.coachSupporters.length /
                (team.coach.coachSupporters.length +
                  team.coach.coachHaters.length)) *
                100 >=
              50,
            'is-thumDown':
              (team.coach.coachSupporters.length /
                (team.coach.coachSupporters.length +
                  team.coach.coachHaters.length)) *
                100 <
              50,
          }"
          >{{
            (
              team.coach.coachSupporters.length +
              (50 /
                (team.coach.coachSupporters.length +
                  50 +
                  team.coach.coachHaters.length +
                  50)) *
                100
            ).toFixed(0)
          }}
          %</strong
        >
      </div>
    </div>
  </div>
</template>

<script>
import { stayWithUs, getOutBitch } from "@/server/api";
export default {
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
    team: "",
  },
  methods: {
    stay() {
      if (!this.$store.state.auth.user.username) {
        this.$router.push("/signup");
      } else {
        stayWithUs(this.team._id).then((resp) => {
          this.$emit("getCoach");
        });
      }
    },
    getOut() {
      if (!this.$store.state.auth.user.username) {
        this.$router.push("/signup");
      } else {
        getOutBitch(this.team._id).then((resp) => {
          this.$emit("getCoach");
        });
      }
    },
  },
};
</script>

<style scoped>
.bandB {
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.mobileBandB {
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.BBull {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100% !important;
}
.coachMob {
  font-size: 1.5rem !important;
}
.coachName {
  margin-top: 0.5rem;
  align-self: center;
  font-size: 1.7rem !important;
  color: #0084a4;
}
.coachPouce {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.bullsAndBearsPic {
  display: flex;
  justify-content: center;
  align-self: center;
}
.teamShirt {
  height: 6rem !important;
  width: auto !important;
}
.coachInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.coachInfo > strong {
  align-self: center;
}
.is-128x128 {
  justify-content: center;
  display: flex;
  width: 150px;
  height: 150px;
}
.thumb {
  font-size: 3.5rem;
}
.is-thumDown {
  color: #fc0526 !important;
}
.is-thumUp {
  color: #2da94f !important;
}
@media (max-width: 1047px) {
  .mobileBandB {
    width: 100%;
    flex-direction: column;
  }
  .BBull {
    padding-top: 0rem;
  }
  .coachMob {
    font-size: 1rem !important;
    align-self: center;
  }
  .coachName {
    margin-top: 0rem;
    font-size: 1.1rem !important;
  }
  .coachPouce {
    justify-content: space-around;
    width: 100%;
  }
  .teamShirt {
    height: 5rem !important;
    width: auto !important;
  }
  .is-128x128 {
    width: 150px;
    height: 150px;
  }
  .thumb {
    font-size: 1.5rem;
    margin: auto;
  }
}
</style>
