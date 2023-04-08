import React from "react";
import { Link } from "react-router-dom";

export default function JoinSession(){

    return(
        <div className="Join">

        <form className="join-Form">
        <div className="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <small id="emailHelp" className="form-text text-muted">No Username No Problem! Follow this link to sign up:
            <Link  to="/Register" > Register </Link>
            </small>
        </div>
        <div className="form-group form-check">
            <label className="form-check-label" for="exampleCheck1"></label>
        </div>
        <button type="submit" className="btn btn-primary">Join Session</button>
        </form>
                
            
        </div>
    );

}