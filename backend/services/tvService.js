import fetchFromTMDB from '../services/tmdb.js';

const tvTrendingService = async (res) => {
    try {
        const data = await fetchFromTMDB(
            'https://api.themoviedb.org/3/trending/tv/day?language=en-US'
        );
        const randomTv =
            data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({ success: true, content: randomTv });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const tvTrailersService = async (id, res) => {
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
        );
        res.json({ success: true, trailers: data.results });
    } catch (err) {
        if (err.message.includes('404')) {
            return res
                .status(404)
                .json({ success: false, message: 'Tv not found' });
        }
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const tvDetailsService = async (id, res) => {
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${id}?language=en-US`
        );
        res.status(200).json({ success: true, content: data });
    } catch (err) {
        if (err.message.includes('404')) {
            return res
                .status(404)
                .json({ success: false, message: 'Tv not found' });
        }
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const tvSimilarService = async (id, res) => {
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
        );
        res.json({ success: true, similar: data.results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const tvCategoryService = async (category, res) => {
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
        );
        res.json({ success: true, content: data.results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export {
    tvTrendingService,
    tvTrailersService,
    tvDetailsService,
    tvSimilarService,
    tvCategoryService,
};
