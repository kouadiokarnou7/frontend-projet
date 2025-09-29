import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Connexion from "./pages/connexion";
import AdminLayout from "./composants/admin/layouts/adminlayouts";

import Parametres from "./pages/admin/parametres";
import Eglises from "./pages/admin/eglises";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />

        {/* Routes admin regroupées */}
        <Route path="/admin" element={<AdminLayout />}>
         
          <Route path="parametres" element={<Parametres />} />
          <Route path="Eglises" element={<Eglises />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
