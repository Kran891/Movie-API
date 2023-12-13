const movieGenres = require("../models/MovieGenre");
const genreServices = require("./GenreService");

var movieGenreService = {};
movieGenreService.addMovieGenres = async (movieId, genrenames) => {
   
    genrenames.forEach(async element => {
        let genre = await genreServices.findGenreByName(element)
        
        if (!genre) {
            genre = await genreServices.addGenre(element)
            console.log("G",genre);
        }
       await movieGenreService.addMovieGenre(movieId, genre)

    });
}
movieGenreService.addMovieGenre = async (movieId, genreId) => {
    return await (new movieGenres({ movieId: movieId, genreId: genreId }).save())._id
}
module.exports=movieGenreService