import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api');  Serve para adicionar o prefixo api/ antes das rotas automaticamente. nao aplicavel neste projeto.

  // 🔓 Habilita requisições cross-origin do Angular
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Telemetria')
    .setDescription('Documentação da API de Telemetria')
    .setVersion('1.0')
    .addServer('/api')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
