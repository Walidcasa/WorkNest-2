import * as http from 'http';

const PORT = parseInt(process.env.PORT || '10000', 10);

// Bind port immediately so Render's health check passes while modules load
const preServer = http.createServer((_req, res) => {
  res.writeHead(200);
  res.end('OK');
});
preServer.listen(PORT, '0.0.0.0', () => {
  console.log(`WorkNest API starting on port ${PORT}`);
});

async function bootstrap() {
  const { NestFactory } = await import('@nestjs/core');
  const { AppModule } = await import('./app.module');
  const { ValidationPipe } = await import('@nestjs/common');

  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  await new Promise<void>((resolve, reject) => {
    preServer.close((err) => (err ? reject(err) : resolve()));
  });

  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/health', (_req: any, res: any) => res.send('OK'));
  httpAdapter.get('/', (_req: any, res: any) => res.send('WorkNest API'));

  await app.listen(PORT, '0.0.0.0');
  console.log(`WorkNest API live on port ${PORT}`);
}

bootstrap().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
