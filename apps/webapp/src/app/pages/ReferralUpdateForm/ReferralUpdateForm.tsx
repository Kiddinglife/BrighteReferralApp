import React, { useEffect, useState } from 'react';
import ReferralUpdateForm from '../../components/ReferralUpdateForm/ReferralUpdateForm';
import { Referral } from '../../types/referral';
var jsondiffpatch = require('jsondiffpatch');

const ReferralUpdateFormPage: React.FC = (props) => {
  return (
    <ReferralUpdateForm
      currReferral={props['location'].state.currReferral}
      handleSubmit={(values) => {
        console.log('handleSubmit', props['location'].state.currReferral.id, values);
        return fetch(`http://localhost:3333/referrals/${props['location'].state.currReferral.id}?version=1`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }).then((res) => {
          if (res.ok) {
            console.log('handleSubmited');
          }
        });
      }}
    />
  );
};

export { ReferralUpdateFormPage };
