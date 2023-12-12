const argon2=require('argon2')
const users = require("../models/User");
const InvalidCredentials = require('./InvalidCredentials');
const { token } = require('./JWTService');
require('dotenv').config();
var userService={};
userService.addNewUser=async function(data){
const user= new users({
    username:data.email.split('@')[0],
    email:data.email,
    password:await HashPassword(data.password),
    phoneNumber:data.phoneNumber
 })
 await user.save();
 
   
}
userService.loginUser=async (data)=>{
    const user=await users.findOne({email:data.email}).select('+password')
    if(VerifyPassword(data.password,user.password)){
      return token(user,process.env.KEY)
    }
   throw new InvalidCredentials("Email or Password id Incorrect")
}
userService.getAllUsers= async ()=>{
   return await users.find({});
}
async function HashPassword(password){
   const hash=await argon2.hash(password)
   return hash;
}
async function VerifyPassword(password,hash) {
    await argon2.verify(hash,password).then(res=>{return res})
}
module.exports=userService;