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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TransactionsService = class TransactionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, data) {
        return this.prisma.transaction.create({
            data: {
                ...data,
                userId,
            },
        });
    }
    async findAll(userId, query) {
        const { startDate, endDate, type, category } = query;
        return this.prisma.transaction.findMany({
            where: {
                userId,
                type,
                category,
                date: {
                    gte: startDate ? new Date(startDate) : undefined,
                    lte: endDate ? new Date(endDate) : undefined,
                },
            },
            orderBy: { date: 'desc' },
        });
    }
    async getSummary(userId) {
        const transactions = await this.prisma.transaction.findMany({
            where: { userId },
        });
        const income = transactions
            .filter((t) => t.type === 'REVENUE')
            .reduce((acc, curr) => acc + curr.amount, 0);
        const expenses = transactions
            .filter((t) => t.type === 'EXPENSE')
            .reduce((acc, curr) => acc + curr.amount, 0);
        return {
            totalIncome: income,
            totalExpenses: expenses,
            netCashFlow: income - expenses,
        };
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map