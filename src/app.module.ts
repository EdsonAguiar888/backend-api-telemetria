import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImoveisModule } from './imoveis/imoveis.module';
import { MedidoresModule } from './medidores/medidores.module';
import { LeiturasModule } from './leituras/leituras.module';
import { ConsumoModule } from './consumo/consumo.module';

import { ImovelEntity } from './imoveis/imovel.entity';
import { MedidorEntity } from './medidores/medidor.entity';
import { LeituraEntity } from './leituras/leitura.entity';
import { UsuarioEntity } from './usuarios/usuario.entity';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [


    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'container_mysql_telemetria',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'telemetria_user',
      password: process.env.DB_PASSWORD || 'telemetria_pass',
      database: process.env.DB_DATABASE || 'telemetria_db',


      entities: [ImovelEntity,
        MedidorEntity,
        LeituraEntity,
        UsuarioEntity
      ],
      synchronize: true,
    }),


    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'container_mysql_telemetria',              // Como o backend está rodando na sua máquina física, aponta para localhost
    //   // host: 'localhost',              // Como o backend está rodando na sua máquina física, aponta para localhost
    //   port: 3306,                     // Mapeado do Docker
    //   username: 'telemetria_user',    // Definido no docker-compose.yml
    //   password: 'telemetria_pass',    // Definido no docker-compose.yml
    //   database: 'telemetria_db',      // Definido no docker-compose.yml
    //   entities: [ImovelEntity, MedidorEntity, LeituraEntity],
    //   synchronize: true,              // Cria e sincroniza automaticamente as tabelas no MySQL
    // }),
    ImoveisModule,
    MedidoresModule,
    LeiturasModule,
    ConsumoModule,
    AuthModule,
    UsuariosModule
  ],
})
export class AppModule { }




