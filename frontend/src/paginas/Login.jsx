
import { Link } from "react-router-dom";
import Image from "../img/extintores-login2.jpeg"; // Reemplaza "tu_imagen.jpg" con la ruta de tu imagen

const Login = () => {
  return (
    <div className="flex">
      {/* Sección de la izquierda con la imagen */}
      <div className="w-2/3">
        <img src={Image} alt="Imagen de extintores" className="h-full w-full" />
      </div>

      {/* Sección de la derecha con el formulario */}
      <div className="w-1/3  p-10">
        <h1 className="text-red-600 font-black text-6xl capitalize">
          Inicia sesión y administra tus
          <span className="text-yellow-700"> extintores</span>
        </h1>
        <form className="my-10">
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
              className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
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
              className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
            />
          </div>

          <input
            type="submit"
            value="Iniciar sesión"
            className="bg-red-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-800 transition-colors"
          />
        </form>
        <nav className="lg:flex lg:justify-between">
          <Link
            to="/registrar"
            className="block text-center my-5 text-yellow-500 uppercase text-sm"
          >
            ¿No tienes cuenta? Regístrate
          </Link>
          <Link
            to="/olvide-password"
            className="block text-center my-5 text-yellow-500 uppercase text-sm"
          >
            Olvidé mi password
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Login;
