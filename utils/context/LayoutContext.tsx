import React, { createContext, useContext, useState } from "react";

export interface LayoutContextType {
  isMenuOpen: boolean;
  actions: {
    openMenu: () => void;
    closeMenu: () => void;
    toggleMenu: () => void;
  };
}

export const LayoutContext = createContext<LayoutContextType>(null as any);

interface Props {
  children: React.ReactNode;
}
export const LayoutContextProvider: React.FC<Props> = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <LayoutContext.Provider
      value={{
        isMenuOpen,
        actions: {
          openMenu: () => {
            setMenuOpen(true);
          },
          closeMenu: () => {
            setMenuOpen(false);
          },
          toggleMenu: () => {
            setMenuOpen(!isMenuOpen);
          },
        },
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

/*
 * Layout Context as a hook.
 * */
export const useLayoutContext = () => {
  const context = useContext<LayoutContextType>(LayoutContext);
  if (!context) {
    throw new Error(`useLayoutContext must be used within a LayoutContextProvider`);
  }
  return context;
};
