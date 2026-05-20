"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const finances_module_1 = require("./finances/finances.module");
const products_module_1 = require("./products/products.module");
const employees_module_1 = require("./employees/employees.module");
const clients_module_1 = require("./clients/clients.module");
const projects_module_1 = require("./projects/projects.module");
const notifications_module_1 = require("./notifications/notifications.module");
const transactions_module_1 = require("./transactions/transactions.module");
const activities_module_1 = require("./activities/activities.module");
const admin_module_1 = require("./admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            finances_module_1.FinancesModule,
            products_module_1.ProductsModule,
            employees_module_1.EmployeesModule,
            clients_module_1.ClientsModule,
            projects_module_1.ProjectsModule,
            notifications_module_1.NotificationsModule,
            transactions_module_1.TransactionsModule,
            activities_module_1.ActivitiesModule,
            admin_module_1.AdminModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map