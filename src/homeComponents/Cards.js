import React from 'react';
import './Cards.css';
import CleaningClipArt from '../images/CleaningClipArt.jpeg';
import ClipArt from '../images/ClipArt2.webp';

import {Link} from 'react-router-dom';

export default function CardMain(){
    return (
        <div className="card-group">
        <div className="card">
        <img className="card-img-top" src={CleaningClipArt} alt="Card cap"/>
        <div className="card-body">
            <h5 className="card-title">Create a Session</h5>
            <p className="card-text">Are you interested in helping the enviroment today? You can create a celan up session by selecting the button below! </p>
            <p className="card-text"><small className="text-muted">No time to waste join the us now!</small></p>
            <Link className="btn btn-outline-light-home" to="/addbooking" > Add Booking </Link>

        </div>
       
        </div>
        <div className="card">
        <img className="card-img-top" src={ClipArt} alt="Card cap"/>
        <div className="card-body">
            <h5 className="card-title"> Join A Cleaning Session </h5>
            <p className="card-text"> Across the UK there are places that require your attention. Join a cleaning session now by pressing the button below: </p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            <Link className="btn btn-outline-light-home" to="/joinbooking" > Join Session </Link> 
        </div>
        </div>
        <div className="card">
        <img className="card-img-top" src={ClipArt} alt="Card cap"/>
        <div className="card-body">
            <h5 className="card-title">Share with Friends ! </h5>
            <p className="card-text"> We are always looking for new volunteers and the more people you share the higher up the leaderboard your will go!</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>  
             <Link className="btn btn-outline-light-home" to="/referFriend" > Refer a Friend </Link> 
        
        </div>
        </div>
        
        </div>
    
    )
 }