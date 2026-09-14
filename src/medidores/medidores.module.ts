

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedidorEntity } from './medidor.entity';
import { MedidoresService } from './medidores.service';
import { MedidoresController } from './medidores.controller';
import { ImoveisModule } from '../imoveis/imoveis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedidorEntity]),
    ImoveisModule, // Importamos ImoveisModule para conseguir usar o ImoveisService na validação
  ],
  controllers: [MedidoresController],
  providers: [MedidoresService],
  exports: [MedidoresService],
})
export class MedidoresModule {}













// import { Module } from '@nestjs/common';
// import { MedidoresService } from './medidores.service';
// import { MedidoresController } from './medidores.controller';

// @Module({
//   providers: [MedidoresService],
//   controllers: [MedidoresController]
// })
// export class MedidoresModule {}
