import FormularioColaborador from "../components/FormularioColaborador";
import { useEffect } from "react";
import useExtintores from "../hooks/useExtintores";
import { useParams } from "react-router-dom";

const NuevoColaborador = () => {
  const {obtenerExtintor,extintor,cargando} = useExtintores();
  const params = useParams();

  useEffect(() => 
  {
    obtenerExtintor(params.id);
  }, []);

  if(cargando) return <p>Cargando...</p>

  return (
    <>
      <h1 className=" text-4xl font-black">Añadir Colaborador(a) al extinto {extintor.codigo}r</h1>

      <div className=" mt-10 flex justify-center"></div>
      <FormularioColaborador />
    </>
  );
};

export default NuevoColaborador;
