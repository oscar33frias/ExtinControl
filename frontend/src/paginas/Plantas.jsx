import CardPlanta from "../components/CardPlanta";

const Plantas = () => {

  return (
    <>
      <header className="px-4 py-5 bg-gray-900 border-b border-red-600">
        <div className="flex flex-col md:flex-row md:justify-between">
          <h2 className="text-2xl md:text-4xl text-red-500 font-black text-center">
            Extintores ATR
          </h2>
          <button
            className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase 
          font-bold bg-green-400 text-white text-center mt-5 flex gap-2
          items-center justify-center hover:bg-green-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Nuevo Planta
          </button>
        </div>
      </header>
  
      <div className="flex m-40 p-10 justify-center mt-10 flex-wrap">
  <CardPlanta></CardPlanta>
  <CardPlanta></CardPlanta>
  <CardPlanta></CardPlanta>
</div>
      
    </>
  );
};

export default Plantas;
