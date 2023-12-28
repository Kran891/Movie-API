const genres = require("../models/Genre");

var genreServices = {};
genreServices.addGenre = async (name) => {
    const genre = new genres({ name: name })
    await genre.save();
    console.log(genre);
    return genre._id;
}

genreServices.findGenreByName = async (name) => {
    let genre = (await genres.findOne({ name: name }, { _id: 1 }))
    return genre
}
genreServices.getAllGenres = async() => {
    let genresList = await genres.find({},{name:1}) 
    return await genresList.map(x=>x.name);
}
module.exports = genreServices

