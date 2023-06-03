const mediaType = {
    movie: 'movie',
    tv: 'tv',
};

const mediaCategory = {
    popular: 'popular',
    top_rated: 'top_rated',
};

const backdropPath = (imgEndpoitn) =>
    `https://image.tmdb.org/t/p/original${imgEndpoitn}`;

const posterPath = (imgEndpoitn) =>
    `https://image.tmdb.org/t/p/w500${imgEndpoitn}`;

const youtubePath = (videoId) =>
    `https://youtube.com/embed/${videoId}?controls=0`;

const tmdbConfigs = {
    mediaType,
    mediaCategory,
    backdropPath,
    posterPath,
    youtubePath,
};

export default tmdbConfigs;
