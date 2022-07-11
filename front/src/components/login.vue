<template>
    <div id="login">
        <div id="info">
            <h2>Content de vous revoir !</h2>
        </div>
        <form id="form">
            <label for="email">Email: </label>
            <input v-model="email" type="email" name="email" id="email" required>
            <br>
            <label for="password">Mot de passe</label>
            <input v-model="password" type="password" name="password" id="password" required>
            <div id="btn">
                <button @click="login">se connecter</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'se connecter',
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        login() {
            let user = {
                email:this.email,
                password:this.password
            }
        axios.post('http://localhost:3000/api/auth/login', user)
        .then(res => {
            if (res.status === 200){
                localStorage.setItem('token', res.data.token);
                this.$router.push('/groupomania')
            } 
            })
        }
    }
}
 
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
#login {
    margin: auto;
    padding-bottom:10% ;
    border: 3px black solid;
    border-radius: 10px;
    width: 25%;
    background-color: beige;
    
}
#btn{
	float:right;
    padding:8px 12px;
    margin:25% 1% 0 0;
    color:#5a5a6e;
    cursor:pointer;
    transition:all .3s
}
</style>
