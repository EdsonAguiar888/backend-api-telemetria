import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity } from '../usuarios/usuario.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    private readonly jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto) {
    const { email, senha } = loginDto;

    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = {
      sub: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    };
  }
}