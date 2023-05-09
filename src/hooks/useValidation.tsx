import React from 'react';
import {useState} from 'react';
import {validateEmail, validatePassword} from '../utils/validators';

interface Validate {
  errorMessage: string;
}

export type Validation = 'email' | 'password' | 'invalid';

export default function (
  value: string,
  validation: 'email' | 'password' | 'invalid' | undefined,
): Validate {
  const [errorMessage, setErrorMessage] = useState('');
  React.useEffect(() => {
    if (validation === 'email') {
      if (!validateEmail(value)) {
        setErrorMessage('Enter a valid email');
      } else {
        setErrorMessage('');
      }
    }
    if (validation === 'password') {
      if (value.length < 8) {
        setErrorMessage('Password field cannot be less than 8 characters');
        return;
      }
      if (!validatePassword(value)) {
        setErrorMessage('Password should contain alphanumeric characters');
      } else {
        setErrorMessage('');
      }
    }
    if (validation === 'invalid') {
      setErrorMessage('Invalid characters not allowed');
    }
  }, [value, validation]);

  return {errorMessage};
}
