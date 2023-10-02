import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useExtintores from "../hooks/useExtintores";
import Alerta from "./Alerta";

export const FormularioExtintores = () => {
  const [id, setId] = useState(null); 
  const [codigo, setCodigo] = useState("");
  const [marca, setMarca] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");

  const params = useParams();

  const { mostrarAlerta, alerta, submitExtintor, extintor } = useExtintores();


  useEffect(() => {
    if (params.id && extintor.codigo) {
      setId(extintor.id)
      setCodigo(extintor.codigo);
      setMarca(extintor.marca);
      setCapacidad(extintor.capacidad);
      setFechaCreacion(extintor.fecha_creacion?.split("T")[0]);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([codigo, marca, capacidad, fechaCreacion].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    await submitExtintor({
      id,
      codigo,
      marca,
      capacidad,
      fechaCreacion,
    });

    setId(null);
    setCapacidad("");
    setCodigo("");
    setFechaCreacion("");
    setMarca("");
  };

  const { msg } = alerta;
  return (
    <form
  className="bg-gray-800 py-20 px-5 md:w-1/2 rounded-lg shadow mx-auto"
  onSubmit={handleSubmit}
>
      {msg && <Alerta alerta={alerta} />}
      
      {/* Utilizando rojo para los labels */}
      <div className="mb-5">
        <label
          className="text-red-700 uppercase font-bold text-sm"
          htmlFor="codigo"
        >
          Codigo del Extintor
        </label>
        <input
          type="text"
          id="codigo"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Codigo del Extintor"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
      </div>
      
      <div className="mb-5">
        <label
          className="text-red-700 uppercase font-bold text-sm"
          htmlFor="marca"
        >
          Marca de Extintor
        </label>
        <input
          type="text"
          id="marca"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Marca del Extintor"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-red-700 uppercase font-bold text-sm"
          htmlFor="capacidad"
        >
          Capacidad del Extintor
        </label>
        <input
          type="number"
          id="capacidad"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Capacidad del Extintor"
          value={capacidad}
          onChange={(e) => setCapacidad(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-red-700 uppercase font-bold text-sm"
          htmlFor="fecha-creacion"
        >
          Fecha de Creacion
        </label>
        <input
          type="date"
          id="fecha-creacion"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fechaCreacion}
          onChange={(e) => setFechaCreacion(e.target.value)}
        />
      </div>
      
      {/* Botón con colores de emergencia */}
      <input
        type="submit"
        value={id ? "Actualizar Extintor" : "Agregar Extintor"}
        className="bg-red-600 hover:bg-red-700 w-full p-3 uppercase font-bold text-white rounded cursor-pointer transition-colors"
      />
    </form>
  );
};
