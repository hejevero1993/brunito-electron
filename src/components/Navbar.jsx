import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Mi App
                </Link>

                <div className="navbar-nav">
                    <Link className="nav-link" to="/">
                        Inicio
                    </Link>

                    <Link className="nav-link" to="/about">
                        Acerca de
                    </Link>
                </div>
            </div>
        </nav>
    );
}
