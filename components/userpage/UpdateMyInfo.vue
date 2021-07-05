<template>
  <section>
    <div class="is-vcentered" v-if="$auth.user && $auth.user.username">
      <div class="column">
        <div class="box is-6 is-center" id="ActionCard">
          <div class="media">
            <div class="media-content">
              <div class="spaceBetween">
                <div class="displayFlex namePicWrap">
                  <div class="image is-40x40 is-circle">
                    <img
                      loading="lazy"
                      class="imgProfile"
                      :src="$auth.user.picProfile"
                      alt="Image"
                    />
                  </div>
                  <p class="has-text-contest title is-3">
                    {{ $auth.user.username }}
                  </p>
                </div>
                <span
                  class="displayFlex button namePicWrap pointer"
                  v-if="!darkActive"
                  @click="setToDark"
                  ><p>🌑 Dark mode</p></span
                >
                <span
                  class="displayFlex button namePicWrap pointer"
                  v-else
                  @click="setToDark"
                  ><p>🌕 Light mode</p></span
                >

                <img
                  v-if="langSelected == 'EN'"
                  loading="lazy"
                  class="flag-img"
                  @click="changeLang('FR')"
                  src="~assets/images/frenchflag.png"
                  alt="frenchFlag"
                />
                <img
                  v-else
                  loading="lazy"
                  class="flag-img"
                  @click="changeLang('EN')"
                  src="~assets/images/ukflag.png"
                  alt="ukFlag"
                />
              </div>
              <div>
                <p v-if="okMessage">
                  {{
                    langSelected === "EN"
                      ? "Your profile has been updated successfully!"
                      : "ton profil a bien été mis à jour"
                  }}
                </p>
                <b-notification v-if="error" type="is-danger" has-icon>{{
                  error
                }}</b-notification>
                <div class="displayFlex">
                  <b-field label="pseudo :">
                    <b-input
                      class="location"
                      type="text"
                      maxlength="10"
                      v-model="username"
                    ></b-input>
                  </b-field>
                  <b-field
                    class="city"
                    :label="`${
                      langSelected === 'EN' ? 'your city:' : 'ta ville :'
                    }`"
                  >
                    <b-input
                      class="location"
                      type="text"
                      v-model="location"
                    ></b-input>
                  </b-field>
                </div>
                <div class="displayFlex">
                  <b-field
                    :label="`${
                      langSelected === 'EN' ? 'your team:' : 'ton club :'
                    }`"
                  >
                    <multiselect
                      :custom-label="customLabel"
                      v-model="favoriteTeam"
                      :placeholder="`${
                        langSelected === 'EN' ? 'your team:' : 'ton club :'
                      }`"
                      :loading="loading"
                      :options="options"
                      :close-on-select="true"
                      @search-change="asyncFind"
                      @close="closeMulti()"
                      :showNoOptions="false"
                      track-by="name"
                      label="name"
                    >
                      <template slot="option" slot-scope="props">
                        <div>
                          <div class="searchWrap">
                            <img
                              loading="lazy"
                              class="option__image navImg"
                              :src="props.option.teamImg"
                              alt="team"
                            />
                            <div class="option__desc">
                              <span class="option__title">{{
                                props.option.name
                              }}</span>
                            </div>
                          </div>
                        </div>
                      </template>

                      <span slot="noResult">{{
                        langSelected === "EN"
                          ? "no result"
                          : "Pas de résultats correspondants !"
                      }}</span>
                    </multiselect>
                  </b-field>
                </div>
                <div class="displayFlex columnDir">
                  <b-field
                    class="carrousselUltrawrap"
                    :label="`${
                      langSelected === 'EN'
                        ? 'change your pic:'
                        : 'change ta photo :'
                    }`"
                  >
                    <figure
                      v-if="persoImage"
                      class="al image"
                      :draggable="false"
                    >
                      <croppa
                        class="cropImg carrimg"
                        v-model="image"
                        initial-image
                        :width="150"
                        :height="150"
                        :quality="1"
                        :placeholder-font-size="18"
                        :prevent-white-space="true"
                      ></croppa>
                    </figure>
                    <b-carousel
                      v-if="!persoImage"
                      class="carrousselWrap"
                      :autoplay="false"
                      indicator-custom
                      :indicator-inside="false"
                      :overlay="gallery"
                      @click="switchGallery(true)"
                      v-model="imgSelected"
                    >
                      <b-carousel-item
                        v-for="(item, i) in imageArray"
                        :key="i"
                        class="carrousselImgWrap"
                      >
                        <a class="image">
                          <img class="carrimg" :src="item" />
                        </a>
                      </b-carousel-item>

                      <template slot="indicators" slot-scope="props">
                        <figure class="al image" :draggable="false">
                          <img
                            class="smallCarrimg"
                            :draggable="false"
                            :src="imageArray[props.i]"
                          />
                        </figure>
                      </template>
                    </b-carousel>
                  </b-field>
                  <button
                    v-if="!persoImage"
                    @click="iwantMypic"
                    class="button is-small is-success is-outlined"
                  >
                    {{
                      langSelected === "EN"
                        ? "or choose yours"
                        : "ou choisis la tienne"
                    }}
                  </button>
                  <button
                    v-if="persoImage"
                    @click="eraseMypic"
                    class="button is-small is-danger is-outlined"
                  >
                    {{ langSelected === "EN" ? "erase" : "effacer" }}
                  </button>
                </div>
                <div class="displayFlex">
                  <b-field
                    class="textareaWrap"
                    :label="`${
                      langSelected === 'EN'
                        ? 'Bio, Website... Anything you want to share!'
                        : 'Bio, Website... Tout ce que tu veux partager !'
                    }`"
                  >
                    <b-input
                      maxlength="200"
                      type="textarea"
                      v-model="bio"
                    ></b-input>
                  </b-field>
                </div>
                <div class="centerButton">
                  <button class="button" @click="cancelUpdate">
                    {{ langSelected === "EN" ? "Cancel" : "Annuler" }}
                  </button>
                  <button class="button is-primary" @click="saveMyProfile">
                    {{ langSelected === "EN" ? "Save" : "Sauvegarder" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
////mutli select
import Multiselect from "vue-multiselect";
import { searchTeam } from "@/server/apiSearch";
import { getInsiderProfileInfo, uploadPicture } from "@/server/apiDashboard";
import { userUpdate } from "@/server/apiAdmin";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      darkTheme: "",
      imgSelected: 0,
      persoImage: false,
      gallery: false,
      ////start multi select
      langue: ["FR", "EN"],
      lang: "",
      //end multi select
      profileInfo: null,
      bio: "",
      image: null,
      url: "",
      files: [],
      okMessage: false,
      location: "",
      username: "",
      error: null,
      teamList: "",
      favoriteTeam: "",
      favTeamSN: "",
      options: [],
      loading: false,
      fanTeam: "",
      bio: "",
      imageArray: [
        "https://www.footfoot.co/popplayer/1.png",
        "https://www.footfoot.co/popplayer/2.png",
        "https://www.footfoot.co/popplayer/3.png",
        "https://www.footfoot.co/popplayer/4.png",
        "https://www.footfoot.co/popplayer/5.png",
        "https://www.footfoot.co/popplayer/6.png",
        "https://www.footfoot.co/popplayer/7.png",
        "https://www.footfoot.co/popplayer/8.png",
        "https://www.footfoot.co/popplayer/9.png",
        "https://www.footfoot.co/popplayer/10.png",
        "https://www.footfoot.co/popplayer/12.png",
        "https://www.footfoot.co/popplayer/12.png",
        "https://www.footfoot.co/popplayer/13.png",
        "https://www.footfoot.co/popplayer/14.png",
        "https://www.footfoot.co/popplayer/15.png",
        "https://www.footfoot.co/popplayer/16.png",
        "https://www.footfoot.co/popplayer/17.png",
        "https://www.footfoot.co/popplayer/18.png",
        "https://www.footfoot.co/popplayer/19.png",
        "https://www.footfoot.co/popplayer/20.png",
        "https://www.footfoot.co/popplayer/21.png",
        "https://www.footfoot.co/popplayer/22.png",
        "https://www.footfoot.co/popplayer/23.png",
        "https://www.footfoot.co/popplayer/24.png",
        "https://www.footfoot.co/popplayer/25.png",
        "https://www.footfoot.co/popplayer/26.png",
        "https://www.footfoot.co/popplayer/27.png",
        "https://www.footfoot.co/popplayer/28.png",
        "https://www.footfoot.co/popplayer/29.png",
        "https://www.footfoot.co/popplayer/30.png",
        "https://www.footfoot.co/popplayer/31.png",
        "https://www.footfoot.co/popplayer/32.png",
      ],
    };
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
    changeLang(lang) {
      this.$store.commit("var/setNewLang", lang);
      this.lang = lang;
      let user = {};
      user.lang = lang;
      userUpdate(user, this.$auth.user._id).then((data) => {
        this.$auth.fetchUser();
      });
    },
    updateDark() {
      if (this.$auth.user._id) {
        let user = {};
        user.darkTheme = this.darkTheme;
        userUpdate(user, this.$auth.user._id).then((data) => {
          this.$auth.fetchUser();
        });
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
    eraseMypic() {
      this.persoImage = false;
    },

    iwantMypic() {
      this.imgSelected = "";
      this.persoImage = true;
    },

    getImgUrl(item) {
      return item;
    },
    cancelUpdate() {
      this.$router.push(`/dashboard/${this.$store.state.auth.user._id}`);
    },
    onSelect(team) {
      if (team) {
        this.selected = team;
        this.favoriteTeam = team;
      }
    },
    asyncFind(query) {
      this.options = [];
      if (query[0] && query[0] != " ") {
        this.loading = true;
        searchTeam(query.toLowerCase()).then((data) => {
          this.loading = false;
          this.options = data;
        });
      }
    },
    closeMulti() {
      this.loading = false;
      this.options = [];
    },
    customLabel({ shortName, name }) {
      if (shortName) {
        return `${name} – ${shortName}`;
      } else {
        return [];
      }
    },
    userProfileUpdate() {
      let userId = this.$store.state.auth.user._id;
      if (this.favoriteTeam) {
        this.fanTeam = this.favoriteTeam._id;
        this.favTeamSN = this.favoriteTeam.shortName;
      }
      if (this.persoImage) {
        if (this.url === "") {
          this.url = this.profileInfo.url;
        }
      } else {
        this.url = this.imageArray[this.imgSelected];
      }
      let user = {};
      user.darkTheme = this.darkTheme;
      user.username = this.username;
      user.location = this.location;
      user.lang = this.lang;
      user.role = this.role;
      user.picProfile = this.url;
      user.fanTeam = this.fanTeam;
      user.favoriteTeam = this.favTeamSN;
      user.bio = this.bio;
      userUpdate(user, userId).then((data) => {
        if (data === null) {
          this.error =
            this.$store.state.var.langSelected === "EN"
              ? "Username is already registered. Please choose another Username."
              : "Ce nom d'utilisateur est pris. Veuillez en choisir un autre.";
        } else {
          this.$auth.fetchUser();
          this.$router.push(`/dashboard/${userId}`);
        }
      });
      //.catch(next);
    },
    saveMyProfile() {
      this.error === null;
      this.image && this.image.imageSet === true ? this.generateImage() : "";
      this.userProfileUpdate();
    },
    generateImage: function () {
      let url = this.image.generateDataUrl();
      if (!url) {
        alert("no image");
        return;
      }
      this.url = url;
    },
  },
  mounted() {
    if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
      getInsiderProfileInfo(this.$store.state.auth.user._id).then(
        (profileInfo) => {
          this.profileInfo = profileInfo;
          this.location = profileInfo.location;
          if (this.$store.state.auth.user.fanTeam) {
            this.favoriteTeam = {
              shortName: this.$store.state.auth.user.fanTeam.shortName,
              searchName:
                this.$store.state.auth.user.fanTeam.name.toUpperCase(),
              name: this.$store.state.auth.user.fanTeam.name.toUpperCase(),
            };
          } else {
            this.favoriteTeam = "";
          }
          this.darkTheme = profileInfo.darkTheme;
          this.lang = profileInfo.lang;
          this.url = profileInfo.picProfile
            ? profileInfo.picProfile
            : profileInfo.initalPicture;
          this.username = profileInfo.username;
          this.bio = profileInfo.bio;
          this.imageArray.unshift(profileInfo.picProfile);

          this.imageArray = [...new Set(this.imageArray)];
        }
      );
    } else {
      this.$router.push("/");
    }
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.spaceBetween {
  display: flex;
  justify-content: space-between;
}
.fieldCrop {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.cropImg {
  margin: auto;
}
.columnDir {
  flex-direction: column;
}
.carrousselImgWrap {
  display: flex;
  justify-content: center;
}
.textareaWrap {
  width: 100%;
}
.carrousselWrap {
  width: 100%;
}
.smallCarrimg {
  border-radius: 50%;
}
.carrimg {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.displayFlex {
  align-items: center;
  margin-bottom: 0.75rem;
}
.column {
  width: 50%;
  margin: auto;
}
.is-vcentered {
  margin-top: 0.25rem;
}
.centerButton {
  display: FLEX;
  justify-content: center;
  text-align: center;
  align-items: center;
}
.label {
  color: #192b41;
}
.centerButton > button {
  margin: 0 0.5rem;
}
#ActionCard {
  width: 100%;
  padding: 0.25rem !important;
}

.location {
  line-height: 1.42857143;
  font-size: 1em;
  height: 34px;
  display: inline-block;
  margin: 0;
  padding: 0 0.5em;
  max-width: 100%;
  background: none;
  position: relative;
  box-shadow: none;
  float: left;
  clear: none;
}
.title {
  margin-bottom: 0.5rem !important;
}

.imgProfile {
  height: 40px;
  margin-right: 10px;
}
.namePicWrap {
  margin-bottom: 10px;
}
.alignCenter {
  display: flex;
  align-items: center;
}
.flag-img {
  width: 45px;
  height: 45px;
  cursor: pointer;
}

@media (max-width: 1047px) {
  .title {
    font-size: 1.25rem !important;
  }
  .column {
    width: 100%;
  }
  .flag-img {
    width: 35px;
    height: 35px;
  }
}
</style>
