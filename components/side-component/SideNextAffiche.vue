<template>
  <div class>
    <div class="box">
      <p v-if="langSelected === 'EN'">
        <span class="title is-5">news</span>
      </p>
      <p v-else>
        <span class="title is-5">l'actu</span>
      </p>
      <hr />
      <div v-if="babbles && babbles.length > 0">
        <nuxt-link
          v-for="(babble, index) in babbles"
          :key="index"
          class="displayFlex"
          :to="'/news/babble/' + babble._id"
        >
          <b-tooltip
            v-if="babble && babble.created_at"
            :label="babble.title"
            position="is-left"
            type="is-info"
          >
            <small class="has-text-grey-light"
              >{{
                moment(babble.created_at.toString()).local().format("HH:mm")
              }}
              -&nbsp</small
            >
            <img
              v-if="babble.babbleVideo"
              class
              src="~assets/images/teams/soccervideo.png"
              alt="videos"
            />
            <small
              >{{ babble.title.slice(0, 40)
              }}{{ babble.title.length > 40 ? "..." : "" }}</small
            >
          </b-tooltip>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getAllLastnews } from "@/server/api";
export default {
  data() {
    return {
      babbles: [],
      isLoading: true,
    };
  },

  mounted() {
    let mobile = this.$mobileDetect.mobile();
    if (!mobile) {
      getAllLastnews().then((babbles) => {
        if (babbles && babbles.length > 0) {
          this.babbles = babbles;
          this.isLoading = false;
        } else {
          this.babbles = ["empty"];
          this.isLoading = false;
        }
      });
      setInterval(() => {
        getAllLastnews().then((babbles) => {
          if (babbles && babbles.length > 0) {
            this.babbles = babbles;
            this.isLoading = false;
          } else {
            this.babbles = ["empty"];
            this.isLoading = false;
          }
        });
      }, 120000);
    }
  },
  props: {},
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
  methods: {
    moment: function (time) {
      return moment(time);
    },
  },
};
</script>

<style scoped>
img {
  height: 20px;
  width: auto;
  padding-right: 5px;
}
.displayFlex {
  align-items: center;
}
.displayFlex:hover {
  background-color: #eef1f7;
}
small {
  font-size: 0.75em;
}
.box {
  padding: 0.75rem;
}
</style>
