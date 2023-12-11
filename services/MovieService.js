const movies = require("../models/Movie");

var movieService;
movieService.addNewMovie=(data)=>{
const movie=  movies.create({
    name:data.name,
    rating:data.rating,
    releaseDate:data.releaseDate
  })
  
}