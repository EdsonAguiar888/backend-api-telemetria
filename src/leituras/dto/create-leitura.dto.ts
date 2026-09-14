

import { IsDateString, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateLeituraDto {
  @IsDateString({}, { message: 'A dataHora deve estar em formato ISO8601 válido (ex: 2026-09-14T15:00:00Z).' })
  @IsNotEmpty({ message: 'A data/hora da leitura é obrigatória.' })
  dataHora!: string;

  @IsNumber({}, { message: 'O valor da leitura deve ser um número.' })
  @Min(0, { message: 'O valor da leitura não pode ser negativo.' })
  @IsNotEmpty({ message: 'O valor da leitura é obrigatório.' })
  valor!: number;

  @IsUUID('4', { message: 'O medidorId deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O ID do medidor é obrigatório.' })
  medidorId!: string;
}



