import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      404 Not Found  
      <br></br>
      <Link to="/">  Home</Link>
    </div>
  );
}
