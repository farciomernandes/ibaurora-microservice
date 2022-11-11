import { GenericGetAllUser } from './users/generic-get-all-users.error';
import { UserAlreadyExists } from './users/user-already-exists.error';

export class DomainError {
  static UserAlreadyExists = new UserAlreadyExists('User already exists!');
  static GenericErrorGetAllUsers = new GenericGetAllUser(
    'Houve um erro ao listar usuários!',
  );
}
