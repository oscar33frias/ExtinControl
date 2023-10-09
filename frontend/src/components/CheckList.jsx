import formatearFecha from "../helpers/formatearFecha";

const CheckList = ({ checklist }) => {
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


  return (
    <div className="border-b p-5 bg-white shadow-md rounded-lg mb-2">
      <div className="flex justify-between items-start flex-wrap">
        <div className="flex-grow pr-5">
          <p className="text-2xl font-semibold mb-2">{codigo}</p>
  
          <div className="grid grid-cols-2 gap-y-1 gap-x-4">
            <p className="text-sm font-medium">{obstruido}</p>
            <p className="text-sm text-gray-500">{instrucciones}</p>
            <p className="text-sm text-gray-500">{senalamiento}</p>
            <p className="text-sm text-gray-500">{manometro}</p>
            <p className="text-sm text-gray-500">{codigo}</p>
            <p className="text-sm text-gray-500">{sello}</p>
            <p className="text-sm text-gray-500">{condFisica}</p>
            <p className="text-sm text-gray-500">{manguera}</p>
            <p className="text-sm text-gray-500">{boquilla}</p>
            <p className="text-sm text-gray-500">{etiqueta}</p>
            <p className="text-sm text-gray-500">{formatearFecha(fecha_checklist)}</p>
            <p className="text-sm text-gray-500">{prioridad}</p>
          </div>
        </div>
  
        <div className="flex space-x-2 mt-4">
          <button className="bg-indigo-600 px-4 py-2 text-white uppercase font-bold text-sm rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            Editar
          </button>
          {estado ? (
            <button className="bg-sky-600 px-4 py-2 text-white uppercase font-bold text-sm rounded-lg hover:bg-sky-700 transition-colors duration-300">
              Completa
            </button>
          ) : (
            <button className="bg-gray-600 px-4 py-2 text-white uppercase font-bold text-sm rounded-lg hover:bg-gray-700 transition-colors duration-300">
              Incompleta
            </button>
          )}
          <button className="bg-red-600 px-4 py-2 text-white uppercase font-bold text-sm rounded-lg hover:bg-red-700 transition-colors duration-300">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
  
};
export default CheckList;
