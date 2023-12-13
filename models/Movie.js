const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
   name: {type:String,lowercase:true},
   releaseDate: Date,
   imageUrl : {type:String, lowercase:true},
   rating: { type: Number, min: 0, max: 5 },
   typeId: {type: mongoose.Schema.Types.ObjectId, ref:"movietype", required:true}
})
const movies = mongoose.model("movie", MovieSchema)
module.exports = movies
