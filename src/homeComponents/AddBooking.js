import axios from 'axios'
import React, { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import "./AddBooking.css";
import NavBar from '../components/navBar'
import Footer from '../components/Footer'


export default function AddBooking(){

let navigate=useNavigate()
//declaring consts
const [booking, setBooking]= useState({
    bookeeName: '',
    bookeeEmail: '',
    location:'',    
    date: '',
    attendees:'',
});
const {bookeeName, bookeeEmail, location, date, attendees} = booking;
const [NameExist, setNameExist] = useState(false);
const [errorMessage, setErrorMessage] =useState('');
const [locations, setLocations] = useState([]);
const [selectedLocation, setSelectedLocation] = useState('');
const onInputChange = (e) => {
    setBooking({...booking, [e.target.name]:e.target.value });
    setLocations(e.target.value);
};
const onSubmit =async (e)=>{
    e.preventDefault();
    await axios.post("http://localhost:8080/addbookinginfo",booking);
    navigate("/")
    alert('Congratulations this booking has been submitted! You can Delete or edit the session in the profile page!');
};
//Check Username against database to see if valid:
const checkNameExists = async (bookeeName)=> {
    try{
        const response = await axios.get(`http://localhost:8080/userName/${bookeeName}`);
        if (response.status === 200) {
            console.log(`The user with name ${bookeeName} exists!`);
            setNameExist(true);
            setErrorMessage('');
        } else {
            console.log(`The user with name ${bookeeName} does not exist!`);
            setNameExist(false);
            setErrorMessage('This user name is NOT in the database please register to proceed');
        }
    } catch(error) {
        console.log("Error", error);
        setErrorMessage('Error: This user does not exist please register to proceed');
    }
};
//locations//
console.log(location);// Add this line to check if locations is being updated correctly
//locations//
useEffect(()=> {
    axios.get("http://localhost:8080/mapInfo")
    .then(response => {

        setLocations(response.data);
        })
       
}, []);


    return <div> 
        <NavBar />
    <div className="addBooking-container">
            <div className="addBooking-row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt2 shadow">
                    <h2 className='text-center m-4'> Create a Clean Up Session </h2>
                    <form onSubmit={(e) =>onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="Name" className="form-label">
                            Select Location: 
                        </label>
                        <select 
                            name="location"
                            value={location}
                            onChange={(e) => {
                                console.log(e.target.value); // Add this line to check the selected value
                                setSelectedLocation(e.target.value);
                                setBooking({...booking,location: e.target.value});
                            }}
                            size={5}
                            className="custom-dropdown"
                        >
                            <option value="">--Select a Location--</option>
                            {Array.isArray(locations) && locations.map((loc, index) => (
                                <option key={index} value={loc.locationLabel}>
                                    {loc.locationLabel}
                                    {loc.classification}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="Name" className="form-label">
                            Date: 
                        </label>
                        <input type={"text"}
                        className = "form-control"
                        placeholder="YYYY-MM-DD"
                        name="date"
                        value={date}  
                        onChange={(e)=>onInputChange(e)}
                        />
                    </div> 
                    <div className="mb-3">
                        <label htmlFor="Name" className="form-label">
                            Attendees: 
                        </label>
                        <input type={"number"}
                        className = "form-control"
                        placeholder="+1"
                        name="attendees"
                        value={attendees}  
                        onChange={(e)=>onInputChange(e)}
                        />
                    </div> 
                    <div className="mb-3">
                        <label htmlFor="UserName" className="form-label">
                             Enter Your Name:
                        </label>
                        <input 
                            type={"text"}
                            className = "form-control"
                            placeholder="Name"
                            name="bookeeName"
                            value={bookeeName} 
                            onChange={(e)=>onInputChange(e)}
                            onBlur={(e)=> checkNameExists(e.target.value)}
                        />
                        {errorMessage && !NameExist && <p>{errorMessage}</p>}
                        
                    </div>
                    
                    <button type="Submit" className="btn btn-outline-red">
                        Submit
                    </button>
                    </form>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    
}