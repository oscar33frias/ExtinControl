import React, { useState } from "react";
import useExtintores from "../hooks/useExtintores";
import TablaChecklist from "../components/TablaChecklist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TablaConsulta = () => {
  const { listaChecklist } = useExtintores();
  const [mesSeleccionado, setMesSeleccionado] = useState("");
  const [anioSeleccionado, setAnioSeleccionado] = useState("");
  const [listaFiltrada, setListaFiltrada] = useState([]);

  const handleBuscar = () => {
    // Filtrar la lista de checklist por mes y año
    const checklistFiltrados = listaChecklist.filter((item) => {
      const mesItem = new Date(item.fechaCheckList).getMonth() + 1;
      const anioItem = new Date(item.fechaCheckList).getFullYear();

      const cumpleMes = mesSeleccionado === "" || mesItem.toString() === mesSeleccionado;
      const cumpleAnio = anioSeleccionado === "" || anioItem.toString() === anioSeleccionado;

      return cumpleMes && cumpleAnio;
    });

    // Actualizar la lista filtrada
    setListaFiltrada(checklistFiltrados);
  };
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">CONSULTA TUS CHECKLIST</h1>
      <ToastContainer />

      <div className="mb-4">
        <label htmlFor="mes" className="mr-2">
          Selecciona un mes:
        </label>
        <select
          id="mes"
          className="border p-2 mr-4"
          onChange={(e) => setMesSeleccionado(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>


          {/* Agrega las opciones para los demás meses */}
        </select>

        <label htmlFor="anio" className="mr-2">
          Selecciona un año:
        </label>
        <input
          type="text"
          id="anio"
          className="border p-2"
          placeholder="Todos"
          onChange={(e) => setAnioSeleccionado(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleBuscar}
      >
        Filtrar por Mes y Año
      </button>

      <div className="overflow-x-auto w-full max-h-96 shadow-md sm:rounded-lg mt-4">
        <TablaChecklist listaChecklist={listaFiltrada} />
      </div>
    </div>
  );
};

export default TablaConsulta;
