const mongoose = require("mongoose")

const LanguageSchema = new mongoose.Schema({
    name : { type: String, lowercase : true }
});

const languages = mongoose.model("language", LanguageSchema);
module.exports = languages;