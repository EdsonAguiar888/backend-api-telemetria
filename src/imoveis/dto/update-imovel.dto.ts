import { PartialType } from '@nestjs/mapped-types';
import { CreateImovelDto } from './create-imovel.dto';

// O PartialType faz com que todos os campos de CreateImovelDto (nome, endereco)
// se tornem opcionais no UpdateImovelDto.
export class UpdateImovelDto extends PartialType(CreateImovelDto) {}