import React, {useRef} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Registration(){
    const name=useRef();
    const email=useRef();
    const password=useRef();
    const repPassword=useRef();
    const tos=useRef();

    const validateForm = () => {
        let formValid = false;

        if (name.current.validity.valueMissing 
            || email.current.validity.valueMissing 
            || password.current.validity.valueMissing
            || repPassword.current.validity.valueMissing){
                alert("Please fill in all text fields.");
        }
        else if (email.current.validity.typeMismatch){
            alert("Invalid e-mail address. Please enter your e-mail again.");
        }else if (password.current.validity.tooShort){
            alert("Password is too short. Please select another password");
        } else if(password.value !== repPassword.value) {
            alert("Passwords do not match. Please retry");
        } else if (tos.current.validity.valueMissing){
            alert("Please agree to the Terms and Conditions, and Privacy Policy.")
        }else{
            formValid = true;
        }
        return formValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(validateForm()){
            axios.post('http://localhost:8080/user',{
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
            }).then(response=>{
                console.log(response);
                if (response.status === 201){
                    alert("Registered successfully.")
                }
            }).then(()=>{
                name.current.value="";
                email.current.value="";
                password.current.value="";
                repPassword.current.value="";
                tos.current.checked=false;
            })
            .catch(error=>{
                console.log(error);
            })
        }
      }

    return (
        <form className="form" noValidate onSubmit={handleSubmit}>
            <label className="labelText">Name: </label>
            <input type="text" ref={name} required/><br/><br/>

            <label className="labelText">Email:</label>
            <input type="email" ref={email} name="email" required/><br/><br/>

            <label className="labelText">Password:</label>
            <input type="password" ref={password} name="password" required minLength="8"/><br/><br/>

            <label className="labelText">Re-type password:</label>
            <input type="password" ref={repPassword} name="repPassword" required/><br/><br/>

            <input type="checkbox" ref={tos} name="tos" value="tos" required/>
            <label>I agree to the Terms of Use and Privacy Policy.</label>
            <br/><br/>

            <input type="submit" value="Submit"/>
            <Link to={'/help'}>Learn more</Link>
        </form>
    )
}