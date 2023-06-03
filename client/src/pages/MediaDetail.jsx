import {
    Favorite,
    FavoriteBorderOutlined,
    PlayArrow,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircularRate from '../components/common/CircularRate';
import Container from '../components/common/Container';
import ImageHeader from '../components/common/ImageHeader';

import { useEffect, useRef, useState } from 'react';
import tmdbConfigs from '../api/config/tmdb.configs';
import favoriteApi from '../api/modules/favorite.api';
import mediaApi from '../api/modules/media.api';
import uiConfigs from '../configs/ui.configs';

import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import BackdropSlide from '../components/common/BackdropSlide';
import CastSlide from '../components/common/CastSlide';
import MediaReview from '../components/common/MediaReview';
import MediaSlide from '../components/common/MediaSlide';
import MediaVideosSlide from '../components/common/MediaVideosSlide';
import PostersSlide from '../components/common/PostersSlide';
import RecommendSlide from '../components/common/RecommendSlide';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { setGlobalLoading } from '../redux/features/globalLoadinSlice';
import { addFavorite, removeFavorite } from '../redux/features/userSlice';

const MediaDetail = () => {
    window.scrollTo(0, 0);
    const { mediaType, mediaId } = useParams();
    const { user, listFavorites } = useSelector((state) => state.user);

    const [media, setMedia] = useState();
    const [isFavorite, setIsFavorite] = useState(false);
    const [onRequest, setOnRequest] = useState(false);
    const [genres, setGenres] = useState([]);

    const dispatch = useDispatch();
    const videoRef = useRef(null);

    useEffect(() => {
        const getMedia = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await mediaApi.getDetail({
                mediaType,
                mediaId,
            });
            // console.log(response);
            dispatch(setGlobalLoading(false));
            if (response) {
                setMedia(response);
                setIsFavorite(response.isFavorite);
                setGenres(response.genres.splice(0, 2));
            }
            if (err) toast.error(err.message);
        };
        getMedia();
    }, [dispatch, mediaId, mediaType]);

    const onFavoriteClick = async () => {
        if (!user) return dispatch(setAuthModalOpen(true));
        if (isFavorite) {
            onRemoveFavorite();
            return;
        }

        setOnRequest(true);
        const body = {
            mediaId: media.id,
            mediaTitle: media.title || media.name,
            mediaType: mediaType,
            mediaPoster: media.poster_path,
            mediaRate: media.vote_average,
        };

        const { response, err } = await favoriteApi.add(body);

        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            dispatch(addFavorite(response));
            setIsFavorite(true);
            toast.success(`${mediaType} added to favorites`);
        }
    };

    const onRemoveFavorite = async () => {
        if (onRequest) return;
        setOnRequest(true);

        const favorite = listFavorites.find(
            (e) => e,
            mediaId.toString() === media.id.toString()
        );

        const { response, err } = await favoriteApi.remove({
            favoriteId: favorite.id,
        });
        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            dispatch(removeFavorite(response));
            setIsFavorite(false);
            toast.success(`${mediaType} remove from favorites`);
        }
    };

    return media ? (
        <>
            <ImageHeader
                imgPath={tmdbConfigs.backdropPath(
                    media.backdrop_path || media.poster_path
                )}
            />
            <Box
                sx={{
                    color: 'primary.ContrastText',
                    ...uiConfigs.style.mainContent,
                }}>
                {/* Media Content */}
                <Box
                    sx={{
                        marginTop: { xs: '-10rem', md: '-15rem', lg: '-20rem' },
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: { xs: 'center', md: 'flex-start' },
                            flexDirection: { md: 'row', xs: 'column' },
                        }}>
                        {/* Poster */}
                        <Box
                            sx={{
                                width: { xs: '70%', sm: '50%', md: '40%' },
                                marin: {
                                    xs: '0 auto 2rem',
                                    md: '0 2rem 0 0',
                                },
                            }}>
                            <Box
                                sx={{
                                    paddingTop: '140%',
                                    ...uiConfigs.style.backgroundImage(
                                        tmdbConfigs.posterPath(
                                            media.poster_path ||
                                                media.backdrop_path
                                        )
                                    ),
                                }}></Box>
                        </Box>
                        {/* Poster */}
                        {/* Media Info */}
                        <Box
                            sx={{
                                marginTop: { xs: '2rem', md: 0 },
                                width: { xs: '100%', md: '60%' },
                                color: 'text.primary',
                            }}>
                            <Stack spacing={5} paddingX="2rem">
                                {/* Title */}
                                <Typography
                                    variant="h4"
                                    fontSize={{
                                        xs: '2rem',
                                        md: '3rem',
                                        lg: '4rem',
                                    }}
                                    fontWeight="700"
                                    sx={{
                                        ...uiConfigs.style.typoLines(2, 'left'),
                                    }}>{`${media.title || media.name} - ${
                                    mediaType === tmdbConfigs.mediaType.movie
                                        ? media.release_date.split('-')[0]
                                        : media.first_air_date.split('-')[0]
                                }`}</Typography>
                                {/* Title */}

                                {/* Rate and Genres */}
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems={'center'}>
                                    {/*Rate */}
                                    <CircularRate
                                        value={
                                            media.vote_average ||
                                            media.mediaRate
                                        }
                                    />
                                    {/*Rate */}

                                    <Divider orientation="vertical" />
                                    {/* Genres */}
                                    {genres.map((genre, index) => (
                                        <Chip
                                            variant="filled"
                                            color="primary"
                                            key={index}
                                            label={genre.name}
                                        />
                                    ))}
                                    {/* Genres */}
                                </Stack>
                                {/* Rate and Genres */}
                                {/* overview */}
                                <Box
                                    sx={{
                                        marginTop: { xs: '2rem', md: 0 },
                                        color: 'text.primary',
                                    }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            ...uiConfigs.style.typoLines(10),
                                        }}>
                                        {media.overview}
                                    </Typography>
                                </Box>
                                {/* overview */}

                                {/* Buttons */}
                                <Stack direction="row" spacing={1}>
                                    <LoadingButton
                                        variant="text"
                                        sx={{
                                            width: 'max-content',
                                            '& .MuiButton-startIcon': {
                                                marginRight: '0',
                                            },
                                        }}
                                        size="large"
                                        startIcon={
                                            isFavorite ? (
                                                <Favorite />
                                            ) : (
                                                <FavoriteBorderOutlined />
                                            )
                                        }
                                        loadingPosition="start"
                                        loading={onRequest}
                                        onClick={onFavoriteClick}
                                    />
                                    <Button
                                        variant="contained"
                                        size="large"
                                        startIcon={<PlayArrow />}
                                        onClick={() =>
                                            videoRef.current.scrollIntoView()
                                        }
                                        sx={{ width: 'max-content' }}>
                                        watch now
                                    </Button>
                                </Stack>
                                {/* Buttons */}

                                {/* Cast */}
                                <Container header="Cast">
                                    <CastSlide casts={media.credits.cast} />
                                </Container>
                                {/* Cast */}
                            </Stack>
                        </Box>
                        {/* Media Info */}
                    </Box>
                </Box>
                {/* Media Content */}

                {/* Media Video */}
                <div ref={videoRef} style={{ paddingTop: '2rem' }}>
                    <Container header="Videos">
                        <MediaVideosSlide
                            videos={[...media.videos.results].splice(0, 5)}
                        />
                    </Container>
                </div>
                {/* Media Video */}

                {/* Media Backdrops */}
                {media.images.backdrops.length > 0 && (
                    <Container header={'backdrops'}>
                        <BackdropSlide backdrops={media.images.backdrops} />
                    </Container>
                )}
                {/* Media Backdrops */}

                {/* Media Posters */}
                {media.images.posters.length > 0 && (
                    <Container header={'posters'}>
                        <PostersSlide posters={media.images.posters} />
                    </Container>
                )}
                {/* Media Posters */}

                {/* Media Reviews */}
                <MediaReview
                    reviews={media.reviews}
                    media={media}
                    mediaType={mediaType}
                />
                {/* Media Reviews */}

                {/* Media Recommendations */}
                {media.recommend.results.length > 0 && (
                    <Container header={'recommendations'}>
                        <RecommendSlide
                            medias={media.recommend.results}
                            mediaType={mediaType}
                        />
                    </Container>
                )}
                {media.recommend.results.length === 0 && (
                    <MediaSlide
                        mediaType={mediaType}
                        mediaCategory={tmdbConfigs.mediaCategory.top_rated}
                    />
                )}
                {/* Media Recommendations */}
            </Box>
        </>
    ) : null;
};

export default MediaDetail;
