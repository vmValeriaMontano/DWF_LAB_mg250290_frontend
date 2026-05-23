import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function Inscripciones() {
  const navigate = useNavigate();

  const [inscripciones, setInscripciones] = useState([]);

  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);

  const [alumnoId, setAlumnoId] = useState("");
  const [materiaId, setMateriaId] = useState("");

  // EDIT
  const [editando, setEditando] = useState(false);
  const [oldAlumnoId, setOldAlumnoId] = useState("");
  const [oldMateriaId, setOldMateriaId] = useState("");

  // ROL
  const rol = localStorage.getItem("rol");

  // USER LOGEADO
  const username = localStorage.getItem("username");

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

  // guardar
  const guardar = async () => {
    try {

      if (!alumnoId || !materiaId) {
        alert("Selecciona alumno y materia");
        return;
      }

      // USER SOLO PUEDE INSCRIBIRSE A SI MISMO
      if (rol === "USER") {

        const alumnoSeleccionado = alumnos.find(
          (a) => a.id == alumnoId
        );

        if (
          alumnoSeleccionado &&
          alumnoSeleccionado.nombre.toLowerCase() !==
            username.toLowerCase()
        ) {
          alert("Solo puedes inscribirte tú mismo");
          return;
        }
      }

      // ADMIN PUEDE EDITAR
      if (editando && rol === "ADMIN") {

        await api.delete(
          `/api/inscripciones?alumnoId=${oldAlumnoId}&materiaId=${oldMateriaId}`
        );

        setEditando(false);
      }

      // CREAR INSCRIPCIÓN
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
  const eliminar = async (aId, mId, nombreAlumno) => {
    try {

      // USER SOLO ELIMINA LO SUYO
      if (
        rol === "USER" &&
        nombreAlumno.toLowerCase() !== username.toLowerCase()
      ) {
        alert("No puedes eliminar inscripciones de otros");
        return;
      }

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

    // USER NO PUEDE EDITAR
    if (rol === "USER") {
      alert("Los usuarios no pueden editar inscripciones");
      return;
    }

    setAlumnoId(i.alumno.id);
    setMateriaId(i.materia.id);

    setOldAlumnoId(i.alumno.id);
    setOldMateriaId(i.materia.id);

    setEditando(true);
  };

  // limpiar
  const limpiar = () => {
    setAlumnoId("");
    setMateriaId("");

    setOldAlumnoId("");
    setOldMateriaId("");

    setEditando(false);
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

        {/* BOTÓN */}
        <button
          className={`btn mt-3 ${
            editando ? "btn-warning" : "btn-primary"
          }`}
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

                {rol === "ADMIN" && (
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editar(i)}
                  >
                    Editar
                  </button>
                )}

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    eliminar(
                      i.alumno.id,
                      i.materia.id,
                      i.alumno.nombre
                    )
                  }
                >
                  Eliminar
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

      <button
        className="btn btn-success btn-lg"
        onClick={() => navigate("/opciones")}
      >
        Volver a opciones
      </button>

    </div>
  );
}

export default Inscripciones;