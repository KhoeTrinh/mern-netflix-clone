const fetchToken = (req, res, next) => {
    // const { token } = req.body;
    console.log(req);
    req.token = token;
    next();
};

export default fetchToken;
