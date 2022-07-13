<template>
  <div>
      <img src="../assets/icon-left-font-monochrome-black.png" />
            <nav>
                <router-link to="/login">se connecter</router-link> |
                <router-link to="/signup">s'inscrire</router-link>
            </nav>
            <h2>Bienvenue sur Groupomania</h2>
            <p>veuillez remplir les champs si dessous.</p>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
        <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <Field name="username" type="username" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span @click="handleRegister" >S'inscrire</span>
            </button>
          </div>
        </div>
      </Form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "signup",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Nom d'utilisateur requis "),
      email: yup
        .string()
        .required("Email requis ")
        .email("Email incorrect"),
      password: yup
        .string()
        .required("Mot de passe requis ")
    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/groupomania");
    }
  },
  methods: {
    handleRegister(user) {
      console.log(user)
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.$router.push("/login");
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>


<style scoped>
nav a{
    color: black;
}
nav a.router-link-exact-active {
  color: #42b983;
}
img{
  width: 30%;
}
.form-group{
    width: 40%;
    margin: auto;
    padding-bottom: 5px;
}
</style>
