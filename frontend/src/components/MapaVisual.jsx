import { useEffect } from "react";
import useExtintores from "../hooks/useExtintores";


const MapaVisual = () => {
  const { markers, obtenerPosiciones ,extintores,planta} = useExtintores();
  useEffect(() => {
    obtenerPosiciones();
  }, []);
  const baseURL = import.meta.env.VITE_BACKEND_URL_TRABAJO;

  const plantaLocal=JSON.parse(localStorage.getItem('plantaLocal')).nombreArchivo
  const rutaImagen = `${baseURL}/backend/upload/${plantaLocal}`;

  const handleMarkerClick = (id) => {
    const extintorClickeado = extintores.find((extintor) => extintor.posicion === id);
    if(extintorClickeado===undefined) return alert(`No hay extintor en la posicion ${id}`)
    alert(`Clic en el marcador ID: ${id}`);

    const url=`/extintores/${extintorClickeado.id}`
    window.location.href=url
  };

  return (
    <div style={{ position: "relative", width: "1150px", height: "1000px" }}>
      <h1 className="text-4xl font-bold text-center text-gray-800 mt-8">
        Aquí puedes ver tus extintores
      </h1>{" "}
      <div style={{ width: "100%", height: "100%" }}>
        <img
          src={rutaImagen}
          alt="Mapa de la planta"
          style={{ width: "100%", height: "100%" }}
        />
        {markers.map((marker, index) => (
  <div
    key={index}
    style={{
      position: "absolute",
      left: marker.x-10, // Ajusta el valor según la ubicación deseada
      top: marker.y + 30,
      width: "20px",
      height: "20px",
      backgroundColor: "blue",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      zIndex: 1,
    }}
    onClick={() => handleMarkerClick(marker.id)}

  >
    {index + 1}
  </div>
))}

      </div>
    </div>
  );
};

export default MapaVisual;
