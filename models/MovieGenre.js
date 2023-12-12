const { default: mongoose } = require("mongoose")

const MovieGenreSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movie", required: true },
    genreId: { type: mongoose.Schema.Types.ObjectId, ref: "genre", required: true }
})
const movieGenres = mongoose.model("moviegenre", MovieGenreSchema)
module.exports = movieGenres