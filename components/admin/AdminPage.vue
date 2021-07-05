<template>
  <section>
    <section class="hero welcome is-small">
      <div class="hero-body">
        <div class>
          <h1 class="title helloText">
            Bonjour {{ $store.state.auth.user.username }},
          </h1>
          <h2 class="subtitle">Bienvenue dans l'espace admin</h2>
        </div>
      </div>
    </section>
    <section class="info-tiles">
      <div class="tile is-ancestor has-text-centered">
        <div class="pointer tile is-parent">
          <nuxt-link class="tile" :to="'/admin/plan'">
            <article class="tile is-child box">
              <p class="title"></p>
              <p class="subtitle">Plan</p>
            </article>
          </nuxt-link>
        </div>
        <div class="pointer tile is-parent">
          <nuxt-link class="tile" :to="'/admin/season-management'">
            <article class="tile is-child box">
              <p class="title"></p>
              <p class="subtitle">Season</p>
            </article>
          </nuxt-link>
        </div>
        <div class="pointer tile is-parent">
          <nuxt-link class="tile" :to="'/admin/teams'">
            <article class="tile is-child box">
              <p class="title"></p>
              <p class="subtitle">Teams</p>
            </article>
          </nuxt-link>
        </div>

        <div class="pointer tile is-parent">
          <nuxt-link class="tile" :to="'/admin/users'">
            <article class="tile is-child box">
              <p class="title"></p>
              <p class="subtitle">Users</p>
            </article>
          </nuxt-link>
        </div>
      </div>
      <div class="tile is-ancestor has-text-centered">
        <div class="pointer tile is-parent">
          <nuxt-link class="tile" :to="'/admin/transaction'">
            <article class="tile is-child box">
              <p class="title"></p>
              <p class="subtitle">Transactions</p>
            </article>
          </nuxt-link>
        </div>
        <div class="pointer tile is-parent">
          <nuxt-link class="tile" :to="'/admin/contest'">
            <article class="tile is-child box">
              <p class="title"></p>
              <p class="subtitle">Contests</p>
            </article>
          </nuxt-link>
        </div>
        <div class="pointer tile is-parent">
          <nuxt-link class="tile" :to="'/admin/files'">
            <article class="tile is-child box">
              <p class="title"></p>
              <p class="subtitle">Files mangement</p>
            </article>
          </nuxt-link>
        </div>
        <div class="pointer tile is-parent">
          <nuxt-link class="tile" :to="'/admin/mail'">
            <article class="tile is-child box">
              <p class="title"></p>
              <p class="subtitle">Mails mangement</p>
            </article>
          </nuxt-link>
        </div>
        <!--	<div class="pointer tile is-parent">
					<nuxt-link class="tile" :to="'/admin/forum'">
						<article class="tile is-child box">
							<p class="title"></p>
							<p class="subtitle">Forums</p>
						</article>
					</nuxt-link>
				</div>
				<div class="pointer tile is-parent">
					<nuxt-link class="tile" :to="'/admin/fansong'">
						<article class="tile is-child box">
							<p class="title"></p>
							<p class="subtitle">Songs</p>
						</article>
					</nuxt-link>
				</div>-->
      </div>
    </section>
    <br />
    <nuxt-link to="/admin/contest/simulate">
      <button class="button is-contest is-large is-fullwidth">
        <strong>Simulation Rem contest</strong>
      </button>
    </nuxt-link>
    <br />
    <nuxt-link to="/admin/logs">
      <button class="button is-info is-large is-fullwidth">
        <strong>Suivi des programmes</strong>
      </button>
    </nuxt-link>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    if (
      this.$store.state.auth.user &&
      this.$store.state.auth.user.role == "admin"
    ) {
    } else {
      this.$router.push(`/`);
    }
  },
  computed: {
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style scoped>
.hero {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 15px;
  background: linear-gradient(90deg, #192b41, #296084);
  margin-top: -1rem;
}

.button.is-contest {
  background-color: #ff7d00;
  color: #fff;
  border-color: #ff7d00;
}

.button.is-contest strong {
  background-color: #ff7d00;
  color: #fff !important;
  border-color: #ff7d00;
}

.hero.welcome .title,
.hero.welcome .subtitle {
  color: hsl(192, 17%, 99%);
}

.helloText {
  text-align: left !important;
}

.hero.is-small .hero-body {
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
}

.hero-body {
  flex-grow: 1;
  flex-shrink: 0;
  padding: 3rem 1rem;
}

.tile.is-ancestor:last-child {
  margin-bottom: -0.75rem;
}

.tile.is-ancestor {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;
}

.tile {
  align-items: stretch;
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: -webkit-min-content;
  min-height: -moz-min-content;
  min-height: min-content;
}

h1 {
  font-weight: bold !important;
  text-align: center;
}

.wrapperMissions {
  display: flex;
  justify-content: space-evenly;
}

.wrapperMissions > article {
  margin: 1.5rem 0.5rem;
  width: 24.5%;
}

@media (max-width: 1047px) {
  .hero {
    margin-top: 0rem;
  }
}
</style>
