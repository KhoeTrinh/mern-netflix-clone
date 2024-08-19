import axios from 'axios';
import ENV_VARS from '../configs/envVars.js';

const fetchFromTMDB = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY,
        },
    };

    const res = await axios.get(url, options);

    if (res.status !== 200) {
        throw new Error(`Error fetching data from TMDB: ${res.status}`);
    }

    return res.data;
};

export default fetchFromTMDB;
