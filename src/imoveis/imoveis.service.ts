import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImovelEntity } from './imovel.entity';
import { CreateImovelDto } from './dto/create-imovel.dto';
import { UpdateImovelDto } from './dto/update-imovel.dto';

@Injectable()
export class ImoveisService {
  constructor(
    // Injeta o repositório do TypeORM para podermos executar comandos SQL/queries na tabela 'imoveis'
    @InjectRepository(ImovelEntity)
    private readonly imovelRepo: Repository<ImovelEntity>,
  ) {}

  // Cria um novo imóvel no banco de dados
  async create(dto: CreateImovelDto): Promise<ImovelEntity> {
    const imovel = this.imovelRepo.create(dto);
    return await this.imovelRepo.save(imovel);
  }

  // Traz todos os imóveis juntamente com os medidores associados a eles

  async findAll(): Promise<ImovelEntity[]> {
  return await this.imovelRepo.find({
    relations: {
      medidores: true,
    },
  });
}

async findOne(id: string): Promise<ImovelEntity> {
  const imovel = await this.imovelRepo.findOne({
    where: { id },
    relations: {
      medidores: true,
    },
  });

  if (!imovel) {
    throw new NotFoundException(`Imóvel com ID "${id}" não foi encontrado.`);
  }

  return imovel;
}

// ATUALIZAR IMÓVEL
  async update(id: string, dto: UpdateImovelDto): Promise<ImovelEntity> {
    // 1. Busca o imóvel e lança erro 404 caso não exista
    const imovel = await this.findOne(id);

    // 2. Funde as alterações do DTO no objeto existente
    Object.assign(imovel, dto);

    // 3. Salva a entidade atualizada no banco MySQL
    return await this.imovelRepo.save(imovel);
  }

  // EXCLUIR IMÓVEL
  async remove(id: string): Promise<{ message: string}> {
    // 1. Busca o imóvel para garantir existência
    const imovel = await this.findOne(id);

    // 2. Remove o registro do banco
    await this.imovelRepo.remove(imovel);
    return { message: 'Imóvel excluído com sucesso... '}
  }

}
























// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ImoveisService {}
