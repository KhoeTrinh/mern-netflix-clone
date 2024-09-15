const fetchToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    req.token = token;
    next();
};

export default fetchToken;
