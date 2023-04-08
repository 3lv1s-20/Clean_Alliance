import React from 'react';
import './style1.css';
import {Link} from 'react-router-dom';

function NavbarRef() {
    return (
      <div className="navbarRef">
        <div className="iconRef">
          <h2 className="logoRef">Clean Alliance</h2>
        </div>
  
        <div className="menuRef">
          <ulref>
            <Link className="btnref" to="/refer" > Refer a Friend </Link>
            <Link className="btnref" to="/viewreferrals" > View Previous Referrals </Link> 
          </ulref>
        </div>
      </div>
    );
  }

  export default NavbarRef;