import {
    movieTrendingService,
    movieDetailsService,
    movieTrailersService,
    movieSimilarService,
    movieCategoryService,
} from '../services/movieService.js';

const getTrendingMovie = async (req, res) => {
    movieTrendingService(res);
};

const getMovieTrailers = async (req, res) => {
    const { id } = req.params;
    movieTrailersService(id, res);
};

const getMovieDetails = async (req, res) => {
    const { id } = req.params;
    movieDetailsService(id, res);
};

const getSimilarMovies = async (req, res) => {
    const { id } = req.params;
    movieSimilarService(id, res);
};

const getMovieByCategory = async (req, res) => {
    const { category } = req.params;
    movieCategoryService(category, res);
};

export {
    getTrendingMovie,
    getMovieTrailers,
    getMovieDetails,
    getSimilarMovies,
    getMovieByCategory,
};
