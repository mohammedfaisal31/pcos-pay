import './App.css';
import Register from "./Components/Register.js"
import { EmailContextProvider } from './Components/Context/EmailContext';
import { PhoneContextProvider } from './Components/Context/PhoneContext';
import { NameContextProvider } from './Components/Context/NameContext';
import { OTPPageRefreshContextProvider } from './Components/Context/OTPPageRefreshContext';
import { GatewayDataContextProvider } from './Components/Context/GatewayDataContext';
import { ModeContextProvider } from './Components/Context/ModeContext';
import PaymentStatus from './Components/PaymentStatus';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RateCard from './Components/RateCard';

function App() {
  return <div>
       <Router>
        <Routes>
          <Route path="/paymentStatus/:transaction_id" element={<PaymentStatus />} />
        
          <Route path="/" element={<> 
            <ModeContextProvider>
            <GatewayDataContextProvider>
            <OTPPageRefreshContextProvider>
            <NameContextProvider>
            <PhoneContextProvider>
            <EmailContextProvider>
                <Register />
            </EmailContextProvider>
            </PhoneContextProvider>
            </NameContextProvider>
            </OTPPageRefreshContextProvider> 
            </GatewayDataContextProvider>
            </ModeContextProvider> 
        </>}
        />
        </Routes>
        </Router>
        </div>
}

export default App;
