import { useParams } from "react-router-dom";
import useExtintores from "../hooks/useExtintores";
import { useEffect } from "react";
const Extintor = () => {
  const params = useParams();

  const { obtenerExtintor, extintor } = useExtintores();

  useEffect(() => {
    obtenerExtintor(params.id);
  }, []);

  console.log(extintor);
  const { codigo } = extintor;

  return (
    <div>
      <h1 className=" font-black text-4xl">{codigo}</h1>
    </div>
  );
};

export default Extintor;
