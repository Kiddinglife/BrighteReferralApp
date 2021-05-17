import React, { useEffect, useState } from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { Referral } from '../../types/referral';

const RegisterFormPage: React.FC = () => {
  return (
    <RegisterForm
      handleSubmit={(values) => {
        console.log(values);
        return fetch('http://localhost:3333/referrals?version=1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }).then((res) => {
          if (res.ok) {
            console.log('RegisterFormPage handleSubmited ok');
          } else {
            console.log('RegisterFormPage handleSubmited error', res.json());
          }
        });
      }}
    />
  );
};

export { RegisterFormPage };
