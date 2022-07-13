<template>
    <div>
        <img src="../assets/icon-left-font-monochrome-black.png" />
        <nav>
            <router-link to="/login">se connecter</router-link> |
            <router-link to="/signup">s'inscrire</router-link>
        </nav>
        <h2>Content de vous revoir !</h2>
        <p>veuillez remplir les champs si dessous</p>
        <Form @submit="handleLogin" :validation-schema="schema">
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
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span @click="handleLogin" > Se connecter</span>
                </button>
            </div>
            <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">
                    {{ "Email ou Mot de passe incorrect" }}
                </div>
            </div>
        </Form>
    </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("email requis"),
      password: yup.string().required("Mot de passe requis"),
    });
    return {
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
  created() {
    if (this.loggedIn) {
      this.$router.push("/groupomania");
    }
  },
  methods: {
    handleLogin(user) {
      console.log(user)
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/groupomania");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
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
