import { useNavigate } from "react-router-dom";

function Opciones() {

    const navigate = useNavigate();

    return (
        <div className="container mt-5 text-center">

            <h1 className="mb-4">Opciones del Sistema</h1>

            <div className="d-grid gap-3 col-6 mx-auto">

                <button className="btn btn-primary btn-lg"
                    onClick={() => navigate("/materias")}
                >
                    Materias
                </button>

                <button className="btn btn-success btn-lg"
                    onClick={() => navigate("/alumnos")}
                >
                    Alumnos
                </button>

                <button className="btn btn-warning btn-lg"
                    onClick={() => navigate("/profesores")}
                >
                    Profesores
                </button>

            </div>

        </div>
    );
}

export default Opciones;