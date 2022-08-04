import bcrypt from 'bcrypt';
import { HasherInterface } from '@core/domain/interfaces/hasher.interface';

export class BcryptAdapter implements HasherInterface {
  private readonly salt: number = 12;

  async hash(text: string): Promise<string> {
    const hash = await bcrypt.hash(text, this.salt);
    return hash;
  }
}
