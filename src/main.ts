import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api');  Serve para adicionar o prefixo api/ antes das rotas automaticamente. nao aplicavel neste projeto.

  // 🔓 Habilita requisições cross-origin do Angular
  app.enableCors();




  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
