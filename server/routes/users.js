const express = require("express")
const router = express.Router()

const User = require("../model/user")
const jwt = require('jsonwebtoken')
const config = require("../config")

router.post("/login", function(req, res){

  const { email, password } = req.body

  if(!email) {
    // emailが空の場合
    // Invalid error
    return res.status(422).send({errors: [{title: "email error", detail: "Please fill email!"}]})
  }

  if(!password) {
    // passwordが空の場合
    // Invalid error
    return res.status(422).send({errors: [{title: "password error", detail: "Please fill password!"}]})
  }

  User.findOne({email}, function(err, foundUser){
    if(err){
      // Error message
      return res.status(422).send({errors: [{title: "User error", detail: "Something went wrong!"}]})
    }
    if(!foundUser){
      // ユーザが存在しない場合
      // Invalid error
      return res.status(422).send({errors: [{title: "User error", detail: "User not exist!"}]})
    }

    if(!foundUser.hasSamePassword(password)){
        // パスワードが正しくない場合
        return res.status(422).send({errors: [{title: "User error", detail: "Incorrect password!"}]})
    }

    const token = jwt.sign({
      userId: foundUser.id,
      username: foundUser.username
    }, config.SECRET, { expiresIn: '1h' })
    return res.json(token)
  })
})

router.post("/register", function(req, res){

  const { username, email, password, confirmPassword } = req.body

  if(!username) {
    // usernameがからの場合
    // Invalid error
    return res.status(422).send({errors: [{title: "username error", detail: "Please fill username!"}]})
  }

  if(!email) {
    // emailがからの場合
    // Invalid error
    return res.status(422).send({errors: [{title: "email error", detail: "Please fill email!"}]})
  }

  if(!password) {
    // passwordがからの場合
    // Invalid error
    return res.status(422).send({errors: [{title: "password error", detail: "Please fill password!"}]})
  }

  if(password !== confirmPassword) {
    // パスワードが一致しない場合
    // Invalid error
    return res.status(422).send({errors: [{title: "password check error", detail: "Please check username!"}]})
  }

  User.findOne({email}, function(err, foundUser){
    if(err){
      // Error message
      return res.status(422).send({errors: [{title: "User error", detail: "Something went wrong!"}]})
    }
    if(foundUser){
      // ユーザが既に存在する場合
      // Invalid error
      return res.status(422).send({errors: [{title: "User error", detail: "User already exist!"}]})
    }

    const user = new User({username, email, password})
    user.save(function(err){
      if(err){
        // Error message
        return res.status(422).send({errors: [{title: "User error", detail: "Something went wrong!"}]})
      }
      return res.json({"registerd":true})
    })
  })

})

module.exports = router