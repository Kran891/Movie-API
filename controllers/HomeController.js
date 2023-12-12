const express=require("express")
const homeRouter=express.Router();
const movieServices = require("../services/MovieService");
homeRouter.route("/")
.get(async function(req,res){
    res.send("<center><h1>Conntected to MovieBuzz API</h1></center>")
});

const data = {
    name : "Animal",
    releaseDate : "01-12-2023",
    rating : 4,
    movieType : "movie",
    genres : "Action",
    languages : "Telugu",
    otts : {
        name : "Netfilx",
        url : "https://www.netflix.com/" 
    }
};

homeRouter.post("/createmovie", (req,res) => {
    res.send(movieServices.addNewMovie(data));
})
module.exports=homeRouter