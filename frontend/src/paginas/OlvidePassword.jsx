import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/clienteAxios";
import { ToastContainer,toast } from "react-toastify";
const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email==="" || email.length<6){
    
      toast.warning("El email es obligatorio y debe tener al menos 6 caracteres", {position: toast.POSITION.TOP_CENTER})

      return;
    }
    try {
      const {data}=await clienteAxios.post("/usuarios/olvide-password",{email});
      toast.success(data.msg, {position: toast.POSITION.TOP_CENTER})
    } catch (error) {
     
      toast.error(error.response.data.msg, {position: toast.POSITION.TOP_CENTER})
    }
  };
  const { msg } = alerta;
  return (
    <div className="flex items-center justify-center ">
      <ToastContainer></ToastContainer>
      <div className="w-2/3">
        <h1 className="text-red-600 font-black text-6xl capitalize">
          Recupera tu acceso y accede a tu
          <span className="text-yellow-700"> extintores</span>
        </h1>
        {msg && <Alerta alerta={alerta} />}
        <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
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
