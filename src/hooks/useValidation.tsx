import React from 'react';
import {useState} from 'react';
import {validateEmail, validatePassword} from '../utils/validators';
import {useTranslation} from 'react-i18next';

interface Validate {
  errorMessage: string;
}

export type Validation = 'email' | 'password' | 'invalid';

export default function (
  value: string,
  validation: 'email' | 'password' | 'invalid' | undefined,
): Validate {
  const [errorMessage, setErrorMessage] = useState('');
  const {t} = useTranslation();

  React.useEffect(() => {
    if (validation === 'email') {
      if (!validateEmail(value)) {
        setErrorMessage(t('validation.email'));
      } else {
        setErrorMessage('');
      }
    }
    if (validation === 'password') {
      if (value.length < 8) {
        setErrorMessage(t('validation.passwordLength'));
        return;
      }
      if (!validatePassword(value)) {
        setErrorMessage(t('validation.passwordCharacter'));
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
