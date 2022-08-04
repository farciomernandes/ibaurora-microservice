import { ErrorBase } from '../error-base';

export class GenericGetAllClients extends ErrorBase {
  constructor(response: string) {
    const error = new Error(response);
    error.name = GenericGetAllClients.name;
    super(error);
  }
}
