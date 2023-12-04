import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useExtintores from "../hooks/useExtintores";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PRIORIDAD = ["Baja", "Media", "Alta"];
const CHECK = ["Si", "No"];
const CONDICION = ["Buena", "Dañado"];
const ESTADO = ["Pendiente", "Completo"];
const ModalFormularioCheckList = () => {
  const [codigo, setCodigo] = useState("");
  const [obstruido, setObstruido] = useState("");
  const [instrucciones, setInstrucciones] = useState("");
  const [senalamiento, setSenalamiento] = useState("");
  const [manometro, setManometro] = useState("");
  const [sello, setSello] = useState("");
  const [condFisica, setCondFisica] = useState("");
  const [manguera, setMangera] = useState("");
  const [boquilla, setBoquilla] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [fechaUltimaHidrostatica, setFechaUltimaHidrostatica] = useState("");
  const [fechaProximaHidrostatica, setFechaProximaHidrostatica] = useState("");
  const [fechaUltimaRecarga, setFechaUltimaRecarga] = useState("");
  const [fechaProximaRecarga, setFechaProximaRecarga] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [id, setId] = useState("");
  const [estado, setEstado] = useState("");

  const params = useParams();

  const {
    modalFormularioExtintor,
    handleModalExtintor,

    submitCheckList,
    checkList,
  } = useExtintores();

  useEffect(() => {
    if (checkList.id) {
      setId(checkList.id);
      setCodigo(checkList.codigo);
      setObstruido(checkList.obstruido);
      setInstrucciones(checkList.instrucciones);
      setSenalamiento(checkList.senalamiento);
      setManometro(checkList.manometro);
      setSello(checkList.sello);
      setCondFisica(checkList.condFisica);
      setMangera(checkList.manguera);
      setBoquilla(checkList.boquilla);
      setEtiqueta(checkList.etiqueta);
      setPrioridad(checkList.prioridad);
      setFechaUltimaHidrostatica(
        checkList.fechaUltimaHidrostatica?.split("T")[0]
      );
      setFechaProximaHidrostatica(
        checkList.fechaProximaHidrostatica?.split("T")[0]
      );
      setFechaUltimaRecarga(checkList.fechaUltimaRecarga?.split("T")[0]);
      setFechaProximaRecarga(checkList.fechaProximaRecarga?.split("T")[0]);
      setEstado(checkList.estado);
      return;
    }
    setId("");
    setCodigo("");
    setObstruido("");
    setInstrucciones("");
    setSenalamiento("");
    setManometro("");
    setSello("");
    setCondFisica("");
    setMangera("");
    setBoquilla("");
    setEtiqueta("");
    setPrioridad("");
    setFechaUltimaHidrostatica("");
    setFechaProximaHidrostatica("");
    setFechaUltimaRecarga("");
    setFechaProximaRecarga("");
    setEstado("");
  }, [checkList]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [
        codigo,
        obstruido,
        instrucciones,
        senalamiento,
        manometro,
        sello,
        condFisica,
        manguera,
        boquilla,
        etiqueta,
        fechaUltimaHidrostatica,
        fechaProximaHidrostatica,
        fechaUltimaRecarga,
        fechaProximaRecarga,
        prioridad,

        estado,
      ].includes("")
    ) {
      const campos = {
        codigo,
        obstruido,
        instrucciones,
        senalamiento,
        manometro,
        sello,
        condFisica,
        manguera,
        boquilla,
        etiqueta,
        fechaUltimaHidrostatica,
        fechaProximaHidrostatica,
        fechaUltimaRecarga,
        fechaProximaRecarga,

        prioridad,
        estado,
      };
      for (let campo in campos) {
        if (campos[campo] === "") {
          toast.error(`El campo ${campo} es obligatorio`, {
            position: toast.POSITION.BOTTOM_CENTER,
          });

          return;
        }
      }
    }

    await submitCheckList({
      id,
      codigo,
      obstruido,
      instrucciones,
      senalamiento,
      manometro,
      sello,
      condFisica,
      manguera,
      boquilla,
      etiqueta,

      prioridad,
      fechaUltimaHidrostatica,
      fechaProximaHidrostatica,
      fechaUltimaRecarga,
      fechaProximaRecarga,
      extintorId: params.id,
      estado,
    });
    setId("");

    setCodigo("");
    setObstruido("");
    setInstrucciones("");
    setSenalamiento("");
    setManometro("");
    setSello("");
    setCondFisica("");
    setMangera("");
    setBoquilla("");
    setEtiqueta("");

    setPrioridad("");
    setFechaUltimaHidrostatica("");
    setFechaProximaHidrostatica("");
    setFechaUltimaRecarga("");
    setFechaProximaRecarga("");
    setEstado("");
  };

  return (
    <Transition.Root show={modalFormularioExtintor} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalExtintor}
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
                  onClick={handleModalExtintor}
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
                  >
                    {id ? "Editar CheckList" : "Crear CheckList"}
                    Crear CheckList
                  </Dialog.Title>
                  <form className=" m-10 " onSubmit={handleSubmit}>
                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="codigo"
                      >
                        Codigo CheckList
                      </label>
                      <input
                        type="text"
                        id="codigo"
                        placeholder="Codigo del checklist"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                      />
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="obstruido"
                      >
                        Obstruido
                      </label>
                      <select
                        id="obstruido"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={obstruido}
                        onChange={(e) => setObstruido(e.target.value)}
                      >
                        <option value="">Selecionar</option>

                        {CHECK.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="instrucciones"
                      >
                        Instrucciones
                      </label>
                      <select
                        id="instrucciones"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={instrucciones}
                        onChange={(e) => setInstrucciones(e.target.value)}
                      >
                        <option value="">Selecionar</option>

                        {CHECK.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="senalamiento"
                      >
                        Señalamiento
                      </label>
                      <select
                        id="senalamiento"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={senalamiento}
                        onChange={(e) => setSenalamiento(e.target.value)}
                      >
                        <option value="">Selecionar</option>

                        {CHECK.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="manometro"
                      >
                        Manometro
                      </label>
                      <select
                        id="manometro"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={manometro}
                        onChange={(e) => setManometro(e.target.value)}
                      >
                        <option value="">Selecionar</option>

                        {CHECK.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="sello"
                      >
                        Sello
                      </label>
                      <select
                        id="sello"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sello}
                        onChange={(e) => setSello(e.target.value)}
                      >
                        <option value="">Selecionar</option>

                        {CHECK.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="condicion"
                      >
                        Condicion Fisica
                      </label>
                      <select
                        id="condicion"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={condFisica}
                        onChange={(e) => setCondFisica(e.target.value)}
                      >
                        <option value="">Selecionar</option>

                        {CONDICION.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="manguera"
                      >
                        Manguera
                      </label>
                      <select
                        id="manguera"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={manguera}
                        onChange={(e) => setMangera(e.target.value)}
                      >
                        <option value="">Selecionar</option>

                        {CHECK.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="boquilla"
                      >
                        Boquilla
                      </label>
                      <select
                        id="boquilla"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={boquilla}
                        onChange={(e) => setBoquilla(e.target.value)}
                      >
                        <option value="">Selecionar</option>

                        {CHECK.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="etiqueta"
                      >
                        Etiqueta
                      </label>
                      <select
                        id="etiqueta"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={etiqueta}
                        onChange={(e) => setEtiqueta(e.target.value)}
                      >
                        <option value="">Selecionar</option>

                        {CHECK.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="fecha-ultimo-hidrostatica"
                      >
                        Fecha Ultima Prueba Hidrostatica
                      </label>
                      <input
                        type="date"
                        id="fecha-ultimo-hidrostatica"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fechaUltimaHidrostatica}
                        onChange={(e) =>
                          setFechaUltimaHidrostatica(e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="fecha-proxima-hidrostatica"
                      >
                        Fecha Proxima Prueba Hidrostatica
                      </label>
                      <input
                        type="date"
                        id="fecha-proxima-hidrostatica"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fechaProximaHidrostatica}
                        onChange={(e) =>
                          setFechaProximaHidrostatica(e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="fecha-ultima-recarga"
                      >
                        Fecha Ultima Recarga
                      </label>
                      <input
                        type="date"
                        id="fecha-ultima-recarga"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fechaUltimaRecarga}
                        onChange={(e) => setFechaUltimaRecarga(e.target.value)}
                      />
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="fecha-ultima-recarga"
                      >
                        Fecha Proxima Recarga
                      </label>
                      <input
                        type="date"
                        id="fecha-proxima-recarga"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fechaProximaRecarga}
                        onChange={(e) => setFechaProximaRecarga(e.target.value)}
                      />
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="prioridad"
                      >
                        Prioridad
                      </label>
                      <select
                        type="prioridad"
                        id="nombre"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                      >
                        <option value="">Selecionar</option>

                        {PRIORIDAD.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className=" text-gray-700 uppercase font-bold text-sm"
                        htmlFor="prioridad"
                      >
                        Estado
                      </label>
                      <select
                        type="estado"
                        id="estado"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                      >
                        <option value="">Selecionar</option>

                        {ESTADO.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="submit"
                      className="bg-yellow-500 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                      value={id ? "Editar CheckList" : "Crear CheckList"}
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

export default ModalFormularioCheckList;
