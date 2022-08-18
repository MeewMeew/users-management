import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('User Management')
    .setDescription('API for managing users')
    .setVersion('0.0.3')
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
    customCss: '.swagger-ui .topbar { display: none; }',
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
