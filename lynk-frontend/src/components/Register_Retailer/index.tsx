import CircularProgress from '@mui/material/CircularProgress';
import styles from "./index.module.css"
import theme from '../Theme/theme'
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ThemeProvider } from '@mui/material/styles';
import { actions } from "../../redux/modules";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from '../../redux';

const RegisterRetailer = () => {
    const accountTypeList = ['wholesaler', 'retailer'];

    const dispatch = useAppDispatch();
    const [companyName, setCompanyName] = useState("");
    const [validEmailForm, setValidEmailForm] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMatches, setPasswordMatches] = useState(false);
    const [sent, setSent] = useState(false);
    const [message, setMessage] = useState("");
    const [accountType, setAccountType] = useState<number>(0);
    const emailRegexp = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9-.]*");
    const navigate = useNavigate();

    const onChangeName = (value: string) =>{
        setCompanyName(value);
    }
    const onChangeEmail = (value: string) =>{
        setEmail(value);
        setValidEmailForm(emailRegexp.test(value));
        //안되면 여기 다시 //넣어
        //emailRegexp.test(value) ? setValidEmailForm(true) : setValidEmailForm(false);
    }
    const onChangePassword = (value:string) => {
        setPassword(value);
    }

    const onChangeRetypePassword = (value:string) => {
        setPasswordMatches(password === value);
    }

    // const onChangeAccountType = (value: string) => {
    //     const index = accountTypeList.indexOf(value);
    //     // setAccountType(index === -1 ? 0 : index);
    //   }

    const onRegister = () => {
        setSent(true);
        let payload = {
            company_name: companyName,
            email: email,
            password: password,
            account_type: 1
        };
        //console.log(payload);
        dispatch(actions.user.userRegister(payload))
        .unwrap()
        .then((response) => {
            setMessage(response);
            console.log(response.message);
        })
        .catch(function(error) {
            console.log(error.message)
            setMessage(error);
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

    return (
        <div>
            <div className={styles.title}>
                Hello Retailer, sign up to link with other companies
            </div>
            <div className={styles.container}>
                <div className={styles.textfield}>
                    <ThemeProvider theme={theme}>
                        <TextField onChange={(e) => onChangeName(e.currentTarget.value)} required fullWidth id="outlined-basic" label="Company Name" variant="outlined" />
                    </ThemeProvider>                    
                </div>
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
                <div className={styles.retypepasswordfield}>
                    <ThemeProvider theme={theme}>
                        {((password.length > 0 && passwordMatches) || password.length === 0) ?
                        <TextField onChange={(e) => onChangeRetypePassword(e.currentTarget.value)} required fullWidth id="outlined-basic" label="Retype password" type="password" variant="outlined" />
                        :
                        <TextField onChange={(e) => onChangeRetypePassword(e.currentTarget.value)} required error fullWidth id="outlined-basic" label="Retype password" helperText="Password does not match" type="password" variant="outlined" />
                        }
                    </ThemeProvider>
                </div>
                {/* <div className={styles.accountfield}>
                    <Typography variant = "button" gutterBottom>
                        Select Account Type:
                    </Typography>
                    <Select
                        value = {accountTypeList[accountType]}
                        onChange={(e) => onChangeAccountType(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value = "wholesaler">WholeSaler</MenuItem>
                        <MenuItem value = "retailer">Retailer</MenuItem>
                    </Select>
                </div> */}
                <div className={styles.Button}>
                    <ThemeProvider theme={theme}>
                        {(validEmailForm && password.length > 0 && passwordMatches &&!sent) ? 
                        <Button variant="contained" color="primary" size="medium" onClick={onRegister} fullWidth>Sign up</Button>
                        :
                        <Button disabled variant="contained" color="primary" size="medium" fullWidth>Sign up</Button>
                        }
                    </ThemeProvider>
                <div className={styles.Button}>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" size="medium" onClick={() => navigate("/")} fullWidth>go to Log In</Button>
                    </ThemeProvider>
                </div>
                </div>
            </div>
        </div>
    )
}
//       <label>
//         If you already have an account,
//         <button onClick={() => navigate("/")}>Login</button>
//       </label> 
export default RegisterRetailer