import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useExtintores from "../hooks/useExtintores";
import { toast } from "react-toastify";

const ModalFormularioPlanta = () => {
  const [nombrePlanta, setNombrePlanta] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [imagenPlanta, setImagenPlanta] = useState(null);

  const { modalFormularioPlanta, handleModalPlanta, crearPlanta } =
    useExtintores();

    const handleImagenChange = (e) => {
      const file = e.target.files[0];
      setImagenPlanta(file);
    };
    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if ([nombrePlanta, ubicacion, imagenPlanta].includes("")) {
        toast.error("Todos los campos son obligatorios", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        return;
      }
    
      const formData = new FormData();
      formData.append("nombrePlanta", nombrePlanta);
      formData.append("ubicacion", ubicacion);
      formData.append("imagen", imagenPlanta);
    
      crearPlanta(formData);
    
      setNombrePlanta("");
      setUbicacion("");
      setImagenPlanta(null); // Asegúrate de limpiar el estado de la imagen después de enviarla
    };
    

  return (
    <Transition.Root show={modalFormularioPlanta} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalPlanta}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalPlanta}
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
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  ></Dialog.Title>
                  <form className=" m-10 " onSubmit={handleSubmit} encType="multipart/form-data">
                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="nombrePlanta"
                      >
                        Nombre de la Planta
                      </label>
                      <input
                        type="text"
                        id="nombrePlanta"
                        placeholder="Nombre de la planta"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        onChange={(e) => setNombrePlanta(e.target.value)}
                        value={nombrePlanta}
                      />
                    </div>
                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="UbicacionPlanta"
                      >
                        Ubicacion
                      </label>
                      <input
                        type="text"
                        id="UbicacionPlanta"
                        placeholder="Direccion de la planta"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        onChange={(e) => setUbicacion(e.target.value)}
                        value={ubicacion}
                      />
                    </div>
                    <input
                      type="file"
                      id="imagenPlanta"
                      onChange={handleImagenChange}
                      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    />
                    <input
                      type="submit"
                      className="bg-yellow-500 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                      value={"Crear Planta"}
                    />
                   
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFormularioPlanta;
