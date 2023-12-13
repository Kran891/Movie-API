const movies = require("../models/Movie");
const movieServcieGenres = require("../services/MovieGenreService");
const movieServiceLanguage = require("../services/MovieLanguageService");
const movieServiceOTT = require("../services/OTTService");
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
};

movieService.findMoviesByLanguageByType = async (movieType,languageName) => {
  let movieTypeId = await movieTypeService.findMovieTypeByName(movieType);
  let moviesList = await movieServiceLanguage.findMoviesByLanguageName(languageName);
  moviesList.filter(x => x.movieId.typeId === movieTypeId);
  return moviesList;
};

module.exports = movieService;