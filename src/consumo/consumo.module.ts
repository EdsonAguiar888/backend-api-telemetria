import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumoService } from './consumo.service';
import { ConsumoController } from './consumo.controller';
import { LeituraEntity } from '../leituras/leitura.entity';

@Module({
  // TypeOrmModule.forFeature diz ao NestJS que este módulo acessa a tabela de Leituras
  imports: [TypeOrmModule.forFeature([LeituraEntity])],
  controllers: [ConsumoController],
  providers: [ConsumoService],
  exports: [ConsumoService],
})
export class ConsumoModule {}















// import { Module } from '@nestjs/common';
// import { ConsumoService } from './consumo.service';
// import { ConsumoController } from './consumo.controller';

// @Module({
//   providers: [ConsumoService],
//   controllers: [ConsumoController]
// })
// export class ConsumoModule {}
