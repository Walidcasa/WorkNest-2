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
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const OpenAILib = require("openai");
let AiService = class AiService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        const OpenAIConstructor = OpenAILib.default || OpenAILib;
        this.openai = new OpenAIConstructor({
            apiKey: this.configService.get('OPENAI_API_KEY') || 'sk-mock',
        });
    }
    async generateInsight(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                transactions: true,
                products: true,
                projects: true,
                clients: true,
                activities: true,
            },
        });
        if (!user)
            return null;
        const lang = user.language || 'en';
        const totalRevenue = user.transactions?.filter(t => t.type === 'REVENUE').reduce((a, b) => a + b.amount, 0) || 0;
        const totalExpense = user.transactions?.filter(t => t.type === 'EXPENSE').reduce((a, b) => a + b.amount, 0) || 0;
        const profit = totalRevenue - totalExpense;
        const productiveTime = user.activities?.filter(a => a.level === 'PRODUCTIVE').reduce((acc, b) => acc + b.duration, 0) || 0;
        const wasteTime = user.activities?.filter(a => a.level === 'WASTE').reduce((acc, b) => acc + b.duration, 0) || 0;
        const activeClients = user.clients?.filter((c) => c.status === 'Active').length || 0;
        const lowStockProducts = user.products?.filter(p => p.stock <= p.lowStockAt).length || 0;
        const systemPrompt = `You are an elite AI Business Advisor for a SaaS platform called WorkNest/Clarity. 
You provide extremely sharp, actionable, and data-driven insights. 
Analyze the provided user data and return EXACTLY 3 insights formatted as a JSON array of objects.
Do not use markdown blocks. Just return raw JSON.
Each object must have:
- "title": A short catchy title.
- "description": 2-3 sentences of sharp business advice.
- "type": One of "success", "warning", "info".
- "metric": A relevant string like "+15% Revenue" or "Critical".
The response language MUST BE in ${lang.toUpperCase()}.`;
        const userData = `
User Data:
- Total Revenue: $${totalRevenue}
- Total Expenses: $${totalExpense}
- Net Profit: $${profit}
- Productive Minutes: ${productiveTime}
- Wasted Minutes: ${wasteTime}
- Active Clients: ${activeClients}
- Products Low in Stock: ${lowStockProducts}
    `;
        const apiKey = this.configService.get('OPENAI_API_KEY');
        if (!apiKey || apiKey.includes('mock') || apiKey.trim() === '') {
            return this.generateAlgorithmicInsights(profit, wasteTime, lowStockProducts, lang);
        }
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userData }
                ],
                temperature: 0.7,
            });
            const responseText = response.choices[0]?.message?.content || '[]';
            return JSON.parse(responseText);
        }
        catch (e) {
            console.error('AI Error', e);
            return this.generateAlgorithmicInsights(profit, wasteTime, lowStockProducts, lang);
        }
    }
    generateAlgorithmicInsights(profit, wasteTime, lowStock, lang) {
        const isAr = lang === 'ar';
        const isFr = lang === 'fr';
        const insights = [];
        if (profit > 0) {
            insights.push({
                title: isAr ? 'نمو مالي صحي' : isFr ? 'Croissance Financière Saine' : 'Healthy Financial Growth',
                description: isAr ? `صافي ربحك إيجابي. فكر في استثمار جزء من ${profit}$ في التسويق.` : isFr ? `Votre bénéfice net est positif. Pensez à réinvestir une partie de ${profit}$ en marketing.` : `Your net profit is positive. Consider reinvesting a portion of $${profit} in marketing.`,
                type: 'success',
                metric: `+$${profit}`
            });
        }
        else {
            insights.push({
                title: isAr ? 'تحذير السيولة النقدية' : isFr ? 'Alerte Trésorerie' : 'Cash Flow Warning',
                description: isAr ? 'مصاريفك تتجاوز إيراداتك. راجع نفقاتك فوراً.' : isFr ? 'Vos dépenses dépassent vos revenus. Révisez vos dépenses.' : 'Your expenses exceed your revenue. Review your burn rate immediately.',
                type: 'warning',
                metric: 'Review'
            });
        }
        if (wasteTime > 120) {
            insights.push({
                title: isAr ? 'تسرب الوقت' : isFr ? 'Fuite de Temps' : 'Time Leakage',
                description: isAr ? `قمت بتسجيل ${wasteTime} دقيقة كأنشطة غير منتجة. جرب تقنية بومودورو.` : isFr ? `Vous avez enregistré ${wasteTime} minutes improductives. Essayez la méthode Pomodoro.` : `You've logged ${wasteTime} minutes of unproductive time. Try the Pomodoro technique.`,
                type: 'warning',
                metric: `-${wasteTime}m`
            });
        }
        else {
            insights.push({
                title: isAr ? 'تركيز عالي' : isFr ? 'Haute Concentration' : 'Laser Focus',
                description: isAr ? 'مستويات إنتاجيتك ممتازة اليوم. حافظ على هذا الزخم.' : isFr ? 'Votre niveau de productivité est excellent. Continuez.' : 'Your productivity levels are excellent. Keep up the momentum.',
                type: 'success',
                metric: 'Peak'
            });
        }
        if (lowStock > 0) {
            insights.push({
                title: isAr ? 'تحذير المخزون' : isFr ? 'Alerte Stock' : 'Inventory Alert',
                description: isAr ? `هناك ${lowStock} منتجات على وشك النفاذ. قم بطلب المخزون الآن.` : isFr ? `Il y a ${lowStock} produits en rupture de stock imminente.` : `You have ${lowStock} items running low. Restock now to avoid lost sales.`,
                type: 'warning',
                metric: `${lowStock} Items`
            });
        }
        else {
            insights.push({
                title: isAr ? 'عمليات مستقرة' : isFr ? 'Opérations Stables' : 'Stable Operations',
                description: isAr ? 'جميع العمليات في حالة ممتازة.' : isFr ? 'Toutes les opérations sont stables.' : 'All operations are stable.',
                type: 'info',
                metric: 'Stable'
            });
        }
        return insights;
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], AiService);
//# sourceMappingURL=ai.service.js.map