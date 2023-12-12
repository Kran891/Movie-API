const mongoose=require('mongoose')
const RolesSchema=new mongoose.Schema({
    role:{type:String,required:true,lowecase:true}
})
const roles=mongoose.model("role",RolesSchema);
module.exports=roles