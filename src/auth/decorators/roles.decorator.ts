import { SetMetadata } from '@nestjs/common';
import { UsuarioRole } from '../../usuarios/usuario.entity';

// Quando escrevermos: 
// @Roles(UsuarioRole.ADMIN) --> estamos dizendo: Esta rota exige ADMIN

// Podemos também ter:
// @Roles(UsuarioRole.ADMIN, UsuarioRole.USUARIO) --> que significa que os dois tipos podem acessar.

export const ROLES_KEY = 'roles';

export const Roles = (...roles: UsuarioRole[]) =>
  SetMetadata(ROLES_KEY, roles);