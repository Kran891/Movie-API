const mongoose = require("mongoose")

const MovieLanguageSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movie", required: true },
    languageId : { type: mongoose.Schema.Types.ObjectId, ref:"language", required:true}
});

const movieLanguages = mongoose.model("movielanguage", MovieLanguageSchema);
module.exports = movieLanguages;