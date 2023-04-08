import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './ViewBookings.css';
import { Link } from 'react-router-dom';

export default function Home(){

    const [bookings, setBookings]=useState([]);
    useEffect(()=>{
        loadBookings();
    }, [] );
    const loadBookings=async()=>{
        const result=await axios.get("http://localhost:8080/Viewbookinginfo")
            setBookings(result.data); 
    }

return(
<div className='container'>  
    <table className="table">
        <thead>
            <tr>
            <th scope="col">Location</th>
            
            <th scope="col">Join</th>
            </tr>
        </thead>
        <tbody className='table-body'>
            {
                bookings.map((booking,index)=>
                <tr key={index} className="columns">
                <td>{booking.location}</td>   
                
                <td>  
                    <button>
                    <Link className="btn" to="/JoinSession" > Join </Link>
                    </button>
                </td>
                </tr>
                
                )
            }
        </tbody>
    </table>
</div>
);
    
    }