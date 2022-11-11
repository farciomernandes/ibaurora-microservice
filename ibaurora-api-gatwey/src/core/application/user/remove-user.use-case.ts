import { UserRepository } from '@core/domain/repositories/user.repository';
import { BaseUseCase } from '@core/base/use-cases/use-case';

export class RemoveUserUseCase implements BaseUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(id: string): Promise<void> {
    return await this.userRepository.remove(id);
  }
}
