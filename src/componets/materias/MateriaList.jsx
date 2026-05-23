import MateriaItem from "./MateriaItem";

function MateriaList({ materias, onDelete }) {
    return (
        <div className="mt-4">

            <h3>Lista de Materias</h3>

            {materias.length === 0 && <p>No hay materias</p>}

            {materias.map((m) => (
                <MateriaItem
                    key={m.id}
                    materia={m}
                    onDelete={onDelete}
                />
            ))}

        </div>
    );
}

export default MateriaList;