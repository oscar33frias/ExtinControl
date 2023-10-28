import LAY_OUT_EXTINTORES_PLANTA_1_2023 from "../img/LAY_OUT_EXTINTORES_PLANTA_1_2023.jpg";
import useExtintores from "../hooks/useExtintores";
import { useEffect } from "react";
const MapaVisual = () => {
  const { markets, obtenerPosiciones } = useExtintores();

  useEffect(() => {
    obtenerPosiciones();
  }
  , []);

  console.log("los marcadores son",markets);
  return (
    <div style={{ position: "relative", width: "1500px", height: "1400px" }}>
      <h1 className="text-4xl font-bold text-center text-gray-800 mt-8">
        Aquí puedes ver tus
      </h1>{" "}
      <div style={{ width: "100%", height: "100%" }}>
        <img
          src={LAY_OUT_EXTINTORES_PLANTA_1_2023}
          alt="Mapa de la planta"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default MapaVisual;
