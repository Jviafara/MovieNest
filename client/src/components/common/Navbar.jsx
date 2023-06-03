import { DarkModeOutlined, WbSunnyOutlined } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Stack,
    Toolbar,
    useScrollTrigger,
} from '@mui/material';
import { cloneElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import menuConfigs from '../../configs/menu.config';
import { themeModes } from '../../configs/theme.configs';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setThemeMode } from '../../redux/features/themeModeSlice';
import Logo from './Logo';
import Sidebar from './Sidebar';
import UserMenu from './UserMenu';

const ScrollAppBar = ({ children, window }) => {
    const { themeMode } = useSelector((state) => state.themeMode);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 50,
        target: window ? window() : undefined,
    });

    return cloneElement(children, {
        sx: {
            color: trigger
                ? 'text.primary'
                : themeMode === themeModes.dark
                ? 'primary.contrastText'
                : 'text.primary',
            backgroundColor: trigger
                ? 'background.paper'
                : themeMode === themeModes.dark
                ? 'transparent'
                : 'background.paper',
        },
    });
};

const Navbar = () => {
    const { user } = useSelector((state) => state.user);
    const { themeMode } = useSelector((state) => state.themeMode);
    const { appState } = useSelector((state) => state.appState);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const dispatch = useDispatch();

    const onSwitchTheme = () => {
        const theme =
            themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
        dispatch(setThemeMode(theme));
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
            <ScrollAppBar>
                <AppBar elevation={0} sx={{ zIndex: 9999 }}>
                    <Toolbar
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Stack
                            direction={'row'}
                            spacing={1}
                            alignItems="center">
                            <IconButton
                                color="inherit"
                                sx={{
                                    mr: 2,
                                    display: { md: 'none' },
                                }}
                                onClick={toggleSidebar}>
                                <MenuIcon />
                            </IconButton>
                            <Box
                                sx={{
                                    display: { xs: 'inline-block', md: 'none' },
                                }}>
                                <Logo />
                            </Box>
                        </Stack>
                        {/* Main Menu */}
                        <Box
                            flexGrow={1}
                            alignItems={'center'}
                            display={{ xs: 'none', md: 'flex' }}>
                            <Box sx={{ marginRight: '30px' }}>
                                <Logo />
                            </Box>
                            {menuConfigs.main.map((item, index) => (
                                <Button
                                    key={index}
                                    sx={{
                                        color: appState.includes(item.state)
                                            ? 'primary.cotrastText'
                                            : 'inherit',

                                        mr: 2,
                                    }}
                                    component={Link}
                                    to={item.path}
                                    variant={
                                        appState.includes(item.state)
                                            ? 'contained'
                                            : 'text'
                                    }>
                                    {item.display}
                                </Button>
                            ))}
                            <IconButton
                                sx={{ color: 'inherit' }}
                                onClick={onSwitchTheme}>
                                {themeMode === themeModes.dark && (
                                    <DarkModeOutlined />
                                )}
                                {themeMode === themeModes.light && (
                                    <WbSunnyOutlined />
                                )}
                            </IconButton>
                        </Box>
                        {/* Main Menu */}

                        {/* User Menu */}
                        <Stack
                            spacing={3}
                            direction={'row'}
                            alignItems={'center'}>
                            {!user && (
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        dispatch(setAuthModalOpen(true))
                                    }>
                                    Sign In
                                </Button>
                            )}
                        </Stack>
                        {user && <UserMenu />}
                        {/* User Menu */}
                    </Toolbar>
                </AppBar>
            </ScrollAppBar>
        </>
    );
};

export default Navbar;
