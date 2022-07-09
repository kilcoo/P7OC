<template>
<div id="logo">
  <logo />
  <nav>
    <router-link to="/login">se connecter</router-link> |
    <router-link to="/signup">s'inscrire</router-link>
  </nav> 
  <router-view/>

</div>
</template>

<script>
import logo from "@/components/logo.vue"
// @ is an alias to /src
export default {
  name: "HomeView",
  components: {
    logo
  }
}
// @ is an alias to /src

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin: auto;
  padding-bottom: 10px;
}

nav a{
  font-weight: bold;
  color: #2c3e50;
  border: 3px black solid;
  border-radius: 10px;
  padding: 10px;
  width: 20%;
}
nav a:active {
  box-shadow: 0 5px #666;
  transform: translateY(1px);
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
