import { createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children, headerRef }) => {
  return (
    <AppContext.Provider
      value={{
        headerRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
