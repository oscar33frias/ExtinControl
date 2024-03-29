import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useExtintores from "../hooks/useExtintores";
import ModalEliminarColaborador from "./ModalEliminarColaborador";
import Colaborador from "./Colaborador";

const Sidebar = () => {
  const { auth } = useAuth();
  const { colaboradores } = useExtintores();

  return (
    <aside className="md:w-80 lg:w-96 px-6 py-8 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-red-600">
          ¡Hola, Encargado {auth.nombre}!
        </h1>
      </div>
      <Link
            to="crear-extintor"
            className="animate-bounce block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Registrar Extintor
          </Link>
      {auth.rol == 2 && (
        <>
         
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
              Colaboradores
            </h2>
            <Link
              to={`/extintores/nuevo-colaborador`}
              className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors"
            >
              Añadir Colaborador
            </Link>
          </div>
          <div className="mt-2">
            <div className="bg-white shadow rounded-md">
              {colaboradores?.length ? (
                colaboradores
                  .slice()
                  .reverse()
                  .map((colaborador) => (
                    <Colaborador
                      key={colaborador.id}
                      colaborador={colaborador}
                    />
                  ))
              ) : (
                <div className="flex justify-center items-center h-48">
                  <h1 className="text-xl font-extrabold text-red-600">
                    No hay Colaboradores
                  </h1>
                </div>
              )}
            </div>
          </div>
        </>
     )} 

      <ModalEliminarColaborador />
    </aside>
  );
};

export default Sidebar;
