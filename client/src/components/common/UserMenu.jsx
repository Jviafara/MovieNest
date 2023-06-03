import { LogoutOutlined } from '@mui/icons-material';
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import menuConfigs from '../../configs/menu.config';
import { setUser } from '../../redux/features/userSlice';

const UserMenu = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const togglemenu = (e) => setAnchorEl(e.currentTarget);

    return (
        <>
            {user && (
                <>
                    <Typography
                        variant="h6"
                        sx={{ cursor: 'pointer', userSelect: 'none' }}
                        onClick={togglemenu}>
                        {user.displayName}
                    </Typography>
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        PaperProps={{ sx: { padding: 0 } }}>
                        {menuConfigs.user.map((item, index) => (
                            <ListItemButton
                                key={index}
                                component={Link}
                                to={item.path}
                                onClick={() => setAnchorEl(null)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography textTransform="uppercase">
                                            {item.display}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        ))}
                        <ListItemButton
                            sx={{ borderRadius: '10x' }}
                            onClick={() => dispatch(setUser(null))}>
                            <ListItemIcon>
                                <LogoutOutlined />
                            </ListItemIcon>
                            <ListItemText>SIGN OUT</ListItemText>
                        </ListItemButton>
                    </Menu>
                </>
            )}
        </>
    );
};

export default UserMenu;
