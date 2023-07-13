// 파일을 가지고 와서 디스필래이는 됨
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '../Theme/theme';
import Header from '../Wholesaler_Header';
import WholesalerSidebar from '../WholesalerSidebar';
import SearchBar from '../SearchBar';
import DataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import AddFriends from '../AddFriend';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const WholesalerHome = () => {
  const navigate = useNavigate();
  const [id, setID] = useState<null | any>();
  const [gridData, setGridData] = useState<any[][] | undefined>(undefined);

  useEffect(() => {
    setID(sessionStorage.getItem("id"))
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: 'binary' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const sheetData: Array<any[]> = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          setGridData(sheetData);
        }
      };
      fileReader.readAsBinaryString(file);
    }
  };

  const [format, setFormat] = useState('csv');
  const [generatedFile, setGeneratedFile] = useState(null);

  const handleDownload = () => {
    if (gridData) {
      if (format === 'csv') {
        const csvData = gridData.map((row) => row.join(',')).join('\n');
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const timestamp = Date.now();
        const fileName = `excel_sheet_${timestamp}.csv`;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (format === 'excel') {
        const worksheet = XLSX.utils.aoa_to_sheet(gridData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const timestamp = Date.now();
        const fileName = `excel_sheet_${timestamp}.xlsx`;
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {/* <WholesalerSidebar /> */}
      <SearchBar />
      <AddFriends />
      <Box>
        <Typography variant="h4">Edit Excel Sheet</Typography>
        {gridData ? (
          <DataSheet
          data={gridData.map((row) =>
            row.map((cell) => ({ value: cell, key: `${row}-${cell}` }))
          )}
          valueRenderer={(cell) => cell.value}
          onCellsChanged={(changes) => {
            const newGridData = gridData.map((row) => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              newGridData[row][col] = value;
            });
            setGridData(newGridData);
          }}
        />
        
        ) : (
          <Typography variant="body1">Please upload an Excel file</Typography>
        )}
      </Box>

      <Button variant="contained" component="label" style={{ marginTop: '1rem' }}>
        Upload Excel
        <input type="file" hidden onChange={handleFileUpload} accept=".xlsx, .xls, .csv" />
      </Button>

      <Button variant="contained" onClick={() => {setFormat('csv'); handleDownload();}} style={{ marginRight: '1rem' }}>
        Download CSV
      </Button>
      <Button variant="contained" onClick={() => {setFormat('excel'); handleDownload();}} style={{ marginRight: '1rem' }}>
        Download EXCEL
      </Button>
      <Typography> This is id {id}</Typography>
    </ThemeProvider>
  );
};

export default WholesalerHome;


//여기까진 파일을 업로드 랄수 있음, 근데 보이진 않음
// import React, { useState } from 'react';
// import { Box, Button, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { ThemeProvider } from '@emotion/react';
// import theme from '../Theme/theme';
// import Header from '../Wholesaler_Header';
// import WholesalerSidebar from '../WholesalerSidebar';
// import SearchBar from '../SearchBar';
// import DataSheet from 'react-datasheet';
// import 'react-datasheet/lib/react-datasheet.css';
// import * as XLSX from 'xlsx';

// const WholesalerHome = () => {
//   const navigate = useNavigate();
//   const [gridData, setGridData] = useState<any[][] | undefined>(undefined);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const fileReader = new FileReader();
//       fileReader.onload = (e) => {
//         const data = e.target?.result;
//         if (data) {
//           const workbook = XLSX.read(data, { type: 'binary' });
//           const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//           const sheetData: Array<any[]> = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//           setGridData(sheetData);
//         }
//       };
//       fileReader.readAsBinaryString(file);
//     }
//   };

//   const handleDownload = () => {
//     if (gridData) {
//       const csvData = gridData.map((row) => row.join(',')).join('\n');
//       const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//       const timestamp = Date.now();
//       const fileName = `excel_sheet_${timestamp}.csv`;
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(blob);
//       link.download = fileName;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Header />
//       {/* <WholesalerSidebar /> */}
//       <SearchBar />

//       <Box>
//         <Typography variant="h4">Edit Excel Sheet</Typography>
//         {gridData ? (
//           <DataSheet
//             data={gridData}
//             valueRenderer={(cell) => cell}
//             onCellsChanged={(changes) => {
//               const newGridData = gridData.map((row) => [...row]);
//               changes.forEach(({ cell, row, col, value }) => {
//                 newGridData[row][col] = value;
//               });
//               setGridData(newGridData);
//             }}
//           />
//         ) : (
//           <Typography variant="body1">Please upload an Excel file</Typography>
//         )}
//       </Box>

//       <Button variant="contained" component="label" style={{ marginTop: '1rem' }}>
//         Upload Excel
//         <input type="file" hidden onChange={handleFileUpload} accept=".xlsx, .xls, .csv" />
//       </Button>

//       <Button variant="contained" onClick={handleDownload} style={{ marginTop: '1rem' }}>
//         Download Excel
//       </Button>
//     </ThemeProvider>
//   );
// };

// export default WholesalerHome;
