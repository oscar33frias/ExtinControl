import useExtintores from "./useExtintores"
import useAuth from "./useAuth";

const useAdmin = () => {
const {extintores}=useExtintores();
const { auth } = useAuth();

let todosIguales = true;
for (let i = 0; i < extintores.length; i++) {
  if (extintores[i].usuario_id !== auth.id) {
    todosIguales = false;
    break;
  }
}
return todosIguales;
}

export default useAdmin;