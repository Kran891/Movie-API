const movieGenres = require("../models/MovieGenre");
const genreServices = require("./GenreService");

var movieServcieGenres = {};
movieServcieGenres.addMovieGenres = async (movieId, genrenames) => {
   
    genrenames.forEach(async element => {
        let genre = await genreServices.findGenreByName(element)
        
        if (!genre) {
            genre = await genreServices.addGenre(element)
            console.log("G",genre);
        }
       await movieServcieGenres.addMovieGenre(movieId, genre)

    });
}
movieServcieGenres.addMovieGenre = async (movieId, genreId) => {
    return await (new movieGenres({ movieId: movieId, genreId: genreId }).save())._id
}
module.exports=movieServcieGenres