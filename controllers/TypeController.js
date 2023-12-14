const express=require('express');
const typeService = require('../services/TypeService');
const typeController=express.Router()
typeController.route("/")
.get(async function(req,res){
    res.json(await (typeService.getAllTypes()))
})
module.exports=typeController;