import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeituraEntity } from './leitura.entity';
// import { CreateLeituraDto } from './dto/create-leitura.dto';
import { CreateLeituraDto } from './dto/create-leitura.dto';
import { MedidoresService } from '../medidores/medidores.service';

@Injectable()
export class LeiturasService {
  constructor(
    @InjectRepository(LeituraEntity)
    private readonly leituraRepo: Repository<LeituraEntity>,
    private readonly medidoresService: MedidoresService,
  ) {}

  async create(dto: CreateLeituraDto): Promise<LeituraEntity> {
    // 1. Valida se o medidor existe
    const medidor = await this.medidoresService.findOne(dto.medidorId);

    // 2. Instancia a leitura convertendo a string de data enviada pelo JSON para o objeto Date do JS
    const leitura = this.leituraRepo.create({
      dataHora: new Date(dto.dataHora),
      valor: dto.valor,
      medidor: medidor,
    });

    return await this.leituraRepo.save(leitura);
  }

    
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
}


//   async findAll(): Promise<LeituraEntity[]> {
//     return await this.leituraRepo.find({
//       relations: ['medidor'],
//       order: { dataHora: 'DESC' }, // Ordena da leitura mais recente para a mais antiga
//     });
//   }














// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class LeiturasService {}
