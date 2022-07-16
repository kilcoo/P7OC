// on cree un shema a suivre pour les elements
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({           // on utilise la fonctionnaliter .shema de mongoose
  userId: {type: String, required: true},
  username : {type: String, required: true},
  contents:{type: String, required: true},
  imageUrl: { type: String, required: false},
  likes: { type: Number, default: 0},
  dislikes: { type: Number, default: 0},
  usersLiked: [String],
  usersDisliked: [String],
});

module.exports = mongoose.model('Posts', postSchema);