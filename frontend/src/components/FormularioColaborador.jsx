import { useState } from "react";
import useExtintores from "../hooks/useExtintores";
import Alerta from "./Alerta";
const FormularioColaborador = () => {
  const [email, setEmail] = useState("");

  const { mostrarAlerta, alerta, submitColaborador } = useExtintores();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      mostrarAlerta({
        msg: "El campo email es obligatorio",
        error: true,
      });
      return;
    }
    submitColaborador(email);
  };

  const { msg } = alerta;
  return (
    <form
      className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-gray-700 text-lg font-bold mb-2"
        >
          Email del Colaborador
        </label>
        <input
          type="email"
          id="email"
          placeholder="Correo electrónico"
          className="border-2 w-full py-3 px-4 rounded-lg text-lg placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold py-3 rounded-lg transition duration-300"
      >
        Buscar Colaborador
      </button>
    </form>
  );
};

export default FormularioColaborador;
