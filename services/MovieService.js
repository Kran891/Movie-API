const movies = require("../models/Movie");
const movieServcieGenres = require("./MovieServiceGenre");
const movieServiceLanguage = require("../services/MovieServiceLanguage");
const movieServiceOTT = require("../services/MovieServiceOTT");
const movieTypeServiceMovies = require("../services/MovieTypeServiceMovie");

var movieService;
movieService.addNewMovie=async(data)=>{
 await movies.create({
    name:data.name,
    rating:data.rating,
    releaseDate:data.releaseDate
  }).then(async x=>{
    await movieTypeServiceMovies.addMovieTypeServiceMovies(x._id,data.type);
    await movieServcieGenres.addMovieGenres(x._id,data.genres);
    await movieServiceLanguage.addMovieLanguages(x._id,data.languages);
    await movieServiceOTT.addMovieOTTs(x._id,data.otts);
  })
}