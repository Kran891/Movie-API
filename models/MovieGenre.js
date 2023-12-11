const { default: mongoose } = require("mongoose")

const MovieGenre = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movie", required: true },
    genreId: { type: mongoose.Schema.Types.ObjectId, ref: "genre", required: true }
})
const movieGenres = mongoose.model("moviegenre", MovieGenre)
module.exports = movieGenres