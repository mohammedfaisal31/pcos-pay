import React from 'react';

const ModeContext = React.createContext();

function ModeContextProvider(props) {
  const [mode, setMode] = React.useState('national');

  const updateMode = (newValue) => {
    setMode(newValue);
  };

  const contextValue = { mode, updateMode };

  return <ModeContext.Provider value={contextValue}>{props.children}</ModeContext.Provider>;
}

export { ModeContextProvider, ModeContext };
