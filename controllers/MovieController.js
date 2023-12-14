const express=require('express');
const { authenticateRole } = require('../services/JWTService');
const movieService = require('../services/MovieService');
const typeService = require('../services/TypeService');
const movieController=express.Router()
movieController.route("/")
.get(async function(req,res){
    res.json(await movieService.getAllMovies());
})
.post(async function(req,res){
   
    res.json(movieService.addNewMovie(req.body))
})
movieController.route("/upcoming")
.get(async function(req,res) {
  res.json(await movieService.getUpcomingMovies())
})
movieController.route("/:id")
.get(async function(req,res){
    res.json(await movieService.findMovieById(req.params.id))
})
.put(authenticateRole("admin"),async function(req,res){
    res.json(await movieService.updateMovieById(req.params.id,req.data))
})

module.exports=movieController