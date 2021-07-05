<template>
  <div @click="goToPublish" class="card publishWrapper">
    <img
      v-if="connectedUser && connectedUser.picProfile"
      @click="goToPublish"
      class="pointer fanionClub imgProfile"
      :src="connectedUser.picProfile"
      alt="Image"
    />

    <img
      v-else
      @click="goToPublish"
      class="pointer fanionClub imgProfile"
      src="~/assets/images/zlatanPop.jpg"
      alt="profile"
    />
    <div @click="goToPublish" class="control is-clearfix">
      <input
        class="input"
        :placeholder="`${langSelected === 'EN' ? 'Some news?' : 'Des infos ?'}`"
      />
    </div>
    <div class="faWrapper">
      <a class="options-img-video">
        <i class="mdi mdi-paperclip mdi-36px"></i>
      </a>
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
  methods: {
    goToPublish() {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        this.$router.push(`/publish`);
      } else {
        this.$router.push(`/login`);
      }
    },
    onFileChange(e) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        } else if (e) {
          this.$store.commit("var/setUploadImage", files[0]);
          this.$router.push(`/publish`);
        }
      } else {
        this.$router.push(`/login`);
      }
    },
  },
};
</script>

<style scoped>
.publishWrapper {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  padding: 10px;
  display: flex;
  background-color: #eef1f7;
  align-items: center;
}

.publishWrapper > .control {
  width: 95%;
  height: 2.5rem;
  color: #192b41 !important;
}

.publishWrapper > .control > .input {
  border-radius: 8px;
  width: 100% !important;
  height: 2.5rem;
}

.publishWrapper > img {
  height: 45px;
  margin-right: 10px;
}

.is-right {
  width: 15% !important;
}

.faWrapper {
  margin-left: 5px;
}

.mdi-paperclip {
  display: flex;
  font-size: 2rem;
  color: #192b41 !important;
}

.fa-youtube {
  color: #ff0000 !important;
  font-size: 2rem;
}
</style>
