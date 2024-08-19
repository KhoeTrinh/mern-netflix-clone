import express from 'express';

const router = express.Router();

import {
    getTrendingMovie,
    getMovieTrailers,
    getMovieDetails,
    getSimilarMovies,
    getMovieByCategory,
} from '../controllers/movieControllers.js';

router.get('/trending', getTrendingMovie);
router.get('/:id/trailers', getMovieTrailers);
router.get('/:id/details', getMovieDetails);
router.get('/:id/similar', getSimilarMovies);
router.get('/:category', getMovieByCategory);

export default router;
