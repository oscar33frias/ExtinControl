import { Link } from "react-router-dom";

const PreviewExtintor = ({ extintor }) => {
  const { id, codigo, marca, capacidad, tipo, ubicacion, posicion, plantaId } = extintor;
  
  return (
    <div className="border-2 border-gray-700 p-5 flex hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 rounded-lg shadow-lg hover:shadow-xl bg-gray-800">
      <div className="flex-grow text-left pr-4">
        <p className="text-white font-semibold mb-2 animate__animated animate__fadeInLeft">{codigo}</p>
        <span className="text-red-500 text-sm uppercase font-bold animate__animated animate__fadeInRight delay-1">{marca}</span>
        <p className="text-white text-sm uppercase  animate__animated animate__fadeInRight delay-1">Capacidad: {capacidad}</p>
        <p className="text-white text-sm uppercase  animate__animated animate__fadeInRight delay-1">Tipo: {tipo}</p>
    

        <p className="text-white text-sm uppercase  animate__animated animate__fadeInRight delay-1">Ubicación: {ubicacion}</p>
        <p className="text-white text-sm uppercase  animate__animated animate__fadeInRight delay-1">Posición: {posicion}</p>
        <p className="text-white text-sm uppercase  animate__animated animate__fadeInRight delay-1">Planta ID: {plantaId}</p>
        </div>
      
      <Link to={`${id}`} className="text-white hover:text-red-500 uppercase text-sm font-bold self-center transition-all duration-300 transform hover:scale-110">
        Ver más &rarr;
      </Link> 
    </div>
  );
};

export default PreviewExtintor;