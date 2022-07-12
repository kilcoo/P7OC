<template>
  <div id="logo">
  <img src="../assets/icon-left-font-monochrome-black.png" >
  <nav>
    <router-link to="/login">se connecter</router-link> |
    <router-link to="/signup">s'inscrire</router-link>
  </nav> 
 

</div>
</template>

<script>
import logo from "@/components/logo.vue"
export default {
    components:
    logo
}
</script>

<style>
img{
  width: 20%;
}
</style>
