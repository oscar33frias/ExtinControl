import { useState, useEffect } from 'react';

const Alerta = ({ alerta }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // El mensaje desaparecerá después de 3 segundos

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta antes
  }, [alerta]);

  return (
    <div
      className={`${
        alerta.error ? "from-red-400 to-red-600" : "from-green-400 to-green-800"
      } bg-gradient-to-br text-center p-4 rounded-xl uppercase text-white font-bold text-sm my-10 shadow-md transform transition-all duration-500 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
