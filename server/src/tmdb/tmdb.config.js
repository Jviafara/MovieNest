const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const getUrl = (endpoint, params) => {
    const qs = new URLSearchParams(params);
    const url = `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
    return url;
};

export default { getUrl };
