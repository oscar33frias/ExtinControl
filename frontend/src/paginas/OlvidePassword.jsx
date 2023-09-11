import { Link } from "react-router-dom";
const OlvidePassword = () => {
  return (
    <div  className="flex items-center justify-center ">
    <div className="w-2/3">
      <h1 className="text-red-600 font-black text-6xl capitalize">
        Recupera tu acceso y accede a tu 
        <span className="text-yellow-700"> extintores</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
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
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
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
          to="/olvide-password"
          className="block text-center my-5 text-yellow-700 uppercase text-sm"
        >
          Olvidé mi contraseña
        </Link>
      </nav>
      </div>
    </div>
  );
};

export default OlvidePassword;
