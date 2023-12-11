const { default: mongoose } = require("mongoose");

const MovieOTTSchema = new mongoose.Schema({
    movieID: { type: mongoose.Schema.Types.ObjectId, ref: "movie", required: true },
    OTTId: { type: mongoose.Schema.Types.ObjectId, ref: "OTT", required: true }
})
const movieOTTs = mongoose.model("movieOTT", MovieOTTSchema)
module.exports = movieOTTs