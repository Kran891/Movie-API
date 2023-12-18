const mongoose = require('mongoose')
const languages = require('./Languages')

const MovieSchema = new mongoose.Schema({
   name: {type:String,lowercase:true},
   releaseDate: Date,
   imageUrl : {type:String, lowercase:true},
   rating: { type: Number, min: 0, max: 5 },
   typeId: {type: mongoose.Schema.Types.ObjectId, ref:"movietype", required:true},
   genres:[String],
   languages:[String],
   description:String,
   ott:{}
})
const movies = mongoose.model("movie", MovieSchema)
module.exports = movies
