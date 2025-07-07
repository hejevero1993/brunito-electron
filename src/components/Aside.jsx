import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Aside() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await window.api.getData("auth");

            if (data?.loggedIn) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link href="index3.html" className="brand-link">
                <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: "0.8" }} />

                <span className="brand-text font-weight-light">BrunOS</span>
            </Link>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>

                    <div className="info">
                        <Link to={user ? `/` : `/login`} className="d-block" id="username">
                            {user ? user.name : `Iniciar sesión`}
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
                        <li className="nav-item menu-open">
                            <Link href="#" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt"></i>

                                <p>
                                    Dashboard
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>

                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link href="./index.html" className="nav-link active">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Inicio</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link href="pages/widgets.html" className="nav-link">
                                <i className="nav-icon fas fa-th"></i>

                                <p>
                                    Widgets
                                    <span className="right badge badge-danger">New</span>
                                </p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
