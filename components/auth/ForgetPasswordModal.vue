<template>
  <div class="box headForget">
    <div class="section has-text-centered">
      <img
        loading="lazy"
        src="~assets/images/logo.png"
        alt="logo"
        width="250px"
      />
    </div>
    <div v-if="langSelected === 'EN'" class="section">
      <h1 class="title">Reset Password</h1>
      <p>
        Enter the email address associated with your account, and we’ll email
        you a link to reset your password.
      </p>
    </div>
    <div v-else class="section">
      <h1 class="title">Réinitialise ton mot de passe</h1>
      <p>
        Saisi l’adresse e-mail associée à ton compte. Nous t'enverrons un lien
        pour réinitialiser ton mot de passe.
      </p>
    </div>

    <div class="section mailField">
      <b-notification
        v-if="username === 'no user' && langSelected === 'EN'"
        type="is-danger"
        has-icon
        >There is no account with this Email !</b-notification
      >
      <b-notification
        v-else-if="username === 'no user'"
        type="is-danger"
        has-icon
        >Aucun membre n'est inscrit avec cet email !</b-notification
      >
      <b-notification
        v-else-if="username && langSelected === 'EN'"
        type="is-success"
        has-icon
        >Check your mail box, we just sent you a reset link !</b-notification
      >
      <b-notification v-else-if="username" type="is-success" has-icon
        >Verifie ta boite mail, un lien de réinitialisation vient d'etre envoyé
        !</b-notification
      >
      <b-notification v-if="error && !email" type="is-danger" has-icon>{{
        error
      }}</b-notification>
      <b-field :label="langSelected === 'EN' ? 'Your email' : 'ton mail'">
        <b-input
          v-model="email"
          v-validate="'required'"
          name="email"
          type="email"
          icon-pack="fa"
          placeholder="pedro@footfoot.co"
          icon="envelope"
        ></b-input>
      </b-field>

      <p class="control login">
        <button
          @click="send()"
          v-if="langSelected === 'EN'"
          class="button is-success is-outlined is-large is-fullwidth"
        >
          Send reset link
        </button>
        <button
          @click="send()"
          v-else
          class="button is-success is-outlined is-large is-fullwidth"
        >
          Envoie le lien de réinitialisation
        </button>
      </p>
    </div>
  </div>
</template>


<script>
import { sendForgetPassword } from "@/server/auth";

export default {
  data() {
    return {
      email: "",
      error: null,
      username: "",
    };
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
  },
  methods: {
    send() {
      this.error = null;
      this.$validator.validateAll().then((result) => {
        if (result) {
          sendForgetPassword(this.email).then((username) => {
            this.username = username;
          });
          //.catch(next);
        } else {
          this.username = null;
          this.error =
            this.langSelected === "EN"
              ? "You have to complete the email field"
              : "Renseigne ton email";
        }
      });
    },
  },
};
</script>

<style scoped>
.box {
  background-color: #eef1f7 !important;
}
img {
  height: 48px;
  width: auto;
}
.section {
  padding-top: 0rem !important;
  padding-bottom: 2rem !important;
  min-height: 0vh;
  max-width: 100% !important;
}
.section > h1 {
  color: black;
}
.section > p {
  color: black;
}
.columns {
  margin-left: 0rem;
  margin-right: 0rem;
  margin-top: 0rem;
}
#modalAuth {
  border-radius: 5px;
}
.headForget {
  align-items: baseline !important;
}
.hero.is-fullheight {
  min-height: 70vh !important;
  align-items: baseline !important;
}
.hero-body {
  padding: 1rem 1.5rem !important;
  align-items: baseline !important;
}
.hero.is-dark.is-bold {
  background-color: #eef1f7 !important;
  color: #eef1f7 !important;
}

.title {
  margin-bottom: 0.5rem;
}
.mailField {
  margin-top: -1rem;
}

@media (max-width: 1047px) {
  img {
    margin-left: 0%;
  }
  .section {
    padding: 1rem 1.5rem !important;
  }
  h1 {
    font-size: 1rem !important;
  }
  .button.is-large {
    font-size: 0.95rem !important;
  }
}
</style>
