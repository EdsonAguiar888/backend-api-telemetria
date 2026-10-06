

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

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }






  @ApiOperation({
    summary: 'Realizar login',
    description: 'Autentica o usuário e retorna um JWT para acesso aos endpoints protegidos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas.',
  })

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('perfil')
  perfil(@Req() request: any) {
    return request.user;
  }

  // ==============================================================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Acesso exclusivo para ADMIN',
    description: 'Retorna os dados do usuário autenticado. Requer JWT e role ADMIN.',
  })
  @Roles(UsuarioRole.ADMIN)
  @Get('admin')
  adminOnly(@Req() request: any) {
    return {
      mensagem: 'Acesso permitido para ADMIN',
      usuario: request.user,
    };
  }




  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Acesso exclusivo para USUARIO',
    description: 'Retorna os dados do usuário autenticado. Requer JWT e role USUARIO.',
  })
  @Roles(UsuarioRole.USUARIO)
  @Get('usuario')
  usuarioOnly(@Req() request: any) {
    return {
      mensagem: 'Acesso permitido para USUARIO',
      usuario: request.user,
    };
  }
}

