const movieTypes = require("../models/MovieType");

var typeService={};
typeService.getAllTypes=async ()=>{
  return await movieTypes.find({},{name:1,_id:0})
}
module.exports=typeService;