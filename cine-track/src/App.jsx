import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/explorar" element={<h1>Explorar</h1>} />
        <Route path="/buscar" element={<h1>Buscar</h1>} />
        <Route path="/titulo/:id" element={<h1>Detalhes</h1>} />
        <Route path="/minha-lista" element={<h1>Minha Lista</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;