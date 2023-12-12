const { default: mongoose } = require("mongoose");

const MovieOTTSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movie", required: true },
    ottId: { type: mongoose.Schema.Types.ObjectId, ref: "OTT", required: true },
    movieUrl:{type:String,required:true}
})
const movieOTTs = mongoose.model("movieOTT", MovieOTTSchema)
module.exports = movieOTTs