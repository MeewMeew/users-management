import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { toString } from './swagger/theme/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('User Management')
    .setDescription('API for managing users')
    .setVersion('0.0.6')
    .addTag('Auth')
    .addTag('User')
    .addTag('Admin')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'User Management',
    customCss: toString('dark'),
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
