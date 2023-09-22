import useExtintores from "../hooks/useExtintores";

const Extintores = () => {
  const { extintores } = useExtintores();

  console.log(extintores);
  return (
    <>
      <h1 className=" text-4xl font-black">Extintores</h1>
      <div></div>
    </>
  );
};

export default Extintores;
