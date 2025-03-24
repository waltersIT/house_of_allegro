import NavBar from "./styles/NavBar";
import Footer from "./styles/Footer";
import info from './info.json';
import Alec from './styles/assets/Alec.jpg';
import Live from './styles/assets/Live.jpg';
import DJ from './styles/assets/DJ.jpg';
import Table from './styles/assets/Table.jpg';

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
        <div className="section" style={{ paddingTop: '30px' }}>
            <div className="gallery">
            <img src={Alec} />
            <img src={DJ} />
            <img src={Table} />
            <img src={Live} />
        </div>
        </div>
            <div className="section">
                <div className="about-box">
                    <div className="events-container">
                    <h2 className="calendar-title">
                        {title}
                        <div className="line"></div>
                    </h2>
                    <p>{descriptionOne}</p>
                    <p>{descriptionTwo}</p>
                    <p>{descriptionThree}</p>
                    <p>{descriptionFour}</p>
                </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default About;