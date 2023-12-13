const mongoose = require('mongoose');
const UserRolesSchema=new mongoose.Schema({
    roleId:{type:mongoose.Schema.Types.ObjectId,ref:"role",required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
})
const userRoles=mongoose.model("userrole",UserRolesSchema)
module.exports=userRoles;
