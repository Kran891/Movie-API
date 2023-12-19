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
    try{
        const {token,id,roles} = await userService.loginUser(req.body);
    res.json({token,id,roles});
    }
    catch(err){
        res.status(401).send(err.message)
    }
})
userController.route("/changepassword") 
.post(async (req,res) => {
    try {
        const data = req.body;
        res.json(await userService.changePassword(data));
    } catch (err) {
        res.status(401).send(err.message);
    }
})
userController.route("/updateuser")
.post(authenticateRole("user"),async (req,res) => {
    try {
        res.json(await userService.updateUser(req.body));
    } catch (err) {
        res.status(401).send(err.message);
    }
})
userController.route("/getuser")
.post( authenticateRole("user"),
    async (req,res) =>  {
        try {
            const userId = req.body.userId;
            res.json(await userService.findUserById(userId));
        } catch (err) {
            res.status(401).send(err.message);
        }
}

)
module.exports=userController

//Some