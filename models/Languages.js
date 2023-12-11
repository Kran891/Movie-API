const mongoose = require("mongoose")

const Language = new mongoose.Schema({
    languages: { type: String, lowercase : true }
});

const languages = mongoose.model("language", Language);
module.exports = languages;