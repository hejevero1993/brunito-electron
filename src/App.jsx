import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";

import Home from "./views/Home";
import About from "./views/About";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";

import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import ContentHeader from "./components/ContentHeader";
import Footer from "./components/Footer";
import AsideRight from "./components/AsideRight";

function AppContent() {
    const redirectRoute = useNavigate();
    const location = useLocation();
    const route = location.pathname;
    const authRoute = location.pathname === "/login" || location.pathname === "/register";

    const [auth, setAuth] = useState(null);
    const [title, setTitle] = useState(null);

    useEffect(() => {
        const loadApp = async () => {
            const authData = await window.api.getData("auth");
            setAuth(authData);
        };

        loadApp();
    }, []);

    useEffect(() => {
        if (authRoute && auth) {
            redirectRoute("/");
        }
    }, [auth, authRoute, redirectRoute]);

    const handleLogout = () => {
        localStorage.removeItem("auth");
        window.api.clearData();
        setAuth(null);
    };

    if (authRoute) {
        return (
            <>
                <div className="hold-transition login-page">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login setAuth={setAuth} />} />
                        <Route path="/register" element={<Register setAuth={setAuth} />} />
                    </Routes>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="wrapper">
                    <Preloader />

                    <Navbar auth={auth} onLogout={handleLogout} />

                    <Aside auth={auth} onLogout={handleLogout} route={route} />

                    <div className="content-wrapper">
                        <ContentHeader title={title} />

                        <div className="content">
                            <div className="container-fluid">
                                <Routes>
                                    <Route path="/" element={<Home auth={auth} />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/login" element={<Login setAuth={setAuth} />} />
                                    <Route path="/register" element={<Register setAuth={setAuth} />} />
                                    <Route path="/contact" element={<Home />} />
                                    <Route path="/profile" element={<Profile setTitle={setTitle} />} />
                                </Routes>
                            </div>
                        </div>
                    </div>

                    <Footer />

                    <AsideRight />
                </div>
            </>
        );
    }
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;

