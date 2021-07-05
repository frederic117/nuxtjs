<template>
  <div class="wrapper" v-if="!$auth.user">
    <div class="has-text-centered">
      <br class="desktopOnly" />
      <br class="desktopOnly" />
      <br class="desktopOnly" />
      <br class="desktopOnly" />
      <br class="desktopOnly" />
      <br class="desktopOnly" />
      <div class="column">
        <h3 class="title has-text-grey">Login</h3>
        <p class="subtitle has-text-grey">
          {{ langSelected === "EN" ? "Welcome on" : "Bienvenue sur" }}
          <strong class="has-text-contest">footfoot</strong>
        </p>
        <br />
        <div class="box">
          <figure class="avatar">
            <img loading="lazy" src="~/assets/images/ballon-contest.png" />
          </figure>

          <b-notification v-if="username" type="is-success" has-icon>
            {{
              langSelected === "EN"
                ? "Your password has been updated"
                : "Ton mot de passe a été changé"
            }}
          </b-notification>
          <b-notification v-else-if="error" type="is-danger" has-icon>
            {{ error }}
          </b-notification>
          <b-field :label="text.email">
            <b-input
              v-model="email"
              v-validate="{ required: true }"
              placeholder="pedro@footfoot.co"
              type="email"
              icon-pack="fa"
              icon="envelope"
            ></b-input>
          </b-field>
          <br />
          <b-field
            :label="`${langSelected === 'EN' ? 'Password' : 'Mot de passe'}`"
          >
            <b-input
              type="password"
              v-model="password"
              password-reveal
              value="iwantmytreasure"
              placeholder="●●●●●●●"
            ></b-input>
          </b-field>
          <br />
          <button
            @click="login()"
            class="button is-contest is-large is-fullwidth"
          >
            {{ langSelected === "EN" ? "Login" : "Connexion" }}
          </button>
        </div>
        <p class="has-text-grey">
          <nuxt-link :to="`/signup`">{{
            langSelected === "EN" ? "sign in" : "rejoindre"
          }}</nuxt-link
          >&nbsp|&nbsp<a @click="forgetPass">{{
            langSelected === "EN"
              ? "forgot your password?"
              : "mot de passe oublié"
          }}</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
const langFR = {
  login: "connexion",
  register: "Inscription",
  email: "Email",
  password: "Mot de passe",
  forgotPassword: "Mot de passe oublié",
  passWordUpdated: "Votre mot de passe a été changé",
  next: "Suivant",
  alreadyMember: "J'ai un compte",
  cancel: "Annuler",
  wrongPass: "Mot de passe ou email faux",
  allFields: "Tous les champs du formulaire doivent être complétés.",
};
const langEN = {
  login: "Login",
  register: "Register",
  email: "Email",
  password: "Password",
  forgotPassword: "Forgot Password",
  passWordUpdated: "Your password has been updated",
  next: "Next",
  alreadyMember: "Already a member?",
  cancel: "Cancel",
  wrongPass: "Password or email is incorrect",
  allFields: "You have to complete correctly all fields before submit",
};
import cookies from "js-cookie";
import axios from "axios";
export default {
  data() {
    return {
      email: this.autenticate ? this.autenticate.mail : "",
      password: this.autenticate ? this.autenticate.pass : "",
      username: this.autenticate ? this.autenticate.username : "",
      error: null,
      text: this.langSelected == "EN" ? langEN : langFR,
    };
  },
  props: {
    autenticate: "",
  },
  mounted() {
    if (this.$store.state.auth.user) {
      this.$router.push("/contest");
    }
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
    contestInscriptionId() {
      return this.$store.state.var.contestInscriptionId;
    },
  },
  watch: {},
  components: {},
  methods: {
    async login() {
      this.error = null;
      if (this.email && this.password) {
        try {
          await this.$auth.loginWith("local", {
            data: {
              email: this.email.toLowerCase(),
              password: this.password,
            },
          });
          axios.defaults.headers.common["Authorization"] =
            cookies.get("auth._token.local");
          if (this.contestInscriptionId) {
            //// this.$store.commit("var/set_user", this.$auth.user);
            this.$nuxt.$emit("registerUser");
          } else {
            this.$nuxt.$emit("registerUser");

            //// this.$store.commit("var/set_user", this.$auth.user);
            ////location.reload();
          }
        } catch (e) {
          this.error =
            this.langSelected == "EN"
              ? "Password or email is incorrect"
              : "Mot de passe ou email faux";
        }
      } else {
        this.error =
          this.langSelected == "EN"
            ? "You have to complete correctly all fields before submit"
            : "Tous les champs du formulaire doivent être complétés";
      }
    },

    forgetPass() {
      this.$nuxt.$emit("forget");
    },
    signup() {
      this.$router.push("/signup");
    },

    ////	async google(){
    ////   await this.$auth.loginWith('google').catch(e => {
    ////     this.$toast.show('Error', {icon: "fingerprint"});
    ////   })
    //// },
    //// async facebook(){
    ////    await this.$auth.loginWith('facebook').catch(e => {
    ////     this.$toast.show('Error', {icon: "fingerprint"});
    ////   })
  },
};
</script>

<style scoped>
.wrapper {
  margin: auto;
  display: flex;
  justify-content: center;
}
.wrapper > div {
  width: 30%;
}
.is-half {
  margin: auto;
  margin-top: 0rem;
}
.avatar {
  margin-top: -40px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  height: 5rem;
}
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
@media screen and (max-width: 768px) {
  .wrapper > div {
    width: 100%;
  }
  .title {
    margin-top: 10px;
  }
}
</style>
