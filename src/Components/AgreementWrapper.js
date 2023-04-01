import React, { useState, useEffect } from 'react';
import Agreement from './Agreement';
import AgreementPhone from './AgreementPhone';

export default function AgreementWrapper() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1024);
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isDesktop ? <Agreement /> : <AgreementPhone />}
    </div>
  );
}
