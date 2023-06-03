import { Box, Stack, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import tmdbConfigs from '../api/config/tmdb.configs';
import personApi from '../api/modules/person.api';
import Container from '../components/common/Container';
import PersonMediaGrid from '../components/common/PersonMediaGrid';
import uiConfigs from '../configs/ui.configs';
import { setGlobalLoading } from '../redux/features/globalLoadinSlice';

const PersonDetail = () => {
    const { personId } = useParams();
    const [person, setPerson] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        const getPerson = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await personApi.getDetail({ personId });
            dispatch(setGlobalLoading(false));

            if (err) toast.error(err.message);
            if (response) setPerson(response);
            console.log(response);
        };
        getPerson();
    }, [personId, dispatch]);

    return (
        <>
            <Toolbar />
            {person && (
                <Box sx={{ ...uiConfigs.style.mainContent }}>
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                        }}>
                        <Box
                            sx={{
                                width: { sx: '50%', md: '20%' },
                            }}>
                            <Box
                                sx={{
                                    paddingTop: '160%',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundColor: 'darkgray',
                                    backgroundImage: `url(${tmdbConfigs.posterPath(
                                        person.profile_path
                                    )})`,
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                width: { xs: '100%', md: '80%' },
                                padding: {
                                    xs: '1rem 0',
                                    md: '1rem 2rem',
                                },
                            }}>
                            <Stack spacing={2}>
                                <Typography variant="h5" fontWeight="700">
                                    {`${person.name} (${
                                        person.birthday.split('-')[0]
                                    }`}
                                    {person.deathday &&
                                        ` - ${person.deathday.split('-')[0]}`}
                                    {')'}
                                </Typography>
                                <Typography
                                    sx={{
                                        ...uiConfigs.style.typoLines(10),
                                    }}>
                                    {person.biography}
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                    <Container header="media">
                        <PersonMediaGrid personId={personId} />
                    </Container>
                </Box>
            )}
        </>
    );
};

export default PersonDetail;
