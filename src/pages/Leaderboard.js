import NavBar from '../components/navBar'
import Footer from '../components/Footer'
import Board from '../leaderboardComponents/board'

export default function leaderbordPage(){
    return (
        <div>
            <NavBar></NavBar>
            <Board />
            <Footer />
        </div>
    )
}