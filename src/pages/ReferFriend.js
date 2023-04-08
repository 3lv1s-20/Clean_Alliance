import NavBar from '../components/navBar'
import Footer from '../components/Footer'
import referralPage from '../referralComponents/referral'
import NavBarRef from '../referralComponents/Navbar'
import ContentRef from '../referralComponents/Content'

export default function NoPage(){
    return (
        <div>
            <NavBar></NavBar>
             <NavBarRef />
             <ContentRef />
            <Footer />
        </div>
    )
}