import { FormularioExtintores } from "../components/FormularioExtintores";
const NuevoExtintor = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-5xl font-black text-center mb-16">
        Registrar Extintor
      </h1>
      <div className="flex justify-center">
        <FormularioExtintores></FormularioExtintores>
      </div>
    </div>
  );
};

export default NuevoExtintor;
