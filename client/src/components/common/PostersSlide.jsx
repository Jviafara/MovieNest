import { Box } from '@mui/material';
import React from 'react';
import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '../../api/config/tmdb.configs';
import AutoSwiper from './AutoSwiper';

const PostersSlide = ({ posters }) => {
    return (
        <AutoSwiper>
            {posters.splice(0, 10).map((item, index) => (
                <SwiperSlide key={index}>
                    <Box
                        sx={{
                            paddingTop: '160%',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundImage: `url(${tmdbConfigs.posterPath(
                                item.file_path
                            )})`,
                        }}
                    />
                </SwiperSlide>
            ))}
        </AutoSwiper>
    );
};

export default PostersSlide;
