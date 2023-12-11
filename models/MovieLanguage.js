const mongoose = require("mongoose")

const MovieLanguage = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movie", required: true },
    languages: String
});

const movieLanguages = mongoose.model("movielanguage", MovieLanguage);
module.exports = movieLanguages;