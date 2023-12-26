const userRoles = require("../models/UserRoles");
const rolesService = require("./RolesService");

var  userRolesService={}
userRolesService.addUserRoles= async(userId,role)=>{
    let roleid
    roleid=await rolesService.findRoleByName(role)
        if(!roleid){
            roleid=await rolesService.addNewRole(role)
        }

       await userRolesService.addUserRole(userId,roleid)
}
userRolesService.addUserRole=async(userId,role)=>{
    const userrole=new userRoles({
        userId:userId,
        roleId:role
    })
    await userrole.save();
}
userRolesService.getUserRole = async (userId)=>{
  const roles=await userRoles.findOne({userId:userId},{roleId:1}).populate("roleId");
  const data= roles.roleId.name
  return data
}
module.exports=userRolesService;