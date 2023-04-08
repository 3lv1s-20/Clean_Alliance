import NavBar from '../components/navBar'
import Footer from '../components/Footer'


export default function NoPage(){
    return (
        <div>
            <NavBar></NavBar>
            <p>Error: Page was not found.</p>
            <Footer />
        </div>
    )
}