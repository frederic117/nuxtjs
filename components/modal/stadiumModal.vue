<template>
  <div v-if="stadium" class="mediaModalBet">
    <h1 class="modalTitleBet">
      <strong class="modalTitleBetH1 has-text-bet is-wc">{{
        stadium.name
      }}</strong>
      <p class="is-6">
        <span>
          {{ langSelected === "EN" ? "Capacity: " : "Capacité : " }}
          <strong>{{
            stadium.capacity ? stadium.capacity.toLocaleString("fr") : ""
          }}</strong> </span
        >&nbsp
        <span v-if="langSelected === 'EN'">
          Surface:
          <strong>{{ stadium.surface }}</strong>
        </span>
        <span v-if="langSelected === 'FR'">
          Surface :
          <strong>{{
            stadium.surface === "grass" ? "Herbe" : stadium.surface
          }}</strong>
        </span>
      </p>
    </h1>
    <div class>
      <div class="card-image">
        <figure class="image">
          <img
            loading="lazy"
            class="stadiumPics"
            :src="stadium.image_path"
            alt="stadiumPics"
          />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stadium: "",
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style scoped>
.mediaModalBet {
  padding: 0 !important;
  max-width: 600px !important;
}
.modalTitleBet {
  display: FLEX;
  justify-content: CENTER;
  flex-direction: COLUMN;
}
.modalTitleBetH1 {
  font-size: 2rem;
  text-align: center;
}
.is-6 {
  text-align: center;
}
.stadiumPics {
  width: auto;
  height: auto;
  max-height: 450px !important;
  border-radius: 5px;
}

.is-wc {
  color: #0084a4 !important;
}

div {
  font-size: 1.2rem !important;
}

img {
  max-height: 64px !important;
}

@media (max-width: 769px) {
  .modalTitleBetH1 {
    font-size: 1.7rem;
  }
  img {
    max-height: 42px !important;
  }

  div {
    font-size: 0.8rem !important;
  }
}
</style>
