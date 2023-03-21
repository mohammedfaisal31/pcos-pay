import { useEffect } from 'react';
import RegisterForm from './RegisterForm.js';
import Typography from '@mui/material/Typography';
function Details(props) {
      useEffect(() => {
            window.addEventListener('beforeunload', handleBeforeUnload);
        
            return () => {
              window.removeEventListener('beforeunload', handleBeforeUnload);
            };
          }, []);
        
          const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
            const confirmationMessage = 'Changes you made may not be saved.';
            if (event.defaultPrevented || window.confirm(confirmationMessage)) {
              //API call
              window.removeEventListener('beforeunload', handleBeforeUnload);
            } else {
              event.returnValue = confirmationMessage;
            }
          };
 
      const handleSubmit = (final_values)=>{
        props.onSubmit(final_values);
  }
  const handleSuccess = (success)=>{
        props.onSuccess(success);
  }
  return <div >
          <Typography>Hi there! Please provide the necessary details below </Typography>
           <RegisterForm onSubmit={handleSubmit} onSuccess={handleSuccess} />
        </div>
}

export default Details;
