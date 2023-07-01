import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [headerColor, setHeaderColor] = useState("#fff");

  return (
    <AppContext.Provider value={{ headerColor, setHeaderColor }}>
      {children}
    </AppContext.Provider>
  );
};
