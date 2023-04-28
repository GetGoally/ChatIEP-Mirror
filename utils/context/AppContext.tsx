import React, { createContext, useContext, useState } from 'react';

export interface AppContextType {
  isMenuOpen: boolean;
  actions: {
    openMenu: () => void;
    closeMenu: () => void;
    toggleMenu: () => void;
    setS3Path: (path: string) => void;
    setIndex: (index: string) => void;
    setDefaultPromtUsed: () => void;
    setChatLoaded: () => void;
  };
  s3_file_path: string;
  index_name_space: string;
  defaultPromtUsed: boolean;
  chatLoaded: boolean;
}

export const AppContext = createContext<AppContextType>(null as any);

interface Props {
  children: React.ReactNode;
}
export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [s3_file_path, setS3_file_path] = useState('');
  const [index_name_space, setIndexNameSpace] = useState('');
  const [defaultPromtUsed, setDefaultPromtUsed] = useState(false);
  const [chatLoaded, setChatLoaded] = useState(false);

  return (
    <AppContext.Provider
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
          setS3Path: (path) => {
            setS3_file_path(path);
          },
          setIndex: (index) => {
            setIndexNameSpace(index);
          },
          setDefaultPromtUsed: () => {
            setDefaultPromtUsed(true);
          },
          setChatLoaded: () => {
            setChatLoaded(true);
          },
        },
        s3_file_path,
        index_name_space,
        defaultPromtUsed,
        chatLoaded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/*
 * Layout Context as a hook.
 * */
export const useAppContext = () => {
  const context = useContext<AppContextType>(AppContext);
  if (!context) {
    throw new Error(
      `useAppContext must be used within a LayoutContextProvider`,
    );
  }
  return context;
};
