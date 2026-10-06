

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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('medidores')
export class MedidoresController {
  constructor(
    private readonly medidoresService: MedidoresService,
  ) { }


  // ==========================================
  // CRIAR MEDIDOR
  // ADMIN
  // ==========================================
  @Post()
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Cadastrar medidor',
    description: 'Cadastra um novo medidor. Requer autenticação e role ADMIN.',
  })
  @ApiBody({
    type: CreateMedidorDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de cadastro de medidor',
        value: {
          identificador: 'MED-AGUA-0005',
          tipo: 'AGUA',
          imovelId: '10000000-0000-0000-0000-000000000001',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Medidor cadastrado com sucesso.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso permitido somente para ADMIN.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)

  create(@Body() dto: CreateMedidorDto) {
    return this.medidoresService.create(dto);
  }



  // ==========================================
  // LISTAR MEDIDORES
  // ADMIN + USUARIO
  // ==========================================
  @Get()
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Listar medidores',
    description: 'Retorna todos os medidores cadastrados. Requer autenticação.',
  })

  @ApiResponse({
    status: 200,
    description: 'Lista de medidores retornada com sucesso.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    UsuarioRole.ADMIN,
    UsuarioRole.USUARIO,
  )

  findAll() {
    return this.medidoresService.findAll();
  }

  // ==========================================
  // BUSCAR MEDIDORES POR ID
  // ADMIN + USUARIO
  // ==========================================
  @Get(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Buscar medidor por ID',
    description: 'Retorna um medidor específico pelo ID. Requer autenticação.',
  })
  @ApiResponse({
    status: 200,
    description: 'Medidor encontrado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Medidor não encontrado.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    UsuarioRole.ADMIN,
    UsuarioRole.USUARIO,
  )

  findOne(@Param('id') id: string) {
    return this.medidoresService.findOne(id);
  }



  // ==========================================
  // ATUALIZAR MEDIDOR
  // ADMIN
  // ==========================================
  @Patch(':id')
  @ApiBearerAuth('bearer')
  @ApiBody({
    type: UpdateMedidorDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de atualização de medidor',
        value: {
          identificador: 'MED-AGUA-ATUALIZADO',
          tipo: 'AGUA',
          imovelId: '10000000-0000-0000-0000-000000000001',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Atualizar medidor',
    description: 'Atualiza os dados de um medidor. Requer autenticação e role ADMIN.',
  })
  @ApiResponse({
    status: 200,
    description: 'Medidor atualizado com sucesso.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso permitido somente para ADMIN.',
  })
  @ApiResponse({
    status: 404,
    description: 'Medidor não encontrado.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)

  update(
    @Param('id') id: string,
    @Body() dto: UpdateMedidorDto,
  ) {
    return this.medidoresService.update(id, dto);
  }

  // ==========================================
  // DELETAR MEDIDOR
  // ADMIN
  // ==========================================
  @Delete(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Excluir medidor',
    description: 'Exclui um medidor pelo ID. Requer autenticação e role ADMIN.',
  })
  @ApiResponse({
    status: 200,
    description: 'Medidor excluído com sucesso.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso permitido somente para ADMIN.',
  })
  @ApiResponse({
    status: 404,
    description: 'Medidor não encontrado.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UsuarioRole.ADMIN)

  remove(@Param('id') id: string) {
    return this.medidoresService.remove(id);
  }
}

