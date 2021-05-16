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

export const updateReferral = async (req: Request, res: Response) => {
  const { id }: { id?: number } = req.params;
  await prisma.referral.update({
    where: { id: Number(id) },
    data: {
      ...req.body,
    },
  });
  res.sendStatus(200);
};
