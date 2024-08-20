import {
    tvTrendingService,
    tvTrailersService,
    tvDetailsService,
    tvSimilarService,
    tvCategoryService,
} from '../services/tvService.js';

const getTrendingTv = async (req, res) => {
    tvTrendingService(res);
};

const getTvTrailers = async (req, res) => {
    const { id } = req.params;
    tvTrailersService(id, res);
};

const getTvDetails = async (req, res) => {
    const { id } = req.params;
    tvDetailsService(id, res)
};

const getSimilarTvs = async (req, res) => {
    const { id } = req.params;
    tvSimilarService(id, res)
};

const getTvByCategory = async (req, res) => {
    const { category } = req.params;
    tvCategoryService(category, res)
};

export {
    getTrendingTv,
    getTvTrailers,
    getTvDetails,
    getSimilarTvs,
    getTvByCategory,
};
