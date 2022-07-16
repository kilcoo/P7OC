<template>
<div>
  
  <div id="nav">
    <ul>
        <li><router-link title="profile" to="/profile">
        <font-awesome-icon icon="fa-solid fa-user" /></router-link></li>
        <li><router-link title='home' to="/groupomania">
        <font-awesome-icon icon="fa-solid fa-house" /></router-link></li>
        <div id="logout">
        <li title="déconnexion" @click="logOut"><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" /></li>
        </div>
    </ul>
  </div>
  </div>
</template>

<script>


export default {
    name : 'Nav',
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}


</script>

<style >
ul{
    list-style-type: none;
    border: 1px blue solid;
    background-color: beige;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    margin: 10px;
    
}
li {
  padding-right: 20px;
    font-size: 20px;
}
#logout{
    cursor: pointer;
}
</style>