const express = require('express');                                          // on demande d'utiliser express
const router = express.Router();                                             // on declare la variable router pour utiliser le router d'express
const fs = require("fs")
const Post = require('../models/postModels');                                    // on demande d'utiliser thing qui se trouve dans le fichier models/thing


exports.createPost = (req, res, next) => {                               // on cree un create thing puis on l'export pour pouvoir l'utiliser ailleurs
  console.log(req.body)
  const thingObject = req.body                            
  let post ;
  if (req.file){
  post = new Post({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  }else {
    post = new Post ({
      ...thingObject
    })
  }
  post.save()
    .then(() => res.status(201).json({ message: 'votre publication a été publier !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.modifyPost = (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
     if(post.userId != req.auth.userId && req.auth.role != "admin"){
    return res.status(401).json({ message: "vous n'avez pas les droits" });
  }else{
    if(post.imageUrl !== null && req.file ){
      let file = post.imageUrl.split("/images")[1]
      fs.unlink(`images/${file}`,(error) => {
        if(error){
          console.log("failed")
        }
      })
    }
    const thingObject = req.file ?
    {
      ...req.body,           
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...JSON.parse(req.body.post) };
  Post.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Publication modifié !'}))
    .catch(error => res.status(400).json({ error }));
  }  
})
};

exports.findOnePost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  console.log(req.params.id)
  Post.findById(req.params.id)
        .then(post => {
            if (post.userId == req.auth.userId || req.auth.role == "admin") {
                if (req.body.imageUrl) {
                    const filename = post.imageUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('This image is deleted');
                        };
                    });
                };
                Post.deleteOne({_id:req.params.id})
                    .then(() => res.status(200).json({ message: "Post deleted." }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(400).json({ error: "Unauthorized request." }) 
            };
        })
        .catch(error => res.status(500).json({ error }));
};

exports.findAllPosts = (req, res, next) => {
  Post.find().then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
