const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const PostCtrl = require('../controllers/post');
const like = require('../controllers/like');

router.get('/', auth, PostCtrl.findAllPosts);  // methode get pour lire
router.post('/', auth, multer, PostCtrl.createPost);  // methode post permet de cree
router.get('/:id', auth, PostCtrl.findOnePost); // permet de trouver et lire un post
router.put('/:id', auth, multer, PostCtrl.modifyPost); //permet de modifier un post
router.delete('/:id', auth, PostCtrl.deletePost); //permet de supprimer un post

router.post('/:userId/:id' , auth, like.likeDislike); // permet de cree un like

module.exports = router;