// swagger-config.ts
import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Band Portfolio API')
  .setDescription('API for managing band portfolios, songs, and events')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('auth', 'Authentication endpoints')
  .addTag('bands', 'Band management')
  .addTag('songs', 'Song management')
  .addTag('events', 'Event management')
  .build();