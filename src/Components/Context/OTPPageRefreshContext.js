import React from 'react';

const OTPPageRefreshContext = React.createContext();

function OTPPageRefreshContextProvider(props) {
  const [otpPageReloadStatus, setOtpPageReloadStatus] = React.useState(false);

  const updateOtpPageReloadStatus = (newValue) => {
    setOtpPageReloadStatus(newValue);
  };

  const contextValue = { otpPageReloadStatus, updateOtpPageReloadStatus };

  return <OTPPageRefreshContext.Provider value={contextValue}>{props.children}</OTPPageRefreshContext.Provider>;
}

export { OTPPageRefreshContextProvider, OTPPageRefreshContext };
