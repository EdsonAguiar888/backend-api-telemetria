

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeituraEntity } from './leitura.entity';
import { CreateLeituraDto } from './dto/create-leitura.dto';
import { UpdateLeituraDto } from './dto/update-leitura.dto';
import { MedidoresService } from '../medidores/medidores.service';

@Injectable()
export class LeiturasService {
  constructor(
    @InjectRepository(LeituraEntity)
    private readonly leituraRepo: Repository<LeituraEntity>,
    private readonly medidoresService: MedidoresService, // Injetado para validar a existência do medidor
  ) {}

  // 1. Registrar nova leitura para um medidor
  async create(dto: CreateLeituraDto): Promise<LeituraEntity> {
    // Valida se o medidor existe no banco
    const medidor = await this.medidoresService.findOne(dto.medidorId);

    const leitura = this.leituraRepo.create({
      dataHora: new Date(dto.dataHora),
      valor: dto.valor,
      medidor: medidor,
    });

    return await this.leituraRepo.save(leitura);
  }

  // 2. Listar todas as leituras (ordenadas da mais recente para a mais antiga)
  async findAll(): Promise<LeituraEntity[]> {
    return await this.leituraRepo.find({
      relations: {
      medidor: true,
    },
    order: {
      dataHora: 'DESC',
    },
    });
  }

  // 3. Buscar leitura específica por ID
  async findOne(id: string): Promise<LeituraEntity> {
    const leitura = await this.leituraRepo.findOne({
      where: { id },
      relations: {
        medidor: true, 
      }      
    });

    if (!leitura) {
      throw new NotFoundException(`Leitura com ID "${id}" não encontrada.`);
    }

    return leitura;
  }

  // 4. Atualizar leitura
  async update(id: string, dto: UpdateLeituraDto): Promise<LeituraEntity> {
    const leitura = await this.findOne(id);

    if (dto.medidorId) {
      const medidor = await this.medidoresService.findOne(dto.medidorId);
      leitura.medidor = medidor;
    }

    if (dto.dataHora) {
      leitura.dataHora = new Date(dto.dataHora);
    }

    if (dto.valor !== undefined) {
      leitura.valor = dto.valor;
    }

    return await this.leituraRepo.save(leitura);
  }

  // 5. Excluir leitura
  async remove(id: string): Promise<{ message: string }> {
    const leitura = await this.findOne(id);
    await this.leituraRepo.remove(leitura);
    return { message: 'Leitura excluída com sucesso!' };
  }
}





























// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { LeituraEntity } from './leitura.entity';
// // import { CreateLeituraDto } from './dto/create-leitura.dto';
// import { CreateLeituraDto } from './dto/create-leitura.dto';
// import { MedidoresService } from '../medidores/medidores.service';

// @Injectable()
// export class LeiturasService {
//   constructor(
//     @InjectRepository(LeituraEntity)
//     private readonly leituraRepo: Repository<LeituraEntity>,
//     private readonly medidoresService: MedidoresService,
//   ) {}

//   async create(dto: CreateLeituraDto): Promise<LeituraEntity> {
//     // 1. Valida se o medidor existe
//     const medidor = await this.medidoresService.findOne(dto.medidorId);

//     // 2. Instancia a leitura convertendo a string de data enviada pelo JSON para o objeto Date do JS
//     const leitura = this.leituraRepo.create({
//       dataHora: new Date(dto.dataHora),
//       valor: dto.valor,
//       medidor: medidor,
//     });

//     return await this.leituraRepo.save(leitura);
//   }

    
//     async findAll(): Promise<LeituraEntity[]> {
//     return await this.leituraRepo.find({
//       relations: {
//         medidor: true,
//       },
//       order: {
//         dataHora: 'DESC',
//       },
//     });
//   }
// }


// //   async findAll(): Promise<LeituraEntity[]> {
// //     return await this.leituraRepo.find({
// //       relations: ['medidor'],
// //       order: { dataHora: 'DESC' }, // Ordena da leitura mais recente para a mais antiga
// //     });
// //   }














// // import { Injectable } from '@nestjs/common';

// // @Injectable()
// // export class LeiturasService {}
