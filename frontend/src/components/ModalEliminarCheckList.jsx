import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useExtintores from "../hooks/useExtintores";
const ModalEliminarCheckList = () => {
  const { handleModalEliminarCheckList, modalEliminarCheckList,eliminarCheckList,checkList ,} =
    useExtintores();

  return (
<Transition.Root show={modalEliminarCheckList} as={Fragment}>
  <Dialog
    as="div"
    className="fixed z-10 inset-0 overflow-y-auto"
    onClose={handleModalEliminarCheckList}
  >
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-lg font-bold text-gray-900">
            ¿Estás seguro de que deseas borrar el CheckList?
          </Dialog.Title>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleModalEliminarCheckList}
          >
            <span className="sr-only">Cerrar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mt-5">
          <div className="flex justify-center">
            <button
              type="button"
              className="w-1/2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => eliminarCheckList(checkList)}
            >
              Eliminar
            </button>
            <button
              type="button"
              className="w-1/2 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md ml-3 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleModalEliminarCheckList}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</Transition.Root>


  );
};

export default ModalEliminarCheckList;
