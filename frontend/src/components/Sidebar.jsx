import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <p className="text-xl font-bold text-red-600">
        ¡Hola, encargado {auth.nombre}!
      </p>
      <Link
        to="crear-extintor"
        className="bg-yellow-500 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Registrar Extintor
      </Link>
    </aside>
  );
};

export default Sidebar;
