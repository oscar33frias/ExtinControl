import { Link ,useNavigate,} from "react-router-dom";
import Image from "../img/extintores-login2.jpeg"; // Reemplaza "tu_imagen.jpg" con la ruta de tu imagen
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/clienteAxios";
import useAuth from "../hooks/useAuth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
 
  const {setAuth} = useAuth();

  const navigate= useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit se está ejecutando");

    if([email,password].includes('')){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    try {
      const {data} = await clienteAxios.post('/usuarios/login', {email, password});
      localStorage.setItem("token", data.token);
      setAuth(data);
      console.log(data);  // Verifica lo que devuelve el servidor
      console.log("Navegando a /extintores");
      navigate('/extintores');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      }); 
      }
    }
  
const {msg} = alerta;

  return (
    <div className="flex">
      {/* Sección de la izquierda con la imagen */}
      <div className="w-2/3">
        <img src={Image} alt="Imagen de extintores" className="h-full w-full" />
      </div>

      {/* Sección de la derecha con el formulario */}
      <div className="w-1/3  p-10">
        {msg && <Alerta alerta={alerta} />}
        <h1 className="text-red-600 font-black text-6xl capitalize">
          Inicia sesión y administra tus
          <span className="text-yellow-700"> extintores</span>
        </h1>
        <form className="my-10" onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password de Registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Iniciar sesión"
            className="bg-red-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-800 transition-colors"
          />
        </form>
        <nav className="lg:flex lg:justify-between">
          <Link
            to="/registrar"
            className="block text-center my-5 text-yellow-500 uppercase text-sm"
          >
            ¿No tienes cuenta? Regístrate
          </Link>
          <Link
            to="/olvide-password"
            className="block text-center my-5 text-yellow-500 uppercase text-sm"
          >
            Olvidé mi password
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Login;
