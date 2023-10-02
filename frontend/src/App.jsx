import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import RutaProtegida from "./layouts/RutaProtegida";
import Extintores from "./paginas/Extintores";
import NuevoExtintor from "./paginas/NuevoExtintor";
import Extintor from "./paginas/Extintor";
import EditarExtintor from "./paginas/EditarExtintor";
import { AuthProvider } from "./context/AuthProvider";
import { ExtintoresProvider } from "./context/ExtintoresProvider";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <ExtintoresProvider>
      <Routes>
        <Route path="/" element={<AuthLayout></AuthLayout>}>
          <Route index element={<Login></Login>} />
          <Route path="registrar" element={<Registrar></Registrar>} />
          <Route
            path="olvide-password"
            element={<OlvidePassword></OlvidePassword>}
          />
          <Route
            path="olvide-password/:token"
            element={<NuevoPassword></NuevoPassword>}
          />
          <Route
            path="confirmar/:id"
            element={<ConfirmarCuenta></ConfirmarCuenta>}
          />
        </Route>

        <Route path="/extintores" element={<RutaProtegida></RutaProtegida>}>
          <Route index element={<Extintores></Extintores>} />
          <Route path="crear-extintor" element={<NuevoExtintor></NuevoExtintor>} />
          <Route path=":id" element={<Extintor></Extintor>} />
          <Route path="editar/:id" element={<EditarExtintor></EditarExtintor>} />
        </Route>
      </Routes>
      </ExtintoresProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
