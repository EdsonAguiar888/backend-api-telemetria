

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards
} from '@nestjs/common';

import { LeiturasService } from './leituras.service';
import { CreateLeituraDto } from './dto/create-leitura.dto';
import { UpdateLeituraDto } from './dto/update-leitura.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UsuarioRole } from '../usuarios/usuario.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('leituras')
export class LeiturasController {
  constructor(
    private readonly leiturasService: LeiturasService,
  ) { }


  // ==========================================
  // LISTAR CONSUMO
  // ADMIN 
  // ==========================================
  @Post()

  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Cadastrar leitura',
    description: 'Cadastra uma nova leitura. Requer autenticação e role ADMIN.',
  })
  @ApiBody({
    type: CreateLeituraDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de cadastro de leitura',
        value: {
          dataHora: '2026-10-05T15:00:00.000Z',
          valor: 600,
          medidorId: '20000000-0000-0000-0000-000000000001',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Leitura cadastrada com sucesso.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso permitido somente para ADMIN.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  create(@Body() dto: CreateLeituraDto) {
    return this.leiturasService.create(dto);
  }



  // ==========================================
  // LISTAR TODOS CONSUMOS
  // ADMIN + USUARIO
  // ==========================================
  @Get()
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Listar leituras',
    description: 'Retorna todas as leituras cadastradas. Requer autenticação.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de leituras retornada com sucesso.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    UsuarioRole.ADMIN,
    UsuarioRole.USUARIO,
  )
  findAll() {
    return this.leiturasService.findAll();
  }


  // ==========================================
  // LISTAR CONSUMO POR ID
  // ADMIN + USUARIO
  // ==========================================
  @Get(':id')

  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Buscar leitura por ID',
    description: 'Retorna uma leitura específica pelo ID. Requer autenticação.',
  })
  @ApiResponse({
    status: 200,
    description: 'Leitura encontrada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Leitura não encontrada.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    UsuarioRole.ADMIN,
    UsuarioRole.USUARIO,
  )
  findOne(@Param('id') id: string) {
    return this.leiturasService.findOne(id);
  }


  // ==========================================
  // ATUALIZAR CONSUMO
  // ADMIN 
  // ==========================================
  @Patch(':id')

  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Atualizar leitura',
    description: 'Atualiza os dados de uma leitura. Requer autenticação e role ADMIN.',
  })
  @ApiResponse({
    status: 200,
    description: 'Leitura atualizada com sucesso.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso permitido somente para ADMIN.',
  })
  @ApiResponse({
    status: 404,
    description: 'Leitura não encontrada.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateLeituraDto,
  ) {
    return this.leiturasService.update(id, dto);
  }


  // ==========================================
  // DELETAR CONSUMO
  // ADMIN
  // ==========================================
  @Delete(':id')

  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Excluir leitura',
    description: 'Exclui uma leitura pelo ID. Requer autenticação e role ADMIN.',
  })
  @ApiResponse({
    status: 200,
    description: 'Leitura excluída com sucesso.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso permitido somente para ADMIN.',
  })
  @ApiResponse({
    status: 404,
    description: 'Leitura não encontrada.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.leiturasService.remove(id);
  }
}
