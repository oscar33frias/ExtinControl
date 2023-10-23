import formatearFecha from "../helpers/formatearFecha";
import imagenExtinto from "../img/extintor-preview.png";
import useExtintores from "../hooks/useExtintores";
import useAdmin from "../hooks/useAdmin";

const CheckList = ({ checklist }) => {
  const { handleModalEditarCheckList, handleModalEliminarCheckList } =
    useExtintores();
  const {
    id,
    codigo,
    obstruido,
    instrucciones,
    senalamiento,
    manometro,
    sello,
    condFisica,
    manguera,
    boquilla,
    etiqueta,
    fecha_checklist,
    prioridad,
    estado,
  } = checklist;

  const admin = useAdmin();
  return (
    <div className="border p-6 bg-white shadow-lg rounded-xl mb-4">
      <div className="flex justify-between items-start flex-wrap mb-5">
        <div className="flex-grow pr-5">
          <p className="text-3xl font-bold mb-5">
            {formatearFecha(fecha_checklist)}
          </p>
          <div className="grid grid-cols-2 gap-y-3 gap-x-8">
            <p className="text-sm font-bold">
              Obstruido <span className=" text-gray-500">{obstruido}</span>
            </p>
            <p className="text-sm font-bold ">
              Instrucciones{" "}
              <span className=" text-gray-500">{instrucciones}</span>
            </p>
            <p className="text-sm font-bold ">
              Señalamiento{" "}
              <span className=" text-gray-500">{senalamiento}</span>
            </p>
            <p className="text-sm font-bold ">
              Manometro <span className=" text-gray-500">{manometro}</span>
            </p>
            <p className="text-sm font-bold  ">
              Sello <span className=" text-gray-500">{sello}</span>
            </p>
            <p className="text-sm font-bold ">
              Condicion Fisica{" "}
              <span className=" text-gray-500">{condFisica}</span>
            </p>
            <p className="text-sm font-bold ">
              Manguera <span className=" text-gray-500">{manguera}</span>
            </p>
            <p className="text-sm font-bold ">
              Boquilla <span className=" text-gray-500">{boquilla}</span>
            </p>
            <p className="text-sm font-bold ">
              Etiqueta <span className=" text-gray-500">{etiqueta}</span>
            </p>
            <p className="text-sm font-bold ">
              Fecha Esperada de Revision
              <span className=" text-gray-500">
                {" "}
                {formatearFecha(fecha_checklist)}
              </span>
            </p>
            <p className="text-sm font-bold ">
              Prioridad <span className=" text-gray-500">{prioridad}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col mt-5">
          {admin && (
            <div className="flex space-x-3">
              <button
                className="bg-indigo-600 px-5 py-2 text-white uppercase font-semibold text-sm rounded-full shadow-md hover:bg-indigo-700 transition-colors duration-300"
                onClick={() => handleModalEditarCheckList(checklist)}
              >
                Editar
              </button>
              {estado ? (
                <button className="bg-sky-600 px-5 py-2 text-white uppercase font-semibold text-sm rounded-full shadow-md hover:bg-sky-700 transition-colors duration-300">
                  Completa
                </button>
              ) : (
                <button className="bg-gray-600 px-5 py-2 text-white uppercase font-semibold text-sm rounded-full shadow-md hover:bg-gray-700 transition-colors duration-300">
                  Incompleta
                </button>
              )}
              <button
                className="bg-red-600 px-5 py-2 text-white uppercase font-semibold text-sm rounded-full shadow-md hover:bg-red-700 transition-colors duration-300"
                onClick={() => handleModalEliminarCheckList(checklist)}
              >
                Eliminar
              </button>
            </div>
          )}

          <div className="flex justify-center">
            <img
              src={imagenExtinto}
              alt="Descripción de la imagen"
              className="max-w-full h-auto rounded-md shadow mt-10"
              width="100"
              height="100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckList;
