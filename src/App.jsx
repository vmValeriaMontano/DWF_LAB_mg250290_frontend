import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Opciones from "./pages/Opciones";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/opciones" element={<Opciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;