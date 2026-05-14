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
exports.FinancesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FinancesService = class FinancesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createFinanceDto) {
        return this.prisma.finance.create({
            data: {
                ...createFinanceDto,
                userId,
            },
        });
    }
    async findAll(userId) {
        return this.prisma.finance.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
        });
    }
    async findOne(id, userId) {
        const finance = await this.prisma.finance.findFirst({
            where: { id, userId },
        });
        if (!finance)
            throw new common_1.NotFoundException('Transaction not found');
        return finance;
    }
    async update(id, userId, updateFinanceDto) {
        await this.findOne(id, userId);
        return this.prisma.finance.update({
            where: { id },
            data: updateFinanceDto,
        });
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.finance.delete({
            where: { id },
        });
    }
    async getSummary(userId) {
        const finances = await this.findAll(userId);
        const totalRevenue = finances
            .filter((f) => f.type === 'REVENUE')
            .reduce((acc, curr) => acc + curr.amount, 0);
        const totalExpenses = finances
            .filter((f) => f.type === 'EXPENSE')
            .reduce((acc, curr) => acc + curr.amount, 0);
        return {
            totalRevenue,
            totalExpenses,
            netProfit: totalRevenue - totalExpenses,
        };
    }
};
exports.FinancesService = FinancesService;
exports.FinancesService = FinancesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinancesService);
//# sourceMappingURL=finances.service.js.map