import FormularioColaborador from "../components/FormularioColaborador";
import { useEffect } from "react";
import useExtintores from "../hooks/useExtintores";
import { useParams } from "react-router-dom";

const NuevoColaborador = () => {
  const {
    obtenerExtintor,
    extintor,
    cargando,
    colaborador,
    agregarColaborador,
  } = useExtintores();
  const params = useParams();

  useEffect(() => {
    obtenerExtintor(params.id);
  }, []);

  if (cargando) return <p>Cargando...</p>;
  console.log(colaborador);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-6">
          Añadir Colaborador(a) al Extintor {extintor.codigo}
        </h1>

        <div className="mt-8">
          <FormularioColaborador />
        </div>

        {cargando ? (
          <p className="mt-8 text-xl font-semibold">Cargando...</p>
        ) : colaborador.id ? (
          <div className="mt-8 bg-blue-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Resultado:</h2>
            <div className="flex items-center justify-between">
              <p className="text-lg">{colaborador.email}</p>
              <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600"
                onClick={() =>
                  agregarColaborador({
                    email: colaborador.email,
                  })
                }
              >
                Agregar al Extintor
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NuevoColaborador;
