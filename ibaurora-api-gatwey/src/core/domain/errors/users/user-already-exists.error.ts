import { ErrorBase } from '../error-base';

export class UserAlreadyExists extends ErrorBase {
  constructor(response: string) {
    const error = new Error(response);
    error.name = UserAlreadyExists.name;
    super(error);
  }
}
