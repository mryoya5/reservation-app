const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserShema = new Schema({
  //author: ObjectId,
  image: String,
  username: {
    type:String,
    required:true,
    max:[60, "ユーザ名は最大60文字までです"]
  },
  email: {
    type:String,
    required:true,
    lowercase:true,
    unique:true,
    max:[60, "Eメールは最大60文字までです"]
  },
  password: {
    type:String,
    required:true,
    max:[30, "パスワードは最大30文字までです"],
    min:[6, "パスワードは6文字以上で入力してください"]
  },
});

UserShema.methods.hasSamePassword = function(inputpassword){
  const user = this
  return bcrypt.compareSync(inputpassword, user.password)
}

UserShema.pre("save", function(next){
  // user.save の前にパスワードをハッシュ化する
  const user = this
  const saltRounds = 10
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      // Store hash in your password DB.
      user.password = hash
      next()
    });
  });
})

module.exports = mongoose.model("User", UserShema)