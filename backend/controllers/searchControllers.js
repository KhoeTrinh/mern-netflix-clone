import {
    searchPersonService,
    searchMovieService,
    searchTvService,
    getSearchHistoryService,
    deleteItemFromSearchHistoryService,
} from '../services/searchService.js';

const searchPerson = async (req, res) => {
    const { query } = req.params;
    searchPersonService(query, req, res);
};

const searchMovie = async (req, res) => {
    const { query } = req.params;
    searchMovieService(query, req, res);
};

const searchTv = async (req, res) => {
    const { query } = req.params;
    searchTvService(query, req, res);
};

const getSearchHistory = async (req, res) => {
    getSearchHistoryService(req, res);
};

const deleteItemFromSearchHistory = async (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    deleteItemFromSearchHistoryService(id, req, res);
};

export {
    searchPerson,
    searchMovie,
    searchTv,
    getSearchHistory,
    deleteItemFromSearchHistory,
};
