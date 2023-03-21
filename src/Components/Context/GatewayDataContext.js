import React from 'react';

const GatewayDataContext = React.createContext();

function GatewayDataContextProvider(props) {
  const [gatewayData, setgatewayData] = React.useState('');

  const updateGatewayData = (newValue) => {
    setgatewayData(newValue);
  };

  const contextValue = { gatewayData, updateGatewayData };

  return <GatewayDataContext.Provider value={contextValue}>{props.children}</GatewayDataContext.Provider>;
}

export { GatewayDataContextProvider, GatewayDataContext };
