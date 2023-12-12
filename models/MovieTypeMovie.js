const mongoose = require("mongoose");

const MovieTypeMovieSchema = new mongoose.Schema({
    movieId : { type : mongoose.Types.ObjectId, ref:"movie", required:true},
    typeId : { type : mongoose.Types.ObjectId, ref:"movieType", required:true}
});

const movieTypeMovies = mongoose.model("movieTypeMovie",MovieTypeMovieSchema);
module.exports = movieTypeMovies;