import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({});

    const login = async (e) => {
        e.preventDefault();

        const data = { email, password, remember };

        const response = await window.api.sendLoginForm(data);

        if (response.success) {
            localStorage.setItem("token", response.data.token);

            navigate("/");
        } else {
            console.log(response);
            if (response.error.status == 422) {
                if (response.error.errors) {
                    setErrors(response.error.errors);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: response.error.statusText,
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: response.error.statusText,
                });
            }
        }
    };

    return (
        <div className="login-box">
            <div className="login-logo">
                <Link to="/">
                    Brun<b>OS</b>
                </Link>
            </div>

            <div className="card">
                <div className="card-body login-card-body">
                    <p className="login-box-msg">Inicia sesión para comenzar tu sesión</p>

                    <form onSubmit={login} method="post">
                        <div className="input-group mb-3">
                            <input type="email" className={`form-control ${errors.email ? "border border-danger" : ""}`} placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />

                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>

                        {errors.email && <div className="alert bg-danger rounded shadow">{errors.email}</div>}

                        <div className="input-group mb-3">
                            <input type="password" className={`form-control ${errors.password ? "border border-danger" : ""}`} placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />

                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>

                        {errors.password && <div className="alert bg-danger rounded shadow">{errors.password}</div>}

                        <div className="row">
                            <div className="col-7">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)} />

                                    <label htmlFor="remember">Recordarme</label>
                                </div>
                            </div>

                            <div className="col-5">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Iniciar sesión
                                </button>
                            </div>
                        </div>
                    </form>

                    <hr />

                    <p className="mb-1">
                        <Link to="/forgot-password">Olvide mi contraseña</Link>
                    </p>

                    <p className="mb-0">
                        <Link className="text-center" to="/register">
                            Crear una nueva cuenta
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
