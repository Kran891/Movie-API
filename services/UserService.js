const argon2=require('argon2')
const users = require("../models/User");
const InvalidCredentials = require('./InvalidCredentials');
const { token } = require('./JWTService');
const userRolesService = require('./UserRolesService');
require('dotenv').config();
var userService={};
userService.addNewUser=async function(data){
const user= new users({
    username:data.email.split('@')[0],
    email:data.email,
    name:data.name,
    password:await HashPassword(data.password)
   //  phoneNumber:data.phoneNumber
 })
 await user.save();
 await  userRolesService.addUserRoles(user._id,["user"])
 return await token(user,process.env.KEY,data.roles)  
}
userService.loginUser=async (data)=>{
    const user=await users.findOne({email:data.email}).select('+password')
    if(VerifyPassword(data.password,user.password)){
      const roles=await userRolesService.getAllRoles(user._id)
      
      return await token(user,process.env.KEY,roles)
    }
   throw new InvalidCredentials("Email or Password id Incorrect")
}
userService.getAllUsers= async ()=>{
   return await users.find({});
}
userService.findUserById = async (id) =>{
   return await users.findOne({_id:id});
}
async function HashPassword(password){
   const hash=await argon2.hash(password)
   return hash;
}
async function VerifyPassword(password,hash) {
    await argon2.verify(hash,password).then(res=>{return res})
}

userService.changePassword = async (data) => {
   const user = await users.findOne({_id:data.userId}).select('+password')
   console.log("user",user);
   if(VerifyPassword(data.password,user.password)){
      user.password = await HashPassword(data.newPassword);
      return await users.updateOne(user);
   }
}
userService.updateUser = async (data) => {
   const user = await users.findOne({_id:data._id}).select('+password')
   user.name = data.name;
   user.email = data.email;
   return await users.updateOne(user);
}
module.exports=userService;