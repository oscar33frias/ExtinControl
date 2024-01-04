import FormularioColaborador from "../components/FormularioColaborador";
import { useEffect, useState } from "react";
import useExtintores from "../hooks/useExtintores";

const NuevoColaborador = () => {
  const [rol, setRol] = useState(null);

  const { colaborador, agregarColaborador, colaboradores } = useExtintores();

  useEffect(() => {}, [colaboradores]);

  const agregarColaboradorAExtintores = () => {
    agregarColaborador({ ...colaborador, rol: rol });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-500">
          Añadir Colaborador(a) a todos los Extintores
        </h1>

        <div className="mt-8 border-t-2 border-blue-200 pt-4">
          <FormularioColaborador />
        </div>

        <div className="mt-4">
          <label
            htmlFor=""
            className="flex items-center text-lg font-medium text-gray-700"
          >
            Es administrador:
            <input
              type="checkbox"
              checked={rol}
              onChange={(e) => setRol(e.target.checked?2:null)}
              className="ml-2 h-5 w-5 text-blue-600 rounded transition duration-150 ease-in-out"
            />
          </label>
        </div>

        <div className="mt-8 bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">
            Resultado:
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-lg">{colaborador.email}</p>
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600"
              onClick={agregarColaboradorAExtintores}
            >
              Agregar a todos los Extintores
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoColaborador;
