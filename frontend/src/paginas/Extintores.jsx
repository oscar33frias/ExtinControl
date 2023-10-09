import useExtintores from "../hooks/useExtintores";
import PreviewExtintor from "../components/PreviewExtintor";


const Extintores = () => {
  const { extintores } = useExtintores();

  return (
    <>
      <h1 className=" text-4xl font-black">Extintores</h1>
      <div className=" bg-white shadow mt-10 rounded-lg p-5">
        {extintores.length ? (
          extintores.map((extintor) => (
            <PreviewExtintor
              key={extintor.id}
              extintor={extintor}
            ></PreviewExtintor>
          ))
        ) : (
          <p className=" text-center text-gray-600 uppercase">
            No hay extintores aun
          </p>
        )}
      </div>
    </>
  );
};

export default Extintores;
