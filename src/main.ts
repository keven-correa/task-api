import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger implementation
  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('Manage your Tasks bro 🤔')
    .setVersion('1.0')
    .addTag('Tasks')
    .addTag('Categories')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
