import useExtintores from "../hooks/useExtintores";
import PreviewExtintor from "../components/PreviewExtintor";
import io from "socket.io-client";
import { useEffect } from "react";

let socket;

const Extintores = () => {
  const { extintores } = useExtintores();

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("prueba", extintores);
    
    socket.on("respuesta", (persona) => {
      console.log(persona);
    });
  });

  return (
    <>
      <h1 className=" text-4xl font-black">Extintores</h1>
      <div className=" bg-white shadow mt-10 rounded-lg p-5">
        {extintores.length ? (
          extintores.map((extintor) => (
            <PreviewExtintor
              key={extintor.id}
              extintor={extintor}
            ></PreviewExtintor>
          ))
        ) : (
          <p className=" text-center text-gray-600 uppercase">
            No hay extintores aun
          </p>
        )}
      </div>
    </>
  );
};

export default Extintores;
