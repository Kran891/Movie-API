const userRoles = require("../models/UserRoles");
const rolesService = require("./RolesService");

var  userRolesService={}
userRolesService.addUserRoles= async(userId,roles)=>{
    let roleid
    roles.forEach(async element => {
        roleid=await rolesService.findRoleByName(element)
        if(!roleid){
            roleid=await rolesService.addNewRole(element)
        }
       await userRolesService.addUserRole(userId,roleid)
    });
}
userRolesService.addUserRole=async(userId,role)=>{
    const userrole=new userRoles({
        userId:userId,
        roleId:role
    })
    await userrole.save();
}
userRolesService.getAllRoles=async (userId)=>{
  const roles=await userRoles.find({userId:userId},{roleId:1}).populate("roleId");
  const data=[]
  roles.forEach(element => {
    data.push(element.roleId.role)
  });
return data
}
module.exports=userRolesService;