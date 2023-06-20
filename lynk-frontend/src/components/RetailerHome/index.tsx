// import Header from "../Retailer_Header";
// // import PostList from "../PostList";
// import Redirect from "../Redirect";
// import SearchBar from "../SearchBar";
// import Sidebar from "../WholesalerSidebar";
// import theme from "../Theme/theme";
// import styles from "./index.module.css"
// import { Autocomplete, Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
// import { useState } from "react";
// import SwapVertIcon from '@mui/icons-material/SwapVert';

// const RetailerHome = () => {
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const sortedOptionList = ['Trending', 'Most liked', 'Newest'];
//     const [sortedOption, setSortedOption] = useState('Trending');

//     const handleChange = (event: SelectChangeEvent) => {
//         setSortedOption(event.target.value as string);
//     };
    
//     return (
//         <ThemeProvider theme={theme}>
//             <Redirect></Redirect>
//             <Header></Header>
//             <Sidebar></Sidebar>
//             <Box
//                 sx={{
//                     position: "absolute",
//                     width: "calc(100vw - var(--sidebar_width) - 50px)",
//                     minHeight: "calc(100vh - var(--header_height) - 20px)",
//                     left: "var(--sidebar_width)",
//                     top: "calc(var(--header_height))",
//                     display: "flex",
//                     flexDirection: "column",
//                 }}
//             >
//                 <SearchBar></SearchBar>
//                 <Box sx={{
//                     display:'flex',
//                     flexDirection:'row',
//                     justifyContent: "space-between"
//                 }}>
//                     <Typography sx={{
//                         fontSize: 25,
//                         fontWeight: "bold",
//                         m: 2,
//                         color: "#7A7067"
//                     }}>All Posts</Typography>
//                     <Box sx={{
//                         display:'flex',
//                         flexDirection:'row',
//                         alignItems: 'center'
//                     }}>
//                         <SwapVertIcon fontSize="small" color="primary"/>
//                         <div className={styles.formcontrol}>
//                             <FormControl fullWidth>
//                             <Select
//                                 labelId="select-label"
//                                 id="select"
//                                 value={sortedOption}
//                                 displayEmpty
//                                 onChange={handleChange}
//                                 IconComponent={() => (null)}
//                             >
//                                 <MenuItem value={"Trending"}>Trending</MenuItem>
//                                 <MenuItem value={"Most liked"}>Most liked</MenuItem>
//                                 <MenuItem value={"Newest"}>Newest</MenuItem>
//                             </Select>
//                             </FormControl>
//                         </div>
//                     </Box>
//                 </Box>
//                 <Divider sx={{
//                     mb: 2,
//                     mx: 1
//                 }}/>
//                 {/* <Stack spacing={1}>
//                     <PostList groupId="-1"></PostList>
//                 </Stack> */}
//             </Box>
//         </ThemeProvider>
//     )
// }

// export default RetailerHome

import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "../Theme/theme";
import Header from "../Retailer_Header";
import RetailerSidebar from "../RetailerSidebar";
import SearchBar from "../SearchBar";

const RetailerHome = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");

    const onLogin = () => {
        console.log('Login button pressed');
        // 5001번에 물어보기
        // 그리고 응답 값으로 뭔가 하기
    };

    return (
        <ThemeProvider theme={theme}>
            <Header></Header>
            <RetailerSidebar></RetailerSidebar>
            <SearchBar></SearchBar>
        </ThemeProvider>
    );
}
export default RetailerHome;