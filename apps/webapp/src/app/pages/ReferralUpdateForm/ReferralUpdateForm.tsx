import React from 'react';
import ReferralUpdateForm from '../../components/ReferralUpdateForm/ReferralUpdateForm';
import { updatedDiff } from 'deep-object-diff';

const ReferralUpdateFormPage: React.FC = (props) => {
  return (
    <ReferralUpdateForm
      currReferral={props['location'].state.currReferral}
      handleSubmit={(values) => {
        const diffs = updatedDiff(props['location'].state.currReferral, values);
        if (Object.keys(diffs).length > 0) {
          fetch(`http://localhost:3333/referrals/${props['location'].state.currReferral.id}?version=1`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if (res.ok) {
              console.debug('ReferralUpdateFormPage handleSubmited ok');
            } else {
              res.json().then((error) => {
                console.error('ReferralUpdateFormPage handleSubmited error', error);
              });
            }
          });
        }
      }}
    />
  );
};

export { ReferralUpdateFormPage };
