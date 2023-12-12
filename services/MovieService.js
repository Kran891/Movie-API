const movies = require("../models/Movie");
const movieServcieGenres = require("./MovieServiceGenre");
const movieServiceLanguage = require("../services/MovieServiceLanguage");
const movieServiceOTT = require("../services/MovieServiceOTT");

var movieService;
movieService.addNewMovie=async(data)=>{
 await movies.create({
    name:data.name,
    rating:data.rating,
    releaseDate:data.releaseDate
  }).then(async x=>{
    await movieServcieGenres.addMovieGenres(x._id,data.genres);
    await movieServiceLanguage.addMovieLanguages(x._id,data.languages);
    await movieServiceOTT.addMovieOTTs(x._id,data.otts);
  })
}