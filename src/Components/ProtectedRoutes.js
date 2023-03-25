import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AgreementContext } from './Context/AgreementContext';

export default function ProtectedRoutes() {
  const { proceed } = useContext(AgreementContext);


  return proceed ? <Outlet /> : <Navigate to="/agreement" />;
}
