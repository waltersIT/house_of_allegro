import { Link } from "react-router-dom";

export default function NotFound () {
    return (<div className="list-group">404 Not Found
        <Link to="/">Home</Link>
    </div>);
}