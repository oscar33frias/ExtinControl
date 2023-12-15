import React from "react";

const TablaChecklist = ({ listaChecklist }) => {
  // Verifica si listaChecklist es undefined o no es un array
  if (!listaChecklist || !Array.isArray(listaChecklist)) {
    // Puedes mostrar un mensaje de error o realizar otra acción adecuada
    return <p>Error: La lista de checklist no es válida.</p>;
  }

  return (
    <div className="relative overflow-x-auto max-h-30 shadow-md sm:rounded-lg">
      <table className="w-full text-xs text-left rtl:text-right text-gray-400 dark:text-gray-100">
        <thead className="text-xs text-gray-400 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3">
              Código
            </th>
            <th scope="col" className="px-6 py-3">
              Marca
            </th>
            <th scope="col" className="px-6 py-3">
              Capacidad
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de Creación
            </th>
            <th scope="col" className="px-6 py-3">
              Posición
            </th>
            <th scope="col" className="px-6 py-3">
              Ubicación
            </th>
            <th scope="col" className="px-6 py-3">
              Tipo
            </th>
            <th scope="col" className="px-6 py-3">
              Planta ID
            </th>
            <th scope="col" className="px-6 py-3">
              Obstruido
            </th>
            <th scope="col" className="px-6 py-3">
              Instrucciones
            </th>
            <th scope="col" className="px-6 py-3">
              Señalamiento
            </th>
            <th scope="col" className="px-6 py-3">
              Manómetro
            </th>
            <th scope="col" className="px-6 py-3">
              Sello
            </th>
            <th scope="col" className="px-6 py-3">
              Condición Física
            </th>
            <th scope="col" className="px-6 py-3">
              Manguera
            </th>
            <th scope="col" className="px-6 py-3">
              Boquilla
            </th>
            <th scope="col" className="px-6 py-3">
              Etiqueta
            </th>
            <th scope="col" className="px-6 py-3">
              Última Hidrostática
            </th>
            <th scope="col" className="px-6 py-3">
              Próxima Hidrostática
            </th>
            <th scope="col" className="px-6 py-3">
              Última Recarga
            </th>
            <th scope="col" className="px-6 py-3">
              Próxima Recarga
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha Checklist
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Usuario
            </th>
            {/* Agrega más encabezados según sea necesario */}
          </tr>
        </thead>
        <tbody>
          {listaChecklist.map((item) => (
            <tr
              key={item.codigo} // Asegúrate de que 'codigo' sea un identificador único
              className="bg-white border-b dark:bg-gray-200 dark:border-gray-700"
            >
              <td className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap dark:text-black">
                {item.codigo}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.marca || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.capacidad || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {new Date(item.fecha_creacion).toLocaleString()}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.posicion || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.ubicacion || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.tipo || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.plantaId || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.obstruido || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.instrucciones || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.senalamiento || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.manometro || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.sello || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.condFisica || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.manguera || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.boquilla || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.etiqueta || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.fechaUltimaHidrostatica
                  ? new Date(item.fechaUltimaHidrostatica).toLocaleString()
                  : "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.fechaProximaHidrostatica
                  ? new Date(item.fechaProximaHidrostatica).toLocaleString()
                  : "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.fechaUltimaRecarga
                  ? new Date(item.fechaUltimaRecarga).toLocaleString()
                  : "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.fechaProximaRecarga
                  ? new Date(item.fechaProximaRecarga).toLocaleString()
                  : "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.fechaCheckList
                  ? new Date(item.fechaCheckList).toLocaleString()
                  : "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.estado || "N/A"}
              </td>
              <td className="px-6 py-4 dark:text-black">
                {item.usuario || "N/A"}
              </td>
              {/* Agrega más celdas según sea necesario */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaChecklist;
