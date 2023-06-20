import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";

const RetailerHome = () => {
    const navigate = useNavigate();

    const onLogin = () => {
        console.log('Login button pressed')
        // 5001번에 물어보기
        // 그리고 응답 값으로 뭔가 하기
    }

    return (
        <Typography> Welcome Home</Typography>
    )
}
export default RetailerHome;