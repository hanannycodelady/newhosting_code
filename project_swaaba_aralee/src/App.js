import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Cars from './pages/Cars';
import Transactions from './pages/Transactions';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './components/contact';
import Search from './components/search';
// import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
// import AdminRegisteration from './components/AdminRegister';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cars/:id" element={<Cars />} />
        {/* <Route path="/Categories" element={<Categories />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<AdminDashboard />} />

        {/* Example for protected admin routes */}
        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        {/* <Route path="/admin/register" element={<AdminRegisteration />} /> */}
      </Routes>
    </Router>
  );
};

export default App;



















// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import Users from './pages/Users';
// import Cars from './pages/Cars';
// import Transactions from './pages/Transactions';
// import Navbar from './components/Navbar';
// import AboutUs from './components/AboutUs';
// import Footer from './components/Footer';
// import Login from './pages/Login';
// // import Categories from './pages/Categories';
// import Register from './pages/Register';
// import Dashboard from './components/AdminDashboard';
// import AdminRoute from './components/AdminRoute';
// import Contact from './components/contact';
// import Search from './components/search';
// // import PrivateRoute from './components/PrivateRoute';
// // import CreateOrder from './components/CreateOrder'


// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/contact" element={<Contact/>}/>
//         <Route path="/" element={<Home />} />
//         <Route path="/users" element={<Users />} />
//         <Route path="/cars" element={<Cars />} />
//         <Route path="/transactions" element={<Transactions />} />
//         <Route path="/AboutUs" element={<AboutUs />} />
//         <Route path="/Login" element={<Login/>}/>
//         <Route path="/foooter" element={<Footer/>}/>
//         <Route path="/Search " element={<Search/>}/>
//         <Route path="/cars/:id" element={<Cars />} />

//         {/* <Route path="/Categories" element = {<Categories/>}/> */}
//         <Route path="/Register" element = {<Register/>}/>
//         <Route path="/dashboard" element={<Dashboard />} />
//         {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
//         <Router>
//             <Routes>
//                 <Route path="/admin/login" element={<AdminLogin />} />
//                 <Route path="/admin/dashboard" element={<AdminDashboard />} />
//                 {/* Add other routes as needed */}
//             </Routes>
//     </Router>
//   );
// };

// export default App;


























