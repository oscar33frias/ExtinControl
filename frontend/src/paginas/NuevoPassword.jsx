import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/clienteAxios";
import { ToastContainer, toast } from "react-toastify";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        toast.error(error.response.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.warning("El password debe tener al menos 6 caracteres", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      toast.success(data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      setPasswordModificado(true);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <ToastContainer></ToastContainer>
      <h1 className="text-red-600 font-black text-6xl capitalize">
        Restablece tu password para acceder a tus
        <span className="text-yellow-700"> extintores</span>
      </h1>
      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
            >
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Escribe tu nuevo password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar Password"
            className="bg-red-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-800 transition-colors"
          />
        </form>
      )}
      {passwordModificado && (
        <Link
          to="/"
          className=" block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Inicia sesion
        </Link>
      )}
    </div>
  );
};

export default NuevoPassword;
