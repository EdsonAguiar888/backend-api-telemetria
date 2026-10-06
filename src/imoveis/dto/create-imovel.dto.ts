

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImovelDto {
  @ApiProperty({
    example: 'Residencial Exemplo',
    description: 'Nome do imóvel.',
  })
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome do imóvel é obrigatório.' })
  nome!: string;

  @ApiProperty({
    example: 'Av. Boa Viagem, 500 - Recife/PE',
    description: 'Endereço do imóvel.',
  })
  @IsString({ message: 'O endereço deve ser um texto.' })
  @IsNotEmpty({ message: 'O endereço é obrigatório.' })
  endereco!: string;
}

