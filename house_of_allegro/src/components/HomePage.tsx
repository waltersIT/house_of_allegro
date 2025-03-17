import { Link } from "react-router-dom";
import Header from "./styles/Header";
import GoogleCalendar from "./Calendar";
import Music from "./Spotify.tsx";
import landing from "./styles/assets/landing.jpeg";
import info from "./info.json";
import EmbededMusic from "./EmbededMusic.tsx";
import Footer from "./styles/Footer.tsx";
import Spacer from "./styles/Spacer.tsx";
import NavBar from "./styles/NavBar.tsx";
import Events from "./styles/Events.tsx";


/*
TODO:
- add express for env and fetching data from postgres
- link API's
    - RA (resident advisor)
- make header sticky


<iframe width="1280" height="720" src="https://www.youtube.com/embed/QkB-iEkyckc" title="Heartbeat Goes Like - The Unofficial Music Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>



*/
function HomePage() {
  return (
    <>
      <NavBar title={info.title} />
      <Header
        title={info.title}
        youtubeUrl="https://www.youtube.com/embed/QkB-iEkyckc"
      />
      <div className="side-by-side">
        <Events title={info.calendar.title} />
        <EmbededMusic />
      </div>

      <div className="center-containter">
        <div className="button-layout">
          <Link to="/Music">
            <div className="button-59">Music</div>
          </Link>

          <Link to="/Events">
            <div className="button-59">Events</div>
          </Link>
        </div>
      </div>

      <Spacer />
      <Footer />
    </>
  );
}
export default HomePage;
