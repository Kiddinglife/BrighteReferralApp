import { Request, Response } from 'express';
import { PrismaSQLiteReferralRepo } from '../../../prisma/ReferralRepositoryImpl';
import * as ReferralDomain from './domain/Referral';
import * as DDDTypes from './domain/DDDTypes';
import { IReferralRepo, ReferralModel } from './domain/ReferralRepository';

// use injest framework to automatically inject PrismaSQLiteReferralRepo instance
const prismaSQLiteReferralRepo: IReferralRepo = new PrismaSQLiteReferralRepo();

export const getAllReferrals = async (req: Request, res: Response) => {
  let referralModels: ReferralModel[] = [];
  const referrals = <ReferralDomain.Referral[]>await prismaSQLiteReferralRepo.findById();
  for (let referral of referrals) {
    const referralModel: ReferralModel = {
      ...referral,
      id: referral._id,
      givenName: referral.value.givenName.value,
      surName: referral.value.surName.value,
      email: referral.value.email.value,
      phone: referral.value.phone.value,
    };
    referralModels.push(referralModel);
  }
  res.json(referralModels);
};

export const getReferralById = async (req: Request, res: Response) => {
  const { id }: { id?: DDDTypes.ID } = req.params;
  const referral = <ReferralDomain.Referral>await prismaSQLiteReferralRepo.findById(id);
  const referralModel: ReferralModel = {
    ...referral,
    id: referral._id,
    givenName: referral.value.givenName.value,
    surName: referral.value.surName.value,
    email: referral.value.email.value,
    phone: referral.value.phone.value,
  };
  res.json(referralModel);
};

export const postReferral = async (req: Request, res: Response) => {
  console.debug('postReferral req body', req.body);
  const givenName = ReferralDomain.GivenName.create({ value: req.body.givenName });
  const surName = ReferralDomain.SurName.create({ value: req.body.surName });
  const email = ReferralDomain.Email.create({ value: req.body.email });
  const phone = ReferralDomain.Phone.create({ value: req.body.phone });

  let errors: any = {};
  if (givenName.isFailure) {
    errors.givenName = givenName.error;
  }
  if (surName.isFailure) {
    errors.surName = surName.error;
  }
  if (email.isFailure) {
    errors.email = email.error;
  }
  if (phone.isFailure) {
    errors.phone = phone.error;
  }
  if (Object.keys(errors).length > 0) {
    console.error('postReferral', errors);
    res.status(400).json(errors);
    return;
  }

  const newReferral = ReferralDomain.Referral.create({
    givenName: givenName.getValue(),
    surName: surName.getValue(),
    email: email.getValue(),
    phone: phone.getValue(),
  });
  if (newReferral.isFailure) {
    errors.referral = newReferral.error;
  }
  if (Object.keys(errors).length > 0) {
    console.error('postReferral', errors);
    res.status(400).json(errors);
    return;
  }
  const newReferralVal = newReferral.getValue();
  const newReferralId = await prismaSQLiteReferralRepo.save(newReferralVal);
  res.status(200).json(newReferralId);
};

export const deleteReferral = async (req: Request, res: Response) => {
  const { id }: { id?: number } = req.params;
  await prismaSQLiteReferralRepo.save(undefined, id);
  res.sendStatus(200);
};

export const updateReferral = async (req: Request, res: Response) => {
  console.debug('updateReferral req body', req.body);
  const givenName = ReferralDomain.GivenName.create({ value: req.body.givenName });
  const surName = ReferralDomain.SurName.create({ value: req.body.surName });
  const email = ReferralDomain.Email.create({ value: req.body.email });
  const phone = ReferralDomain.Phone.create({ value: req.body.phone });

  let errors: any = {};
  if (givenName.isFailure) {
    errors.givenName = givenName.error;
  }
  if (surName.isFailure) {
    errors.surName = surName.error;
  }
  if (email.isFailure) {
    errors.email = email.error;
  }
  if (phone.isFailure) {
    errors.phone = phone.error;
  }
  if (Object.keys(errors).length > 0) {
    console.error('updateReferral', errors);
    res.status(400).json(errors);
    return;
  }

  const newReferral = ReferralDomain.Referral.create({
    givenName: givenName.getValue(),
    surName: surName.getValue(),
    email: email.getValue(),
    phone: phone.getValue(),
  });
  if (newReferral.isFailure) {
    errors.referral = newReferral.error;
  }
  if (Object.keys(errors).length > 0) {
    console.error('postupdateReferralReferral', errors);
    res.status(400).json(errors);
    return;
  }
  const { id }: { id?: number } = req.params;
  const newReferralVal = newReferral.getValue();
  await prismaSQLiteReferralRepo.save(newReferralVal, id);
  res.sendStatus(200);
};
