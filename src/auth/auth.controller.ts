

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { UsuarioRole } from '../usuarios/usuario.entity';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  perfil(@Req() request: any) {
    return request.user;
  }

// ==============================================================

  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UsuarioRole.ADMIN)
@Get('admin')
adminOnly(@Req() request: any) {
  return {
    mensagem: 'Acesso permitido para ADMIN',
    usuario: request.user,
  };
}




@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UsuarioRole.USUARIO)
@Get('usuario')
usuarioOnly(@Req() request: any) {
  return {
    mensagem: 'Acesso permitido para USUARIO',
    usuario: request.user,
  };
}
}










// import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @HttpCode(HttpStatus.OK)
//   @Post('login')
//   login(@Body() loginDto: LoginDto) {
//     return this.authService.login(loginDto);
//   }
// }