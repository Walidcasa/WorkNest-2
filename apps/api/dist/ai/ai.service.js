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
const sdk_1 = require("@anthropic-ai/sdk");
let AiService = class AiService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.anthropic = null;
        const OpenAIConstructor = OpenAILib.default || OpenAILib;
        this.openai = new OpenAIConstructor({
            apiKey: this.configService.get('OPENAI_API_KEY') || 'sk-mock',
        });
        const anthropicKey = this.configService.get('ANTHROPIC_API_KEY');
        if (anthropicKey && !anthropicKey.includes('mock')) {
            this.anthropic = new sdk_1.default({ apiKey: anthropicKey });
        }
    }
    async generateInsight(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                transactions: { orderBy: { date: 'desc' }, take: 50 },
                products: true,
                projects: true,
                clients: true,
                activities: { orderBy: { date: 'desc' }, take: 30 },
            },
        });
        if (!user)
            return null;
        const lang = user.language || 'en';
        const langName = lang === 'ar' ? 'Arabic' : lang === 'fr' ? 'French' : 'English';
        const totalRevenue = user.transactions?.filter(t => t.type === 'REVENUE').reduce((a, b) => a + b.amount, 0) || 0;
        const totalExpense = user.transactions?.filter(t => t.type === 'EXPENSE').reduce((a, b) => a + b.amount, 0) || 0;
        const profit = totalRevenue - totalExpense;
        const productiveTime = user.activities?.filter(a => a.level === 'PRODUCTIVE').reduce((acc, b) => acc + b.duration, 0) || 0;
        const wasteTime = user.activities?.filter(a => a.level === 'WASTE').reduce((acc, b) => acc + b.duration, 0) || 0;
        const activeClients = user.clients?.filter((c) => c.status === 'Active').length || 0;
        const lowStockProducts = user.products?.filter(p => p.stock <= p.lowStockAt).length || 0;
        const activeProjects = user.projects?.filter((p) => p.status === 'IN_PROGRESS').length || 0;
        const topCategories = this.getTopCategories(user.transactions || []);
        const systemPrompt = `You are an elite AI Business Advisor for a SaaS platform called WorkNest.
You analyze real user business data and deliver EXACTLY 3 sharp, actionable insights.
Respond ONLY with a raw JSON array (no markdown). Each object must have:
- "title": short catchy title (max 6 words)
- "description": 2-3 sentences of sharp, specific, data-driven advice using the actual numbers
- "type": one of "success", "warning", "info"
- "metric": a relevant string like "+$2,400 profit" or "3 low-stock items"
LANGUAGE: Respond entirely in ${langName}. Do not mix languages.`;
        const userData = `User Business Data:
- Account Type: ${user.accountType}
- Total Revenue: $${totalRevenue.toFixed(2)}
- Total Expenses: $${totalExpense.toFixed(2)}
- Net Profit: $${profit.toFixed(2)}
- Profit Margin: ${totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) : 0}%
- Productive Time: ${productiveTime} minutes
- Wasted Time: ${wasteTime} minutes
- Active Clients: ${activeClients}
- Active Projects: ${activeProjects}
- Low Stock Products: ${lowStockProducts}
- Top Revenue Categories: ${topCategories}`;
        if (this.anthropic) {
            try {
                const message = await this.anthropic.messages.create({
                    model: 'claude-haiku-4-5-20251001',
                    max_tokens: 1024,
                    messages: [{ role: 'user', content: `${systemPrompt}\n\n${userData}` }],
                });
                const text = message.content[0].text || '[]';
                const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                return JSON.parse(cleaned);
            }
            catch (e) {
                console.error('Claude AI error:', e);
            }
        }
        const openaiKey = this.configService.get('OPENAI_API_KEY');
        if (openaiKey && !openaiKey.includes('mock') && openaiKey.trim() !== '') {
            try {
                const response = await this.openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userData },
                    ],
                    temperature: 0.7,
                });
                const text = response.choices[0]?.message?.content || '[]';
                return JSON.parse(text);
            }
            catch (e) {
                console.error('OpenAI error:', e);
            }
        }
        return this.generateAlgorithmicInsights(profit, wasteTime, lowStockProducts, activeProjects, lang);
    }
    getTopCategories(transactions) {
        const map = {};
        transactions.filter(t => t.type === 'REVENUE').forEach(t => {
            map[t.category] = (map[t.category] || 0) + t.amount;
        });
        return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([cat, amt]) => `${cat} ($${amt.toFixed(0)})`).join(', ') || 'No data';
    }
    generateAlgorithmicInsights(profit, wasteTime, lowStock, activeProjects, lang) {
        const isAr = lang === 'ar';
        const isFr = lang === 'fr';
        const insights = [];
        if (profit > 0) {
            insights.push({
                title: isAr ? 'نمو مالي صحي' : isFr ? 'Croissance Financière' : 'Healthy Financial Growth',
                description: isAr
                    ? `صافي ربحك ${profit.toFixed(0)}$ إيجابي. فكر في إعادة استثمار 20% منه في تطوير أعمالك.`
                    : isFr
                        ? `Votre bénéfice net est de ${profit.toFixed(0)}$. Réinvestissez 20% pour accélérer votre croissance.`
                        : `Your net profit is $${profit.toFixed(0)}. Consider reinvesting 20% back into marketing or operations to compound growth.`,
                type: 'success',
                metric: `+$${profit.toFixed(0)}`,
            });
        }
        else {
            insights.push({
                title: isAr ? 'تحذير: نفقات تتجاوز الإيرادات' : isFr ? 'Alerte Trésorerie' : 'Burn Rate Alert',
                description: isAr
                    ? 'مصاريفك تتجاوز إيراداتك. راجع النفقات وحدد ما يمكن تقليصه فوراً.'
                    : isFr
                        ? 'Vos dépenses dépassent vos revenus. Identifiez les postes de coûts à réduire immédiatement.'
                        : `Your expenses exceed revenue by $${Math.abs(profit).toFixed(0)}. Review your top cost categories and cut non-essential spending immediately.`,
                type: 'warning',
                metric: `-$${Math.abs(profit).toFixed(0)}`,
            });
        }
        if (wasteTime > 120) {
            insights.push({
                title: isAr ? 'تسرب وقت مقلق' : isFr ? 'Perte de Productivité' : 'Productivity Drain',
                description: isAr
                    ? `سجلت ${wasteTime} دقيقة غير منتجة. طبّق تقنية بومودورو: 25 دقيقة عمل، 5 راحة.`
                    : isFr
                        ? `Vous avez enregistré ${wasteTime} minutes improductives. Essayez la technique Pomodoro pour récupérer ces heures.`
                        : `You've logged ${wasteTime} unproductive minutes. Block distractions with app timers and use 25/5 Pomodoro sprints to reclaim focus.`,
                type: 'warning',
                metric: `-${wasteTime}m wasted`,
            });
        }
        else {
            insights.push({
                title: isAr ? 'إنتاجية عالية' : isFr ? 'Excellente Productivité' : 'Peak Productivity',
                description: isAr
                    ? 'مستوى إنتاجيتك ممتاز. حافظ على هذا الزخم ووسّع ساعات العمل المركّز.'
                    : isFr
                        ? 'Votre niveau de productivité est excellent. Maintenez cette dynamique et planifiez vos tâches les plus importantes en matinée.'
                        : 'Your productivity levels are excellent. Schedule your most cognitively demanding work in the morning to maintain this momentum.',
                type: 'success',
                metric: 'High focus',
            });
        }
        if (lowStock > 0) {
            insights.push({
                title: isAr ? 'تحذير المخزون' : isFr ? 'Stock Critique' : 'Inventory Alert',
                description: isAr
                    ? `${lowStock} منتجات على وشك النفاذ. أعد الطلب الآن لتفادي خسارة المبيعات وإحباط العملاء.`
                    : isFr
                        ? `${lowStock} produits sont en rupture imminente. Passez commande maintenant pour éviter les pertes de ventes.`
                        : `${lowStock} products are critically low. Reorder immediately — stockouts cost 2-3x more in lost sales than the reorder cost.`,
                type: 'warning',
                metric: `${lowStock} items critical`,
            });
        }
        else if (activeProjects > 0) {
            insights.push({
                title: isAr ? 'مشاريع نشطة' : isFr ? 'Projets en Cours' : 'Projects On Track',
                description: isAr
                    ? `لديك ${activeProjects} مشاريع نشطة. تأكد من تحديث التقدم بانتظام وتواصل مع العملاء.`
                    : isFr
                        ? `${activeProjects} projets actifs en cours. Mettez à jour leur avancement et communiquez régulièrement avec vos clients.`
                        : `You have ${activeProjects} active projects. Keep momentum by doing a quick daily standup and updating progress percentages for client visibility.`,
                type: 'info',
                metric: `${activeProjects} active`,
            });
        }
        else {
            insights.push({
                title: isAr ? 'عمليات مستقرة' : isFr ? 'Opérations Stables' : 'Operations Stable',
                description: isAr
                    ? 'جميع العمليات في حالة جيدة. الوقت المثالي لتوسيع قاعدة عملائك.'
                    : isFr
                        ? 'Vos opérations sont stables. Profitez-en pour prospecter de nouveaux clients.'
                        : 'All operations running smoothly. Use this stable period to invest in client acquisition or product development.',
                type: 'info',
                metric: 'Stable',
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