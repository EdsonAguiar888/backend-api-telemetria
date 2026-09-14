



import { IsDateString, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateLeituraDto {
  @IsDateString({}, { message: 'A data/hora deve estar em formato ISO8601 válido (ex: 2026-09-11T14:30:00Z).' })
  @IsNotEmpty({ message: 'A dataHora é obrigatória.' })
  dataHora!: string;

  @IsNumber({}, { message: 'O valor deve ser um número.' })
  @Min(0, { message: 'O valor da leitura não pode ser negativo.' })
  valor!: number;

  @IsUUID('4', { message: 'O medidorId deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O ID do medidor é obrigatório.' })
  medidorId!: string;
}





