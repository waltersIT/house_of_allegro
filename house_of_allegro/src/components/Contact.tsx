import NavBar from "./styles/NavBar";
import Footer from "./styles/Footer";
import ContactForm from "./styles/ContactForm";

interface Props {
  title: string;
}

function Contact({ title }: Props) {
  //email js here

  return (
    <>
      <NavBar title={title} />
      <div className="side-by-side">
        <div className="contact-us-box">
          <div className="events-container">
            <h2 className="calendar-title" style={{ paddingBottom: "50px" }}>
              Media
            </h2>

            <div className="button-layout-contact">
              <a href="https://www.youtube.com/@HouseOfAllegro">
                <div className="button-59"> Youtube </div>
              </a>

              <a href="https://www.instagram.com/houseofallegro/">
                <div className="button-59"> Instagram </div>
              </a>

              <a href="https://open.spotify.com/artist/1GB2pMPzC9ID26TpYcxcbM">
                <div className="button-59"> Spotify </div>
              </a>

              <a href="https://www.tiktok.com/@houseofallegro?_t=8is1TKWx1ub&_r=1">
                <div className="button-59"> TikTok </div>
              </a>
            </div>
          </div>
        </div>
        <div className="mobile-spacer" />

        <div className="contact-box">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Contact;
