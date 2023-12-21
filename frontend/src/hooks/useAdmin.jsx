import useAuth from "./useAuth";

const useAdmin = async () => {
  
  const { auth } = useAuth();

  return await auth.rol === 2;
};

export default useAdmin;