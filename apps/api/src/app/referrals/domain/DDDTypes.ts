import { v4 as uuidv4 } from 'uuid';
import { shallowEqual } from 'shallow-equal-object';

/**
 * @desc Avoid the potential bug due to typo
 */
export type Nothing = null | undefined | '';
export type ID = number;
export type Option<T> = T | Nothing;
export type OptionalString = Option<string>;
export type OptionalNumber = Option<number>;

interface ValueProps {
  [index: string]: any;
}
export abstract class Value<T extends ValueProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  // ValueObjects are objects that we determine their equality through their structrual property.
  public equals(vo?: Value<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    return shallowEqual(this.props, vo.props);
  }
}

export abstract class Entity<T> {
  public readonly _id: ID;
  protected props: T;

  // when creating new entity, id is not known
  // when updating an existing enotty, id is known
  // entity in ddd always needs a solid id no matter it is in-memory or db.
  constructor(props: T, id?: ID) {
    this._id = id ? id : uuidv4();
    this.props = props;
  }

  // Entities are compared based on their referential equality.
  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    return this._id == object._id;
  }
}

export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: string;
  private _value: T;

  private constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be 
          successful and contain an error`);
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result 
          needs to contain an error message`);
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result.`);
    }

    return this._value;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok<any>();
  }
}
