import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UsuarioEntity, UsuarioRole } from './usuario.entity';

@Injectable()
export class UsuarioSeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) { }

  async onApplicationBootstrap() {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: {
        email: 'usuario@telemetria.com',
      },
    });

    if (!usuarioExistente) {
      const senhaHash = await bcrypt.hash('123456', 10);

      const usuario = this.usuarioRepository.create({
        nome: 'Usuário Teste',
        email: 'usuario@telemetria.com',
        senha: senhaHash,
        role: UsuarioRole.USUARIO,
      });

      await this.usuarioRepository.save(usuario);

      console.log('USUARIO de teste criado com sucesso!');
    }
  }
}