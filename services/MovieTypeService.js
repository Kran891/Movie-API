const movieTypes = require("../models/MovieType");

var movieTypeServices = {Object};
movieTypeServices.addMovieType = async (name) => {
    const movieType = await movieTypes.create({ name: name })
    return movieType._id;
}
movieTypeServices.findMovieTypeByName = async (name) => {
    let movieType = (await movieTypes.findOne({ name: name }))
    return movieType._id
}
movieTypeServices.deleteMovieType = async (name) => {
    const movieType = await movieTypes.findOne(name);
    await movieTypes.deleteOne(movieType);
    return movieType._id;
}
module.exports = movieTypeServices
