export abstract class HasherInterface {
  abstract hash(text: string): Promise<string>;
}
