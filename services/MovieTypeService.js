const movieTypes = require("../models/MovieType");

var movieTypeServices = {};
movieTypeServices.addMovieType = async (name) => {
    const movieType = new movieTypes({ name: name })
    await movieType.save()
    return movieType._id;
}
movieTypeServices.findMovieTypeByName = async (name) => {
    let movieType = (await movieTypes.findOne({ name: name },{_id:1}))
    return movieType
}
movieTypeServices.deleteMovieType = async (name) => {
    const movieType = await movieTypes.findOne(name);
    await movieTypes.deleteOne(movieType);
    return movieType._id;
}
module.exports = movieTypeServices
