
const signup = {
    template: " <h4>s'inscrire</h4>",
    name: "s'inscrire"
}
const login = {
    template : "<h4>se connecter</h4>",
    name : "se connecter"
}




const router = new VueRouter({
    routes: [
        {path: '/', component: home, name :"home"},
        {path: '/signup', component: signup, name :"signup"},
        {path: '/login', component: login, name : "login"},
    ]
})

var vue = new Vue ({
    router 
}).$mount('#app');
