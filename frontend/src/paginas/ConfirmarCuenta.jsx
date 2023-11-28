import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import { ToastContainer, toast } from "react-toastify";

const ConfirmarCuenta = () => {
  const params = useParams();
  const { id } = params;
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios.get(url);
       
        toast.success(data.msg, {
          position: toast.POSITION.TOP_CENTER,
        });
        setCuentaConfirmada(true);
      } catch (error) {
     
        toast.error(error.response.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        }); 
      }
    };
    confirmarCuenta();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ToastContainer></ToastContainer>
      <h1 className="text-red-600 font-black text-6xl capitalize">
        Confirma tu cuenta y administra tus
        <span className="text-yellow-700"> Extintores</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {cuentaConfirmada && (
          <Link
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
            Inicia sesion
          </Link>
        )}
      </div>
    </div>
  );
};

export default ConfirmarCuenta;
