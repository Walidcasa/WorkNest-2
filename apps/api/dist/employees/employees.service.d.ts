import { PrismaService } from '../prisma/prisma.service';
export declare class EmployeesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        userId: string;
        position: string;
        salary: number;
        workSchedule: string | null;
        avatar: string | null;
        paymentStatus: import(".prisma/client").$Enums.PayStatus;
    }>;
    findAll(userId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        userId: string;
        position: string;
        salary: number;
        workSchedule: string | null;
        avatar: string | null;
        paymentStatus: import(".prisma/client").$Enums.PayStatus;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        userId: string;
        position: string;
        salary: number;
        workSchedule: string | null;
        avatar: string | null;
        paymentStatus: import(".prisma/client").$Enums.PayStatus;
    }>;
    update(id: string, userId: string, data: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        userId: string;
        position: string;
        salary: number;
        workSchedule: string | null;
        avatar: string | null;
        paymentStatus: import(".prisma/client").$Enums.PayStatus;
    }>;
    remove(id: string, userId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        userId: string;
        position: string;
        salary: number;
        workSchedule: string | null;
        avatar: string | null;
        paymentStatus: import(".prisma/client").$Enums.PayStatus;
    }>;
    getPayrollSummary(userId: string): Promise<{
        totalMonthly: number;
        pendingPayments: number;
        employeeCount: number;
    }>;
}
