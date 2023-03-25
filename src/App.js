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
import { useEffect, useState } from 'react';
import Footer from './Components/Footer';
import NonResidentialRateCard from './Components/NonResidentialRateCard'
import ResidentialRateCard from './Components/ResidentialRateCard'
import Agreement from './Components/Agreement';
import { Outlet,Navigate } from 'react-router-dom';
function App() {
 const [onAgreementProceedClicked , setAgreementProceedClicked] = useState(false);
  const handleOnAgreementProceed = ()=>{
    setAgreementProceedClicked(true);
  }
  return <div sx={{minHeight: "100vh"}}>
       <Router>
        <Routes>
          <Route path="/paymentStatus/:transaction_id" element={<PaymentStatus />} />
          <Route path="/rate" element={<NonResidentialRateCard/>} />
          <Route path="/rate-2" element={<ResidentialRateCard/>} />
          
          <Route path="/agreement" element={<Agreement onAgreementProceedClicked={handleOnAgreementProceed}/>}/>
          
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
        </>
        }
        
        />
      
        </Routes>
        </Router>
          
        </div>
}

export default App;
