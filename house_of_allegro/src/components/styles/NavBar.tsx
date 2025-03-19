

interface Props {
  title: string;
}

function NavBar({ title }: Props) {
  return (
    <>
      <nav>
        <div className="wrapper">
          <div className="logo">
            <a href="/">{title}</a>
          </div>
          <input type="radio" name="slider" id="menu-btn" />
          <input type="radio" name="slider" id="close-btn" />
          <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn">
              <i className="fas fa-times"></i>
            </label>
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
          <label htmlFor="menu-btn" className="btn menu-btn">
            <i className="fas fa-bars"></i>
          </label>
        </div>
      </nav>
        <br></br>
        <br></br>
        <br></br>
    </>
  );
}
export default NavBar;
