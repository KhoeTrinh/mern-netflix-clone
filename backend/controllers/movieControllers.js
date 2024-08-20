import { movieTrendingService, movieDetailsService, movieTrailersService } from '../services/movieService.js';

const getTrendingMovie = async (req, res) => {
    movieTrendingService(res)
};

const getMovieTrailers = async (req, res) => {
    const { id } = req.params;
    movieTrailersService(id, res)
};

const getMovieDetails = async (req, res) => {
    const { id } = req.params;
    movieDetailsService(id, res);
};

const getSimilarMovies = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
        );
        res.json({ success: true, similar: data.results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getMovieByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
        );
        res.json({ success: true, content: data.results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export {
    getTrendingMovie,
    getMovieTrailers,
    getMovieDetails,
    getSimilarMovies,
    getMovieByCategory,
};
