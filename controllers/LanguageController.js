const express=require('express')
const movieLanguageService = require('../services/MovieLanguageService')
const languageController=express.Router()
languageController.route("/:name")
.get(async function(req,res) {
    res.json(await movieLanguageService.getMoviesByLanguage(req.params.name))
})
module.exports=languageController;