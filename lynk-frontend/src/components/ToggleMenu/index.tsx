import * as React from 'react';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Tooltip from '@mui/material/Tooltip';
import theme from "../Theme/theme";
import { IconButton } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { actions } from '../../redux/modules';
import { useAppDispatch } from '../../redux';
import { useNavigate } from 'react-router-dom';


type Anchor = 'top' | 'left' | 'bottom' | 'right';

const ToggleMenu = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
        };
    
    // Define behavior when clicking on each button
    const onClickLogout = () => {
        window.sessionStorage.removeItem('id');
        window.sessionStorage.removeItem('userEmail');
        window.sessionStorage.removeItem('userCreatedAt');
        window.location.reload();
    }

    let text_array: string[] = ['Settings', 'Saved', 'My activity', 'Report a problem', 'Log out'];
    let icons_array: Array<any> = [<SettingsOutlinedIcon></SettingsOutlinedIcon>,
                                   <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>,
                                   <RestoreOutlinedIcon></RestoreOutlinedIcon>,
                                   <ErrorOutlineOutlinedIcon></ErrorOutlineOutlinedIcon>,
                                   <LogoutOutlinedIcon></LogoutOutlinedIcon>];
    let onClick_array: Array<any> = [null, null, null, null, onClickLogout]

    const list = (anchor: Anchor) => (
        <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        >
        <List>
            {text_array.map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton onClick={onClick_array[index]}>
                <ListItemIcon>
                    {icons_array[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        </Box>
    );

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Tooltip title="Menu">
                    <IconButton color='primary' onClick={toggleDrawer('right', true)}>
                        <MenuIcon fontSize="large"></MenuIcon>
                    </IconButton>
                </Tooltip>
                <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
                >
                {list('right')}
                </Drawer>
            </ThemeProvider>
        </div>
    )
}

export default ToggleMenu;