"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const PORT = parseInt(process.env.PORT || '10000', 10);
let status = 'starting';
const server = http.createServer((_req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`WorkNest API [${status}]`);
});
server.listen(PORT, '0.0.0.0', () => {
    console.log(`HTTP server bound on port ${PORT}`);
});
async function bootstrap() {
    status = 'loading modules';
    const { NestFactory } = await Promise.resolve().then(() => require('@nestjs/core'));
    const { AppModule } = await Promise.resolve().then(() => require('./app.module'));
    const { ValidationPipe } = await Promise.resolve().then(() => require('@nestjs/common'));
    status = 'creating app';
    const app = await NestFactory.create(AppModule, { rawBody: true });
    app.setGlobalPrefix('v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors();
    status = 'switching server';
    await new Promise((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
    });
    const httpAdapter = app.getHttpAdapter();
    httpAdapter.get('/health', (_req, res) => res.send('OK'));
    httpAdapter.get('/', (_req, res) => res.send('WorkNest API'));
    await app.listen(PORT, '0.0.0.0');
    status = 'live';
    console.log(`NestJS live on port ${PORT}`);
}
bootstrap().catch((err) => {
    status = `error: ${err?.message || err}`;
    console.error('Bootstrap failed:', err);
});
//# sourceMappingURL=main.js.map