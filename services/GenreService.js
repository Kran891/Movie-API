const genres = require("../models/Genre");

var genreServices;
genreServices.addGenre=async (name)=>{
 const genre=await genres.create({name:name})
 return genre.Id
}
genreServices.findGenreByName=async (name)=>{
    let genre= (await genres.findOne({name:name}))
    return genre._id
}
module.exports=genreServices
