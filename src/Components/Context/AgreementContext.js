import React from 'react';

const AgreementContext = React.createContext();

function AgreementContextProvider(props) {
  const [proceed, setProceed] = React.useState(false);
  
  const updateProceed =  (newValue) => {
    setProceed(newValue);
};

  const contextValue = { proceed, updateProceed };

  return <AgreementContext.Provider value={contextValue}>{props.children}</AgreementContext.Provider>;
}

export { AgreementContextProvider, AgreementContext };
