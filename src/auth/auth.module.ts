import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioEntity } from '../usuarios/usuario.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
// import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [

    TypeOrmModule.forFeature([UsuarioEntity]),
    UsuariosModule,
    PassportModule,
    JwtModule.register({
      secret: 'SEGREDO_SUPER_SECRETO_TELEMETRIA_2026', // Pode ajustar depois para variável de ambiente
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],


  providers: [AuthService,
    JwtStrategy,
    RolesGuard,
  ],


  exports: [AuthService,
    JwtModule],
})
export class AuthModule { }