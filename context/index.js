import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children, headerRef }) => {
  const [headerColor, setHeaderColor] = useState("white");
  return (
    <AppContext.Provider
      value={{
        headerRef,
        headerColor,
        setHeaderColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
