const argon2=require('argon2')
const users = require("../models/User");
const InvalidCredentials = require('./InvalidCredentials');
const { token } = require('./JWTService');
require('dotenv').config();
var userService;
userService.addNewUser=async (data)=>{
const user= await users.create({
    username:data.email.split('@')[0],
    email:data.email,
    password:HashPassword(data.password),
    phoneNumber:data.phoneNumber
 })
 console.log(user);
    token(user,process.env.KEY,['user','admin'])
}
userService.loginUser=async (data)=>{
    const user=await users.findOne({email:data.email}).select('+password')
    if(VerifyPassword(data.password,user.password)){
     return token(user)
    }
   throw new InvalidCredentials("Email or Password id Incorrect")
}
async function HashPassword(password){
   await argon2.hash(password).then(hash=>{return hash})
}
async function VerifyPassword(password,hash) {
    await argon2.verify(hash,password).then(res=>{return res})
}
module.exports=userService;