import LAY_OUT_EXTINTORES_PLANTA_1_2023 from "../img/LAY_OUT_EXTINTORES_PLANTA_1_2023.jpg";
import { useState } from "react";
import useExtintores from "../hooks/useExtintores";

const Mapa = () => {
  const [markers, setMarkers] = useState(
    [].map((marker, index) => ({
      ...marker,
      id: `Extintor-${index + 1}`, // Asignar ID único
    }))
  );
  const { agregarPosicion } = useExtintores();

  const handleMapClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const marker = { x: offsetX, y: offsetY };
    setMarkers([...markers, marker]);
  };

  const handleGuardarClick = () => {
    agregarPosicion({ posiciones: markers })
      .then(() => {
        console.log("Posiciones guardadas con éxito");
      })
      .catch((error) => {
        console.error("Error al guardar posiciones:", error.message);
      });
  };

  return (
    <div
      style={{ position: "relative", width: "1500px", height: "1400px" }}
      onClick={handleMapClick}
    >
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
            left: marker.x - 6,
            top: marker.y - 9,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "orange",
          }}
        >
          {index + 1}
        </div>
      ))}
      <button
        className="bg-indigo-500 mt-10 text-white py-4 px-6 rounded-full hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
        onClick={handleGuardarClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 inline-block align-text-top"
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

        <span className="inline-block pl-3 text-2xl">Guardar Posiciones</span>
      </button>
    </div>
  );
};

export default Mapa;