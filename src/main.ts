import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidateInputPipe } from "./pipe/validate.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidateInputPipe());

  const config = new DocumentBuilder()
      .setTitle('Server streaming platform')
      .setVersion('0.0.1')
      .setDescription('Streaming platform')
      .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app, document);

  await app.listen(3000);
}
bootstrap();
