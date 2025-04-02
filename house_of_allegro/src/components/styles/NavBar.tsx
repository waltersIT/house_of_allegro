import { useState } from "react";

interface Props {
  title: string;
}

function NavBar({ title }: Props) {


  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  return (
    <>
      <nav>
        <div className="wrapper">
          <div className="logo">
            <a href="/">{title}</a>
          </div>


 
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/About">About</a>
            </li>
            <li>
              <a href="/Music">Music</a>
            </li>
            <li>
              <a href="/Events">Events</a>
            </li>
            <li>
              <a href="/Contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
        <br></br>
        <br></br>
        <br></br>
    </>
  );
}
export default NavBar;
