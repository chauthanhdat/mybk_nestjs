import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('test api')
    .setDescription('test nestjs')
    .setVersion('1.0')
    .addTag('test')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('thoikhoabieu', app, document);

  await app.listen(3000);
}
bootstrap();
