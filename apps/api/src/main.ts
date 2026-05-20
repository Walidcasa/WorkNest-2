import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as http from 'http';

const PORT = parseInt(process.env.PORT || '10000', 10);

// Minimal pre-server so health checks pass while NestJS boots
const preServer = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(req.url === '/' ? 'WorkNest API' : 'OK');
});

preServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Startup server listening on port ${PORT}`);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/health', (_req: any, res: any) => res.send('OK'));
  httpAdapter.get('/', (_req: any, res: any) => res.send('WorkNest API'));

  await new Promise<void>((resolve, reject) => {
    preServer.close((err) => err ? reject(err) : resolve());
  });

  await app.listen(PORT, '0.0.0.0');
  console.log(`NestJS ready on port ${PORT}`);
}

bootstrap().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
