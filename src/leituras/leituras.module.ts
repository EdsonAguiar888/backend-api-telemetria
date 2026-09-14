import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeituraEntity } from './leitura.entity';
import { LeiturasService } from './leituras.service';
import { LeiturasController } from './leituras.controller';
import { MedidoresModule } from '../medidores/medidores.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeituraEntity]),
    MedidoresModule, // Permite injetar MedidoresService dentro de LeiturasService
  ],
  controllers: [LeiturasController],
  providers: [LeiturasService],
  exports: [LeiturasService],
})
export class LeiturasModule {}









// import { Module } from '@nestjs/common';
// import { LeiturasService } from './leituras.service';
// import { LeiturasController } from './leituras.controller';

// @Module({
//   providers: [LeiturasService],
//   controllers: [LeiturasController]
// })
// export class LeiturasModule {}
