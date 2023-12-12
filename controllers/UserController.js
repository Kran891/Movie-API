const express=require('express')
const { authenticateRole } = require('../services/JWTService')
const userService = require('../services/UserService')
const userController=express.Router()
userController.route("/")
.post(async function(req,res) {
    try{
    const token=await userService.addNewUser(req.body)
    
    res.cookie("token",token,{httpOnly:true})
    res.json("User Created");
    }catch(err){
        res.status(401).send(err.message)
    }
})
.get(authenticateRole('admin'),async function(req,res){
    res.json( await userService.getAllUsers());
})
userController.route("/login")
.post(async function(req,res){
    res.cookie("token",await userService.loginUser(req.body))
    res.json("Login Succes");
})
module.exports=userController