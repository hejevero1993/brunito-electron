import { Link } from "react-router-dom";

export default function Aside({ auth, route, onLogout }) {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link href="index3.html" className="brand-link">
                <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: "0.8" }} />

                <span className="brand-text font-weight-light">BrunOS</span>
            </Link>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <i className="fas fa-users p-2 text-white"></i>
                    </div>

                    <div className="info">
                        <Link to={auth ? `/` : `/login`} className="d-block" id="username">
                            {auth ? auth.user.name : `Iniciar sesión`}
                        </Link>
                    </div>
                </div>

                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className={`nav-item ${route == "/" ? "menu-open" : ""}`}>
                            <Link href="#" className={`nav-link ${route == "/" ? "active" : ""}`}>
                                <i className="nav-icon fas fa-home"></i>

                                <p>
                                    Dashboard
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>

                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/" className={`nav-link ${route == "/" ? "active" : ""}`}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Inicio</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link to="/profile" className={`nav-link ${route == "/profile" ? "active" : ""}`}>
                                <i className="nav-icon far fa-id-badge"></i>

                                <p>Perfil</p>
                            </Link>
                        </li>

                        {auth && (
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={onLogout}>
                                    <i className="nav-icon fas fa-times"></i>

                                    <p>Cerrar sesión</p>
                                </a>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
