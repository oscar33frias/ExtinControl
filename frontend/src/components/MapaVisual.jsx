import { useEffect } from "react";
import LAY_OUT_EXTINTORES_PLANTA_1_2023 from "../img/LAY_OUT_EXTINTORES_PLANTA_1_2023.jpg";
import useExtintores from "../hooks/useExtintores";
import extintorMarcador from "../img/extintor-marcador.png";

const MapaVisual = () => {
  const { markers, obtenerPosiciones ,extintores} = useExtintores();
console.log("extintores" ,extintores)
  useEffect(() => {
    obtenerPosiciones();
  }, []);

  const handleMarkerClick = (id) => {
    const extintorClickeado = extintores.find((extintor) => extintor.posicion === id);
    if(extintorClickeado===undefined) return alert(`No hay extintor en la posicion ${id}`)
    alert(`Clic en el marcador ID: ${id}`);

    const url=`/extintores/${extintorClickeado.id}`
    window.location.href=url
    console.log("extintorClickeado", extintorClickeado);
  };

  return (
    <div style={{ position: "relative", width: "1150px", height: "1000px" }}>
      <h1 className="text-4xl font-bold text-center text-gray-800 mt-8">
        Aquí puedes ver tus extintores
      </h1>{" "}
      <div style={{ width: "100%", height: "100%" }}>
        <img
          src={LAY_OUT_EXTINTORES_PLANTA_1_2023}
          alt="Mapa de la planta"
          style={{ width: "100%", height: "100%" }}
        />
        {markers.map((marker) => (
          <div
            key={marker.id}
            style={{
              position: "absolute",
              left: marker.x - 10, // Ajusta el valor según la ubicación deseada
              top: marker.y + 25, // Ajusta el valor según la ubicación deseada
            }}
          >
            <img
              src={extintorMarcador}
              alt={`Extintor ID: ${marker.id}`}
              style={{
                width: "20px", // Ajusta el tamaño de la imagen del marcador
                height: "20px", // Ajusta el tamaño de la imagen del marcador
                cursor: "pointer", // Cambia el cursor al hacer clic en un marcador
              }}
              onClick={() => handleMarkerClick(marker.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapaVisual;
