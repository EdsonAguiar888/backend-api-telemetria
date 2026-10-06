// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateLeituraDto } from './create-leitura.dto';

export class UpdateLeituraDto extends PartialType(CreateLeituraDto) {}