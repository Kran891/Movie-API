const movieLanguages = require("../models/MovieLanguage");
const languageService = require("./LanguageService");

var movieLanguageService = {};

movieLanguageService.addMovieLanguages = async (movieId,languageNames) => {
    let language;
    languageNames.forEach(async element => {
        language = await languageService.findLanguageByName(element);
        if(!language){
            language = await languageService.addLanguage(element);
        }
        await movieLanguageService.addMovieLanguage(movieId,language);
    });
};
movieLanguageService.addMovieLanguage = async (movieId,languageId) => {
    const movieLanguage =  new movieLanguages({
        movieId : movieId,
        languageId : languageId
    })
    await movieLanguage.save();
    return movieLanguage._id;
}
movieLanguageService.findMoviesByLanguageName = async (name) =>{
    let languageId = await languageService.findLanguageByName(name);
    let movieIds = await movieLanguages.find({languageId:languageId},{_id:0,movieId:1}).populate('movieId')
    return movieIds;
}
module.exports = movieLanguageService;