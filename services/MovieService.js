const movies = require("../models/Movie");
const movieGenreService = require("./MovieGenreService");
const movieLanguageService = require("../services/MovieLanguageService");
const movieOTTService = require("../services/MovieOTTService");

const movieTypeService = require("../services/MovieTypeService");
const movieImageService = require("./MovieImageService");

var movieService = {};
movieService.addNewMovie = async(data,poster)=>{
 const typeId = await movieService.addType(data.movieType);
 const posterId=await movieImageService.addnewImage(poster);
 console.log(typeId);
 const movie = new movies({
    name:data.name,
    imageUrl : data.imageUrl,
    rating:data.rating,
    releaseDate:data.releaseDate,
    typeId : typeId,
    description:data.description,
    posterId:posterId
  });
  await movie.save();
    await movieGenreService.addMovieGenres(movie._id,JSON.parse(data.genres));
    await movieLanguageService.addMovieLanguages(movie._id,JSON.parse(data.languages));
    await movieOTTService.addMovieOTTs(movie._id,JSON.parse(data.ott));
}
movieService.addType = async (name) => {
  let movieType = await movieTypeService.findMovieTypeByName(name);
  if(!movieType){
      movieType = await movieTypeService.addMovieType(name);
  }
  return movieType;
}

movieService.findMovieById = async (id) => {
  let movie = await movies.findOne({_id:id}).populate("typeId").populate("posterId")
  if(movie === null){
    return null;
  }
  return await fillMovie(movie)
}
async function fillMovie(movie) {
  movie.genres=await movieGenreService.getGenresByMovieId(movie._id);
  movie.languages=await movieLanguageService.findLanuagesByMovieId(movie._id)
  movie.ott=await movieOTTService.getMovieOttByMovieId(movie._id)
 return movie;
}
movieService.getAllMovies=async ()=>{
  let movieList;
  movieList=await movies.find({releaseDate:{$lte:new Date()}}).sort({releaseDate:'desc'}).populate("typeId").populate("posterId")
  return await getAllMovies(movieList)
}
movieService.getAllMoviesByUserId=async (uid)=>{
  let moviesList=await getAllMovies();
  moviesList=await getAllMovies(moviesList)
}
async function getWishListStatus(movieId){
  return movieId;
}
async function getAllMovies(movieList){
  for (let index = 0; index < movieList.length; index++) {
    movieList[index]=await fillMovie(movieList[index])
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