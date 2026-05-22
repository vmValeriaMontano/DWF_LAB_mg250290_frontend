import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Materias from "./pages/Materias";
import Alumnos from "./pages/Alumnos";
import Profesores from "./pages/Profesores";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Index />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="/profesores" element={<Profesores />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;