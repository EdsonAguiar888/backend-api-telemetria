

import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { LeiturasService } from './leituras.service';
import { CreateLeituraDto } from './dto/create-leitura.dto';
import { UpdateLeituraDto } from './dto/update-leitura.dto';

@Controller('leituras')
export class LeiturasController {
  constructor(private readonly leiturasService: LeiturasService) {}

  @Post()
  create(@Body() dto: CreateLeituraDto) {
    return this.leiturasService.create(dto);
  }

  @Get()
  findAll() {
    return this.leiturasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leiturasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLeituraDto) {
    return this.leiturasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leiturasService.remove(id);
  }
}






















// import { Controller, Get, Post, Body } from '@nestjs/common';
// import { LeiturasService } from './leituras.service';
// import { CreateLeituraDto } from './dto/create-leitura.dto';

// @Controller('leituras') // Define a rota base: http://localhost:3000/leituras
// export class LeiturasController {
//   constructor(private readonly leiturasService: LeiturasService) {}

//   @Post() // POST /leituras
//   create(@Body() dto: CreateLeituraDto) {
//     return this.leiturasService.create(dto);
//   }

//   @Get() // GET /leituras
//   findAll() {
//     return this.leiturasService.findAll();
//   }
// }










// // import { Controller } from '@nestjs/common';

// // @Controller('leituras')
// // export class LeiturasController {}
