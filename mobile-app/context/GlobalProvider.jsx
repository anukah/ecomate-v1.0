import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext); 

const GlobalProvider = ({ children }) => {
    const [form ,setForm] = useState({
        name:"",
        vehicleNumber:"",
        nic:""
      })

    return (
        <GlobalContext.Provider
            value={{
                form,
                setForm
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
