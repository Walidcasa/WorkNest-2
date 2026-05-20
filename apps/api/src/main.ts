import * as http from 'http';

const PORT = parseInt(process.env.PORT || '10000', 10);

let statusInfo = { phase: 'starting', error: null as string | null };

const server = http.createServer((_req, res) => {
  const body = JSON.stringify({
    phase: statusInfo.phase,
    error: statusInfo.error,
    node: process.version,
    port: PORT,
    env: process.env.NODE_ENV,
  });
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(body);
});
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Diagnostic server on port ${PORT}`);
});

async function bootstrap() {
  statusInfo.phase = 'importing nestjs';
  const { NestFactory } = await import('@nestjs/core');

  statusInfo.phase = 'importing app module';
  const { AppModule } = await import('./app.module');

  statusInfo.phase = 'importing common';
  const { ValidationPipe } = await import('@nestjs/common');

  statusInfo.phase = 'creating nest app';
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  statusInfo.phase = 'switching server';
  await new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });

  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/health', (_req: any, res: any) => res.send('OK'));
  httpAdapter.get('/', (_req: any, res: any) => res.send('WorkNest API'));

  await app.listen(PORT, '0.0.0.0');
  statusInfo.phase = 'live';
  console.log(`NestJS live on port ${PORT}`);
}

bootstrap().catch((err) => {
  statusInfo.phase = 'crashed';
  statusInfo.error = err?.stack || String(err);
  console.error('Bootstrap crashed:', err);
  // Keep server alive so we can read the error via health check
});
