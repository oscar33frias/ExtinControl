import { useState, createContext, useEffect } from "react";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const ExtintoresContext = createContext();

const ExtintoresProvider = ({ children }) => {
  const [extintores, setExtintores] = useState([]);
  const [extintor, setExtintor] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioExtintor, setModalFormularioExtintor] = useState(false);
  const [modalFormularioPlanta, setModalFormularioPlanta] = useState(false);
  const [checkLists, setCheckLists] = useState([]);
  const [checkList, setCheckList] = useState({});
  const [modalEliminarCheckList, setModalEliminarCheckList] = useState(false);
  const [colaborador, setColaborador] = useState({});
  const [colaboradores, setColaboradores] = useState([]);
  const [modalEliminarColaborador, setModalEliminarColaborador] =
    useState(false);
  const [markers, setMarkers] = useState([]);
  const navigate = useNavigate();
  const [haymarkers, setHaymarkers] = useState(false);
  const [buscador, setBuscador] = useState(false);
  const { auth } = useAuth();
  const [listaChecklist, setListaChecklist] = useState({});
  const [plantas, setPlantas] = useState([]);
  const [planta, setPlanta] = useState({});

  useEffect(() => {
    const obtenerExtintores = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.get("/extintores", config);

        const plantaLocal = JSON.parse(localStorage.getItem("plantaLocal"));

        const extintoresPorPlanta = data.extintores.filter(
          (extintor) => extintor.plantaId == plantaLocal.id
        );

        setExtintores(extintoresPorPlanta);
        setColaboradores(data.colaboradores);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    obtenerExtintores();
    obtenerChecklistTabla();
  }, [colaborador, auth, planta]);

  const obtenerPlantas = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get("/plantas", config);

      setPlantas(data); // Asumo que los datos devueltos son un array de plantas, ajusta según tu API
    } catch (error) {
      console.error("Error al obtener plantas:", error);
      // Aquí puedes manejar el error según tus necesidades (por ejemplo, mostrar un mensaje de error)
    }
  };

  useEffect(() => {
    obtenerPlantas();
  }, []);

  useEffect(() => {}, [markers, haymarkers]);

  const submitExtintor = async (extintor) => {
    if (extintor.id) {
      await editarExtintor(extintor);
    } else {
      await nuevoExtintor(extintor);
    }
  };

  const editarExtintor = async (extintor) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/extintores/${extintor.id}`,
        extintor,
        config
      );

      const extintoresActualizados = extintores.map((extintor) =>
        extintor.id === data.id ? data : extintor
      );
      setExtintores(extintoresActualizados);

      toast.success("Extintor editado Correctamente", {
        position: toast.POSITION.TOP_CENTER,
      });

      setTimeout(() => {
        navigate("/extintores");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const nuevoExtintor = async (extintor) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const plantaLocal = JSON.parse(localStorage.getItem("plantaLocal"));
      extintor.plantaId = plantaLocal.id;

      const { data } = await clienteAxios.post("/extintores", extintor, config);
      setExtintores([...extintores, data]);

      toast.success("Extintor creado Correctamente", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        navigate("/extintores");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const obtenerExtintor = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(`/extintores/${id}`, config);
      setExtintor(data.extintor);
      setCheckLists(data.checklists);
      setColaboradores(data.colaboradores);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };
  const eliminarExtintor = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.delete(`/extintores/${id}`, config);

      const extintoresFiltrados = extintores.filter(
        (extintor) => extintor.id !== id
      );

      setExtintores(extintoresFiltrados);

      toast.success(data.msg, { position: toast.POSITION.TOP_CENTER });

      setTimeout(() => {
        navigate("/extintores");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleModalExtintor = () => {
    setModalFormularioExtintor(!modalFormularioExtintor);
    setCheckList({});
  };

  const submitCheckList = async (checklist) => {
    if (checklist.id) {
      await editarCheckList(checklist);
    } else {
      await crearCheckList(checklist);
    }
  };

  const crearCheckList = async (checklist) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      checklist.usuario = auth.nombre;

      const { data } = await clienteAxios.post("/checklist", checklist, config);

      setCheckLists([...checkLists, data]);

      setModalFormularioExtintor(false);
    } catch (error) {
      console.log(error);
    }
  };
  const editarCheckList = async (checklist) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/checklist/${checklist.id}`,
        checklist,
        config
      );

      //TODO ACTUALIZAR EL DOM
      setModalFormularioExtintor(false);

      setCheckLists(
        checkLists.map((check) => (check.id === data.id ? data : check))
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleModalEditarCheckList = (checklist) => {
    setCheckList(checklist);
    setModalFormularioExtintor(true);
  };

  const handleModalEliminarCheckList = (checklist) => {
    setCheckList(checklist);
    setModalEliminarCheckList(!modalEliminarCheckList);
  };

  const eliminarCheckList = async (checklist) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(
        `/checklist/${checklist.id}`,
        config
      );

      toast.success(data.msg, { position: toast.POSITION.TOP_CENTER });
      setModalEliminarCheckList(false);

      setCheckLists(checkLists.filter((check) => check.id !== checklist.id));

      setCheckList({});
      setTimeout(() => {}, 3000);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const submitColaborador = async (email) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/extintores/colaboradores",
        { email },
        config
      );
      setColaborador(data);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setCargando(false);
  };

  const agregarColaborador = async (datos) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/extintores/colaboradores/agregar`,
        datos,
        config
      );

      toast.success(data.msg, { position: toast.POSITION.TOP_CENTER });
      setColaborador({});
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleModalEliminarColaborador = (colaborador) => {
    setColaborador(colaborador);
    setModalEliminarColaborador(!modalEliminarColaborador);
  };

  const eliminarColaborador = async (colaborador) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(
        `/extintores/colaboradores/${colaborador.id}`,
        config
      );

      toast.success(data.msg, { position: toast.POSITION.TOP_CENTER });

      setColaboradores(colaboradores.filter((c) => c.id !== colaborador.id));
      setModalEliminarCheckList(false);

      setColaborador({});

      setTimeout(() => {}, 3000);
    } catch (error) {
      toast.error("Error al eliminar el colaborador", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setModalEliminarColaborador(false);
    }
  };
  const agregarPosicion = async (datos) => {
    try {
      const token = localStorage.getItem("token");
      const plantaId = JSON.parse(localStorage.getItem("plantaLocal")).id;
      console.log(
        "🚀 ~ file: ExtintoresProvider.jsx:411 ~ agregarPosicion ~ id:",
        plantaId
      );

      let posiciones = datos.posiciones;

      posiciones = posiciones.map((posicion) => ({ ...posicion, plantaId }));

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Recorrer el arreglo posiciones y enviar cada objeto individualmente
      for (let i = 0; i < posiciones.length; i++) {
        const { data } = await clienteAxios.post(
          "/extintores/posiciones",
          posiciones[i],
          config
        );

        toast.success(data.msg, { position: toast.POSITION.TOP_CENTER });

        setMarkers([posiciones]);
        setTimeout(() => {}, 3000);
      }
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const obtenerChecklistTabla = async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get("/checklist/tabla/check", config);
      const plantaLocal = JSON.parse(localStorage.getItem("plantaLocal")).id;
      const checkListPorPlanta = data.filter(
        (check) => check.plantaId === plantaLocal
      );
      setListaChecklist(checkListPorPlanta);

      console.log(checkListPorPlanta);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const obtenerPosiciones = async () => {
    try {
      const token = localStorage.getItem("token");
      const plantaId = JSON.parse(localStorage.getItem("plantaLocal")).id;
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(
        "/extintores/obtener/posiciones",
        config
      );
      const posiciones = data.posiciones.filter(
        (posicion) => posicion.plantaId == plantaId
      );
      console.log(
        "🚀 ~ file: ExtintoresProvider.jsx:495 ~ obtenerPosiciones ~ posiciones:",
        posiciones
      );

      setHaymarkers(posiciones.length > 0);

      setMarkers(posiciones);

      return data;
    } catch (error) {
      console.log(error);

      toast.error("error al obtener posiciones", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const eliminarPosiciones = async () => {
    try {
      const token = localStorage.getItem("token");
      const plantaId = JSON.parse(localStorage.getItem("plantaLocal")).id;
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(
        `/extintores/posiciones/eliminar/${plantaId}`,
        config
      );

      setHaymarkers(false);

      toast.success(data.msg, { position: toast.POSITION.TOP_CENTER });

      // Limpiar la lista de marcadores (posiciones)
      setMarkers([]);

      setTimeout(() => {}, 3000);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const handleBuscador = () => {
    setBuscador(!buscador);
  };
  const cerrarSesionExtintores = () => {
    setExtintor({});
    setExtintores([]);
  };
  const handleModalPlanta = () => {
    setModalFormularioPlanta(!modalFormularioPlanta);
  };

  const crearPlanta = async (planta) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/plantas", planta, config);

      setPlantas((prevPlantas) => [...prevPlantas, data]);
      toast.success("Planta Agregada con Éxito", {
        position: toast.POSITION.TOP_CENTER,
      });

      setModalFormularioPlanta(false);
    } catch (error) {
      console.error("Error al crear planta:", error);
      toast.error("Error al crear la planta", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <ExtintoresContext.Provider
      value={{
        extintores,

        submitExtintor,
        obtenerExtintor,
        extintor,
        cargando,
        eliminarExtintor,
        modalFormularioExtintor,
        handleModalExtintor,
        submitCheckList,
        checkLists,
        handleModalEditarCheckList,
        checkList,
        modalEliminarCheckList,
        handleModalEliminarCheckList,
        eliminarCheckList,
        submitColaborador,
        colaborador,
        agregarColaborador,
        colaboradores,
        handleModalEliminarColaborador,
        modalEliminarColaborador,
        eliminarColaborador,
        agregarPosicion,
        markers,
        setMarkers,
        obtenerPosiciones,
        eliminarPosiciones,
        haymarkers,
        handleBuscador,
        buscador,
        cerrarSesionExtintores,
        obtenerChecklistTabla,
        listaChecklist,
        handleModalPlanta,
        modalFormularioPlanta,
        crearPlanta,
        plantas,
        setPlanta,
        planta,
        setListaChecklist
      }}
    >
      {children}
    </ExtintoresContext.Provider>
  );
};

export { ExtintoresProvider };
export default ExtintoresContext;
