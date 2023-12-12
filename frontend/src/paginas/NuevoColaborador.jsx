import FormularioColaborador from "../components/FormularioColaborador";
import { useEffect } from "react";
import useExtintores from "../hooks/useExtintores";

const NuevoColaborador = () => {
  const {
    extintores,
    colaborador,
    agregarColaborador,
    cargando,
    colaboradores
  } = useExtintores();


  useEffect(() => {

  }, [colaboradores]);
  
  const agregarColaboradorAExtintores = async () => {
    try {
      if (colaborador.email) {
        for (const extintor of extintores) {
          await agregarColaborador({
            email: colaborador.email,
            extintorId: extintor.id,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-6">
          Añadir Colaborador(a) a todos los Extintores
        </h1>

        <div className="mt-8">
          <FormularioColaborador />
        </div>

      
          <div className="mt-8 bg-blue-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Resultado:</h2>
            <div className="flex items-center justify-between">
              <p className="text-lg">{colaborador.email}</p>
              <button
                className="bg-blue-500 text-white font-semibold
                 py-2 px-4 rounded-full hover:bg-blue-600"
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
