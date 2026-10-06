


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

import {
  ApiBearerAuth, ApiBody, ApiOperation, ApiResponse,
} from '@nestjs/swagger';

@Controller('imoveis')
export class ImoveisController {
  constructor(
    private readonly imoveisService: ImoveisService,
  ) { }

  // ==========================================
  // CRIAR IMÓVEL
  // ADMIN
  // ==========================================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Cadastrar imóvel',
    description: 'Cadastra um novo imóvel. Requer autenticação e role ADMIN.',
  })



  @ApiBody({
    type: CreateImovelDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de cadastro de imóvel',
        value: {
          nome: 'Residencial Exemplo',
          endereco: 'Av. Boa Viagem, 500 - Recife/PE',
        },
      },
    },
  })

  @ApiResponse({
    status: 201,
    description: 'Imóvel cadastrado com sucesso.',
  })
  @ApiResponse({
    status: 403,
    description: ' Acesso permitido somente para ADMIN.',
  })
  @Roles(UsuarioRole.ADMIN)
  create(@Body() dto: CreateImovelDto) {
    return this.imoveisService.create(dto);
  }

  // ==========================================
  // LISTAR IMÓVEIS
  // ADMIN + USUARIO
  // ==========================================  
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar imóveis',
    description: 'Retorna todos os imóveis cadastrados. Requer autenticação.',
  })

  @ApiResponse({
    status: 200,
    description: 'Lista de imóveis retornada com sucesso.',
  })
  @Roles(
    UsuarioRole.ADMIN,
    UsuarioRole.USUARIO,
  )
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
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Buscar imóvel por ID',
    description: 'Retorna um imóvel específico pelo ID. Requer autenticação.',
  })

  @ApiResponse({
    status: 200,
    description: 'Imóvel encontrado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Imóvel não encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.imoveisService.findOne(id);
  }



  // ==========================================
  // ATUALIZAR IMÓVEL
  // ADMIN
  // ==========================================
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Atualizar imóvel',
    description: 'Atualiza os dados de um imóvel. Requer autenticação e role ADMIN.',
  })


  @ApiBody({
    type: UpdateImovelDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de atualização de imóvel',
        value: {
          nome: 'Residencial Exemplo Atualizado',
          endereco: 'Rua Exemplo, 100 - Recife/PE',
        },
      },
    },
  })


  @ApiResponse({
    status: 200,
    description: 'Imóvel atualizado com sucesso.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso permitido somente para ADMIN.',
  })
  @ApiResponse({
    status: 404,
    description: 'Imóvel não encontrado.',
  })
  @Roles(UsuarioRole.ADMIN)
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar imóvel',
    description: 'Atualiza os dados de um imóvel. Requer autenticação e role ADMIN.',
  })
  @Roles(UsuarioRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.imoveisService.remove(id);
  }
}


