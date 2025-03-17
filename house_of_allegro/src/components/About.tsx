import NavBar from "./styles/NavBar";
import Footer from "./styles/Footer";
import info from './info.json';

interface Props {
    title: string,
    descriptionOne: string,
    descriptionTwo: string,
    descriptionThree: string,
    descriptionFour: string
}

function About({title, descriptionOne, descriptionTwo, descriptionThree, descriptionFour}: Props) {
    return(
        <>
        <NavBar title={info.title}/>
            <div className="section">
                <div className="calendar-box">
                    <h2 className="calendar-title">
                        {title}
                    </h2>
                    <p>{descriptionOne}</p>
                    <p>{descriptionTwo}</p>
                    <p>{descriptionThree}</p>
                    <p>{descriptionFour}</p>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default About;