import fetchFromTMDB from '../services/tmdb.js';

const movieTrendingService = async (res) => {
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
}

const movieTrailersService = async (id, res) => {
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
}

const movieDetailsService = async (id, res) => {
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`
        );
        res.status(200).json({ success: true, content: data });
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

export { movieTrendingService, movieTrailersService, movieDetailsService };
