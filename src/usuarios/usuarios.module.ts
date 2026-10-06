import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { AdminSeedService } from './admin-seed.service';
import { UsuarioSeedService } from './usuario-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],


  providers: [AdminSeedService,
    UsuarioSeedService,
  ],


  // exports: [TypeOrmModule],


  exports: [TypeOrmModule.forFeature([UsuarioEntity])], // <-- EXPORTA O REPOSITÓRIO
})
export class UsuariosModule { }