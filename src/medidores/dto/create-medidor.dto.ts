import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { TipoMedidor } from '../medidor.entity';

export class CreateMedidorDto {
  @ApiProperty({
    example: 'MED-AGUA-0005',
    description: 'Identificador do medidor.',
  })
  @IsString({ message: 'O identificador deve ser um texto' })
  @IsNotEmpty({ message: 'O identificador do medidor é obrigatório' })
  identificador!: string;

  @ApiProperty({
    example: 'AGUA',
    description: 'Tipo do medidor.',
    enum: TipoMedidor,
  })
  @IsEnum(TipoMedidor, {
    message: 'O tipo deve ser AGUA, ENERGIA ou GAS',
  })
  @IsNotEmpty({
    message: 'O tipo do medidor é obrigatório',
  })
  tipo!: TipoMedidor;

  @ApiProperty({
    example: '10000000-0000-0000-0000-000000000001',
    description: 'ID do imóvel associado ao medidor.',
  })
  @IsUUID('4', {
    message: 'O imovelId deve ser um UUID válido',
  })
  @IsNotEmpty({
    message: 'O ID do imóvel é obrigatório',
  })
  imovelId!: string;
}













// import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
// import { TipoMedidor } from '../medidor.entity';

// export class CreateMedidorDto {
//   @IsString({ message: 'O identificador deve ser um texto' })
//   @IsNotEmpty({ message: 'O identificador do medidor é obrigatório' })
//   identificador!: string;

//   @IsEnum(TipoMedidor, { message: 'O tipo deve ser AGUA, ENERGIA ou GAS' })
//   @IsNotEmpty({ message: 'O tipo do medidor é obrigatório' })
//   tipo!: TipoMedidor;

//   @IsUUID('4', { message: 'O imovelId deve ser um UUID válido' })
//   @IsNotEmpty({ message: 'O ID do imóvel é obrigatório' })
//   imovelId!: string;
// }