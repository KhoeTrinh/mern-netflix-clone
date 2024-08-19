import fetchFromTMDB from '../services/tmdb.js';

const getTrendingTv = async (req, res) => {
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

const getTvTrailers = async (req, res) => {
    const { id } = req.params;
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

const getTvDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${id}?language=en-US`
        );
        res.json({ success: true, content: data });
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

const getSimilarTvs = async (req, res) => {
    const { id } = req.params;
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

const getTvByCategory = async (req, res) => {
    const { category } = req.params;
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
    getTrendingTv,
    getTvTrailers,
    getTvDetails,
    getSimilarTvs,
    getTvByCategory,
};
