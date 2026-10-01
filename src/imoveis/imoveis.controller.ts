


import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ImoveisService } from './imoveis.service';
import { CreateImovelDto } from './dto/create-imovel.dto';
import { UpdateImovelDto } from './dto/update-imovel.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UsuarioRole } from '../usuarios/usuario.entity';

@Controller('imoveis')
export class ImoveisController {
  constructor(
    private readonly imoveisService: ImoveisService,
  ) {}

  // ==========================================
  // CRIAR IMÓVEL
  // ADMIN
  // ==========================================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  @Post()
  create(@Body() dto: CreateImovelDto) {
    return this.imoveisService.create(dto);
  }

  // ==========================================
  // LISTAR IMÓVEIS
  // ADMIN + USUARIO
  // ==========================================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    UsuarioRole.ADMIN,
    UsuarioRole.USUARIO,
  )
  @Get()
  findAll() {
    return this.imoveisService.findAll();
  }

  // ==========================================
  // BUSCAR IMÓVEL POR ID
  // ADMIN + USUARIO
  // ==========================================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    UsuarioRole.ADMIN,
    UsuarioRole.USUARIO,
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imoveisService.findOne(id);
  }

  // ==========================================
  // ATUALIZAR IMÓVEL
  // ADMIN
  // ==========================================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateImovelDto,
  ) {
    return this.imoveisService.update(id, dto);
  }

  // ==========================================
  // EXCLUIR IMÓVEL
  // ADMIN
  // ==========================================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imoveisService.remove(id);
  }
}





















// import { Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common';
// import { ImoveisService } from './imoveis.service';
// import { CreateImovelDto } from './dto/create-imovel.dto';
// import { UpdateImovelDto } from './dto/update-imovel.dto';

// @Controller('imoveis') // Define a rota base: http://localhost:3000/imoveis
// export class ImoveisController {
//   constructor(private readonly imoveisService: ImoveisService) {}

//   @Post() // POST /imoveis
//   create(@Body() dto: CreateImovelDto) {
//     return this.imoveisService.create(dto);
//   }

//   @Get() // GET /imoveis
//   findAll() {
//     return this.imoveisService.findAll();
//   }

//   @Get(':id') // GET /imoveis/:id
//   findOne(@Param('id') id: string) {
//     return this.imoveisService.findOne(id);
//   }


// // ROTA DE ATUALIZAÇÃO PARCIAL
//   @Patch(':id') // PATCH /imoveis/:id
//   update(@Param('id') id: string, @Body() dto: UpdateImovelDto) {
//     return this.imoveisService.update(id, dto);
//   }

 
//   // ROTA DE REMOÇÃO
//   @Delete(':id') // DELETE /imoveis/:id
//   remove(@Param('id') id: string) {
//     return this.imoveisService.remove(id);
//   }
// }
