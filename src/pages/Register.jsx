import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const register = async () => {

        try {

            await api.post("/auth/register", {
                username,
                password
            });

            alert("Usuario registrado");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert("Error al registrar");
        }
    };

    return (

        <div className="container mt-5">

            <div className="card p-4">

                <h2>Registro</h2>

                <input
                    type="text"
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
                    className="btn btn-success mt-3"
                    onClick={register}
                >
                    Registrarse
                </button>

            </div>

        </div>
    );
}

export default Register;