import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function Materias() {

  const navigate = useNavigate();

  // 🔥 ROL
  const rol = localStorage.getItem("rol");

  const [materias, setMaterias] = useState([]);
  const [profesores, setProfesores] = useState([]);

  const [nombre, setNombre] = useState("");
  const [profesorId, setProfesorId] = useState("");

  const [editando, setEditando] = useState(false);
  const [idMateria, setIdMateria] = useState(null);

  // listar MATERIAS
  const obtenerMaterias = async () => {
    try {
      const res = await api.get("/api/materias");
      setMaterias(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // listar PROFESORES
  const obtenerProfesores = async () => {
    try {
      const res = await api.get("/api/profesores");
      setProfesores(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // guardar
  const guardarMateria = async () => {

    // 🔥 SOLO ADMIN
    if (rol !== "ADMIN") {
      alert("Solo ADMIN puede guardar");
      return;
    }

    try {

      await api.post("/api/materias", {
        nombre,
        profesor: {
          id: profesorId,
        },
      });

      limpiar();
      obtenerMaterias();

    } catch (error) {
      console.log(error);
    }
  };

  // eliminar
  const eliminarMateria = async (id) => {

    // 🔥 SOLO ADMIN
    if (rol !== "ADMIN") {
      alert("Solo ADMIN puede eliminar");
      return;
    }

    try {

      await api.delete(`/api/materias/${id}`);

      obtenerMaterias();

    } catch (error) {
      console.log(error);
    }
  };

  // editar
  const editarMateria = (m) => {

    // 🔥 SOLO ADMIN
    if (rol !== "ADMIN") {
      alert("Solo ADMIN puede editar");
      return;
    }

    setNombre(m.nombre);
    setIdMateria(m.id);

    setProfesorId(m.profesor?.id || "");

    setEditando(true);
  };

  // actualizar
  const actualizarMateria = async () => {

    // 🔥 SOLO ADMIN
    if (rol !== "ADMIN") {
      alert("Solo ADMIN puede actualizar");
      return;
    }

    try {

      await api.put(`/api/materias/${idMateria}`, {
        id: idMateria,
        nombre,
        profesor: {
          id: profesorId,
        },
      });

      limpiar();
      obtenerMaterias();

    } catch (error) {
      console.log(error);
    }
  };

  // limpiar
  const limpiar = () => {
    setNombre("");
    setProfesorId("");
    setIdMateria(null);
    setEditando(false);
  };

  useEffect(() => {
    obtenerMaterias();
    obtenerProfesores();
  }, []);

  return (
    <div className="container mt-5">

      <div className="card p-4">

        <h2>CRUD Materias</h2>

        {/* NOMBRE */}
        <input
          className="form-control mt-3"
          placeholder="Nombre de materia"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        {/* DROPDOWN PROFESORES */}
        <select
          className="form-control mt-3"
          value={profesorId}
          onChange={(e) => setProfesorId(e.target.value)}
        >

          <option value="">Selecciona un profesor</option>

          {profesores.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}

        </select>

        {/* BOTÓN */}
        {rol === "ADMIN" && (
          editando ? (
            <button
              className="btn btn-warning mt-3"
              onClick={actualizarMateria}
            >
              Actualizar
            </button>
          ) : (
            <button
              className="btn btn-primary mt-3"
              onClick={guardarMateria}
            >
              Guardar
            </button>
          )
        )}

      </div>

      {/* TABLA */}
      <table className="table table-striped mt-4">

        <thead>
          <tr>
            <th>ID</th>
            <th>Materia</th>
            <th>Profesor</th>

            {rol === "ADMIN" && (
              <th>Acciones</th>
            )}

          </tr>
        </thead>

        <tbody>
          {materias.map((m) => (
            <tr key={m.id}>

              <td>{m.id}</td>

              <td>{m.nombre}</td>

              <td>
                {m.profesor ? m.profesor.nombre : "Sin profesor"}
              </td>

              {rol === "ADMIN" && (
                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarMateria(m)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarMateria(m.id)}
                  >
                    Eliminar
                  </button>

                </td>
              )}

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

export default Materias;