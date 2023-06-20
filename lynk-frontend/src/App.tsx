import RetailerHome from './components/RetailerHome/index';
import WholesalerHome from './components/WholeSalerHome/index';
import Profile from './components/Profile';
import Register_Wholesaler from './components/Register_Wholesaler/index';
import Register_Retailer from './components/Register_Retailer/index';
import RegisterOption from './components/RegisterOption/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/index';
// import Message from './components/Message/Message';
// import MyActivity from './components/MyActivity';

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registeroption" element={<RegisterOption/>} />
          <Route path="/retailerhome" element={<RetailerHome />} />
          <Route path="/wholesalerhome" element={<WholesalerHome />} />
          <Route path="/register_wholesaler" element={<Register_Wholesaler />} />
          <Route path="/register_retailer" element={<Register_Retailer />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/myActivity" element={<MyActivity />}/> */}
          {/* <Route path="/message" element={<Message />}/> */}
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


// import Home from './components/Home/Home'
// import Data from './components/Data/Data';
// import Login from './components/Login/Login';
// import Register from './components/Register/Register';
// import RetailerHome from './components/Retailer/RetailerHome';
// import WholesalerHome from './components/Wholesaler/WholesalerHome';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />}/>
//         <Route path="/login" element={<Login />} />
//         <Route path="/data" element={<Data />} />
//         <Route path="/register" element = {<Register />} />
//         <Route path="/retailerhome" element = {<RetailerHome />}/>
//         <Route path="/wholesaler" element = {<WholesalerHome />}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
