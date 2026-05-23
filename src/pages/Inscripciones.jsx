import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function Inscripciones() {
  const [inscripciones, setInscripciones] = useState([]);

  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);

  const [alumnoId, setAlumnoId] = useState("");
  const [materiaId, setMateriaId] = useState("");

  // EDIT 
  const [editando, setEditando] = useState(false); //btn dinamico
  const [oldAlumnoId, setOldAlumnoId] = useState("");
  const [oldMateriaId, setOldMateriaId] = useState("");

  // listar 
  const obtenerInscripciones = async () => {
    try {
      const res = await api.get("/api/inscripciones");
      setInscripciones(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerAlumnos = async () => {
    try {
      const res = await api.get("/api/alumnos");
      setAlumnos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerMaterias = async () => {
    try {
      const res = await api.get("/api/materias");
      setMaterias(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // inscribir / actualizar
  const guardar = async () => {
    try {

      if (!alumnoId || !materiaId) {
        alert("Selecciona alumno y materia");
        return;
      }

      //  SI ESTÁ EDITANDO
      if (editando) {
        await api.delete(
          `/api/inscripciones?alumnoId=${oldAlumnoId}&materiaId=${oldMateriaId}`
        );

        setEditando(false);
      }

      //  CREAR NUEVA INSCRIPCIÓN
      await api.post(
        `/api/inscripciones?alumnoId=${alumnoId}&materiaId=${materiaId}`
      );

      limpiar();
      obtenerInscripciones();

    } catch (error) {
      console.log(error);
    }
  };

  // eliminar
  const eliminar = async (aId, mId) => {
    try {
      await api.delete(
        `/api/inscripciones?alumnoId=${aId}&materiaId=${mId}`
      );

      obtenerInscripciones();
    } catch (error) {
      console.log(error);
    }
  };

  // editar 
  const editar = (i) => {
    setAlumnoId(i.alumno.id);
    setMateriaId(i.materia.id);

    setOldAlumnoId(i.alumno.id);
    setOldMateriaId(i.materia.id);

    setEditando(true);
  };

  const limpiar = () => {
    setAlumnoId("");
    setMateriaId("");
  };

  useEffect(() => {
    obtenerInscripciones();
    obtenerAlumnos();
    obtenerMaterias();
  }, []);

  return (
    <div className="container mt-5">

      {/* FORM */}
      <div className="card p-4">

        <h2>CRUD Inscripciones</h2>

        {/* ALUMNOS */}
        <select
          className="form-control mt-3"
          value={alumnoId}
          onChange={(e) => setAlumnoId(e.target.value)}
        >
          <option value="">Selecciona alumno</option>

          {alumnos.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nombre} {a.apellido}
            </option>
          ))}
        </select>

        {/* MATERIAS */}
        <select
          className="form-control mt-3"
          value={materiaId}
          onChange={(e) => setMateriaId(e.target.value)}
        >
          <option value="">Selecciona materia</option>

          {materias.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nombre}
            </option>
          ))}
        </select>

        {/* BOTÓN DINÁMICO */}
        <button
          className={`btn mt-3 ${editando ? "btn-warning" : "btn-primary"}`}
          onClick={guardar}
          disabled={!alumnoId || !materiaId}
        >
          {editando ? "Actualizar inscripción" : "Inscribir"}
        </button>

      </div>

      {/* TABLA */}
      <table className="table table-striped mt-4">

        <thead>
          <tr>
            <th>Alumno</th>
            <th>Materia</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {inscripciones.map((i) => (
            <tr key={`${i.alumno?.id}-${i.materia?.id}`}>

              <td>
                {i.alumno?.nombre ?? "Sin alumno"}{" "}
                {i.alumno?.apellido ?? ""}
              </td>

              <td>
                {i.materia?.nombre ?? "Sin materia"}
              </td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editar(i)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminar(i.alumno.id, i.materia.id)}
                >
                  Eliminar
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Inscripciones;