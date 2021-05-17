import { PrismaClient, Referral } from '@prisma/client';
import * as ReferralDomain from '../src/app/referrals/domain/Referral';
import * as DDDTypes from '../src/app/referrals/domain/DDDTypes';
import { IReferralRepo } from '../src/app/referrals/domain/ReferralRepository';

export class PrismaSQLiteReferralRepo implements IReferralRepo {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id?: DDDTypes.ID): Promise<ReferralDomain.Referral | ReferralDomain.Referral[]> {
    return new Promise<ReferralDomain.Referral | ReferralDomain.Referral[]>((resolve, reject) => {
      if (id === undefined) {
        // treat it as findAll
        this.prisma.referral.findMany().then(
          (referralDTOs: Referral[]) => {
            let referrals: ReferralDomain.Referral[] = [];
            for (let referralDTO of referralDTOs) {
              const givenName = ReferralDomain.GivenName.create({ value: referralDTO.givenName });
              const surName = ReferralDomain.SurName.create({ value: referralDTO.surName });
              const email = ReferralDomain.Email.create({ value: referralDTO.email });
              const phone = ReferralDomain.Phone.create({ value: referralDTO.phone });
              // no needs to check sucess or fail becasue we retrive it from db and it must be validate
              const referral = ReferralDomain.Referral.create(
                {
                  givenName: givenName.getValue(),
                  surName: surName.getValue(),
                  email: email.getValue(),
                  phone: phone.getValue(),
                },
                referralDTO.id
              );
              referrals.push(referral.getValue());
            }
            resolve(referrals);
          },
          (reason) => {
            return reject(reason);
          }
        );
      } else {
        this.prisma.referral
          .findUnique({
            where: { id: Number(id) },
          })
          .then(
            (referralDTO: Referral) => {
              const givenName = ReferralDomain.GivenName.create({ value: referralDTO.givenName });
              const surName = ReferralDomain.SurName.create({ value: referralDTO.surName });
              const email = ReferralDomain.Email.create({ value: referralDTO.email });
              const phone = ReferralDomain.Phone.create({ value: referralDTO.phone });
              // no needs to check sucess or fail becasue we retrive it from db and it must be validate
              const referral = ReferralDomain.Referral.create(
                {
                  givenName: givenName.getValue(),
                  surName: surName.getValue(),
                  email: email.getValue(),
                  phone: phone.getValue(),
                },
                referralDTO.id
              );
              return resolve(referral.getValue());
            },
            (reason) => {
              return reject(reason);
            }
          );
      }
    });
  }

  save(referral?: ReferralDomain.Referral, id?: DDDTypes.ID) {
    return new Promise<DDDTypes.ID>((resolve, reject) => {
      if (id !== undefined && referral === undefined) {
        console.log("PrismaSQLiteReferralRepo delete");
        this.prisma.referral
          .delete({
            where: { id: Number(id) },
          })
          .then(
            (referralDTO: Referral) => {
              return resolve(referralDTO.id);
            },
            (reason) => {
              return reject(reason);
            }
          );
      } else if (id === undefined && referral !== undefined) {
        console.log("PrismaSQLiteReferralRepo create");
        this.prisma.referral
          .create({
            data: {
              ...referral.value,
              givenName: referral.value.givenName.value,
              surName: referral.value.surName.value,
              email: referral.value.email.value,
              phone: referral.value.phone.value,
            },
          })
          .then(
            (referralDTO: Referral) => {
              return resolve(referralDTO.id);
            },
            (reason) => {
              return reject(reason);
            }
          );
      } else if (id !== undefined && referral !== undefined) {
        console.log("PrismaSQLiteReferralRepo update", id);
        this.prisma.referral
          .update({
            where: { id: Number(id) },
            data: {
              ...referral.value,
              givenName: referral.value.givenName.value,
              surName: referral.value.surName.value,
              email: referral.value.email.value,
              phone: referral.value.phone.value,
            },
          })
          .then(
            (referralDTO: Referral) => {
              return resolve(referralDTO.id);
            },
            (reason) => {
              return reject(reason);
            }
          );
      }
    });
  }
}
