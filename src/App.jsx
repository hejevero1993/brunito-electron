import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";

import Navbar from "./components/Navbar";
import Aside from "./components/Aside";

function AppContent() {
    const location = useLocation();
    const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

    if (hideNavbar) {
        return (
            <>
                <div className="hold-transition login-page">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="wrapper">
                    <Navbar />

                    <Aside />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/contact" element={<Home />} />
                    </Routes>
                </div>
            </>
        );
    }
}

function App() {
    // useEffect(() => {
    //     console.log(window.env);
    // }, []);

    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;

