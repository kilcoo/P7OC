<template>
   <div>
      <header>
         <img id="logo" src="../assets/icon-left-font-monochrome-black.png">
         <div id="nav">
            <Nav />
         </div>
      </header>
      <div>
         <div id="container">
            <div @submit="sendPost">
               <label for="text"></label>
               <input v-model="this.text" name="text" id="textpost" placeholder="Quoi de neuf ?" />
               <div>
                  <label for="image"></label>
                  <input @change="createfiles" name="image" type="file" id="imagepost" />
               </div>
               <input @click="sendPost" type="submit" />
            </div>
         </div>
         <br>
         <div v-for="post in posts.slice().reverse()" :key="post._id" id='postContainer'>
            <div id="creatorname">
               <p>Auteur: {{ post.username }}</p>
               <button v-if="post.username == currentUser.username || currentUser.role == 'admin'"
                  @click="this.deletePost(post._id)">supprimer</button>
               <button>modifier</button>
            </div>
            <div id="text">
               <p>{{ post.contents }}</p>
            </div>
            <div id="divimage">
               <img id="image" :src="`${post.imageUrl}`">
            </div>
            <div id="like">
               <p>Like: {{ post.likes }} Dislike: {{ post.dislikes }}</p>
               <button v-if="dataLike != '-1'" @click="like(post._id)">
                  <font-awesome-icon id="like1" icon="fa-solid fa-thumbs-up" />
               </button>
               <button v-if="dataLike != '1'" @click="dislike(post._id)">
                  <font-awesome-icon id="like2" icon="fa-solid fa-thumbs-down" />
               </button>
            </div>
         </div>
      </div>
   </div>
</template>


<script>
import Nav from '../components/nav.vue';
import Logo from '../components/logo.vue';
import axios from 'axios';

export default {
   name: "groupomania",
   computed: {
      currentUser() {
         return this.$store.state.auth.user;
      }
   },
   data() {
      return {
         dataLike : "0",
         posts: [],
         text: "",
         files: ""
      };
   },
   components: {
      Nav,
      Logo,
   },
   mounted: function () {
      axios.get('http://localhost:3000/api/posts/', {
         headers: {
            'Authorization': this.$store.state.auth.user.token
         }
      })
         .then(res => {
            this.posts = res.data;
         })
   },
   methods: {
      like(id) {
         let data = this.$store.state.auth.user;
         axios.post(`http://localhost:3000/api/posts/${data.userId}/${id}`, {type: "1"}, {
            headers: {
               'Authorization': this.$store.state.auth.user.token
            }
         })
            .then(res => {
               this.dataLike = res.data.like
               console.log(this.dataLike)
               axios.get('http://localhost:3000/api/posts/', {
                  headers: {
                     'Authorization': this.$store.state.auth.user.token
                  }
               })
                  .then(res => {
                     this.posts = res.data;
                  })
            })
      },
      dislike(id) {
         let data = this.$store.state.auth.user;
         axios.post(`http://localhost:3000/api/posts/${data.userId}/${id}`, {type : "2"}, {
            headers: {
               'Authorization': this.$store.state.auth.user.token
            }
         })
            .then(res => {
               this.dataLike = res.data.like
               console.log(this.dataLike)
               axios.get('http://localhost:3000/api/posts/', {
                  headers: {
                     'Authorization': this.$store.state.auth.user.token
                  }
               })
                  .then(res => {
                     this.posts = res.data;
                  })
            })
      },
      deletePost(id) {
         console.log(id)
         axios.delete("http://localhost:3000/api/posts/" + id, {
            headers: {
               'Authorization': this.$store.state.auth.user.token
            }
         })
            .then(res => {
               axios.get('http://localhost:3000/api/posts/', {
                  headers: {
                     'Authorization': this.$store.state.auth.user.token
                  }
               })
                  .then(res => {
                     this.posts = res.data;
                     console.log(this.posts[0])
                  })
            })
      },
      sendPost() {
         console.log(this.files)
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
         const url = 'http://localhost:3000/api/posts/'
         axios.post(url, formData,

            {
               headers: {
                  'Authorization': this.$store.state.auth.user.token
               }
            })
            .then(res => {
               console.log(res)
               axios.get('http://localhost:3000/api/posts/', {
                  headers: {
                     'Authorization': this.$store.state.auth.user.token
                  }
               })
                  .then(res => {
                     this.posts = res.data;
                     this.text = "";
                  })
            })
      },
      createfiles(e) {
         console.log('test')
         const file = e.target.files[0];
         this.files = file;
         console.log(this.files)
         console.log(this.text)
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

#logo {
   width: 20%;
   margin: auto;
   padding-bottom: 40px;
}

header {
   margin-left: 8%;
   display: flex;
}
#container{
  margin: auto;
  width: 40%;
  border-radius: 8px;
  padding: 2%;
  border: 1px black solid;
  background-color: beige;
}
#send:hover{
  size: 105%;
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
</style>