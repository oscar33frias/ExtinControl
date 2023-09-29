import { useState, createContext, useEffect } from "react";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ExtintoresContext = createContext();

const ExtintoresProvider = ({ children }) => {
  const [extintores, setExtintores] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [extintor, setExtintor] = useState({});
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
      setExtintor(data);
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
      }}
    >
      {children}
    </ExtintoresContext.Provider>
  );
};

export { ExtintoresProvider };
export default ExtintoresContext;
