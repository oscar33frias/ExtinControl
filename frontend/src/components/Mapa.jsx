import LAY_OUT_EXTINTORES_PLANTA_1_2023 from "../img/LAY_OUT_EXTINTORES_PLANTA_1_2023.jpg";
import useExtintores from "../hooks/useExtintores";
import Alerta from "./Alerta";
import { useEffect } from "react";

const Mapa = () => {
  const {
    agregarPosicion,
    alerta,
    markers,
    setMarkers,
    obtenerPosiciones,
    eliminarPosiciones,
    haymarkers,
  } = useExtintores();
  useEffect(() => {
    obtenerPosiciones();
  }, []);

  const handleMapClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const index = markers.length + 1;
    const markerId = index; // Generate unique ID
    const marker = { id: markerId, x: offsetX, y: offsetY };
    console.log("marker", marker);
    setMarkers([...markers, marker]);
  };

  const handleGuardarClick = () => {
    const posiciones = markers.map((marker) => ({
      id: marker.id,
      x: marker.x,
      y: marker.y,
    }));

    agregarPosicion({ posiciones }).catch((error) => {
      console.error("Error al guardar posiciones:", error.message);
    });
  };

  const { msg } = alerta;
  return (
    <div
      style={{ position: "relative", width: "1150px", height: "1000px" }}
      onClick={handleMapClick}
    >
      {haymarkers === false ? (
        <>
             {msg && (
            <Alerta
              alerta={alerta}
              className="bg-indigo-100 text-indigo-600 mt-4 p-4 rounded-lg"
            />
          )}
          <h1 className="text-4xl font-bold text-center text-gray-800 mt-8">
            Aquí puedes registrar las posiciones de tus extintores
          </h1>

          <div style={{ width: "100%", height: "100%" }}>
            <img
              src={LAY_OUT_EXTINTORES_PLANTA_1_2023}
              alt="Mapa de la planta"
              style={{ width: "100%", height: "100%" }}
            />

            {markers.map((marker, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: marker.x - 10,
                  top: marker.y+25, // Cambiar a marker.y para un posicionamiento exacto
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "orange",
                }}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white font-medium rounded-md px-4 py-2"
              onClick={handleGuardarClick}
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Guardar Posiciones
            </button>

           
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center text-gray-800 mt-8">
            TU MAPA YA TIENE POSICIONES, ELIMINALAS PARA PODER AGREGAR NUEVAS
          </h1>
          <div className="flex justify-center">
            <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 mt-4"
              onClick={() => {
                eliminarPosiciones();
              }}
            >
              Eliminar
            </button>
          </div>
          
        </>
      )}
 
    </div>
  );
};

export default Mapa;
