import React from 'react';

const EmailContext = React.createContext();

function EmailContextProvider(props) {
  const [email, setEmail] = React.useState('');

  const updateEmail = (newValue) => {
    setEmail(newValue);
  };

  const contextValue = { email, updateEmail };

  return <EmailContext.Provider value={contextValue}>{props.children}</EmailContext.Provider>;
}

export { EmailContextProvider, EmailContext };
