import {
    authSigupService,
    authSigninService,
    authLogoutService,
} from '../services/authService.js';

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    authSigupService(username, email, password, res);
};

const login = async (req, res) => {
    const { email, password } = req.body;
    authSigninService(email, password, res);
};

const logout = async (req, res) => {
    authLogoutService(res);
};

export { signup, login, logout };
