import { ClientAlreadyExists } from './clients/client-already-exists.error';
import { GenericGetAllClients } from './clients/generic-get-all-clients.error';
import { GenericGetAllUser } from './users/generic-get-all-users.error';
import { UserAlreadyExists } from './users/user-already-exists.error';

export class DomainError {
  static UserAlreadyExists = new UserAlreadyExists('User already exists!');
  static GenericErrorGetAllUsers = new GenericGetAllUser(
    'Houve um erro ao listar usuários!',
  );

  static ClientAlreadyExists = new ClientAlreadyExists(
    'Client already exists!',
  );
  static GenericErrorGetAllClients = new GenericGetAllClients(
    'Houve um erro ao listar categorias!',
  );
}
