<template>
  <div @submit="sendPost">
  <label for="text"></label>
  <input v-model="contents.text" name="text" type="text" id="text" placeholder="Quoi de neuf ?" />
<div>
  <label for="image"></label>
  <input name="image" type="file" id="image" accept="image/*"/>
</div>
<input @click="sendPost" type="submit" />
  </div>
</template>

<script>
import axios from "axios"

export default {
  name : "Post",
    data() {
    return {
      contents:{
        text : "",
        image: "" 
      }
    }
  },
  methods: {
    sendPost(){
      
    }
  }
}


</script>

<style scoped>

input{
  text-align: center;
}
#text{
  width: 35%;
}
</style>