const express=require('express')
const movieService = require('../services/MovieService')
const movieController=express.Router()
movieController.route("/")
.get(async function(req,res){
    res.json(movieService.getAllMovies());
})
.post(async function(req,res){
   
    res.json(movieService.addNewMovie(req.body))
})
module.exports=movieController