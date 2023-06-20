import CircularProgress from '@mui/material/CircularProgress';
import styles from "./index.module.css"
import theme from '../Theme/theme'
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ThemeProvider } from '@mui/material/styles';
import { actions } from "../../redux/modules";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from '../../redux';

const RegisterOption = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <div className={styles.title}>
                Who are you?
            </div>
            <div className={styles.Button}>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" size="medium" onClick={() => navigate('/register_wholesaler')} fullWidth> I am WholeSaler</Button>
                </ThemeProvider>
            </div>
            <div className={styles.Button}>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" size="medium" onClick={() => navigate('/register_retailer')} fullWidth> I am Retailer</Button>
                </ThemeProvider>
            </div>
        </div>
    )
}
//       <label>
//         If you already have an account,
//         <button onClick={() => navigate("/")}>Login</button>
//       </label> 
export default RegisterOption