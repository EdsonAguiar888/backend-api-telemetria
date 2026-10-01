import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity, UsuarioRole } from './usuario.entity';

@Injectable()
export class AdminSeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async onApplicationBootstrap() {
    const adminExistente = await this.usuarioRepository.findOne({
      where: { email: 'admin@telemetria.com' },
    });

    if (!adminExistente) {
      const senhaHash = await bcrypt.hash('Admin@123456', 10);

      const admin = this.usuarioRepository.create({
        nome: 'Administrador',
        email: 'admin@telemetria.com',
        senha: senhaHash,
        role: UsuarioRole.ADMIN,
      });

      await this.usuarioRepository.save(admin);
      console.log(' Usuario ADMIN inicial criado com sucesso!');
    }
  }
}