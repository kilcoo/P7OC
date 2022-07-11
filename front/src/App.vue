<template>
<div>

<router-view/>
</div>
  
</template>

<script>

// @ is an alias to /src

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
  border-bottom: 1px black solid;
  padding: 10px;
  width: 20%;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
