import NavBar from '../components/navBar'
import Footer from '../components/Footer'
import User from '../userProfileComponents/User_Profile'
import SessionsCreated from '../userProfileComponents/createdSessions'


export default function UserProfile(){
    return (
        <div>
            <NavBar></NavBar>
            <User />
            <SessionsCreated />
            <Footer />
        </div>
        
    )
}