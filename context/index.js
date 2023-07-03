import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [headerColor, setHeaderColor] = useState("white");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  return (
    <AppContext.Provider
      value={{
        headerColor,
        setHeaderColor,
        menuIsOpen,
        setMenuIsOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
