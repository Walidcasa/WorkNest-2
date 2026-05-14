"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClientsService = class ClientsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, data) {
        return this.prisma.client.create({
            data: {
                ...data,
                userId,
            },
        });
    }
    async findAll(userId) {
        return this.prisma.client.findMany({
            where: { userId },
            include: { projects: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, userId) {
        const client = await this.prisma.client.findFirst({
            where: { id, userId },
            include: { projects: true },
        });
        if (!client)
            throw new common_1.NotFoundException('Client not found');
        return client;
    }
    async update(id, userId, data) {
        await this.findOne(id, userId);
        return this.prisma.client.update({
            where: { id },
            data,
        });
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.client.delete({
            where: { id },
        });
    }
    async getSummary(userId) {
        const clients = await this.findAll(userId);
        const totalPaid = clients.reduce((acc, curr) => acc + curr.totalPaid, 0);
        const totalPending = clients.reduce((acc, curr) => acc + curr.remainingBalance, 0);
        return {
            totalClients: clients.length,
            totalPaid,
            totalPending,
        };
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map