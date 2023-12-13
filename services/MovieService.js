const movies = require("../models/Movie");
const movieGenreService = require("./MovieGenreService");
const movieLanguageService = require("../services/MovieLanguageService");
const movieOTTService = require("../services/MovieOTTService");

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
    await movieGenreService.addMovieGenres(movie._id,data.genres);
    await movieLanguageService.addMovieLanguages(movie._id,data.languages);
    await movieOTTService.addMovieOTTs(movie._id,data.otts);
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
movieService.getAllMovies=async ()=>{
  let movie=await movies.find({releaseDate:{$lte:new Date()}}).sort({releaseDate:'desc'})
  return movie
}
movieService.getUpcomingMovies=async ()=>{
  let movie=await movies.find({releaseDate:{$gte:new Date()}}).sort({releaseDate:'asc'})
  return movie
}
movieService.findMoviesByLanguageByType = async (movieType,languageName) => {
  let movieTypeId = await movieTypeService.findMovieTypeByName(movieType);
  console.log("m",movieTypeId);
  let moviesList = await movieLanguageService.findMoviesByLanguageName(languageName);
  moviesList = moviesList.filter(x => x.movieId.typeId.equals(movieTypeId._id));
  return moviesList;
};
module.exports = movieService;