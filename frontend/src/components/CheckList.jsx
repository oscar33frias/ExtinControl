import formatearFecha from "../helpers/formatearFecha";
import imagenExtinto from "../img/extintor-preview.png";
import useExtintores from "../hooks/useExtintores";
import useAdmin from "../hooks/useAdmin";
import { useEffect } from "react";

const CheckList = ({ checklist }) => {
  const { handleModalEditarCheckList, handleModalEliminarCheckList } =
    useExtintores();
  const {
    boquilla,
    fechaCheckList,
    condFisica,
    estado,
    etiqueta,

    fechaProximaHidrostatica,
    fechaProximaRecarga,
    fechaUltimaHidrostatica,
    fechaUltimaRecarga,

    instrucciones,
    manguera,
    manometro,
    obstruido,
    prioridad,
    sello,
    senalamiento,
    usuario,
  } = checklist;

  
  const admin = useAdmin();
  return (
    <div className="border p-6 bg-white shadow-lg rounded-xl mb-4">
      <div className="flex justify-between items-start flex-wrap mb-5">
        <div className="flex-grow pr-5">
          <p className="text-3xl font-bold mb-5">
            {formatearFecha(fechaCheckList)}
          </p>
          <div className="grid grid-cols-2 gap-y-3 gap-x-8">
            <p className="text-sm font-bold">
              Obstruido <span className=" text-green-600">{obstruido}</span>
            </p>
            <p className="text-sm font-bold ">
              Instrucciones{" "}
              <span className=" text-green-600">{instrucciones}</span>
            </p>
            <p className="text-sm font-bold ">
              Señalamiento{" "}
              <span className=" text-green-600">{senalamiento}</span>
            </p>
            <p className="text-sm font-bold ">
              Manometro <span className=" text-green-600">{manometro}</span>
            </p>
            <p className="text-sm font-bold  ">
              Sello <span className=" text-green-600">{sello}</span>
            </p>
            <p className="text-sm font-bold ">
              Condicion Fisica{" "}
              <span className=" text-green-600">{condFisica}</span>
            </p>
            <p className="text-sm font-bold ">
              Manguera <span className=" text-green-600">{manguera}</span>
            </p>
            <p className="text-sm font-bold ">
              Boquilla <span className=" text-green-600">{boquilla}</span>
            </p>
            <p className="text-sm font-bold ">
              Etiqueta <span className=" text-green-600">{etiqueta}</span>
            </p>

            <p className="text-sm font-bold ">
              Fecha Del Checklist
              <span className=" text-green-600">
                {" "}
                {formatearFecha(fechaCheckList)}
              </span>
            </p>

            <p className="text-sm font-bold ">
              Próxima Fecha Hidrostática
              <span className=" text-green-600">
                {" "}
                {formatearFecha(fechaProximaHidrostatica)}
              </span>
            </p>

            <p className="text-sm font-bold ">
              Próxima Fecha de Recarga
              <span className=" text-green-600">
                {" "}
                {formatearFecha(fechaProximaRecarga)}
              </span>
            </p>

            <p className="text-sm font-bold ">
              Última Fecha Hidrostática{" "}
              <span className=" text-green-600">
                {" "}
                {formatearFecha(fechaUltimaHidrostatica)}
              </span>
            </p>
            <p className="text-sm font-bold ">
              Última Fecha de Recarga{" "}
              <span className=" text-green-600">
                {" "}
                {formatearFecha(fechaUltimaRecarga)}
              </span>
            </p>
            <p className="text-sm font-bold ">
              Prioridad <span className=" text-green-600">{prioridad}</span>
            </p>
            <p className="text-sm font-bold ">
              Completado por: <span className=" text-blue-600">{usuario}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col mt-5">
          {admin && (
            <div className="flex space-x-3">
              <button
                className="bg-indigo-600 px-5 py-2 text-white uppercase font-semibold text-sm rounded-full shadow-md hover:bg-indigo-700 transition-colors duration-300"
                onClick={() => handleModalEditarCheckList(checklist)}
              >
                Editar
              </button>
              {estado==="Completo" ? (
                <button className="bg-sky-600 px-5 py-2 text-white uppercase font-semibold text-sm rounded-full shadow-md hover:bg-sky-700 transition-colors duration-300">
                  Completa
                </button>
              ) : (
                <button className="bg-gray-600 px-5 py-2 text-white uppercase font-semibold text-sm rounded-full shadow-md hover:bg-gray-700 transition-colors duration-300">
                  Incompleta
                </button>
              )}
              <button
                className="bg-red-600 px-5 py-2 text-white uppercase font-semibold text-sm rounded-full shadow-md hover:bg-red-700 transition-colors duration-300"
                onClick={() => handleModalEliminarCheckList(checklist)}
              >
                Eliminar
              </button>
            </div>
          )}

          <div className="flex justify-center">
            <img
              src={imagenExtinto}
              alt="Descripción de la imagen"
              className="max-w-full h-auto rounded-md shadow mt-10"
              width="100"
              height="100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckList;
