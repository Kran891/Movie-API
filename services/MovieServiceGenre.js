const movieGenres = require("../models/MovieGenre");
const genreServices = require("./GenreService");

var movieServcieGenres;
movieServcieGenres.addMovieGenres = async (movieId, genrenames) => {
    let genre;
    genrenames.forEach(async element => {
        let genre = await genreServices.findGenreByName(element)
        if (!genre) {
            genre = await genreServices.addGenre(element)
        }
        movieServcieGenres.addMovieGenre(id, genre)

    });
}
movieServcieGenres.addMovieGenre = async (movieId, genreId) => {
    return await (await movieGenres.create({ movieId: movieId, genreId: genreId }))._id
}