"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const PORT = parseInt(process.env.PORT || '10000', 10);
const preServer = http.createServer((_req, res) => {
    res.writeHead(200);
    res.end('OK');
});
preServer.listen(PORT, '0.0.0.0', () => {
    console.log(`WorkNest API starting on port ${PORT}`);
});
async function bootstrap() {
    const { NestFactory } = await Promise.resolve().then(() => require('@nestjs/core'));
    const { AppModule } = await Promise.resolve().then(() => require('./app.module'));
    const { ValidationPipe } = await Promise.resolve().then(() => require('@nestjs/common'));
    const app = await NestFactory.create(AppModule, { rawBody: true });
    app.setGlobalPrefix('v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors();
    await new Promise((resolve, reject) => {
        preServer.close((err) => (err ? reject(err) : resolve()));
    });
    const httpAdapter = app.getHttpAdapter();
    httpAdapter.get('/health', (_req, res) => res.send('OK'));
    httpAdapter.get('/', (_req, res) => res.send('WorkNest API'));
    await app.listen(PORT, '0.0.0.0');
    console.log(`WorkNest API live on port ${PORT}`);
}
bootstrap().catch((err) => {
    console.error('Fatal startup error:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map