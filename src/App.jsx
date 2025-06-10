import React, { useState ,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import EditUser from './components/EditUser';


// import ProtectedRoute from './ProtectedRoute';

function App() { 
  const local_storeg_key= ('contact')
   const [user, setUser] = useState(null);
function Effect(){
  const retrivecontacts = JSON.parse(localStorage.getItem(local_storeg_key))
  if(setcontacts)setcontacts(retrivecontacts);
}

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login/>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/dituser" element={<EditUser/>} />
      </Routes>
    </Router>
  );
}

export default App;