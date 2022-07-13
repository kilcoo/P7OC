<template>
    <div id="profile">
        <div id="nav">
            <Nav />
        </div>
        <div id="picture">
            <img src="../assets/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg">
        </div>
        <div id="name">
            <h1>nom</h1>
        </div>
        <div id="bio">
            <input type="text">
        </div>
        <div>
     </div>
    </div>
</template>
<script>
import Nav from '../components/nav.vue';
export default {
  name: 'Profile',
  components: {
    Nav
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
};
</script>
<style scoped>
#nav{
  width: 10%;
  float: right;
}
img{
  width: 20%;
}
</style>
