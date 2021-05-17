import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllReferrals = async (req: Request, res: Response) => {
  const referrals = await prisma.referral.findMany();

  res.json(referrals);
};

export const getReferralById = async (req: Request, res: Response) => {
  const { id }: { id?: number } = req.params;
  const referral = await prisma.referral.findUnique({
    where: { id: Number(id) },
  });

  res.json(referral);
};

export const postReferral = async (req: Request, res: Response) => {
  const errors = validate(req.body);
  if (Object.keys(errors).length > 0) {
    res.status(400).json(errors);
    return;
  }
  const newUser = await prisma.referral.create({
    data: {
      ...req.body,
    },
  });
  res.status(200).json(newUser.id);
};

export const deleteReferral = async (req: Request, res: Response) => {
  const { id }: { id?: number } = req.params;
  await prisma.referral.delete({
    where: { id: Number(id) },
  });
  res.sendStatus(200);
};

const validate = (values: any) => {
  let errors: any = {};
  if (!values.givenName) {
    errors.givenName = 'givenName Required';
  } else if (values.givenName.length < 2 || values.givenName.length > 200) {
    errors.givenName = 'Required 2 to 200 characters';
  }
  if (!values.surName) {
    errors.surName = 'Required';
  } else if (values.surName.length < 2 || values.surName.length > 200) {
    errors.surName = 'Required 2 to 200 characters';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else {
    const patt = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!patt.test(values.email.toLowerCase())) {
      errors.email = 'Invalid email format';
    }
  }
  if (!values.phone) {
    errors.phone = 'Required';
  } else {
    const patt = /04[\d]{8}/g;
    if (!patt.test(values.phone)) {
      errors.phone = 'Invalid phone number';
    }
  }
  return errors;
};

export const updateReferral = async (req: Request, res: Response) => {
  let errors = validate(req.body);
  if (Object.keys(errors).length > 0) {
    res.status(400).json(errors);
    return;
  }
  const { id }: { id?: number } = req.params;
  await prisma.referral.update({
    where: { id: Number(id) },
    data: {
      ...req.body,
    },
  });
  res.sendStatus(200);
};
