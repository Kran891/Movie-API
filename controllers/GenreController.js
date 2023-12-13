const express = require("express");
const genreServices = require("../services/GenreService");
const movieGenreService = require("../services/MovieGenreService");
const genreController = express.Router();

genreController.route("/:name").get(
    async (req,res) => {
        res.send(await movieGenreService.findMovieByGenreName(req.params.name));
    }
)
genreController.route("/").get(
    async (req,res) => {
        res.send(await genreServices.getAllGenres());
    }
)

module.exports = genreController