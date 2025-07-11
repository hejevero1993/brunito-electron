import { Link } from "react-router-dom";
import moment from "moment";

export default function Navbar({ auth, onLogout }) {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" data-widget="pushmenu" to="#" role="button">
                        <i className="fas fa-bars"></i>
                    </Link>
                </li>

                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/" className="nav-link">
                        Inicio
                    </Link>
                </li>

                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/contact" className="nav-link">
                        Contactanos
                    </Link>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" data-widget="navbar-search" href="#" role="button">
                        <i className="fas fa-search"></i>
                    </Link>

                    <div className="navbar-search-block">
                        <form className="form-inline">
                            <div className="input-group input-group-sm">
                                <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />

                                <div className="input-group-append">
                                    <button className="btn btn-navbar" type="submit">
                                        <i className="fas fa-search"></i>
                                    </button>

                                    <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt"></i>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                        <i className="fas fa-th-large"></i>
                    </a>
                </li>

                <li className="nav-item dropdown user-menu">
                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                        <img src="/img/brand/logo-original.png" alt="User profile image" className="user-image rounded-circle shadow" />

                        <span className="d-none d-md-inline">{auth?.user?.name ? auth.user.name : "Usuario Invitado"}</span>
                    </a>

                    {auth && (
                        <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right rounded" data-popper="static">
                            <li className="user-header bg-primary">
                                <img src="/img/brand/logo-original.png" alt="BrunOS user logo" className="rounded-circle shadow" style={{ width: "100px", height: "100px" }} />

                                <p>
                                    Bienvenido {auth.user.name}
                                    <small>Miembro desde {moment(auth.user.created_at).format("MM. YYYY")}</small>
                                </p>
                            </li>

                            <li className="user-body border-bottom">
                                <div className="row">
                                    <div className="col-4 text-center">
                                        <Link to="/">Perfil</Link>
                                    </div>
                                </div>
                            </li>

                            <li className="user-footer">
                                <a href="" className="btn btn-default btn-float float-right" onClick={onLogout}>
                                    Cerrar sesión
                                </a>
                            </li>
                        </ul>
                    )}

                    {!auth && (
                        <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right rounded" data-popper="static">
                            <li className="user-header bg-secondary">
                                <img src="/img/brand/logo-original.png" alt="BrunOS image logo" className="rounded-circle shadow" style={{ width: "100px", height: "100px" }} />

                                <p>Bienvenido a BrunOS</p>
                            </li>

                            <li className="user-body">
                                <div className="row">
                                    <div className="col-6 text-center">
                                        <Link to="/login">Iniciar sesión</Link>
                                    </div>

                                    <div className="col-6 text-center">
                                        <Link to="/register">Registrarme</Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}
