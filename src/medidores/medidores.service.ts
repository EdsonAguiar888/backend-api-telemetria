

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedidorEntity } from './medidor.entity';
import { CreateMedidorDto } from './dto/create-medidor.dto';
import { UpdateMedidorDto } from './dto/update-medidor.dto';
import { ImoveisService } from '../imoveis/imoveis.service';

@Injectable()
export class MedidoresService {
  constructor(
    @InjectRepository(MedidorEntity)
    private readonly medidorRepo: Repository<MedidorEntity>,
    private readonly imoveisService: ImoveisService, // Injeta o serviço de imóveis para validar a existência
  ) {}



  // 1. Criar Medidor vinculado a um Imóvel
  async create(dto: CreateMedidorDto): Promise<MedidorEntity> {
    // Valida se o imóvel informado existe no MySQL (lança 404 se não achar)
    const imovel = await this.imoveisService.findOne(dto.imovelId);

    const medidor = this.medidorRepo.create({
      identificador: dto.identificador,
      tipo: dto.tipo,
      imovel: imovel,
    });

    return await this.medidorRepo.save(medidor);
  }


  // 2. Listar todos os Medidores (com os imóveis associados)
  async findAll(): Promise<MedidorEntity[]> {
    return await this.medidorRepo.find({
      
      relations: {
        imovel: true,
      }
    });
  }



  // 3. Buscar Medidor por ID (traz o imóvel e o histórico de leituras)
  async findOne(id: string): Promise<MedidorEntity> {
    const medidor = await this.medidorRepo.findOne({
      where: { id },
      relations: {
        imovel: true,
        leituras: true
    },
      
    });

    if (!medidor) {
      throw new NotFoundException(`Medidor com ID "${id}" não encontrado.`);
    }

    return medidor;
  }



  // 4. Atualizar Medidor
  async update(id: string, dto: UpdateMedidorDto): Promise<MedidorEntity> {
    const medidor = await this.findOne(id);

    // Se o usuário enviou um novo imovelId, precisamos validar se esse novo imóvel existe
    if (dto.imovelId) {
      const imovel = await this.imoveisService.findOne(dto.imovelId);
      medidor.imovel = imovel;
    }

    if (dto.identificador) {
      medidor.identificador = dto.identificador;
    }

    if (dto.tipo) {
      medidor.tipo = dto.tipo;
    }

    return await this.medidorRepo.save(medidor);
  }

  

  // 5. Excluir Medidor
  async remove(id: string): Promise<void> {
    const medidor = await this.findOne(id);
    await this.medidorRepo.remove(medidor);
  }
}














































// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { MedidorEntity } from './medidor.entity';
// import { CreateMedidorDto } from './dto/create-medidor.dto';
// import { ImoveisService } from '../imoveis/imoveis.service';

// @Injectable()
// export class MedidoresService {
//   constructor(
//     @InjectRepository(MedidorEntity)
//     private readonly medidorRepo: Repository<MedidorEntity>,
//     private readonly imoveisService: ImoveisService, // Injetado para validar se o imóvel existe
//   ) {}

//   async create(dto: CreateMedidorDto): Promise<MedidorEntity> {
//     // 1. Verifica se o imóvel informado realmente existe no banco
//     const imovel = await this.imoveisService.findOne(dto.imovelId);

//     // 2. Cria a instância do medidor associando o objeto do imóvel
//     const medidor = this.medidorRepo.create({
//       identificador: dto.identificador,
//       tipo: dto.tipo,
//       imovel: imovel,
//     });

//     return await this.medidorRepo.save(medidor);
//   }


// async findAll(): Promise<MedidorEntity[]> {
//   return this.medidorRepo.find({
//     relations: {
//       imovel: true,
//     },
//   });
// }

// async findOne(id: string): Promise<MedidorEntity> {
//   return this.medidorRepo.findOneOrFail({
//     where: { id },
//     relations: {
//       imovel: true,
//     },
//   });
// }





// //   async findAll(): Promise<MedidorEntity[]> {
// //     return await this.medidorRepo.find({
// //       relations: ['imovel'],
// //     });
// //   }

// //   async findOne(id: string): Promise<MedidorEntity> {
// //     const medidor = await this.medidorRepo.findOne({
// //       where: { id },
// //       relations: ['imovel', 'leituras'],
// //     });

// //     if (!medidor) {
// //       throw new NotFoundException(`Medidor com ID "${id}" não encontrado.`);
// //     }
// //     return medidor;
// //   }
// }
















// // import { Injectable } from '@nestjs/common';

// // @Injectable()
// // export class MedidoresService {}
