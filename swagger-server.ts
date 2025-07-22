import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './src/app.module';
import { swaggerConfig } from './swagger-config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // CORS for frontend
  app.enableCors();

  // Create Swagger documentation
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'Band Portfolio API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  
  const port = process.env.SWAGGER_PORT || 3001;
  await app.listen(port);
  
  console.log(`📚 Swagger UI running on: http://localhost:${port}`);
  console.log(`🎸 Band Portfolio API Documentation`);
}

bootstrap().catch(err => {
  console.error('❌ Error starting Swagger server:', err);
  process.exit(1);
});