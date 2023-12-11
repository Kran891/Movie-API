const { default: mongoose } = require("mongoose");



const GenreSchema = new mongoose.Schema({
    name: {type:String,lowercase:true}
})
const genres = mongoose.model("genre", GenreSchema);
module.exports = genres