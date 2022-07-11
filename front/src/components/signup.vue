<template>
    <div id="signup">
        <div id="info">
            <h2>bienvenue sur la page d'inscription de Groupomania !!!</h2>
        </div>
        <div id="form">
            <label for="email">Email: </label>
            <input v-model="email" type="email" name="email" id="email" required>
            <br>
            <label for="password">Mot de passe</label>
            <input v-model="password" type="password" name="password" id="password" required>
            <div id="btn">
                <button @click="handleSubmit">s'inscrire</button>
            </div>
        </div>
    </div>
</template>

<script> 
import axios from "axios";
export default {
    name: 's\'inscrire',
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        handleSubmit() {
            let newUser = {
                email: this.email,
                password: this.password
            }
            axios.post('http://localhost:3000/api/auth/signup', newUser)
            .then(res =>{
                if (res.status === 201){
                localStorage.setItem('token', res.data.token);
                this.$router.push('/groupomania')
            } 
            })
        }
    }
}


</script>

<style scoped>
#signup {
    margin: auto;
    padding-bottom:10% ;
    border: 3px black solid;
    border-radius: 10px;
    width: 25%;
    background-color: beige;
}
form {
    display: flex;
    flex-direction: column;
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
