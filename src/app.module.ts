import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImoveisModule } from './imoveis/imoveis.module';
import { MedidoresModule } from './medidores/medidores.module';
import { LeiturasModule } from './leituras/leituras.module';
import { ConsumoModule } from './consumo/consumo.module';

import { ImovelEntity } from './imoveis/imovel.entity';
import { MedidorEntity } from './medidores/medidor.entity';
import { LeituraEntity } from './leituras/leitura.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',              // Como o backend está rodando na sua máquina física, aponta para localhost
      port: 3306,                     // Mapeado do Docker
      username: 'telemetria_user',    // Definido no docker-compose.yml
      password: 'telemetria_pass',    // Definido no docker-compose.yml
      database: 'telemetria_db',      // Definido no docker-compose.yml
      entities: [ImovelEntity, MedidorEntity, LeituraEntity],
      synchronize: true,              // Cria e sincroniza automaticamente as tabelas no MySQL
    }),
    ImoveisModule,
    MedidoresModule,
    LeiturasModule,
    ConsumoModule,
  ],
})
export class AppModule {}


// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ImoveisModule } from './imoveis/imoveis.module';
// import { MedidoresModule } from './medidores/medidores.module';
// import { LeiturasModule } from './leituras/leituras.module';
// import { ConsumoModule } from './consumo/consumo.module';

// @Module({
//   imports: [ImoveisModule, MedidoresModule, LeiturasModule, ConsumoModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
