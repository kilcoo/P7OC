<template>
    <div id="signup">
        <div id="info">
            <h2>bienvenue sur la page d'inscription de Groupomania !!!</h2>
        </div>
        <div id="form">
            <label for="email">Email: </label>
            <input type="email" name="email" id="email" required>
            <br>
            <label for="password">Mot de passe</label>
            <input type="password" name="password" required>
        </div>
        <div id="btn">
            <button>s'inscrire</button>
        </div>
    </div>
</template>

<script>
export default{
    name : 's\'inscrire'
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
#form {
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
