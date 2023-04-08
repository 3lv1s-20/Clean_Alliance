import React from 'react';
import './/Footer.css';
import fb from '../images/facebook.png';
import twitter from '../images/twitter.png';
import linkedin from '../images/linkedin.png';
import instagram from '../images/instagram.png';

export default function Footer() {
    return(
        <div className ="footer">
            <div className="sb_footer section__padding"> 
            <div className="sb__footer-links">
                <div className= "sb__footer-links-div">
                        
                        <a href ="/employer">
                            <p> Contact Us </p>
                        </a>
                        <br>
                        </br>
                        <a href ="/employer">
                            <p> FAQs</p>
                        </a>


                    </div>
                    <div className="sb__footer-links_div">

                       
                        <a href="/resource">
                            <p> Charities </p>
                        </a>
                        <br>
                        </br>
                        <a href="/resource">
                            <p> Testimonals</p>
                        </a>

                    </div>

                    <div className="sb__footer-links_div">
                        
                        <a href ="/about">
                            <p> Careers </p>
                        </a>

                        <br>
                        </br>

                        <a href ="/locations">
                            <p> employer</p>
                        </a>

                        <br>
                        </br>

                        <a href ="/contact">
                            <p> house</p>
                        </a>
                    </div>
                    
                    <div className="sb__footer-links_div"></div>
                        
                        <div className="socialmedia">
                            <p><img src ={fb} alt =""/></p>
                            <p><img src ={twitter} alt =""/></p>
                            <p><img src ={linkedin} alt =""/></p>
                            <p><img src ={instagram} alt =""/></p>
                        </div>
                </div>
            </div>
            <div className="sb__footer-below">
                <div className="sb__footer-copyright">
                    <p>
                        @{new Date().getFullYear()} CodeInn.All right reserved.
                    </p>
                </div>
                <div className=" sb_footer-below-links">
                    <a href ="/terms"><div><p>Terms and Conditions</p></div></a> 
                </div>
            </div>  
        </div>
    )
}
 