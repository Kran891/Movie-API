const genres = require("../models/Genre");

var genreServices = {Object} ;
genreServices.addGenre = async (name)=>{
 const genre=await genres.create({name:name})
 return genre._id;
}
genreServices.findGenreByName=async (name)=>{
    let genre= (await genres.findOne({name:name}))
    return genre._id
}
module.exports=genreServices
