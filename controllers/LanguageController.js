const express=require('express')
const languageService = require('../services/LanguageService')
const movieLanguageService = require('../services/MovieLanguageService')
const languageController=express.Router()
languageController.route("/")
.get(async function(req,res){
    res.json(await languageService.getAllLanguages())
})
languageController.route("/:name")
.get(async function(req,res) {
    res.json(await movieLanguageService.getMoviesByLanguage(req.params.name))
})
module.exports=languageController;