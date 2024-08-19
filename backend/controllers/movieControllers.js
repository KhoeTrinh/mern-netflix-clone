import fetchFromTMDB from '../services/tmdb.js';

const getTrendingMovie = async (req, res) => {
    try {
        const data = await fetchFromTMDB(
            'https://api.themoviedb.org/3/trending/movie/day?language=en-US'
        );
        const randomMovie =
            data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({ success: true, content: randomMovie });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getMovieTrailers = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
        );
        res.json({ success: true, trailers: data.results });
    } catch (err) {
        if (err.message.includes('404')) {
            return res
                .status(404)
                .json({ success: false, message: 'Movie not found' });
        }
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getMovieDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`
        );
        res.json({ success: true, content: data });
    } catch (err) {
        if (err.message.includes('404')) {
            return res
                .status(404)
                .json({ success: false, message: 'Movie not found' });
        }
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
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

const getByCategory = async (req, res) => {
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
    getByCategory,
};
