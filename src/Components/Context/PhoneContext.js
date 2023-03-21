import React from 'react';

const PhoneContext = React.createContext();

function PhoneContextProvider(props) {
  const [phone, setPhone] = React.useState('');

  const updatePhone = (newValue) => {
    setPhone(newValue);
  };

  const contextValue = { phone, updatePhone };

  return <PhoneContext.Provider value={contextValue}>{props.children}</PhoneContext.Provider>;
}

export { PhoneContextProvider, PhoneContext };
