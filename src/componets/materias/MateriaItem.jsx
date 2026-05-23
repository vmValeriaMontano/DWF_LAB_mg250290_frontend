function MateriaItem({ materia, onDelete }) {
    return (
        <div className="card p-2 mt-2 d-flex flex-row justify-content-between">

            <div>
                <strong>{materia.nombre}</strong>
            </div>

            <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(materia.id)}
            >
                Eliminar
            </button>

        </div>
    );
}

export default MateriaItem;