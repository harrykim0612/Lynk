import React, { useState } from "react";
import Header from "../Wholesaler_Header";
import Sidebar from "../WholesalerSidebar";
import styles from "./index.module.css";
import theme from "../Theme/theme";
import { ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TextField } from "@mui/material"
import { Paper, List, ListItem, Divider } from '@mui/material';

const Profile = () => {
    const [username, setUsername] = useState<string>("Bloombergbobalover");
    const [creation, setCreation] = useState<string>("2/11/2023");
    const [expiration, setExpiration] = useState<string>("5/30/2024");
    const [password, setPassword] = useState<string>("*******");
    const [editModeUsername, setEditModeUsername] = useState<boolean>(false);
    const [editModePassword, setEditModePassword] = useState<boolean>(false);
    const [prevUsername, setPrevUsername] = useState<string>(username);
    const [prevPassword, setPrevPassword] = useState<string>(password);

    const toggleEditModeUsername = () => {
        setEditModeUsername(!editModeUsername);
    };

    const toggleEditModePassword = () => {
        setEditModePassword(!editModePassword);
    };

    const saveChangesUsername = () => {
        setEditModeUsername(false);
        setPrevUsername(username);
        
    };

    const saveChangesPassword = () => {
        setEditModePassword(false);
        setPrevPassword(password);
    };

    const cancelEditUsername = () => {
        setUsername(prevUsername);
        setEditModeUsername(false);
    };

    const cancelEditPassword = () => {
        setPassword(prevPassword);
        setEditModePassword(false);
    };

    const handleDeleteAccount = () => {

    };


    return (
        <div>
            <Header></Header>
            <Sidebar></Sidebar>
            
                <div className={styles.container}>
                    <ThemeProvider theme={theme}>
                        <div className={styles.title}>
                            My Profile

                            <div className={styles.header}>
                                {!editModeUsername ? (
                                    <>
                                        <h4>Username: {username}</h4>
                                        <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                        <EditIcon className={styles.icon} onClick={toggleEditModeUsername} />
                                        </div>
                                    </>
                                ) : (
                                    <div className={styles.textfield}>
                                        <h4>Username: </h4>
                                        <TextField value={username} onChange={(e) => setUsername(e.target.value)} />
                                        
                                        <Button onClick={saveChangesUsername}>Save</Button>
                                        <Button onClick={cancelEditUsername}>Cancel</Button>
                                      
                                    </div>
                                )}
                                <Divider />
                                {!editModePassword ? (
                                    <>
                                        <h4>Password: {password}</h4>
                                        <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                        <EditIcon className={styles.icon} onClick={toggleEditModePassword} />
                                        </div>

                                    </>
                                ) : (
                                    <div className={styles.textfield}>
                                        <h4>Password: </h4>
                                        <TextField value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <Button onClick={saveChangesPassword}>Save</Button>
                                        <Button onClick={cancelEditPassword}>Cancel</Button>
                                    </div>
                                )}
                                <Divider />
                                <h4>Account Creation: {creation}</h4>
                                <Divider />
                                <h4>Account Expiration: {expiration}</h4>
                                <Button variant="contained" color="primary" onClick={handleDeleteAccount}>
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </ThemeProvider>    
                </div>
        </div>
    )
};

export default Profile;