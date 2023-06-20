import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SearchIcon from '@mui/icons-material/Search';
import theme from "../Theme/theme"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { useState } from 'react';

const SearchBar = () => {
    const [searchString, setSearchString] = useState("");

    const onChangeSearchString = (value:string) => {
        setSearchString(searchString);
    }

    return (
        <ThemeProvider theme={theme}>
            <TextField
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <SearchIcon />
                </InputAdornment>
            ),
            endAdornment: (
                <InputAdornment position="end">
                <IconButton>
                    <HighlightOffOutlinedIcon/>
                </IconButton>
                </InputAdornment>
            )
            }}
            variant="outlined"
            placeholder="Search for posts"
            onChange={(e) => onChangeSearchString(e.currentTarget.value)}
        />
        </ThemeProvider>
    )
}

export default SearchBar