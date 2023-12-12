const movieTypeMovies = require("../models/MovieTypeMovie");
const movieTypeService = require("../services/MovieTypeService");

var movieTypeServiceMovies = {Object};

movieTypeServiceMovies.addMovieTypeServiceMovies = async (movieId,movieTypeName) => {
    let movieType = await movieTypeService.findMovieTypeByName(movieTypeName);
    if(!movieType){
        movieType = await movieTypeService.addMovieType(movieTypeName);
    }
    return (await movieTypeMovies.create({movieId:movieId,typeId:movieType}))._id
}