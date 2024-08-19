import User from '../models/authModals.js';
import fetchFromTMDB from '../services/tmdb.js';

const searchPerson = async (req, res) => {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
        );
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: 'person',
                    createdAt: new Date(),
                },
            },
        });

        res.json({ success: true, content: response.results });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

const searchMovie = async (req, res) => {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        );

        if (response.results.length === 0) {
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: 'movie',
                    createdAt: new Date(),
                },
            },
        });

        res.json({ success: true, content: response.results });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

const searchTv = async (req, res) => {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
        );

        if (response.results.length === 0) {
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: 'tv',
                    createdAt: new Date(),
                },
            },
        });

        res.json({ success: true, content: response.results });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

const getSearchHistory = async (req, res) => {
    try {
        res.json({ success: true, content: req.user.searchHistory });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

const deleteItemFromSearchHistory = async (req, res) => {
    let { id } = req.params;
    id = parseInt(id)
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id },
            },
        });
        res.json({ success: true, message: 'Items removed from search history' });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

export {
    searchPerson,
    searchMovie,
    searchTv,
    getSearchHistory,
    deleteItemFromSearchHistory,
};
