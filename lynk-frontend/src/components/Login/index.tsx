import CircularProgress from "@mui/material/CircularProgress"
import styles from "./index.module.css"
import theme from "../Theme/theme";
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ThemeProvider } from '@mui/material/styles';
import { actions } from "../../redux/modules"
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux";

const Login = () => {
    const dispatch = useAppDispatch();
    const [validEmailForm, setValidEmailForm] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sent, setSent] = useState(false);
    const [message, setMessage] = useState("");
    const emailRegexp = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9-.]+\\.[a-zA-Z0-9-.]+$");
    const navigate = useNavigate();

    const onChangeEmail = (value: string) =>{
        setEmail(value);
        setValidEmailForm(emailRegexp.test(value));
    }
    const onChangePassword = (value: string) => {
        setPassword(value);
    }

    const onLogin = () => {
        setSent(true);
        let payload = {
            email: email,
            password: password
        };
        dispatch(actions.user.userLogin(payload))
        .unwrap()
        .then((response) => {
            console.log(response)
            setSent(false);
            setMessage(response.message);
            if (response.account_type === 0) { 
                sessionStorage.setItem('accountType', 'wholesaler')
                sessionStorage.setItem('id', response.id)
                // navigate to wholesaler page if accountType is 0
                console.log('whole saler');
                navigate('/wholesalerhome');
            } else if (response.account_type === 1) { 
                sessionStorage.setItem('accountType', 'retailer')
                sessionStorage.setItem('id', response.id)
                // navigate to retailer page if accountType is 1
                console.log('retailer');
                navigate('/retailerhome');
            }
        })
        .catch(function(error) {
            setSent(false);
            console.log(error.message)
            setMessage(error.message);
        });
    }

    useEffect(() => {
        if (email.split("@").length > 1) {
            let domain = email.split("@")[1];
        }
        else {
            setValidEmailForm(false);
        }
    }, [email])

    useEffect(() => {
        const storedAccountType = sessionStorage.getItem('accountType');
        if (storedAccountType) {
            if (storedAccountType === 'wholesaler') {
                console.log('you have successfully stored account type')
                navigate('/wholesalerhome');
            } else if (storedAccountType === 'retailer') {
                navigate('/retailerhome')
            }
        }
    }, [])
    
    return (
        <div>
            <div className={styles.title}>
                Log in to your account
            </div>
            <div className={styles.container}>
                <div className={styles.textfield}>
                    <ThemeProvider theme={theme}>
                        {(validEmailForm || email.length === 0) ? 
                        <TextField onChange={(e) => onChangeEmail(e.currentTarget.value)} required fullWidth id="outlined-basic" label="Enter email" variant="outlined" />
                        : <TextField onChange={(e) => onChangeEmail(e.currentTarget.value)} required error fullWidth id="outlined-basic" label="Enter email" helperText="Please enter valid email form" variant="outlined" />
                        }
                    </ThemeProvider>
                </div>
                <div className={styles.passwordfield}>
                    <ThemeProvider theme={theme}>
                        <TextField onChange={(e) => onChangePassword(e.currentTarget.value)} required fullWidth id="outlined-basic" label="Password" type="password" variant="outlined" />
                    </ThemeProvider>
                </div>
                <div className={styles.Button}>
                    <ThemeProvider theme={theme}>
                        {(validEmailForm && password.length > 0 && !sent) ? 
                        <Button variant="contained" color="primary" size="medium" onClick={onLogin} fullWidth>Log in</Button>
                        :
                        <Button disabled variant="contained" color="primary" size="medium" fullWidth>Log in</Button>
                        }
                    </ThemeProvider>
                </div>
                <div className={styles.Button}>
                    <ThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" size="medium" onClick={() => navigate('/registeroption')} fullWidth>Register</Button>
                    </ThemeProvider>
                </div>
                <div className={styles.message}>
                    {message}
                </div>
            </div>
            {sent && 
                <div className={styles.progress}>
                    <ThemeProvider theme={theme}>
                        <CircularProgress size={60}/>
                    </ThemeProvider>
                </div>
            }
        </div>
    )
}

export default Login;