import React, { useEffect, useState } from 'react';
import { ReferralTable } from '../../components/ReferralTable';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { Referral } from '../../types/referral';
import style from './ReferralList.module.css';
import { Link } from 'react-router-dom';

const ReferralList: React.FC = (props) => {
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/referrals?version=1')
      .then((r) => r.json())
      .then(setReferrals);
  }, []);

  function deleteReferral(id: number) {
    const newReferrals = referrals.filter((referral) => referral.id != id);
    setReferrals(newReferrals);
  }

  function updateReferral(referral: Referral) {
    const idx = referrals.findIndex((curr) => curr.id === referral.id);
    referrals[idx] = referral;
    setReferrals(referrals);
  }

  return (
    <div className={style.frame}>
      <ReferralTable referrals={referrals} deleteReferral={deleteReferral} updateReferral={updateReferral} />
    </div>
  );
};

export { ReferralList };
