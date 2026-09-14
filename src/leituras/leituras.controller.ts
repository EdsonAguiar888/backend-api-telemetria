import { Controller, Get, Post, Body } from '@nestjs/common';
import { LeiturasService } from './leituras.service';
import { CreateLeituraDto } from './dto/create-leitura.dto';

@Controller('leituras') // Define a rota base: http://localhost:3000/leituras
export class LeiturasController {
  constructor(private readonly leiturasService: LeiturasService) {}

  @Post() // POST /leituras
  create(@Body() dto: CreateLeituraDto) {
    return this.leiturasService.create(dto);
  }

  @Get() // GET /leituras
  findAll() {
    return this.leiturasService.findAll();
  }
}










// import { Controller } from '@nestjs/common';

// @Controller('leituras')
// export class LeiturasController {}
