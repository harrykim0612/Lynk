import BentoOutlinedIcon from '@mui/icons-material/BentoOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import styles from "./index.module.css"
import theme from "../Theme/theme";
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    // Define behavior shen clicking on each button
    const onClickWholeSalerFinder = () => {
        navigate("/Find Wholesaler");
    }

    let text_array_1: string [] = ['Retailer Finer', 'WholeSaler Finder'];
    let icons_array_1: Array<any> = [<MessageOutlinedIcon></MessageOutlinedIcon>,
                                     <GroupOutlinedIcon></GroupOutlinedIcon>,
                                     <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>,
                                     <BentoOutlinedIcon></BentoOutlinedIcon>];
    let onClick_array_1: Array<any> = [null, onClickWholeSalerFinder]

    return (
        <div className={styles.container}>
            <ThemeProvider theme={theme}>
                <List>
                    {text_array_1.map((text, index) => (
                    <ListItem key = {text} disablePadding>
                        <ListItemButton onClick={onClick_array_1[index]}>
                        <ListItemIcon>
                            {icons_array_1[index]}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
            </ThemeProvider>
        </div>

    )
}
export default Sidebar