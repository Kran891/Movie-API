const express=require("express");
const genreService = require("../services/GenreService");
const movieGenreService = require("../services/MovieGenreService");
const movieService = require("../services/MovieService");
const homeController=express.Router();
homeController.route("/")
.get(async function(req,res){
    res.send("<center><h1>Conntected to MovieBuzz API</h1></center>")
});

const data = {
    name : "Animal",
    releaseDate : "01-12-2023",
    rating : 4,
    movieType : "movie",
    genres : ["Action"],
    languages : ["Telugu"],
    otts : [{
        name : "Netfilx",
        url : "https://www.netflix.com/" 
    }]
};

homeController.route("/createmovie").post(async  (req,res) => {
    const da = await movieService.addNewMovie(data)
    res.json(da)
})

homeController.route("/findmovies").post(async  (req,res) => {
    const da = await movieGenreService.findMovieByGenreName("action");
    res.json(da)
})
module.exports=homeController