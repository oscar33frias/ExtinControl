import { useState, createContext, useEffect } from "react";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
        setExtintores(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerExtintores();
  }, []);

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

      console.log("extintores filtrados", extintoresFiltrados);

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
    console.log("modal eliminar extintor", modalEliminarCheckList);
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

      //TODO ACTUALIZAR EL DOM
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setModalEliminarCheckList(false);

      setCheckLists(checkLists.filter((check) => check.id !== checklist.id));
      setCheckLists({});
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const submitColaborador = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("email", email);
      const {data} = await clienteAxios.post("/extintores/colaboradores", {email}, config);

      console.log(" submitColaboradores ",data);
    } catch (error) {
      console.log(error);
    }
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
      }}
    >
      {children}
    </ExtintoresContext.Provider>
  );
};

export { ExtintoresProvider };
export default ExtintoresContext;
