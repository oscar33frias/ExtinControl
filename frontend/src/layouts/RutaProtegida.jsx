import { Outlet,Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {
    const {auth,cargando} = useAuth();
    console.log(auth)  
    if(cargando) return "cargando..."
  return (
    <>
        {auth._id ? <Outlet/>:<Navigate to="/"></Navigate>}
    </>
  )
}

export default RutaProtegida