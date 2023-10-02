import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10 bg-white shadow-lg rounded-lg">
      <p className="text-3xl font-bold text-red-600 mb-6 text">
        ¡Hola, encargado {auth.nombre}!
      </p>
      <Link
        to="crear-extintor"
        className="bg-yellow-500 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg hover:bg-yellow-600 transition-colors duration-300"
      >
        Registrar Extintor
      </Link>
    </aside>
  );
};

export default Sidebar;
