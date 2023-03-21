import { createContext } from 'react';

export const ProceedWithFormContext = createContext({
  proceedWithFormClicked: false,
  setProceedWithFormClicked: () => {},
});