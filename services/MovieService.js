const movies = require("../models/Movie");
const movieServcieGenres = require("./MovieServiceGenre");

var movieService;
movieService.addNewMovie=async(data)=>{
 await movies.create({
    name:data.name,
    rating:data.rating,
    releaseDate:data.releaseDate
  }).then(async x=>{await movieServcieGenres.addMovieGenres(x._id,data.genres)})
  
}