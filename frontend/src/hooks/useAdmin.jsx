import useExtintores from "./useExtintores"
import useAuth from "./useAuth";

const useAdmin = () => {
const {extintor}=useExtintores();
const { auth } = useAuth();


return extintor.usuario_id===auth.id;
}

export default useAdmin;