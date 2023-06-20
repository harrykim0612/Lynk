import ToggleMenu from '../ToggleMenu';
import Tooltip from '@mui/material/Tooltip';
import styles from "./index.module.css"
import theme from "../Theme/theme";
import { AccountCircleOutlined } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState} from "react";

const Header = () => {
    const navigate = useNavigate();
    const [company_name, setCompanyName] = useState("");

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <ThemeProvider theme={theme}>
                    <Button>
                        <Typography onClick={() => navigate("/wholesalerhome")}>Lynk</Typography>
                    </Button>
                </ThemeProvider>
            </div>
            <div className={styles.company_name}>
                Welcome to your Homepage company_name
            </div>
            <ThemeProvider theme={theme}>
                <div className={styles.menuicon}>
                    <ToggleMenu></ToggleMenu>
                </div>
                <div className={styles.accounticon}>
                    <Tooltip title="Account">
                        <IconButton color='primary'>
                            <AccountCircleOutlined fontSize="large"></AccountCircleOutlined>
                        </IconButton>
                    </Tooltip>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default Header