import { AuthProvider } from "./context/AuthContext";

<AuthProvider auth={auth} handleLogout={handleLogout}>
    <div className="wrapper">
        <Preloader />

        <Navbar />

        <Aside />

        <div className="content-wrapper">
            <ContentHeader />

            <div className="content">
                <div className="container-fluid">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/contact" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </div>
    </div>
</AuthProvider>;
