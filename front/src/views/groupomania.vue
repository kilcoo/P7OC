<template>
<div>
<header>
   <img src="../assets/icon-left-font-monochrome-black.png">
   <div id="nav">
     <Nav/> 
   </div>
   
</header>
<div>
  <Post/> 
</div>
</div>
</template>
<script>
import Nav from '../components/nav.vue';
import Logo from '../components/logo.vue';
import Post from '../components/post.vue'

export default {

components:{
    Nav,
    Logo,
    Post
}
};

</script>

<style scoped>

img{
   width: 20%;
   margin: auto;
   padding-bottom: 40px;
}
header {
   display: flex;
}
</style>