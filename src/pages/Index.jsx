import { useNavigate } from "react-router-dom";

function Index() {

    const navigate = useNavigate();

    return (

        <div className="container mt-5 text-center">

            <h1 className="mb-4">Bienvenido al Sistema</h1>

            <div className="d-grid gap-3 col-6 mx-auto">

                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate("/login")}
                >
                    Iniciar Sesión
                </button>

                <button
                    className="btn btn-success btn-lg"
                    onClick={() => navigate("/register")}
                >
                    Registrarse
                </button>

            </div>

        </div>
    );
}

export default Index;