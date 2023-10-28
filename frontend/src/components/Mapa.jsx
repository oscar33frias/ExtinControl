import LAY_OUT_EXTINTORES_PLANTA_1_2023 from "../img/LAY_OUT_EXTINTORES_PLANTA_1_2023.jpg";
import useExtintores from "../hooks/useExtintores";
import Alerta from "./Alerta";

const Mapa = () => {


  const { agregarPosicion, alerta,markers,setMarkers } = useExtintores();

  const handleMapClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const index = markers.length + 1;
    const markerId = index; // Generate unique ID
    const marker = { id: markerId, x: offsetX, y: offsetY };
    setMarkers([...markers, marker]);
  };

  const handleGuardarClick = () => {
    const posiciones = markers.map((marker) => ({
      id: marker.id,
      x: marker.x,
      y: marker.y,
    }));

    console.log("posiciones:", posiciones);

    agregarPosicion({ posiciones }).catch((error) => {
      console.error("Error al guardar posiciones:", error.message);
    });
  };

  const { msg } = alerta;
  return (
    <div
      style={{ position: "relative", width: "1500px", height: "1400px" }}
      onClick={handleMapClick}
    >
      <h1 className="text-4xl font-bold text-center text-gray-800 mt-8">
        Aquí puedes registrar la localización de tus extintores
      </h1>{" "}
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
              left: marker.x - 6,
              top: marker.y+15, // Change to marker.y for exact positioning
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
          className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out transform hover:scale-105 shadow-lg rounded-xl px-6 py-3 flex items-center space-x-3"
          onClick={handleGuardarClick}
        >
          <svg
            className="h-6 w-6 text-white"
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

          <span className="text-xl font-medium text-white">
            Guardar Posiciones
          </span>
        </button>

        {msg && (
          <Alerta
            alerta={alerta}
            className="bg-indigo-100 text-indigo-600 mt-4 p-4 rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default Mapa;
