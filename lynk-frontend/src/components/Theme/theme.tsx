import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
          main: '#7A7067',
      },
      secondary: {
          light: '#E6DFD9',
          main: '#BFB3A8',
          contrastText: '#7A7067',
      },
    },
    typography: {
      "fontFamily": `'NanumSquare', sans-serif`
    }
  });

export default theme;