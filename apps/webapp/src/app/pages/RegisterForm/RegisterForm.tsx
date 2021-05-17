import React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

const RegisterFormPage: React.FC = () => {
  return (
    <RegisterForm
      handleSubmit={(values) => {
        return fetch('http://localhost:3333/referrals?version=1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }).then((res) => {
          if (res.ok) {
            console.debug('RegisterFormPage handleSubmited ok');
          } else {
            console.error('RegisterFormPage handleSubmited error', res.json());
          }
        });
      }}
    />
  );
};

export { RegisterFormPage };
