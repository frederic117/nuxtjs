<template>
  <div v-if="langSelected" class="wrapper">
    <div class>
      <div class="column">
        <div class="box">
          <form @submit.prevent="signup">
            <h1 class="title has-text-contest">
              <img
                loading="lazy"
                class="is-32x32"
                src="~assets/images/ballon-contest.png"
                alt="points"
              />
              <span>{{
                langSelected === "EN" ? "join footfoot" : "rejoins footfoot"
              }}</span>
            </h1>
            <b-notification v-if="error" type="is-danger" has-icon>{{
              error
            }}</b-notification>

            <b-field v-if="langSelected === 'EN'" label="username">
              <b-input
                v-model="username"
                maxlength="10"
                required
                name="username"
                type="username"
                placeholder="Ronnie"
              ></b-input>
            </b-field>
            <b-field v-else label="choisis ton pseudo">
              <b-input
                v-model="username"
                maxlength="10"
                required
                name="username"
                type="username"
                placeholder="Ronnie"
              ></b-input>
            </b-field>

            <b-field
              :label="`${langSelected === 'EN' ? 'your email' : 'ton email'}`"
            >
              <b-input
                v-model="email"
                required
                name="email"
                type="email"
                icon-pack="fa"
                placeholder="ronnie@footfoot.co"
                icon="envelope"
              ></b-input>
            </b-field>
            <hr />

            <b-field v-if="langSelected === 'EN'" label="password">
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
            <b-field v-else label="mot de passe">
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
            <br />
            <b-field v-if="langSelected === 'EN'" label="Confirm Password">
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
            <b-field v-else label="confirme ton mot de passe">
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

            <hr />
            <p class="control">
              <button v-if="langSelected === 'EN'" class="button is-contest">
                register
              </button>
              <button v-else class="button is-contest">je m'inscris</button>
              <nuxt-link v-if="langSelected === 'EN'" to="/">
                <button class="button is-default">cancel</button>
              </nuxt-link>
              <nuxt-link v-else to="/">
                <button class="button is-default">annuler</button>
              </nuxt-link>
            </p>

            <hr />
            <div class="control">
              <strong class="has-text-contest" v-if="langSelected === 'EN'">
                already registered ?
              </strong>
              <strong class="has-text-contest" v-else>déjà inscrit ?</strong>
              <button
                v-if="langSelected === 'EN'"
                class="button is-default"
                @click="loggin()"
              >
                login
              </button>
              <button v-else class="button is-default" @click="loggin()">
                connexion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { signup } from "@/server/auth";
import cookies from "js-cookie";
import axios from "axios";
export default {
  auth: false,
  data() {
    return {
      username: "",
      password: "",
      passwordConfirmation: "",
      email: "",
      referalCode: "",
      error: null,
    };
  },
  props: {
    createContestinprogress: "",
  },
  computed: {
    pronoUnconnect() {
      return this.$store.state.var.pronoUnconnect;
    },

    langSelected() {
      return this.$store.state.var.langSelected;
    },

    contestInscriptionId() {
      return this.$store.state.var.contestInscriptionId;
    },
  },
  mounted() {
    if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
      this.$router.push("/contest");
    }
  },

  methods: {
    signup() {
      this.error = null;
      this.$validator.validateAll().then((result) => {
        if (result) {
          signup({
            email: this.email.toLowerCase(),
            username: this.username,
            password: this.password,
            lang: this.$store.state.var.langSelected,
            referal: this.referalCode,
          }).then((r) => {
            if (r === "MongoError") {
              this.error =
                this.$store.state.var.langSelected === "EN"
                  ? "Username is already registered. Please choose another Username."
                  : "Ce nom d'utilisateur est pris. Veuillez en choisir un autre.";
            } else if (r === "UserExistsError") {
              this.error =
                this.$store.state.var.langSelected === "EN"
                  ? "There is already an account with this email. Please connect to access to your account."
                  : "Cette adresse e-mail est deja enregistrée. Connecte toi pour acceder à ton compte.";
            } else if (r === "error on referal") {
              this.error =
                this.$store.state.var.langSelected === "EN"
                  ? "invalid referal code."
                  : "Ce code de parrainage n'est pas valide.";
            } else {
              let mail = this.email;
              let pass = this.password;
              let authenticate = { mail, pass };

              this.$buefy.dialog.alert({
                title:
                  this.$store.state.var.langSelected === "EN"
                    ? "welcome on footfoot"
                    : "bienvenue sur footfoot",
                message:
                  this.$store.state.var.langSelected === "EN"
                    ? "Our ambition is to give you the best info about your club, follow the matches live and participate in <strong class='has-text-contest'>contests</strong> of predictions between friends.  <br><br> All WITHOUT ads 😊"
                    : "Notre ambition est de te donner les meilleurs infos sur ton club, de suivre les matchs en direct et de participer à des <strong class='has-text-contest'>contests</strong> de pronos entre amis.  <br><br> Le tout SANS pub 😊",
                confirmText: "Ok",
                type: "is-success",
                onConfirm: () => this.login(),
              });
            }
          });
          //.catch(next);
        } else {
          this.error =
            this.$store.state.var.langSelected === "EN"
              ? "You have to complete correctly all fields before submit"
              : "Tous les champs doivent etre correctement renseigné pour t'inscrire";
        }
      });
    },
    loggin() {
      this.$router.push("/login");
    },
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
          axios.defaults.headers.common["Authorization"] = cookies.get(
            "auth._token.local"
          );
          if (this.createContestinprogress) {
            this.$emit("signupOk");
          } else if (this.contestInscriptionId) {
            this.$nuxt.$emit("registerUser");
          } else if (this.pronoUnconnect) {
            this.$store.commit(
              "var/contestInscription",
              this.pronoUnconnect.round
            );
            this.$nuxt.$emit("registerUser");
          } else {
            this.$nuxt.$emit("registerUser");
          }
        } catch (e) {
          this.error =
            this.$store.state.var.langSelected === "EN"
              ? "Wrong password or email"
              : "Mot de passe ou email faux";
        }
      } else {
        this.error =
          this.$store.state.var.langSelected === "EN"
            ? "All fields in the form must be completed."
            : "Tous les champs du formulaire doivent être complétés.";
      }
    },
  },
};
</script>

<style scoped>
.box {
  margin-top: 2.5rem;
}
.wrapper {
  margin: auto;
  display: flex;
  justify-content: center;
}
.wrapper > div {
  width: 30%;
}
.button {
  margin: 5px;
}
h1 {
  display: flex;
  align-items: center;
}
.is-32x32 {
  margin-right: 10px;
  height: 30px;
  width: 30px;
}

@media screen and (max-width: 768px) {
  .wrapper > div {
    width: 100%;
  }
  .box {
    margin-top: 0.5rem;
    margin-bottom: 2rem;
  }
}
</style>
