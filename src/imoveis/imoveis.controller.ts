import { Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common';
import { ImoveisService } from './imoveis.service';
import { CreateImovelDto } from './dto/create-imovel.dto';
import { UpdateImovelDto } from './dto/update-imovel.dto';

@Controller('imoveis') // Define a rota base: http://localhost:3000/imoveis
export class ImoveisController {
  constructor(private readonly imoveisService: ImoveisService) {}

  @Post() // POST /imoveis
  create(@Body() dto: CreateImovelDto) {
    return this.imoveisService.create(dto);
  }

  @Get() // GET /imoveis
  findAll() {
    return this.imoveisService.findAll();
  }

  @Get(':id') // GET /imoveis/:id
  findOne(@Param('id') id: string) {
    return this.imoveisService.findOne(id);
  }


// ROTA DE ATUALIZAÇÃO PARCIAL
  @Patch(':id') // PATCH /imoveis/:id
  update(@Param('id') id: string, @Body() dto: UpdateImovelDto) {
    return this.imoveisService.update(id, dto);
  }

 
  // ROTA DE REMOÇÃO
  @Delete(':id') // DELETE /imoveis/:id
  remove(@Param('id') id: string) {
    return this.imoveisService.remove(id);
  }
}
