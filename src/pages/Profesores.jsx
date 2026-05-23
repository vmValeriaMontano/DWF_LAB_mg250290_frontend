import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function Profesores() {

  const navigate = useNavigate();

  // 🔥 ROL
  const rol = localStorage.getItem("rol");

  const [profesores, setProfesores] = useState([]);

  const [nombre, setNombre] = useState("");

  const [editando, setEditando] = useState(false);

  const [idProfesor, setIdProfesor] = useState(null);

  // listar
  const obtenerProfesores = async () => {
    try {

      const response = await api.get("/api/profesores");

      setProfesores(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // guardar
  const guardarProfesor = async () => {

    // 🔥 SOLO ADMIN
    if (rol !== "ADMIN") {
      alert("Solo ADMIN puede guardar");
      return;
    }

    try {

      await api.post("/api/profesores", {
        nombre,
      });

      limpiarFormulario();

      obtenerProfesores();

    } catch (error) {
      console.log(error);
    }
  };

  // eliminar
  const eliminarProfesor = async (id) => {

    // 🔥 SOLO ADMIN
    if (rol !== "ADMIN") {
      alert("Solo ADMIN puede eliminar");
      return;
    }

    try {

      await api.delete(`/api/profesores/${id}`);

      obtenerProfesores();

    } catch (error) {
      console.log(error);
    }
  };

  // datos para editar
  const editarProfesor = (profesor) => {

    // 🔥 SOLO ADMIN
    if (rol !== "ADMIN") {
      alert("Solo ADMIN puede editar");
      return;
    }

    setNombre(profesor.nombre);

    setIdProfesor(profesor.id);

    setEditando(true);
  };

  // actualizar
  const actualizarProfesor = async () => {

    // 🔥 SOLO ADMIN
    if (rol !== "ADMIN") {
      alert("Solo ADMIN puede actualizar");
      return;
    }

    try {

      await api.put(`/api/profesores/${idProfesor}`, {
        id: idProfesor,
        nombre,
      });

      limpiarFormulario();

      obtenerProfesores();

    } catch (error) {
      console.log(error);
    }
  };

  // limpiar
  const limpiarFormulario = () => {

    setNombre("");

    setIdProfesor(null);

    setEditando(false);
  };

  useEffect(() => {
    obtenerProfesores();
  }, []);

  return (
    <div className="container mt-5">

      <div className="card p-4">

        <h2>CRUD Profesores</h2>

        <input
          type="text"
          className="form-control mt-3"
          placeholder="Nombre del profesor"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        {/* BOTÓN */}
        {rol === "ADMIN" && (
          editando ? (
            <button
              className="btn btn-warning mt-3"
              onClick={actualizarProfesor}
            >
              Actualizar
            </button>
          ) : (
            <button
              className="btn btn-primary mt-3"
              onClick={guardarProfesor}
            >
              Guardar
            </button>
          )
        )}

      </div>

      <table className="table table-striped mt-4">

        <thead>
          <tr>

            <th>ID</th>
            <th>Nombre</th>

            {rol === "ADMIN" && (
              <th>Acciones</th>
            )}

          </tr>
        </thead>

        <tbody>
          {profesores.map((profesor) => (
            <tr key={profesor.id}>

              <td>{profesor.id}</td>

              <td>{profesor.nombre}</td>

              {rol === "ADMIN" && (
                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarProfesor(profesor)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarProfesor(profesor.id)}
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

export default Profesores;