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

// movieGenreService.findMovieByGenreName = async (name) => {
//     let genreId = await genreServices.findGenreByName(name);
//     let movies = await movieGenres.find({genreId:genreId}).populate('movieId')
//     console.log(movies);
//     return movies;
// } 
module.exports=movieGenreService