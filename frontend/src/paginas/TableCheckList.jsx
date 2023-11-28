import { useEffect, useState } from "react";
import useExtintores from "../hooks/useExtintores";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableCheckList = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");


  const { obtenerChecklistTabla,  checklistCompleto } = useExtintores();
  const handleBuscar = () => {
    if (!fechaInicio || !fechaFin) {
      // Mostrar algún mensaje de error aquí
      toast.warning("Por favor llene ambas fechas", {position: toast.POSITION.TOP_CENTER})
      return;
    }
    obtenerChecklistTabla(fechaInicio, fechaFin);
  };
  useEffect(() => {}, [checklistCompleto]);
  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100">
      <ToastContainer />
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
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-5"
        onClick={handleBuscar}
      >
        Buscar
      </button>

      {checklistCompleto && checklistCompleto.length > 0 && (
        <table className="border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">Código</th>
              <th className="border border-gray-300 px-2 py-1">Marca</th>
              <th className="border border-gray-300 px-2 py-1">Capacidad</th>
              {/* Agrega más columnas según sea necesario */}
            </tr>
          </thead>
          <tbody>
            {checklistCompleto.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-2 py-1">
                  {item.codigo}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {item.marca}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {item.capacidad}
                </td>
                {/* Agrega más celdas según sea necesario */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableCheckList;
