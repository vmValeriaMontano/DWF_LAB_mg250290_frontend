import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function Alumnos() {

  const navigate = useNavigate();

  // ROL
  const rol = localStorage.getItem("rol");

  const [alumnos, setAlumnos] = useState([]);

  const [nombre, setNombre] = useState("");

  const [apellido, setApellido] = useState("");

  const [editando, setEditando] = useState(false);

  const [idAlumno, setIdAlumno] = useState(null);

  // listar
  const obtenerAlumnos = async () => {
    try {

      const response = await api.get("/api/alumnos");

      setAlumnos(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // guardar
  const guardarAlumno = async () => {

    // SOLO ADMIN
    if (rol !== "ADMIN") {
      alert("Solo ADMIN puede guardar");
      return;
    }

    try {

      await api.post("/api/alumnos", {
        nombre,
        apellido,
      });

      limpiarFormulario();

      obtenerAlumnos();

    } catch (error) {
      console.log(error);
    }
  };

  // eliminar
  const eliminarAlumno = async (id) => {

    // SOLO ADMIN
    if (rol !== "ADMIN") {
      alert("Solo ADMIN puede eliminar");
      return;
    }

    try {

      await api.delete(`/api/alumnos/${id}`);

      obtenerAlumnos();

    } catch (error) {
      console.log(error);
    }
  };

  // editar
  const editarAlumno = (alumno) => {

    // SOLO ADMIN
    if (rol !== "ADMIN") {
      alert("Solo ADMIN puede editar");
      return;
    }

    setNombre(alumno.nombre);

    setApellido(alumno.apellido);

    setIdAlumno(alumno.id);

    setEditando(true);
  };

  // actualizar
  const actualizarAlumno = async () => {

    // SOLO ADMIN
    if (rol !== "ADMIN") {
      alert("Solo ADMIN puede actualizar");
      return;
    }

    try {

      await api.put(`/api/alumnos/${idAlumno}`, {
        id: idAlumno,
        nombre,
        apellido,
      });

      limpiarFormulario();

      obtenerAlumnos();

    } catch (error) {
      console.log(error);
    }
  };

  // limpiar
  const limpiarFormulario = () => {

    setNombre("");

    setApellido("");

    setIdAlumno(null);

    setEditando(false);
  };

  useEffect(() => {
    obtenerAlumnos();
  }, []);

  return (
    <div className="container mt-5">

      <div className="card p-4">

        <h2>CRUD Alumnos</h2>

        <input
          type="text"
          className="form-control mt-3"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          className="form-control mt-3"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        {/* BOTÓN */}
        {rol === "ADMIN" && (
          editando ? (
            <button
              className="btn btn-warning mt-3"
              onClick={actualizarAlumno}
            >
              Actualizar
            </button>
          ) : (
            <button
              className="btn btn-primary mt-3"
              onClick={guardarAlumno}
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
            <th>Apellido</th>

            {rol === "ADMIN" && (
              <th>Acciones</th>
            )}

          </tr>
        </thead>

        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id}>

              <td>{alumno.id}</td>

              <td>{alumno.nombre}</td>

              <td>{alumno.apellido}</td>

              {rol === "ADMIN" && (
                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarAlumno(alumno)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarAlumno(alumno.id)}
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

export default Alumnos;