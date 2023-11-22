import { useState, createContext, useEffect } from "react";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ExtintoresContext = createContext();

const ExtintoresProvider = ({ children }) => {
  const [extintores, setExtintores] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [extintor, setExtintor] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioExtintor, setModalFormularioExtintor] = useState(false);
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
  const {auth}= useAuth();

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
        setExtintores(data.extintores);
        setColaboradores(data.colaboradores);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerExtintores();
  }, [colaborador,auth]);

  useEffect(() => {
    console.log("🚀 ~ file: ExtintoresProvider.jsx:53 ~ ExtintoresProvider ~ markers:", markers)
  }, [markers, haymarkers]);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };
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

      setAlerta({
        msg: "Extintor editado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/extintores");
      }, 300);
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

      const { data } = await clienteAxios.post("/extintores", extintor, config);
      setExtintores([...extintores, data]);

      setAlerta({
        msg: "Extintor creado correctamente",
        error: false,
      });
      setTimeout(() => {
        setAlerta({});
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

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({}), navigate("/extintores");
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

      const { data } = await clienteAxios.post("/checklist", checklist, config);

      setCheckLists([...checkLists, data]);

      setAlerta({});
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
      setAlerta({});
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

      setAlerta({
        msg: data.msg,
        error: false,
      });
      setModalEliminarCheckList(false);

      setCheckLists(checkLists.filter((check) => check.id !== checklist.id));

      setCheckList({});
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
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
      setAlerta({});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
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
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setColaborador({});
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
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

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setColaboradores(colaboradores.filter((c) => c.id !== colaborador.id));
      setModalEliminarCheckList(false);

      setColaborador({});

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: "Error al eliminar el colaborador",
        error: true,
      });
    } finally {
      setModalEliminarColaborador(false);
    }
  };
  const agregarPosicion = async (datos) => {
    const posiciones = datos.posiciones;

    try {
      const token = localStorage.getItem("token");

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

        setAlerta({
          msg: data.msg,
          error: false,
        });

        setMarkers([posiciones]);
        setTimeout(() => {
          setAlerta({});
        }, 3000);
      }
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const obtenerPosiciones = async () => {
    try {
      const token = localStorage.getItem("token");
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
      const posiciones = data.posiciones;

      setHaymarkers(true);

      setMarkers(posiciones);

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener posiciones");
    }
  };
  const eliminarPosiciones = async () => {
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
        "/extintores/posiciones/eliminar",
        config
      );

      setHaymarkers(false);
      setAlerta({
        msg: data.msg,
        error: false,
      });

      // Limpiar la lista de marcadores (posiciones)
      setMarkers([]);

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const handleBuscador = () => {
    setBuscador(!buscador);
  };
  const cerrarSesionExtintores = () => {
    setExtintor({});
    setExtintores([]);
    setAlerta({});
  };
  return (
    <ExtintoresContext.Provider
      value={{
        extintores,
        mostrarAlerta,
        alerta,
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
      }}
    >
      {children}
    </ExtintoresContext.Provider>
  );
};

export { ExtintoresProvider };
export default ExtintoresContext;
