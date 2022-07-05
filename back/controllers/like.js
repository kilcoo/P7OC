const Post = require('../models/postModels');

exports.likeDislike = (req, res, next) => {
  let like = req.body.like;
  let update;
  Post.findById(req.params.id)
    .then((post) => {
      if (like === 1 && !post.usersLiked.includes(req.body.userId)) {
        update = {
          $inc: { likes: 1 },
          $push: { usersLiked: req.body.userId },
        };
      } 
      else if (like === 1 && post.usersLiked.includes(req.body.userId)) {
        update = {
          $inc: { likes: -1 },
          $pull: { usersLiked: req.body.userId },
        };
      }
      Post.updateOne({ _id: req.params.id }, { ...update })
        .then(() => res.status(200).json({ message: "sucess" }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};