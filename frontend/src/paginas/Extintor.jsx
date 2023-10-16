import { useParams, Link } from "react-router-dom";
import useExtintores from "../hooks/useExtintores";
import { useEffect } from "react";
import ModalFormularioExtintor from "../components/ModalFormularioExtintor";
import ModalEliminarCheckList from "../components/ModalEliminarCheckList";
import CheckList from "../components/CheckList";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
const Extintor = () => {
  const params = useParams();

  const {
    obtenerExtintor,
    extintor,
    cargando,
    handleModalExtintor,
    checkLists,
    alerta,
    colaboradores,
  } = useExtintores();
  useEffect(() => {
    obtenerExtintor(params.id);
  }, []);

  const { codigo } = extintor;
  const { msg } = alerta;

  return cargando ? (
    "..."
  ) : (
    <>
      <div className=" flex justify-between">
        <h1 className=" font-black text-4xl">{codigo}</h1>
        <div className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-transform duration-300 transform hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
          <Link
            to={`/extintores/editar/${params.id}`}
            className="uppercase font-bold"
          >
            Editar
          </Link>
        </div>
      </div>
      <button
        onClick={handleModalExtintor}
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase 
      font-bold bg-green-400 text-white text-center mt-5 flex gap-2
       items-center justify-center hover:bg-green-500 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Nuevo CheckList
      </button>

      <p className=" font-bold text-xl mt-10"> CheckList del Extintor</p>
      {msg && <Alerta alerta={alerta} />}
      <div className=" bg-white shadow mt-10 rounded-lg">
        {checkLists?.length ? (
          checkLists
            .slice()
            .reverse()
            .map((checklist) => (
              <CheckList key={checklist.id} checklist={checklist} />
            ))
        ) : (
          <div className="flex justify-center items-center h-96">
            <h1 className="text-2xl font-bold">No hay CheckList</h1>
          </div>
        )}
      </div>
     
      <ModalFormularioExtintor />
      <ModalEliminarCheckList />
    </>
  );
};

export default Extintor;
