import { useState } from "react";
import { Link } from "react-router-dom";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  return (
    <div className="flex items-center justify-center">
      <div className="w-2/3">
        <h1 className="text-red-600 font-black text-6xl capitalize">
          Crea tu cuenta y administra tus
          <span className="text-yellow-700"> extintores</span>
        </h1>
        <form className="my-10 bg-white shadow rounded-lg p-10">
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password de Registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password2"
            >
              Repetir Password
            </label>
            <input
              id="password2"
              type="password"
              placeholder="Repetir tu password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Crear cuenta"
            className="bg-red-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-800 transition-colors"
          />
        </form>
        <nav className="lg:flex lg:justify-between">
          <Link
            to="/"
            className="block text-center my-5 text-yellow-700 uppercase text-sm"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
          <Link
            to="/registrar"
            className="block text-center my-5 text-yellow-700 uppercase text-sm"
          >
            ¿No tienes cuenta? Regístrate
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Registrar;
