import { useNavigate } from "react-router-dom";

function Materias() {

    const navigate = useNavigate();

    return (
        <div className="container mt-5 text-center">

            <h1 className="mb-4">MATERIAS</h1>

            <div className="d-grid gap-3 col-6 mx-auto">

                <button className="btn btn-primary btn-lg"
                    onClick={() => navigate("./componets/materias/MateriaList.jsx")}
                >
                    Lista de Materias
                </button>

                <button className="btn btn-success btn-lg"
                    onClick={() => navigate("./componets/materias/MateriaForm.jsx")}
                >
                    Agregar Materia
                </button>

                <button className="btn btn-warning btn-lg"
                    onClick={() => navigate("./componets/materias/MateriaItem.jsx")}
                >
                    Eliminar Materia
                </button>

            </div>

        </div>
    );
}

export default Materias;