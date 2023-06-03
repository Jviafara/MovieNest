import { Box, useTheme } from '@mui/material';
import uiConfigs from '../../configs/ui.configs';

const ImageHeader = ({ imgPath }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                zIndex: '-1',
                position: 'relative',
                paddingTop: { xs: '60%', sm: '40%', md: '35%' },
                backgroundPosition: 'top',
                backgroundSize: 'cover',
                backgroundImage: `url(${imgPath})`,
                backgroundAttachment: 'fixed',
                '&::before': {
                    content: '""',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    pointerEvents: 'none',
                    ...uiConfigs.style.gradientBgImage[theme.palette.mode],
                },
            }}></Box>
    );
};

export default ImageHeader;
