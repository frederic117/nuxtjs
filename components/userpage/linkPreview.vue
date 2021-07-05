<template>
  <div>
    <!-- 
     <div id="loader-container" v-if="loading">
      <slot name="loading">
        <div class="spinner"></div>
      </slot>
    </div>
    -->
    <div v-if="response">
      <div v-if="!$route.path.includes('/publish')" class="wrapper">
        <div
          v-if="response.images && response.images.length > 0"
          class="card-img"
        >
          <img loading="lazy" :src="response.images[0]" />
        </div>
        <div class="card-info">
          <div class="card-text">
            <h1>{{ response.title }}</h1>
            <p>{{ response.description }}</p>
          </div>
        </div>
      </div>
      <div
        v-if="
          $route.path.includes('/publish') &&
          response.images &&
          response.images.length > 0
        "
        class="wrapper"
      >
        <figure class="image imageBabble">
          <img
            loading="lazy"
            :src="response.images[0]"
            alt="Placeholder image"
          />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getUrlpreview } from "@/server/api";
export default {
  name: "link-prevue",
  data() {
    return {
      firstCall: true,
      response: "",
      validUrl: false,
      waitingInter: 5000,
      now: new Date(),
      callEngage: false,
      loading: false,
    };
  },
  props: {
    url: {
      type: String,
      default: "",
    },
    apiUrl: {
      type: String,
      default: "https://linkpreview-api.herokuapp.com/",
    },
  },
  watch: {
    url: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (!this.url) {
          this.$emit("problemLink");
        } else {
          if (this.url.includes("https://allfoot")) {
            this.$emit("problemLink");
          } else {
            if (this.firstCall == false && this.callEngage == false) {
              let regex =
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
              let validUrl = regex.test(this.url);
              if (validUrl) {
                if (
                  moment().format() >
                  moment(this.now).add(0.1, "minutes").format()
                ) {
                  this.getLinkPreview();
                }
              } else {
                this.$emit("problemLink");
              }
            }
          }
        }
      },
    },
  },
  created() {
    if (!this.url) {
      this.$emit("problemLink");
    } else {
      if (this.url.includes("https://allfoot")) {
        this.$emit("problemLink");
      } else {
        this.loading = true;
        let regex =
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        let validUrl = regex.test(this.url);
        if (validUrl) {
          getUrlpreview(this.url).then((resp) => {
            this.firstCall = false;
            this.loading = false;
            if (resp == "error") {
              this.$emit("problemLink");
            } else if (resp) {
              this.response = {};
              this.response.images = resp.babbleImg ? [resp.babbleImg] : "";
              this.response.title = resp.title;
              this.response.description = resp.babble;
              this.response.url = resp.source;
              this.$emit("successLink", this.response);
            } else {
              this.$emit("problemLink");
            }
          });
        } else {
          this.$emit("problemLink");
        }
      }
    }
  },
  methods: {
    getLinkPreview() {
      this.loading = true;
      let regex =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
      let validUrl = regex.test(this.url);
      if (validUrl) {
        if (this.callEngage == false) {
          this.callEngage = true;
          getUrlpreview(this.url).then((resp) => {
            this.loading = false;
            this.callEngage = false;
            this.now = new Date();
            if (resp == "error") {
              this.$emit("problemLink");
            } else if (resp) {
              this.response = {};
              this.response.images = resp.babbleImg ? [resp.babbleImg] : "";
              this.response.title = resp.title;
              this.response.description = resp.babble;
              this.response.url = resp.source;
              this.$emit("successLink", this.response);
            } else {
              this.$emit("problemLink");
            }
          });
        }
      } else {
        this.$emit("problemLink");
      }
    },
    moment: function (time) {
      return moment(time);
    },
  },
};
</script>

<style scoped>
.liresuite {
  text-align: center;
  display: flex;
  width: 100%;
  justify-content: center;
  font-style: italic;
}
h1 {
  font-size: 1.2rem !important;
  font-weight: bold;
}
.wrapper {
  overflow: auto;
  background-color: #eef1f7;
  justify-content: center;
  align-items: center;
}
.card-img {
  width: 100%;
  display: flex;
  justify-content: center;
}
.card-img img {
  width: 100%;
}
img {
  vertical-align: middle;
  border-style: none;
}
.card-info {
  background-color: #eef1f7;
}
.card-text {
  width: 80%;
  margin: 0 auto;
  text-align: justify;
}
.card-text h1 {
  text-align: center;
  font-size: 24px;
  color: #474747;
  margin: 5px 0 5px 0;
}
.card-text p {
  color: #8d8d8d;
  font-size: 15px;
  overflow: hidden;
  margin: 0;
  text-align: center;
}

/* Loader */
.spinner {
  margin-left: 45%;
  height: 28px;
  width: 28px;
  animation: rotate 0.8s infinite linear;
  border: 5px solid #868686;
  border-right-color: transparent;
  border-radius: 50%;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 1047px) {
  .card-img img {
    width: 100%;
  }
  h1 {
    font-family: "sofia_pro_light_condensedRg", "HelveticaNeue",
      "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    font-size: 0.9rem !important;
    font-weight: bold;
  }
}
</style>