const roles = require("../models/Roles")

var rolesService={}
rolesService.addNewRole=async (name)=>{
    const role=new roles(
        {
            role:name
        }
    )
    await role.save();
}