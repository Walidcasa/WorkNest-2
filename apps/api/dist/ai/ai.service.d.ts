import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
export declare class AiService {
    private prisma;
    private configService;
    private openai;
    private anthropic;
    constructor(prisma: PrismaService, configService: ConfigService);
    generateInsight(userId: string): Promise<any>;
    private getTopCategories;
    private generateAlgorithmicInsights;
}
