import React from 'react'
import './/navBar.css';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

export default function NavBar(){
    return( 
        <nav className="navbar">
        <div className="navbar__container">
            
        <Link to="/" id="navbar__logo">
            <img src={logo} alt="Clean Alliance Logo" />
          </Link>
            <div className="navbar__toggle" id="mobile-menue">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <ul className="navbar__menue">
                <li className="navbar__item">
                    <Link to="/home" className="nav__links">
                        Home
                    </Link>
                </li>
                <li className="navbar__item">
                    <Link to="/login" className="nav__links">
                        Login
                    </Link>
                </li>
                <li className="navbar__item">
                    <Link to="/leaderboard" className="nav__links">
                        LeaderBoard
                    </Link>
                </li>
                <li className="navbar__item">
                    <Link to={'/userprofile'} className="nav__links">
                        Profile
                    </Link>

                </li>
                <li className="navbar__item">
                    <Link to="shop" className="nav__links">
                        Shop
                    </Link>

                </li>
                <li className="navbar__btn">
                    <Link to="/register" className="button">
                        Register
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
    )
}