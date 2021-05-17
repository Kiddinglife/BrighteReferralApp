import { Entity, ID, Option, Nothing, Result, Value } from './DDDTypes';

/**
 * @desc  those are bussiness constraints that could be updated frequently.
 * @todo  Store in config center service without re-deploying the service
 */
const BC_MINI_FIELD_LENGTH: number = 2;
const BC_MAX_FIELD_LENGTH: number = 200;
const BC_AUS_PHONE_NUMBER: RegExp = /^\D*0(\D*\d){9}\D*$/;
const BC_EMAIL_FORMAT: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * @desc Avoid the potential bug due to typo
 */
export type Address = string;
export type Suburb = string;
export type State = string;
export type PostCode = string;
export type Country = string;

export interface GivenNameProps {
  value: string;
}

export interface SurNameProps {
  value: string;
}

export interface EmailProps {
  value: string;
}

export interface PhoneProps {
  value: string;
}

export interface ReferralProps {
  givenName: GivenName;
  surName: SurName;
  email: Email;
  phone: Phone;
  addressLine?: Address;
  suburb?: Suburb;
  state?: State;
  postCode?: PostCode;
  country?: Country;
}

export class GivenName extends Value<GivenNameProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: GivenNameProps) {
    super(props);
  }

  public static create(props: GivenNameProps): Result<GivenName> {
    if (!props.value) {
      return Result.fail<SurName>('Required Given Name');
    }
    console.debug('GivenName create', props.value);
    if (!props.value || props.value.length < BC_MINI_FIELD_LENGTH || props.value.length > BC_MAX_FIELD_LENGTH)
      return Result.fail<GivenName>('Required 2 to 200 characters');
    else return Result.ok<GivenName>(new GivenName(props));
  }
}

export class Email extends Value<EmailProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(props: EmailProps): Result<Email> {
    if (!props.value) {
      return Result.fail<SurName>('Required email');
    }
    if (!props.value || !BC_EMAIL_FORMAT.test(props.value.toLowerCase())) {
      return Result.fail<Email>('Invalid Email formate');
    }
    return Result.ok<Email>(new Email(props));
  }
}

export class SurName extends Value<SurNameProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: SurNameProps) {
    super(props);
  }

  public static create(props: SurNameProps): Result<SurName> {
    if (!props.value) {
      return Result.fail<SurName>('Required Surname');
    }
    if (props.value.length < BC_MINI_FIELD_LENGTH || props.value.length > BC_MAX_FIELD_LENGTH) {
      console.debug('SurName create error', props.value);
      return Result.fail<SurName>('Required 2 to 200 characters');
    } else {
      console.debug('SurName create ok', props.value);
      return Result.ok<SurName>(new SurName(props));
    }
  }
}

export class Phone extends Value<PhoneProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: PhoneProps) {
    super(props);
  }

  public static create(props: PhoneProps): Result<Phone> {
    if (!props.value) {
      return Result.fail<SurName>('Required phone');
    }
    if (!BC_AUS_PHONE_NUMBER.test(props.value)) {
      console.error('Invalid phone format', props.value);
      return Result.fail<Phone>('Invalid phone format');
    }
    return Result.ok<Phone>(new Phone(props));
  }
}

export class Referral extends Entity<ReferralProps> {
  private constructor(props: ReferralProps, id?: ID) {
    console.debug(
      'Referral constructor',
      props.givenName.value,
      props.surName.value,
      props.email.value,
      props.phone.value
    );
    super(props, id);
  }

  public get value(): ReferralProps {
    return this.props;
  }

  public static create(props: ReferralProps, id?: ID): Result<Referral> {
    return Result.ok<Referral>(new Referral(props, id));
  }
}
