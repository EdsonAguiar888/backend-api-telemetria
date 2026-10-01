

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

import { MedidoresService } from './medidores.service';
import { CreateMedidorDto } from './dto/create-medidor.dto';
import { UpdateMedidorDto } from './dto/update-medidor.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UsuarioRole } from '../usuarios/usuario.entity';

@Controller('medidores')
export class MedidoresController {
  constructor(
    private readonly medidoresService: MedidoresService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  @Post()
  create(@Body() dto: CreateMedidorDto) {
    return this.medidoresService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    UsuarioRole.ADMIN,
    UsuarioRole.USUARIO,
  )
  @Get()
  findAll() {
    return this.medidoresService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    UsuarioRole.ADMIN,
    UsuarioRole.USUARIO,
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medidoresService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMedidorDto,
  ) {
    return this.medidoresService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medidoresService.remove(id);
  }
}










































// import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
// import { MedidoresService } from './medidores.service';
// import { CreateMedidorDto } from './dto/create-medidor.dto';
// import { UpdateMedidorDto } from './dto/update-medidor.dto';

// @Controller('medidores')
// export class MedidoresController {
//   constructor(private readonly medidoresService: MedidoresService) {}

//   @Post()
//   create(@Body() dto: CreateMedidorDto) {
//     return this.medidoresService.create(dto);
//   }

//   @Get()
//   findAll() {
//     return this.medidoresService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.medidoresService.findOne(id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() dto: UpdateMedidorDto) {
//     return this.medidoresService.update(id, dto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.medidoresService.remove(id);
//   }
// }









// // import { Controller, Get, Post, Body, Param } from '@nestjs/common';
// // import { MedidoresService } from './medidores.service';
// // import { CreateMedidorDto } from './dto/create-medidor.dto';

// // @Controller('medidores') // Define a rota base: http://localhost:3000/medidores
// // export class MedidoresController {
// //   constructor(private readonly medidoresService: MedidoresService) {}

// //   @Post() // POST /medidores
// //   create(@Body() dto: CreateMedidorDto) {
// //     return this.medidoresService.create(dto);
// //   }

// //   @Get() // GET /medidores
// //   findAll() {
// //     return this.medidoresService.findAll();
// //   }

// //   @Get(':id') // GET /medidores/:id
// //   findOne(@Param('id') id: string) {
// //     return this.medidoresService.findOne(id);
// //   }
// // }












// // // import { Controller } from '@nestjs/common';

// // // @Controller('medidores')
// // // export class MedidoresController {}
