<template>
  <section class="hero is-fullheight is-dark is-bold">
    <div class="hero-body headForget">
      <div class="columns is-vcentered">
        <div>
          <div class="has-text-centered">
            <img
              loading="lazy"
              src="~assets/images/logo.png"
              alt="logo"
              width="150px"
            />
          </div>
          <br />
          <div class>
            <h1 class="title">
              {{
                langSelected === "EN"
                  ? "Reset password"
                  : "Réinitialiser le mot de passe"
              }}
            </h1>
            <p>
              {{
                langSelected === "EN"
                  ? "Enter your new password"
                  : "Saisi ton nouveau mot de passe."
              }}
            </p>
          </div>
          <br />
          <br />
          <div class="mailField">
            <b-notification v-if="error" type="is-danger" has-icon>{{
              error
            }}</b-notification>

            <b-field
              :label="`${langSelected === 'EN' ? 'Password' : 'Mot de passe'}`"
            >
              <b-input
                v-model="password"
                v-validate="'required'"
                data-vv-name="password"
                name="password"
                type="password"
                password-reveal
                placeholder="●●●●●●●"
              ></b-input>
            </b-field>
            <span v-show="errors.has('password')" class="help is-danger">
              <i v-show="errors.has('password')" class="fa fa-warning"></i>
              {{ errors.first("password") }}
            </span>

            <b-field
              :label="`${
                langSelected === 'EN'
                  ? 'Confirm your password'
                  : 'Confirme ton mot de passe'
              }`"
            >
              <b-input
                v-model="passwordConfirmation"
                v-validate="'required|confirmed:password'"
                data-vv-name="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                password-reveal
                placeholder="●●●●●●●"
                data-vv-as="password"
              ></b-input>
            </b-field>
            <span
              v-show="errors.has('passwordConfirmation')"
              class="help is-danger"
            >
              <i
                v-show="errors.has('passwordConfirmation')"
                class="fa fa-warning"
              ></i>
              {{ errors.first("passwordConfirmation") }}
            </span>

            <p class="control login">
              <button
                @click="send()"
                class="button is-success is-outlined is-large is-fullwidth"
              >
                {{
                  langSelected === "EN"
                    ? "Reset my password"
                    : "Réinitialiser mon mot de passe"
                }}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { resetMyPassword } from "@/server/auth";

export default {
  auth: false,
  data() {
    return {
      isLoginModalActive: false,
      password: null,
      passwordConfirmation: null,
      error: null,
      userId: null,
      email: null,
    };
  },
  computed: {},
  methods: {
    send() {
      if (!this.userId) {
        this.$router.push("/login");
      }
      this.error = null;
      this.$validator.validateAll().then((result) => {
        if (result) {
          resetMyPassword(this.userId, this.password).then((response) => {
            this.$buefy.toast.open({
              message:
                this.langSelected == "EN"
                  ? "Your password has been changed"
                  : "Ton mot de passe a bien été modifié",
              type: "is-success",
            });
            this.email = response.email;
            let mail = response.email;
            let pass = this.password;
            let username = response.username;
            let authenticate = { mail, pass, username };
            this.$nuxt.$emit("login", authenticate);
          });
        } else {
          this.error =
            this.langSelected == "EN"
              ? "All fields must be filled in to reset your password"
              : "Tous les champs doivent etre renseigné pour réinitialiser ton mot de passe";
        }
      });
    },
  },
  mounted() {
    this.userId = this.$route.params.id;
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
  },
};
</script>

<style scoped>
.login {
  margin-top: 1rem;
}
img {
  margin-top: 1rem;
}
.section {
  padding-top: 0rem !important;
  max-width: 100% !important;
}
.columns {
  margin-left: 0rem;
  margin-right: 0rem;
  margin-top: 0rem;
}

.hero-body {
  padding: 1rem 1.5rem !important;
  align-items: center;
  display: flex;
  justify-content: center;
}
.hero.is-dark.is-bold {
  background-image: linear-gradient(
    141deg,
    #eef1f7 0,
    #eef1f7 71%,
    #eef1f7 100%
  ) !important;
  background-color: #eef1f7 !important;
  color: #eef1f7 !important;
  align-items: center;
  display: flex;
}
.button.is-success.is-outlined:focus,
.button.is-success.is-outlined:hover {
  background-color: #192b41;
  border-color: #192b41;
  color: #fff;
  box-shadow: 0 0 0 0.125em #eef1f7;
}
.button.is-success.is-outlined {
  background-color: transparent;
  border-color: #192b41;
  color: #192b41;
}
.button:focus {
  border-color: #192b41;
  color: #192b41;
}
.title {
  margin-bottom: 0rem !important;
}
.mailField {
  margin-top: -1rem;
}
h1 {
  color: #192b41 !important;
}
.fa {
  color: #192b41 !important;
}
p {
  color: #192b41 !important;
}
.hero {
  max-height: 90vh !important;
  min-height: 70vh !important;
}
@media (max-width: 1047px) {
  .hero-body {
    padding: 1rem 1.5rem !important;
    width: 100%;
  }
  .section {
    padding: 1rem 1.5rem !important;
  }
  h1 {
    font-size: 1.5rem !important;
  }
  .button.is-large {
    font-size: 0.95rem !important;
  }
}
</style>
