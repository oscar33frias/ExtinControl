import React from "react";
import LAY_OUT_EXTINTORES_PLANTA_1_2023 from "../img/LAY_OUT_EXTINTORES_PLANTA_1_2023.jpg";

const Mapa = () => {
  return (
    <div>
      <img
        src={LAY_OUT_EXTINTORES_PLANTA_1_2023}
        alt="Mapa de la planta"
        style={{ width: "3600px", height: "1200px" }}
      />
    </div>
  );
};

export default Mapa;