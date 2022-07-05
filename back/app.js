const express = require("express");
const mongoose = require("mongoose");
const path = require("path")

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');   

const dotenv = require("dotenv");
const result = dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.nxkzj.mongodb.net/project0?retryWrites=true&w=majority`, 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))           // si la connexion est reussi
  .catch(() => console.log('Connexion à MongoDB échouée !'));         // si la connexion a echouer

const app = express();

app.use((req, res, next) => {                                                                  // permet de donner les acces a tout le monde
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));    
app.use('/api/auth', userRoutes);
app.use('/api/',postRoutes);


module.exports = app;