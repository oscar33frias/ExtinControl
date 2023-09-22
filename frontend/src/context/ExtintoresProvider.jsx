import { useState,createContext } from "react"


const ExtintoresContext = createContext();

const ExtintoresProvider = ({children}) => {
    const [extintores,setExtintores] = useState([])

    return (
        <ExtintoresContext.Provider value={{extintores}}>
            {children}
        </ExtintoresContext.Provider>    
    )
}

export {ExtintoresProvider}
export default ExtintoresContext