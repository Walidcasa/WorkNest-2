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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationsService = class NotificationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll(userId) {
        return this.prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 20,
        });
    }
    async getUnreadCount(userId) {
        const count = await this.prisma.notification.count({ where: { userId, read: false } });
        return { count };
    }
    async markAllRead(userId) {
        await this.prisma.notification.updateMany({ where: { userId, read: false }, data: { read: true } });
        return { ok: true };
    }
    async markOneRead(userId, id) {
        await this.prisma.notification.updateMany({ where: { id, userId }, data: { read: true } });
        return { ok: true };
    }
    async create(userId, title, body) {
        return this.prisma.notification.create({ data: { userId, title, body } });
    }
    async generateSmartNotifications(userId) {
        const existing = await this.prisma.notification.findMany({
            where: { userId, createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
            select: { title: true },
        });
        const existingTitles = new Set(existing.map(n => n.title));
        const [products, projects, employees] = await Promise.all([
            this.prisma.product.findMany({ where: { userId } }),
            this.prisma.project.findMany({ where: { userId } }),
            this.prisma.employee.findMany({ where: { userId } }),
        ]);
        const toCreate = [];
        const lowStock = products.filter(p => p.stock <= p.lowStockAt);
        if (lowStock.length > 0 && !existingTitles.has('Low Stock Alert')) {
            toCreate.push({
                title: 'Low Stock Alert',
                body: `${lowStock.length} product${lowStock.length > 1 ? 's are' : ' is'} running low: ${lowStock.slice(0, 2).map(p => p.name).join(', ')}`,
            });
        }
        const delayed = projects.filter(p => p.deadline && new Date(p.deadline) < new Date() && p.status !== 'DONE');
        if (delayed.length > 0 && !existingTitles.has('Project Deadline Passed')) {
            toCreate.push({
                title: 'Project Deadline Passed',
                body: `${delayed.length} project${delayed.length > 1 ? 's have' : ' has'} passed their deadline. Review now.`,
            });
        }
        const unpaid = employees.filter(e => e.paymentStatus === 'PENDING');
        if (unpaid.length > 0 && !existingTitles.has('Pending Payroll')) {
            toCreate.push({
                title: 'Pending Payroll',
                body: `${unpaid.length} employee${unpaid.length > 1 ? 's have' : ' has'} pending salary payments.`,
            });
        }
        if (toCreate.length > 0) {
            await this.prisma.notification.createMany({
                data: toCreate.map(n => ({ ...n, userId })),
            });
        }
        return toCreate.length;
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map