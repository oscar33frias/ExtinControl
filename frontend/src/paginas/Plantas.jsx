import { ToastContainer } from "react-toastify";
import ModalFormularioPlanta from "../components/ModalFormularioPlanta";
import useExtintores from "../hooks/useExtintores";
import CardPlanta from "../components/CardPlanta";
import useAuth from "../hooks/useAuth";
import SinPermisos from "./SinPermisos";

const Plantas = () => {
  const { handleModalPlanta, plantas } = useExtintores();
  const { auth } = useAuth();
  console.log(auth);
  return (
    <>
      <ToastContainer />
      <header className="px-4 py-5 bg-gray-900 border-b border-red-600">
        <div className="flex flex-col md:flex-row md:justify-between">
          <h2 className="text-2xl md:text-4xl text-red-500 font-black text-center">
            Extintores ATR
          </h2>
          {auth.rol === 2 && (
            <button
              className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase 
          font-bold bg-green-400 text-white text-center mt-5 flex gap-2
          items-center justify-center hover:bg-green-500 transition-colors"
              onClick={handleModalPlanta}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Nuevo Planta
            </button>
          )}
        </div>
      </header>

      {auth.plantaId !== null ? (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {plantas.map((planta) => (
          <CardPlanta key={planta.id} planta={planta} />
        ))}
      </div>): (<SinPermisos></SinPermisos>)}

      

      

      <ModalFormularioPlanta />

    </>
  );
};

export default Plantas;
