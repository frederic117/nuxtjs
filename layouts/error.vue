<template >
  <section class="mainNot hero is-fullheight">
    <img
      loading="lazy"
      class="ballon"
      src="~assets/images/Soccer_ball_animated.svg"
      alt="ballon"
    />
    <div class="col">
      <figure class>
        <img loading="lazy" src="~assets/images/error404.svg" alt="404" />
      </figure>
      <p>this page doesn't exist...</p>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
};
</script>

<style scoped>
.navcontest {
  display: none !important;
}
.mainNot {
  background-color: #192b41 !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin-top: -1rem;
  justify-content: space-evenly;
  position: ABSOLUTE;
  max-height: 100vh;
  min-height: 93vh !important;
}

.ballon {
  height: 300px;
  margin-bottom: 2rem;
}
h1,
p {
  color: #eef1f7;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "Roboto Condensed", sans-serif;
}

.col {
  text-align: center;
}

@media screen and (max-width: 768px) {
  .mainNot {
    background-color: #192b41 !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    padding-top: 8rem;
    justify-content: unset;
    position: ABSOLUTE;
    max-height: 100vh;
  }
  .ballon {
    height: 150px;
    margin-bottom: 2rem;
  }
}
</style>
