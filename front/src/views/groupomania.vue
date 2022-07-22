<template>
   <div id="body">
      <header>
         <img id="logo" src="../assets/icon-left-font-monochrome-black.png">
      </header>
      <div id="nav">
         <Nav />
      </div>
      <div>
         <div id="container">
            <div @submit="sendPost">
               <label for="text"></label>
               <textarea v-model="this.text" name="text" id="textpost" placeholder="Quoi de neuf ?" />
               <div>
                  <label for="image"></label>
                  <input @change="createfiles" name="image" type="file" id="imagepost"
                  ref="imageUpload" />
               </div>
               <input @click="sendPost" type="submit" />
            </div>
         </div>
         <br>
         <div v-for="post in posts.slice().reverse()" :key="post._id" id='postContainer'>
            <div id="creatorname">
               <p>{{ post.username }}</p>
               <button v-if="post.username == currentUser.username || currentUser.role == 'admin'"
                  @click="this.deletePost(post._id)">supprimer</button>
               <button v-if="post.username == currentUser.username || currentUser.role == 'admin'"
                  @click="edit(post._id)">modifier</button>
            </div>
            <div id="text">
               <p>{{ post.contents }}</p>
            </div>
            <div id="divimage">
               <img v-if="post.imageUrl != undefined" id="image" :src="`${post.imageUrl}`">
            </div>
            <div id="like">
               <p>Like: {{ post.likes }} Dislike: {{ post.dislikes }} </p>
               <button @click="like(post._id)">
                  <font-awesome-icon id="like1"
                     :class="[{likeActive: post.usersLiked.find(id => id === currentUserId)}, like]"
                     icon="fa-solid fa-thumbs-up" />
               </button>
               <button @click="dislike(post._id)">
                  <font-awesome-icon id="like2"
                     :class="[{dislikeActive: post.usersDisliked.find(id => id === currentUserId)}, like]"
                     icon="fa-solid fa-thumbs-down" />
               </button>
            </div>
         </div>
      </div>
   </div>
</template>


<script>
import Nav from '../components/nav.vue';
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
         files: "",
         currentUserId: this.$store.state.auth.user.userId,
      };
   },
   components: {
      Nav,
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
      edit(id){
         this.$router.push({
            path: '/editpost',
            query: {idpost: `${id}`}
         })
      },
      like(id) {
            let data = this.$store.state.auth.user;
         axios.post(`http://localhost:3000/api/posts/${data.userId}/${id}`, {type: "1"}, {
            headers: {
               'Authorization': this.$store.state.auth.user.token
            }
         })
            .then(res => {
               this.dataLike = res.data.like
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
                  })
            })
      },
      sendPost() {
         let data = this.files
         if (this.text == "") {
            alert("veuillez entrer un texte")
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
               axios.get('http://localhost:3000/api/posts/', {
                  headers: {
                     'Authorization': this.$store.state.auth.user.token
                  }
               })
                  .then(res => {
                     this.posts = res.data;
                     this.text = "";
                     this.$refs.imageUpload.value = null;
                     this.files = null;
                  })
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
#nav {
   margin: auto;
   width: 40%;
}
#postContainer {
   margin: auto;
   width: 45%;
   border-radius: 25px;
   background: #e0e0e0;
   box-shadow:  20px 20px 60px #bebebe,-20px -20px 60px #ffffff;
   margin-bottom: 3em;
}
#creatorname {
   border-radius: 8px;
   width: 25%;
   float: left;
}
#creatorname button{
   width: 50%;
   border-radius: 5px;
}

#like {
   font-size: 25px;
   border-radius: 0;
   justify-content: space-around;
   display: flex;
}
#like button {
   border: none;
   background: none;
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
   margin-left: 40em;
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
  background-color:#FFD7D7;
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
textarea {
  resize: none;
}
#body{
   height: 100vh;
}
.like {
   color: black;
}
.likeActive {
   color: rgb(8, 107, 8);
}
.dislikeActive {
   color: rgb(180, 21, 21);
}
@media screen and ( max-width: 667px) {
   #nav {
      width: 100%;
   }
   #logo {
      margin-left: 4em;
      width: 60%;
   }
   #container {
      width: 90%;
   }
   #postContainer{
      width: 100%;
   }
   #creatorname button {
      font-size: 11px;
      padding-right: 25px;
   }
}
@media screen and (min-width: 668px) and (max-width: 970px) {
  #logo {
      margin-left: 12em;
      width: 40%;
   }
   #container {
      width: 90%;
   }
   #postContainer{
      width: 100%;
   }
}
</style>