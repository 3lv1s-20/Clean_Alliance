import React, {useRef} from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import './Login.css'

export default function Login(props){
    const email=useRef();
    const password=useRef();
    const outletContext = useOutletContext();
    const [loggedInUser, setLoggedinUser] = Array.isArray(outletContext)
        ? outletContext
        : [null, () => {}];
    

    const validateForm = () => {
        let formValid = false;
        if (email.current.validity.valueMissing
            || password.current.validity.valueMissing){
                alert("Please fill in all text fields.");
        }else if (email.current.validity.typeMismatch){
            alert("Invalid e-mail address. Please enter your e-mail again.");
        }else{
            formValid = true;
        }
        return formValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const dataLogin = {
            username: email.current.value,
            password: password.current.value
        };

        console.log(dataLogin);

        if(validateForm()){
            axios({
                method: 'post',
                url: 'http://localhost:8080/login',
                data: dataLogin
            })
            .then(response=>{
                console.log(response);
                if (response.status === 200){
                    alert("Logged in successfully.")
                    const jwtToken = response.headers.authorization.split(' ')[1]
                    if (jwtToken !== null) {
                        sessionStorage.setItem("jwt", jwtToken);
                        console.log(jwtToken);
                        setLoggedinUser(email.current.value);
                    } else{
                        alert("Token failure!");
                        setLoggedinUser("");
                    }
                }else{
                    alert("Login error!")
                    setLoggedinUser("");
                }
            }).then(()=>{
                email.current.value="";
                password.current.value="";
            })
            .catch(error=>{
                alert("Login error!")
                setLoggedinUser("");
                console.log(error);
            })
        }
      }

    return (
        <form className="form" noValidate onSubmit={handleSubmit}>
            <label className="labelText">Email:</label>
            <input type="email" ref={email} name="email" required/><br/><br/>

            <label className="labelText">Password:</label>
            <input type="password" ref={password} name="password" required/><br/><br/>
            <input type="submit" value="Submit"/>
        </form>
    )
}