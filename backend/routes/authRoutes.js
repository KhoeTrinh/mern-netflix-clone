import express from 'express';

const router = express.Router();

import { signup, login, logout, authCheck } from '../controllers/authControllers.js';
import protectRoute from '../middlewares/protectRoute.js'
import fetchToken from '../middlewares/fetchToken.js'

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/authCheck', fetchToken, protectRoute, authCheck);

export default router;
