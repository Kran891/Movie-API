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
    typeId : typeId,
    description:data.description
  });
  await movie.save();
    await movieGenreService.addMovieGenres(movie._id,data.genres);
    await movieLanguageService.addMovieLanguages(movie._id,data.languages);
    await movieOTTService.addMovieOTTs(movie._id,data.ott);
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
  let movieList=await movies.find({releaseDate:{$lte:new Date()}}).sort({releaseDate:'desc'}).populate("typeId")
  return await getAllMovies(movieList)
}
async function getAllMovies(movieList){
  for (let index = 0; index < movieList.length; index++) {
    movieList[index].genres=await movieGenreService.getGenresByMovieId(movieList[index]._id);
    movieList[index].languages=await movieLanguageService.findLanuagesByMovieId(movieList[index]._id)
    movieList[index].ott=await movieOTTService.getMovieOttByMovieId(movieList[index]._id)
  }
  
  return movieList;
}
movieService.getUpcomingMovies=async ()=>{
  let movieList=await movies.find({releaseDate:{$gte:new Date()}}).sort({releaseDate:'asc'}).populate("typeId")
  return getAllMovies(movieList);
}
movieService.findMoviesByLanguageByType = async (movieType,languageName) => {
  let movieTypeId = await movieTypeService.findMovieTypeByName(movieType);
  
  let moviesList = await movieLanguageService.findMoviesByLanguageName(languageName);
  moviesList = moviesList.filter(x => x.movieId.typeId.equals(movieTypeId._id));
  return moviesList;
};
module.exports = movieService;