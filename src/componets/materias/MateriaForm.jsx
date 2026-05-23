import { useState } from "react";

function MateriaForm({ onAdd }) {

    const [nombre, setNombre] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        onAdd({ nombre });
        setNombre("");
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3">

            <h3>Agregar Materia</h3>

            <input
                className="form-control"
                placeholder="Nombre de materia"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <button className="btn btn-primary mt-3">
                Guardar
            </button>

        </form>
    );
}

export default MateriaForm;