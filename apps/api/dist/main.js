"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const http = require("http");
const PORT = parseInt(process.env.PORT || '10000', 10);
const preServer = http.createServer((req, res) => {
    res.writeHead(200);
    res.end(req.url === '/' ? 'WorkNest API' : 'OK');
});
preServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Startup server listening on port ${PORT}`);
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { rawBody: true });
    app.setGlobalPrefix('v1');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors();
    const httpAdapter = app.getHttpAdapter();
    httpAdapter.get('/health', (_req, res) => res.send('OK'));
    httpAdapter.get('/', (_req, res) => res.send('WorkNest API'));
    await new Promise((resolve, reject) => {
        preServer.close((err) => err ? reject(err) : resolve());
    });
    await app.listen(PORT, '0.0.0.0');
    console.log(`NestJS ready on port ${PORT}`);
}
bootstrap().catch((err) => {
    console.error('Fatal startup error:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map