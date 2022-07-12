const mongoose = require('mongoose');                                          // on demande d'utiliser mongoose
const uniqueValidator = require('mongoose-unique-validator');                  // on demande d'utiliser unique validator pour avoir verfifier si les email ou mdp sont unique

const userSchema = mongoose.Schema({                                     // on declare usershema puis on dit qu'un email sera de type string qu'il sera unique est sera obligatoire
  username : { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } ,
  role : {type: String, default:"salarie"},
  bio:{type: String, required: false},
  profilePicture: { type: String, required: false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);