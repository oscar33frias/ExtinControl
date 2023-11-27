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
import NuevoColaborador from "./paginas/NuevoColaborador";
import { AuthProvider } from "./context/AuthProvider";
import { ExtintoresProvider } from "./context/ExtintoresProvider";
import MapaPlanta from "./paginas/MapaPlanta";
import MapaPlantaVisual from "./paginas/MapaPlantaVisual";
import TableCheckList from "./paginas/TableCheckList";
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
              <Route
                path="crear-extintor"
                element={<NuevoExtintor></NuevoExtintor>}
              />
              <Route
                path="nuevo-colaborador/"
                element={<NuevoColaborador></NuevoColaborador>}
              />

              <Route path=":id" element={<Extintor></Extintor>} />

              <Route
                path="editar/:id"
                element={<EditarExtintor></EditarExtintor>}
              />

              <Route path="agregar-puntos-mapa" element={<MapaPlanta></MapaPlanta>} />
             
              <Route path="ver-mapa" element={<MapaPlantaVisual></MapaPlantaVisual>} />

              <Route path="tableCheckList" element={<TableCheckList></TableCheckList>} />

            </Route>
          </Routes>
        </ExtintoresProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
