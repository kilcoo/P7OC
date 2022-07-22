const Post = require('../models/postModels');

exports.likeDislike = (req, res, next) => {
  const type = req.body.type;
  console.log(type)
  let like = 0;
  let update = {};
  Post.findById(req.params.id)
    .then((post) => {
      if (type == "1") {
        if (!post.usersLiked.includes(req.params.userId)) {
          if(post.usersDisliked.includes(req.params.userId)) {
            update = {
              $inc: { likes: 1, dislikes: -1 },
              $push: { usersLiked: req.params.userId },
              $pull: { usersDisliked: req.params.userId }
            };
          } else {
            update = {
              $inc: { likes: 1 },
              $push: { usersLiked: req.params.userId },
            };
          }
          like = 1;
        } else if (post.usersLiked.includes(req.params.userId)) {
          update = {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.params.userId },
          };
          like = 0;
        }
      }
      if (type == "2") {
        if (!post.usersDisliked.includes(req.params.userId)) {
          if (post.usersLiked.includes(req.params.userId)) {
            update = {
              $inc: { dislikes: 1, likes: -1 },
              $push: { usersDisliked: req.params.userId },
              $pull: { usersLiked: req.params.userId },
            };
          } else {
            update = {
              $inc: { dislikes: 1 },
              $push: { usersDisliked: req.params.userId },
            };
          }
          like = -1;
        } else if (post.usersDisliked.includes(req.params.userId)) {
          update = {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.params.userId },
          };
          like = 0;
        }
      }
      Post.updateOne({ _id: req.params.id }, { ...update })
        .then(() => res.status(200).json({ like }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};