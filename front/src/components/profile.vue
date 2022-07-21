<template>
    <div id="profile">
        <div id="nav">
            <Nav />
        </div>
        <br>
        <h1>Votre profile</h1>
        <div id="picture">
            <img src="../assets/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg">
        </div>
        <div id="name">
            <p>Nom: {{currentUser.username}}</p>
            <p>Email de contact: {{currentUser.Email}}</p>
            <p>{{currentUser.role}}</p>
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
#name{
  font-size: 25px;
}
img{
  width: 20%;
}
h1 {
  margin-left: 10% ;
}
@media screen and ( max-width: 667px) {
  #nav {
    width: 100%;
  }
}
@media screen and (min-width: 668px) and (max-width: 992px) {
  #nav {
    width: 100%;
  }
}
</style>
