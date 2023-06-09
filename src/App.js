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
import Agreement from './Components/Agreement';
import { AgreementContextProvider } from './Components/Context/AgreementContext';
import ProtectedRoutes from './Components/ProtectedRoutes';
import AdminPanel from './Components/AdminPanel';
import ResidentialRateCardPhone from './Components/ResidentialRateCardPhone';
import AgreementPhone from './Components/AgreementPhone';
import AgreementWrapper from './Components/AgreementWrapper';
import TableM from './Components/TableM';

function App() {
  return <div sx={{minHeight: "100vh"}}>
       <AgreementContextProvider>
       <Router>
        <Routes>
          <Route path="/admin" element={<TableM/>}/>
          <Route path="/phone" element={<AgreementPhone/>}/>
          <Route path="/paymentStatus/:transaction_id" element={<PaymentStatus />} />
          <Route path="/agreement" element={<AgreementWrapper/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/" exact element={<> 
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
        </Route>
        </Routes>
        </Router>
        </AgreementContextProvider>
        </div>
}

export default App;
