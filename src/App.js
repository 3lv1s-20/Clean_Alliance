import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Switch } from 'react-router-dom';
import UserProfilePage from './pages/UserProfile'
import NoPage from './pages/NoPage'
import './App.css';
// import HomeRouter from './homeRouter';
//import Router2 from './routerTest'; // Import Router2
// import JoinSession from './homeComponents/JoinSession';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/userprofile" element={<UserProfilePage />} />
          <Route path="*" element={<NoPage />} />
          
        </Routes>

        
      
      </BrowserRouter> 
  );
}

export default App;
