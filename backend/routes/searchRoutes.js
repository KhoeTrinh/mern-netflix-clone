import express from 'express';

const router = express.Router();

import {
    searchPerson,
    searchMovie,
    searchTv,
    getSearchHistory,
    deleteItemFromSearchHistory,
} from '../controllers/searchControllers.js';

router.get('/person/:query', searchPerson);
router.get('/movie/:query', searchMovie);
router.get('/tv/:query', searchTv);

router.get('/history', getSearchHistory);
router.delete('/history/:id', deleteItemFromSearchHistory);

export default router;
