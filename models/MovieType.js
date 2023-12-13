const mongoose = require("mongoose");

const MovieTypeSchema = new mongoose.Schema({
    name : { type : String, lowercase : true}
});

const movieTypes = mongoose.model("movietype",MovieTypeSchema);
module.exports = movieTypes;