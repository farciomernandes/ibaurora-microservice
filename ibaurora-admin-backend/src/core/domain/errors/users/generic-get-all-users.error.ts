import { ErrorBase } from '../error-base';

export class GenericGetAllUser extends ErrorBase {
  constructor(response: string) {
    const error = new Error(response);
    error.name = GenericGetAllUser.name;
    super(error);
  }
}
