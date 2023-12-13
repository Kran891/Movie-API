const roles = require("../models/Roles")

var rolesService={}
rolesService.addNewRole=async (name)=>{
    const role=new roles(
        {
            role:name
        }
    )
    await role.save();
    return role._id;
}
rolesService.findRoleByName=async (name)=>{
    const roleId=await roles.findOne({role:name},{_id:1});
    return roleId;
}

module.exports=rolesService;