import responseHandler from '../handlers/response.handler.js';
import tokenMiddlewre from '../middlewares/token.middleware.js';
import favoriteModel from '../models/favorite.model.js';
import reviewModel from '../models/review.model.js';
import userModel from '../models/user.model.js';
import tmdbApi from '../tmdb/tmdb.api.js';

const getList = async (req, res) => {
    try {
        const { page } = req.query;
        const { mediaType, mediaCategory, mediaId } = req.params;

        const response = await tmdbApi.mediaList({
            mediaType,
            mediaCategory,
            page,
        });

        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};

const getGenres = async (req, res) => {
    try {
        const { mediaType } = req.params;

        const response = await tmdbApi.mediaGenres({ mediaType });

        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};

const search = async (req, res) => {
    try {
        const { mediaType } = req.params;
        const { query, page } = req.query;

        const response = await tmdbApi.mediaSearch({
            query,
            page,
            mediaType: mediaType === 'people' ? 'person' : mediaType,
        });

        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};

const getDetail = async (req, res) => {
    try {
        const { mediaType, mediaId } = req.params;

        const params = { mediaType, mediaId };

        const media = await tmdbApi.mediaDetail(params);

        media.credits = await tmdbApi.mediaCredits(params);

        media.videos = await tmdbApi.mediaVideos(params);

        media.recommend = await tmdbApi.mediaRecommended(params);

        media.images = await tmdbApi.mediaImages(params);

        const tokenDecoded = tokenMiddlewre.tokenDecode(req);

        if (tokenDecoded) {
            const user = await userModel.findById(tokenDecoded.data);
            if (user) {
                const isFavorite = await favoriteModel.findOne({
                    user: user.id,
                    mediaId,
                });
                media.isFavorite = isFavorite !== null;
            }
        }

        media.reviews = await reviewModel
            .find({ mediaId })
            .populate('user')
            .sort('-createdAt');

        return responseHandler.ok(res, media);
    } catch {
        responseHandler.error(res);
    }
};

export default { getList, getDetail, getGenres, search };
