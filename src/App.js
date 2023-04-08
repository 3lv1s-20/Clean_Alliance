import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Switch } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Leaderboard from './pages/Leaderboard'
import UserProfilePage from './pages/UserProfile'
import Shop from './pages/Shop'
import Register from './pages/Register'
import NoPage from './pages/NoPage'
import './App.css';
import AddBooking from './homeComponents/AddBooking';
import JoinBooking from './homeComponents/ViewBookings';
import ReferFriend from './pages/ReferFriend';
import Refer from './pages/refer';
import PreviousRefer from './pages/PreviousRefers'
// import HomeRouter from './homeRouter';
//import Router2 from './routerTest'; // Import Router2
// import JoinSession from './homeComponents/JoinSession';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/userprofile" element={<UserProfilePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addbooking" element={<AddBooking/>}/>
          <Route path ="/joinbooking" element= {<JoinBooking/>}/>
          <Route path ="/referFriend" element= {<ReferFriend/>}/>
          <Route path ="/refer" element= {<Refer/>}/>
          <Route path ="/viewreferrals" element= {<PreviousRefer/>}/>

          <Route path="*" element={<NoPage />} />
          
        </Routes>

        
      
      </BrowserRouter> 
  );
}

export default App;
