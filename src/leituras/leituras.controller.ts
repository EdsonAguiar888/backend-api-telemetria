

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

import { LeiturasService } from './leituras.service';
import { CreateLeituraDto } from './dto/create-leitura.dto';
import { UpdateLeituraDto } from './dto/update-leitura.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UsuarioRole } from '../usuarios/usuario.entity';

@Controller('leituras')
export class LeiturasController {
  constructor(
    private readonly leiturasService: LeiturasService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  @Post()
  create(@Body() dto: CreateLeituraDto) {
    return this.leiturasService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    UsuarioRole.ADMIN,
    UsuarioRole.USUARIO,
  )
  @Get()
  findAll() {
    return this.leiturasService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    UsuarioRole.ADMIN,
    UsuarioRole.USUARIO,
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leiturasService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateLeituraDto,
  ) {
    return this.leiturasService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leiturasService.remove(id);
  }
}








































// import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
// import { LeiturasService } from './leituras.service';
// import { CreateLeituraDto } from './dto/create-leitura.dto';
// import { UpdateLeituraDto } from './dto/update-leitura.dto';

// @Controller('leituras')
// export class LeiturasController {
//   constructor(private readonly leiturasService: LeiturasService) {}

//   @Post()
//   create(@Body() dto: CreateLeituraDto) {
//     return this.leiturasService.create(dto);
//   }

//   @Get()
//   findAll() {
//     return this.leiturasService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.leiturasService.findOne(id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() dto: UpdateLeituraDto) {
//     return this.leiturasService.update(id, dto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.leiturasService.remove(id);
//   }
// }






















// // import { Controller, Get, Post, Body } from '@nestjs/common';
// // import { LeiturasService } from './leituras.service';
// // import { CreateLeituraDto } from './dto/create-leitura.dto';

// // @Controller('leituras') // Define a rota base: http://localhost:3000/leituras
// // export class LeiturasController {
// //   constructor(private readonly leiturasService: LeiturasService) {}

// //   @Post() // POST /leituras
// //   create(@Body() dto: CreateLeituraDto) {
// //     return this.leiturasService.create(dto);
// //   }

// //   @Get() // GET /leituras
// //   findAll() {
// //     return this.leiturasService.findAll();
// //   }
// // }










// // // import { Controller } from '@nestjs/common';

// // // @Controller('leituras')
// // // export class LeiturasController {}
