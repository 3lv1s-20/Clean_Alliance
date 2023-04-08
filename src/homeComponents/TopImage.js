import React from 'react';
import './TopImage.css';
import Home from '../images/Home.jpeg';


console.log(Home);

function TopImage(){
    return (
        <div className='TopImage--container'>
        <img src= {Home} 
        className ="Image1" 
        alt= "img" 
        id = "img1"/>
        </div>
    )
}
export default TopImage;