const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
   name: String,
   releaseDate: Date,
   rating: { type: Number, min: 0, max: 5 }
})
const movies = mongoose.model("movie", MovieSchema)
module.exports = movies
