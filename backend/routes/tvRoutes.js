import express from 'express';

const router = express.Router();

import {
    getTrendingTv,
    getTvTrailers,
    getTvDetails,
    getSimilarTvs,
    getTvByCategory,
} from '../controllers/tvControllers.js';

router.get('/trending', getTrendingTv);
router.get('/:id/trailers', getTvTrailers);
router.get('/:id/details', getTvDetails);
router.get('/:id/similar', getSimilarTvs);
router.get('/:category', getTvByCategory);

export default router;
