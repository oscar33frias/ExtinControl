import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-4 py-5 bg-gray-900 border-b border-red-600">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-red-500 font-black text-center">
            Extintores ATR
        </h2>
        <input
          type="search"
          placeholder="Buscar Extintor por Numero"
          className="rounded-lg lg:w-96 p-2 border border-red-300 bg-gray-800 text-white placeholder-red-300"
        />
      </div>
      <div className="flex justify-end mt-auto">
        <div className="flex items-center gap-4 mt-5">
          <Link to="/extintores" className="font-bold uppercase text-red-400 hover:text-red-500">
            Extintores
          </Link>
          <a href="/mapa" className="font-bold uppercase text-red-400 hover:text-red-500">
            Ver mapa de la planta
          </a>
          <button
            type="button"
            className="text-white text-sm bg-red-600 hover:bg-red-700 p-3 rounded-md uppercase font-bold"
          >
            Cerrar Sesion
          </button>
        </div>
      </div> 
    </header>
  );
};

export default Header;