import useExtintores from "../hooks/useExtintores";
const Colaborador = ({ colaborador }) => {
  const { handleModalEliminarColaborador} =
    useExtintores();

  return (
    <div className=" border-b p-2 flex justify-between items-center">
      <div>
        <p className="font-semibold text-lg text-gray-800">
          {colaborador.nombre}
        </p>
        <p className="text-gray-600 text-sm">{colaborador.email}</p>
        <p className="text-black   backdrop:text-sm">{colaborador.rol==2? "Administrador":"Colaborador"}</p>
      </div>

      <div>
        <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white font-semibold"
        onClick={()=>handleModalEliminarColaborador(colaborador)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Colaborador;
