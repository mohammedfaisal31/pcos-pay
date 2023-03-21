import React from 'react';

const NameContext = React.createContext();

function NameContextProvider(props) {
  const [name, setName] = React.useState('');

  const updateName = (newValue) => {
    setName(newValue);
  };

  const contextValue = { name, updateName };

  return <NameContext.Provider value={contextValue}>{props.children}</NameContext.Provider>;
}

export { NameContextProvider, NameContext };
