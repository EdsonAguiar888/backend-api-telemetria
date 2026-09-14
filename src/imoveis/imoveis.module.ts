import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImovelEntity } from './imovel.entity';
import { ImoveisService } from './imoveis.service';
import { ImoveisController } from './imoveis.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ImovelEntity])],
  controllers: [ImoveisController],
  providers: [ImoveisService],
  exports: [ImoveisService], // Exportamos caso o módulo de Medidores precise validar a existência do Imóvel
})
export class ImoveisModule {}














// import { Module } from '@nestjs/common';
// import { ImoveisService } from './imoveis.service';
// import { ImoveisController } from './imoveis.controller';

// @Module({
//   providers: [ImoveisService],
//   controllers: [ImoveisController]
// })
// export class ImoveisModule {}
