const mongoose = require("mongoose");

const MovieTypeSchema = new mongoose.Schema({
    name : { type : String, lowercase : true}
});

const movieTypes = mongoose.model("movieType",MovieTypeSchema);
module.exports = movieTypes;