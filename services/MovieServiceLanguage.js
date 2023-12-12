const movieLanguages = require("../models/MovieLanguage");
const languageService = require("../services/LanguageService");

var movieServiceLanguage;

movieServiceLanguage.addMovieLanguages = async (movieId,languageNames) => {
    let language;
    languageNames.forEach(async element => {
        language = await languageService.findLanguageByName(element);
        if(!language){
            language = await languageService.addLanguage(element);
        }
        await movieServiceLanguage.addMovieLanguage(movieId,language);
    });
};
movieServiceLanguage.addMovieLanguage = async (movieId,languageId) => {
    return (await movieLanguages.create({
        movieId : movieId,
        languageId : languageId
    }))._id
}