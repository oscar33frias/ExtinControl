const Marcadores = ({ markers }) => {
    return (
        <div className="page-container relative">
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="marker absolute" // Clase "absolute" para posicionar de forma absoluta
            style={{ left: `${marker.x}px`, top: `${marker.y}px` }}
          >
            {marker.id}
          </div>
        ))}
      </div>
      
    );
  };

  export default Marcadores;    