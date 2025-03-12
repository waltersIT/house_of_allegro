import { Link } from "react-router-dom";
import Header from "./styles/Header";
import landing from "./styles/assets/landing.jpeg";
import info from './info.json';

/*
TODO:
- link API's
    - Spotify
    - RA (resident advisor)
- Calendar
*/
function HomePage() {
    return(
        <>
            <Header title = {info.title}/>
            <div className="landing-photo">
                <img src={landing}></img>
            </div>
        </>
    );
}
export default HomePage;