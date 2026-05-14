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
exports.ActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ActivitiesService = class ActivitiesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async log(userId, data) {
        return this.prisma.activity.create({
            data: {
                ...data,
                userId,
            },
        });
    }
    async findToday(userId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.prisma.activity.findMany({
            where: {
                userId,
                date: {
                    gte: today,
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getFocusScore(userId) {
        const activities = await this.findToday(userId);
        if (activities.length === 0)
            return 0;
        const totalMinutes = activities.reduce((acc, curr) => acc + curr.duration, 0);
        const productiveMinutes = activities
            .filter((a) => a.level === 'PRODUCTIVE')
            .reduce((acc, curr) => acc + curr.duration, 0);
        return Math.round((productiveMinutes / totalMinutes) * 100);
    }
    async getBreakdown(userId) {
        const activities = await this.findToday(userId);
        const breakdown = {
            PRODUCTIVE: 0,
            NEUTRAL: 0,
            WASTE: 0,
        };
        activities.forEach((a) => {
            breakdown[a.level] += a.duration;
        });
        return breakdown;
    }
};
exports.ActivitiesService = ActivitiesService;
exports.ActivitiesService = ActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ActivitiesService);
//# sourceMappingURL=activities.service.js.map