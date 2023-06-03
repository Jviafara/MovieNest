import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '../../api/config/tmdb.configs';
import NavigationSwiper from './NavigationSwiper';

const MediaVideo = ({ video }) => {
    const iFrameRef = useRef();

    useEffect(() => {
        const height = (iFrameRef.current.offsetWidth * 9) / 16 + 'px';
        iFrameRef.current.setAttribute('height', height);
    }, []);

    return (
        <Box sx={{ height: 'max-content' }}>
            <iframe
                key={video.key}
                src={tmdbConfigs.youtubePath(video.key)}
                ref={iFrameRef}
                width="100%"
                title={video.id}
                style={{ border: 0 }}></iframe>
        </Box>
    );
};

const MediaVideosSlide = ({ videos }) => {
    return (
        <NavigationSwiper>
            {videos.map((video, index) => (
                <SwiperSlide key={index}>
                    <MediaVideo video={video} />
                </SwiperSlide>
            ))}
        </NavigationSwiper>
    );
};

export default MediaVideosSlide;
