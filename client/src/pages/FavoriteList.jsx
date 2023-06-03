import { FilterDrama } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import favoriteApi from '../api/modules/favorite.api';
import Container from '../components/common/Container';
import MediaItem from '../components/common/MediaItem';
import uiConfigs from '../configs/ui.configs';
import { setGlobalLoading } from '../redux/features/globalLoadinSlice';
import { removeFavorite } from '../redux/features/userSlice';

const FaovirteItem = ({ media, onRemoved }) => {
    const dispatch = useDispatch();

    const [onRequest, setOnRequest] = useState(false);

    const onRemove = async () => {
        if (onRequest) return;
        setOnRequest(true);
        const { response, err } = await favoriteApi.remove({
            favoriteId: media.id,
        });
        setOnRequest(false);
        if (err) toast.error(err.message);
        if (response) {
            toast.success('Removed Succesfully');
            dispatch(removeFavorite({ mediaId: media.mediaId }));
            onRemoved(media.id);
        }
    };

    return (
        <>
            <MediaItem media={media} mediaType={media.mediaType} />
            <LoadingButton
                fullWidth
                variant="contained"
                startIcon={<DeleteIcon />}
                loadingPosition="start"
                loading={onRequest}
                onClick={onRemove}
                sx={{ marginTop: 2 }}>
                Remove
            </LoadingButton>
        </>
    );
};

const FavoriteList = () => {
    const [medias, setMedias] = useState([]);
    const [filteredMedias, setFilteredMedias] = useState([]);
    const [page, setpage] = useState(1);
    const [count, setCount] = useState(0);

    const dispatch = useDispatch();

    const skip = 8;

    useEffect(() => {
        const getFavorites = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await favoriteApi.getList();
            dispatch(setGlobalLoading(false));

            if (err) toast.error(err.message);
            if (response) {
                setCount(response.length);
                setMedias([...response]);
                setFilteredMedias([...response].splice(0, skip));
            }
        };
        getFavorites();
    }, [dispatch]);

    const onLoadMore = () => {
        setFilteredMedias(
            [...filteredMedias],
            ...[...medias].splice(page * skip, skip)
        );
        setpage(page + 1);
    };

    const onRemoved = (id) => {
        const newMedias = [...medias].filter((e) => e.id !== id);
        setMedias(newMedias);
        setFilteredMedias([...newMedias].splice(0, page * skip));
        setCount(count - 1);
    };

    return (
        <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Container header={`Your Favorites (${count})`}>
                <Grid
                    container
                    spacing={1}
                    sx={{ marginRight: '-8px!important' }}>
                    {filteredMedias.map((media, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                            <FaovirteItem media={media} onRemoved={onRemoved} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {filteredMedias.length < medias.length && (
                <Button sx={{ marginTop: 2 }} onClick={onLoadMore}>
                    load more
                </Button>
            )}
        </Box>
    );
};

export default FavoriteList;
