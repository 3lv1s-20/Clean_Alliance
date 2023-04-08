import React, { useState, useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import './createdSessions.css';
import axios from "axios";

export default function Registration(){
    let navigate=useNavigate()

    const [userData, setUserData] = useState({});
    const [userPoints, setUserPoints] = useState("");
    const [userPurchases, setUserPurchases] = useState([]);
    //check user input against datbase backend
    const [userSessions, setUserSessions] = useState([]);
    //holding value of username entered by User
    const [enteredUserName, setEnteredUserName] = useState("");
    useEffect(()=> {
        loadSessions();
    },[] );
    const loadSessions= async()=>{
        console.log(`Entered user name: '${enteredUserName}'`);
        if(enteredUserName.trim() !=="") {
            const result = await axios.get(`http://localhost:8080/Viewbookinginfo/${enteredUserName}`);
            console.log(result.data);
            setUserSessions([result.data]);
            
        } else {
            console.log("ERROR USERNAME IS EMPTY");
        }
    };
    //popop
    const [showPopup, setShowPopup] = useState(false);
    const{UserName}=useParams()
    //From Addbooking
    const [booking, setBooking]= useState({
        bookeeName: '',
        bookeeEmail: '',
        location:'',    
        date: '',
        attendees:'',
    });
    const {bookeeName, bookeeEmail, location, date, attendees} = booking;
    const onInputChange = (e) => {
        setBooking({...booking, [e.target.name]:e.target.value });
    };
    //change to /Viewbookinginfo/{UserName} if doesnt work
    const onSubmit =async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/updatebookingInfo/${enteredUserName}`,booking)
        .then(response =>{
            console.log('User details have been updated');
        })
        .catch(error =>{
            console.log('Error adding data on submit');
        })
    };
    useEffect(()=>{
        loadBooking()
    }, [] );
    const loadBooking =async()=>{
        const result=await axios.get(`http://localhost:8080/Viewbookinginfo/${UserName}`)
        .then(response => {
            setBooking(result.data)
            console.log(enteredUserName)
        
        })
    .catch(error => {
            console.log("Error in getting data from backend");    
    });
    }
     //DELETE BOOKING
    const deleteBooking=async (UserName)=>{
        await axios.delete(`http://localhost:8080/deletebookinginfo/${UserName}`)
        navigate("/User_Profile")
        alert('Your booking has been canceled. To view change please press the "View bookings" button');
        loadBooking()
    }
    //Check userName Against database to see if valid:
    //Check Username against database to see if valid:
    const [NameExist, setNameExist] = useState(false);
    const [errorMessage, setErrorMessage] =useState('');
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
    
    //list of locations//
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    console.log(location);// Add this line to check if locations is being updated correctly
    //API Call//
    useEffect(()=> {
        axios.get("http://localhost:8080/mapInfo")
        .then(response => {

            setLocations(response.data);
            })
    }, []);
    
/*
    useEffect(() => {
        axios.get("/api/user").then((response) => {
          setUserData(response.data);
        });

        axios.get("/api/user/points").then((response) => {
            setUserPoints(response.data.points);
        });

        axios.get("/api/user/purchases").then((response) => {
            setUserPurchases(response.data);
          });

      }, []);
*/
    return (
    <div>

    <div className="sessionsList">
        <h2 className="subtitle">Created Sessions</h2>
        <form>
            <div className="User-form-group">
                <label className= "SessionLabel" for="exampleUserName">
                    UserName: 
                </label>
                <input 
                type="text" 
                className="form-control" 
                id="UserName" 
                placeholder="Enter UserName"
                name ="enteredUserName"
                value={enteredUserName}
                onChange={(e)=> setEnteredUserName(e.target.value)}
                /> 
                <button id="listBtn" onClick={(e) => { e.preventDefault(); loadSessions(); }}>
                     View Bookings 
                </button>
            </div>
        </form>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Location</th>
                    <th scope="col">Date</th>
                    <th scope="col">Attendees</th>
                    <th scope="col"> Edit Session </th>
                </tr>
            </thead>
            <tbody className='UserSession-table'>
                {Array.isArray(userSessions) ? (
                    userSessions.map((userSession,index) => (
                    <tr key={index} className="sessions-column">
                        <td key={index+1}></td>
                        <td>{userSession.location}</td>
                        <td>{userSession.date}</td>
                        <td>{userSession.attendees}</td>
                        <td> 
                            <button type="Submit" className="btn" onClick={()=>setShowPopup(true)} > Edit Session </button>
                            {showPopup && (
                                //Popup DIV
                                <div className="popup">
                                    <div className="popup-content">
                                    <h2>Edit Session HERE:</h2>
                                    {<form onSubmit={(e) =>onSubmit(e)}>
                                <div className="mb-3">
                                    <label htmlFor="UserName" className="form-label">
                                    UserName:
                                    </label>
                                    <input type={"text"}
                                    className = "form-control"
                                    placeholder="Name"
                                    name="bookeeName"
                                    value={bookeeName} 
                                    onChange={(e)=>onInputChange(e)}
                                    onBlur={(e)=> checkNameExists(e.target.value)}
                                    />
                                    {errorMessage && !NameExist && <p>{errorMessage}</p>}
                                </div>
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
                                
                                <button type="Submit" className="btn btn-outline-red">
                                    Submit
                                </button>
                                </form>}
                                                
                                </div>
                            </div>
                )}
                            <button type="button" className="btn-cancel"
                            onClick={()=>deleteBooking(userSession.bookeeName)}
                            > Delete </button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="2">No sessions found</td>
                    </tr>
                )}
    </tbody>
   </table>
 </div>

    </div>
    );
}