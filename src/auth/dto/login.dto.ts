

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin@telemetria.com',
    description: 'E-mail do usuário.',
  })
  email!: string;

  @ApiProperty({
    example: 'senha-de-exemplo',
    description: 'Senha do usuário.',
  })
  senha!: string;
}

