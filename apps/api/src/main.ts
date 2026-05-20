import * as http from 'http';

const PORT = parseInt(process.env.PORT || '10000', 10);

// Bind port immediately so health checks pass while modules load
const preServer = http.createServer((_req, res) => {
  res.writeHead(200);
  res.end('OK');
});
preServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Startup listener on port ${PORT}`);
});

async function bootstrap() {
  // Dynamic imports so module loading happens after preServer is bound
  const { NestFactory } = await import('@nestjs/core');
  const { AppModule } = await import('./app.module');
  const { ValidationPipe } = await import('@nestjs/common');

  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/health', (_req: any, res: any) => res.send('OK'));
  httpAdapter.get('/', (_req: any, res: any) => res.send('WorkNest API'));

  await new Promise<void>((resolve, reject) => {
    preServer.close((err) => (err ? reject(err) : resolve()));
  });

  await app.listen(PORT, '0.0.0.0');
  console.log(`NestJS running on port ${PORT}`);
}

bootstrap().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
