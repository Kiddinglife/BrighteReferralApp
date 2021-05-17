import * as ReferralDomain from './Referral';
import * as DDDTypes from './DDDTypes';

export interface ReferralModel {
  id?: DDDTypes.ID;
  givenName?: string;
  surName?: string;
  email?: string;
  phone?: string;
  addressLine?: string;
  suburb?: string;
  state?: string;
  postCode?: string;
  country?: string;
}

export interface IReferralRepo {
  findById(id?: DDDTypes.ID): Promise<ReferralDomain.Referral | ReferralDomain.Referral[]>;
  save(referral?: ReferralDomain.Referral, id?: DDDTypes.ID): Promise<DDDTypes.ID>;
}
