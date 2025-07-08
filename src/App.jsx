import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";

import Home from "./views/Home";
import About from "./views/About";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";

import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import ContentHeader from "./components/ContentHeader";
import Footer from "./components/Footer";
import AsideRight from "./components/AsideRight";

function AppContent() {
    const redirectRoute = useNavigate();
    const location = useLocation();
    const authRoute = location.pathname === "/login" || location.pathname === "/register";

    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadApp = async () => {
            const auth = await window.api.getData("auth");
            setUser(auth || false);
        };

        loadApp();
    }, []);

    useEffect(() => {
        if (authRoute && user && user.length > 0) {
            redirectRoute("/");
        }
    }, [user, authRoute, redirectRoute]);

    const hanldleLogout = () => {
        window.api.clearData();
        setUser(false);
    };

    if (authRoute) {
        return (
            <>
                <div className="hold-transition login-page">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login onLoginSuccess={() => setUser(true)} />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="wrapper">
                    <Preloader />

                    <Navbar user={user} />

                    <Aside />

                    <div className="content-wrapper">
                        <ContentHeader />

                        <div className="content">
                            <div className="container-fluid">
                                <Routes>
                                    <Route path="/" element={<Home onLogout={hanldleLogout} />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/login" element={<Login onLoginSuccess={() => setUser(true)} />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/contact" element={<Home />} />
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

