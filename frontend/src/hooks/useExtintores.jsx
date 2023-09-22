import { useContext } from "react";
import ExtintoresContext from "../context/ExtintoresProvider";
const useExtintores = () => {
    return useContext(ExtintoresContext)
}

export default useExtintores