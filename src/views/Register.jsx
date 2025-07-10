import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register({ setAuth }) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setConfirmPassword] = useState("");
    const [terms, setTerms] = useState(false);
    const [errors, setErrors] = useState({});

    const handleRegister = async (e) => {
        e.preventDefault();

        setErrors({});

        if (terms == false) {
            setErrors({ terms: "You must accept our terms and conditions." });
            return;
        }

        const data = { name, email, password, password_confirmation };

        const response = await window.api.sendRegisterForm(data);

        if (response) {
            if (response.success) {
                const session = { loggedIn: true, user: response.data.user, token: response.data.token.plainTextToken };

                localStorage.setItem("auth", JSON.stringify(session));

                window.api.setData("auth", session);

                setAuth(session);

                Swal.fire({
                    icon: "success",
                    title: "¡Felicidades!",
                    text: "Felicidades su cuenta ha sido creada exitosamente",
                });

                navigate("/");
            } else {
                if (response.status == 422) {
                    if (response.error.errors) {
                        setErrors(response.error.errors);
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: response.statusText,
                            text: response.message,
                        });
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: response.statusText,
                        text: response.message,
                    });
                }
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Server connection error!",
            });
        }
    };

    return (
        <div className="register-box">
            <div className="register-logo">
                <Link to="/">
                    Brun<b>OS</b>
                </Link>
            </div>

            <div className="card">
                <div className="card-body register-card-body">
                    <p className="login-box-msg">Registrar nueva cuenta</p>

                    <form onSubmit={handleRegister} method="post">
                        <div className="input-group mb-3">
                            <input type="text" className={`form-control ${errors.name ? "border border-danger" : ""}`} placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />

                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-user"></span>
                                </div>
                            </div>
                        </div>

                        {errors.name && <div className="alert bg-danger rounded shadow">{errors.name}</div>}

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

                        <div className="input-group mb-3">
                            <input type="password" className={`form-control ${errors.confirmPassword ? "border border-sanger" : ""}`} placeholder="Repetir contraseña" value={password_confirmation} onChange={(e) => setConfirmPassword(e.target.value)} />

                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>

                        {errors.confirmPassword && <div className="alert bg-danger rounded shadow">{errors.confirmPassword}</div>}

                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="agreeTerms" name="terms" value="agree" onChange={(e) => setTerms(e.target.checked)} checked={terms} />

                                    <label htmlFor="agreeTerms">
                                        Acepto los <Link to="/">Terminos y condiciones</Link>
                                    </label>
                                </div>
                            </div>

                            {errors.terms && <div className="alert bg-danger rounded shadow">{errors.terms}</div>}

                            <div className="col-4">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Continuar
                                </button>
                            </div>
                        </div>
                    </form>

                    <Link to="/login" className="text-center">
                        Ya tengo cuenta
                    </Link>
                </div>
            </div>
        </div>
    );
}
