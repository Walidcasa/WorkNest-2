import { EmployeesService } from './employees.service';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    findAll(req: any): Promise<{
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
    getPayroll(req: any): Promise<{
        totalMonthly: number;
        pendingPayments: number;
        employeeCount: number;
    }>;
    create(req: any, data: any): Promise<{
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
    update(req: any, id: string, data: any): Promise<{
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
    remove(req: any, id: string): Promise<{
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
}
