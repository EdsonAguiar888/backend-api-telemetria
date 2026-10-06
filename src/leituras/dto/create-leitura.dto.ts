

import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateLeituraDto {
  @ApiProperty({
    example: '2026-10-05T15:00:00.000Z',
    description: 'Data e hora da leitura no formato ISO 8601.',
  })
  @IsDateString(
    {},
    {
      message:
        'A dataHora deve estar em formato ISO8601 válido (ex: 2026-09-14T15:00:00Z).',
    },
  )
  @IsNotEmpty({
    message: 'A data/hora da leitura é obrigatória.',
  })
  dataHora!: string;

  @ApiProperty({
    example: 600,
    description: 'Valor registrado pelo medidor.',
    minimum: 0,
  })
  @IsNumber(
    {},
    {
      message: 'O valor da leitura deve ser um número.',
    },
  )
  @Min(0, {
    message: 'O valor da leitura não pode ser negativo.',
  })
  @IsNotEmpty({
    message: 'O valor da leitura é obrigatório.',
  })
  valor!: number;

  @ApiProperty({
    example: '20000000-0000-0000-0000-000000000001',
    description: 'ID do medidor associado à leitura.',
  })
  @IsUUID('4', {
    message: 'O medidorId deve ser um UUID válido.',
  })
  @IsNotEmpty({
    message: 'O ID do medidor é obrigatório.',
  })
  medidorId!: string;
}






// import { IsDateString, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

// export class CreateLeituraDto {
//   @IsDateString({}, { message: 'A dataHora deve estar em formato ISO8601 válido (ex: 2026-09-14T15:00:00Z).' })
//   @IsNotEmpty({ message: 'A data/hora da leitura é obrigatória.' })
//   dataHora!: string;

//   @IsNumber({}, { message: 'O valor da leitura deve ser um número.' })
//   @Min(0, { message: 'O valor da leitura não pode ser negativo.' })
//   @IsNotEmpty({ message: 'O valor da leitura é obrigatório.' })
//   valor!: number;

//   @IsUUID('4', { message: 'O medidorId deve ser um UUID válido.' })
//   @IsNotEmpty({ message: 'O ID do medidor é obrigatório.' })
//   medidorId!: string;
// }



