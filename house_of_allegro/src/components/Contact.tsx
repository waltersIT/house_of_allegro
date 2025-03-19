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
      <div className="section">
        <div className="calendar-box">
            <h1>Check Us Out</h1>
            <ul></ul>
        </div>
      <div className="calendar-box">
        <ContactForm />
        </div>
        </div>
      <Footer />
    </>
  );
}
export default Contact;
