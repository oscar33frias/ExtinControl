import useExtintores from "../hooks/useExtintores";
import TablaChecklist from "../components/TablaChecklist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TablaConsulta = () => {
  const { listaChecklist } = useExtintores();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">CONSULTA TUS CHECKLIST</h1>
      <ToastContainer />

      <div className="overflow-x-auto w-full max-h-96 shadow-md sm:rounded-lg">
        <TablaChecklist listaChecklist={listaChecklist} />
      </div>
    </div>
  );
};

export default TablaConsulta;
