import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = async () => {

        try {

            const response = await api.post("/auth/login", {
                username,
                password
            });

            // 🔥 GUARDAR TOKEN
            localStorage.setItem("token", response.data.token);

            // 🔥 GUARDAR ROL
            localStorage.setItem("rol", response.data.rol);

            alert("Login correcto");

            // 👉 IR A OPCIONES
            navigate("/opciones");

        } catch (error) {

            console.log(error);

            alert("Error en login");
        }
    };

    return (
        <div className="container mt-5">

            <div className="card p-4">

                <h2>Login</h2>

                <input
                    className="form-control mt-3"
                    placeholder="Usuario"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mt-3"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="btn btn-primary mt-3"
                    onClick={login}
                >
                    Iniciar sesión
                </button>

            </div>

        </div>
    );
}

export default Login;