import { useState } from "react";
const TableCheckList = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-5">Generar Checklist</h1>
      <div className="flex space-x-4 mb-4">
        <label className="flex flex-col">
          Fecha de inicio:
          <input
            type="date"
            name="fechaInicio"
            className="px-2 py-1 border rounded-md"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          Fecha de fin:
          <input
            type="date"
            name="fechaFin"
            className="px-2 py-1 border rounded-md"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </label>
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md mb-5">
        Buscar
      </button>
      <table className="border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">Columna 1</th>
            <th className="border border-gray-300 px-2 py-1">Columna 2</th>
            <th className="border border-gray-300 px-2 py-1">Columna 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-2 py-1">Dato 1</td>
            <td className="border border-gray-300 px-2 py-1">Dato 2</td>
            <td className="border border-gray-300 px-2 py-1">Dato 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableCheckList;
