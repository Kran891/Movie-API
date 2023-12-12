const express=require('express')
const userService = require('../services/UserService')
const userController=express.Router()
userController.route("/")
.post(async function(req,res) {
    try{
    const token=userService.addNewUser(req.body)
    res.cookie("token",token,{httpOnly:true})
    res.json("User Created");
    }catch(err){
        res.status(401).send(err.message)
    }
})
.get(async function(req,res){
    const token=req.cookies.token
    res.json({token})
})
module.exports=userController