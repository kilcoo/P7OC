<template>
    <div>
        <div>
            <div id="nav">
             <Nav/>   
            </div>
            <br>
        <h1>modification de post</h1>  
        </div>
        <div id='postContainer'>
            <div id="creatorname">
               <p>Auteur: {{ post.username }}</p>
            </div>
            <div id="text">
               <p>{{ post.contents }}</p>
            </div>
            <div id="divimage">
               <img v-if="post.imageUrl != undefined " id="image" :src="`${post.imageUrl}`">
            </div>
            <div id="like">
               <p>Like: {{ post.likes }} Dislike: {{ post.dislikes }}</p>
            </div>
         </div>
         <br>
         <div id="container">
          <div @submit="modifypost">
               <label for="text"></label>
               <textarea v-model="this.text" name="text" id="textpost" placeholder="Quoi de neuf ?"/>
               <div>
                  <label for="image"></label>
                  <input @change="createfiles" name="image" type="file" id="imagepost" />
               </div>
               <input @click="modifypost" type="submit" />
            </div>
            </div>
    </div>
</template>
<script>
import axios from "axios";
import Nav from '../components/nav.vue'
export default {
  name: 'editpost',
  components : {
    Nav
  },
  data() {
      return {
         post : {},
         files : "",
         text : "",
      };
   },
   mounted: function () {
    const query = this.$route.query 
    const id = query.idpost
      axios.get('http://localhost:3000/api/posts/' + id, {
         headers: {
            'Authorization': this.$store.state.auth.user.token
         }
      })
         .then(res => {
            this.post = res.data;
         })
   },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
   methods: {
      modifypost() {
        const query = this.$route.query 
    const id = query.idpost
         let data = this.files
         if (this.text == "") {
            alert("veuillez entrer un texte")
            return
         }
         if (this.files == "") {
            alert("veuillez choisir une image")
            return
         }
         let formData = new FormData()
         formData.append("userId", this.$store.state.auth.user.userId)
         formData.append("username", this.$store.state.auth.user.username)
         formData.append("contents", this.text)
         formData.append("file", data)
         const url = `http://localhost:3000/api/posts/${id}`
         axios.put(url, formData,

            {
               headers: {
                  'Authorization': this.$store.state.auth.user.token
               }
            })
            .then(res => {
               this.$router.push('/groupomania')
            })
      },
      createfiles(e) {
         const file = e.target.files[0];
         this.files = file;
      }
   }
};
</script>

<style scoped>
#postContainer {
   margin: auto;
   width: 50%;
   border: 1px black solid;
   border-radius: 8px;
   box-shadow: 5px -3px 5px 0px rgba(0,0,0,0.75);
}
h1 {
    margin-left: 4em;
}
#nav {
    width: 10%;
    float: right;
}
#creatorname {
   border: 1px black solid;
   border-radius: 8px;
   width: 25%;
   float: left;
}
#creatorname button{
   width: 50%;
}

#like {
   font-size: 25px;
   border: 1px black solid;
   justify-content: space-around;
   display: flex;
}

#divimage {
   width: 100%;
   height: 100%;
}

#image {
   width: 90%;
   height: 200px;
   object-fit: cover;
}

#imagepost {
  margin-top: 2%;
}
#textpost{
  width: 70%;
}
input[type=submit] {
  background-color: #4E5166;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin-top: 5%;
  cursor: pointer;
}
#container{
  margin: auto;
  width: 60%;
  border-radius: 8px;
  padding: 2%;
  border: 1px black solid;
  background-color:beige;
}
textarea {
  resize: none;
}
@media screen and ( max-width: 667px) {
   #nav {
      width: 100%;
   }
   h1{
      margin: auto;
   }
   #container {
      width: 90%;
   }
   #postContainer{
      width: 100%;
   }
}
@media screen and (min-width: 668px) and (max-width: 992px) {
   #nav {
      width: 100%;
   }
   h1{
      margin: auto;
   }
   #container {
      width: 90%;
   }
   #postContainer{
      width: 100%;
   }
}
</style>

