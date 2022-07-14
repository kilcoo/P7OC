<template>
  <div @submit="sendPost">
  <label for="text"></label>
  <input v-model="contents.text" name="text" type="text" id="text" placeholder="Quoi de neuf ?" />
<div>
  <label for="image"></label>
  <input @change="files" name="image" type="file" id="image"  accept=".png, .jpeg, .jpg"/>
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
        files : [] 
      }
    }
  },
  methods: {
    sendPost() {
      const url = 'http://localhost:3000/api/auth/posts'
      const token = storage.getItem(user);
      axios.post(url, token, {
       data:{
        contents,
       }
        
      },
      
        {
          headers: {
            'Authorization': `${token[1]}`
          }
        })
    },
    files(event) {
      console.log(event.target.files);
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