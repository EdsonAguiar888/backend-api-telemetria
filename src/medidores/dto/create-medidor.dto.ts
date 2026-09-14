import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { TipoMedidor } from '../medidor.entity';

export class CreateMedidorDto {
  @IsString({ message: 'O identificador deve ser um texto' })
  @IsNotEmpty({ message: 'O identificador do medidor é obrigatório' })
  identificador!: string;

  @IsEnum(TipoMedidor, { message: 'O tipo deve ser AGUA, ENERGIA ou GAS' })
  @IsNotEmpty({ message: 'O tipo do medidor é obrigatório' })
  tipo!: TipoMedidor;

  @IsUUID('4', { message: 'O imovelId deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O ID do imóvel é obrigatório' })
  imovelId!: string;
}