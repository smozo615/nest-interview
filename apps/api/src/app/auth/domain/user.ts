import * as process from 'process';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AggregateRoot } from '@nestjs/cqrs';

import { Payload } from '../interface/types';
import { UserLoggedInEvent } from './events/user-logged-in.event';

export type UserEssentialProperties = Readonly<
  Required<{
    id: string;
    email: string;
    password: string;
    role: string;
  }>
>;

export type UserOptionalProperties = Readonly<
  Partial<{
    customerId: string;
  }>
>;

export type UserProperties = UserEssentialProperties & UserOptionalProperties;

export interface User {
  isPasswordValid: (password: string) => boolean;
  generateToken: () => Promise<string>;
  loginSuccess: () => void;
  commit: () => void;
}

export class UserImplementation extends AggregateRoot implements User {
  private readonly id: string;
  private email: string;
  private password: string;
  private role: string;
  private customerId: string | null;

  constructor(private readonly properties: UserProperties) {
    super();
    Object.assign(this, properties);
  }

  isPasswordValid(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  async generateToken() {
    const payload: Payload = {
      id: this.id,
      email: this.email,
      role: this.role,
      customerId: this.customerId,
    };

    return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: process.env.JWT_EXPIRATION || '1d',
    });
  }

  loginSuccess() {
    this.apply(new UserLoggedInEvent(this.email));
  }
}
