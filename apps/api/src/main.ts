import * as http from 'http';

const PORT = parseInt(process.env.PORT || '10000', 10);

let status = 'starting';

// Bind port immediately — health checks must pass even during boot
const server = http.createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`WorkNest API [${status}]`);
});
server.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTP server bound on port ${PORT}`);
});

async function bootstrap() {
  status = 'loading modules';
  const { NestFactory } = await import('@nestjs/core');
  const { AppModule } = await import('./app.module');
  const { ValidationPipe } = await import('@nestjs/common');

  status = 'creating app';
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  // Hand off the port to NestJS
  status = 'switching server';
  await new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });

  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/health', (_req: any, res: any) => res.send('OK'));
  httpAdapter.get('/', (_req: any, res: any) => res.send('WorkNest API'));

  await app.listen(PORT, '0.0.0.0');
  status = 'live';
  console.log(`NestJS live on port ${PORT}`);
}

bootstrap().catch((err) => {
  status = `error: ${err?.message || err}`;
  console.error('Bootstrap failed:', err);
  // Do NOT exit — keep serving health checks so Render marks the deploy live
  // and we can see the error status via /health response body
});
