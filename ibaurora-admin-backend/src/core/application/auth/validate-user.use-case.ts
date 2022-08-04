import { compareSync } from 'bcrypt';
import { BaseUseCase } from '@core/base/use-cases/use-case';
import { UserRepository } from '@core/domain/repositories/user.repository';

export class ValidateUserUseCase implements BaseUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email, ['role']);

    if (!user) {
      return null;
    }
    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
}
