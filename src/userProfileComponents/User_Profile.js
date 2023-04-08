import React, { useState, useEffect, useRef } from "react";
import './User_Profile.css';
import axios from "axios";

export default function Registration() {

  //used to set user Information
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState();

  //used to store the userID
  const [enteredID, setEnteredID] = useState("");

  //used for user information
  const [userData, setUserData] = useState({});
  const [userPoints, setUserPoints] = useState("");
  const [userPurchases, setUserPurchases] = useState([]);

  //used to update the data in the database when using edit button
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");

  //variables used to fill in all data for user information in the database. Need because in spring used @NotNull/@NotBlank 
  const [points, setPoints] = useState("");
  const [password, setPassword] = useState("");

  //used for edit button
  const [isEditable, setIsEditable] = useState(false);
  const [initialName, setInitialName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [initialLocation, setInitialLocation] = useState("");

  //used for cancel button  
  const [isEditing, setIsEditing] = useState(false);

  //used to display User details
  useEffect(() => {
    loadUsers();
  }, [userId]);

  const loadUsers = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/user/${userId}`);
      const user = result.data;
      //need this to store original user information and display them when pressing edit button
      setInitialName(user.name);
      setInitialEmail(user.email);
      setInitialLocation(user.location);
      //need this to fill in all data for user information
      setUsers([user]);
      setPoints(user.points);
      setPassword(user.password);
      //setUsers([result.data]);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    axios.get('http://localhost:8080/user').then((response) => {
      setUserData(response.data[0]);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  //used whne pressing save after editing user information
  const saveChanges = async () => {
    // if (!updatedName || !updatedEmail || !updatedLocation) {
    //   alert("Please fill in all fields.");
    //   return;
    // }

    try {
      await axios.put(`http://localhost:8080/user/${userId}`, {
        //this variables are passed in axios.put 
        name: updatedName ? updatedName : initialName,
        email: updatedEmail ? updatedEmail : initialEmail,
        location: updatedLocation ? updatedLocation : initialLocation,
        //need this to fill in all data for user information
        points,
        password,
      });
      alert("Changes saved successfully.");
      setIsEditable(false);
      loadUsers();
    } catch (error) {
      alert("An error occurred while saving changes.");
      console.log(error);
    }
  };

  //called when pressing cancel button, closes text boxes, and undoes changes
  const cancelEdit = () => {
    setIsEditable(false);
    setUpdatedName("");
    setUpdatedEmail("");
    setUpdatedLocation("");
  };


  return (
    <div className="container">
      <div className="userDetails">
        <h1>User Profile</h1>
        <h2 className="subtitle">Personal details</h2>

        <div className="User-form-group">
          <label className="SessionLabel" for="exampleUserName">
            User ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="UserName"
            placeholder="Enter ID"
            name="enteredID"
            value={enteredID}
            onChange={(e) => setEnteredID(e.target.value)}
          />
          <button id="listBtn" onClick={async () => {
            if (enteredID.trim() === '') {
              alert("Please Enter an ID");
            } else {
              try {
                const response = await axios.get(`http://localhost:8080/user/${enteredID}`);
                if (Object.keys(response.data).length > 0) {
                  setUserId(enteredID);
                } else {
                  alert("User ID was not found ");

                }
              } catch (error) {
                alert("User ID was not found");
                setEnteredID("");
                setUsers([]);
                console.log(error);
              }
            }
          }}>
            View User Details
          </button>
        </div>


        <div className="box">
          <div style={{ display: "flex", alignItems: "center" }}>
            <label>Name:&nbsp;</label> {/* &nbsp; add an empty space */}
            {isEditable ? (
              <input
                type="text"
                value={updatedName || initialName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            ) : (
              users.map((user, index) => (
                <div key={index}>

                  {user && user.name && (
                    <div>
                      <label className="labelText">{user.name} </label>
                    </div>
                  )}

                </div>
              ))
            )}

          </div>
        </div>

        <div className="box">
          <div style={{ display: "flex", alignItems: "center" }}>
            <label>Email:&nbsp; </label>
            {isEditable ? (
              <input
                type="text"
                value={updatedEmail || initialEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            ) : (
              users.map((user, index) => (
                <div key={index}>
                  {user && user.email && (
                    <div>

                      <label className="labelText">{user.email} </label>

                    </div>
                  )}
                </div>
              ))
            )}

          </div>
        </div>

        <div className="box">
          <div style={{ display: "flex", alignItems: "center" }}>
            <label>Location:&nbsp; </label>
            {isEditable ? (
              <input
                type="text"
                value={updatedLocation || initialLocation}
                onChange={(e) => setUpdatedLocation(e.target.value)}
              />
            ) : (
              users.map((user, index) => (
                <div key={index}>
                  {user && user.location && (
                    <div>
                      <label className="labelText">{user.location} </label>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>
        </div>

        {/* code to display edit/save and cancel buttons and make them work */}
        {isEditable ? (
          <div>
            <button onClick={saveChanges}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setIsEditable(true)}>Edit</button>
        )}

        <br></br>
        <br></br>

        <div className="box">
          <div style={{ display: "flex", alignItems: "center" }}>
            <label>Points:&nbsp;</label>
            {users.map((user, index) => (
              <div key={index}>

                {user && user.points && (
                  <label className="labelText">{user.points}</label>
                )}

              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="purchasesList">
        <h2 className="subtitle">Purchased Items</h2>
        {userPurchases.map((purchase) => (
          <div key={purchase.id} className="box">
            <h3>{purchase.itemName}</h3>
            <p>{ }</p>
            <p>{purchase.price}</p>
            <p>{purchase.date}</p>
          </div>
        ))}
        This is where the user's purchased items would go
      </div>
    </div>
  );
}

