const movies = require("../models/Movie");
const movieServcieGenres = require("./MovieServiceGenre");
const movieServiceLanguage = require("../services/MovieServiceLanguage");
const movieServiceOTT = require("../services/MovieServiceOTT");
const movieTypeServiceMovies = require("../services/MovieTypeServiceMovie");
const movieTypeService = require("../services/MovieTypeService");

var movieService = {};
movieService.addNewMovie = async(data)=>{
 const typeId = await movieService.addType(data.movieType);

 console.log(typeId);
 const movie = new movies({
    name:data.name,
    imageUrl : data.imageUrl,
    rating:data.rating,
    releaseDate:data.releaseDate,
    typeId : typeId
  });
  await movie.save();
    await movieServcieGenres.addMovieGenres(movie._id,data.genres);
    await movieServiceLanguage.addMovieLanguages(movie._id,data.languages);
    await movieServiceOTT.addMovieOTTs(movie._id,data.otts);
}
movieService.addType = async (name) => {
  let movieType = await movieTypeService.findMovieTypeByName(name);
  if(!movieType){
      movieType = await movieTypeService.addMovieType(name);
  }
  return movieType;
}

movieService.findMovieById = async (id) => {
  let movie = await movies.findOne({_id:id},{_id:1})
  if(movie === null){
    return null;
  }
  return movie;
}
module.exports = movieService;