import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Materias from "./pages/Materias";
import Opciones from "./pages/Opciones";
import Register from "./pages/Register";
import Profesores from "./pages/Profesores";
import Alumnos from "./pages/Alumnos";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/opciones" element={<Opciones />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/profesores" element={<Profesores />} />
        <Route path="/alumnos" element={<Alumnos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;