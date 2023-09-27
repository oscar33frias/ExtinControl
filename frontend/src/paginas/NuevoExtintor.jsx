import { FormularioExtintores } from "../components/FormularioExtintores";

const NuevoExtintor = () => {
  return (
    <>
      <h1 className=" text-4xl font-black">Registrar Extintor</h1>
      <div className=" mt-10 justify-center">
        <FormularioExtintores></FormularioExtintores>
      </div>
    </>
  );
};

export default NuevoExtintor;
