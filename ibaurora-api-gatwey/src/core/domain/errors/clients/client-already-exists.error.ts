import { ErrorBase } from '../error-base';

export class ClientAlreadyExists extends ErrorBase {
  constructor(response: string) {
    const error = new Error(response);
    error.name = ClientAlreadyExists.name;
    super(error);
  }
}
