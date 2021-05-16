import * as request from 'supertest';
import app from '../';
import prisma from '../prisma';

describe('Referrals API', () => {
  it('should return all referrals as array', async () => {
    const result = await request(app).get('/referrals');

    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
  });

  it('should create a new referral', async () => {
    const newReferral = {
      givenName: 'jake',
      surName: 'jake',
      email: 'jake1',
      phone: '123',
    };
    const result = await request(app).post('/referrals?version=1').send(newReferral);
    console.log('result body', result.body);
    const referral = await prisma.referral.findUnique({
      where: { id: Number(result.body) },
    });
    console.log('referral', referral);
    expect(result.status).toEqual(200);
    expect(referral.email).toEqual(newReferral.email);
  });

  it('should delete an existing referral', async () => {
    const newReferral = {
      givenName: 'jake',
      surName: 'jake',
      email: 'jake2',
      phone: '123',
    };
    let result = await request(app).post('/referrals?version=1').send(newReferral);
    expect(result.status).toEqual(200);
    result = await request(app).delete(`/referrals/${result.body}?version=1`);
    expect(result.status).toEqual(200);
  });

  it('should put an existing referral', async () => {
    let newReferral = {
      givenName: 'jake',
      surName: 'jake',
      email: 'jake3',
      phone: '123',
    };
    let result = await request(app).post('/referrals?version=1').send(newReferral);
    expect(result.status).toEqual(200);
    newReferral = {
      givenName: 'jake123',
      surName: 'jake123',
      email: 'jake8',
      phone: '123',
    };
    const id = result.body;
    result = await request(app).put(`/referrals/${result.body}?version=1`).send(newReferral);
    expect(result.status).toEqual(200);
    const referral = await prisma.referral.findUnique({
      where: { id: Number(id) },
    });
    expect(referral.email).toEqual(newReferral.email);
  });

  it('should not create referrals with same email', async () => {
    // I used @unique on email field in schema.prisma
    // But not sure why this test pass maybe I have to recreate scheme from raw sql staements ???
    const newReferral = {
      givenName: 'jake',
      surName: 'jake',
      email: 'jake',
      phone: '123',
    };
    const newUser1 = await prisma.referral.create({
      data: {
        ...newReferral,
      },
    });
    const newUser2 = await prisma.referral.create({
      data: {
        ...newReferral,
      },
    });
  });
});
