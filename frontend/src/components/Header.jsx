import { Link } from "react-router-dom";
import useExtintores from "../hooks/useExtintores";
import useAuth from "../hooks/useAuth";
import Busqueda from "./busqueda";
const Header = () => {
  const { handleBuscador, cerrarSesionExtintores } = useExtintores();
  const { cerrarSesionAuth } = useAuth();
  const{auth} = useAuth()
  

  const handleCerrarSesion = () => {
    cerrarSesionExtintores();
    cerrarSesionAuth();
    localStorage.removeItem("token");
  };
  return (
    <header className="px-4 py-5 bg-gray-900 border-b border-red-600">
      <div className="flex flex-col md:flex-row md:justify-between">
        <h2 className="text-2xl md:text-4xl text-red-500 font-black text-center">
          Extintores ATR
        </h2>
        <button
          type="button"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-md mt-4 md:mt-0"
          onClick={handleBuscador}
        >
          Buscar Extintor
        </button>{" "}
      </div>
      <div className="flex flex-col md:flex-row justify-end mt-auto">
        <div className="flex flex-col md:flex-row items-center gap-4 mt-5">
        <Link
            to="/planta"
            className="font-bold uppercase text-red-400 hover:text-red-500"
          >
            PLANTAS
          </Link>
          <Link
            to="/extintores"
            className="font-bold uppercase text-red-400 hover:text-red-500"
          >
            Extintores
          </Link>
          <Link
            to="/extintores/tableCheckList"
            className="font-bold uppercase text-red-400 hover:text-red-500"
          >
            CheckLists
          </Link>
          <Link
            to="/extintores/agregar-puntos-mapa"
            className="font-bold uppercase text-red-400 hover:text-red-500"
          >
            Indicar Posiciones en el Mapa
          </Link>
        

          <Link
            to="/extintores/ver-mapa"
            className="font-bold uppercase text-red-400 hover:text-red-500"
          >
            Ver mapa de extintores 🗺
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-red-600 hover:bg-red-700 p-3 rounded-md uppercase font-bold"
            onClick={handleCerrarSesion}
          >
            Cerrar Sesion
          </button>
          <Busqueda />
        </div>
      </div>
    </header>
  );
};

export default Header;
