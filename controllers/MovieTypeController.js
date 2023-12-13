const express = require("express");
const movieTypeServices = require("../services/MovieTypeService");
const movieTypeController = express.Router();

movieTypeController.route("/")
.get(
    async (req,res) => {
        res.send(await movieTypeServices.getAllMovieTypes());
    }
)

module.exports = movieTypeController