import {
    authSigupService,
    authSigninService,
    authLogoutService,
    authCheckService,
} from '../services/authService.js';

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const resData = await authSigupService(username, email, password);
    console.log(resData);
    res.status(resData.status).json(resData.json);
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const resData = await authSigninService(email, password);
    res.status(resData.status).json(resData.json);
};

const logout = async (res) => {
    const resData = await authLogoutService(res);
    res.status(resData.status).json(resData.json);
};

const authCheck = async (req, res) => {
    const resData = await authCheckService(req);
    res.status(resData.status).json(resData.json);
};

export { signup, login, logout, authCheck };
