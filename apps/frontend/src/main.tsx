import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHome from "./admin/AdminHome";
import ContinentesPage from "./admin/ContinentesPage";
import PaisesPage from "./admin/PaisesPage";
import CidadesPage from "./admin/CidadesPage";


import App from "./App";
import Sobre from "./pages/Sobre";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sobre" element={<Sobre />} />

        {/* ADMIN */}
      <Route path="/admin" element={<AdminHome />}/>
      <Route path="/admin/continentes" element={<ContinentesPage />}/>
      <Route path="/admin/paises" element={<PaisesPage />} />
      <Route path="/admin/cidades" element={<CidadesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
