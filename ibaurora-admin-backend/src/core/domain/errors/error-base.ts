export class ErrorBase extends Error {
  name: string;
  constructor(error: Error) {
    super(error.message);
    this.name = error.name;
  }
}
