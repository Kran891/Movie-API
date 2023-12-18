const movieTypes = require("../models/MovieType");

var typeService={};
typeService.getAllTypes=async ()=>{
  return await (await movieTypes.find({},{name:1,_id:0})).map(x=>x.name)
}
module.exports=typeService;