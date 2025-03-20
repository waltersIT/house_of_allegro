import { Link } from "react-router-dom";
import Header from "./styles/Header";

import info from "./info.json";
import EmbededMusic from "./EmbededMusic.tsx";
import Footer from "./styles/Footer.tsx";
import Spacer from "./styles/Spacer.tsx";
import NavBar from "./styles/NavBar.tsx";
import Events from "./styles/Events.tsx";


/*
TODO:
- Make it so it can call the https request securely
- link API's
    - RA (resident advisor)
- edit for mobile use
- 

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
